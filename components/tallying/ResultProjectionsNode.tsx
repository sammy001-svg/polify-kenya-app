"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export function ResultProjectionsNode() {
  return (
    <div className="relative w-full flex flex-col group h-full">
      {/* 1. DUAL ANGLED TITLE TABS */}
      <div className="flex flex-wrap items-end justify-between w-full z-20 px-2 gap-1 md:gap-0">
         {/* Left Tab: Status Summary */}
         <div className="relative flex w-full sm:w-fit min-w-0 sm:min-w-[160px] h-7 bg-[#091813] border-t border-l border-r border-[#18362A] [clip-path:polygon(0_0,calc(100%-12px)_0,100%_100%,0_100%)]">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00FF8C] shadow-[0_0_8px_#00FF8C]" />
            <div className="absolute inset-0 bg-linear-to-r from-[#00FF8C]/10 to-transparent pointer-events-none" />
            <div className="flex items-center px-3 w-full">
               <h3 className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-widest leading-none pt-0.5 truncate">STATUS SUMMARY</h3>
            </div>
         </div>

         {/* Right Tab: Result Projections */}
         <div className="relative flex w-full sm:w-fit min-w-0 sm:min-w-[160px] h-7 bg-[#091813] border-t border-l border-r border-[#18362A] [clip-path:polygon(0_0,calc(100%-12px)_0,100%_100%,0_100%)]">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00FF8C] shadow-[0_0_8px_#00FF8C]" />
            <div className="absolute inset-0 bg-linear-to-r from-[#00FF8C]/10 to-transparent pointer-events-none" />
            <div className="flex items-center px-3 w-full">
               <h3 className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-widest leading-none pt-0.5 truncate">RESULT PROJECTIONS</h3>
            </div>
         </div>
      </div>

      {/* 2. MAIN CARD BODY (Chamfered) */}
      <div className="relative z-10 -mt-px bg-[#06120E] border-2 border-[#18362A] p-3 md:p-4 [clip-path:polygon(0_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%)] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] flex-1 flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Inner Border Lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-[#00FF8C]/20" />
        <div className="absolute left-0 top-0 bottom-15 w-px bg-[#00FF8C]/10" />

        {/* Left Section: Status Summary Data */}
        <div className="flex-1 flex flex-col justify-center gap-4 border-r border-[#00FF8C]/10 pr-6">
           <div className="flex justify-between items-end border-b border-[#00FF8C]/10 pb-2">
             <span className="text-[10px] font-black text-[#00FF8C]/60 uppercase tracking-widest">Polling Stations Reported</span>
             <span className="text-2xl font-black text-white tracking-tighter drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">72%</span>
           </div>
           
           <div className="flex justify-between items-end">
             <span className="text-[10px] font-black text-[#00FF8C]/60 uppercase tracking-widest">Estimated Turnout</span>
             <div className="flex flex-col items-end">
                <span className="text-2xl font-black text-white tracking-tighter drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">13,450,997</span>
                <span className="text-[7px] font-mono text-[#00FF8C] uppercase flex items-center gap-1 mt-0.5">
                   <div className="w-1 h-1 bg-[#00FF8C] rounded-full animate-pulse" /> Sync_Verified
                </span>
             </div>
           </div>
        </div>

        {/* Right Section: Projections */}
        <div className="flex-1 flex items-center gap-4 bg-[#091813] border border-[#18362A] p-3 relative overflow-hidden">
           {/* Winner Photo with Sharp Borders */}
           <div className="relative w-16 h-[72px] shrink-0 border border-[#00FF8C]/30 bg-black overflow-hidden p-[2px]">
              <div className="relative w-full h-full overflow-hidden filter grayscale contrast-125">
                 <Image 
                    src="/images/candidates/william_ruto.png" 
                    alt="Projected Winner" 
                    fill 
                    className="object-cover object-top"
                 />
              </div>
           </div>

           <div className="flex flex-col">
              <span className="text-[8px] font-black text-[#00FF8C] uppercase tracking-[0.2em] mb-1">Projected Winner</span>
              <span className="text-lg font-black text-white uppercase tracking-tighter leading-tight drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">CANDIDATE A</span>
              <div className="flex items-center gap-1.5 mt-2 bg-[#00FF8C]/10 w-fit px-2 py-0.5 border border-[#00FF8C]/20">
                 <CheckCircle2 className="w-2.5 h-2.5 text-[#00FF8C]" />
                 <span className="text-[8px] font-black text-[#00FF8C] uppercase tracking-widest leading-none pt-0.5">99.8% Confidence</span>
              </div>
           </div>

           {/* Subtle background glow */}
           <div className="absolute right-0 bottom-0 w-24 h-24 bg-[#00FF8C]/5 blur-3xl rounded-full" />
        </div>

        {/* Bottom Right Decorative Triangle Cutout Accent */}
        <div className="absolute bottom-0 right-0 w-4 h-[2px] bg-[#00FF8C]/50" />
      </div>
    </div>
  );
}
