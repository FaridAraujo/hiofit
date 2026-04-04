"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────
// TODO: Actualizar precios, descripciones y features con info real del cliente

const SERVICES = [
  {
    tag:         "Más popular",
    name:        "Health 360",
    description: "El programa integral completo. Entrenamiento, nutrición, descanso y bienestar mental en un solo plan coordinado y personalizado.",
    price:       "Desde $XX / mes",
    features: [
      "Plan de entrenamiento personalizado",
      "Guía nutricional adaptada",
      "Seguimiento de descanso y recuperación",
      "Sesiones de bienestar mental",
      "Check-ins semanales con tu coach",
    ],
    cta:       "Comenzar con Health 360",
    highlight: true,
  },
  {
    tag:         "Flexibilidad",
    name:        "Coaching Personal",
    description: "Trabajo directo y personalizado con tu coach. Ideal si ya tenés una base y querés llevar tu progreso al siguiente nivel.",
    price:       "Desde $XX / mes",
    features: [
      "Sesiones 1:1 con tu coach asignado",
      "Plan adaptado a tus objetivos",
      "Acceso a la App HioFit",
      "Soporte por WhatsApp",
      "Revisión mensual de progreso",
    ],
    cta:       "Explorar coaching",
    highlight: false,
  },
  {
    tag:         "Digital",
    name:        "App HioFit",
    description: "Acceso a toda la plataforma digital. Rutinas, guías de nutrición, biblioteca de contenido y seguimiento de hábitos en tu celular.",
    price:       "Desde $XX / mes",
    features: [
      "Rutinas de entrenamiento en video",
      "Recetas y planes de alimentación",
      "Tracker de hábitos diarios",
      "Biblioteca de contenido wellness",
      "Comunidad de miembros",
    ],
    cta:       "Probar la app",
    highlight: false,
  },
] as const;

// ─── Service card ─────────────────────────────────────────────────────────────

function ServiceCard({
  service,
}: {
  service: (typeof SERVICES)[number];
}) {
  return (
    <motion.article
      variants={fadeUp}
      className={cn(
        "relative flex flex-col rounded-2xl p-8 ring-1 transition-shadow duration-300 hover:shadow-lg",
        service.highlight
          ? "bg-brand-dark ring-brand-dark"
          : "bg-white ring-brand-muted",
      )}
    >
      {/* Tag */}
      <span
        className={cn(
          "mb-6 inline-flex w-fit rounded-full px-3 py-1",
          "font-sans text-[10px] font-semibold uppercase tracking-[0.15em]",
          service.highlight
            ? "bg-brand-red/20 text-brand-red"
            : "bg-brand-warm text-brand-gray",
        )}
      >
        {service.tag}
      </span>

      {/* Nombre */}
      <h3
        className={cn(
          "mb-2 font-display text-2xl font-bold",
          service.highlight ? "text-white" : "text-brand-dark",
        )}
      >
        {service.name}
      </h3>

      {/* Descripción */}
      <p
        className={cn(
          "mb-6 font-sans text-sm leading-relaxed",
          service.highlight ? "text-white/60" : "text-brand-gray",
        )}
      >
        {service.description}
      </p>

      {/* Precio */}
      <div
        className={cn(
          "mb-6 border-t border-b py-4",
          service.highlight ? "border-white/10" : "border-brand-muted",
        )}
      >
        <span
          className={cn(
            "font-display text-2xl font-bold",
            service.highlight ? "text-white" : "text-brand-dark",
          )}
        >
          {service.price}
        </span>
      </div>

      {/* Features */}
      <ul className="mb-8 flex flex-col gap-3">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0",
                service.highlight ? "text-brand-red" : "text-brand-red",
              )}
              aria-hidden
            >
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span
              className={cn(
                "font-sans text-sm",
                service.highlight ? "text-white/70" : "text-brand-gray",
              )}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contacto"
        className={cn(
          "mt-auto flex items-center justify-center rounded-full px-6 py-3",
          "font-sans text-sm font-semibold transition-all duration-300",
          service.highlight
            ? "bg-brand-red text-white hover:shadow-[0_4px_20px_rgba(255,0,0,0.3)]"
            : "border border-brand-dark/20 text-brand-dark hover:border-brand-dark hover:bg-brand-dark hover:text-white",
        )}
      >
        {service.cta}
      </a>
    </motion.article>
  );
}

// ─── Services section ─────────────────────────────────────────────────────────

export default function Services() {
  return (
    <section id="servicios" className="bg-brand-warm">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="flex flex-col gap-4">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-3 border-l-2 border-brand-red pl-3">
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-gray">
                  Servicios
                </span>
              </div>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-display-lg font-bold text-brand-dark"
            >
              El plan correcto
              <br />
              <span className="text-brand-gray">para vos.</span>
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            className="max-w-sm font-sans text-sm leading-relaxed text-brand-gray lg:text-right"
          >
            {/* TODO: actualizar con beneficios o diferenciadores reales */}
            Todos los planes incluyen acceso a la App HioFit y soporte continuo.
            Primera consulta gratuita y sin compromiso.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 lg:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.name} service={service} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
