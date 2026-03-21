"use client";

import { AIConsultant } from "@/components/policy/AIConsultant";
import { motion } from "framer-motion";
import { Sparkles, BrainCircuit } from "lucide-react";

export default function PolicyIdeasPage() {
  return (
    <div className="min-h-screen py-12 px-4 space-y-12 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 blur-[120px] rounded-full animate-pulse" />
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-kenya-gold/10 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      {/* Header Area */}
      <div className="relative z-10 text-center space-y-6 max-w-3xl mx-auto pt-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl"
        >
          <Sparkles className="w-4 h-4 text-brand-primary" />
          <span className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-primary italic">Intelligence Channel v4.2</span>
          <div className="w-1.5 h-1.5 rounded-full bg-kenya-green animate-pulse" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none"
        >
          Polify AI <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-primary via-kenya-gold to-brand-primary animate-gradient font-black italic">Consultant</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-brand-text-muted font-medium"
        >
          Your direct line to Kenyan policy intelligence. Ask anything, formulate proposals, or analyze national impacts.
        </motion.p>
      </div>

      {/* Conversational Interface */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <AIConsultant />
      </motion.div>

      {/* Aesthetic Footer Note */}
      <div className="relative z-10 text-center flex items-center justify-center gap-4 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700 pb-12">
        <BrainCircuit className="w-8 h-8 text-white" />
        <div className="text-left">
           <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1">Polify Neural Node</p>
           <p className="text-[9px] font-bold text-brand-text-muted uppercase tracking-[0.2em]">Ready for citizen engagement</p>
        </div>
      </div>
    </div>
  );
}
