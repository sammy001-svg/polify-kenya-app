"use client";

import { useState } from "react";
import {
  FileText,
  Scale,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface BillSection {
  title: string;
  content: string;
}

interface DraftBill {
  bill_number: string;
  title: string;
  preamble: string;
  sections: BillSection[];
  legal_basis: string;
}

interface AIDraftBillProps {
  bill: DraftBill;
}

export function AIDraftBill({ bill }: AIDraftBillProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-brand-surface-secondary/50 border-2 border-brand-primary/20 rounded-2xl overflow-hidden animate-in zoom-in-95 duration-700">
      {/* Bill Header */}
      <div className="bg-brand-primary/5 p-4 border-b border-brand-primary/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-primary/10 rounded-lg">
            <Scale className="w-5 h-5 text-brand-primary" />
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
              Draft Bill Generation
            </h4>
            <p className="text-sm font-black text-brand-text">
              {bill.bill_number}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-kenya-gold text-black text-[10px] font-black rounded uppercase">
            AI Synthesis
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="rounded-full"
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Bill Content Preview */}
      <div className="p-6 space-y-4">
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-xl font-black uppercase tracking-tight leading-tight px-4 border-y-2 border-double border-brand-text/10 py-4">
            {bill.title}
          </h2>
          <p className="text-[10px] text-brand-text-muted font-bold italic tracking-wide">
            Produced by Polify AI Legislative Framework Simulation
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase text-brand-text mb-2">
              <FileText className="w-3 h-3" /> Preamble
            </div>
            <p className="text-sm text-brand-text/80 leading-relaxed italic border-l-2 border-brand-primary/20 pl-4 py-1">
              &quot;{bill.preamble}&quot;
            </p>
          </div>

          {expanded && (
            <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
              {bill.sections.map((section, idx) => (
                <div key={idx} className="space-y-2">
                  <h5 className="text-xs font-black text-brand-primary flex items-center gap-2">
                    <span>Section {idx + 1}:</span>
                    <span className="uppercase tracking-wide">
                      {section.title}
                    </span>
                  </h5>
                  <p className="text-sm text-brand-text leading-relaxed bg-brand-bg/40 p-3 rounded-lg border border-border">
                    {section.content}
                  </p>
                </div>
              ))}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-brand-primary/5 rounded-xl border border-brand-primary/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-brand-primary" />
                    <p className="text-[10px] font-black uppercase text-brand-primary tracking-widest">
                      AI Reasoning
                    </p>
                  </div>
                  <p className="text-xs text-brand-text/70 leading-relaxed italic">
                    The AI analyzed the core idea of &quot;{bill.title}&quot;
                    and synthesized this draft to maximize feasibility while
                    preserving the original citizen intent.
                  </p>
                </div>

                <div className="p-4 bg-kenya-red/5 rounded-xl border border-kenya-red/10 flex gap-3">
                  <ShieldAlert className="w-5 h-5 text-kenya-red shrink-0" />
                  <div>
                    <p className="text-[10px] font-black uppercase text-kenya-red tracking-widest mb-1">
                      Constitutional Note
                    </p>
                    <p className="text-xs text-brand-text/70 leading-tight">
                      {bill.legal_basis}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-border bg-brand-bg/40 flex justify-between items-center">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-kenya-green" />
          <div className="w-2 h-2 rounded-full bg-kenya-red" />
          <div className="w-2 h-2 rounded-full bg-kenya-gold" />
        </div>
        <Button
          size="sm"
          className="bg-brand-primary rounded-full text-xs font-bold gap-2 group"
        >
          <BookOpen className="w-4 h-4" /> Export Report{" "}
          <ChevronUp className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all" />
        </Button>
      </div>
    </div>
  );
}
