"use client";

import { YOUTH_ISSUES } from "@/lib/youth-issues";
import { MessageSquare, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export function IssueHubsMain() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-brand-text">Youth Issue Hubs</h2>
        <p className="text-lg text-brand-text-muted max-w-3xl mx-auto">
          Dedicated channels for the issues that matter most to young Kenyans. 
          Join the conversation and hold politicians accountable with structured responses.
        </p>
      </div>

      {/* Issue Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {YOUTH_ISSUES.map((issue) => {
          const Icon = issue.icon;
          
          return (
            <Link
              key={issue.id}
              href={`/youth/issues/${issue.id}`}
              className="group bg-brand-surface-secondary border border-border rounded-xl p-6 hover:border-brand-text-muted/50 transition-all hover:shadow-xl hover:scale-[1.02]"
            >
              {/* Icon Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${issue.color} bg-opacity-10 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${issue.color.replace('bg-', 'text-')}`} />
                </div>
                <ArrowRight className="w-5 h-5 text-brand-text-muted group-hover:text-brand-text group-hover:translate-x-1 transition-all" />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-brand-text mb-2 group-hover:text-white transition-colors">
                {issue.title}
              </h3>
              <p className="text-sm text-brand-text-muted leading-relaxed mb-4">
                {issue.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-brand-text-muted" />
                  <span className="text-brand-text font-medium">
                    {issue.activeDiscussions.toLocaleString()}
                  </span>
                  <span className="text-brand-text-muted">discussions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-brand-text-muted" />
                  <span className="text-brand-text font-medium">
                    {issue.politicianResponses}
                  </span>
                  <span className="text-brand-text-muted">responses</span>
                </div>
              </div>

              {/* Key Stat Highlight */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-brand-text-muted uppercase tracking-wider">
                    {issue.keyStats[0].label}
                  </span>
                  <span className={`text-lg font-bold ${issue.color.replace('bg-', 'text-')}`}>
                    {issue.keyStats[0].value}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Info Banner */}
      <div className="bg-linear-to-r from-kenya-red/10 to-kenya-gold/10 border border-kenya-gold/20 rounded-xl p-6 text-center">
        <h3 className="text-lg font-bold text-brand-text mb-2">
          Politicians: Respond to Youth Concerns
        </h3>
        <p className="text-sm text-brand-text-muted max-w-2xl mx-auto">
          All politician responses must follow a structured format including your position, 
          proposed actions, timeline, resources, and success metrics. This ensures accountability 
          and allows youth to track progress on commitments.
        </p>
      </div>
    </div>
  );
}
