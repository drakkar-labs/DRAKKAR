"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#050816]">
      <div className="relative max-w-[1240px] mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          <div className="text-center md:text-left">
            <a href="#" className="inline-flex items-center gap-3 mb-4">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden ring-1 ring-white/10">
                <Image src="/drakkar-logo.png" alt="Dräkkar Labs" fill className="object-cover" />
              </div>
              <span className="text-[16px] font-semibold tracking-[-0.02em]">
                DRAKKAR<span className="text-white/40 font-medium"> LABS</span>
              </span>
            </a>
            <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-white/25">
              Explore. Build. Experiment.
            </p>
            <p className="text-[11px] font-mono tracking-wide text-white/20 mt-1">
              AI · Software · Automation · Open Source
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[13px] text-white/40">
            <a href="#lab" className="hover:text-white transition-colors">Lab</a>
            <a href="#projects" className="hover:text-white transition-colors">Proyectos</a>
            <a href="https://github.com/gpb-industries/DRAKKAR" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="#contact" className="hover:text-white transition-colors">Contacto</a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-white/20">
          <span>© 2026 Drakkar Labs</span>
          <span>From Chile. Built for the world.</span>
        </div>
      </div>
    </footer>
  );
}
