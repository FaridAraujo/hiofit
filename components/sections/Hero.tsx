"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeUp, fadeIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

// ─── Constantes ───────────────────────────────────────────────────────────────

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=%2B50663081654&text&type=phone_number&app_absent=0";
const PLANS_HREF   = "#servicios";
const AUTO_ADVANCE_MS = 5000;

const STATS = [
  { value: "500+", label: "Vidas transformadas" },
  { value: "25+",  label: "Años de experiencia" },
  { value: "4",    label: "Pilares de bienestar" },
];

// ─── Coaches data ─────────────────────────────────────────────────────────────

const COACHES = [
  {
    id:          "gustavo",
    name:        "Gustavo Hio Sequeira",
    role:        "Entrenador Personal & Fundador",
    image:       "/coaches/coach-1.jpg",
    bio:         "Profesional en Movimiento Humano graduado de la UCR, con más de 25 años transformando vidas a través del deporte y el bienestar integral. Fundador de HioFit y ex coordinador de Planet Gym.",
    specialties: ["Entrenamiento contra resistencia", "Artes marciales & Atletismo", "Calistenia & Yoga"],
    experience:  "Más de 25 años de experiencia",
    achievements: [
      "Profesional en Movimiento Humano y Recreación, Universidad de Costa Rica",
      "Coordinador del Gimnasio Planet Gym por 20 años",
      "Entrenador de campeonas nacionales e internacionales en Fitness",
      "Conferencista en temas de salud y bienestar",
    ],
  },
  {
    id:          "karol",
    name:        "Karol Barquero Ruiz",
    role:        "Health Coach & Wellness",
    image:       "/coaches/coach-2.jpg",
    bio:         "Coach de salud graduada del Institute for Integrative Nutrition (IIN), con 18 años de trayectoria en el ámbito corporativo. Especialista en guiar personas hacia objetivos de salud integral sostenibles.",
    specialties: ["Coaching de salud integral", "Bienestar y liderazgo", "Gestión del estrés"],
    experience:  "18 años de experiencia",
    achievements: [
      "Graduada del Institute for Integrative Nutrition (IIN), la escuela de health coaching más reconocida a nivel mundial",
      "Máster en Administración de Empresas (MBA)",
      "Certificada en liderazgo por INCAE Business School",
      "Certificada por Power 2 Leaderlab",
    ],
  },
] as const;

type Coach = (typeof COACHES)[number];

// ─── Slide variants ───────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: {
    x: 0, opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%", opacity: 0,
    transition: { duration: 0.3 },
  }),
};

// ─── Modal ────────────────────────────────────────────────────────────────────

