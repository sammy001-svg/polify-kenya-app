"use client";

import { Bill } from "@/lib/parliament-data";
import { cn } from "@/lib/utils";
import { ThumbsUp, ThumbsDown, User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface BillCardProps {
  bill: Bill;
  onVote: (id: string, vote: 'yay' | 'nay') => void;
}

export function BillCard({ bill, onVote }: BillCardProps) {
  const isPassed = bill.status === 'Assented' || bill.stage === 'Presidential Assent';
  
  return (
    <div className="bg-brand-surface-secondary border border-white/5 rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden flex flex-col gap-4">
        {/* Intricate Background Glow */}
        <div className={cn(
          "absolute top-0 right-0 w-32 h-32 bg-linear-to-bl opacity-0 group-hover:opacity-20 blur-[50px] rounded-full transition-opacity duration-700 pointer-events-none",
          bill.supportCount > bill.opposeCount ? "from-kenya-green to-transparent" : "from-kenya-red to-transparent"
        )} />

        <div className="flex justify-between items-center">
           <Badge variant="outline" className="text-[8px] font-black uppercase tracking-[0.2em] text-kenya-gold border-kenya-gold/20 bg-kenya-gold/5 px-3 py-1 rounded-lg">
              {bill.id}
           </Badge>
           <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] font-bold text-brand-text-muted">
              <Calendar className="w-3 h-3 text-kenya-gold" /> {bill.voteDeadline}
           </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-black text-base text-white leading-tight group-hover:text-kenya-gold transition-colors duration-300 tracking-tight">
            {bill.title}
          </h3>

          <div className="flex items-center gap-2">
             <div className="w-6 h-6 rounded-full bg-linear-to-br from-white/10 to-transparent flex items-center justify-center border border-white/5 shadow-inner">
                <User className="w-3.5 h-3.5 text-brand-text-muted" />
             </div>
             <p className="text-[10px] font-black text-brand-text-muted uppercase tracking-widest truncate">{bill.sponsor}</p>
          </div>
        </div>

        <div className="relative group/summary">
          <p className="text-xs text-brand-text-muted/70 line-clamp-2 leading-relaxed font-medium bg-black/40 p-4 rounded-2xl border border-white/5 hover:text-white transition-colors duration-300">
              {bill.summary}
          </p>
          <div className="absolute inset-0 bg-kenya-gold/5 opacity-0 group-hover/summary:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
        </div>

        {/* Dynamic Sentiment Meter */}
        <div className="mt-auto space-y-4 pt-2">
            <div className="flex gap-2">
                {bill.tags.slice(0, 3).map(tag => (
                   <span key={tag} className="text-[8px] uppercase font-black tracking-widest text-brand-text-muted/60 px-2 py-1 bg-white/5 rounded-md border border-white/5">
                      {tag}
                   </span>
                ))}
            </div>

            {!isPassed && (
                <div className="grid grid-cols-2 gap-3">
                    <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => onVote(bill.id, 'yay')}
                        className="h-10 rounded-xl bg-kenya-green/5 text-kenya-green hover:bg-kenya-green hover:text-white border border-kenya-green/10 font-black text-[10px] uppercase tracking-widest transition-all shadow-lg hover:shadow-kenya-green/20"
                    >
                        <ThumbsUp className="w-3 h-3 mr-2" /> Support
                    </Button>
                    <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => onVote(bill.id, 'nay')}
                        className="h-10 rounded-xl bg-kenya-red/5 text-kenya-red hover:bg-kenya-red hover:text-white border border-kenya-red/10 font-black text-[10px] uppercase tracking-widest transition-all shadow-lg hover:shadow-kenya-red/20"
                    >
                        <ThumbsDown className="w-3 h-3 mr-2" /> Oppose
                    </Button>
                </div>
            )}
            
             <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em]">
                    <span className="text-kenya-green">{bill.supportCount.toLocaleString()} YAY</span>
                    <span className="text-kenya-red">{bill.opposeCount.toLocaleString()} NAY</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(bill.supportCount / (bill.supportCount + bill.opposeCount)) * 100}%` }} 
                      className="h-full bg-kenya-green" 
                    />
                    <div className="h-full bg-kenya-red flex-1" />
                </div>
             </div>
        </div>
    </div>
  );
}
