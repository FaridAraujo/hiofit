"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    number: "01",
    name: "Entrenamiento",
    description:
      "Rutinas personalizadas que se adaptan a tu cuerpo, tu nivel y tus metas. Sin fórmulas genéricas — solo lo que funciona para vos.",
    icon: (
      // Rayo — energía, acción, movimiento físico
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
        aria-hidden
      >
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    number: "02",
    name: "Nutrición",
    description:
      "Alimentación estratégica sin privaciones. Aprendés a usar la comida como herramienta para tener más energía y mejores resultados.",
    icon: (
      // Hoja — naturaleza, alimento, vitalidad
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
        aria-hidden
      >
        <path d="M12 22a9 9 0 0 0 9-9c0-5-4-9-9-9S3 8 3 13a9 9 0 0 0 9 9z" />
        <path d="M12 22V13M3.6 10.5l8.4 2.5M20.4 10.5 12 13" />
      </svg>
    ),
  },
  {
    number: "03",
    name: "Descanso",
    description:
      "La recuperación es parte del método. Mejorás la calidad del sueño, manejás el estrés y le das a tu cuerpo el tiempo que necesita para progresar.",
    icon: (
      // Luna — descanso, recuperación, ciclos naturales
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
        aria-hidden
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    number: "04",
    name: "Mente",
    description:
      "El cambio real empieza en tu cabeza. Trabajamos hábitos, motivación y la relación con tu cuerpo para que el progreso sea duradero.",
    icon: (
      // Destellos — claridad, conciencia, bienestar mental
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
        aria-hidden
      >
        <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
        <path d="M18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      </svg>
    ),
  },
] as const;

// ─── Pillar card ──────────────────────────────────────────────────────────────

function PillarCard({
  pillar,
}: {
  pillar: (typeof PILLARS)[number];
}) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      {/* Número watermark — detalle editorial de fondo */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-1 -top-5 select-none font-display text-[7rem] font-bold leading-none text-brand-dark/[0.04]"
      >
        {pillar.number}
      </span>

      {/* Ícono en rojo — único acento de color de la card */}
      <div className="relative mb-6 inline-flex items-center justify-center rounded-xl bg-brand-base p-3 text-brand-red">
        {pillar.icon}
      </div>

      {/* Nombre del pilar */}
      <h3 className="mb-2 font-display text-lg font-bold text-brand-dark">
        {pillar.name}
      </h3>

      {/* Descripción */}
      <p className="font-sans text-sm leading-relaxed text-brand-gray">
        {pillar.description}
      </p>

      {/* Línea roja — aparece en hover, comunica interés */}
      <div className="mt-6 h-0.5 w-8 rounded-full bg-brand-red opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.article>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mb-12 flex flex-col gap-4"
    >
      {/* Label editorial */}
      <motion.div variants={fadeUp}>
        <div className="inline-flex items-center gap-3 border-l-2 border-brand-red pl-3">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-gray">
            Nuestro método
          </span>
        </div>
      </motion.div>

      {/* Heading + lead — dos columnas en desktop */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <motion.h2
          variants={fadeUp}
          className="font-display text-display-lg font-bold text-brand-dark"
        >
          Cuatro pilares.
          <br />
          <span className="text-brand-gray">Un solo objetivo.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="max-w-sm font-sans text-sm leading-relaxed text-brand-gray lg:text-right"
        >
          Cada aspecto de tu bienestar atendido con método y propósito.
          No entrenamos solo tu cuerpo — trabajamos el sistema completo.
        </motion.p>
      </div>
    </motion.div>
  );
}

// ─── Pillars section ──────────────────────────────────────────────────────────

export default function Pillars() {
  return (
    <section
      id="metodo"
      className="bg-brand-warm"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">

        <SectionHeader />

        {/* Grid de cards — 1 col mobile → 2 tablet → 4 desktop */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PILLARS.map((pillar) => (
            <PillarCard key={pillar.number} pillar={pillar} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
