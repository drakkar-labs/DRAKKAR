"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Send,
  CheckCircle,
  Users,
  Share2,
  Copy,
  AlertCircle,
} from "lucide-react";

interface WaitlistProps {
  standalone?: boolean;
}

export default function Waitlist({ standalone = false }: WaitlistProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "duplicate">("idle");
  const [position, setPosition] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/waitlist")
      .then((r) => r.json())
      .then((data) => setCount(data.count ?? 0))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setPosition(data.position);
        setCount((c) => c + 1);
        setStatus("success");
      } else if (res.status === 409 && data.position) {
        setPosition(data.position);
        setStatus("duplicate");
      } else {
        setErrorMsg(data.error || "Error al registrarse");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Error de conexión. Intenta de nuevo.");
      setStatus("error");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = encodeURIComponent(
    `Estoy en la waitlist de DevSactum! 🚀 Únete: `
  );

  const formContent = (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" || status === "duplicate" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-4"
          >
            <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={28} className="text-gold" />
            </div>
            <h4 className="text-lg font-bold mb-1">
              {status === "duplicate" ? "Ya estás en la lista" : "Estás en la lista"}
            </h4>
            <p className="text-muted/50 text-sm mb-4">
              {status === "duplicate"
                ? "Tu posición:"
                : "Eres el"}
              {" "}
              <span className="text-gold font-mono font-bold text-lg">#{position}</span>
              {" "}
              {status === "duplicate" ? "" : "en la lista"}
            </p>

            {/* Share */}
            <div className="flex items-center justify-center gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass-light text-xs font-medium text-muted/60 hover:text-electric-blue hover:border-electric-blue/20 transition-all"
              >
                <Share2 size={12} />
                Compartir en X
              </a>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass-light text-xs font-medium text-muted/60 hover:text-gold hover:border-gold/20 transition-all"
              >
                <Copy size={12} />
                {copied ? "Copiado" : "Copiar link"}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <label htmlFor={`waitlist-email${standalone ? "-standalone" : "-inline"}`} className="sr-only">
              Correo electrónico
            </label>
            <input
              id={`waitlist-email${standalone ? "-standalone" : "-inline"}`}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              required
              placeholder="tu@email.com"
              className="w-full flex-1 px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/5 text-sm text-white placeholder:text-muted/20 focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/20 transition-all"
            />
            <button
              type="submit"
              disabled={status === "loading" || !email.trim()}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold to-[#FFA500] text-[#050816] font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(255,215,0,0.2)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-[#050816]/30 border-t-[#050816] rounded-full"
                />
              ) : (
                <>
                  Unirme
                  <Send size={14} />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {status === "error" && errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center gap-2 mt-3 text-crimson text-xs"
          >
            <AlertCircle size={12} />
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (!standalone) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-8 rounded-2xl glass border border-gold/10"
        ref={ref}
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-4">
            <Rocket size={12} className="text-gold" />
            <span className="text-[10px] font-medium text-gold uppercase tracking-wider">
              Beta Exclusiva
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2">Únete a la Waitlist</h3>
          <p className="text-sm text-muted/40">
            Sé de los primeros en probar DevSactum.{" "}
            <span className="text-gold font-mono">{count.toLocaleString()}</span> personas ya están en la lista.
          </p>
        </div>
        {formContent}
      </motion.div>
    );
  }

  return (
    <section id="waitlist" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-gold/[0.02] to-[#050816] pointer-events-none" />
      <div className="absolute inset-0 radial-glow-gold opacity-20 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-medium text-muted/70 tracking-wider uppercase">
              Waitlist Abierta
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Sé de los Primeros en
            <br />
            <span className="gradient-text">Probar DevSactum</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted/50 max-w-xl mx-auto mb-8"
          >
            Acceso anticipado a la beta de Septiembre 2026. Los miembros de la
            waitlist obtienen prioridad y acceso exclusivo a features premium.
          </motion.p>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass border border-gold/10 mb-10"
          >
            <Users size={18} className="text-gold" />
            <span className="text-2xl font-bold font-mono text-gold">
              {count.toLocaleString()}
            </span>
            <span className="text-sm text-muted/40">
              personas en la lista
            </span>
          </motion.div>
        </div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="p-8 md:p-10 rounded-3xl glass border border-gold/10"
        >
          {formContent}
          <p className="text-[10px] text-muted/20 mt-4 text-center">
            Sin spam. Solo acceso anticipado y actualizaciones de DevSactum.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
