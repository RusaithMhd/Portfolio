import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import { personalInfo } from "../constants";
import MagneticButton from "./MagneticButton";
import FloatingCard from "./FloatingCard";
import { FiUser, FiZap, FiCode, FiLayers } from "react-icons/fi";

const roles = ["Graphic Designer", "Web Developer", "IT Executive", "Creative Engineer"];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen mx-auto flex items-center justify-center overflow-hidden pt-36 pb-28 md:pt-24 md:pb-10 bg-primary">
      {/* Dynamic Grid Foundation */}
      <div className="absolute inset-0 z-0">
        <div className="grid-background absolute inset-0 opacity-20" />
        <div className="grid-glow" />
      </div>

      {/* Floating Glass Shards */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute glass pointer-events-none z-10 opacity-10 hidden md:block"
          initial={{ 
            x: Math.random() * 1000 - 500, 
            y: Math.random() * 1000 - 500, 
            rotate: Math.random() * 360 
          }}
          animate={{ 
            y: [0, 20, 0], 
            rotate: [0, 10, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ 
            duration: 5 + i, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          style={{
            width: `${20 + i * 10}px`,
            height: `${20 + i * 10}px`,
            borderRadius: "4px",
            background: "rgba(255,255,255,0.1)"
          }}
        />
      ))}

      <div className={`${styles.paddingX} max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-16 z-10 w-full`}>
        
        {/* Left Side: Text Content */}
        <div className="flex-1 text-center lg:text-left mt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 glass rounded-full mb-4 md:mb-6 border-accent-cyan/20 bg-accent-cyan/5 shadow-neon-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
              <span className="text-[8px] sm:text-[9px] md:text-[10px] text-accent-cyan font-bold uppercase tracking-[2px] sm:tracking-[3px] whitespace-nowrap">Protocol: Midnight Cyan</span>
            </div>

            <h1 className="text-white-100 text-4xl sm:text-5xl md:text-8xl font-black mb-3 md:mb-6 tracking-tighter leading-[1.1] uppercase">
              MIM <br />
              <span className="bg-cyber-gradient bg-clip-text text-transparent inline-block hover:scale-105 transition-all duration-500 cursor-default drop-shadow-neon-cyan">Rusaith</span>
            </h1>
            
            <div className="h-[30px] sm:h-[40px] md:h-[50px] mb-6 md:mb-8">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={roles[roleIndex]}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="text-lg sm:text-xl md:text-3xl text-white font-bold uppercase tracking-[3px] sm:tracking-[5px]"
                >
                  {roles[roleIndex]}
                </motion.h3>
              </AnimatePresence>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <MagneticButton 
                onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}
                className="!bg-accent-cyan !text-black border-none uppercase font-black tracking-[2px] sm:tracking-widest !px-6 !py-3 sm:!px-8 sm:!py-4 hover:shadow-neon-cyan shadow-xl text-xs sm:text-sm w-full sm:w-auto"
              >
                Access Projects
              </MagneticButton>
              <MagneticButton 
                onClick={() => window.open(publicUrls.resume, "_blank")}
                className="!bg-transparent !text-white-100 border border-white/10 hover:border-accent-purple/40 uppercase font-black tracking-[2px] sm:tracking-widest !px-6 !py-3 sm:!px-8 sm:!py-4 hover:bg-accent-purple/5 shadow-xl hover:shadow-neon-purple text-xs sm:text-sm w-full sm:w-auto"
              >
                Fetch Credentials
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Monochromatic Identity Card */}
        <div className="flex-1 flex justify-center items-center mt-10 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative w-full max-w-[320px] md:max-w-[400px]"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-white/5 blur-[80px] md:blur-[120px] rounded-full animate-pulse-slow" />
            
            <FloatingCard className="border-white/10 backdrop-blur-3xl overflow-hidden group p-8 bg-white/5">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 md:mb-8 glass flex items-center justify-center border-white/5">
                <FiUser className="text-9xl text-white/10 group-hover:text-white/20 transition-all duration-700 group-hover:scale-110" />
                
                {/* ID Tag */}
                <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 glass px-2 py-1 md:px-3 md:py-1 rounded-lg border-white/20">
                  <span className="text-[8px] md:text-[10px] text-white font-mono opacity-40">MIM_RUSA_V2</span>
                </div>
              </div>

              <div className="flex flex-col items-center text-center">
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-4">Muhammathu Rusaith</h3>
                <div className="flex gap-4">
                  <FiCode className="text-xl text-white/40 hover:text-white transition-colors" title="Development" />
                  <FiLayers className="text-xl text-white/40 hover:text-white transition-colors" title="Design" />
                  <FiZap className="text-xl text-white/40 hover:text-white transition-colors" title="IT Infrastructure" />
                </div>
              </div>
            </FloatingCard>
          </motion.div>
        </div>
      </div>

      {/* Dynamic Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 md:bottom-10 w-full flex flex-col justify-center items-center z-10 gap-1 md:gap-2 pointer-events-none"
      >
        <span className="text-[8px] md:text-[10px] text-white font-bold uppercase tracking-[3px] md:tracking-[4px] opacity-20">Scroll to Explore</span>
        <a href="#about" className="pointer-events-auto">
          <div className="w-[24px] h-[40px] md:w-[30px] md:h-[50px] rounded-full border border-white/10 flex justify-center items-start p-1.5 md:p-2 hover:border-white transition-colors group">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1 rounded-full bg-white opacity-40 group-hover:opacity-100"
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
