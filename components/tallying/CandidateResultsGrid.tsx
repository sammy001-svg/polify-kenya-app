"use client";

import { useEffect } from "react";
import { CandidateResult } from "@/actions/tallying";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { CheckCircle2, TrendingUp, Zap } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CandidateResultsGridProps {
  candidates: CandidateResult[];
}

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest).toLocaleString() + suffix);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.5,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [count, value]);

  return <motion.span className="tabular-nums">{rounded}</motion.span>;
}

function PercentageCountUp({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(1) + "%");

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.5, 
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [count, value]);

  return <motion.span className="tabular-nums">{rounded}</motion.span>;
}

export function CandidateResultsGrid({ candidates }: CandidateResultsGridProps) {
  // Show all candidates in a scrollable container (grid style)
  const allCandidates = (candidates || []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
      {allCandidates.map((candidate, idx) => {
        if (!candidate) return null;
        const candidateId = candidate.candidate_id || `candidate-${idx}`;
        const partyColor = candidate.party_color || '';
        const candidateName = candidate.candidate_name || 'Candidate';
        const party = candidate.party || 'Independent';
        const photoUrl = candidate.photo_url || '';
        const votes = candidate.votes && !isNaN(Number(candidate.votes)) ? Number(candidate.votes) : 0;
        const percentage = candidate.percentage && !isNaN(Number(candidate.percentage)) ? Number(candidate.percentage) : 0;
        const isRuleOf24Met = !!candidate.is_rule_of_24_met;
        const countiesAbove25pct = candidate.counties_above_25pct && !isNaN(Number(candidate.counties_above_25pct)) ? Number(candidate.counties_above_25pct) : 0;
        const nameUpper = (candidateName || '').toUpperCase();
        const hideRegionalTrigger = nameUpper.includes('RAILA') || nameUpper.includes('ODINGA');

        return (
          <motion.div
            key={candidateId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative group bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl md:rounded-[32px] p-5 md:p-6 overflow-hidden flex flex-col gap-6"
          >
            {/* Party Color Glow - Concentrated */}
            <div className={cn(
              "absolute -top-16 -right-16 w-32 md:w-48 h-32 md:h-48 rounded-full blur-[60px] md:blur-[80px] opacity-10 transition-all duration-700 group-hover:opacity-30 group-hover:scale-110",
              partyColor
            )} />

            {/* Top Bar with Rank */}
            <div className="flex justify-between items-start relative z-20 w-full -mb-4">
              <div className="px-3 py-1 rounded-full bg-black/80 border border-white/10 text-[10px] font-black tracking-widest text-white/40">
                RANK // {(idx + 1).toString().padStart(2, '0')}
              </div>
              <div className="p-2 bg-brand-primary/20 rounded-xl border border-brand-primary/30 opacity-0 group-hover:opacity-100 transition-opacity">
                <Zap className="w-4 h-4 text-brand-primary animate-pulse" />
              </div>
            </div>

            <div className="flex flex-col gap-4 items-center text-center relative z-10 w-full mt-2">
              {/* Candidate Image - Hologram Style */}
              <div className="relative w-24 h-24 md:w-28 md:h-28 shrink-0">
                <div className={cn(
                  "absolute inset-0 rounded-full border-2 rotate-3 group-hover:rotate-0 transition-transform duration-500",
                  partyColor.replace('bg-', 'border-')
                )} />
                <div className="absolute inset-0 rounded-full overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
                  {photoUrl ? (
                    <Image 
                      src={photoUrl} 
                      alt={candidateName} 
                      fill
                      sizes="(max-width: 768px) 96px, 112px"
                      className="object-cover contrast-125 saturate-50 group-hover:saturate-100 transition-all duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/10 text-[10px] md:text-[18px]">No Photo</div>
                  )}
                  {/* Hologram Scan Effect */}
                  <motion.div 
                    initial={{ y: "-100%" }}
                    animate={{ y: "400%" }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className={cn(
                      "absolute inset-x-0 h-1/4 bg-linear-to-b from-transparent via-current to-transparent pointer-events-none opacity-10",
                      partyColor.replace('bg-', 'text-')
                    )} 
                  />
                </div>
              </div>

              <div className="min-w-0 w-full flex flex-col items-center">
                <h4 
                  className="text-white font-black text-base md:text-xl uppercase tracking-tighter group-hover:text-brand-primary transition-colors text-wrap wrap-break-word leading-tight"
                  title={candidateName}
                >
                  {candidateName}
                </h4>
                <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] flex justify-center items-center gap-2 mt-1.5">
                  <span className={cn("w-2 h-2 rounded-full border border-white/10 shrink-0", partyColor)} />
                  <span className="truncate max-w-[120px]">{party}</span>
                </p>
              </div>
            </div>

            <div className="space-y-4 relative z-10 w-full grow flex flex-col justify-end mt-2">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <div className="text-[8px] font-black text-white/20 uppercase tracking-widest">Election Tally</div>
                  <p className="text-xl md:text-2xl font-black text-white tracking-tighter flex items-center gap-1">
                    <CountUp value={votes} />
                    <span className="text-[8px] text-white/20 font-mono uppercase">VOTES</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1.5 justify-end text-kenya-green font-black mb-1">
                    <TrendingUp className="w-2.5 h-2.5" />
                    <span className="text-[8px] uppercase tracking-widest">Momentum</span>
                  </div>
                  <p className="text-xl font-black text-kenya-green tracking-tighter">
                    <PercentageCountUp value={percentage} />
                  </p>
                </div>
              </div>

              {/* Progress Bar - HUD Style */}
              <div className="relative">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 2, ease: "circOut" }}
                    className={cn("h-full relative", percentage > 45 ? "bg-kenya-green" : partyColor)}
                  >
                    {/* Glow Tip */}
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white blur-sm opacity-50" />
                  </motion.div>
                </div>
                {/* 50% Marker */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 z-20" />
              </div>

              {/* Compliance Badges - Modernized */}
              <div className="flex flex-wrap gap-2 pt-3">
                {isRuleOf24Met && (
                  <div className="flex items-center gap-2 text-[9px] font-black text-white uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 group-hover:border-kenya-green/30 transition-colors">
                    <CheckCircle2 className="w-3 h-3 text-kenya-green" /> Constitution_Art_138
                  </div>
                )}
                {!hideRegionalTrigger && countiesAbove25pct > 0 && (
                  <div className="flex items-center gap-2 text-[9px] font-black text-white/40 uppercase tracking-widest bg-white/2 px-3 py-1.5 rounded-xl border border-white/5">
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    {countiesAbove25pct} Regional Triggers
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
