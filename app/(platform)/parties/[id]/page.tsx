"use client";

import { PARTIES_DATA } from "@/lib/parties-data";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Trophy, BookOpen, Scale, FileText } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { use } from "react";

export default function PartyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const party = PARTIES_DATA.find((p) => p.id === id);

  if (!party) {
    notFound();
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link
        href="/parties"
        className="inline-flex items-center gap-2 text-sm text-brand-text-muted hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Parties
      </Link>

      {/* Header Section */}
      <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-brand-surface">
        <div className={cn("absolute inset-0 opacity-10", party.color)} />
        <div className="relative p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className={cn(
                "w-24 h-24 rounded-2xl flex items-center justify-center font-black text-4xl text-white shadow-2xl shrink-0",
                party.color
            )}>
                {party.abbreviation.charAt(0)}
            </div>
            
            <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-none bg-clip-text text-transparent bg-linear-to-r from-white to-white/70">
                        {party.name}
                    </h1>
                    <Badge variant="outline" className="text-kenya-red border-kenya-red/20 bg-kenya-red/5">
                        {party.abbreviation}
                    </Badge>
                </div>
                <p className="text-lg font-medium text-brand-text-muted italic">
                    &quot;{party.slogan}&quot;
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-sm text-brand-text-muted">
                     <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-white/50" /> {party.stats.membersCount} Members
                     </span>
                     <span className="flex items-center gap-1.5">
                        <Scale className="w-4 h-4 text-white/50" /> Founded {party.stats.founded}
                     </span>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full bg-brand-surface border border-white/5 p-1 h-auto">
                    <TabsTrigger value="overview" className="flex-1 data-[state=active]:bg-brand-surface-highlight data-[state=active]:text-white text-brand-text-muted">Overview</TabsTrigger>
                    <TabsTrigger value="leadership" className="flex-1 data-[state=active]:bg-brand-surface-highlight data-[state=active]:text-white text-brand-text-muted">Leadership</TabsTrigger>
                    <TabsTrigger value="manifesto" className="flex-1 data-[state=active]:bg-brand-surface-highlight data-[state=active]:text-white text-brand-text-muted">Manifesto</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6 mt-4">
                    <div className="bg-brand-surface p-6 rounded-xl border border-white/5 space-y-4">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-kenya-red" /> Ideology & Values
                        </h3>
                        <p className="text-brand-text leading-relaxed">
                            {party.description}
                        </p>
                        <div className="pt-4">
                            <h4 className="font-bold text-sm uppercase tracking-wider text-brand-text-muted mb-2">Primary Ideology</h4>
                            <Badge variant="secondary" className="text-sm py-1 px-3 bg-brand-surface-highlight text-white border-none">
                                {party.ideology}
                            </Badge>
                        </div>
                    </div>

                    <div className="bg-brand-surface p-6 rounded-xl border border-white/5">
                        <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                            <FileText className="w-5 h-5 text-kenya-green" /> Constitution Highlights
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-brand-surface-secondary rounded-lg">
                                <span className="text-xs text-brand-text-muted uppercase block mb-1">Membership Fee</span>
                                <span className="font-bold text-white">{party.constitutionParameters.membershipFee}</span>
                            </div>
                            <div className="p-4 bg-brand-surface-secondary rounded-lg">
                                <span className="text-xs text-brand-text-muted uppercase block mb-1">Nomination Fee</span>
                                <span className="font-bold text-white">{party.constitutionParameters.nominationFee}</span>
                            </div>
                            <div className="p-4 bg-brand-surface-secondary rounded-lg">
                                <span className="text-xs text-brand-text-muted uppercase block mb-1">Term Limits</span>
                                <span className="font-bold text-white">{party.constitutionParameters.termLimit}</span>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="leadership" className="space-y-6 mt-4">
                    <div className="bg-brand-surface p-6 rounded-xl border border-white/5">
                        <h3 className="font-bold text-lg mb-6">Party Officials</h3>
                        <div className="grid gap-4">
                            {[
                                { title: "Party Leader", data: party.leadership.leader, bg: "bg-brand-surface-highlight" },
                                { title: "Chairperson", data: party.leadership.chairperson, bg: "bg-brand-surface-secondary" },
                                { title: "Secretary General", data: party.leadership.secretaryGeneral, bg: "bg-brand-surface-secondary" }
                            ].map((leader, i) => (
                                <div key={i} className={cn("flex items-center justify-between p-4 rounded-xl border border-white/5", leader.bg)}>
                                    <div>
                                        <p className="text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-0.5">{leader.title}</p>
                                        <p className="font-bold text-lg">{leader.data.name}</p>
                                    </div>
                                    {leader.data.id ? (
                                        <Link href={`/representatives/${leader.data.id}`}>
                                            <Button size="sm" variant="ghost" className="text-xs text-brand-text-muted hover:text-white">
                                                View Profile
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Button size="sm" variant="ghost" className="text-xs text-brand-text-muted/50 cursor-not-allowed" disabled>
                                            Profile Unavailable
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="manifesto" className="space-y-6 mt-4">
                   <div className="bg-brand-surface p-6 rounded-xl border border-white/5">
                        <h3 className="font-bold text-lg mb-4">Key Manifesto Pillars</h3>
                        <ul className="space-y-3">
                            {party.manifestoSummary.map((pillar, i) => (
                                <li key={i} className="flex items-start gap-3 p-3 bg-brand-surface-secondary rounded-lg">
                                    <div className="w-6 h-6 rounded-full bg-kenya-red/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-xs font-bold text-kenya-red">{i + 1}</span>
                                    </div>
                                    <span className="text-sm font-medium">{pillar}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </TabsContent>
            </Tabs>
        </div>

        {/* Sidebar Stats */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-brand-surface p-6 rounded-xl border border-white/5">
                <h3 className="font-bold text-sm uppercase tracking-widest text-brand-text-muted mb-4 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-kenya-gold" /> Elected Officials
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-brand-surface-secondary/50">
                        <span className="text-sm font-medium">Governors</span>
                        <Badge className="bg-kenya-gold/20 text-kenya-gold hover:bg-kenya-gold/30 border-none">{party.stats.electedGovernors}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-brand-surface-secondary/50">
                        <span className="text-sm font-medium">Senators</span>
                        <Badge className="bg-white/10 text-white hover:bg-white/20 border-none">{party.stats.electedSenators}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-brand-surface-secondary/50">
                        <span className="text-sm font-medium">MPs</span>
                        <Badge className="bg-white/10 text-white hover:bg-white/20 border-none">{party.stats.electedMPs}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-brand-surface-secondary/50">
                        <span className="text-sm font-medium">MCAs</span>
                        <Badge className="bg-white/10 text-white hover:bg-white/20 border-none">{party.stats.electedMCAs}</Badge>
                    </div>
                </div>
            </div>

            <div className="p-6 rounded-xl bg-linear-to-br from-kenya-red/20 to-brand-surface border border-kenya-red/20 text-center space-y-4">
                <h3 className="font-bold text-lg">Join {party.abbreviation}</h3>
                <p className="text-xs text-brand-text-muted">
                    Support the party agenda and participate in grassroots elections.
                </p>
                <Button className="w-full bg-kenya-red hover:bg-kenya-red/90 text-white font-bold">
                    Become a Member
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
