import { useEffect } from "react";
import Lenis from "lenis";

// Expose the lenis instance globally so other components (like modals) can pause/resume it
let lenisInstance = null;

export const getLenis = () => lenisInstance;
export const pauseLenis = () => lenisInstance?.stop();
export const resumeLenis = () => lenisInstance?.start();

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisInstance = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleResize = () => {
      lenis.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      lenis.destroy();
      lenisInstance = null;
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return children;
};

export default SmoothScroll;
