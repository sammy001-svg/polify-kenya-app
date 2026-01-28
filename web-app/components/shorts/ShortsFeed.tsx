"use client";

import React, { useState, useRef, useEffect } from 'react';
import { SHORTS_DATA } from '@/lib/shorts-data';
import { ShortCard } from './ShortCard';

export function ShortsFeed() {
  const [activeIndex, setActiveIndex] = useState(0);
  const feedRef = useRef<HTMLDivElement>(null);

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
      feedElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (feedElement) {
        feedElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeIndex]);

  return (
    <div 
      ref={feedRef}
      className="w-full max-w-md mx-auto h-[calc(100vh-64px)] overflow-y-auto snap-y snap-mandatory bg-black scrollbar-none"
    >
      {SHORTS_DATA.map((video, index) => (
        <ShortCard 
          key={video.id} 
          video={video} 
          isActive={index === activeIndex} 
        />
      ))}
    </div>
  );
}
