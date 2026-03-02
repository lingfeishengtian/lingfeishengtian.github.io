import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchSelectedWikiPages,
  fetchWikiMarkdown,
  type WikiPage,
} from '../utils/wikiClient';
import {
  filenFotoWikiBaseUrl,
  generateDescription,
  preprocessWikiLinks,
} from '../utils/wikiMarkdown';
import GithubMarkdownSection from '../components/GithubMarkdownSection';

interface WikiPageWithContent extends WikiPage {
  description: string;
  markdown: string;
}

const wikiSolutions: Record<string, string> = {
  'Data-Volatility': 'Explains how data consistency is maintained while balancing cache eviction, working sets, and display stability.',
  'Filen-Integration': 'Describes the Swift↔Rust FFI boundary and why a low-level integration path was chosen.',
  'SwiftUI-and-UIKit-Interoperability': 'Covers practical interoperability patterns and why UIKit is used for tighter control in complex flows.',
  Thumbnails: 'Breaks down thumbnail storage/decoding trade-offs and optimizations for smooth scrolling performance.',
  'UIKit-Photo-Gallery': 'Details gallery architecture, state propagation, and transition animation techniques in UIKit.',
};

const FilenFotoBlog = () => {
  const [pages, setPages] = useState<WikiPageWithContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPages = async () => {
      try {
        setLoading(true);
        setError(null);

        const selectedPages = await fetchSelectedWikiPages();
        const pagesWithMarkdown = await Promise.all(
          selectedPages.map(async (page) => {
            const rawMarkdown = await fetchWikiMarkdown(page.markdownUrl);
            const markdown = preprocessWikiLinks(rawMarkdown, filenFotoWikiBaseUrl);
            return {
              ...page,
              markdown,
              description: generateDescription(markdown),
            };
          })
        );

        setPages(pagesWithMarkdown);
      } catch {
        setError('Could not load wiki pages right now.');
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

        <h1 className="text-4xl md:text-5xl font-bold mb-4">FilenFoto</h1>
        <p className="text-gray-300 text-lg mb-8">
          FilenFoto is a high-performance photo application focused on data integrity,
          responsive UI, and efficient media processing. The sections below are pulled
          from the project wiki and grouped by the specific engineering problem each
          page solves.
        </p>

        <section className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-5 mb-8">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">What each wiki page solves</h2>
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
              wikiBaseUrl={filenFotoWikiBaseUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilenFotoBlog;
