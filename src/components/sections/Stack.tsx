"use client";

import { motion } from "framer-motion";
import { Brain, Bot, Database, Box, Layers, Atom, Zap, Share2, Cpu, Hexagon, Container, Network } from "lucide-react";

type StackItem = { name: string; icon: React.ReactNode; bg: string; ring: string };

const stack: StackItem[] = [
  {
    name: "TypeScript",
    bg: "bg-[#3178C6]",
    ring: "ring-[#3178C6]/20",
    icon: <span className="text-[10px] font-black tracking-tighter text-white">TS</span>,
  },
  {
    name: "Python",
    bg: "bg-[#3776AB]",
    ring: "ring-[#3776AB]/20",
    icon: <span className="text-[10px] font-black tracking-tighter text-white">Py</span>,
  },
  {
    name: "Go",
    bg: "bg-[#00ADD8]",
    ring: "ring-[#00ADD8]/20",
    icon: <span className="text-[11px] font-black tracking-tighter text-white">Go</span>,
  },
  {
    name: "React",
    bg: "bg-[#61DAFB]",
    ring: "ring-[#61DAFB]/20",
    icon: <Atom size={14} className="text-[#20232A]" />,
  },
  {
    name: "Next.js",
    bg: "bg-white",
    ring: "ring-white/15",
    icon: <span className="text-[11px] font-black tracking-tighter text-black">▲</span>,
  },
  {
    name: "NestJS",
    bg: "bg-[#E0234E]",
    ring: "ring-[#E0234E]/20",
    icon: <Hexagon size={13} className="text-white" />,
  },
  {
    name: "FastAPI",
    bg: "bg-[#009688]",
    ring: "ring-[#009688]/20",
    icon: <Zap size={13} className="text-white" />,
  },
  {
    name: "PostgreSQL",
    bg: "bg-[#336791]",
    ring: "ring-[#336791]/20",
    icon: <Database size={13} className="text-white" />,
  },
  {
    name: "Redis",
    bg: "bg-[#DC382D]",
    ring: "ring-[#DC382D]/20",
    icon: <Database size={13} className="text-white" />,
  },
  {
    name: "Docker",
    bg: "bg-[#2496ED]",
    ring: "ring-[#2496ED]/20",
    icon: <Container size={13} className="text-white" />,
  },
  {
    name: "Kubernetes",
    bg: "bg-[#326CE5]",
    ring: "ring-[#326CE5]/20",
    icon: <Box size={13} className="text-white" />,
  },
  {
    name: "Terraform",
    bg: "bg-[#7B42BC]",
    ring: "ring-[#7B42BC]/20",
    icon: <Layers size={13} className="text-white" />,
  },
  {
    name: "GraphQL",
    bg: "bg-[#E10098]",
    ring: "ring-[#E10098]/20",
    icon: <Share2 size={13} className="text-white" />,
  },
  {
    name: "AI",
    bg: "bg-[#FF6B6B]",
    ring: "ring-[#FF6B6B]/20",
    icon: <Brain size={13} className="text-white" />,
  },
  {
    name: "RAG",
    bg: "bg-[#8B5CF6]",
    ring: "ring-[#8B5CF6]/20",
    icon: <Network size={13} className="text-white" />,
  },
  {
    name: "Agents",
    bg: "bg-[#F59E0B]",
    ring: "ring-[#F59E0B]/20",
    icon: <Bot size={13} className="text-white" />,
  },
];

export default function Stack() {
  return (
    <section id="stack" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute -right-20 top-10 w-[520px] h-[520px] rounded-full bg-deep-purple/[0.04] blur-[110px] pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-[0.015] pointer-events-none" />
      <div className="relative max-w-[1240px] mx-auto px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-white/15" />
            <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-white/25">Our Stack</span>
            <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono tracking-widest uppercase text-white/30">16 tecnologías</span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] font-black tracking-[-0.04em] leading-[0.95] text-white">
            No construimos alrededor de
            <br />
            <span className="text-white/20">una única tecnología.</span>
          </h2>
          <p className="mt-4 text-[14.5px] leading-6 text-white/45">Elegimos la herramienta correcta para el problema. Esto es lo que usamos hoy — y evoluciona cada mes.</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="mt-10 flex flex-wrap gap-3">
          {stack.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.35 }}
              className="group inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl hover:bg-white/[0.07] hover:border-white/15 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(255,255,255,0.06)] transition-all cursor-default"
            >
              <span className={`w-7 h-7 rounded-full ${t.bg} ring-1 ${t.ring} grid place-items-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>{t.icon}</span>
              <span className="text-[13px] font-medium tracking-[-0.01em] text-white/80 group-hover:text-white transition-colors">{t.name}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-8 flex flex-wrap items-center gap-3 text-[11px] font-mono tracking-wide text-white/25">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400/60 animate-pulse" />
            Stack vivo — actualizado mensualmente
          </span>
          <span className="w-1 h-1 rounded-full bg-white/10" />
          <span>De TypeScript a Agents — full-stack real</span>
        </motion.div>
      </div>
    </section>
  );
}
