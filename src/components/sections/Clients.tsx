"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Clock, BarChart3, ArrowRight, Shield } from "lucide-react";

const cases = [
  {
    domain: "unklatam.com",
    sector: "Food Tech · Compliance",
    metrics: [
      { icon: Clock, value: "4h", label: "alertas predictivas antes de falla" },
      { icon: BarChart3, value: "80%", label: "menos reportes manuales" },
    ],
    description:
      "Sistema de alertas predictivas con IA que anticipa fallos operativos con 4 horas de antelación, reduciendo drásticamente los reportes manuales.",
  },
  {
    domain: "Cliente Retail",
    sector: "Retail · Omnicanal",
    metrics: [
      { icon: TrendingUp, value: "70%", label: "consultas automatizadas" },
      { icon: TrendingUp, value: "+22 pts", label: "NPS en 90 días" },
    ],
    description:
      "Asistente virtual multicanal que automatiza el 70% de las consultas de clientes, mejorando la experiencia y liberando al equipo de soporte.",
  },
  {
    domain: "Cliente Industrial",
    sector: "Procesos Productivos · Manufactura",
    metrics: [
      { icon: Clock, value: "30%", label: "menos paradas no planificadas" },
      { icon: BarChart3, value: "Mes 4", label: "ROI positivo" },
    ],
    description:
      "Mantenimiento predictivo y optimización de procesos productivos con IA, reduciendo paradas no planificadas y generando ROI en el cuarto mes.",
  },
];

export default function Clients() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="clients" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 radial-glow-gold opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span className="text-xs font-medium text-muted/70 tracking-wider uppercase">
              Clientes
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Resultados que <span className="gradient-text-gold">hablan por sí solos</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted/50 max-w-2xl mx-auto"
          >
            Trabajamos con organizaciones que eligen resultados sobre promesas.
            Por acuerdo de confidencialidad, identificamos a los clientes solo
            por dominio o sector.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.domain}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative p-8 rounded-2xl glass-light border border-white/5 hover:border-gold/20 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-xs font-mono text-muted/40 uppercase tracking-wider mb-1">
                      {c.sector}
                    </div>
                    <h3 className="text-lg font-semibold">{c.domain}</h3>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-crimson/10 border border-crimson/20">
                    <Shield size={10} className="text-crimson" />
                    <span className="text-[9px] font-mono uppercase tracking-wider text-crimson">NDA</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <m.icon size={16} className="text-gold mb-2" />
                      <div className="text-xl font-bold gradient-text-gold mb-1">{m.value}</div>
                      <div className="text-[10px] text-muted/40 leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-muted/50 leading-relaxed">
                  {c.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-sm text-muted/40 mb-6">
            ¿Tu empresa podría ser el próximo caso? La primera conversación es sin costo.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-sm bg-gradient-to-r from-gold to-[#FFA500] text-[#050816] hover:shadow-[0_0_40px_rgba(255,215,0,0.3)] transition-all duration-300"
          >
            Evalúa tu proyecto
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
