import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { personalInfo, navigationPaths, services } from "../constants";
import { SectionWrapper } from "../hoc";
import Terminal from "./Terminal";
import MagneticButton from "./MagneticButton";

import { 
  FiMonitor, 
  FiSmartphone, 
  FiCpu, 
  FiTarget, 
  FiActivity, 
  FiClock, 
  FiCheckCircle, 
  FiShield,
  FiZap
} from "react-icons/fi";

const iconMap = {
  FiMonitor: FiMonitor,
  FiSmartphone: FiSmartphone,
  FiCpu: FiCpu,
  FiTarget: FiTarget,
};

const StatusModule = ({ label, value, icon: Icon, colorClass, shadowClass }) => (
  <motion.div 
    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
    className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-accent-cyan/20 transition-all group cursor-default"
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-accent-cyan/30 transition-all ${colorClass} ${shadowClass}`}>
      <Icon className="text-xl" />
    </div>
    <div className="flex flex-col">
      <span className="text-[9px] text-white/20 font-black uppercase tracking-[3px]">{label}</span>
      <span className="text-sm text-white/90 font-bold uppercase tracking-tight group-hover:text-accent-cyan transition-colors">{value}</span>
    </div>
  </motion.div>
);

const JourneyNode = ({ year, title, company, index }) => (
  <motion.div 
    variants={fadeIn("right", "spring", index * 0.2, 0.75)}
    className="relative pl-10 pb-10 group"
  >
    <div className="absolute left-0 top-0 w-[1px] h-full bg-white/5 group-last:h-1/2">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-accent-cyan bg-primary shadow-neon-cyan group-hover:scale-150 transition-transform" />
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-[10px] text-accent-cyan font-black tracking-[2px]">{year}</span>
      <h4 className="text-white text-md font-black uppercase tracking-tighter group-hover:text-accent-cyan transition-colors">{title}</h4>
      <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">{company}</p>
    </div>
  </motion.div>
);

const About = () => {
  return (
    <div className="relative">
      {/* Biometric Scan Background Effect */}
      <div className="absolute -top-20 lg:-left-20 left-1/2 -translate-x-1/2 lg:translate-x-0 w-72 h-72 md:w-96 md:h-96 bg-accent-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start justify-center">
        <div className="flex-[1.2] w-full flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div variants={textVariant()} className="relative w-full">
            <p className={styles.sectionSubText}>Accessing Identity Arch...</p>
            <h2 className={`${styles.sectionHeadText} leading-tight`}>System Origin.</h2>
            
            {/* Scanning Line Animation */}
            <motion.div 
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent pointer-events-none z-20"
            />
          </motion.div>
 
          <motion.div
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-10 space-y-8 w-full flex flex-col items-center lg:items-start"
          >
            <div className="relative p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 overflow-hidden group w-full">
              <div className="absolute top-0 left-0 w-2 h-full bg-accent-cyan/20 lg:block hidden" />
              <div className="absolute top-0 left-0 w-full h-1 bg-accent-cyan/20 lg:hidden block" />
              <p className="text-white/70 text-[20px] md:text-[22px] max-w-3xl leading-[42px] font-medium italic mx-auto lg:mx-0">
                "Bridging the gap between <span className="text-accent-cyan font-black not-italic">high-impact aesthetics</span> and <span className="text-accent-purple font-black not-italic">technical precision</span>. Every pixel is a protocol; every line of code is a signature."
              </p>
            </div>
 
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto lg:mx-0">
              <StatusModule label="Clearance" value="Level 09 / Admin" icon={FiShield} colorClass="text-accent-cyan" shadowClass="group-hover:shadow-neon-cyan" />
              <StatusModule label="Processing" value="Graphic + Dev" icon={FiZap} colorClass="text-accent-purple" shadowClass="group-hover:shadow-neon-purple" />
              <StatusModule label="Uptime" value="5+ Years Active" icon={FiActivity} colorClass="text-white" shadowClass="" />
              <StatusModule label="Origin" value="Colombo / SL" icon={FiTarget} colorClass="text-white" shadowClass="" />
            </div>
 
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 w-full">
              <MagneticButton 
                onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
                className="!bg-accent-cyan !text-black border-none uppercase font-black tracking-widest !px-10 !py-5 hover:shadow-neon-cyan transition-all w-full sm:w-auto"
              >
                <div className="flex items-center justify-center gap-3 whitespace-nowrap">
                  Initialize Uplink <FiShield className="group-hover:rotate-12 transition-transform text-xl" />
                </div>
              </MagneticButton>
              
              <div className="flex items-center gap-4 px-6 py-4 glass border-white/5 rounded-2xl">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-primary bg-white/10 flex items-center justify-center text-[10px] font-black">
                      0{i}
                    </div>
                  ))}
                </div>
                <span className="text-[10px] text-white/40 font-black uppercase tracking-[2px]">3 Active Sectors</span>
              </div>
            </div>
          </motion.div>
          
          <div className="mt-20 flex flex-col items-center lg:items-start w-full">
            <h3 className="text-white font-black uppercase tracking-[4px] text-xs mb-10 flex items-center gap-4 justify-center lg:justify-start w-full lg:w-auto">
              <span className="p-1 rounded bg-accent-cyan" /> Journey Protocol
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 w-full max-w-2xl mx-auto lg:mx-0">
              <JourneyNode index={0} year="2025 - PRES" title="IT Executive & Designer" company="ChillFrost (Pvt) Ltd" />
              <JourneyNode index={1} year="2024 - 2025" title="Web Developer" company="IMSS (Pvt) Ltd" />
              <JourneyNode index={2} year="2022 - 2024" title="Digital Marketer" company="Food Champ" />
              <JourneyNode index={3} year="2021 - 2022" title="Freelance Creator" company="Independent" />
            </div>
          </div>
        </div>

        <div className="flex-1 w-full lg:sticky lg:top-24">
          <motion.div
            variants={fadeIn("left", "tween", 0.2, 1)}
            className="w-full relative group"
          >
            {/* Elite Performance Radar SVG */}
            <div className="absolute -top-16 lg:-right-16 right-0 w-48 h-48 opacity-20 pointer-events-none rotate-12">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-accent-cyan stroke-[0.5]">
                <circle cx="50" cy="50" r="45" strokeDasharray="5,5" />
                <circle cx="50" cy="50" r="35" />
                <path d="M50 5 L50 95 M5 50 L95 50" strokeOpacity="0.2" />
                <motion.path 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  style={{ originX: "50px", originY: "50px" }}
                  d="M50 50 L85 50" 
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div className="absolute -inset-1 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-[3rem] blur-xl opacity-10 group-hover:opacity-30 transition duration-1000"></div>
            
            <div className="relative glass-card border-white/10 bg-black/60 overflow-hidden rounded-[3rem] shadow-2xl">
              <div className="p-1">
                <Terminal />
              </div>
            </div>

            {/* Interactive Performance Cards */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-6 glass-card border-white/5 bg-white/[0.01] group/stat overflow-hidden relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-accent-cyan/5 -mr-8 -mt-8 rounded-full group-hover/stat:scale-150 transition-transform" />
                <span className="text-[9px] text-white/20 font-black uppercase tracking-[2px] block mb-2">Design Power</span>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black text-white">98</span>
                  <span className="text-accent-cyan text-xs font-bold mb-1">%</span>
                </div>
              </div>
              <div className="p-6 glass-card border-white/5 bg-white/[0.01] group/stat overflow-hidden relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-accent-purple/5 -mr-8 -mt-8 rounded-full group-hover/stat:scale-150 transition-transform" />
                <span className="text-[9px] text-white/20 font-black uppercase tracking-[2px] block mb-2">Dev Logic</span>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black text-white">94</span>
                  <span className="text-accent-purple text-xs font-bold mb-1">%</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-5 glass-card border-white/5 bg-white/[0.01] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FiActivity className="text-accent-cyan animate-pulse" />
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-[2px]">Neural Link: STABLE</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`w-1 h-3 rounded-full ${i < 5 ? "bg-accent-cyan" : "bg-white/10"}`} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(About, navigationPaths.about);

