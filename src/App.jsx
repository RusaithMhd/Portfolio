import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

// Lazy Loaded Components for Code Splitting (Reduces Initial Load Time)
const About = lazy(() => import("./components/About"));
const Services = lazy(() => import("./components/Services"));
const Experience = lazy(() => import("./components/Experience"));
const Tech = lazy(() => import("./components/Tech"));
const Works = lazy(() => import("./components/Works"));
const MediaKit = lazy(() => import("./components/MediaKit"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Contact = lazy(() => import("./components/Contact"));
import PageLoader from "./components/PageLoader";
import SmoothScroll from "./components/SmoothScroll";
import SEOManager from "./components/SEOManager";
import { bg } from "./assets";
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
  }, []);

  // Called by the loader when its animation finishes
  const handleLoaderDone = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsLoading(false);
  };

  return (
    <BrowserRouter>
      {/* Dynamic SEO & URL Path Sync Manager */}
      <SEOManager isLoading={isLoading} />

      {/* Set a consistent dark premium background for the entire app */}
      <div className="relative z-0 bg-[#050507] min-h-screen overflow-x-hidden text-white">
        


        <AnimatePresence mode="wait">
          {isLoading && <PageLoader key="loader" onDone={handleLoaderDone} />}
        </AnimatePresence>

        <div className={isLoading ? "hidden" : "block"}>
          {/* Scroll Progress Indicator - Updated to orange */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-orange-500 origin-left z-[100] shadow-[0_0_10px_rgba(249,115,22,0.5)]"
            style={{ scaleX }}
          />
          
          <SmoothScroll>
            <div className="relative z-10">
              <Navbar />
              <Hero />
              <Suspense fallback={<div className="h-20 bg-[#050507]" />}>
                <About />
                <Services />
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
