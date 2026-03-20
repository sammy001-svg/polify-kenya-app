/* cSpell:ignore supabase */
"use client";

import { use } from "react";
import { createClient } from "@/lib/supabase";
import { CIVIC_CREATORS } from "@/lib/creators";
import { FollowButton } from "@/components/ui/FollowButton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, MapPin, Globe, BadgeCheck, Users, Eye } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface CreatorProfile {
  id: string;
  full_name: string;
  username: string;
  avatar_url: string;
  bio: string;
  role: string;
  website: string;
  location: string;
}

export default function CreatorProfilePage({
  params,
}: {
  params: Promise<{ creatorId: string }>;
}) {
  const { creatorId } = use(params);
  const supabase = createClient();
  const [creator, setCreator] = useState<CreatorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Check Mock Data First (Preferred source for our core creators)
        const mockCreator = CIVIC_CREATORS.find(c => c.id === creatorId);
        
        // 1. Fetch Creator Profile from Supabase
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', creatorId)
          .single();

        if (profile) {
          setCreator(profile);
        } else if (mockCreator) {
          // Map mock to profile interface
          setCreator({
            id: mockCreator.id,
            full_name: mockCreator.name,
            username: mockCreator.username,
            avatar_url: mockCreator.avatarUrl,
            bio: mockCreator.bio,
            role: 'Civic Creator',
            website: '',
            location: 'Kenya'
          });
        }

        // 2. Fetch Creator Content (Placeholder for future non-shorts content)
        // setContent([]); (Removed since we're removing the list)

        // 3. Fetch Follower Count
        const { count } = await supabase
          .from('follows')
          .select('*', { count: 'exact', head: true })
          .eq('following_profile_id', creatorId);
        
        if (count !== null) {
          setFollowersCount(count);
        } else if (mockCreator) {
          setFollowersCount(mockCreator.followers);
        }

      } catch (error) {
        console.error("Error fetching creator data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [creatorId, supabase]);

  if (loading) {
     return <div className="flex justify-center py-20"><div className="animate-spin h-8 w-8 border-4 border-brand-primary border-t-transparent rounded-full"></div></div>;
  }
  
  if (!creator) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-brand-text mb-4">Creator not found</h2>
        <Link href="/creators" className="text-kenya-gold hover:underline">
          ← Back to Creators
        </Link>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link 
        href="/creators"
        className="inline-flex items-center gap-2 text-brand-text-muted hover:text-brand-text transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Creators
      </Link>
      
      {/* Creator Header */}
      <div className="bg-linear-to-br from-brand-surface-secondary to-brand-surface-highlight rounded-2xl overflow-hidden border border-border">
        {/* Banner */}
        <div className="h-32 bg-linear-to-r from-kenya-red/20 to-kenya-gold/20 relative">
          <div className="absolute inset-0 bg-linear-to-t from-brand-surface-secondary/80 to-transparent" />
        </div>
        
        {/* Profile Content */}
        <div className="px-8 pb-8 -mt-16 relative">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
             {/* Avatar */}
             <div className="relative w-32 h-32 rounded-full bg-linear-to-br from-kenya-red to-kenya-gold p-1 mb-4">
               <Avatar className="w-full h-full border-4 border-brand-surface-secondary">
                  <AvatarImage src={creator.avatar_url} alt={creator.full_name} />
                  <AvatarFallback className="text-4xl font-bold bg-brand-surface-secondary text-brand-text">
                     {creator.full_name ? creator.full_name.substring(0, 2).toUpperCase() : "CR"}
                  </AvatarFallback>
               </Avatar>
               {/* Verified Badge - assuming all 'creators' role are verified for now or add a field */}
               <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-kenya-green flex items-center justify-center border-4 border-brand-surface-secondary">
                 <BadgeCheck className="w-6 h-6 text-white" />
               </div>
             </div>

             {/* Follow Button */}
             <div className="mt-16 md:mt-0">
                <FollowButton 
                   targetId={creator.id} 
                   targetType="profile" 
                   onFollowChange={(isFollowing) => {
                      setFollowersCount(prev => isFollowing ? prev + 1 : prev - 1);
                   }}
                />
             </div>
          </div>
          
          {/* Creator Info */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-brand-text">{creator.full_name}</h1>
                <span className="px-3 py-1 bg-kenya-green/20 text-kenya-green text-xs font-bold uppercase tracking-wider rounded-full">
                  Verified Civic Creator
                </span>
              </div>
              {creator.username && <p className="text-lg text-brand-text-muted">@{creator.username}</p>}
            </div>
            
            <p className="text-brand-text leading-relaxed max-w-3xl">
              {creator.bio || "No bio available."}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-brand-text-muted">
               {creator.location && (
                  <div className="flex items-center gap-1">
                     <MapPin className="w-4 h-4" />
                     {creator.location}
                  </div>
               )}
               {creator.website && (
                  <div className="flex items-center gap-1">
                     <Globe className="w-4 h-4" />
                     <a href={creator.website} target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary underline">
                        Website
                     </a>
                  </div>
               )}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border max-w-md">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-5 h-5 text-brand-text-muted" />
                  <span className="text-xs text-brand-text-muted uppercase tracking-wider">Followers</span>
                </div>
                <p className="text-2xl font-bold text-brand-text">
                  {followersCount}
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="w-5 h-5 text-brand-text-muted" />
                  <span className="text-xs text-brand-text-muted uppercase tracking-wider">Engagement</span>
                </div>
                <p className="text-2xl font-bold text-brand-text">--</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Empty State */}
      <div className="text-center py-16 bg-brand-surface-secondary/50 rounded-2xl border border-dashed border-border">
        <Users className="w-16 h-16 text-brand-text-muted mx-auto mb-4 opacity-30" />
        <h3 className="text-xl font-bold text-brand-text mb-2">Civic Contributions</h3>
        <p className="text-brand-text-muted max-w-sm mx-auto">
          This creator&apos;s civic contributions and verified reports will appear here soon.
        </p>
      </div>
    </div>
  );
}
