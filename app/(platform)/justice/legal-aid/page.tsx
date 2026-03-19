"use client";

import React from "react";
import Link from "next/link";
import { 
  Scale, 
  ArrowLeft, 
  ShieldCheck, 
  Info,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  ChevronRight,
  Building2,
  Users
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EligibilityChecker } from "@/components/justice/EligibilityChecker";

export default function LegalAidPage() {
  return (
    <div className="min-h-screen space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Back Navigation & Breadcrumb */}
      <div className="flex items-center gap-4 mb-4">
        <Link href="/justice">
          <Button variant="ghost" size="sm" className="text-brand-text-muted hover:text-white rounded-full gap-2 -ml-2">
            <ArrowLeft className="h-4 w-4" /> Back to Justice Portal
          </Button>
        </Link>
        <div className="h-4 w-px bg-white/10" />
        <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
          Free Legal Representation
        </span>
      </div>

      {/* Header Section */}
      <div className="relative rounded-3xl overflow-hidden border border-brand-accent/20 bg-brand-bg/50 backdrop-blur-md p-10">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-brand-primary/5 to-transparent" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-kenya-gold/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-primary/10 rounded-2xl">
              <Scale className="h-8 w-8 text-brand-primary" />
            </div>
            <div className="space-y-1">
              <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 text-[9px] font-black uppercase px-2 mb-1">
                Official NLAS Framework
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-[0.9]">
                LEGAL AID <span className="text-brand-primary">PORTAL</span>
              </h1>
            </div>
          </div>
          
          <p className="text-brand-text-muted text-lg font-medium leading-relaxed">
            The Constitution of Kenya (Art. 48) guarantees access to justice for every citizen.
            The National Legal Aid Service (NLAS) provides free legal advice and representation 
            to those who cannot afford it.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
              <ShieldCheck className="h-4 w-4 text-brand-primary" />
              <span className="text-[11px] font-black uppercase tracking-widest text-white">Verified Aid</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
              <Users className="h-4 w-4 text-kenya-gold" />
              <span className="text-[11px] font-black uppercase tracking-widest text-white">Pro-Bono Network</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Eligibility & Request */}
        <div className="lg:col-span-2 space-y-8">
           <EligibilityChecker />

           {/* Legal Aid Clinics */}
           <div className="space-y-6">
             <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-kenya-gold/10 rounded-lg">
                   <Building2 className="h-5 w-5 text-kenya-gold" />
                 </div>
                 <h2 className="text-xl font-black uppercase tracking-tight text-white">Regional Aid Clinics</h2>
               </div>
               <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-brand-primary">View All Sites</Button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { name: "NLAS Nairobi", loc: "Sheria House, Harambee Ave", phone: "0800 123 456", status: "Open" },
                 { name: "Mombasa Justice Center", loc: "Old Port, Mombasa Central", phone: "0800 789 012", status: "Open" },
                 { name: "Kisumu Legal Hotline", loc: "Prosperity House, Kisumu", phone: "0800 345 678", status: "Busy" },
                 { name: "Nakuru Aid Hub", loc: "County Secretariat", phone: "0800 901 234", status: "Available" },
               ].map((site) => (
                 <div key={site.name} className="bg-brand-surface/40 border border-white/5 p-5 rounded-2xl group hover:border-brand-primary/30 transition-all">
                   <div className="flex justify-between items-start mb-4">
                     <h3 className="font-bold text-white uppercase tracking-tight">{site.name}</h3>
                     <Badge variant="outline" className="text-[8px] font-black uppercase border-brand-primary/20 text-brand-primary">{site.status}</Badge>
                   </div>
                   <div className="space-y-2 mb-6">
                     <div className="flex items-center gap-2 text-xs text-brand-text-muted">
                        <MapPin className="h-3 w-3 text-brand-primary" /> {site.loc}
                     </div>
                     <div className="flex items-center gap-2 text-xs text-brand-text-muted">
                        <Phone className="h-3 w-3 text-kenya-gold" /> {site.phone}
                     </div>
                   </div>
                   <Button className="w-full h-10 bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest gap-2 rounded-xl transition-all">
                     <Clock className="w-3 h-3" /> Get Queue Status <ChevronRight className="w-3 h-3" />
                   </Button>
                 </div>
               ))}
             </div>
           </div>
        </div>

        {/* Right Column: Information & Resources */}
        <div className="space-y-8">
          <Card className="bg-linear-to-br from-brand-primary/10 to-transparent border-brand-primary/20 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                <Info className="h-5 w-5 text-brand-primary" />
                Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-brand-text-muted font-medium leading-relaxed">
                Legal aid is prioritized for criminal cases, matters involving children, 
                human rights violations, and marginalized groups.
              </p>
              <div className="space-y-2">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1">
                  <h4 className="text-[10px] font-black uppercase text-brand-primary">Requirement 1</h4>
                  <p className="text-[10px] text-brand-text-muted">Must be a Kenyan citizen or resident.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1">
                  <h4 className="text-[10px] font-black uppercase text-brand-primary">Requirement 2</h4>
                  <p className="text-[10px] text-brand-text-muted">Proof of income below poverty line.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-brand-surface/50 border-white/5">
            <CardHeader>
              <CardTitle className="text-lg font-black uppercase tracking-tight">Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Legal Aid Act 2016",
                  "Fair Trial Guidelines",
                  "Bail and Bond Policy",
                  "Children's Protection manual"
                ].map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 rounded-xl border border-white/5 hover:bg-white/5 cursor-pointer transition-all group">
                    <span className="text-xs text-white/70 group-hover:text-white transition-colors">{item}</span>
                    <ExternalLink className="h-3 w-3 text-brand-text-muted group-hover:text-brand-primary" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
