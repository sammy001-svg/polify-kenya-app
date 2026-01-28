/* cSpell:ignore PoliFy maandamano Bunge Mashinani townhall Supabase supabase upvotes */
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import { HelpCircle, ThumbsUp, Plus } from 'lucide-react';

interface QAMessage {
  id: string;
  user_id: string;
  question: string;
  upvotes: number;
  is_answered: boolean;
  created_at: string;
  profiles: {
    full_name: string;
  } | null;
  has_upvoted?: boolean;
}

interface SupabaseQAItem {
  id: string;
  user_id: string;
  question: string;
  upvotes: number;
  is_answered: boolean;
  created_at: string;
  profiles: { full_name: string } | { full_name: string }[] | null;
}

interface LiveQAProps {
  townhallId: string;
}

export function LiveQA({ townhallId }: LiveQAProps) {
  const [questions, setQuestions] = useState<QAMessage[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'top' | 'new'>('top');
  const supabase = createClient();

  const fetchQuestions = useCallback(async () => {
    const { data } = await supabase
      .from('live_qa')
      .select(`
        id,
        user_id,
        question,
        upvotes,
        is_answered,
        created_at,
        profiles (full_name)
      `)
      .eq('townhall_id', townhallId);
    
    if (data) {
      const formatted = (data as SupabaseQAItem[]).map(item => ({
        ...item,
        profiles: Array.isArray(item.profiles) ? item.profiles[0] : item.profiles
      })) as QAMessage[];

      if (filter === 'top') {
        formatted.sort((a, b) => b.upvotes - a.upvotes);
      } else {
        formatted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
      
      setQuestions(formatted);
    }
  }, [supabase, townhallId, filter]);

  useEffect(() => {
    const init = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) setUserId(authUser.id);
    };
    init();
  }, [supabase]);

  // Use separate effect for initial fetch and suppress lint as this is a standard pattern for initial data load
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    const channel = supabase
      .channel(`townhall_qa:${townhallId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'live_qa', filter: `townhall_id=eq.${townhallId}` },
        () => { fetchQuestions(); }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'live_qa_upvotes' },
        () => { fetchQuestions(); }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [townhallId, supabase, fetchQuestions]);

  const handleSubmitQuestion = async () => {
    if (!newQuestion.trim() || !userId) return;

    const { error } = await supabase
      .from('live_qa')
      .insert({
        townhall_id: townhallId,
        user_id: userId,
        question: newQuestion
      });

    if (!error) {
      setNewQuestion("");
      fetchQuestions();
    }
  };

  const handleUpvote = async (qaId: string) => {
    if (!userId) return alert("Please log in to upvote");

    const { data: existingVote } = await supabase
      .from('live_qa_upvotes')
      .select('id')
      .eq('qa_id', qaId)
      .eq('user_id', userId)
      .single();

    if (existingVote) {
      await supabase.from('live_qa_upvotes').delete().eq('id', existingVote.id);
      await supabase.rpc('decrement_qa_upvotes', { qa_id_param: qaId });
    } else {
      await supabase.from('live_qa_upvotes').insert({ qa_id: qaId, user_id: userId });
      await supabase.rpc('increment_qa_upvotes', { qa_id_param: qaId });
    }
    fetchQuestions();
  };

  return (
    <div className="flex flex-col h-full bg-brand-bg relative">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
         <div className="flex gap-4">
            <button 
                onClick={() => setFilter('top')}
                className={`text-xs font-bold uppercase tracking-wider ${filter === 'top' ? 'text-blue-400' : 'text-brand-text-muted hover:text-brand-text'}`}
            >
                Top
            </button>
            <button 
                onClick={() => setFilter('new')}
                className={`text-xs font-bold uppercase tracking-wider ${filter === 'new' ? 'text-blue-400' : 'text-brand-text-muted hover:text-brand-text'}`}
            >
                New
            </button>
         </div>
         <p className="text-[10px] text-brand-text-muted uppercase tracking-widest">{questions.length} Questions</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {questions.length === 0 && (
          <div className="text-center py-12 flex flex-col items-center gap-2 text-brand-text-muted">
             <HelpCircle className="w-8 h-8 opacity-20" />
             <p className="text-sm">No questions asked yet.</p>
          </div>
        )}
        {questions.map((q) => (
          <div key={q.id} className="bg-brand-surface-secondary/50 rounded-xl p-4 border border-white/5 group transition-all hover:bg-brand-surface-secondary">
             <div className="flex justify-between items-start gap-3">
                <div className="space-y-2">
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-brand-text-muted underline">{q.profiles?.full_name || 'Anonymous'}</span>
                      {q.is_answered && (
                         <span className="px-1.5 py-0.5 rounded-full bg-kenya-green/20 text-kenya-green text-[9px] font-bold uppercase">Answered</span>
                      )}
                   </div>
                   <p className="text-sm leading-relaxed">{q.question}</p>
                </div>
                <button 
                  onClick={() => handleUpvote(q.id)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${q.has_upvoted ? 'bg-blue-500/10 text-blue-400' : 'hover:bg-white/5 text-brand-text-muted hover:text-brand-text'}`}
                >
                   <ThumbsUp className="w-5 h-5" />
                   <span className="text-xs font-bold">{q.upvotes}</span>
                </button>
             </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-brand-surface border-t border-white/5">
         <div className="flex gap-2">
            <input 
              type="text" 
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder={userId ? "Ask a question..." : "Log in to ask"}
              className="flex-1 bg-brand-surface-secondary border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
              disabled={!userId}
            />
            <button 
              onClick={handleSubmitQuestion}
              disabled={!newQuestion.trim() || !userId}
              className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 transition-all disabled:opacity-50"
            >
               <Plus className="w-6 h-6" />
            </button>
         </div>
      </div>
    </div>
  );
}
