import React from 'react';
import { ThumbsUp, ThumbsDown, Lightbulb, Volume2, VolumeX } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ShortsInteractionProps {
  reaction: 'yay' | 'nay' | null;
  onReaction: (type: 'yay' | 'nay') => void;
  onShareInsight: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export function ShortsInteraction({ 
  reaction, 
  onReaction, 
  onShareInsight, 
  isMuted, 
  onToggleMute 
}: ShortsInteractionProps) {
  return (
      <div className="absolute right-4 bottom-24 z-20 flex flex-col items-center gap-6 pointer-events-auto">
         <div className="flex flex-col items-center gap-1">
            <button 
               onClick={() => onReaction('yay')}
               className={cn(
                  "p-3 rounded-full backdrop-blur-md transition-all active:scale-95",
                  reaction === 'yay' ? "bg-kenya-green text-black scale-110 shadow-[0_0_15px_rgba(0,255,0,0.4)]" : "bg-black/40 text-white hover:bg-black/60"
               )}
            >
               <ThumbsUp className={cn("w-6 h-6", reaction === 'yay' && "fill-current")} />
            </button>
            <span className="text-white text-[10px] font-bold uppercase tracking-tighter shadow-black drop-shadow-md">Yay</span>
         </div>

         <div className="flex flex-col items-center gap-1">
            <button 
               onClick={() => onReaction('nay')}
               className={cn(
                  "p-3 rounded-full backdrop-blur-md transition-all active:scale-95",
                  reaction === 'nay' ? "bg-kenya-red text-white scale-110 shadow-[0_0_15px_rgba(255,0,0,0.4)]" : "bg-black/40 text-white hover:bg-black/60"
               )}
            >
               <ThumbsDown className={cn("w-6 h-6", reaction === 'nay' && "fill-current")} />
            </button>
            <span className="text-white text-[10px] font-bold uppercase tracking-tighter shadow-black drop-shadow-md">Nay</span>
         </div>

         <div className="flex flex-col items-center gap-1">
            <button 
               onClick={onShareInsight}
               className="p-3 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all active:scale-95 group"
            >
               <Lightbulb className="w-6 h-6 group-hover:fill-current" />
            </button>
            <span className="text-white text-[10px] font-bold uppercase tracking-tighter shadow-black drop-shadow-md">Insight</span>
         </div>

         <button 
            onClick={onToggleMute}
            className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-all mt-2"
         >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
         </button>
      </div>
  );
}
