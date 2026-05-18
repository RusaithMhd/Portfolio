import React from "react";
import { motion } from "framer-motion";
import { textVariant, fadeIn } from "../utils/motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { experiences } from "../constants";

import { 
  FiBriefcase, 
  FiClock, 
  FiExternalLink
} from "react-icons/fi";

const ExperienceCard = ({ experience, index }) => {
  const isActive = index === 0;
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="relative flex gap-6 md:gap-16 pb-20 md:pb-24 last:pb-0 group">
      {/* Sleek Timeline Line */}
      <div className="absolute left-[19px] top-0 bottom-0 w-[1px] bg-white/10 group-last:bg-transparent overflow-hidden">
        <motion.div 
          animate={{ top: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
          className="absolute left-0 w-full h-32 bg-gradient-to-b from-transparent via-orange-500/50 to-transparent"
        />
      </div>

      {/* Timeline Node */}
      <div className="relative z-10 flex-shrink-0">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 ${
            isActive 
            ? "bg-orange-500 border-orange-500 text-black shadow-[0_0_20px_rgba(249,115,22,0.4)]" 
            : "bg-[#050507] border-white/20 text-white/40 group-hover:border-orange-500/60 group-hover:text-orange-500"
          }`}
        >
          <FiBriefcase className="text-sm" />
        </motion.div>
      </div>

      {/* Content Card */}
      <motion.div 
        variants={fadeIn("up", "spring", index * 0.1, 1)}
        onMouseMove={handleMouseMove}
        className="flex-1 p-8 md:p-12 relative overflow-hidden group/card bg-white/[0.02] border border-white/10 hover:border-orange-500/30 rounded-[2rem] transition-all duration-500 shadow-2xl"
      >
        {/* Dynamic Gradient Light */}
        <div 
          className="absolute inset-0 z-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249, 115, 22, 0.08), transparent 40%)`
          }}
        />
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] text-orange-500/80 font-medium uppercase tracking-[3px]">
                {isActive ? "Current Position" : "Past Role"}
              </span>
            </div>
            
            <h3 className="text-white text-2xl md:text-3xl font-light tracking-wide mb-2 group-hover/card:text-white/90 transition-colors">
              {experience.title}
            </h3>
            
            <div className="flex items-center gap-3">
              <span className="text-white/60 text-sm font-medium tracking-wide uppercase">
                {experience.company_name}
              </span>
              {experience.company_website && (
                <a 
                  href={experience.company_website} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/20 transition-all border border-white/10"
                >
                  <FiExternalLink className="text-xs" />
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-white/60 bg-white/5 px-4 py-2 rounded-full border border-white/10 flex-shrink-0">
            <FiClock className="text-sm" />
            <span className="text-xs font-medium uppercase tracking-widest">
              {experience.date}
            </span>
          </div>
        </div>

        <ul className="space-y-4 relative z-10">
          {experience.points.map((point, i) => (
            <motion.li
              key={`exp-point-${i}`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + (i * 0.1) }}
              className="flex items-start gap-4 group/point"
            >
              <div className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-white/20 group-hover/point:bg-white/80 transition-colors" />
              <p className="text-white/60 text-[15px] leading-relaxed group-hover/card:text-white/80 transition-colors font-light">
                {point}
              </p>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

const Experience = () => {
  return (
    <div className="relative py-20">
      <motion.div variants={textVariant()} className="relative z-10 flex flex-col items-center text-center">
        <p className="text-[12px] uppercase tracking-[0.3em] text-orange-500/80 font-medium mb-4">Professional Path</p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1] text-white">
          Career <span className="font-semibold text-orange-500 italic">Experience</span>
        </h2>
      </motion.div>

      <div className="mt-24 max-w-4xl mx-auto relative z-10 px-4">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={`experience-${index}`}
            experience={experience}
            index={index}
          />
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 text-center relative z-10"
      >
        <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/40 text-xs font-medium uppercase tracking-[3px]">
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          End of Experience
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Experience, "experience");

