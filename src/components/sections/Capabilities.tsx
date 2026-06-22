"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Workflow, BarChart3, Shield, ArrowRight } from "lucide-react";

const capabilities = [
  {
    icon: MessageSquare,
    title: "LLMs y Agentes",
    description:
      "Asistentes conversacionales y agentes autónomos integrados a tu operación. Desde chatbots inteligentes hasta agentes que ejecutan tareas complejas de forma autónoma.",
    tags: ["GPT", "Claude", "Open Source", "RAG"],
    color: "gold",
  },
  {
    icon: Workflow,
    title: "Automatización de Procesos",
    description:
      "Flujos IA que liberan tiempo de tu equipo y reducen errores. Automatización inteligente de procesos operativos, documentación y validaciones.",
    tags: ["RPA", "Workflows", "NLP", "OCR"],
    color: "electric-blue",
  },
  {
    icon: BarChart3,
    title: "Datos y Analytics",
    description:
      "Pipelines y dashboards que convierten datos en decisiones. Infraestructura de datos moderna con capacidades de análisis predictivo y prescriptivo.",
    tags: ["Data Pipelines", "Dashboards", "Predictive", "Real-Time"],
    color: "deep-purple",
  },
  {
    icon: Shield,
    title: "Gobernanza y Seguridad IA",
    description:
      "Políticas y marcos de gobernanza para adoptar IA con responsabilidad. Cumplimiento normativo, ética algorítmica y seguridad en sistemas de IA.",
    tags: ["Ethics", "Compliance", "Audit", "Privacy"],
    color: "gold",
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; gradient: string }> = {
  gold: { border: "border-gold/20", bg: "bg-gold/10", text: "text-gold", gradient: "from-gold/5" },
  "electric-blue": { border: "border-electric-blue/20", bg: "bg-electric-blue/10", text: "text-electric-blue", gradient: "from-electric-blue/5" },
  "deep-purple": { border: "border-deep-purple/20", bg: "bg-deep-purple/10", text: "text-deep-purple", gradient: "from-deep-purple/5" },
};

export default function Capabilities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="capabilities" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-20 pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
            <span className="text-xs font-medium text-muted/70 tracking-wider uppercase">
              Capacidades IA
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            IA que trabaja <span className="gradient-text-blue">de verdad</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted/50 max-w-2xl mx-auto"
          >
            Más allá del hype, implementamos IA que resuelve problemas reales
            — desde automatización operativa hasta sistemas conversacionales
            de última generación.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => {
            const colors = colorMap[cap.color];
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group relative p-8 rounded-2xl glass-light border ${colors.border} hover:border-white/10 transition-all duration-500 overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${colors.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative flex items-start gap-6">
                  <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <cap.icon size={26} className={colors.text} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold mb-3">{cap.title}</h3>
                    <p className="text-sm text-muted/50 leading-relaxed mb-5">
                      {cap.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cap.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full bg-white/[0.03] text-muted/40 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-sm glass-light text-white hover:border-white/20 transition-all duration-300"
          >
            Ver casos de uso
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
