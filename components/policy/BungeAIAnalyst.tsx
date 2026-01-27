/* cSpell:ignore Bunge analyst */
"use client";

import { useState, useEffect } from "react";
import { 
  Cpu, 
  Binary, 
  BarChart3, 
  Wallet, 
  Users
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AnalysisResult {
  feasibility: number;
  cost_index: number;
  impact_score: number;
  analyst_notes: string;
}

interface BungeAIAnalystProps {
  onComplete: (analysis: AnalysisResult) => void;
}

export function BungeAIAnalyst({ onComplete }: BungeAIAnalystProps) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { label: "Parsing Proposal Language", icon: Binary },
    { label: "Cross-referencing Constitution", icon: Cpu },
    { label: "Calculating Fiscal Impact", icon: Wallet },
    { label: "Predicting Social Outcome", icon: Users },
    { label: "Finalizing Bunge Report", icon: BarChart3 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    const stepInterval = setInterval(() => {
      setStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return steps.length - 1;
        }
        return prev + 1;
      });
    }, 1200);

    // Simulate completion
    const completeTimeout = setTimeout(() => {
      const simulatedAnalysis: AnalysisResult = {
        feasibility: Math.floor(Math.random() * 40) + 60, // 60-100
        cost_index: Math.floor(Math.random() * 50) + 30, // 30-80
        impact_score: Math.floor(Math.random() * 30) + 70, // 70-100
        analyst_notes: "This proposal shows high alignment with the Kenya Vision 2030 social pillar. Significant fiscal space would be required, but long-term ROI is projected to be positive."
      };
      onComplete(simulatedAnalysis);
    }, 6500);

    return () => {
      clearInterval(timer);
      clearInterval(stepInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete, steps.length]);

  const CurrentIcon = steps[step].icon;

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-10 animate-in fade-in zoom-in-95 duration-700">
      <div className="relative">
         <div className="absolute inset-0 bg-brand-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
         <div className="w-24 h-24 rounded-full border-2 border-brand-primary/30 flex items-center justify-center relative bg-brand-bg">
            <CurrentIcon className="w-10 h-10 text-brand-primary animate-bounce-slow" />
            <div className="absolute inset-0 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
         </div>
      </div>

      <div className="text-center space-y-4 max-w-sm w-full">
         <h3 className="text-2xl font-black italic text-brand-primary tracking-tighter uppercase underline decoration-kenya-red decoration-4 transition-all">
            Bunge AI Analyst
         </h3>
         <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-brand-text-muted">
               <span>{steps[step].label}</span>
               <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1 bg-brand-surface-highlight" />
         </div>
         <p className="text-xs text-brand-text-muted leading-relaxed italic">
            &quot;We are reviewing your proposal against current legislative frameworks and fiscal capacity...&quot;
         </p>
      </div>

      <div className="grid grid-cols-5 gap-2 w-full max-w-sm">
        {steps.map((s, i) => (
           <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? 'bg-brand-primary w-full' : 'bg-brand-surface-highlight w-2'}`} 
           />
        ))}
      </div>
    </div>
  );
}
