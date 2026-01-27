"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface PolifyPlayIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PolifyPlayIcon({ className, size = 'md' }: PolifyPlayIconProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20'
  };

  return (
    <div className={cn(
      "relative flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md transition-all duration-500 group/play shadow-[0_0_20px_rgba(0,0,0,0.5)]",
      sizeClasses[size],
      className
    )}>
      {/* Flag Colored Border Ring */}
      <div className="absolute inset-0 rounded-full border-2 border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-black via-kenya-green/40 to-kenya-green opacity-40 group-hover/play:opacity-60 transition-opacity" />
      </div>

      {/* Decorative Flag Accents */}
      <div className="absolute -inset-[2px] rounded-full border border-white/5 opacity-50" />
      
      {/* Inner Glow Circle */}
      <div className="absolute inset-1 rounded-full bg-linear-to-tr from-kenya-green/20 via-white/5 to-kenya-green/30 blur-sm group-hover/play:scale-110 transition-transform" />

      {/* Play Triangle */}
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "relative z-10 translate-x-0.5 transition-transform duration-300 group-hover/play:scale-110",
          size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-10 h-10'
        )}
      >
        <path 
          d="M5 3L19 12L5 21V3Z" 
          fill="currentColor" 
          className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
        />
      </svg>

      {/* Flag Stripe Underline (Small detail) */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1/3 h-0.5 flex gap-px opacity-80 z-10">
        <div className="flex-1 bg-black rounded-l" />
        <div className="flex-1 bg-kenya-green" />
        <div className="flex-1 bg-kenya-green rounded-r" />
      </div>
    </div>
  );
}
