"use client";

import React, { useState, useRef, useEffect } from "react";
import { ShortVideo } from "@/lib/shorts-data";
import { ShortCard } from "./ShortCard";

export function ShortsFeed() {
  const [activeIndex, setActiveIndex] = useState(0);
  const feedRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Start empty, waiting for AI curation
  const [videos, setVideos] = useState<ShortVideo[]>([]);

  useEffect(() => {
    // Basic AI curation: fetch live shorts and append
    const fetchLiveShorts = async () => {
      try {
         setIsLoading(true);
         const { FeedService } = await import("@/lib/feed-service");
         const liveShorts = await FeedService.scanForShorts();
         if (liveShorts.length > 0) {
             setVideos(liveShorts);
         }
      } catch (e) {
        console.error("Failed to load shorts:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLiveShorts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!feedRef.current) return;
      const scrollY = feedRef.current.scrollTop;
      const height = feedRef.current.clientHeight;
      const index = Math.round(scrollY / height);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    };

    const feedElement = feedRef.current;
    if (feedElement) {
      feedElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (feedElement) {
        feedElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [activeIndex]);

  if (isLoading) {
      return (
          <div className="w-full h-full flex items-center justify-center bg-black text-white">
              <div className="text-center space-y-4">
                  <div className="w-12 h-12 border-4 border-kenya-red border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm font-bold animate-pulse">AI is curating the latest shorts...</p>
              </div>
          </div>
      );
  }

  if (videos.length === 0) {
      return (
          <div className="w-full h-full flex items-center justify-center bg-black text-white p-8">
              <div className="text-center max-w-md">
                 <h2 className="text-xl font-bold mb-2">No Shorts Found</h2>
                 <p className="text-gray-400">Our AI couldn&apos;t find any relevant political shorts from the live feeds right now. Please try again later.</p>
              </div>
          </div>
      );
  }

  return (
    <div
      ref={feedRef}
      className="w-full h-full overflow-y-auto snap-y snap-mandatory bg-black scrollbar-none overscroll-y-contain"
    >
      {videos.map((video, index) => (
        <ShortCard
          key={video.id}
          video={video}
          isActive={index === activeIndex}
        />
      ))}
    </div>
  );
}
