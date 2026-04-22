import React from 'react';

const ImageProtector = ({ src, alt, className, removeWhiteBg = false }) => {
  const bgRemovalClass = removeWhiteBg 
    ? "mix-blend-screen filter invert brightness-110 contrast-125" 
    : "";

  return (
    <div 
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        background: "#ffffff",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)"
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Inner dot-grid pattern for premium feel */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: "radial-gradient(rgba(0,255,255,0.15) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      />
      {/* Inner radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(0,255,255,0.04) 0%, transparent 70%)" }} />

      {/* The Image */}
      <img 
        src={src} 
        alt={alt} 
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        className={`relative z-10 w-full h-full object-contain select-none pointer-events-none p-6 ${bgRemovalClass}`}
      />
      
      {/* Invisible shield */}
      <div 
        className="absolute inset-0 z-20 w-full h-full bg-transparent" 
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* Watermark */}
      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none overflow-hidden">
        <div 
          className="transform -rotate-45 font-black text-white/[0.07] text-3xl md:text-4xl tracking-[8px] uppercase whitespace-nowrap select-none"
        >
          © RUSAITH
        </div>
      </div>

      {/* Corner label */}
      <div className="absolute bottom-2 right-3 z-30 pointer-events-none">
        <span className="text-[7px] text-accent-cyan/30 font-mono uppercase tracking-[2px]">rusaith.dev</span>
      </div>
    </div>
  );
};


export default ImageProtector;
