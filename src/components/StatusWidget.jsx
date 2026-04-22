import React from "react";
import { motion } from "framer-motion";
import { FiZap } from "react-icons/fi";

const StatusWidget = () => {
  return (
    <div className="fixed bottom-10 right-10 z-40 hidden lg:block pointer-events-none">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="glass-card bg-[#05080a]/80 border border-white/5 rounded-2xl p-4 flex items-center gap-5 shadow-2xl backdrop-blur-md"
      >
        <div className="flex items-center gap-4">
          {/* Icon Box */}
          <div className="relative w-12 h-12 rounded-2xl bg-[#0a0e14] border border-white/[0.02] flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.1)]">
            <FiZap className="text-xl text-accent-cyan" />
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent-cyan border-2 border-[#05080a]" />
          </div>
          
          {/* Protocol Text */}
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-accent-cyan/70 font-black uppercase tracking-[3px] mb-0.5">Protocol</span>
            <span className="text-[13px] text-white font-black uppercase tracking-tighter">Cyber Core Active</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-8 bg-white/10" />

        {/* Status Text */}
        <div className="flex flex-col justify-center">
          <span className="text-[10px] text-accent-purple/80 font-black uppercase tracking-[3px] mb-0.5">Status</span>
          <span className="text-[13px] text-accent-cyan font-black uppercase tracking-widest">Online</span>
        </div>
      </motion.div>
    </div>
  );
};

export default StatusWidget;
