"use client";

import { IssueReporter } from "@/components/community/IssueReporter";
import { CommunityFeed } from "@/components/community/CommunityFeed";
import { HotspotMap } from "@/components/community/HotspotMap";
import { EfficiencyDashboard } from "@/components/community/EfficiencyDashboard";
import { MessageSquare, Users2, ShieldCheck, MapPin, BarChart3, Radio } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { COUNTIES } from "@/lib/constants/counties";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed");
  const [selectedCounty, setSelectedCounty] = useState("Nairobi");

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6 shrink-0">
          <div>
            <h1 className="text-3xl font-black mb-1 tracking-tight flex items-center gap-3">
               <Users2 className="w-8 h-8 text-kenya-red" />
               Community Intelligence
            </h1>
            <p className="text-brand-text-muted font-medium">
               Grassroots crowdsourcing powered by citizen vigilance and AI clustering.
            </p>
          </div>
          
          <div className="flex bg-brand-surface border border-white/10 rounded-xl p-1 gap-1 relative">
             <div className="px-4 py-2 rounded-lg bg-brand-surface-highlight text-white shadow-sm flex items-center gap-2 text-xs font-black uppercase cursor-pointer">
                <MapPin className="w-3.5 h-3.5 text-kenya-red" /> {selectedCounty}
                <select 
                    value={selectedCounty} 
                    onChange={(e) => setSelectedCounty(e.target.value)}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                 >
                    {COUNTIES.map(c => <option key={c.code} value={c.name}>{c.name}</option>)}
                 </select>
             </div>
             <div className="px-4 py-2 rounded-lg text-brand-text-muted hover:text-white transition-colors flex items-center gap-2 text-xs font-black uppercase cursor-pointer">
                <ShieldCheck className="w-3.5 h-3.5" /> High Trust
             </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
         {/* Left Column: Reporter & Map */}
         <div className="lg:col-span-8 space-y-8 overflow-y-auto pr-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-2">
                     <MessageSquare className="w-4 h-4" /> Voice of the People
                  </h3>
                  <IssueReporter initialCounty={selectedCounty} />
               </div>
               
               <div className="space-y-4 hidden md:flex flex-col">
                  <h3 className="text-sm font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-2">
                     <MapPin className="w-4 h-4" /> Intelligence Map
                  </h3>
                  <HotspotMap countyName={selectedCounty} />
               </div>
            </div>

            <div className="md:hidden">
               <h3 className="text-sm font-black uppercase tracking-widest text-brand-text-muted mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Intelligence Map
               </h3>
               <HotspotMap countyName={selectedCounty} />
            </div>

            <div className="bg-brand-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <ShieldCheck className="w-32 h-32" />
               </div>
               <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-kenya-green" />
                  AI Verification & Vouching
               </h4>
               <p className="text-sm text-brand-text-muted leading-relaxed max-w-2xl">
                  Our system uses **Natural Language Processing** to cluster multiple independent reports from the same ward into a single &quot;Hotspot&quot;. Once 5+ unique neighbors vouch for an issue, it is automatically flagged for County oversight.
               </p>
            </div>
         </div>

         {/* Right Column: Feed & Efficiency */}
         <div className="lg:col-span-4 flex flex-col min-h-0">
            <Tabs defaultValue="feed" className="flex-1 flex flex-col min-h-0" onValueChange={setActiveTab}>
               <TabsList className="grid w-full grid-cols-2 bg-brand-surface border border-white/5 p-1 mb-6">
                  <TabsTrigger value="feed" className="text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-brand-surface-highlight data-[state=active]:text-white">
                     <Radio className={cn("w-3.5 h-3.5 mr-2", activeTab === "feed" && "text-kenya-red animate-pulse")} />
                     Live Feed
                  </TabsTrigger>
                  <TabsTrigger value="impact" className="text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-brand-surface-highlight data-[state=active]:text-white">
                     <BarChart3 className="w-3.5 h-3.5 mr-2 text-kenya-gold" />
                     Efficiency
                  </TabsTrigger>
               </TabsList>
               
               <div className="flex-1 overflow-y-auto pr-1">
                  <TabsContent value="feed" className="m-0 focus-visible:outline-none">
                     <CommunityFeed filterCounty={selectedCounty} />
                  </TabsContent>
                  <TabsContent value="impact" className="m-0 focus-visible:outline-none">
                     <div className="space-y-6">
                        <div className="px-1">
                           <h3 className="text-xl font-bold flex items-center gap-2">
                              <BarChart3 className="w-5 h-5 text-kenya-gold" />
                              Government Efficiency
                           </h3>
                           <p className="text-xs text-brand-text-muted mt-1 leading-relaxed">
                              Real-time tracking of response times and resolution effectiveness across all agencies.
                           </p>
                        </div>
                        <EfficiencyDashboard />
                     </div>
                  </TabsContent>
               </div>
            </Tabs>
         </div>
      </div>
    </div>
  );
}
