"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ClipboardCheck,
  ShieldCheck,
  Search,
  Scale,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Info,
  Clock,
  AlertTriangle
} from "lucide-react";
import { mockEducationResources, EducationResource } from "@/data/iebc-data";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RegistrationCentrePopup } from "./RegistrationCentrePopup";

const iconMap: Record<string, React.ElementType> = {
  ClipboardCheck,
  ShieldCheck,
  Search,
  Scale,
};

export function VoterEducation() {
  const [selectedResource, setSelectedResource] = useState<EducationResource | null>(null);

  const getResourceContent = (id: string) => {
    switch (id) {
      case "1": // How to register as a voter
        return (
          <div className="space-y-6 mt-4 text-brand-text">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/50 border border-white/5">
              <div className="p-2 bg-brand-primary/20 rounded-lg text-brand-primary shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Eligibility Criteria</h4>
                <p className="text-sm text-brand-text-muted">You must be a Kenyan citizen, 18 years of age or older, and of sound mind.</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-black uppercase tracking-widest text-xs text-brand-text-muted">Required Documents</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-kenya-green" /> Original National ID Card OR
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-kenya-green" /> A Valid Kenyan Passport
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-black uppercase tracking-widest text-xs text-brand-text-muted">The Process</h4>
              <ol className="relative border-l border-white/10 ml-2 space-y-4">
                <li className="pl-6 relative">
                  <div className="absolute w-3 h-3 bg-brand-primary rounded-full -left-[6px] top-1.5 border-2 border-brand-surface"></div>
                  <h5 className="font-bold text-sm text-white">Visit a Centre</h5>
                  <p className="text-xs text-brand-text-muted mt-1">Go to any designated IEBC registration centre in your constituency.</p>
                </li>
                <li className="pl-6 relative">
                  <div className="absolute w-3 h-3 bg-white/20 rounded-full -left-[6px] top-1.5 border-2 border-brand-surface"></div>
                  <h5 className="font-bold text-sm text-white">Biometric Capture</h5>
                  <p className="text-xs text-brand-text-muted mt-1">Clerks will capture your fingerprints and facial photo.</p>
                </li>
                <li className="pl-6 relative">
                  <div className="absolute w-3 h-3 bg-white/20 rounded-full -left-[6px] top-1.5 border-2 border-brand-surface"></div>
                  <h5 className="font-bold text-sm text-white">Acknowledgement Slip</h5>
                  <p className="text-xs text-brand-text-muted mt-1">You will receive a printed slip confirming your registration.</p>
                </li>
              </ol>
            </div>
          </div>
        );
      case "2": // Your rights on election day
        return (
          <div className="space-y-6 mt-4 text-brand-text">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-black/50 border border-white/5">
                <ShieldCheck className="w-6 h-6 text-brand-primary mb-2" />
                <h4 className="font-bold text-white text-sm mb-1">Secrecy of the Ballot</h4>
                <p className="text-xs text-brand-text-muted">Your vote is your secret. No one is allowed to see who you vote for or coerce your choice in the booth.</p>
              </div>
              <div className="p-4 rounded-xl bg-black/50 border border-white/5">
                <Clock className="w-6 h-6 text-kenya-green mb-2" />
                <h4 className="font-bold text-white text-sm mb-1">Time Off to Vote</h4>
                <p className="text-xs text-brand-text-muted">Employers are legally expected to allow employees reasonable time to visit polling stations to cast their votes.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-kenya-primary bg-brand-primary/5">
              <h4 className="font-bold text-brand-primary mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" /> Assisted Voting
              </h4>
              <p className="text-sm text-brand-text-muted leading-relaxed">
                Voters with disabilities, the elderly, or illiterate voters have the right to be assisted by a person of their choice (who must be 18+) or by the presiding officer in the presence of political party agents.
              </p>
            </div>
          </div>
        );
      case "3": // How to verify your status
        return (
          <div className="space-y-6 mt-4 text-brand-text">
            <p className="text-sm text-brand-text-muted leading-relaxed">
              The IEBC conducts voter verification exercises before any major election to ensure your details are correctly captured in the biometric register.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-black/50 border border-white/5 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0">
                  <span className="font-black text-brand-primary">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Online Portal</h4>
                  <p className="text-xs text-brand-text-muted mt-1 leading-relaxed">
                    You can verify your details directly on the official IEBC online verification portal by inserting your ID details. You can even try our integrated verification tool on this page!
                  </p>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-black/50 border border-white/5 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-kenya-green/20 flex items-center justify-center shrink-0">
                  <span className="font-black text-kenya-green">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">SMS Verification</h4>
                  <p className="text-xs text-brand-text-muted mt-1 leading-relaxed">
                    Send your ID number or Passport number (used during registration) via SMS to <span className="font-mono bg-white/10 px-1 py-0.5 rounded text-white">70000</span>. Standard carrier rates apply.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/50 border border-white/5 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <span className="font-black text-white">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Physical Verification</h4>
                  <p className="text-xs text-brand-text-muted mt-1 leading-relaxed">
                    Visit your registered polling station during the official 30-day verification period with your original ID/Passport.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case "4": // Election dispute resolution
        return (
          <div className="space-y-6 mt-4 text-brand-text">
            <div className="p-4 rounded-xl border border-kenya-red/30 bg-kenya-red/5">
              <h4 className="font-bold text-kenya-red mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> The Resolution Process
              </h4>
              <p className="text-sm text-brand-text-muted leading-relaxed">
                The IEBC emphasizes peaceful, legal channels for any election grievances. All disputes are handled strictly according to constitutional timelines.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-black uppercase tracking-widest text-xs text-brand-text-muted">Key Dispute Channels</h4>
              
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                  <h5 className="font-bold text-sm text-white">1. Political Parties Disputes Tribunal (PPDT)</h5>
                  <p className="text-xs text-brand-text-muted mt-1">Handles disputes arising from party primaries before candidates are officially cleared by the IEBC.</p>
                </div>
                
                <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                  <h5 className="font-bold text-sm text-white">2. IEBC Dispute Resolution Committee</h5>
                  <p className="text-xs text-brand-text-muted mt-1">Hears and determines complaints regarding candidate nomination and clearance by returning officers.</p>
                </div>
                
                <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                  <h5 className="font-bold text-sm text-white">3. Electoral Courts & Supreme Court</h5>
                  <p className="text-xs text-brand-text-muted mt-1">After elections, petitions for local seats go to High/Collegiate courts. Presidential petitions go directly to the Supreme Court, which must determine the case within 14 days.</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-kenya-green" />
            Voter Education Hub
          </h2>
          <p className="text-sm text-brand-text-muted">
            Empowering you with knowledge for the next election.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-brand-primary hover:text-brand-primary/80 gap-1 hidden sm:flex"
        >
          View All <ArrowRight className="w-3 h-3" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockEducationResources.map((resource) => {
          const Icon = iconMap[resource.icon] || ClipboardCheck;
          return (
            <Card
              key={resource.id}
              onClick={() => setSelectedResource(resource)}
              className="bg-brand-surface border-white/5 hover:border-brand-primary/20 transition-all group cursor-pointer overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon className="w-16 h-16 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-white/5 text-brand-primary border border-white/5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">
                    {resource.category}
                  </span>
                </div>
                <CardTitle className="text-sm font-bold group-hover:text-brand-primary transition-colors pr-8">
                  {resource.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-brand-text-muted leading-relaxed line-clamp-2 pr-8">
                  {resource.summary}
                </p>
                <div className="mt-4 flex items-center gap-1 text-[10px] font-black uppercase text-brand-primary opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  Read More <ExternalLink className="w-3 h-3" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-linear-to-br from-kenya-red/20 to-transparent border-kenya-red/20 overflow-hidden relative group">
        <div className="absolute -bottom-4 -right-4 opacity-10 rotate-12 transition-transform group-hover:scale-110 group-hover:rotate-6">
          <ClipboardCheck className="w-32 h-32 text-white" />
        </div>
        <CardContent className="p-6 relative z-10">
          <h3 className="text-lg font-black italic tracking-tighter text-white mb-2">
            READY TO REGISTER?
          </h3>
          <p className="text-sm text-white/70 max-w-sm mb-4 leading-relaxed font-medium">
            Join the millions of Kenyans making their voices count. Find your
            nearest registration centre today.
          </p>
          <RegistrationCentrePopup>
            <Button className="bg-white text-black font-black uppercase tracking-widest text-[10px] h-9 px-6 rounded-xl hover:bg-white/90">
              Find Centres Now
            </Button>
          </RegistrationCentrePopup>
        </CardContent>
      </Card>

      {/* Pop-up Modals for Voter Education Cards */}
      <Dialog open={!!selectedResource} onOpenChange={(open) => !open && setSelectedResource(null)}>
        <DialogContent className="sm:max-w-xl bg-brand-surface border-white/10 text-brand-text">
          {selectedResource && (() => {
            const Icon = iconMap[selectedResource.icon] || ClipboardCheck;
            return (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted block mb-0.5">
                        {selectedResource.category}
                      </span>
                      <DialogTitle className="text-xl md:text-2xl font-black text-white leading-tight">
                        {selectedResource.title}
                      </DialogTitle>
                    </div>
                  </div>
                  <DialogDescription className="text-sm text-brand-text-muted mt-2">
                    {selectedResource.summary}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-2">
                  {getResourceContent(selectedResource.id)}
                </div>

                <div className="mt-6 flex justify-end">
                  <Button 
                    onClick={() => setSelectedResource(null)}
                    className="bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl px-6 h-10 text-xs font-bold uppercase tracking-widest"
                  >
                    Close
                  </Button>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
