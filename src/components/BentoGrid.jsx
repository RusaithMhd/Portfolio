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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden group flex flex-col rounded-3xl border border-white/10 hover:border-orange-500/30 transition-all duration-500 bg-white/[0.02] backdrop-blur-md shadow-2xl ${
        isFeatured ? "md:col-span-2" : ""
      }`}
    >
      {/* Dynamic Gradient Light */}
      <div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249, 115, 22, 0.08), transparent 40%)`
        }}
      />

      {/* Top subtle highlight */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-8 gap-6 relative z-10">

        {/* Header row: Icon + Badge */}
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-500">
            <Icon className="text-2xl text-white/80 group-hover:scale-110 group-hover:text-white transition-all" />
          </div>
          {isFeatured && (
            <span className="px-4 py-1.5 rounded-full text-[10px] font-medium uppercase tracking-widest bg-white/10 text-white border border-white/20">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <div>
          <h3 className="text-white text-2xl font-light tracking-wide leading-tight mb-3 group-hover:text-white/90 transition-colors">
            {project.name}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-opacity line-clamp-3 font-light">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={`${project.name}-${tag.name}`}
              className="text-[10px] font-medium text-white/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full uppercase tracking-wider"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-8 pb-8 pt-4 flex items-center justify-between gap-4 mt-auto">
        <span className="text-[11px] text-white/40 uppercase tracking-widest font-medium">
          View details
        </span>
        <button
          onClick={onClick}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-[11px] font-bold uppercase tracking-widest hover:bg-white/90 hover:scale-105 transition-all group/btn"
        >
          View Project
          <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
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

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
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
          onMouseMove={handleMouseMove}
          className="relative overflow-hidden group flex flex-col rounded-3xl border border-white/10 hover:border-orange-500/30 transition-all duration-500 bg-white/[0.02] backdrop-blur-md shadow-2xl"
        >
          {/* Dynamic Gradient Light */}
          <div 
            className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249, 115, 22, 0.08), transparent 40%)`
            }}
          />

          {/* Top highlight */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

          {/* Body */}
          <div className="flex flex-col flex-1 p-8 gap-6 relative z-10">
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-500">
                <FiLayers className="text-2xl text-white/80 group-hover:scale-110 group-hover:text-white transition-transform" />
              </div>
              <span className="px-4 py-1.5 rounded-full text-[10px] font-medium uppercase tracking-widest bg-white/5 text-white/60 border border-white/10">
                Freelance
              </span>
            </div>

            <div>
              <h3 className="text-white text-2xl font-light tracking-wide leading-tight mb-3 transition-colors">
                Design Work
              </h3>
              <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-opacity line-clamp-3 font-light">
                A collection of logos, posters, branding, invitations, and menu designs created for real clients.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
              {["Logos", "Branding", "Posters", "Menus"].map((tag) => (
                <span key={tag} className="text-[10px] font-medium text-white/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 px-8 pb-8 pt-4 flex items-center justify-between gap-4 mt-auto">
            <span className="text-[11px] text-white/40 uppercase tracking-widest font-medium">
              Browse work
            </span>
            <button
              onClick={() => setIsLogosModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:scale-105 transition-all group/btn border border-white/20 hover:border-white"
            >
              Browse Work
              <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
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
