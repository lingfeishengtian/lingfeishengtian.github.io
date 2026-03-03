import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const Blog = lazy(() => import('./pages/Blog'));
const FilenFotoBlog = lazy(() => import('./pages/FilenFotoBlog'));
const CJEDictionaryBlog = lazy(() => import('./pages/CJEDictionaryBlog'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <main>
          <Suspense fallback={<div className="p-6 text-gray-300">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/filenfoto" element={<FilenFotoBlog />} />
              <Route path="/blog/cje-dictionary" element={<CJEDictionaryBlog />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;