"use client";

import { useState } from "react";
import {
  Coins,
  Server,
  FileSignature,
  MapPin,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Fingerprint
} from "lucide-react";
import { BudgetBreakdown } from "@/components/transparency/BudgetBreakdown";
import { TaxCalculator } from "@/components/transparency/TaxCalculator";
import { PetitionCenter } from "@/components/transparency/PetitionCenter";
import { AuditorGeneralView } from "@/components/transparency/AuditorGeneralView";
import { CountyDashboard } from "@/components/transparency/CountyDashboard";
import { IntegrityHub } from "@/components/transparency/IntegrityHub";
import { AlgoTransparencyNode } from "@/components/transparency/AlgoTransparencyNode";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Tab = 'finance' | 'platform' | 'action' | 'local';

export default function TransparencyPage() {
  const [activeTab, setActiveTab] = useState<string>("finance");

  const TABS: { id: Tab; label: string; icon: React.ElementType; color: string }[] = [
    { id: 'finance', label: 'Public Finance', icon: Coins, color: 'text-kenya-gold' },
    { id: 'platform', label: 'Platform Algo', icon: Server, color: 'text-brand-primary' },
    { id: 'local', label: 'County & Integrity', icon: MapPin, color: 'text-kenya-red' },
    { id: 'action', label: 'Collective Action', icon: FileSignature, color: 'text-kenya-green' },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Transparency HUD Header */}
      <div className="relative p-8 bg-brand-bg rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <ShieldCheck className="w-64 h-64 text-brand-primary" />
        </div>
        
        <div className="relative z-10 space-y-6">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-1 border border-brand-primary bg-brand-primary" />
                    <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em]">Integrated Accountability Hub</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none italic uppercase">
                    Transparency <span className="text-brand-primary">Protocol</span>
                </h1>
                <p className="text-brand-text-muted max-w-2xl text-lg leading-relaxed">
                    Bridging the gap between government spending and platform information. 
                    Real-time data auditing for the digital citizen.
                </p>
            </div>

            {/* Tab Navigation Hub */}
            <div className="flex flex-wrap bg-white/2 border border-white/5 rounded-2xl p-1 gap-1 w-fit">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2",
                            activeTab === tab.id 
                                ? "bg-white/5 text-white shadow-xl border border-white/10" 
                                : "text-white/30 hover:text-white/60"
                        )}
                    >
                        <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? tab.color : "text-white/20")} />
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
           key={activeTab}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           transition={{ duration: 0.3 }}
           className="px-4"
        >
            {/* Tab Content: Public Finance */}
            {activeTab === 'finance' && (
                <div className="space-y-10">
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">
                        <TaxCalculator />
                        <div className="h-px bg-white/5 w-full" />
                        <div className="space-y-6">
                             <div className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-kenya-gold" />
                                <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">National Expenditure Control</h2>
                             </div>
                             <BudgetBreakdown />
                        </div>
                    </div>
                </div>
            )}

            {/* Tab Content: Platform Algorithms */}
            {activeTab === 'platform' && (
                <div className="space-y-10">
                    <AlgoTransparencyNode />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 bg-white/3 border border-green-500/20 rounded-[32px] space-y-4">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-green-400" />
                                <h3 className="text-lg font-black text-white uppercase tracking-tighter">Civic Prioritization</h3>
                            </div>
                            <p className="text-sm text-brand-text-muted leading-relaxed">
                                We actively boost content that includes citations, multiple viewpoints, and data-backed claims. 
                                Our goal is to reduce noise and amplify high-signal democratic information.
                            </p>
                        </div>
                        <div className="p-8 bg-white/3 border border-red-500/20 rounded-[32px] space-y-4">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="w-6 h-6 text-red-400" />
                                <h3 className="text-lg font-black text-white uppercase tracking-tighter">De-ranking Protocol</h3>
                            </div>
                            <p className="text-sm text-brand-text-muted leading-relaxed">
                                Propagandistic hashtags, emotional manipulation, and accounts with a history of false claims 
                                are automatically suppressed in the main feed to protect public discourse.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab Content: County & Integrity */}
            {activeTab === 'local' && (
                <div className="space-y-12">
                    <div className="p-8 bg-linear-to-br from-kenya-red/10 to-transparent border border-kenya-red/20 rounded-[40px] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <MapPin className="w-48 h-48 text-kenya-red" />
                        </div>
                        <div className="relative z-10 max-w-2xl space-y-4">
                            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">Local Accountability Hub</h2>
                            <p className="text-lg text-brand-text-muted leading-relaxed">
                                Transparency at the grassroots. Monitor County Assembly records, MCAs attendance, 
                                and ward-level development projects.
                            </p>
                        </div>
                    </div>
                    
                    <CountyDashboard />
                    <div className="h-px bg-white/5 w-full" />
                    <IntegrityHub />
                </div>
            )}

            {/* Tab Content: Collective Action */}
            {activeTab === 'action' && (
                <div className="space-y-12">
                    <div className="p-8 bg-linear-to-br from-kenya-green/10 to-transparent border border-kenya-green/20 rounded-[40px] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Fingerprint className="w-48 h-48 text-kenya-green" />
                        </div>
                        <div className="relative z-10 max-w-2xl space-y-4">
                            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">Citizen Pressure Hub</h2>
                            <p className="text-lg text-brand-text-muted leading-relaxed">
                                Your voice, synchronized. Join thousands of citizens demanding better governance 
                                through verifiable petitions and coordinated action.
                            </p>
                        </div>
                    </div>
                    
                    <AuditorGeneralView />
                    <div className="h-px bg-white/5 w-full" />
                    <PetitionCenter />
                </div>
            )}
        </motion.div>
      </AnimatePresence>

      <div className="text-center space-y-2 py-10 opacity-30">
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Protocol Version 2.0.4-LTS</p>
        <p className="text-[10px] font-mono">ENCRYPTED_DATA_SYNC: ACTIVE // OAG_RELAY: STABLE</p>
      </div>
    </div>
  );
}
