"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Eye, Compass, Shield, Zap, Globe } from "lucide-react";
import Image from "next/image";

const values = [
  {
    icon: Target,
    title: "Excelencia en Ingeniería",
    description:
      "Cada sistema que construimos está elaborado con precisión, rendimiento y escalabilidad como principios fundamentales.",
  },
  {
    icon: Eye,
    title: "Pensamiento Visionario",
    description:
      "Anticipamos el futuro de la tecnología y construimos infraestructura que potencia las soluciones del mañana.",
  },
  {
    icon: Compass,
    title: "Escala Global",
    description:
      "Diseñamos sistemas para resistencia y escalabilidad global desde el primer día, listos para crecer sin límites.",
  },
  {
    icon: Shield,
    title: "Confianza y Seguridad",
    description:
      "Seguridad de nivel empresarial integrada en cada capa de nuestra arquitectura y operaciones.",
  },
  {
    icon: Zap,
    title: "Innovación Incansable",
    description:
      "Impulsamos los límites de lo posible a través de investigación y desarrollo continuos.",
  },
  {
    icon: Globe,
    title: "Ecosistema Abierto",
    description:
      "Construimos plataformas interoperables que empoderan a desarrolladores y empresas en todo el mundo.",
  },
];

const metrics = [
  { value: "100%", label: "Compromiso con la Excelencia" },
  { value: "24/7", label: "Innovación Continua" },
  { value: "0", label: "Compromisos de Seguridad Rotos" },
  { value: "∞", label: "Potencial de Escalabilidad" },
];

function SectionHeader({ badge, title, description }: { badge: string; title: string; description: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="text-center mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
        <span className="text-xs font-medium text-muted/70 tracking-wider uppercase">{badge}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg text-muted/50 max-w-2xl mx-auto"
      >
        {description}
      </motion.p>
    </div>
  );
}

export default function About() {
  const metricsRef = useRef(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Sobre Dräkkar Labs"
          title="Construyendo la Infraestructura del Mañana"
          description="Somos una startup tecnológica emergente que ingenia los sistemas que impulsan la próxima era de la transformación digital."
        />

        {/* Logo central */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-20"
        >
          <div className="relative w-32 h-32 rounded-3xl overflow-hidden ring-2 ring-gold/10 shadow-[0_0_80px_rgba(255,215,0,0.1)]">
            <Image
              src="/drakkar-logo.png"
              alt="Dräkkar Labs"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Story / Mission / Vision */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            {
              title: "Nuestra Historia",
              text: "Dräkkar Labs nació en 2026 de la visión de un equipo de ingenieros que creyó que la infraestructura tecnológica podía ser fundamentalmente reinventada. Desde nuestros primeros días, nos hemos enfocado en construir sistemas que no solo funcionan, sino que definen nuevos estándares.",
            },
            {
              title: "Nuestra Misión",
              text: "Ingeniar infraestructura inteligente y plataformas que permitan a las organizaciones construir, escalar y desplegar tecnología con una velocidad, fiabilidad y precisión sin precedentes.",
            },
            {
              title: "Nuestra Visión",
              text: "Un mundo donde cada organización tenga acceso a sistemas de IA, arquitectura cloud e inteligencia de ingeniería de nivel empresarial — impulsando el próximo salto en el progreso tecnológico humano.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="p-8 rounded-2xl glass-light hover:border-white/10 transition-all duration-500 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold/20 to-electric-blue/20 flex items-center justify-center mb-6 group-hover:from-gold/30 group-hover:to-electric-blue/30 transition-all">
                <span className="text-gold text-lg font-bold font-[var(--font-mono)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
              <p className="text-muted/50 text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Core Values */}
        <div className="mb-32">
          <h3 className="text-2xl font-bold text-center mb-12">Valores Fundamentales</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="p-6 rounded-xl glass-light group hover:border-white/10 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-deep-purple/20 to-electric-blue/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <value.icon size={22} className="text-electric-blue" />
                </div>
                <h4 className="font-semibold mb-2">{value.title}</h4>
                <p className="text-sm text-muted/50 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Engineering Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32 p-10 md:p-16 rounded-3xl glass relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-deep-purple/5 pointer-events-none" />
          <div className="relative">
            <h3 className="text-3xl md:text-4xl font-bold mb-8 max-w-3xl">
              Filosofía de Ingeniería
            </h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-muted/60 leading-relaxed">
                  En Dräkkar Labs, la ingeniería no es solo lo que hacemos — es
                  quiénes somos. Cada línea de código, cada decisión de
                  arquitectura y cada diseño de sistema refleja nuestro
                  compromiso inquebrantable con la excelencia.
                </p>
                <p className="text-muted/60 leading-relaxed">
                  Creemos en construir sistemas que no solo son funcionales sino
                  elegantes. Infraestructura que escala no solo horizontalmente,
                  sino intelectualmente. Plataformas que evolucionan con las
                  necesidades de las organizaciones que sirven.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  "Arquitectura de precisión primero",
                  "Rendimiento sin compromiso",
                  "Escalabilidad por diseño, no como añadido",
                  "Seguridad integrada en cada capa",
                  "Estándares abiertos, sistemas interoperables",
                  "Evolución continua, cero estancamiento",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="text-sm text-muted/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="mb-32">
          <h3 className="text-2xl font-bold text-center mb-16">Nuestra Historia</h3>
          <div className="relative max-w-xl mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <div className="space-y-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="relative flex items-center gap-8 flex-col text-center"
              >
                <div className="w-3 h-3 rounded-full bg-gold border-4 border-[#050816] z-10 shrink-0" />
                <div>
                  <div className="text-gold font-mono text-sm mb-2">2026</div>
                  <h4 className="text-lg font-semibold mb-2">Fundación</h4>
                  <p className="text-sm text-muted/50">Dräkkar Labs se funda con la misión de ingeniar infraestructura digital de nueva generación.</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative flex items-center gap-8 flex-col text-center"
              >
                <div className="w-3 h-3 rounded-full bg-electric-blue border-4 border-[#050816] z-10 shrink-0" />
                <div>
                  <div className="text-electric-blue font-mono text-sm mb-2">2026</div>
                  <h4 className="text-lg font-semibold mb-2">DevSactum — En Desarrollo</h4>
                  <p className="text-sm text-muted/50">Nuestro primer producto: una red social para desarrolladores, programadores y la comunidad tech. Beta en Septiembre 2026.</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative flex items-center gap-8 flex-col text-center"
              >
                <div className="w-3 h-3 rounded-full bg-deep-purple border-4 border-[#050816] z-10 shrink-0 animate-pulse" />
                <div>
                  <div className="text-deep-purple font-mono text-sm mb-2">Próximamente</div>
                  <h4 className="text-lg font-semibold mb-2">Escala Global</h4>
                  <p className="text-sm text-muted/50">Expandiendo nuestra infraestructura para servir a organizaciones en todo el mundo.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div ref={metricsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={metricsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center p-8 rounded-2xl glass-light"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text-gold mb-2">
                {metric.value}
              </div>
              <div className="text-xs text-muted/40 uppercase tracking-wider">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
