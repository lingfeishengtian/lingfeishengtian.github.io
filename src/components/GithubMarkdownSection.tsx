import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import mermaid from 'mermaid';
import 'katex/dist/katex.min.css';
import { normalizeWikiUrl } from '../utils/wikiMarkdown';

interface GithubMarkdownSectionProps {
  title: string;
  url: string;
  description: string;
  markdown: string;
  wikiBaseUrl: string;
}

let mermaidInitialized = false;

const MermaidBlock = ({ chart }: { chart: string }) => {
  const [svg, setSvg] = useState('');
  const [hasError, setHasError] = useState(false);
  const id = useMemo(() => `mermaid-${Math.random().toString(36).slice(2, 10)}`, []);

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        if (!mermaidInitialized) {
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'loose',
            theme: 'dark',
          });
          mermaidInitialized = true;
        }

        const { svg: renderedSvg } = await mermaid.render(id, chart);
        setSvg(renderedSvg);
        setHasError(false);
      } catch {
        setHasError(true);
      }
    };

    renderDiagram();
  }, [chart, id]);

  if (hasError) {
    return (
      <pre className="bg-zinc-950 p-4 rounded overflow-x-auto text-red-300">
        {chart}
      </pre>
    );
  }

  return <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: svg }} />;
};

const markdownComponents: Components = {
  code({ className, children, ...props }) {
    if (className?.includes('language-mermaid')) {
      return <MermaidBlock chart={String(children).replace(/\n$/, '')} />;
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

const GithubMarkdownSection = ({
  title,
  url,
  markdown,
  wikiBaseUrl,
}: GithubMarkdownSectionProps) => {
  return (
    <article className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-5">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-semibold text-blue-400">{title}</h2>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-blue-300 hover:text-blue-200 transition-colors duration-200"
        >
          Open on GitHub
        </a>
      </div>
      <div className="text-gray-200 leading-7 space-y-3 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-5 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_code]:bg-zinc-800 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_pre]:bg-zinc-950 [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto">
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          components={markdownComponents}
          urlTransform={(urlValue) => normalizeWikiUrl(urlValue, wikiBaseUrl)}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default GithubMarkdownSection;