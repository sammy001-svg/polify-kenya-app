"use client";

import React from "react";
import { ANALYST_PERSONAS, AIAnalystPersona } from "@/lib/gamification";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AnalystAvatarsProps {
  activePersonaId?: string;
  isAnalyzing?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function AnalystAvatars({ activePersonaId, isAnalyzing, className, size = 'md' }: AnalystAvatarsProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-sm",
    md: "w-10 h-10 text-xl",
    lg: "w-14 h-14 text-3xl"
  };

  return (
    <TooltipProvider>
      <div className={cn("flex -space-x-3 items-center", className)}>
        {ANALYST_PERSONAS.map((persona, index) => {
          const isActive = activePersonaId === persona.id;
          
          return (
            <Tooltip key={persona.id}>
              <TooltipTrigger asChild>
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    zIndex: isActive ? 20 : 10 - index,
                  }}
                  className={cn(
                    "relative rounded-full border-2 bg-brand-surface-secondary flex items-center justify-center cursor-help transition-colors",
                    sizeClasses[size],
                    isActive ? "border-brand-primary shadow-lg shadow-brand-primary/20" : "border-white/10",
                    isAnalyzing && isActive && "animate-pulse"
                  )}
                >
                  <span className={isActive ? "grayscale-0" : "grayscale opacity-60"}>
                    {persona.avatar}
                  </span>
                  
                  {isAnalyzing && isActive && (
                    <span className="absolute inset-0 rounded-full border-2 border-brand-primary animate-ping opacity-75" />
                  )}
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-brand-surface border-white/10 p-3 rounded-xl backdrop-blur-xl">
                <div className="space-y-1">
                  <p className={cn("text-xs font-black uppercase tracking-widest", persona.color)}>
                    {persona.name}
                  </p>
                  <p className="text-[10px] font-bold text-white">{persona.role}</p>
                  <p className="text-[9px] text-brand-text-muted italic">{persona.specialty}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
        {isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
               "pl-6 font-black uppercase tracking-[0.2em] text-brand-primary animate-pulse",
               size === 'sm' ? "text-[8px]" : "text-[10px]"
            )}
          >
            Processing Intelligence...
          </motion.div>
        )}
      </div>
    </TooltipProvider>
  );
}
