"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

export function DataProcessingNodeV2() {
  const [isHovered, setIsHovered] = useState(false);
  const efficiency = 98;
  const highRiskAreas = 5;

  return (
    <div 
      className="relative w-full flex flex-col group h-full cursor-help"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. ANGLED TITLE TAB */}
      <div className="relative z-20 flex w-full md:w-fit min-w-0 md:min-w-[200px] h-8 bg-[#091813] border-t border-l border-r border-[#18362A] [clip-path:polygon(0_0,calc(100%-10px)_0,100%_100%,0_100%)] md:[clip-path:polygon(0_0,calc(100%-15px)_0,100%_100%,0_100%)]">
         <div className="absolute inset-0 bg-linear-to-r from-[#00FF8C]/10 to-transparent pointer-events-none" />
         <div className="flex items-center gap-2 px-3 w-full">
            <span className="text-[10px] font-black text-[#00FF8C] tracking-widest flex items-center gap-1">
              8% <span className="text-[8px]">▼</span>
            </span>
            <h3 className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest pl-2 border-l border-[#00FF8C]/30 h-full flex items-center truncate">
              DATA PROCESSING
            </h3>
         </div>
      </div>

      {/* 2. MAIN CARD BODY (Chamfered) */}
      <div className="relative z-10 -mt-px bg-white border-2 border-slate-200 p-3 md:p-4 [clip-path:polygon(0_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%)] shadow-2xl flex-1 flex flex-col gap-4">
        
        {/* AI ROLE TOOLTIP OVERLAY (Compact Side-Floating version) */}
        <AnimatePresence>
          {isHovered && (
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 20 }}
               className="absolute top-2 -right-2 z-50 w-[180px] bg-white backdrop-blur-xl p-3 border border-slate-300 shadow-2xl [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]"
             >
                <div className="flex flex-col gap-2">
                   <div className="flex items-center gap-2 border-b border-slate-100 pb-1">
                      <Info className="w-3.5 h-3.5 text-brand-primary" />
                      <span className="text-[8px] font-black text-brand-primary tracking-widest uppercase">AI ROLE</span>
                   </div>
                   <p className="text-[9px] font-bold text-slate-700 leading-relaxed tracking-wide uppercase">
                      <span className="text-brand-primary">poly 1 AI</span> is working to allocate each candidate&apos;s votes according to results streaming in from our data source
                   </p>
                   <div className="flex gap-1 self-end">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-0.5 h-0.5 bg-brand-primary rounded-full animate-pulse" />
                      ))}
                   </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>

        {/* Inner Border Lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-slate-100" />
        <div className="absolute left-0 top-0 bottom-15 w-px bg-slate-100" />

        <div className="flex flex-row items-center gap-4 justify-between w-full h-full pb-2 border-b border-slate-100">
           
           {/* Left: Efficiency Ring */}
           <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 flex items-center justify-center">
                 <svg className="w-full h-full -rotate-90">
                   <circle cx="32" cy="32" r="28" className="stroke-slate-100 stroke-4 fill-none" />
                   <motion.circle
                     cx="32"
                     cy="32"
                     r="28"
                     className="stroke-brand-primary stroke-4 fill-none"
                     strokeDasharray="175.9"
                     initial={{ strokeDashoffset: 175.9 }}
                     animate={{ strokeDashoffset: 175.9 * (1 - efficiency / 100) }}
                     transition={{ duration: 2, ease: "easeOut" }}
                   />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-black text-slate-900 tracking-tighter">{efficiency}<span className="text-sm">%</span></span>
                 </div>
              </div>
              <span className="text-[11px] font-black text-brand-primary uppercase tracking-[0.2em] leading-tight font-mono">EFFICIENCY</span>
           </div>

           {/* Right: High Risk Areas Stats Box */}
           <div className="flex flex-col items-center bg-slate-50 border border-slate-200 p-2 min-w-[80px]">
              <span className="text-3xl font-black text-slate-900 tracking-tighter">{highRiskAreas}</span>
              <div className="w-full h-1 flex gap-1 mt-1 opacity-80">
                 <div className="flex-1 bg-red-500" />
                 <div className="flex-1 bg-red-500" />
                 <div className="flex-1 bg-red-500" />
              </div>
              <span className="text-[7px] font-black text-red-500 uppercase tracking-widest mt-1 text-center w-full shadow-black drop-shadow-md">
                 ≡ HIGH RISK AREAS
              </span>
           </div>

        </div>

        {/* DATA DISTRIBUTION STREAM (Real-Time Visualization) */}
        <div className="flex-1 min-h-[80px] relative flex items-center justify-between px-4 overflow-hidden bg-slate-50 border border-slate-200 rounded-sm">
           {/* Background HUD Grid (Micro) */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-size-[10px_10px] pointer-events-none" />
           
           {/* Source Node (The Core) */}
           <div className="relative z-10 flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full border-2 border-brand-primary flex items-center justify-center bg-brand-primary/10">
                 <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 bg-brand-primary rounded-full"
                 />
              </div>
              <span className="text-[7px] font-black text-brand-primary uppercase tracking-widest font-mono">DRY_CORE</span>
           </div>

           {/* Flow Container */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-full h-full" preserveAspectRatio="none">
                 {/* Connection Paths */}
                 <motion.path 
                    d="M 60,40 C 140,40 160,20 250,20" 
                    fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1"
                    className="md:block hidden"
                 />
                 <motion.path 
                    d="M 60,40 L 250,40" 
                    fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1"
                 />
                 <motion.path 
                    d="M 60,40 C 140,40 160,60 250,60" 
                    fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1"
                    className="md:block hidden"
                 />

                 {/* Animated Particles */}
                 {[...Array(6)].map((_, i) => (
                    <motion.circle
                      key={i}
                      r="2"
                      fill="#25671E"
                      initial={{ offsetDistance: "0%" }}
                      animate={{ offsetDistance: "100%" }}
                      transition={{ 
                         duration: 2, 
                         repeat: Infinity, 
                         delay: i * 0.4,
                         ease: "linear" 
                      }}
                      style={{ 
                         offsetPath: i % 2 === 0 ? "path('M 60,40 L 250,40')" : "path('M 60,40 C 140,40 160,20 250,20')",
                         offsetRotate: "auto"
                      }}
                    />
                 ))}
              </svg>
           </div>

           {/* Target Nodes (Candidates) */}
           <div className="flex flex-col gap-2 relative z-10 mr-2">
              <div className="flex items-center gap-2">
                 <div className="w-4 h-1 bg-brand-primary" />
                 <span className="text-[8px] font-bold text-slate-400 font-mono">CAND_A</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-4 h-1 bg-brand-primary/50" />
                 <span className="text-[8px] font-bold text-slate-400 font-mono">CAND_B</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-4 h-1 bg-brand-primary/30" />
                 <span className="text-[8px] font-bold text-slate-400 font-mono">CAND_C</span>
              </div>
           </div>
        </div>

        {/* Bottom Status Info */}
        <div className="flex justify-between items-center text-[8px] font-mono text-slate-400 px-1">
           <span className="animate-pulse text-brand-primary">STREAM: ACTIVE</span>
           <span>LATENCY: 0.04ms</span>
        </div>

        {/* Bottom Right Decorative Triangle Cutout Accent */}
        <div className="absolute bottom-0 right-0 w-4 h-px bg-slate-200" />
      </div>
    </div>
  );
}
