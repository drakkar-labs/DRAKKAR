import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8 rounded-2xl overflow-hidden ring-2 ring-white/10">
          <Image
            src="/drakkar-logo.png"
            alt="Dräkkar Labs"
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Página no encontrada</h2>
        <p className="text-muted/40 text-sm max-w-md mx-auto mb-8">
          La página que buscas no existe o fue movida. Pero tranquilo, hay mucho
          por explorar en Dräkkar Labs.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-gold to-[#FFA500] text-[#050816] font-semibold text-sm hover:shadow-[0_0_40px_rgba(255,215,0,0.3)] transition-all duration-300"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
