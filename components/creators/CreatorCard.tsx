"use client";

import { type CivicCreator } from "@/lib/creators";
import { BadgeCheck, Video, Eye, Users, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { FollowButton } from "@/components/ui/FollowButton";

interface CreatorCardProps {
  creator: CivicCreator;
}

export function CreatorCard({ creator }: CreatorCardProps) {
  const [followers, setFollowers] = useState<number | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      // Creators are just profiles with a specific ID (from the lib)
      const { data } = await supabase
        .from('profile_stats')
        .select('followers_count')
        .eq('profile_id', creator.id)
        .single();
      
      if (data) {
        setFollowers(data.followers_count);
      }
    }
    fetchStats();
  }, [creator.id, supabase]);

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
    <div className="group bg-brand-surface-secondary border border-border rounded-xl overflow-hidden hover:border-kenya-gold/50 transition-all hover:shadow-xl hover:scale-[1.02] flex flex-col h-full">
      <Link href={`/creators/${creator.id}`}>
        {/* Banner */}
        <div className="h-24 bg-linear-to-r from-kenya-red/20 to-kenya-gold/20 relative">
          <div className="absolute inset-0 bg-linear-to-t from-brand-surface-secondary to-transparent" />
        </div>
        
        {/* Profile Section */}
        <div className="px-5 -mt-10 relative">
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
          
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-brand-text group-hover:text-white transition-colors">
              {creator.name}
            </h3>
            <p className="text-sm text-brand-text-muted">{creator.username}</p>
          </div>
        </div>
      </Link>

      <div className="px-5 pb-5 flex-1 flex flex-col pt-3 space-y-4">
        <p className="text-sm text-brand-text-muted line-clamp-2 leading-relaxed">
          {creator.bio}
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 py-3 border-y border-border">
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
              {followers !== null 
                ? (followers >= 1000 ? `${(followers / 1000).toFixed(0)}K` : followers)
                : (creator.followers >= 1000 ? `${(creator.followers / 1000).toFixed(0)}K` : creator.followers)}
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

        {/* Footer Actions */}
        <div className="mt-auto flex items-center gap-3 pt-4">
          <FollowButton 
            targetId={creator.id} 
            targetType="profile" 
            className="flex-1 h-9"
            onFollowChange={(active) => setFollowers(prev => (prev || 0) + (active ? 1 : -1))}
          />
          <Link 
            href={`/creators/${creator.id}`}
            className="flex items-center gap-1 text-sm font-semibold text-kenya-gold hover:text-kenya-red transition-colors whitespace-nowrap"
          >
            <span>View Profile</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
