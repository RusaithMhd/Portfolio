import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

// Custom cursor only makes sense on pointer (mouse) devices
const isTouchDevice = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window);

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useSpring(0, { damping: 25, stiffness: 400 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 400 });

  const trailX = useMotionValue(0);
  const trailY = useMotionValue(0);
  const trailXSpring = useSpring(trailX, { damping: 40, stiffness: 150 });
  const trailYSpring = useSpring(trailY, { damping: 40, stiffness: 150 });

  // Don't render at all on touch / mobile devices
  if (isTouchDevice()) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const moveMouse = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      trailX.set(e.clientX - 32);
      trailY.set(e.clientY - 32);
    };

    const handleHover = (e) => {
      const target = e.target;
      setIsHovering(
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        !!target.closest(".interactive") ||
        !!target.onclick
      );
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  return (
    <>
      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent-cyan pointer-events-none z-[9999] flex items-center justify-center shadow-neon-cyan hidden md:flex"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? "rgba(34, 211, 238, 1)" : "rgba(34, 211, 238, 0.5)",
        }}
      >
        <div className="w-1 h-1 bg-accent-cyan rounded-full animate-pulse" />
      </motion.div>

      {/* Glow trail */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 bg-accent-purple/10 rounded-full blur-2xl pointer-events-none z-[9998] hidden md:block"
        style={{ x: trailXSpring, y: trailYSpring }}
        animate={{ scale: isHovering ? 2 : 1 }}
      />
    </>
  );
};

export default CustomCursor;
