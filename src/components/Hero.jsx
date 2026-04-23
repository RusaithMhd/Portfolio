import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { styles } from "../styles";
import { personalInfo, publicUrls } from "../constants";
import MagneticButton from "./MagneticButton";
import FloatingCard from "./FloatingCard";
import { FiZap, FiCode, FiLayers, FiShield, FiCpu, FiGlobe } from "react-icons/fi";
import { rusaith } from "../assets";

const roles = ["Graphic Designer", "Web Developer", "IT Executive", "Creative Developer"];

const ScrambleText = ({ text, className, delay = 0 }) => {
  const [displayText, setDisplayText] = useState(text);
  const symbols = "@#$%&*01<>{}[]-_+";

  useEffect(() => {
    let iteration = 0;
    let interval = null;

    const startScramble = () => {
      clearInterval(interval);
      iteration = 0;

      interval = setInterval(() => {
        setDisplayText(
          text.split("").map((letter, index) => {
            if (index < iteration) return text[index];
            return symbols[Math.floor(Math.random() * symbols.length)];
          }).join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }
        iteration += 1 / 3;
      }, 30);
    };

    const timeout = setTimeout(startScramble, delay * 1000);
    const repeatInterval = setInterval(startScramble, 15000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
      clearInterval(repeatInterval);
    };
  }, [text, delay]);

  return <span className={className}>{displayText}</span>;
};

