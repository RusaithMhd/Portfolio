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

  const handleDragEnd = (e, { offset }) => {
    const swipe = offset.x;
    if (swipe < -50) {
      handleNext();
    } else if (swipe > 50) {
      handlePrev();
    }
  };

  return (
    <div className="relative">
      {/* Tactical Background Decor - Softened */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-accent-cyan/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full" />
      </div>

      <motion.div variants={textVariant()} className="flex flex-col items-center mb-16 md:mb-20">
        <div className="flex items-center gap-3 mb-4">
          <FiShield className="text-accent-cyan/40" />
          <p className="text-white font-black uppercase tracking-[5px] text-[10px] opacity-20">System_Validation</p>
        </div>
        <h2 className={`${styles.sectionHeadText} text-center !tracking-tight`}>Neural_Archives</h2>
      </motion.div>

      <div className="flex flex-col items-center px-4 md:px-0">
        <div className="relative w-full max-w-4xl">
          <div className="overflow-hidden py-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: direction > 0 ? -50 : 50, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="w-full cursor-grab active:cursor-grabbing"
              >
                {/* Clean, Elegant Main Card */}
                <div className="p-10 lg:p-16 glass-card border border-white/5 bg-black/40 rounded-[2rem] lg:rounded-[3rem] relative group overflow-hidden">
                  
                  {/* Subtle Background Elements */}
                  <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent-cyan/[0.02] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-purple/[0.02] rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                  {/* Giant Quote Watermark */}
                  <div className="absolute -top-4 -left-2 lg:-top-6 lg:left-4 opacity-[0.03] pointer-events-none font-serif text-[15rem] leading-none text-white">
                    "
                  </div>

                  <div className="relative z-10 flex flex-col items-center text-center">
                    
                    {/* The Quote */}
                    <p className="text-white text-xl md:text-3xl lg:text-4xl font-medium leading-relaxed tracking-tight opacity-90 min-h-[140px] md:min-h-[120px] max-w-3xl flex items-center justify-center">
                      "{testimonials[index].testimonial}"
                    </p>

                    <div className="w-16 h-[1px] bg-white/10 my-10" />

                    {/* Author Details */}
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-2xl lg:text-3xl text-white/20 shadow-xl">
                        <FiUser />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-white text-xl lg:text-2xl font-black uppercase tracking-tighter">
                          {testimonials[index].name}
                        </h4>
                        <p className="text-accent-cyan text-[10px] lg:text-xs font-bold uppercase tracking-[4px]">
                          {testimonials[index].designation}
                          <span className="text-white/20 mx-2">|</span>
                          <span className="text-white/60">{testimonials[index].company}</span>
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Enhanced Navigation Controls */}
          <div className="mt-10 lg:mt-16 flex flex-col items-center gap-6">
            <div className="flex items-center gap-6 lg:gap-10">
              <button 
                onClick={handlePrev}
                className="p-3 lg:p-4 rounded-full glass border border-white/5 hover:border-accent-cyan/40 hover:text-accent-cyan transition-all text-white/40 active:scale-90"
                aria-label="Previous testimonial"
              >
                <FiArrowLeft className="text-sm lg:text-base" />
              </button>

              <div className="flex items-center gap-3 lg:gap-4">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    className="group relative p-2"
                    aria-label={`Go to testimonial ${i + 1}`}
                  >
                    <div className={`transition-all duration-700 rounded-full ${
                      index === i ? "w-8 lg:w-12 h-[2px] bg-white/60" : "w-3 h-[2px] bg-white/10 group-hover:bg-white/30"
                    }`} />
                  </button>
                ))}
              </div>

              <button 
                onClick={handleNext}
                className="p-3 lg:p-4 rounded-full glass border border-white/5 hover:border-accent-cyan/40 hover:text-accent-cyan transition-all text-white/40 active:scale-90"
                aria-label="Next testimonial"
              >
                <FiArrowRight className="text-sm lg:text-base" />
              </button>
            </div>
            
            {/* Auto-play Progress Bar */}
            <div className="w-48 h-[1px] bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                key={index + (isPaused ? "-paused" : "")}
                initial={{ width: isPaused ? "100%" : 0 }}
                animate={{ width: isPaused ? "100%" : "100%" }}
                transition={{ duration: isPaused ? 0 : 8, ease: "linear" }}
                className={`h-full ${isPaused ? 'bg-white/20' : 'bg-accent-cyan/40 shadow-neon-cyan'}`}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Testimonials, "testimonials");
