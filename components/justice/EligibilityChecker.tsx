"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft,
  CircleDot,
  Calculator,
  ShieldCheck,
  Scale
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    title: "Income Level",
    question: "What is your monthly household income?",
    options: [
      { label: "Below KES 15,000", value: "low", score: 10 },
      { label: "KES 15,000 - 30,000", value: "medium", score: 5 },
      { label: "Above KES 30,000", value: "high", score: 0 }
    ]
  },
  {
    title: "Case Type",
    question: "What nature of legal matter are you facing?",
    options: [
      { label: "Criminal Case", value: "criminal", score: 10 },
      { label: "Children/Family Justice", value: "children", score: 10 },
      { label: "Land/Property Dispute", value: "civil", score: 5 },
      { label: "Small Claims", value: "other", score: 2 }
    ]
  },
  {
    title: "Vulnerability",
    question: "Do you belong to any of these priority groups?",
    options: [
      { label: "Person with Disability (PWD)", value: "pwd", score: 10 },
      { label: "Minor/Child", value: "minor", score: 10 },
      { label: "Displaced Person/Refugee", value: "idp", score: 10 },
      { label: "None of the above", value: "none", score: 0 }
    ]
  }
];

export function EligibilityChecker() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelect = (value: string) => {
    const newSelections = [...selections];
    newSelections[currentStep] = value;
    setSelections(newSelections);

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    selections.forEach((val, idx) => {
      score += STEPS[idx].options.find(o => o.value === val)?.score || 0;
    });
    return score;
  };

  const reset = () => {
    setCurrentStep(0);
    setSelections([]);
    setIsCompleted(false);
  };

  const score = calculateScore();
  const isEligible = score >= 15;

  return (
    <div className="bg-brand-surface/40 border border-brand-accent/20 rounded-3xl overflow-hidden p-8 relative">
       <div className="absolute top-0 right-0 p-8 opacity-5">
         <Calculator className="h-32 w-32" />
       </div>

       <div className="relative z-10">
         {!isCompleted ? (
           <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="space-y-2">
               <div className="flex items-center gap-2">
                 {STEPS.map((_, i) => (
                   <div 
                    key={i} 
                    className={cn(
                      "h-1 flex-1 rounded-full transition-all duration-500",
                      i <= currentStep ? "bg-brand-primary" : "bg-white/10"
                    )} 
                   />
                 ))}
               </div>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary">
                 Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}
               </p>
             </div>

             <div className="space-y-4">
               <h2 className="text-2xl font-black uppercase tracking-tight text-white leading-tight max-w-xl">
                 {STEPS[currentStep].question}
               </h2>
               
               <div className="grid grid-cols-1 gap-3">
                 {STEPS[currentStep].options.map((option) => (
                   <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className="flex justify-between items-center p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-brand-primary/30 transition-all text-left group"
                   >
                     <span className="text-xs font-bold text-white uppercase tracking-wider">{option.label}</span>
                     <ChevronRight className="h-4 w-4 text-brand-text-muted group-hover:text-brand-primary transform group-hover:translate-x-1 transition-all" />
                   </button>
                 ))}
               </div>
             </div>

             {currentStep > 0 && (
               <button 
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-text-muted hover:text-white transition-colors"
               >
                 <ArrowLeft className="h-3 w-3" /> Previous Step
               </button>
             )}
           </div>
         ) : (
           <div className="space-y-8 animate-in zoom-in-95 duration-500 text-center py-6">
              <div className="flex justify-center">
                {isEligible ? (
                  <div className="p-4 bg-brand-primary/10 rounded-full border border-brand-primary/20">
                    <CheckCircle2 className="h-16 w-16 text-brand-primary" />
                  </div>
                ) : (
                  <div className="p-4 bg-kenya-gold/10 rounded-full border border-kenya-gold/20">
                    <CircleDot className="h-16 w-16 text-kenya-gold" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-black uppercase tracking-tight text-white">
                  {isEligible ? "Likely Eligible" : "Further Review Needed"}
                </h3>
                <p className="text-brand-text-muted max-w-md mx-auto text-sm font-medium leading-relaxed">
                  {isEligible 
                    ? "Based on your responses, you meet the primary criteria for government legal aid. Please visit your nearest NLAS center with identification."
                    : "While you don't meet the immediate automatic criteria, you can still apply for pro-bono support or a case-by-case assessment."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {isEligible ? (
                  <Button className="h-14 bg-brand-primary text-black hover:bg-white font-black uppercase tracking-widest px-8 rounded-2xl shadow-xl shadow-brand-primary/20 gap-3">
                    <Scale className="h-4 w-4" /> Start Official Request
                  </Button>
                ) : (
                  <Link href="/justice">
                    <Button className="h-14 bg-kenya-gold text-black hover:bg-white font-black uppercase tracking-widest px-8 rounded-2xl shadow-xl shadow-kenya-gold/20 gap-3">
                      Search Pro-Bono Advocates
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="outline" 
                  onClick={reset}
                  className="h-14 border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest px-8 rounded-2xl"
                >
                  Retake Check
                </Button>
              </div>
              
              <div className="pt-6 flex items-center justify-center gap-6 opacity-40">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-primary" />
                  <span className="text-[10px] font-black uppercase tracking-tighter text-brand-text-muted">Private & Confidential</span>
                </div>
              </div>
           </div>
         )}
       </div>
    </div>
  );
}
