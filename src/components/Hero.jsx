import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { styles } from "../styles";
import { rusaithHero } from "../assets";

const roles = ["Odoo ERP Consultant", "Full Stack Developer", "Frontend Engineer", "UI/UX Designer"];

const Hero = () => {
  const containerRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Parallax / Scroll Effects
  const { scrollY } = useScroll();

  // Smooth scroll transformations based on global scroll for reliable parallax
  const textY = useTransform(scrollY, [0, 800], [0, -150]);
  const textOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  // Natural 3D scroll effects
  const textRotateX = useTransform(scrollY, [0, 800], [0, 25]); // Tilt back into screen
  const textScale = useTransform(scrollY, [0, 800], [1, 0.8]); // Shrink
  const textZ = useTransform(scrollY, [0, 800], [0, -100]); // Push back in Z space

  const bgShift = useTransform(scrollY, [0, 1000], [0, 400]);
  const bgScale = useTransform(scrollY, [0, 1000], [1, 1.2]); // Zoom in slightly
  const bgFilter = useTransform(scrollY, [0, 800], ["blur(0px) brightness(1)", "blur(10px) brightness(0.5)"]);

  // Mouse Parallax
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const springConfig = { damping: 30, stiffness: 100, mass: 1 };

  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Normalize mouse coordinates (-0.5 to 0.5)
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;

    mouseX.set(x);
    mouseY.set(y);
    setMousePosition({ x, y });
  };

  // Role cycler
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[100svh] min-h-[580px] xs:min-h-[700px] lg:min-h-[800px] overflow-hidden bg-[#050507] text-white flex items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      {/* 1. Deep Background Layer (Now containing the portrait) */}
      <motion.div
        style={{
          y: bgShift,
          scale: bgScale,
          filter: bgFilter
        }}
        className="absolute inset-0 z-0 pointer-events-none origin-top"
      >
        {/* Full View Portrait - 100% Opacity and Centered Face */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={rusaithHero}
            alt="MIM Rusaith — Freelance Web Developer and Graphic Designer based in Colombo, Sri Lanka"
            className="w-full h-full object-cover object-[center_top] sm:object-center hero-portrait"
          />
          {/* Gradients to darken ONLY the edges for text readability, leaving the center clear */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-full lg:w-[45%] bg-gradient-to-r from-[#050507] via-[#050507]/80 to-transparent" />
          <div className="hidden lg:block absolute inset-y-0 right-0 w-full lg:w-[40%] bg-gradient-to-l from-[#050507] via-[#050507]/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[65%] lg:h-1/3 bg-gradient-to-t from-[#050507] via-[#050507]/80 lg:via-[#050507]/60 to-transparent" />
        </div>

        {/* Cinematic Spotlight */}
        <div
          className="absolute right-[20%] top-[30%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full hero-spotlight opacity-[0.15] blur-[100px] mix-blend-screen bg-orange-500/20"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
            transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        />
      </motion.div>

      {/* 2. Main Content Container */}
      <div className={`relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-between h-full pt-20 xs:pt-32 lg:pt-0 pb-10 xs:pb-20 lg:pb-0`}>

        {/* LEFT SIDE: Headline Content */}
        {/* LEFT SIDE: Headline & Stats */}
        <motion.div
          style={{
            y: textY,
            opacity: textOpacity,
            rotateX: textRotateX,
            scale: textScale,
            z: textZ,
            transformPerspective: 1200
          }}
          className="w-full lg:w-[35%] flex flex-col items-center lg:items-start text-center lg:text-left origin-center lg:origin-bottom mb-6 xs:mb-12 lg:mb-0"
        >
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 lg:mb-8"
          >
            <h1 className="text-[1.6rem] xs:text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-[1.1] text-white/90 drop-shadow-2xl">
              Full Stack <br className="hidden sm:block lg:block" />
              <span className="font-semibold text-white">Web Developer & <span className="text-orange-500 italic">Odoo ERP Consultant</span> <span className="text-white/60 text-[10px] xs:text-xs sm:text-sm md:text-base block font-light tracking-[0.2em] mt-1.5 sm:mt-4 uppercase">in Sri Lanka</span></span>
            </h1>
          </motion.div>

          {/* Subtle Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex items-center gap-6 lg:gap-8 lg:pt-8 lg:border-t border-white/10 w-full max-w-sm backdrop-blur-sm justify-center lg:justify-start"
          >
            <div className="flex flex-col gap-1 items-center lg:items-start">
              <span className="text-xl lg:text-2xl font-light text-white drop-shadow-md">4+</span>
              <span className="text-[9px] tracking-[2px] text-white/40 uppercase">Years Exp</span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex flex-col gap-1 items-center lg:items-start">
              <span className="text-xl lg:text-2xl font-light text-white drop-shadow-md">20+</span>
              <span className="text-[9px] tracking-[2px] text-white/40 uppercase">Projects</span>
            </div>
          </motion.div>
        </motion.div>

        {/* CENTER: Empty space to keep face visible */}
        <div className="hidden lg:block lg:w-[30%] pointer-events-none" />

        {/* RIGHT SIDE: Identity & Interaction */}
        <motion.div
          style={{
            y: textY,
            opacity: textOpacity,
            rotateX: textRotateX,
            scale: textScale,
            z: textZ,
            transformPerspective: 1200
          }}
          className="w-full lg:w-[35%] flex flex-col items-center lg:items-end text-center lg:text-right justify-center gap-4 xs:gap-8 lg:gap-10 origin-center lg:origin-bottom"
        >
          {/* Status HUD (Badge) */}
          <motion.div
            className="hero-stat-card px-4 py-2 xs:px-5 xs:py-3 rounded-2xl flex items-center gap-3 shadow-2xl bg-[#050507]/40 backdrop-blur-xl border-orange-500/20"
          >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </div>
            <span className="text-[9px] xs:text-[10px] font-medium tracking-widest text-orange-500/90 uppercase">Available for Work</span>
          </motion.div>

          {/* Reflective Name Display */}
          <div className="relative group">
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative inline-block"
            >
              <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white relative z-10 select-none">
                <span className="relative inline-block group-hover:animate-crack-1">R</span>
                <span className="relative inline-block group-hover:animate-crack-2">U</span>
                <span className="relative inline-block group-hover:animate-crack-3">S</span>
                <span className="relative inline-block group-hover:animate-crack-1">A</span>
                <span className="relative inline-block group-hover:animate-crack-2">I</span>
                <span className="relative inline-block group-hover:animate-crack-3">T</span>
                <span className="relative inline-block group-hover:animate-crack-1">H</span>
              </h2>

              <div className="absolute top-[80%] left-0 w-full opacity-20 scale-y-[-1] blur-[2px] select-none pointer-events-none text-center lg:text-right">
                <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent">
                  RUSAITH
                </h2>
              </div>
            </motion.div>
          </div>

          {/* Dynamic Roles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[30px] xs:h-[40px] flex items-center justify-center lg:justify-end overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <span className="text-white/60 text-sm xs:text-base md:text-lg lg:text-xl font-light">I am a</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={roles[roleIndex]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-sm xs:text-base md:text-lg lg:text-xl xl:text-2xl font-medium tracking-wide text-orange-500"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Short Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-white/60 text-[11px] xs:text-xs sm:text-sm md:text-base max-w-xs font-light leading-relaxed text-center lg:text-right"
          >
            Merging high-end aesthetics with robust engineering to build immersive web experiences and powerful Odoo ERP solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-row gap-3 w-full justify-center lg:justify-end"
          >
            <button
              onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}
              className="group relative flex-1 xs:flex-none px-4 py-2.5 xs:px-8 xs:py-3.5 bg-white text-black rounded-full overflow-hidden transition-all hover:scale-[1.05] active:scale-95 flex items-center justify-center gap-2 shadow-2xl whitespace-nowrap text-[11px] xs:text-sm font-bold"
            >
              <span className="relative z-10 tracking-wide group-hover:text-orange-600 transition-colors">View Projects</span>
              <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 opacity-10" />
            </button>

            <button
              onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
              className="flex-1 xs:flex-none px-4 py-2.5 xs:px-8 xs:py-3.5 hero-badge rounded-full hover:bg-orange-500/10 transition-all font-bold tracking-wide text-white/90 backdrop-blur-md bg-white/5 border-white/10 hover:border-orange-500/40 whitespace-nowrap text-[11px] xs:text-sm text-center"
            >
              Let's Connect
            </button>
          </motion.div>


        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 lg:gap-3 z-20 pointer-events-none"
      >
        <span className="text-[8px] lg:text-[10px] font-medium tracking-[0.3em] text-orange-500/50 uppercase drop-shadow-md">Scroll to explore</span>
        <div className="w-px h-8 lg:h-12 bg-orange-500/20 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-full h-1/2 bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"
          />
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;
