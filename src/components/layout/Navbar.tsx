"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
const navLinks = [
  { label: "Lab", href: "#lab" },
  { label: "Proceso", href: "#process" },
  { label: "Proyectos", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contacto", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape key handler for mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "bg-[#050816]/80 backdrop-blur-2xl border-white/[0.06] py-3"
            : "bg-transparent border-transparent py-4"
        )}
      >
        <div className="max-w-[1240px] mx-auto px-6 flex items-center justify-between gap-6">
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-300">
              <Image
                src="/drakkar-logo.png"
                alt="Dräkkar Labs"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-[17px] font-semibold tracking-[-0.02em] hidden sm:block">
              Dräkkar<span className="text-white/60 font-[500]">Labs</span>
            </span>
          </a>

          <nav
            className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/[0.06] backdrop-blur-xl"
            aria-label="Navegación principal"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-1.5 rounded-full text-[13.5px] font-medium tracking-[-0.01em] text-white/55 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <a
              href="#contact"
              className="px-5 py-2 rounded-full bg-white text-[#050816] text-[13.5px] font-semibold tracking-[-0.01em] hover:bg-white/90 transition-colors shadow-[0_2px_16px_rgba(255,255,255,0.12)]"
            >
              Hablemos
            </a>
          </div>

          <button
            ref={hamburgerRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-3 text-muted hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#050816]/95 backdrop-blur-2xl flex flex-col lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-2 px-6 py-20">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => {
                    setMobileOpen(false);
                    hamburgerRef.current?.focus();
                  }}
                  className="w-full max-w-sm text-center py-4 rounded-2xl text-[22px] font-semibold tracking-[-0.02em] text-white/80 hover:text-white hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06] transition-all"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.04 + 0.05 }}
                onClick={() => setMobileOpen(false)}
                className="mt-6 w-full max-w-sm text-center py-4 rounded-2xl bg-white text-[#050816] font-semibold hover:bg-white/90 transition-colors"
              >
                Hablemos
              </motion.a>
            </div>
            <div className="p-6 border-t border-white/[0.06] text-center text-xs text-white/25">
              Santiago, Chile · Remoto-first
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
