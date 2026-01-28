/* cSpell:ignore PoliFy maandamano Bunge */
"use client";

import React, { useState } from 'react';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  BadgeCheck, 
  Volume2, 
  VolumeX, 
  MoreHorizontal,
  ChevronDown
} from 'lucide-react';
import { CivicVideoPlayer } from "@/components/ui/CivicVideoPlayer";
import { cn } from "@/lib/utils";
import { ShortVideo } from "@/lib/shorts-data";
import Image from "next/image";

interface ShortCardProps {
  video: ShortVideo;
  isActive: boolean;
}

export function ShortCard({ video, isActive }: ShortCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  
  return (
    <div className="relative w-full h-[calc(100vh-64px)] bg-black flex items-center justify-center snap-start overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <CivicVideoPlayer 
          src={video.videoUrl}
          autoPlay={isActive}
          muted={isMuted}
          loop
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between pointer-events-none p-4 pb-12">
        {/* Top Header */}
        <div className="flex justify-between items-center pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className={cn(
               "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-md",
               video.verificationStatus === 'Verified' ? 'bg-kenya-green text-white' : 
               video.verificationStatus === 'Fact-Checked' ? 'bg-blue-500 text-white' : 
               'bg-kenya-gold text-black'
            )}>
              {video.verificationStatus}
            </span>
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
      <div className="absolute right-4 bottom-24 z-20 flex flex-col items-center gap-6 pointer-events-auto">
         <div className="flex flex-col items-center gap-1">
            <button 
               onClick={() => setIsLiked(!isLiked)}
               className={cn(
                  "p-3 rounded-full backdrop-blur-md transition-all",
                  isLiked ? "bg-kenya-red text-white scale-110" : "bg-black/40 text-white hover:bg-black/60"
               )}
            >
               <Heart className={cn("w-6 h-6", isLiked && "fill-current")} />
            </button>
            <span className="text-white text-xs font-bold shadow-lg">{video.stats.likes}</span>
         </div>

         <div className="flex flex-col items-center gap-1">
            <button className="p-3 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-all">
               <MessageSquare className="w-6 h-6" />
            </button>
            <span className="text-white text-xs font-bold shadow-lg">{video.stats.comments}</span>
         </div>

         <div className="flex flex-col items-center gap-1">
            <button className="p-3 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-all">
               <Share2 className="w-6 h-6" />
            </button>
            <span className="text-white text-xs font-bold shadow-lg">{video.stats.shares}</span>
         </div>

         <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-all mt-4"
         >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
         </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 animate-bounce">
         <ChevronDown className="w-6 h-6 text-white/50" />
      </div>
    </div>
  );
}
