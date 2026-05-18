// vite.config.js
import { defineConfig } from "file:///C:/Users/rusar/Desktop/Rusaith/portfolio/Rusaith-portfolio/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/rusar/Desktop/Rusaith/portfolio/Rusaith-portfolio/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }]
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
          "vendor-lenis": ["lenis"]
        }
      }
    },
    // Warn at 600kb (give a little more room given 3D assets)
    chunkSizeWarningLimit: 600,
    // Generate sourcemaps only in dev (not production)
    sourcemap: false
  },
  // Pre-bundle heavy deps to speed up dev server cold start
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion", "three"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxydXNhclxcXFxEZXNrdG9wXFxcXFJ1c2FpdGhcXFxccG9ydGZvbGlvXFxcXFJ1c2FpdGgtcG9ydGZvbGlvXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxydXNhclxcXFxEZXNrdG9wXFxcXFJ1c2FpdGhcXFxccG9ydGZvbGlvXFxcXFJ1c2FpdGgtcG9ydGZvbGlvXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9ydXNhci9EZXNrdG9wL1J1c2FpdGgvcG9ydGZvbGlvL1J1c2FpdGgtcG9ydGZvbGlvL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcblxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IFt7IGZpbmQ6IFwiQFwiLCByZXBsYWNlbWVudDogXCIvc3JjXCIgfV0sXG4gIH0sXG5cbiAgYnVpbGQ6IHtcbiAgICAvLyBNaW5pZnkgd2l0aCBlc2J1aWxkIChmYXN0ZXIpIFx1MjAxNCBzd2l0Y2ggdG8gJ3RlcnNlcicgaWYgeW91IHdhbnQgbW9yZSBhZ2dyZXNzaXZlIGNvbXByZXNzaW9uXG4gICAgbWluaWZ5OiBcImVzYnVpbGRcIixcblxuICAgIC8vIElubGluZSBzbWFsbCBhc3NldHMgYXMgYmFzZTY0IChyZWR1Y2VzIEhUVFAgcmVxdWVzdHMpXG4gICAgYXNzZXRzSW5saW5lTGltaXQ6IDQwOTYsXG5cbiAgICAvLyBTcGxpdCBjaHVua3Mgc28gdmVuZG9ycyBkb24ndCBibG9hdCB0aGUgbWFpbiBidW5kbGVcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgLy8gUmVhY3QgY29yZSBcdTIwMTQgY2FjaGVkIHNlcGFyYXRlbHksIHJhcmVseSBjaGFuZ2VzXG4gICAgICAgICAgXCJ2ZW5kb3ItcmVhY3RcIjogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIiwgXCJyZWFjdC1yb3V0ZXItZG9tXCJdLFxuICAgICAgICAgIC8vIEFuaW1hdGlvbiBcdTIwMTQgbGFyZ2UsIGNhY2hlIGl0IGluZGVwZW5kZW50bHlcbiAgICAgICAgICBcInZlbmRvci1tb3Rpb25cIjogW1wiZnJhbWVyLW1vdGlvblwiXSxcbiAgICAgICAgICAvLyBUaHJlZS5qcyAvIDNEIFx1MjAxNCBvbmx5IGxvYWRlZCBpZiBuZWVkZWRcbiAgICAgICAgICBcInZlbmRvci10aHJlZVwiOiBbXCJ0aHJlZVwiLCBcIkByZWFjdC10aHJlZS9maWJlclwiLCBcIkByZWFjdC10aHJlZS9kcmVpXCJdLFxuICAgICAgICAgIC8vIEljb25zIFx1MjAxNCB0cmVlLXNoYWtlbiBidXQgc3RpbGwgc2l6ZWFibGVcbiAgICAgICAgICBcInZlbmRvci1pY29uc1wiOiBbXCJyZWFjdC1pY29uc1wiXSxcbiAgICAgICAgICAvLyBTbW9vdGggc2Nyb2xsXG4gICAgICAgICAgXCJ2ZW5kb3ItbGVuaXNcIjogW1wibGVuaXNcIl0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICAvLyBXYXJuIGF0IDYwMGtiIChnaXZlIGEgbGl0dGxlIG1vcmUgcm9vbSBnaXZlbiAzRCBhc3NldHMpXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA2MDAsXG5cbiAgICAvLyBHZW5lcmF0ZSBzb3VyY2VtYXBzIG9ubHkgaW4gZGV2IChub3QgcHJvZHVjdGlvbilcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICB9LFxuXG4gIC8vIFByZS1idW5kbGUgaGVhdnkgZGVwcyB0byBzcGVlZCB1cCBkZXYgc2VydmVyIGNvbGQgc3RhcnRcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgaW5jbHVkZTogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIiwgXCJmcmFtZXItbW90aW9uXCIsIFwidGhyZWVcIl0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFcsU0FBUyxvQkFBb0I7QUFDM1ksT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUVqQixTQUFTO0FBQUEsSUFDUCxPQUFPLENBQUMsRUFBRSxNQUFNLEtBQUssYUFBYSxPQUFPLENBQUM7QUFBQSxFQUM1QztBQUFBLEVBRUEsT0FBTztBQUFBO0FBQUEsSUFFTCxRQUFRO0FBQUE7QUFBQSxJQUdSLG1CQUFtQjtBQUFBO0FBQUEsSUFHbkIsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBO0FBQUEsVUFFWixnQkFBZ0IsQ0FBQyxTQUFTLGFBQWEsa0JBQWtCO0FBQUE7QUFBQSxVQUV6RCxpQkFBaUIsQ0FBQyxlQUFlO0FBQUE7QUFBQSxVQUVqQyxnQkFBZ0IsQ0FBQyxTQUFTLHNCQUFzQixtQkFBbUI7QUFBQTtBQUFBLFVBRW5FLGdCQUFnQixDQUFDLGFBQWE7QUFBQTtBQUFBLFVBRTlCLGdCQUFnQixDQUFDLE9BQU87QUFBQSxRQUMxQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUdBLHVCQUF1QjtBQUFBO0FBQUEsSUFHdkIsV0FBVztBQUFBLEVBQ2I7QUFBQTtBQUFBLEVBR0EsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLFNBQVMsYUFBYSxpQkFBaUIsT0FBTztBQUFBLEVBQzFEO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
