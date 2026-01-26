"use client";

import { type CoHostedDiscussion } from "@/lib/creators";
import { CIVIC_CREATORS } from "@/lib/creators";
import { Play, Clock, Eye, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

interface CoHostedCardProps {
  discussion: CoHostedDiscussion;
}

export function CoHostedCard({ discussion }: CoHostedCardProps) {
  const creator = CIVIC_CREATORS.find(c => c.id === discussion.creatorId);
  
  if (!creator) return null;
  
  return (
    <div className="bg-brand-surface-secondary border border-border rounded-xl overflow-hidden hover:border-kenya-gold/50 transition-all group">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-brand-surface-highlight">
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </div>
        </div>
        
        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-xs font-medium text-white z-20 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {discussion.duration}
        </div>
        
        {/* Co-Hosted Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-kenya-gold rounded-full text-xs font-bold text-black uppercase tracking-wider z-20">
          Co-Hosted Discussion
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-brand-text leading-tight line-clamp-2 group-hover:text-white transition-colors">
          {discussion.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-brand-text-muted leading-relaxed line-clamp-2">
{discussion.description}
        </p>
        
        {/* Hosts */}
        <div className="flex items-center gap-4 py-3 border-y border-border">
          {/* Creator */}
          <div className="flex items-center gap-2 flex-1">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-kenya-red to-kenya-gold flex items-center justify-center text-sm font-bold text-white shrink-0">
              {creator.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-brand-text-muted uppercase tracking-wider">Creator</p>
              <p className="text-sm font-semibold text-brand-text truncate">{creator.name}</p>
            </div>
          </div>
          
          {/* Plus Icon */}
          <div className="shrink-0 text-brand-text-muted">+</div>
          
          {/* Expert */}
          <div className="flex items-center gap-2 flex-1">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-blue-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-brand-text-muted uppercase tracking-wider">Expert</p>
              <p className="text-sm font-semibold text-brand-text truncate">{discussion.expertName}</p>
            </div>
          </div>
        </div>
        
        {/* Expert Credentials */}
        <div className="bg-brand-surface-highlight rounded-lg p-3 space-y-1">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">Expert Credentials</p>
          <p className="text-xs text-brand-text-muted">{discussion.expertTitle}</p>
          {discussion.expertCredentials.slice(0, 2).map((cred, index) => (
            <p key={index} className="text-xs text-brand-text flex items-start gap-1">
              <span className="text-kenya-gold shrink-0">•</span>
              <span>{cred}</span>
            </p>
          ))}
        </div>
        
        {/* Why This Matters */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-kenya-green uppercase tracking-wider">Why This Matters</p>
          <p className="text-sm text-brand-text-muted leading-relaxed line-clamp-3">
            {discussion.whyThisMatters}
          </p>
        </div>
        
        {/* Stats & CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-4 text-sm text-brand-text-muted">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{discussion.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{discussion.publishedDate}</span>
            </div>
          </div>
          
          <Link 
            href={`/creators/discussions/${discussion.id}`}
            className="flex items-center gap-1 text-sm font-semibold text-kenya-gold hover:text-kenya-red transition-colors"
          >
            Watch Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
