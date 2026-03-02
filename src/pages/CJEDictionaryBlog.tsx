import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchSelectedCJEDictionaryWikiPages,
} from '../utils/cjeDictionaryWikiClient';
import { fetchWikiMarkdown, type WikiPage } from '../utils/wikiClient';
import {
  cjeDictionaryWikiBaseUrl,
  generateDescription,
  preprocessWikiLinks,
} from '../utils/wikiMarkdown';
import GithubMarkdownSection from '../components/GithubMarkdownSection';

interface WikiPageWithContent extends WikiPage {
  description: string;
  markdown: string;
}

const wikiSolutions: Record<string, string> = {
  'Japanese-Optimized-Dictionary-Parser': 'Explains how dictionary parsing is optimized for Japanese lookup workflows and performance-sensitive indexing.',
};

const CJEDictionaryBlog = () => {
  const [pages, setPages] = useState<WikiPageWithContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPages = async () => {
      try {
        setLoading(true);
        setError(null);

        const selectedPages = await fetchSelectedCJEDictionaryWikiPages();
        const pagesWithMarkdown = await Promise.all(
          selectedPages.map(async (page) => {
            const rawMarkdown = await fetchWikiMarkdown(page.markdownUrl);
            const markdown = preprocessWikiLinks(rawMarkdown, cjeDictionaryWikiBaseUrl);
            return {
              ...page,
              markdown,
              description: generateDescription(markdown),
            };
          })
        );

        setPages(pagesWithMarkdown);
      } catch {
        setError('Could not load CJE Dictionary wiki pages right now.');
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/blog" className="text-sm text-blue-300 hover:text-blue-200 transition-colors duration-200">
            ← Back to Blog
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">CJE Dictionary</h1>
        <p className="text-gray-300 text-lg mb-8">
          CJE Dictionary is a project for trilingual speakers of Chinese, Japanese, and English focuses on Japanese-first dictionary processing and parsing quality.
        </p>

        <section className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-5 mb-8">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">Pages</h2>
          <ul className="space-y-3 text-gray-200 list-disc pl-6">
            {pages.map((page) => (
              <li key={`solve-${page.id}`}>
                <span className="font-semibold">{page.title}:</span>{' '}
                {wikiSolutions[page.slug] ?? 'Documents implementation details and project decisions.'}
              </li>
            ))}
          </ul>
        </section>

        {loading && <p className="text-gray-400">Loading wiki pages...</p>}
        {error && <p className="text-red-400">{error}</p>}

        <div className="space-y-4">
          {pages.map((page) => (
            <GithubMarkdownSection
              key={page.id}
              title={page.title}
              url={page.url}
              description={page.description}
              markdown={page.markdown}
              wikiBaseUrl={cjeDictionaryWikiBaseUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CJEDictionaryBlog;
