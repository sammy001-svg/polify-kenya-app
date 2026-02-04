"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Map, MapPin } from 'lucide-react';
import { mockVoterStats } from '@/data/iebc-data';

export function VoterStats() {
  const getIcon = (category: string) => {
    switch (category) {
      case 'National': return Users;
      case 'County': return Map;
      default: return MapPin;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {mockVoterStats.map((stat, index) => {
        const Icon = getIcon(stat.category);
        return (
          <Card key={index} className="bg-brand-surface border-white/5 hover:border-kenya-red/30 transition-colors group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-brand-text-muted">
                {stat.category} Voters
              </CardTitle>
              <Icon className="h-4 w-4 text-kenya-red group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-text">{stat.count.toLocaleString()}</div>
              <p className="text-xs text-brand-text-muted mt-1">
                {stat.name}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
