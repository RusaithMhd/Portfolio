import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const MagneticButton = ({ children, className = "", ...props }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.4, y: y * 0.4 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center px-8 py-3 glass rounded-full overflow-hidden group transition-all duration-300 hover:border-white/40 ${className}`}
      {...props}
    >
      <span className="relative z-10 font-medium group-hover:text-white transition-colors duration-300">
        {children}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -inset-1 shimmer opacity-0 group-hover:opacity-100" />
    </motion.button>
  );
};

export default MagneticButton;
