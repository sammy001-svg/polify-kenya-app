import { PolicyIdea } from "@/lib/gamification";
import { ThumbsUp, MessageSquare, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

interface PolicyIdeaCardProps {
  idea: PolicyIdea & { 
    ai_analysis?: {
      feasibility: number;
      cost_index: number;
      impact_score: number;
      analyst_notes: string;
      ai_status: string;
    } 
  };
}

export function PolicyIdeaCard({ idea }: PolicyIdeaCardProps) {
  const [voted, setVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(idea.votes);
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();
  
  useEffect(() => {
    const checkVote = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data } = await supabase
          .from('policy_votes')
          .select('id')
          .eq('policy_id', idea.id)
          .eq('user_id', user.id)
          .single();
        if (data) setVoted(true);
      }
    };
    checkVote();
  }, [idea.id, supabase]);

  const handleVote = async () => {
    if (!userId) {
      alert("Please sign in to vote.");
      return;
    }

    if (voted) {
      const { error } = await supabase
        .from('policy_votes')
        .delete()
        .eq('policy_id', idea.id)
        .eq('user_id', userId);
      
      if (!error) {
        setVoteCount(prev => prev - 1);
        setVoted(false);
      }
    } else {
      const { error } = await supabase
        .from('policy_votes')
        .insert({ policy_id: idea.id, user_id: userId });
      
      if (!error) {
        setVoteCount(prev => prev + 1);
        setVoted(true);
      }
    }
  };
  
  const statusConfig = {
    submitted: { color: 'bg-blue-500', label: 'Submitted' },
    'under-review': { color: 'bg-kenya-gold', label: 'Under Review' },
    popular: { color: 'bg-purple-500', label: 'Popular' },
    presented: { color: 'bg-orange-500', label: 'Presented' },
    implemented: { color: 'bg-green-500', label: 'Implemented' },
  };
  
  const status = statusConfig[idea.status as keyof typeof statusConfig] || statusConfig.submitted;
  
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
      
      {/* AI Analysis View (if exists) */}
      {idea.ai_analysis && idea.ai_analysis.ai_status === 'complete' && (
        <div className="bg-brand-surface p-4 rounded-xl border border-brand-primary/20 space-y-3 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
              <Sparkles className="w-12 h-12 text-brand-primary" />
           </div>
           <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-primary flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Bunge AI Scorecard
           </h4>
           <div className="grid grid-cols-3 gap-3 text-center">
              <div className="space-y-1">
                 <p className="text-[9px] font-bold text-brand-text-muted uppercase">Feasibility</p>
                 <p className="text-sm font-black text-brand-primary">{idea.ai_analysis.feasibility}%</p>
              </div>
              <div className="space-y-1 border-x border-border">
                 <p className="text-[9px] font-bold text-brand-text-muted uppercase">Social Impact</p>
                 <p className="text-sm font-black text-kenya-green">{idea.ai_analysis.impact_score}%</p>
              </div>
              <div className="space-y-1">
                 <p className="text-[9px] font-bold text-brand-text-muted uppercase">Fiscal Load</p>
                 <p className="text-sm font-black text-kenya-red">{idea.ai_analysis.cost_index}/100</p>
              </div>
           </div>
        </div>
      )}
      
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
      
      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        {/* Author */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-kenya-red to-kenya-gold flex items-center justify-center text-xs font-bold text-white uppercase">
            {idea.author.name.split(' ').map((n: string) => n[0]).join('')}
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

