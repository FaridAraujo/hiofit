"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────
// TODO: Completar con datos reales de los coaches

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

const AUTO_ADVANCE_MS = 5000;

// ─── Slide variants ───────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  }),
};

// ─── Modal ────────────────────────────────────────────────────────────────────

function CoachModal({ coach, onClose }: { coach: Coach; onClose: () => void }) {
  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const firstName = coach.id === "gustavo" ? "Gustavo" : "Karol";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
        initial={{ y: 48, opacity: 0, scale: 0.97 }}
        animate={{ y: 0,  opacity: 1, scale: 1 }}
        exit={{   y: 24,  opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.38, ease: "easeOut" }}
      >
        {/* Header oscuro: foto + nombre */}
        <div className="relative flex items-center gap-5 bg-brand-dark p-6">
          <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl ring-2 ring-white/10">
            <Image
              src={coach.image}
              alt={coach.name}
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-red">
              {coach.role}
            </span>
            <h3 className="font-display text-xl font-bold leading-tight text-white">
              {coach.name}
            </h3>
            <p className="font-sans text-xs text-white/40">{coach.experience}</p>
          </div>

          {/* Botón cerrar */}
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/40 transition-colors hover:border-white/30 hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Cuerpo */}
        <div className="flex flex-col gap-5 p-6">
          {/* Bio */}
          <p className="font-sans text-sm leading-relaxed text-brand-gray">
            {coach.bio}
          </p>

          {/* Especialidades */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-dark/40">
              Especialidades
            </h4>
            <div className="flex flex-wrap gap-2">
              {coach.specialties.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-brand-muted px-3 py-1 font-sans text-xs font-medium text-brand-dark"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Logros */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-dark/40">
              Logros & Certificaciones
            </h4>
            <ul className="flex flex-col gap-2">
              {coach.achievements.map((a) => (
                <li key={a} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                  <span className="font-sans text-sm leading-relaxed text-brand-gray">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="border-t border-brand-muted px-6 py-4">
          <a
            href="https://api.whatsapp.com/send/?phone=%2B50663081654&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2.5 rounded-full bg-brand-red py-3 font-sans text-sm font-semibold text-white transition-shadow hover:shadow-[0_4px_20px_rgba(255,0,0,0.3)]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Trabajar con {firstName}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Coaches section ──────────────────────────────────────────────────────────

export default function Coaches() {
  const [[index, direction], setPage] = useState([0, 0]);
  const [selectedCoach, setSelectedCoach]   = useState<Coach | null>(null);
  const [paused, setPaused]                 = useState(false);
  const dragStartX                          = useRef(0);

  const paginate = useCallback((dir: number) => {
    setPage(([prev]) => [(prev + dir + COACHES.length) % COACHES.length, dir]);
  }, []);

  // Auto-advance — pausa cuando el modal está abierto o el usuario hace hover
  useEffect(() => {
    if (paused || selectedCoach) return;
    const timer = setInterval(() => paginate(1), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused, selectedCoach, paginate]);

  const coach = COACHES[index];

  return (
    <>
      <section id="nosotros" className="bg-white">
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
                    Nuestro equipo
                  </span>
                </div>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display text-display-lg font-bold text-brand-dark"
              >
                Los coaches
                <br />
                <span className="text-brand-gray">detrás del método.</span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="max-w-sm font-sans text-sm leading-relaxed text-brand-gray lg:text-right"
            >
              Profesionales certificados con años de experiencia transformando
              vidas a través del bienestar integral.
            </motion.p>
          </motion.div>

          {/* Carrusel */}
          <div
            className="relative overflow-hidden rounded-2xl shadow-sm"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragStart={(_, info) => { dragStartX.current = info.point.x; }}
                onDragEnd={(_, info) => {
                  const delta = info.point.x - dragStartX.current;
                  if (Math.abs(delta) > 50) paginate(delta < 0 ? 1 : -1);
                }}
                className="grid cursor-grab select-none active:cursor-grabbing lg:grid-cols-2"
              >
                {/* Foto */}
                <div className="relative aspect-[4/3] bg-brand-warm lg:aspect-auto lg:min-h-[540px]">
                  <Image
                    src={coach.image}
                    alt={coach.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                    draggable={false}
                  />
                  {/* Degradado en mobile para que el texto siguiente se lea */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-dark/60 to-transparent lg:hidden" />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center gap-7 bg-brand-dark p-8 lg:p-12">
                  {/* Badge de rol */}
                  <span className="inline-flex w-fit rounded-full bg-brand-red/15 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-red">
                    {coach.role}
                  </span>

                  {/* Nombre + bio */}
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-display-sm font-bold text-white">
                      {coach.name}
                    </h3>
                    <p className="font-sans text-sm leading-relaxed text-white/55">
                      {coach.bio}
                    </p>
                  </div>

                  {/* Especialidades */}
                  <div className="flex flex-wrap gap-2">
                    {coach.specialties.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/10 px-3 py-1 font-sans text-xs text-white/50"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* CTA ver perfil */}
                  <div>
                    <button
                      onClick={() => setSelectedCoach(coach)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 font-sans text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10"
                    >
                      Ver perfil completo
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Botones prev / next */}
            {COACHES.length > 1 && (
              <>
                <button
                  onClick={() => paginate(-1)}
                  aria-label="Coach anterior"
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition hover:bg-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-brand-dark">
                    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => paginate(1)}
                  aria-label="Coach siguiente"
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition hover:bg-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-brand-dark">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Seleccionar coach">
            {COACHES.map((c, i) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={i === index}
                aria-label={`Ver ${c.name}`}
                onClick={() => setPage(([prev]) => [i, i > prev ? 1 : -1])}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index
                    ? "w-8 bg-brand-red"
                    : "w-3 bg-brand-muted hover:bg-brand-gray/30",
                )}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Modal — fuera del section para evitar overflow:hidden */}
      <AnimatePresence>
        {selectedCoach && (
          <CoachModal
            coach={selectedCoach}
            onClose={() => setSelectedCoach(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
