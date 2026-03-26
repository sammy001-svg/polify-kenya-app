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
  ShieldCheck,
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { PolicyComments } from "./PolicyComments";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface PolicyIdeaCardProps {
  idea: PolicyIdea;
}

export function PolicyIdeaCard({ idea }: PolicyIdeaCardProps) {
  const [voted, setVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(idea.votes);
  const [showComments, setShowComments] = useState(false);

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
        await GamificationService.awardXP(currentUser.id, 5, "Voted on Policy");
      }
    }
  };



  const statusConfig = {
    submitted: { color: "bg-blue-500", label: "Submitted" },
    "under-review": { color: "bg-kenya-gold", label: "Under Review" },
    popular: { color: "bg-purple-500", label: "Popular" },
    presented: { color: "bg-orange-500", label: "Presented" },
    implemented: { color: "bg-kenya-green", label: "Implemented" },
  };

  const status = statusConfig[idea.status as keyof typeof statusConfig] || statusConfig.submitted;



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





      <div className="flex flex-col sm:flex-row gap-4">

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


    </motion.div>
  );
}
