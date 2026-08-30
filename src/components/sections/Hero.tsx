"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Clock, Sparkles, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import DrakkarParticles from "@/components/ui/DrakkarParticles";
import HologramDrakkar from "@/components/ui/HologramDrakkar";

function Countdown() {
  const target = new Date("2027-03-05T12:00:00-03:00").getTime();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000 * 60);
    return () => clearInterval(id);
  }, []);
  if (now === null) return <div className="h-[56px]" />;
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return (
    <div className="flex items-center gap-2">
      {[
        { v: d, l: "días" },
        { v: h, l: "hrs" },
        { v: m, l: "min" },
      ].map((u) => (
        <div key={u.l} className="min-w-[56px] rounded-xl bg-white text-[#050816] px-2.5 py-2 text-center">
          <div className="text-[18px] font-black leading-none tracking-tighter">{String(u.v).padStart(2, "0")}</div>
          <div className="text-[9px] font-mono tracking-widest uppercase opacity-60">{u.l}</div>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={containerRef} id="hero" className="relative min-h-[96vh] flex flex-col overflow-hidden bg-[#050816]">
      {/* Announcement bar */}
      <div className="relative z-20 w-full border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-xl">
        <div className="max-w-[1240px] mx-auto px-6 py-2.5 flex items-center justify-center gap-3 text-center">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-[#050816] text-[10px] font-bold tracking-widest uppercase">
            <Clock size={11} /> Actualización
          </span>
          <span className="text-[12.5px] leading-none text-white/70">
            <span className="text-white font-medium">DevSactum Beta</span> reprogramada →{" "}
            <span className="text-gold font-semibold">5 de marzo de 2027</span>
            <span className="hidden sm:inline text-white/40"> · Más tiempo para hacerlo excepcional</span>
          </span>
          <a href="#roadmap" className="hidden md:inline-flex items-center gap-1 text-[12px] font-medium text-white/60 hover:text-white transition-colors">
            Ver roadmap <ArrowUpRight size={12} />
          </a>
        </div>
      </div>

      {/* Cinematic background */}
      <div className="absolute inset-0 top-[41px]">
        <Image src="/hero-drakkar-cinematic.jpg" alt="" fill priority className="object-cover object-[68%_42%] scale-[1.03]" sizes="100vw" />
        <div className="absolute top-0 right-0 w-48 h-16 bg-gradient-to-l from-[#050816] via-[#050816]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/78 via-[52%] to-[#050816]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/20 to-[#050816]/45" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 75% at 70% 48%, transparent 18%, rgba(5,8,22,0.42) 58%, #050816 88%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050816] to-transparent" />
        {/* grain */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")` }} />
      </div>

      {/* Hologram — wooden drakkar reimagined as tech projection */}
      <div className="absolute inset-y-0 right-0 w-[62%] lg:w-[56%] top-[41px] pointer-events-none">
        <HologramDrakkar />
      </div>

      <div className="absolute inset-0 top-[41px] opacity-[0.38] mix-blend-screen pointer-events-none">
        <DrakkarParticles />
      </div>
      <div className="absolute inset-0 top-[41px] grid-pattern opacity-[0.015] pointer-events-none" />

      <motion.div style={{ y, opacity }} className="relative z-10 flex-1 w-full max-w-[1240px] mx-auto px-6 flex flex-col justify-center pt-10 pb-10">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-8 items-center">
          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="inline-flex items-center gap-2.5 mb-6">
              <span className="text-[11px] font-mono tracking-[0.32em] uppercase text-white/35">Drakkar Labs</span>
              <span className="w-6 h-px bg-white/12" />
              <span className="text-[11px] font-mono tracking-[0.18em] uppercase text-white/25 hidden sm:inline">Santiago · Desde 2026</span>
              <span className="hidden sm:inline-flex items-center gap-1.5 ml-1 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/15">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-300/80">Lab active</span>
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }} className="font-bold tracking-[-0.055em] leading-[0.88]" style={{ fontSize: "clamp(42px, 7.8vw, 92px)" }}>
              <span className="block text-white">We build</span>
              <span className="block gradient-text pb-2">what comes next.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }} className="mt-5 text-[16px] sm:text-[18px] leading-7 text-white/58 max-w-[560px] tracking-[-0.01em]">
              Diseñamos, construimos y experimentamos con tecnología para convertir ideas en productos reales.
              <span className="text-white/85"> De Santiago al mundo.</span>
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="mt-6 inline-flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-xl text-[11px] font-mono tracking-[0.16em] uppercase text-white/60">IA</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-xl text-[11px] font-mono tracking-[0.16em] uppercase text-white/60">Software</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-xl text-[11px] font-mono tracking-[0.16em] uppercase text-white/60">Automatización</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-xl text-[11px] font-mono tracking-[0.16em] uppercase text-white/60">Experimentos</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }} className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#projects" className="group inline-flex items-center justify-center gap-2.5 px-7 py-[14px] rounded-full bg-white text-[#050816] font-semibold text-[14px] hover:bg-white/90 transition-colors shadow-[0_10px_40px_rgba(255,255,255,0.16)]">
                Explorar proyectos
                <span className="w-6 h-6 rounded-full bg-[#050816] text-white grid place-items-center group-hover:translate-x-0.5 transition-transform"><ArrowRight size={12} strokeWidth={2.5} /></span>
              </a>
              <a href="#contact" className="inline-flex items-center justify-center px-7 py-[14px] rounded-full bg-white/[0.06] border border-white/[0.09] backdrop-blur-xl text-white font-medium text-[14px] hover:bg-white/[0.10] transition-all">Hablemos →</a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05, duration: 0.6 }} className="mt-6 flex flex-wrap items-center gap-4 text-[11px] font-mono tracking-wide text-white/25">
              <span className="inline-flex items-center gap-1.5"><Sparkles size={12} className="text-gold/60" /> Explore. Build. Experiment.</span>
              <span className="w-1 h-1 rounded-full bg-white/15" />
              <span>Mueve el cursor — el Drakkar responde</span>
            </motion.div>
          </div>

          {/* Right — premium glass stack */}
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }} className="relative lg:pl-6">
            {/* Countdown card */}
            <div className="rounded-[22px] p-[1px] bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-[0_24px_64px_rgba(0,0,0,0.55)]">
              <div className="rounded-[21px] overflow-hidden bg-[#0A1020]/85 backdrop-blur-2xl border border-white/[0.06]">
                <div className="px-6 pt-6 pb-5 border-b border-white/[0.06] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-white/30">DevSactum Beta</div>
                    <div className="text-[13px] font-semibold text-white mt-1">5 de marzo de 2027 · 12:00 CLT</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-400 text-[#050816] text-[10px] font-bold tracking-widest uppercase">Reprogramada</span>
                </div>
                <div className="px-6 py-6">
                  <div className="text-[11px] font-mono tracking-widest uppercase text-white/35 mb-3">Faltan</div>
                  <Countdown />
                  <p className="mt-4 text-[12.5px] leading-5 text-white/45">Tomamos 6 meses extra para pulir infraestructura, seguridad y experiencia. Calidad sobre velocidad.</p>
                  <a href="#roadmap" className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-gold hover:text-white transition-colors">Ver por qué se atrasó <ArrowUpRight size={14} /></a>
                </div>
              </div>
            </div>

            {/* Pill stats */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { k: "3", l: "productos" },
                { k: "16", l: "stack" },
                { k: "∞", l: "experimentos" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-xl px-4 py-3 text-center">
                  <div className="text-[18px] font-black tracking-tighter text-white leading-none">{s.k}</div>
                  <div className="text-[10px] font-mono tracking-widest uppercase text-white/30">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white grid place-items-center text-[#050816] font-black text-[11px]">CL</div>
              <div className="text-[12px] leading-tight">
                <div className="font-semibold text-white">From Chile. Built for the world.</div>
                <div className="text-white/40">Santiago · Remoto-first</div>
              </div>
              <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
