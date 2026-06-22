"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const technologies = [
  { name: "IA / Machine Learning", category: "Inteligencia" },
  { name: "Cloud Native", category: "Infraestructura" },
  { name: "Kubernetes", category: "Orquestación" },
  { name: "Docker", category: "Contenedores" },
  { name: "PostgreSQL", category: "Base de Datos" },
  { name: "Redis", category: "Caché" },
  { name: "Next.js", category: "Frontend" },
  { name: "NestJS", category: "Backend" },
  { name: "TypeScript", category: "Lenguaje" },
  { name: "Go", category: "Sistemas" },
  { name: "Rust", category: "Rendimiento" },
  { name: "Python", category: "AI/ML" },
  { name: "GraphQL", category: "API" },
  { name: "Kafka", category: "Streaming" },
  { name: "Terraform", category: "IaC" },
  { name: "Prometheus", category: "Monitoreo" },
];

function TechCard({ tech, index }: { tech: typeof technologies[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  const glowColors = [
    "group-hover:shadow-[0_0_30px_rgba(255,215,0,0.15)]",
    "group-hover:shadow-[0_0_30px_rgba(0,174,239,0.15)]",
    "group-hover:shadow-[0_0_30px_rgba(106,0,255,0.15)]",
  ];

  const borderColors = [
    "group-hover:border-gold/30",
    "group-hover:border-electric-blue/30",
    "group-hover:border-deep-purple/30",
  ];

  const colorIndex = index % 3;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className={`group relative p-6 rounded-xl glass-light border border-white/5 ${borderColors[colorIndex]} ${glowColors[colorIndex]} transition-all duration-500 cursor-default`}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative flex flex-col items-center text-center gap-3">
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted/30">
          {tech.category}
        </div>
        <h4 className="text-base font-semibold">{tech.name}</h4>
        <div className="flex items-center gap-1.5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full ${
                i <= colorIndex ? "bg-gold" : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Technology() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="technology" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />
      <div className="absolute inset-0 radial-glow opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-deep-purple" />
            <span className="text-xs font-medium text-muted/70 tracking-wider uppercase">
              Stack Tecnológico
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Construido con Tecnología
            <br />
            <span className="gradient-text">de Clase Mundial</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted/50 max-w-2xl mx-auto"
          >
            Nuestra infraestructura aprovecha las tecnologías más avanzadas de la
            industria, orquestadas en un ecosistema cohesivo y de alto
            rendimiento.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {technologies.map((tech, i) => (
            <TechCard key={tech.name} tech={tech} index={i} />
          ))}
        </div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 p-8 md:p-12 rounded-3xl glass relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-deep-purple/5 via-transparent to-electric-blue/5 pointer-events-none" />
          <div className="relative">
            <h3 className="text-2xl font-bold mb-8 text-center">
              Arquitectura del Sistema
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { layer: "Presentación", items: ["Next.js", "React", "TypeScript"], colorClass: "text-gold" },
                { layer: "API Gateway", items: ["GraphQL", "REST", "gRPC"], colorClass: "text-electric-blue" },
                { layer: "Servicios", items: ["Motor IA", "Plataforma Core", "Analítica"], colorClass: "text-deep-purple" },
                { layer: "Infraestructura", items: ["Kubernetes", "Terraform", "Prometheus"], colorClass: "text-crimson" },
              ].map((layer, i) => (
                <motion.div
                  key={layer.layer}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-xl glass-light"
                >
                  <div
                    className={`text-[10px] font-mono uppercase tracking-widest ${layer.colorClass} mb-3`}
                  >
                    {layer.layer}
                  </div>
                  <div className="space-y-2">
                    {layer.items.map((item) => (
                      <div
                        key={item}
                        className="text-sm text-muted/60"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
