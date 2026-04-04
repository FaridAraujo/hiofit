import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-brand-base min-h-svh flex items-center justify-center">
      <div className="text-center px-4">
        <span className="font-display text-[6rem] font-bold text-brand-red/20">404</span>
        <h1 className="font-display text-display-lg font-bold text-brand-dark mt-4">
          Página no encontrada
        </h1>
        <p className="font-sans text-sm text-brand-gray max-w-sm mx-auto mt-3 mb-8">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 font-sans text-sm font-semibold text-white hover:shadow-lg transition-shadow">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
