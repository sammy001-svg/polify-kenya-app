"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  LayoutDashboard, 
  Search, 
  Users, 
  UserCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase";

export function SystemTour() {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    const checkAuthAndShow = async () => {
      // Small Delay before checking session to ensure it's loaded
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const hasSeenTour = localStorage.getItem("polify-tour-seen");
      if (hasSeenTour) return;

      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);

      return () => clearTimeout(timer);
    };

    checkAuthAndShow();
  }, [supabase]);

  const steps = [
    {
      title: "Welcome to Polify Kenya!",
      description: "Ready to make an impact? Let's take a 30-second tour to understand how to use your command center.",
      icon: Sparkles,
      position: "center",
      accent: "bg-brand-primary"
    },
    {
      title: "Main Dashboard",
      description: "From Campaign HQ to the Tallying Centre, this section holds all your core activist tools and live updates.",
      icon: LayoutDashboard,
      position: "sidebar-top",
      accent: "bg-orange-500"
    },
    {
      title: "Intelligence Hub",
      description: "National Projects, Polify AI Analyst, and our Constitution decoder live here. Power your decisions with data.",
      icon: Search,
      position: "sidebar-middle",
      accent: "bg-blue-500"
    },
    {
      title: "Youth & Future",
      description: "Participate in Issue Hubs, Kenyan Groups, and find job opportunities. The future is built here.",
      icon: Users,
      position: "sidebar-bottom",
      accent: "bg-purple-500"
    },
    {
      title: "Personal Profile",
      description: "Manage your civic identity and track your progress through the gamified XP system.",
      icon: UserCircle,
      position: "sidebar-personal",
      accent: "bg-pink-500"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    localStorage.setItem("polify-tour-seen", "true");
  };

  if (!isVisible) return null;

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <div className="fixed inset-0 z-500 pointer-events-none flex items-center justify-center">
      {/* Backdrop with Animated Gradient Blur */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs pointer-events-auto"
        onClick={handleComplete}
      />

      {/* Dynamic Pointer Arrow */}
      {currentStep.position !== "center" && (
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           className="absolute left-[265px] z-500 flex items-center"
           style={
             currentStep.position === "sidebar-top" ? { top: "18%" } : 
             currentStep.position === "sidebar-middle" ? { top: "38%" } :
             currentStep.position === "sidebar-bottom" ? { top: "58%" } :
             currentStep.position === "sidebar-personal" ? { bottom: "13%" } : {}
           }
        >
          <motion.div 
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className={cn(
               "w-8 h-8 flex items-center justify-center text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]",
               currentStep.accent.replace("bg-", "text-")
            )}
          >
            <ChevronRight size={32} strokeWidth={4} />
          </motion.div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
           key={step}
           initial={{ opacity: 0, scale: 0.9, y: 20, x: currentStep.position === "center" ? 0 : -30 }}
           animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
           exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
           transition={{ type: "spring", damping: 25, stiffness: 200 }}
           className={cn(
             "relative z-500 w-full max-w-[340px] p-8 rounded-3xl bg-white dark:bg-zinc-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-brand-primary/10 pointer-events-auto",
             currentStep.position === "center" ? "" : "md:absolute md:left-[320px]"
           )}
           style={
             currentStep.position === "sidebar-top" ? { top: "15%" } : 
             currentStep.position === "sidebar-middle" ? { top: "35%" } :
             currentStep.position === "sidebar-bottom" ? { top: "55%" } :
             currentStep.position === "sidebar-personal" ? { bottom: "10%" } : {}
           }
        >
          {/* Animated Accent Glow */}
          <div className={cn(
            "absolute -top-12 -left-12 w-32 h-32 rounded-full opacity-20 blur-3xl transition-colors duration-500",
            currentStep.accent
          )} />

          {/* Close Button */}
          <button 
            onClick={handleComplete}
            className="absolute top-6 right-6 p-2 rounded-full text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all"
            aria-label="Skip Tour"
          >
            <X size={16} />
          </button>

          {/* Icon Section */}
          <div className="mb-8 flex items-baseline justify-between">
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transform -rotate-3 transition-colors duration-500",
              currentStep.accent
            )}>
              <Icon size={28} />
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Step {step + 1} of {steps.length}
            </div>
          </div>

          <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
            {currentStep.title}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-[13px] leading-relaxed mb-10 font-medium">
            {currentStep.description}
          </p>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
               onClick={handlePrev}
               disabled={step === 0}
               className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 disabled:opacity-0 transition-all"
            >
              <ChevronLeft size={16} />
              Prev
            </button>

            <button
              onClick={handleNext}
              className={cn(
                "px-6 py-3 rounded-2xl text-white font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl transition-all transform active:scale-[0.95] hover:brightness-110",
                currentStep.accent
              )}
            >
              {step === steps.length - 1 ? "Get Started" : "Next Step"}
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Step Indicators */}
          <div className="mt-8 flex gap-1.5 justify-center">
            {steps.map((_, i) => (
              <motion.div 
                key={i} 
                animate={{ 
                  width: i === step ? 24 : 6,
                  backgroundColor: i === step ? "var(--brand-primary)" : "rgba(128,128,128,0.2)"
                }}
                className="h-1.5 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
