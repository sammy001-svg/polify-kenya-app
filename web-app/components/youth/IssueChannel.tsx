"use client";

import { YOUTH_ISSUES, MOCK_RESPONSES } from "@/lib/youth-issues";
import { PoliticianResponseCard } from "./PoliticianResponseCard";
import { ArrowLeft, TrendingUp, Users, MessageSquare, Filter } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface IssueChannelProps {
  issueId: string;
}

export function IssueChannel({ issueId }: IssueChannelProps) {
  const issue = YOUTH_ISSUES.find(i => i.id === issueId);
  const responses = MOCK_RESPONSES[issueId] || [];
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "rating">("recent");

  if (!issue) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-brand-text">Issue not found</h2>
        <Link href="/youth" className="text-blue-400 hover:underline mt-4 inline-block">
          ← Back to Youth Page
        </Link>
      </div>
    );
  }

  const Icon = issue.icon;

  // Sort responses
  const sortedResponses = [...responses].sort((a, b) => {
    if (sortBy === "recent") {
      return b.timestamp.getTime() - a.timestamp.getTime();
    } else if (sortBy === "popular") {
      return b.likes - a.likes;
    } else {
      return b.rating - a.rating;
    }
  });

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link 
        href="/youth"
        className="inline-flex items-center gap-2 text-brand-text-muted hover:text-brand-text transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Youth & Future Leaders
      </Link>

      {/* Issue Header */}
      <div className="bg-linear-to-br from-brand-surface-secondary to-brand-surface-highlight rounded-2xl p-8 border border-border">
        <div className="flex items-start gap-6">
          <div className={`w-16 h-16 rounded-2xl ${issue.color} bg-opacity-10 flex items-center justify-center shrink-0`}>
            <Icon className={`w-8 h-8 ${issue.color.replace('bg-', 'text-')}`} />
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-brand-text mb-2">{issue.title}</h1>
              <p className="text-lg text-brand-text-muted">{issue.description}</p>
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {issue.keyStats.map((stat, index) => (
                <div key={index} className="bg-brand-surface-secondary/50 rounded-lg p-4 border border-border/50">
                  <p className="text-xs text-brand-text-muted uppercase tracking-wider mb-1">
                    {stat.label}
                  </p>
                  <p className={`text-2xl font-bold ${issue.color.replace('bg-', 'text-')}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Activity Stats */}
            <div className="flex items-center gap-6 text-sm pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-brand-text-muted" />
                <span className="text-brand-text font-medium">
                  {issue.activeDiscussions.toLocaleString()}
                </span>
                <span className="text-brand-text-muted">active discussions</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-text-muted" />
                <span className="text-brand-text font-medium">
                  {issue.politicianResponses}
                </span>
                <span className="text-brand-text-muted">politician responses</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between bg-brand-surface-secondary rounded-lg p-4 border border-border">
        <h2 className="text-xl font-bold text-brand-text flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-kenya-gold" />
          Politician Responses
        </h2>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-text-muted" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "recent" | "popular" | "rating")}
            className="bg-brand-surface-highlight text-brand-text border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kenya-gold"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Responses List */}
      <div className="space-y-6">
        {sortedResponses.length > 0 ? (
          sortedResponses.map((response) => (
            <PoliticianResponseCard key={response.id} response={response} />
          ))
        ) : (
          <div className="bg-brand-surface-secondary rounded-xl p-12 text-center border border-border">
            <Users className="w-16 h-16 text-brand-text-muted mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-brand-text mb-2">
              No Politician Responses Yet
            </h3>
            <p className="text-brand-text-muted max-w-md mx-auto">
              Be the first to demand accountability on this issue. Politicians will be notified 
              to provide structured responses with clear commitments and timelines.
            </p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-linear-to-r from-kenya-red to-kenya-gold rounded-xl p-6 text-center">
        <h3 className="text-xl font-bold text-white mb-2">
          Demand a Response
        </h3>
        <p className="text-white/90 mb-4 max-w-2xl mx-auto">
          Your voice matters. Submit questions and concerns to require politicians to respond 
          with specific commitments, timelines, and measurable outcomes.
        </p>
        <button className="bg-white text-kenya-red font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
          Submit Your Question
        </button>
      </div>
    </div>
  );
}
