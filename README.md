# HioFit — Wellness Coaching Website

Production website for a Costa Rican wellness and personal training brand,
built with Next.js 15 and React 19. Live at [hiofit.vercel.app](https://hiofit.vercel.app).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Frontend | React 19, TypeScript |
| Styling | Tailwind CSS v3.4 |
| Animations | Framer Motion |
| Images | Next.js Image (blur-up placeholder) |
| Fonts | Sora (display) + Inter (body) |
| Deploy | Vercel (CI/CD from GitHub) |
| Build | Turbopack |

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with animated sections |
| `/servicios` | Service descriptions with feature lists |
| `/nosotros` | Coach profiles with bios and specialties |
| `/contacto` | Contact form, FAQ accordion, contact channels |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/refunds` | Refund policy |

## Features

- Hero carousel with 5s auto-advance, swipe support,
  and coach detail modal
- Scroll-triggered entrance animations with stagger containers
- Animated counters via requestAnimationFrame with custom easing
- Timeline section with scaleX connector animations
- Scroll progress bar using Framer Motion useScroll + useSpring
- Scroll-aware header with elevation change and animated
  hamburger menu for mobile
- Contact form with success state and WhatsApp fallback
- Animated FAQ accordion
- Full responsive layout across all breakpoints

## Design System

Custom Tailwind tokens:

| Token | Value | Usage |
|---|---|---|
| `brand.red` | #FF0000 | Primary accent |
| `brand.dark` | #111111 | Background |
| `brand.base` | #F7F6F4 | Light background |
| `brand.warm` | #E8E3DC | Section backgrounds |

Fluid font sizes via `clamp()` for automatic scaling.
All icons as inline SVG — no external icon dependency.

## Architecture

- Server Components for layout and static sections
- Client Components only where interactivity is required
- Reusable motion presets in `lib/motion.ts`
  (fadeUp, fadeIn, staggerContainer, scaleIn)
- `BlurImage` wrapper over next/image with
  blur-md + scale transition on load
- `ScrollProgress` component with spring physics
- `cn()` utility via clsx + tailwind-merge

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm run start
```

## Roadmap

### Phase 2 — Web Platform (Pending client approval)
- Authentication with NextAuth.js + Supabase
- Stripe payments integration and subscription management
- Admin dashboard for business management
- Client portal with personal account access
- Row Level Security (RLS) and RBAC roles
- JWT refresh rotation and webhook handling

### Phase 3 — Mobile App + Full Backend (Planned)
- React Native + Expo mobile app for iOS and Android
- PostgreSQL as primary database for clients, payments,
  subscriptions, and workout data
- Client-coach messaging system with real-time chat
- Workout routine builder — coaches assign custom routines
  per client with sets, reps, and progression tracking
- Exercise library with video demonstrations stored
  and served via cloud storage (S3 or Supabase Storage)
- Progress tracking — body metrics, workout history,
  and performance charts over time
- Interactive calendar for session scheduling and
  appointment management
- Push notifications for session reminders, new routines,
  and coach messages
- Synchronized data between web platform and mobile app
  via shared REST API or Supabase Realtime
