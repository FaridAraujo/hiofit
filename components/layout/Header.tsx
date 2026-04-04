"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── Config ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Inicio",    href: "/"           },
  { label: "Nosotros",  href: "/nosotros"   },
  { label: "Servicios", href: "/#servicios" },
  { label: "Planes",    href: "/#planes"    },
  { label: "Contacto",  href: "/#contacto"  },
] as const;

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <Link
      href="/"
      aria-label="HioFit — Inicio"
      className="flex items-center gap-2.5 focus-visible:outline-none"
    >
      <Image
        src="/logo.png"
        alt="HioFit"
        width={36}
        height={36}
        className="h-9 w-9 object-contain"
        priority
      />
      <span className="font-display text-xl font-bold tracking-tight text-black">
        Hio<span className="text-brand-red">Fit</span>
      </span>
    </Link>
  );
}

// ─── Desktop nav ──────────────────────────────────────────────────────────────

function DesktopNav() {
  return (
    <nav
      className="hidden items-center gap-0.5 lg:flex"
      aria-label="Navegación principal"
    >
      {NAV_LINKS.map(({ label, href }) => (
        <a
          key={href}
          href={href}
          className={cn(
            "rounded-full px-4 py-2",
            "font-sans text-sm font-medium text-brand-gray",
            "transition-colors duration-200 hover:bg-brand-muted/60 hover:text-brand-dark",
          )}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

// ─── Mobile Quick Nav ─────────────────────────────────────────────────────────

function MobileQuickNav() {
  const quickLinks = [
    { label: "Planes", href: "/#servicios" },
    { label: "Testimonios", href: "/#resultados" },
    { label: "Contacto", href: "/#contacto" },
  ];

  return (
    <div className="flex items-center gap-2 lg:hidden">
      {quickLinks.map(({ label, href }) => (
        <a
          key={href}
          href={href}
          className={cn(
            "rounded-full px-3 py-1.5",
            "font-sans text-xs font-medium text-brand-gray",
            "transition-colors duration-200 hover:bg-brand-muted/60 hover:text-brand-dark",
          )}
        >
          {label}
        </a>
      ))}
    </div>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function NavCTA() {
  return (
    <a
      href="#contacto"
      className={cn(
        "hidden lg:inline-flex",
        "rounded-full bg-brand-red px-5 py-2",
        "font-sans text-sm font-semibold text-white",
        "transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(255,0,0,0.25)]",
      )}
    >
      Comenzar
    </a>
  );
}

// ─── Hamburger animado ────────────────────────────────────────────────────────

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative h-4 w-5" aria-hidden>
      <motion.span
        className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-brand-dark"
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-brand-dark"
        animate={open ? { opacity: 0, x: -4 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-brand-dark"
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
      />
    </div>
  );
}

// ─── Mobile menu ─────────────────────────────────────────────────────────────

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute inset-x-0 top-full border-t border-brand-muted bg-white px-4 pb-6 pt-3 shadow-lg lg:hidden"
        >
          <nav className="flex flex-col" aria-label="Navegación móvil">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={onClose}
                className="rounded-xl px-4 py-3 font-sans text-base font-medium text-brand-dark transition-colors hover:bg-brand-muted/50"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-4 border-t border-brand-muted pt-4">
            <a
              href="#contacto"
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-full bg-brand-red py-3 font-sans text-sm font-semibold text-white"
            >
              Comenzar ahora
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  // Efecto scroll — eleva el header cuando el usuario baja
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú móvil al pasar a desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-brand-muted bg-white/95 shadow-sm backdrop-blur-sm"
          : "bg-white/80 backdrop-blur-sm",
      )}
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <DesktopNav />
        <MobileQuickNav />
        <div className="flex items-center gap-3">
          <NavCTA />

          {/* Botón hamburger — solo mobile */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full lg:hidden",
              "border border-brand-muted bg-white transition-colors hover:bg-brand-muted/50",
            )}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
