import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

/* ─── Easing curve for all reveals ─────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1];

/* ─── Letter-by-letter reveal ──────────────────────────────────── */
const SplitText = ({ text, className, delayBase = 0, stagger = 0.06 }) => (
  <span className="inline-flex overflow-hidden">
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ y: "105%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 1.1, delay: delayBase + i * stagger, ease: EASE }}
        className={className}
        style={{ display: "inline-block" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </span>
);

/* ─── Animated progress bar ────────────────────────────────────── */
const ProgressBar = ({ progress }) => (
  <div className="w-full max-w-xs space-y-3">
    {/* Track */}
    <div className="h-[1px] w-full bg-white/10 rounded-full overflow-hidden relative">
      {/* Fill */}
      <motion.div
        className="absolute inset-y-0 left-0 bg-accent-cyan rounded-full"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
      {/* Shimmer on fill */}
      {progress < 100 && (
        <motion.div
          className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
          animate={{ left: [`${Math.max(0, progress - 10)}%`, `${progress}%`] }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}
    </div>

    {/* Counter row */}
    <div className="flex items-center justify-between">
      <motion.span
        className="text-[10px] font-mono text-white/20 uppercase tracking-[3px]"
        animate={{ opacity: progress === 100 ? 0 : 1 }}
      >
        Loading
      </motion.span>
      <span className="text-[11px] font-black font-mono text-accent-cyan tabular-nums">
        {String(progress).padStart(3, "0")}%
      </span>
    </div>
  </div>
);

/* ─── Main Loader ───────────────────────────────────────────────── */
const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading | done

  /* Smooth progress tick — slows near 90, jumps to 100 at end */
  useEffect(() => {
    let current = 0;
    const tick = setInterval(() => {
      const remaining = 100 - current;
      const step = Math.max(0.4, remaining * 0.025); // eases as it approaches 100
      current = Math.min(100, current + step);
      setProgress(Math.floor(current));
      if (current >= 100) {
        clearInterval(tick);
        setTimeout(() => setPhase("done"), 500);
      }
    }, 18);
    return () => clearInterval(tick);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.9, ease: "easeInOut" },
      }}
      className="fixed inset-0 z-[200] bg-[#09090B] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Ambient background glow ────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(34,211,238,0.15),transparent)]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_-10%,rgba(139,92,246,0.08),transparent)]" />
      </div>

      {/* ── Thin top accent line ───────────────────────────── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-cyan via-accent-purple to-transparent origin-left"
      />

      {/* ── Content ────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6">

        {/* Role line */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="text-[10px] font-black uppercase tracking-[6px] text-accent-cyan/50"
        >
          Portfolio
        </motion.p>

        {/* Name */}
        <div className="flex flex-col items-center leading-none gap-1 select-none">
          <h1 className="text-[clamp(3.5rem,12vw,8rem)] font-black tracking-tighter leading-none text-white">
            <SplitText text="MIM" delayBase={0.4} stagger={0.1} className="text-white" />
          </h1>
          <h1 className="text-[clamp(3.5rem,12vw,8rem)] font-black tracking-tighter leading-none">
            <SplitText
              text="RUSAITH"
              delayBase={0.7}
              stagger={0.07}
              className="bg-cyber-gradient bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]"
            />
          </h1>
        </div>

        {/* Thin separator */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4, ease: EASE }}
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent"
        />

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
          className="flex flex-col items-center gap-2 w-full max-w-xs"
        >
          <ProgressBar progress={progress} />
        </motion.div>

        {/* Status text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex items-center gap-2"
        >
          <AnimatePresence mode="wait">
            {phase === "loading" ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-[10px] font-mono text-white/20 uppercase tracking-[4px]"
              >
                {/* Animated dot trio */}
                {[0, 0.2, 0.4].map((d, i) => (
                  <motion.span
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, delay: d, repeat: Infinity }}
                    className="w-1 h-1 rounded-full bg-accent-cyan inline-block"
                  />
                ))}
                Initializing
              </motion.span>
            ) : (
              <motion.span
                key="done"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-[10px] font-mono text-accent-cyan uppercase tracking-[4px]"
              >
                <motion.span
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 0.6, repeat: 2 }}
                  className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-neon-cyan inline-block"
                />
                Ready
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Corner decorations (subtle) ────────────────────── */}
      {["top-6 left-6", "top-6 right-6", "bottom-6 left-6", "bottom-6 right-6"].map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 + i * 0.1, duration: 0.6 }}
          className={`absolute ${pos} w-5 h-5 border-accent-cyan/20 ${
            i === 0 ? "border-t border-l" :
            i === 1 ? "border-t border-r" :
            i === 2 ? "border-b border-l" :
                      "border-b border-r"
          }`}
        />
      ))}
    </motion.div>
  );
};

export default Loader;
