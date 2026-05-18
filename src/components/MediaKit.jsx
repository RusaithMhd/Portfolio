import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { publicUrls } from "../constants";
import MagneticButton from "./MagneticButton";
import MediaModal from "./MediaModal";

import {
  FiFileText,
  FiArchive,
  FiImage,
  FiBarChart,
  FiDownload,
  FiEye,
  FiBox,
  FiExternalLink
} from "react-icons/fi";

const assets = [
  {
    name: "Official Resume",
    icon: <FiFileText />,
    size: "1.2 MB",
    type: "PDF",
    class: "Essential",
    canDownload: true,
    link: publicUrls.resume,
    versions: [
      { label: "Official Version", link: publicUrls.resume },
      { label: "ATS Optimized", link: publicUrls.atsResume }
    ]
  },
  {
    name: "Project Portfolio",
    icon: <FiImage />,
    size: "12.8 MB",
    type: "PDF",
    class: "Core",
    canDownload: true,
    link: "#projects"
  },
  {
    name: "Works Archive",
    icon: <FiBox />,
    size: "Dynamic",
    type: "Web",
    class: "Archive",
    canDownload: false,
    link: "#projects"
  },
  {
    name: "Brand Identity Kit",
    icon: <FiArchive />,
    size: "4.5 MB",
    type: "ZIP",
    class: "Asset",
    canDownload: true,
    link: "#projects"
  },
  {
    name: "Creative Proposal",
    icon: <FiBarChart />,
    size: "8.2 MB",
    type: "PPTX",
    class: "Strategic",
    canDownload: false,
    link: "#projects"
  },
];

const MediaKit = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const handleDownload = (asset) => {
    if (asset.link === "#" || asset.link.startsWith("#")) {
      handleView(asset);
      return;
    }
    window.open(asset.link, "_blank");
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
      </div>

      <motion.div variants={textVariant()} className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <p className="text-[12px] uppercase tracking-[0.3em] text-white/50 font-medium">Resources & Files</p>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1] text-white">
            Media <span className="font-semibold">Kit</span>
          </h2>
        </div>
        <div className="hidden md:flex flex-col items-end gap-1 mb-4 opacity-50">
          <span className="text-[10px] text-white/60 uppercase tracking-widest font-medium">Updated 2026</span>
        </div>
      </motion.div>

      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-6 text-white/60 text-[16px] max-w-2xl leading-[30px] font-light"
        >
          Access professional credentials, technical archives, and creative assets.
          Every resource is curated for cross-platform collaboration.
        </motion.p>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {assets.map((asset, index) => {
          const isNavLink = asset.link.startsWith("#");
          const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

          const handleMouseMove = (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setMousePosition({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            });
          };

          return (
            <motion.div
              key={asset.name}
              variants={fadeIn("up", "spring", index * 0.1, 0.75)}
              className="group relative flex flex-col justify-between h-full cursor-pointer"
              onMouseMove={handleMouseMove}
              onClick={() => handleView(asset)}
            >
              <div className="p-8 lg:p-10 rounded-3xl flex flex-col justify-between h-full bg-white/[0.02] border border-white/10 group-hover:border-orange-500/30 transition-all duration-500 shadow-2xl backdrop-blur-md relative overflow-hidden">
                
                {/* Dynamic Gradient Light */}
                <div 
                  className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249, 115, 22, 0.08), transparent 40%)`
                  }}
                />

                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8 lg:mb-12">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/5 flex items-center justify-center text-2xl lg:text-3xl text-white/60 group-hover:text-orange-500 group-hover:bg-orange-500/10 border border-white/10 group-hover:border-orange-500/40 transition-all duration-500">
                      {asset.icon}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-medium uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-white group-hover:border-orange-500/40 group-hover:text-orange-500 transition-colors">
                        {asset.class}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-white text-2xl lg:text-3xl font-light tracking-wide mb-3 group-hover:text-white transition-colors">
                    {asset.name}
                  </h3>
                  <p className="text-white/50 text-[11px] lg:text-xs mb-8 font-medium uppercase tracking-[3px]">
                    {isNavLink ? `Redirect Link` : `${asset.size} • ${asset.type}`}
                  </p>
                </div>

                <div className="flex flex-col gap-4 pt-8 border-t border-white/10 relative z-10">
                  <div className="flex items-center justify-between group/btn cursor-pointer" onClick={(e) => { e.stopPropagation(); handleView(asset); }}>
                    <span className="text-[11px] text-white/60 font-medium uppercase tracking-[2px] group-hover/btn:text-orange-500 transition-colors">
                      {isNavLink ? "Open Link" : "Preview Document"}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/btn:border-orange-500/40 group-hover/btn:bg-orange-500/10 transition-all">
                      {isNavLink ? <FiExternalLink className="text-white/60 group-hover/btn:text-orange-500 transition-colors" /> : <FiEye className="text-white/60 group-hover/btn:text-orange-500 transition-colors" />}
                    </div>
                  </div>

                  {(asset.canDownload || isNavLink) && (
                    <div className="flex items-center justify-between group/btn cursor-pointer" onClick={(e) => { e.stopPropagation(); handleDownload(asset); }}>
                      <span className="text-[11px] text-white font-bold uppercase tracking-[2px] group-hover/btn:text-orange-500 transition-colors">
                        {isNavLink ? "Navigate" : "Download File"}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover/btn:bg-orange-500 group-hover/btn:border-orange-500 transition-all">
                        {isNavLink ? <FiExternalLink className="text-white group-hover/btn:text-black group-hover/btn:scale-110 transition-all" /> : <FiDownload className="text-white group-hover/btn:text-black group-hover/btn:scale-110 transition-all" />}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        asset={selectedAsset}
        allAssets={assets}
        onSelectAsset={setSelectedAsset}
      />

      {/* Strategic Request Section */}
      <motion.div
        variants={fadeIn("up", "tween", 0.6, 0.5)}
        className="mt-32 relative group"
      >
        <div className="bg-white/[0.02] rounded-[3rem] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between p-10 lg:p-20 border border-white/10 shadow-2xl backdrop-blur-md">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="flex-1 relative z-10 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
              <span className="text-[10px] text-white/80 font-medium uppercase tracking-[3px]">Custom Requests</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
                Need something <br className="hidden md:block" />
                <span className="font-semibold">specific?</span>
              </h3>
              <p className="text-white/60 text-lg lg:text-xl font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Require unique mission data, strategic creative proposals, or direct access? Reach out to initiate a conversation.
              </p>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 relative z-10 flex flex-col items-center gap-6 w-full lg:w-auto">
            <div className="relative group/btn w-full sm:w-auto">
              <MagneticButton
                onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
                className="relative bg-white text-black hover:bg-white/90 hover:scale-105 transition-all uppercase font-semibold tracking-[2px] !px-12 !py-6 sm:!px-16 sm:!py-6 rounded-full shadow-2xl text-sm w-full sm:w-auto"
              >
                <span>Contact Me</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(MediaKit, "mediakit");

