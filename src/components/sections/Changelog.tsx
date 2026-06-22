"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Plus, Bug, Zap, Shield } from "lucide-react";

const entries = [
  {
    version: "0.1.0",
    date: "Junio 2026",
    title: "Foundation Release",
    type: "major",
    changes: [
      { text: "Sitio web corporativo lanzado", type: "feature" },
      { text: "Chatbot FAQ interactivo", type: "feature" },
      { text: "Sistema de partículas interactivo", type: "feature" },
      { text: "Preloader animado", type: "feature" },
      { text: "Integración del logo oficial", type: "feature" },
      { text: "Workflows CI/CD con Cloudflare Pages", type: "feature" },
    ],
  },
  {
    version: "0.2.0",
    date: "Julio 2026",
    title: "Content & Community",
    type: "minor",
    changes: [
      { text: "Sección de Blog agregada", type: "feature" },
      { text: "Changelog público", type: "feature" },
      { text: "Roadmap visual", type: "feature" },
      { text: "Newsletter integrado", type: "feature" },
      { text: "Chatbot mejorado con historial y feedback", type: "improvement" },
    ],
  },
  {
    version: "0.3.0",
    date: "Agosto 2026",
    title: "DevSactum Pre-Launch",
    type: "minor",
    changes: [
      { text: "Landing page de DevSactum", type: "feature" },
      { text: "Sistema de waitlist con D1 database", type: "feature" },
      { text: "Waitlist inline en sección DevSactum", type: "feature" },
      { text: "Sección independiente de Waitlist con counter", type: "feature" },
      { text: "Share en Twitter/X post-registro", type: "feature" },
      { text: "Página de documentación", type: "feature" },
    ],
  },
  {
    version: "1.0.0-beta",
    date: "Septiembre 2026",
    title: "DevSactum Beta",
    type: "major",
    changes: [
      { text: "Lanzamiento de DevSactum Beta", type: "feature" },
      { text: "Sistema de autenticación", type: "feature" },
      { text: "Feed de publicaciones", type: "feature" },
      { text: "Sistema de comentarios", type: "feature" },
    ],
  },
];

const typeIcons: Record<string, React.ReactNode> = {
  feature: <Plus size={12} className="text-gold" />,
  improvement: <Zap size={12} className="text-electric-blue" />,
  fix: <Bug size={12} className="text-crimson" />,
  security: <Shield size={12} className="text-deep-purple" />,
};

const typeColors: Record<string, string> = {
  major: "border-gold/30 bg-gold/5",
  minor: "border-electric-blue/30 bg-electric-blue/5",
  patch: "border-white/10 bg-white/[0.02]",
};

export default function Changelog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="changelog" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-20 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-xs font-medium text-muted/70 tracking-wider uppercase">Changelog</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Historial de Cambios
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted/50 max-w-xl mx-auto"
          >
            Cada mejora, cada función, cada paso hacia adelante — documentado.
          </motion.p>
        </div>

        <div className="space-y-8">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.version}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative p-6 md:p-8 rounded-2xl border ${typeColors[entry.type]} backdrop-blur-sm`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 text-sm font-mono font-bold rounded-lg bg-gold/10 text-gold border border-gold/20">
                    v{entry.version}
                  </span>
                  <h3 className="text-lg font-bold">{entry.title}</h3>
                </div>
                <span className="text-xs text-muted/40 font-mono">{entry.date}</span>
              </div>

              <div className="space-y-3">
                {entry.changes.map((change, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="mt-0.5">{typeIcons[change.type]}</div>
                    <span className="text-sm text-muted/60">{change.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
