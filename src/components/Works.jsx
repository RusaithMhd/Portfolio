import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import SectionWrapper from "../hoc/SectionWrapper";
import { personalInfo } from "../constants";
import BentoGrid from "./BentoGrid";

const Works = () => {
  return (
    <div className="relative">
      {/* Subtle Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
      </div>

      <motion.div variants={textVariant()} className="flex flex-col md:flex-row justify-between items-center md:items-end text-center md:text-left gap-4">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            <p className="text-[12px] uppercase tracking-[0.3em] text-orange-500/80 font-medium">Selected Portfolio</p>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1] text-white">
            Featured <span className="font-semibold text-orange-500 italic">Projects</span>
          </h2>
        </div>
        
        <div className="hidden md:flex flex-col items-end gap-1 mb-4">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-orange-500/20 bg-white/[0.02] backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            <span className="text-[10px] text-orange-500/80 font-medium uppercase tracking-widest">Available to view</span>
          </div>
        </div>
      </motion.div>

      <div className="w-full flex justify-center md:justify-start">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-6 text-white/60 text-[16px] max-w-2xl leading-[30px] font-light"
        >
          {personalInfo.projectsIntro || "Explore a collection of my favorite projects, ranging from minimalist web interfaces to complex digital experiences."}
        </motion.p>
      </div>

      <div className="mt-20">
        <BentoGrid />
      </div>
      
      <div className="mt-24 flex flex-col items-center gap-4">
        <div className="w-px h-20 bg-gradient-to-b from-white/20 to-transparent" />
        <motion.p
          variants={fadeIn("up", "tween", 0.5, 0.5)}
          className="text-white/30 text-[10px] font-medium uppercase tracking-[5px]"
        >
          End of Portfolio
        </motion.p>
      </div>
    </div>
  );
};

export default SectionWrapper(Works, "projects");
