import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageLoader = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    let current = 0;
    const tick = setInterval(() => {
      const remaining = 100 - current;
      const step = Math.max(0.4, remaining * 0.025);
      current = Math.min(100, current + step);
      setProgress(Math.floor(current));
      if (current >= 100) {
        clearInterval(tick);
        setPhase("done");
        setTimeout(() => onDone?.(), 1200);
      }
    }, 20);
    return () => clearInterval(tick);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-[1000] bg-[#050507] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center gap-12 max-w-lg w-full px-6">
        
        {/* Shattered Name Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-medium tracking-[0.6em] text-white/30 uppercase mb-2">Neural Identity Syncing</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white relative select-none flex gap-1">
            <span className="relative inline-block animate-crack-1">R</span>
            <span className="relative inline-block animate-crack-2">U</span>
            <span className="relative inline-block animate-crack-3">S</span>
            <span className="relative inline-block animate-crack-1">A</span>
            <span className="relative inline-block animate-crack-2">I</span>
            <span className="relative inline-block animate-crack-3">T</span>
            <span className="relative inline-block animate-crack-1">H</span>
          </h1>
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
        </motion.div>

        {/* Scanning Core Container */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Neural Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-orange-500/5 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 border border-white/5 rounded-full border-dashed"
          />
          
          <div className="absolute inset-0 border border-orange-500/20 rounded-full animate-ping opacity-20" />
          
          {/* Scanner Field */}
          <div className="absolute inset-0 overflow-hidden rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <motion.div 
              animate={{ top: ['-10%', '110%', '-10%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_20px_rgba(249,115,22,0.8)] z-20"
            />
          </div>

          {/* Progress Percentage */}
          <div className="relative z-30 flex flex-col items-center">
            <span className="text-4xl font-black text-white tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              {progress}<span className="text-orange-500 text-sm ml-0.5">%</span>
            </span>
          </div>
        </div>

        {/* Status HUD Log */}
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,1)]" />
            <AnimatePresence mode="wait">
              <motion.p 
                key={progress > 90 ? "ready" : "sync"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[9px] uppercase tracking-[0.4em] text-white/70 font-bold"
              >
                {progress > 90 ? "Diagnostic Complete" : "System Diagnostic"}
              </motion.p>
            </AnimatePresence>
          </div>
          
          <div className="h-5 overflow-hidden flex flex-col items-center">
            <motion.p 
              animate={{ y: [0, -20, -40, -60, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-medium text-center"
            >
              Initializing Core Interface<br />
              Syncing Neural Node Matrix<br />
              Calibrating Aesthetic Filters<br />
              Deploying Premium Assets
            </motion.p>
          </div>

          {/* Bottom Progress Bar HUD */}
          <div className="w-64 h-[1px] bg-white/10 relative mt-4">
            <motion.div 
              style={{ scaleX: progress / 100 }}
              className="absolute inset-0 bg-orange-500 origin-left shadow-[0_0_15px_rgba(249,115,22,0.6)]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PageLoader;
