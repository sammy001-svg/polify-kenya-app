"use client";

import { type CivicCreator } from "@/lib/creators";
import { BadgeCheck, Video, Eye, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

interface CreatorCardProps {
  creator: CivicCreator;
}

export function CreatorCard({ creator }: CreatorCardProps) {
  const totalContent = creator.contentDistribution.facts + 
                       creator.contentDistribution.opinions + 
                       creator.contentDistribution.satire;
  
  const getContentMix = () => {
    const facts = Math.round((creator.contentDistribution.facts / totalContent) * 100);
    const opinions = Math.round((creator.contentDistribution.opinions / totalContent) * 100);
    const satire = Math.round((creator.contentDistribution.satire / totalContent) * 100);
    
    return { facts, opinions, satire };
  };
  
  const contentMix = getContentMix();
  
  return (
    <Link 
      href={`/creators/${creator.id}`}
      className="group bg-brand-surface-secondary border border-border rounded-xl overflow-hidden hover:border-kenya-gold/50 transition-all hover:shadow-xl hover:scale-[1.02]"
    >
      {/* Banner */}
      <div className="h-24 bg-linear-to-r from-kenya-red/20 to-kenya-gold/20 relative">
        <div className="absolute inset-0 bg-linear-to-t from-brand-surface-secondary to-transparent" />
      </div>
      
      {/* Content */}
      <div className="px-5 pb-5 -mt-10 relative">
        {/* Avatar */}
        <div className="relative w-20 h-20 rounded-full bg-linear-to-br from-kenya-red to-kenya-gold p-0.5 mb-3">
          <div className="w-full h-full rounded-full bg-brand-surface-secondary flex items-center justify-center text-2xl font-bold text-brand-text">
            {creator.name.split(' ').map(n => n[0]).join('')}
          </div>
          {creator.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-kenya-green flex items-center justify-center">
              <BadgeCheck className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        
        {/* Creator Info */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-bold text-brand-text group-hover:text-white transition-colors">
              {creator.name}
            </h3>
            <p className="text-sm text-brand-text-muted">{creator.username}</p>
          </div>
          
          <p className="text-sm text-brand-text-muted line-clamp-2 leading-relaxed">
            {creator.bio}
          </p>
          
          {/* Expertise Tags */}
          <div className="flex flex-wrap gap-1.5">
            {creator.expertise.slice(0, 2).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-0.5 bg-brand-surface-highlight text-brand-text-muted text-[10px] font-medium uppercase tracking-wider rounded"
              >
                {tag}
              </span>
            ))}
            {creator.expertise.length > 2 && (
              <span className="px-2 py-0.5 bg-brand-surface-highlight text-brand-text-muted text-[10px] font-medium uppercase tracking-wider rounded">
                +{creator.expertise.length - 2}
              </span>
            )}
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Video className="w-3.5 h-3.5 text-brand-text-muted" />
              </div>
              <p className="text-lg font-bold text-brand-text">{creator.totalVideos}</p>
              <p className="text-[10px] text-brand-text-muted uppercase tracking-wider">Videos</p>
            </div>
            
            <div className="text-center border-l border-r border-border">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="w-3.5 h-3.5 text-brand-text-muted" />
              </div>
              <p className="text-lg font-bold text-brand-text">
                {creator.followers >= 1000 ? `${(creator.followers / 1000).toFixed(0)}K` : creator.followers}
              </p>
              <p className="text-[10px] text-brand-text-muted uppercase tracking-wider">Followers</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Eye className="w-3.5 h-3.5 text-brand-text-muted" />
              </div>
              <p className="text-lg font-bold text-brand-text">{creator.totalViews}</p>
              <p className="text-[10px] text-brand-text-muted uppercase tracking-wider">Views</p>
            </div>
          </div>
          
          {/* Content Distribution Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-brand-text-muted">Content Mix</span>
              <TrendingUp className="w-3 h-3 text-brand-text-muted" />
            </div>
            <div className="h-2 bg-brand-surface-highlight rounded-full overflow-hidden flex">
              <div 
                className="bg-green-500 transition-all" 
                style={{ width: `${contentMix.facts}%` }}
                title={`${contentMix.facts}% Facts`}
              />
              <div 
                className="bg-blue-500 transition-all" 
                style={{ width: `${contentMix.opinions}%` }}
                title={`${contentMix.opinions}% Opinions`}
              />
              <div 
                className="bg-kenya-gold transition-all" 
                style={{ width: `${contentMix.satire}%` }}
                title={`${contentMix.satire}% Satire`}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-brand-text-muted">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {contentMix.facts}% Facts
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                {contentMix.opinions}% Opinion
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-kenya-gold" />
                {contentMix.satire}% Satire
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
