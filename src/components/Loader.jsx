import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        background: "#050507",
        zIndex: 1000,
      }}
    >
      {/* Modern 'Neural Diagnostic' Loader */}
      <div className="relative flex flex-col items-center gap-8">

        {/* The Scanning Core */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Pulsating Outer Rings */}
          <div className="absolute inset-0 border border-orange-500/10 rounded-full animate-ping" />
          <div className="absolute inset-4 border border-orange-500/20 rounded-full animate-pulse" />

          {/* Main Scanner Line (Vertical Movement) */}
          <div className="absolute inset-0 overflow-hidden rounded-full border border-white/5 bg-white/[0.01] backdrop-blur-sm">
            <motion.div
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_15px_rgba(249,115,22,0.8)] z-20"
            />
          </div>

          {/* Percentage Center */}
          <span className="text-3xl font-black text-white tracking-tighter z-30 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            {progress.toFixed(0)}<span className="text-orange-500 text-sm">%</span>
          </span>
        </div>

        {/* Diagnostic Status Log */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <p className="text-[10px] uppercase tracking-[0.5em] text-white font-bold">Neural Syncing</p>
          </div>

          <div className="h-4 overflow-hidden flex flex-col items-center">
            <motion.p
              animate={{ y: [0, -20, -40, -60, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "steps(4)" }}
              className="text-[8px] uppercase tracking-[0.2em] text-white/40 font-medium"
            >
              Initializing Core<br />
              Mapping Nodes<br />
              Optimizing Shaders<br />
              Fetching Assets
            </motion.p>
          </div>
        </div>

        {/* Bottom HUD Bar */}
        <div className="w-48 h-[1px] bg-white/5 relative">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            className="absolute inset-0 bg-orange-500 origin-left shadow-[0_0_10px_rgba(249,115,22,0.5)]"
          />
        </div>
      </div>
    </Html>
  );
};

export default CanvasLoader;
