"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  Users, 
  ShieldCheck, 
  Cpu, 
  Scale,
  Clock,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";

const ALGO_WEIGHTS = [
  { label: "Verification Status", weight: 35, icon: ShieldCheck, color: "text-blue-400", desc: "Sourced from verified officials or trusted agencies." },
  { label: "Thoughtful Dialogue", weight: 25, icon: Users, color: "text-kenya-green", desc: "Long-form constructive discussion over rapid reactions." },
  { label: "Viewpoint Diversity", weight: 20, icon: Scale, color: "text-kenya-gold", desc: "Ensuring feed balance across diverse perspectives." },
  { label: "Recency & Context", weight: 15, icon: Clock, color: "text-kenya-gold", desc: "Timely information relevant to your local interests." },
  { label: "Engagement Quality", weight: 5, icon: Zap, color: "text-kenya-red", desc: "Meaningful interactions and fact-check citations." },
];

export function AlgoTransparencyNode() {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 space-y-10 overflow-hidden relative group">
      {/* Background HUD Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="grid grid-cols-6 h-full w-full">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="border-r border-white/10 h-full" />
            ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-kenya-gold/20 rounded-lg">
                    <Cpu className="w-5 h-5 text-kenya-gold" />
                </div>
                <span className="text-[10px] font-black text-kenya-gold uppercase tracking-[0.4em]">Algorithm_Transparency_Core</span>
            </div>
            <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
                Neutral <span className="text-kenya-gold">Ranking</span> Engine
            </h3>
            <p className="text-sm text-brand-text-muted max-w-md leading-relaxed">
                Unlike traditional feeds that optimize for outrage, PoliFy optimizes for 
                <span className="text-white font-bold ml-1">Accountability & Civic Understanding.</span> Our weights are public and auditable.
            </p>
        </div>

        <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-kenya-gold/10 border border-kenya-gold/30 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-kenya-gold animate-pulse" />
                <span className="text-[10px] font-black text-kenya-gold uppercase tracking-widest">Model: Civic-V2-Release</span>
            </div>
        </div>
      </div>

      {/* Weights Visualization */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="space-y-6">
            {ALGO_WEIGHTS.map((item, idx) => (
                <motion.div 
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="space-y-2 group/item"
                >
                    <div className="flex justify-between items-end">
                        <div className="flex items-center gap-3">
                            <div className={cn("p-1.5 rounded-lg bg-white/5 group-hover/item:bg-white/10 transition-colors", item.color)}>
                                <item.icon className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-bold text-white/70 group-hover/item:text-white transition-colors">{item.label}</span>
                        </div>
                        <span className="text-xs font-mono font-black text-kenya-gold">{item.weight}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                        <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.weight}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className={cn("h-full relative z-10", item.color.replace('text', 'bg'))}
                        />
                        <div className="absolute inset-0 bg-white/5" />
                    </div>
                    <p className="text-[10px] text-brand-text-muted italic opacity-0 group-hover/item:opacity-100 transition-opacity">
                        {item.desc}
                    </p>
                </motion.div>
            ))}
        </div>

        {/* Real-time Result Simulator */}
        <div className="bg-white/2 border border-white/10 rounded-3xl p-6 space-y-6 relative overflow-hidden">
            <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                <Target className="w-4 h-4 text-kenya-red" />
                Live_Ranking_Simulator
            </h4>
            
            <div className="space-y-4">
                {[
                    { title: "Treasury Budget Breakdown", score: 98, status: "Verified" },
                    { title: "Viral Outrage Clip (Unverified)", score: 12, status: "Penalty" },
                    { title: "County Assembly Summary", score: 85, status: "High Diversity" },
                ].map((post, i) => (
                    <div key={i} className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between group/sim cursor-pointer hover:border-white/20 transition-all">
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-white/80 group-hover/sim:text-white transition-colors">{post.title}</p>
                            <span className={cn(
                                "text-[9px] font-black uppercase tracking-tighter",
                                post.status === 'Penalty' ? "text-kenya-red" : "text-kenya-green"
                            )}>{post.status}</span>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-black text-white italic tracking-tighter">{post.score}</div>
                            <div className="text-[8px] text-white/20 uppercase font-black">Civic_Score</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-kenya-gold/20" />
                    ))}
                </div>
                <button className="text-[9px] font-black text-kenya-gold uppercase tracking-widest hover:underline">
                    View Full Calc Log →
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
