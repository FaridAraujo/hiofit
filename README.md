# HioFit — Wellness Coaching Website

Production website for a Costa Rican wellness and personal training brand,
built with Next.js 15 and React 19. Live at hiofit.vercel.app

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Framework  | Next.js 15 (App Router)           |
| Frontend   | React 19, TypeScript              |
| Styling    | Tailwind CSS v3.4                 |
| Animations | Framer Motion                     |
| Images     | Next.js Image (blur-up placeholder)|
| Fonts      | Sora (display) + Inter (body)     |
| Deploy     | Vercel (CI/CD from GitHub)        |
| Build      | Turbopack                         |

## Pages

| Route       | Description                                          |
|-------------|------------------------------------------------------|
| /           | Landing page with animated sections                  |
| /servicios  | Full service descriptions with feature lists         |
| /nosotros   | Coach profiles with bios and specialties             |
| /contacto   | Contact form, FAQ accordion, contact channels        |
| /planes     | Plan selection — gated by auth state                 |
| /login      | Authentication page (register, login, forgot password)|
| /privacy    | Privacy policy                                       |
| /terms      | Terms of service                                     |
| /refunds    | Refund policy                                        |

## Features

### UI & Animations
- Hero carousel with 5s auto-advance, swipe support, and coach detail modal
- Scroll-triggered entrance animations with stagger containers
- Animated counters via requestAnimationFrame with custom easing
- Scroll progress bar using Framer Motion useScroll + useSpring
- Scroll-aware header with elevation change on scroll
- Animated hamburger menu for mobile with quick-access nav
- Animated FAQ accordion on contact page

### Auth UI (mock — Phase 2 ready)
- Split-screen login page with branded left panel
- Animated tab switcher between login and register (Framer Motion layoutId)
- Per-field validation icons with spring animation
- Shake animation on invalid submit attempt
- Mouse-tracking 3D tilt on testimonial card (useSpring + rotateX/Y)
- Password visibility toggle
- Forgot password flow with inline success state
- AuthContext with localStorage persistence (name, hasPlan)
- Header adapts to session state: shows user name, plan link, and logout

### Plans page
- Three plan cards with full feature lists and placeholder pricing
- Locked state when logged out: all info visible, CTA prompts login
- Unlocked state when logged in: active purchase buttons
- Informational banner when unauthenticated
- Conditional plan label in header: "Adquirir planes" vs "Mi plan"

### Responsive layout
- Mobile-first across all breakpoints
- Full responsive layout across all pages

## Design System

Custom Tailwind tokens:

| Token        | Value    | Usage                      |
|--------------|----------|----------------------------|
| brand.red    | #FF0000  | Primary accent, CTAs       |
| brand.dark   | #111111  | Text, footer, dark panels  |
| brand.base   | #F7F6F4  | Light backgrounds          |
| brand.warm   | #E8E3DC  | Warm section backgrounds   |
| brand.muted  | #E5E3DF  | Borders, dividers          |
| brand.gray   | #6B7280  | Secondary text             |

Fluid font sizes via clamp() for automatic scaling.
All icons as inline SVG — no external icon dependency.

## Architecture

Estructura de carpetas:

  hiofit/
  |
  +-- app/
  |     +-- layout.tsx          (Root layout con AuthProvider)
  |     +-- page.tsx            (Homepage)
  |     +-- login/              (Paginas de auth — sin Header/Footer)
  |     +-- planes/             (Seleccion de plan — auth-aware)
  |     +-- servicios/
  |     +-- nosotros/
  |     +-- contacto/
  |     +-- privacy/
  |     +-- terms/
  |     +-- refunds/
  |
  +-- components/
  |     +-- layout/             (Header, Footer)
  |     +-- sections/           (Secciones del Homepage)
  |     +-- ui/                 (ScrollProgress, BlurImage)
  |
  +-- contexts/
  |     +-- AuthContext.tsx     (Mock auth state con localStorage)
  |
  +-- lib/
        +-- motion.ts           (Presets de Framer Motion)
        +-- utils.ts            (Utilidad cn())

Decisiones de arquitectura:
- Server Components para layout y secciones estaticas
- Client Components solo donde se requiere interactividad
- Presets de motion reutilizables: fadeUp, fadeIn, staggerContainer, scaleIn
- BlurImage: wrapper sobre next/image con transicion blur-md + scale al cargar
- ScrollProgress con spring physics fijo al top del viewport
- Header y Footer ocultos en rutas de auth via usePathname()
- Todos los hooks se llaman antes de cualquier return condicional (Rules of Hooks)

## Security model

The current auth is a UI mock using localStorage — intentionally not secure.
The full security model (Phase 2) replaces it with:

- Server-signed JWTs via Supabase Auth — unforgeable by the client
- Server-side validation on every protected request
- Stripe webhooks for payment verification — the server, not the client, activates plans
- Row Level Security (RLS) in PostgreSQL — users can only read their own data
- HTTPS enforced via Vercel

## Getting Started

npm install
npm run dev

Open http://localhost:3000

## Build

npm run build
npm run start

## Roadmap

### Phase 1 — Foundation (Next)
- Supabase project setup (PostgreSQL + Auth + Storage)
- Database schema: users, plans, subscriptions
- Row Level Security policies
- Replace AuthContext mock with real Supabase Auth
- Environment variables on Vercel

### Phase 2 — Payments & Dashboards
- Stripe integration — products, Checkout Sessions, webhooks
- /dashboard — client portal (active plan, coach info, billing)
- /admin — coach panel (client list, subscriptions, stats)
- Transactional emails via Resend
- RBAC roles (user, coach, admin)
- JWT refresh rotation

### Phase 3 — Mobile App (Planned, 6–12 months)
- React Native + Expo for iOS and Android
- Shared Supabase backend with the web platform
- Workout routine builder with video demonstrations
- Progress tracking — body metrics, charts, history
- Client-coach messaging with real-time chat
- Push notifications for reminders and new routines
- Session scheduling with interactive calendar
