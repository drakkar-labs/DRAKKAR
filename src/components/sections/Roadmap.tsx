"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Circle, ArrowRight, Clock, Shield, Sparkles } from "lucide-react";

const roadmapData = [
  { quarter: "Q2 2026", title: "Fundación", status: "completed", items: [{ text: "Fundación de Dräkkar Labs", done: true }, { text: "Sitio web corporativo", done: true }, { text: "Identidad de marca", done: true }, { text: "Stack tecnológico definido", done: true }] },
  { quarter: "Q3 2026", title: "Desarrollo", status: "current", items: [{ text: "Desarrollo de DevSactum", done: false, current: true }, { text: "Blog y content platform", done: true }, { text: "Sistema de waitlist", done: true }, { text: "Documentación de API", done: false }] },
  { quarter: "Q4 2026", title: "Refinamiento", status: "upcoming", items: [{ text: "Beta privada interna", done: false }, { text: "Hardening & seguridad", done: false }, { text: "Onboarding de early testers", done: false }, { text: "Feedback iteration", done: false }] },
  { quarter: "Q1 2027", title: "Lanzamiento", status: "upcoming", featured: true, items: [{ text: "DevSactum Beta — 5 de marzo de 2027", done: false }, { text: "Beta pública abierta", done: false }, { text: "Primeros usuarios activos", done: false }, { text: "Lanzamiento oficial v1.0", done: false }] },
  { quarter: "Q2 2027", title: "Escala", status: "upcoming", items: [{ text: "Dräkkar AI — Framework de IA", done: false }, { text: "Dräkkar Cloud — Plataforma", done: false }, { text: "Open source components", done: false }, { text: "Expansión LATAM", done: false }] },
];

const statusStyles: Record<string, { border: string; dot: string; bg: string }> = {
  completed: { border: "border-gold/20", dot: "bg-gold", bg: "bg-gold/[0.04]" },
  current: { border: "border-electric-blue/30", dot: "bg-electric-blue animate-pulse", bg: "bg-electric-blue/[0.04]" },
  upcoming: { border: "border-white/[0.06]", dot: "bg-white/20", bg: "bg-white/[0.02]" },
};

export default function Roadmap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="roadmap" className="relative py-20 lg:py-28 overflow-hidden border-t border-white/[0.04] bg-white/[0.01]">
      <div className="absolute inset-0 grid-pattern opacity-[0.015] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-10">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.07] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-deep-purple animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">Roadmap</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 }} className="text-[32px] sm:text-[44px] font-black tracking-[-0.05em] leading-none text-white">Hoja de Ruta</motion.h2>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.14 }} className="mt-3 text-[14px] leading-6 text-white/45 max-w-xl mx-auto">Transparencia total. Preferimos atrasar 6 meses y entregar algo excepcional que lanzar a medias.</motion.p>
        </div>

        {/* Delay transparency card — premium */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto mb-16 rounded-[20px] border border-amber-400/15 bg-amber-400/[0.06] backdrop-blur-xl p-6 flex gap-4">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-[#050816] grid place-items-center shrink-0"><Clock size={16} /></div>
          <div>
            <div className="text-[13px] font-bold tracking-tight text-white flex items-center gap-2">¿Por qué se atrasó la Beta? <span className="px-2 py-0.5 rounded-full bg-amber-400 text-[#050816] text-[10px] font-bold tracking-widest uppercase">5 de marzo de 2027</span></div>
            <p className="mt-1 text-[13px] leading-5 text-white/60">Originalmente septiembre 2026. La movimos para pulir tres pilares que no negociamos: <span className="text-white font-medium">seguridad</span>, <span className="text-white font-medium">infraestructura escalable</span> y <span className="text-white font-medium">experiencia de desarrollador</span> impecable.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Más tests de carga", "Auditoría de seguridad", "Onboarding early testers"].map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-full bg-white text-[#050816] text-[11px] font-medium flex items-center gap-1"><Shield size={11} /> {t}</span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/25 via-white/10 to-transparent -translate-x-1/2" />
          <div className="space-y-8">
            {roadmapData.map((phase: any, i) => {
              const styles = statusStyles[phase.status];
              const featured = phase.featured;
              return (
                <motion.div key={phase.quarter} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.06 }} className={`relative flex flex-col md:flex-row items-start gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <div className={`w-3.5 h-3.5 rounded-full ${styles.dot} border-[3px] border-[#050816] ${featured ? "ring-4 ring-gold/20" : ""}`} />
                  </div>
                  <div className={`flex-1 ml-14 md:ml-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                    <div className={`inline-block p-6 rounded-[20px] border text-left w-full backdrop-blur-xl transition-all ${featured ? "bg-white border-white shadow-[0_12px_40px_rgba(255,255,255,0.14)]" : `${styles.border} ${styles.bg}`}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-[11px] font-mono tracking-widest ${featured ? "text-black/40" : "text-gold"}`}>{phase.quarter}</span>
                        <span className={`px-2 py-0.5 text-[10px] tracking-widest uppercase rounded-full ${phase.status === "completed" ? "bg-gold/15 text-gold" : phase.status === "current" ? "bg-electric-blue/15 text-electric-blue" : featured ? "bg-black text-white" : "bg-white/5 text-white/30"}`}>
                          {phase.status === "completed" ? "Completado" : phase.status === "current" ? "En progreso" : featured ? "Próximo hito" : "Próximamente"}
                        </span>
                        {featured && <Sparkles size={12} className="text-gold ml-auto" />}
                      </div>
                      <h3 className={`text-[16px] font-bold tracking-tight mb-3 ${featured ? "text-[#050816]" : "text-white"}`}>{phase.title}</h3>
                      <div className="space-y-2">
                        {phase.items.map((item: any) => (
                          <div key={item.text} className="flex items-center gap-2">
                            {item.done ? <Check size={13} className="text-gold shrink-0" /> : item.current ? <ArrowRight size={13} className="text-electric-blue shrink-0" /> : <Circle size={13} className={`${featured ? "text-black/15" : "text-white/10"} shrink-0`} />}
                            <span className={`text-[13px] ${featured ? (item.text.includes("5 de marzo") ? "text-[#050816] font-bold" : "text-black/60") : item.done ? "text-white/60" : item.current ? "text-white" : "text-white/30"}`}>{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
