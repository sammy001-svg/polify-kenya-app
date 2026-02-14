"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Map, MapPin, Vote, Home, Activity } from 'lucide-react';
import { mockVoterStats, VoterStats as VoterStatsType } from '@/data/iebc-data';

const AnimatedCounter = ({ end, duration = 2000 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(end * percentage));

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

export function VoterStats() {
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
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-white italic">LIVE REGISTRY DATA</h2>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-kenya-red/10 border border-kenya-red/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kenya-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-kenya-red"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-kenya-red">Live Updates</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockVoterStats.map((stat, index) => {
            const Icon = getIcon(stat.category);
            return (
            <Card key={index} className="bg-brand-surface border-white/5 hover:border-kenya-red/50 transition-all duration-300 group hover:-translate-y-1 active:scale-95 cursor-pointer shadow-lg hover:shadow-kenya-red/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Icon className="w-16 h-16 text-kenya-red transform rotate-12" />
                </div>
                
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-brand-text-muted">
                    {stat.category}
                </CardTitle>
                <div className="p-2 rounded-full bg-black/40 border border-white/5 group-hover:bg-kenya-red/20 transition-colors">
                    <Icon className="h-4 w-4 text-brand-text-muted group-hover:text-kenya-red transition-colors" />
                </div>
                </CardHeader>
                <CardContent className="relative z-10">
                <div className="text-3xl font-black text-white tracking-tight tabular-nums">
                    <AnimatedCounter end={stat.count} />
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <Activity className="w-3 h-3 text-kenya-green" />
                    <p className="text-[10px] font-bold text-kenya-green uppercase tracking-wide">
                        +42 today
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
