"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Users, Landmark } from "lucide-react";

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  icon: React.ElementType;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    image: "/poli-landing-v2-1.jpg",
    title: "Polify AI",
    subtitle: "Smart Intelligence.",
    description: "Get real-time AI analysis on policy shifts, public sentiment, and political trends to make data-driven decisions.",
    accent: "text-kenya-gold",
    icon: Sparkles,
  },
  {
    id: 2,
    image: "/poli-landing-v2-2.webp",
    title: "The Baraza",
    subtitle: "Active Engagement.",
    description: "Connect directly with leaders in a verified digital square designed for transparent debate and community action.",
    accent: "text-kenya-red",
    icon: Shield,
  },
  {
    id: 3,
    image: "/poli-landing-v2-3.webp",
    title: "Tallying Center",
    subtitle: "Pure Integrity.",
    description: "Monitor elections with citizen-led, crowd-verified data tracking that ensures every vote is accounted for and transparent.",
    accent: "text-blue-400",
    icon: Landmark,
  },
  {
    id: 4,
    image: "/poli-landing-v2-4.jpg",
    title: "The Marketplace",
    subtitle: "Political Economy.",
    description: "Access a secure hub for campaign resources, political services, and verified merchandise to power your movement.",
    accent: "text-kenya-green",
    icon: Users,
  },
];

export function LandingCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={SLIDES[current].id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={SLIDES[current].image}
            alt={SLIDES[current].title}
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-black/90" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Logo Overlay */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-30">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative h-20 w-60 md:h-24 md:w-80"
        >
          <Image
            src="/images/polify-logo-v3.png"
            alt="PoliFy Kenya"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text Content */}
          <div className="text-left space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={SLIDES[current].id}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                  {React.createElement(SLIDES[current].icon, { className: `w-4 h-4 ${SLIDES[current].accent}` })}
                  <span className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em]">
                    {SLIDES[current].title}
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
                  {SLIDES[current].subtitle.split(' ').map((word, i) => (
                    <span key={i} className={i === SLIDES[current].subtitle.split(' ').length - 1 ? SLIDES[current].accent : ""}>
                      {word}{" "}
                    </span>
                  ))}
                </h1>

                <p className="text-lg md:text-xl text-white/60 font-medium leading-relaxed max-w-lg">
                  {SLIDES[current].description}
                </p>

                <div className="pt-8 flex items-center gap-6">
                  <a 
                    href="/auth"
                    onClick={() => {
                      window.location.href = "/auth";
                    }}
                    className="group relative inline-flex items-center gap-4 bg-kenya-green hover:bg-kenya-green/90 text-white px-8 py-4 rounded-xl font-black text-base transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,140,81,0.3)] cursor-pointer no-underline"
                  >
                    Continue to Platform
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>

                  {/* Progress Indicators (Dots) */}
                  <div className="flex gap-2">
                    {SLIDES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`transition-all duration-500 rounded-full ${
                          current === i ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Visual Accent (Optional/Decorative) */}
          <div className="hidden md:block relative h-[500px] w-full">
             <AnimatePresence mode="wait">
                <motion.div
                   key={SLIDES[current].id}
                   initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                   animate={{ opacity: 1, scale: 1, rotate: 0 }}
                   exit={{ opacity: 0, scale: 1.2, rotate: 5 }}
                   transition={{ duration: 1, ease: "anticipate" }}
                   className="absolute inset-0 flex items-center justify-center"
                >
                   <div className="relative w-full h-full rounded-4xl overflow-hidden border border-white/10 shadow-2xl">
                      <Image 
                        src={SLIDES[current].image}
                        alt="Preview"
                        fill
                        className="object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-linear-to-tr from-black via-transparent to-black/20" />
                   </div>
                </motion.div>
             </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Decorative HUD Elements */}
      <div className="absolute bottom-10 left-10 z-20 hidden md:block">
        <div className="flex items-center gap-3 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
            <div className="w-10 h-px bg-white/20" />
            Kenya Digital Republic
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-1.5 flex z-30">
        <div className="flex-1 bg-black" />
        <div className="flex-1 bg-kenya-red" />
        <div className="flex-1 bg-kenya-green" />
      </div>

      {/* Scanline Overlay */}
      <div className="absolute inset-0 bg-scanline opacity-[0.03] pointer-events-none z-40" />
    </div>
  );
}
