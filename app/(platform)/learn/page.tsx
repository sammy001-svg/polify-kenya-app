"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Filter, Trophy, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { GamificationService } from "@/lib/gamification-service";
import { LEARNING_PATHS, MOCK_USER_PROGRESS } from "@/lib/gamification";
import { LearningPathCard } from "@/components/learning/LearningPathCard";
import { Button } from "@/components/ui/button";

export default function LearnPage() {
  const [filter, setFilter] = useState<string>("all");
  const [userProgress, setUserProgress] = useState(MOCK_USER_PROGRESS);

  useEffect(() => {
    const fetchData = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const progress = await GamificationService.getUserProgress(user.id, supabase);
            if (progress) setUserProgress(progress);
        }
    };
    fetchData();
  }, []);
  
  const filters = ["all", "beginner", "intermediate", "advanced", "practical", "foundations"];
  
  const filteredPaths = filter === "all"
    ? LEARNING_PATHS
    : filter === "practical"
    ? LEARNING_PATHS.filter(p => p.category === "Practical Skills")
    : filter === "foundations"
    ? LEARNING_PATHS.filter(p => p.category === "Foundations")
    : LEARNING_PATHS.filter(p => p.difficulty === filter);
  
  // Calculate path progress
  const getPathProgress = (pathId: string) => {
    if (userProgress.completedPaths.includes(pathId)) return 100;
    const path = LEARNING_PATHS.find(p => p.id === pathId);
    if (!path) return 0;
    
    const completedModules = path.modules.filter(m => 
      userProgress.completedModules.includes(m.id)
    ).length;
    
    return Math.round((completedModules / path.modules.length) * 100);
  };
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2 py-4">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-white flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-kenya-green" />
          Learning Paths
        </h1>
        <p className="text-brand-text-muted max-w-2xl">
          Structured civic education journeys. Complete modules, earn badges, and become a knowledgeable citizen.
        </p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-brand-surface border border-white/5 rounded-2xl p-5 flex items-center gap-4 group hover:border-kenya-gold/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-kenya-gold/10 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-kenya-gold" />
            </div>
            <div>
                <p className="text-2xl font-black text-white">{LEARNING_PATHS.length}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted">Total Paths</p>
            </div>
          </div>
          
          <div className="bg-brand-surface border border-white/5 rounded-2xl p-5 flex items-center gap-4 group hover:border-kenya-green/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-kenya-green/10 flex items-center justify-center shrink-0">
                <Trophy className="w-6 h-6 text-kenya-green" />
            </div>
            <div>
                <p className="text-2xl font-black text-white">{userProgress.completedPaths.length}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted">Completed</p>
            </div>
          </div>

          <div className="bg-brand-surface border border-white/5 rounded-2xl p-5 flex items-center gap-4 group hover:border-brand-primary/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-brand-primary" />
            </div>
            <div>
                <p className="text-2xl font-black text-white">
                  {LEARNING_PATHS.reduce((sum, p) => sum + p.totalXP, 0)}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted">XP Available</p>
            </div>
          </div>
      </div>

      {/* Interactive Tools CTA */}
      <div className="bg-linear-to-br from-kenya-green/20 to-brand-bg border border-kenya-green/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
            <Sparkles className="w-24 h-24" />
        </div>
        <div className="relative z-10">
          <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
            Practice for Election Day
          </h3>
          <p className="text-brand-text-muted mt-1 max-w-md">
            Try our new interactive <span className="text-white font-bold">Ballot Simulator</span> to learn how to vote correctly and avoid spoilt votes.
          </p>
        </div>
        <Link href="/learn/simulators/ballot" className="w-full md:w-auto relative z-10">
          <Button size="lg" className="w-full bg-kenya-green hover:bg-white text-white hover:text-black font-black uppercase text-xs rounded-xl tracking-widest shadow-lg shadow-kenya-green/20">
            Launch Simulator
          </Button>
        </Link>
      </div>
      
      {/* Filters */}
      <div className="flex items-center gap-4 border-b border-white/5 pb-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
            <Filter className="w-4 h-4 text-brand-text-muted" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {filters.map(f => (
            <Button
              key={f}
              onClick={() => setFilter(f)}
              variant={filter === f ? "primary" : "secondary"}
              size="sm"
              className="capitalize whitespace-nowrap"
            >
              {f === "all" ? "All Paths" : f}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Learning Paths Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPaths.map(path => (
          <LearningPathCard 
            key={path.id} 
            path={path} 
            progress={getPathProgress(path.id)}
          />
        ))}
      </div>
      
      {filteredPaths.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-brand-text-muted mx-auto mb-4 opacity-50" />
          <p className="text-brand-text-muted">No paths found with this filter.</p>
        </div>
      )}

      {/* Leaderboard CTA */}
      <div className="py-12 border-t border-white/5 flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-kenya-gold/10 flex items-center justify-center">
            <Trophy className="w-8 h-8 text-kenya-gold" />
        </div>
        <div className="space-y-2">
            <h3 className="text-2xl font-black uppercase tracking-tight text-white">Ready to show off?</h3>
            <p className="text-brand-text-muted max-w-md mx-auto">
                Every module you complete boosts your rank on the national Civic Leaderboard. Check your status and see who you&apos;re competing with!
            </p>
        </div>
        <Link href="/leaderboard">
            <Button size="lg" className="bg-white text-black hover:bg-kenya-gold hover:text-white transition-all font-black uppercase tracking-widest px-8">
                View Leaderboard
            </Button>
        </Link>
      </div>
    </div>
  );
}
