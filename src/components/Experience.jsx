import React from "react";
import { motion } from "framer-motion";
import { textVariant, fadeIn } from "../utils/motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { experiences } from "../constants";

import { 
  FiBriefcase, 
  FiClock, 
  FiZap,
  FiExternalLink,
  FiTerminal,
  FiCpu,
  FiHash
} from "react-icons/fi";

const CyberTitle = ({ text }) => (
  <div className="relative group overflow-hidden">
    <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tighter group-hover:text-accent-cyan transition-colors duration-300">
      {text}
    </h3>
    <motion.div 
      initial={{ x: "-100%" }}
      whileHover={{ x: "100%" }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent skew-x-12"
    />
  </div>
);

const ExperienceCard = ({ experience, index }) => {
  const isActive = index === 0;

  return (
    <div className="relative flex gap-8 md:gap-20 pb-24 last:pb-0 group">
      {/* Cyber Timeline Bus */}
      <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-white/[0.03] group-last:bg-transparent overflow-hidden">
        <motion.div 
          animate={{ top: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-40 bg-gradient-to-b from-transparent via-accent-cyan to-transparent shadow-[0_0_15px_rgba(0,255,255,0.5)]"
        />
      </div>

      {/* Cyber Node */}
      <div className="relative z-10 flex-shrink-0">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 transition-all duration-500 rotate-45 ${
            isActive 
            ? "bg-accent-cyan/20 border-accent-cyan shadow-neon-cyan text-accent-cyan" 
            : "bg-black border-white/10 text-white/20 group-hover:border-accent-cyan/50 group-hover:text-accent-cyan"
          }`}
        >
          <div className="-rotate-45">
            {isActive ? <FiZap className="animate-pulse" /> : <FiCpu />}
          </div>
        </motion.div>
      </div>

      {/* Cyber Content Card */}
      <motion.div 
        variants={fadeIn("left", "spring", index * 0.1, 1)}
        style={{ clipPath: "polygon(0 0, 95% 0, 100% 15%, 100% 100%, 5% 100%, 0 85%)" }}
        className="flex-1 glass-morphism p-8 md:p-12 relative overflow-hidden group/card bg-black/40 border border-white/5 hover:border-accent-cyan/30 transition-all duration-500"
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>

        {/* Floating Hex Code Decrypting */}
        <div className="absolute top-4 right-12 opacity-[0.02] font-mono text-[8px] select-none pointer-events-none group-hover/card:opacity-10 transition-opacity">
          {Array(5).fill().map((_, i) => (
            <div key={i}>{Math.random().toString(16).substring(2, 20).toUpperCase()}</div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-sm bg-accent-cyan/10 border border-accent-cyan/30">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping" />
                <span className="text-[10px] text-accent-cyan font-black uppercase tracking-[3px]">
                  {isActive ? "LIVE_UPLINK" : "LOG_RECOVERY"}
                </span>
              </div>
              <div className="h-[1px] w-12 bg-white/10" />
              <span className="text-[10px] text-white/20 font-mono tracking-widest uppercase">NODE_0{experiences.length - index}</span>
            </div>
            
            <CyberTitle text={experience.title} />
            
            <div className="flex items-center gap-3 mt-4">
              <span className="text-white-100 text-sm font-black tracking-widest uppercase opacity-60 group-hover/card:opacity-100 transition-opacity">
                {experience.company_name}
              </span>
              <a 
                href={experience.company_website} 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/20 hover:text-accent-cyan hover:bg-accent-cyan/10 transition-all border border-white/5"
              >
                <FiExternalLink className="text-xs" />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:items-end">
            <div className="flex items-center gap-2 text-accent-cyan mb-2">
              <FiClock className="text-sm" />
              <span className="text-[12px] font-black uppercase tracking-[3px] bg-white/5 px-3 py-1 rounded-sm border border-white/5">
                {experience.date}
              </span>
            </div>
            <span className="text-[10px] text-white/10 font-mono uppercase tracking-[2px]">SHA_256: {Math.random().toString(36).substring(7).toUpperCase()}</span>
          </div>
        </div>

        <ul className="space-y-6 relative z-10">
          {experience.points.map((point, i) => (
            <motion.li
              key={`exp-point-${i}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="flex items-start gap-5 group/point"
            >
              <div className="mt-1.5 flex flex-col items-center gap-1">
                <div className="w-2 h-2 rounded-sm border border-accent-cyan/40 group-hover/point:bg-accent-cyan group-hover/point:shadow-neon-cyan transition-all rotate-45" />
                <div className="w-[1px] h-4 bg-white/5 group-last:hidden" />
              </div>
              <p className="text-secondary text-[15px] leading-relaxed opacity-60 group-hover/card:opacity-100 transition-opacity font-medium tracking-wide">
                {point}
              </p>
            </motion.li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap gap-4 pt-10 border-t border-white/5 relative z-10">
          <div className="flex items-center gap-3 px-4 py-2 rounded-sm bg-white/5 border border-white/10 hover:border-accent-cyan/30 transition-colors group/tool">
            <FiTerminal className="text-sm text-accent-cyan group-hover/tool:animate-pulse" />
            <span className="text-[10px] text-white/40 font-black uppercase tracking-[3px] group-hover/tool:text-white transition-colors">
              LOGS_VERIFIED
            </span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-sm bg-white/5 border border-white/10">
            <FiHash className="text-sm text-white/20" />
            <span className="text-[10px] text-white/40 font-black uppercase tracking-[3px]">
              BITS_TRANSFERRED: 2.4GB
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Experience = () => {
  return (
    <div className="relative overflow-hidden py-20">
      {/* Cyber Neon Lines Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Horizontal Neon Streams */}
        <div className="absolute inset-0 opacity-[0.1]">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ 
                duration: Math.random() * 8 + 4, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 10
              }}
              className={`absolute h-[1px] w-full ${i % 2 === 0 ? "bg-accent-cyan shadow-[0_0_15px_#00ffff]" : "bg-accent-purple shadow-[0_0_15px_#b11fff]"}`}
              style={{ top: `${(i + 1) * 12}%` }}
            />
          ))}
        </div>

        {/* Vertical Neon Streams */}
        <div className="absolute inset-0 opacity-[0.08]">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              initial={{ y: "-100%" }}
              animate={{ y: "100%" }}
              transition={{ 
                duration: Math.random() * 10 + 6, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 10
              }}
              className={`absolute w-[1px] h-full ${i % 2 === 0 ? "bg-accent-cyan shadow-[0_0_15px_#00ffff]" : "bg-accent-purple shadow-[0_0_15px_#b11fff]"}`}
              style={{ left: `${(i + 1) * 16}%` }}
            />
          ))}
        </div>
        
        {/* Deep Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_90%)]" />
      </div>
      
      <motion.div variants={textVariant()} className="relative z-10">
        <p className={`${styles.sectionSubText} !text-accent-cyan animate-pulse uppercase tracking-[4px]`}>[ SYSTEM_LOGS_v2.9 ]</p>
        <h2 className={`${styles.sectionHeadText} !text-white`}>Career Protocol.</h2>
      </motion.div>

      <div className="mt-24 max-w-5xl mx-auto relative z-10 px-4">
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
        <div className="inline-flex items-center gap-6 px-10 py-4 glass border-white/5 rounded-full bg-black/40 backdrop-blur-md">
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
          <span className="text-secondary text-[11px] uppercase tracking-[6px] font-black opacity-30">
            End of Sector Logs
          </span>
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Experience, "experience");

