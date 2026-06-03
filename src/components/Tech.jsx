import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { skillDescriptions } from "../constants/techConfig";
import { FiMonitor, FiDatabase, FiBox } from "react-icons/fi";

const techImages = {
  "React JS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "Odoo ERP": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/odoo/odoo-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  "XML": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xml/xml-original.svg",
  "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  "Photoshop": "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
  "Illustrator": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg",
  "Blender": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg",
  "3ds Max": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/3dsmax/3dsmax-original.svg",
};

const TechCard = ({ name, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="group relative flex flex-col p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    
    <div className="flex items-center gap-4 mb-4 relative z-10">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-white group-hover:scale-110 transition-all duration-500 overflow-hidden">
        <img 
          src={techImages[name]} 
          alt={name} 
          className="w-7 h-7 object-contain grayscale group-hover:grayscale-0 transition-all duration-500" 
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>
      <h3 className="text-white text-base font-medium tracking-wide">{name}</h3>
    </div>
    
    <p className="text-white/40 text-xs leading-relaxed font-light relative z-10 group-hover:text-white/70 transition-colors">
      {skillDescriptions[name] || "Technical expertise and implementation."}
    </p>
  </motion.div>
);

const CategorySection = ({ title, icon: Icon, techs, startIndex }) => (
  <div className="flex flex-col gap-8">
    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
        <Icon className="text-white/40 text-lg" />
      </div>
      <h3 className="text-white/60 text-xs uppercase tracking-[0.3em] font-medium">{title}</h3>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {techs.map((tech, i) => (
        <TechCard key={tech.name} name={tech.name} index={startIndex + i} />
      ))}
    </div>
  </div>
);

const Tech = () => {
  return (
    <div className="w-full py-20 relative">
      <div className="mb-20 text-left">
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-white/50 text-xs md:text-sm uppercase tracking-[0.3em] font-medium"
        >
          Technical Ecosystem
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-light tracking-tight leading-[1.1] text-white mt-4"
        >
          Tools <span className="font-semibold">& Stack</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
        <CategorySection 
          title="Web Development" 
          icon={FiMonitor} 
          techs={technologies.slice(0, 4)} 
          startIndex={0}
        />
        <CategorySection 
          title="Systems & Backend" 
          icon={FiDatabase} 
          techs={technologies.slice(4, 10)} 
          startIndex={4}
        />
        <CategorySection 
          title="Design & 3D" 
          icon={FiBox} 
          techs={technologies.slice(10)} 
          startIndex={10}
        />
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "tech");
