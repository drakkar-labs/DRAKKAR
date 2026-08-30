"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="contact" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.025] to-transparent pointer-events-none" />
      <div className="absolute left-1/2 -translate-x-1/2 top-10 w-[720px] h-[320px] rounded-full bg-gold/[0.04] blur-[100px] pointer-events-none" />
      <div className="relative max-w-[1240px] mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center rounded-[28px] border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-10 lg:p-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.07] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">Have an idea?</span>
          </div>
          <h2 className="text-[32px] sm:text-[44px] font-black tracking-[-0.05em] leading-[0.9] text-white">Maybe it&apos;s time<br /><span className="gradient-text">to build it.</span></h2>
          <p className="mt-5 text-[14px] leading-6 text-white/45 max-w-[520px] mx-auto">No necesitas tener toda la respuesta. Solo necesitas una buena pregunta. Cuéntanos qué quieres construir.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="mailto:hola@drakkarlabs.cl" className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-[#050816] font-semibold text-[14px] hover:bg-white/90 transition-colors shadow-[0_10px_32px_rgba(255,255,255,0.14)]">
              Start a conversation <span className="w-6 h-6 rounded-full bg-[#050816] text-white grid place-items-center group-hover:translate-x-0.5 transition-transform"><ArrowRight size={12} strokeWidth={2.5} /></span>
            </a>
            <a href="https://github.com/gpb-industries/DRAKKAR" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-white text-[14px] font-medium hover:bg-white/[0.07] transition-colors">Ver GitHub</a>
          </div>
          <div className="mt-6 text-[11px] font-mono tracking-wide text-white/20">Respuesta en &lt; 48h · Santiago, Chile</div>
        </div>
      </div>
    </section>
  );
}
