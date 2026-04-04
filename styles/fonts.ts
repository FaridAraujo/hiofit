import { Inter, Sora } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Sora — geometric sans-serif con terminaciones redondeadas.
 * Moderna, premium, legible. Sin agresividad de las condensed.
 * Usada por marcas de salud, wellness y tech premium.
 *
 * Pesos cargados: 300 (subtítulos ligeros) · 600 (UI) · 700 (headlines)
 * CSS variable: --font-display — no cambiar este nombre.
 *
 * ── Para probar otra fuente manualmente ──────────────────────────────────
 * 1. Cambiá el import: `import { Inter, Oswald } from "next/font/google"`
 * 2. Cambiá el export: `Oswald({ weight: ["500","600","700"], ... })`
 * 3. Ajustá tailwind.config.ts → display-xl → letterSpacing / lineHeight
 *    Oswald → tracking: "0.04em", lineHeight: "0.95"  (condensed)
 *    Sora   → tracking: "-0.02em", lineHeight: "1.1"  (actual, geométrica)
 * 4. Mantené `variable: "--font-display"` — todo lo demás se actualiza solo.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
