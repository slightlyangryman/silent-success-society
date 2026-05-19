import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#FAFAF7",
          100: "#F4F4EF",
          200: "#E7E5DF",
          300: "#D4D2CC",
          500: "#71717A",
          700: "#3F3F46",
          900: "#18181B",
          950: "#0A0A0A",
        },
        amber: {
          accent: "#B45309",
          soft: "#C2845A",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Nanum Myeongjo"', "serif"],
        sans: ['"Pretendard Variable"', "Pretendard", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "680px",
        narrow: "560px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
