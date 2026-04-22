import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const LiquidBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-[#020202]">
      {/* Texture Layer */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-10">
        <div className="w-full h-full bg-black/5" />
      </div>

      {/* Global Scanlines */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 118, 0.06))",
          backgroundSize: "100% 4px, 3px 100%"
        }}
      />

      {/* Mouse Follow Neural Glow */}
      <motion.div 
        style={{
          left: springX,
          top: springY,
          transform: "translate(-50%, -50%)"
        }}
        className="absolute w-[600px] h-[600px] bg-accent-cyan/[0.05] rounded-full blur-[120px] z-0"
      />

      {/* Floating Cyber Blobs */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-accent-cyan/[0.03] rounded-full blur-[150px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent-purple/[0.03] rounded-full blur-[130px]"
        />
      </div>

      {/* Floating Data Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{ 
            y: [null, Math.random() * -200 - 50],
            opacity: [0, 0.3, 0],
            scale: [0, 1, 0]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            delay: Math.random() * 20 
          }}
          className="absolute w-1 h-1 bg-accent-cyan rounded-full shadow-[0_0_10px_#00ffff]"
        />
      ))}

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-[5]" />
    </div>
  );
};

export default LiquidBackground;
