import { Link } from 'react-router-dom';

const blogPages = [
  {
    id: 'filenfoto',
    title: 'FilenFoto',
    summary: 'Architecture notes and engineering tradeoffs for FilenFoto.',
    path: '/blog/filenfoto',
    available: true,
  },
  {
    id: 'cje-dictionary',
    title: 'CJE Dictionary',
    summary: 'Japanese-focused dictionary parsing notes and implementation details.',
    path: '/blog/cje-dictionary',
    available: true,
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-gray-300 text-lg mb-10">
          Welcome to my rants on cool problem solves.
        </p>

        <div className="space-y-4">
          {blogPages.map((page) => (
            page.available ? (
              <Link key={page.id} to={page.path} className="block">
                <article className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-5 hover:border-zinc-700 transition-colors duration-200">
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <h2 className="text-xl font-semibold text-blue-400">{page.title}</h2>
                    <span className="text-sm text-blue-300">Open page</span>
                  </div>
                  <p className="text-gray-300 mt-2">{page.summary}</p>
                </article>
              </Link>
            ) : (
              <article
                key={page.id}
                className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h2 className="text-xl font-semibold text-blue-400">{page.title}</h2>
                  <span className="text-sm text-gray-500">Coming soon</span>
                </div>
                <p className="text-gray-300 mt-2">{page.summary}</p>
              </article>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;