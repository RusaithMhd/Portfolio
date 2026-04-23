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
    { id: "about",   label: "About",        icon: FiInfo },
    { id: "tech",    label: "Tech Stack",    icon: FiCode },
    { id: "details", label: "Project Info",  icon: FiLayers },
  ];

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        // Full-screen positioner — does NOT scroll
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal shell — fixed height so inner area can scroll */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative w-full max-w-4xl bg-[#0e0e10] border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col"
            // Constrained height — inner content scrolls inside this box
            style={{ maxHeight: "min(90vh, 700px)" }}
          >
            {/* ── TOP ACCENT ─────────────────────────────────────────── */}
            <div className="h-[2px] w-full bg-gradient-to-r from-accent-cyan via-accent-purple to-transparent flex-shrink-0 rounded-t-3xl" />

            {/* ── HEADER (never scrolls) ──────────────────────────────── */}
            <div className="flex items-start gap-4 p-5 md:p-7 border-b border-white/5 flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-accent-cyan/10 flex items-center justify-center border border-accent-cyan/20 flex-shrink-0 shadow-neon-cyan">
                <Icon className="text-xl text-accent-cyan" />
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight mb-2">
                  {project.name}
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag.name}
                      className="text-[10px] font-bold font-mono text-accent-cyan/70 bg-accent-cyan/5 border border-accent-cyan/15 px-2 py-0.5 rounded-md uppercase tracking-wider"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 text-white/50 hover:text-white flex-shrink-0"
                aria-label="Close"
              >
                <FiX />
              </button>
            </div>

            {/* ── TABS (never scrolls) ────────────────────────────────── */}
            <div className="flex border-b border-white/5 bg-black/20 flex-shrink-0 px-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3.5 text-[10px] font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-accent-cyan"
                      : "text-white/30 hover:text-white/60"
                  }`}
                >
                  <tab.icon className="text-sm" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="modal-tab-line"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-cyan shadow-neon-cyan"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* ── SCROLLABLE CONTENT AREA ─────────────────────────────── */}
            {/* data-lenis-prevent tells Lenis to ignore wheel events here */}
            <div
              data-lenis-prevent
              className="modal-scroll flex-1 overflow-y-auto overscroll-contain min-h-0 p-5 md:p-7"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(34,211,238,0.2) transparent" }}
            >
              <AnimatePresence mode="wait">

                {/* ABOUT */}
                {activeTab === "about" && (
                  <motion.div
                    key="about"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[3px] text-white/30 mb-3">
                        About this Project
                      </p>
                      <p className="text-secondary text-[15px] leading-relaxed">
                        {project.fullDescription || project.description}
                      </p>
                    </div>

                    {project.objectives && (
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[3px] text-white/30 mb-3">
                          Key Deliverables
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {project.objectives.map((obj, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-accent-cyan/20 transition-all"
                            >
                              <FiCheckCircle className="text-accent-cyan flex-shrink-0" />
                              <span className="text-sm text-white/70 font-medium">{obj}</span>
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[3px] text-white/30 mb-3">
                      Technologies Used
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(project.stackDetails || project.tags).map((item, i) => (
                        <div
                          key={i}
                          className="flex gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-accent-cyan/20 hover:bg-accent-cyan/[0.02] transition-all group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-cyan/20 transition-colors">
                            <FiCode className="text-accent-cyan" />
                          </div>
                          <div>
                            <h4 className="text-white font-black text-sm mb-1 group-hover:text-accent-cyan transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-secondary text-xs leading-relaxed opacity-60">
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[3px] text-white/30 mb-3">
                      Project Details
                    </p>
                    <div className="rounded-2xl border border-white/5 overflow-hidden divide-y divide-white/5">
                      {(project.specs || []).map((spec, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between px-5 py-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                        >
                          <span className="text-sm text-white/40 font-medium">{spec.label}</span>
                          <span className="text-sm font-black text-white tracking-wide">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* ── FOOTER CTA (never scrolls) ──────────────────────────── */}
            <div className="flex-shrink-0 px-5 md:px-7 py-4 bg-black/40 border-t border-white/5 flex flex-col sm:flex-row gap-3 rounded-b-3xl">
              {hasLiveLink ? (
                <a
                  href={project.hosted_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-accent-cyan text-black font-black text-sm uppercase tracking-widest hover:shadow-neon-cyan transition-all"
                >
                  <FiGlobe />
                  View Live Site
                </a>
              ) : (
                <div className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white/5 text-white/25 font-black text-sm uppercase tracking-widest border border-white/5 select-none">
                  <FiGlobe />
                  Not Publicly Live
                </div>
              )}
              <button
                onClick={onClose}
                className="sm:w-auto px-6 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white hover:bg-white/5 font-black text-sm uppercase tracking-widest transition-all"
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
