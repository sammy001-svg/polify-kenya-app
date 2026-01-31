"use client";

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { 
  ShieldCheck, 
  AlertCircle, 
  ExternalLink, 
  Scale, 
  History,
  Info,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TruthReportProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    title: string;
    verdict: "Verified" | "Fact-Checked" | "True" | "False" | "Misleading" | "Context Needed" | "Context Added" | "Pending" | "Opinion";
    analysis: string;
    citations: { label: string; url: string }[];
    claims: { text: string; status: "True" | "False" | "Unverified" }[];
  } | null;
}

export function TruthReport({ isOpen, onClose, data }: TruthReportProps) {
  if (!data) return null;

  const verdictConfig = {
    Verified: { color: "text-green-500", bg: "bg-green-500/10", icon: ShieldCheck },
    True: { color: "text-green-500", bg: "bg-green-500/10", icon: ShieldCheck },
    "Fact-Checked": { color: "text-green-500", bg: "bg-green-500/10", icon: ShieldCheck },
    False: { color: "text-red-500", bg: "bg-red-500/10", icon: AlertCircle },
    Misleading: { color: "text-red-500", bg: "bg-red-500/10", icon: AlertCircle },
    "Context Needed": { color: "text-kenya-gold", bg: "bg-kenya-gold/10", icon: Info },
    "Context Added": { color: "text-kenya-gold", bg: "bg-kenya-gold/10", icon: Info },
    Pending: { color: "text-brand-text-muted", bg: "bg-white/5", icon: Info },
    Opinion: { color: "text-blue-500", bg: "bg-blue-500/10", icon: Info },
  }[data.verdict] || { color: "text-brand-text-muted", bg: "bg-white/5", icon: Info };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md bg-brand-surface border-white/10 text-white overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4", verdictConfig.bg)}>
            <verdictConfig.icon className={cn("w-7 h-7", verdictConfig.color)} />
          </div>
          <SheetTitle className="text-2xl font-black">{data.verdict} Verdict</SheetTitle>
          <SheetDescription className="text-brand-text-muted">
            AI-Powered Analysis of &quot;{data.title}&quot;
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-8 pb-10">
          {/* Executive Summary */}
          <section className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-2">
              <Scale className="w-3 h-3 text-brand-primary" /> AI Analysis
            </h3>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-sm leading-relaxed">
              {data.analysis}
            </div>
          </section>

          {/* Key Claims */}
          <section className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-kenya-green" /> Claim Breakdown
            </h3>
            <div className="space-y-3">
              {data.claims.map((claim, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-lg bg-black/20 border border-white/5">
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full mt-1.5 shrink-0",
                    claim.status === "True" ? "bg-green-500" : claim.status === "False" ? "bg-red-500" : "bg-gray-500"
                  )} />
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-white/90">{claim.text}</p>
                    <span className={cn(
                        "text-[9px] font-bold uppercase",
                        claim.status === "True" ? "text-green-500" : claim.status === "False" ? "text-red-500" : "text-gray-500"
                    )}>
                        {claim.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sources */}
          <section className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-2">
              <History className="w-3 h-3 text-blue-400" /> Evidence & Citations
            </h3>
            <div className="space-y-2">
              {data.citations.map((cite, i) => (
                <a 
                  key={i} 
                  href={cite.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
                >
                  <span className="text-xs font-medium">{cite.label}</span>
                  <ExternalLink className="w-3 h-3 text-brand-text-muted group-hover:text-white" />
                </a>
              ))}
            </div>
          </section>

          <div className="p-4 rounded-xl bg-brand-primary/10 border border-brand-primary/20">
             <p className="text-[10px] text-brand-primary/80 italic leading-snug">
               PoliFy AI cross-references Hansard archives, official gazette notices, and verified journalistic reports to ensure 99.2% factual accuracy.
             </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
