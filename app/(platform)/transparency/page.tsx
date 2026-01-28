"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Scale, Clock, ShieldCheck, TrendingUp, Coins, Server } from "lucide-react";
import { BudgetBreakdown } from "@/components/transparency/BudgetBreakdown";
import { cn } from "@/lib/utils";

export default function TransparencyPage() {
  const [activeTab, setActiveTab] = useState<'finance' | 'platform'>('finance');

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */} 
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 tracking-tight">Transparency Hub</h1>
            <p className="text-brand-text-muted">
               Monitoring both Government Spending and Platform Algorithms.
            </p>
          </div>
          
          <div className="flex bg-brand-surface border border-white/10 rounded-lg p-1 gap-1">
             <button
               onClick={() => setActiveTab('finance')}
               className={cn(
                 "px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2",
                 activeTab === 'finance' ? "bg-brand-surface-highlight text-white shadow-sm" : "text-brand-text-muted hover:text-white"
               )}
             >
                <Coins className="w-4 h-4" /> Public Finance
             </button>
             <button
               onClick={() => setActiveTab('platform')}
               className={cn(
                 "px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2",
                 activeTab === 'platform' ? "bg-brand-surface-highlight text-white shadow-sm" : "text-brand-text-muted hover:text-white"
               )}
             >
                <Server className="w-4 h-4" /> Platform Algo
             </button>
          </div>
      </div>

      {/* Tab Content: Public Finance */}
      {activeTab === 'finance' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="mb-8 bg-brand-surface border border-kenya-gold/30 rounded-xl p-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Coins className="w-32 h-32 text-kenya-gold" />
                 </div>
                 <h2 className="text-xl font-bold mb-2 text-white">National Budget Tracker (2025/26)</h2>
                 <p className="text-sm text-brand-text-muted max-w-2xl leading-relaxed">
                    We track every shilling allocated to national ministries. Data is sourced from the 
                    <span className="text-kenya-gold font-bold"> Office of the Controller of Budget</span> and 
                    Audit General reports. High-risk flags indicate sectors with unresolved audit queries.
                 </p>
             </div>
             <BudgetBreakdown />
        </div>
      )}

      {/* Tab Content: Platform Algorithms */}
      {activeTab === 'platform' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* What We Rank On */}
            <Card className="bg-brand-surface border-green-500/30">
                <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-6 h-6" />
                    What We Prioritize
                </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-400 mt-1" />
                    <div>
                    <h3 className="font-bold mb-1">Verification Status</h3>
                    <p className="text-sm text-brand-text-muted">
                        Content from verified sources and fact-checked material ranks higher.
                    </p>
                    </div>
                </div>
                
                <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-green-400 mt-1" />
                    <div>
                    <h3 className="font-bold mb-1">Recency & Relevance</h3>
                    <p className="text-sm text-brand-text-muted">
                        Recent content on topics relevant to your county or interests.
                    </p>
                    </div>
                </div>
                
                <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-400 mt-1" />
                    <div>
                    <h3 className="font-bold mb-1">Engagement Quality</h3>
                    <p className="text-sm text-brand-text-muted">
                        We measure thoughtful discussion, not just clicks. Comments that ask questions rank higher than angry reactions.
                    </p>
                    </div>
                </div>
                
                <div className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-green-400 mt-1" />
                    <div>
                    <h3 className="font-bold mb-1">Viewpoint Diversity</h3>
                    <p className="text-sm text-brand-text-muted">
                        We actively balance your feed to include government, opposition, and independent perspectives.
                    </p>
                    </div>
                </div>
                </CardContent>
            </Card>

            {/* What We DON'T Rank On */}
            <Card className="bg-brand-surface border-red-500/30">
                <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                    <XCircle className="w-6 h-6" />
                    What We Explicitly Avoid
                </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 mt-1" />
                    <div>
                    <h3 className="font-bold mb-1">Outrage Amplification</h3>
                    <p className="text-sm text-brand-text-muted">
                        We don&apos;t boost content just because it makes people angry. Emotional manipulation is penalized.
                    </p>
                    </div>
                </div>
                
                <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 mt-1" />
                    <div>
                    <h3 className="font-bold mb-1">Clickbait Farming</h3>
                    <p className="text-sm text-brand-text-muted">
                        Misleading titles or sensationalist framing are downranked automatically.
                    </p>
                    </div>
                </div>
                
                <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 mt-1" />
                    <div>
                    <h3 className="font-bold mb-1">Echo Chamber Formation</h3>
                    <p className="text-sm text-brand-text-muted">
                        We don&apos;t show you only what you agree with. Balanced exposure to diverse views is a core principle.
                    </p>
                    </div>
                </div>
                
                <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 mt-1" />
                    <div>
                    <h3 className="font-bold mb-1">Paid Promotion (Hidden)</h3>
                    <p className="text-sm text-brand-text-muted">
                        All sponsored content is clearly labeled. Organic ranking cannot be bought.
                    </p>
                    </div>
                </div>
                </CardContent>
            </Card>

            <div className="text-center text-sm text-brand-text-muted pt-4">
                <p>This page is updated whenever we change our ranking algorithm.</p>
                <p className="mt-1">Last updated: January 2026</p>
            </div>
        </div>
      )}
    </div>
  );
}
