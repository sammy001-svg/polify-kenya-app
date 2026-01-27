'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Save, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Target
} from 'lucide-react';
import Link from 'next/link';

interface AnalysisResult {
  score: number;
  flags: string[];
  suggestions: string[];
  timeline: string;
}

export default function ManifestoBuilder() { // Renamed from Page to ManifestoBuilder
  const [formData, setFormData] = useState({
    issue: '',
    problem: '',
    solution: '',
    implementation: '',
    outcome: ''
  });

  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simulated AI Analysis
  useEffect(() => {
    const analyzeContent = () => {
      setIsAnalyzing(true);
      
      // Mock logic based on keywords
      let score = 100;
      const flags: string[] = [];
      const suggestions: string[] = [];
      let timeline = 'Short-term';

      // Alignment Check (Mock: MP Mandate)
      if (formData.solution.toLowerCase().includes('road') || formData.solution.toLowerCase().includes('highway')) {
         // Roads are often National (KENHA) or County (KERRA/KURA) depending on class.
         // Assuming MP role for context.
         score -= 20;
         flags.push('Mandate Warning');
         suggestions.push('Specify if you mean rural access roads (KERRA) which fall under NG-CDF scope. Major highways are National functions.');
      }

      if (formData.solution.toLowerCase().includes('police') || formData.solution.toLowerCase().includes('security')) {
         // Security is National.
         score -= 10;
         flags.push('Potential Overreach');
         suggestions.push(' MPs can facilitate police posts/housing via NG-CDF but cannot command police operations.');
      }

      // Vague Check
      if (formData.solution.length > 0 && formData.solution.length < 20) {
          score -= 30;
          flags.push('Vague Solution');
          suggestions.push('Be more specific. Instead of "Improve roads", say "Grade and gravel 20km of access roads in Ward X".');
      }

      // Outcome Check
      if (formData.outcome.length > 0 && !/\d/.test(formData.outcome)) {
          score -= 10;
          suggestions.push('Include numbers in your outcome to make it measurable (e.g., "500 youth", "30% increase").');
      }

      // Timeline Labeling
      if (formData.solution.toLowerCase().includes('build')) timeline = 'Medium-term';
      if (formData.solution.toLowerCase().includes('policy') || formData.solution.toLowerCase().includes('law')) timeline = 'Long-term';


      setTimeout(() => {
          setAnalysis({ score, flags, suggestions, timeline });
          setIsAnalyzing(false);
      }, 500);
    };

    const timer = setTimeout(() => {
      if (formData.solution || formData.problem) {
        analyzeContent();
      }
    }, 1500); // Debounce analysis

    return () => clearTimeout(timer);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
             <div className="flex items-center gap-4">
                <Link href="/campaign/manifesto" className="p-2 hover:bg-brand-surface-secondary rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-brand-text-muted" />
                </Link>
                <h1 className="text-2xl font-bold">New Priority Issue</h1>
            </div>
            <Button className="bg-kenya-green hover:bg-kenya-green/90 text-white gap-2">
                <Save className="w-4 h-4" /> Save Priority
            </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
                <Card className="border-border">
                    <CardHeader>
                        <CardTitle>Define the Issue</CardTitle>
                        <CardDescription>What is the core problem and your proposed solution?</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Priority Issue Title</label>
                            <Input 
                                name="issue"
                                placeholder="e.g., Youth Education & Employment" 
                                value={formData.issue}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold">Problem Definition (What is broken?)</label>
                            <Textarea 
                                name="problem"
                                placeholder="Describe the current state..."
                                className="min-h-[100px]"
                                value={formData.problem}
                                onChange={handleChange}
                            />
                        </div>

                         <div className="space-y-2">
                            <label className="text-sm font-bold text-kenya-green">Proposed Solution (What will you do?)</label>
                            <Textarea 
                                name="solution"
                                placeholder="Be specific and actionable..."
                                className="min-h-[100px] border-kenya-green/30 focus-visible:ring-kenya-green/30"
                                value={formData.solution}
                                onChange={handleChange}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border">
                    <CardHeader>
                        <CardTitle>Execution Plan</CardTitle>
                        <CardDescription>How will you achieve this and what is the impact?</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Implementation Approach</label>
                            <Textarea 
                                name="implementation"
                                placeholder="Steps, partners, funding sources..."
                                value={formData.implementation}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold">Expected Measurable Outcomes</label>
                            <Textarea 
                                name="outcome"
                                placeholder="e.g., 5000 new jobs, 20km of road..."
                                value={formData.outcome}
                                onChange={handleChange}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* AI Sidebar */}
            <div className="space-y-6">
                 <div className="sticky top-24">
                     <div className="bg-brand-surface-highlight border border-kenya-gold/30 rounded-xl p-6 shadow-sm">
                         <h3 className="flex items-center gap-2 font-bold mb-4 text-kenya-gold">
                             <Sparkles className="w-5 h-5" /> AI Policy Analyst
                         </h3>
                         
                         {isAnalyzing ? (
                             <div className="flex items-center gap-2 text-sm text-brand-text-muted animate-pulse">
                                 Analyzing your draft...
                             </div>
                         ) : analysis ? (
                             <div className="space-y-6">
                                 {/* Score */}
                                 <div className="flex items-center justify-between">
                                     <span className="text-sm font-medium">Alignment Score</span>
                                     <Badge className={`${
                                         analysis.score >= 80 ? 'bg-kenya-green' : 
                                         analysis.score >= 60 ? 'bg-kenya-gold' : 'bg-kenya-red'
                                     } text-white`}>
                                         {analysis.score}/100
                                     </Badge>
                                 </div>

                                 {/* Timeline */}
                                 <div className="flex items-center justify-between p-3 bg-brand-surface rounded-lg border border-border">
                                     <span className="text-xs font-bold uppercase text-brand-text-muted">Estimated Timeline</span>
                                     <span className="text-sm font-bold flex items-center gap-1">
                                         <Clock className="w-3 h-3 text-kenya-green" /> {analysis.timeline}
                                     </span>
                                 </div>

                                 {/* Analysis Content */}
                                 <div className="space-y-3">
                                     {analysis.flags.map((flag, i) => (
                                         <div key={i} className="bg-kenya-red/10 border border-kenya-red/30 p-3 rounded-lg text-sm">
                                             <p className="font-bold text-kenya-red flex items-center gap-2 mb-1">
                                                 <AlertTriangle className="w-3 h-3" /> {flag}
                                             </p>
                                             <p className="text-brand-text-muted text-xs">
                                                 {analysis.suggestions[i]} 
                                                 {/* Note: This simplistic mapping assumes 1:1 flag to suggestion, which works for this mock. */}
                                             </p>
                                         </div>
                                     ))}

                                     {analysis.suggestions.length > analysis.flags.length && (
                                         <div className="bg-kenya-gold/10 border border-kenya-gold/30 p-3 rounded-lg text-sm">
                                             <p className="font-bold text-kenya-gold flex items-center gap-2 mb-1">
                                                 <Target className="w-3 h-3" /> Improvement Tip
                                             </p>
                                             <p className="text-brand-text-muted text-xs">
                                                 {analysis.suggestions[analysis.suggestions.length - 1]}
                                             </p>
                                         </div>
                                     )}
                                     
                                     {analysis.score >= 90 && analysis.flags.length === 0 && (
                                         <div className="bg-kenya-green/10 border border-kenya-green/30 p-3 rounded-lg text-sm flex items-start gap-2">
                                             <CheckCircle2 className="w-4 h-4 text-kenya-green mt-0.5" />
                                             <p className="text-brand-text text-xs">
                                                 Excellent! This pledge is specific, measurable, and within mandate.
                                             </p>
                                         </div>
                                     )}
                                 </div>
                             </div>
                         ) : (
                             <p className="text-sm text-brand-text-muted">
                                 Start typing to receive real-time feedback on mandate alignment, clarity, and impact.
                             </p>
                         )}
                     </div>
                 </div>
            </div>
        </div>
    </div>
  );
}
