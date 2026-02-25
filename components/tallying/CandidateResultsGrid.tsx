"use client";

import { CandidateResult } from "@/actions/tallying";
import { motion, animate } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CheckCircle2, TrendingUp, Zap } from "lucide-react";

interface CandidateResultsGridProps {
  candidates: CandidateResult[];
}

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [value, displayValue]);

  return (
    <span>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

function PercentageCountUp({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(latest),
    });
    return () => controls.stop();
  }, [value, displayValue]);

  return <span>{displayValue.toFixed(1)}%</span>;
}

export function CandidateResultsGrid({ candidates }: CandidateResultsGridProps) {
  // Take top 4 for the main grid
  const mainCandidates = candidates.slice(0, 4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-0 overflow-y-auto no-scrollbar pb-6 pr-2">
      {mainCandidates.map((candidate, idx) => (
        <motion.div
          key={candidate.candidate_id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="relative group bg-black/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-6 overflow-hidden flex flex-col justify-between min-h-[220px]"
        >
          {/* Top Selection Corner */}
          <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="p-2 bg-brand-primary/20 rounded-xl border border-brand-primary/30">
                <Zap className="w-4 h-4 text-brand-primary animate-pulse" />
            </div>
          </div>

          {/* Rank Badge - Refined */}
          <div className="absolute top-6 left-6 z-20 px-3 py-1 rounded-full bg-black/80 border border-white/10 text-[10px] font-black tracking-widest text-white/40">
            RANK // 0{idx + 1}
          </div>

          {/* Party Color Glow - Concentrated */}
          <div className={cn(
            "absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[80px] opacity-10 transition-all duration-700 group-hover:opacity-30 group-hover:scale-110",
            candidate.party_color
          )} />

          <div className="flex gap-5 items-center relative z-10 pt-6">
            {/* Candidate Image - Hologram Style */}
            <div className="relative w-20 h-20 shrink-0">
               <div className={cn(
                 "absolute inset-0 rounded-2xl border-2 rotate-3 group-hover:rotate-0 transition-transform duration-500",
                 candidate.party_color.replace('bg-', 'border-')
               )} />
               <div className="absolute inset-0 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
                 {candidate.photo_url ? (
                     <Image 
                       src={candidate.photo_url} 
                       alt={candidate.candidate_name} 
                       fill
                       className="object-cover filter contrast-125 saturate-50 group-hover:saturate-100 transition-all duration-500"
                     />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/10 text-[10px]">No Photo</div>
                 )}
                 {/* Hologram Scan Effect */}
                 <div className="absolute inset-0 bg-linear-to-b from-transparent via-brand-primary/10 to-transparent h-1/4 w-full animate-scanline pointer-events-none" />
               </div>
            </div>

            <div className="min-w-0">
              <h4 className="text-white font-black text-lg uppercase tracking-tighter group-hover:text-brand-primary transition-colors">
                {candidate.candidate_name}
              </h4>
              <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] flex items-center gap-2 mt-1">
                <span className={cn("w-2 h-2 rounded-full border border-white/10", candidate.party_color)} />
                {candidate.party}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4 relative z-10">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <div className="text-[8px] font-black text-white/20 uppercase tracking-widest">Election Tally</div>
                    <p className="text-2xl font-black text-white tracking-tighter">
                        <CountUp value={candidate.votes} />
                        <span className="text-[9px] text-white/20 ml-2 font-mono uppercase">VTS</span>
                    </p>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-1.5 justify-end text-kenya-green font-black mb-1">
                        <TrendingUp className="w-2.5 h-2.5" />
                        <span className="text-[8px] uppercase tracking-widest">Momentum</span>
                    </div>
                    <p className="text-xl font-black text-kenya-green tracking-tighter">
                        <PercentageCountUp value={candidate.percentage} />
                    </p>
                </div>
            </div>

            {/* Progress Bar - HUD Style */}
            <div className="relative">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${candidate.percentage}%` }}
                        transition={{ duration: 2, ease: "circOut" }}
                        className={cn("h-full relative", candidate.percentage > 45 ? "bg-kenya-green" : candidate.party_color)}
                    >
                        {/* Glow Tip */}
                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-white blur-sm opacity-50" />
                    </motion.div>
                </div>
                {/* 50% Marker */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 z-20" />
            </div>

            {/* Compliance Badges - Modernized */}
            <div className="flex gap-3 pt-2">
                {candidate.is_rule_of_24_met && (
                    <div className="flex items-center gap-2 text-[9px] font-black text-white uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 group-hover:border-kenya-green/30 transition-colors">
                        <CheckCircle2 className="w-3 h-3 text-kenya-green" /> Constitution_Art_138
                    </div>
                )}
                {candidate.counties_above_25pct > 0 && (
                    <div className="flex items-center gap-2 text-[9px] font-black text-white/40 uppercase tracking-widest bg-white/2 px-3 py-1.5 rounded-xl border border-white/5">
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        {candidate.counties_above_25pct} Regional Triggers
                    </div>
                )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
