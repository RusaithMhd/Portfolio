import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { textVariant, fadeIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

import { 
  SiReact, SiJavascript, SiTailwindcss, SiHtml5, SiHtml5 as SiCss3,
  SiMysql, SiGit
} from "react-icons/si";
import { FiBox, FiCpu, FiLayout, FiDatabase, FiSettings, FiImage, FiPenTool } from "react-icons/fi";

const iconMap = {
  "SiReact": SiReact,
  "SiJavascript": SiJavascript,
  "SiTailwindcss": SiTailwindcss,
  "SiHtml5": SiHtml5,
  "SiCss3": SiCss3,
  "SiAdobephotoshop": FiImage,
  "SiAdobeillustrator": FiPenTool,
  "SiMysql": SiMysql,
  "SiGit": SiGit,
  "FiBox": FiBox
};

const techCategories = [
  {
    name: "Development",
    icon: FiCpu,
    items: technologies.filter(t => ["React JS", "JavaScript", "Tailwind CSS", "HTML 5", "CSS 3", "Git"].includes(t.name))
  },
  {
    name: "Visual Design",
    icon: FiLayout,
    items: technologies.filter(t => ["Photoshop", "Illustrator"].includes(t.name))
  },
  {
    name: "Core Systems",
    icon: FiDatabase,
    items: technologies.filter(t => ["Odoo ERP", "MySQL"].includes(t.name))
  }
];

const TechChip = ({ tech, index, rotation, total }) => {
  const Icon = iconMap[tech.icon] || FiBox;
  
  // Responsive Radius and Sizing
  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const radius = isMobile ? 120 : 320;
  const angle = (index * (360 / total)) * (Math.PI / 180);
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  // Radar hit detection
  const sweepPos = (rotation % 360);
  const chipAngle = (index * (360 / total));
  const isHit = Math.abs(sweepPos - chipAngle) < 25 || Math.abs(sweepPos - chipAngle - 360) < 25;

  return (
    <motion.div
      style={{ 
        position: 'absolute',
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)'
      }}
      animate={{ 
        opacity: isHit ? 1 : 0.05,
        scale: isHit ? (isMobile ? 0.9 : 1.1) : (isMobile ? 0.6 : 0.8),
        filter: isHit ? "brightness(1.5) contrast(1.2)" : "brightness(0.5) blur(2px)"
      }}
      className="z-20 group"
    >
      {/* Tracking Line to Center */}
      {isHit && (
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: radius }}
          className="absolute top-1/2 right-1/2 h-[1px] bg-gradient-to-l from-accent-cyan to-transparent origin-right pointer-events-none opacity-20"
          style={{ transform: `rotate(${angle + Math.PI}rad)` }}
        />
      )}

      <div className={`relative ${isMobile ? 'p-2' : 'p-4'} glass-morphism border-white/10 bg-black/80 rounded-xl flex flex-col items-center gap-2 ${isMobile ? 'min-w-[70px]' : 'min-w-[100px]'}`}>
        <div className={`${isMobile ? 'w-6 h-6' : 'w-10 h-10'} rounded-lg bg-white/5 flex items-center justify-center text-accent-cyan border border-white/5`}>
          <Icon className={isMobile ? 'text-xs' : 'text-xl'} />
        </div>
        {!isMobile && (
          <div className="text-center">
            <span className="text-[9px] text-white font-black uppercase tracking-widest block">{tech.name}</span>
            <div className="flex flex-col mt-1">
              <span className="text-[7px] text-white/20 font-mono">X: {Math.round(x)}</span>
              <span className="text-[7px] text-white/20 font-mono">Y: {Math.round(y)}</span>
            </div>
          </div>
        )}
        {isMobile && isHit && (
          <span className="text-[7px] text-white font-black uppercase tracking-tighter whitespace-nowrap">{tech.name}</span>
        )}
      </div>
    </motion.div>
  );
};

