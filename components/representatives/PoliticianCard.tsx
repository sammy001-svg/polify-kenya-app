"use client";

import { PoliticianProfile } from "@/lib/representatives";
import { BadgeCheck, Phone, Mail, MapPin, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { FollowButton } from "@/components/ui/FollowButton";

interface PoliticianCardProps {
  politician: PoliticianProfile;
  showPosition?: boolean;
}

export function PoliticianCard({ politician, showPosition = true }: PoliticianCardProps) {
  const [followers, setFollowers] = useState<number | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      const { data } = await supabase
        .from('politician_stats')
        .select('followers_count')
        .eq('politician_id', politician.id)
        .single();
      
      if (data) {
        setFollowers(data.followers_count);
      }
    }
    fetchStats();
  }, [politician.id, supabase]);

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'President':
      case 'Deputy President':
        return 'bg-purple-500';
      case 'Governor':
      case 'Senator':
        return 'bg-kenya-red';
      case 'MP':
      case 'Woman Rep':
        return 'bg-kenya-gold';
      case 'MCA':
        return 'bg-kenya-green';
      default:
        return 'bg-blue-500';
    }
  };
  
  const getPartyColor = (party: string) => {
    switch (party) {
      case 'UDA':
        return 'bg-kenya-gold';
      case 'ODM':
        return 'bg-orange-500';
      case 'Jubilee':
        return 'bg-red-500';
      case 'Wiper':
        return 'bg-blue-500';
      case 'Independent':
        return 'bg-gray-500';
      default:
        return 'bg-gray-600';
    }
  };
  
  return (
    <Link 
      href={`/representatives/${politician.id}`}
      className="block bg-brand-surface border border-white/5 rounded-2xl overflow-hidden hover:border-kenya-gold/30 transition-all group relative"
    >
      <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative w-24 h-24 rounded-2xl bg-linear-to-br from-brand-surface-highlight to-brand-surface border border-white/10 flex items-center justify-center text-white font-black text-3xl shrink-0 overflow-hidden group-hover:border-kenya-gold/20 transition-all">
            <div className="absolute inset-0 bg-linear-to-tr from-kenya-red/10 to-kenya-gold/10 opacity-50" />
            <span className="relative z-10">{politician.name.split(' ').map(n => n[0]).join('')}</span>
          </div>
          
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-brand-text group-hover:text-white transition-colors truncate">
                    {politician.name}
                  </h3>
                  {politician.verified && (
                    <BadgeCheck className="w-5 h-5 text-kenya-green shrink-0" />
                  )}
                </div>
                {showPosition && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`${getPositionColor(politician.position)} text-white px-2 py-0.5 rounded text-xs font-bold`}>
                      {politician.position}
                    </span>
                    {politician.isIncumbent && (
                      <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs font-bold">
                        Incumbent
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Location */}
            <div className="flex items-center gap-1 text-sm text-brand-text-muted mb-2">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="truncate">
                {politician.ward && `${politician.ward} Ward, `}
                {politician.constituency && `${politician.constituency}, `}
                {politician.county}
              </span>
            </div>
            
            {/* Party */}
            <div className="flex items-center gap-2">
              <span className={`${getPartyColor(politician.party)} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                {politician.party}
              </span>
            </div>
          </div>
        </div>
        
        {/* Slogan */}
        <div className="bg-black/20 rounded-xl p-4 border border-white/5 group-hover:border-kenya-gold/10 transition-colors">
          <p className="text-sm font-bold text-white italic leading-relaxed">
            &quot;{politician.slogan}&quot;
          </p>
        </div>
        
        {/* Bio */}
        <p className="text-sm text-brand-text-muted line-clamp-2 leading-relaxed">
          {politician.bio}
        </p>
        
        {/* Key Agenda - Top 3 */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted mb-3 flex items-center gap-2">
            <TrendingUp className="w-3 h-3 text-kenya-gold" /> Key Agenda
          </p>
          <ul className="space-y-1">
            {politician.keyAgenda.slice(0, 3).map((item, index) => (
              <li key={index} className="flex gap-2 text-sm text-brand-text-muted group-hover:text-brand-text transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-kenya-gold mt-1.5 shrink-0" />
                <span className="line-clamp-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Track Record (if incumbent) */}
        {politician.isIncumbent && politician.trackRecord && (
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="w-4 h-4 text-kenya-green" />
              </div>
              <p className="text-lg font-bold text-brand-text">{politician.trackRecord.projectsCompleted}</p>
              <p className="text-[10px] text-brand-text-muted uppercase">Projects</p>
            </div>
            <div className="text-center border-l border-r border-border">
              <p className="text-lg font-bold text-brand-text">{politician.trackRecord.billsSponsored}</p>
              <p className="text-[10px] text-brand-text-muted uppercase">Bills</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-brand-text">
                {followers !== null ? followers : (politician.followers || 0)}
              </p>
              <p className="text-[10px] text-brand-text-muted uppercase">Followers</p>
            </div>
          </div>
        )}
        
        {/* If not incumbent, still show followers */}
        {!politician.isIncumbent && (
          <div className="flex items-center justify-center py-3 border-t border-border">
            <div className="text-center">
               <p className="text-lg font-bold text-brand-text">
                {followers !== null ? followers : (politician.followers || 0)}
              </p>
              <p className="text-[10px] text-brand-text-muted uppercase tracking-widest">Followers</p>
            </div>
          </div>
        )}
        
        {/* Contact Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            {politician.phone && (
              <button className="p-2 bg-brand-surface-highlight hover:bg-brand-surface-secondary rounded-lg transition-colors">
                <Phone className="w-4 h-4 text-brand-text" />
              </button>
            )}
            {politician.email && (
              <button className="p-2 bg-brand-surface-highlight hover:bg-brand-surface-secondary rounded-lg transition-colors">
                <Mail className="w-4 h-4 text-brand-text" />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3">
             <FollowButton 
                targetId={politician.id} 
                targetType="politician" 
                onFollowChange={(active: boolean) => setFollowers(prev => (prev || 0) + (active ? 1 : -1))}
             />
             <div className="flex items-center gap-1 text-sm font-semibold text-kenya-gold group-hover:text-kenya-red transition-colors">
                <span>View</span>
                <ArrowRight className="w-4 h-4" />
             </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
