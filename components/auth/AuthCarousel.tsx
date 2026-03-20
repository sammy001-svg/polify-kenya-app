"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  {
    src: "/images/auth/carousel-1.jpg",
    alt: "Empowering Your Vote",
    title: "Empowering Your Vote",
    description: "Track your political impact and contribute to a more transparent Kenya. Your participation is the foundation of our democracy."
  },
  {
    src: "/images/auth/carousel-2.jpg",
    alt: "Data-Driven Accountability",
    title: "Data-Driven Accountability",
    description: "Stay informed with real-time insights into government spending and legislative progress. Knowledge is power."
  },
  {
    src: "/images/auth/carousel-3.jpg",
    alt: "Community-Led Change",
    title: "Community-Led Change",
    description: "Connect with other citizens to report issues and advocate for better service delivery in your constituency."
  },
];

export function AuthCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Image every 6 seconds for better reading time

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full bg-[#0D0D0D]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image with Ken Burns Effect */}
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "linear" }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-cover opacity-60"
              priority
              quality={100}
              sizes="60vw"
            />
          </motion.div>

          {/* Overlay Gradient for Text Readability */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent z-10" />

          {/* Marketing Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 lg:p-20 pb-24">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-xl space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-kenya-red rounded-full" />
                <span className="text-kenya-gold font-black uppercase tracking-[0.3em] text-sm">
                  PoliFy Kenya Insights
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight">
                {images[currentIndex].title}
              </h2>
              
              <p className="text-lg text-white/80 leading-relaxed font-medium">
                {images[currentIndex].description}
              </p>

              <div className="pt-4 flex gap-4">
                 <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 text-xs font-bold text-white uppercase tracking-widest">
                    Citizen Powered
                 </div>
                 <div className="px-4 py-2 bg-kenya-green/20 backdrop-blur-md rounded-lg border border-kenya-green/30 text-xs font-bold text-kenya-green uppercase tracking-widest">
                    AI Verified
                 </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Carousel Indicators */}
      <div className="absolute bottom-12 left-12 lg:left-20 flex gap-3 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              index === currentIndex 
                ? "bg-kenya-gold w-12" 
                : "bg-white/20 w-4 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
