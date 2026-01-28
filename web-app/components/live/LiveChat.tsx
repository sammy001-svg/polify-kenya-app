/* cSpell:ignore PoliFy maandamano Bunge Mashinani townhall Supabase supabase */
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase';
import { Send, User } from 'lucide-react';
import Image from 'next/image';

interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  created_at: string;
  profiles: {
    full_name: string;
    avatar_url: string;
  } | null;
}

interface LiveChatProps {
  townhallId: string;
}

export function LiveChat({ townhallId }: LiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    // 1. Get current user
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    checkUser();

    // 2. Fetch initial messages
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('live_chats')
        .select(`
          id,
          user_id,
          message,
          created_at,
          profiles (full_name, avatar_url)
        `)
        .eq('townhall_id', townhallId)
        .order('created_at', { ascending: true })
        .limit(50);
      
      if (data) {
        setMessages(data.map(m => ({
          ...m,
          profiles: Array.isArray(m.profiles) ? m.profiles[0] : m.profiles
        })) as ChatMessage[]);
      }
    };
    fetchMessages();

    // 3. Subscribe to real-time updates
    const channel = supabase
      .channel(`townhall:${townhallId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'live_chats',
          filter: `townhall_id=eq.${townhallId}`,
        },
        async (payload) => {
          // Fetch profile info for the new message
          const { data } = await supabase
            .from('profiles')
            .select('full_name, avatar_url')
            .eq('id', payload.new.user_id)
            .single();
          
          const messageWithProfile = {
            ...payload.new,
            profiles: data
          } as ChatMessage;

          setMessages((prev) => [...prev, messageWithProfile]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [townhallId, supabase]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !userId) return;

    const messageToSend = newMessage;
    setNewMessage("");

    const { error } = await supabase
      .from('live_chats')
      .insert({
        townhall_id: townhallId,
        user_id: userId,
        message: messageToSend
      });

    if (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please log in.");
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-brand-bg">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
      >
        {messages.length === 0 && (
          <div className="text-center py-8 text-brand-text-muted text-sm italic">
            No messages yet. Start the conversation!
          </div>
        )}
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className="flex gap-2 items-start animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="w-8 h-8 rounded-full bg-brand-surface-secondary flex items-center justify-center shrink-0 border border-white/5 overflow-hidden relative">
               {msg.profiles?.avatar_url ? (
                 <Image src={msg.profiles.avatar_url} alt={msg.profiles.full_name} fill className="object-cover" />
               ) : (
                 <User className="w-4 h-4 text-brand-text-muted" />
               )}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                    <p className="text-xs font-bold text-brand-text truncate">
                      {msg.profiles?.full_name || 'Anonymous User'}
                    </p>
                    <span className="text-[10px] text-brand-text-muted">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                <p className="text-sm text-brand-text-muted leading-relaxed break-all">
                  {msg.message}
                </p>
            </div>
          </div>
        ))}
      </div>

      <form 
        onSubmit={handleSendMessage}
        className="p-4 border-t border-border bg-brand-surface"
      >
        <div className="relative flex gap-2">
          <input 
            type="text" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={!userId}
            placeholder={userId ? "Say something..." : "Log in to chat"} 
            className="flex-1 bg-brand-surface-secondary border border-border rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-kenya-red transition-all disabled:opacity-50" 
          />
          <button 
            type="submit"
            disabled={!newMessage.trim() || !userId}
            className="p-2.5 rounded-full bg-kenya-red text-white hover:bg-kenya-red/90 transition-all disabled:opacity-50 disabled:grayscale"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
