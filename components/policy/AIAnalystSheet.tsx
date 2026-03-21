"use client";

import { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  Terminal,
  FileText,
  ShieldCheck,
  Zap,
  TrendingUp,
  Activity,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ANALYST_PERSONAS } from "@/lib/gamification";
import { AnalystAvatars } from "./AnalystAvatars";
import { motion } from "framer-motion";

interface AIAnalystSheetProps {
  isOpen: boolean;
  onClose: () => void;
  ideaTitle: string;
  category: string;
  analysis?: {
    feasibility: number;
    impact_score: number;
    cost_index: number;
    persona_critiques: Record<string, string>;
  };
}

export function AIAnalystSheet({
  isOpen,
  onClose,
  ideaTitle,
  category,
  analysis,
}: AIAnalystSheetProps) {
  const [terminalText, setTerminalText] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("audit");

  useEffect(() => {
    if (isOpen) {
      setIsProcessing(true);
      setTerminalText([]);

      const steps = [
        "Initializing Polify AI Legislative Engine...",
        "Connecting to Kenya Law Reports API...",
        `Analyzing initiative: "${ideaTitle}"...`,
        "Checking Constitutional alignment (Art. 118)...",
        "Modeling fiscal impact for " + category + " sector...",
        "Synthesizing public participation sentiment...",
        "Generation complete. Optimizing Draft Bill text...",
      ];

      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep < steps.length) {
          setTerminalText((prev) => [...prev, steps[currentStep]]);
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
    <div className="fixed inset-0 z-100 flex items-center justify-end animate-in fade-in duration-500">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl h-full bg-brand-bg border-l border-white/10 shadow-[-40px_0_100px_rgba(0,0,0,0.8)] flex flex-col translate-x-0 animate-in slide-in-from-right duration-700 overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/20 backdrop-blur-3xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-kenya-gold via-brand-primary to-kenya-green" />
          
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-brand-primary glow-primary">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-white italic">
                POLIFY AUDIT REPORT
              </h2>
              <div className="flex items-center gap-3">
                <AnalystAvatars size="sm" />
                <div className="h-4 w-px bg-white/10 mx-1" />
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-kenya-green animate-pulse" />
                  <span className="text-[10px] text-kenya-green font-black uppercase tracking-widest">Live Engine</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/10 group"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Navigation Tabs */}
        {!isProcessing && (
           <div className="flex px-8 border-b border-white/5 bg-black/10">
              {[
                { id: 'audit', label: 'Intelligence Audit', icon: Activity },
                { id: 'personas', label: 'Analyst Critiques', icon: Sparkles },
                { id: 'impact', label: 'Impact Simulator', icon: Zap },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-4 border-b-2 transition-all text-[10px] font-black uppercase tracking-widest",
                    activeTab === tab.id 
                      ? "border-brand-primary text-brand-primary bg-brand-primary/5" 
                      : "border-transparent text-brand-text-muted hover:text-white"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
           </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-thin">
          {/* Idea Context */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
               <span className="px-2 py-0.5 bg-brand-primary/10 text-brand-primary rounded text-[9px] font-black uppercase tracking-widest border border-brand-primary/20">
                PROPOSAL ID: #{Math.floor(Date.now() / 1000000)}
              </span>
              <span className="px-2 py-0.5 bg-white/5 text-brand-text-muted rounded text-[9px] font-black uppercase tracking-widest border border-white/5">
                {category}
              </span>
            </div>
            <h3 className="text-4xl font-black leading-[1.1] text-white tracking-tight">
              {ideaTitle}
            </h3>
          </div>

          {/* Terminal / Processing View */}
          <div className={cn(
            "rounded-3xl bg-black border border-white/5 p-6 font-mono text-[11px] space-y-2 transition-all duration-500 relative overflow-hidden group",
            isProcessing ? "min-h-[300px]" : "min-h-0 border-brand-primary/30"
          )}>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Terminal className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
               <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-green-500/50" />
               </div>
               <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-2">Console v4.2</span>
            </div>
            
            <div className="space-y-1.5">
              {terminalText.map((text, i) => (
                <div
                  key={i}
                  className="flex gap-3 animate-in fade-in slide-in-from-left-4 duration-500"
                >
                  <span className="text-brand-primary/50 shrink-0 font-black">[{i + 1}]</span>
                  <span
                    className={cn(
                      i === terminalText.length - 1 && isProcessing
                        ? "text-brand-primary font-black animate-pulse"
                        : "text-brand-text-muted font-medium",
                    )}
                  >
                    {text}
                    {i === terminalText.length - 1 && isProcessing && (
                      <span className="inline-block w-2 h-4 bg-brand-primary ml-1 align-middle" />
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {!isProcessing && analysis && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              {activeTab === 'audit' && (
                <div className="space-y-10 animate-in fade-in duration-500">
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-6">
                    {[
                      { label: 'Feasibility', val: analysis.feasibility, color: 'text-kenya-gold', icon: Zap },
                      { label: 'Impact Score', val: analysis.impact_score, color: 'text-kenya-green', icon: Sparkles },
                      { label: 'Fiscal Load', val: analysis.cost_index, color: 'text-kenya-red', icon: Activity },
                    ].map(metric => (
                      <div key={metric.label} className="p-6 rounded-4xl bg-white/2 border border-white/5 space-y-4 hover:border-white/10 transition-colors">
                        <metric.icon className={cn("w-5 h-5", metric.color)} />
                        <div className="space-y-0.5">
                           <p className="text-[9px] font-black uppercase text-brand-text-muted tracking-[0.2em]">{metric.label}</p>
                           <p className={cn("text-3xl font-black", metric.color)}>{metric.val}%</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Notes */}
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-kenya-gold">
                      <ShieldCheck className="w-5 h-5" /> Executive Summary
                    </h4>
                    <div className="p-8 rounded-[2.5rem] bg-linear-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                         <FileText className="w-32 h-32" />
                      </div>
                      <p className="text-lg text-white/80 leading-relaxed font-medium italic relative z-10">
                        &quot;Comprehensive multidimensional analysis confirms that this initiative aligns with the transformative agenda for the 2022-2027 development cycle. Priority implementation in the {category} sector is recommended based on high social impact vectors.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'personas' && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <h4 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">
                    <Sparkles className="w-5 h-5" /> Analyst Persona Feedback
                  </h4>
                  <div className="grid gap-4">
                    {ANALYST_PERSONAS.map(persona => (
                       <div key={persona.id} className="p-6 rounded-4xl bg-white/2 border border-white/5 flex gap-6 items-start hover:bg-white/5 transition-all">
                          <div className="text-4xl p-4 bg-white/5 rounded-2xl">{persona.avatar}</div>
                          <div className="space-y-2">
                             <div className="flex items-center gap-3">
                                <span className={cn("text-[10px] font-black uppercase tracking-widest", persona.color)}>{persona.name}</span>
                                <span className="text-[9px] font-bold text-brand-text-muted uppercase">— {persona.role}</span>
                             </div>
                             <p className="text-sm text-white/70 leading-relaxed font-medium">
                                {analysis.persona_critiques[persona.id] || "No specialized critique recorded for this sector."}
                             </p>
                          </div>
                       </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'impact' && (
                 <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="p-8 rounded-[2.5rem] bg-brand-primary/5 border border-brand-primary/20 text-center space-y-4">
                       <Zap className="w-12 h-12 text-brand-primary mx-auto animate-pulse" />
                       <h4 className="text-2xl font-black text-white italic underline decoration-brand-primary decoration-4">Impact Projection Engine</h4>
                       <p className="text-sm text-brand-text-muted max-w-md mx-auto">Modeling the ripple effects of this policy across Kenya&apos;s socio-economic landscape over the next 5 years.</p>
                       <div className="grid grid-cols-2 gap-4 pt-4">
                          {[
                            { label: 'Job Creation', val: '+12,400 est.', sub: 'Immediate direct roles' },
                            { label: 'GDP Influence', val: '0.12%', sub: 'Micro-sector growth' },
                          ].map((stat, idx) => (
                            <div key={idx} className="flex flex-col gap-2 p-4 rounded-3xl bg-white/5 border border-white/10 group">
                               <p className="text-[9px] font-black text-brand-primary uppercase tracking-widest">{stat.label}</p>
                               <p className="text-xl font-black text-white">{stat.val}</p>
                               <p className="text-[8px] font-bold text-brand-text-muted uppercase">{stat.sub}</p>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-white/5 bg-black/20 backdrop-blur-3xl flex gap-4">
          <Button
            className="flex-1 h-14 bg-linear-to-r from-kenya-green to-brand-primary hover:scale-[1.02] transition-transform text-white font-black uppercase tracking-[0.2em] text-[10px] gap-3 rounded-3xl shadow-xl shadow-kenya-green/20"
            disabled={isProcessing}
          >
            <FileText className="w-5 h-5 shrink-0" />
            <span>Generate Full Draft Bill</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="h-14 border-white/10 hover:bg-white/5 font-black uppercase tracking-[0.2em] text-[10px] rounded-3xl px-8"
            onClick={onClose}
          >
            Close Analyst
          </Button>
        </div>
      </div>
    </div>
  );
}
