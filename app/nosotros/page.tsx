import type { Metadata } from "next";
import BlurImage from "@/components/ui/BlurImage";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conocé al equipo detrás de HioFit. Gustavo Hio y Karol Barquero — profesionales certificados con más de dos décadas de experiencia en bienestar integral.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const COACHES = [
  {
    id:          "gustavo",
    name:        "Gustavo Hio Sequeira",
    role:        "Entrenador Personal & Fundador",
    image:       "/coaches/coach-1.jpg",
    experience:  "Más de 25 años de experiencia",
    bio: [
      "Profesional en el Movimiento Humano y Recreación, graduado de la Universidad de Costa Rica, con conocimientos en diferentes disciplinas tales como: entrenamiento contra resistencia, artes marciales, atletismo, yoga, baloncesto, natación, calistenia, entre otros.",
      "Cuenta con más de 25 años de experiencia en el área del entrenamiento físico, salud y transformación de estilos de vida; fue el coordinador del Gimnasio Planet Gym por 20 años. Ha sido entrenador de campeonas nacionales e internacionales en Fitness y conferencista en temas relacionados con la salud.",
      "Desde pequeño, su madre y su hermana le inculcaron la pasión por los deportes y esto lo llevó a tener un estilo de vida saludable, en el cual cree como un norte para dirigir nuestras vidas y ser exitosos como seres humanos. Es así como nace la necesidad de impactar, con esta filosofía de vida, a la mayor cantidad de personas y surge la idea de crear HioFit.",
    ],
    specialties: ["Entrenamiento contra resistencia", "Artes marciales", "Atletismo", "Yoga", "Calistenia", "Natación"],
    achievements: [
      "Profesional en Movimiento Humano y Recreación, Universidad de Costa Rica",
      "Coordinador del Gimnasio Planet Gym por 20 años",
      "Entrenador de campeonas nacionales e internacionales en Fitness",
      "Conferencista en temas de salud y bienestar",
      "Fundador de HioFit",
    ],
  },
  {
    id:          "karol",
    name:        "Karol Barquero Ruiz",
    role:        "Health Coach & Wellness",
    image:       "/coaches/coach-2.jpg",
    experience:  "18 años de experiencia",
    bio: [
      "Coach de salud graduada del Institute for Integrative Nutrition (IIN), la cual es la escuela de coaching de salud más respetada del mundo y con la mayor presencia global en el campo. Con una destacada trayectoria de 18 años en el ámbito corporativo, ha adquirido un profundo conocimiento en liderazgo de equipos y planificación estratégica, relacionada con el bienestar y el desarrollo de personas.",
      "Karol también es máster en administración de empresas y es certificada en liderazgo por parte del INCAE Business School y Power 2 Leaderlab.",
      "Como coach de salud, Karol brinda una guía a las personas para alcanzar sus objetivos de salud integral; ya sea que se trate de dormir mejor, incrementar su nivel de energía, modificar la composición corporal, manejar el estrés y mucho más. Además de crear un espacio seguro para que todos los clientes analicen su salud, a la vez que implementan cambios en su comportamiento y estilo de vida que puedan mantenerse a largo plazo.",
    ],
    specialties: ["Coaching de salud integral", "Bienestar y liderazgo", "Gestión del estrés", "Nutrición holística", "Mindfulness", "Desarrollo personal"],
    achievements: [
      "Graduada del Institute for Integrative Nutrition (IIN)",
      "Máster en Administración de Empresas (MBA)",
      "Certificada en liderazgo por INCAE Business School",
      "Certificada por Power 2 Leaderlab",
      "18 años de trayectoria en liderazgo corporativo",
    ],
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NosotrosPage() {
  return (
    <main>
      {/* ── Page hero ─────────────────────────────────────────────────────── */}
      <section className="bg-brand-base pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-3 border-l-2 border-brand-red pl-3 mb-6">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-gray">
              Nuestro equipo
            </span>
          </div>
          <h1 className="font-display text-display-xl font-bold text-brand-dark max-w-2xl">
            Las personas detrás{" "}
            <span className="text-brand-red">del método.</span>
          </h1>
          <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-brand-gray">
            HioFit nació de la convicción de que el bienestar real es integral.
            Dos profesionales, una visión compartida: acompañarte en cada dimensión
            de tu salud.
          </p>
        </div>
      </section>

      {/* ── Coaches ───────────────────────────────────────────────────────── */}
      {COACHES.map((coach, i) => {
        const isEven = i % 2 === 0;
        return (
          <section
            key={coach.id}
            className={isEven ? "bg-white" : "bg-brand-warm"}
          >
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
              <div className={`grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-start ${!isEven ? "lg:[&>*:first-child]:order-2" : ""}`}>

                {/* Foto */}
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] lg:aspect-auto lg:min-h-[600px] bg-brand-muted">
                  <BlurImage
                    src={coach.image}
                    alt={coach.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={i === 0}
                  />
                </div>

                {/* Contenido */}
                <div className="flex flex-col gap-8">
                  {/* Encabezado */}
                  <div className="flex flex-col gap-2">
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-red">
                      {coach.role}
                    </span>
                    <h2 className="font-display text-display-lg font-bold text-brand-dark leading-tight">
                      {coach.name}
                    </h2>
                    <p className="font-sans text-sm text-brand-gray">
                      {coach.experience}
                    </p>
                  </div>

                  {/* Bio */}
                  <div className="flex flex-col gap-4">
                    {coach.bio.map((paragraph, pi) => (
                      <p key={pi} className="font-sans text-sm leading-relaxed text-brand-gray">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Especialidades */}
                  <div className="flex flex-col gap-3">
                    <h3 className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-dark/40">
                      Especialidades
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {coach.specialties.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-brand-muted bg-brand-base px-3 py-1 font-sans text-xs font-medium text-brand-dark"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Logros */}
                  <div className="flex flex-col gap-3">
                    <h3 className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-dark/40">
                      Logros & Certificaciones
                    </h3>
                    <ul className="flex flex-col gap-2.5">
                      {coach.achievements.map((a) => (
                        <li key={a} className="flex items-start gap-3">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                          <span className="font-sans text-sm leading-relaxed text-brand-gray">{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </section>
        );
      })}

      {/* ── CTA final ─────────────────────────────────────────────────────── */}
      <section className="bg-brand-dark">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28 text-center">
          <div className="inline-flex items-center gap-3 border-l-2 border-brand-red pl-3 mb-6">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Empezá hoy
            </span>
          </div>
          <h2 className="font-display text-display-lg font-bold text-white mb-4 max-w-xl mx-auto">
            Un equipo comprometido con tu bienestar.
          </h2>
          <p className="font-sans text-sm leading-relaxed text-white/50 max-w-md mx-auto mb-10">
            Escribinos y juntos diseñamos el plan que mejor se adapta a vos.
          </p>
          <a
            href="https://api.whatsapp.com/send/?phone=%2B50663081654&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-brand-red px-8 py-4 font-sans text-sm font-semibold text-white transition-shadow hover:shadow-[0_4px_24px_rgba(255,0,0,0.35)]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Escribinos por WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
