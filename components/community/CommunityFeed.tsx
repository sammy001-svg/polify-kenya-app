"use client";

import { MOCK_REPORTS, GrassrootsReport, GrassrootsService } from "@/lib/grassroots-service";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp, MapPin, Clock, AlertTriangle, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useOnlineStatus } from "@/lib/pwa-manager";
import { ReportSkeleton } from "@/components/ui/SkeletonLoaders";

import { ResponseTimeline } from "./ResponseTimeline";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface CommunityFeedProps {
  filterCounty?: string;
}

export function CommunityFeed({ filterCounty }: CommunityFeedProps) {
  const [reports, setReports] = useState<GrassrootsReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const isOnline = useOnlineStatus();

  useEffect(() => {
    const fetched = filterCounty 
      ? GrassrootsService.getReportsByCounty(filterCounty)
      : MOCK_REPORTS;
    
    // Simulate initial load
    const timer = setTimeout(() => {
      setReports(fetched);
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
      setIsLoading(true); // Reset loading for next filter change
    };
  }, [filterCounty]);

  const handleVouch = async (id: string) => {
    await GrassrootsService.vouchForIssue(id);
    setReports(prev => prev.map(r => r.id === id ? { ...r, vouchCount: r.vouchCount + 1 } : r));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xl font-bold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-kenya-red" />
            Live Intelligence Feed
        </h3>
        <div className="flex gap-2">
           {!isOnline && (
              <Badge variant="outline" className="bg-amber-500/10 border-amber-500/20 text-amber-500 font-black text-[10px] uppercase gap-1">
                <WifiOff className="w-3 h-3" /> Offline Mode
              </Badge>
           )}
           <Badge variant="outline" className="bg-kenya-red/5 border-kenya-red/20 text-kenya-red font-black text-[10px] uppercase">
             {reports.filter(r => r.isHotspot).length} Hotspots
           </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <>
            <ReportSkeleton />
            <ReportSkeleton />
            <ReportSkeleton />
          </>
        ) : (
          reports.map((report) => (
            <Card key={report.id} className={cn(
              "bg-brand-surface border-white/5 transition-all group",
              report.isHotspot && "border-kenya-red/30 bg-kenya-red/5",
              report._offline && "border-amber-500/30 opacity-80",
              selectedReport === report.id && "border-kenya-red/50 ring-1 ring-kenya-red/20"
            )}>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge className={cn(
                        "text-[9px] font-black uppercase px-2 py-0.5",
                        report.category === 'Water' && "bg-blue-500",
                        report.category === 'Infrastructure' && "bg-kenya-gold",
                        report.category === 'Security' && "bg-kenya-red",
                        report.category === 'Environment' && "bg-green-500"
                      )}>
                        {report.category}
                      </Badge>
                      <span className="text-[10px] text-brand-text-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {new Date(report.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {report._offline && (
                         <span className="text-[9px] font-black text-amber-500 uppercase tracking-tighter ml-2">Pending Sync</span>
                      )}
                    </div>
                    <h4 className="font-bold text-lg text-white group-hover:text-kenya-red transition-colors">{report.title}</h4>
                    {report.reporter && (
                       <Link 
                          href={report.reporter.username.includes('@') ? `/creators/${report.reporter.username.replace('@', '').toLowerCase()}` : '#'}
                          className="flex items-center gap-1.5 pt-1 group/reporter"
                       >
                          <Avatar className="w-5 h-5 border border-white/10 group-hover/reporter:border-kenya-gold transition-colors">
                             <AvatarImage src={report.reporter.avatarUrl} />
                          </Avatar>
                          <span className="text-[10px] font-bold text-brand-text-muted group-hover/reporter:text-kenya-gold transition-colors">
                             {report.reporter.name}
                          </span>
                       </Link>
                    )}
                  </div>
                  
                  {report.isHotspot && (
                    <div className="flex items-center gap-1 text-[10px] font-black text-kenya-red bg-kenya-red/10 px-2 py-1 rounded uppercase animate-pulse">
                        <AlertTriangle className="w-3.5 h-3.5" /> High Urgency
                    </div>
                  )}
                </div>

                <p className="text-sm text-brand-text-muted mb-4 line-clamp-2 leading-relaxed">
                  {report.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-brand-text-muted font-bold">
                        <MapPin className="w-3.5 h-3.5" /> {report.location.ward}, {report.location.county}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-brand-text-muted font-bold">
                        <ThumbsUp className="w-3.5 h-3.5" /> {report.vouchCount} vouched
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleVouch(report.id)}
                        disabled={!isOnline}
                        className="h-8 text-[11px] font-black uppercase border-white/10 hover:bg-kenya-green/10 hover:text-kenya-green hover:border-kenya-green/30"
                    >
                        Vouch
                    </Button>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSelectedReport(selectedReport === report.id ? null : report.id)}
                        className={cn(
                           "h-8 text-[11px] font-black uppercase border-white/10",
                           selectedReport === report.id && "bg-brand-surface-highlight text-white border-white/20"
                        )}
                    >
                        {selectedReport === report.id ? 'Close' : 'Track'}
                    </Button>
                  </div>
                </div>

                {selectedReport === report.id && (
                   <div className="mt-6 pt-6 border-t border-white/5 animate-in slide-in-from-top-2 duration-300">
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted mb-4">Official Response Journey</h5>
                      <ResponseTimeline report={report} />
                   </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
