"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, MapPin, ArrowUpRight, MessageCircle, CheckCircle } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-xs font-medium text-muted/70 tracking-wider uppercase">
              Contacto
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Ponte en Contacto
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted/50 max-w-2xl mx-auto"
          >
            Ya sea que estés explorando nuestra plataforma, quieras colaborar
            o tengas una consulta — escríbenos y te responderemos pronto.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold mb-6">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-electric-blue/10 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-electric-blue" />
                  </div>
                  <div>
                    <div className="text-sm text-muted/40 mb-1">Sede Central</div>
                    <span className="text-sm">
                      Santiago, Chile
                    </span>
                    <br />
                    <span className="text-xs text-muted/30">La Pintana</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <MessageCircle size={18} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-sm text-muted/40 mb-1">Redes Sociales</div>
                    <span className="text-sm">
                      Próximamente
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4">Conectar</h4>
              <div className="space-y-2">
                {["GitHub", "LinkedIn", "Twitter / X"].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="flex items-center gap-2 text-sm text-muted/50 hover:text-gold transition-colors group"
                  >
                    {platform}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 rounded-2xl glass text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} className="text-gold" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Mensaje Enviado</h3>
                <p className="text-muted/50 text-sm max-w-md mx-auto mb-6">
                  Gracias por contactarnos. Te responderemos lo antes posible.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: "", company: "", email: "", subject: "", message: "" });
                  }}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium text-gold border border-gold/20 hover:bg-gold/10 transition-all"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl glass space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-muted/50 mb-2 uppercase tracking-wider">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-white placeholder:text-muted/20 focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/20 transition-all"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted/50 mb-2 uppercase tracking-wider">
                    Empresa
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-white placeholder:text-muted/20 focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/20 transition-all"
                    placeholder="Nombre de la empresa"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted/50 mb-2 uppercase tracking-wider">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-white placeholder:text-muted/20 focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/20 transition-all"
                  placeholder="tu@correo.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted/50 mb-2 uppercase tracking-wider">
                  Asunto
                </label>
                <select
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-white focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/20 transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23E2E8F0%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat"
                >
                  <option value="" className="bg-[#0A1020]">
                    Selecciona un tema
                  </option>
                  <option value="platform" className="bg-[#0A1020]">
                    Consulta sobre Plataforma
                  </option>
                  <option value="devsactum" className="bg-[#0A1020]">
                    DevSactum
                  </option>
                  <option value="partnership" className="bg-[#0A1020]">
                    Alianza / Colaboración
                  </option>
                  <option value="careers" className="bg-[#0A1020]">
                    Carreras
                  </option>
                  <option value="other" className="bg-[#0A1020]">
                    Otro
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted/50 mb-2 uppercase tracking-wider">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-white placeholder:text-muted/20 focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/20 transition-all resize-none"
                  placeholder="Cuéntanos sobre tu consulta..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-gold to-[#FFA500] text-[#050816] font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_40px_rgba(255,215,0,0.2)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                <Send size={16} />
              </button>
            </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
