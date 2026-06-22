"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Atom, FlaskConical, Cpu, Scan, Activity } from "lucide-react";

const researchAreas = [
  {
    icon: Atom,
    title: "Sistemas de IA Experimentales",
    description:
      "Explorando arquitecturas neuronales de nueva generación, razonamiento multimodal y sistemas autónomos de toma de decisiones que push los límites de la inteligencia artificial.",
    status: "Investigación Activa",
    statusColor: "text-gold",
  },
  {
    icon: Scan,
    title: "Interfaces Prototipo",
    description:
      "Diseñando y testeando paradigmas de interacción novedosos — desde interfaces de computación espacial hasta sistemas de inteligencia ambiental que se adaptan al comportamiento humano.",
    status: "Prototipado",
    statusColor: "text-electric-blue",
  },
  {
    icon: Cpu,
    title: "Modelos de Infraestructura Futura",
    description:
      "Investigando infraestructura auto-curativa, sistemas resistentes a cuántica y arquitecturas de computación edge para la próxima década de la tecnología.",
    status: "Exploración",
    statusColor: "text-deep-purple",
  },
  {
    icon: FlaskConical,
    title: "Investigación y Desarrollo",
    description:
      "Publicando papers, open-sourcing herramientas y colaborando con instituciones de investigación líderes para avanzar el estado del arte en ingeniería de software.",
    status: "Continuo",
    statusColor: "text-crimson",
  },
];

const barHeights = Array.from({ length: 40 }, () => 20 + Math.random() * 80);

function HUDVisual() {
  return (
    <div className="relative w-full h-64 md:h-80 rounded-2xl glass overflow-hidden">
      {/* Scan line */}
      <motion.div
        animate={{ y: ["0%", "100%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-blue/40 to-transparent"
      />

      {/* Grid */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* Status indicators */}
      <div className="absolute top-4 left-4 space-y-2">
        {["SYS ONLINE", "AI CORE ACTIVE", "RENDER OK"].map((status, i) => (
          <motion.div
            key={status}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.3 }}
            className="flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-mono text-gold/60">{status}</span>
          </motion.div>
        ))}
      </div>

      {/* Activity graph */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end gap-1 h-16">
        {barHeights.map((height, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ delay: i * 0.03, duration: 0.8 }}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-electric-blue/20 to-electric-blue/60"
          />
        ))}
      </div>

      {/* Center pulse */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-32 h-32 rounded-full border border-gold/20"
        />
        <motion.div
          animate={{ scale: [1, 2, 1], opacity: [0.2, 0.05, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute w-32 h-32 rounded-full border border-electric-blue/20"
        />
      </div>

      {/* Corner brackets */}
      {[
        "top-2 left-2",
        "top-2 right-2 rotate-90",
        "bottom-2 right-2 rotate-180",
        "bottom-2 left-2 -rotate-90",
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-6 h-6 border-t border-l border-gold/30`}
        />
      ))}

      {/* Data readout */}
      <div className="absolute top-4 right-4 text-right space-y-1">
        <div className="text-[10px] font-mono text-muted/30">
          THROUGHPUT: 2.4 TB/s
        </div>
        <div className="text-[10px] font-mono text-muted/30">
          LATENCY: 0.3ms
        </div>
        <div className="text-[10px] font-mono text-muted/30">
          NODES: 12,847
        </div>
      </div>
    </div>
  );
}

export default function InnovationLab() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="innovation" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-medium text-muted/70 tracking-wider uppercase">
              Laboratorio de Innovación
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Investigación e Innovación
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted/50 max-w-2xl mx-auto"
          >
            Donde las ideas experimentales se convierten en la infraestructura
            del mañana. Nuestro laboratorio de innovación explora la frontera de
            la IA, el diseño de sistemas y la interacción humano-computadora.
          </motion.p>
        </div>

        {/* HUD Visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <HUDVisual />
        </motion.div>

        {/* Research areas */}
        <div className="grid md:grid-cols-2 gap-6">
          {researchAreas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group p-8 rounded-2xl glass-light hover:border-white/10 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/10 to-deep-purple/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <area.icon size={22} className="text-gold" />
                </div>
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider ${area.statusColor} flex items-center gap-2`}
                >
                  <Activity size={10} className="animate-pulse" />
                  {area.status}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-3">{area.title}</h3>
              <p className="text-sm text-muted/50 leading-relaxed">
                {area.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
