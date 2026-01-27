"use client";

import { LEARNING_PATHS, MOCK_USER_PROGRESS } from "@/lib/gamification";
import Link from "next/link";
import { LearningPathCard } from "@/components/learning/LearningPathCard";
import { BookOpen, Filter } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LearnPage() {
  const [filter, setFilter] = useState<string>("all");
  
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
    if (MOCK_USER_PROGRESS.completedPaths.includes(pathId)) return 100;
    const path = LEARNING_PATHS.find(p => p.id === pathId);
    if (!path) return 0;
    
    const completedModules = path.modules.filter(m => 
      MOCK_USER_PROGRESS.completedModules.includes(m.id)
    ).length;
    
    return Math.round((completedModules / path.modules.length) * 100);
  };
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 py-6">
        <div className="flex items-center justify-center gap-3">
          <BookOpen className="w-10 h-10 text-kenya-green" />
          <h1 className="text-5xl font-black tracking-tight">Learning Paths</h1>
        </div>
        <p className="text-lg text-brand-text-muted max-w-3xl mx-auto">
          Structured civic education journeys. Complete modules, earn badges, and become a knowledgeable citizen.
        </p>
      </div>
      
      {/* Stats */}
      <div className="bg-brand-surface-secondary border border-border rounded-xl p-6">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-kenya-gold">{LEARNING_PATHS.length}</p>
            <p className="text-sm text-brand-text-muted mt-1">Total Paths</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-kenya-green">{MOCK_USER_PROGRESS.completedPaths.length}</p>
            <p className="text-sm text-brand-text-muted mt-1">Completed</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-brand-text">
              {LEARNING_PATHS.reduce((sum, p) => sum + p.totalXP, 0)}
            </p>
            <p className="text-sm text-brand-text-muted mt-1">Total XP Available</p>
          </div>
        </div>
      </div>

      {/* Interactive Tools CTA */}
      <div className="bg-brand-surface-highlight border border-kenya-green/30 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">🗳️</span>
            Practice for Election Day!
          </h3>
          <p className="text-brand-text-muted mt-1">
            Try our new interactive Ballot Simulator to learn how to vote correctly.
          </p>
        </div>
        <Link href="/learn/simulators/ballot">
          <Button size="lg" className="bg-kenya-green hover:bg-kenya-green/90 text-white font-bold">
            Launch Simulator
          </Button>
        </Link>
      </div>
      
      {/* Filters */}
      <div className="flex items-center gap-4 border-b border-border pb-4">
        <Filter className="w-5 h-5 text-brand-text-muted" />
        <div className="flex gap-2">
          {filters.map(f => (
            <Button
              key={f}
              onClick={() => setFilter(f)}
              variant={filter === f ? "primary" : "secondary"}
              size="sm"
              className="capitalize"
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
    </div>
  );
}
