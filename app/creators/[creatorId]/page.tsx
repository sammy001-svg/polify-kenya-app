"use client";

import { use } from "react";
import { CIVIC_CREATORS, COHOSTED_DISCUSSIONS } from "@/lib/creators";
import { ContentTypeBadge } from "@/components/creators/ContentTypeBadge";
import { CoHostedCard } from "@/components/creators/CoHostedCard";
import { BadgeCheck, Video, Eye, Users, ArrowLeft, Play, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  contentType: 'fact' | 'opinion' | 'satire';
  duration: string;
  views: string;
  timeAgo: string;
  thumbnailUrl: string;
}

// Mock content for each creator
const CREATOR_CONTENT: Record<string, ContentItem[]> = {
  "siasa-decoded": [
    {
      id: "1",
      title: "Article 43 Explained: Your Economic Rights in 60 Seconds",
      description: "Quick breakdown of constitutional economic and social rights every Kenyan should know.",
      contentType: "fact",
      duration: "1:05",
      views: "45K",
      timeAgo: "2 days ago",
      thumbnailUrl: "/thumbnails/explainer.png",
    },
    {
      id: "2",
      title: "Why the BBI Failed: A Constitutional Analysis",
      description: "My take on the constitutional amendments that didn't make it past the courts.",
      contentType: "opinion",
      duration: "12:30",
      views: "89K",
      timeAgo: "1 week ago",
      thumbnailUrl: "/thumbnails/interview.png",
    },
    {
      id: "3",
      title: "When Politicians Quote the Constitution Wrong 😂",
      description: "A compilation of MPs misquoting constitutional provisions during debates.",
      contentType: "satire",
      duration: "8:15",
      views: "156K",
      timeAgo: "3 days ago",
      thumbnailUrl: "/thumbnails/parliament.png",
    },
  ],
  "civic-millennial": [
    {
      id: "4",
      title: "Finance Bill 2026: The Numbers They Don't Want You to See",
      description: "Data-driven analysis of tax changes and their real impact on young workers.",
      contentType: "fact",
      duration: "15:45",
      views: "78K",
      timeAgo: "5 days ago",
      thumbnailUrl: "/thumbnails/explainer.png",
    },
    {
      id: "5",
      title: "Why I Think the Hustler Fund is Misguided",
      description: "My analysis of why microloans won't solve youth unemployment.",
      contentType: "opinion",
      duration: "18:20",
      views: "112K",
      timeAgo: "1 week ago",
      thumbnailUrl: "/thumbnails/townhall.png",
    },
  ],
  "bunge-roaster": [
    {
      id: "6",
      title: "MPs Sleeping During Budget Reading: A Montage",
      description: "When the most important financial discussion of the year becomes nap time.",
      contentType: "satire",
      duration: "4:30",
      views: "234K",
      timeAgo: "1 day ago",
      thumbnailUrl: "/thumbnails/parliament.png",
    },
    {
      id: "7",
      title: "How Bills Actually Become Laws (The Real Process)",
      description: "Behind the comedy: the actual legislative process explained.",
      contentType: "fact",
      duration: "10:15",
      views: "67K",
      timeAgo: "4 days ago",
      thumbnailUrl: "/thumbnails/explainer.png",
    },
    {
      id: "8",
      title: "Today on Parliament Chronicles: The Drama Continues",
      description: "This week's most entertaining moments from the National Assembly.",
      contentType: "satire",
      duration: "14:50",
      views: "189K",
      timeAgo: "2 days ago",
      thumbnailUrl: "/thumbnails/parliament.png",
    },
  ],
  "sheria-mtaani": [
    {
      id: "9",
      title: "Know Your Rights: What Police Can and Cannot Do",
      description: "Factual breakdown of your constitutional rights during police encounters.",
      contentType: "fact",
      duration: "11:30",
      views: "145K",
      timeAgo: "3 days ago",
      thumbnailUrl: "/thumbnails/explainer.png",
    },
    {
      id: "10",
      title: "The Right to Peaceful Assembly: Chapter 4 Deep Dive",
      description: "Understanding Article 37 and when the state can (and can't) stop protests.",
      contentType: "fact",
      duration: "16:45",
      views: "92K",
      timeAgo: "1 week ago",
      thumbnailUrl: "/thumbnails/townhall.png",
    },
  ],
  "budget-watchdog": [
    {
      id: "11",
      title: "County Budget 2026: Where Your Money Actually Goes",
      description: "Following the money trail through all 47 county budgets.",
      contentType: "fact",
      duration: "20:15",
      views: "56K",
      timeAgo: "6 days ago",
      thumbnailUrl: "/thumbnails/explainer.png",
    },
    {
      id: "12",
      title: "Is the Government Cooking the Books? My Analysis",
      description: "Questioning discrepancies in official revenue vs. expenditure reports.",
      contentType: "opinion",
      duration: "13:40",
      views: "71K",
      timeAgo: "2 weeks ago",
      thumbnailUrl: "/thumbnails/interview.png",
    },
  ],
  "devolution-diaries": [
    {
      id: "13",
      title: "How Devolution Was Supposed to Work vs. How It Actually Works",
      description: "Comparing the constitutional vision with reality on the ground.",
      contentType: "opinion",
      duration: "14:20",
      views: "63K",
      timeAgo: "5 days ago",
      thumbnailUrl: "/thumbnails/townhall.png",
    },
    {
      id: "14",
      title: "County Government 101: Structure and Functions",
      description: "Understanding the roles of Governor, MCAs, and County Executive.",
      contentType: "fact",
      duration: "9:50",
      views: "48K",
      timeAgo: "1 week ago",
      thumbnailUrl: "/thumbnails/explainer.png",
    },
  ],
};

