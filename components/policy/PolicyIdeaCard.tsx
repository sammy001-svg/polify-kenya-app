"use client";

import { PolicyIdea } from "@/lib/gamification";
import { GamificationService } from "@/lib/gamification-service";
import {
  ThumbsUp,
  MessageSquare,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Gavel,
  Sparkles,
  FileText,
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { PolicyComments } from "./PolicyComments";
import { AIDraftBill } from "./AIDraftBill";
import { AIAnalystSheet } from "./AIAnalystSheet";
import { Button } from "@/components/ui/button";

/* cSpell:ignore supabase */

interface PolicyIdeaCardProps {
  idea: PolicyIdea & {
    ai_analysis?: {
      feasibility: number;
      cost_index: number;
      impact_score: number;
      analyst_notes: string;
      ai_status: string;
    };
    ai_draft_bill?: {
      bill_number: string;
      title: string;
      preamble: string;
      sections: { title: string; content: string }[];
      legal_basis: string;
    };
    commentCount?: number;
  };
}

export function PolicyIdeaCard({ idea }: PolicyIdeaCardProps) {
  const [voted, setVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(idea.votes);
  const [showComments, setShowComments] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [isAnalystOpen, setIsAnalystOpen] = useState(false);
  const [draftedBill, setDraftedBill] = useState(idea.ai_draft_bill);
  const [currentUser, setCurrentUser] = useState<{ id: string } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);

      if (user) {
        const { data } = await supabase
          .from("policy_votes")
          .select("id")
          .eq("policy_id", idea.id)
          .eq("user_id", user.id)
          .single();
        if (data) setVoted(true);
      }
    };
    init();
  }, [idea.id, supabase]);

  const handleVote = async () => {
    if (!currentUser) {
      alert("Please sign in to vote.");
      return;
    }

    if (voted) {
      const { error } = await supabase
        .from("policy_votes")
        .delete()
        .eq("policy_id", idea.id)
        .eq("user_id", currentUser.id);

      if (!error) {
        setVoteCount((prev) => prev - 1);
        setVoted(false);
      }
    } else {
      const { error } = await supabase
        .from("policy_votes")
        .insert({ policy_id: idea.id, user_id: currentUser.id });

      if (!error) {
        setVoteCount((prev) => prev + 1);
        setVoted(true);
        // Award XP
        await GamificationService.awardXP(currentUser.id, 5, "Voted on Policy");
      }
    }
  };

  const handleAIDraft = async () => {
    setIsDrafting(true);
    // Simulate multi-stage AI legislative synthesis
    const stages = [
      "Analyzing Constitutional alignment...",
      "Synthesizing fiscal impact models...",
      "Formatting legislative text...",
      "Finalizing Act of Parliament draft...",
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      currentStage++;
      if (currentStage >= stages.length) clearInterval(interval);
    }, 800);

    setTimeout(async () => {
      const simulatedBill = {
        bill_number: `BUNGE-AI-2026-${Math.floor(Math.random() * 9000) + 1000}`,
        title: `The National ${idea.category} Development (Citizen Initiative) Bill, 2026`,
        preamble: `An Act of Parliament to give effect to the citizen proposal titled "${idea.title}", providing for sustainable development goals and community-led innovation framework in the ${idea.category} sector.`,
        sections: [
          {
            title: "Preliminary Provisions",
            content: `This Act may be cited as the ${idea.category} Development Act and shall come into operation on the date of publication in the Gazette after presidential assent.`,
          },
          {
            title: "Strategic Objectives",
            content: `To promote ${idea.description.toLowerCase().slice(0, 100)}... and ensure equitable distribution of resources in the ${idea.category} domain.`,
          },
          {
            title: "Financial Provisions",
            content: `The National Treasury shall, in consultation with the stakeholders, allocate resources for the implementation of this Act based on the feasibility score of ${idea.ai_analysis?.feasibility || 75}%.`,
          },
          {
            title: "Community Oversight",
            content: `Establishment of a neutral oversight committee consisting of verified citizens to manage implementation in direct alignment with the stated impact: "${idea.impactStatement}".`,
          },
        ],
        legal_basis:
          "Drafted in compliance with Article 118 of the Constitution regarding Public Participation and Article 35 on Access to Information.",
      };

      const { error } = await supabase
        .from("policy_ideas")
        .update({
          ai_draft_bill: simulatedBill,
          status: "under-review",
        })
        .eq("id", idea.id);

      if (!error) {
        setDraftedBill(simulatedBill);
        setShowBill(true);
      }
      setIsDrafting(false);
      clearInterval(interval);
    }, 4000);
  };

  const statusConfig = {
    submitted: { color: "bg-blue-500", label: "Submitted" },
    "under-review": { color: "bg-kenya-gold", label: "Under Review" },
    popular: { color: "bg-purple-500", label: "Popular" },
    presented: { color: "bg-orange-500", label: "Presented" },
    implemented: { color: "bg-green-500", label: "Implemented" },
  };

  const status =
    statusConfig[idea.status as keyof typeof statusConfig] ||
    statusConfig.submitted;

  return (
    <div className="bg-brand-surface-secondary border border-border rounded-xl p-6 space-y-4 hover:border-kenya-gold/50 transition-all group/card">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-brand-text leading-tight">
              {idea.title}
            </h3>
            {idea.status === "implemented" && (
              <CheckCircle2 className="w-5 h-5 text-kenya-green shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span
              className={`${status.color} text-white px-2 py-0.5 rounded-full text-xs font-bold`}
            >
              {status.label}
            </span>
            <span className="px-2 py-0.5 bg-brand-surface-highlight rounded text-xs font-medium text-brand-text-muted">
              {idea.category}
            </span>
          </div>
        </div>

        <button
          onClick={handleVote}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
            voted
              ? "bg-kenya-gold text-black"
              : "bg-brand-surface-highlight text-brand-text hover:bg-brand-surface-secondary"
          }`}
        >
          <ThumbsUp className={`w-5 h-5 ${voted ? "fill-black" : ""}`} />
          <span className="text-lg font-bold">{voteCount}</span>
        </button>
      </div>

      <p className="text-sm text-brand-text leading-relaxed line-clamp-3">
        {idea.description}
      </p>

      {idea.ai_analysis && idea.ai_analysis.ai_status === "complete" && (
        <div className="bg-brand-surface p-4 rounded-xl border border-brand-primary/20 space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover/card:opacity-30 transition-opacity">
            <Sparkles className="w-12 h-12 text-brand-primary" />
          </div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-primary flex items-center gap-2">
            <Sparkles className="w-3 h-3" /> Bunge AI Scorecard
          </h4>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-brand-text-muted uppercase">
                Feasibility
              </p>
              <p className="text-sm font-black text-brand-primary">
                {idea.ai_analysis.feasibility}%
              </p>
            </div>
            <div className="space-y-1 border-x border-border">
              <p className="text-[9px] font-bold text-brand-text-muted uppercase">
                Social Impact
              </p>
              <p className="text-sm font-black text-kenya-green">
                {idea.ai_analysis.impact_score}%
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-brand-text-muted uppercase">
                Fiscal Load
              </p>
              <p className="text-sm font-black text-kenya-red">
                {idea.ai_analysis.cost_index}/100
              </p>
            </div>
          </div>
        </div>
      )}

      {draftedBill && showBill && <AIDraftBill bill={draftedBill} />}

      <div className="flex flex-wrap gap-2">
        {voteCount >= 5 && !draftedBill && (
          <Button
            onClick={handleAIDraft}
            disabled={isDrafting}
            className="flex-1 bg-brand-primary text-white rounded-full font-black text-[10px] uppercase gap-2 animate-pulse hover:animate-none"
          >
            {isDrafting ? (
              "Drafting via Bunge AI..."
            ) : (
              <>
                <Gavel className="w-4 h-4" /> Move to AI Implementation
              </>
            )}
          </Button>
        )}
        {draftedBill && (
          <Button
            onClick={() => setShowBill(!showBill)}
            variant="outline"
            className="flex-1 border-brand-primary text-brand-primary rounded-full font-black text-[10px] uppercase gap-2 h-10"
          >
            <FileText className="w-4 h-4" />{" "}
            {showBill ? "Hide Draft Bill" : "View Generated Bill"}
          </Button>
        )}
        <Button
          onClick={() => setIsAnalystOpen(true)}
          variant="ghost"
          className="text-[10px] font-black uppercase text-brand-text-muted hover:text-brand-primary h-10"
        >
          Ask AI Analyst
        </Button>
      </div>

      <div className="bg-brand-surface-highlight rounded-lg p-3">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-1">
          Expected Impact
        </p>
        <p className="text-sm text-brand-text leading-relaxed">
          {idea.impactStatement}
        </p>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-2">
          Target Audience
        </p>
        <div className="flex flex-wrap gap-2">
          {(idea.targetAudience || []).map((audience, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-kenya-green/20 text-kenya-green text-xs font-medium rounded"
            >
              {audience}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-kenya-red to-kenya-gold flex items-center justify-center text-xs font-bold text-white uppercase">
              {idea.author.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-text">
                {idea.author.name}
              </p>
              <p className="text-xs text-brand-text-muted">Verified Citizen</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-brand-text-muted font-bold">
            <button
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center gap-1 transition-all ${showComments ? "text-brand-primary" : "hover:text-brand-primary"}`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>{idea.commentCount || 0}</span>
              {showComments ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{new Date(idea.submittedDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {showComments && <PolicyComments policyId={idea.id} />}
      </div>

      <AIAnalystSheet
        isOpen={isAnalystOpen}
        onClose={() => setIsAnalystOpen(false)}
        ideaTitle={idea.title}
        category={idea.category}
        analysis={idea.ai_analysis}
      />
    </div>
  );
}
