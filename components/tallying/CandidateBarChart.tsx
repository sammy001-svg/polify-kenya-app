"use client";

import { motion } from "framer-motion";
import { CandidateResult } from "@/actions/tallying";

interface CandidateBarChartProps {
  candidates: CandidateResult[];
}

function AnimatedBar({ candidate, height, rank }: { candidate: CandidateResult; height: number; rank: number }) {
  return (
    <div className="flex flex-col items-center gap-3 h-full justify-end group w-full max-w-[70px] relative">
      {/* Floating Percentage Label */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 + rank * 0.1 }}
        className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-[14px] font-black text-white tracking-tighter">
          {candidate.percentage.toFixed(1)}%
        </span>
        <div className="w-px h-4 bg-linear-to-b from-white/40 to-transparent" />
      </motion.div>

      {/* Bar Container */}
      <div className="w-full relative px-1 h-full flex items-end">
        {/* Shadow/Glow Background */}
        <div className="absolute inset-x-1 bottom-0 bg-kenya-green/5 rounded-t-lg border-x border-t border-white/5 h-[95%]" />
        
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${Math.max(height, 5)}%` }}
          transition={{ duration: 1.5, delay: rank * 0.15, type: "spring", stiffness: 50 }}
          className={`w-full rounded-t-lg relative overflow-hidden ${candidate.party_color} group-hover:brightness-110 transition-all`}
        >
          {/* Top Edge Shine */}
          <div className="absolute inset-x-0 top-0 h-4 bg-linear-to-b from-white/40 to-transparent z-10" />
          
          {/* Internal Progress fill detail */}
          <div className="absolute inset-x-[20%] top-0 bottom-0 bg-white/10" />
          
          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent animate-scanline opacity-30" />
        </motion.div>
      </div>

      {/* Candidate Metadata Foot */}
      <div className="flex flex-col items-center gap-1.5 pb-2">
         {/* Rank Badge */}
        <div className="text-[9px] font-black text-kenya-green border border-kenya-green/30 bg-kenya-green/10 px-2 py-0.5 rounded uppercase tracking-tighter">
          Rank #{rank + 1}
        </div>
        
        <span className="text-[9px] font-black text-white/70 uppercase tracking-tighter text-center leading-none h-6 flex items-center px-1">
          {candidate.candidate_name.split(" ").pop()}
        </span>
        
        {/* Party indicator dot with heavy glow */}
        <div className={`w-2.5 h-2.5 rounded-full ${candidate.party_color} shadow-[0_0_12px_rgba(0,255,128,0.6)]`} />
      </div>
    </div>
  );
}

export function CandidateBarChart({ candidates }: CandidateBarChartProps) {
  const topCandidates = candidates.slice(0, 4);

  const displayCandidates = topCandidates.length > 0 ? topCandidates : [];

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-10 px-2">
        <div>
          <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40">Candidate Performance</h3>
          <div className="h-0.5 w-12 bg-kenya-green mt-1" />
        </div>
        <div className="flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-kenya-green animate-pulse" />
           <span className="text-[9px] font-mono text-kenya-green tracking-widest">LIVE FEED</span>
        </div>
      </div>

      <div className="flex-1 flex items-end justify-around gap-2 px-2" style={{ minHeight: "220px" }}>
        {displayCandidates.map((candidate, idx) => {
          const height = Math.min((candidate.percentage / 60) * 100, 100); // Scale relative to 60% lead
          return (
            <AnimatedBar key={idx} candidate={candidate} height={height} rank={idx} />
          );
        })}
      </div>
    </div>
  );
}
