import Image from "next/image";

// ─── Footer ───────────────────────────────────────────────────────────────────

const NAV_COLUMNS = [
  {
    title: "Navegación",
    links: [
      { label: "Inicio",    href: "/" },
      { label: "Nosotros",  href: "/nosotros" },
      { label: "Servicios", href: "/#servicios" },
      { label: "Proceso",   href: "/#proceso" },
      { label: "Resultados",href: "/#resultados" },
    ],
  },
  {
    title: "Servicios",
    links: [
      { label: "Health 360",       href: "#servicios" },
      { label: "Coaching Personal", href: "#servicios" },
      { label: "App HioFit",       href: "#servicios" },
      { label: "Planes",           href: "#servicios" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { label: "WhatsApp",  href: "https://api.whatsapp.com/send/?phone=%2B50663081654&text&type=phone_number&app_absent=0" },
      { label: "Instagram", href: "https://www.instagram.com/hiofit_cr/" },
      { label: "Facebook",  href: "https://www.facebook.com/Hiofitcr" },
      { label: "YouTube",   href: "https://www.youtube.com/user/hiofit" },
      { label: "TikTok",    href: "https://www.tiktok.com/@hiofit" },
      { label: "Email",     href: "mailto:info@hiofit.com" },
    ],
  },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Top row */}
        <div className="grid gap-12 border-b border-white/10 py-16 lg:grid-cols-[1.5fr_repeat(3,1fr)]">

          {/* Brand col */}
          <div className="flex flex-col gap-5">
            <a href="/" aria-label="HioFit" className="flex w-fit items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="HioFit"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="font-display text-xl font-bold tracking-tight text-white">
                Hio<span className="text-brand-red">Fit</span>
              </span>
            </a>

            <p className="max-w-xs font-sans text-sm leading-relaxed text-white/40">
              {/* TODO: actualizar tagline con el cliente */}
              Bienestar integral para transformar tu vida desde adentro.
              Entrenamiento, nutrición, descanso y mente.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {[
                {
                  label: "Instagram",
                  href: "https://www.instagram.com/hiofit_cr/",
                  path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                },
                {
                  label: "Facebook",
                  href: "https://www.facebook.com/Hiofitcr",
                  path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                },
                {
                  label: "YouTube",
                  href: "https://www.youtube.com/user/hiofit",
                  path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
                },
                {
                  label: "TikTok",
                  href: "https://www.tiktok.com/@hiofit",
                  path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z",
                },
              ].map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition-colors hover:border-white/30 hover:text-white/70"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white/30">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="font-sans text-sm text-white/50 transition-colors hover:text-white/80"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="font-sans text-xs text-white/30">
            © {year} HioFit. Todos los derechos reservados.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 font-sans text-xs text-white/40">
            <a href="/privacy" className="hover:text-white/60 transition-colors">
              Política de privacidad
            </a>
            <span className="hidden sm:inline">·</span>
            <a href="/terms" className="hover:text-white/60 transition-colors">
              Términos de servicio
            </a>
            <span className="hidden sm:inline">·</span>
            <a href="/refunds" className="hover:text-white/60 transition-colors">
              Reembolsos
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
