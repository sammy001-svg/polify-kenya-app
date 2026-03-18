"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Map, MapPin, Vote, Home, Activity } from 'lucide-react';
import { mockVoterStats, VoterStats as VoterStatsType } from '@/data/iebc-data';

const AnimatedCounter = ({ end, duration = 2000 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(end * percentage));

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setHasAnimated(true);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration, hasAnimated]);

  const displayCount = hasAnimated ? end : count;

  return <span className="transition-all duration-300 transform inline-block">{displayCount.toLocaleString()}</span>;
};

export function VoterStats() {
  // Initialize state with deterministic baseline for live ticking simulation to avoid SSR hydration mismatch
  const [liveStats, setLiveStats] = useState(() => 
    mockVoterStats.map((stat, index) => ({
      ...stat,
      today: [42, 18, 5, 2][index % 4] || 10 // Deterministic starting values based on hierarchy
    }))
  );

  // Simulate real-time Continuous Voter Registration (CVR)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prevStats => 
        prevStats.map(stat => {
          // National moves faster than County/Ward, simulate realistic random probability
          let probability = 0;
          if (stat.category === "National") probability = 0.6;
          else if (stat.category === "County") probability = 0.4;
          else if (stat.category === "Constituency") probability = 0.2;
          else if (stat.category === "Ward") probability = 0.1;

          if (Math.random() < probability) {
            const increment = Math.random() > 0.8 ? 2 : 1;
            return {
              ...stat,
              count: stat.count + increment,
              today: stat.today + increment
            };
          }
          return stat;
        })
      );
    }, 2500); // Check every 2.5s for new simulated registration

    return () => clearInterval(interval);
  }, []);

  const getIcon = (category: VoterStatsType["category"]) => {
    switch (category) {
      case 'National': return Users;
      case 'County': return Map;
      case 'Constituency': return Vote;
      case 'Ward': return Home;
      default: return MapPin;
    }
  };

  return (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-black text-white italic">LIVE REGISTRY DATA</h2>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-kenya-red/10 border border-kenya-red/20 shadow-lg shadow-kenya-red/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kenya-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-kenya-red"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-kenya-red">Live IEBC Updates</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {liveStats.map((stat, index) => {
            const Icon = getIcon(stat.category);
            return (
            <Card key={index} className="bg-brand-surface border-white/5 hover:border-kenya-red/50 transition-all duration-300 group hover:-translate-y-1 active:scale-95 cursor-default shadow-lg hover:shadow-kenya-red/10 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Icon className="w-16 h-16 text-kenya-red transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-brand-text-muted">
                    {stat.category}
                </CardTitle>
                <div className="p-2 rounded-full bg-black/40 border border-white/5 group-hover:bg-kenya-red/20 transition-colors">
                    <Icon className="h-4 w-4 text-brand-text-muted group-hover:text-kenya-red transition-colors" />
                </div>
                </CardHeader>
                <CardContent className="relative z-10 flex-1 flex flex-col justify-end">
                <div className="text-3xl font-black text-white tracking-tight tabular-nums">
                    <AnimatedCounter end={stat.count} />
                </div>
                <div className="flex items-center gap-1.5 mt-2 transition-all duration-300">
                    <Activity className="w-3 h-3 text-kenya-green animate-pulse" />
                    <p className="text-[10px] font-bold text-kenya-green uppercase tracking-wide">
                        +{stat.today.toLocaleString()} today
                    </p>
                </div>
                <p className="text-xs font-medium text-brand-text-muted mt-3 pt-3 border-t border-white/5 uppercase tracking-wide">
                    {stat.name}
                </p>
                </CardContent>
            </Card>
            );
        })}
        </div>
    </div>
  );
}
