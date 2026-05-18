import React, { useEffect } from "react";
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
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-[#050507]">
      {/* Texture Layer */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none z-10 bg-black/5" />

      {/* Mouse Follow Soft Glow */}
      <motion.div 
        style={{
          left: springX,
          top: springY,
          transform: "translate(-50%, -50%)"
        }}
        className="absolute w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[100px] z-0"
      />

      {/* Floating Blobs for Depth */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[150px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[130px]"
        />
      </div>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{ 
            y: [null, Math.random() * -100 - 50],
            opacity: [0, 0.4, 0],
            scale: [0, 1, 0]
          }}
          transition={{ 
            duration: Math.random() * 15 + 15, 
            repeat: Infinity, 
            delay: Math.random() * 20 
          }}
          className="absolute w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        />
      ))}

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-[5]" />
    </div>
  );
};

export default LiquidBackground;
