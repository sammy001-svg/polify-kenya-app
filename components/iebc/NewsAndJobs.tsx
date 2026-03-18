"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Briefcase, FileText, Calendar, ChevronRight, Clock, AlertCircle } from 'lucide-react';
import { mockNews, mockJobs, NewsItem } from '@/data/iebc-data';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function NewsAndJobs() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [livePulse, setLivePulse] = useState(false);

  // Simulate real-time fetching pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePulse(true);
      setTimeout(() => setLivePulse(false), 2000);
    }, 15000); // Pulse every 15s to show it's actively checking for new IEBC updates
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* News Section */}
      <Card className="bg-brand-surface border-white/5 relative overflow-hidden shadow-xl">
        <CardHeader className="pb-3 border-b border-white/5 flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-black italic tracking-tight text-white">
             <FileText className="h-5 w-5 text-brand-primary" />
             LATEST <span className="text-brand-primary">NEWS</span>
          </CardTitle>
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-kenya-red/10 border border-kenya-red/20 shadow-lg shadow-kenya-red/5">
              <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full rounded-full bg-kenya-red opacity-75 ${livePulse ? 'animate-ping' : ''}`}></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-kenya-red"></span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-kenya-red">Live Feed</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          {mockNews.map((item) => (
            <div 
              key={item.id} 
              className="group cursor-pointer p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-brand-primary/20 transition-all duration-300" 
              onClick={() => setSelectedNews(item)}
            >
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-brand-primary/30 text-brand-primary bg-brand-primary/5">
                  {item.category}
                </Badge>
                <div className="flex items-center text-[10px] text-brand-text-muted gap-1 font-medium bg-black/30 px-2 py-0.5 rounded-md">
                    <Clock className="w-3 h-3 text-brand-primary" />
                    <span>{item.date}</span>
                </div>
              </div>
              <h4 className="font-bold text-white group-hover:text-brand-primary transition-colors text-sm line-clamp-2 leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-brand-text-muted mt-1.5 line-clamp-2 leading-relaxed">
                {item.summary}
              </p>
            </div>
          ))}
          <Button variant="outline" className="w-full mt-2 text-xs font-bold uppercase tracking-widest text-brand-text hover:text-white border-white/10 hover:bg-white/5 h-10 rounded-xl">
            View All News <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardContent>
      </Card>

      {/* Jobs Section */}
      <Card className="bg-brand-surface border-white/5 shadow-xl">
        <CardHeader className="pb-3 border-b border-white/5">
          <CardTitle className="flex items-center gap-2 text-lg font-black italic tracking-tight text-white">
             <Briefcase className="h-5 w-5 text-kenya-green" />
             CAREER <span className="text-kenya-green">OPPORTUNITIES</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-4">
          {mockJobs.map((job) => (
            <div key={job.id} className="flex items-start justify-between p-3 rounded-xl bg-black/20 border border-white/5 hover:border-kenya-green/30 hover:bg-kenya-green/5 transition-all group cursor-pointer">
              <div>
                <h4 className="font-bold text-white text-sm group-hover:text-kenya-green transition-colors">{job.title}</h4>
                <div className="text-[11px] font-medium text-brand-text-muted mt-1.5 flex flex-wrap gap-2 items-center">
                    <span className="bg-white/5 px-2 py-0.5 rounded text-white/90">{job.department}</span>
                    <span className="hidden sm:inline text-white/20">•</span>
                    <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3 text-kenya-red/80" /> Deadline: {job.deadline}</span>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-brand-text-muted group-hover:text-kenya-green group-hover:bg-kenya-green/10 rounded-lg shrink-0 transition-colors">
                 <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Detailed News Modal */}
      <Dialog open={!!selectedNews} onOpenChange={(open) => !open && setSelectedNews(null)}>
        <DialogContent className="sm:max-w-xl bg-brand-surface border-white/10 text-brand-text p-0 overflow-hidden rounded-2xl shadow-2xl">
          {selectedNews && (
            <>
              <div className="bg-linear-to-b from-brand-primary/20 to-brand-primary/5 border-b border-brand-primary/20 p-6 flex flex-col gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_50%)]" />
                <div className="absolute -right-6 -top-6 opacity-10 rotate-12">
                   <FileText className="w-40 h-40 text-brand-primary" />
                </div>
                
                <div className="flex justify-between items-start relative z-10">
                  <Badge className="text-[10px] font-black uppercase tracking-widest bg-brand-primary text-black hover:bg-brand-primary/90 rounded-md">
                    {selectedNews.category}
                  </Badge>
                  <div className="flex items-center text-[11px] font-bold text-brand-text-muted gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 shadow-inner backdrop-blur-sm">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kenya-red opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-kenya-red"></span>
                      </span>
                      Live Sync • {selectedNews.date}
                  </div>
                </div>
                
                <DialogTitle className="text-xl sm:text-3xl font-black text-white leading-tight relative z-10 mt-2 pr-4 tracking-tight">
                  {selectedNews.title}
                </DialogTitle>
              </div>

              <div className="p-6 pt-5">
                <div className="prose prose-sm prose-invert max-w-none">
                  <p className="text-[15px] sm:text-base text-brand-text-muted leading-relaxed font-medium">
                    {selectedNews.content || selectedNews.summary}
                  </p>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row justify-between sm:items-center bg-black/30 p-4 rounded-xl border border-white/5 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30">
                      <FileText className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">Source Authenticity</p>
                      <p className="text-sm font-bold text-white">Official IEBC Press Office</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    className="h-9 px-4 text-[10px] font-black uppercase tracking-widest text-white border-white/10 hover:bg-white/5 rounded-lg gap-2 shrink-0 transition-colors"
                  >
                    Download Full Memo <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