const Tech = () => {
  const [rotation, setRotation] = React.useState(0);
  const total = technologies.length;
  const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1.5) % 360);
    }, 20);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`relative ${isMobile ? 'py-20 min-h-[500px]' : 'py-40 min-h-[1000px]'} flex items-center justify-center overflow-hidden bg-black/20`}>
      {/* Circular Radar Base */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Radar Background Rings */}
        {(isMobile ? [100, 200, 300] : [200, 400, 600, 800]).map((size, i) => (
          <div 
            key={size}
            className="absolute rounded-full border border-white/[0.03] flex items-center justify-center"
            style={{ width: size, height: size }}
          >
            {!isMobile && <span className="absolute top-0 text-[8px] text-white/10 font-mono">DIST_{100 - i * 25}KM</span>}
          </div>
        ))}

        {/* Crosshair Lines */}
        <div className="absolute w-full h-[1px] bg-white/[0.02]" />
        <div className="absolute h-full w-[1px] bg-white/[0.02]" />

        {/* The Rotating Sweep */}
        <div 
          className="absolute rounded-full overflow-hidden"
          style={{ 
            width: isMobile ? '260px' : '800px', 
            height: isMobile ? '260px' : '800px',
            transform: `rotate(${rotation}deg)` 
          }}
        >
          <div className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(0,255,255,0.08)_350deg,rgba(0,255,255,0.2)_360deg)]" />
          <div className={`absolute top-1/2 left-1/2 ${isMobile ? 'w-[150px]' : 'w-[400px]'} h-[2px] bg-accent-cyan shadow-[0_0_20px_#00ffff] origin-left opacity-60`} />
        </div>

        {/* Central Hub */}
        <div className={`${isMobile ? 'w-8 h-8' : 'w-16 h-16'} glass-morphism rounded-full border border-accent-cyan/20 flex items-center justify-center z-30`}>
          <div className={`${isMobile ? 'w-1 h-1' : 'w-2 h-2'} bg-accent-cyan rounded-full animate-ping`} />
        </div>
      </div>

      {/* Title & Info */}
      <div className={`absolute ${isMobile ? 'top-10 left-1/2 -translate-x-1/2 w-full text-center' : 'top-20 left-10 text-left'} z-10 px-4`}>
        <motion.div variants={textVariant()}>
          <h2 className={`${isMobile ? 'text-3xl' : 'text-5xl'} text-white font-black uppercase tracking-tighter mb-4`}>Neural<br className={isMobile ? 'hidden' : ''}/>Arsenal.</h2>
          <div className={`flex ${isMobile ? 'justify-center' : 'flex-col'} items-center gap-4`}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent-cyan rounded-sm animate-pulse" />
              <span className="text-[9px] text-white/40 font-mono tracking-widest uppercase">Radar Active</span>
            </div>
            {!isMobile && <div className="text-[9px] text-white/20 font-mono uppercase">Scan Azimuth: {Math.round(rotation)}°</div>}
          </div>
        </motion.div>
      </div>

      {/* Circular Tech Nodes */}
      <div className={`relative ${isMobile ? 'w-[300px] h-[300px]' : 'w-[800px] h-[800px]'}`}>
        {technologies.map((tech, index) => (
          <TechChip 
            key={tech.name} 
            tech={tech} 
            index={index} 
            rotation={rotation} 
            total={total} 
          />
        ))}
      </div>

      {/* Tactical Data Panels - Hide on Mobile */}
      {!isMobile && (
        <div className="absolute bottom-20 right-10 z-10 flex flex-col gap-6 text-right">
          <div className="glass-morphism p-4 border-white/5 rounded-xl">
            <span className="text-[9px] text-white/20 font-mono block mb-1">TARGET_ACQUISITION</span>
            <span className="text-xl font-black text-white uppercase tracking-tighter">Verified</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[8px] text-white/10 font-mono uppercase">Sys Override: Inactive</span>
            <span className="text-[8px] text-white/10 font-mono uppercase">Uplink: 4.2TB/S</span>
          </div>
        </div>
      )}
    </div>
  );
};;

export default SectionWrapper(Tech, "tech");

