"use client";

import { PoliticianResponse } from "@/lib/youth-issues";
import { BadgeCheck, ThumbsUp, Star, Calendar, TrendingUp } from "lucide-react";
import { useState } from "react";

interface PoliticianResponseCardProps {
  response: PoliticianResponse;
}

export function PoliticianResponseCard({ response }: PoliticianResponseCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(response.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  return (
    <div className="bg-brand-surface-secondary border border-border rounded-xl p-6 space-y-4 hover:border-brand-text-muted/30 transition-colors">
      {/* Politician Header */}
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-kenya-red to-kenya-gold flex items-center justify-center text-white font-bold text-lg">
            {response.politicianName.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-brand-text">{response.politicianName}</h4>
              {response.isVerified && (
                <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500/10" />
              )}
            </div>
            <p className="text-sm text-brand-text-muted">{response.position}</p>
            <p className="text-xs text-brand-text-muted">{response.party}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="w-4 h-4 text-brand-text-muted" />
          <span className="text-brand-text-muted">{formatTimestamp(response.timestamp)}</span>
        </div>
      </div>

      {/* Response Content */}
      <div className="space-y-4 pl-16">
        {/* Position */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-2">
            Position
          </h5>
          <p className="text-brand-text leading-relaxed">{response.response.position}</p>
        </div>

        {/* Proposed Actions */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Proposed Actions
          </h5>
          <ul className="space-y-2">
            {response.response.proposedActions.map((action, index) => (
              <li key={index} className="flex gap-2 text-brand-text">
                <span className="text-kenya-gold font-bold shrink-0">{index + 1}.</span>
                <span className="leading-relaxed">{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-2">
              Timeline
            </h5>
            <p className="text-sm text-brand-text bg-brand-surface-highlight p-3 rounded-lg">
              {response.response.timeline}
            </p>
          </div>

          {/* Resources */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-2">
              Resources Committed
            </h5>
            <p className="text-sm text-brand-text bg-brand-surface-highlight p-3 rounded-lg font-semibold">
              {response.response.resources}
            </p>
          </div>
        </div>

        {/* Success Metrics */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-2">
            Success Metrics
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {response.response.successMetrics.map((metric, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-kenya-green mt-2 shrink-0" />
                <span className="text-sm text-brand-text leading-relaxed">{metric}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border pl-16">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              liked
                ? "bg-kenya-red text-white"
                : "bg-brand-surface-highlight text-brand-text hover:bg-brand-surface-secondary"
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${liked ? "fill-white" : ""}`} />
            <span className="font-medium">{likeCount.toLocaleString()}</span>
          </button>

          <div className="flex items-center gap-2 px-4 py-2 bg-brand-surface-highlight rounded-lg">
            <Star className="w-4 h-4 text-kenya-gold fill-kenya-gold" />
            <span className="font-bold text-brand-text">{response.rating.toFixed(1)}</span>
            <span className="text-sm text-brand-text-muted">
              ({response.ratingCount.toLocaleString()} ratings)
            </span>
          </div>
        </div>

        <button className="text-sm text-blue-400 hover:underline">
          View Response History →
        </button>
      </div>
    </div>
  );
}
