"use client";

import { motion } from "framer-motion";

export function SummaryHeader() {
  return (
    <div className="w-full flex flex-col xl:flex-row items-start justify-between gap-4 p-4 lg:p-6 z-10 relative">
      
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

        {/* Decorative elements below title */}
        <div className="flex gap-1 mt-4 opacity-50">
            <div className="w-[100px] h-[2px] bg-linear-to-r from-transparent to-[#00FF8C]" />
            <div className="w-2 h-[2px] bg-[#00FF8C]" />
            <div className="w-6 h-[2px] bg-[#00FF8C]" />
            <div className="w-[100px] h-[2px] bg-linear-to-l from-transparent to-[#00FF8C]" />
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
