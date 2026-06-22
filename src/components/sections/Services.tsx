"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain,
  Cloud,
  Code2,
  Workflow,
  Palette,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "Sistemas de Inteligencia Artificial",
    description:
      "Soluciones de IA personalizadas — desde entrenamiento y despliegue de modelos hasta automatización inteligente y análisis predictivo a escala empresarial.",
    tags: ["Machine Learning", "NLP", "Visión por Computadora", "LLMs"],
    color: "gold",
  },
  {
    icon: Cloud,
    title: "Arquitectura Cloud",
    description:
      "Diseño de infraestructura multi-nube, orquestación Kubernetes y sistemas cloud-nativos diseñados para resistencia y rendimiento.",
    tags: ["AWS", "GCP", "Azure", "Kubernetes"],
    color: "electric-blue",
  },
  {
    icon: Code2,
    title: "Ingeniería de Software Empresarial",
    description:
      "Desarrollo completo de aplicaciones críticas — desde arquitectura de microservicios hasta plataformas de datos en tiempo real.",
    tags: ["Microservicios", "Event-Driven", "Real-Time", "APIs"],
    color: "deep-purple",
  },
  {
    icon: Workflow,
    title: "Ingeniería de Automatización",
    description:
      "Automatización inteligente de procesos, diseño de pipelines CI/CD y soluciones de infraestructura como código que eliminan la fricción operativa.",
    tags: ["IaC", "CI/CD", "GitOps", "MLOps"],
    color: "gold",
  },
  {
    icon: Palette,
    title: "Diseño de Plataformas para Desarrolladores",
    description:
      "Plataformas internas para desarrolladores, cadenas de herramientas de autoservicio y sistemas de experiencia de ingeniería que aceleran la productividad.",
    tags: ["IDP", "Developer Experience", "Self-Service"],
    color: "electric-blue",
  },
  {
    icon: TrendingUp,
    title: "Consultoría de Transformación Digital",
    description:
      "Asesoría tecnológica estratégica — desde revisión de arquitectura y planificación de modernización hasta implementación y optimización.",
    tags: ["Estrategia", "Modernización", "Revisión de Arquitectura"],
    color: "deep-purple",
  },
];

const colorMap: Record<string, { from: string; text: string; bg: string }> = {
  gold: {
    from: "from-gold/20 to-gold/5",
    text: "text-gold",
    bg: "bg-gold/10",
  },
  "electric-blue": {
    from: "from-electric-blue/20 to-electric-blue/5",
    text: "text-electric-blue",
    bg: "bg-electric-blue/10",
  },
  "deep-purple": {
    from: "from-deep-purple/20 to-deep-purple/5",
    text: "text-deep-purple",
    bg: "bg-deep-purple/10",
  },
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-20 pointer-events-none" />

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
              Servicios
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Servicios de Ingeniería
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted/50 max-w-2xl mx-auto"
          >
            Soluciones tecnológicas integrales entregadas por equipos de
            ingeniería de élite con experiencia profunda en IA, cloud y sistemas
            empresariales.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const colors = colorMap[service.color];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative p-8 rounded-2xl glass-light hover:border-white/10 transition-all duration-500 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${colors.from} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon size={22} className={colors.text} />
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-muted/15 group-hover:text-white/40 transition-colors duration-300 mt-1"
                    />
                  </div>

                  <h3 className="text-lg font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted/50 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full bg-white/[0.03] text-muted/40 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
