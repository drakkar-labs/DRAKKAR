"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Circle, ArrowRight } from "lucide-react";

const roadmapData = [
  {
    quarter: "Q2 2026",
    title: "Fundación",
    status: "completed",
    items: [
      { text: "Fundación de Dräkkar Labs", done: true },
      { text: "Sitio web corporativo", done: true },
      { text: "Identidad de marca", done: true },
      { text: "Stack tecnológico definido", done: true },
    ],
  },
  {
    quarter: "Q3 2026",
    title: "Desarrollo",
    status: "current",
    items: [
      { text: "Desarrollo de DevSactum", done: false, current: true },
      { text: "Blog y content platform", done: true },
      { text: "Sistema de waitlist", done: true },
      { text: "Documentación de API", done: false },
    ],
  },
  {
    quarter: "Q4 2026",
    title: "Lanzamiento",
    status: "upcoming",
    items: [
      { text: "DevSactum Beta (Septiembre)", done: false },
      { text: "Beta pública", done: false },
      { text: "Primeros usuarios activos", done: false },
      { text: "Feedback iteration", done: false },
    ],
  },
  {
    quarter: "Q1 2027",
    title: "Crecimiento",
    status: "upcoming",
    items: [
      { text: "Lanzamiento oficial v1.0", done: false },
      { text: "Expansión de equipo", done: false },
      { text: "Primeros clientes enterprise", done: false },
      { text: "Dräkkar Core — Infraestructura", done: false },
    ],
  },
  {
    quarter: "Q2 2027",
    title: "Escala",
    status: "upcoming",
    items: [
      { text: "Dräkkar AI — Framework de IA", done: false },
      { text: "Dräkkar Cloud — Plataforma", done: false },
      { text: "Open source components", done: false },
      { text: "Expansión LATAM", done: false },
    ],
  },
];

const statusStyles: Record<string, { border: string; dot: string; bg: string }> = {
  completed: { border: "border-gold/20", dot: "bg-gold", bg: "bg-gold/5" },
  current: { border: "border-electric-blue/30", dot: "bg-electric-blue animate-pulse", bg: "bg-electric-blue/5" },
  upcoming: { border: "border-white/5", dot: "bg-white/20", bg: "bg-white/[0.02]" },
};

export default function Roadmap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="roadmap" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute inset-0 radial-glow opacity-20 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-deep-purple" />
            <span className="text-xs font-medium text-muted/70 tracking-wider uppercase">Roadmap</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Hoja de Ruta
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted/50 max-w-xl mx-auto"
          >
            Nuestro camino de producto — de la fundación a la escala global.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/30 via-electric-blue/20 to-white/5 -translate-x-1/2" />

          <div className="space-y-12">
            {roadmapData.map((phase, i) => {
              const styles = statusStyles[phase.status];
              return (
                <motion.div
                  key={phase.quarter}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <div className={`w-4 h-4 rounded-full ${styles.dot} border-4 border-[#050816]`} />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 ml-14 md:ml-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                    <div className={`inline-block p-6 rounded-2xl border ${styles.border} ${styles.bg} backdrop-blur-sm text-left w-full`}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-mono text-gold">{phase.quarter}</span>
                        <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full ${
                          phase.status === "completed" ? "bg-gold/20 text-gold" :
                          phase.status === "current" ? "bg-electric-blue/20 text-electric-blue" :
                          "bg-white/5 text-muted/30"
                        }`}>
                          {phase.status === "completed" ? "Completado" : phase.status === "current" ? "En Progreso" : "Próximamente"}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-3">{phase.title}</h3>
                      <div className="space-y-2">
                        {phase.items.map((item) => (
                          <div key={item.text} className="flex items-center gap-2">
                            {item.done ? (
                              <Check size={14} className="text-gold shrink-0" />
                            ) : item.current ? (
                              <ArrowRight size={14} className="text-electric-blue shrink-0" />
                            ) : (
                              <Circle size={14} className="text-white/10 shrink-0" />
                            )}
                            <span className={`text-sm ${item.done ? "text-muted/60" : item.current ? "text-white" : "text-muted/30"}`}>
                              {item.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
