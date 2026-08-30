"use client";

import { motion } from "framer-motion";

export default function Chile() {
  return (
    <section className="relative py-12 lg:py-16 overflow-hidden border-t border-white/[0.04] bg-white/[0.01]">
      <div className="relative max-w-[1240px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row items-center justify-between gap-4 py-2">
          <h2 className="text-[18px] sm:text-[20px] font-black tracking-[-0.02em] text-white text-center md:text-left">FROM CHILE. <span className="text-white/20">BUILT FOR THE WORLD.</span></h2>
          <p className="text-[13px] leading-5 text-white/35 text-center md:text-right max-w-[440px]">Drakkar Labs nace desde Chile, pero piensa sin fronteras. Construimos productos y tecnología para internet.</p>
        </motion.div>
      </div>
    </section>
  );
}
