"use client";

import { useState } from "react";
import { DEMO_POLLS } from "@/lib/demo-data";
// import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

export function LivePolls() {
  const [activePoll] = useState(DEMO_POLLS[0]);
  const [votedOption, setVotedOption] = useState<number | null>(null);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 text-kenya-gold mb-2">
        <BarChart3 className="w-4 h-4" />
        <h3 className="text-sm font-bold uppercase tracking-wider">Live Poll</h3>
      </div>

      <div className="space-y-3">
        <p className="font-semibold text-lg leading-tight">{activePoll.question}</p>
        
        <div className="space-y-2">
          {activePoll.options.map((option, index) => {
            const percentage = Math.round((option.votes / activePoll.totalVotes) * 100);
            
            return (
              <button
                key={index}
                onClick={() => setVotedOption(index)}
                disabled={votedOption !== null}
                className={`relative w-full text-left p-3 rounded-lg border transition-all overflow-hidden group
                  ${votedOption === index 
                    ? "border-kenya-gold bg-kenya-gold/10" 
                    : "border-border hover:border-gray-500 bg-brand-surface"
                  }`}
              >
                {/* Progress Background */}
                {votedOption !== null && (
                  <div 
                    className="absolute inset-y-0 left-0 bg-brand-highlight/50 transition-all duration-1000"
                    style={{ width: `${percentage}%` }}
                  />
                )}
                
                <div className="relative flex justify-between items-center z-10">
                   <span className="font-medium text-sm">{option.label}</span>
                   {votedOption !== null && (
                      <span className="text-xs font-bold">{percentage}%</span>
                   )}
                </div>
              </button>
            );
          })}
        </div>
        
        <p className="text-xs text-brand-text-muted text-center pt-2">
          {activePoll.totalVotes.toLocaleString()} votes • Poll closes in 5m
        </p>
      </div>
    </div>
  );
}
