import React from "react";
import { motion } from "framer-motion";
import { technologies } from "../constants";
import { 
  SiReact, SiJavascript, SiTailwindcss, SiHtml5, SiHtml5 as SiCss3, 
  SiMysql, SiGit 
} from "react-icons/si";
import { FiBox, FiCode, FiDatabase, FiPenTool, FiImage, FiLayers } from "react-icons/fi";

const iconMap = {
  SiReact, SiJavascript, SiTailwindcss, SiHtml5, SiCss3, 
  SiAdobephotoshop: FiImage, SiAdobeillustrator: FiPenTool, SiMysql: FiDatabase, SiGit, FiBox
};

const TechMarquee = () => {
  return (
    <div className="relative w-full overflow-hidden py-12 border-y border-white/5 bg-white/[0.01] backdrop-blur-md">
      <div className="flex whitespace-nowrap">
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex items-center gap-16 px-8"
          >
            {technologies.map((tech) => {
              const Icon = iconMap[tech.icon] || FiBox;
              return (
                <motion.div
                  key={`${tech.name}-${i}`}
                  className="flex items-center gap-4 px-6 py-3 rounded-2xl border border-white/10 hover:border-white/30 bg-white/[0.02] transition-all group hover:bg-white/[0.05] shadow-lg hover:shadow-2xl"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors border border-white/5">
                    <Icon className="text-2xl text-white/50 group-hover:text-white group-hover:scale-110 transition-all filter drop-shadow-md" />
                  </div>
                  <span className="text-white/60 font-medium uppercase tracking-widest text-[11px] group-hover:text-white transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        ))}
      </div>
      
      {/* Gradients to fade edges */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default TechMarquee;
