"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "Dräkkar Labs representa lo que las startups latinoamericanas pueden lograr cuando se combina ingeniería de élite con visión global.",
    author: "Comunidad Tech Chile",
    role: "Ecosistema de Startups",
  },
  {
    text: "El enfoque de DevSactum en la comunidad de desarrolladores es exactamente lo que el ecosistema necesita. Una red social hecha por ingenieros, para ingenieros.",
    author: "Early Adopter",
    role: "Desarrollador Fullstack",
  },
  {
    text: "Ver una startup desde Santiago construyendo infraestructura de clase mundial es inspirador. Dräkkar Labs es el tipo de empresa que necesita Chile.",
    author: "Mentor de Startup",
    role: "Inversor Ángel",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-xs font-medium text-muted/70 tracking-wider uppercase">Testimonios</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            Lo que dicen de nosotros
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group p-8 rounded-2xl glass-light hover:border-white/10 transition-all duration-500 relative"
            >
              <Quote size={32} className="text-gold/10 absolute top-6 right-6" />
              <blockquote>
                <p className="text-sm text-muted/60 leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-electric-blue/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-gold">{t.author[0]}</span>
                </div>
                <div>
                  <div className="text-sm font-medium">{t.author}</div>
                  <div className="text-xs text-muted/30">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
