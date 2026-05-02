/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dynamic theme colors via CSS variables
        accent:    "rgb(var(--accent) / <alpha-value>)",
        accent2:   "rgb(var(--accent2) / <alpha-value>)",
        base:      "rgb(var(--base) / <alpha-value>)",
        surface:   "rgb(var(--surface) / <alpha-value>)",
        surface2:  "rgb(var(--surface2) / <alpha-value>)",
        textpri:   "rgb(var(--textpri) / <alpha-value>)",
        textsec:   "rgb(var(--textsec) / <alpha-value>)",
        border:    "rgb(var(--border) / <alpha-value>)",
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        mono:    ["'Space Mono'", "monospace"],
        body:    ["'DM Sans'", "sans-serif"],
      },
      clipPath: {
        card: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
        btn:  "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
        hero: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
      },
      keyframes: {
        fadeUp:   { "0%": { opacity: 0, transform: "translateY(30px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        scrollPulse: { "0%,100%": { opacity: 0.3, transform: "scaleY(0.5)" }, "50%": { opacity: 1, transform: "scaleY(1)" } },
        float3d:  { "0%,100%": { transform: "translateY(0) rotateY(0deg)" }, "50%": { transform: "translateY(-10px) rotateY(3deg)" } },
        shimmer:  { "0%": { backgroundPosition: "-200% center" }, "100%": { backgroundPosition: "200% center" } },
        spinSlow: { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
        tiltIn:   { "0%": { opacity: 0, transform: "perspective(600px) rotateX(20deg) translateY(40px)" }, "100%": { opacity: 1, transform: "perspective(600px) rotateX(0deg) translateY(0)" } },
      },
      animation: {
        "fade-up":     "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards",
        "scroll-pulse":"scrollPulse 1.8s ease-in-out infinite",
        "float-3d":    "float3d 6s ease-in-out infinite",
        "shimmer":     "shimmer 3s linear infinite",
        "spin-slow":   "spinSlow 12s linear infinite",
        "tilt-in":     "tiltIn 1s cubic-bezier(0.22,1,0.36,1) forwards",
      },
      backgroundSize: { "200%": "200%" },
      perspective: { "1000": "1000px" },
      transformStyle: { "3d": "preserve-3d" },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".clip-card":  { clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))" },
        ".clip-btn":   { clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" },
        ".clip-hero":  { clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))" },
        ".preserve-3d":{ transformStyle: "preserve-3d" },
        ".perspective-1000": { perspective: "1000px" },
        ".backface-hidden": { backfaceVisibility: "hidden" },
        ".text-gradient": {
          background: "linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent2)))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        },
      })
    },
  ],
};
 