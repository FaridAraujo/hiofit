"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    name:     "María G.",
    age:      "34 años",
    duration: "4 meses de programa",
    quote:
      "Llegué queriendo bajar de peso y terminé encontrando algo mucho más valioso. Mejoré mi sueño, bajé la ansiedad y por primera vez en años siento que tengo energía real. El método cambia todo, no solo tu cuerpo.",
    pillars:  ["Entrenamiento", "Descanso", "Mente"],
    metric:   "−8 kg · +Energía · −Ansiedad",
    imagePlaceholder: "MG",
  },
  {
    name:     "Carlos M.",
    age:      "42 años",
    duration: "6 meses de programa",
    quote:
      "Llevo 20 años yendo al gym sin resultados consistentes. Con HioFit entendí que el problema no era el entrenamiento, era todo lo demás — la comida, el descanso, el estrés del trabajo. Ahora todo está conectado.",
    pillars:  ["Nutrición", "Descanso", "Entrenamiento"],
    metric:   "−12 kg · +Masa muscular · +Foco",
    imagePlaceholder: "CM",
  },
  {
    name:     "Ana R.",
    age:      "28 años",
    duration: "3 meses de programa",
    quote:
      "Siempre empezaba y dejaba. HioFit fue la primera vez que me mantuve porque el acompañamiento es real, no solo un plan enviado por email. Me ayudaron con la parte mental tanto como con el entrenamiento.",
    pillars:  ["Mente", "Entrenamiento", "Nutrición"],
    metric:   "Primer programa que terminó · +Constancia",
    imagePlaceholder: "AR",
  },
] as const;

const STATS = [
  { value: 500, suffix: "+", label: "Vidas transformadas",  decimals: 0 },
  { value: 92,  suffix: "%", label: "Tasa de adherencia",   decimals: 0 },
  { value: 4.9, suffix: "",  label: "Valoración promedio",  decimals: 1 },
  { value: 8,   suffix: "",  label: "Años de experiencia",  decimals: 0 },
] as const;

// ─── Counter animado ──────────────────────────────────────────────────────────

function AnimatedCounter({
  value,
  suffix,
  decimals,
}: {
  value: number;
  suffix: string;
  decimals: number;
}) {
  const ref       = useRef<HTMLSpanElement>(null);
  const isInView  = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const duration  = 1600;
    const startTime = performance.now();

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased    = easeOut(progress);
      const current  = value * eased;

      setDisplay(
        decimals > 0
          ? current.toFixed(decimals)
          : Math.round(current).toString(),
      );

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value, decimals]);

  return (
    <span ref={ref} className="font-display text-[2.5rem] font-bold leading-none tracking-tight text-white">
      {display}{suffix}
    </span>
  );
}

// ─── Stats bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  return (
    <div className="mb-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 lg:grid-cols-4">
      {STATS.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1 bg-brand-dark px-8 py-6">
          <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
          <span className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-white/40">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Testimonial card ─────────────────────────────────────────────────────────

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
}) {
  return (
    <motion.article
      variants={fadeUp}
      className="flex flex-col gap-6 rounded-2xl bg-white/[0.06] p-8 ring-1 ring-white/10"
    >
      <span aria-hidden className="font-display text-5xl font-bold leading-none text-brand-red/60">
        "
      </span>

      <p className="font-sans text-sm leading-relaxed text-white/80">
        {testimonial.quote}
      </p>

      <div className="flex flex-wrap gap-2">
        {testimonial.pillars.map((pillar) => (
          <span
            key={pillar}
            className="rounded-full bg-white/10 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60"
          >
            {pillar}
          </span>
        ))}
      </div>

      <hr className="border-white/10" />

      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-red/20 ring-1 ring-brand-red/30">
          <span className="font-display text-sm font-bold text-brand-red">
            {testimonial.imagePlaceholder}
          </span>
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="font-sans text-sm font-semibold text-white">
            {testimonial.name} · {testimonial.age}
          </span>
          <span className="truncate font-sans text-[11px] text-white/40">
            {testimonial.duration}
          </span>
        </div>
      </div>

      <div className="rounded-xl bg-white/[0.04] px-4 py-3">
        <p className="font-sans text-xs font-semibold text-white/60">
          {testimonial.metric}
        </p>
      </div>
    </motion.article>
  );
}

// ─── Results section ──────────────────────────────────────────────────────────

export default function Results() {
  return (
    <section id="resultados" className="bg-brand-dark">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="flex flex-col gap-4">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-3 border-l-2 border-brand-red pl-3">
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                  Resultados reales
                </span>
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-display-lg font-bold text-white">
              Historias que
              <br />
              <span className="text-white/40">lo dicen todo.</span>
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            className="max-w-sm font-sans text-sm leading-relaxed text-white/50 lg:text-right"
          >
            Más de 500 personas ya transformaron su vida con el método HioFit.
            Estas son algunas de sus historias.
          </motion.p>
        </motion.div>

        <StatsBar />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
