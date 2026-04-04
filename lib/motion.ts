import type { Variants } from "framer-motion";

// Easing: expo out — snappy entry, editorial feel
const expo = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.8, ease: expo } },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.9, ease: expo } },
};

export const fadeRight: Variants = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0,   transition: { duration: 0.9, ease: expo } },
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1,    transition: { duration: 0.7, ease: expo } },
};

/** Wrap children in this to stagger their entrance animations */
export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

/** Stagger with a slightly tighter gap — for stat rows, icon lists */
export const staggerTight: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};
