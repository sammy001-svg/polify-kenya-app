"use client";

import { ShieldCheck, AlertCircle, Info, ExternalLink } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

interface TrustIndicatorProps {
  status: "Verified" | "Fact-Checked" | "True" | "False" | "Misleading" | "Context Needed" | "Context Added" | "Pending" | "Opinion";
  citations?: { label: string; url: string }[];
  compact?: boolean;
}

export function TrustIndicator({ status, citations, compact = false }: TrustIndicatorProps) {
  const getStatusConfig = (s: string) => {
    switch (s) {
      case "Verified":
      case "True":
      case "Fact-Checked":
        return { color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20", icon: ShieldCheck, label: "Verified Fact" };
      case "False":
      case "Misleading":
        return { color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20", icon: AlertCircle, label: "Disputed" };
      case "Context Needed":
      case "Context Added":
        return { color: "text-kenya-gold", bg: "bg-kenya-gold/10", border: "border-kenya-gold/20", icon: Info, label: "Context Added" };
      case "Opinion":
        return { color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20", icon: Info, label: "Opinion" };
      default:
        return { color: "text-brand-text-muted", bg: "bg-white/5", border: "border-white/10", icon: Info, label: "Pending" };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className={cn(
            "flex items-center gap-1.5 rounded-full border transition-colors cursor-default",
            config.bg, config.border, config.color,
            compact ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
        )}>
           <Icon className={cn("shrink-0", compact ? "w-3 h-3" : "w-3.5 h-3.5")} />
           <span className="font-bold uppercase tracking-wider">{config.label}</span>
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-brand-surface border-border shadow-xl z-50">
        <div className="space-y-3">
            <div className="flex items-start gap-3">
                <div className={cn("p-2 rounded-lg shrink-0", config.bg)}>
                    <Icon className={cn("w-5 h-5", config.color)} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-brand-text">Verification Status: {status}</h4>
                    <p className="text-xs text-brand-text-muted mt-1">
                        {status === "True" || status === "Verified" 
                           ? "This content has been cross-referenced with official records." 
                           : "Community context or official data adds important nuance to this claim."}
                    </p>
                </div>
            </div>
            
            {citations && citations.length > 0 && (
                <div className="pt-3 border-t border-border">
                    <h5 className="text-[10px] font-bold uppercase text-brand-text-muted mb-2">Sources</h5>
                    <ul className="space-y-2">
                        {citations.map((cite, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs">
                                <ExternalLink className="w-3 h-3 text-brand-text-muted" />
                                <a href={cite.url} className="text-blue-400 hover:underline line-clamp-1">{cite.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            {!citations && (
                <div className="pt-2 text-[10px] text-brand-text-muted italic">
                    Automated check pending final review.
                </div>
            )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
