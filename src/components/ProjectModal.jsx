import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { FiShoppingCart, FiTrello, FiBox, FiArrowRight, FiActivity, FiShield, FiCpu } from "react-icons/fi";

const iconMap = {
  FiShoppingCart: FiShoppingCart,
  FiTrello: FiTrello,
  FiBox: FiBox,
};

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [activeTab, setActiveTab] = React.useState("overview");
  if (!project) return null;
  const Icon = iconMap[project.icon] || FiBox;

  const tabs = [
    { id: "overview", label: "Strategic Overview", icon: FiActivity },
    { id: "stack", label: "Neural Stack", icon: FiCpu },
    { id: "specs", label: "System Specs", icon: FiShield },
  ];

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/95 backdrop-blur-3xl pointer-events-auto"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="relative w-full max-w-7xl h-full max-h-[92vh] glass-card rounded-[2.5rem] overflow-hidden border border-white/5 flex flex-col md:flex-row bg-[#080808] pointer-events-auto shadow-[0_0_100px_rgba(0,0,0,1)]"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center z-[60] hover:bg-white/10 transition-all border-white/10 text-white"
            >
              ✕
            </button>

            {/* Left Panel: Visual Identity */}
            <div className="w-full md:w-[40%] relative overflow-hidden bg-black/40 border-r border-white/5 flex flex-col p-12">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,255,0.1)_0,transparent_50%)]" />
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[1px] bg-accent-cyan" />
                  <span className="text-[10px] text-accent-cyan font-black uppercase tracking-[5px]">Project Briefing</span>
                </div>

                <h2 className="text-6xl font-black text-white uppercase tracking-tighter mb-6 leading-[0.9]">
                  {project.name}
                </h2>
                
                <div className="flex flex-wrap gap-2 mb-12">
                  {project.tags.map((tag) => (
                    <span key={tag.name} className="px-3 py-1 bg-white/5 border border-white/5 rounded-sm text-[9px] font-black font-mono text-white/40 uppercase tracking-widest">
                      #{tag.name}
                    </span>
                  ))}
                </div>

                <div className="mt-auto relative group">
                  <div className="absolute -inset-10 bg-accent-cyan/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon className="text-[15rem] text-white/[0.02] group-hover:text-accent-cyan/[0.05] transition-all duration-700" />
                  <div className="absolute bottom-0 left-0 space-y-4">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-white/20 font-mono tracking-widest uppercase mb-1">Status Report</span>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                        <span className="text-xs font-black text-white/60 tracking-widest uppercase">Uplink Stable</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Content & Interaction */}
            <div className="flex-1 flex flex-col bg-white/[0.01]">
              {/* Navigation Tabs */}
              <div className="flex border-b border-white/5 p-2 bg-black/20">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-3 py-4 text-[10px] font-black uppercase tracking-[3px] transition-all relative ${
                      activeTab === tab.id ? "text-accent-cyan" : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    <tab.icon className="text-sm" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-[1px] bg-accent-cyan shadow-neon-cyan" />
                    )}
                  </button>
                ))}
              </div>

              {/* Scrollable Content Area */}
              <div 
                data-lenis-prevent
                className="flex-1 overflow-y-auto custom-scrollbar p-12"
              >
                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-12"
                    >
                      <div className="space-y-6">
                        <h4 className="text-white text-3xl font-black uppercase tracking-tighter">Mission Statement</h4>
                        <p className="text-secondary text-lg leading-relaxed font-medium opacity-80">
                          {project.fullDescription || project.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-8 py-10 border-y border-white/5">
                        <div className="space-y-2">
                          <span className="text-[9px] text-white/20 font-black uppercase tracking-[3px]">Integrity Check</span>
                          <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "94%" }} className="h-full bg-accent-cyan shadow-neon-cyan" />
                          </div>
                          <span className="text-[10px] text-accent-cyan font-mono">94.8% OPTIMIZED</span>
                        </div>
                        <div className="space-y-2 text-right">
                          <span className="text-[9px] text-white/20 font-black uppercase tracking-[3px]">Security Level</span>
                          <p className="text-white font-black tracking-widest uppercase">Class-A Admin</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-white/40 text-[10px] font-black uppercase tracking-[5px]">Core Objectives</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {(project.objectives || ["Responsive Integration", "Neural Rendering", "Encrypted Data Bus", "Cloud Synchronization"]).map((obj, i) => (
                            <li key={i} className="flex items-center gap-4 p-4 glass-morphism border-white/5 bg-white/[0.01] rounded-xl">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                              <span className="text-xs font-black text-white/60 uppercase tracking-widest">{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "stack" && (
                    <motion.div
                      key="stack"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      {(project.stackDetails || project.tags).map((tag, i) => (
                        <div key={i} className="p-8 glass-morphism border-white/5 bg-white/[0.01] rounded-[2rem] flex flex-col gap-4 group hover:border-accent-cyan/40 transition-all">
                          <div className="flex items-center justify-between">
                            <FiCpu className="text-2xl text-accent-cyan opacity-40 group-hover:opacity-100 transition-opacity" />
                            <span className="text-[10px] font-mono text-white/20">MODULE_0{i + 1}</span>
                          </div>
                          <h5 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-accent-cyan transition-colors">{tag.name}</h5>
                          <p className="text-xs text-secondary opacity-60 leading-relaxed">{tag.description || `Integrated as a core architectural module for high-performance ${tag.name} data processing.`}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === "specs" && (
                    <motion.div
                      key="specs"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="p-10 glass-morphism border-white/5 bg-black/40 rounded-[2.5rem] space-y-8">
                        {(project.specs || [
                          { label: "Runtime Environment", value: "React Global Net" },
                          { label: "Data Integrity", value: "Verified SHA-256" },
                          { label: "Neural Response", value: "< 120ms" },
                          { label: "System Uptime", value: "99.99%" }
                        ]).map((spec, i) => (
                          <div key={i} className="flex items-center justify-between border-b border-white/5 pb-6 last:border-0 last:pb-0">
                            <span className="text-[10px] text-white/30 font-black uppercase tracking-[3px]">{spec.label}</span>
                            <span className="text-sm font-black text-white tracking-widest uppercase">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Bar */}
              <div className="p-8 bg-black/40 border-t border-white/5 flex gap-4">
                <MagneticButton 
                  className="flex-1 !py-6 bg-accent-cyan text-black border-none font-black uppercase tracking-[4px] text-xs shadow-neon-cyan hover:scale-[1.02] transition-transform"
                  onClick={() => window.open(project.hosted_link, "_blank")}
                >
                  Launch Operations
                </MagneticButton>
                <MagneticButton className="flex-[0.5] !py-6 glass border-white/10 text-white/60 font-black uppercase tracking-[4px] text-[10px] hover:bg-white/5 hover:text-white transition-all">
                  Access Code
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default ProjectModal;
