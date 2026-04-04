"use client";

import { motion, type Variants } from "framer-motion";
import {
  fadeUp,
  fadeIn,
  fadeLeft,
  fadeRight,
  scaleIn,
  staggerContainer,
  staggerTight,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

const variantMap: Record<string, Variants> = {
  fadeUp,
  fadeIn,
  fadeLeft,
  fadeRight,
  scaleIn,
  staggerContainer,
  staggerTight,
};

interface AnimateInProps {
  children: React.ReactNode;
  variant?: keyof typeof variantMap;
  delay?: number;
  className?: string;
}

/**
 * Triggers its Framer Motion variant when the element enters the viewport.
 * Animates once — no replay on scroll-back.
 */
export default function AnimateIn({
  children,
  variant = "fadeUp",
  delay = 0,
  className,
}: AnimateInProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variantMap[variant]}
      custom={delay}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
