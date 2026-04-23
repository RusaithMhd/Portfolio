import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);

  // Main cursor
  const cursorX = useSpring(0, { damping: 25, stiffness: 400 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 400 });

  // Liquid trail
  const trailX = useMotionValue(0);
  const trailY = useMotionValue(0);
  const trailXSpring = useSpring(trailX, { damping: 40, stiffness: 150 });
  const trailYSpring = useSpring(trailY, { damping: 40, stiffness: 150 });

  useEffect(() => {
    let isTouching = false;

    const moveMouse = (e) => {
      let clientX, clientY;
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
        isTouching = true;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      if (clientX === undefined || clientY === undefined) return;

      cursorX.set(clientX - 16);
      cursorY.set(clientY - 16);
      trailX.set(clientX - 32);
      trailY.set(clientY - 32);
    };

    const handleTouchEnd = () => {
      isTouching = false;
    };

    const handleScroll = () => {
      // If user is actively touching or on desktop, don't use autonomous mode
      if (window.innerWidth >= 1024 || isTouching) return;
      
      // Autonomous Drone Scanner mode during momentum scrolling on mobile
      const progress = window.scrollY;
      const targetX = (window.innerWidth / 2) + Math.sin(progress * 0.005) * (window.innerWidth * 0.35);
      const targetY = (window.innerHeight / 2) + Math.cos(progress * 0.008) * (window.innerHeight * 0.25);
      
      cursorX.set(targetX - 16);
      cursorY.set(targetY - 16);
      trailX.set(targetX - 32);
      trailY.set(targetY - 32);
    };

    const handleHover = (e) => {
      const target = e.target;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest(".interactive") ||
        target.onclick
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("touchmove", moveMouse, { passive: true });
    window.addEventListener("touchstart", moveMouse, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("touchmove", moveMouse);
      window.removeEventListener("touchstart", moveMouse);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  return (
    <>
      {/* Main Responsive Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent-cyan pointer-events-none z-[9999] flex items-center justify-center shadow-neon-cyan"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? "rgba(34, 211, 238, 1)" : "rgba(34, 211, 238, 0.5)",
        }}
      >
        <div className="w-1 h-1 bg-accent-cyan rounded-full animate-pulse" />
      </motion.div>
      
      {/* Subtle Liquid Glow Trail */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 bg-accent-purple/10 rounded-full blur-2xl pointer-events-none z-[9998] shadow-neon-purple"
        style={{
          x: trailXSpring,
          y: trailYSpring,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
        }}
      />
    </>
  );
};

export default CustomCursor;
