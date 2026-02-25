import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Retro palette
        cream: "#F5F5DC",
        amber: "#FFBF00",
        "green-crt": "#00FF00",
        beige: "#E8D5C4",
        "dark-brown": "#3E2723",
        "pastel-blue": "#B0C4DE",
        "pastel-pink": "#FFB6C1",
        "retro-gray": "#C0C0C0",
        "retro-black": "#1A1A1A",
        
        // CRT monitor colors
        "monitor-green": "#33FF33",
        "monitor-amber": "#FFB000",
        "monitor-white": "#F0F0F0",
        
        // Background variations
        "terminal-bg": "#0C0C0C",
        "paper-bg": "#FFFEF0",
      },
      fontFamily: {
        // Retro fonts
        mono: ["IBM Plex Mono", "Courier New", "monospace"],
        pixel: ["Press Start 2P", "monospace"],
        terminal: ["VT323", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "pixel-xs": "0.5rem",
        "pixel-sm": "0.625rem",
        "pixel-base": "0.75rem",
        "pixel-lg": "0.875rem",
        "pixel-xl": "1rem",
      },
      boxShadow: {
        retro: "4px 4px 0px 0px rgba(0, 0, 0, 0.25)",
        "retro-lg": "8px 8px 0px 0px rgba(0, 0, 0, 0.25)",
        crt: "inset 0 0 20px rgba(0, 255, 0, 0.1)",
        glow: "0 0 10px currentColor",
        "glow-lg": "0 0 20px currentColor",
      },
      animation: {
        blink: "blink 1s step-end infinite",
        scanline: "scanline 8s linear infinite",
        flicker: "flicker 0.15s infinite",
        "boot-sequence": "boot-sequence 2s ease-out",
      },
      keyframes: {
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.95" },
        },
        "boot-sequence": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "50%": { opacity: "1" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      backgroundImage: {
        "scanlines": "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)",
        "crt-pattern": "radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%)",
      },
      borderWidth: {
        3: "3px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
