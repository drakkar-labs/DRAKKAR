"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2 } from "lucide-react";

export default function OpenSource() {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden border-y border-white/[0.04]">
      <div className="relative max-w-[1240px] mx-auto px-6">
        <div className="rounded-[24px] border border-white/[0.06] bg-gradient-to-br from-white/[0.03] via-white/[0.015] to-transparent p-[1px]">
          <div className="rounded-[23px] bg-[#050816]/60 backdrop-blur-xl p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-[560px]">
              <div className="inline-flex items-center gap-2 mb-3">
                <Code2 size={14} className="text-white/40" />
                <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-white/25">Open Source</span>
              </div>
              <h2 className="text-[26px] sm:text-[30px] font-bold tracking-[-0.03em] leading-tight text-white">Algunas cosas deberían poder ser<br />construidas por todos.</h2>
              <p className="mt-3 text-[14px] leading-6 text-white/45">Cuando tiene sentido, abrimos proyectos, herramientas y experimentos para que otros puedan aprender, contribuir y construir encima.</p>
            </div>
            <motion.a href="https://github.com/gpb-industries/DRAKKAR" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#050816] font-semibold text-[14px] hover:bg-white/90 transition-colors">
              Explore GitHub <ArrowUpRight size={14} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
