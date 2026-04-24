"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Plan {
  id: string;
  tag: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featured: boolean;
  badge?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLANS: Plan[] = [
  {
    id: "app",
    tag: "Entrada",
    name: "App HioFit",
    tagline: "Tu entrenamiento en el bolsillo.",
    price: "XX,000",
    period: "mes",
    description:
      "Acceso completo a la plataforma digital con rutinas estructuradas, seguimiento de progreso y biblioteca de ejercicios en video.",
    features: [
      "Acceso a la app HioFit",
      "Rutinas semanales pre-diseñadas",
      "Biblioteca de ejercicios en video",
      "Registro de progreso personal",
      "Soporte por comunidad",
    ],
    featured: false,
  },
  {
    id: "coaching",
    tag: "Más elegido",
    name: "Coaching Personal",
    tagline: "Un coach, un plan, tus resultados.",
    price: "XX,000",
    period: "mes",
    description:
      "Coach dedicado que diseña tu plan según tu cuerpo, tu rutina y tus metas. Seguimiento semanal y ajustes en tiempo real.",
    features: [
      "Todo lo del plan App HioFit",
      "Coach personal asignado",
      "Plan de entrenamiento 100% personalizado",
      "Seguimiento y ajustes semanales",
      "Acceso directo al coach por WhatsApp",
      "Revisión mensual de progreso",
    ],
    featured: false,
    badge: "Más elegido",
  },
  {
    id: "health360",
    tag: "Premium",
    name: "Health 360",
    tagline: "El método completo. Los cuatro pilares.",
    price: "XX,000",
    period: "mes",
    description:
      "La experiencia HioFit completa: entrenamiento, nutrición, descanso y mente. Para quienes quieren resultados reales y duraderos.",
    features: [
      "Todo lo del Coaching Personal",
      "Plan nutricional personalizado",
      "Guía de descanso y recuperación",
      "Trabajo de hábitos y mentalidad",
      "Evaluación mensual integral",
      "Acceso prioritario a nuevos programas",
    ],
    featured: true,
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconCheck() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 shrink-0" aria-hidden>
      <polyline points="3 8 6.5 11.5 13 4.5" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" aria-hidden>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

// ─── Plan Card ────────────────────────────────────────────────────────────────

function PlanCard({ plan, isLoggedIn }: { plan: Plan; isLoggedIn: boolean }) {
  const dark = plan.featured;

  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        "relative flex flex-col rounded-2xl p-8",
        "transition-shadow duration-300 hover:shadow-lg",
        dark
          ? "bg-brand-dark text-white"
          : "bg-white text-brand-dark shadow-sm",
      )}
    >
      {/* Badge "Más elegido" */}
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-brand-red px-3.5 py-1 font-sans text-xs font-semibold text-white shadow-sm">
            {plan.badge}
          </span>
        </div>
      )}

      {/* Tag */}
      <div className="mb-6">
        <span className={cn(
          "inline-flex items-center gap-2 border-l-2 pl-3 font-sans text-xs font-semibold uppercase tracking-[0.18em]",
          dark ? "border-brand-red text-white/40" : "border-brand-red text-brand-gray",
        )}>
          {plan.tag}
        </span>
      </div>

      {/* Nombre y tagline */}
      <h3 className={cn(
        "mb-1 font-display text-xl font-bold",
        dark ? "text-white" : "text-brand-dark",
      )}>
        {plan.name}
      </h3>
      <p className={cn(
        "mb-6 font-sans text-sm",
        dark ? "text-white/50" : "text-brand-gray",
      )}>
        {plan.tagline}
      </p>

      {/* Precio */}
      <div className={cn(
        "mb-6 flex items-end gap-1.5 border-b pb-6",
        dark ? "border-white/10" : "border-brand-muted",
      )}>
        <span className={cn(
          "font-sans text-sm font-medium",
          dark ? "text-white/40" : "text-brand-gray",
        )}>₡</span>
        <span className={cn(
          "font-display text-4xl font-bold leading-none tracking-tight",
          dark ? "text-white" : "text-brand-dark",
        )}>
          {plan.price}
        </span>
        <span className={cn(
          "mb-1 font-sans text-sm",
          dark ? "text-white/40" : "text-brand-gray",
        )}>
          / {plan.period}
        </span>
      </div>

      {/* Features */}
      <ul className="mb-8 flex flex-col gap-3 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <span className={cn(
              "mt-0.5",
              dark ? "text-brand-red" : "text-brand-red",
            )}>
              <IconCheck />
            </span>
            <span className={cn(
              "font-sans text-sm leading-snug",
              dark ? "text-white/70" : "text-brand-gray",
            )}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA — cambia según estado de sesión */}
      {isLoggedIn ? (
        <button
          className={cn(
            "flex w-full items-center justify-center rounded-full py-3",
            "font-sans text-sm font-semibold transition-shadow duration-300",
            dark
              ? "bg-brand-red text-white hover:shadow-[0_4px_20px_rgba(255,0,0,0.35)]"
              : "bg-brand-dark text-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.15)]",
          )}
        >
          Adquirir plan
        </button>
      ) : (
        <Link
          href="/login"
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-full py-3",
            "font-sans text-sm font-medium transition-colors duration-200",
            dark
              ? "border border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"
              : "border border-brand-muted text-brand-gray hover:border-brand-dark/30 hover:text-brand-dark",
          )}
        >
          <IconLock />
          Iniciá sesión para continuar
        </Link>
      )}
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PlanesPage() {
  const { isLoggedIn, userName } = useAuth();

  return (
    <main className="bg-brand-base pt-16">

      {/* ── Hero ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16 flex flex-col gap-4"
        >
          {/* Label */}
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-3 border-l-2 border-brand-red pl-3">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-gray">
                Planes y precios
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <motion.h1 variants={fadeUp} className="font-display text-display-lg font-bold text-brand-dark">
              Elegí tu plan.
              <br />
              <span className="text-brand-gray">Empezá hoy.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-sm font-sans text-sm leading-relaxed text-brand-gray lg:text-right"
            >
              Todos los planes incluyen una primera consulta gratuita.
              Cancelá cuando quieras, sin contratos.
            </motion.p>
          </div>
        </motion.div>

        {/* Banner — solo visible si no hay sesión */}
        {!isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="mb-10 flex items-center justify-between gap-4 rounded-2xl border border-brand-muted bg-white px-5 py-4 sm:flex-row"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-dark/5">
                <IconLock />
              </span>
              <p className="font-sans text-sm text-brand-gray">
                Iniciá sesión para adquirir un plan. La primera consulta es{" "}
                <span className="font-semibold text-brand-dark">100% gratuita</span>.
              </p>
            </div>
            <Link
              href="/login"
              className="shrink-0 rounded-full bg-brand-dark px-4 py-2 font-sans text-xs font-semibold text-white transition-opacity hover:opacity-80"
            >
              Ingresar
            </Link>
          </motion.div>
        )}

        {/* Saludo si está logueado */}
        {isLoggedIn && userName && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-10 font-sans text-sm text-brand-gray"
          >
            Bienvenido de nuevo, <span className="font-semibold text-brand-dark">{userName}</span>. Elegí el plan que mejor se adapte a tus metas.
          </motion.p>
        )}

        {/* Grid de planes */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} isLoggedIn={isLoggedIn} />
          ))}
        </motion.div>

        {/* Nota al pie */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center font-sans text-xs text-brand-gray/60"
        >
          ¿Tenés dudas sobre cuál plan elegir?{" "}
          <Link
            href="/contacto"
            className="text-brand-gray underline underline-offset-2 transition-colors hover:text-brand-dark"
          >
            Escribinos y te asesoramos sin compromiso.
          </Link>
        </motion.p>
      </section>

    </main>
  );
}
