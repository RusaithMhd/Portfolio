import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { pauseLenis, resumeLenis } from "./SmoothScroll";
import { FiX, FiGlobe, FiDownload, FiFileText } from "react-icons/fi";

const MediaModal = ({ isOpen, onClose, asset, allAssets, onSelectAsset }) => {

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      pauseLenis();
      document.body.style.overflow = "hidden";
    } else {
      resumeLenis();
      document.body.style.overflow = "";
    }
    return () => {
      resumeLenis();
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!asset) return null;

  const hasLiveLink = asset.link && !asset.link.startsWith("#");

  const handleOpen = () => {
    if (!hasLiveLink) return;
    window.open(asset.link, "_blank");
  };

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal */}
          <motion.div
            key={asset.name}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative w-full max-w-3xl bg-[#050507] border border-white/10 rounded-3xl flex flex-col shadow-2xl max-h-[90dvh] sm:max-h-[88vh]"
          >
            {/* Top highlight */}
            <div className="h-[1px] w-full flex-shrink-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-3xl" />

            {/* HEADER */}
            <div className="flex items-center gap-4 px-5 py-4 sm:px-8 sm:py-6 border-b border-white/5 flex-shrink-0">
              {/* Asset icon */}
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-xl text-white/80">
                {asset.icon}
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-light text-white tracking-wide truncate">
                  {asset.name}
                </h2>
                <p className="text-[11px] text-white/50 font-medium uppercase tracking-widest mt-1">
                  {asset.type} · {asset.size}
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 text-white/50 hover:text-white flex-shrink-0 bg-white/5"
                aria-label="Close"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* SCROLLABLE BODY */}
            <div
              data-lenis-prevent
              className="modal-scroll flex-1 overflow-y-auto overscroll-contain min-h-0 p-5 sm:p-8 space-y-6"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.2) transparent" }}
            >
              {/* Versions */}
              {asset.versions ? (
                <div className="space-y-3">
                  <p className="text-[11px] font-medium uppercase tracking-[3px] text-white/40 px-1">
                    Available Versions
                  </p>
                  {asset.versions.map((version, i) => (
                    <a
                      key={i}
                      href={version.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04] transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                        <FiFileText className="text-white/80 text-lg group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-medium text-white group-hover:text-white transition-colors">
                          {version.label}
                        </p>
                        <p className="text-[11px] text-white/50 font-light mt-1">
                          {i === 0 ? "Standard portfolio resume · PDF" : "Optimized for applicant tracking systems · PDF"}
                        </p>
                      </div>
                      <FiDownload className="text-white/40 group-hover:text-white transition-colors flex-shrink-0 text-lg" />
                    </a>
                  ))}
                </div>
              ) : (
                /* Generic about block for non-versioned assets */
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                  <p className="text-[11px] font-medium uppercase tracking-[3px] text-white/40">
                    About this File
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed font-light">
                    {asset.type === "PDF"
                      ? `This is the official ${asset.name} document. You can view it directly in your browser or download it to your device.`
                      : `This ${asset.type} package contains professional assets for ${asset.name}. Open to access the contents.`}
                  </p>
                </div>
              )}

              {/* File details */}
              <div className="rounded-3xl border border-white/10 overflow-hidden divide-y divide-white/10 mt-6">
                {[
                  { label: "File Type",  value: asset.type },
                  { label: "File Size",  value: asset.size },
                  { label: "Access",     value: asset.canDownload ? "Download Available" : "View Only" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-4 bg-white/[0.02]">
                    <span className="text-sm text-white/50 font-medium">{row.label}</span>
                    <span className="text-sm font-light text-white">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Other assets */}
              {allAssets && allAssets.length > 1 && (
                <div className="space-y-3 pt-4">
                  <p className="text-[11px] font-medium uppercase tracking-[3px] text-white/40 px-1">
                    Other Assets
                  </p>
                  <div className="flex flex-col gap-3">
                    {allAssets
                      .filter((a) => a.name !== asset.name)
                      .map((related) => (
                        <button
                          key={related.name}
                          onClick={() => onSelectAsset?.(related)}
                          className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04] transition-all text-left group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg text-white/60 group-hover:text-white transition-colors flex-shrink-0 border border-white/10">
                            {related.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-base font-medium text-white/70 group-hover:text-white transition-colors truncate">
                              {related.name}
                            </p>
                            <p className="text-[11px] text-white/40 font-light mt-1">
                              {related.type} · {related.size}
                            </p>
                          </div>
                          <FiFileText className="text-white/30 group-hover:text-white transition-colors flex-shrink-0 text-base" />
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* FOOTER ACTIONS */}
            <div className="flex-shrink-0 px-5 sm:px-8 py-4 sm:py-5 bg-white/[0.02] border-t border-white/5 flex flex-col sm:flex-row gap-3 sm:gap-4 rounded-b-3xl">
              {hasLiveLink ? (
                <a
                  href={asset.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-widest hover:bg-white/90 hover:scale-[1.02] transition-all"
                >
                  <FiGlobe className="flex-shrink-0 text-lg" />
                  {asset.canDownload ? "View / Download" : "Open Document"}
                </a>
              ) : (
                <div className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-white/5 text-white/30 font-medium text-xs sm:text-sm uppercase tracking-widest border border-white/10 select-none">
                  <FiDownload className="flex-shrink-0 text-lg" />
                  Coming Soon
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

export default MediaModal;
