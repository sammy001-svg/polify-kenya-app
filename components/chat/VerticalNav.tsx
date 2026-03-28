"use client";

import React from "react";
import { 
  MessageSquare, 
  Phone, 
  CircleDashed, 
  Archive, 
  Star, 
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { createClient } from "@/lib/supabase";

interface VerticalNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function VerticalNav({ activeTab, onTabChange }: VerticalNavProps) {
  const [userAvatar, setUserAvatar] = React.useState<string | null>(null);
  const supabase = React.useMemo(() => createClient(), []);

  React.useEffect(() => {
    const fetchAvatar = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', user.id)
          .single();
        if (data?.avatar_url) setUserAvatar(data.avatar_url);
      }
    };
    fetchAvatar();
  }, [supabase]);

  const topActions = [
    { id: "chats", icon: MessageSquare, label: "Chats" },
    { id: "calls", icon: Phone, label: "Calls" },
    { id: "status", icon: CircleDashed, label: "Status" },
  ];

  const bottomActions = [
    { id: "archived", icon: Archive, label: "Archived" },
    { id: "starred", icon: Star, label: "Starred" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="w-[60px] h-full bg-[#202c33] flex flex-col items-center py-4 shrink-0 z-20">
      <div className="flex-1 flex flex-col gap-4">
        {topActions.map((action) => (
          <button
            key={action.id}
            onClick={() => onTabChange(action.id)}
            className={cn(
              "p-3 rounded-xl transition-all relative group",
              activeTab === action.id ? "bg-white/10 text-white" : "text-[#aebac1] hover:bg-white/5"
            )}
          >
            <action.icon className="w-6 h-6" />
            <span className="absolute left-full ml-4 px-2 py-1 bg-brand-surface border border-white/10 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
               {action.label}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {bottomActions.map((action) => (
          <button
            key={action.id}
            onClick={() => onTabChange(action.id)}
            className={cn(
              "p-3 transition-all relative group rounded-xl",
              activeTab === action.id ? "bg-white/10 text-white" : "text-[#aebac1] hover:bg-white/5"
            )}
          >
            <action.icon className="w-6 h-6" />
            <span className="absolute left-full ml-4 px-2 py-1 bg-brand-surface border border-white/10 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
               {action.label}
            </span>
          </button>
        ))}
        <div className="p-1 mt-2">
           <div 
             onClick={() => onTabChange('settings')}
             className="w-10 h-10 rounded-full bg-brand-surface border border-white/10 overflow-hidden relative grayscale hover:grayscale-0 transition-all cursor-pointer"
           >
              <Image src={userAvatar || "https://api.dicebear.com/7.x/pixel-art/svg?seed=You"} alt="Profile" fill />
           </div>
        </div>
      </div>
    </div>
  );
}
