"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Users,
  ArrowUpRight,
  Globe,
  Heart,
  Rocket,
  Send,
  CheckCircle,
  X,
  Briefcase,
} from "lucide-react";

const openRoles = [
  {
    id: "frontend-trainee",
    title: "Trainee Frontend Developer",
    team: "DevSactum",
    location: "Remoto",
    type: "Tiempo completo",
    description: "Aprende a construir interfaces modernas con React, Next.js y TypeScript. Buscamos personas con ganas de crecer.",
  },
  {
    id: "backend-trainee",
    title: "Trainee Backend Developer",
    team: "DevSactum",
    location: "Remoto",
    type: "Tiempo completo",
    description: "Desarrolla APIs y servicios escalables con Node.js, NestJS y bases de datos SQL. Ideal para quienes quieren aprender arquitectura de software.",
  },
  {
    id: "ui-ux-trainee",
    title: "Trainee UI/UX Designer",
    team: "DevSactum",
    location: "Remoto",
    type: "Tiempo completo",
    description: "Diseña experiencias de usuario para una plataforma de desarrolladores. Figma, prototipado y diseño de sistemas.",
  },
  {
    id: "ai-trainee",
    title: "Trainee AI Engineer",
    team: "Investigacion IA",
    location: "Remoto",
    type: "Tiempo completo",
    description: "Explora modelos de lenguaje, RAG y sistemas de IA. Python, TensorFlow y ganas de investigar.",
  },
  {
    id: "devops-trainee",
    title: "Trainee DevOps / Platform",
    team: "Infraestructura",
    location: "Remoto",
    type: "Tiempo completo",
    description: "Aprende infraestructura cloud, CI/CD y containerizacion con Docker, Kubernetes y Terraform.",
  },
  {
    id: "devrel-trainee",
    title: "Trainee Developer Advocate",
    team: "DevSactum",
    location: "Remoto",
    type: "Tiempo completo",
    description: "Crea contenido tecnico, organiza eventos y construye comunidad alrededor de DevSactum.",
  },
];

const cultureValues = [
  {
    icon: Globe,
    title: "Primero Remoto",
    description: "Trabaja desde cualquier parte del mundo. Nuestro equipo abarca 30+ paises.",
  },
  {
    icon: Rocket,
    title: "Aprendizaje Acelerado",
    description: "Mentoria directa con ingenieros seniors. Aprende en semanas lo que otros aprenden en meses.",
  },
  {
    icon: Heart,
    title: "Impulsado por la Innovacion",
    description: "20% del tiempo dedicado a investigacion, experimentos y proyectos personales.",
  },
  {
    icon: Users,
    title: "Equipos Pequenos",
    description: "Equipos autonomous con ownership total. Tu trabajo impacta directamente en el producto.",
  },
];

export default function Careers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedRole, setSelectedRole] = useState<typeof openRoles[0] | null>(null);
  const [formState, setFormState] = useState({ name: "", email: "", github: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="careers" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
            <span className="text-xs font-medium text-muted/70 tracking-wider uppercase">
              Carreras
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Construye Sistemas que
            <br />
            <span className="gradient-text">Forman el Futuro</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted/50 max-w-2xl mx-auto"
          >
            Buscamos personas con talento y ganas de aprender. No necesitas
            experiencia senior, solo pasion por la ingenieria y ganas de crecer.
          </motion.p>
        </div>

        {/* Culture values */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {cultureValues.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-6 rounded-2xl glass-light text-center group hover:border-white/10 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric-blue/20 to-deep-purple/20 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <value.icon size={22} className="text-electric-blue" />
              </div>
              <h4 className="font-semibold mb-2">{value.title}</h4>
              <p className="text-xs text-muted/50 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Open roles */}
        <div>
          <h3 className="text-2xl font-bold mb-8">Posiciones Abiertas</h3>
          <div className="space-y-3">
            {openRoles.map((role, i) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-xl glass-light hover:border-white/10 transition-all duration-300"
              >
                <div className="flex-1 mb-4 md:mb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold">{role.title}</h4>
                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-full bg-electric-blue/10 text-electric-blue border border-electric-blue/20">
                      {role.team}
                    </span>
                  </div>
                  <p className="text-xs text-muted/40 mb-2 max-w-xl">{role.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted/40">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {role.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {role.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => { setSelectedRole(role); setSubmitted(false); setFormState({ name: "", email: "", github: "", message: "" }); }}
                  className="flex items-center gap-2 text-sm font-medium text-gold hover:text-white transition-colors duration-300 shrink-0"
                >
                  Aplicar <ArrowUpRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedRole(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-lg rounded-2xl glass border border-white/10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative p-6 border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-electric-blue/5 to-deep-purple/5" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase size={16} className="text-gold" />
                      <span className="text-xs text-muted/40 uppercase tracking-wider">Aplicar</span>
                    </div>
                    <h3 className="text-lg font-bold">{selectedRole.title}</h3>
                    <p className="text-xs text-muted/40">{selectedRole.team} · {selectedRole.location}</p>
                  </div>
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="p-2 rounded-lg hover:bg-white/5 text-muted/40 hover:text-white transition-all"
                    aria-label="Cerrar"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={28} className="text-gold" />
                    </div>
                    <h4 className="text-lg font-bold mb-2">Aplicacion Enviada</h4>
                    <p className="text-sm text-muted/50 mb-6">
                      Recibimos tu aplicacion para <span className="text-gold">{selectedRole.title}</span>.
                      Te contactaremos pronto.
                    </p>
                    <button
                      onClick={() => setSelectedRole(null)}
                      className="px-6 py-2.5 rounded-lg text-sm font-medium text-gold border border-gold/20 hover:bg-gold/10 transition-all"
                    >
                      Cerrar
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-muted/50 mb-1.5 uppercase tracking-wider">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-white placeholder:text-muted/20 focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/20 transition-all"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted/50 mb-1.5 uppercase tracking-wider">
                        Correo electronico
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-white placeholder:text-muted/20 focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/20 transition-all"
                        placeholder="tu@correo.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted/50 mb-1.5 uppercase tracking-wider">
                        GitHub (opcional)
                      </label>
                      <input
                        type="url"
                        value={formState.github}
                        onChange={(e) => setFormState({ ...formState, github: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-white placeholder:text-muted/20 focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/20 transition-all"
                        placeholder="github.com/tu-usuario"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted/50 mb-1.5 uppercase tracking-wider">
                        Por que te interesa?
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-white placeholder:text-muted/20 focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/20 transition-all resize-none"
                        placeholder="Cuentanos por que quieres unirte..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold to-[#FFA500] text-[#050816] font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(255,215,0,0.2)] transition-all duration-300"
                    >
                      Enviar Aplicacion
                      <Send size={14} />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
