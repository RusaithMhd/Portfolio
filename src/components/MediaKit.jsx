import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { publicUrls } from "../constants";
import MagneticButton from "./MagneticButton";
import MediaModal from "./MediaModal";

import {
  FiFileText,
  FiArchive,
  FiEdit,
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
    class: "LEAD",
    canDownload: true,
    link: publicUrls.resume
  },
  {
    name: "Project Portfolio",
    icon: <FiImage />,
    size: "12.8 MB",
    type: "PDF",
    class: "CORE",
    canDownload: true,
    link: publicUrls.resume 
  },
  {
    name: "My Works Archive",
    icon: <FiBox />,
    size: "Dynamic",
    type: "Web",
    class: "ARCHIVE",
    canDownload: false,
    link: "#projects"
  },
  {
    name: "Brand Identity Kit",
    icon: <FiArchive />,
    size: "4.5 MB",
    type: "ZIP",
    class: "ASSET",
    canDownload: true,
    link: "https://github.com/RusaithMhd"
  },
  {
    name: "Creative Proposal",
    icon: <FiBarChart />,
    size: "8.2 MB",
    type: "PPTX",
    class: "STRATEGIC",
    canDownload: false,
    link: "#contact"
  },
];

const MediaKit = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (asset) => {
    if (asset.link.startsWith("#")) {
      const element = document.getElementById(asset.link.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const handleDownload = (asset) => {
    if (asset.link === "#") return;
    window.open(asset.link, "_blank");
  };

  return (
    <div className="relative">
      {/* Background Decor - Digital Blueprint */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(0,255,255,0.1)_0,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:100px_100px]" />
      </div>

      <motion.div variants={textVariant()} className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-8 h-[1px] bg-accent-cyan" />
            <p className="text-white font-black uppercase tracking-[5px] text-[10px] opacity-40">Resource_Uplink</p>
          </div>
          <h2 className={styles.sectionHeadText}>Media Kit_</h2>
        </div>
        <div className="hidden md:flex flex-col items-end gap-1 mb-4 opacity-20">
          <span className="text-[8px] text-white font-mono tracking-[4px] uppercase italic">Transfer_Protocol: v2.4</span>
          <span className="text-[10px] text-accent-cyan font-black uppercase tracking-widest">Access_Granted</span>
        </div>
      </motion.div>

      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-6 text-secondary text-[16px] max-w-2xl leading-[30px] font-medium opacity-60"
        >
          Access professional credentials, technical archives, and creative assets.
          Every resource in this terminal is optimized for cross-platform strategic collaboration.
        </motion.p>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {assets.map((asset, index) => (
          <motion.div
            key={asset.name}
            variants={fadeIn("up", "spring", index * 0.1, 0.75)}
            className="group relative flex flex-col justify-between h-full cursor-pointer perspective-1000"
            onClick={() => handleView(asset)}
          >
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent-cyan/20 group-hover:border-accent-cyan transition-colors z-20" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent-cyan/20 group-hover:border-accent-cyan transition-colors z-20" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent-cyan/20 group-hover:border-accent-cyan transition-colors z-20" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent-cyan/20 group-hover:border-accent-cyan transition-colors z-20" />

            <div className="glass-card p-6 lg:p-10 rounded-sm flex flex-col justify-between h-full bg-black/60 border border-white/5 group-hover:border-accent-cyan/30 transition-all duration-500 overflow-hidden relative">
              {/* Noise Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none mix-blend-overlay bg-black/5" />
              
              {/* Technical Data Background Labels */}
              <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-between pointer-events-none opacity-[0.02] group-hover:opacity-[0.05] transition-opacity font-mono text-[8px] text-white">
                <div className="flex justify-between">
                  <span>DATA_CLUSTER_0{index + 1}</span>
                  <span>SYS_ID: 0x{index}FF</span>
                </div>
                <div className="flex justify-between items-end">
                  <span>SEC_LVL: A</span>
                  <div className="flex flex-col items-end">
                    <span>BIT_RATE: 2048</span>
                    <span>UPLINK: ACTIVE</span>
                  </div>
                </div>
              </div>

              {/* Asset Pattern Decor */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity pointer-events-none">
                <div className="text-[10rem] lg:text-[12rem] rotate-12">{asset.icon}</div>
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6 lg:mb-10">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-accent-cyan/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl bg-white/5 flex items-center justify-center text-2xl lg:text-3xl text-white/20 group-hover:text-accent-cyan group-hover:bg-accent-cyan/5 border border-white/10 group-hover:border-accent-cyan/40 transition-all duration-500 relative">
                      {asset.icon}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-[8px] font-black uppercase tracking-[3px] px-3 py-1 rounded-full border shadow-neon-cyan/20 ${
                      asset.class === 'LEAD' ? 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10' : 'text-white/40 border-white/10 bg-white/5'
                    }`}>
                      {asset.class}
                    </span>
                    <span className="text-[8px] text-white/10 font-mono mt-3 tracking-widest uppercase italic">
                      SEC_ID_0{index}
                    </span>
                  </div>
                </div>

                <h3 className="text-white text-xl lg:text-3xl font-black uppercase tracking-tighter mb-2 lg:mb-4 group-hover:text-accent-cyan transition-colors">
                  {asset.name}
                </h3>
                <p className="text-secondary text-[8px] lg:text-[10px] mb-6 lg:mb-8 opacity-40 group-hover:opacity-80 transition-opacity uppercase tracking-[4px] font-black">
                  SIZE_{asset.size} // TYPE_{asset.type}
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-8 border-t border-white/5 relative z-10">
                <div className="flex items-center justify-between group/btn cursor-pointer" onClick={(e) => { e.stopPropagation(); handleView(asset); }}>
                  <span className="text-[10px] text-white/40 font-black uppercase tracking-[3px] group-hover/btn:text-white transition-colors">Tactical_Scan</span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/btn:border-accent-cyan/40 transition-all">
                    <FiEye className="text-white/20 group-hover/btn:text-accent-cyan transition-colors" />
                  </div>
                </div>
                
                {asset.canDownload && (
                  <div className="flex items-center justify-between group/btn cursor-pointer" onClick={(e) => { e.stopPropagation(); handleDownload(asset); }}>
                    <span className="text-[10px] text-accent-cyan font-black uppercase tracking-[4px]">Retrieve_Asset</span>
                    <div className="w-8 h-8 rounded-full bg-accent-cyan/10 flex items-center justify-center border border-accent-cyan/20 group-hover/btn:border-accent-cyan/60 transition-all">
                      <FiDownload className="text-accent-cyan group-hover/btn:scale-110 transition-transform" />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Hover Scan Beam */}
              <motion.div 
                animate={{ top: ["-100%", "200%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-20 bg-gradient-to-b from-transparent via-accent-cyan/[0.05] to-transparent pointer-events-none opacity-0 group-hover:opacity-100"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        asset={selectedAsset}
        allAssets={assets}
        onSelectAsset={setSelectedAsset}
      />

      {/* Strategic Request Section - Neural Gateway */}
      <motion.div
        variants={fadeIn("up", "tween", 0.6, 0.5)}
        className="mt-32 relative group"
      >
        {/* Electric Flow Border */}
        <div className="absolute -inset-[2px] bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-cyan rounded-[2rem] lg:rounded-[3rem] opacity-30 group-hover:opacity-100 blur-[2px] transition-opacity duration-1000 animate-border-flow" />
        
        <div className="bg-[#050505] rounded-[1.9rem] lg:rounded-[2.9rem] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between p-8 md:p-12 lg:p-20 border border-white/5 shadow-2xl">
          {/* Parallax Background Decor */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-accent-purple/[0.03] rounded-full blur-[80px] lg:blur-[120px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[200px] lg:w-[400px] h-[200px] lg:h-[400px] bg-accent-cyan/[0.03] rounded-full blur-[60px] lg:blur-[100px] translate-y-1/2 -translate-x-1/4" />
            
            {/* Moving Grid Lines */}
            <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:40px_40px] lg:[background-size:60px_60px]" />
          </div>
          
          <div className="flex-1 relative z-10 space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 lg:gap-3 px-3 py-1.5 lg:px-4 lg:py-2 bg-accent-purple/10 border border-accent-purple/20 rounded-full">
              <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full bg-accent-purple animate-pulse shadow-neon-purple" />
              <span className="text-[8px] lg:text-[10px] text-accent-purple font-black uppercase tracking-[3px] lg:tracking-[5px]">Neural_Gateway_v4.0</span>
            </div>

            <div className="space-y-3 lg:space-y-4">
              <h3 className="text-white text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[1] lg:leading-[0.9] group-hover:text-accent-cyan transition-colors duration-500">
                Initialize Custom <br className="hidden md:block" />
                <span className="bg-cyber-gradient bg-clip-text text-transparent">Asset Request?</span>
              </h3>
              <p className="text-secondary text-base md:text-lg lg:text-xl opacity-60 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                Require unique mission data, strategic creative proposals, or full-clearance codebase access? 
                <span className="text-white opacity-100"> Authenticate your protocol</span> to initiate an encrypted direct transmission.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-8 pt-2 lg:pt-4">
              <div className="flex flex-col gap-0.5 lg:gap-1">
                <span className="text-[8px] lg:text-[9px] text-white/20 font-black uppercase tracking-[2px] lg:tracking-widest">Protocol</span>
                <span className="text-[10px] lg:text-xs text-white font-mono tracking-wider lg:tracking-widest uppercase">DIRECT_UPLINK</span>
              </div>
              <div className="w-px h-6 lg:h-8 bg-white/5" />
              <div className="flex flex-col gap-0.5 lg:gap-1">
                <span className="text-[8px] lg:text-[9px] text-white/20 font-black uppercase tracking-[2px] lg:tracking-widest">Priority</span>
                <span className="text-[10px] lg:text-xs text-accent-cyan font-mono tracking-wider lg:tracking-widest uppercase italic">HIGH_CLEARANCE</span>
              </div>
            </div>
          </div>

          <div className="mt-10 lg:mt-0 relative z-10 flex flex-col items-center gap-4 lg:gap-6 w-full lg:w-auto">
            <div className="relative group/btn w-full sm:w-auto">
              {/* Dynamic Button Glow */}
              <div className="absolute -inset-2 lg:-inset-4 bg-white/10 blur-xl lg:blur-2xl rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              
              <MagneticButton
                onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
                className="relative !bg-black/60 backdrop-blur-xl !text-white border border-accent-cyan/30 group-hover/btn:border-accent-cyan transition-all uppercase font-black tracking-[2px] lg:tracking-[4px] !px-8 !py-6 sm:!px-12 sm:!py-8 lg:!px-20 lg:!py-10 shadow-2xl text-xs lg:text-sm hover:scale-105 active:scale-95 overflow-hidden group/btn-inner w-full sm:w-auto"
              >
                <span className="relative z-10 group-hover/btn-inner:text-accent-cyan transition-colors whitespace-nowrap">Authenticate Uplink</span>
                
                {/* Internal Neon Glow */}
                <div className="absolute inset-0 bg-accent-cyan/5 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                
                {/* Internal Scan Beam */}
                <motion.div 
                  animate={{ left: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 bottom-0 w-12 lg:w-20 bg-gradient-to-r from-transparent via-accent-cyan/10 to-transparent skew-x-12 pointer-events-none"
                />

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-1.5 lg:w-2 h-1.5 lg:h-2 border-t border-l border-accent-cyan opacity-40" />
                <div className="absolute bottom-0 right-0 w-1.5 lg:w-2 h-1.5 lg:h-2 border-b border-r border-accent-cyan opacity-40" />
              </MagneticButton>

              {/* Tactical Status Label */}
              <div className="absolute -bottom-8 lg:-bottom-10 left-1/2 -translate-x-1/2 w-full flex flex-col items-center gap-1.5 lg:gap-2">
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="w-[20px] lg:w-[40px] h-[1px] bg-white/10" />
                  <span className="text-[7px] lg:text-[9px] text-white/40 font-black tracking-[2px] lg:tracking-[4px] uppercase whitespace-nowrap">Auth_Required</span>
                  <div className="w-[20px] lg:w-[40px] h-[1px] bg-white/10" />
                </div>
                <div className="flex items-center gap-1.5 lg:gap-2">
                  <div className="w-1 h-1 rounded-full bg-accent-cyan animate-pulse" />
                  <span className="text-[7px] lg:text-[8px] text-accent-cyan font-mono tracking-wider lg:tracking-widest uppercase">Uplink_Ready</span>
                </div>
              </div>
            </div>
            
            <div className="mt-10 lg:mt-12">
              <span className="text-[8px] lg:text-[10px] text-white/10 font-mono tracking-wider lg:tracking-widest uppercase">Response_Time: &lt; 24H</span>
            </div>
          </div>

          {/* Decorative Giant Icon */}
          <div className="absolute -right-10 -bottom-10 lg:-right-20 lg:-bottom-20 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-1000 rotate-12 scale-100 lg:scale-150 pointer-events-none">
            <FiArchive className="text-[15rem] lg:text-[30rem]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(MediaKit, "mediakit");

