"use client";

import {
  Globe,
  Link2,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";

function MapPin({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const footerLinks = {
  Empresa: ["Nosotros", "Carreras", "Blog", "Contacto"],
  "Lo que hacemos": ["Metodología", "Capacidades IA", "Alianzas", "Casos Clientes"],
  Recursos: ["Insights", "Documentación", "Open Source"],
  Legal: ["Política de Privacidad", "Términos de Servicio"],
};

const socialLinks = [
  { icon: Globe, href: "#", label: "GitHub" },
  { icon: Link2, href: "#", label: "LinkedIn" },
  { icon: MessageCircle, href: "#", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="absolute inset-0 radial-glow opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-16">
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-1 ring-white/10">
                <Image
                  src="/drakkar-logo.png"
                  alt="Dräkkar Labs"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                Dräkkar<span className="text-gold">Labs</span>
              </span>
            </a>
            <p className="text-muted/60 text-sm leading-relaxed max-w-sm mb-6">
              Ingeniería Inteligente para la Próxima Era Digital. Startup
              tecnológica con sede en Santiago, Chile.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted/30 mb-6">
              <MapPin size={12} className="text-electric-blue" />
              La Pintana, Santiago, Chile
            </div>
            <div className="flex items-center gap-4" role="list" aria-label="Redes sociales">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  role="listitem"
                  className="w-10 h-10 rounded-lg glass-light flex items-center justify-center text-muted/60 hover:text-gold hover:border-gold/20 transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <nav key={category} aria-label={category}>
              <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted/50 hover:text-gold transition-colors duration-300 flex items-center gap-1 group"
                    >
                      {link}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted/40">
            © {new Date().getFullYear()} Dräkkar Labs. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted/40">
            Santiago, Chile · Construyendo el futuro de la infraestructura digital.
          </p>
        </div>
      </div>
    </footer>
  );
}
