"use client";

import { motion } from "framer-motion";

export function DataProcessingNodeV2() {
  const efficiency = 98;
  const highRiskAreas = 5;

  return (
    <div className="relative w-full flex flex-col group h-full">
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
      <div className="relative z-10 -mt-px bg-[#06120E] border-2 border-[#18362A] p-3 md:p-4 [clip-path:polygon(0_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%)] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] flex-1 flex flex-col gap-4">
        {/* Inner Border Lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-[#00FF8C]/20" />
        <div className="absolute left-0 top-0 bottom-15 w-px bg-[#00FF8C]/10" />

        <div className="flex flex-row items-center gap-4 justify-between w-full h-full pb-2 border-b border-[#00FF8C]/20">
           
           {/* Left: Efficiency Ring */}
           <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 flex items-center justify-center">
                 <svg className="w-full h-full -rotate-90 drop-shadow-[0_0_5px_#00FF8C]">
                   <circle cx="32" cy="32" r="28" className="stroke-[#00FF8C]/20 stroke-4 fill-none" />
                   <motion.circle
                     cx="32"
                     cy="32"
                     r="28"
                     className="stroke-[#00FF8C] stroke-4 fill-none"
                     strokeDasharray="175.9"
                     initial={{ strokeDashoffset: 175.9 }}
                     animate={{ strokeDashoffset: 175.9 * (1 - efficiency / 100) }}
                     transition={{ duration: 2, ease: "easeOut" }}
                   />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-black text-white tracking-tighter">{efficiency}<span className="text-sm">%</span></span>
                 </div>
              </div>
              <span className="text-[11px] font-black text-[#00FF8C] uppercase tracking-[0.2em] leading-tight">EFFICIENCY</span>
           </div>

           {/* Right: High Risk Areas Stats Box */}
           <div className="flex flex-col items-center bg-[#00FF8C]/5 border border-[#00FF8C]/20 p-2 min-w-[80px]">
              <span className="text-3xl font-black text-white tracking-tighter drop-shadow-[0_0_5px_white]">{highRiskAreas}</span>
              <div className="w-full h-1 flex gap-1 mt-1 opacity-80">
                 <div className="flex-1 bg-[#ff4444] shadow-[0_0_3px_#ff0000]" />
                 <div className="flex-1 bg-[#ff4444] shadow-[0_0_3px_#ff0000]" />
                 <div className="flex-1 bg-[#ff4444] shadow-[0_0_3px_#ff0000]" />
              </div>
              <span className="text-[7px] font-black text-[#ff4444] uppercase tracking-widest mt-1 text-center w-full shadow-black drop-shadow-md">
                 ≡ HIGH RISK AREAS
              </span>
           </div>

        </div>

        {/* Triangle Wave Display at Bottom */}
        <div className="flex items-center justify-between px-1 relative h-6">
           <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-[#00FF8C]/30" />
           {[...Array(9)].map((_, i) => (
             <motion.div 
                key={i}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                className="w-0 h-0 border-t-4 border-t-transparent border-l-[6px] border-l-[#00FF8C] border-b-4 border-b-transparent relative z-10 drop-shadow-[0_0_3px_#00FF8C]"
             />
           ))}
        </div>

        {/* Bottom Right Decorative Triangle Cutout Accent */}
        <div className="absolute bottom-0 right-0 w-4 h-px bg-[#00FF8C]/50" />
      </div>
    </div>
  );
}
