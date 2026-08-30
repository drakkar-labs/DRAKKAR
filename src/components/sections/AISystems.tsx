"use client";

import { motion } from "framer-motion";

const chain = ["Models", "Agents", "Memory", "Tools", "Orchestration", "Product"];

export default function AISystems() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden border-y border-white/[0.04] bg-[#0A1020]/40">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-electric-blue/[0.03] to-transparent pointer-events-none" />
      <div className="relative max-w-[1240px] mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.07] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">We don&apos;t just use AI</span>
          </div>
          <h2 className="text-[30px] sm:text-[44px] font-black tracking-[-0.05em] leading-[0.9] text-white">We build systems<br /><span className="gradient-text">around it.</span></h2>
          <p className="mt-5 text-[14.5px] leading-6 text-white/45 max-w-[600px] mx-auto">La IA no debería ser un chatbot dentro de una app. Diseñamos sistemas donde los modelos razonan, usan herramientas, mantienen contexto y colaboran con otros agentes.</p>
        </div>
        <div className="mt-10 relative max-w-[860px] mx-auto">
          <div className="hidden sm:block absolute top-1/2 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 pointer-events-none" />
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {chain.map((c, i) => (
              <motion.div key={c} initial={{ opacity: 0, y: 12, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="relative">
                <div className={`rounded-2xl border px-3 py-4 text-center backdrop-blur-xl ${i === chain.length - 1 ? "bg-white text-[#050816] border-white shadow-[0_8px_32px_rgba(255,255,255,0.12)]" : "bg-white/[0.04] border-white/[0.08] text-white"}`}>
                  <div className={`text-[11px] font-mono tracking-widest uppercase ${i === chain.length - 1 ? "text-black/50" : "text-white/30"}`}>0{i + 1}</div>
                  <div className="text-[13px] font-bold tracking-tight mt-1">{c}</div>
                </div>
                {i < chain.length - 1 && <div className="hidden sm:block absolute top-1/2 -right-2 w-4 h-px bg-white/20 -translate-y-1/2" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
