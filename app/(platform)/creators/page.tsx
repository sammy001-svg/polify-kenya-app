"use client";

import { useState } from "react";
import { CIVIC_CREATORS, COHOSTED_DISCUSSIONS } from "@/lib/creators";
import { CreatorCard } from "@/components/creators/CreatorCard";
import { CoHostedCard } from "@/components/creators/CoHostedCard";
import { Sparkles, Users, Video, Award, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreatorsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [showCoHosted, setShowCoHosted] = useState(false);
  
  const filters = ["All", "Constitutional Law", "Policy Analysis", "Political Comedy", "Legal Education", "Public Finance"];
  
  const filteredCreators = activeFilter === "All"
    ? CIVIC_CREATORS
    : CIVIC_CREATORS.filter(c => c.expertise.some(e => e.includes(activeFilter)));
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 py-6">
        <div className="flex items-center justify-center gap-3">
          <Sparkles className="w-10 h-10 text-kenya-gold animate-pulse" />
          <h1 className="text-5xl font-black tracking-tight">Civic Creators</h1>
          <Sparkles className="w-10 h-10 text-kenya-green animate-pulse" />
        </div>
        <p className="text-lg text-brand-text-muted max-w-3xl mx-auto">
          Verified youth creators making political discourse <span className="text-kenya-gold font-bold">accessible</span>, 
          {" "}<span className="text-kenya-green font-bold">engaging</span>, and 
          {" "}<span className="text-kenya-red font-bold">accurate</span>.
        </p>
      </div>
      
      {/* Why Civic Creators Matter */}
      <div className="bg-linear-to-r from-kenya-red/10 to-kenya-gold/10 border border-kenya-gold/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-kenya-gold/20 flex items-center justify-center shrink-0">
            <Info className="w-6 h-6 text-kenya-gold" />
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-lg font-bold text-brand-text">Why Civic Creators Matter</h3>
            <p className="text-sm text-brand-text-muted leading-relaxed">
              These verified creators bridge the gap between complex political processes and youth understanding. 
              They translate constitutional law, policy analysis, and parliamentary procedure into content that resonates 
              with Gen Z while maintaining accuracy and citing sources. Each creator is vetted for accuracy, 
              educational focus, and community trust.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-kenya-green" />
                <span className="text-xs text-brand-text">Fact-checked content</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-kenya-gold" />
                <span className="text-xs text-brand-text">Community verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-kenya-red" />
                <span className="text-xs text-brand-text">Educational focus</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* View Toggle */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex gap-2">
          <Button
            onClick={() => setShowCoHosted(false)}
            variant={!showCoHosted ? "primary" : "secondary"}
            size="sm"
            className="gap-2"
          >
            <Users className="w-4 h-4" />
            All Creators ({CIVIC_CREATORS.length})
          </Button>
          <Button
            onClick={() => setShowCoHosted(true)}
            variant={showCoHosted ? "primary" : "secondary"}
            size="sm"
            className="gap-2"
          >
            <Video className="w-4 h-4" />
            Co-Hosted Discussions ({COHOSTED_DISCUSSIONS.length})
          </Button>
        </div>
      </div>
      
      {!showCoHosted ? (
        <>
          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
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
          
          {/* Creators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
          
          {/* Empty State */}
          {filteredCreators.length === 0 && (
            <div className="text-center py-16 text-brand-text-muted">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No creators found in this category.</p>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Co-Hosted Discussions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-brand-text">Creator + Expert Collaborations</h2>
                <p className="text-sm text-brand-text-muted mt-1">
                  Deep-dive discussions pairing civic creators with policy experts, lawyers, and economists
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COHOSTED_DISCUSSIONS.map((discussion) => (
                <CoHostedCard key={discussion.id} discussion={discussion} />
              ))}
            </div>
          </div>
        </>
      )}
      
      {/* Call to Action */}
      <div className="bg-linear-to-r from-kenya-red to-kenya-gold rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-3">Want to Become a Civic Creator?</h3>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          If you&apos;re creating accurate, engaging civic education content for Kenyan youth, 
          apply for verification and join our community of trusted creators.
        </p>
        <button className="bg-white text-kenya-red font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
          Apply for Verification
        </button>
      </div>
    </div>
  );
}
