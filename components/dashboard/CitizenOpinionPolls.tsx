/* cspell:ignore Rigathi Sifuna */
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { BarChart3, CheckCircle2, Users, Clock, Vote, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase";

interface PollOption {
    id: string;
    option_label: string;
    votes_count: number;
    color?: string; // Optional color for UI
}

interface Poll {
    id: string;
    category: string;
    question: string;
    status: 'open' | 'closed';
    expires_at: string;
    opinion_poll_options: PollOption[];
}

const CATEGORY_COLORS: Record<string, string> = {
    'Leadership': 'bg-yellow-500',
    'Economy': 'bg-kenya-red',
    'Health': 'bg-blue-500',
    'Education': 'bg-purple-500',
    'Environment': 'bg-green-600',
    'Social': 'bg-brand-primary'
};

const INITIAL_POLLS: Poll[] = [
    {
        id: "b1d03c51-5079-4a0b-93e1-5e8a715f62a1",
        category: "Leadership",
        question: "If the Presidential election were held today, who would you vote for?",
        status: 'open',
        expires_at: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
        opinion_poll_options: [
            { id: "e1c2a3b4-d5e6-4f7a-8b9c-0d1e2f3a4b5c", option_label: "William Ruto", votes_count: 0 },
            { id: "e2c3a4b5-d6e7-4f8a-9b0c-1d2e3f4a5b6c", option_label: "Rigathi Gachagua", votes_count: 0 },
            { id: "e3c4a5b6-d7e8-4f9a-0b1c-2d3e4f5a6b7c", option_label: "Kalonzo Musyoka", votes_count: 0 },
            { id: "e4c5a6b7-d8e9-4f0a-1b2c-3d4e5f6a7b8c", option_label: "Edwin Sifuna", votes_count: 0 },
            { id: "e5c6a7b8-d9e0-4f1a-2b3c-4d5e6f7a8b9c", option_label: "Others / Undecided", votes_count: 0 }
        ]
    }
];

export function CitizenOpinionPolls() {
    const [polls, setPolls] = useState<Poll[]>(INITIAL_POLLS);
    const [userVotes, setUserVotes] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [votingId, setVotingId] = useState<string | null>(null);
    const supabase = createClient();

    const fetchPolls = useCallback(async () => {
        try {
            const { data: pollsData, error: pollsError } = await supabase
                .from('opinion_polls')
                .select(`
                    *,
                    opinion_poll_options (*)
                `)
                .eq('status', 'open')
                .order('created_at', { ascending: false });

            if (pollsData && pollsData.length > 0 && !pollsError) {
                // Force-override the presidential poll with the requested 0% list
                const processedPolls = (pollsData as Poll[]).map(p => {
                    if (p.question.toLowerCase().includes("presidential election")) {
                        return {
                            ...INITIAL_POLLS[0],
                            id: p.id // Keep real row ID
                        };
                    }
                    return p;
                });
                
                setPolls(processedPolls);
                
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const { data: votesData } = await supabase
                        .from('opinion_poll_votes')
                        .select('poll_id, option_id')
                        .eq('user_id', user.id);
                    
                    if (votesData) {
                        const votesMap: Record<string, string> = {};
                        votesData.forEach(v => {
                            const poll = processedPolls.find(p => p.id === v.poll_id);
                            const isPresidential = poll?.question.toLowerCase().includes("presidential election");
                            
                            if (!isPresidential) {
                                votesMap[v.poll_id] = v.option_id;
                            }
                        });
                        setUserVotes(votesMap);
                    }
                }
            } else if (!pollsError && pollsData?.length === 0) {
                setPolls(INITIAL_POLLS);
            }
        } catch (err) {
            console.error("Error fetching polls:", err);
        } finally {
            setLoading(false);
        }
    }, [supabase]);

    useEffect(() => {
        fetchPolls();
    }, [fetchPolls]);

    const handleVote = async (pollId: string, optionId: string) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return alert("Please log in to vote");
        if (userVotes[pollId]) return;

        setVotingId(optionId);
        
        try {
            console.log("SUBMITTING VOTE:", { pollId, optionId, userId: user.id });
            
            // 1. Record the vote
            const { error: voteError } = await supabase
                .from('opinion_poll_votes')
                .insert({
                    poll_id: pollId,
                    user_id: user.id,
                    option_id: optionId
                });

            if (voteError) throw voteError;

            // 2. Increment count atomically
            const { error: rpcError } = await supabase.rpc('increment_opinion_poll_vote', { 
                option_id_param: optionId 
            });

            if (rpcError) throw rpcError;

            // 3. Update local state
            setUserVotes(prev => ({ ...prev, [pollId]: optionId }));
            
            // 4. Refresh data to show new counts
            await fetchPolls();
        } catch (err: unknown) {
            const error = err as { message?: string; code?: string; details?: string; hint?: string };
            console.error("Voting failed details:", {
                message: error?.message,
                code: error?.code,
                details: error?.details,
                hint: error?.hint
            });
            
            // Check for duplicate vote constraint (Error 23505)
            if (error?.code === '23505') {
                alert("You have already voted in this poll. Your participation is recorded.");
                setUserVotes(prev => ({ ...prev, [pollId]: optionId }));
            } else {
                const errorMessage = error?.message || "Unknown database error";
                const errorCode = error?.code || "No code";
                
                alert(`Failed to record vote.\nError: ${errorMessage}\nCode: ${errorCode}\n\nPlease refresh the page after running the SQL migration.`);
            }
        } finally {
            setVotingId(null);
        }
    };

    if (loading) return (
        <div className="py-20 flex flex-col items-center justify-center gap-4 text-brand-text-muted">
            <Loader2 className="w-8 h-8 animate-spin text-kenya-gold" />
            <p className="text-xs font-bold uppercase tracking-widest animate-pulse">Syncing with Opinion Hub...</p>
        </div>
    );

    if (polls.length === 0) return (
        <div className="py-20 text-center space-y-4">
            <BarChart3 className="w-12 h-12 mx-auto opacity-10" />
            <p className="text-sm text-brand-text-muted italic">No active polls at the moment.</p>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-2">
                    <Vote className="w-3 h-3 text-kenya-gold" /> Opinion Polls Hub
                </h3>
                <span className="text-[10px] font-bold text-kenya-green bg-kenya-green/10 px-2 py-0.5 rounded uppercase">
                    {polls.length} Active Polls
                </span>
            </div>

            <div className="flex flex-col gap-4">
                {polls.map((poll) => {
                    const hasVoted = userVotes[poll.id];
                    const totalVotes = poll.opinion_poll_options.reduce((acc, opt) => acc + opt.votes_count, 0);

                    return (
                        <motion.div
                            key={poll.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-brand-surface border border-white/5 rounded-xl p-5 shadow-lg relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                                <BarChart3 className="w-12 h-12" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${CATEGORY_COLORS[poll.category] || 'bg-brand-primary'} text-white`}>
                                        {poll.category}
                                    </span>
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-brand-text-muted">
                                        <Clock className="w-3 h-3" />
                                        {new Date(poll.expires_at) > new Date() ? 'ACTIVE' : 'CLOSED'}
                                    </div>
                                </div>

                                <h4 className="text-sm font-bold text-brand-text leading-tight mb-4 pr-10">
                                    {poll.question}
                                </h4>

                                <div className="space-y-3">
                                    {poll.opinion_poll_options.map((option) => {
                                        const percentage = totalVotes > 0 ? Math.round((option.votes_count / totalVotes) * 100) : 0;
                                        const isChosen = hasVoted === option.id;

                                        return (
                                            <div key={option.id} className="space-y-1.5">
                                                <button
                                                    onClick={() => handleVote(poll.id, option.id)}
                                                    disabled={!!hasVoted || votingId !== null}
                                                    className={`w-full group/item relative h-10 rounded-lg border transition-all duration-300 flex items-center px-4 overflow-hidden ${
                                                        isChosen 
                                                            ? 'border-kenya-gold/50 bg-kenya-gold/5' 
                                                            : hasVoted 
                                                                ? 'border-white/5 bg-white/2 cursor-default'
                                                                : 'border-white/10 hover:border-white/30 hover:bg-white/5 bg-white/2'
                                                    }`}
                                                >
                                                    <div 
                                                        className={`absolute inset-y-0 left-0 transition-all duration-1000 ease-out ${
                                                            isChosen ? 'bg-kenya-gold/10' : 'bg-white/5'
                                                        }`}
                                                        style={{ width: hasVoted ? `${percentage}%` : '0%' }}
                                                    />

                                                    <div className="relative z-10 w-full flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            {isChosen && <CheckCircle2 className="w-3.5 h-3.5 text-kenya-gold" />}
                                                            <span className={`text-xs font-bold ${isChosen ? 'text-kenya-gold' : 'text-brand-text-dim'}`}>
                                                                {option.option_label}
                                                            </span>
                                                        </div>
                                                        {(hasVoted || votingId === option.id) && (
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[10px] font-black text-brand-text-muted italic">
                                                                    {option.votes_count.toLocaleString()}
                                                                </span>
                                                                <span className="text-xs font-black text-brand-text">
                                                                    {percentage}%
                                                                </span>
                                                            </div>
                                                        )}
                                                        {votingId === option.id && (
                                                            <Loader2 className="w-3 h-3 animate-spin text-kenya-gold" />
                                                        )}
                                                    </div>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-[10px] font-black text-brand-text-muted uppercase tracking-wider">
                                        <Users className="w-3 h-3" />
                                        {totalVotes.toLocaleString()} TOTAL VOTES
                                    </div>
                                    {hasVoted && (
                                        <motion.div 
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="text-[9px] font-black text-kenya-green uppercase flex items-center gap-1 bg-kenya-green/10 px-2 py-0.5 rounded"
                                        >
                                            <CheckCircle2 className="w-2.5 h-2.5" />
                                            Vote Recorded Successfully
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
            
            <button className="w-full py-4 rounded-xl border border-white/10 bg-white/2 hover:bg-white/5 transition-all group flex items-center justify-center gap-3 mt-4">
                <div className="p-2 rounded-lg bg-kenya-gold/10 text-kenya-gold group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-4 h-4" />
                </div>
                <div className="text-left">
                    <p className="text-[10px] font-black text-brand-text-muted uppercase tracking-widest">Platform Analytics</p>
                    <p className="text-xs font-bold text-brand-text group-hover:text-kenya-gold transition-colors">View Comprehensive National Sentiment</p>
                </div>
            </button>
        </div>
    );
}
