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
  const [isHeroPlaying, setIsHeroPlaying] = useState(false);
  const [theaterVideo, setTheaterVideo] = useState<FeedItem | null>(null);
  const [feedItems, setFeedItems] = useState<FeedItem[]>(
    DEMO_STREAMS as unknown as FeedItem[],
  ); // Cast initial demo data
  const [isScanning, setIsScanning] = useState(false);
  const [newUpdateCount, setNewUpdateCount] = useState(0);

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
    <div className="space-y-8 pb-10 page-transition">
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

      {/* Hero / Featured */}
      <section className="relative rounded-3xl overflow-hidden bg-brand-surface-secondary aspect-video md:aspect-21/9 flex items-end shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-700 border border-white/5 group/hero">
        <div
          className={cn(
            "absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000",
            isHeroPlaying
              ? "opacity-20"
              : "opacity-90 bg-linear-to-t from-background via-background/40 to-transparent",
          )}
        />

        <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
          <CivicVideoPlayer
            src="https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            poster="/thumbnails/hero-poster.png"
            className="w-full h-full"
            onPlayToggle={(playing: boolean) => setIsHeroPlaying(playing)}
          />
        </div>

        {!isHeroPlaying && (
          <div className="relative z-20 p-8 space-y-4 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kenya-red text-white text-xs font-bold uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Live Now
            </div>
            <h1 className="text-4xl font-bold max-w-2xl text-white drop-shadow-lg">
              National Assembly: The Finance Bill Second Reading
            </h1>
            <p className="text-lg text-gray-200 max-w-xl drop-shadow-md">
              Watch live as MPs debate the proposed tax amendments. Get
              real-time fact-checking and historical context overlay.
            </p>
            <div className="flex gap-4 pointer-events-auto">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200"
                onClick={() => setIsHeroPlaying(true)}
              >
                <PolifyPlayIcon
                  size="sm"
                  className="mr-2 bg-transparent border-0 h-6 w-6"
                />
                Watch Broadcast
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="backdrop-blur-md bg-white/10 text-white border-white/20"
              >
                <CheckCircle className="mr-2 w-5 h-5 text-kenya-green" />
                Read Fact Sheet
              </Button>
            </div>
          </div>
        )}

        {isHeroPlaying && (
          <div className="absolute inset-0 z-30 pointer-events-none p-6 flex flex-col justify-between">
            {/* HUD Top: Truth Verification Status */}
            <div className="flex justify-between items-start animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="bg-black/60 glass rounded-xl p-3 px-4 border border-white/10 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-kenya-red animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">
                  Live AI Fact-Checking
                </span>
              </div>

              <div className="bg-kenya-green/20 glass rounded-xl p-3 border border-kenya-green/30 flex items-center gap-3">
                <BadgeCheck className="w-4 h-4 text-kenya-green" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">
                  Trust Score: 98%
                </span>
              </div>
            </div>

            {/* HUD Bottom: Real-time Context Banner */}
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <div className="bg-black/80 glass-dark rounded-2xl p-4 border-l-4 border-kenya-gold max-w-md shadow-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <Info className="w-3 h-3 text-kenya-gold" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-kenya-gold">
                    Legislative Context
                  </span>
                </div>
                <p className="text-sm font-bold text-white leading-snug">
                  Clause 47(b) proposes a 16% VAT on bread. Financial experts
                  project this will impact 85% of households.
                </p>
              </div>

              {/* Floating Micro-data */}
              <div className="flex gap-2">
                <div className="bg-white/10 glass rounded-full px-3 py-1 border border-white/10 text-[9px] font-bold text-white/70">
                  MP VOTES: YES (42) / NO (12)
                </div>
                <div className="bg-white/10 glass rounded-full px-3 py-1 border border-white/10 text-[9px] font-bold text-white/70">
                  FISCAL IMPACT: +KSH 2.4B
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

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
              onClick={() => setTheaterVideo(item)}
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
  );
}
