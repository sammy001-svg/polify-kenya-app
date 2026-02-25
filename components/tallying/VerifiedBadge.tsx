"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface VerifiedBadgeProps {
  variant?: "small" | "large";
}

export function VerifiedBadge({ variant = "small" }: VerifiedBadgeProps) {
  if (variant === "large") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full h-full flex flex-col items-center justify-center bg-kenya-green/2 border border-kenya-green/20 rounded-3xl relative overflow-hidden p-6"
      >
        {/* Animated Background Layers */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-kenya-green/10 to-transparent opacity-40" />
        
        {/* Multi-Ring Spinner Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute w-[180px] h-[180px] border border-dashed border-kenya-green/40 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute w-[140px] h-[140px] border border-kenya-green/20 rounded-full"
          />
        </div>

        <div className="relative z-10 flex items-center gap-5 mt-4">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-kenya-green/20 blur-xl rounded-full" />
            <div className="w-16 h-16 rounded-full border-4 border-kenya-green flex items-center justify-center bg-black relative shadow-[0_0_30px_rgba(0,255,128,0.4)]">
               <CheckCircle2 className="h-9 w-9 text-kenya-green" />
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-3xl font-black tracking-tighter text-white uppercase holographic-glow">
              VERIFIED
            </span>
            <div className="h-px w-full bg-linear-to-r from-kenya-green to-transparent mt-1" />
            <span className="text-[10px] font-mono text-kenya-green/60 uppercase tracking-widest mt-1">
              Secured Data Stream 
            </span>
          </div>
        </div>

        {/* HUD Decoration */}
        <div className="absolute top-4 left-4 flex gap-1">
          <div className="w-1 h-3 bg-kenya-green" />
          <div className="w-4 h-3 bg-kenya-green/20" />
        </div>
        <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20">
          AUTH_CODE: 00-KH-27
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-3 px-6 py-2 bg-black/40 border-2 border-kenya-green/50 rounded-xl relative group overflow-hidden"
    >
      <div className="absolute inset-0 bg-kenya-green/10 animate-pulse" />
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-kenya-green to-transparent animate-scanline" />
      
      <CheckCircle2 className="h-5 w-5 text-kenya-green animate-pulse-neon relative z-10" />
      <span className="text-sm font-black tracking-[0.2em] text-kenya-green relative z-10 holographic-glow">
        VERIFIED
      </span>

      {/* Futuristic corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-kenya-green" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-kenya-green" />
    </motion.div>
  );
}

