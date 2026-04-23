import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

// Lazy Loaded Components for Code Splitting (Reduces Initial Load Time)
const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Tech = lazy(() => import("./components/Tech"));
const Works = lazy(() => import("./components/Works"));
const MediaKit = lazy(() => import("./components/MediaKit"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Contact = lazy(() => import("./components/Contact"));
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
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Force scroll to top exactly when the loader finishes and the site is revealed
  useEffect(() => {
    if (!isLoading) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [isLoading]);

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary min-h-screen overflow-x-hidden">
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
              <Suspense fallback={<div className="h-20 bg-primary" />}>
                <About />
                <Experience />
                <Tech />
                <Works />
                <MediaKit />
                {/* <Testimonials /> */}
                <div className="relative z-0">
                  <Contact />
                </div>
              </Suspense>
            </div>
          </SmoothScroll>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
