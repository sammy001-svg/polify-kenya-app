'use client';

import { useState } from 'react';
import { CAMPAIGN_TEMPLATES, CampaignTemplate } from '@/lib/campaign-data';
import { CampaignTemplateCard } from '@/components/campaign/CampaignTemplateCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, FileCheck, ArrowRight, Flag, Users, UserCircle, FileText, Video, Target } from 'lucide-react';
import Link from 'next/link';

export default function CampaignPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<CampaignTemplate | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-border pb-6">
        <div>
          <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
             <Flag className="w-8 h-8 text-kenya-red" />
             Campaign HQ
          </h1>
          <p className="text-lg text-brand-text-muted">
            Launch your political journey. Select your office and access verified campaign tools.
          </p>
        </div>
        
        {/* Verification Status Simulation */}
        <div className="flex items-center gap-4">
            <Link href="/campaign/commitments">
                <Button variant="outline" className="bg-brand-surface border-border hover:bg-brand-surface-secondary gap-2 text-brand-text">
                    <Target className="w-4 h-4 text-kenya-gold" /> Promises
                </Button>
            </Link>
            <Link href="/campaign/publish">
                <Button className="bg-kenya-red hover:bg-kenya-red/90 text-white gap-2">
                    <Video className="w-4 h-4" /> Publish Content
                </Button>
            </Link>
            <Link href="/campaign/manifesto">
                <Button variant="outline" className="border-border hover:bg-brand-surface-secondary gap-2">
                    <FileText className="w-4 h-4" /> Manifesto
                </Button>
            </Link>
            <Link href="/campaign/profile">
                <Button variant="outline" className="border-border hover:bg-brand-surface-secondary gap-2">
                    <UserCircle className="w-4 h-4" /> My Profile
                </Button>
            </Link>
            <Link href="/campaign/team">
                <Button variant="outline" className="border-border hover:bg-brand-surface-secondary gap-2">
                    <Users className="w-4 h-4" /> Manage Team
                </Button>
            </Link>

            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                isVerified ? 'bg-kenya-green/10 border-kenya-green/30' : 'bg-brand-surface-secondary border-border'
            }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isVerified ? 'bg-kenya-green text-white' : 'bg-brand-surface border border-border text-brand-text-muted'
            }`}>
                <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
                <p className="text-sm font-bold">{isVerified ? 'Verified Candidate' : 'Verification Pending'}</p>
                {!isVerified && (
                    <button 
                        onClick={() => setIsVerified(true)} 
                        className="text-xs text-kenya-orange hover:underline font-medium"
                    >
                        Click to Verify Identity
                    </button>
                )}
            </div>
        </div>
      </div>
      </div>

      {!selectedTemplate ? (
        <div className="space-y-6">
           <h2 className="text-2xl font-bold">Select Your Target Office</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
           {/* Detailed View */}
           <div className="bg-brand-surface border border-border rounded-xl p-8">
               <div className="flex items-center gap-2 mb-6 text-brand-text-muted cursor-pointer hover:text-brand-text" onClick={() => setSelectedTemplate(null)}>
                  <ArrowRight className="w-4 h-4 rotate-180" /> Back to Selection
               </div>

               <div className="flex flex-col md:flex-row gap-8">
                   <div className="flex-1 space-y-6">
                       <div className="space-y-2">
                           <Badge variant="outline" className="border-kenya-orange text-kenya-orange uppercase tracking-wider">
                                {selectedTemplate.office}
                           </Badge>
                           <h2 className="text-3xl font-black">{selectedTemplate.title}</h2>
                           <p className="text-lg text-brand-text-muted">{selectedTemplate.description}</p>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div>
                               <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                   <ShieldCheck className="w-5 h-5 text-kenya-green" /> Constitution Mandate
                               </h3>
                               <ul className="space-y-2">
                                   {selectedTemplate.mandate.map((m, i) => (
                                       <li key={i} className="flex items-start gap-2 text-sm text-brand-text-muted">
                                           <span className="text-kenya-green mt-1">•</span> {m}
                                       </li>
                                   ))}
                               </ul>
                           </div>
                           <div>
                               <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                   <FileCheck className="w-5 h-5 text-kenya-orange" /> Required Documents
                               </h3>
                               <ul className="space-y-2">
                                   {selectedTemplate.requiredDocs.map((doc, i) => (
                                       <li key={i} className="flex items-start gap-2 text-sm text-brand-text-muted">
                                           <span className="text-kenya-orange mt-1">•</span> {doc}
                                       </li>
                                   ))}
                               </ul>
                           </div>
                       </div>
                   </div>

                   {/* Quick Actions / Step-by-Step */}
                   <div className="w-full md:w-80 space-y-4">
                       <div className="bg-brand-surface-highlight p-6 rounded-xl border border-border">
                           <h3 className="font-bold mb-4">Campaign Roadmap</h3>
                           <div className="space-y-6 relative pl-4 border-l-2 border-border">
                               {selectedTemplate.stepByStep.map((step, i) => (
                                   <div key={i} className="relative">
                                       <div className="absolute -left-[21px] top-0 w-4 h-4 rounded-full bg-brand-surface border-2 border-kenya-green" />
                                       <h4 className="font-bold text-sm">{step.title}</h4>
                                       <p className="text-xs text-brand-text-muted mt-1">{step.description}</p>
                                   </div>
                               ))}
                           </div>
                           <Button className="w-full mt-6 bg-kenya-green hover:bg-kenya-green/90 text-white">
                               Download {selectedTemplate.office} Strategy Kit
                           </Button>
                       </div>
                   </div>
               </div>
           </div>
        </div>
      )}
    </div>
  );
}
