import React from "react";
import { motion } from "framer-motion";

const Modal = ({ title, message, buttonText, isError, setIsModalVisible }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/80 backdrop-blur-md px-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-sm bg-[#050507] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl overflow-hidden"
      >
        {/* Top Accent Line */}
        <div className={`absolute top-0 left-0 w-full h-[1px] ${isError ? "bg-gradient-to-r from-transparent via-red-500/50 to-transparent" : "bg-gradient-to-r from-transparent via-white/20 to-transparent"}`} />
        
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${isError ? "bg-red-500/10 border border-red-500/20 text-red-500" : "bg-white/5 border border-white/10 text-white"}`}>
          {isError ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>

        <h2 className="text-white text-xl font-medium tracking-wide mb-3">
          {title}
        </h2>
        
        <p className="text-white/60 text-sm leading-relaxed mb-8 font-light">
          {message}
        </p>

        <button
          onClick={setIsModalVisible}
          className={`w-full py-3.5 rounded-full font-semibold text-xs sm:text-sm uppercase tracking-widest transition-all ${
            isError
              ? "bg-transparent border border-red-500/50 text-red-500 hover:bg-red-500/10"
              : "bg-white text-black hover:bg-white/90 shadow-xl"
          }`}
        >
          {buttonText}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
