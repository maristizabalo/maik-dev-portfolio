import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="grid min-h-[100dvh] place-items-center bg-[#0A0E14] px-6 text-center text-[#E6EDF3]">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-[#34E5C4]">
            404
          </p>
          <h1 className="mt-4 text-3xl font-semibold">Página no encontrada</h1>
          <p className="mt-3 text-sm text-[#8B97A7]">
            La ruta que buscas no existe o fue movida.
          </p>
          <Link
            href="/es"
            className="mt-8 inline-block rounded-full border border-white/15 px-6 py-3 text-sm transition-colors hover:border-[#34E5C4] hover:text-[#34E5C4]"
          >
            Volver al inicio
          </Link>
        </div>
      </body>
    </html>
  );
}
