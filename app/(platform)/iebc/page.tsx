import { VoterStats } from "@/components/iebc/VoterStats";
import { RegistrationCentres } from "@/components/iebc/RegistrationCentres";
import { NewsAndJobs } from "@/components/iebc/NewsAndJobs";
import { AIAnalyst } from "@/components/iebc/AIAnalyst";
import { ElectionTimeline } from "@/components/iebc/ElectionTimeline";
import { VoterEducation } from "@/components/iebc/VoterEducation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Info, MapPin } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IEBC E-Portal | PoliFy Kenya",
  description: "Real-time tracking of voter registration, electoral roadmaps, and boundary delimitation.",
};

export default function IEBCPage() {
  return (
    <div className="min-h-screen space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-kenya-green" />
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">
              Certified IEBC Intelligence Portal
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white leading-none">
            IEBC <span className="text-brand-primary">E-PORTAL</span>
          </h1>
          <p className="text-brand-text-muted max-w-2xl font-medium">
            Real-time tracking of voter registration, electoral roadmaps, and
            boundary delimitation. Empowering your vote with data transparency.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-white/10 hover:bg-white/5 text-white gap-2 font-bold text-xs uppercase tracking-widest px-6 h-11 rounded-2xl"
          >
            <Info className="w-4 h-4" /> Voter Verification
          </Button>
          <Button className="bg-brand-primary text-black hover:bg-brand-primary/90 gap-2 font-black text-xs uppercase tracking-widest px-6 h-11 rounded-2xl shadow-xl shadow-brand-primary/20">
            <MapPin className="w-4 h-4" /> Register Now
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <div className="overflow-x-auto no-scrollbar pb-2">
          <TabsList className="bg-white/5 border border-white/10 p-1 rounded-2xl h-auto flex gap-1 w-fit min-w-full md:w-auto">
            <TabsTrigger
              value="dashboard"
              className="rounded-xl px-6 py-2.5 data-[state=active]:bg-brand-primary data-[state=active]:text-black text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap"
            >
              National Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="roadmap"
              className="rounded-xl px-6 py-2.5 data-[state=active]:bg-brand-primary data-[state=active]:text-black text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap"
            >
              Electoral Roadmap
            </TabsTrigger>
            <TabsTrigger
              value="intelligence"
              className="rounded-xl px-6 py-2.5 data-[state=active]:bg-brand-primary data-[state=active]:text-black text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap"
            >
              IEBC AI Analytics
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="dashboard"
          className="space-y-8 animate-in slide-in-from-bottom-4 duration-700"
        >
          {/* Stats Overview */}
          <VoterStats />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Education and Centres (Takes up 2 cols) */}
            <div className="lg:col-span-2 space-y-10">
              <VoterEducation />
              <RegistrationCentres />
            </div>

            {/* Right Column: News & Jobs (Takes up 1 col) */}
            <div className="lg:col-span-1">
              <NewsAndJobs />
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="roadmap"
          className="animate-in slide-in-from-bottom-4 duration-700"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ElectionTimeline />
            </div>
            <div className="lg:col-span-1">
              <Card className="bg-brand-surface border-white/5">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Boundary Review 2026
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-brand-text-muted leading-relaxed">
                    IEBC is constitutionally mandated to review constituency and
                    ward boundaries every 8-12 years.
                  </p>
                  <div className="p-4 rounded-xl bg-kenya-red/10 border border-kenya-red/20">
                    <p className="text-xs font-black uppercase tracking-widest text-kenya-red mb-1">
                      Status
                    </p>
                    <p className="text-sm font-bold text-white">
                      Public Participation Stage
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest"
                  >
                    View Proposed Maps
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="intelligence">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AIAnalyst />
            </div>
            <div className="lg:col-span-1">
              <div className="p-4 rounded-xl bg-brand-surface border border-white/5">
                <h3 className="font-semibold text-brand-text mb-2">
                  About IEBC AI
                </h3>
                <div className="text-sm text-brand-text-muted leading-relaxed">
                  Our AI Analyst uses real-time data from the IEBC portal to
                  provide instant insights.
                  <br />
                  <br />
                  You can ask questions like:
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-1 text-xs">
                    <li>&quot;How many registered voters are there?&quot;</li>
                    <li>&quot;Where are the registration centres?&quot;</li>
                    <li>&quot;Are there any job vacancies?&quot;</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
