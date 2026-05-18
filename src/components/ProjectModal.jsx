import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { pauseLenis, resumeLenis } from "./SmoothScroll";
import {
  FiShoppingCart, FiTrello, FiBox, FiMonitor, FiCpu, FiTarget,
  FiX, FiCode, FiCheckCircle, FiLayers, FiInfo, FiGlobe
} from "react-icons/fi";

const iconMap = {
  FiShoppingCart, FiTrello, FiBox, FiMonitor, FiCpu, FiTarget,
};

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [activeTab, setActiveTab] = React.useState("about");

  // Lock / unlock Lenis & body scroll
  useEffect(() => {
    if (isOpen) {
      pauseLenis();
      document.body.style.overflow = "hidden";
      setActiveTab("about");
    } else {
      resumeLenis();
      document.body.style.overflow = "";
    }
    return () => {
      resumeLenis();
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!project) return null;
  const Icon = iconMap[project.icon] || FiBox;
  const hasLiveLink = project.hosted_link && project.hosted_link !== "#";

  const tabs = [
    { id: "about",   label: "About",       icon: FiInfo },
    { id: "tech",    label: "Tech Stack",   icon: FiCode },
    { id: "details", label: "Info",         icon: FiLayers },
  ];

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8">

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 md:bg-black/85 backdrop-blur-sm md:backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative w-full max-w-4xl bg-[#050507] border border-white/10 rounded-3xl flex flex-col shadow-2xl max-h-[90dvh] sm:max-h-[88vh]"
          >
            {/* Top highlight */}
            <div className="h-[1px] w-full flex-shrink-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-3xl" />


            {/* HEADER */}
            <div className="flex items-center gap-4 px-5 py-4 sm:px-8 sm:py-6 border-b border-white/5 flex-shrink-0">
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                <Icon className="text-xl sm:text-2xl text-white/80" />
              </div>

              {/* Title + tags */}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-3xl font-light text-white tracking-wide leading-tight truncate">
                  {project.name}
                </h2>
                {/* Tags */}
                <div className="hidden sm:flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag.name}
                      className="text-[10px] font-medium text-white/60 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase tracking-wider"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Close */}
              <button
                onClick={onClose}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 text-white/50 hover:text-white flex-shrink-0 bg-white/5"
                aria-label="Close"
              >
                <FiX className="text-lg sm:text-xl" />
              </button>
            </div>

            {/* TABS */}
            <div className="flex justify-center border-b border-white/5 bg-white/[0.02] flex-shrink-0 overflow-x-auto scrollbar-none">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    "flex items-center gap-2 px-5 sm:px-8 py-4 sm:py-5",
                    "text-[11px] sm:text-[12px] font-medium uppercase tracking-widest",
                    "transition-all relative whitespace-nowrap flex-shrink-0",
                    activeTab === tab.id
                      ? "text-white"
                      : "text-white/40 hover:text-white/80",
                  ].join(" ")}
                >
                  <tab.icon className="text-sm flex-shrink-0" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="modal-tab-line"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-white"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* SCROLLABLE CONTENT */}
            <div
              data-lenis-prevent
              className="modal-scroll flex-1 overflow-y-auto overscroll-contain min-h-0 p-5 sm:p-8"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.2) transparent" }}
            >
              <AnimatePresence mode="wait">

                {/* ABOUT */}
                {activeTab === "about" && (
                  <motion.div
                    key="about"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="space-y-8"
                  >
                    {/* Tags on mobile */}
                    <div className="flex flex-wrap gap-2 sm:hidden">
                      {project.tags.map((tag) => (
                        <span
                          key={tag.name}
                          className="text-[10px] font-medium text-white/60 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase tracking-wider"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>

                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[3px] text-white/40 mb-3">
                        About this Project
                      </p>
                      <p className="text-white/70 text-sm sm:text-base leading-relaxed font-light">
                        {project.fullDescription || project.description}
                      </p>
                    </div>

                    {project.objectives && (
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-[3px] text-white/40 mb-3">
                          Key Deliverables
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          {project.objectives.map((obj, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5"
                            >
                              <FiCheckCircle className="text-white/80 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-white/70 font-light leading-relaxed">{obj}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* TECH STACK */}
                {activeTab === "tech" && (
                  <motion.div
                    key="tech"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="space-y-4"
                  >
                    <p className="text-[11px] font-medium uppercase tracking-[3px] text-white/40 mb-3">
                      Technologies Used
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(project.stackDetails || project.tags).map((item, i) => (
                        <div
                          key={i}
                          className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all group"
                        >
                          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors border border-white/10">
                            <FiCode className="text-white/80 text-lg group-hover:text-white transition-colors" />
                          </div>
                          <div className="min-w-0 flex flex-col justify-center">
                            <h4 className="text-white font-medium text-base mb-1 group-hover:text-white/90 transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-white/50 text-xs leading-relaxed font-light line-clamp-2">
                              {item.description || `Used for building and enhancing the ${item.name} layer.`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* PROJECT INFO */}
                {activeTab === "details" && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="space-y-4"
                  >
                    <p className="text-[11px] font-medium uppercase tracking-[3px] text-white/40 mb-3">
                      Project Details
                    </p>
                    <div className="rounded-3xl border border-white/10 overflow-hidden divide-y divide-white/10">
                      {(project.specs || []).map((spec, i) => (
                        <div
                          key={i}
                          className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6 sm:py-5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                        >
                          <span className="text-xs sm:text-sm text-white/50 font-medium">{spec.label}</span>
                          <span className="text-sm sm:text-base font-light text-white tracking-wide text-right">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* FOOTER CTA */}
            <div className="flex-shrink-0 px-5 sm:px-8 py-4 sm:py-5 bg-white/[0.02] border-t border-white/5 flex flex-col sm:flex-row gap-3 sm:gap-4 rounded-b-3xl">
              {hasLiveLink ? (
                <a
                  href={project.hosted_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-widest hover:bg-white/90 hover:scale-[1.02] transition-all"
                >
                  <FiGlobe />
                  View Live Site
                </a>
              ) : (
                <div className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-white/5 text-white/30 font-medium text-xs sm:text-sm uppercase tracking-widest border border-white/10 select-none">
                  <FiGlobe />
                  Not Publicly Live
                </div>
              )}
              <button
                onClick={onClose}
                className="py-3.5 px-8 rounded-full border border-white/20 text-white/60 hover:text-white hover:bg-white/10 font-semibold text-xs sm:text-sm uppercase tracking-widest transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default ProjectModal;
