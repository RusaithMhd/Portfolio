import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { projects } from "../constants";
import { fadeIn } from "../utils/motion";
import ProjectModal from "./ProjectModal";
import LogosModal from "./LogosModal";
import { 
  FiShoppingCart, FiTrello, FiBox, FiExternalLink, 
  FiMonitor, FiCpu, FiTarget, FiActivity, FiShield, FiBarChart2, FiLayers
} from "react-icons/fi";


const iconMap = {
  FiShoppingCart: FiShoppingCart,
  FiTrello: FiTrello,
  FiBox: FiBox,
  FiMonitor: FiMonitor,
  FiCpu: FiCpu,
  FiTarget: FiTarget,
};

const ProjectCard = ({ index, project, onClick }) => {
  const Icon = iconMap[project.icon] || FiBox;
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative h-full glass-card overflow-hidden group cursor-pointer p-8 flex flex-col justify-between border-white/5 hover:border-accent-cyan/30 transition-all duration-500 bg-black/40 ${
        index === 0 ? "md:col-span-2" : ""
      }`}
      onClick={onClick}
    >
      {/* Holographic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="relative z-10 translate-z-10">
        <div className="flex justify-between items-start mb-10">
          <div className="relative">
            <div className="absolute -inset-2 bg-accent-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent-cyan/40 transition-all duration-500 relative">
              <Icon className="text-3xl text-accent-cyan group-hover:scale-110 transition-transform filter drop-shadow-neon-cyan" />
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[8px] text-white/20 font-mono tracking-widest uppercase">Project_ID</span>
            <span className="text-[10px] text-accent-cyan font-black tracking-widest uppercase">0x{index.toString(16).padStart(2, '0')}</span>
          </div>
        </div>

        <h3 className="text-white text-3xl font-black uppercase tracking-tighter mb-4 group-hover:text-accent-cyan transition-colors">
          {project.name}
        </h3>
        <p className="text-secondary text-[15px] line-clamp-2 max-w-md opacity-40 group-hover:opacity-100 transition-opacity leading-relaxed font-medium">
          {project.description}
        </p>

        {/* Tactical Analysis Stats */}
        <div className="mt-8 flex gap-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FiActivity className="text-[10px] text-accent-cyan" />
              <span className="text-[8px] text-white/40 font-black uppercase tracking-widest">Perf</span>
            </div>
            <span className="text-[10px] text-white font-mono">98%</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FiShield className="text-[10px] text-accent-purple" />
              <span className="text-[8px] text-white/40 font-black uppercase tracking-widest">Sec</span>
            </div>
            <span className="text-[10px] text-white font-mono">Verified</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FiBarChart2 className="text-[10px] text-accent-cyan" />
              <span className="text-[8px] text-white/40 font-black uppercase tracking-widest">Score</span>
            </div>
            <span className="text-[10px] text-white font-mono">A+</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-6 mt-10">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={`${project.name}-${tag.name}`}
              className="text-[9px] font-black font-mono text-accent-cyan/60 bg-accent-cyan/5 border border-accent-cyan/10 px-3 py-1 rounded-sm uppercase tracking-widest"
            >
              #{tag.name}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <span className="text-[10px] text-white/20 font-mono tracking-widest uppercase">Sector_0{index + 1}</span>
          <div className="flex items-center gap-2 group/btn">
            <span className="text-[10px] text-accent-cyan font-black uppercase tracking-[3px] opacity-0 group-hover:opacity-100 transition-opacity">Initialize</span>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-accent-cyan/10 group-hover:border-accent-cyan/40 transition-all">
              <FiExternalLink className="text-white/20 group-hover:text-accent-cyan transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Scan Line */}
      <motion.div 
        animate={{ top: ["-100%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-20 bg-gradient-to-b from-transparent via-accent-cyan/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100"
      />
    </motion.div>
  );
};

const BentoGrid = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogosModalOpen, setIsLogosModalOpen] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[450px]">
        {projects.map((project, index) => (
          <ProjectCard 
            key={`project-${index}`}
            index={index}
            project={project}
            onClick={() => handleProjectClick(project)}
          />
        ))}

        {/* Freelance Logos Card */}
        <motion.div
          variants={fadeIn("up", "spring", projects.length * 0.1, 0.75)}
          className="relative glass-card overflow-hidden group cursor-pointer p-8 flex flex-col justify-between border-white/5 hover:border-accent-cyan/30 transition-all duration-500 bg-black/40"
          onClick={() => setIsLogosModalOpen(true)}
        >
          {/* Holographic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div className="relative">
                <div className="absolute -inset-2 bg-accent-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent-cyan/40 transition-all duration-500 relative">
                  <FiLayers className="text-3xl text-accent-cyan group-hover:scale-110 transition-transform filter drop-shadow-neon-cyan" />
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[8px] text-white/20 font-mono tracking-widest uppercase">Project_ID</span>
                <span className="text-[10px] text-accent-cyan font-black tracking-widest uppercase">0x{(projects.length).toString(16).padStart(2, '0')}</span>
              </div>
            </div>

            <h3 className="text-white text-3xl font-black uppercase tracking-tighter mb-4 group-hover:text-accent-cyan transition-colors">
              Freelance
            </h3>
            <p className="text-secondary text-[15px] opacity-40 group-hover:opacity-100 transition-opacity leading-relaxed font-medium">
              A collection of logos, posters, branding, invitations, and menu designs created for real clients.
            </p>
          </div>

          {/* Card Footer */}
          <div className="relative z-10 mt-auto">
            <div className="flex flex-wrap gap-2 mb-6">
              {["logos", "branding", "posters", "invitations", "menu"].map((tag) => (
                <span key={tag} className="text-[9px] font-black font-mono text-accent-cyan/60 bg-accent-cyan/5 border border-accent-cyan/10 px-3 py-1 rounded-sm uppercase tracking-widest">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <span className="text-[10px] text-white/20 font-mono tracking-widest uppercase">Sector_0{projects.length + 1}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-accent-cyan font-black uppercase tracking-[3px] opacity-0 group-hover:opacity-100 transition-opacity">Open Archive</span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-accent-cyan/10 group-hover:border-accent-cyan/40 transition-all">
                  <FiExternalLink className="text-white/20 group-hover:text-accent-cyan transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Scan Line */}
          <motion.div 
            animate={{ top: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-20 bg-gradient-to-b from-transparent via-accent-cyan/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100"
          />
        </motion.div>
      </div>

      <ProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />

      <LogosModal
        isOpen={isLogosModalOpen}
        onClose={() => setIsLogosModalOpen(false)}
      />
    </>
  );
};

export default BentoGrid;
