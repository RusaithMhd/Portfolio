import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

const MediaModal = ({ isOpen, onClose, asset, allAssets, onSelectAsset }) => {
  if (!asset) return null;

  const handleAction = (link) => {
    if (link.startsWith("#")) {
      onClose();
      setTimeout(() => {
        const element = document.getElementById(link.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
      return;
    }
    window.open(link, "_blank");
  };

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/90 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            key={asset.name}
            initial={{ scale: 0.9, opacity: 0, x: 100 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0.9, opacity: 0, x: -100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-[90vh] glass-morphism rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/10 flex flex-col md:flex-row shadow-2xl"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center z-[110] hover:bg-white/10 transition-colors shadow-neon-cyan border-white/20"
            >
              ✕
            </button>

            {/* Left Side: Preview Area */}
            <div className="flex-[1.5] min-h-[300px] md:min-h-0 bg-gradient-to-br from-black/60 to-transparent flex flex-col items-center justify-center p-8 md:p-12 text-center border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="grid-background absolute inset-0" />
              </div>
              
              <motion.div 
                key={`icon-${asset.name}`}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-7xl md:text-9xl mb-6 md:mb-10 drop-shadow-neon-cyan"
              >
                {asset.icon}
              </motion.div>
              
              <h2 className="text-2xl md:text-4xl font-black text-white mb-4 uppercase tracking-tighter">{asset.name}</h2>
              <p className="text-secondary max-w-md mb-8 md:mb-10 text-[10px] md:text-sm leading-relaxed opacity-60">
                Authorized system access for {asset.type} package. 
                Full metadata encryption active. Internal size verified at {asset.size}.
              </p>
              
              <div className="flex flex-col gap-4 relative z-10 w-full max-w-sm mx-auto">
                {asset.versions ? (
                  asset.versions.map((version, i) => (
                    <div key={i} className="flex flex-col gap-2 p-4 glass-morphism border-white/5 bg-white/[0.02] rounded-2xl group/version">
                      <span className="text-[9px] text-accent-cyan font-black uppercase tracking-[3px] text-left ml-2 mb-1">{version.label}</span>
                      <div className="flex gap-2">
                        <MagneticButton 
                          onClick={() => handleAction(version.link)}
                          className="flex-1 !py-3 border-white/10 hover:bg-white/5 uppercase tracking-widest text-[9px] font-black"
                        >
                          View
                        </MagneticButton>
                        <MagneticButton 
                          onClick={() => handleAction(version.link)}
                          className="flex-1 !py-3 bg-accent-cyan text-black border-none uppercase tracking-widest text-[9px] font-black hover:shadow-neon-cyan"
                        >
                          Fetch
                        </MagneticButton>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto justify-center">
                    <MagneticButton 
                      onClick={() => handleAction(asset.link)}
                      className="!px-6 md:!px-10 !py-3 md:!py-4 border-white/10 hover:bg-white/5 uppercase tracking-widest text-[10px] md:text-[11px] font-black w-full sm:w-auto"
                    >
                      {asset.link.startsWith("#") ? "Initialize Protocol" : "View Live"}
                    </MagneticButton>
                    {asset.canDownload && (
                      <MagneticButton 
                        onClick={() => handleAction(asset.link)}
                        className="!px-6 md:!px-10 !py-3 md:!py-4 bg-accent-cyan text-black border-none uppercase tracking-widest text-[10px] md:text-[11px] font-black hover:shadow-neon-cyan w-full sm:w-auto"
                      >
                        Fetch Source
                      </MagneticButton>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Navigation Area */}
            <div 
              data-lenis-prevent
              className="flex-1 p-8 md:p-10 flex flex-col gap-6 overflow-y-auto custom-scrollbar bg-white/[0.01] max-h-[40vh] md:max-h-none"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-black uppercase tracking-tighter text-lg md:text-xl">Asset Library</h3>
                <span className="text-[10px] text-accent-cyan font-mono px-2 py-1 glass rounded-md border-white/10">0{allAssets.length}</span>
              </div>
              
              <div className="flex flex-col gap-3">
                {allAssets.map((related) => {
                  const isActive = related.name === asset.name;
                  return (
                    <motion.div 
                      key={related.name}
                      whileHover={{ x: isActive ? 0 : 5 }}
                      onClick={() => onSelectAsset(related)}
                      className={`p-4 md:p-5 rounded-2xl flex items-center gap-4 group cursor-pointer transition-all border ${
                        isActive 
                        ? "bg-accent-cyan/10 border-accent-cyan/30 shadow-neon-cyan" 
                        : "bg-white/[0.02] border-white/5 hover:border-white/20"
                      }`}
                    >
                      <div className={`text-xl md:text-2xl transition-all duration-500 ${isActive ? "text-accent-cyan scale-110" : "opacity-40 group-hover:opacity-100 group-hover:text-accent-cyan"}`}>
                        {related.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className={`text-[12px] md:text-sm font-black uppercase tracking-tighter transition-colors ${isActive ? "text-white" : "text-white/60 group-hover:text-white"}`}>
                          {related.name}
                        </h4>
                        <p className="text-secondary text-[8px] md:text-[9px] uppercase font-bold tracking-wider opacity-30 group-hover:opacity-60">
                          {related.type} • {related.size}
                        </p>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse shadow-neon-cyan" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="mt-auto pt-8 border-t border-white/5">
                <div className="glass p-4 rounded-xl border-accent-purple/10 bg-accent-purple/5">
                  <p className="text-secondary text-[9px] md:text-[10px] leading-relaxed italic opacity-60">
                    System Note: High-resolution assets are optimized for professional display. 
                    Redistribution requires protocol authorization.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default MediaModal;
