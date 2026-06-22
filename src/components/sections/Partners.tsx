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
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-medium text-muted/30 tracking-wider uppercase">
            Construido con tecnologías de clase mundial
          </span>
        </motion.div>

        <div className="relative overflow-hidden group/carousel" aria-label="Tecnologías que utilizamos">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050816] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050816] to-transparent z-10 pointer-events-none" />

          {/* Scrolling logos — pauses on hover */}
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 items-center group-hover/carousel:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {[...partners, ...partners].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex items-center gap-2 px-6 py-3 rounded-xl glass-light border border-white/5 shrink-0"
              >
                <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-muted/30">{name[0]}</span>
                </div>
                <span className="text-sm font-medium text-muted/30 whitespace-nowrap">{name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
