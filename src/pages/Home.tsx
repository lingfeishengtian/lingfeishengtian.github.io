import { useEffect, useState } from 'react';

const Home = () => {
  const [showName, setShowName] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    // Animate entrance
    setTimeout(() => setShowName(true), 500);
    setTimeout(() => setShowDescription(true), 1500);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black">
      {/* Animated Name */}
      <div className={`text-6xl md:text-8xl font-bold mb-8 transition-all duration-1000 ease-out ${showName ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        Hunter Han
      </div>
      
      {/* Animated Description */}
      <div className={`text-xl md:text-2xl text-gray-300 max-w-2xl text-center transition-all duration-1000 ease-out delay-300 ${showDescription ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        Software Developer
      </div>
      
      {/* Navigation */}
      <div className="mt-16 flex space-x-8">
        <a href="/blog" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">Blog</a>
        <a href="/about" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">About</a>
      </div>
    </div>
  );
};

export default Home;