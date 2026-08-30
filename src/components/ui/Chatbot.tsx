"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  HelpCircle,
  Building2,
  Rocket,
  Code2,
  Users,
  Calendar,
  MapPin,
  ArrowUpRight,
  RotateCcw,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
  options?: QuickOption[];
}

interface QuickOption {
  label: string;
  action: string;
  icon?: React.ReactNode;
}

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
  followUp?: QuickOption[];
}

const categories = [
  { id: "general", label: "General", icon: Building2 },
  { id: "devsactum", label: "DevSactum", icon: Rocket },
  { id: "tecnologia", label: "Tecnología", icon: Code2 },
  { id: "carreras", label: "Carreras", icon: Users },
  { id: "contacto", label: "Contacto", icon: MapPin },
];

const faqDatabase: FAQItem[] = [
  // GENERAL
  {
    id: "que-es-drakkar",
    category: "general",
    question: "¿Qué es Dräkkar Labs?",
    answer: "Dräkkar Labs es una startup tecnológica fundada en 2026, con sede en La Pintana, Santiago, Chile. Nos especializamos en:\n\n- Inteligencia Artificial\n- Infraestructura Cloud-Native\n- Herramientas para Desarrollo de Software\n\nNuestra misión es ingeniar infraestructura que potencie la evolución del software moderno.",
    keywords: ["drakkar", "labs", "startup", "que es", "empresa", "compañia"],
    followUp: [
      { label: "¿Qué es DevSactum?", action: "que-es-devsactum", icon: <Rocket size={14} /> },
      { label: "¿Dónde están ubicados?", action: "ubicacion", icon: <MapPin size={14} /> },
    ],
  },
  {
    id: "mision",
    category: "general",
    question: "¿Cuál es su misión?",
    answer: "Nuestra misión es ingeniar infraestructura inteligente y plataformas que permitan a las organizaciones construir, escalar y desplegar tecnología con una velocidad, fiabilidad y precisión sin precedentes.\n\nCreemos en el poder de la tecnología para transformar industrias y mejorar vidas.",
    keywords: ["mision", "objetivo", "proposito", "meta"],
  },
  {
    id: "valores",
    category: "general",
    question: "¿Cuáles son sus valores?",
    answer: "Nuestros valores fundamentales son:\n\n- Excelencia en Ingeniería\n- Pensamiento Visionario\n- Escala Global\n- Confianza y Seguridad\n- Innovación Incansable\n- Ecosistema Abierto\n\nCada sistema que construimos refleja estos principios.",
    keywords: ["valores", "principios", "cultura", "filosofia"],
  },
  {
    id: "fundacion",
    category: "general",
    question: "¿Cuándo se fundó Dräkkar Labs?",
    answer: "Dräkkar Labs fue fundada en 2026 en Santiago, Chile. Somos una startup joven con ambición global, enfocada en construir productos tecnológicos que hagan la diferencia.\n\nPrimer producto en desarrollo: DevSactum",
    keywords: ["fundacion", "cuando", "año", "creacion", "inicio", "nacio"],
  },

  // DEVSACTUM
  {
    id: "que-es-devsactum",
    category: "devsactum",
    question: "¿Qué es DevSactum?",
    answer: "DevSactum es nuestra red social diseñada para la comunidad de desarrollo de software. Es un espacio donde:\n\n- Conectas con desarrolladores globalmente\n- Compartes código con syntax highlighting\n- Participas en debates técnicos\n- Accedes a tutoriales y recursos\n- Compartes contenido multimedia\n- Exploras oportunidades laborales\n- Te conectas con mentores y educadores\n\nBeta: 5 de marzo de 2027",
    keywords: ["devsactum", "red social", "plataforma", "app", "producto"],
    followUp: [
      { label: "¿Cuándo sale la beta?", action: "beta-fecha", icon: <Calendar size={14} /> },
      { label: "¿Es gratis?", action: "devsactum-precio", icon: <HelpCircle size={14} /> },
      { label: "¿Cómo me registro?", action: "registro-beta", icon: <Rocket size={14} /> },
    ],
  },
  {
    id: "beta-fecha",
    category: "devsactum",
    question: "¿Cuándo sale la beta de DevSactum?",
    answer: "La beta de DevSactum está programada para 5 de marzo de 2027.\n\nEstamos en plena fase de desarrollo y la beta será accesible para los primeros registros.\n\n¿Quieres ser de los primeros en probarla?",
    keywords: ["beta", "fecha", "lanzamiento", "5 de marzo de 2027", "cuando", "salida"],
    followUp: [
      { label: "Quiero registrarme", action: "registro-beta", icon: <Rocket size={14} /> },
    ],
  },
  {
    id: "registro-beta",
    category: "devsactum",
    question: "¿Cómo me registro para la beta?",
    answer: "Para acceder a la beta de DevSactum:\n\n1. Haz scroll hasta la sección de Contacto\n2. Completa el formulario indicando tu interés en DevSactum\n3. Te contactaremos cuando esté lista la beta\n\nTambién puedes seguirnos en nuestras redes sociales para actualizaciones.",
    keywords: ["registro", "inscribirse", "anotarse", "como", "unirme", "acceder"],
    followUp: [
      { label: "Ir a Contacto", action: "ir-contacto", icon: <ArrowUpRight size={14} /> },
    ],
  },
  {
    id: "devsactum-precio",
    category: "devsactum",
    question: "¿DevSactum es gratis?",
    answer: "Sí, DevSactum será gratuito para usuarios individuales.\n\nOfreceremos:\n\n- Plan Gratis: Todas las funciones base\n- Plan Premium: Funciones avanzadas para profesionales\n- Plan Enterprise: Para empresas y equipos\n\nLos detalles exactos se publicarán antes del lanzamiento beta.",
    keywords: ["gratis", "precio", "costo", "planes", "premium", "pago", "cuanto cuesta"],
  },
  {
    id: "funciones-devsactum",
    category: "devsactum",
    question: "¿Qué funciones tendrá DevSactum?",
    answer: "DevSactum incluirá:\n\n- Feed de Código: Publica snippets con syntax highlighting\n- Debates Técnicos: Discute arquitecturas y frameworks\n- Tutoriales: Contenido educativo de la comunidad\n- Streaming: Comparte livestreams y demos\n- Job Board: Oportunidades de empleo tech\n- Mentoría: Conecta con mentores experimentados\n- Perfiles de Empresa: Startups y empresas tech\n- Analytics: Métricas de tu actividad\n\nY mucho más por venir.",
    keywords: ["funciones", "features", "que tiene", "que puedo hacer", "opciones"],
  },
  {
    id: "devsactum-audiencia",
    category: "devsactum",
    question: "¿Para quién es DevSactum?",
    answer: "DevSactum está diseñado para:\n\n- Desarrolladores de Software: Frontend, Backend, Fullstack\n- Startups y Empresas: Recluta talento tech\n- Estudiantes de Programación: Aprende y conecta\n- Profesores: Comparte conocimiento\n- Creadores de Contenido Tech: Crea y monetiza\n- Ingenieros de IA: Comparte proyectos de ML/AI\n\nSi construyes tecnología, DevSactum es para ti.",
    keywords: ["audiencia", "para quien", "usuarios", "desarrolladores", "programadores"],
  },

  // TECNOLOGÍA
  {
    id: "stack",
    category: "tecnologia",
    question: "¿Qué tecnologías usan?",
    answer: "Nuestro stack tecnológico incluye:\n\nFrontend:\n- Next.js 16, React 19, TypeScript, TailwindCSS\n\nBackend:\n- Node.js, NestJS, GraphQL, REST APIs\n\nInfraestructura:\n- Docker, Kubernetes, Terraform\n\nDatos:\n- PostgreSQL, Redis, Kafka\n\nIA/ML:\n- Python, TensorFlow, PyTorch\n\nDevOps:\n- GitHub Actions, CI/CD, GitOps",
    keywords: ["tecnologias", "stack", "lenguajes", "herramientas", "frameworks"],
  },
  {
    id: "arquitectura",
    category: "tecnologia",
    question: "¿Cómo es su arquitectura?",
    answer: "Nuestra arquitectura se basa en 4 capas:\n\n1. Presentación: Next.js, React, TypeScript\n2. API Gateway: GraphQL, REST, gRPC\n3. Servicios: Motor IA, Core Platform, Analytics\n4. Infraestructura: Kubernetes, Terraform, Prometheus\n\nDiseñada para:\n- Rendimiento extremo\n- Auto-escalabilidad\n- Seguridad en cada capa\n- Despliegue multi-region",
    keywords: ["arquitectura", "sistema", "estructura", "capas"],
  },
  {
    id: "open-source",
    category: "tecnologia",
    question: "¿Tienen proyectos open source?",
    answer: "Sí, estamos comprometidos con el código abierto.\n\nPróximamente publicaremos:\n- Componentes reutilizables\n- Herramientas de desarrollo\n- Documentación y guías\n\nSíguenos en GitHub para estar al tanto:\ngithub.com/gpb-industries/DRAKKAR",
    keywords: ["open source", "codigo abierto", "github", "repositorio"],
  },

  // CARRERAS
  {
    id: "trabajar",
    category: "carreras",
    question: "¿Puedo trabajar con ustedes?",
    answer: "¡Sí! Estamos buscando personas con ganas de aprender para nuestro equipo.\n\nPosiciones abiertas (todas trainee):\n\n- Trainee Frontend Developer - Equipo DevSactum\n- Trainee Backend Developer - Equipo DevSactum\n- Trainee UI/UX Designer - Equipo DevSactum\n- Trainee AI Engineer - Investigación\n- Trainee DevOps / Platform - Infraestructura\n- Trainee Developer Advocate - DevSactum\n\nTodas las posiciones son 100% remotas. No necesitas experiencia previa, solo ganas de aprender y crecer.",
    keywords: ["trabajo", "empleo", "carrera", "equipo", "contratar", "remoto", "vacantes"],
    followUp: [
      { label: "Ver posiciones", action: "ver-carreras", icon: <Users size={14} /> },
    ],
  },
  {
    id: "cultura",
    category: "carreras",
    question: "¿Cómo es la cultura de trabajo?",
    answer: "En Dräkkar Labs valoramos:\n\n- Remoto-Primero: Trabaja desde cualquier parte\n- Alto Rendimiento: Estándares de excelencia\n- Innovación: 20% del tiempo para I+D\n- Equipos de Élite: Autónomos y expertos\n- Aprendizaje Continuo: Crecimiento constante\n- Work-Life Balance: Equilibrio vida-trabajo\n\nCreemos en el talento, no en la oficina.",
    keywords: ["cultura", "ambiente", "work life balance", "remoto", "equipo"],
  },
  {
    id: "beneficios",
    category: "carreras",
    question: "¿Qué beneficios ofrecen?",
    answer: "Beneficios de trabajar en Dräkkar Labs:\n\n- Salarios competitivos al nivel del mercado global\n- 100% Remoto: Sin commuting\n- Aprendizaje: Presupuesto para cursos y conferencias\n- Equipamiento: Setup de home office\n- Salud: Seguro médico\n- Vacaciones: Política flexible\n- Equity: Participación en la empresa para roles clave\n\nY un equipo increíble con el que construir el futuro.",
    keywords: ["beneficios", "salario", "vacaciones", "seguro", "perks"],
  },

  // CONTACTO
  {
    id: "ubicacion",
    category: "contacto",
    question: "¿Dónde están ubicados?",
    answer: "Sede Central:\nLa Pintana, Santiago, Chile\n\nSomos un equipo 100% remoto, por lo que no contamos con oficinas físicas abiertas al público.\n\nPuedes contactarnos a través de:\n- Formulario de contacto en esta página\n- Nuestras redes sociales (próximamente)",
    keywords: ["ubicacion", "oficina", "sede", "chile", "santiago", "donde"],
  },
  {
    id: "contactar",
    category: "contacto",
    question: "¿Cómo puedo contactarlos?",
    answer: "Puedes contactarnos de varias formas:\n\n- Formulario: Usa el formulario en la sección de Contacto\n- GitHub: github.com/gpb-industries/DRAKKAR\n- LinkedIn: Próximamente\n- Twitter/X: Próximamente\n\nResponderemos lo antes posible.",
    keywords: ["contactar", "contacto", "comunicarse", "hablar", "escribir"],
    followUp: [
      { label: "Ir a Contacto", action: "ir-contacto", icon: <ArrowUpRight size={14} /> },
    ],
  },
  {
    id: "ir-contacto",
    category: "contacto",
    question: "Navegando a Contacto...",
    answer: "scroll-contacto",
    keywords: [],
  },
  {
    id: "ir-carreras",
    category: "carreras",
    question: "Navegando a Carreras...",
    answer: "scroll-careers",
    keywords: [],
  },
];

