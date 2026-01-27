"use client";

import { PolicyIdeaCard } from "@/components/policy/PolicyIdeaCard";
import { PolicySubmissionModal } from "@/components/policy/PolicySubmissionModal";
import { MOCK_POLICY_IDEAS } from "@/lib/gamification";
import { Lightbulb, Plus, CheckCircle2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase";
import { UserLevel, PolicyIdea } from "@/lib/gamification";

/* cSpell:ignore supabase */

interface Idea extends Omit<PolicyIdea, 'author'> {
  author: {
    name: string;
    level: UserLevel;
    badges: string[];
  };
  ai_analysis?: {
    feasibility: number;
    cost_index: number;
    impact_score: number;
    analyst_notes: string;
    ai_status: string;
  };
}

export default function PolicyIdeasPage() {
  const [filter, setFilter] = useState<string>("all");
  const [sort, setSort] = useState<string>("votes");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dbIdeas, setDbIdeas] = useState<Idea[]>([]);
  const supabase = createClient();
  
  const statusFilters = ["all", "popular", "presented", "implemented"];

  const fetchIdeas = useCallback(async () => {
    const { data } = await supabase
      .from('policy_ideas')
      .select(`
        *,
        profiles (full_name)
      `)
      .order('created_at', { ascending: false });
    
    if (data) {
      const mapped = data.map(idea => ({
        id: idea.id,
        title: idea.title,
        description: idea.description,
        category: idea.category,
        author: {
          name: idea.profiles?.full_name || 'Verified Citizen',
          level: 1 as UserLevel,
          badges: []
        },
        votes: idea.votes_count,
        commentCount: 0,
        status: idea.status,
        submittedDate: idea.created_at,
        impactStatement: idea.impact_statement,
        targetAudience: idea.target_audience || [],
        ai_analysis: idea.ai_analysis
      }));
      setDbIdeas(mapped);
    }
  }, [supabase]);

  useEffect(() => {
    const init = async () => {
      await fetchIdeas();
    };
    init();

    const channel = supabase
      .channel('policy_ideas_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'policy_ideas' }, () => {
        fetchIdeas();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, fetchIdeas]);
  
  // Combine Mock and DB ideas for a rich initial view
  const allIdeas = [...dbIdeas, ...MOCK_POLICY_IDEAS];
  
  let filteredIdeas = filter === "all"
    ? allIdeas
    : allIdeas.filter(idea => idea.status === filter);
  
  // Sort
  if (sort === "votes") {
    filteredIdeas = [...filteredIdeas].sort((a, b) => b.votes - a.votes);
  } else if (sort === "recent") {
    filteredIdeas = [...filteredIdeas].sort((a, b) => 
      new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime()
    );
  }
  
  const implementedCount = allIdeas.filter(i => i.status === 'implemented').length;
  const popularCount = allIdeas.filter(i => i.status === 'popular').length;
  
  return (
    <div className="space-y-8">
      <PolicySubmissionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => fetchIdeas()}
      />

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
            <p className="text-3xl font-bold text-brand-text">{allIdeas.length}</p>
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
              {allIdeas.reduce((sum, i) => sum + i.votes, 0)}
            </p>
            <p className="text-sm text-brand-text-muted mt-1">Total Votes</p>
          </div>
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-center">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-linear-to-r from-kenya-red to-kenya-gold text-white font-bold px-8 py-4 rounded-lg hover:scale-105 transition-transform flex items-center gap-3"
        >
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
            {allIdeas.filter(i => i.status === 'implemented').map(idea => (
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

