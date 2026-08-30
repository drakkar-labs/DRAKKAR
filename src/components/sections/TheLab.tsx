"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Workflow, Wrench } from "lucide-react";

const items = [
  { icon: Brain, title: "Artificial Intelligence", desc: "Agentes inteligentes, RAG, memoria persistente, sistemas multiagente y aplicaciones potenciadas por IA.", stat: "Agents × Memory" },
  { icon: Code2, title: "Software", desc: "Productos web, plataformas, herramientas internas y sistemas diseñados para crecer.", stat: "Web · Platform" },
  { icon: Workflow, title: "Automation", desc: "Workflows inteligentes que conectan herramientas, datos y agentes para eliminar trabajo repetitivo.", stat: "—80% toil" },
  { icon: Wrench, title: "Developer Tools", desc: "Herramientas para desarrolladores, CLI, TUI, infraestructura y sistemas que mejoran la forma de construir.", stat: "DX first" },
];

export default function TheLab() {
  return (
    <section id="lab" className="relative py-20 lg:py-28 overflow-hidden border-t border-white/[0.04]">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.025] via-transparent to-transparent pointer-events-none" />
      <div className="absolute -right-32 top-10 w-[520px] h-[520px] rounded-full bg-electric-blue/[0.04] blur-[100px] pointer-events-none" />
      <div className="relative max-w-[1240px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-[11px] font-mono tracking-[0.28em] uppercase text-white/25 mb-3 flex items-center gap-2"><span className="w-6 h-px bg-white/15" /> The Lab</div>
            <h2 className="text-[32px] sm:text-[44px] font-bold tracking-[-0.04em] leading-[0.9] text-white">Un laboratorio para<br /><span className="text-white/20">construir tecnología.</span></h2>
          </div>
          <p className="max-w-[420px] text-[14px] leading-6 text-white/45">Drakkar Labs explora la intersección entre software, IA y automatización — donde cada experimento puede convertirse en producto.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <motion.div key={it.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }} className="group relative p-6 rounded-[20px] bg-white/[0.025] border border-white/[0.07] hover:bg-white/[0.04] hover:border-white/[0.10] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] grid place-items-center mb-4 group-hover:bg-gold/10 group-hover:border-gold/15 transition-colors">
                <it.icon size={18} className="text-white/55 group-hover:text-gold transition-colors" />
              </div>
              <div className="relative text-[10px] font-mono tracking-widest uppercase text-gold/60 mb-2">{it.stat}</div>
              <h3 className="relative text-[14px] font-bold tracking-[-0.01em] text-white">{it.title}</h3>
              <p className="relative mt-2 text-[13px] leading-5 text-white/40">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
