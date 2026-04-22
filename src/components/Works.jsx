import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import SectionWrapper from "../hoc/SectionWrapper";
import { styles } from "../styles";
import { personalInfo } from "../constants";
import BentoGrid from "./BentoGrid";

const Works = () => {
  return (
    <div className="relative">
      {/* Section Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Animated Data Streams */}
        <motion.div 
          animate={{ y: [0, 40] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,255,255,0.05),transparent)] h-40 w-full"
        />
      </div>

      <motion.div variants={textVariant()} className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-8 h-[1px] bg-accent-cyan" />
            <p className="text-white font-black uppercase tracking-[5px] text-[10px] opacity-40">System_Archive</p>
          </div>
          <h2 className={styles.sectionHeadText}>Projects_</h2>
        </div>
        
        <div className="hidden md:flex flex-col items-end gap-1 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">Active_Uplink</span>
          </div>
          <span className="text-[8px] text-white/20 font-mono tracking-widest uppercase">Buffer_Ready: 0x442A</span>
        </div>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-6 text-secondary text-[16px] max-w-3xl leading-[30px] opacity-60 font-medium"
        >
          {personalInfo.projectsIntro || "Explore a collection of my favorite projects, ranging from minimalist web interfaces to complex digital experiences."}
        </motion.p>
      </div>

      <div className="mt-20">
        <BentoGrid />
      </div>
      
      <div className="mt-24 flex flex-col items-center gap-4">
        <div className="w-px h-20 bg-gradient-to-b from-accent-cyan/40 to-transparent" />
        <motion.p
          variants={fadeIn("up", "tween", 0.5, 0.5)}
          className="text-white/20 text-[10px] font-black uppercase tracking-[5px]"
        >
          End_Of_Archive
        </motion.p>
      </div>
    </div>
  );
};

export default SectionWrapper(Works, "projects");
