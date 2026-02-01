/* cSpell:ignore PoliFy maandamano Bunge */
"use client";

import React, { useState } from 'react';
import { 
  BadgeCheck, 
  MoreHorizontal,
  ChevronDown
} from 'lucide-react';
import { CivicVideoPlayer } from "@/components/ui/CivicVideoPlayer";
import { cn } from "@/lib/utils";
import { ShortVideo } from "@/lib/shorts-data";
import Image from "next/image";
import { GamificationService } from "@/lib/gamification-service";
import { TrustIndicator } from "@/components/trust/TrustIndicator";
import { TruthReport } from "@/components/trust/TruthReport";
import { ShortsInteraction } from "./ShortsInteraction";

interface ShortCardProps {
  video: ShortVideo;
  isActive: boolean;
}

export function ShortCard({ video, isActive }: ShortCardProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [reaction, setReaction] = useState<'yay' | 'nay' | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const handleReaction = async (type: 'yay' | 'nay') => {
    if (reaction === type) return;
    setReaction(type);
    // In a real app we'd get the actual user ID
    await GamificationService.reactToShort("current-user", video.id, type);
  };

  const handleShareInsight = async () => {
    await GamificationService.shareInsight("current-user");
  };
  
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center snap-start snap-always overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        {(video.videoUrl.includes("youtube") || video.videoUrl.includes("youtu.be")) ? (
             <iframe
                src={`https://www.youtube.com/embed/${video.id}?autoplay=${isActive ? 1 : 0}&controls=0&mute=${isMuted ? 1 : 0}&loop=1&playlist=${video.id}&rel=0&playsinline=1`}
                className="w-full h-full object-cover pointer-events-none scale-[1.35]" // Scale to fill vertical screen better
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title={video.title}
             />
        ) : (
            <CivicVideoPlayer 
            src={video.videoUrl}
            autoPlay={isActive}
            muted={isMuted}
            loop
            className="w-full h-full object-cover"
            />
        )}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between pointer-events-none p-4 pb-12">
        {/* Top Header */}
        <div className="flex justify-between items-center pointer-events-auto">
          <div className="flex items-center gap-2 pointer-events-auto">
            <div onClick={() => setIsReportOpen(true)}>
              <TrustIndicator 
                status={video.verificationStatus} 
                citations={video.citations}
                compact
              />
            </div>
            {video.verificationStatus !== 'Pending' && (
               <button 
                onClick={() => setIsReportOpen(true)}
                className="text-[9px] font-bold text-white/40 hover:text-white uppercase tracking-widest underline underline-offset-2"
               >
                 View Analysis
               </button>
            )}
          </div>
          <button className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white pointer-events-auto">
             <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Info Section */}
        <div className="space-y-4 pointer-events-auto bg-linear-to-t from-black/80 to-transparent p-4 rounded-xl">
           <div className="flex items-center gap-3 mb-2">
              <div className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                 <Image src={video.creator.avatar} alt={video.creator.name} fill className="object-cover" />
              </div>
              <div>
                 <div className="flex items-center gap-1 font-bold text-white">
                    {video.creator.name}
                    {video.creator.isVerified && <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500/10" />}
                 </div>
                 <button className="text-xs font-bold text-kenya-red uppercase tracking-wider">Follow</button>
              </div>
           </div>

           <div className="space-y-1">
              <h3 className="text-white font-bold leading-tight">{video.title}</h3>
              <p className={cn(
                "text-white/80 text-sm leading-relaxed",
                !showDescription && "line-clamp-2"
              )}>
                {video.description}
              </p>
              {video.description.length > 100 && (
                <button 
                  onClick={() => setShowDescription(!showDescription)}
                  className="text-white font-bold text-xs"
                >
                  {showDescription ? "Less" : "More"}
                </button>
              )}
           </div>

           <div className="flex gap-2 text-xs text-white/60 font-medium">
              {video.tags.map(tag => <span key={tag} className="hover:text-white cursor-pointer">{tag}</span>)}
           </div>
        </div>
      </div>

      {/* Interaction Menu (Right Side) */}
      <ShortsInteraction 
        reaction={reaction}
        onReaction={handleReaction}
        onShareInsight={handleShareInsight}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
      />

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 animate-bounce">
         <ChevronDown className="w-6 h-6 text-white/50" />
      </div>

      <TruthReport 
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        data={{
          title: video.title,
          verdict: video.verificationStatus,
          analysis: video.detailedAnalysis || "Analysis pending full AI processing.",
          citations: video.citations || [],
          claims: [
            { text: video.title, status: video.verificationStatus === 'Verified' ? 'True' : 'Unverified' as "True" | "False" | "Unverified" }
          ]
        }}
      />
    </div>
  );
}
