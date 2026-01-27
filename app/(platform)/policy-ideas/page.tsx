"use client";

import { MOCK_POLICY_IDEAS } from "@/lib/gamification";
import { PolicyIdeaCard } from "@/components/policy/PolicyIdeaCard";
import { Lightbulb, Plus, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PolicyIdeasPage() {
  const [filter, setFilter] = useState<string>("all");
  const [sort, setSort] = useState<string>("votes");
  
  const statusFilters = ["all", "popular", "presented", "implemented"];
  
  let filteredIdeas = filter === "all"
    ? MOCK_POLICY_IDEAS
    : MOCK_POLICY_IDEAS.filter(idea => idea.status === filter);
  
  // Sort
  if (sort === "votes") {
    filteredIdeas = [...filteredIdeas].sort((a, b) => b.votes - a.votes);
  } else if (sort === "recent") {
    filteredIdeas = [...filteredIdeas].sort((a, b) => 
      new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime()
    );
  }
  
  const implementedCount = MOCK_POLICY_IDEAS.filter(i => i.status === 'implemented').length;
  const popularCount = MOCK_POLICY_IDEAS.filter(i => i.status === 'popular').length;
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 py-6">
        <div className="flex items-center justify-center gap-3">
          <Lightbulb className="w-10 h-10 text-kenya-gold" />
          <h1 className="text-5xl font-black tracking-tight">Policy Ideas</h1>
        </div>
        <p className="text-lg text-brand-text-muted max-w-3xl mx-auto">
          Shape the future of Kenya. Submit your policy ideas, vote on others, and see your proposals reach decision-makers.
        </p>
      </div>
      
      {/* Stats */}
      <div className="bg-brand-surface-secondary border border-border rounded-xl p-6">
        <div className="grid grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-brand-text">{MOCK_POLICY_IDEAS.length}</p>
            <p className="text-sm text-brand-text-muted mt-1">Total Ideas</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-500">{popularCount}</p>
            <p className="text-sm text-brand-text-muted mt-1">Popular</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-kenya-green">{implementedCount}</p>
            <p className="text-sm text-brand-text-muted mt-1">Implemented</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-kenya-gold">
              {MOCK_POLICY_IDEAS.reduce((sum, i) => sum + i.votes, 0)}
            </p>
            <p className="text-sm text-brand-text-muted mt-1">Total Votes</p>
          </div>
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-center">
        <button className="bg-linear-to-r from-kenya-red to-kenya-gold text-white font-bold px-8 py-4 rounded-lg hover:scale-105 transition-transform flex items-center gap-3">
          <Plus className="w-6 h-6" />
          <span>Submit Your Policy Idea</span>
        </button>
      </div>
      
      {/* Filters & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex gap-2">
          {statusFilters.map(f => (
            <Button
              key={f}
              onClick={() => setFilter(f)}
              variant={filter === f ? "primary" : "secondary"}
              size="sm"
              className="capitalize"
            >
              {f === "all" ? "All Ideas" : f}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-brand-text-muted">Sort by:</span>
          <Button
            onClick={() => setSort("votes")}
            variant={sort === "votes" ? "primary" : "secondary"}
            size="sm"
          >
            Most Voted
          </Button>
          <Button
            onClick={() => setSort("recent")}
            variant={sort === "recent" ? "primary" : "secondary"}
            size="sm"
          >
            Most Recent
          </Button>
        </div>
      </div>
      
      {/* Policy Ideas Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredIdeas.map(idea => (
          <PolicyIdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
      
      {filteredIdeas.length === 0 && (
        <div className="text-center py-16">
          <Lightbulb className="w-16 h-16 text-brand-text-muted mx-auto mb-4 opacity-50" />
          <p className="text-brand-text-muted">No policy ideas found with this filter.</p>
        </div>
      )}
      
      {/* Success Stories */}
      {implementedCount > 0 && (
        <div className="bg-kenya-green/10 border border-kenya-green/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-6 h-6 text-kenya-green" />
            <h2 className="text-2xl font-bold text-brand-text">Success Stories</h2>
          </div>
          <p className="text-sm text-brand-text-muted mb-4">
            {implementedCount} youth-submitted policy {implementedCount === 1 ? 'idea has' : 'ideas have'} been implemented by government!
          </p>
          <div className="flex flex-wrap gap-2">
            {MOCK_POLICY_IDEAS.filter(i => i.status === 'implemented').map(idea => (
              <div key={idea.id} className="px-3 py-2 bg-kenya-green/20 rounded-lg">
                <p className="text-sm font-semibold text-kenya-green">{idea.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
