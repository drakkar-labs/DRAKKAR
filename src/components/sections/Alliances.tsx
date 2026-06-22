"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link2, ExternalLink } from "lucide-react";

const partners = [
  {
    name: "HablaIP",
    sector: "Telecomunicaciones",
    website: "hablaip.com",
    description: "Soluciones de comunicación IP y telefonía empresarial.",
  },
  {
    name: "RiverLogic",
    sector: "Consultoría Empresarial",
    website: "riverlogic.cl",
    description: "Consultoría en transformación digital y procesos de negocio.",
  },
  {
    name: "Orden y Soluciones",
    sector: "Software & Negocio",
    website: "ordenysoluciones.cl",
    description: "Desarrollo de software y soluciones de negocio integradas.",
  },
  {
    name: "AxisDynamics",
    sector: "IA Avanzada",
    website: "axisdynamics.cl",
    description: "Investigación y desarrollo en inteligencia artificial avanzada.",
  },
  {
    name: "Kyon XR",
    sector: "XR & Gemelos Digitales",
    website: "kyonxr.com",
    description: "Realidad extendida y gemelos digitales para industria.",
  },
];

export default function Alliances() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="alliances" className="relative py-32 overflow-hidden">
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
              Alianzas
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Socios que <span className="gradient-text">amplifican el impacto</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted/50 max-w-2xl mx-auto"
          >
            Trabajamos junto a un ecosistema de empresas especializadas para
            ofrecer soluciones completas, desde telecomunicaciones hasta
            gobernanza de IA.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative p-6 rounded-2xl glass-light border border-white/5 hover:border-white/10 transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/10 to-electric-blue/10 flex items-center justify-center">
                    <Link2 size={18} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{partner.name}</h3>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted/40">
                      {partner.sector}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted/50 leading-relaxed mb-4">
                  {partner.description}
                </p>

                <a
                  href={`https://${partner.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] text-muted/30 hover:text-gold transition-colors duration-300"
                >
                  {partner.website}
                  <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