function CoachModal({ coach, onClose }: { coach: Coach; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative z-10 flex w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        style={{ maxHeight: "90svh" }}
        initial={{ y: 48, opacity: 0, scale: 0.97 }}
        animate={{ y: 0,  opacity: 1, scale: 1    }}
        exit={{   y: 24,  opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.38 }}
      >
        {/* Botón cerrar — fijo arriba, siempre visible */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto">
          {/* Foto con overlay */}
          <div className="relative aspect-[16/9] shrink-0 overflow-hidden">
            <Image src={coach.image} alt={coach.name} fill className="object-cover object-top" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/65 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-red">
                {coach.role}
              </span>
              <h3 className="font-display text-2xl font-bold leading-tight text-white">{coach.name}</h3>
              <p className="mt-0.5 font-sans text-xs text-white/55">{coach.experience}</p>
            </div>
          </div>

          {/* Cuerpo */}
          <div className="flex flex-col gap-5 p-6">
            <p className="font-sans text-sm leading-relaxed text-brand-gray">{coach.bio}</p>

            <div className="flex flex-col gap-2.5">
              <h4 className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-dark/35">
                Especialidades
              </h4>
              <div className="flex flex-wrap gap-2">
                {coach.specialties.map((s) => (
                  <span key={s} className="rounded-full border border-brand-muted bg-brand-base px-3 py-1 font-sans text-xs font-medium text-brand-dark">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <h4 className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-dark/35">
                Logros & Certificaciones
              </h4>
              <ul className="flex flex-col gap-2.5">
                {coach.achievements.map((a) => (
                  <li key={a} className="flex items-start gap-3">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                    <span className="font-sans text-sm leading-relaxed text-brand-gray">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}

// ─── Panel visual derecho — carrusel de coaches ───────────────────────────────

function CoachCarousel({ onSelect }: { onSelect: (coach: Coach) => void }) {
  const [[index, direction], setPage] = useState([0, 0]);
  const [paused, setPaused]           = useState(false);
  const startX                        = useRef(0);

  const paginate = useCallback((dir: number) => {
    setPage(([prev]) => [(prev + dir + COACHES.length) % COACHES.length, dir]);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => paginate(1), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused, paginate]);

  const coach = COACHES[index];

  return (
    <div
      className="absolute bottom-0 right-0 top-0 hidden w-[44%] overflow-hidden lg:block"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      // Detección de swipe en el contenedor completo
      onPointerDown={(e) => { startX.current = e.clientX; }}
      onPointerUp={(e) => {
        const delta = e.clientX - startX.current;
        if (Math.abs(delta) > 50) paginate(delta < 0 ? 1 : -1);
      }}
    >
      {/* ── Fotos animadas ── */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 cursor-grab select-none active:cursor-grabbing"
        >
          <Image
            src={coach.image}
            alt={coach.name}
            fill
            className="object-cover object-top"
            sizes="44vw"
            priority={index === 0}
            draggable={false}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-brand-base to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Nombre + rol del coach — overlay, sin interactividad ── */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute bottom-20 left-10 right-6 flex flex-col gap-0.5">
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-0.5"
            >
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-red">
                {coach.role}
              </span>
              <p className="font-display text-lg font-bold leading-tight text-white">
                {coach.name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Dots horizontales — centro inferior ── */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
          {COACHES.map((_, i) => (
            <button
              key={i}
              aria-label={`Coach ${i + 1}`}
              className={cn(
                "pointer-events-auto h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/70",
              )}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setPage(([prev]) => [i, i > prev ? 1 : -1])}
            />
          ))}
        </div>
      </div>

      {/* ── Botón — elemento independiente, z-50, sin conflictos ── */}
      <button
        onClick={() => onSelect(coach)}
        className="absolute bottom-10 left-10 z-50 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 font-sans text-xs font-semibold text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-white/20"
      >
        Ver perfil completo
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

// ─── Mobile coach strip ───────────────────────────────────────────────────────

function MobileCoachStrip({ onSelect }: { onSelect: (coach: Coach) => void }) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-3 lg:hidden">
      {COACHES.map((coach) => (
        <button
          key={coach.id}
          onClick={() => onSelect(coach)}
          className="group relative overflow-hidden rounded-xl aspect-[3/4]"
        >
          <Image
            src={coach.image}
            alt={coach.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="50vw"
          />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-3 text-left">
            <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.15em] text-brand-red">
              {coach.role}
            </span>
            <p className="font-display text-sm font-bold leading-tight text-white">
              {coach.name}
            </p>
            <span className="mt-1 inline-flex items-center gap-1 font-sans text-[10px] text-white/70">
              Ver perfil
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-2.5 w-2.5">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  return (
    <>
      <section id="inicio" className="relative min-h-svh overflow-hidden bg-brand-base">

        {/* Carrusel coaches — panel derecho desktop */}
        <CoachCarousel onSelect={setSelectedCoach} />

        {/* Línea inferior */}
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-px bg-brand-muted" />

        {/* Contenido — columna izquierda */}
        <div className="relative z-10 flex min-h-svh items-center">
          <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-28 lg:pt-36">
            <div className="w-full lg:max-w-[56%] lg:pr-12">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-6"
              >
                {/* Badge */}
                <motion.div variants={fadeUp}>
                  <div className="inline-flex items-center gap-3 border-l-2 border-brand-red pl-3">
                    <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-gray">
                      Entrenamiento · Nutrición · Bienestar · Mente
                    </span>
                  </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  variants={staggerContainer}
                  className="flex flex-col font-display text-display-xl font-bold text-brand-dark"
                >
                  <motion.span variants={fadeUp}>Entrena tu cuerpo.</motion.span>
                  <motion.span variants={fadeUp}>Alimenta tu mente.</motion.span>
                  <motion.span variants={fadeUp} className="text-brand-red">
                    Vive en equilibrio.
                  </motion.span>
                </motion.h1>

                {/* Subtítulo */}
                <motion.p
                  variants={fadeUp}
                  className="max-w-md font-sans text-sm leading-relaxed text-brand-gray sm:text-base"
                >
                  Un método integral que combina entrenamiento personalizado,
                  nutrición estratégica y bienestar mental.{" "}
                  <span className="font-semibold text-brand-dark">
                    Porque la transformación real empieza desde adentro.
                  </span>
                </motion.p>

                {/* CTAs */}
                <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 pt-1">
                  <motion.a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      "group relative inline-flex items-center gap-2.5 overflow-hidden",
                      "rounded-full bg-brand-red px-6 py-3",
                      "font-sans text-sm font-semibold text-white",
                      "transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(255,0,0,0.25)]",
                    )}
                  >
                    <span aria-hidden className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-[200%]" />
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Comenzar ahora
                  </motion.a>

                  <motion.a
                    href={PLANS_HREF}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      "inline-flex items-center gap-2",
                      "rounded-full border border-brand-dark/20 bg-transparent px-6 py-3",
                      "font-sans text-sm font-semibold text-brand-dark",
                      "transition-all duration-300 hover:border-brand-dark hover:bg-brand-dark hover:text-white",
                    )}
                  >
                    Ver planes
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5" aria-hidden>
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.a>
                </motion.div>

                {/* Divisor */}
                <motion.hr variants={fadeIn} className="border-brand-muted" />

                {/* Stats */}
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
                      className={cn("flex flex-col gap-1", i === 0 ? "pr-7" : "px-7")}
                    >
                      <span className="font-display text-[2rem] font-semibold leading-none tracking-tight text-brand-dark">
                        {stat.value}
                      </span>
                      <span className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-brand-gray">
                        {stat.label}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Mobile: fotos de coaches */}
                <motion.div variants={fadeUp}>
                  <MobileCoachStrip onSelect={setSelectedCoach} />
                </motion.div>

              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal — fuera del section para evitar overflow:hidden */}
      <AnimatePresence>
        {selectedCoach && (
          <CoachModal coach={selectedCoach} onClose={() => setSelectedCoach(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
