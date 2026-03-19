"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, Store, ShieldCheck } from "lucide-react";
import Image from "next/image";

const SLIDES = [
  {
    title: "Autonomous Oversight",
    description: "AI-driven content scanning ensures platform integrity and narrative security across all civic feeds.",
    icon: Zap,
    image: "/admin/oversight.png",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20"
  },
  {
    title: "Sovereign Treasury",
    description: "Detailed marketplace auditing and direct financial oversight for the Mkenya economic ecosystem.",
    icon: Store,
    image: "/admin/treasury.png",
    color: "text-brand-primary",
    bg: "bg-brand-primary/10",
    borderColor: "border-brand-primary/20"
  },
  {
    title: "Democratic Integrity",
    description: "Multi-layered professional verification for advocates and politicians to maintain high-trust governance.",
    icon: ShieldCheck,
    image: "/admin/integrity.png",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    borderColor: "border-blue-500/20"
  }
];

export function AdminMarketingCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-end p-12 overflow-hidden bg-[#050505]">
      {/* Background Images with Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.image}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src={slide.image} 
            alt={slide.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-lg mb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border backdrop-blur-md",
              slide.bg,
              slide.borderColor
            )}>
              <slide.icon className={cn("w-8 h-8", slide.color)} />
            </div>

            <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 font-mono leading-none">
              {slide.title}
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed font-medium max-w-md">
              {slide.description}
            </p>

            <div className="mt-8 flex gap-2">
              {SLIDES.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-1 rounded-full transition-all duration-700",
                    i === current ? "w-12 bg-brand-primary" : "w-3 bg-white/20"
                  )} 
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-12 left-12 flex items-center gap-2">
        <Shield className="w-5 h-5 text-kenya-red" />
        <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] opacity-40">
          State Registry Security Protocol v4.2
        </span>
      </div>
    </div>
  );
}

// Inline CN utility to avoid import issues if used in isolation
function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}
