import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Radio, FileText, BarChart3, ShieldCheck, BadgeCheck, TrendingUp, ThumbsUp, Sparkles } from "lucide-react";
import Image from "next/image";
import { DEMO_UPLOADS } from "@/lib/demo-data";

export default function StudioDashboard() {
  return (
    <div className="space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-1">Studio Command Center</h1>
          <p className="text-brand-text-muted flex items-center gap-2">
            Welcome back, Hon. Representative 
            <span className="flex items-center text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full text-xs font-bold gap-1">
                <BadgeCheck className="w-3 h-3" /> Verified Channel
            </span>
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/studio/upload">
            <Button className="bg-kenya-gold text-black hover:bg-white font-black uppercase tracking-widest text-xs">
              <Sparkles className="w-4 h-4 mr-2" /> Start Creation
            </Button>
          </Link>
          <Link href="/studio/live">
            <Button variant="danger" className="animate-pulse">
                <Radio className="mr-2 w-4 h-4" />
                Go Live Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <BarChart3 className="h-4 w-4 text-brand-text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2K</div>
            <p className="text-xs text-brand-text-muted">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trust Score</CardTitle>
            <ShieldCheck className="h-4 w-4 text-kenya-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-kenya-green">92/100</div>
            <p className="text-xs text-brand-text-muted">High verification status</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Petitions</CardTitle>
            <FileText className="h-4 w-4 text-brand-text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">1 requiring response</div>
            <p className="text-xs text-brand-text-muted">&quot;Fix Green Park Terminus&quot;</p>
          </CardContent>
        </Card>

        {/* Sentiment Analysis Widget */}
        <Card className="bg-brand-surface border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Public Sentiment</CardTitle>
            <ThumbsUp className="h-4 w-4 text-kenya-green" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between mb-2">
                <div>
                     <div className="text-2xl font-black flex items-center gap-2 text-white">
                        64% <span className="text-[10px] font-black uppercase tracking-widest text-kenya-green bg-kenya-green/10 px-2 py-0.5 rounded">Positive</span>
                     </div>
                     <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted mt-1">Last 3 uploads</p>
                </div>
                <div className="text-right">
                    <div className="text-[10px] font-black uppercase tracking-widest text-kenya-red bg-kenya-red/10 px-2 py-0.5 rounded">12% Neg</div>
                </div>
            </div>
            {/* Sentiment Bar */}
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden flex gap-0.5 mt-4">
                <div className="h-full bg-kenya-green transition-all" style={{ width: '64%' }}></div>
                <div className="h-full bg-white/20 transition-all" style={{ width: '24%' }}></div>
                <div className="h-full bg-kenya-red transition-all" style={{ width: '12%' }}></div>
            </div>
          </CardContent>
        </Card>

        {/* Issue Traction Widget */}
        <Card className="bg-brand-surface border-border md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issue Traction (Trending)</CardTitle>
            <TrendingUp className="h-4 w-4 text-kenya-gold" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-black/20 rounded-xl border border-white/5 hover:border-kenya-gold/20 transition-all group">
                    <p className="text-[10px] text-brand-text-muted mb-2 uppercase tracking-widest font-black">Health</p>
                    <p className="font-bold text-white mb-1">#NHIFChanges</p>
                    <p className="text-[10px] font-black text-kenya-green uppercase tracking-widest">+24% Eng</p>
                </div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5 hover:border-kenya-gold/20 transition-all group">
                    <p className="text-[10px] text-brand-text-muted mb-2 uppercase tracking-widest font-black">Infra</p>
                    <p className="font-bold text-white mb-1">#GreenParkSafety</p>
                    <p className="text-[10px] font-black text-kenya-green uppercase tracking-widest">+18% Eng</p>
                </div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5 hover:border-kenya-gold/20 transition-all group">
                    <p className="text-[10px] text-brand-text-muted mb-2 uppercase tracking-widest font-black">Education</p>
                    <p className="font-bold text-white mb-1">#CBCReview</p>
                    <p className="text-[10px] font-black text-brand-text-muted uppercase tracking-widest">Steady</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Content Table (Visual Mockup) */}
      <Card className="bg-brand-surface border-border">
          <CardHeader>
            <CardTitle>Recent Content</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-3">
                {DEMO_UPLOADS.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5 hover:bg-black/30 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="relative w-20 h-11 shrink-0 rounded-lg overflow-hidden border border-white/10">
                                <Image 
                                  src={item.thumbnail} 
                                  alt={item.title} 
                                  fill
                                  className="object-cover" 
                                />
                            </div>
                            <div>
                                <p className="font-bold text-white text-sm line-clamp-1">{item.title}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted mt-1">Published • {item.date}</p>
                            </div>
                        </div>
                        <div className="text-xs font-black uppercase tracking-widest text-white bg-white/5 px-3 py-1.5 rounded-full">{item.views} Views</div>
                    </div>
                ))}
             </div>
          </CardContent>
      </Card>
    </div>
  );
}
