import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] bg-primary flex flex-col items-center justify-center"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Logo/Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white-100 tracking-tighter uppercase">
            MIM <span className="bg-cyber-gradient bg-clip-text text-transparent drop-shadow-neon-cyan">RUSAITH</span>
          </h1>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-[200px] h-[1px] bg-white/5 overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-cyan-gradient shadow-neon-cyan"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Text */}
        <motion.span 
          className="mt-4 text-[10px] text-white/20 font-mono tracking-[4px] uppercase"
        >
          System Initializing • {progress}%
        </motion.span>
      </div>

      {/* Decorative Shards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white/10 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              y: [0, -200], 
              opacity: [0, 0.5, 0] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              delay: i * 0.3 
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Loader;
