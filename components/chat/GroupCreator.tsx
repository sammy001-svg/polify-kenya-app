"use client";

import React, { useState, useEffect } from "react";
import { X, Search, Loader2, Users, Plus, Check } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GroupCreatorProps {
  onClose: () => void;
  onSuccess: (roomId: string) => void;
}

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
}

export function GroupCreator({ onClose, onSuccess }: GroupCreatorProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!search.trim()) {
        setUsers([]);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, username')
        .or(`full_name.ilike.%${search}%,username.ilike.%${search}%`)
        .limit(10);

      if (!error && data) {
        setUsers(data.map(u => ({
          id: u.id,
          name: u.full_name || u.username || "Anonymous",
          avatar: u.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.id}`
        })));
      }
      setLoading(false);
    };

    const timer = setTimeout(fetchUsers, 500);
    return () => clearTimeout(timer);
  }, [search, supabase]);

  const toggleUser = (user: UserProfile) => {
    if (selectedUsers.find(u => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleCreate = async () => {
    if (!name.trim() || selectedUsers.length === 0) return;

    setCreating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // 1. Create Room
      const { data: room, error: roomError } = await supabase
        .from("chat_rooms")
        .insert({
          name: name,
          is_group: true,
          avatar_url: `https://api.dicebear.com/7.x/identicon/svg?seed=${name}`
        })
        .select()
        .single();

      if (roomError) throw roomError;

      // 2. Add Participants
      const participants = [
        { room_id: room.id, user_id: user.id, role: 'admin' },
        ...selectedUsers.map(u => ({ room_id: room.id, user_id: u.id, role: 'member' }))
      ];

      const { error: partError } = await supabase
        .from("chat_participants")
        .insert(participants);

      if (partError) throw partError;
      
      onSuccess(room.id);
      onClose();
    } catch (err) {
      console.error("Error creating group:", err);
      alert("Failed to create group. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-overlay flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
    >
      <div className="w-full max-w-lg bg-brand-bg rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">
            {step === 1 ? "Add Group Members" : "New Group Details"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-brand-text-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 ? (
          <>
            <div className="p-4 border-b border-white/5">
              <div className="relative">
                <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors", loading ? "text-kenya-red animate-pulse" : "text-brand-text-muted")} />
                <input 
                  type="text" 
                  placeholder="Search participants..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-brand-surface border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none"
                />
              </div>
              
              {selectedUsers.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 px-2">
                  <AnimatePresence>
                    {selectedUsers.map(u => (
                      <motion.div 
                        key={u.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="bg-white/10 rounded-full pl-1 pr-2 py-1 flex items-center gap-2 border border-white/5"
                      >
                         <div className="w-6 h-6 rounded-full overflow-hidden relative">
                           <Image src={u.avatar} alt={u.name} fill />
                         </div>
                         <span className="text-[10px] font-bold text-white uppercase italic">{u.name}</span>
                         <button onClick={() => toggleUser(u)} className="p-0.5 hover:bg-white/10 rounded-full">
                           <X className="w-3 h-3 text-brand-text-muted" />
                         </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar min-h-[300px]">
              {users.map(user => (
                <button 
                  key={user.id} 
                  onClick={() => toggleUser(user)}
                  className="flex items-center justify-between w-full p-3 rounded-2xl hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative border border-white/10">
                      <Image src={user.avatar} alt={user.name} fill />
                    </div>
                    <span className="text-sm font-bold text-white uppercase italic">{user.name}</span>
                  </div>
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                    selectedUsers.find(u => u.id === user.id) ? "bg-kenya-red border-kenya-red" : "border-brand-text-muted/50"
                  )}>
                    {selectedUsers.find(u => u.id === user.id) && <Check className="w-4 h-4 text-white" />}
                  </div>
                </button>
              ))}
              {search.trim() && users.length === 0 && !loading && (
                <p className="text-center text-xs text-brand-text-muted p-8">No users found</p>
              )}
            </div>

            <div className="p-6 border-t border-white/5 bg-brand-bg-secondary">
               <button 
                 disabled={selectedUsers.length === 0}
                 onClick={() => setStep(2)}
                 className="w-full py-4 rounded-2xl bg-kenya-red text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-kenya-red/20 disabled:opacity-50"
               >
                 Next (Selected {selectedUsers.length})
               </button>
            </div>
          </>
        ) : (
          <div className="p-8 space-y-6">
            <div className="flex flex-col items-center gap-4">
               <div className="w-24 h-24 rounded-full bg-brand-surface border-2 border-dashed border-white/10 flex items-center justify-center text-brand-text-muted">
                  <Users className="w-10 h-10" />
               </div>
               <p className="text-[10px] text-brand-text-muted font-black uppercase tracking-widest">Group Image Auto-generated from Name</p>
            </div>
            
            <input 
               autoFocus
               placeholder="Group Subject"
               value={name}
               onChange={(e) => setName(e.target.value)}
               className="w-full bg-brand-surface border border-white/5 rounded-2xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-kenya-red"
            />

            <div className="flex gap-4">
               <button onClick={() => setStep(1)} className="flex-1 py-4 rounded-2xl border border-white/5 text-brand-text-muted font-black uppercase tracking-widest text-[10px] hover:border-white/10">
                  Back
               </button>
               <button 
                 disabled={!name.trim() || creating}
                 onClick={handleCreate}
                 className="flex-2 py-3 rounded-2xl bg-kenya-red text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-kenya-red/90 transition-all shadow-lg shadow-kenya-red/20 active:scale-95 disabled:opacity-50"
               >
                 {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                 Create Group
               </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
