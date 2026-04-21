"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Users, TrendingUp, ShieldCheck } from "lucide-react";

const SLIDES = [
  {
    id: "admin",
    icon: ShieldCheck,
    title: "Secure Administration",
    description: "Manage your party's operations, officials, and digital presence with enterprise-grade security and role-based access control.",
    color: "from-green-500/20 to-emerald-900/40",
    iconColor: "text-green-400"
  },
  {
    id: "analytics",
    icon: TrendingUp,
    title: "Real-time Voter Analytics",
    description: "Get deep insights into demographic shifts, voter sentiment, and campaign effectiveness across every ward, constituency, and county.",
    color: "from-blue-500/20 to-indigo-900/40",
    iconColor: "text-blue-400"
  },
  {
    id: "engagement",
    icon: Users,
    title: "Direct Citizen Engagement",
    description: "Run opinion polls, host virtual town halls, and communicate directly with your supporters on the largest civic platform in Kenya.",
    color: "from-purple-500/20 to-violet-900/40",
    iconColor: "text-purple-400"
  }
];

export function PartyMarketingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden p-8 sm:p-12 lg:p-20 bg-[#050505]">
      {/* Background animated elements */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] bg-linear-to-b ${SLIDES[currentIndex].color} opacity-30`}
          />
        </AnimatePresence>
      </div>

      <div className="z-10 w-full max-w-md">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-10 h-10 bg-brand-surface border border-white/10 rounded-lg flex items-center justify-center shadow-lg">
            <Landmark className="w-5 h-5 text-brand-primary" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">PoliFy</h2>
            <p className="text-[10px] text-brand-primary font-bold uppercase tracking-widest">Party Console</p>
          </div>
        </div>

        <div className="relative h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              {(() => {
                const CurrentIcon = SLIDES[currentIndex].icon;
                return (
                  <>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 mb-6 shadow-2xl ${SLIDES[currentIndex].iconColor}`}>
                      <CurrentIcon className="w-7 h-7" />
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4 tracking-tight">
                      {SLIDES[currentIndex].title}
                    </h3>
                    <p className="text-base text-brand-text-muted leading-relaxed">
                      {SLIDES[currentIndex].description}
                    </p>
                  </>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        <div className="flex items-center gap-3 mt-12">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Decorative cyber grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px"
        }}
      />
    </div>
  );
}
