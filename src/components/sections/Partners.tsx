"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const partners = [
  "Next.js",
  "TypeScript",
  "React",
  "TailwindCSS",
  "Vercel",
  "Cloudflare",
  "GitHub",
  "Figma",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Kubernetes",
];

export default function Partners() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16 border-y border-white/[0.04] overflow-hidden bg-white/[0.01]">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.015] to-transparent pointer-events-none" />

      <div className="relative max-w-[1240px] mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-white/25 shrink-0">
            Construido sobre tecnologías líderes
          </span>

          {/* Static elegant row – Wispr-like, not marquee carnival */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2">
            {partners.map((name) => (
              <span
                key={name}
                className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[12px] font-mono tracking-wide text-white/35 hover:text-white/65 hover:border-white/10 hover:bg-white/[0.06] transition-all duration-300 cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Secondary proof – numbers row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 pt-6 border-t border-white/[0.04] flex flex-wrap items-center justify-center lg:justify-between gap-4 text-[12px] text-white/20"
        >
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
            Infraestructura lista para escalar
          </span>
          <span className="hidden sm:inline w-px h-3 bg-white/10" />
          <span>Santiago, Chile · Remoto-first · LatAm → Global</span>
          <span className="hidden sm:inline w-px h-3 bg-white/10" />
          <span className="text-white/30">Beta 5 de marzo de 2027</span>
        </motion.div>
      </div>
    </section>
  );
}
