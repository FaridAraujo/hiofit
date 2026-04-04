"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";

// ─── CTA Section ──────────────────────────────────────────────────────────────

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=%2B50663081654&text&type=phone_number&app_absent=0";

export default function CTA() {
  return (
    <section id="contacto" className="bg-brand-base">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center"
        >
          {/* Label */}
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-3 border-l-2 border-brand-red pl-3">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-gray">
                Empezá hoy
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            className="font-display text-display-lg font-bold text-brand-dark"
          >
            Tu transformación
            <br />
            <span className="text-brand-red">empieza con un mensaje.</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="max-w-md font-sans text-sm leading-relaxed text-brand-gray sm:text-base"
          >
            Primera consulta gratuita y sin compromiso.
            Contanos tu situación y te armamos un plan a medida.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center gap-3 sm:flex-row"
          >
            {/* WhatsApp — CTA principal */}
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-brand-red px-8 py-4 font-sans text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_6px_24px_rgba(255,0,0,0.3)]"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-[200%]"
              />
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escribinos por WhatsApp
            </motion.a>

            {/* Ver planes — secundario */}
            <a
              href="#servicios"
              className="rounded-full border border-brand-dark/20 px-8 py-4 font-sans text-sm font-semibold text-brand-dark transition-all duration-300 hover:border-brand-dark hover:bg-brand-dark hover:text-white"
            >
              Ver planes
            </a>
          </motion.div>

          {/* Trust note */}
          <motion.p
            variants={fadeUp}
            className="font-sans text-xs text-brand-gray/60"
          >
            Sin tarjeta de crédito · Sin contratos largos · Cancelás cuando querés
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
