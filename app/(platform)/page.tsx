"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  CheckCircle,
  BadgeCheck,
  Info,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { DEMO_STREAMS } from "@/lib/demo-data";
import { FeedService, FeedItem } from "@/lib/feed-service";
import { ViewpointBalance } from "@/components/feed/ViewpointBalance";
import { PolifyPlayIcon } from "@/components/ui/PolifyPlayIcon";
import { CivicVideoPlayer } from "@/components/ui/CivicVideoPlayer";
import { CivicVideoTheater } from "@/components/ui/CivicVideoTheater";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
// Actually, let's use the layout's XPNotification concept or a simple local state for "New Updates" badge.

export default function Home() {
  const [activeHeroVideo, setActiveHeroVideo] = useState<FeedItem | null>(null);
  const [isHeroPlaying, setIsHeroPlaying] = useState(false); // Kept for CivicVideoPlayer callback compatibility, though mostly unused now
  const [theaterVideo, setTheaterVideo] = useState<FeedItem | null>(null); // Keeping just in case, but we will bypass it for main interactions
  const [feedItems, setFeedItems] = useState<FeedItem[]>(
    DEMO_STREAMS as unknown as FeedItem[],
  ); // Cast initial demo data
  const [isScanning, setIsScanning] = useState(false);
  const [newUpdateCount, setNewUpdateCount] = useState(0);

  const handleVideoClick = (item: FeedItem) => {
    setActiveHeroVideo(item);
    // Smooth scroll to top
    const heroElement = document.getElementById('hero-player');
    if (heroElement) {
        heroElement.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Poll for AI Updates
  useEffect(() => {
    // Initial load on mount
    const loadInitialFeeds = async () => {
      setIsScanning(true);
      const newItems = await FeedService.scanForUpdates();

      if (newItems.length > 0) {
        setFeedItems((prev) => {
          const existingIds = new Set(prev.map((i) => i.id));
          const uniqueNew = newItems.filter((i) => !existingIds.has(i.id));
          return [...uniqueNew, ...prev];
        });
        setNewUpdateCount((prev) => prev + newItems.length);
      }
      setIsScanning(false);
    };

    // Load immediately
    loadInitialFeeds();

    // Then poll every 30 minutes
    const interval = setInterval(
      async () => {
        setIsScanning(true);
        const newItems = await FeedService.scanForUpdates();

        if (newItems.length > 0) {
          setFeedItems((prev) => {
            const existingIds = new Set(prev.map((i) => i.id));
            const uniqueNew = newItems.filter((i) => !existingIds.has(i.id));
            return [...uniqueNew, ...prev];
          });
          setNewUpdateCount((prev) => prev + newItems.length);
        }
        setIsScanning(false);
      },
      30 * 60 * 1000,
    ); // 30 Minutes

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setNewUpdateCount(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden page-transition">
      {/* Video Theater Modal */}
      <CivicVideoTheater
        isOpen={!!theaterVideo}
        onClose={() => setTheaterVideo(null)}
        videoId={theaterVideo?.id.toString() || ""}
        videoUrl={theaterVideo?.videoUrl || ""}
        title={theaterVideo?.title || ""}
        host={theaterVideo?.host || ""}
        views={theaterVideo?.views || ""}
        timeAgo={theaterVideo?.timeAgo || ""}
      />

      {/* Hero / Featured / Active Player - STATIC */}
      <div className="shrink-0 p-4 pb-0 z-10 bg-background/95 backdrop-blur-md border-b border-white/5 shadow-md">
        <section className="relative rounded-3xl overflow-hidden bg-brand-surface-secondary aspect-video md:aspect-21/9 flex items-end shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-700 border border-white/5 group/hero" id="hero-player">
          <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
            {activeHeroVideo && activeHeroVideo.videoUrl ? (
             activeHeroVideo.videoUrl.includes("youtube") || activeHeroVideo.videoUrl.includes("youtu.be") ? (
               <iframe
                 src={
                   activeHeroVideo.videoUrl.includes("embed")
                     ? `${activeHeroVideo.videoUrl}${activeHeroVideo.videoUrl.includes("?") ? "&" : "?"}autoplay=1&modestbranding=1&rel=0`
                     : `https://www.youtube.com/embed/${activeHeroVideo.videoUrl.split("v=")[1]?.split("&")[0] || activeHeroVideo.videoUrl.split("/").pop()}?autoplay=1&modestbranding=1&rel=0`
                 }
                 title={activeHeroVideo.title}
                 className="w-full h-full"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowFullScreen
               />
             ) : (
                <CivicVideoPlayer
                  src={activeHeroVideo.videoUrl}
                  poster={activeHeroVideo.thumbnailUrl}
                  className="w-full h-full"
                  autoPlay={true}
                  onPlayToggle={(playing) => setIsHeroPlaying(playing)}
                />
             )
          ) : (
            <iframe 
              src="https://www.youtube.com/embed/live_stream?channel=UCk5iR0Y0x1z4QZ6x8x8x8x&autoplay=1&mute=1" 
              title="Citizen TV Live" 
              className="w-full h-full" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen 
            />
          )}
        </div>

        {/* Dynamic Overlay Info (Only shown if we have an active item AND it's not the default stream, OR we custom handle default stream overlay) */}
        {activeHeroVideo ? (
           <div className="relative z-20 p-8 space-y-4 pointer-events-none w-full bg-linear-to-t from-black/90 to-transparent">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kenya-red text-white text-xs font-bold uppercase tracking-wide">
               <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
               Now Playing
             </div>
             <h1 className="text-2xl md:text-4xl font-bold max-w-4xl text-white drop-shadow-lg line-clamp-2">
               {activeHeroVideo.title}
             </h1>
              <div className="flex items-center gap-3 text-sm text-gray-200">
                  <span className="font-bold">{activeHeroVideo.host}</span>
                  <span>• {activeHeroVideo.views}</span>
              </div>
           </div>
        ) : (
           <div className="relative z-20 p-8 space-y-4 pointer-events-none w-full bg-linear-to-t from-black/90 to-transparent">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kenya-red text-white text-xs font-bold uppercase tracking-wide">
                 <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                 Live Stream
               </div>
               <h1 className="text-3xl font-bold text-white drop-shadow-lg">Citizen TV Kenya Live</h1>
           </div>
        )}
        </section>
      </div>

      {/* SCROLLABLE FEED SECTION */}
      <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {/* Feed Filters */}
        <div className="flex items-center justify-between gap-4">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {[
            "All",
            "Parliament",
            "County Assemblies",
            "Explainer Videos",
            "Interviews",
            "Town Halls",
          ].map((filter, i) => (
            <Button
              key={filter}
              variant={i === 0 ? "primary" : "secondary"}
              size="sm"
              className="whitespace-nowrap"
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* AI Pulse Indicator */}
        <div className="flex items-center gap-3 shrink-0">
          {isScanning && (
            <span className="text-[10px] font-bold text-brand-text-muted flex items-center gap-2 animate-pulse">
              <RefreshCw className="w-3 h-3 animate-spin" /> AI Scanning Local
              Channels...
            </span>
          )}
          {newUpdateCount > 0 && (
            <button
              onClick={handleRefresh}
              className="bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2 animate-bounce shadow-lg shadow-brand-primary/20"
            >
              <Sparkles className="w-3 h-3 fill-current" /> {newUpdateCount} New
              Updates
            </button>
          )}
        </div>
      </div>

      {/* Content Grid + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content - 3 columns */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {feedItems.map((item) => (
            <Card
              key={item.id}
              className={cn(
                "border-0 bg-transparent shadow-none group cursor-pointer transition-all duration-500",
                item.isNew
                  ? "animate-in slide-in-from-top-10 fade-in order-first"
                  : "",
              )}
              onClick={() => handleVideoClick(item)}
            >
              <div className="relative aspect-video rounded-xl bg-brand-surface-highlight mb-3 overflow-hidden border border-white/5 shadow-lg group-hover:border-kenya-red/30 transition-all">
                <Image
                  src={item.thumbnailUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Branded Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors opacity-0 group-hover:opacity-100 duration-300">
                  <PolifyPlayIcon size="md" />
                </div>

                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded text-xs font-medium text-white z-10">
                  {item.duration}
                </div>

                {/* Truth Layer Badge */}
                <div
                  className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-md z-10
                    ${
                      item.verificationStatus === "Verified"
                        ? "bg-kenya-green text-black px-3"
                        : item.verificationStatus === "Pending"
                          ? "bg-kenya-gold/90 text-black"
                          : "bg-kenya-gold/90 text-black"
                    }`}
                >
                  {item.verificationStatus}
                </div>

                {/* AI Curator Badge (If new) */}
                {item.isNew && (
                  <div className="absolute top-2 left-20 ml-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-md z-10 bg-brand-primary text-white flex items-center gap-1 shadow-lg shadow-brand-primary/20">
                    <Sparkles className="w-3 h-3 fill-current" /> AI Pick
                  </div>
                )}

                {/* Why Recommended Icon */}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <button className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black/90 transition-colors z-10">
                      <Info className="w-3.5 h-3.5 text-white" />
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64 bg-brand-surface border-border shadow-2xl">
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-brand-text-muted uppercase tracking-widest">
                        PoliFy Recs
                      </h4>
                      <p className="text-sm text-brand-text leading-relaxed">
                        {item.recommendationReason}
                      </p>
                      <a
                        href="/transparency"
                        className="text-xs text-blue-400 hover:underline block pt-2 border-t border-border/50"
                      >
                        Learn about our algorithm →
                      </a>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <div className="flex gap-3">
                <div className="relative w-10 h-10 rounded-full bg-brand-surface-highlight shrink-0 overflow-hidden border border-white/10 ring-2 ring-white/5">
                  <Image
                    src={item.thumbnailUrl}
                    alt={item.host}
                    fill
                    className="object-cover opacity-90"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold leading-snug line-clamp-2 group-hover:text-kenya-red transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-brand-text-muted">
                    <span className="font-medium hover:text-white transition-colors">
                      {item.host}
                    </span>
                    {item.isVerifiedChannel && (
                      <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500/10" />
                    )}
                    <span>
                      • {item.views} • {item.timeAgo}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Sidebar - 1 column */}
        <div className="lg:col-span-1 space-y-6">
          <ViewpointBalance />

          {/* Campaign Tools CTA */}
          <Card className="border-kenya-green/30 bg-linear-to-br from-brand-surface to-kenya-green/5 p-5 shadow-inner group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-kenya-green/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-1000" />
            <h3 className="font-black text-xl mb-2 relative z-10">
              Running for Office?
            </h3>
            <p className="text-sm text-brand-text-muted mb-6 leading-relaxed relative z-10">
              Access professional campaign tools, manage your team, and publish
              verified content.
            </p>
            <a href="/campaign" className="relative z-10">
              <Button className="w-full bg-kenya-green hover:bg-kenya-green/90 text-white font-bold py-6 group-hover:shadow-[0_0_20px_rgba(0,140,81,0.3)] transition-all">
                Enter Campaign HQ
              </Button>
            </a>
          </Card>
        </div>
      </div>
      </div>
    </div>
  );
}
