"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Phone, 
  Video, 
  Search, 
  MoreVertical, 
  Smile, 
  Mic, 
  Send,
  CheckCheck,
  ChevronLeft,
  ChevronDown,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/lib/supabase";

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unread?: number;
  isOnline?: boolean;
  isGroup?: boolean;
}

interface User {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  username?: string;
}

interface Message {
  id: string;
  sender: "me" | "other";
  content: string;
  time: string;
  isRead: boolean;
}

interface ChatWindowProps {
  chatId: string | null;
  onStartVoiceDiscussion?: () => void;
  onBack?: () => void;
}

const MOCK_CHATS = [
  {
    id: "1",
    name: "Baba Ngina",
    lastMessage: "Sawa boss, tukutane kwa rally.",
    time: "14:32",
    unread: 2,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Baba",
    isOnline: true
  },
  {
    id: "2",
    name: "Youth Council G7",
    lastMessage: "Admin: Manifesto update is live!",
    time: "12:15",
    unread: 0,
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=G7",
    isGroup: true
  },
  {
    id: "3",
    name: "Mama Mboga Outreach",
    lastMessage: "Nimefika ground, watu wako ready.",
    time: "Yesterday",
    unread: 0,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mama"
  }
];

const MOCK_ARCHIVED = [
  {
    id: "a1",
    name: "Justice Committee",
    lastMessage: "The review has been finalized.",
    time: "2 days ago",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Justice",
    isGroup: true,
    unread: 0,
    isOnline: false
  }
];

const ALL_CHATS = [...MOCK_CHATS, ...MOCK_ARCHIVED];

const MOCK_MESSAGES: Message[] = [];