export default function CreatorProfilePage({
  params,
}: {
  params: Promise<{ creatorId: string }>;
}) {
  const { creatorId } = use(params);
  const creator = CIVIC_CREATORS.find(c => c.id === creatorId);
  const [activeTab, setActiveTab] = useState<'all' | 'fact' | 'opinion' | 'satire'>('all');
  
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
  
  const content = CREATOR_CONTENT[creatorId] || [];
  const coHostedDiscussions = COHOSTED_DISCUSSIONS.filter(d => d.creatorId === creatorId);
  
  const filteredContent = activeTab === 'all' 
    ? content 
    : content.filter(c => c.contentType === activeTab);
  
  const contentCounts = {
    all: content.length,
    fact: content.filter(c => c.contentType === 'fact').length,
    opinion: content.filter(c => c.contentType === 'opinion').length,
    satire: content.filter(c => c.contentType === 'satire').length,
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
          {/* Avatar */}
          <div className="relative w-32 h-32 rounded-full bg-linear-to-br from-kenya-red to-kenya-gold p-1 mb-4">
            <div className="w-full h-full rounded-full bg-brand-surface-secondary flex items-center justify-center text-4xl font-bold text-brand-text">
              {creator.name.split(' ').map(n => n[0]).join('')}
            </div>
            {creator.isVerified && (
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-kenya-green flex items-center justify-center border-4 border-brand-surface-secondary">
                <BadgeCheck className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
          
          {/* Creator Info */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-brand-text">{creator.name}</h1>
                {creator.isVerified && (
                  <span className="px-3 py-1 bg-kenya-green/20 text-kenya-green text-xs font-bold uppercase tracking-wider rounded-full">
                    Verified Civic Creator
                  </span>
                )}
              </div>
              <p className="text-lg text-brand-text-muted">{creator.username}</p>
            </div>
            
            <p className="text-brand-text leading-relaxed max-w-3xl">
              {creator.bio}
            </p>
            
            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-2">
              {creator.expertise.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-brand-surface-highlight text-brand-text text-sm font-medium rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-border max-w-2xl">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Video className="w-5 h-5 text-brand-text-muted" />
                  <span className="text-xs text-brand-text-muted uppercase tracking-wider">Videos</span>
                </div>
                <p className="text-2xl font-bold text-brand-text">{creator.totalVideos}</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-5 h-5 text-brand-text-muted" />
                  <span className="text-xs text-brand-text-muted uppercase tracking-wider">Followers</span>
                </div>
                <p className="text-2xl font-bold text-brand-text">
                  {(creator.followers / 1000).toFixed(0)}K
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="w-5 h-5 text-brand-text-muted" />
                  <span className="text-xs text-brand-text-muted uppercase tracking-wider">Total Views</span>
                </div>
                <p className="text-2xl font-bold text-brand-text">{creator.totalViews}</p>
              </div>
            </div>
            
            {/* Signature */}
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-brand-text-muted italic">
                &quot;{creator.signature}&quot;
              </p>
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
            onClick={() => setActiveTab('fact')}
            variant={activeTab === 'fact' ? "primary" : "secondary"}
            size="sm"
            className="gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Facts ({contentCounts.fact})
          </Button>
          <Button
            onClick={() => setActiveTab('opinion')}
            variant={activeTab === 'opinion' ? "primary" : "secondary"}
            size="sm"
            className="gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            Opinions ({contentCounts.opinion})
          </Button>
          <Button
            onClick={() => setActiveTab('satire')}
            variant={activeTab === 'satire' ? "primary" : "secondary"}
            size="sm"
            className="gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            Satire ({contentCounts.satire})
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
                <ContentTypeBadge type={item.contentType} size="sm" />
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
                <span>{item.timeAgo}</span>
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
      
      {/* Co-Hosted Discussions */}
      {coHostedDiscussions.length > 0 && (
        <div className="space-y-4 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold text-brand-text">Co-Hosted Discussions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coHostedDiscussions.map((discussion) => (
              <CoHostedCard key={discussion.id} discussion={discussion} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
