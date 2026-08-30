"use client";

import { motion } from "framer-motion";

const steps = [
  { n: "01", title: "Explore", desc: "Investigamos el problema, la tecnología y las posibilidades.", detail: "No empezamos escribiendo código. Primero entendemos qué vale la pena construir.", accent: "gold" },
  { n: "02", title: "Design", desc: "Convertimos conceptos en arquitecturas, experiencias y sistemas.", detail: "Definimos qué construir, cómo construirlo y qué dejar fuera.", accent: "electric-blue" },
  { n: "03", title: "Build", desc: "Prototipamos, desarrollamos y conectamos las piezas.", detail: "Software, IA, agentes, automatización, infraestructura y datos.", accent: "deep-purple" },
  { n: "04", title: "Evolve", desc: "Un producto nunca está realmente terminado.", detail: "Medimos, aprendemos, iteramos y construimos la siguiente versión.", accent: "gold" },
];

export default function Process() {
  return (
    <section id="process" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-[0.018] pointer-events-none" />
      <div className="relative max-w-[1240px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-white/20" />
              <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-white/25">From idea to reality</span>
            </div>
            <h2 className="text-[30px] sm:text-[42px] font-black tracking-[-0.05em] leading-none text-white">FROM IDEA <span className="text-white/20">TO REALITY</span></h2>
          </div>
          <p className="text-[13px] leading-5 text-white/35 max-w-[360px]">Un sistema de 4 etapas para llevar cualquier idea de 0 a un producto que funcione en el mundo real.</p>
        </div>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="hidden lg:block absolute top-[34px] left-[12%] right-[12%] h-px bg-gradient-to-r from-gold/0 via-white/[0.08] to-gold/0 pointer-events-none" />
          {steps.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.07 }} className="group relative p-6 rounded-[20px] bg-white/[0.025] border border-white/[0.07] hover:bg-white/[0.04] hover:border-white/[0.10] hover:-translate-y-1 transition-all duration-300">
              <div className="absolute inset-0 rounded-[20px] bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className={`relative w-9 h-9 rounded-xl grid place-items-center border text-[11px] font-mono font-bold tracking-widest mb-4 ${s.accent === "gold" ? "bg-gold/10 border-gold/20 text-gold" : s.accent === "electric-blue" ? "bg-electric-blue/10 border-electric-blue/20 text-electric-blue" : "bg-deep-purple/10 border-deep-purple/20 text-deep-purple"}`}>
                {s.n}
              </div>
              <h3 className="text-[18px] font-bold tracking-[-0.02em] text-white">{s.title}</h3>
              <p className="mt-2 text-[13.5px] leading-6 text-white/65">{s.desc}</p>
              <p className="mt-3 text-[12.5px] leading-5 text-white/30 border-t border-white/[0.04] pt-3">{s.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
