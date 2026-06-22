"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Users,
  Code2,
  MessageSquare,
  BookOpen,
  Video,
  Rocket,
  Calendar,
  ArrowRight,
  Sparkles,
  Globe,
  GraduationCap,
  Briefcase,
  PenTool,
} from "lucide-react";
import Waitlist from "@/components/sections/Waitlist";

const features = [
  {
    icon: Users,
    title: "Red Social para Desarrolladores",
    description: "Conecta, comparte y colabora con una comunidad global de programadores.",
  },
  {
    icon: Code2,
    title: "Publicaciones de Código",
    description: "Comparte snippets, proyectos y soluciones con syntax highlighting integrado.",
  },
  {
    icon: MessageSquare,
    title: "Debates Técnicos",
    description: "Discute arquitecturas, frameworks y mejores prácticas con la comunidad.",
  },
  {
    icon: BookOpen,
    title: "Recursos y Tutoriales",
    description: "Accede a contenido educativo creado por la comunidad y expertos.",
  },
  {
    icon: Video,
    title: "Contenido Multimedia",
    description: "Comparte livestreams, tutoriales en video y demostraciones de proyectos.",
  },
  {
    icon: GraduationCap,
    title: "Para Estudiantes y Profesores",
    description: "Herramientas educativas, mentorías y espacios de aprendizaje colaborativo.",
  },
  {
    icon: Briefcase,
    title: "Oportunidades Laborales",
    description: "Board de empleo conectando startups, empresas y talento técnico.",
  },
  {
    icon: PenTool,
    title: "Creadores de Contenido Tech",
    description: "Plataforma para creadores que producen contenido tecnológico y educativo.",
  },
];

const audience = [
  { icon: Code2, label: "Desarrolladores de Software" },
  { icon: Briefcase, label: "Startups y Empresas" },
  { icon: GraduationCap, label: "Estudiantes de Programación" },
  { icon: BookOpen, label: "Profesores de Programación" },
  { icon: PenTool, label: "Creadores de Contenido Tech" },
  { icon: Rocket, label: "Ingenieros de IA" },
];

export default function DevSactum() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="devsactum" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-deep-purple/[0.03] to-[#050816] pointer-events-none" />
      <div className="absolute inset-0 radial-glow opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6"
          >
            <Sparkles size={14} className="text-gold" />
            <span className="text-xs font-medium text-muted/70 tracking-wider uppercase">
              Primer Producto
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="gradient-text">DevSactum</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted/50 max-w-2xl mx-auto mb-4"
          >
            La red social definitiva para la comunidad de desarrollo de software.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass border border-electric-blue/20"
          >
            <Calendar size={14} className="text-electric-blue" />
            <span className="text-sm font-medium text-electric-blue">
              Beta — Septiembre 2026
            </span>
          </motion.div>
        </div>

        {/* Central visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-20"
        >
          <div className="max-w-4xl mx-auto p-1 rounded-3xl bg-gradient-to-r from-gold/20 via-electric-blue/20 to-deep-purple/20">
            <div className="rounded-3xl glass p-8 md:p-12">
              {/* Mock UI */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-crimson/60" />
                <div className="w-3 h-3 rounded-full bg-gold/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <div className="flex-1 ml-4 h-6 rounded-lg bg-white/[0.03] border border-white/5 flex items-center px-3">
                  <span className="text-[10px] font-mono text-muted/30">devsactum.com</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Sidebar mock */}
                <div className="hidden md:block space-y-3">
                  {["Feed Principal", "Tendencias", "Mis Proyectos", "Guardados", "Eventos"].map(
                    (item, i) => (
                      <div
                        key={item}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                          i === 0
                            ? "bg-gold/10 text-gold border border-gold/20"
                            : "text-muted/40"
                        }`}
                      >
                        <div className="w-4 h-4 rounded bg-white/5" />
                        {item}
                      </div>
                    )
                  )}
                </div>

                {/* Feed mock */}
                <div className="md:col-span-2 space-y-4">
                  {[
                    {
                      user: "maria_dev",
                      content: "Acabo de deployar mi primera API en Kubernetes. ¡Guía completa en el post!",
                      likes: "234",
                      comments: "45",
                    },
                    {
                      user: "startup_studio",
                      content: "Buscamos un CTO para nuestro Series A. Stack: Next.js, PostgreSQL, AI.",
                      likes: "189",
                      comments: "67",
                    },
                  ].map((post, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-electric-blue/30" />
                        <div>
                          <div className="text-xs font-medium">{post.user}</div>
                          <div className="text-[10px] text-muted/30">hace 2h</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted/60 mb-3">{post.content}</p>
                      <div className="flex items-center gap-4 text-[10px] text-muted/30">
                        <span>❤ {post.likes}</span>
                        <span>💬 {post.comments}</span>
                        <span>🔗 Compartir</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group p-6 rounded-2xl glass-light hover:border-white/10 transition-all duration-500"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold/15 to-electric-blue/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon size={20} className="text-gold" />
              </div>
              <h4 className="font-semibold text-sm mb-2">{feature.title}</h4>
              <p className="text-xs text-muted/45 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Who is it for */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-8 md:p-12 rounded-3xl glass relative overflow-hidden mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/5 via-transparent to-deep-purple/5 pointer-events-none" />
          <div className="relative">
            <h3 className="text-2xl font-bold mb-8 text-center">¿Para quién es DevSactum?</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {audience.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5"
                >
                  <item.icon size={18} className="text-electric-blue shrink-0" />
                  <span className="text-sm text-muted/70">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Waitlist */}
        <Waitlist />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#waitlist"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-gold to-[#FFA500] text-[#050816] font-semibold text-sm hover:shadow-[0_0_50px_rgba(255,215,0,0.25)] transition-all duration-300"
          >
            <Globe size={18} />
            Únete a la Beta
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <p className="mt-4 text-xs text-muted/30">
            Regístrate para acceder anticipadamente a DevSactum Beta en Septiembre 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}
