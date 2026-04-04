"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    number: "01",
    title:  "Diagnóstico inicial",
    description:
      "Empezamos con una evaluación completa de tu situación actual: hábitos, historial, objetivos y estado físico y mental. Sin esto, cualquier plan es genérico.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
        <path d="M9 12h3.75M9 15h3.75M9 18h3.75M9 7.5h3.75M5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 17.25V6.75A2.25 2.25 0 0 1 5.25 4.5z" />
        <path d="M15 4.5v3M9 4.5v3" />
      </svg>
    ),
  },
  {
    number: "02",
    title:  "Tu plan personalizado",
    description:
      "Con base en tu diagnóstico, diseñamos un programa que cubre los cuatro pilares. Entrenamiento, nutrición, descanso y bienestar mental — todo conectado.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
        <path d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5" />
        <path d="M10.5 5.25 9 6.75l1.5 1.5M10.5 12l-1.5 1.5 1.5 1.5M10.5 18.75l-1.5 1.5 1.5 1.5" />
      </svg>
    ),
  },
  {
    number: "03",
    title:  "Acompañamiento continuo",
    description:
      "No te dejamos solo. Hacemos seguimiento constante, ajustamos el plan según tu progreso y estamos disponibles para responder tus dudas en tiempo real.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
        <path d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
] as const;

// ─── Step card ────────────────────────────────────────────────────────────────

function StepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof STEPS)[number];
  index: number;
  isLast: boolean;
}) {
  return (
    <div className="relative flex flex-col gap-5">

      {/* Línea conectora animada — se dibuja de izquierda a derecha */}
      {!isLast && (
        <motion.div
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.8,
            delay: 0.3 + index * 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute top-[1.75rem] hidden origin-left lg:block"
          style={{
            left:  "calc(100% + 1rem)",
            width: "calc(100% - 2rem)",
            height: "1px",
            background: "linear-gradient(to right, #FF000033, #E5E3DF)",
          }}
        />
      )}

      {/* Ícono + número */}
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-muted bg-brand-base text-brand-red"
        >
          {step.icon}
        </motion.div>
        <span className="font-display text-3xl font-bold leading-none text-brand-dark/10">
          {step.number}
        </span>
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-lg font-bold text-brand-dark">
          {step.title}
        </h3>
        <p className="font-sans text-sm leading-relaxed text-brand-gray">
          {step.description}
        </p>
      </div>
    </div>
  );
}

// ─── Process section ──────────────────────────────────────────────────────────

export default function Process() {
  return (
    <section id="proceso" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 max-w-xl"
        >
          <motion.div variants={fadeUp} className="mb-4">
            <div className="inline-flex items-center gap-3 border-l-2 border-brand-red pl-3">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-gray">
                Cómo funciona
              </span>
            </div>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display text-display-lg font-bold text-brand-dark"
          >
            Tres pasos.
            <br />
            <span className="text-brand-gray">Un camino claro.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-10 lg:grid-cols-3 lg:gap-8"
        >
          {STEPS.map((step, i) => (
            <motion.div key={step.number} variants={fadeUp}>
              <StepCard step={step} index={i} isLast={i === STEPS.length - 1} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
