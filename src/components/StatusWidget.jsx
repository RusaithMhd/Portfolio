import React from "react";
import { motion } from "framer-motion";
import { FiActivity } from "react-icons/fi";

const StatusWidget = () => {
  return (
    <div className="fixed bottom-10 right-10 z-40 hidden lg:block pointer-events-none">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="bg-white/[0.02] border border-white/10 rounded-3xl p-5 flex items-center gap-6 shadow-2xl backdrop-blur-md"
      >
        <div className="flex items-center gap-4">
          {/* Icon Box */}
          <div className="relative w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <FiActivity className="text-xl text-white/80" />
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white border-2 border-black" />
          </div>
          
          {/* Main Text */}
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-white/40 font-medium uppercase tracking-[3px] mb-0.5">System</span>
            <span className="text-[14px] text-white font-medium tracking-wide">All Services</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-8 bg-white/10" />

        {/* Status Text */}
        <div className="flex flex-col justify-center">
          <span className="text-[10px] text-white/40 font-medium uppercase tracking-[3px] mb-0.5">Status</span>
          <span className="text-[13px] text-white font-semibold uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Operational
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default StatusWidget;
