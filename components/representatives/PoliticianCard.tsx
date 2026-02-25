"use client";

import { PoliticianProfile, PARTY_METADATA } from "@/lib/representatives";
import { BadgeCheck, Phone, Mail, MapPin, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase";
import { FollowButton } from "@/components/ui/FollowButton";

interface PoliticianCardProps {
  politician: PoliticianProfile;
  showPosition?: boolean;
}

export function PoliticianCard({ politician, showPosition = true }: PoliticianCardProps) {
  const [followers, setFollowers] = useState<number | null>(null);
  const supabase = useMemo(() => createClient(), []);

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
        return 'bg-purple-600 shadow-[0_0_15px_rgba(147,51,234,0.3)]';
      case 'Governor':
      case 'Senator':
        return 'bg-kenya-red shadow-[0_0_15px_rgba(187,25,25,0.3)]';
      case 'MP':
      case 'Woman Rep':
        return 'bg-kenya-gold text-black shadow-[0_0_15px_rgba(253,185,49,0.3)]';
      case 'MCA':
        return 'bg-kenya-green shadow-[0_0_15px_rgba(0,140,81,0.3)]';
      default:
        return 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.3)]';
    }
  };
  
  const partyInfo = PARTY_METADATA[politician.party] || { color: 'bg-gray-600', photo: '' };
  
  return (
    <Link 
      href={`/representatives/${politician.id}`}
      className="block glass border border-white/5 rounded-2xl overflow-hidden hover:border-kenya-gold/40 transition-all group relative hover-lift press-effect"
    >
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-kenya-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start gap-4">
          {/* Avatar Area */}
          <div className="relative w-24 h-24 rounded-2xl glass-brand border border-white/10 flex items-center justify-center text-white font-black text-3xl shrink-0 overflow-hidden group-hover:border-kenya-gold/30 group-hover:glow-gold transition-all duration-500 shadow-xl">
             {politician.photo ? (
                <Image 
                   src={politician.photo} 
                   alt={politician.name} 
                   fill 
                   className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
             ) : (
                <>
                  <div className="absolute inset-0 bg-linear-to-tr from-kenya-red/20 to-kenya-gold/20 opacity-50" />
                  <span className="relative z-10 drop-shadow-md">{politician.name.split(' ').map(n => n[0]).join('')}</span>
                </>
             )}
          </div>
          
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-brand-text group-hover:text-hologram transition-all truncate">
                    {politician.name}
                  </h3>
                  {politician.verified && (
                    <BadgeCheck className="w-5 h-5 text-kenya-green shrink-0" />
                  )}
                </div>
                {showPosition && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`${getPositionColor(politician.position)} text-white px-2 py-0.5 rounded-full text-[10px] uppercase font-black tracking-tight`}>
                      {politician.position}
                    </span>
                    {politician.isIncumbent && (
                      <span className="bg-kenya-green/20 text-kenya-green px-2 py-0.5 rounded-full text-[10px] uppercase font-black tracking-tight border border-kenya-green/20">
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
            
            {/* Party Tag */}
            <div className="flex items-center gap-2">
              <span className={`${partyInfo.color} text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-black/20 border border-white/10`}>
                {politician.party}
              </span>
            </div>
          </div>
        </div>
        
        {/* Slogan */}
        <div className="glass-dark rounded-2xl p-4 border border-white/5 group-hover:border-kenya-gold/20 transition-all shadow-inner">
          <p className="text-sm font-bold text-white italic leading-relaxed text-center">
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
        
        {/* Track Record Stats */}
        {politician.isIncumbent && politician.trackRecord && (
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
            <div className="text-center group/stat">
              <div className="flex items-center justify-center mb-1 group-hover/stat:scale-110 transition-transform">
                <TrendingUp className="w-4 h-4 text-kenya-green" />
              </div>
              <p className="text-lg font-black text-brand-text leading-none">{politician.trackRecord.projectsCompleted}</p>
              <p className="text-[10px] text-brand-text-muted uppercase font-black tracking-tighter">Projects</p>
            </div>
            <div className="text-center border-x border-white/5 group/stat">
              <p className="text-lg font-black text-brand-text leading-none">{politician.trackRecord.billsSponsored}</p>
              <p className="text-[10px] text-brand-text-muted uppercase font-black tracking-tighter">Bills</p>
            </div>
            <div className="text-center group/stat">
              <p className="text-lg font-black text-brand-text leading-none transition-all group-hover/stat:text-kenya-gold">
                {followers !== null ? followers : (politician.followers || 0)}
              </p>
              <p className="text-[10px] text-brand-text-muted uppercase font-black tracking-tighter">Followers</p>
            </div>
          </div>
        )}
        
        {/* If not incumbent, still show followers */}
        {!politician.isIncumbent && (
          <div className="flex items-center justify-center py-4 border-t border-white/5">
            <div className="text-center group/stat">
               <p className="text-2xl font-black text-brand-text group-hover/stat:text-kenya-gold transition-colors leading-none">
                {followers !== null ? followers : (politician.followers || 0)}
              </p>
              <p className="text-[11px] text-brand-text-muted uppercase font-black tracking-widest mt-1">Followers</p>
            </div>
          </div>
        )}
        
        {/* Contact & Dynamic Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            {politician.phone && (
              <button className="p-2 glass-brand hover:bg-white/10 rounded-xl transition-all hover:scale-110 active:scale-95">
                <Phone className="w-4 h-4 text-brand-text" />
              </button>
            )}
            {politician.email && (
              <button className="p-2 glass-brand hover:bg-white/10 rounded-xl transition-all hover:scale-110 active:scale-95">
                <Mail className="w-4 h-4 text-brand-text" />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3">
             <div className="scale-90 md:scale-100">
               <FollowButton 
                  targetId={politician.id} 
                  targetType="politician" 
                  onFollowChange={(active: boolean) => setFollowers(prev => (prev || 0) + (active ? 1 : -1))}
               />
             </div>
             <div className="flex items-center gap-1 text-sm font-black uppercase tracking-tighter text-kenya-gold group-hover:text-kenya-red transition-all group-hover:translate-x-1">
                <span>View</span>
                <ArrowRight className="w-4 h-4" />
             </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
