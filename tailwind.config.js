/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#09090B",
        secondary: "#A1A1AA",
        tertiary: "#18181B",
        "accent-cyan": "#22D3EE",
        "accent-purple": "#8B5CF6",
        "black-100": "#0D0D10",
        "black-200": "#050507",
        "white-100": "#FAFAFA",
        "glass-light": "rgba(255, 255, 255, 0.03)",
        "glass-dark": "rgba(0, 0, 0, 0.4)",
      },
      boxShadow: {
        card: "0px 35px 120px -15px rgba(0,0,0,0.8)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-hover": "0 8px 32px 0 rgba(34, 211, 238, 0.1)",
        "neon-cyan": "0 0 20px rgba(34, 211, 238, 0.3)",
        "neon-purple": "0 0 20px rgba(139, 92, 246, 0.3)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "none",
        "cyber-gradient": "linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)",
        "cyan-gradient": "linear-gradient(90deg, #22D3EE 0%, #06B6D4 100%)",
        "purple-gradient": "linear-gradient(90deg, #8B5CF6 0%, #7C3AED 100%)",
      },
      animation: {
        "liquid-blob": "liquid-blob 20s infinite alternate",
        "shimmer": "shimmer 2s infinite linear",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        "liquid-blob": {
          "0%": { transform: "translate(0, 0) scale(1)", borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)", borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)", borderRadius: "50% 40% 30% 60% / 40% 50% 60% 40%" },
          "100%": { transform: "translate(0, 0) scale(1)", borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
