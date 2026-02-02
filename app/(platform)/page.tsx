"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {
  BadgeCheck,
  Info,
  Sparkles,
  RefreshCw,
} from "lucide-react";

import { FeedService, FeedItem } from "@/lib/feed-service";
import { PolifyPlayIcon } from "@/components/ui/PolifyPlayIcon";
import { CivicVideoPlayer } from "@/components/ui/CivicVideoPlayer";
import { CivicVideoTheater } from "@/components/ui/CivicVideoTheater";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { AnimatePresence, motion } from "framer-motion";
import { CitizenDashboard } from "@/components/dashboard/CitizenDashboard";
import { TrustIndicator } from "@/components/trust/TrustIndicator";
import { HeroFeedCarousel } from "@/components/feed/HeroFeedCarousel";

export default function Home() {
  const [activeHeroVideo, setActiveHeroVideo] = useState<FeedItem | null>(null);
  // const [isHeroPlaying, setIsHeroPlaying] = useState(false);
  const [theaterVideo, setTheaterVideo] = useState<FeedItem | null>(null);
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [newUpdateCount, setNewUpdateCount] = useState(0);
  const [mobileTab, setMobileTab] = useState<'feed' | 'dashboard'>('feed');

  const handleVideoClick = (item: FeedItem) => {
    setActiveHeroVideo(item);
    const heroElement = document.getElementById('hero-player');
    if (heroElement) {
        heroElement.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const loadInitialFeeds = async () => {
      setIsScanning(true);
      // Simulate longer initial load for skeleton demo if needed, but keeping it fast for now
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

    loadInitialFeeds();

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
      60 * 60 * 1000,
    ); 

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setNewUpdateCount(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (

    <div className="h-[calc(100vh-64px)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent page-transition">
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

      <div className="flex flex-col min-h-full">


          {/* Hero / Featured / Active Player - Now Scrollable */}
          <div className="shrink-0 p-4 pb-0 z-10">
            <motion.section 
              layoutId="hero-player"
              className="relative rounded-3xl overflow-hidden bg-brand-surface-secondary aspect-video md:aspect-21/9 flex items-end shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-700 border border-white/5 group/hero" 
              id="hero-player"
            >
              
               {activeHeroVideo && activeHeroVideo.videoUrl ? (
                 // If user clicked a video, show it in full player mode
                 <div className="w-full h-full relative">
                    <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
                       {activeHeroVideo.videoUrl.includes("youtube") || activeHeroVideo.videoUrl.includes("youtu.be") ? (
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
                          />
                        )}
                    </div>
                     {/* Overlay Info for Active Video */}
                     <motion.div 
                      key={`info-${activeHeroVideo.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-0 left-0 z-20 p-8 space-y-4 pointer-events-none w-full bg-linear-to-t from-black/90 to-transparent"
                    >
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
                         <Button 
                            variant="secondary" 
                            size="sm" 
                            className="pointer-events-auto mt-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveHeroVideo(null); // Close active view, return to carousel
                            }}
                         >
                            Close Player
                        </Button>
                    </motion.div>
                 </div>
               ) : (
                 // Default State: The New Carousel
                 <HeroFeedCarousel initialVideos={feedItems} />
               )}
               
            </motion.section>
          </div>

        <div className="flex-1 p-4 space-y-8">
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
                  className="whitespace-nowrap transition-transform hover:scale-105"
                >
                  {filter}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <AnimatePresence>
                {isScanning && (
                  <motion.span 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="text-[10px] font-bold text-brand-text-muted flex items-center gap-2"
                  >
                    <RefreshCw className="w-3 h-3 animate-spin" /> AI Scanning Local Channels...
                  </motion.span>
                )}
                {newUpdateCount > 0 && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRefresh}
                    className="bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg shadow-brand-primary/20"
                  >
                    <Sparkles className="w-3 h-3 fill-current" /> {newUpdateCount} New Updates
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Mobile Tab Switcher */}
          <div className="flex lg:hidden bg-brand-surface-secondary p-1 rounded-lg mb-4">
             <button 
                onClick={() => setMobileTab('feed')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                    mobileTab === 'feed' 
                    ? 'bg-brand-surface shadow-md text-white' 
                    : 'text-brand-text-muted hover:text-white'
                }`}
             >
                Civic Feed
             </button>
             <button 
                onClick={() => setMobileTab('dashboard')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                    mobileTab === 'dashboard' 
                    ? 'bg-brand-surface shadow-md text-white' 
                    : 'text-brand-text-muted hover:text-white'
                }`}
             >
                My Dashboard
             </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className={`lg:col-span-3 ${mobileTab === 'dashboard' ? 'hidden lg:block' : ''}`}>
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {feedItems.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card
                        className="border-0 bg-transparent shadow-none group cursor-pointer h-full"
                        onClick={() => handleVideoClick(item)}
                      >
                        <div className="relative aspect-video rounded-xl bg-brand-surface-highlight mb-3 overflow-hidden border border-white/5 shadow-lg group-hover:border-kenya-red/30 transition-all">
                          <Image
                            src={item.thumbnailUrl}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />

                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors opacity-0 group-hover:opacity-100 duration-300">
                            <PolifyPlayIcon size="md" />
                          </div>

                          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded text-xs font-medium text-white z-10">
                            {item.duration}
                          </div>

                          <div className="absolute top-2 left-2 z-10 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                            <TrustIndicator 
                              status={item.verificationStatus} 
                              citations={item.citations}
                              compact 
                            />
                          </div>

                          {item.isNew && (
                            <div className="absolute top-2 left-20 ml-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-md z-10 bg-brand-primary text-white flex items-center gap-1 shadow-lg shadow-brand-primary/20">
                              <Sparkles className="w-3 h-3 fill-current" /> AI Pick
                            </div>
                          )}

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
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            <div className={`lg:col-span-1 h-[calc(100vh-64px)] overflow-y-auto sticky top-4 mb-4 ${mobileTab === 'feed' ? 'hidden lg:block' : ''}`}>
               <CitizenDashboard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
