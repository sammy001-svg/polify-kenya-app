"use client";

import { Badge } from "@/lib/gamification";
import { Lock, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface BadgeShowcaseProps {
  badges: Badge[];
  unlockedBadgeIds: string[];
}

export function BadgeShowcase({ badges, unlockedBadgeIds }: BadgeShowcaseProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
      {badges.map((badge) => {
        const isUnlocked = unlockedBadgeIds.includes(badge.id);
        
        return (
          <TooltipProvider key={badge.id}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div 
                  className={cn(
                    "aspect-square rounded-2xl flex flex-col items-center justify-center p-2 relative group transition-all duration-300",
                    isUnlocked 
                      ? "bg-brand-surface-secondary border border-white/10 hover:border-kenya-gold/50 cursor-default" 
                      : "bg-black/20 border border-white/5 opacity-60 hover:opacity-100 cursor-not-allowed"
                  )}
                >
                  {/* Icon */}
                  <div className={cn(
                    "text-2xl mb-1 transition-transform group-hover:scale-110",
                    isUnlocked ? "filter-none" : "grayscale blur-[1px]"
                  )}>
                    {badge.icon}
                  </div>
                  
                  {/* Label (Mobile/Desktop tiny) */}
                  <span className="text-[9px] text-center font-bold leading-tight line-clamp-2 text-brand-text-muted">
                    {badge.name}
                  </span>

                  {/* Lock Overlay */}
                  {!isUnlocked && (
                    <div className="absolute top-1 right-1">
                      <Lock className="w-3 h-3 text-white/30" />
                    </div>
                  )}

                  {/* Rarity Glow (Only if unlocked) */}
                  {isUnlocked && badge.rarity === 'legendary' && (
                     <div className="absolute inset-0 rounded-2xl ring-1 ring-kenya-gold/50 animate-pulse pointer-events-none" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-[200px] p-3 bg-black/90 border-white/10 backdrop-blur-xl">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm text-white">{badge.name}</p>
                    <span className={cn(
                      "text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded font-black",
                      badge.rarity === 'common' && "bg-slate-700 text-white",
                      badge.rarity === 'rare' && "bg-blue-900 text-blue-200",
                      badge.rarity === 'epic' && "bg-purple-900 text-purple-200",
                      badge.rarity === 'legendary' && "bg-kenya-gold/20 text-kenya-gold"
                    )}>
                      {badge.rarity}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300">{badge.description}</p>
                  
                  {!isUnlocked && (
                     <div className="pt-2 border-t border-white/10">
                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">How to unlock:</p>
                        <ul className="list-disc list-inside text-[10px] text-gray-400">
                           {badge.requirements.map((req, i) => (
                              <li key={i}>{req}</li>
                           ))}
                        </ul>
                     </div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
}
