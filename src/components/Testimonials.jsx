import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";
import { FiUser, FiArrowLeft, FiArrowRight, FiStar } from "react-icons/fi";

const testimonials = [
  {
    testimonial: "Rusaith's ability to combine technical execution with clean UI is unmatched. Truly a premium experience that exceeded our high-security requirements.",
    name: "Alex Johnson",
    designation: "CTO",
    company: "Stellar Tech",
    metric: "98.4%",
    status: "Verified Partner"
  },
  {
    testimonial: "I've never seen a portfolio that feels so alive. The monochromatic obsidian aesthetic and smooth interactions are simply world-class.",
    name: "Sarah Chen",
    designation: "Design Lead",
    company: "Visionary Lab",
    metric: "100%",
    status: "Elite Credential"
  },
  {
    testimonial: "Professional, creative, and highly skilled. Rusaith delivered an advanced tactical interface that perfectly aligned with our brand vision.",
    name: "Michael Smith",
    designation: "Founder",
    company: "Innovate AI",
    metric: "96.7%",
    status: "Legacy Client"
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
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full" />
      </div>

      <motion.div variants={textVariant()} className="flex flex-col items-center mb-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          <p className="text-[12px] uppercase tracking-[0.3em] text-white/50 font-medium">Testimonials</p>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1] text-white">
          Client <span className="font-semibold">Feedback</span>
        </h2>
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
                <div className="relative p-8 md:p-16 bg-white/[0.02] border border-white/10 rounded-[3rem] overflow-hidden group shadow-2xl backdrop-blur-md">
                  
                  {/* Status Badges - Top Row */}
                  <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-20">
                    <div className="flex items-center gap-3 bg-white/5 py-2 px-5 rounded-full border border-white/10">
                      <FiStar className="text-white/80" />
                      <span className="text-[10px] md:text-[11px] text-white/80 font-medium uppercase tracking-[2px]">
                        {testimonials[index].status}
                      </span>
                    </div>
                    
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[9px] text-white/40 font-medium tracking-widest uppercase">Satisfaction Rating</span>
                      <div className="text-lg md:text-2xl font-light text-white tracking-wide">
                        {testimonials[index].metric}
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col items-center pt-16 md:pt-10">
                    {/* Big Decorative Quotes */}
                    <div className="absolute -top-10 -left-6 opacity-[0.03] pointer-events-none select-none font-serif text-[20rem] leading-none text-white">
                      "
                    </div>

                    <p className="text-white/90 text-xl md:text-3xl lg:text-4xl font-light leading-relaxed md:leading-relaxed text-center max-w-4xl relative mb-16 px-4">
                      {testimonials[index].testimonial}
                    </p>

                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 mt-auto border-t border-white/10 pt-12">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl text-white/40 group-hover:text-white group-hover:border-white/30 transition-all duration-500 shadow-2xl">
                          <FiUser />
                        </div>
                        <div className="flex flex-col text-left">
                          <h4 className="text-white text-xl md:text-2xl font-light tracking-wide">
                            {testimonials[index].name}
                          </h4>
                          <p className="text-white/50 text-[11px] md:text-xs font-medium uppercase tracking-[2px] mt-1">
                            {testimonials[index].designation}
                            <span className="text-white/20 mx-3 opacity-30">|</span>
                            <span className="text-white/40">{testimonials[index].company}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                        <span className="text-[10px] text-white/40 font-medium uppercase tracking-widest">Verified Review</span>
                      </div>
                    </div>
                  </div>

                  {/* Aesthetic Accent */}
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.02] blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Minimalist Controls */}
          <div className="mt-16 flex flex-col items-center gap-10">
            <div className="flex items-center gap-8 md:gap-12">
              <button 
                onClick={handlePrev}
                className="p-4 rounded-full bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all text-white/50 hover:text-white active:scale-95 shadow-2xl group"
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
                    <div className={`transition-all duration-1000 rounded-full h-[2px] ${
                      index === i ? "w-12 md:w-16 bg-white" : "w-4 bg-white/20 hover:bg-white/40"
                    }`} />
                  </button>
                ))}
              </div>

              <button 
                onClick={handleNext}
                className="p-4 rounded-full bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all text-white/50 hover:text-white active:scale-95 shadow-2xl group"
              >
                <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div 
                key={index + (isPaused ? "-paused" : "")}
                initial={{ width: isPaused ? "100%" : 0 }}
                animate={{ width: isPaused ? "100%" : "100%" }}
                transition={{ duration: isPaused ? 0 : 8, ease: "linear" }}
                className={`h-full ${isPaused ? 'bg-white/30' : 'bg-white/80'}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Testimonials, "testimonials");
