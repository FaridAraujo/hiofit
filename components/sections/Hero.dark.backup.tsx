"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp, fadeIn, fadeLeft, fadeRight } from "@/lib/motion";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { value: "500+", label: "Transformaciones reales" },
  { value: "8",    label: "Años de metodología" },
  { value: "92%",  label: "Tasa de adherencia" },
];

const WHATSAPP_URL = "https://wa.me/1234567890"; // TODO: replace with real number
const PLANS_HREF   = "#planes";

// ─── Sub-components ───────────────────────────────────────────────────────────

function BackgroundEffects() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Diagonal stripe texture — technical / athletic identity, not a generic glow */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-55deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 56px)",
        }}
      />

      {/* Left accent bar — structural, not decorative. White/subtle. */}
      <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-transparent via-white/[0.07] to-transparent" />

      {/* Bottom section rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-muted to-transparent" />
    </div>
  );
}

function BadgeLabel() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-brand-muted bg-brand-surface px-4 py-1.5">
      <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-brand-red" />
      <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-gray">
        Alto rendimiento · Salud integral
      </span>
    </div>
  );
}

function PrimaryButton() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative inline-flex items-center gap-2.5 overflow-hidden",
        "rounded-sm bg-brand-red px-7 py-4",
        "font-sans text-sm font-bold uppercase tracking-[0.1em] text-white",
        "transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,0,0,0.4)]",
      )}
    >
      {/* Shine sweep on hover */}
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-[200%]"
      />
      {/* WhatsApp icon */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4 shrink-0"
        aria-hidden
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      Empieza tu transformación ahora
    </motion.a>
  );
}

function SecondaryButton() {
  return (
    <motion.a
      href={PLANS_HREF}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "inline-flex items-center gap-2",
        "rounded-sm border border-brand-muted px-7 py-4",
        "font-sans text-sm font-bold uppercase tracking-[0.1em] text-brand-white",
        "transition-colors duration-300 hover:border-brand-white",
      )}
    >
      Ver planes
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden
      >
        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.a>
  );
}

function StatRow() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex items-stretch divide-x divide-brand-muted border-t border-brand-muted pt-6"
    >
      {STATS.map((stat, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          className={cn("flex flex-col gap-1.5", i === 0 ? "pr-8" : "px-8")}
        >
          {/* Oswald SemiBold for numbers: enough presence without dominating.
                700 (Bold) is for the headline; 600 (SemiBold) creates
                a clear weight hierarchy within the same typeface. */}
          <span className="font-display text-[2.25rem] font-semibold leading-none tracking-[0.05em] text-brand-white">
            {stat.value}
          </span>
          {/* Label — small, airy tracking, clearly subordinate */}
          <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-brand-gray">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * Visual placeholder — right column.
 * Replace the inner div with <Image> or <video> when assets are ready.
 */
function VisualPlaceholder() {
  return (
    <div className="relative w-full">
      {/* Outer border frame — editorial detail */}
      <div className="absolute -inset-px rounded-sm border border-brand-muted/40" />

      {/* Top-left corner accent — white/muted, editorial detail */}
      <div className="absolute left-0 top-0 h-10 w-10">
        <div className="absolute left-0 top-0 h-px w-10 bg-white/25" />
        <div className="absolute left-0 top-0 h-10 w-px bg-white/25" />
      </div>
      {/* Bottom-right corner accent */}
      <div className="absolute bottom-0 right-0 h-10 w-10">
        <div className="absolute bottom-0 right-0 h-px w-10 bg-white/25" />
        <div className="absolute bottom-0 right-0 h-10 w-px bg-white/25" />
      </div>

      {/* ── TODO: Replace with actual athlete <Image> or <video> ── */}
      <div
        className={cn(
          "relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-sm",
          "bg-gradient-to-br from-brand-surface via-[#0f0f0f] to-black",
        )}
      >
        {/* Brand watermark "H" — identity even without a real photo */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-display text-[22rem] font-extrabold leading-none text-white/[0.025]"
        >
          H
        </span>

        {/* Left bleed — merges visual into text column on desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/70 via-transparent to-transparent" />
        {/* Bottom fade — grounds the composition */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
        {/* Right-edge structural line — white, very subtle */}
        <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        {/* Placeholder indicator — remove when using real asset */}
        <div className="relative z-10 flex flex-col items-center gap-3 text-center">
          <div className="rounded-full border border-brand-muted/60 p-5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-8 w-8 text-brand-gray"
              aria-hidden
            >
              <path d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 9.75v9A2.25 2.25 0 004.5 18.75z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="font-sans text-xs uppercase tracking-widest text-brand-gray">
            Athlete image / video
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section className="relative min-h-svh overflow-hidden bg-brand-dark">
      <BackgroundEffects />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28">
        {/* 55/45 split: text gets dominant but not monopoly, visual has real weight */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">

          {/* ── Left column: copy ─────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <BadgeLabel />
            </motion.div>

            {/* Headline
                Bebas Neue is an all-caps typeface by design — uppercase is
                its natural state. Mixed case feels unnatural with this font.
                Differentiation on line 3 comes from color alone (red),
                which is cleaner and more impactful than case tricks.
            */}
            <motion.h1
              variants={staggerContainer}
              className="flex flex-col font-display text-display-xl font-bold uppercase text-brand-white"
            >
              <motion.span variants={fadeUp}>No viniste</motion.span>
              <motion.span variants={fadeUp}>a entrenar</motion.span>
              <motion.span variants={fadeUp} className="text-brand-red">
                a medias.
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="max-w-lg font-sans text-base leading-relaxed text-brand-gray sm:text-lg"
            >
              Metodología de alto rendimiento construida sobre años de
              experiencia real. Sin atajos. Sin promesas vacías.{" "}
              <span className="font-semibold text-brand-white">
                Solo resultados medibles.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center"
            >
              <PrimaryButton />
              <SecondaryButton />
            </motion.div>

            {/* Divider */}
            <motion.hr
              variants={fadeIn}
              className="border-brand-muted"
            />

            {/* Stats */}
            <StatRow />
          </motion.div>

          {/* ── Right column: visual ───────────────────────────── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate="visible"
            className="hidden lg:block"
          >
            <VisualPlaceholder />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
