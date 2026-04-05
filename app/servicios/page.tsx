"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=%2B50663081654&text&type=phone_number&app_absent=0";

const SERVICES = [
  {
    tag: "Más popular",
    name: "Health 360",
    tagline: "El programa integral completo.",
    description:
      "Un enfoque que abarca los cuatro pilares del bienestar: entrenamiento, nutrición, descanso y mente. No trabajamos aspectos aislados, los coordinamos todos en un solo plan diseñado para vos.",
    longDescription:
      "Health 360 es nuestro programa más completo y el que genera resultados más consistentes. Porque la salud no es solo bajar de peso o ir al gym — es cómo dormís, cómo manejás el estrés, qué comés y cómo te movés, todo en conjunto.",
    features: [
      "Plan de entrenamiento personalizado con revisión semanal",
      "Guía nutricional adaptada a tu metabolismo y objetivos",
      "Protocolo de descanso y recuperación activa",
      "Sesiones de bienestar mental y manejo del estrés",
      "Check-ins semanales con tu coach asignado",
      "Acceso completo a la App HioFit",
      "Soporte por WhatsApp en horario de atención",
    ],
    forWho: "Personas que quieren transformación integral, no solo física.",
    highlight: true,
    cta: "Empezar con Health 360",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden>
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    tag: "Enfoque personalizado",
    name: "Coaching Personal",
    tagline: "Tu coach. Tu ritmo. Tus resultados.",
    description:
      "Trabajo 1:1 con tu coach asignado. Ideal para quienes ya tienen experiencia y quieren romper una meseta, prepararse para un evento específico o simplemente llegar al siguiente nivel.",
    longDescription:
      "El coaching personal es para quienes quieren atención directa, constante y enfocada. Tu coach te conoce, conoce tu historial, y ajusta el plan conforme avanzás. Sin fórmulas genéricas.",
    features: [
      "Sesiones 1:1 con coach asignado (frecuencia acordada)",
      "Plan de entrenamiento 100% personalizado",
      "Ajustes en tiempo real según tu progreso",
      "Revisión mensual de métricas y objetivos",
      "Acceso a la App HioFit",
      "Soporte por WhatsApp en horario de atención",
    ],
    forWho: "Personas con experiencia que buscan avanzar con guía profesional.",
    highlight: false,
    cta: "Explorar coaching personal",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    tag: "Digital",
    name: "App HioFit",
    tagline: "Tu bienestar, en tu bolsillo.",
    description:
      "Acceso a toda la plataforma digital de HioFit. Rutinas en video, planes de nutrición, tracker de hábitos y biblioteca de contenido wellness, todo desde tu celular.",
    longDescription:
      "La App HioFit está diseñada para que puedas seguir tu progreso, acceder a tus rutinas y mantener tus hábitos con o sin conexión. El contenido se actualiza constantemente con nuevo material.",
    features: [
      "Rutinas de entrenamiento con videos explicativos",
      "Planes de alimentación y recetas saludables",
      "Tracker diario de hábitos (agua, sueño, movimiento)",
      "Biblioteca de contenido wellness en constante crecimiento",
      "Acceso a historial de progreso",
      "Notificaciones y recordatorios personalizados",
    ],
    forWho: "Para quienes buscan autonomía con estructura y seguimiento digital.",
    highlight: false,
    cta: "Conocer la app",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden>
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
] as const;

// ─── Pillar icons ─────────────────────────────────────────────────────────────

const PILLARS = [
  { label: "Entrenamiento", icon: "💪" },
  { label: "Nutrición", icon: "🥗" },
  { label: "Descanso", icon: "🌙" },
  { label: "Mente", icon: "🧠" },
];

// ─── Service block ────────────────────────────────────────────────────────────

function ServiceBlock({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`grid gap-12 rounded-2xl p-8 sm:p-12 lg:grid-cols-2 lg:items-center lg:gap-20 ${
        service.highlight ? "bg-brand-dark" : index % 2 === 0 ? "bg-white ring-1 ring-brand-muted" : "bg-brand-warm"
      }`}
    >
      {/* Content side */}
      <div className={isEven ? "lg:order-1" : "lg:order-2"}>
        <motion.div variants={fadeUp} className="flex flex-col gap-6">

          {/* Tag + icon */}
          <div className="flex items-center gap-3">
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${service.highlight ? "bg-white/10 text-white" : "bg-brand-warm text-brand-red"}`}>
              {service.icon}
            </span>
            <span className={`rounded-full px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] ${service.highlight ? "bg-brand-red/20 text-brand-red" : "bg-brand-dark/5 text-brand-gray"}`}>
              {service.tag}
            </span>
          </div>

          {/* Headline */}
          <div className="flex flex-col gap-2">
            <h2 className={`font-display text-3xl font-bold sm:text-4xl ${service.highlight ? "text-white" : "text-brand-dark"}`}>
              {service.name}
            </h2>
            <p className={`font-sans text-base font-medium ${service.highlight ? "text-white/60" : "text-brand-gray"}`}>
              {service.tagline}
            </p>
          </div>

          {/* Description */}
          <p className={`font-sans text-sm leading-relaxed ${service.highlight ? "text-white/60" : "text-brand-gray"}`}>
            {service.longDescription}
          </p>

          {/* Para quién */}
          <div className={`rounded-xl p-4 ${service.highlight ? "bg-white/5 ring-1 ring-white/10" : "bg-brand-warm/60 ring-1 ring-brand-muted"}`}>
            <p className={`font-sans text-xs font-semibold uppercase tracking-[0.15em] ${service.highlight ? "text-white/30" : "text-brand-dark/40"}`}>
              Ideal para
            </p>
            <p className={`mt-1 font-sans text-sm ${service.highlight ? "text-white/70" : "text-brand-dark"}`}>
              {service.forWho}
            </p>
          </div>

          {/* CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative inline-flex w-fit items-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 font-sans text-sm font-semibold transition-shadow duration-300 ${
              service.highlight
                ? "bg-brand-red text-white hover:shadow-[0_6px_24px_rgba(255,0,0,0.3)]"
                : "bg-brand-dark text-white hover:shadow-lg"
            }`}
          >
            <span aria-hidden className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-[200%]" />
            {service.cta}
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Features side */}
      <motion.div variants={fadeUp} className={isEven ? "lg:order-2" : "lg:order-1"}>
        <ul className="flex flex-col gap-3">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${service.highlight ? "bg-brand-red/20" : "bg-brand-dark/5"}`}>
                <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3 text-brand-red" aria-hidden>
                  <path d="M2.5 6l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className={`font-sans text-sm leading-relaxed ${service.highlight ? "text-white/70" : "text-brand-gray"}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServiciosPage() {
  return (
    <main className="pt-24 pb-20">

      {/* ── Hero ── */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col gap-4 lg:max-w-2xl">
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-3 border-l-2 border-brand-red pl-3">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-gray">
                Nuestros Servicios
              </span>
            </div>
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display text-display-lg font-bold text-brand-dark">
            El plan correcto
            <br />
            <span className="text-brand-gray">para vos.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="font-sans text-sm leading-relaxed text-brand-gray sm:text-base">
            Todos los programas incluyen acceso a la App HioFit y primera consulta gratuita. Sin contratos ni permanencia.
          </motion.p>
        </div>

        {/* Pilares */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap gap-3"
        >
          {PILLARS.map(({ label, icon }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-brand-muted bg-white px-4 py-2 font-sans text-sm font-medium text-brand-dark"
            >
              <span>{icon}</span>
              {label}
            </span>
          ))}
        </motion.div>
      </motion.section>

      {/* ── Services ── */}
      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        {SERVICES.map((service, i) => (
          <ServiceBlock key={service.name} service={service} index={i} />
        ))}
      </section>

      {/* ── CTA final ── */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto mt-24 max-w-3xl px-4 text-center sm:px-6 lg:px-8"
      >
        <motion.p variants={fadeUp} className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
          Primera consulta gratuita
        </motion.p>
        <motion.h2 variants={fadeUp} className="mt-4 font-display text-display-lg font-bold text-brand-dark">
          ¿No sabés por dónde empezar?
        </motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed text-brand-gray">
          Contanos tu situación y juntos encontramos el programa que mejor se adapta a vos. Sin presión, sin compromiso.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-brand-red px-8 py-4 font-sans text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_6px_24px_rgba(255,0,0,0.3)]"
          >
            <span aria-hidden className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-[200%]" />
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Escribinos por WhatsApp
          </a>
          <a
            href="/contacto"
            className="rounded-full border border-brand-dark/20 px-8 py-4 font-sans text-sm font-semibold text-brand-dark transition-all duration-300 hover:border-brand-dark hover:bg-brand-dark hover:text-white"
          >
            Formulario de contacto
          </a>
        </motion.div>
      </motion.section>

    </main>
  );
}
