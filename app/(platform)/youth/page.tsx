"use client";

import { useState } from "react";
import { CivicQuiz } from "@/components/youth/CivicQuiz";
import { PolicySimulator } from "@/components/youth/PolicySimulator";
import { IssueHubsMain } from "@/components/youth/IssueHubsMain";
import { Brain, Gamepad2, GraduationCap, MessageSquare } from "lucide-react";

export default function YouthPage() {
  const [activeTab, setActiveTab] = useState<'quiz' | 'sim' | 'mentor' | 'hubs'>('quiz');

  return (
    <div className="p-4 space-y-6">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Youth & Future Leaders</h1>
        <p className="text-lg text-brand-text-muted">
          Master civics through gamified challenges, lead a virtual county, and learn from Kenya&apos;s best.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center border-b border-border max-w-3xl mx-auto">
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-6 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'quiz' 
              ? 'border-kenya-red text-brand-text' 
              : 'border-transparent text-brand-text-muted hover:text-brand-text'
          }`}
        >
          <Brain className="w-5 h-5" />
          Civic Challenge
        </button>
        <button
          onClick={() => setActiveTab('sim')}
          className={`flex items-center gap-2 px-6 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'sim' 
              ? 'border-kenya-gold text-brand-text' 
              : 'border-transparent text-brand-text-muted hover:text-brand-text'
          }`}
        >
          <Gamepad2 className="w-5 h-5" />
          Leadership Sim
        </button>
        <button
          onClick={() => setActiveTab('mentor')}
          className={`flex items-center gap-2 px-6 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'mentor' 
              ? 'border-blue-500 text-brand-text' 
              : 'border-transparent text-brand-text-muted hover:text-brand-text'
          }`}
        >
          <GraduationCap className="w-5 h-5" />
          Mentorship
        </button>
        <button
          onClick={() => setActiveTab('hubs')}
          className={`flex items-center gap-2 px-6 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'hubs' 
              ? 'border-kenya-green text-brand-text' 
              : 'border-transparent text-brand-text-muted hover:text-brand-text'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          Issue Hubs
        </button>
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {activeTab === 'quiz' && <CivicQuiz />}
        {activeTab === 'sim' && <PolicySimulator />}
        {activeTab === 'hubs' && <IssueHubsMain />}
        {activeTab === 'mentor' && (
          <div className="max-w-2xl mx-auto text-center p-12 bg-brand-surface-secondary rounded-2xl border border-border">
            <GraduationCap className="w-16 h-16 text-brand-text-muted mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Mentorship Library</h3>
            <p className="text-brand-text-muted">
              Learn from Kenya&apos;s top public servants and technocrats.
              <br />
              <span className="text-sm italic">(Content coming soon)</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
