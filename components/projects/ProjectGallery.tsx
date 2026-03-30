"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const PROJECT_GALLERY_SLIDES = [
  {
    title: "Nairobi Expressway",
    description: "The KES 88B elevated dual-carriageway transforming Nairobi's traffic flow and regional logistics.",
    image: "/thumb_bejo1zepgv1dghefwn5cc065cd55e27.jpg",
    color: "from-kenya-gold/40"
  },
  {
    title: "Makupa Bridge Connection",
    description: "Critical maritime infrastructure enhancing the connection between Mombasa Island and the mainland.",
    image: "/IMG_8926-1200x630.jpeg",
    color: "from-blue-600/40"
  },
  {
    title: "National Delivery Inspection",
    description: "Multi-agency teams monitoring the progress of Bottom-Up Economic Transformation projects across all counties.",
    image: "/IMG-20250720-WA0054-2048x1365-1.jpg",
    color: "from-kenya-green/40"
  }
];

export function ProjectGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROJECT_GALLERY_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-[3.5rem] overflow-hidden shadow-2xl group border border-white/5 bg-black/20 backdrop-blur-sm">
      <AnimatePresence mode="sync">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={PROJECT_GALLERY_SLIDES[currentIndex].image}
            alt={PROJECT_GALLERY_SLIDES[currentIndex].title}
            fill
            className="object-cover"
            priority
          />
          {/* HUD-Style Gradient Overlay */}
          <div className={cn(
            "absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent transition-colors duration-1000",
            PROJECT_GALLERY_SLIDES[currentIndex].color
          )} />
          
          {/* Geometric Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-kenya-red via-kenya-gold to-kenya-green opacity-30" />
          
          {/* Content Overlays */}
          <div className="absolute inset-x-0 bottom-0 p-8 md:p-16 z-10">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="max-w-3xl space-y-4"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-2xl">
                <span className="w-2 h-2 rounded-full bg-kenya-gold animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Project Spotlight</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.85]">
                {PROJECT_GALLERY_SLIDES[currentIndex].title}
              </h2>
              <p className="text-sm md:text-xl text-white/70 font-medium leading-relaxed max-w-2xl border-l-2 border-white/10 pl-6 py-2">
                {PROJECT_GALLERY_SLIDES[currentIndex].description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Line HUD */}
      <div className="absolute bottom-0 left-0 w-full h-[6px] bg-white/5 z-20">
        <motion.div 
          key={currentIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-linear-to-r from-kenya-gold to-kenya-red"
        />
      </div>

      {/* Control Dots */}
      <div className="absolute bottom-12 right-12 flex items-center gap-4 z-30">
        {PROJECT_GALLERY_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className="group relative p-2"
          >
            <div className={cn(
              "w-2 h-2 rounded-full transition-all duration-500",
              i === currentIndex 
                ? "bg-white scale-150 shadow-[0_0_15px_rgba(255,255,255,0.8)]" 
                : "bg-white/20 group-hover:bg-white/50"
            )} />
            {i === currentIndex && (
              <motion.div 
                layoutId="circle-indicator"
                className="absolute inset-0 border border-white rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
