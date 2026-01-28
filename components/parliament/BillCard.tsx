"use client";

import { Bill } from "@/lib/parliament-data";
import { cn } from "@/lib/utils";
import { ThumbsUp, ThumbsDown, User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BillCardProps {
  bill: Bill;
  onVote: (id: string, vote: 'yay' | 'nay') => void;
}

export function BillCard({ bill, onVote }: BillCardProps) {
  const isPassed = bill.stage === 'Presidential Assent';
  
  return (
    <div className="bg-brand-surface-secondary border border-white/5 rounded-xl p-4 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
        {/* Glow effect based on support */}
        <div className={cn(
          "absolute top-0 right-0 w-20 h-20 bg-linear-to-bl opacity-10 blur-xl rounded-full pointer-events-none",
          bill.supportCount > bill.opposeCount ? "from-kenya-green to-transparent" : "from-kenya-red to-transparent"
        )} />

        <div className="flex justify-between items-start mb-2">
           <Badge variant="outline" className="text-[9px] uppercase tracking-widest text-brand-text-muted border-white/10 bg-black/20">
              {bill.id}
           </Badge>
           <span className="text-[10px] bg-white/5 rounded px-1.5 py-0.5 text-brand-text-muted flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {bill.voteDeadline}
           </span>
        </div>

        <h3 className="font-bold text-sm text-white leading-tight mb-2 group-hover:text-brand-primary transition-colors">
          {bill.title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
           <div className="w-5 h-5 rounded-full bg-brand-surface-highlight flex items-center justify-center">
              <User className="w-3 h-3 text-brand-text-muted" />
           </div>
           <p className="text-xs text-brand-text-muted truncate">{bill.sponsor}</p>
        </div>

        <p className="text-xs text-brand-text-muted/80 line-clamp-2 mb-4 bg-black/10 p-2 rounded-lg border border-white/5">
            {bill.summary}
        </p>

        {/* Voting & Tags */}
        <div className="space-y-3">
            <div className="flex gap-2">
                {bill.tags.slice(0, 2).map(tag => (
                   <span key={tag} className="text-[9px] uppercase font-bold text-brand-text-muted px-1.5 py-0.5 bg-white/5 rounded">
                      #{tag}
                   </span>
                ))}
            </div>

            {!isPassed && (
                <div className="grid grid-cols-2 gap-2">
                    <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => onVote(bill.id, 'yay')}
                        className="h-8 bg-kenya-green/10 text-kenya-green hover:bg-kenya-green hover:text-white border border-kenya-green/30"
                    >
                        <ThumbsUp className="w-3 h-3 mr-1.5" /> Support
                    </Button>
                    <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => onVote(bill.id, 'nay')}
                        className="h-8 bg-kenya-red/10 text-kenya-red hover:bg-kenya-red hover:text-white border border-kenya-red/30"
                    >
                        <ThumbsDown className="w-3 h-3 mr-1.5" /> Oppose
                    </Button>
                </div>
            )}
            
             {/* Progress Bar */}
             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex">
                 <div 
                   style={{ width: `${(bill.supportCount / (bill.supportCount + bill.opposeCount)) * 100}%` }} 
                   className="h-full bg-kenya-green" 
                 />
                 <div className="h-full bg-kenya-red flex-1" />
             </div>
             
             <div className="flex justify-between text-[9px] font-bold text-brand-text-muted">
                 <span>{bill.supportCount.toLocaleString()} For</span>
                 <span>{bill.opposeCount.toLocaleString()} Against</span>
             </div>
        </div>
    </div>
  );
}
