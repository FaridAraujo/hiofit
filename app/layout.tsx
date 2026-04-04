import type { Metadata, Viewport } from "next";
import { inter, sora } from "@/styles/fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import "@/app/globals.css";

/* ── Metadata ───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "HioFit — Bienestar Integral para Toda la Vida",
    template: "%s | HioFit",
  },
  description:
    "HioFit es tu plataforma de bienestar integral. Entrenamiento personalizado, nutrición estratégica y bienestar mental para transformar tu vida desde adentro.",
  keywords: ["fitness", "bienestar", "nutrición", "salud integral", "entrenamiento", "HioFit"],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type:        "website",
    locale:      "es_ES",
    title:       "HioFit — Bienestar Integral para Toda la Vida",
    description: "Entrenamiento, nutrición y bienestar mental en un solo método.",
    siteName:    "HioFit",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "HioFit",
    description: "Bienestar integral para transformar tu vida desde adentro.",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F6F4",
};

/* ── Root Layout ────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${sora.variable}`}>
      <body>
        <ScrollProgress />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
