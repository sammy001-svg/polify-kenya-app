"use client";

import { useState } from "react";
import { DEMO_MEMES } from "@/lib/demo-data";
import { MemeCard } from "@/components/trending/MemeCard";
import { TrendingUp, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TrendingPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  
  const filters = ["All", "Parliament Roasts", "County Drama", "Policy Explainers", "Youth Reactions"];
  
  const filteredMemes = activeFilter === "All" 
    ? DEMO_MEMES 
    : DEMO_MEMES.filter(m => m.category === activeFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3 py-6">
        <div className="flex items-center justify-center gap-3">
          <Flame className="w-10 h-10 text-kenya-red animate-pulse" />
          <h1 className="text-5xl font-black tracking-tight">Trending on Baraza</h1>
          <TrendingUp className="w-10 h-10 text-kenya-gold" />
        </div>
        <p className="text-lg text-brand-text-muted">
          Political discourse, but make it <span className="text-kenya-green font-bold">relatable</span> 😂
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-border">
        {filters.map((filter) => (
          <Button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            variant={activeFilter === filter ? "primary" : "secondary"}
            size="sm"
            className="whitespace-nowrap"
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Memes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMemes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>

      {/* Empty State */}
      {filteredMemes.length === 0 && (
        <div className="text-center py-16 text-brand-text-muted">
          <p>No memes in this category yet. Check back soon! 👀</p>
        </div>
      )}
    </div>
  );
}
