"use client";

import React, { useRef, useState } from 'react';
import VideoPlayer from '@/components/stream/VideoPlayer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Share2, ThumbsUp, BarChart3, HelpCircle, BrainCircuit } from 'lucide-react';
import { DEMO_CHAT, DEMO_FACT_CHECKS } from '@/lib/demo-data';
import { SentimentMeter } from '@/components/live/SentimentMeter';
import { LivePolls } from '@/components/live/LivePolls';
import { TrustIndicator } from '@/components/trust/TrustIndicator';

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-6rem)]">
      
      {/* Main Content Area */}
      <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2">
        
        {/* Video Player & Overlays */}
        <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative group">
           <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
           
           {/* Overlays */}
           <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 text-xs font-bold uppercase rounded animate-pulse z-10">
             Live
           </div>
           
           <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10">
             <SentimentMeter />
           </div>
        </div>

        {/* Stream Info & Debate Pulse */}
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                     <h1 className="text-2xl font-bold">The State of the Nation: Youth Unemployment</h1>
                     <p className="text-brand-text-muted">Hosted by Min. of IC & Digital Economy • Started 25 mins ago</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                        <Share2 className="w-4 h-4 mr-2" /> Share
                    </Button>
                    <Button variant="secondary" size="sm">
                        <ThumbsUp className="w-4 h-4 mr-2" /> Like
                    </Button>
                </div>
            </div>

            {/* AI Debate Pulse (Summary) */}
            <Card className="bg-brand-surface border-purple-500/30">
                <CardHeader className="pb-2 border-b border-border/50">
                    <div className="flex items-center gap-2">
                         <BrainCircuit className="w-5 h-5 text-purple-400" />
                         <h3 className="font-bold text-purple-400 uppercase text-sm tracking-wide">AI Debate Pulse</h3>
                    </div>
                </CardHeader>
                <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-xs font-bold text-brand-text-muted uppercase mb-2">Current Argument (Gov)</h4>
                        <p className="text-sm font-medium">&quot;Digital hubs are the primary solution for rural unemployment, with 200k jobs created.&quot;</p>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-brand-text-muted uppercase mb-2">Key Rebuttal (Opposition)</h4>
                        <p className="text-sm font-medium text-brand-text-muted">&quot;Gig work is unstable. We need manufacturing jobs with benefits, not just short-term contracts.&quot;</p>
                    </div>
                </CardContent>
            </Card>

            {/* Live Fact Check Feed */}
            <div className="space-y-3">
                <h3 className="font-bold text-sm text-brand-text-muted uppercase">Live Fact-Checks</h3>
                {DEMO_FACT_CHECKS.map(check => (
                   <div key={check.id} className="bg-brand-surface-secondary border-l-4 border-kenya-gold p-3 rounded-r-lg">
                      <div className="flex justify-between items-start mb-2">
                          <span className="font-mono text-xs text-brand-text-muted">{check.timestamp}</span>
                          <TrustIndicator status={check.verdict} citations={check.citations} compact />
                      </div>
                      <p className="text-sm font-medium mb-1">&quot;{check.statement}&quot;</p>
                      <p className="text-xs text-brand-text-muted">{check.explanation}</p>
                   </div>
                ))}
            </div>
        </div>
      </div>

      {/* Sidebar: Interactive Tabs */}
      <div className="lg:col-span-1 flex flex-col bg-brand-surface-secondary rounded-2xl border border-border h-full overflow-hidden">
         
         {/* Tab Headers */}
         <div className="flex border-b border-border">
             <button 
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2
                    ${activeTab === 'chat' ? 'border-kenya-red text-brand-text' : 'border-transparent text-brand-text-muted hover:text-brand-text'}`}
             >
                <MessageSquare className="w-4 h-4" /> Chat
             </button>
             <button 
                onClick={() => setActiveTab('polls')}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2
                    ${activeTab === 'polls' ? 'border-kenya-gold text-brand-text' : 'border-transparent text-brand-text-muted hover:text-brand-text'}`}
             >
                <BarChart3 className="w-4 h-4" /> Polls
             </button>
             <button 
                onClick={() => setActiveTab('qa')}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2
                    ${activeTab === 'qa' ? 'border-blue-500 text-brand-text' : 'border-transparent text-brand-text-muted hover:text-brand-text'}`}
             >
                <HelpCircle className="w-4 h-4" /> Q&A
             </button>
         </div>

         {/* Tab Content */}
         <div className="flex-1 overflow-y-auto relative">
             {activeTab === 'chat' && (
                 <div className="absolute inset-0 flex flex-col">
                     <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {DEMO_CHAT.map((chat, i) => (
                            <div key={i} className="flex gap-2 items-start animate-in fade-in slide-in-from-bottom-2">
                                <div className={`w-6 h-6 rounded-full shrink-0 ${chat.color}`} />
                                <div>
                                    <p className="text-xs font-bold text-brand-text-muted">{chat.user}</p>
                                    <p className="text-sm">{chat.message}</p>
                                </div>
                            </div>
                        ))}
                     </div>
                     <div className="p-4 border-t border-border bg-brand-surface">
                         <div className="flex gap-2">
                             <input type="text" placeholder="Say something..." className="flex-1 bg-brand-surface-secondary rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-kenya-red" />
                         </div>
                     </div>
                 </div>
             )}

             {activeTab === 'polls' && (
                 <LivePolls />
             )}

             {activeTab === 'qa' && (
                 <div className="p-4 text-center text-brand-text-muted text-sm flex flex-col items-center justify-center h-full">
                     <HelpCircle className="w-8 h-8 mb-2 opacity-50" />
                     <p>Q&A session will open in 15 minutes.</p>
                 </div>
             )}
         </div>

      </div>
    </div>
  );
}
