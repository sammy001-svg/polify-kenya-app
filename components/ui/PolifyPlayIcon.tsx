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
      "relative flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:scale-110 hover:bg-black/60 transition-all duration-300 group/play",
      sizeClasses[size],
      className
    )}>
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 rounded-full bg-linear-to-r from-kenya-red/20 via-white/5 to-kenya-green/20 animate-spin-slow opacity-0 group-hover/play:opacity-100 transition-opacity" />
      
      {/* Play Triangle */}
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "relative z-10 translate-x-0.5",
          size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-10 h-10'
        )}
      >
        <path 
          d="M5 3L19 12L5 21V3Z" 
          fill="currentColor" 
          className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        />
      </svg>

      {/* Kenya Flag Decorative Border Segment */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-linear-to-r from-kenya-red via-white to-kenya-green rounded-full opacity-80" />
    </div>
  );
}
