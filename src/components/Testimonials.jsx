import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant, fadeIn } from "../utils/motion";
import { FiUser, FiShield, FiActivity, FiZap, FiArrowLeft, FiArrowRight } from "react-icons/fi";

const testimonials = [
  {
    testimonial: "Rusaith's ability to combine technical execution with clean UI is unmatched. Truly a premium experience that exceeded our high-security requirements.",
    name: "Alex Johnson",
    designation: "CTO",
    company: "Stellar Tech",
    metric: "98.4%",
    status: "VERIFIED_PARTNER"
  },
  {
    testimonial: "I've never seen a portfolio that feels so alive. The monochromatic obsidian aesthetic and smooth interactions are simply world-class.",
    name: "Sarah Chen",
    designation: "Design Lead",
    company: "Visionary Lab",
    metric: "100%",
    status: "ELITE_CREDENTIAL"
  },
  {
    testimonial: "Professional, creative, and highly skilled. Rusaith delivered an advanced tactical interface that perfectly aligned with our brand vision.",
    name: "Michael Smith",
    designation: "Founder",
    company: "Innovate AI",
    metric: "96.7%",
    status: "LEGACY_CLIENT"
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused, index]);

  return (
    <div className="relative pt-20">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent-cyan/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-accent-purple/5 blur-[120px] rounded-full" />
      </div>

      <motion.div variants={textVariant()} className="flex flex-col items-center mb-24">
        <div className="flex items-center gap-3 mb-4">
          <FiShield className="text-accent-cyan/40" />
          <p className="text-white font-black uppercase tracking-[8px] text-[10px] opacity-30">Validation_Archives</p>
        </div>
        <h2 className={`${styles.sectionHeadText} text-center tracking-tight`}>Neural_Feedback</h2>
      </motion.div>

      <div className="flex flex-col items-center px-4 md:px-0">
        <div className="relative w-full max-w-5xl">
          <div className="relative min-h-[500px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="w-full relative"
              >
                {/* Main Premium Card */}
                <div className="relative p-8 md:p-16 glass border border-white/10 bg-white/[0.02] rounded-[3rem] overflow-hidden group shadow-2xl shadow-black/50">
                  
                  {/* Status Badges - Top Row */}
                  <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-20">
                    <div className="flex items-center gap-3 glass py-1.5 px-4 rounded-full border-accent-cyan/20 bg-accent-cyan/5 shadow-neon-cyan/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                      <span className="text-[8px] md:text-[9px] text-accent-cyan font-black uppercase tracking-[3px]">
                        {testimonials[index].status}
                      </span>
                    </div>
                    
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[8px] text-white/20 font-black tracking-widest uppercase">Satisfaction_Index</span>
                      <div className="text-lg md:text-2xl font-black text-white font-mono tracking-tighter">
                        {testimonials[index].metric}
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col items-center pt-16 md:pt-10">
                    {/* Big Decorative Quotes */}
                    <div className="absolute -top-10 -left-6 opacity-[0.05] pointer-events-none select-none font-black text-[20rem] leading-none text-accent-cyan">
                      "
                    </div>

                    <p className="text-white text-xl md:text-3xl lg:text-4xl font-medium leading-relaxed md:leading-relaxed text-center opacity-90 max-w-4xl relative mb-16 px-4">
                      {testimonials[index].testimonial}
                    </p>

                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 mt-auto border-t border-white/5 pt-12">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full glass border border-white/10 flex items-center justify-center text-3xl text-white/20 bg-white/[0.02] group-hover:border-accent-cyan/40 transition-colors shadow-2xl">
                          <FiUser />
                        </div>
                        <div className="flex flex-col text-left">
                          <h4 className="text-white text-xl md:text-2xl font-black uppercase tracking-tighter">
                            {testimonials[index].name}
                          </h4>
                          <p className="text-accent-cyan text-[10px] md:text-[11px] font-black uppercase tracking-[4px] mt-1">
                            {testimonials[index].designation}
                            <span className="text-white/20 mx-3 opacity-30">|</span>
                            <span className="text-white/50">{testimonials[index].company}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <FiActivity className="text-accent-cyan opacity-40 animate-pulse" />
                        <span className="text-[8px] text-white/20 font-mono tracking-widest">REALTIME_VERIFICATION_ACTIVE</span>
                      </div>
                    </div>
                  </div>

                  {/* Aesthetic Glitch Accents */}
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-cyan/[0.03] blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Minimalist Controls */}
          <div className="mt-16 flex flex-col items-center gap-10">
            <div className="flex items-center gap-8 md:gap-12">
              <button 
                onClick={handlePrev}
                className="p-4 rounded-full glass border border-white/10 hover:border-accent-cyan/40 hover:text-accent-cyan transition-all text-white/30 active:scale-90 shadow-2xl group"
              >
                <FiArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-4">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    className="p-2"
                  >
                    <div className={`transition-all duration-1000 rounded-full h-[3px] ${
                      index === i ? "w-12 md:w-16 bg-accent-cyan shadow-neon-cyan" : "w-3 bg-white/10"
                    }`} />
                  </button>
                ))}
              </div>

              <button 
                onClick={handleNext}
                className="p-4 rounded-full glass border border-white/10 hover:border-accent-cyan/40 hover:text-accent-cyan transition-all text-white/30 active:scale-90 shadow-2xl group"
              >
                <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="w-64 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
              <motion.div 
                key={index + (isPaused ? "-paused" : "")}
                initial={{ width: isPaused ? "100%" : 0 }}
                animate={{ width: isPaused ? "100%" : "100%" }}
                transition={{ duration: isPaused ? 0 : 8, ease: "linear" }}
                className={`h-full ${isPaused ? 'bg-white/20 opacity-30' : 'bg-accent-cyan/60 shadow-neon-cyan'}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Testimonials, "testimonials");
