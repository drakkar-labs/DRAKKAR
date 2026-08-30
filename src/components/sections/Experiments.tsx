"use client";

import { motion } from "framer-motion";

export default function Experiments() {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden border-y border-white/[0.04] bg-white/[0.015]">
      <div className="absolute inset-0 grid-pattern opacity-[0.02] pointer-events-none" />
      <div className="relative max-w-[1240px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[28px] sm:text-[38px] font-black tracking-[-0.05em] leading-none text-white">
            BUILD. BREAK.<br /><span className="text-white/15">LEARN. REPEAT.</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="max-w-[520px] text-[14px] leading-6 text-white/45">
            <p>Los experimentos también son productos.</p>
            <p className="mt-1">Algunas ideas funcionarán. Otras fallarán. Y algunas terminarán convirtiéndose en algo completamente diferente.</p>
            <p className="mt-3 text-white font-semibold">Eso también es parte del proceso.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
