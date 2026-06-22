"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Particles from "@/components/ui/Particles";

function FloatingOrb({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050816]" />

      <FloatingOrb className="w-96 h-96 bg-deep-purple/20 top-1/4 -left-48" delay={0} />
      <FloatingOrb className="w-80 h-80 bg-electric-blue/15 top-1/3 right-0" delay={2} />
      <FloatingOrb className="w-64 h-64 bg-gold/10 bottom-1/4 left-1/3" delay={4} />

      <Particles />

        {/* Content */}
        <motion.div style={{ y, opacity }} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse-glow" />
          <span className="text-xs font-medium text-muted/80 tracking-wider uppercase">
            Fundada en 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8"
        >
          <span className="block">Ingeniería de la</span>
          <span className="block gradient-text mt-2">Próxima Generación</span>
          <span className="block mt-2">de Sistemas Digitales</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-muted/60 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Diseñamos infraestructura potenciada por IA, plataformas de software
          inteligente y sistemas cloud escalables que redefinen la forma en que
          se construye y despliega la tecnología.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#products"
            className="group relative px-8 py-4 rounded-xl font-medium text-sm bg-gradient-to-r from-gold to-[#FFA500] text-[#050816] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,215,0,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explorar Plataforma
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFA500] to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-xl font-medium text-sm glass-light text-white hover:border-white/20 transition-all duration-300"
          >
            Contactar Equipo
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted/30"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
