"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Newspaper,
  BookOpen,
  Mic,
  Radio,
  TrendingUp,
  ExternalLink,
} from "lucide-react";

type TabId = "articulos" | "libros" | "eventos" | "podcasts" | "tendencias";

interface InsightItem {
  title: string;
  description: string;
  source?: string;
  url?: string;
}

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "articulos", label: "Artículos", icon: Newspaper },
  { id: "libros", label: "Libros", icon: BookOpen },
  { id: "eventos", label: "Eventos", icon: Mic },
  { id: "podcasts", label: "Podcasts", icon: Radio },
  { id: "tendencias", label: "Tendencias", icon: TrendingUp },
];

const content: Record<TabId, InsightItem[]> = {
  articulos: [
    {
      title: "IA Generativa en la Empresa: Guía Práctica",
      description: "Cómo implementar LLMs y agentes de IA en entornos empresariales con resultados medibles.",
      source: "Dräkkar Research",
    },
    {
      title: "Arquitectura Cloud-Native para Sistemas de IA",
      description: "Patrones de infraestructura escalable para despliegue de modelos de machine learning en producción.",
      source: "Dräkkar Research",
    },
    {
      title: "Gobernanza de IA: Marcos de Cumplimiento",
      description: "Políticas y frameworks para adoptar inteligencia artificial con responsabilidad y cumplimiento normativo.",
      source: "Dräkkar Research",
    },
  ],
  libros: [
    {
      title: "The AI Engineer",
      description: "Construyendo sistemas de IA robustos y escalables en producción.",
      source: "O'Reilly Media",
    },
    {
      title: "Designing Machine Learning Systems",
      description: "Patrones de diseño para sistemas de aprendizaje automático en el mundo real.",
      source: "Chip Huyen",
    },
    {
      title: "Arquitectura de Software Moderna",
      description: "Principios y patrones para construir sistemas cloud-nativos de alto rendimiento.",
      source: "Dräkkar Labs",
    },
  ],
  eventos: [
    {
      title: "Meetup: IA para la Industria",
      description: "Encuentro mensual sobre aplicaciones prácticas de inteligencia artificial en la industria chilena.",
      source: "Santiago, Chile",
    },
    {
      title: "Workshop: Automatización con Agentes IA",
      description: "Taller práctico para equipos de ingeniería sobre implementación de agentes autónomos.",
      source: "Online · Próximamente",
    },
    {
      title: "Conferencia: Futuro del Software",
      description: "Explorando las tendencias que definirán la próxima década del desarrollo de software.",
      source: "2026 · Por confirmar",
    },
  ],
  podcasts: [
    {
      title: "Inteligencia Artificial Explicada",
      description: "Podcast semanal sobre IA, machine learning y su impacto en el mundo empresarial.",
      source: "Spotify · Apple Podcasts",
    },
    {
      title: "Cloud Native Talks",
      description: "Conversaciones sobre infraestructura cloud, Kubernetes y plataformas modernas.",
      source: "Spotify · YouTube",
    },
    {
      title: "DevOps y Automatización",
      description: "Entrevistas y casos de estudio sobre ingeniería de plataformas y automatización.",
      source: "Spotify · Apple Podcasts",
    },
  ],
  tendencias: [
    {
      title: "Agentes IA Autónomos",
      description: "Los agentes de IA están evolucionando de asistentes a ejecutores autónomos de tareas complejas.",
    },
    {
      title: "Plataformas de Ingeniería Interna",
      description: "Internal Developer Platforms como estándar para equipos de ingeniería de alto rendimiento.",
    },
    {
      title: "IA Responsable y Regulación",
      description: "El panorama regulatorio global para la inteligencia artificial y su impacto en la adopción empresarial.",
    },
  ],
};

export default function Insights() {
  const [activeTab, setActiveTab] = useState<TabId>("articulos");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="insights" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-xs font-medium text-muted/70 tracking-wider uppercase">
              Insights
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Lo que estamos <span className="gradient-text">leyendo y anticipando</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted/50 max-w-2xl mx-auto"
          >
            Artículos, libros, eventos, podcasts y tendencias que todo líder
            que quiere tomar mejores decisiones con IA debería conocer.
          </motion.p>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-gold/15 to-[#FFA500]/15 text-gold border border-gold/20 shadow-[0_0_20px_rgba(255,215,0,0.1)]"
                    : "glass-light text-muted/50 border border-white/5 hover:border-white/20 hover:text-white"
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {content[activeTab].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group relative p-6 rounded-2xl glass-light border border-white/5 hover:border-gold/20 transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                <div className="relative">
                  <h3 className="font-semibold text-sm mb-2 group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted/50 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  {item.source && (
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted/30">
                        {item.source}
                      </span>
                      <ExternalLink
                        size={12}
                        className="text-muted/20 group-hover:text-gold transition-colors"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
