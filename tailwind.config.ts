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
        base: "#0A0A0A",
        panel: "#101012",
        hairline: "#1F1F1F",
        ink: "#F2F1ED",
        inkMuted: "#8C8C87",
        accent: "#7C8CFF",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: Function }) {
      addUtilities({
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".gpu-layer": {
          transform: "translate3d(0, 0, 0)",
          willChange: "transform, opacity",
        },
      });
    },
  ],
};

export default config;