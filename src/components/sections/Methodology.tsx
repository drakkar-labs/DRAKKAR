"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, PenTool, RotateCcw, Users, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Diagnóstico Profundo",
    description:
      "Entendemos tu negocio, procesos, equipo y datos antes de proponer cualquier solución.",
    color: "gold",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Diseño a Medida",
    description:
      "Cada propuesta es específica — no aplicamos plantillas genéricas ni soluciones pre-fabricadas.",
    color: "electric-blue",
  },
  {
    number: "03",
    icon: RotateCcw,
    title: "Implementación Iterativa",
    description:
      "Ciclos cortos con validaciones frecuentes basadas en resultados reales y métricas objetivas.",
    color: "deep-purple",
  },
  {
    number: "04",
    icon: Users,
    title: "Transferencia y Autonomía",
    description:
      "Tu equipo termina sabiendo operar y escalar sin nosotros. Capacitación y transferencia de conocimiento.",
    color: "gold",
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  gold: {
    border: "border-gold/20 group-hover:border-gold/40",
    bg: "bg-gold/10",
    text: "text-gold",
    glow: "shadow-[0_0_30px_rgba(255,215,0,0.15)]",
  },
  "electric-blue": {
    border: "border-electric-blue/20 group-hover:border-electric-blue/40",
    bg: "bg-electric-blue/10",
    text: "text-electric-blue",
    glow: "shadow-[0_0_30px_rgba(0,174,239,0.15)]",
  },
  "deep-purple": {
    border: "border-deep-purple/20 group-hover:border-deep-purple/40",
    bg: "bg-deep-purple/10",
    text: "text-deep-purple",
    glow: "shadow-[0_0_30px_rgba(106,0,255,0.15)]",
  },
};

export default function Methodology() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="methodology" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 radial-glow-gold opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-xs font-medium text-muted/70 tracking-wider uppercase">
              Metodología
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Resultados, <span className="gradient-text">no promesas</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted/50 max-w-3xl mx-auto"
          >
            No vendemos software. Nos comprometemos con resultados. Trabajamos de
            manera cercana con tu equipo para transferir conocimiento y construir
            capacidades duraderas.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, i) => {
            const colors = colorMap[step.color];
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`group relative p-8 rounded-2xl glass-light border ${colors.border} ${colors.glow} transition-all duration-500 hover:bg-white/[0.03]`}
              >
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                <div className="flex items-center justify-between mb-6">
                  <span className={`text-3xl font-black font-[var(--font-mono)] ${colors.text} opacity-30`}>
                    {step.number}
                  </span>
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon size={22} className={colors.text} />
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-sm text-muted/50 leading-relaxed">
                  {step.description}
                </p>

                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-white/10 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Philosophy quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-10 md:p-14 rounded-3xl glass overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-deep-purple/5 pointer-events-none" />
          <div className="relative max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl font-medium italic text-muted/70 mb-6 leading-relaxed">
              &ldquo;La IA no reemplaza a las personas. Potencia a quienes saben usarla.&rdquo;
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-px h-6 bg-gold/30" />
              <span className="text-sm text-muted/40">Fundador — Dräkkar Labs</span>
              <div className="w-px h-6 bg-gold/30" />
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-sm bg-gradient-to-r from-gold to-[#FFA500] text-[#050816] hover:shadow-[0_0_40px_rgba(255,215,0,0.3)] transition-all duration-300"
          >
            Conversemos
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
