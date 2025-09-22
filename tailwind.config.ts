import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0F14",
        card: "#121821",
        accent: "#E5C375",
        subtle: "#141A23",
        up: "#2ECC71",
        down: "#E74C3C",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.35)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        tickerBlink: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".65" } },
        progress: { "0%": { width: "0%" }, "100%": { width: "100%" } },
      },
      animation: {
        fadeInUp: "fadeInUp .6s ease-out both",
        tickerBlink: "tickerBlink 1.8s ease-in-out infinite",
        progress: "progress 5s linear forwards",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
