import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SystemLogs = () => {
  const diagnosticSteps = [
    "Secure_Uplink_Established",
    "Environment_Synchronization_Complete",
    "Neural_Assets_Optimized",
    "Digital_Core_Authenticated"
  ];

  return (
    <div className="font-mono text-[9px] text-accent-cyan/20 mb-12 flex flex-wrap justify-center gap-x-8 gap-y-2 w-full opacity-60">
      {diagnosticSteps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.4, duration: 1, ease: "easeOut" }}
          className="flex items-center gap-2"
        >
          <div className="w-[3px] h-[3px] rounded-full bg-accent-cyan/40" />
          {step}
        </motion.div>
      ))}
    </div>
  );
};

const SleekReveal = ({ subtitle }) => {
  const nameMIM = "MIM".split("");
  const nameRUSAITH = "RUSAITH".split("");

  return (
    <div className="flex flex-col items-center gap-12 mb-20 relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center"
      >
        <motion.span 
          initial={{ opacity: 0, letterSpacing: "15px" }}
          animate={{ opacity: 0.3, letterSpacing: "10px" }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-[9px] text-accent-cyan font-black uppercase mb-10"
        >
          {subtitle}
        </motion.span>
        
        <div className="flex flex-wrap justify-center gap-x-8 md:gap-x-12">
          {/* MIM */}
          <div className="flex overflow-hidden py-2">
            {nameMIM.map((char, i) => (
              <motion.span
                key={`mim-${i}`}
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 1.5, 
                  delay: i * 0.15, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="text-5xl md:text-9xl font-black text-white tracking-tighter inline-block"
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* RUSAITH */}
          <div className="flex overflow-hidden py-2">
            {nameRUSAITH.map((char, i) => (
              <motion.span
                key={`rusaith-${i}`}
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 1.5, 
                  delay: 0.5 + (i * 0.1), 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="text-5xl md:text-9xl font-black bg-cyber-gradient bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,255,255,0.3)] tracking-tighter inline-block"
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Sleek Underline */}
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "120px", opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 2, ease: "easeInOut" }}
        className="h-[1px] bg-gradient-to-r from-transparent via-accent-cyan to-transparent"
      />
    </div>
  );
};

const MatrixRain = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
  const columns = 50;
  
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      {[...Array(columns)].map((_, i) => {
        const duration = Math.random() * 6 + 4;
        const delay = Math.random() * 5;
        const columnContent = Array(20).fill().map(() => 
          characters[Math.floor(Math.random() * characters.length)]
        );

        return (
          <div 
            key={i} 
            className="absolute top-[-100%] flex flex-col text-[9px] font-mono leading-none"
            style={{ 
              left: `${(i / columns) * 100}%`,
            }}
          >
            <motion.div
              animate={{ y: ["0%", "250%"] }}
              transition={{ 
                duration, 
                repeat: Infinity, 
                delay, 
                ease: "linear" 
              }}
              className="flex flex-col"
            >
              {columnContent.map((char, j) => (
                <span 
                  key={j} 
                  className={`${j === columnContent.length - 1 ? "text-white shadow-[0_0_10px_#fff] opacity-100" : "text-accent-cyan opacity-40"}`}
                  style={{ opacity: (j / columnContent.length) * 0.5 }}
                >
                  {char}
                </span>
              ))}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

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
    }, 25);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        filter: "blur(30px)",
        transition: { duration: 1, ease: "easeInOut" }
      }}
      className="fixed inset-0 z-[200] bg-primary flex flex-col items-center justify-center p-6 overflow-hidden"
    >
      {/* Sleek Matrix Rain */}
      <MatrixRain />
      
      {/* Background: Sleek Radial Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.15)_0,transparent_70%)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] [background-size:100px_100px]" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
        {/* Sleek Diagnostic Logs */}
        <SystemLogs />

        {/* Professional Reveal */}
        <SleekReveal subtitle="AUTHORIZED ACCESS" />

        {/* Minimalist Smooth Progress */}
        <div className="w-full max-w-[400px] space-y-10 flex flex-col items-center">
          <div className="w-full relative px-10">
            <div className="h-[1px] bg-white/5 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-accent-cyan opacity-60 shadow-[0_0_20px_#00ffff]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-4 font-mono text-[8px] text-white/20 tracking-[4px] uppercase font-bold">
              <span>Environment_Optimization</span>
              <span>{progress}%</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: progress === 100 ? 1 : 0.3 }}
            transition={{ duration: 1 }}
            className="text-[10px] text-accent-cyan font-black font-mono tracking-[8px] uppercase flex items-center gap-4"
          >
            <div className={`w-1 h-1 rounded-full bg-accent-cyan shadow-neon-cyan ${progress === 100 ? "animate-pulse" : ""}`} />
            {progress < 100 ? "Establishing_Connection" : "Session_Active_Welcome_User"}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
