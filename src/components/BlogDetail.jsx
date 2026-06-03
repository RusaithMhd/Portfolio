import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../constants/blogData';
import { FiArrowLeft, FiCalendar, FiClock, FiShare2, FiTwitter, FiLinkedin } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { updateSEOMetadata } from './SEOManager';
import { rusaith2 } from '../assets';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const post = blogPosts.find((p) => p.slug === slug);
  
  // Scroll to top on load and update SEO
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (post) {
      updateSEOMetadata(`/blog/${post.slug}`, {
        title: `${post.title} | Blog | MIM Rusaith`,
        description: post.excerpt,
        canonical: `https://rusaith.com/blog/${post.slug}`,
      });
    }
  }, [slug, post]);

  if (!post) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center text-white bg-[#050507]">
        <h1 className="text-4xl font-bold mb-4">404 - Article Not Found</h1>
        <button onClick={() => navigate('/blog')} className="text-orange-500 hover:underline">
          Return to Blog
        </button>
      </div>
    );
  }

  // Related Posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // Social Share URLs
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = encodeURIComponent(`Check out this article: ${post.title} by MIM Rusaith`);
  const encodedUrl = encodeURIComponent(currentUrl);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodeURIComponent(post.title)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${shareText}%20${encodedUrl}`
  };

  // Extract headings for Table of Contents
  const headings = post.content
    .split('\\n')
    .filter(line => line.startsWith('## '))
    .map(line => ({
      title: line.replace('## ', '').trim(),
      id: line.replace('## ', '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }));

  return (
    <div className="w-full min-h-screen pt-24 pb-20 bg-[#050507] text-white">
      
      {/* Hero Header */}
      <div className="max-w-[1000px] mx-auto px-4 sm:px-10">
        <Link to="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-orange-500 transition-colors text-sm mb-8 group">
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Link>
        
        <div className="mb-8">
          <span className="text-orange-500 text-xs font-semibold uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            {post.category}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white/95 leading-[1.15] mb-6">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-sm text-white/50 border-b border-white/10 pb-8 mb-10">
          <div className="flex items-center gap-3">
            <img src={rusaith2} alt="MIM Rusaith" className="w-10 h-10 rounded-full border border-white/20 bg-black/50 object-cover" />
            <div>
              <p className="text-white/80 font-medium">MIM Rusaith</p>
              <p className="text-[10px] uppercase tracking-wider">Author</p>
            </div>
          </div>
          <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <FiCalendar /> {post.date}
          </div>
          <div className="flex items-center gap-2">
            <FiClock /> {post.readTime}
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-10 mb-16">
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-60 z-10" />
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 flex flex-col lg:flex-row gap-12 relative">
        
        {/* Left Sidebar: Social Share (Sticky) */}
        <div className="hidden lg:flex w-[60px] flex-shrink-0 flex-col gap-4">
          <div className="sticky top-32 flex flex-col gap-4 items-center border border-white/10 p-3 rounded-full bg-white/5 backdrop-blur-md">
            <span className="text-[10px] uppercase tracking-widest text-white/40 mb-2 rotate-180" style={{ writingMode: 'vertical-rl' }}>Share</span>
            <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center transition-colors">
              <FiTwitter />
            </a>
            <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-colors">
              <FiLinkedin />
            </a>
            <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors text-lg">
              <span className="font-bold text-sm">W</span>
            </a>
          </div>
        </div>

        {/* Markdown Content */}
        <div className="flex-1 min-w-0 max-w-[800px]">
          <div className="prose prose-invert prose-lg prose-orange max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white/90 prose-strong:font-semibold
            prose-ul:list-disc prose-ul:pl-6 prose-ul:text-white/70 prose-li:mb-2
            prose-code:bg-white/10 prose-code:text-orange-300 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-[#0d0d12] prose-pre:border prose-pre:border-white/10 prose-pre:p-0 prose-pre:overflow-hidden">
            
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug]}
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      {...props}
                      children={String(children).replace(/\n$/, '')}
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent' }}
                    />
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {post.content}
            </ReactMarkdown>

          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-3">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                #{tag}
              </span>
            ))}
          </div>

          {/* Mobile Share */}
          <div className="mt-8 lg:hidden flex items-center gap-4 border border-white/10 p-4 rounded-2xl bg-white/5">
            <span className="text-sm text-white/60 font-medium">Share:</span>
            <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#1DA1F2] transition-colors"><FiTwitter size={20} /></a>
            <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#0A66C2] transition-colors"><FiLinkedin size={20} /></a>
          </div>
        </div>

        {/* Right Sidebar: Table of Contents */}
        {headings.length > 0 && (
          <div className="hidden xl:block w-[250px] flex-shrink-0">
            <div className="sticky top-32 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-white/80 mb-4">On this page</h4>
              <ul className="flex flex-col gap-3">
                {headings.map(heading => (
                  <li key={heading.id}>
                    <a 
                      href={`#${heading.id}`}
                      className="text-sm text-white/50 hover:text-orange-500 transition-colors line-clamp-2"
                    >
                      {heading.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-10 mt-24">
          <h2 className="text-2xl font-bold mb-8 text-white/90 flex items-center gap-3">
            <span className="w-8 h-px bg-orange-500 inline-block"></span>
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(related => (
              <Link key={related.id} to={`/blog/${related.slug}`} className="group">
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-colors h-full flex flex-col">
                  <div className="h-40 overflow-hidden relative">
                    <img src={related.coverImage} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <span className="text-xs text-orange-500 font-medium uppercase tracking-wider mb-2">{related.category}</span>
                    <h3 className="text-lg font-medium text-white/90 leading-snug group-hover:text-orange-400 transition-colors mb-2">
                      {related.title}
                    </h3>
                    <div className="mt-auto flex items-center justify-between text-[11px] text-white/40">
                      <span>{related.date}</span>
                      <span>{related.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      
    </div>
  );
};

export default BlogDetail;