const HackerUIElement = ({ delay, className, children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: [0.2, 0.5, 0.2], scale: 1 }}
    transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
    className={`absolute pointer-events-none z-20 ${className}`}
  >
    {children}
  </motion.div>
);

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  // Parallax Controls
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    
    if (clientX === undefined || clientY === undefined) return;

    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    const handleScroll = () => {
      if (window.innerWidth >= 1024) return;
      const scrollY = window.scrollY;
      const progress = Math.min(1, Math.max(0, scrollY / window.innerHeight));
      const offset = progress - 0.5;
      mouseY.set(offset * 0.8);
      mouseX.set(offset * -0.3);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      className="relative w-full min-h-screen flex items-center lg:justify-center overflow-x-hidden pt-36 pb-40 md:pt-24 md:pb-32 bg-primary"
    >
      {/* Dynamic Grid Foundation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="grid-background absolute inset-0 opacity-20" />
        <div className="grid-glow" />
      </div>

      <div className={`${styles.paddingX} max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-4 sm:gap-8 md:gap-16 z-10 w-full`}>

        {/* Left Side: Text Content */}
        <div className="flex-1 text-center lg:text-left mt-0 lg:pt-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6 border-accent-cyan/20 bg-accent-cyan/5 shadow-neon-cyan max-w-full overflow-hidden">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse shrink-0" />
              <span className="text-[10px] text-accent-cyan font-black uppercase tracking-[1px] sm:tracking-[4px] truncate">SYSTEM_IDENTIFIED: RUSAITH_V4.2</span>
            </div>

            <h1 className="text-white text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter leading-[0.95] uppercase relative group max-w-full text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4">
                <ScrambleText text="MIM" className="block text-accent-cyan" delay={0.5} />
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="hidden xs:block"
                >
                  <FiZap className="text-2xl sm:text-4xl text-accent-cyan drop-shadow-neon-cyan opacity-40 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start">
                <span className="bg-cyber-gradient bg-clip-text text-transparent inline-block drop-shadow-neon-cyan">
                  <ScrambleText text="R" className="text-accent-cyan font-serif" delay={0.8} />
                  <ScrambleText text="usaith" delay={1} />
                </span>
              </div>
            </h1>

            <div className="h-[50px] mb-4">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={roles[roleIndex]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl md:text-3xl text-accent-cyan font-bold uppercase tracking-[6px]"
                >
                  {roles[roleIndex]}
                </motion.h3>
              </AnimatePresence>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-white/50 text-xs sm:text-sm md:text-base max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed font-light px-4 sm:px-0"
            >
              Architecting high-performance digital ecosystems. Specializing in cyber-premium web development, brand engineering, and immersive user experiences.
            </motion.p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <MagneticButton
                onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}
                className="!bg-accent-cyan !text-black border-none uppercase font-black tracking-[2px] !px-8 !py-4 hover:shadow-neon-cyan text-sm w-full sm:w-auto relative overflow-hidden group"
              >
                <span className="relative z-10">Access Projects</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
              </MagneticButton>
              <MagneticButton
                onClick={() => window.open(publicUrls.resume, "_blank")}
                className="!bg-black/50 !text-white border border-white/10 hover:border-accent-cyan/40 uppercase font-black tracking-[2px] !px-8 !py-4 hover:bg-accent-cyan/10 text-sm w-full sm:w-auto backdrop-blur-md"
              >
                Fetch Credentials
              </MagneticButton>
            </div>

            {/* System Status / HUD Dashboard below buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 border-t border-white/5 pt-10 w-full max-w-2xl mx-auto lg:mx-0 text-center lg:text-left"
            >
              {/* Row 1 */}
              <div className="flex flex-col items-center lg:items-start gap-3 min-w-0">
                <span className="text-[10px] sm:text-[11px] text-white/40 font-mono uppercase tracking-[2px] sm:tracking-[4px] truncate">Global_Uplink</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse shadow-neon-cyan shrink-0" />
                  <span className="text-xs sm:text-sm font-black text-white tracking-widest truncate">ONLINE</span>
                </div>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-3 min-w-0">
                <span className="text-[10px] sm:text-[11px] text-white/40 font-mono uppercase tracking-[2px] sm:tracking-[4px] truncate">Core_Stack</span>
                <div className="flex items-center gap-3 text-accent-cyan/80 text-sm sm:text-base">
                  <FiCode className="shrink-0" />
                  <FiLayers className="shrink-0" />
                  <FiCpu className="shrink-0" />
                </div>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-3 min-w-0">
                <span className="text-[10px] sm:text-[11px] text-white/40 font-mono uppercase tracking-[2px] sm:tracking-[4px] truncate">Neural_Sync</span>
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ scaleY: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1 h-4 bg-accent-cyan/60 rounded-full origin-bottom shrink-0"
                    />
                  ))}
                  <span className="text-[10px] sm:text-xs font-black text-accent-cyan ml-2 truncate">99.8%</span>
                </div>
              </div>
              
              {/* Row 2 */}
              <div className="flex flex-col items-center lg:items-start gap-3 min-w-0">
                <span className="text-[10px] sm:text-[11px] text-white/40 font-mono uppercase tracking-[2px] sm:tracking-[4px] truncate">Security</span>
                <div className="flex items-center gap-2 text-green-400">
                  <FiShield className="text-xs sm:text-base shrink-0" />
                  <span className="text-[10px] sm:text-xs font-black tracking-widest drop-shadow-[0_0_8px_rgba(74,222,128,0.5)] truncate">ENCRYPTED</span>
                </div>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-3 min-w-0">
                <span className="text-[10px] sm:text-[11px] text-white/40 font-mono uppercase tracking-[2px] sm:tracking-[4px] truncate">Active_Nodes</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-black text-accent-cyan tracking-widest shrink-0">12</span>
                  <span className="text-[9px] sm:text-[10px] text-white/60 font-black tracking-widest truncate">DEPLOYED</span>
                </div>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-3 min-w-0">
                <span className="text-[10px] sm:text-[11px] text-white/40 font-mono uppercase tracking-[2px] sm:tracking-[4px] truncate">Sys_Load</span>
                <div className="w-full max-w-[100px] sm:max-w-[120px] h-1.5 bg-white/5 rounded-full overflow-hidden mt-1 shrink-0">
                  <motion.div 
                    animate={{ scaleX: [0.3, 0.8, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full bg-accent-purple shadow-neon-purple origin-left"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex flex-col items-center lg:items-start gap-3 min-w-0">
                <span className="text-[10px] sm:text-[11px] text-white/40 font-mono uppercase tracking-[2px] sm:tracking-[4px] truncate">Latency</span>
                <div className="flex items-center gap-2 text-white">
                  <span className="text-xs sm:text-sm font-black tracking-widest text-accent-cyan shrink-0">14</span>
                  <span className="text-[9px] sm:text-[10px] text-white/60 font-black tracking-widest shrink-0">MS</span>
                  <motion.div 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-accent-cyan ml-1 shadow-neon-cyan shrink-0"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-3 min-w-0">
                <span className="text-[10px] sm:text-[11px] text-white/40 font-mono uppercase tracking-[2px] sm:tracking-[4px] truncate">Clearance</span>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded border border-accent-purple/40 bg-accent-purple/10 shadow-[0_0_10px_rgba(139,92,246,0.2)] shrink-0 max-w-full overflow-hidden">
                    <span className="text-[9px] sm:text-[10px] font-black text-accent-purple tracking-widest truncate block">LEVEL 9</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-3 min-w-0">
                <span className="text-[10px] sm:text-[11px] text-white/40 font-mono uppercase tracking-[2px] sm:tracking-[4px] truncate">Data_Stream</span>
                <span className="text-[9px] sm:text-[10px] font-mono text-accent-cyan opacity-60 tracking-widest animate-pulse truncate">0x7D2E</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side: Cinematic Hacker Portrait */}
        <div className="flex-1 flex justify-center lg:justify-end items-center mt-12 lg:mt-0 perspective-1000 w-full">
          <motion.div
            style={{ rotateX, rotateY }}
            className="relative w-full max-w-[280px] xs:max-w-[320px] md:max-w-[500px] lg:max-w-[600px]"
          >
            {/* Ambient Background Glows */}
            <div className="absolute -inset-20 bg-accent-cyan/10 blur-[100px] rounded-full animate-pulse-slow z-0" />
            <div className="absolute -inset-10 bg-accent-purple/5 blur-[80px] rounded-full animate-pulse-slow z-0" style={{ animationDelay: '2s' }} />

            <FloatingCard className="relative border-white/10 backdrop-blur-xl md:backdrop-blur-3xl overflow-hidden p-3 bg-white/5 rounded-[3rem] shadow-2xl shadow-black/80">

              {/* Image Container with Hacker Layers - Ultra High Quality */}
              <div className="relative w-full min-h-[400px] md:min-h-[500px] aspect-[2/3] rounded-[2.5rem] overflow-hidden glass border-white/10 shadow-inner flex-shrink-0">

                {/* User Portrait - High Contrast / Cinematic */}
                <motion.img
                  src={rusaith}
                  alt="Rusaith"
                  className="w-full h-full object-cover object-top brightness-[1.15] contrast-[1.25] saturate-[1.1] transition-all duration-700"
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(0,255,255,0.3)) hue-rotate(-5deg)"
                  }}
                />

                {/* High-Quality Cinematic Grain Layer */}
                <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none z-20"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E")' }} />

                {/* Cyber Tint Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/20 opacity-90 z-10" />

                {/* Drifting Holographic Code Strings */}
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden opacity-30">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: "-100%" }}
                      animate={{ y: "200%" }}
                      transition={{
                        duration: 8 + Math.random() * 5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5
                      }}
                      className="absolute text-[8px] font-mono text-accent-cyan whitespace-nowrap"
                      style={{ left: `${10 + i * 20}%` }}
                    >
                      {Array(20).fill().map(() => Math.round(Math.random())).join('\n')}
                    </motion.div>
                  ))}
                </div>

                {/* Pulsing Targeting Ring */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-accent-cyan/20 rounded-full z-20 flex items-center justify-center pointer-events-none"
                >
                  <div className="w-1 h-1 bg-accent-cyan rounded-full shadow-neon-cyan" />
                  <div className="absolute inset-0 border-t-2 border-accent-cyan/40 rounded-full animate-spin-slow" />
                </motion.div>

                {/* Animated Scanline - Sharper */}
                <motion.div
                  animate={{ top: ["-100%", "200%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent-cyan to-transparent shadow-[0_0_20px_#00ffff] z-30"
                />

                {/* Hacker UI Overlay Components - Enhanced Glitch Effect */}
                <HackerUIElement delay={0} className="top-12 left-10">
                  <motion.div
                    animate={{ x: [0, -2, 2, 0], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                    className="glass-morphism p-3 rounded-xl border-accent-cyan/30 bg-accent-cyan/5 backdrop-blur-xl flex flex-col gap-2 shadow-neon-cyan/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse shadow-neon-cyan" />
                      <span className="text-[9px] text-accent-cyan font-mono tracking-[4px] uppercase font-black">TRACE_AUTH</span>
                    </div>
                    <div className="w-20 h-1 bg-accent-cyan/10 rounded-full overflow-hidden">
                      <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="w-full h-full bg-accent-cyan"
                      />
                    </div>
                  </motion.div>
                </HackerUIElement>

                <HackerUIElement delay={2} className="bottom-24 right-12">
                  <div className="flex flex-col items-end gap-1.5 font-mono text-[9px] text-white/40 text-right group-hover:text-accent-cyan/60 transition-colors">
                    <span className="text-accent-cyan/80 font-black">X_COORD: 124.9</span>
                    <span className="text-accent-purple/80 font-black">Y_COORD: 882.1</span>
                    <div className="h-px w-24 bg-gradient-to-l from-accent-cyan/40 to-transparent my-1" />
                    <span className="text-[7px] tracking-[2px]">SECURE_UPLINK_ESTABLISHED</span>
                  </div>
                </HackerUIElement>

                {/* Dynamic Floating Data Points */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 5
                    }}
                    className="absolute w-1 h-1 bg-accent-cyan rounded-full z-20 shadow-neon-cyan"
                    style={{
                      top: `${Math.random() * 80 + 10}%`,
                      left: `${Math.random() * 80 + 10}%`
                    }}
                  />
                ))}

                {/* Facial Recognition Target Box */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[60%] aspect-square border-2 border-accent-cyan/30 rounded-xl z-20 pointer-events-none"
                >
                  {/* Target Corners */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 border-t-4 border-l-4 border-accent-cyan shadow-neon-cyan" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 border-t-4 border-r-4 border-accent-cyan shadow-neon-cyan" />
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-4 border-l-4 border-accent-cyan shadow-neon-cyan" />
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-4 border-r-4 border-accent-cyan shadow-neon-cyan" />

                  {/* Telemetry Data */}
                  <div className="absolute -top-10 left-0 flex flex-col gap-1">
                    <span className="text-[7px] text-accent-cyan font-mono font-black tracking-widest animate-pulse">FACIAL_ID: MATCH_FOUND</span>
                    <span className="text-[7px] text-white/40 font-mono">ACCURACY: 99.98%</span>
                  </div>
                </motion.div>

                {/* Fingerprint Verification Module - MOVED TO TOP RIGHT */}
                <HackerUIElement delay={1} className="top-10 right-10">
                  <div className="flex items-center gap-4 glass-morphism p-3 rounded-2xl border-accent-cyan/30 bg-accent-cyan/10 backdrop-blur-2xl shadow-neon-cyan/20 scale-90 md:scale-100">
                    <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                      {/* Fingerprint SVG */}
                      <svg viewBox="0 0 24 24" className="w-full h-full text-accent-cyan opacity-80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 10a2 2 0 0 0-2 2M17.67 7A10 10 0 0 0 14.9 4.34M14 4.05V3M22 12c0-3.07-1.39-5.81-3.6-7.66M12 2C6.48 2 2 6.48 2 12M2 12c0 4.69 3.23 8.62 7.6 9.66M12 22a10 10 0 0 0 7.1-3M7 13a5 5 0 0 1 5-5M15.31 11.28A5 5 0 0 1 12 17" />
                        <path d="M12 10a2 2 0 0 0-2 2M7 13a5 5 0 0 1 5-5M15.31 11.28A5 5 0 0 1 12 17M17.67 7A10 10 0 0 0 14.9 4.34" />
                      </svg>

                      {/* Scanning Laser */}
                      <motion.div
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-0 w-full h-[2px] bg-accent-cyan shadow-neon-cyan z-10"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                        <span className="text-[7px] md:text-[8px] text-accent-cyan font-black tracking-[2px] uppercase">Bio_Match</span>
                      </div>
                      <span className="text-[9px] md:text-[10px] text-white font-black uppercase tracking-widest mt-0.5">VERIFIED</span>
                    </div>
                  </div>
                </HackerUIElement>


                {/* Vertical Role Bar - Optimized for Mobile */}
                <div className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 z-30 flex flex-col gap-3 md:gap-4 scale-75 md:scale-100">
                  {[
                    { icon: FiCode, label: "WEB DEVELOPER", color: "cyan" },
                    { icon: FiLayers, label: "CREATIVE", color: "purple" },
                    { icon: FiShield, label: "SECURITY", color: "cyan" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-3 group/role cursor-default"
                    >
                      <div className="p-3 md:p-4 glass rounded-xl md:rounded-2xl border-white/10 bg-black/40 backdrop-blur-xl group-hover/role:border-accent-cyan/40 transition-all shadow-xl">
                        <item.icon className={`text-lg md:text-xl text-white/30 group-hover/role:text-accent-${item.color} transition-all`} />
                      </div>
                      <span className="text-[8px] text-white/0 md:group-hover/role:text-white/60 font-black tracking-widest uppercase transition-all duration-300">
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Corner Frame Accents - Sharper Design */}
                <div className="absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 border-accent-cyan/40 rounded-tr-3xl pointer-events-none z-20" />
                <div className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-accent-cyan/40 rounded-bl-3xl pointer-events-none z-20" />
              </div>

              {/* Connecting Visual Element */}
              <div className="w-full flex justify-center items-center mt-2 -mb-2 z-10 relative">
                <div className="w-[1px] h-6 bg-gradient-to-b from-accent-cyan/50 to-transparent" />
                <motion.div
                  animate={{ y: [0, 24, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 w-1 h-1 bg-accent-cyan rounded-full shadow-neon-cyan"
                />
              </div>

              {/* Identity Name Overlay - CENTERED BELOW PHOTO */}
              <div className="flex justify-center mt-4 mb-2 w-full z-30">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-morphism px-4 py-3 md:px-6 md:py-4 rounded-[1.5rem] md:rounded-[2rem] border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl flex flex-col items-center text-center overflow-hidden w-[90%] md:w-max"
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-accent-cyan"
                    />
                    <span className="text-[8px] md:text-[10px] text-accent-cyan font-black tracking-[4px] md:tracking-[6px] uppercase opacity-60">Identity_Verified</span>
                  </div>

                  <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter leading-tight flex flex-wrap justify-center gap-[2px]">
                    {"Rusaith".split("").map((letter, i) => (
                      <motion.span
                        key={i}
                        animate={{
                          opacity: [0, 1],
                          y: [10, 0]
                        }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.05,
                          repeat: Infinity,
                          repeatDelay: 10,
                          ease: "easeOut"
                        }}
                        className="inline-block relative text-shadow-neon-cyan"
                      >
                        {letter === " " ? "\u00A0" : letter}

                        {/* Sublte Glitch Overlay */}
                        <motion.span
                          animate={{
                            opacity: [0, 0.5, 0],
                            x: [0, -2, 2, 0]
                          }}
                          transition={{
                            duration: 0.2,
                            repeat: Infinity,
                            repeatDelay: Math.random() * 5 + 2
                          }}
                          className="absolute inset-0 text-accent-cyan blur-[2px] pointer-events-none"
                        >
                          {letter}
                        </motion.span>
                      </motion.span>
                    ))}
                  </h3>

                  {/* Progress Bar under name */}
                  <div className="w-full h-[1px] bg-white/5 mt-3 relative overflow-hidden">
                    <motion.div
                      animate={{ left: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Minimalist Card Footer */}
              <div className="mt-4 px-8 pb-6 flex justify-between items-center opacity-40">
                <div className="flex items-center gap-3">
                  <FiCpu className="text-accent-cyan text-lg animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest uppercase">System_Auth_Active</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-3 bg-accent-cyan/20 rounded-full" />)}
                </div>
              </div>

            </FloatingCard>

            {/* Interactive HUD Modules - External to Card */}
            <motion.div
              style={{
                x: useTransform(mouseX, [-0.5, 0.5], [40, -40]),
                y: useTransform(mouseY, [-0.5, 0.5], [40, -40])
              }}
              className="absolute -right-20 top-1/4 hidden xl:block z-40"
            >
              <div className="glass p-5 rounded-3xl border-accent-cyan/20 bg-accent-cyan/5 backdrop-blur-2xl shadow-2xl">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <motion.div
                        key={i}
                        animate={{ height: [12, 24, 12] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1.5 bg-accent-cyan/30 rounded-full"
                      />
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] text-accent-cyan font-mono tracking-widest uppercase font-black">Neural_Sync</span>
                    <span className="text-xs text-white/80 font-mono">99.8%</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Dynamic Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 md:bottom-8 w-full flex flex-col justify-center items-center z-10 gap-2 pointer-events-none"
      >
        <span className="text-[10px] text-white/20 font-black uppercase tracking-[5px]">Initialize_Discovery</span>
        <a href="#about" className="pointer-events-auto">
          <div className="w-[30px] h-[50px] rounded-full border border-white/10 flex justify-center items-start p-2 hover:border-accent-cyan/40 transition-all group">
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-1 rounded-full bg-accent-cyan opacity-40 group-hover:opacity-100"
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
