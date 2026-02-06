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
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-tight">Absolute Majority (50% + 1)</h4>
                        {candidate.is_50_plus_one ? (
                            <CheckCircle2 className="w-4 h-4 text-kenya-green" />
                        ) : (
                            <Circle className="w-4 h-4 text-gray-600" />
                        )}
                    </div>
                    <Badge variant="outline" className={candidate.is_50_plus_one ? "border-kenya-green text-kenya-green" : "border-gray-500 text-gray-500"}>
                        {candidate.is_50_plus_one ? "THRESHOLD MET" : "IN PROGRESS"}
                    </Badge>
                </div>
                
                <div className="space-y-2">
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                            className={`h-full transition-all duration-1000 ${candidate.is_50_plus_one ? 'bg-kenya-green' : 'bg-kenya-gold'}`}
                            style={{ width: `${Math.min(100, voteProgress)}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-gray-500">
                        <span>CURRENT: {candidate.percentage.toFixed(2)}%</span>
                        <span>TARGET: 50.01%</span>
                    </div>
                </div>
            </div>

            {/* Rule of 24 Requirement */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                 <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-tight">Geographical Spread (Rule of 24)</h4>
                        {candidate.is_rule_of_24_met ? (
                            <CheckCircle2 className="w-4 h-4 text-kenya-green" />
                        ) : (
                            <AlertTriangle className="w-4 h-4 text-kenya-gold animate-pulse" />
                        )}
                    </div>
                    <Badge variant="outline" className={candidate.is_rule_of_24_met ? "border-kenya-green text-kenya-green" : "border-kenya-gold text-kenya-gold"}>
                        {candidate.counties_above_25pct}/24 COUNTIES
                    </Badge>
                </div>

                <div className="space-y-2">
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                            className={`h-full transition-all duration-1000 ${candidate.is_rule_of_24_met ? 'bg-kenya-green' : 'bg-linear-to-r from-kenya-red to-kenya-gold'}`}
                            style={{ width: `${Math.min(100, countyProgress)}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-gray-500">
                        <span>MIN 25% VOTE IN 24+ COUNTIES</span>
                        <span>{candidate.is_rule_of_24_met ? "CRITERIA MET" : "CRITERIA PENDING"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