function findBestMatch(input: string): FAQItem | null {
  const lower = input.toLowerCase().trim();

  // Exact match in keywords
  for (const faq of faqDatabase) {
    if (faq.keywords.some((kw) => lower === kw || lower.includes(kw))) {
      return faq;
    }
  }

  // Partial match
  for (const faq of faqDatabase) {
    if (faq.keywords.some((kw) => lower.split(" ").includes(kw))) {
      return faq;
    }
  }

  return null;
}

function getBotResponse(input: string): { text: string; options?: QuickOption[] } {
  const lower = input.toLowerCase().trim();

  // Greetings
  if (/^(hola|buenas|hey|saludos|que tal|buenos|buenas dias|buenas tardes|buenas noches)/i.test(lower)) {
    return {
      text: "Hola, bienvenido a Dräkkar Labs. Soy tu asistente virtual.\n\n¿En qué puedo ayudarte hoy?",
      options: [
        { label: "¿Qué es Dräkkar Labs?", action: "que-es-drakkar", icon: <Building2 size={14} /> },
        { label: "DevSactum", action: "que-es-devsactum", icon: <Rocket size={14} /> },
        { label: "Ver carreras", action: "trabajar", icon: <Users size={14} /> },
      ],
    };
  }

  // Thanks
  if (/^(gracias|thanks|thx|agradezco)/i.test(lower)) {
    return {
      text: "De nada, estoy aquí si tienes más preguntas.\n\n¿Hay algo más en lo que pueda ayudarte?",
      options: [
        { label: "Volver al inicio", action: "inicio", icon: <RotateCcw size={14} /> },
      ],
    };
  }

  // Help
  if (/^(ayuda|help|opciones|que puedo)/i.test(lower)) {
    return {
      text: "Puedo ayudarte con estas áreas:",
      options: [
        { label: "General", action: "que-es-drakkar", icon: <Building2 size={14} /> },
        { label: "DevSactum", action: "que-es-devsactum", icon: <Rocket size={14} /> },
        { label: "Tecnología", action: "stack", icon: <Code2 size={14} /> },
        { label: "Carreras", action: "trabajar", icon: <Users size={14} /> },
        { label: "Contacto", action: "ubicacion", icon: <MapPin size={14} /> },
      ],
    };
  }

  // FAQ match
  const match = findBestMatch(lower);
  if (match) {
    if (match.answer === "scroll-contacto") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      return { text: "Te redirijo a la sección de Contacto." };
    }
    if (match.answer === "scroll-careers") {
      document.getElementById("careers")?.scrollIntoView({ behavior: "smooth" });
      return { text: "Te redirijo a la sección de Carreras." };
    }
    return { text: match.answer, options: match.followUp };
  }

  // Default
  return {
    text: "No tengo una respuesta exacta para eso, pero puedo ayudarte con:\n\n- Sobre Dräkkar Labs\n- DevSactum\n- Tecnología\n- Carreras\n- Contacto\n\n¿Qué te gustaría saber?",
    options: [
      { label: "General", action: "que-es-drakkar", icon: <Building2 size={14} /> },
      { label: "DevSactum", action: "que-es-devsactum", icon: <Rocket size={14} /> },
      { label: "Tecnología", action: "stack", icon: <Code2 size={14} /> },
    ],
  };
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3" role="status" aria-live="polite">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-gold/60"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 0.6,
              delay: i * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <span className="text-[10px] text-muted/30 ml-1">escribiendo...</span>
    </div>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const msgIdCounter = useRef(0);

  const nextMsgId = () => {
    msgIdCounter.current += 1;
    return `msg-${msgIdCounter.current}`;
  };

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            id: "welcome",
            text: "Bienvenido a **Dräkkar Labs**.\n\nSoy tu asistente virtual. Puedo ayudarte con información sobre nuestra empresa, DevSactum, tecnología, carreras y más.\n\n¿Qué te gustaría saber?",
            sender: "bot",
            timestamp: new Date(),
            options: [
              { label: "¿Qué es Dräkkar Labs?", action: "que-es-drakkar", icon: <Building2 size={14} /> },
              { label: "¿Qué es DevSactum?", action: "que-es-devsactum", icon: <Rocket size={14} /> },
              { label: "Ver carreras", action: "trabajar", icon: <Users size={14} /> },
              { label: "Contacto", action: "ubicacion", icon: <MapPin size={14} /> },
            ],
          },
        ]);
      }, 500);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        toggleButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleOptionClick = (action: string) => {
    const faq = faqDatabase.find((f) => f.id === action);
    if (!faq) return;

    const userMsg: Message = {
      id: nextMsgId(),
      text: faq.question,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setShowCategories(false);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        id: nextMsgId(),
        text: faq.answer,
        sender: "bot",
        timestamp: new Date(),
        options: faq.followUp,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 900);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: nextMsgId(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setShowCategories(false);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = getBotResponse(currentInput);
      const botMsg: Message = {
        id: nextMsgId(),
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
        options: response.options,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1100);
  };

  const handleReset = () => {
    setMessages([]);
    setShowCategories(true);
    setTimeout(() => {
      setMessages([
        {
          id: "welcome-reset",
          text: "Hola de nuevo. ¿En qué puedo ayudarte?",
          sender: "bot",
          timestamp: new Date(),
          options: [
            { label: "Dräkkar Labs", action: "que-es-drakkar", icon: <Building2 size={14} /> },
            { label: "DevSactum", action: "que-es-devsactum", icon: <Rocket size={14} /> },
            { label: "Tecnología", action: "stack", icon: <Code2 size={14} /> },
            { label: "Carreras", action: "trabajar", icon: <Users size={14} /> },
          ],
        },
      ]);
    }, 300);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        ref={toggleButtonRef}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3, duration: 0.5, type: "spring" }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-50 group"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        aria-expanded={isOpen}
      >
        <div className="relative">
          {/* Pulse ring */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl bg-gold"
              />
            )}
          </AnimatePresence>

          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-gold to-[#FFA500] text-[#050816] flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.3)] group-hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] transition-all duration-300">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={20} className="sm:w-[22px] sm:h-[22px]" />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <MessageCircle size={20} className="sm:w-[22px] sm:h-[22px]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-20 left-4 right-4 sm:bottom-24 sm:left-8 sm:right-auto z-50 w-auto sm:w-[400px] sm:max-w-[calc(100vw-4rem)] max-h-[60vh] rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)] border border-white/10 flex flex-col"
            style={{ background: "linear-gradient(180deg, #0A1020 0%, #050816 100%)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Chat con asistente"
          >
            {/* Header */}
            <div className="relative p-4 border-b border-white/5 shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-electric-blue/5 to-deep-purple/5" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-electric-blue/20 flex items-center justify-center">
                      <Bot size={20} className="text-gold" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-gold border-2 border-[#0A1020]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Dräkkar Assistant</h4>
                    <div className="flex items-center gap-1.5">
                      <HelpCircle size={10} className="text-gold" />
                      <span className="text-[10px] text-muted/40">En línea · Asistente Virtual</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleReset}
                    className="p-2 rounded-lg hover:bg-white/5 text-muted/40 hover:text-white transition-all"
                    aria-label="Reiniciar chat"
                  >
                    <RotateCcw size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      toggleButtonRef.current?.focus();
                    }}
                    className="p-2 rounded-lg hover:bg-white/5 text-muted/40 hover:text-white transition-all"
                    aria-label="Cerrar chat"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Categories */}
            <AnimatePresence>
              {showCategories && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b border-white/5 overflow-hidden shrink-0"
                >
                  <div className="p-3 flex gap-1.5 overflow-x-auto scrollbar-hide">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleOptionClick(
                          cat.id === "general" ? "que-es-drakkar" :
                          cat.id === "devsactum" ? "que-es-devsactum" :
                          cat.id === "tecnologia" ? "stack" :
                          cat.id === "carreras" ? "trabajar" :
                          "ubicacion"
                        )}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.03] text-muted/50 border border-white/5 hover:border-gold/20 hover:text-gold hover:bg-gold/5 transition-all duration-300 whitespace-nowrap shrink-0"
                      >
                        <cat.icon size={12} />
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div
              className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 scrollbar-thin"
              role="log"
              aria-live="polite"
              aria-label="Mensajes del chat"
            >
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                  >
                    {msg.sender === "bot" && (
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gold/20 to-electric-blue/20 flex items-center justify-center shrink-0 mt-1">
                        <Bot size={14} className="text-gold" />
                      </div>
                    )}
                    <div className={`max-w-[85%] ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                      <div
                        className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                          msg.sender === "user"
                            ? "bg-gradient-to-r from-gold/15 to-[#FFA500]/15 text-white border border-gold/20 rounded-br-md"
                            : "bg-white/[0.04] text-muted/80 border border-white/5 rounded-bl-md"
                        }`}
                      >
                        {msg.text.split("**").map((part, i) =>
                          i % 2 === 1 ? (
                            <strong key={i} className="text-white font-semibold">{part}</strong>
                          ) : (
                            <span key={i}>{part}</span>
                          )
                        )}
                      </div>
                      <div className={`text-[9px] text-muted/20 mt-1 px-1 ${msg.sender === "user" ? "text-right" : ""}`}>
                        {formatTime(msg.timestamp)}
                      </div>

                      {/* Quick options */}
                      {msg.options && msg.sender === "bot" && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {msg.options.map((opt) => (
                            <button
                              key={opt.action}
                              onClick={() => handleOptionClick(opt.action)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium bg-gold/5 text-gold/70 border border-gold/10 hover:border-gold/30 hover:text-gold hover:bg-gold/10 transition-all duration-300"
                            >
                              {opt.icon}
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {msg.sender === "user" && (
                      <div className="w-7 h-7 rounded-lg bg-deep-purple/20 flex items-center justify-center shrink-0 mt-1">
                        <User size={14} className="text-deep-purple" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gold/20 to-electric-blue/20 flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-gold" />
                  </div>
                  <div className="bg-white/[0.04] border border-white/5 rounded-2xl rounded-bl-md">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/5 bg-[#050816]/50 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <label htmlFor="chatbot-input" className="sr-only">
                  Escribe tu pregunta
                </label>
                <input
                  ref={inputRef}
                  id="chatbot-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  disabled={isTyping}
                  maxLength={500}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/5 text-sm text-white placeholder:text-muted/20 focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/10 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-electric-blue/20 border border-gold/20 flex items-center justify-center text-gold hover:from-gold/30 hover:to-electric-blue/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
