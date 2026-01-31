"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DecodedPolicy } from "@/lib/policy-data";
import { cn } from "@/lib/utils";


interface DecodedPolicyCardProps {
  policy: DecodedPolicy;
}

export function DecodedPolicyCard({ policy }: DecodedPolicyCardProps) {
  return (
    <div className="group relative flex flex-col bg-brand-surface border border-white/5 rounded-2xl overflow-hidden hover:border-brand-primary/30 transition-all duration-300">
      
      {/* Header Status Bar */}
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-black/20">
        <span className={cn(
            "text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded",
            policy.status === 'Proposed' ? "bg-kenya-gold/20 text-kenya-gold" : 
            policy.status === 'Active' ? "bg-kenya-green/20 text-kenya-green" : 
            "bg-blue-500/20 text-blue-400"
        )}>
            {policy.status}
        </span>
        <span className="text-xs text-brand-text-muted font-mono">
            {policy.category}
        </span>
      </div>

      <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-brand-primary transition-colors">
              {policy.title}
          </h3>
          <p className="text-sm text-brand-text-muted leading-relaxed line-clamp-3 mb-6 flex-1">
              {policy.summary}
          </p>

          {/* Mini Scorecard */}
          <div className="grid grid-cols-3 gap-2 mb-6 p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="text-center">
                  <div className="text-[10px] text-brand-text-muted uppercase tracking-wider mb-1">Impact</div>
                  <div className="text-lg font-black text-kenya-green">{policy.impactScore}%</div>
              </div>
              <div className="text-center border-l border-white/10">
                  <div className="text-[10px] text-brand-text-muted uppercase tracking-wider mb-1">Cost</div>
                  <div className="text-lg font-black text-kenya-red">{policy.fiscalLoad}</div>
              </div>
              <div className="text-center border-l border-white/10">
                  <div className="text-[10px] text-brand-text-muted uppercase tracking-wider mb-1">Feas.</div>
                  <div className="text-lg font-black text-brand-primary">{policy.feasibility}%</div>
              </div>
          </div>

          <Link 
            href={`/policies/${policy.id}`}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-primary/10 text-brand-primary font-bold text-sm hover:bg-brand-primary hover:text-white transition-all"
          >
             Decode Policy <ArrowRight className="w-4 h-4" />
          </Link>
      </div>
    </div>
  );
}
