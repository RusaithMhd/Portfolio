import React, { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "../constants";
import { fadeIn } from "../utils/motion";
import ProjectModal from "./ProjectModal";
import LogosModal from "./LogosModal";
import {
  FiShoppingCart, FiTrello, FiBox, FiExternalLink, FiEye,
  FiMonitor, FiCpu, FiTarget, FiLayers, FiArrowRight
} from "react-icons/fi";

const iconMap = {
  FiShoppingCart,
  FiTrello,
  FiBox,
  FiMonitor,
  FiCpu,
  FiTarget,
};

const ProjectCard = ({ index, project, onClick }) => {
  const Icon = iconMap[project.icon] || FiBox;
  const isFeatured = index === 0;

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      className={`relative glass-card overflow-hidden group flex flex-col border-white/5 hover:border-accent-cyan/30 transition-all duration-500 bg-black/40 hover:shadow-neon-cyan ${
        isFeatured ? "md:col-span-2" : ""
      }`}
    >
      {/* Top gradient accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-accent-cyan via-accent-purple to-transparent" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-6 md:p-8 gap-5 relative z-10">

        {/* Header row: Icon + Badge */}
        <div className="flex items-start justify-between">
          <div className="relative">
            <div className="absolute -inset-2 bg-accent-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-14 h-14 rounded-2xl bg-accent-cyan/5 flex items-center justify-center border border-accent-cyan/10 group-hover:border-accent-cyan/40 group-hover:bg-accent-cyan/10 transition-all duration-500 relative">
              <Icon className="text-2xl text-accent-cyan group-hover:scale-110 transition-transform drop-shadow-sm" />
            </div>
          </div>
          {isFeatured && (
            <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <div>
          <h3 className="text-white text-xl md:text-2xl font-black uppercase tracking-tight leading-tight mb-2 group-hover:text-accent-cyan transition-colors">
            {project.name}
          </h3>
          {/* Description — always visible, not hidden */}
          <p className="text-secondary text-[13px] leading-relaxed opacity-60 group-hover:opacity-90 transition-opacity line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={`${project.name}-${tag.name}`}
              className="text-[10px] font-bold font-mono text-accent-cyan/70 bg-accent-cyan/5 border border-accent-cyan/10 px-2.5 py-1 rounded-md uppercase tracking-wider"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: Always-visible CTA */}
      <div className="relative z-10 px-6 md:px-8 pb-6 border-t border-white/5 pt-4 flex items-center justify-between gap-4">
        <span className="text-[11px] text-white/30 font-mono uppercase tracking-widest">
          Click to view details
        </span>
        <button
          onClick={onClick}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-cyan text-black text-[11px] font-black uppercase tracking-widest hover:shadow-neon-cyan transition-all group/btn"
        >
          View Project
          <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Scan line animation */}
      <motion.div
        animate={{ top: ["-100%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-16 bg-gradient-to-b from-transparent via-accent-cyan/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100"
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
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
          className="relative glass-card overflow-hidden group flex flex-col border-white/5 hover:border-accent-purple/30 transition-all duration-500 bg-black/40 hover:shadow-neon-purple"
        >
          {/* Top accent */}
          <div className="h-[2px] w-full bg-gradient-to-r from-accent-purple via-accent-cyan to-transparent" />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-transparent to-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Body */}
          <div className="flex flex-col flex-1 p-6 md:p-8 gap-5 relative z-10">
            <div className="flex items-start justify-between">
              <div className="relative">
                <div className="absolute -inset-2 bg-accent-purple/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-14 h-14 rounded-2xl bg-accent-purple/5 flex items-center justify-center border border-accent-purple/10 group-hover:border-accent-purple/40 group-hover:bg-accent-purple/10 transition-all duration-500 relative">
                  <FiLayers className="text-2xl text-accent-purple group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
                Freelance
              </span>
            </div>

            <div>
              <h3 className="text-white text-xl md:text-2xl font-black uppercase tracking-tight leading-tight mb-2 group-hover:text-accent-purple transition-colors">
                Design Work
              </h3>
              <p className="text-secondary text-[13px] leading-relaxed opacity-60 group-hover:opacity-90 transition-opacity line-clamp-3">
                A collection of logos, posters, branding, invitations, and menu designs created for real clients.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Logos", "Branding", "Posters", "Menus"].map((tag) => (
                <span key={tag} className="text-[10px] font-bold font-mono text-accent-purple/70 bg-accent-purple/5 border border-accent-purple/10 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 px-6 md:px-8 pb-6 border-t border-white/5 pt-4 flex items-center justify-between gap-4">
            <span className="text-[11px] text-white/30 font-mono uppercase tracking-widest">
              Click to browse
            </span>
            <button
              onClick={() => setIsLogosModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-purple text-white text-[11px] font-black uppercase tracking-widest hover:shadow-neon-purple transition-all group/btn"
            >
              Browse Work
              <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Scan line */}
          <motion.div
            animate={{ top: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-16 bg-gradient-to-b from-transparent via-accent-purple/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100"
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
