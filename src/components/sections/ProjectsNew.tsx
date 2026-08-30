"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Clock } from "lucide-react";

const projects = [
  { name: "Blu AI", desc: "Entorno completo para trabajar con IA. Modelos, agentes y memoria en un solo lugar.", tags: ["AI", "Agents", "Memory", "RAG"], status: "En desarrollo", accent: "gold" },
  { name: "HUGINN", desc: "Orquestación multiagente. Conecta modelos, herramientas y memoria para investigar y coordinar soluciones.", tags: ["Multi-Agent", "Orchestration", "TUI"], status: "En desarrollo", accent: "electric-blue" },
  { name: "DevSactum", desc: "Red social para desarrolladores, proyectos y conocimiento. Donde el código encuentra comunidad.", tags: ["Community", "Social", "Developers"], status: "Beta · 5 de marzo de 2027", featured: true },
];

export default function ProjectsNew() {
  return (
    <section id="projects" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute -left-40 top-20 w-[640px] h-[640px] rounded-full bg-gold/[0.03] blur-[120px] pointer-events-none" />
      <div className="relative max-w-[1240px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-white/15" />
              <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-white/25">Projects</span>
              <span className="px-2 py-1 rounded-full bg-gold/10 border border-gold/15 text-[10px] font-mono tracking-widest uppercase text-gold">3 activos</span>
            </div>
            <h2 className="text-[32px] sm:text-[46px] font-black tracking-[-0.05em] leading-[0.9] text-white">Ideas que ya están<br /><span className="text-white/20">tomando forma.</span></h2>
          </div>
          <p className="text-[13px] leading-5 text-white/35 max-w-[380px]">Tres apuestas que exploran distintas capas del mismo objetivo: convertir ideas en productos reales que la gente use.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.08 }} className={`group relative rounded-[22px] border overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-300 ${p.featured ? "bg-white text-[#050816] border-white shadow-[0_16px_48px_rgba(255,255,255,0.12)] lg:scale-[1.02]" : "bg-white/[0.025] border-white/[0.07] hover:bg-white/[0.04] hover:border-white/[0.10]"}`}>
              <div className="relative p-7 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase border ${p.featured ? "bg-[#050816] text-white border-[#050816]" : "bg-white/[0.06] text-white/50 border-white/10"}`}>
                    {p.featured ? <><Clock size={11} /> {p.status}</> : p.status}
                    {p.featured && <Sparkles size={10} className="ml-1" />}
                  </span>
                  <ArrowUpRight size={16} className={`${p.featured ? "text-black/20 group-hover:text-black/60" : "text-white/15 group-hover:text-white/40"} transition-colors`} />
                </div>
                <h3 className={`text-[22px] font-black tracking-[-0.02em] ${p.featured ? "text-[#050816]" : "text-white"}`}>{p.name}</h3>
                <p className={`mt-2 text-[13.5px] leading-6 flex-1 ${p.featured ? "text-black/60" : "text-white/45"}`}>{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wide border ${p.featured ? "bg-black/[0.06] text-black/60 border-black/10" : "bg-white/[0.04] text-white/35 border-white/10"}`}>{t}</span>
                  ))}
                </div>
                <div className={`mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold ${p.featured ? "text-[#050816]" : "text-white/70 group-hover:text-white"}`}>
                  Ver proyecto <ArrowUpRight size={14} className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
              {!p.featured && <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
