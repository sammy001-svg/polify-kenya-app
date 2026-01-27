/* cSpell:ignore PoliFy maandamano Bunge Mashinani townhall Supabase supabase */
"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { BarChart3, Lock } from "lucide-react";

interface PollOption {
  id: string;
  option_label: string;
  votes_count: number;
}

interface Poll {
  id: string;
  question: string;
  status: 'open' | 'closed';
  live_poll_options: PollOption[];
}

interface LivePollsProps {
  townhallId: string;
}

export function LivePolls({ townhallId }: LivePollsProps) {
  const [activePoll, setActivePoll] = useState<Poll | null>(null);
  const [votedOptionId, setVotedOptionId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchPoll = useCallback(async (currentUserId?: string) => {
    const { data: pollData, error } = await supabase
      .from('live_polls')
      .select(`
        id,
        question,
        status,
        live_poll_options (id, option_label, votes_count)
      `)
      .eq('townhall_id', townhallId)
      .eq('status', 'open')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (pollData && !error) {
      setActivePoll(pollData as Poll);
      
      if (currentUserId) {
        const { data: vote } = await supabase
          .from('live_poll_votes')
          .select('option_id')
          .eq('poll_id', pollData.id)
          .eq('user_id', currentUserId)
          .single();
        
        if (vote) setVotedOptionId(vote.option_id);
      }
    }
    setLoading(false);
  }, [supabase, townhallId]);

  useEffect(() => {
    const init = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
          setUserId(authUser.id);
          fetchPoll(authUser.id);
      } else {
          fetchPoll();
      }
    };
    init();
  }, [supabase, fetchPoll]);

  useEffect(() => {
    // Subscribe to poll updates
    const channel = supabase
      .channel(`townhall_polls:${townhallId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'live_polls', filter: `townhall_id=eq.${townhallId}` },
        () => { fetchPoll(userId || undefined); }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'live_poll_options' },
        () => { fetchPoll(userId || undefined); }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [townhallId, supabase, userId, fetchPoll]);

  const handleVote = async (optionId: string) => {
    if (!userId) return alert("Please log in to vote");
    if (!activePoll || votedOptionId) return;

    const { error } = await supabase
      .from('live_poll_votes')
      .insert({
        poll_id: activePoll.id,
        user_id: userId,
        option_id: optionId
      });

    if (!error) {
      setVotedOptionId(optionId);
      await supabase.rpc('increment_poll_vote', { option_id_param: optionId });
      fetchPoll(userId);
    }
  };

  if (loading) return <div className="p-8 text-center text-xs animate-pulse">Loading polls...</div>;
  if (!activePoll) return (
    <div className="p-8 text-center flex flex-col items-center gap-2 text-brand-text-muted">
       <BarChart3 className="w-8 h-8 opacity-20" />
       <p className="text-sm italic">No active polls at the moment.</p>
    </div>
  );

  const totalVotes = activePoll.live_poll_options.reduce((acc: number, opt: PollOption) => acc + (opt.votes_count || 0), 0);

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-kenya-gold">
          <BarChart3 className="w-4 h-4" />
          <h3 className="text-xs font-bold uppercase tracking-widest">Live Poll</h3>
        </div>
        {activePoll.status === 'closed' && (
           <div className="flex items-center gap-1 text-[10px] font-bold text-brand-text-muted uppercase">
              <Lock className="w-3 h-3" /> Closed
           </div>
        )}
      </div>

      <div className="space-y-4">
        <p className="font-bold text-xl leading-tight tracking-tight text-white">{activePoll.question}</p>
        
        <div className="space-y-3">
          {activePoll.live_poll_options.map((option) => {
            const votes = option.votes_count || 0;
            const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
            const isVoted = votedOptionId === option.id;
            
            return (
              <button
                key={option.id}
                onClick={() => handleVote(option.id)}
                disabled={votedOptionId !== null || activePoll.status === 'closed'}
                className={`relative w-full text-left p-4 rounded-xl border transition-all overflow-hidden group
                  ${isVoted 
                    ? "border-kenya-gold bg-kenya-gold/10" 
                    : votedOptionId !== null
                    ? "border-white/5 bg-brand-surface opacity-80"
                    : "border-white/10 hover:border-white/30 bg-brand-surface"
                  }`}
              >
                {/* Progress Background */}
                {votedOptionId !== null && (
                  <div 
                    className={`absolute inset-y-0 left-0 transition-all duration-1000 ${isVoted ? 'bg-kenya-gold/20' : 'bg-white/5'}`}
                    style={{ width: `${percentage}%` }}
                  />
                )}
                
                <div className="relative flex justify-between items-center z-10">
                   <div className="flex items-center gap-3">
                      <span className={`font-bold text-sm ${isVoted ? 'text-kenya-gold' : 'text-white/90'}`}>
                        {option.option_label}
                      </span>
                   </div>
                   {votedOptionId !== null && (
                      <span className="text-xs font-black tabular-nums">{percentage}%</span>
                   )}
                </div>
              </button>
            );
          })}
        </div>
        
        <p className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest text-center pt-4">
          {totalVotes.toLocaleString()} total votes cast
        </p>
      </div>
    </div>
  );
}
