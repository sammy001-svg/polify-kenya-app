"use client";

import { useState } from "react";
import { IssueCategory, GrassrootsService } from "@/lib/grassroots-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, MapPin, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES: IssueCategory[] = ['Infrastructure', 'Water', 'Health', 'Education', 'Security', 'Environment'];

interface IssueReporterProps {
  initialCounty?: string;
}

export function IssueReporter({ initialCounty = "Nairobi" }: IssueReporterProps) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<IssueCategory | null>(null);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!category || !description) return;
    setIsSubmitting(true);
    
    await GrassrootsService.submitReport({
      userId: 'current-user',
      category,
      title: `${category} Issue reported`,
      description,
      location: { ward: 'Upper Hill', county: initialCounty }
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <Card className="bg-brand-surface border-kenya-green/30 text-center p-8 animate-in zoom-in duration-300">
        <div className="flex flex-col items-center space-y-4">
           <div className="w-16 h-16 bg-kenya-green/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-kenya-green" />
           </div>
           <div>
              <h3 className="text-xl font-bold">Report Submitted!</h3>
              <p className="text-sm text-brand-text-muted mt-1">
                 Your civic insight has been logged. Neighbors can now verify this report.
              </p>
           </div>
           <Button variant="outline" onClick={() => { setStep(1); setIsSuccess(false); setCategory(null); setDescription(""); }}>
              Submit Another Report
           </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-brand-surface border-white/5 overflow-hidden">
      <CardHeader className="bg-white/5 border-b border-white/5">
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-kenya-orange" />
          Grassroots Reporter
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <h4 className="text-sm font-bold text-brand-text-muted uppercase tracking-widest">Select Category</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "p-3 rounded-xl border text-sm font-bold transition-all flex flex-col items-center gap-2",
                    category === cat 
                      ? "bg-kenya-orange/10 border-kenya-orange text-white" 
                      : "bg-white/5 border-white/5 text-brand-text-muted hover:border-white/10 hover:text-white"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <Button 
              className="w-full h-12 bg-kenya-red hover:bg-kenya-red/90 text-white font-black uppercase tracking-widest mt-4"
              disabled={!category}
              onClick={() => setStep(2)}
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-2">
               <button onClick={() => setStep(1)} className="text-xs text-brand-text-muted hover:text-white uppercase font-black">Back</button>
               <span className="text-xs text-white/20">•</span>
               <span className="text-xs font-bold text-kenya-orange uppercase">{category} Report</span>
            </div>
            
            <div className="space-y-2">
               <label className="text-xs font-black text-brand-text-muted uppercase tracking-widest">Description</label>
               <textarea 
                  className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-sm text-white h-32 outline-none focus:ring-2 focus:ring-kenya-orange transition-all"
                  placeholder="Describe the issue in detail (Location, impact, duration...)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5">
                  <Camera className="w-4 h-4" /> Add Photo
               </Button>
               <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5">
                  <MapPin className="w-4 h-4" /> Tag Location
               </Button>
            </div>

            <Button 
              className="w-full h-12 bg-kenya-green hover:bg-kenya-green/90 text-white font-black uppercase tracking-widest mt-4"
              disabled={!description || isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Submitting..." : "Finish Report"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
