/* cSpell:ignore supabase */
"use client";

import { use } from "react";
import { createClient } from "@/lib/supabase";
import { BadgeCheck, Video, Eye, Users, ArrowLeft, Play, Clock, Globe, MapPin } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FollowButton } from "@/components/ui/FollowButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

interface ShortVideo {
  id: string;
  title: string;
  description: string;
  video_url: string;
  verification_status: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  // Simulated fields for now until schema supports them fully
  duration?: string;
  views?: string;
}

export default function CreatorProfilePage({
  params,
}: {
  params: Promise<{ creatorId: string }>;
}) {
  const { creatorId } = use(params);
  const supabase = createClient();
  const [creator, setCreator] = useState<CreatorProfile | null>(null);
  const [content, setContent] = useState<ShortVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'Verified' | 'Pending' | 'Fact-Checked'>('all');
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // 1. Fetch Creator Profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', creatorId)
          .single();

        if (profileError) throw profileError;
        setCreator(profile);

        // 2. Fetch Creator Content (Shorts)
        const { data: shorts, error: shortsError } = await supabase
          .from('shorts')
          .select('*')
          .eq('creator_id', creatorId)
          .order('created_at', { ascending: false });

        if (shortsError) throw shortsError;
        
        // Enrich shorts with mock data for missing fields if needed
        const enrichedShorts = (shorts || []).map(short => ({
           ...short,
           duration: "1:00", // Default or random
           views: (Math.floor(Math.random() * 5000) + 500).toString() // Mock views for now
        }));
        setContent(enrichedShorts);

        // 3. Fetch Follower Count
        const { count, error: countError } = await supabase
          .from('follows')
          .select('*', { count: 'exact', head: true })
          .eq('following_profile_id', creatorId);
        
        if (!countError) {
          setFollowersCount(count || 0);
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
  
  const filteredContent = activeTab === 'all' 
    ? content 
    : content.filter(c => c.verification_status === activeTab);
  
  const contentCounts = {
    all: content.length,
    verified: content.filter(c => c.verification_status === 'Verified').length,
    pending: content.filter(c => c.verification_status === 'Pending').length,
    factChecked: content.filter(c => c.verification_status === 'Fact-Checked').length,
  };
  
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
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-border max-w-2xl">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Video className="w-5 h-5 text-brand-text-muted" />
                  <span className="text-xs text-brand-text-muted uppercase tracking-wider">Shorts</span>
                </div>
                <p className="text-2xl font-bold text-brand-text">{content.length}</p>
              </div>
              
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
                  <span className="text-xs text-brand-text-muted uppercase tracking-wider">Total Views</span>
                </div>
                <p className="text-2xl font-bold text-brand-text">--</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Button
            onClick={() => setActiveTab('all')}
            variant={activeTab === 'all' ? "primary" : "secondary"}
            size="sm"
          >
            All Content ({contentCounts.all})
          </Button>
          <Button
            onClick={() => setActiveTab('Verified')}
            variant={activeTab === 'Verified' ? "primary" : "secondary"}
            size="sm"
            className="gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Verified ({contentCounts.verified})
          </Button>
          <Button
            onClick={() => setActiveTab('Pending')}
            variant={activeTab === 'Pending' ? "primary" : "secondary"}
            size="sm"
            className="gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            Pending ({contentCounts.pending})
          </Button>
          <Button
            onClick={() => setActiveTab('Fact-Checked')}
            variant={activeTab === 'Fact-Checked' ? "primary" : "secondary"}
            size="sm"
            className="gap-2"
          >
             <div className="w-2 h-2 rounded-full bg-blue-500" />
            Fact-Checked ({contentCounts.factChecked})
          </Button>
        </div>
      </div>
      
      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((item) => (
          <div 
            key={item.id}
            className="bg-brand-surface-secondary border border-border rounded-xl overflow-hidden hover:border-kenya-gold/50 transition-all group cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-brand-surface-highlight">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white fill-white ml-1" />
                </div>
              </div>
              
              <div className="absolute top-3 left-3">
                 <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    item.verification_status === 'Verified' ? 'bg-green-500/20 text-green-500' : 
                    item.verification_status === 'Fact-Checked' ? 'bg-blue-500/20 text-blue-500' : 
                    'bg-yellow-500/20 text-yellow-500'
                 }`}>
                    {item.verification_status}
                 </span>
              </div>
              
              <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-xs font-medium text-white flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {item.duration}
              </div>
            </div>
            
            {/* Content Info */}
            <div className="p-4 space-y-2">
              <h3 className="font-bold text-brand-text leading-tight line-clamp-2 group-hover:text-white transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-brand-text-muted line-clamp-2 leading-relaxed">
                {item.description}
              </p>
              <div className="flex items-center gap-3 text-sm text-brand-text-muted pt-2 border-t border-border">
                <div className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {item.views}
                </div>
                <span>•</span>
                <span>{new Date(item.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {filteredContent.length === 0 && (
        <div className="text-center py-16">
          <Video className="w-16 h-16 text-brand-text-muted mx-auto mb-4 opacity-50" />
          <p className="text-brand-text-muted">
            No {activeTab === 'all' ? 'content' : activeTab} content from this creator yet.
          </p>
        </div>
      )}
    </div>
  );
}
