import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { personalInfo, navigationPaths } from "../constants";
import { SectionWrapper } from "../hoc";
import { rusaith, bg } from "../assets";

import { FiArrowRight, FiAward, FiBriefcase, FiMapPin, FiCpu } from "react-icons/fi";

const StatusModule = ({ label, value, icon: Icon }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-orange-500/30 transition-all group cursor-default"
  >
    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-orange-500 group-hover:text-black transition-all">
      <Icon className="text-xl transition-colors" />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] text-white/40 font-medium uppercase tracking-[2px]">{label}</span>
      <span className="text-sm text-white/90 font-medium tracking-wide mt-1">{value}</span>
    </div>
  </motion.div>
);

const JourneyNode = ({ year, title, company, index }) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.2, 0.75)}
    className="relative pl-10 pb-10 group"
  >
    <div className="absolute left-0 top-0 w-[1px] h-full bg-white/10 group-last:h-1/2">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#050507] bg-orange-500 transition-transform group-hover:scale-125 shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-xs text-white/50 font-medium tracking-widest">{year}</span>
      <h4 className="text-white text-lg font-medium tracking-wide transition-colors group-hover:text-orange-500">{title}</h4>
      <p className="text-white/40 text-sm font-light tracking-wide">{company}</p>
    </div>
  </motion.div>
);

const About = () => {
  const { scrollY } = useScroll();

  // High-impact 3D Focus entrance for the portrait
  const portraitY = useTransform(scrollY, [400, 1200], [100, 0]);
  const portraitOpacity = useTransform(scrollY, [400, 900], [0, 1]);
  const portraitScale = useTransform(scrollY, [400, 1200], [0.9, 1.05]);
  const portraitRotate = useTransform(scrollY, [400, 1200], [-10, 0]);
  const portraitZ = useTransform(scrollY, [400, 1200], [-50, 0]);

  // Deep Background parallax for the bg.png
  const backgroundY = useTransform(scrollY, [400, 1500], [0, 200]);

  const Portrait = ({ className = "" }) => (
    <motion.div
      style={{
        y: portraitY,
        opacity: portraitOpacity,
        scale: portraitScale,
        rotateY: portraitRotate,
        z: portraitZ,
        perspective: 1200
      }}
      className={`relative w-full aspect-[4/5] overflow-visible ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent z-10" />
      <img
        src={rusaith}
        alt="MIM Rusaith — Freelance Web Developer and Graphic Designer based in Colombo, Sri Lanka"
        className="w-full h-full object-contain object-bottom grayscale-[0.4] brightness-90 contrast-110 transition-all duration-1000"
      />
    </motion.div>
  );

  return (
    <div className="relative w-full">
      {/* Dynamic Parallax Background Texture for About section */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute -inset-x-6 sm:-inset-x-16 -inset-y-10 sm:-inset-y-16 -z-10 pointer-events-none opacity-80 overflow-hidden"
      >
        <img
          src={bg}
          alt=""
          className="w-full h-full object-cover select-none filter brightness-50"
        />
        {/* Cinematic gradient overlay to keep text extremely readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/90 via-[#050507]/50 to-[#050507]" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start relative z-10">

        {/* Text Content Column */}
        <div className="flex flex-col gap-6 lg:gap-8 order-1">
          <motion.div variants={textVariant()} className="relative w-full">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
              <p className="text-[12px] uppercase tracking-[0.3em] text-orange-500/80 font-medium">Introduction</p>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] text-white">
              About MIM Rusaith — <br />
              <span className="font-semibold italic text-orange-500">Developer & Designer, Colombo</span>
            </h2>
            <h1 className="sr-only">About MIM Rusaith — Full Stack Developer & Designer in Sri Lanka</h1>
          </motion.div>

          <motion.div
            variants={fadeIn("", "", 0.1, 1)}
            className="space-y-6 lg:space-y-8"
          >
            <p className="text-white/70 text-base md:text-lg lg:text-xl leading-relaxed font-light max-w-xl">
              I am a digital craftsman specializing in frontend engineering and UI/UX design. I bridge the gap between high-end visual aesthetics and robust technical precision, building web experiences that feel as good as they look.
            </p>

            {/* Mobile Portrait - Only visible on small screens, placed after intro text */}
            <div className="lg:hidden w-full flex justify-center py-2">
              <Portrait className="max-w-[320px] h-[380px]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 w-full max-w-xl">
              <StatusModule label="Experience" value="4+ Years Active" icon={FiBriefcase} />
              <StatusModule label="Expertise" value="Design & Dev" icon={FiCpu} />
              <StatusModule label="Location" value="Colombo / SL" icon={FiMapPin} />
              <StatusModule label="Quality" value="100% Commitment" icon={FiAward} />
            </div>

            <div className="w-full max-w-xl pt-2">
              <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-3">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium tracking-widest">Core Milestones</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <JourneyNode index={0} year="2025" title="IT Executive & Designer" company="ChillFrost (Pvt) Ltd" />
                <JourneyNode index={1} year="2024" title="Web Developer" company="IMSS (Pvt) Ltd" />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-3 px-8 lg:px-10 py-4 bg-orange-500 text-black rounded-full text-sm font-bold hover:scale-105 transition-all shadow-[0_20px_50px_rgba(249,115,22,0.2)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.4)]"
              >
                Let's Collaborate <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Desktop Portrait Column - Hidden on mobile */}
        <div className="hidden lg:flex order-2 justify-center lg:justify-start h-full mt-4 lg:mt-0">
          <Portrait className="max-w-none lg:h-[580px]" />
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(About, navigationPaths.about);

