"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollUp}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-gold hover:border-gold/30 hover:bg-gold/10 transition-all duration-300 group"
          aria-label="Volver arriba"
        >
          <ArrowUp
            size={18}
            className="group-hover:-translate-y-0.5 transition-transform"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
