/* cSpell:ignore PoliFy maandamano watchdog */
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { 
  ShieldCheck, 
  MessageSquare, 
  Camera, 
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Report {
  id: string;
  status_report: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  created_at: string;
  profiles: { full_name: string } | null;
}

interface ProjectWatchdogProps {
  projectId: string;
  projectTitle: string;
}

export function ProjectWatchdog({ projectId, projectTitle }: ProjectWatchdogProps) {
  const [reports, setReports] = useState<Report[]>([]);
  const [newReport, setNewReport] = useState("");
  const [sentiment, setSentiment] = useState<'Positive' | 'Neutral' | 'Negative'>('Neutral');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    fetchUser();

    // Fetch initial reports
    const fetchReports = async () => {
      const { data } = await supabase
        .from('project_reports')
        .select(`
          id,
          status_report,
          sentiment,
          created_at,
          profiles (full_name)
        `)
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });
      
      if (data) {
        setReports(data.map(r => ({
           ...r,
           profiles: Array.isArray(r.profiles) ? r.profiles[0] : r.profiles
        })) as Report[]);
      }
    };
    fetchReports();

    // Subscribe to new reports
    const channel = supabase
      .channel(`project_reports:${projectId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'project_reports', filter: `project_id=eq.${projectId}` },
        async (payload) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', payload.new.user_id)
            .single();
          
          setReports(prev => [{
            ...payload.new,
            profiles: profile
          } as Report, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, supabase]);

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReport.trim() || !userId) return;

    setLoading(true);
    const { error } = await supabase
      .from('project_reports')
      .insert({
        project_id: projectId,
        user_id: userId,
        status_report: newReport,
        sentiment: sentiment
      });

    if (!error) {
      setNewReport("");
      setSentiment('Neutral');
    }
    setLoading(false);
  };

  const veracityScore = reports.length > 0 
    ? Math.round((reports.filter(r => r.sentiment !== 'Negative').length / reports.length) * 100) 
    : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Veracity & Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-brand-surface border-border overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
               <ShieldCheck className="w-4 h-4 text-kenya-green" /> Community Veracity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-end justify-between">
                <span className="text-4xl font-black">{veracityScore}%</span>
                <span className="text-xs text-brand-text-muted font-bold uppercase">Community Verified</span>
             </div>
             <Progress value={veracityScore} className="h-2 bg-brand-surface-secondary" />
             <p className="text-[10px] text-brand-text-muted leading-relaxed">
               Based on {reports.length} community reports. Higher scores indicate community confirmation of project status.
             </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-surface border-border flex flex-col justify-center p-6">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                 <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                 <h4 className="text-sm font-bold">Watchdog Activity</h4>
                 <p className="text-2xl font-black">{reports.length}</p>
                 <p className="text-[10px] text-brand-text-muted font-bold uppercase">Reports submitted</p>
              </div>
           </div>
        </Card>
      </div>

      {/* Submission Form */}
      <Card className="bg-brand-surface border-brand-primary/30 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-brand-primary" /> Submit a Watchdog Report for {projectTitle}
          </CardTitle>
          <CardDescription>Are you at the site? What is the current status?</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitReport} className="space-y-4">
            <textarea 
              value={newReport}
              onChange={(e) => setNewReport(e.target.value)}
              placeholder="Describe the current status... (e.g., 'Work is ongoing, workers are on site', 'Site is abandoned')"
              className="w-full h-24 bg-brand-surface-secondary border border-border rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all"
              disabled={!userId}
            />
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                 <span className="text-xs font-bold text-brand-text-muted mr-2">Status Sentiment:</span>
                 <button 
                  type="button"
                  onClick={() => setSentiment('Positive')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${sentiment === 'Positive' ? 'bg-kenya-green text-black' : 'bg-brand-surface-highlight text-brand-text'}`}
                 >
                   <ThumbsUp className="w-3 h-3" /> Progress
                 </button>
                 <button 
                  type="button"
                  onClick={() => setSentiment('Neutral')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${sentiment === 'Neutral' ? 'bg-kenya-gold text-black' : 'bg-brand-surface-highlight text-brand-text'}`}
                 >
                   Observation
                 </button>
                 <button 
                  type="button"
                  onClick={() => setSentiment('Negative')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${sentiment === 'Negative' ? 'bg-kenya-red text-white' : 'bg-brand-surface-highlight text-brand-text'}`}
                 >
                   <ThumbsDown className="w-3 h-3" /> Stalled/Issue
                 </button>
              </div>
              
              <Button 
                type="submit" 
                disabled={!newReport.trim() || !userId || loading}
                className="bg-brand-primary hover:bg-brand-primary/90 text-white font-bold h-10 px-6 rounded-full"
              >
                {loading ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
            {!userId && <p className="text-[10px] text-brand-text-muted italic text-center">Login to submit watchdog reports.</p>}
          </form>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <div className="space-y-4">
         <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-brand-text-muted" /> Watchdog Activity Feed
         </h3>
         
         {reports.length === 0 ? (
            <div className="text-center py-12 bg-white/5 rounded-2xl border border-dashed border-border">
               <Camera className="w-8 h-8 mx-auto mb-2 opacity-20" />
               <p className="text-sm text-brand-text-muted italic">No community reports yet. Be the first to verify!</p>
            </div>
         ) : (
            <div className="space-y-3">
               {reports.map((report) => (
                  <div key={report.id} className="bg-brand-surface border border-border p-4 rounded-xl flex gap-4">
                     <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-brand-primary underline">
                                {report.profiles?.full_name || 'Verified Citizen'}
                              </span>
                              <Badge className={`text-[9px] font-black uppercase h-5 ${
                                report.sentiment === 'Positive' ? 'bg-kenya-green/10 text-kenya-green border-kenya-green/20' :
                                report.sentiment === 'Negative' ? 'bg-kenya-red/10 text-kenya-red border-kenya-red/20' :
                                'bg-kenya-gold/10 text-kenya-gold border-kenya-gold/20'
                              }`}>
                                {report.sentiment}
                              </Badge>
                           </div>
                           <span className="text-[10px] text-brand-text-muted font-bold">
                              {new Date(report.created_at).toLocaleDateString()}
                           </span>
                        </div>
                        <p className="text-sm leading-relaxed text-brand-text">
                           {report.status_report}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
    </div>
  );
}
