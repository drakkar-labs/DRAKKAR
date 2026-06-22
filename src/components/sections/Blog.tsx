"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, ArrowUpRight, Clock, Tag } from "lucide-react";

const posts = [
  {
    title: "Presentando Dräkkar Labs: El Inicio de una Nueva Era",
    excerpt: "Contamos la historia detrás de nuestra fundación y por qué decidimos construir una empresa de tecnología desde Chile con visión global.",
    date: "2026",
    readTime: "5 min",
    category: "Empresa",
    featured: true,
  },
  {
    title: "DevSactum: Rediseñando la Red Social para Desarrolladores",
    excerpt: "Por qué creamos DevSactum y cómo planeamos resolver los problemas que las plataformas actuales no resuelven.",
    date: "2026",
    readTime: "8 min",
    category: "Producto",
    featured: true,
  },
  {
    title: "Nuestro Stack Tecnológico: Decisiones de Arquitectura",
    excerpt: "Un vistazo profundo a las tecnologías que elegimos y las razones detrás de cada decisión técnica.",
    date: "2026",
    readTime: "12 min",
    category: "Tecnología",
    featured: false,
  },
  {
    title: "Construyendo Cultura de Ingeniería en una Startup",
    excerpt: "Cómo establecimos nuestros valores de ingeniería desde el día uno y por qué importa más de lo que parece.",
    date: "2026",
    readTime: "6 min",
    category: "Cultura",
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  Empresa: "text-gold bg-gold/10 border-gold/20",
  Producto: "text-electric-blue bg-electric-blue/10 border-electric-blue/20",
  Tecnología: "text-deep-purple bg-deep-purple/10 border-deep-purple/20",
  Cultura: "text-crimson bg-crimson/10 border-crimson/20",
};

export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" className="relative py-32 overflow-hidden">
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
            <span className="text-xs font-medium text-muted/70 tracking-wider uppercase">Blog</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Últimas Publicaciones
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted/50 max-w-2xl mx-auto"
          >
            Artículos técnicos, novedades del producto y perspectivas sobre ingeniería de software.
          </motion.p>
        </div>

        {/* Featured posts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {posts.filter((p) => p.featured).map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative p-8 rounded-2xl glass-light hover:border-white/10 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full border ${categoryColors[post.category] || "text-muted/50 bg-white/5 border-white/10"}`}>
                    {post.category}
                  </span>
                  <ArrowUpRight size={16} className="text-muted/20 group-hover:text-gold transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-gold transition-colors">{post.title}</h3>
                <p className="text-sm text-muted/50 leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-[11px] text-muted/30">
                  <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Other posts */}
        <div className="grid md:grid-cols-2 gap-6">
          {posts.filter((p) => !p.featured).map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex items-start gap-4 p-6 rounded-xl glass-light hover:border-white/10 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-electric-blue/10 to-deep-purple/10 flex items-center justify-center shrink-0">
                <Tag size={16} className="text-electric-blue" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-full border ${categoryColors[post.category] || "text-muted/50"}`}>
                    {post.category}
                  </span>
                </div>
                <h4 className="font-semibold text-sm mb-1 group-hover:text-gold transition-colors">{post.title}</h4>
                <p className="text-xs text-muted/40 leading-relaxed mb-2">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-[10px] text-muted/25">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
