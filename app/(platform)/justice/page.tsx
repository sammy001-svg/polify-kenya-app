"use client";

import React from "react";
import Link from "next/link";
import { 
  Gavel, 
  Scale, 
  ShieldCheck, 
  FileText,
  AlertTriangle,
  Building2,
  BookOpen,
  Heart,
  Eye,
  MessageSquare,
  ShieldAlert,
  UserPlus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { ConstitutionChat } from "@/components/constitution/ConstitutionChat";
import { JudicialIntegrityMetrics } from "@/components/transparency/JudicialIntegrityMetrics";
import { AdvocateSearch } from "@/components/justice/AdvocateSearch";
import { AdvocateRegistration } from "@/components/justice/AdvocateRegistration";
import { cn } from "@/lib/utils";

export default function JusticePage() {
  return (
    <div className="min-h-screen space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-kenya-red/10 rounded-lg">
              <Gavel className="w-5 h-5 text-kenya-red" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted">
              Judicial Transparency Portal
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight">
            JUSTICE <span className="text-brand-primary">MONITOR</span>
          </h1>
          <p className="text-brand-text-muted max-w-2xl font-medium leading-relaxed">
            Real-time tracking of judicial proceedings, constitutional compliance, and legal integrity. 
            Empowering citizens with knowledge of their rights and the rule of law.
          </p>
        </div>
        
        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-kenya-gold/20 hover:bg-kenya-gold/5 text-xs font-black uppercase tracking-widest px-6 h-12 rounded-2xl gap-2 transition-all">
                <UserPlus className="w-4 h-4 text-kenya-gold" /> Register as Advocate
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-brand-bg border-white/10 p-0 overflow-hidden">
              <div className="bg-linear-to-r from-kenya-gold via-brand-primary to-kenya-gold h-1 w-full" />
              <div className="p-8">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                    <div className="p-2 bg-kenya-gold/10 rounded-lg">
                      <UserPlus className="h-5 w-5 text-kenya-gold" />
                    </div>
                    Advocate Registration
                  </DialogTitle>
                  <DialogDescription className="text-brand-text-muted">
                    Join our verified professional network to assist citizens in your area. 
                    LSK certification is required for validation.
                  </DialogDescription>
                </DialogHeader>
                <div className="max-h-[70vh] overflow-y-auto pr-2 scrollbar-hide">
                  <AdvocateRegistration />
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Link href="/justice/legal-aid">
            <Button variant="outline" className="border-white/10 hover:bg-white/5 text-xs font-black uppercase tracking-widest px-6 h-12 rounded-2xl gap-2 transition-all">
              <Scale className="w-4 h-4" /> Legal Aid
            </Button>
          </Link>
          <Button className="bg-brand-primary text-black hover:bg-white font-black uppercase tracking-widest text-xs px-8 h-12 rounded-2xl shadow-xl shadow-brand-primary/20 transition-all text-nowrap">
            Track Case
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-2xl h-auto flex gap-1 w-fit mb-8 overflow-x-auto scrollbar-hide max-w-full">
          <TabsTrigger value="overview" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-brand-primary data-[state=active]:text-black text-xs font-black uppercase tracking-widest transition-all">
            System Overview
          </TabsTrigger>
          <TabsTrigger value="cases" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-brand-primary data-[state=active]:text-black text-xs font-black uppercase tracking-widest transition-all">
            Constitutional Cases
          </TabsTrigger>
          <TabsTrigger value="integrity" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-brand-primary data-[state=active]:text-black text-xs font-black uppercase tracking-widest transition-all">
             Judicial Integrity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8 animate-in slide-in-from-bottom-5 duration-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-brand-surface border-white/5 relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 opacity-5 rotate-12 group-hover:rotate-6 transition-transform duration-500">
                <Building2 className="w-32 h-32" />
              </div>
              <CardHeader>
                <CardDescription className="text-brand-primary font-black uppercase tracking-widest text-[10px]">Active Courts</CardDescription>
                <CardTitle className="text-3xl font-black text-white">142</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-brand-text-muted">Functioning specialized and high courts across 47 counties.</p>
              </CardContent>
            </Card>

            <Card className="bg-brand-surface border-white/5 relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 opacity-5 rotate-12 group-hover:rotate-6 transition-transform duration-500">
                <FileText className="w-32 h-32" />
              </div>
              <CardHeader>
                <CardDescription className="text-kenya-green font-black uppercase tracking-widest text-[10px]">Cases Resolved</CardDescription>
                <CardTitle className="text-3xl font-black text-white">12,408</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-brand-text-muted">Constitutional petitions and public interest litigations this year.</p>
              </CardContent>
            </Card>

            <Card className="bg-brand-surface border-white/5 relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 opacity-5 rotate-12 group-hover:rotate-6 transition-transform duration-500">
                <ShieldCheck className="w-32 h-32" />
              </div>
              <CardHeader>
                <CardDescription className="text-kenya-red font-black uppercase tracking-widest text-[10px]">Integrity Score</CardDescription>
                <CardTitle className="text-3xl font-black text-white">84%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-brand-text-muted">Public confidence rating in Supreme and High Court rulings.</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="lg:col-span-2 space-y-8">
                <AdvocateSearch />
             </div>

             <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-kenya-red" />
                  Legal Awareness
                </h3>
                
                <Card className="bg-linear-to-br from-kenya-red/20 to-transparent border-kenya-red/20">
                  <CardContent className="p-6 space-y-4">
                    <p className="text-sm text-brand-text-muted leading-relaxed">
                      Do you know your rights regarding unlawful search and seizure? The Constitution provides clear protections.
                    </p>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-white/90 italic leading-relaxed">
                      &quot;Every person has the right to privacy, which includes the right not to have their person, home or property searched...&quot;
                      <br />— Article 31, Constitution of Kenya
                    </div>
                    <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest">
                      View Civil Rights Guide
                    </Button>
                  </CardContent>
                </Card>

                <div className="p-5 rounded-2xl bg-brand-surface border border-brand-primary/10 space-y-4 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Scale className="w-12 h-12 text-brand-primary" />
                  </div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-brand-primary" />
                    Emergency Legal Aid
                  </h4>
                  <p className="text-xs text-brand-text-muted">
                    If you are facing an immediate legal crisis or human rights violation, use our emergency hotline for rapid assistance.
                  </p>
                  <Button className="w-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 hover:bg-brand-primary/20 text-[10px] font-black uppercase tracking-widest h-10 rounded-xl">
                    Call Emergency Desk
                  </Button>
                </div>
             </div>
          </div>
        </TabsContent>

        <TabsContent value="cases" className="space-y-10 animate-in slide-in-from-bottom-5 duration-700">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Constitutional Chat */}
              <div className="space-y-6">
                 <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white flex items-center gap-3">
                       <Scale className="w-6 h-6 text-brand-primary" />
                       EXPLORE YOUR RIGHTS
                    </h3>
                    <p className="text-sm text-brand-text-muted font-medium">
                       Ask our AI guardian about specific constitutional articles and how they apply to your life.
                    </p>
                 </div>
                 <ConstitutionChat />
              </div>

              {/* Bill of Rights Quick Reference */}
              <div className="space-y-6">
                 <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white flex items-center gap-3">
                       <BookOpen className="w-6 h-6 text-kenya-gold" />
                       BILL OF RIGHTS
                    </h3>
                    <p className="text-sm text-brand-text-muted font-medium">
                       Core fundamental rights every Kenyan should know.
                    </p>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { art: "Art. 27", title: "Equality", desc: "Freedom from discrimination", icon: Heart, color: "kenya-red" },
                      { art: "Art. 31", title: "Privacy", desc: "No unwanted search/seizure", icon: Eye, color: "brand-primary" },
                      { art: "Art. 33", title: "Expression", desc: "Freedom of speech & ideas", icon: MessageSquare, color: "kenya-gold" },
                      { art: "Art. 50", title: "Fair Trial", desc: "Right to a fair hearing", icon: ShieldCheck, color: "kenya-green" },
                    ].map((item, i) => (
                      <Card key={i} className="bg-brand-surface border-white/5 hover:border-white/20 transition-all cursor-pointer group">
                        <CardContent className="p-5 flex items-start gap-4">
                           <div className={cn("p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors", `text-${item.color}`)}>
                             <item.icon className="w-5 h-5" />
                           </div>
                           <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                 <span className="text-[9px] font-black text-brand-text-muted uppercase tracking-widest">{item.art}</span>
                              </div>
                              <h4 className="font-bold text-white text-sm group-hover:text-brand-primary transition-colors">{item.title}</h4>
                              <p className="text-[10px] text-brand-text-muted">{item.desc}</p>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>

                 {/* High Profile Cases */}
                 <div className="pt-4 space-y-4">
                    <h4 className="text-sm font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-2">
                       <ShieldAlert className="w-4 h-4 text-kenya-red" />
                       Pending Petitions
                    </h4>
                    <div className="space-y-3">
                       <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                          <div>
                             <h5 className="text-xs font-bold text-white">Electoral Reform Petition 2026</h5>
                             <p className="text-[10px] text-brand-text-muted">Challenging constituency boundary limits.</p>
                          </div>
                          <span className="text-[8px] bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded font-black uppercase">Sub Judice</span>
                       </div>
                       <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                          <div>
                             <h5 className="text-xs font-bold text-white">Environmental Justice Action</h5>
                             <p className="text-[10px] text-brand-text-muted">Against forest land re-allocation.</p>
                          </div>
                          <span className="text-[8px] bg-kenya-green/10 text-kenya-green px-2 py-0.5 rounded font-black uppercase">Hearing Set</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </TabsContent>

        <TabsContent value="integrity" className="animate-in slide-in-from-bottom-5 duration-700">
           <JudicialIntegrityMetrics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
