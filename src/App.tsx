import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import FilenFotoBlog from './pages/FilenFotoBlog';
import CJEDictionaryBlog from './pages/CJEDictionaryBlog';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/filenfoto" element={<FilenFotoBlog />} />
            <Route path="/blog/cje-dictionary" element={<CJEDictionaryBlog />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;