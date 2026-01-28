"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Share2, ThumbsUp, BrainCircuit } from 'lucide-react';
import { SentimentMeter } from '@/components/live/SentimentMeter';
import { LivePolls } from '@/components/live/LivePolls';
import { LiveChat } from '@/components/live/LiveChat';
import { LiveQA } from '@/components/live/LiveQA';
import { ChannelSelector } from '@/components/live/ChannelSelector';
import { KENYAN_MEDIA_CHANNELS, MediaChannel } from '@/lib/media-data';
import { cn } from "@/lib/utils";

export default function TownHallPage() {
  const [activeTab, setActiveTab] = useState<'chat' | 'polls' | 'qa'>('chat');
  const [currentChannel, setCurrentChannel] = useState<MediaChannel>(KENYAN_MEDIA_CHANNELS[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-6rem)]">
      
      {/* Sidebar: Channel Selector (Left on large screens) */}
      <div className="lg:col-span-1 hidden lg:block overflow-hidden h-full">
         <ChannelSelector 
            channels={KENYAN_MEDIA_CHANNELS} 
            activeChannel={currentChannel} 
            onSelect={setCurrentChannel} 
         />
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-hide h-full">
        
        {/* Video Player & Overlays */}
        <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative group border border-white/5 shrink-0">
           {/* Replace VideoJS with simple Iframe for YouTube Live Demo reliability */}
           <iframe 
             width="100%" 
             height="100%" 
             src={`${currentChannel.streamUrl}?autoplay=1&mute=1&controls=1`} 
             title={currentChannel.name} 
             frameBorder="0" 
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
             allowFullScreen
             className="absolute inset-0 w-full h-full object-cover"
           />
           
           {/* Overlays */}
           <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
              <div className="bg-red-600 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full animate-pulse flex items-center gap-2 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Live
              </div>
              <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/10">
                 {currentChannel.name}
              </div>
           </div>
           
           <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
             <SentimentMeter />
           </div>
        </div>

        {/* Stream Info & Debate Pulse */}
        <div className="space-y-4 pb-12">
            <div className="bg-brand-surface border border-white/5 p-4 rounded-2xl">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                         <h1 className="text-xl md:text-2xl font-black tracking-tight leading-none">{currentChannel.currentProgram}</h1>
                         <p className="text-brand-text-muted text-sm font-medium flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-brand-primary" /> 
                             {currentChannel.category} • {currentChannel.viewerCount} watching
                         </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="secondary" size="sm" className="rounded-full bg-white/5 border-white/10 hover:bg-white/10">
                            <Share2 className="w-4 h-4 mr-2" /> Share
                        </Button>
                        <Button variant="secondary" size="sm" className="rounded-full bg-white/5 border-white/10 hover:bg-white/10">
                            <ThumbsUp className="w-4 h-4 mr-2" /> Like
                        </Button>
                    </div>
                </div>
            </div>

            {/* AI Debate Pulse (Summary) */}
            <Card className="bg-brand-surface-secondary/50 border-purple-500/20 backdrop-blur-sm">
                <CardHeader className="pb-3 border-b border-white/5 py-3">
                    <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <BrainCircuit className="w-3.5 h-3.5 text-purple-400" />
                         </div>
                         <h3 className="font-black text-purple-400 uppercase text-[10px] tracking-widest">AI Context Engine</h3>
                    </div>
                </CardHeader>
                <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1 border-l-2 border-kenya-green/30 pl-3">
                        <h4 className="text-[9px] font-black text-brand-text-muted uppercase tracking-wider mb-1">Live Topic Analysis</h4>
                        <p className="text-xs font-bold text-white/90 leading-relaxed">Discussion centered on {currentChannel.category} reforms. Public sentiment is currently trending positive (62%).</p>
                    </div>
                    <div className="space-y-1 border-l-2 border-kenya-red/30 pl-3">
                        <h4 className="text-[9px] font-black text-brand-text-muted uppercase tracking-wider mb-1">Fact Check Alert</h4>
                        <p className="text-xs font-bold text-white/90 leading-relaxed">No false claims detected in the last 15 minutes of broadcast.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>

      {/* Sidebar: Interactive Tabs (Right) */}
      <div className="lg:col-span-1 flex flex-col bg-brand-surface border border-white/5 rounded-2xl h-full overflow-hidden shadow-2xl relative">
         {/* Tab Headers */}
         <div className="flex border-b border-white/5 p-1 gap-1 bg-black/20">
             <button 
                onClick={() => setActiveTab('chat')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest",
                  activeTab === 'chat' ? "bg-brand-surface-highlight text-white border border-white/10" : "text-brand-text-muted hover:text-white"
                )}
             >
                <MessageSquare className="w-3.5 h-3.5" /> Chat
             </button>
             {/* ... other tabs simplified for this view ... */}
             <button 
                onClick={() => setActiveTab('polls')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest",
                  activeTab === 'polls' ? "bg-brand-surface-highlight text-white border border-white/10" : "text-brand-text-muted hover:text-white"
                )}
             >
                Live Polls
             </button>
         </div>

         {/* Tab Content */}
         <div className="flex-1 overflow-hidden relative">
             <div className={cn("absolute inset-0 transition-opacity duration-300", activeTab === 'chat' ? "opacity-100 z-10" : "opacity-0 invisible z-0")}>
                <LiveChat townhallId={currentChannel.id} />
             </div>

             <div className={cn("absolute inset-0 transition-opacity duration-300 overflow-y-auto", activeTab === 'polls' ? "opacity-100 z-10" : "opacity-0 invisible z-0")}>
                <LivePolls townhallId={currentChannel.id} />
             </div>

             <div className={cn("absolute inset-0 transition-opacity duration-300", activeTab === 'qa' ? "opacity-100 z-10" : "opacity-0 invisible z-0")}>
                <LiveQA townhallId={currentChannel.id} />
             </div>
         </div>
      </div>
      
      {/* Mobile Channel Selector Drawer (could be added later, for now hidden on mobile) */}
    </div>
  );
}

