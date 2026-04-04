import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red:     "#FF0000",  // acento de marca — reservado, no dominante
          dark:    "#111111",  // texto principal y elementos oscuros
          base:    "#F7F6F4",  // fondo principal — blanco cálido, no frío
          surface: "#FFFFFF",  // tarjetas, inputs, componentes
          muted:   "#E5E3DF",  // bordes y divisores suaves
          gray:    "#6B7280",  // texto secundario
          white:   "#FFFFFF",  // blanco puro
          warm:    "#E8E3DC",  // fondo beige — secciones alternas (Pilares, Servicios)
        },
      },
      fontFamily: {
        sans:    ["var(--font-inter)",   "system-ui", "sans-serif"],
        // --font-display → Sora (wellness premium, geométrica redondeada)
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      fontSize: {
        /*
         * Calibración para Sora:
         * – No es condensed → el max del clamp es conservador (no se estira)
         * – tracking negativo: las geométricas anchas mejoran con -0.02em
         * – lineHeight 1.1: Sora tiene ascendentes medios, necesita más aire
         *   que las condensed (que usaban 0.9–0.95)
         * – Tamaños cómodos en desktop sin necesidad de zoom
         */
        "display-xl": ["clamp(1.9rem, 3.8vw, 3rem)",   { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(1.4rem, 2.5vw, 2.1rem)",  { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(1.1rem, 1.8vw, 1.4rem)",  { lineHeight: "1.2",  letterSpacing: "-0.01em" }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
