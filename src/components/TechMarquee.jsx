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
    <div className="relative w-full overflow-hidden glass py-12 border-y border-white/5 bg-white/[0.02]">
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
            className="flex items-center gap-3 px-6 py-3 glass rounded-2xl border-white/5 hover:border-accent-cyan/20 transition-all group hover:bg-accent-cyan/5 shadow-xl hover:shadow-neon-cyan"
            whileHover={{ y: -5 }}
          >
            <div className="w-10 h-10 rounded-xl bg-accent-cyan/5 flex items-center justify-center group-hover:bg-accent-cyan/10 transition-colors">
              <Icon className="text-2xl text-accent-cyan opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all filter group-hover:drop-shadow-neon-cyan" />
            </div>
            <span className="text-white-100 font-black uppercase tracking-widest text-[10px] group-hover:text-accent-cyan transition-colors">
              {tech.name}
            </span>
          </motion.div>
              );
            })}
          </motion.div>
        ))}
      </div>
      
      {/* Gradients to fade edges */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-primary to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-primary to-transparent z-10" />
    </div>
  );
};

export default TechMarquee;
