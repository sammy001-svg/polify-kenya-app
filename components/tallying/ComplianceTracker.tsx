"use client";

import { CandidateResult } from "@/actions/tallying";
import { CheckCircle2, Circle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ComplianceTrackerProps {
  candidate: CandidateResult | null;
}

export function ComplianceTracker({ candidate }: ComplianceTrackerProps) {
  if (!candidate) return null;

  const countyProgress = (candidate.counties_above_25pct / 24) * 100;
  const voteProgress = (candidate.percentage / 50) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* 50% + 1 Requirement */}
      <div className="card-premium p-4 md:p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h4 className="text-[10px] md:text-xs font-black text-brand-text-muted uppercase tracking-widest">
              Majority Requirement
            </h4>
            {candidate.is_50_plus_one ? (
              <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-kenya-green" />
            ) : (
              <Circle className="w-3 h-3 md:w-4 md:h-4 text-gray-700" />
            )}
          </div>
          <Badge
            variant="outline"
            className={`text-[9px] font-black tracking-widest rounded-lg ${candidate.is_50_plus_one ? "border-kenya-green text-kenya-green bg-kenya-green/5" : "border-white/10 text-brand-text-muted"}`}
          >
            {candidate.is_50_plus_one ? "THRESHOLD MET" : "PENDING"}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div
              className={`h-full transition-all duration-1000 relative ${candidate.is_50_plus_one ? "bg-kenya-green" : "bg-kenya-gold"}`}
              style={{ width: `${Math.min(100, voteProgress)}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-white/40" />
            </div>
          </div>
          <div className="flex justify-between text-[10px] font-black font-mono tracking-tighter">
            <span className="text-white">
              CURRENT: {candidate.percentage.toFixed(1)}%
            </span>
            <span className="text-brand-text-muted">TARGET: 50%+1</span>
          </div>
        </div>
      </div>

      {/* Rule of 24 Requirement */}
      <div className="card-premium p-4 md:p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h4 className="text-[10px] md:text-xs font-black text-brand-text-muted uppercase tracking-widest">
              Geographical Spread
            </h4>
            {candidate.is_rule_of_24_met ? (
              <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-kenya-green" />
            ) : (
              <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 text-kenya-gold animate-pulse" />
            )}
          </div>
          <Badge
            variant="outline"
            className={`text-[9px] font-black tracking-widest rounded-lg ${candidate.is_rule_of_24_met ? "border-kenya-green text-kenya-green bg-kenya-green/5" : "border-kenya-gold text-kenya-gold bg-kenya-gold/5"}`}
          >
            {candidate.counties_above_25pct}/24 COUNTIES
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div
              className={`h-full transition-all duration-1000 relative ${candidate.is_rule_of_24_met ? "bg-kenya-green" : "bg-linear-to-r from-kenya-red to-kenya-gold"}`}
              style={{ width: `${Math.min(100, countyProgress)}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-white/40" />
            </div>
          </div>
          <div className="flex justify-between text-[10px] font-black font-mono tracking-tighter">
            <span className="text-white">MIN 25% IN 24 COUNTIES</span>
            <span
              className={
                candidate.is_rule_of_24_met
                  ? "text-kenya-green"
                  : "text-kenya-gold"
              }
            >
              {candidate.is_rule_of_24_met ? "PASSED" : "CALCULATING"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
