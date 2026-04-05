"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, fadeLeft, fadeRight } from "@/lib/motion";

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "¿Cómo funciona la primera consulta?",
    a: "Es totalmente gratuita y sin compromiso. Nos contás tu situación actual, objetivos y estilo de vida. A partir de ahí te explicamos cuál plan se adapta mejor a vos.",
  },
  {
    q: "¿Necesito experiencia previa en el gym?",
    a: "No. Trabajamos con personas de todos los niveles, desde principiantes hasta atletas avanzados. El plan se diseña desde donde estás, no desde donde deberías estar.",
  },
  {
    q: "¿Puedo cancelar en cualquier momento?",
    a: "Sí. No manejamos contratos de permanencia. Podés pausar o cancelar tu plan cuando lo necesités.",
  },
  {
    q: "¿Cómo me entregan el plan?",
    a: "A través de la App HioFit. Ahí encontrás tus rutinas, guías de nutrición, seguimiento de hábitos y comunicación directa con tu coach.",
  },
  {
    q: "¿Puedo hacer el programa desde casa?",
    a: "Sí. Diseñamos planes adaptados a gimnasio, casa, o ambos, según lo que tengas disponible.",
  },
];

// ─── Contact info ─────────────────────────────────────────────────────────────

const CONTACT_ITEMS = [
  {
    label: "WhatsApp",
    value: "+506 6308 1654",
    href: "https://api.whatsapp.com/send/?phone=%2B50663081654&text&type=phone_number&app_absent=0",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "info@hiofit.com",
    href: "mailto:info@hiofit.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    value: "@hiofit_cr",
    href: "https://www.instagram.com/hiofit_cr/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

// ─── FAQ accordion item ───────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="border-b border-brand-muted last:border-0"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-sans text-sm font-semibold text-brand-dark sm:text-base">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="mt-0.5 shrink-0 text-brand-red"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-4 w-4">
            <path d="M8 2v12M2 8h12" />
          </svg>
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28 }}
        className="overflow-hidden"
      >
        <p className="pb-5 font-sans text-sm leading-relaxed text-brand-gray">
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactoPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // TODO: conectar con backend / email service
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  }

  return (
    <main className="pt-24 pb-20">

      {/* ── Hero ── */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col gap-4">
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-3 border-l-2 border-brand-red pl-3">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-gray">
                Contacto
              </span>
            </div>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-display text-display-lg font-bold text-brand-dark"
          >
            Hablemos de
            <br />
            <span className="text-brand-gray">tu bienestar.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="max-w-md font-sans text-sm leading-relaxed text-brand-gray"
          >
            Primera consulta gratuita y sin compromiso. Contanos tu situación y te diseñamos un plan a medida.
          </motion.p>
        </div>
      </motion.section>

      {/* ── Formulario + Info ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_420px]">

          {/* Formulario */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl bg-white p-12 ring-1 ring-brand-muted text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red/10">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-brand-red">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h2 className="font-display text-2xl font-bold text-brand-dark">¡Mensaje enviado!</h2>
                <p className="max-w-xs font-sans text-sm leading-relaxed text-brand-gray">
                  Te respondemos en menos de 24 horas. Mientras tanto, podés escribirnos por WhatsApp si tu consulta es urgente.
                </p>
                <a
                  href="https://api.whatsapp.com/send/?phone=%2B50663081654&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 rounded-full bg-brand-red px-6 py-3 font-sans text-sm font-semibold text-white transition-shadow hover:shadow-[0_4px_16px_rgba(255,0,0,0.25)]"
                >
                  Abrir WhatsApp
                </a>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 rounded-2xl bg-white p-8 ring-1 ring-brand-muted sm:p-10"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="nombre" className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brand-dark/50">
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      required
                      placeholder="Tu nombre"
                      className="rounded-xl border border-brand-muted bg-brand-base px-4 py-3 font-sans text-sm text-brand-dark placeholder:text-brand-gray/40 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="apellido" className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brand-dark/50">
                      Apellido
                    </label>
                    <input
                      id="apellido"
                      name="apellido"
                      type="text"
                      required
                      placeholder="Tu apellido"
                      className="rounded-xl border border-brand-muted bg-brand-base px-4 py-3 font-sans text-sm text-brand-dark placeholder:text-brand-gray/40 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brand-dark/50">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="tu@correo.com"
                    className="rounded-xl border border-brand-muted bg-brand-base px-4 py-3 font-sans text-sm text-brand-dark placeholder:text-brand-gray/40 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="telefono" className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brand-dark/50">
                    Teléfono <span className="normal-case tracking-normal text-brand-gray/40">(opcional)</span>
                  </label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    placeholder="+506 0000 0000"
                    className="rounded-xl border border-brand-muted bg-brand-base px-4 py-3 font-sans text-sm text-brand-dark placeholder:text-brand-gray/40 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="mensaje" className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brand-dark/50">
                    ¿Cuál es tu objetivo?
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={4}
                    placeholder="Contanos un poco sobre tu situación y qué querés lograr..."
                    className="resize-none rounded-xl border border-brand-muted bg-brand-base px-4 py-3 font-sans text-sm text-brand-dark placeholder:text-brand-gray/40 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-red px-8 py-4 font-sans text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_6px_24px_rgba(255,0,0,0.3)] disabled:opacity-70"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-[200%]"
                  />
                  {loading ? "Enviando..." : "Enviar mensaje"}
                </button>

                <p className="text-center font-sans text-xs text-brand-gray/50">
                  O escribinos directamente por{" "}
                  <a
                    href="https://api.whatsapp.com/send/?phone=%2B50663081654&text&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-dark underline underline-offset-2 hover:text-brand-red"
                  >
                    WhatsApp
                  </a>
                </p>
              </form>
            )}
          </motion.div>

          {/* Info de contacto */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-8"
          >
            {/* Canales */}
            <div className="flex flex-col gap-4 rounded-2xl bg-brand-dark p-8">
              <h2 className="font-display text-lg font-bold text-white">
                Contacto directo
              </h2>
              <div className="flex flex-col gap-4">
                {CONTACT_ITEMS.map(({ label, value, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-white/5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors group-hover:border-brand-red/40 group-hover:text-brand-red">
                      {icon}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">
                        {label}
                      </span>
                      <span className="font-sans text-sm font-medium text-white/80 group-hover:text-white">
                        {value}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Badges de confianza */}
            <div className="flex flex-col gap-3 rounded-2xl bg-brand-base p-8 ring-1 ring-brand-muted">
              <h3 className="font-display text-base font-bold text-brand-dark">
                ¿Por qué contactarnos?
              </h3>
              {[
                "Primera consulta 100% gratuita",
                "Respondemos en menos de 24 horas",
                "Sin contratos ni permanencia",
                "Plan personalizado desde el día 1",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-red/10">
                    <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3 text-brand-red" aria-hidden>
                      <path d="M2.5 6l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="font-sans text-sm text-brand-gray">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col gap-4"
        >
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-3 border-l-2 border-brand-red pl-3">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-gray">
                Preguntas frecuentes
              </span>
            </div>
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-display-lg font-bold text-brand-dark">
            Resolvemos tus dudas.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-10 max-w-2xl divide-y divide-brand-muted rounded-2xl bg-white p-8 ring-1 ring-brand-muted"
        >
          {FAQS.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </motion.div>
      </section>

    </main>
  );
}
