import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, Radio, FileText, BarChart3, ShieldCheck, BadgeCheck, TrendingUp, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { DEMO_UPLOADS } from "@/lib/demo-data";

export default function StudioDashboard() {
  return (
    <div className="space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Studio Command Center</h1>
          <p className="text-brand-text-muted flex items-center gap-2">
            Welcome back, Hon. Representative 
            <span className="flex items-center text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full text-xs font-bold gap-1">
                <BadgeCheck className="w-3 h-3" /> Verified Channel
            </span>
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/studio/upload">
            <Button className="bg-white text-black hover:bg-gray-200">
                <UploadCloud className="mr-2 w-4 h-4" />
                Upload Policy
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
                     <div className="text-2xl font-bold flex items-center gap-2">
                        64% <span className="text-sm font-normal text-kenya-green">Positive</span>
                     </div>
                     <p className="text-xs text-brand-text-muted">Based on last 3 uploads</p>
                </div>
                <div className="text-right">
                    <div className="text-sm font-bold text-red-500">12% Neg</div>
                </div>
            </div>
            {/* Sentiment Bar */}
            <div className="w-full h-2 bg-brand-surface-secondary rounded-full overflow-hidden flex">
                <div className="h-full bg-kenya-green transition-all" style={{ width: '64%' }}></div>
                <div className="h-full bg-gray-500 transition-all" style={{ width: '24%' }}></div>
                <div className="h-full bg-red-500 transition-all" style={{ width: '12%' }}></div>
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
                <div className="p-3 bg-brand-surface-secondary rounded-lg">
                    <p className="text-xs text-brand-text-muted mb-1 uppercase tracking-wider">Health</p>
                    <p className="font-bold">#NHIFChanges</p>
                    <p className="text-xs text-kenya-green mt-1">+24% Engagement</p>
                </div>
                <div className="p-3 bg-brand-surface-secondary rounded-lg">
                    <p className="text-xs text-brand-text-muted mb-1 uppercase tracking-wider">Infrastructure</p>
                    <p className="font-bold">#GreenParkSafety</p>
                    <p className="text-xs text-kenya-green mt-1">+18% Engagement</p>
                </div>
                <div className="p-3 bg-brand-surface-secondary rounded-lg">
                    <p className="text-xs text-brand-text-muted mb-1 uppercase tracking-wider">Education</p>
                    <p className="font-bold">#CBCReview</p>
                    <p className="text-xs text-brand-text-muted mt-1">Steady</p>
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
             <div className="space-y-4">
                {DEMO_UPLOADS.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-brand-surface-secondary rounded-lg">
                        <div className="flex items-center gap-4">
                            <Image 
                              src={item.thumbnail} 
                              alt={item.title} 
                              width={64} 
                              height={36} 
                              className="rounded object-cover" 
                            />
                            <div>
                                <p className="font-semibold">{item.title}</p>
                                <p className="text-xs text-brand-text-muted">Published • {item.date}</p>
                            </div>
                        </div>
                        <div className="text-sm font-medium">{item.views} Views</div>
                    </div>
                ))}
             </div>
          </CardContent>
      </Card>
    </div>
  );
}
