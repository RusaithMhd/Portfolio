import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Tech from "./components/Tech";
import Works from "./components/Works";
import MediaKit from "./components/MediaKit";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import LiquidBackground from "./components/LiquidBackground";
import CyberNetwork from "./components/CyberNetwork";
import StatusWidget from "./components/StatusWidget";
import PageLoader from "./components/PageLoader";
import SmoothScroll from "./components/SmoothScroll";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary min-h-screen overflow-x-hidden max-w-[100vw]">
        <AnimatePresence mode="wait">
          {isLoading && <PageLoader key="loader" />}
        </AnimatePresence>

        <div className={isLoading ? "hidden" : "block"}>
          {/* Scroll Progress Indicator */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-[100]"
            style={{ scaleX }}
          />
          
          <CustomCursor />
          <LiquidBackground />
          <div className="fixed inset-0 pointer-events-none z-[1] opacity-50">
            <CyberNetwork />
          </div>
          <StatusWidget />
          
          <SmoothScroll>
            <div className="relative z-10">
              <Navbar />
              <Hero />
              <About />
              <Experience />
              <Tech />
              <Works />
              <MediaKit />
              {/* <Testimonials /> */}
              <div className="relative z-0">
                <Contact />
              </div>
            </div>
          </SmoothScroll>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
