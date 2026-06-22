"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Layers,
  Brain,
  Users,
  Link,
  Workflow,
  Blocks,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";

const capabilities = [
  {
    icon: Layers,
    title: "Sistemas de Identidad y Desarrolladores",
    description: "Plataforma unificada de gestión de identidad y experiencia para desarrolladores.",
  },
  {
    icon: Brain,
    title: "Flujos de Trabajo Nativos de IA",
    description: "Automatización inteligente integrada en cada proceso operativo.",
  },
  {
    icon: Users,
    title: "Infraestructura de Colaboración",
    description: "Sistemas de colaboración en tiempo real diseñados para equipos distribuidos.",
  },
  {
    icon: Link,
    title: "Integraciones Empresariales",
    description: "Conectividad fluida entre cientos de herramientas empresariales y APIs.",
  },
  {
    icon: Workflow,
    title: "Motor de Automatización",
    description: "Automatización de flujos de trabajo avanzada con toma de decisiones impulsada por IA.",
  },
  {
    icon: Blocks,
    title: "Ecosistema de APIs",
    description: "Plataforma integral de APIs para construir y escalar integraciones.",
  },
];

function PlatformVisual() {
  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-10 border border-white/5 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute inset-20 border border-white/5 rounded-full"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-28 border border-gold/10 rounded-full"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gold/20 to-deep-purple/20 border border-gold/20 flex items-center justify-center backdrop-blur-sm"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-[#FFA500] flex items-center justify-center">
            <Layers size={24} className="text-[#050816]" />
          </div>
        </motion.div>
      </div>

      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * 60 * Math.PI) / 180;
        const radius = 42;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="absolute w-10 h-10 -ml-5 -mt-5 rounded-xl glass-light border border-white/10 flex items-center justify-center"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {(() => {
              const icons = [Brain, Users, Link, Workflow, Blocks, Layers];
              const Icon = icons[i];
              return <Icon size={16} className="text-electric-blue" />;
            })()}
          </motion.div>
        );
      })}

      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * 60 * Math.PI) / 180;
          const radius = 42;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          return (
            <motion.line
              key={i}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="url(#connectionGradient2)"
              strokeWidth="0.3"
              strokeDasharray="2 2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1 }}
            />
          );
        })}
        <defs>
          <linearGradient id="connectionGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6A00FF" />
            <stop offset="100%" stopColor="#00AEEF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="products" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-20 pointer-events-none" />

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
              Plataforma
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            La Plataforma Dräkkar
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted/50 max-w-2xl mx-auto"
          >
            Infraestructura modular diseñada para construir ecosistemas digitales,
            herramientas de desarrollo y sistemas inteligentes a escala empresarial.
          </motion.p>
        </div>

        {/* Platform Visual + Capabilities */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <PlatformVisual />
          </motion.div>

          <div className="space-y-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/[0.02] transition-all duration-300 cursor-default"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-deep-purple/20 to-electric-blue/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <cap.icon size={18} className="text-electric-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">{cap.title}</h4>
                  <p className="text-xs text-muted/50 leading-relaxed">{cap.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Product cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* DevSactum - Featured */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="group relative p-8 rounded-2xl glass border border-gold/20 hover:border-gold/40 transition-all duration-500 overflow-hidden md:col-span-1"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <span className="flex items-center gap-1.5 text-xs font-mono text-gold uppercase tracking-wider">
                  <Sparkles size={12} />
                  Primer Producto
                </span>
                <ExternalLink size={14} className="text-muted/20 group-hover:text-gold transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3">DevSactum</h3>
              <p className="text-sm text-muted/50 leading-relaxed mb-4">
                Red social para desarrolladores. Conecta, comparte código,
                debatir ideas y construye tu carrera en tecnología.
              </p>
              <div className="flex items-center gap-2 mb-6">
                <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-electric-blue/10 text-electric-blue border border-electric-blue/20">
                  Beta · Sept 2026
                </span>
              </div>
              <a
                href="#devsactum"
                className="inline-flex items-center gap-2 text-sm font-medium text-gold group-hover:gap-3 transition-all duration-300"
              >
                Ver más <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>

          {/* Dräkkar Core */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative p-8 rounded-2xl glass-light hover:border-white/10 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-electric-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-muted/40 uppercase tracking-wider">
                  Infraestructura
                </span>
                <ExternalLink size={14} className="text-muted/20 group-hover:text-electric-blue transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3">Dräkkar Core</h3>
              <p className="text-sm text-muted/50 leading-relaxed mb-6">
                La capa fundacional — sistemas de identidad, orquestación de
                cómputo y tuberías de datos diseñadas para operaciones con cero
                tiempo de inactividad.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-medium text-electric-blue group-hover:gap-3 transition-all duration-300"
              >
                Saber más <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>

          {/* Dräkkar AI */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative p-8 rounded-2xl glass-light hover:border-white/10 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-deep-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-muted/40 uppercase tracking-wider">
                  Inteligencia
                </span>
                <ExternalLink size={14} className="text-muted/20 group-hover:text-deep-purple transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3">Dräkkar AI</h3>
              <p className="text-sm text-muted/50 leading-relaxed mb-6">
                Framework de desarrollo nativo de IA con entrenamiento de modelos,
                optimización de inferencia y orquestación inteligente.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-medium text-deep-purple group-hover:gap-3 transition-all duration-300"
              >
                Saber más <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