export function ChatWindow({ chatId, onBack }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isCalling, setIsCalling] = useState<'voice' | 'video' | null>(null);
  const [dbChat, setDbChat] = useState<ChatItem | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [resolvedRoomId, setResolvedRoomId] = useState<string | null>(null);
  const [resolvingRoom, setResolvingRoom] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUser(user);
    });
  }, [supabase]);

  const mockChat = React.useMemo(() => ALL_CHATS.find(c => c.id === chatId), [chatId]);
  const activeChat = mockChat || dbChat;

  useEffect(() => {
    if (chatId && !mockChat && currentUser) {
      setResolvingRoom(true);
      const fetchNewChat = async () => {
        // 1. Check if chatId is already a valid Room ID
        const { data: room } = await supabase
          .from('chat_rooms')
          .select('id, type')
          .eq('id', chatId)
          .single();

        if (room) {
          setResolvedRoomId(room.id);
          setResolvingRoom(false);
          // If DM, get the other participant's profile for the header
          if (room.type === 'dm') {
            const { data: participant } = await supabase
              .from('chat_participants')
              .select('user_id')
              .eq('room_id', room.id)
              .neq('user_id', currentUser.id)
              .single();
            
            if (participant) {
              const { data: profile } = await supabase
                .from('profiles')
                .select('id, full_name, avatar_url, username')
                .eq('id', participant.user_id)
                .single();
              
              if (profile) {
                setDbChat({
                  id: profile.id,
                  name: profile.full_name || profile.username || "Anonymous",
                  avatar: profile.avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${profile.id}`,
                  isOnline: false,
                  lastMessage: "",
                  time: ""
                });
              }
            }
          }
        } else {
          // 2. Not a room ID, assume it's a Profile ID and resolve/create DM
          const { data: roomId } = await supabase.rpc('get_or_create_dm', { user2_id: chatId });
          
          if (roomId) {
              setResolvedRoomId(roomId);
          }
          setResolvingRoom(false);

          const { data } = await supabase
            .from('profiles')
            .select('id, full_name, avatar_url, username')
            .eq('id', chatId)
            .single();
          
          if (data) {
            setDbChat({
              id: data.id,
              name: data.full_name || data.username || "Anonymous",
              avatar: data.avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${data.id}`,
              isOnline: false,
              lastMessage: "",
              time: ""
            });
          }
        }
      };
      fetchNewChat();
    } else {
      // Internal mock or initialization
      // Use a timeout to move state updates out of the synchronous effect body
      const timeout = setTimeout(() => {
        if (!chatId || mockChat) {
          setResolvedRoomId(chatId);
          setResolvingRoom(false);
          setDbChat(null);
        }
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [chatId, mockChat, currentUser, supabase]);

  // Messages Subscription & Initial Fetch
  useEffect(() => {
    const targetId = resolvedRoomId || chatId;
    if (!targetId) return;

    const fetchMessages = async () => {
      // UUID validation regex
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(targetId);
      
      if (!isUUID) {
        // Handle mock rooms
        if (["1", "2", "3", "a1"].includes(targetId)) {
            setMessages(MOCK_MESSAGES);
        } else {
            setMessages([]);
        }
        return;
      }

      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('room_id', targetId)
          .order('created_at', { ascending: true });
        
        if (error) throw error;

        if (data && data.length > 0) {
          setMessages(data.map(m => ({
              id: m.id,
              content: m.content,
              sender: m.sender_id === currentUser?.id ? "me" : "other",
              time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isRead: true
          })));
        } else {
          setMessages([]);
        }
      } catch (err) {
        console.error("Chat Error (Fetch):", err);
      }
    };

    fetchMessages();

    // Mark as read when opening
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(targetId);
    if (targetId && currentUser && isUUID) {
        supabase.rpc('mark_chat_read', { user_uuid: currentUser.id, room_uuid: targetId }).then(({error}) => {
            if (error) console.error("Chat Error (Read):", error);
        });
    }

    // Subscribe to new messages - Broadening to ensure capture
    if (!isUUID) return; // Skip realtime for mock rooms

    const channel = supabase
      .channel(`chat_room_${targetId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'chat_messages'
      }, (payload) => {
        const newMessage = payload.new;
        if (newMessage.room_id === targetId) {
            console.log("New Message Received:", newMessage);
            setMessages(prev => {
                const isMe = newMessage.sender_id === currentUser?.id;
                const formattedSender: "me" | "other" = isMe ? "me" : "other";

                // 1. Check for exact duplicate by ID
                if (prev.find(m => m.id === newMessage.id)) return prev;
                
                // 2. Check for optimistic duplicate (match content and sender for non-UUID temp messages)
                const optimisticMatchIdx = prev.findIndex(m => 
                    m.content === newMessage.content && 
                    m.sender === formattedSender && 
                    m.id.length < 20 // Real UUIDs are long, temp IDs are short timestamps
                );

                const finalMessage = {
                    id: newMessage.id,
                    content: newMessage.content,
                    sender: formattedSender,
                    time: new Date(newMessage.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isRead: false
                };

                if (optimisticMatchIdx !== -1) {
                    // Replace optimistic message with real one
                    const next = [...prev];
                    next[optimisticMatchIdx] = finalMessage;
                    return next;
                }

                return [...prev, finalMessage];
            });
        }
      })
      .subscribe((status) => {
        console.log(`Realtime Subscription for room ${targetId}:`, status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId, resolvedRoomId, currentUser, supabase]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-close call simulation after 3 seconds
  useEffect(() => {
    if (isCalling) {
      const timer = setTimeout(() => setIsCalling(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [isCalling]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, chatId]);

  if (!chatId || !activeChat) {
    return (
      <div className="flex-1 flex flex-col items-center bg-[#0b141a] h-full relative">
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 p-8">
          <div className="w-32 h-32 rounded-full bg-brand-surface relative overflow-hidden flex items-center justify-center border border-white/5 opacity-40">
             <Image
                src="/polify-logo.jpg"
                alt="PoliFy"
                fill
                className="object-cover"
              />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-[#e9edef] opacity-90">
              PoliFy <span className="text-[#00a884]">Chat Space</span>
            </h2>
            <p className="text-[#8696a0] max-w-md font-medium text-[15px] leading-relaxed">
              Select a contact to start contributing to the national dialogue. <br/>
              Your voice, your impact.
            </p>
          </div>
        </div>
        <div className="pb-10 flex items-center gap-2 text-[11px] text-[#8696a0] font-black uppercase tracking-[0.2em] opacity-60">
           <div className="flex items-center gap-1">
             <CheckCheck className="w-3.5 h-3.5 text-[#00a884]" /> 
             <span>End-to-end Encrypted</span>
           </div>
        </div>
      </div>
    );
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetRoomId = resolvedRoomId; // Enforce resolved ID
    if (!input.trim() || !targetRoomId || !currentUser || resolvingRoom) return;
    
    const content = input;
    setInput("");

    // optimistic update
    const tempId = Date.now().toString();
    setMessages(prev => [...prev, {
      id: tempId,
      sender: "me",
      content: content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    }]);

    // DB Persistence
    await supabase.from('chat_messages').insert({
        room_id: targetRoomId,
        sender_id: currentUser.id,
        content: content
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0b141a] relative h-full">
      {/* Background Pattern - WhatsApp style */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" 
           style={{ backgroundImage: `url('https://static.whatsapp.net/rsrc.php/v3/yl/r/gi_tyrPcg5n.png')`, backgroundSize: '400px', filter: 'invert(1)' }} />
      <div className="absolute inset-0 bg-[#0b141a]/95 pointer-events-none" />

      {/* Header */}
      <div className="p-3 px-4 h-16 flex items-center justify-between bg-[#202c33] z-10 shrink-0">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="md:hidden p-2 -ml-2 hover:bg-white/5 rounded-full text-[#aebac1]">
               <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <div className="w-10 h-10 rounded-full bg-brand-surface border border-white/10 overflow-hidden relative shrink-0">
            <Image src={activeChat.avatar} alt={activeChat.name} fill />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-[15px] text-[#e9edef] truncate">{activeChat.name}</h4>
            <p className="text-[11px] text-[#8696a0] truncate">
              {activeChat.isOnline ? "online" : "last seen recently"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[#aebac1]">
           <button 
              onClick={() => setIsCalling('video')}
              className="flex items-center gap-2 px-3 py-1 bg-transparent hover:bg-white/5 rounded-full transition-all border border-white/10"
            >
              <div className="flex items-center gap-1.5 text-kenya-red">
                 <Video className="w-4 h-4" />
                 <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Room</span>
                 <ChevronDown className="w-3 h-3" />
              </div>
           </button>
           <button 
              onClick={() => setIsCalling('voice')}
              className="flex items-center gap-2 px-3 py-1 bg-transparent hover:bg-white/5 rounded-full transition-all border border-white/10"
            >
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4" />
                <ChevronDown className="w-3 h-3" />
              </div>
           </button>
           <div className="w-px h-6 bg-white/10 mx-1" />
           <button className="hover:text-white transition-colors p-2">
              <Search className="w-5 h-5" />
           </button>
           <button className="hover:text-white transition-colors p-2">
              <MoreVertical className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth custom-scrollbar relative z-0 pb-20"
      >
        <div className="flex justify-center my-4">
          <span className="px-3 py-1 rounded-lg bg-[#182229] text-[#8696a0] text-[12.5px] font-medium shadow-sm uppercase">
            Today
          </span>
        </div>

        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={cn(
              "flex w-full mb-1",
              msg.sender === "me" ? "justify-end" : "justify-start"
            )}
          >
            <div 
              className={cn(
                "max-w-[85%] p-2 px-3 rounded-lg relative shadow animate-in fade-in slide-in-from-bottom-2",
                msg.sender === "me" 
                  ? "bg-[#005c4b] text-[#e9edef] rounded-tr-none" 
                  : "bg-[#202c33] text-[#e9edef] rounded-tl-none"
              )}
            >
              <p className="text-[14.2px] leading-snug">{msg.content}</p>
              <div className="flex items-center justify-end gap-1 mt-0.5 opacity-60">
                <span className="text-[11px]">{msg.time}</span>
                {msg.sender === "me" && (
                  <CheckCheck className={cn("w-3.5 h-3.5", msg.isRead ? "text-[#53bdeb]" : "")} />
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input - FIXED AT BOTTOM */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#202c33] border-t border-white/5">
        <form 
          onSubmit={handleSend}
          className="p-3 px-4 flex items-center gap-2"
        >
          <div className="flex items-center gap-1">
            <button type="button" className="p-2 text-[#aebac1] hover:text-white transition-colors">
              <Plus className="w-6 h-6" />
            </button>
            <button type="button" className="p-2 text-[#aebac1] hover:text-white transition-colors">
              <Smile className="w-6 h-6" />
            </button>
          </div>
          
          <input 
            type="text" 
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-[#2a3942] border-none rounded-lg py-2.5 px-4 text-[15px] text-[#d1d7db] focus:outline-none placeholder:text-[#8696a0]"
          />

          <button 
            type="submit"
            className="p-2 text-[#aebac1] hover:text-white transition-all"
          >
            {input.trim() ? <Send className="w-6 h-6 text-kenya-red" /> : <Mic className="w-6 h-6" />}
          </button>
        </form>
      </div>

      {/* Calling Simulation Overlay */}
      <AnimatePresence>
        {isCalling && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 z-50 bg-[#0b141a]/90 flex flex-col items-center justify-center gap-8 backdrop-blur-sm"
          >
             <div className="w-32 h-32 rounded-full border-4 border-kenya-red p-1 animate-pulse">
                <div className="w-full h-full rounded-full overflow-hidden relative grayscale">
                   <Image src={activeChat.avatar} alt={activeChat.name} fill />
                </div>
             </div>
             <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{activeChat.name}</h2>
                <p className="text-[#8696a0] font-bold uppercase tracking-widest animate-pulse">
                   Calling ({isCalling === 'voice' ? 'Audio' : 'Video'})...
                </p>
             </div>
             <button 
               onClick={() => setIsCalling(null)}
               className="w-16 h-16 rounded-full bg-kenya-red flex items-center justify-center text-white rotate-135 hover:scale-110 transition-all shadow-xl shadow-kenya-red/40"
             >
                <Phone className="w-8 h-8" />
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
