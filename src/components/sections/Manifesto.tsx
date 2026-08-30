"use client";

import { motion } from "framer-motion";

export default function Manifesto() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden border-t border-white/[0.04]">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.015] via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-24 -left-32 w-[520px] h-[520px] rounded-full bg-gold/[0.04] blur-[100px] pointer-events-none" />
      <div className="relative max-w-[1240px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-start">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2.5 mb-6">
              <span className="w-8 h-px bg-gold/50" />
              <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-gold/80">Manifiesto</span>
              <span className="px-2 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono tracking-widest uppercase text-white/30">01</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.08 }} className="text-[32px] sm:text-[46px] lg:text-[56px] font-bold tracking-[-0.05em] leading-[0.92] text-white">
              No solo imaginamos
              <br />
              el futuro. <span className="text-white/20">Lo</span>
              <br />
              <span className="gradient-text">construimos.</span>
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.18 }} className="lg:pt-4">
            <div className="space-y-4 text-[15.5px] leading-7 text-white/55">
              <p>Las mejores ideas no deberían quedarse en un documento, un prototipo o una conversación.</p>
              <p>En Drakkar Labs investigamos tecnologías emergentes, diseñamos sistemas y construimos productos que puedan existir en el mundo real.</p>
            </div>
            <div className="mt-6 inline-flex items-center gap-3 pl-1 pr-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-[13px] font-semibold text-white">Desde una idea inicial hasta un MVP funcional.</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { v: "0→1", l: "idea a MVP" },
                { v: "4", l: "etapas claras" },
                { v: "100%", l: "enfoque real" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
                  <div className="text-[14px] font-black tracking-tighter text-white leading-none">{s.v}</div>
                  <div className="text-[10px] font-mono tracking-widest uppercase text-white/35 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
