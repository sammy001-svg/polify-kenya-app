"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, AlertTriangle, Scale, Zap, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getPolicyById } from "@/lib/policy-data";
import { PolicyComments } from "@/components/policy/PolicyComments";

export default function PolicyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const policyId = params.policyId as string;
  
  const policy = getPolicyById(policyId);

  if (!policy) {
      if (!policyId) return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
        </div>
      );
      
      return (
          <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
              <h1 className="text-2xl font-bold text-white">Policy Not Found</h1>
              <Button onClick={() => router.push('/policies')}>Return to Dashboard</Button>
          </div>
      )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] overflow-hidden bg-brand-bg">
        
        {/* Header */}
        <div className="border-b border-white/5 bg-brand-surface p-6 shrink-0">
            <Link href="/policies" className="flex items-center gap-2 text-sm text-brand-text-muted hover:text-white transition-colors mb-4">
                <ArrowLeft className="w-4 h-4" /> Back to Policies
            </Link>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                     <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 rounded bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-widest border border-brand-primary/20">
                            {policy.category}
                        </span>
                        <span className="text-xs text-brand-text-muted font-mono">
                            Last Updated: {policy.lastUpdated}
                        </span>
                     </div>
                     <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                         {policy.title}
                     </h1>
                     <p className="text-lg text-brand-text-muted max-w-3xl">
                         {policy.summary}
                     </p>
                </div>

                {/* AI Scorecard Summary */}
                <div className="flex gap-4 p-4 rounded-2xl bg-black/20 border border-white/5 backdrop-blur-sm">
                    <div className="text-center">
                        <div className="text-[10px] text-brand-text-muted uppercase tracking-wider mb-1">Impact</div>
                        <div className="text-2xl font-black text-kenya-green">{policy.impactScore}%</div>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div className="text-center">
                        <div className="text-[10px] text-brand-text-muted uppercase tracking-wider mb-1">Cost</div>
                        <div className="text-2xl font-black text-kenya-red">{policy.fiscalLoad}</div>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div className="text-center">
                        <div className="text-[10px] text-brand-text-muted uppercase tracking-wider mb-1">Feasibility</div>
                        <div className="text-2xl font-black text-brand-primary">{policy.feasibility}%</div>
                    </div>
                </div>
            </div>
        </div>

        <ScrollArea className="flex-1">
            <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                
                {/* Left Col: Analysis (2 cols wide) */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Impact Statement */}
                    <div className="p-6 rounded-2xl bg-linear-to-br from-brand-primary/10 to-transparent border border-brand-primary/20">
                        <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-brand-primary mb-3">
                            <Zap className="w-4 h-4" /> The Bottom Line
                        </h3>
                        <p className="text-white text-lg font-medium leading-relaxed">
                            {policy.impactStatement}
                        </p>
                    </div>

                    {/* Pros vs Cons */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl bg-kenya-green/5 border border-kenya-green/10">
                            <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-kenya-green mb-4">
                                <CheckCircle className="w-4 h-4" /> The Good (Pros)
                            </h3>
                            <ul className="space-y-3">
                                {policy.pros.map((pro, i) => (
                                    <li key={i} className="flex gap-3 text-brand-text-muted text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-kenya-green mt-1.5 shrink-0" />
                                        {pro}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-6 rounded-2xl bg-kenya-red/5 border border-kenya-red/10">
                            <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-kenya-red mb-4">
                                <AlertTriangle className="w-4 h-4" /> The Bad (Cons)
                            </h3>
                            <ul className="space-y-3">
                                {policy.cons.map((con, i) => (
                                    <li key={i} className="flex gap-3 text-brand-text-muted text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-kenya-red mt-1.5 shrink-0" />
                                        {con}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Key Clauses Breakdown */}
                    <div>
                        <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-6">
                            <Scale className="w-5 h-5 text-brand-text-muted" /> Key Clauses Breakdown
                        </h3>
                        <div className="space-y-4">
                            {policy.keyClauses.map((clause, i) => (
                                <div key={i} className="p-5 rounded-xl bg-brand-surface border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="font-bold text-white">{clause.title}</h4>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                                            clause.impact === 'positive' ? 'bg-kenya-green/20 text-kenya-green' :
                                            clause.impact === 'negative' ? 'bg-kenya-red/20 text-kenya-red' :
                                            'bg-white/10 text-brand-text-muted'
                                        }`}>
                                            {clause.impact} Impact
                                        </span>
                                    </div>
                                    <p className="text-sm text-brand-text-muted leading-relaxed">
                                        {clause.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Col: Discussion */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="p-6 rounded-2xl bg-brand-surface border border-white/5">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <Info className="w-4 h-4 text-brand-text-muted" /> Public Discussion
                        </h3>
                        <p className="text-xs text-brand-text-muted mb-6">
                            Verified citizens are debating this policy. Join the conversation to flag concerns or support specific clauses.
                        </p>
                        
                        {/* Reusing the discussion component but scoping to policy */}
                        <div className="bg-black/20 rounded-xl p-1 -mx-2">
                             <PolicyComments policyId={policy.id} />
                        </div>
                    </div>
                </div>

            </div>
        </ScrollArea>
    </div>
  );
}
