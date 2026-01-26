"use client";

import { PolicyIdea } from "@/lib/gamification";
import { ThumbsUp, MessageSquare, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";


interface PolicyIdeaCardProps {
  idea: PolicyIdea;
}

export function PolicyIdeaCard({ idea }: PolicyIdeaCardProps) {
  const [voted, setVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(idea.votes);
  
  const handleVote = () => {
    if (voted) {
      setVoteCount(voteCount - 1);
    } else {
      setVoteCount(voteCount + 1);
    }
    setVoted(!voted);
  };
  
  const statusConfig = {
    submitted: { color: 'bg-blue-500', label: 'Submitted' },
    'under-review': { color: 'bg-kenya-gold', label: 'Under Review' },
    popular: { color: 'bg-purple-500', label: 'Popular' },
    presented: { color: 'bg-orange-500', label: 'Presented' },
    implemented: { color: 'bg-green-500', label: 'Implemented' },
  };
  
  const status = statusConfig[idea.status];
  
  return (
    <div className="bg-brand-surface-secondary border border-border rounded-xl p-6 space-y-4 hover:border-kenya-gold/50 transition-all">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-brand-text leading-tight">{idea.title}</h3>
            {idea.status === 'implemented' && (
              <CheckCircle2 className="w-5 h-5 text-kenya-green shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className={`${status.color} text-white px-2 py-0.5 rounded-full text-xs font-bold`}>
              {status.label}
            </span>
            <span className="px-2 py-0.5 bg-brand-surface-highlight rounded text-xs font-medium text-brand-text-muted">
              {idea.category}
            </span>
          </div>
        </div>
        
        {/* Vote Button */}
        <button
          onClick={handleVote}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
            voted
              ? 'bg-kenya-gold text-black'
              : 'bg-brand-surface-highlight text-brand-text hover:bg-brand-surface-secondary'
          }`}
        >
          <ThumbsUp className={`w-5 h-5 ${voted ? 'fill-black' : ''}`} />
          <span className="text-lg font-bold">{voteCount}</span>
        </button>
      </div>
      
      {/* Description */}
      <p className="text-sm text-brand-text leading-relaxed line-clamp-3">
        {idea.description}
      </p>
      
      {/* Impact Statement */}
      <div className="bg-brand-surface-highlight rounded-lg p-3">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-1">
          Expected Impact
        </p>
        <p className="text-sm text-brand-text leading-relaxed">{idea.impactStatement}</p>
      </div>
      
      {/* Target Audience */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-2">
          Target Audience
        </p>
        <div className="flex flex-wrap gap-2">
          {idea.targetAudience.map((audience, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-kenya-green/20 text-kenya-green text-xs font-medium rounded"
            >
              {audience}
            </span>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        {/* Author */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-kenya-red to-kenya-gold flex items-center justify-center text-xs font-bold text-white">
            {idea.author.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-text">{idea.author.name}</p>
            <p className="text-xs text-brand-text-muted">Level {idea.author.level}</p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-brand-text-muted">
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>{idea.commentCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{new Date(idea.submittedDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
