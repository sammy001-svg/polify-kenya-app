"use client";

import { PolicyIdea, ANALYST_PERSONAS } from "@/lib/gamification";
import { GamificationService } from "@/lib/gamification-service";
import { NATIONAL_PROJECTS } from "@/lib/national-projects";
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
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { PolicyComments } from "./PolicyComments";
import { AIDraftBill } from "./AIDraftBill";
import { AIAnalystSheet } from "./AIAnalystSheet";
import { AnalystAvatars } from "./AnalystAvatars";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface PolicyIdeaCardProps {
  idea: PolicyIdea;
}

export function PolicyIdeaCard({ idea }: PolicyIdeaCardProps) {
  const [voted, setVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(idea.votes);
  const [showComments, setShowComments] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [isAnalystOpen, setIsAnalystOpen] = useState(false);
  const [draftedBill, setDraftedBill] = useState(idea.ai_draft_bill);
  const [currentPersonaIndex, setCurrentPersonaIndex] = useState(0);
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

  // Rotates critiques every 5 seconds if multiple exist
  useEffect(() => {
    if (idea.ai_analysis?.persona_critiques) {
      const personas = Object.keys(idea.ai_analysis.persona_critiques);
      if (personas.length > 1) {
        const interval = setInterval(() => {
          setCurrentPersonaIndex((prev) => (prev + 1) % personas.length);
        }, 5000);
        return () => clearInterval(interval);
      }
    }
  }, [idea.ai_analysis]);

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
        await GamificationService.awardXP(currentUser.id, 5, "Voted on Policy");
      }
    }
  };

  const handleAIDraft = async () => {
    setIsDrafting(true);
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
    implemented: { color: "bg-kenya-green", label: "Implemented" },
  };

  const status = statusConfig[idea.status as keyof typeof statusConfig] || statusConfig.submitted;

  const currentPersonaId = idea.ai_analysis?.persona_critiques 
    ? Object.keys(idea.ai_analysis.persona_critiques)[currentPersonaIndex]
    : null;
  const currentPersona = ANALYST_PERSONAS.find(p => p.id === currentPersonaId);
  const currentCritique = currentPersonaId ? idea.ai_analysis?.persona_critiques[currentPersonaId] : null;

  const alignedProjects = (idea.ai_analysis?.project_alignment || []).map(id => 
    NATIONAL_PROJECTS.find(p => p.id === id)
  ).filter(Boolean);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/2 border border-white/5 rounded-[2.5rem] p-8 space-y-6 hover:bg-white/5 transition-all duration-500 backdrop-blur-xl group/card relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-kenya-gold/5 blur-[100px] pointer-events-none group-hover/card:bg-kenya-gold/10 transition-colors" />

      <div className="flex items-start justify-between gap-6 relative z-10">
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className={cn("text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full text-white", status.color)}>
              {status.label}
            </span>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/5 text-brand-text-muted border border-white/5">
              {idea.category}
            </span>
            {idea.status === "implemented" && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-kenya-green/10 rounded-full border border-kenya-green/20">
                <CheckCircle2 className="w-3 h-3 text-kenya-green" />
                <span className="text-[9px] font-black uppercase tracking-widest text-kenya-green">ACT OF PARLIAMENT</span>
              </div>
            )}
          </div>
          <h3 className="text-3xl font-black text-white leading-[1.1] tracking-tight group-hover/card:text-kenya-gold transition-colors">
            {idea.title}
          </h3>
        </div>

        <button
          onClick={handleVote}
          className={cn(
            "flex flex-col items-center gap-1 px-6 py-4 rounded-4xl transition-all duration-500 shrink-0",
            voted 
              ? "bg-kenya-gold text-black shadow-[0_0_30px_rgba(253,185,49,0.3)]" 
              : "bg-white/5 text-white hover:bg-white/10 border border-white/5"
          )}
        >
          <ThumbsUp className={cn("w-6 h-6", voted ? "fill-black" : "")} />
          <span className="text-xl font-black">{voteCount}</span>
        </button>
      </div>

      <p className="text-lg text-brand-text-muted font-medium leading-relaxed max-w-4xl">
        {idea.description}
      </p>

      {/* AI Analyst War Room Section */}
      {idea.ai_analysis && (
        <div className="bg-white/2 border border-white/5 rounded-4xl p-6 space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <AnalystAvatars activePersonaId={currentPersonaId || undefined} isAnalyzing={isDrafting} />
              <div className="h-4 w-px bg-white/10 mx-2" />
              <div className="space-y-0.5">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-primary flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> Intelligence Synthesis
                </h4>
                <p className="text-[9px] font-bold text-brand-text-muted uppercase">Multi-Persona Peer Review</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              {[
                { label: 'Feasibility', val: idea.ai_analysis.feasibility, color: 'text-kenya-gold' },
                { label: 'Impact', val: idea.ai_analysis.impact_score, color: 'text-kenya-green' },
                { label: 'Fiscal Cost', val: idea.ai_analysis.cost_index, color: 'text-kenya-red' },
              ].map(stat => (
                <div key={stat.label} className="text-right">
                  <div className={cn("text-lg font-black", stat.color)}>{stat.val}%</div>
                  <div className="text-[8px] font-black text-brand-text-muted uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPersonaId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex gap-4 items-start bg-white/5 p-6 rounded-2xl border border-white/5"
            >
              <div className="text-3xl">{currentPersona?.avatar}</div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className={cn("text-[10px] font-black uppercase tracking-widest", currentPersona?.color)}>
                      {currentPersona?.name}
                    </span>
                    <span className="text-[9px] font-bold text-brand-text-muted uppercase ml-2">— {currentPersona?.role}</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-white/90 leading-relaxed italic">
                  &quot;{currentCritique}&quot;
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {alignedProjects.length > 0 && (
             <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="text-[10px] font-black text-brand-text-muted uppercase tracking-widest">Supports National Projects:</span>
                {alignedProjects.map(p => p && (
                  <div key={p.id} className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/5 hover:border-brand-primary/30 transition-colors">
                    <Zap className="w-3 h-3 text-brand-primary" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-white">{p.title}</span>
                  </div>
                ))}
             </div>
          )}
        </div>
      )}

      {draftedBill && showBill && <AIDraftBill bill={draftedBill} />}

      <div className="flex flex-col sm:flex-row gap-4">
        {voteCount >= 5 && !draftedBill && (
          <Button
            onClick={handleAIDraft}
            disabled={isDrafting}
            className="flex-1 bg-brand-primary text-white rounded-3xl font-black text-[10px] uppercase gap-3 h-14 group/btn relative overflow-hidden shadow-xl shadow-brand-primary/20"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
            {isDrafting ? (
              <span className="animate-pulse">Synthesizing Legislative Text...</span>
            ) : (
              <>
                <Gavel className="w-5 h-5" /> Move to AI Implementation
              </>
            )}
          </Button>
        )}
        
        {draftedBill && (
          <Button
            onClick={() => setShowBill(!showBill)}
            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-3xl font-black text-[10px] uppercase gap-3 h-14"
          >
            <FileText className="w-5 h-5 text-brand-primary" />{" "}
            {showBill ? "Minimize Draft Bill" : "View Generated Bill"}
          </Button>
        )}

        <Button
          onClick={() => setIsAnalystOpen(true)}
          variant="outline"
          className="rounded-3xl border-white/10 text-brand-text-muted hover:text-white font-black text-[10px] uppercase h-14 px-8 gap-2"
        >
          <TrendingUp className="w-4 h-4" /> Comprehensive Audit
        </Button>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-kenya-red to-kenya-gold p-px">
              <div className="w-full h-full rounded-[0.9rem] bg-black flex items-center justify-center font-black text-white">
                {idea.author.name.split(" ").map(n => n[0]).join("")}
              </div>
           </div>
           <div>
              <p className="text-sm font-black text-white">{idea.author.name}</p>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3 h-3 text-kenya-gold" />
                <span className="text-[10px] font-black text-brand-text-muted uppercase tracking-widest">Verified Citizen Expert</span>
              </div>
           </div>
        </div>

        <div className="flex items-center gap-6">
           <button
            onClick={() => setShowComments(!showComments)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest",
              showComments ? "bg-white/10 text-white" : "text-brand-text-muted hover:text-white"
            )}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{idea.commentCount || 0} Comments</span>
            {showComments ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          <div className="flex items-center gap-2 text-[10px] font-black text-brand-text-muted uppercase tracking-widest">
            <Clock className="w-4 h-4" />
            <span>{new Date(idea.submittedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-6">
              <PolicyComments policyId={idea.id} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AIAnalystSheet
        isOpen={isAnalystOpen}
        onClose={() => setIsAnalystOpen(false)}
        ideaTitle={idea.title}
        category={idea.category}
        analysis={idea.ai_analysis}
      />
    </motion.div>
  );
}
