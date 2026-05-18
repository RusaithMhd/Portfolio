import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },

  build: {
    // Minify with esbuild (faster) — switch to 'terser' if you want more aggressive compression
    minify: "esbuild",

    // Inline small assets as base64 (reduces HTTP requests)
    assetsInlineLimit: 4096,

    // Split chunks so vendors don't bloat the main bundle
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — cached separately, rarely changes
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // Animation — large, cache it independently
          "vendor-motion": ["framer-motion"],
          // Three.js / 3D — only loaded if needed
          "vendor-three": ["three", "@react-three/fiber", "@react-three/drei"],
          // Icons — tree-shaken but still sizeable
          "vendor-icons": ["react-icons"],
          // Smooth scroll
          "vendor-lenis": ["lenis"],
        },
      },
    },

    // Warn at 600kb (give a little more room given 3D assets)
    chunkSizeWarningLimit: 600,

    // Generate sourcemaps only in dev (not production)
    sourcemap: false,
  },

  // Pre-bundle heavy deps to speed up dev server cold start
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion", "three"],
  },
});
