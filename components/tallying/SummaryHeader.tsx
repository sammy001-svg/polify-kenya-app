"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
/* cspell:ignore Scanline, Sparkline */

const calculateTimeLeft = () => {
  const targetDate = new Date("2027-08-10T00:00:00").getTime();
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference <= 0) return null;

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export function SummaryHeader() {
  const [timeLeft, setTimeLeft] = useState<{days: number; hours: number; minutes: number; seconds: number} | null>(null);
  const [showCountdownTooltip, setShowCountdownTooltip] = useState(false);

  useEffect(() => {
    // Set initial time on client (deferred to avoid cascading render warning)
    const initial = calculateTimeLeft();
    const timeout = setTimeout(() => setTimeLeft(initial), 0);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="w-full flex flex-col xl:flex-row items-start justify-between gap-4 p-4 lg:p-6 z-50 relative">
      
      {/* 1. LEFT HUD MODULE: Data Streams */}
      <div className="relative w-full xl:w-auto min-w-[320px] bg-[#0A1612]/80 backdrop-blur-xl border border-[#18362A] p-4 pt-3 flex flex-col gap-3 group [clip-path:polygon(0_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%)] shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        {/* Glow accent */}
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#00FF8C]/50 to-transparent opacity-50" />
        <div className="absolute top-3 left-0 w-1 h-3 bg-[#00FF8C] shadow-[0_0_8px_#00FF8C]" />
        
         <div className="flex justify-between items-end pl-3">
            <span className="text-[8px] md:text-[10px] font-black text-white/70 uppercase tracking-widest">Data Streams Processed:</span>
            <span className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-none shadow-black drop-shadow-md">95<span className="text-xl">%</span></span>
         </div>
        
        <div className="h-2 w-full bg-[#00FF8C]/10 border border-[#00FF8C]/20 relative overflow-hidden">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: "95%" }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             className="h-full bg-[#00FF8C] shadow-[0_0_10px_#00FF8C] relative"
           >
              {/* Scanline inside progress */}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] bg-size-[200%_100%] animate-[shine_2s_infinite]" />
           </motion.div>
        </div>
        
        <div className="flex items-center gap-3">
           {/* Tiny Kenyan Flag Line */}
           <div className="w-6 h-[5px] flex flex-col opacity-90 border border-white/20">
              <div className="h-1/3 bg-black" />
              <div className="h-1/3 bg-[#ff0000]" />
              <div className="h-1/3 bg-[#00FF8C]" />
           </div>
           <span className="text-xs md:text-sm font-black text-white tracking-widest shadow-black drop-shadow-md">
              564 <span className="text-white/40 font-bold mx-0.5">/</span> <span className="text-white/80">600</span> <span className="text-[7px] md:text-[9px] text-white/50 tracking-widest ml-1 uppercase">Constituencies</span>
           </span>
        </div>
      </div>

      {/* 2. CENTER HUD MODULE: Main Title */}
      <div className="flex flex-col items-center justify-center flex-1 relative w-full lg:min-w-[600px]">
        {/* Main Title Box */}
        <div className="relative border border-[#00FF8C]/30 bg-[#06120E]/90 backdrop-blur-xl px-4 md:px-12 py-3 [clip-path:polygon(10px_0,calc(100%-10px)_0,100%_50%,calc(100%-10px)_100%,10px_100%,0_50%)] xl:[clip-path:polygon(15px_0,calc(100%-15px)_0,100%_50%,calc(100%-15px)_100%,15px_100%,0_50%)] shadow-[0_0_20px_rgba(0,255,140,0.1)] group w-full max-w-2xl lg:max-w-none">
           {/* Inner border lines */}
           <div className="absolute inset-x-4 top-1 h-px bg-[#00FF8C]/20" />
           <div className="absolute inset-x-4 bottom-1 h-px bg-[#00FF8C]/20" />
           <div className="absolute left-2 top-1/2 -translate-y-1/2 w-[2px] h-[40%] bg-[#00FF8C]/50" />
           <div className="absolute right-2 top-1/2 -translate-y-1/2 w-[2px] h-[40%] bg-[#00FF8C]/50" />

           <div className="flex items-center gap-2 md:gap-6 justify-center">
              <div className="hidden sm:block w-6 md:w-12 h-px bg-linear-to-r from-transparent via-[#00FF8C] to-transparent" />
              <h1 className="text-center text-sm md:text-xl xl:text-[28px] font-black text-white uppercase tracking-wider drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                 AI-POWERED ELECTION TALLYING CENTRE
              </h1>
              <div className="hidden sm:block w-6 md:w-12 h-px bg-linear-to-r from-transparent via-[#00FF8C] to-transparent" />
           </div>
        </div>

        {/* Subtitle Box (Hanging below) */}
        <div className="relative -mt-px border border-[#00FF8C]/40 bg-[#00FF8C]/10 backdrop-blur-xl px-8 py-1.5 [clip-path:polygon(0_0,100%_0,calc(100%-10px)_100%,10px_100%)]">
           <span className="text-[10px] font-bold text-[#00FF8C] uppercase tracking-[0.4em] drop-shadow-[0_0_5px_#00FF8C]">
              Real-Time Results Dashboard
           </span>
        </div>

        <div className="flex flex-col items-center mt-5 w-full">
           <div className="flex flex-col xl:flex-row items-center justify-center gap-4 xl:gap-8 w-full max-w-[1200px]">
              {/* 3. ELECTION DAY COUNTDOWN HUD */}
              <AnimatePresence>
                {timeLeft && (
                  <div 
                     className="relative"
                     onMouseEnter={() => setShowCountdownTooltip(true)}
                     onMouseLeave={() => setShowCountdownTooltip(false)}
                  >
                     <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1.5 md:gap-4 transition-all cursor-help"
                     >
                        {/* Decorative Left Wings */}
                        <div className="hidden sm:flex gap-1 items-center opacity-30">
                           <div className="w-16 h-px bg-linear-to-r from-transparent to-[#00FF8C]" />
                           <div className="w-1.5 h-1.5 border-t border-l border-[#00FF8C] rotate-45" />
                        </div>

                        <div className="flex items-center gap-2 md:gap-4 bg-black/40 border border-[#18362A] px-3 md:px-5 py-1.5 rounded-sm backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:border-[#00FF8C]/50 transition-colors">
                           <div className="flex flex-col items-center min-w-[32px] md:min-w-[45px]">
                              <span className="text-[14px] md:text-lg font-mono font-black text-[#00FF8C] drop-shadow-[0_0_8px_rgba(0,255,140,0.4)] leading-none tabular-nums">
                                 {String(timeLeft.days).padStart(2, '0')}
                              </span>
                              <span className="text-[6px] md:text-[8px] font-bold text-white/40 uppercase tracking-tighter mt-1">Days</span>
                           </div>
                           <div className="text-[#00FF8C]/30 text-lg md:text-xl font-light mb-4">:</div>
                           <div className="flex flex-col items-center min-w-[32px] md:min-w-[45px]">
                              <span className="text-[14px] md:text-lg font-mono font-black text-white leading-none tabular-nums">
                                 {String(timeLeft.hours).padStart(2, '0')}
                              </span>
                              <span className="text-[6px] md:text-[8px] font-bold text-white/40 uppercase tracking-tighter mt-1">Hrs</span>
                           </div>
                           <div className="text-[#00FF8C]/30 text-lg md:text-xl font-light mb-4">:</div>
                           <div className="flex flex-col items-center min-w-[32px] md:min-w-[45px]">
                              <span className="text-[14px] md:text-lg font-mono font-black text-white leading-none tabular-nums">
                                 {String(timeLeft.minutes).padStart(2, '0')}
                              </span>
                              <span className="text-[6px] md:text-[8px] font-bold text-white/40 uppercase tracking-tighter mt-1">Min</span>
                           </div>
                           <div className="text-[#00FF8C]/30 text-lg md:text-xl font-light mb-4">:</div>
                            <div className="flex flex-col items-center min-w-[32px] md:min-w-[45px]">
                              <span className="text-[14px] md:text-lg font-mono font-black text-[#00FF8C] drop-shadow-[0_0_8px_rgba(0,255,140,0.4)] leading-none tabular-nums">
                                 {String(timeLeft.seconds).padStart(2, '0')}
                              </span>
                              <span className="text-[6px] md:text-[8px] font-bold text-white/40 uppercase tracking-tighter mt-1">Sec</span>
                           </div>
                        </div>

                        {/* Decorative Right Wings */}
                        <div className="hidden sm:flex gap-1 items-center opacity-30">
                           <div className="w-1.5 h-1.5 border-b border-r border-[#00FF8C] rotate-45" />
                           <div className="w-16 h-px bg-linear-to-l from-transparent to-[#00FF8C]" />
                        </div>
                     </motion.div>

                     {/* AI Narrative Tooltip */}
                     <AnimatePresence>
                        {showCountdownTooltip && (
                           <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50 w-[280px] pointer-events-none"
                           >
                              <div className="bg-[#06120E]/95 border border-[#00FF8C]/40 backdrop-blur-xl p-3 shadow-[0_0_25px_rgba(0,255,140,0.15)] [clip-path:polygon(0_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)]">
                                 <div className="flex items-center gap-2 mb-2 border-b border-[#00FF8C]/20 pb-1">
                                    <div className="w-1.5 h-1.5 bg-[#00FF8C] animate-pulse" />
                                    <span className="text-[9px] font-black text-[#00FF8C] uppercase tracking-widest">System Readiness Report</span>
                                 </div>
                                 <p className="text-[10px] font-medium text-white/90 leading-relaxed uppercase tracking-tight">
                                    Polify is monitoring election countdown and all our 5 AI components are ready and prepared to tally the elections. All mock data will be cleared automatically 3 days before election day, to get system ready for election day.
                                 </p>
                                 <div className="mt-2 flex justify-end">
                                    <span className="text-[7px] font-mono text-[#00FF8C]/50">STATUS: READY_SAFE</span>
                                 </div>
                              </div>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
                )}
              </AnimatePresence>

              {/* Logic Connection Line between modules */}
              <div className="hidden xl:block w-8 h-px bg-[#00FF8C]/20 relative">
                 <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 border border-[#00FF8C]/40 rotate-45" />
              </div>

              {/* 4. AI PREPAREDNESS WARNING TICKER (Red Card) */}
              <AnimatePresence>
                {timeLeft && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center"
                  >
                     <div className="w-[300px] bg-red-950/40 border border-red-500/40 backdrop-blur-md p-2 flex flex-col gap-1.5 [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))] shadow-[0_0_20px_rgba(239,68,68,0.15)] group">
                        <div className="flex items-center justify-between px-1">
                           <span className="text-[7px] font-black text-red-500 uppercase tracking-widest flex items-center gap-1">
                              <div className="w-1 h-1 bg-red-500 animate-pulse" />
                              AI_PREPAREDNESS_CORE
                           </span>
                           <span className="text-[6px] font-bold text-red-500/50 uppercase">Ready_Safe</span>
                        </div>

                        <div className="bg-red-600/20 border border-red-500/20 p-1.5 relative overflow-hidden">
                           {/* Marquee Container with Framer Motion */}
                           <motion.div 
                              animate={{ x: ["0%", "-50%"] }}
                              transition={{ 
                                 repeat: Infinity, 
                                 duration: 30, 
                                 ease: "linear" 
                              }}
                              className="flex gap-8 whitespace-nowrap w-max"
                           >
                              <span className="text-[9px] font-black text-white uppercase tracking-tight">
                                 Polify is monitoring election countdown and all our 5 AI components are ready and prepared to tally the elections. All mock data will be cleared automatically 3 days before election day, to get system ready for election day.
                              </span>
                              <span className="text-[9px] font-black text-white uppercase tracking-tight" aria-hidden="true">
                                 Polify is monitoring election countdown and all our 5 AI components are ready and prepared to tally the elections. All mock data will be cleared automatically 3 days before election day, to get system ready for election day.
                              </span>
                           </motion.div>
                        </div>

                        {/* Tiny telemetry bottom */}
                        <div className="flex justify-between items-center px-1">
                           <div className="flex gap-0.5">
                              {[1,2,3,4,5].map(i => (
                                 <div key={i} className="w-1 h-1 bg-red-500/30" />
                              ))}
                           </div>
                           <span className="text-[6px] font-mono text-red-500/40 tracking-tighter">NODE_CORE_SYNC_09</span>
                        </div>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>

           <div className="flex flex-col items-center mt-3 opacity-40">
              <span className="text-[7px] md:text-[8px] font-black text-white/60 uppercase tracking-[0.5em]">COUNTDOWN TO GENERAL ELECTION 2027</span>
           </div>
        </div>
      </div>

      {/* 3. RIGHT HUD MODULE: System Status */}
      <div className="relative w-full xl:w-auto min-w-[340px] bg-[#0A1612]/80 backdrop-blur-xl border border-[#18362A] p-4 flex flex-row items-center justify-between gap-6 [clip-path:polygon(0_0,100%_0,100%_100%,15px_100%,0_calc(100%-15px))] shadow-[0_0_15px_rgba(0,0,0,0.5)]">
         <div className="absolute top-0 right-0 w-full h-px bg-linear-to-r from-transparent via-[#00FF8C]/30 to-transparent" />
         
          <div className="flex flex-row xl:flex-col flex-wrap gap-x-4 gap-y-1.5 md:gap-2.5">
             <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-0 h-0 border-t-2 border-t-transparent border-l-3 md:border-l-4 border-l-[#00FF8C] border-b-2 border-b-transparent" />
                <span className="text-[8px] md:text-[9px] font-black text-white/50 uppercase tracking-widest">Anomalies:</span>
                <span className="text-[10px] md:text-xs font-black text-white">12</span>
             </div>
             <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-0 h-0 border-t-2 border-t-transparent border-l-3 md:border-l-4 border-l-[#fdb931] border-b-2 border-b-transparent" />
                <span className="text-[8px] md:text-[9px] font-black text-white/50 uppercase tracking-widest">Validation:</span>
                <span className="text-[10px] md:text-xs font-black text-white">98.7%</span>
             </div>
             <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-0 h-0 border-t-2 border-t-transparent border-l-3 md:border-l-4 border-l-white/40 border-b-2 border-b-transparent" />
                <span className="text-[8px] md:text-[9px] font-black text-white/50 uppercase tracking-widest">Status:</span>
                <span className="text-[8px] md:text-[9px] font-black text-black bg-[#00FF8C] px-1 md:px-1.5 py-0.5 shadow-[0_0_5px_#00FF8C]">LIVE</span>
             </div>
          </div>

         {/* Mini Sparkline Chart */}
         <div className="relative w-24 h-14 border-b border-[#00FF8C]/30 border-l">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,140,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,140,0.1)_1px,transparent_1px)] bg-size-[8px_8px]" />
            
            {/* Simulated Line Chart (SVG) */}
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
               <motion.path 
                 d="M0,40 L15,20 L30,35 L50,15 L70,25 L85,10 L100,20" 
                 fill="none" 
                 stroke="#00FF8C" 
                 strokeWidth="1.5"
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 transition={{ duration: 2, ease: "easeInOut" }}
               />
               {/* Dots */}
               <circle cx="15" cy="20" r="1.5" fill="#00FF8C" className="animate-pulse" />
               <circle cx="50" cy="15" r="1.5" fill="#00FF8C" className="animate-pulse" />
               <circle cx="85" cy="10" r="1.5" fill="#white" className="animate-pulse drop-shadow-[0_0_3px_white]" />
            </svg>
         </div>
      </div>

    </div>
  );
}
