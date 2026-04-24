"use client";

import { useState, useId, useRef } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormState = "login" | "register" | "forgot";
type SubmitState = "idle" | "loading" | "success";

// ─── Motion variants ─────────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

const panelVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: EASE_OUT } },
  exit:   { opacity: 0, y: -6, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] as [number, number, number, number] } },
};

function fieldDelay(i: number) {
  return {
    hidden:  { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { delay: i * 0.055, duration: 0.2, ease: EASE_OUT } },
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const isEmailValid  = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isPassValid   = (v: string) => v.length >= 8;

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconEye({ off }: { off?: boolean }) {
  return off ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconSpinner() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-4 w-4 animate-spin" aria-hidden>
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  );
}

// Checkmark pequeño para los campos — diferente al del botón
function IconFieldCheck() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3" aria-hidden>
      <polyline points="2 6 5 9 10 3" />
    </svg>
  );
}

// ─── Field ────────────────────────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isValid?: boolean;
  rightSlot?: React.ReactNode;
}

function Field({ label, error, isValid, rightSlot, id, ...props }: InputProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const hasSuffix = isValid || !!rightSlot;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="font-sans text-xs font-medium text-brand-dark">
        {label}
      </label>
      <div className="relative">
        <input
          id={fieldId}
          {...props}
          className={cn(
            "w-full rounded-xl border bg-brand-base px-3.5 py-2.5",
            "font-sans text-sm text-brand-dark placeholder:text-brand-gray/50",
            "outline-none transition-[border-color,box-shadow] duration-150",
            isValid
              ? "border-green-400/70 focus:border-green-400/80 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.1)]"
              : "border-brand-muted focus:border-brand-red/50 focus:shadow-[0_0_0_3px_rgba(255,0,0,0.08)]",
            error && "!border-red-400 focus:!shadow-[0_0_0_3px_rgba(239,68,68,0.1)]",
            // Padding derecho: más espacio cuando hay check + slot simultáneos
            isValid && rightSlot ? "pr-16" : hasSuffix ? "pr-10" : "",
            props.className,
          )}
        />

        {/* Suffix area: check animado + slot opcional */}
        {hasSuffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-brand-gray">
            <AnimatePresence>
              {isValid && (
                <motion.span
                  key="field-check"
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  transition={{ type: "spring", duration: 0.35, bounce: 0.45 }}
                  className="text-green-500"
                >
                  <IconFieldCheck />
                </motion.span>
              )}
            </AnimatePresence>
            {rightSlot}
          </div>
        )}
      </div>
      {error && <p className="font-sans text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ─── SubmitButton ─────────────────────────────────────────────────────────────

function SubmitButton({
  state,
  label,
  loadingLabel,
  successLabel,
  form,
}: {
  state: SubmitState;
  label: string;
  loadingLabel: string;
  successLabel: string;
  form?: string;
}) {
  return (
    <button
      type="submit"
      form={form}
      disabled={state !== "idle"}
      className={cn(
        "relative flex w-full items-center justify-center gap-2",
        "rounded-xl py-2.5 font-sans text-sm font-semibold text-white",
        "transition-[transform,background-color,box-shadow] duration-150",
        "outline-none focus-visible:ring-2 focus-visible:ring-brand-red/50 focus-visible:ring-offset-2",
        state === "success"
          ? "bg-green-600"
          : "bg-brand-red hover:shadow-[0_4px_16px_rgba(255,0,0,0.22)]",
        state === "idle" && "active:scale-[0.97]",
        state !== "idle" && "cursor-not-allowed opacity-80",
      )}
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span key="idle"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.15 }}
          >
            {label}
          </motion.span>
        )}
        {state === "loading" && (
          <motion.span key="loading"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2"
          >
            <IconSpinner />
            {loadingLabel}
          </motion.span>
        )}
        {state === "success" && (
          <motion.span key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="flex items-center gap-2"
          >
            <IconCheck />
            {successLabel}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

// ─── TabSwitcher ──────────────────────────────────────────────────────────────

function TabSwitcher({
  active,
  onChange,
}: {
  active: "login" | "register";
  onChange: (v: "login" | "register") => void;
}) {
  const tabs = [
    { key: "login"    as const, label: "Ingresar"     },
    { key: "register" as const, label: "Crear cuenta" },
  ];

  return (
    <div className="mb-8 flex rounded-xl bg-brand-base p-1">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={cn(
            "relative flex-1 rounded-lg py-2",
            "font-sans text-sm font-medium transition-colors duration-200",
            active === key ? "text-brand-dark" : "text-brand-gray hover:text-brand-dark/70",
          )}
        >
          {/* Pill deslizante con layoutId */}
          {active === key && (
            <motion.span
              layoutId="tab-pill"
              className="absolute inset-0 rounded-lg bg-white shadow-sm"
              transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
            />
          )}
          <span className="relative z-10">{label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── TiltCard ─────────────────────────────────────────────────────────────────

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 200, damping: 28 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 28 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 → 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    rotateX.set(-y * 10); // invertir Y para perspectiva natural
    rotateY.set(x * 10);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Branding panel ───────────────────────────────────────────────────────────

const PILLARS = [
  "Rutinas de entrenamiento personalizadas",
  "Plan nutricional adaptado a tus metas",
  "Seguimiento de descanso y recuperación",
  "Acompañamiento de mente y hábitos",
] as const;

function BrandingPanel() {
  return (
    <div className="flex flex-col justify-between bg-brand-dark px-10 py-12 relative overflow-hidden h-full flex-1">
      {/* Glows de fondo */}
      <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-brand-red/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-brand-red/5 blur-2xl" />

      {/* Logo */}
      <Link href="/" className="flex w-fit items-center gap-2.5 relative z-10">
        <Image src="/logo.png" alt="HioFit" width={36} height={36} className="h-9 w-9 object-contain" />
        <span className="font-display text-xl font-bold tracking-tight text-white">HioFit</span>
      </Link>

      {/* Contenido central */}
      <div className="relative z-10 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-3 border-l-2 border-brand-red pl-3">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Tu plataforma de bienestar
            </span>
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight text-white">
            Tu mejor versión
            <br />
            <span className="text-white/40">te está esperando.</span>
          </h2>
          <p className="font-sans text-sm leading-relaxed text-white/50 max-w-xs">
            Accedé a tu plan personalizado, rutinas, seguimiento nutricional
            y acompañamiento en un solo lugar.
          </p>
        </div>

        <ul className="flex flex-col gap-3">
          {PILLARS.map((label, i) => (
            <motion.li
              key={label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.07, duration: 0.22, ease: EASE_OUT }}
              className="flex items-start gap-3"
            >
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-red/15">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5 text-brand-red" aria-hidden>
                  <polyline points="2 6 5 9 10 3" />
                </svg>
              </span>
              <span className="font-sans text-sm leading-snug text-white/55">{label}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Testimonial con tilt 3D */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.3, ease: EASE_OUT }}
        className="relative z-10"
      >
        <TiltCard className="rounded-2xl border border-white/[0.04] bg-white/5 p-5 backdrop-blur-sm cursor-default">
          <p className="font-sans text-sm leading-relaxed text-white/70 italic">
            &ldquo;En 3 meses con HioFit logré lo que no pude en años solo.
            El acompañamiento personalizado hace toda la diferencia.&rdquo;
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red font-display text-xs font-bold text-white">
              MA
            </div>
            <div>
              <p className="font-sans text-xs font-semibold text-white/80">Mariana A.</p>
              <p className="font-sans text-xs text-white/40">Cliente HioFit</p>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  );
}

// ─── Login form ───────────────────────────────────────────────────────────────

function LoginForm({
  onForgot,
  onSubmit,
}: {
  onForgot: () => void;
  onSubmit: () => void;
}) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [shaking,  setShaking]  = useState(false);

  const emailOk = isEmailValid(email);
  const passOk  = isPassValid(password);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailOk || !passOk) {
      setShaking(true);
      return;
    }
    onSubmit();
  }

  return (
    <motion.div key="login" variants={panelVariants} initial="hidden" animate="visible" exit="exit">
      {/* Wrapper de shake — separado para no interferir con panelVariants */}
      <motion.div
        animate={shaking ? { x: [0, -10, 10, -8, 8, -5, 5, 0] } : { x: 0 }}
        transition={{ duration: 0.45 }}
        onAnimationComplete={() => setShaking(false)}
      >
        <form id="auth-form" onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <motion.div variants={fieldDelay(0)} initial="hidden" animate="visible">
            <Field
              label="Correo electrónico"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              isValid={emailOk}
              autoComplete="email"
            />
          </motion.div>

          <motion.div variants={fieldDelay(1)} initial="hidden" animate="visible">
            <Field
              label="Contraseña"
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              isValid={passOk}
              autoComplete="current-password"
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="transition-colors hover:text-brand-dark focus-visible:outline-none"
                  aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  <IconEye off={showPass} />
                </button>
              }
            />
          </motion.div>

          <motion.div
            variants={fieldDelay(2)}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-between"
          >
            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="h-3.5 w-3.5 rounded border-brand-muted accent-brand-red" />
              <span className="font-sans text-xs text-brand-gray">Recordarme</span>
            </label>
            <button
              type="button"
              onClick={onForgot}
              className="font-sans text-xs text-brand-red transition-opacity hover:opacity-70"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </motion.div>

        </form>
      </motion.div>
    </motion.div>
  );
}

// ─── Register form ────────────────────────────────────────────────────────────

function RegisterForm({ onSubmit }: { onSubmit: () => void }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [showPass, setShowPass] = useState(false);
  const [shaking,  setShaking]  = useState(false);

  const emailOk   = isEmailValid(email);
  const passOk    = isPassValid(password);
  const confirmOk = confirm.length > 0 && confirm === password;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailOk || !passOk || !confirmOk) {
      setShaking(true);
      return;
    }
    onSubmit();
  }

  return (
    <motion.div key="register" variants={panelVariants} initial="hidden" animate="visible" exit="exit">
      <motion.div
        animate={shaking ? { x: [0, -10, 10, -8, 8, -5, 5, 0] } : { x: 0 }}
        transition={{ duration: 0.45 }}
        onAnimationComplete={() => setShaking(false)}
      >
        <form id="auth-form" onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <motion.div
            variants={fieldDelay(0)}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-3"
          >
            <Field label="Nombre"   type="text" placeholder="Ana"      autoComplete="given-name" />
            <Field label="Apellido" type="text" placeholder="González" autoComplete="family-name" />
          </motion.div>

          <motion.div variants={fieldDelay(1)} initial="hidden" animate="visible">
            <Field
              label="Correo electrónico"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              isValid={emailOk}
              autoComplete="email"
            />
          </motion.div>

          <motion.div variants={fieldDelay(2)} initial="hidden" animate="visible">
            <Field
              label="Contraseña"
              type={showPass ? "text" : "password"}
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={e => setPassword(e.target.value)}
              isValid={passOk}
              autoComplete="new-password"
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="transition-colors hover:text-brand-dark focus-visible:outline-none"
                  aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  <IconEye off={showPass} />
                </button>
              }
            />
          </motion.div>

          <motion.div variants={fieldDelay(3)} initial="hidden" animate="visible">
            <Field
              label="Confirmar contraseña"
              type={showPass ? "text" : "password"}
              placeholder="Repetí tu contraseña"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              isValid={confirmOk}
              autoComplete="new-password"
            />
          </motion.div>

        </form>
      </motion.div>
    </motion.div>
  );
}

