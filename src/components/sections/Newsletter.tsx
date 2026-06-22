"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle, Sparkles } from "lucide-react";

export default function Newsletter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-deep-purple/[0.03] to-[#050816] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative p-8 md:p-12 rounded-3xl glass border border-gold/10 overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-electric-blue/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6">
              <Sparkles size={14} className="text-gold" />
              <span className="text-xs font-medium text-gold">Newsletter</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Mantente al Día
            </h3>
            <p className="text-muted/50 text-sm max-w-lg mx-auto mb-8">
              Recibe actualizaciones sobre DevSactum, artículos técnicos y novedades de Dräkkar Labs.
              Sin spam, solo contenido de valor.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-3 py-4"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle size={24} className="text-gold" />
                  <span className="text-lg font-medium">¡Gracias por suscribirte!</span>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-muted/40 hover:text-gold transition-colors underline"
                >
                  Suscribir otro correo
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                <label htmlFor="newsletter-email" className="sr-only">
                  Correo electrónico
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="tu@email.com"
                  className="w-full flex-1 px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/5 text-sm text-white placeholder:text-muted/20 focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/20 transition-all"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold to-[#FFA500] text-[#050816] font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(255,215,0,0.2)] transition-all duration-300"
                >
                  Suscribirme
                  <Send size={14} />
                </button>
              </form>
            )}

            <p className="text-[10px] text-muted/20 mt-4">
              Puedes darte de baja en cualquier momento. No compartimos tu correo.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
