import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import Home from './src/pages/Home';
import BlogPost from './src/pages/BlogPost';
import AllPosts from './src/pages/AllPosts';

const App: React.FC = () => {
  return (
    <PortfolioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<AllPosts />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </Router>
    </PortfolioProvider>
  );
};

export default App;