"use client";

import { MediaChannel } from "@/lib/media-data";
import { cn } from "@/lib/utils";
import { Radio, Users } from "lucide-react";

interface ChannelSelectorProps {
  channels: MediaChannel[];
  activeChannel: MediaChannel;
  onSelect: (channel: MediaChannel) => void;
}

export function ChannelSelector({ channels, activeChannel, onSelect }: ChannelSelectorProps) {
  return (
    <div className="bg-brand-surface border border-white/5 rounded-2xl overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-white/5 bg-black/20">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
           <Radio className="w-4 h-4 text-kenya-red animate-pulse" /> Live Channels
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {channels.map((channel) => (
          <button
            key={channel.id}
            onClick={() => onSelect(channel)}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-xl transition-all group text-left",
              activeChannel.id === channel.id 
                ? "bg-brand-surface-highlight border border-brand-primary/30 shadow-lg shadow-black/40" 
                : "hover:bg-white/5 border border-transparent"
            )}
          >
             {/* Logo / Icon */}
             <div className={cn(
               "w-10 h-10 rounded-lg flex items-center justify-center text-xl shadow-inner",
               activeChannel.id === channel.id ? "bg-black/40" : "bg-brand-surface-secondary"
             )}>
                {channel.logo}
             </div>

             {/* Info */}
             <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                   <span className={cn(
                     "font-bold text-sm truncate",
                     activeChannel.id === channel.id ? "text-white" : "text-brand-text-muted group-hover:text-white"
                   )}>
                     {channel.name}
                   </span>
                   {channel.isLive && (
                     <span className="flex items-center gap-1 text-[9px] font-black uppercase text-kenya-red tracking-wider">
                       <span className="w-1.5 h-1.5 rounded-full bg-kenya-red animate-pulse" /> Live
                     </span>
                   )}
                </div>
                
                <p className="text-[10px] text-brand-text-muted truncate mb-1 opacity-80">{channel.currentProgram}</p>
                
                <div className="flex items-center gap-2">
                   <span className={cn(
                     "text-[9px] px-1.5 py-0.5 rounded uppercase font-bold tracking-tight",
                     channel.category === 'Politics' && "bg-purple-500/10 text-purple-400",
                     channel.category === 'News' && "bg-blue-500/10 text-blue-400",
                     channel.category === 'Public Services' && "bg-kenya-green/10 text-kenya-green",
                     channel.category === 'Governance' && "bg-kenya-gold/10 text-kenya-gold"
                   )}>
                     {channel.category}
                   </span>
                   
                   {channel.isLive && (
                     <span className="flex items-center gap-1 text-[9px] text-brand-text-muted font-bold">
                        <Users className="w-3 h-3 text-brand-text-muted" /> {channel.viewerCount}
                     </span>
                   )}
                </div>
             </div>
          </button>
        ))}
      </div>
    </div>
  );
}
