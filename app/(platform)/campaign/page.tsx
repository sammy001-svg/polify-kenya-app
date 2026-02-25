'use client';

import { useState } from 'react';
import { CAMPAIGN_TEMPLATES, CampaignTemplate } from '@/lib/campaign-data';
import { CampaignTemplateCard } from '@/components/campaign/CampaignTemplateCard';
import { CandidateDashboard } from '@/components/campaign/CandidateDashboard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShieldCheck, FileCheck, ArrowRight, Flag, Users, FileText, Target, BarChart3, Calendar, Wallet, LayoutDashboard, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { ContestingPoliticians } from '@/components/campaign/ContestingPoliticians';

export default function CampaignPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<CampaignTemplate | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [viewMode, setViewMode] = useState<'setup' | 'dashboard'>('setup');

  // Auto-switch to dashboard when verified
  const toggleVerification = () => {
    setIsVerified(!isVerified);
    if (!isVerified) setViewMode('dashboard');
    else setViewMode('setup');
  };

  return (
    <div className="container mx-auto max-w-7xl py-6 px-4 space-y-6 h-full flex flex-col animate-in fade-in duration-700">
      {/* Dynamic Action Toolbar */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 bg-brand-surface/50 backdrop-blur-xl border border-white/5 p-6 rounded-3xl shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-kenya-red via-kenya-gold to-kenya-green opacity-50" />
        
        <div className="flex gap-5 items-center relative z-10">
          <div className="w-14 h-14 bg-kenya-red/10 rounded-2xl flex items-center justify-center shrink-0 border border-kenya-red/20 shadow-lg shadow-kenya-red/5">
             <Flag className="w-7 h-7 text-kenya-red" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight leading-none text-white italic">Campaign HQ</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-kenya-green animate-pulse" />
              <p className="text-xs text-brand-text-muted font-bold uppercase tracking-widest">Live Monitoring Active</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
            {[
              { href: "/campaign/content", icon: Sparkles, color: "text-purple-400", label: "AI Studio", glow: "shadow-purple-500/10" },
              { href: "/campaign/finance", icon: Wallet, color: "text-kenya-gold", label: "Finance", glow: "shadow-kenya-gold/10" },
              { href: "/campaign/events", icon: Calendar, color: "text-kenya-red", label: "Events", glow: "shadow-kenya-red/10" },
              { href: "/campaign/analytics", icon: BarChart3, color: "text-blue-400", label: "Analytics", glow: "shadow-blue-500/10" },
              { href: "/campaign/commitments", icon: Target, color: "text-kenya-gold", label: "Promises" },
              { href: "/campaign/publish", label: "Launch Campaign", primary: true },
              { href: "/campaign/manifesto", icon: FileText, label: "Manifesto" },
              { href: "/campaign/team", icon: Users, label: "Team" },
            ].map((tool) => (
              <Link key={tool.label} href={tool.href}>
                <Button 
                  variant={tool.primary ? "primary" : "secondary"} 
                  size="sm"
                  className={cn(
                    "gap-2 px-4 h-10 text-[11px] font-black uppercase tracking-wider transition-all rounded-xl border border-white/5",
                    tool.primary 
                      ? "bg-kenya-red hover:bg-white text-white hover:text-black shadow-lg shadow-kenya-red/20" 
                      : "bg-white/5 hover:bg-white/10 text-brand-text hover:border-brand-primary/30",
                    tool.glow
                  )}
                >
                  {tool.icon && <tool.icon className={cn("w-3.5 h-3.5", tool.color)} />}
                  <span className={cn(tool.primary ? "inline" : "hidden sm:inline")}>{tool.label}</span>
                </Button>
              </Link>
            ))}
            
            <div className="w-px h-8 bg-white/5 mx-2 hidden lg:block" />
            
            <button 
              className={cn(
                "flex items-center gap-2.5 px-4 py-2 rounded-xl border transition-all cursor-pointer shadow-inner",
                isVerified 
                  ? "bg-kenya-green/10 border-kenya-green/30 text-kenya-green" 
                  : "bg-white/5 border-white/10 text-brand-text-muted hover:border-brand-primary"
              )}
              onClick={toggleVerification}
            >
                <ShieldCheck className={cn("w-4 h-4", isVerified ? "text-kenya-green" : "text-brand-text-muted")} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {isVerified ? "Verified Identity" : "Verify Now"}
                </span>
            </button>
        </div>
      </div>
      
      {/* View Toggle (Only visible if verified) */}
      {isVerified && (
        <div className="flex gap-2">
            <Button 
              size="sm" 
              variant={viewMode === 'dashboard' ? 'secondary' : 'ghost'} 
              onClick={() => setViewMode('dashboard')}
              className={cn("gap-2", viewMode === 'dashboard' && "bg-brand-surface-highlight text-white")}
            >
               <LayoutDashboard className="w-4 h-4" /> Live Dashboard
            </Button>
            <Button 
              size="sm" 
              variant={viewMode === 'setup' ? 'secondary' : 'ghost'} 
              onClick={() => setViewMode('setup')}
              className={cn("gap-2", viewMode === 'setup' && "bg-brand-surface-highlight text-white")}
            >
               <FileCheck className="w-4 h-4" /> Campaign Setup
            </Button>
        </div>
      )}

      {viewMode === 'dashboard' && isVerified ? (
         <CandidateDashboard />
      ) : (
          !selectedTemplate ? (
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
               <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-1 h-6 bg-kenya-red rounded-full" />
                  Select Target Office
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {CAMPAIGN_TEMPLATES.map((template) => (
                      <CampaignTemplateCard 
                        key={template.office} 
                        template={template} 
                        onSelect={() => setSelectedTemplate(template)} 
                      />
                  ))}
               </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto pr-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-brand-surface border border-border rounded-2xl overflow-hidden">
                   <div className="bg-brand-surface-secondary/50 border-b border-border px-6 py-3 flex items-center justify-between">
                      <button 
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-text-muted hover:text-kenya-red transition-colors"
                        onClick={() => setSelectedTemplate(null)}
                      >
                        <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Back
                      </button>
                      <Button size="sm" className="bg-kenya-green hover:bg-kenya-green/90 text-white font-bold h-8 text-[11px] uppercase tracking-widest px-4">
                        Get Strategy Kit
                      </Button>
                   </div>
    
                   <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-kenya-orange/10 flex items-center justify-center">
                                    <selectedTemplate.icon className="w-5 h-5 text-kenya-orange" />
                                  </div>
                                  <div>
                                    <h2 className="text-2xl font-black">{selectedTemplate.title}</h2>
                                    <p className="text-sm text-brand-text-muted line-clamp-1">{selectedTemplate.description}</p>
                                  </div>
                                </div>
    
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-kenya-green uppercase tracking-wider">
                                            <ShieldCheck className="w-4 h-4" /> Mandate
                                        </h3>
                                        <ul className="space-y-2">
                                            {selectedTemplate.mandate.map((m, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs text-brand-text-muted leading-relaxed">
                                                    <span className="text-kenya-green mt-0.5">•</span> {m}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-kenya-orange uppercase tracking-wider">
                                            <FileCheck className="w-4 h-4" /> Documents
                                        </h3>
                                        <ul className="space-y-2">
                                            {selectedTemplate.requiredDocs.map((doc, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs text-brand-text-muted leading-relaxed">
                                                    <span className="text-kenya-orange mt-0.5">•</span> {doc}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className="lg:col-span-1">
                            <div className="bg-brand-surface-secondary p-5 rounded-xl border border-border h-full">
                                <h3 className="font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Target className="w-4 h-4 text-kenya-red" /> Roadmap
                                </h3>
                                <div className="space-y-4 relative pl-3 border-l-2 border-border/50">
                                    {selectedTemplate.stepByStep.map((step, i) => (
                                        <div key={i} className="relative pb-2">
                                            <div className="absolute -left-[18px] top-1 w-2.5 h-2.5 rounded-full bg-brand-surface border-2 border-kenya-green" />
                                            <h4 className="font-bold text-xs">{step.title}</h4>
                                            <p className="text-[11px] text-brand-text-muted mt-0.5 leading-snug">{step.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Contesting Politicians Section */}
                    <div className="mt-8 pt-8 border-t border-border/50">
                       <ContestingPoliticians office={selectedTemplate.office} />
                    </div>


                   </div>
               </div>
            </div>
          )
      )}
    </div>
  );
}
