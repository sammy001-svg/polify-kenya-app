"use client";

import { useState } from "react";
import { 
  X, 
  Lightbulb, 
  ArrowRight, 
  FileText, 
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BungeAIAnalyst } from "./BungeAIAnalyst";
import { createClient } from "@/lib/supabase";

interface PolicySubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function PolicySubmissionModal({ isOpen, onClose, onSuccess }: PolicySubmissionModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    impact: "",
    audience: ""
  });
  const [analysis, setAnalysis] = useState<{
    feasibility: number;
    cost_index: number;
    impact_score: number;
    analyst_notes: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  if (!isOpen) return null;

  const handleNext = () => setStep(step + 1);

  const handleSubmitFinal = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      alert("Please sign in to submit a policy idea.");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from('policy_ideas')
      .insert({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        impact_statement: formData.impact,
        target_audience: [formData.audience],
        author_id: user.id,
        ai_analysis: {
          ...analysis,
          ai_status: "complete"
        }
      });

    if (!error) {
      onSuccess();
      onClose();
      // Reset state
      setStep(1);
      setFormData({ title: "", description: "", category: "", impact: "", audience: "" });
      setAnalysis(null);
    } else {
      console.error(error);
      alert("Error submitting proposal.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-brand-bg border border-border w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-kenya-gold/10 rounded-lg">
              <Lightbulb className="w-5 h-5 text-kenya-gold" />
            </div>
            <h2 className="text-xl font-black">Submit Policy Proposal</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-brand-surface-secondary rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
           {step === 1 && (
             <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-text-muted">Policy Title</label>
                    <Input 
                      placeholder="e.g., Youth Innovation Fund Decentralization"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="bg-brand-surface border-border p-6 h-14 text-lg font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-text-muted">Target Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full h-12 bg-brand-surface border border-border rounded-xl px-4 text-brand-text"
                    >
                      <option value="">Select Category...</option>
                      <option value="Education">Education</option>
                      <option value="Health">Health</option>
                      <option value="Economy">Economy</option>
                      <option value="Environment">Environment</option>
                      <option value="Technology">Technology</option>
                    </select>
                  </div>
                </div>
                <Button onClick={handleNext} disabled={!formData.title || !formData.category} className="w-full bg-brand-primary h-12 font-bold rounded-full group">
                  Next Step <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
             </div>
           )}

           {step === 2 && (
             <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-text-muted">Detailed Description</label>
                    <textarea 
                      placeholder="Explain how this policy would work in practice..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full h-32 bg-brand-surface border border-border rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-text-muted">Impact Statement</label>
                    <Input 
                      placeholder="Who benefits from this? What changes?"
                      value={formData.impact}
                      onChange={(e) => setFormData({...formData, impact: e.target.value})}
                      className="bg-brand-surface border-border h-12"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-full">Back</Button>
                  <Button 
                    onClick={handleNext} 
                    disabled={!formData.description || !formData.impact} 
                    className="flex-1 bg-brand-primary rounded-full"
                  >
                    Analyze Proposal
                  </Button>
                </div>
             </div>
           )}

           {step === 3 && (
             <BungeAIAnalyst onComplete={(res) => {
               setAnalysis(res);
               setStep(4);
             }} />
           )}

           {step === 4 && analysis && (
             <div className="space-y-6 animate-in zoom-in-95 duration-500 text-center">
                <div className="w-20 h-20 bg-kenya-green/10 rounded-full flex items-center justify-center mx-auto mb-2">
                   <Sparkles className="w-10 h-10 text-kenya-green" />
                </div>
                <h3 className="text-2xl font-black">Analysis Complete!</h3>
                
                <div className="grid grid-cols-3 gap-4">
                   <div className="space-y-2 p-4 bg-brand-surface-secondary rounded-2xl border border-border">
                      <p className="text-[10px] font-black uppercase tracking-tighter text-brand-text-muted">Feasibility</p>
                      <p className="text-2xl font-black text-brand-primary">{analysis.feasibility}%</p>
                   </div>
                   <div className="space-y-2 p-4 bg-brand-surface-secondary rounded-2xl border border-border">
                      <p className="text-[10px] font-black uppercase tracking-tighter text-brand-text-muted">Fiscal Load</p>
                      <p className="text-2xl font-black text-kenya-red">{analysis.cost_index}/100</p>
                   </div>
                   <div className="space-y-2 p-4 bg-brand-surface-secondary rounded-2xl border border-border">
                      <p className="text-[10px] font-black uppercase tracking-tighter text-brand-text-muted">Social Impact</p>
                      <p className="text-2xl font-black text-kenya-green">{analysis.impact_score}%</p>
                   </div>
                </div>

                <div className="bg-brand-surface-secondary/50 p-6 rounded-2xl border border-dashed border-border text-left relative">
                   <FileText className="absolute top-4 right-4 w-5 h-5 text-brand-text-muted opacity-20" />
                   <h4 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Bunge Analyst Note
                   </h4>
                   <p className="text-sm text-brand-text leading-relaxed italic">
                      &quot;{analysis.analyst_notes}&quot;
                   </p>
                </div>

                <div className="flex gap-3 pt-4">
                   <Button variant="ghost" onClick={onClose} className="flex-1 rounded-full">Discard</Button>
                   <Button 
                    onClick={handleSubmitFinal} 
                    disabled={loading}
                    className="flex-1 bg-kenya-green hover:bg-kenya-green/90 text-white rounded-full font-bold"
                   >
                     {loading ? "Publishing..." : "Submit to Feed"}
                   </Button>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
