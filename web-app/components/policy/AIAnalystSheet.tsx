"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, Terminal, FileText, CheckCircle, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AIAnalystSheetProps {
  isOpen: boolean;
  onClose: () => void;
  ideaTitle: string;
  category: string;
  analysis?: {
    feasibility: number;
    impact_score: number;
    cost_index: number;
    analyst_notes: string;
  };
}

export function AIAnalystSheet({ isOpen, onClose, ideaTitle, category, analysis }: AIAnalystSheetProps) {
  const [terminalText, setTerminalText] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsProcessing(true);
      setTerminalText([]);
      
      const steps = [
        "Initializing Bunge AI Legislative Engine...",
        "Connecting to Kenya Law Reports API...",
        `Analyzing "${ideaTitle}"...`,
        "Checking Constitutional alignment (Art. 118)...",
        "Modeling fiscal impact for " + category + " sector...",
        "Synthesizing public participation sentiment...",
        "Generation complete. Optimizing Draft Bill text..."
      ];

      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep < steps.length) {
          setTerminalText(prev => [...prev, steps[currentStep]]);
          currentStep++;
        } else {
          setIsProcessing(false);
          clearInterval(interval);
        }
      }, 600);

      return () => clearInterval(interval);
    }
  }, [isOpen, ideaTitle, category]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-end animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl h-full bg-brand-surface border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col translate-x-0 animate-in slide-in-from-right duration-500 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-brand-bg/50 glass">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-kenya-gold/20 text-kenya-gold glow-gold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">Bunge AI Analyst</h2>
              <p className="text-[10px] text-brand-text-muted uppercase tracking-widest leading-none">Legislative Synthesis Engine v4.2</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
          
          {/* Idea Context */}
          <div className="space-y-2">
            <h3 className="text-2xl font-black leading-tight text-white">{ideaTitle}</h3>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 bg-brand-surface-highlight rounded text-[10px] font-bold text-brand-text-muted uppercase tracking-widest">
                {category}
              </span>
              <span className="px-2 py-0.5 bg-kenya-green/10 text-kenya-green rounded text-[10px] font-bold uppercase tracking-widest border border-kenya-green/20">
                Citizen Initiative
              </span>
            </div>
          </div>

          {/* Terminal / Processing View */}
          <div className="rounded-xl bg-black/50 border border-white/5 p-4 font-mono text-xs space-y-1 min-h-[160px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-20">
              <Terminal className="w-4 h-4" />
            </div>
            {terminalText.map((text, i) => (
              <div key={i} className="flex gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
                <span className="text-kenya-green shrink-0">›</span>
                <span className={cn(i === terminalText.length - 1 && isProcessing ? "text-white" : "text-brand-text-muted")}>
                  {text}
                  {i === terminalText.length - 1 && isProcessing && <span className="inline-block w-2 h-4 bg-kenya-green ml-1 animate-pulse align-middle" />}
                </span>
              </div>
            ))}
          </div>

          {!isProcessing && analysis && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
               {/* Metrics Grid */}
               <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-brand-surface-secondary border border-white/5 space-y-1">
                    <p className="text-[10px] font-black uppercase text-brand-text-muted tracking-widest">Feasibility</p>
                    <p className="text-2xl font-black text-brand-primary">{analysis.feasibility}%</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-brand-surface-secondary border border-white/5 space-y-1">
                    <p className="text-[10px] font-black uppercase text-brand-text-muted tracking-widest">Social Impact</p>
                    <p className="text-2xl font-black text-kenya-green">{analysis.impact_score}%</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-brand-surface-secondary border border-white/5 space-y-1">
                    <p className="text-[10px] font-black uppercase text-brand-text-muted tracking-widest">Fiscal Load</p>
                    <p className="text-2xl font-black text-kenya-red">{analysis.cost_index}/100</p>
                  </div>
               </div>

               {/* Analyst Notes */}
               <div className="space-y-3">
                  <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-kenya-gold">
                    <ShieldCheck className="w-4 h-4" /> Constitutional Merit
                  </h4>
                  <div className="p-4 rounded-2xl bg-kenya-gold/5 border border-kenya-gold/10 relative">
                    <p className="text-sm text-brand-text leading-relaxed italic">
                      &quot; {analysis.analyst_notes} &quot;
                    </p>
                  </div>
               </div>

               {/* Recommendations */}
               <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-text-muted">
                    <Zap className="w-4 h-4 text-brand-primary" /> Key Recommendations
                  </h4>
                  <div className="grid gap-3">
                    {[
                      "Standardize interoperability protocols for Mashinani access.",
                      "Implement a multi-tier governance model for rural sectors.",
                      "Establish a neutral oversight committee for transparency."
                    ].map((rec, i) => (
                      <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                        <CheckCircle className="w-4 h-4 text-kenya-green shrink-0 mt-0.5" />
                        <span className="text-sm text-brand-text-muted">{rec}</span>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/5 bg-brand-bg/50 glass flex gap-4">
          <Button 
            className="flex-1 h-12 bg-kenya-green hover:bg-kenya-green/90 text-white font-black uppercase tracking-widest text-xs gap-2"
            disabled={isProcessing}
          >
            <FileText className="w-4 h-4" /> Generate Full Draft Bill
          </Button>
          <Button 
            variant="outline" 
            className="h-12 border-white/10 hover:bg-white/5 font-black uppercase tracking-widest text-xs"
            onClick={onClose}
          >
            Close Analyst
          </Button>
        </div>
      </div>
    </div>
  );
}
