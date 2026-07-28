import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "2rem", lg: "3rem", xl: "4rem" },
      screens: { "2xl": "1360px" },
    },
    extend: {
      colors: {
        // Base — near-black with a faint violet cast so accents feel native.
        void: "#08080C",
        obsidian: "#0C0C12",
        graphite: "#14141C",
        // Accents
        iris: {
          DEFAULT: "#7C6BFF",
          soft: "#A99CFF",
          deep: "#4A38C7",
        },
        mint: {
          DEFAULT: "#3DDCC8",
          soft: "#7FEBDD",
          deep: "#12A594",
        },
        ember: {
          DEFAULT: "#FF8A5B",
          soft: "#FFB394",
        },
        // Text. Both muted tones clear WCAG AA against `void`: ash ~7.2:1,
        // slate ~4.7:1 — slate is used for small mono labels, so it can't go
        // any darker without failing.
        chalk: "#EDEDF2",
        ash: "#9A9AA8",
        slate: "#7A7A8A",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Fluid display scale — clamps mean no layout jumps between breakpoints.
        "display-sm": ["clamp(2.25rem, 6vw, 3.5rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2.75rem, 8vw, 5.25rem)", { lineHeight: "0.94", letterSpacing: "-0.035em" }],
        // Capped so a three-line hero statement still clears the fold on a
        // 1440x900 laptop, which is the most common desktop this will be seen on.
        "display-lg": ["clamp(2.75rem, 6.1vw, 5.5rem)", { lineHeight: "0.94", letterSpacing: "-0.04em" }],
        "display-xl": ["clamp(4rem, 15vw, 13rem)", { lineHeight: "0.86", letterSpacing: "-0.045em" }],
      },
      spacing: {
        section: "clamp(6rem, 14vh, 11rem)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      transitionTimingFunction: {
        // Shared motion language — every transition uses one of these.
        swift: "cubic-bezier(0.22, 1, 0.36, 1)",
        elastic: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        glide: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        "aurora-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(4%, -6%, 0) scale(1.12)" },
          "66%": { transform: "translate3d(-5%, 4%, 0) scale(0.94)" },
        },
        "blob-morph": {
          "0%, 100%": { borderRadius: "42% 58% 63% 37% / 46% 38% 62% 54%" },
          "34%": { borderRadius: "62% 38% 34% 66% / 58% 62% 38% 42%" },
          "67%": { borderRadius: "38% 62% 56% 44% / 62% 44% 56% 38%" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "caret-blink": {
          "0%, 45%, 100%": { opacity: "1" },
          "50%, 95%": { opacity: "0" },
        },
        "scroll-hint": {
          "0%": { transform: "translateY(-60%)", opacity: "0" },
          "40%": { opacity: "1" },
          "100%": { transform: "translateY(160%)", opacity: "0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "aurora-drift": "aurora-drift 22s ease-in-out infinite",
        "blob-morph": "blob-morph 18s ease-in-out infinite",
        shimmer: "shimmer 2.4s ease-in-out infinite",
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        "caret-blink": "caret-blink 1.1s step-end infinite",
        "scroll-hint": "scroll-hint 2.2s cubic-bezier(0.65,0,0.35,1) infinite",
        "spin-slow": "spin-slow 22s linear infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
