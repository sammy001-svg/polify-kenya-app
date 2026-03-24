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
      <div className="relative z-10 -mt-px bg-white border-2 border-slate-200 p-3 md:p-4 [clip-path:polygon(0_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%)] shadow-2xl flex-1 flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Inner Border Lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-slate-100" />
        <div className="absolute left-0 top-0 bottom-15 w-px bg-slate-100" />

        {/* Left Section: Status Summary Data */}
        <div className="flex-1 flex flex-col justify-center gap-4 border-r border-slate-100 pr-6">
           <div className="flex justify-between items-end border-b border-slate-100 pb-2">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Polling Stations Reported</span>
             <span className="text-2xl font-black text-slate-900 tracking-tighter">72%</span>
           </div>
           
           <div className="flex justify-between items-end">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estimated Turnout</span>
             <div className="flex flex-col items-end">
                <span className="text-2xl font-black text-slate-900 tracking-tighter">13,450,997</span>
                <span className="text-[7px] font-mono text-brand-primary uppercase flex items-center gap-1 mt-0.5">
                   <div className="w-1 h-1 bg-brand-primary rounded-full animate-pulse" /> Sync_Verified
                </span>
             </div>
           </div>
        </div>

        {/* Right Section: Projections */}
        <div className="flex-1 flex items-center gap-4 bg-linear-to-r from-[#25671E] to-[#18362A] border border-[#18362A] p-3 relative overflow-hidden shadow-xl">
           {/* Gloss Overlay */}
           <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent pointer-events-none" />
           
           {/* Winner Photo with Sharp Borders */}
           <div className="relative w-16 h-[72px] shrink-0 border border-[#00FF8C]/30 bg-black/40 overflow-hidden p-[2px]">
              <div className="relative w-full h-full overflow-hidden filter grayscale contrast-125 brightness-110">
                 <Image 
                    src="/images/candidates/william_ruto.png" 
                    alt="Projected Winner" 
                    fill 
                    className="object-cover object-top"
                 />
              </div>
           </div>

           <div className="flex flex-col relative z-10">
              <span className="text-[8px] font-black text-white/50 uppercase tracking-[0.2em] mb-1 font-mono">Projected Winner</span>
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded-full bg-white p-1 flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.3)] shrink-0">
                    <Image src="/parties/uda-wheelbarrow.png" alt="UDA" width={20} height={20} className="object-contain" />
                 </div>
                 <span className="text-lg font-black text-white uppercase tracking-tighter leading-tight font-mono drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">DR. WILLIAM RUTO</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 bg-[#00FF8C]/10 w-fit px-2 py-0.5 border border-[#00FF8C]/20">
                 <CheckCircle2 className="w-2.5 h-2.5 text-[#00FF8C]" />
                 <span className="text-[8px] font-black text-[#00FF8C] uppercase tracking-widest leading-none pt-0.5">99.8% Confidence</span>
              </div>
           </div>

           {/* Subtle background glow */}
           <div className="absolute right-0 bottom-0 w-24 h-24 bg-[#00FF8C]/5 blur-3xl rounded-full" />
        </div>

        {/* Bottom Right Decorative Triangle Cutout Accent */}
        <div className="absolute bottom-0 right-0 w-4 h-[2px] bg-slate-200" />
      </div>
    </div>
  );
}
