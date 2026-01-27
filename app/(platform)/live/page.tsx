"use client";

import React, { useRef, useState } from 'react';
import VideoPlayer from '@/components/stream/VideoPlayer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Share2, ThumbsUp, BarChart3, HelpCircle, BrainCircuit } from 'lucide-react';
import { DEMO_FACT_CHECKS } from '@/lib/demo-data';
import { SentimentMeter } from '@/components/live/SentimentMeter';
import { LivePolls } from '@/components/live/LivePolls';
import { LiveChat } from '@/components/live/LiveChat';
import { LiveQA } from '@/components/live/LiveQA';
import { TrustIndicator } from '@/components/trust/TrustIndicator';
import { cn } from "@/lib/utils";

const DUMMY_TOWN_HALL_ID = '00000000-0000-0000-0000-000000000000'; // Replace with real ID logic later

export default function TownHallPage() {
  const playerRef = useRef(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'polls' | 'qa'>('chat');

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    poster: '/placeholder-live.jpg',
    sources: [{
      src: 'https://vjs.zencdn.net/v/oceans.mp4',
      type: 'video/mp4'
    }]
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-6rem)]">
      
      {/* Main Content Area */}
      <div className="lg:col-span-3 flex flex-col gap-10 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
        
        {/* Video Player & Overlays */}
        <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative group border border-white/5">
           <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
           
           {/* Overlays */}
           <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full animate-pulse z-10 flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-white" />
             Live
           </div>
           
           <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10">
             <SentimentMeter />
           </div>
        </div>

        {/* Stream Info & Debate Pulse */}
        <div className="space-y-6 pb-12">
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                     <h1 className="text-3xl font-black tracking-tight">The State of the Nation: Youth Unemployment</h1>
                     <p className="text-brand-text-muted font-medium">Hosted by Ministry of ICT & Digital Economy • Started 25 mins ago</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" size="sm" className="rounded-full bg-white/5 border-white/10 hover:bg-white/10">
                        <Share2 className="w-4 h-4 mr-2" /> Share
                    </Button>
                    <Button variant="secondary" size="sm" className="rounded-full bg-white/5 border-white/10 hover:bg-white/10">
                        <ThumbsUp className="w-4 h-4 mr-2" /> 2.4K
                    </Button>
                </div>
            </div>

            {/* AI Debate Pulse (Summary) */}
            <Card className="bg-brand-surface-secondary/50 border-purple-500/20 backdrop-blur-sm">
                <CardHeader className="pb-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <BrainCircuit className="w-5 h-5 text-purple-400" />
                         </div>
                         <h3 className="font-black text-purple-400 uppercase text-xs tracking-widest">AI Debate Intelligence</h3>
                    </div>
                </CardHeader>
                <CardContent className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 border-l-2 border-kenya-green/30 pl-4">
                        <h4 className="text-[10px] font-black text-brand-text-muted uppercase tracking-wider mb-1">Current Stance (Pro)</h4>
                        <p className="text-sm font-bold text-white/90 leading-relaxed">&quot;Digital hubs are the primary solution for rural unemployment, with 200k jobs created through state-led digital literacy programs.&quot;</p>
                    </div>
                    <div className="space-y-2 border-l-2 border-kenya-red/30 pl-4">
                        <h4 className="text-[10px] font-black text-brand-text-muted uppercase tracking-wider mb-1">Key Critique (Alt View)</h4>
                        <p className="text-sm font-bold text-white/90 leading-relaxed">&quot;Gig work is unsustainable. We need structural manufacturing jobs with benefits, not just short-term micro-task contracts.&quot;</p>
                    </div>
                </CardContent>
            </Card>

            {/* Live Fact Check Feed */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h3 className="font-black text-xs text-brand-text-muted uppercase tracking-widest">Live Truth Layer</h3>
                    <div className="h-px flex-1 bg-white/5" />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {DEMO_FACT_CHECKS.map(check => (
                       <div key={check.id} className="bg-brand-surface-secondary border border-white/5 p-4 rounded-xl group hover:border-kenya-gold/30 transition-all">
                          <div className="flex justify-between items-start mb-3">
                              <span className="font-black text-[10px] px-2 py-0.5 rounded bg-black/40 text-brand-text-muted tabular-nums uppercase tracking-tighter">{check.timestamp}</span>
                              <TrustIndicator status={check.verdict} citations={check.citations} compact />
                          </div>
                          <p className="text-sm font-bold text-white/90 mb-2 leading-relaxed">&quot;{check.statement}&quot;</p>
                          <div className="flex gap-2 items-start opacity-70">
                             <div className="w-1 h-1 rounded-full bg-kenya-gold mt-1.5 shrink-0" />
                             <p className="text-xs text-brand-text-muted font-medium">{check.explanation}</p>
                          </div>
                       </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* Sidebar: Interactive Tabs */}
      <div className="lg:col-span-1 flex flex-col bg-brand-surface border border-white/5 rounded-3xl h-full overflow-hidden shadow-2xl relative">
         
         {/* Tab Headers */}
         <div className="flex border-b border-white/5 p-2 gap-1 bg-white/2">
             <button 
                onClick={() => setActiveTab('chat')}
                className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl transition-all
                    ${activeTab === 'chat' ? 'bg-kenya-red text-white shadow-lg shadow-kenya-red/20' : 'text-brand-text-muted hover:bg-white/5 hover:text-brand-text'}`}
             >
                <MessageSquare className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Chat</span>
             </button>
             <button 
                onClick={() => setActiveTab('polls')}
                className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl transition-all
                    ${activeTab === 'polls' ? 'bg-kenya-gold text-black shadow-lg shadow-kenya-gold/20' : 'text-brand-text-muted hover:bg-white/5 hover:text-brand-text'}`}
             >
                <BarChart3 className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Polls</span>
             </button>
             <button 
                onClick={() => setActiveTab('qa')}
                className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl transition-all
                    ${activeTab === 'qa' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-brand-text-muted hover:bg-white/5 hover:text-brand-text'}`}
             >
                <HelpCircle className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Q&A</span>
             </button>
         </div>

         {/* Tab Content */}
         <div className="flex-1 overflow-hidden relative">
             <div className={cn("absolute inset-0 transition-opacity duration-300", activeTab === 'chat' ? "opacity-100 z-10" : "opacity-0 invisible z-0")}>
                <LiveChat townhallId={DUMMY_TOWN_HALL_ID} />
             </div>

             <div className={cn("absolute inset-0 transition-opacity duration-300 overflow-y-auto", activeTab === 'polls' ? "opacity-100 z-10" : "opacity-0 invisible z-0")}>
                <LivePolls townhallId={DUMMY_TOWN_HALL_ID} />
             </div>

             <div className={cn("absolute inset-0 transition-opacity duration-300", activeTab === 'qa' ? "opacity-100 z-10" : "opacity-0 invisible z-0")}>
                <LiveQA townhallId={DUMMY_TOWN_HALL_ID} />
             </div>
         </div>

      </div>
    </div>
  );
}