// ─── Forgot password form ─────────────────────────────────────────────────────

function ForgotForm({ onBack }: { onBack: () => void }) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitState("loading");
    setTimeout(() => setSubmitState("success"), 1600);
  }

  return (
    <motion.div key="forgot" variants={panelVariants} initial="hidden" animate="visible" exit="exit">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <motion.div variants={fieldDelay(0)} initial="hidden" animate="visible">
          <Field
            label="Correo electrónico"
            type="email"
            placeholder="tu@email.com"
            required
            autoComplete="email"
            disabled={submitState === "success"}
          />
        </motion.div>

        {submitState === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="rounded-xl border border-green-200 bg-green-50 px-4 py-3"
          >
            <p className="font-sans text-sm text-green-700">
              ✓ Revisá tu correo — te enviamos las instrucciones para recuperar tu contraseña.
            </p>
          </motion.div>
        ) : (
          <motion.div variants={fieldDelay(1)} initial="hidden" animate="visible">
            <SubmitButton
              state={submitState}
              label="Enviar instrucciones"
              loadingLabel="Enviando..."
              successLabel="¡Enviado!"
            />
          </motion.div>
        )}

        <motion.div variants={fieldDelay(2)} initial="hidden" animate="visible">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 font-sans text-xs text-brand-gray transition-colors hover:text-brand-dark"
          >
            <IconArrowLeft />
            Volver al inicio de sesión
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const { login }                     = useAuth();
  const router                        = useRouter();
  const [formState,   setFormState]   = useState<FormState>("login");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const isForgot = formState === "forgot";

  function handleTabChange(tab: "login" | "register") {
    setFormState(tab);
    setSubmitState("idle");
  }

  function handleAuthSubmit(durationMs: number) {
    setSubmitState("loading");
    setTimeout(() => {
      setSubmitState("success");
      login("Usuario");           // activa la sesión mock
      setTimeout(() => {
        router.push("/planes");   // redirige a planes tras el éxito
      }, 900);
    }, durationMs);
  }

  return (
    <div className="flex min-h-svh">
      {/* ── Left: branding (desktop only) ── */}
      <div className="hidden lg:flex lg:w-1/2 flex-col">
        <BrandingPanel />
      </div>

      {/* ── Right: form panel ── */}
      <div className="flex w-full flex-col lg:w-1/2">

        {/* Mobile logo */}
        <div className="flex items-center justify-between border-b border-brand-muted px-6 py-4 lg:hidden">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="HioFit" width={32} height={32} className="h-8 w-8 object-contain" />
            <span className="font-display text-lg font-bold tracking-tight text-brand-dark">HioFit</span>
          </Link>
          <Link href="/" className="font-sans text-xs text-brand-gray transition-colors hover:text-brand-dark">
            ← Volver
          </Link>
        </div>

        {/* Form area */}
        <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-sm">

            {/* Back to site — desktop */}
            <Link
              href="/"
              className="mb-8 hidden items-center gap-1.5 font-sans text-xs text-brand-gray transition-colors hover:text-brand-dark lg:flex"
            >
              <IconArrowLeft />
              Volver al sitio
            </Link>

            {/* Tab switcher — solo para login/register */}
            {!isForgot && (
              <TabSwitcher
                active={formState as "login" | "register"}
                onChange={handleTabChange}
              />
            )}

            {/* Título solo para forgot */}
            {isForgot && (
              <motion.div
                key="forgot-header"
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mb-8 flex flex-col gap-1"
              >
                <h1 className="font-display text-2xl font-bold text-brand-dark">
                  Recuperar acceso
                </h1>
                <p className="font-sans text-sm text-brand-gray">
                  Ingresá tu correo y te enviamos las instrucciones.
                </p>
              </motion.div>
            )}

            {/* Formularios — solo los campos, sin el botón */}
            <AnimatePresence mode="wait">
              {formState === "login" && (
                <LoginForm
                  key="login"
                  onForgot={() => setFormState("forgot")}
                  onSubmit={() => handleAuthSubmit(1600)}
                />
              )}
              {formState === "register" && (
                <RegisterForm
                  key="register"
                  onSubmit={() => handleAuthSubmit(1800)}
                />
              )}
              {formState === "forgot" && (
                <ForgotForm
                  key="forgot"
                  onBack={() => setFormState("login")}
                />
              )}
            </AnimatePresence>

            {/* Botón fijo — fuera del AnimatePresence, no se mueve al cambiar de tab */}
            {!isForgot && (
              <div className="mt-5">
                <SubmitButton
                  form="auth-form"
                  state={submitState}
                  label={formState === "login" ? "Iniciar sesión" : "Crear cuenta"}
                  loadingLabel={formState === "login" ? "Verificando..." : "Creando cuenta..."}
                  successLabel={formState === "login" ? "¡Bienvenido!" : "¡Cuenta creada!"}
                />
              </div>
            )}

          </div>
        </div>

        {/* Footer legal */}
        <p className="pb-6 text-center font-sans text-xs text-brand-gray/60 px-6">
          Al continuar, aceptás nuestros{" "}
          <Link href="/terms" className="underline underline-offset-2 hover:text-brand-gray transition-colors">
            Términos de servicio
          </Link>{" "}
          y{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-brand-gray transition-colors">
            Política de privacidad
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
