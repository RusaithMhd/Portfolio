import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogCategories, blogPosts } from '../constants/blogData';
import { FiSearch, FiCalendar, FiClock } from 'react-icons/fi';
import { SectionWrapper } from '../hoc';
import { updateSEOMetadata } from './SEOManager';

const BlogListing = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    updateSEOMetadata('/blog', {
      title: "Blog & Insights | MIM Rusaith",
      description: "Read the latest articles on web development, Odoo ERP, and digital marketing by MIM Rusaith.",
      canonical: "https://rusaith.com/blog",
    });
  }, []);

  // Filter posts based on category and search query
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen pt-24 pb-20 relative px-4 sm:px-10 lg:px-16 max-w-[1400px] mx-auto z-10 text-white">
      
      {/* Header Section */}
      <div className="mb-12 text-center lg:text-left">
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-orange-500 text-sm md:text-base uppercase tracking-[0.3em] font-medium mb-4"
        >
          Insights & Tutorials
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-light tracking-tight leading-[1.1] text-white"
        >
          The <span className="font-semibold">Blog</span>
        </motion.h1>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
        {/* Category Tabs */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 w-full lg:w-auto"
        >
          {blogCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm transition-all border ${
                activeCategory === category 
                  ? 'bg-orange-500 border-orange-500 text-white font-medium shadow-[0_0_15px_rgba(249,115,22,0.4)]' 
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white/90'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative w-full lg:w-[300px]"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-white/40" />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#050507] border border-white/10 text-white text-sm rounded-full focus:ring-orange-500 focus:border-orange-500 block pl-10 p-2.5 outline-none transition-all"
          />
        </motion.div>
      </div>

      {/* Blog Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link to={`/blog/${post.slug}`} className="group block h-full">
                  <div className="bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10">
                    
                    {/* Cover Image */}
                    <div className="w-full h-48 sm:h-56 overflow-hidden relative">
                      <div className="absolute top-4 left-4 z-10 bg-[#050507]/80 backdrop-blur-md border border-white/10 text-xs text-orange-500 px-3 py-1 rounded-full uppercase tracking-wider font-medium">
                        {post.category}
                      </div>
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-medium text-white/90 leading-snug mb-3 group-hover:text-orange-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      {/* Meta Footer */}
                      <div className="flex items-center justify-between text-xs text-white/40 border-t border-white/5 pt-4 mt-auto">
                        <div className="flex items-center gap-1.5">
                          <FiCalendar />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FiClock />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center"
            >
              <h3 className="text-2xl text-white/60 font-light">No articles found matching your criteria.</h3>
              <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                className="mt-4 text-orange-500 hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </div>
  );
};

export default BlogListing;
