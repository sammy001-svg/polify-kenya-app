"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Map, MapPin, Vote, Home } from 'lucide-react';
import { mockVoterStats, VoterStats as VoterStatsType } from '@/data/iebc-data';

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {mockVoterStats.map((stat, index) => {
        const Icon = getIcon(stat.category);
        return (
          <Card key={index} className="bg-brand-surface border-white/5 hover:border-kenya-red/50 transition-all duration-300 group hover:-translate-y-1 active:scale-95 cursor-pointer shadow-lg hover:shadow-kenya-red/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-brand-text-muted">
                {stat.category} Voters
              </CardTitle>
              <div className="p-2 rounded-full bg-brand-surface-highlight group-hover:bg-kenya-red/10 transition-colors">
                 <Icon className="h-4 w-4 text-kenya-red group-hover:scale-110 transition-transform" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-brand-text tracking-tight">{stat.count.toLocaleString()}</div>
              <p className="text-xs font-medium text-brand-text-muted mt-1 uppercase tracking-wide">
                {stat.name}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
