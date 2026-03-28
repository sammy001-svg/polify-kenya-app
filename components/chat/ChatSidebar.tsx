"use client";

import React, { useState, useEffect } from "react";
import { 
  MoreVertical, 
  Search, 
  Plus,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Video,
  Archive,
  ArrowLeft,
  Mic,
  Users,
  Key,
  Lock,
  MessageSquare as ChatIcon,
  Bell,
  Database,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  CheckCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { createClient } from "@/lib/supabase";
import { AnimatePresence, motion } from "framer-motion";

interface User {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  username?: string;
}

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

interface ChatSidebarProps {
  onSelectChat: (id: string | null) => void;
  selectedChatId: string | null;
  onViewStatus: () => void;
  onPostStatus: () => void;
  onCreateGroup: () => void;
  onStartVoiceTalk: () => void;
  activeNavTab?: string;
}

interface StatusItem {
  id: string;
  user_id: string;
  content?: string;
  media_url?: string;
  created_at: string;
  profiles?: {
    full_name?: string;
    avatar_url?: string;
    username?: string;
  };
}

interface ChatRoomRPC {
  room_id: string;
  room_type: string;
  room_name: string;
  room_avatar: string;
  last_message: string;
  last_message_time: string;
  unread_count: string;
}

interface CallItem {
  id: string;
  name: string;
  avatar: string;
  time: string;
  type: 'video' | 'voice';
  status: 'incoming' | 'outgoing' | 'missed';
}

const MOCK_CHATS: ChatItem[] = [];
const MOCK_ARCHIVED: ChatItem[] = [];
const MOCK_CALLS: CallItem[] = [];

interface SearchResult {
  id: string;
  name: string;
  avatar: string;
  username?: string;
  lastMessage?: string;
  time?: string;
  unread?: number;
  isOnline?: boolean;
}

export function ChatSidebar({ onSelectChat, selectedChatId, onViewStatus, onPostStatus, onCreateGroup, onStartVoiceTalk, activeNavTab = "chats" }: ChatSidebarProps) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeChats, setActiveChats] = useState<ChatItem[]>([]);
  const [realStatuses, setRealStatuses] = useState<StatusItem[]>([]);
  const supabase = createClient();

  // Fetch Current User
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUser(user);
    });
  }, [supabase]);

  // Fetch Statuses
  useEffect(() => {
    const fetchStatuses = async () => {
       const { data } = await supabase
         .from('user_statuses')
         .select('*, profiles(full_name, avatar_url, username)')
         .order('created_at', { ascending: false });
       if (data) setRealStatuses(data);
    };
    fetchStatuses();
    
    const channel = supabase
      .channel('status-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_statuses' }, () => {
        fetchStatuses();
      })
      .subscribe();
    
    return () => { supabase.removeChannel(channel); };
  }, [supabase]);

  // Fetch Chats from DB
  useEffect(() => {
    if (!currentUser) return;

    const fetchChats = async () => {
      if (!currentUser) return;
      setLoading(true);
      const { data: rooms, error } = await supabase.rpc('get_user_chats', { p_user_uuid: currentUser.id });

      if (error) {
        console.error("Sidebar Sync Error (RPC):", error);
        console.error("Details:", error.message, error.details, error.hint);
      }

      if (rooms && rooms.length > 0) {
        const formattedChats: ChatItem[] = (rooms as ChatRoomRPC[]).map((r) => ({
          id: r.room_id,
          name: r.room_name,
          avatar: r.room_avatar,
          lastMessage: r.last_message || "No messages yet",
          time: r.last_message_time ? new Date(r.last_message_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "",
          unread: parseInt(r.unread_count || "0"),
          isOnline: false,
          isGroup: r.room_type === 'group' || r.room_type === 'baraza'
        }));
        setActiveChats(formattedChats);
      } else {
        setActiveChats([]);
      }
      setLoading(false);
    };

    fetchChats();

    // Subscribe to message updates to refresh chat list
    const channel = supabase
      .channel('sidebar-sync')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, () => {
        fetchChats();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser, supabase]);

  // Listen for both messages and participant updates (for unread sync)
  useEffect(() => {
    if (!currentUser) return;

    const channel = supabase
      .channel('sidebar-unread-sync')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'chat_participants',
        filter: `user_id=eq.${currentUser.id}`
      }, () => {
        // Refresh when our own read status changes
        const fetchChats = async () => {
            const { data: rooms } = await supabase.rpc('get_user_chats', { p_user_uuid: currentUser.id });
            if (rooms) {
                const formattedChats = (rooms as ChatRoomRPC[]).map((r) => ({
                    id: r.room_id,
                    name: r.room_name,
                    avatar: r.room_avatar,
                    lastMessage: r.last_message || "No messages yet",
                    time: r.last_message_time ? new Date(r.last_message_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "",
                    unread: parseInt(r.unread_count || "0"),
                    isOnline: false,
                    isGroup: r.room_type === 'group' || r.room_type === 'baraza'
                }));
                setActiveChats(formattedChats);
            }
        };
        fetchChats();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser, supabase]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!search.trim()) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, username')
        .or(`full_name.ilike.%${search}%,username.ilike.%${search}%`)
        .limit(5);

      if (!error && data) {
        setSearchResults(data.map(u => ({
          id: u.id,
          name: u.full_name || u.username || "Anonymous",
          avatar: u.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.id}`,
          username: u.username
        })));
      }
      setLoading(false);
    };

    const timer = setTimeout(fetchUsers, 500);
    return () => clearTimeout(timer);
  }, [search, supabase]);

  return (
    <div className="w-full h-full flex flex-col bg-[#111b21]">
      <div className="p-4 py-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
             {showArchived && (
               <button 
                  onClick={() => setShowArchived(false)}
                  className="p-2 -ml-2 hover:bg-white/5 rounded-full text-[#aebac1] transition-transform active:scale-90"
                >
                  <ArrowLeft className="w-5 h-5" />
               </button>
             )}
             <h1 className="text-2xl font-bold text-[#e9edef]">
               {showArchived ? "Archived" : activeNavTab === "calls" ? "Calls" : "Chats"}
             </h1>
           </div>
           <div className="flex items-center gap-4 text-[#aebac1]">
             {activeNavTab === "calls" ? (
               <button className="hover:bg-white/5 p-2 rounded-full transition-colors">
                  <PhoneCall className="w-5 h-5" />
               </button>
              ) : (
                <div className="relative">
                  <button 
                    onClick={() => setShowPlusMenu(!showPlusMenu)}
                    className={cn(
                      "hover:bg-white/5 p-2 rounded-full transition-all",
                      showPlusMenu ? "bg-white/10 text-white rotate-45" : "text-kenya-red"
                    )}
                  >
                    <Plus className="w-5 h-5" />
                  </button>

                  <AnimatePresence>
                    {showPlusMenu && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="absolute right-0 top-12 w-48 bg-[#233138] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden py-1"
                      >
                         <button 
                            onClick={() => {
                              onCreateGroup();
                              setShowPlusMenu(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-all text-left group"
                          >
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
                               <Users className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium text-[#e9edef]">New Group</span>
                         </button>
                         <button 
                            onClick={() => {
                              onStartVoiceTalk();
                              setShowPlusMenu(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-all text-left group"
                          >
                            <div className="w-8 h-8 rounded-full bg-kenya-red/20 text-kenya-red flex items-center justify-center">
                               <Mic className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium text-[#e9edef]">Voice Talk</span>
                         </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
             <button className="hover:bg-white/5 p-2 rounded-full transition-colors">
                <MoreVertical className="w-5 h-5" />
             </button>
           </div>
        </div>

        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-3">
             <Search className={cn("w-4 h-4 transition-colors", loading ? "text-kenya-red animate-pulse" : "text-[#aebac1]")} />
          </div>
          <input 
            type="text" 
            placeholder={activeNavTab === "calls" ? "Search calls" : "Search or start a new chat"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#202c33] border-none rounded-lg py-2 pl-12 pr-4 text-sm text-[#d1d7db] focus:outline-none placeholder:text-[#8696a0] transition-all"
          />
        </div>

        {activeNavTab === "chats" && (
          <div className="flex gap-2 pb-2">
            {["All", "Unread", "Favourites", "Groups"].map((filter) => (
              <button 
                  key={filter}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-[13px] font-medium transition-all",
                    filter === "All" ? "bg-[#005c4b] text-[#e9edef]" : "bg-[#202c33] text-[#8696a0] hover:bg-[#2a3942]"
                  )}
                >
                  {filter}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="h-px bg-[#222e35] mx-4" />

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {activeNavTab === "status" ? (
          <div className="flex flex-col h-full">
             {/* My Status */}
              <div className="p-4 py-3">
                  <button 
                    onClick={onPostStatus}
                    className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-[#202c33] transition-all text-left group"
                  >
                     <div className="relative">
                        <div className="w-12 h-12 rounded-full border-2 border-[#202c33] p-0.5">
                           <div className="w-full h-full rounded-full bg-brand-surface overflow-hidden relative">
                              <Image src={currentUser?.avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${currentUser?.id}`} alt="My Status" fill />
                           </div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#00a884] rounded-full border-2 border-[#111b21] flex items-center justify-center">
                           <Plus className="w-3 h-3 text-white" />
                        </div>
                     </div>
                     <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-[15px] text-[#e9edef]">My status</h4>
                        <p className="text-[13px] text-[#8696a0]">Tap to add status update</p>
                     </div>
                  </button>
              </div>

             <div className="h-px bg-[#222e35] mx-4 my-2" />

             {/* Recent Updates */}
             <div className="flex-1 pb-4">
                <p className="text-[10px] font-black text-[#8696a0] uppercase tracking-widest px-6 py-4">Recent updates</p>
                <div className="space-y-1">
                   {realStatuses.length > 0 ? realStatuses.map(status => (
                     <button 
                        key={status.id} 
                        onClick={onViewStatus}
                        className="flex items-center gap-3 w-full p-4 py-3 px-6 hover:bg-[#202c33] transition-all text-left"
                      >
                       <div className="w-12 h-12 rounded-full border-2 border-[#00a884] p-0.5">
                          <div className="w-full h-full rounded-full bg-brand-surface overflow-hidden relative">
                             <Image src={status.profiles?.avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${status.user_id}`} alt="status" fill />
                          </div>
                       </div>
                       <div className="flex-1 min-w-0 border-b border-[#222e35] pb-3">
                          <h4 className="font-medium text-[15px] text-[#e9edef]">{status.profiles?.full_name || status.profiles?.username || "Citizen"}</h4>
                          <p className="text-[13px] text-[#8696a0]">{new Date(status.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                       </div>
                     </button>
                   )) : (
                     <div className="p-8 text-center text-[#8696a0] text-sm italic">
                        No active statuses. Tap the icon above to add yours!
                     </div>
                   )}
                </div>
             </div>
          </div>
        ) : activeNavTab === "settings" ? (
          <div className="flex flex-col h-full bg-[#111b21] overflow-y-auto custom-scrollbar">
            <div className="p-4 py-6 flex flex-col gap-6">
              {/* Profile Card */}
              <div className="flex items-center gap-4 p-3 cursor-pointer hover:bg-[#202c33] rounded-2xl transition-all border border-white/5 bg-[#182229]">
                 <div className="w-16 h-16 rounded-full border-2 border-[#222e35] overflow-hidden relative shrink-0">
                  <Image src={currentUser?.avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${currentUser?.id}`} alt="Your Profile" fill />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[17px] font-bold text-[#e9edef]">{currentUser?.full_name || currentUser?.username || "Mkenya Mzalendo"}</h3>
                  <p className="text-[13px] text-[#8696a0] truncate italic opacity-80">@{currentUser?.username || "polify_user"}</p>
                </div>
              </div>

              {/* Settings List */}
              <div className="space-y-1">
                {[
                  { id: 'account', icon: Key, label: 'Account', desc: 'Security notifications, change number' },
                  { id: 'privacy', icon: Lock, label: 'Privacy', desc: 'Last seen, profile photo, groups' },
                  { id: 'chats', icon: ChatIcon, label: 'Chats', desc: 'Theme, wallpapers, chat history' },
                  { id: 'notifications', icon: Bell, label: 'Notifications', desc: 'Message, group & call tones' },
                  { id: 'storage', icon: Database, label: 'Storage and data', desc: 'Network usage, auto-download' },
                  { id: 'language', icon: Globe, label: 'App language', desc: "English (phone's language)" },
                  { id: 'help', icon: HelpCircle, label: 'Help', desc: 'Help center, contact us, privacy policy' },
                ].map((item) => (
                  <button 
                    key={item.id}
                    className="w-full flex items-center gap-4 p-4 hover:bg-[#202c33] rounded-2xl transition-all text-left group"
                  >
                    <div className="w-10 h-10 flex items-center justify-center text-[#8696a0] group-hover:text-kenya-green transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0 border-b border-[#222e35] pb-4 group-last:border-none">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[15px] font-medium text-[#e9edef]">{item.label}</h4>
                        <ChevronRight className="w-4 h-4 text-[#8696a0] opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                      <p className="text-[13px] text-[#8696a0] truncate">{item.desc}</p>
                    </div>
                  </button>
                ))}

                <button className="w-full flex items-center gap-4 p-4 hover:bg-kenya-red/5 rounded-2xl transition-all text-left text-kenya-red mt-4 group">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1 font-bold text-[15px]">
                    Log out
                  </div>
                </button>
              </div>
            </div>
          </div>
        ) : activeNavTab === "calls" ? (
          <div className="p-4 py-2">
            <h3 className="text-[13px] font-bold text-[#8696a0] uppercase mb-4 px-2">Recent</h3>
            <div className="space-y-1">
              {MOCK_CALLS.map((call) => (
                <div key={call.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#202c33] transition-all group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-surface border border-white/10 overflow-hidden relative">
                      <Image src={call.avatar} alt={call.name} fill />
                    </div>
                    <div>
                      <h4 className={cn("text-[15px] font-medium", call.status === 'missed' ? 'text-kenya-red' : 'text-[#e9edef]')}>
                         {call.name}
                      </h4>
                      <div className="flex items-center gap-1.5">
                         {call.status === 'missed' && <PhoneMissed className="w-3 h-3 text-kenya-red" />}
                         {call.status === 'incoming' && <PhoneIncoming className="w-3 h-3 text-kenya-green" />}
                         {call.status === 'outgoing' && <PhoneOutgoing className="w-3 h-3 text-[#aebac1]" />}
                         <span className="text-[12px] text-[#8696a0]">{call.time}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-[#aebac1] hover:text-[#e9edef] transition-colors">
                     {call.type === 'video' ? <Video className="w-5 h-5" /> : <PhoneCall className="w-5 h-5" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {!showArchived && (
              <button 
                 onClick={() => setShowArchived(true)}
                 className="w-full flex items-center gap-4 p-4 py-3 hover:bg-[#202c33] transition-all text-left group border-b border-[#222e35]"
              >
                 <div className="w-12 h-12 flex items-center justify-center text-kenya-green">
                    <Archive className="w-5 h-5" />
                 </div>
                 <div className="flex-1 flex items-center justify-between">
                    <span className="font-medium text-[15px] text-[#e9edef]">Archived</span>
                    <span className="text-[12px] text-kenya-green font-bold">{MOCK_ARCHIVED.length}</span>
                 </div>
              </button>
            )}

            <AnimatePresence>
              {searchResults.map((result) => (
                <motion.button
                  key={result.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={() => {
                    onSelectChat(result.id);
                    setSearch("");
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#202c33] transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-surface border border-white/10 overflow-hidden relative shrink-0">
                    <Image src={result.avatar} alt={result.name} fill />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-white truncate">{result.name}</h4>
                    <p className="text-xs text-[#8696a0] truncate">
                      @{result.username || result.name.split(' ')[0].toLowerCase()}
                    </p>
                  </div>
                  <Plus className="w-4 h-4 text-[#8696a0] opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              ))}
            </AnimatePresence>

            {[
              ...(showArchived ? MOCK_ARCHIVED : (activeChats.length > 0 ? activeChats : MOCK_CHATS))
            ]
            .filter((chat, index, self) => self.findIndex(c => c.id === chat.id) === index)
            .map((chat: ChatItem) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left group",
                  selectedChatId === chat.id ? "bg-[#2a3942]" : "hover:bg-[#202c33]"
                )}
              >
                <div className="w-12 h-12 rounded-full border border-white/10 overflow-hidden relative shrink-0">
                  <Image src={chat.avatar} alt={chat.name} fill />
                  {chat.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#111b21]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="font-medium text-[15px] text-[#e9edef]">{chat.name}</h4>
                    <span className={cn("text-[12px]", (chat.unread || 0) > 0 ? "text-kenya-green font-bold" : "text-[#8696a0]")}>
                      {chat.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 min-w-0">
                       {chat.lastMessage && <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb] shrink-0" />}
                       <p className="text-[13px] text-[#8696a0] truncate flex-1">
                          {chat.lastMessage}
                       </p>
                    </div>
                    {(chat.unread || 0) > 0 && (
                      <span className="bg-kenya-green text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
