import React from 'react';
import { VoterStats } from '@/components/iebc/VoterStats';
import { RegistrationCentres } from '@/components/iebc/RegistrationCentres';
import { NewsAndJobs } from '@/components/iebc/NewsAndJobs';
import { AIAnalyst } from '@/components/iebc/AIAnalyst';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function IEBCPage() {
  return (
    <div className="min-h-screen space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black bg-linear-to-r from-kenya-red via-white to-kenya-green bg-clip-text text-transparent w-fit">
          IEBC Transparency Portal
        </h1>
        <p className="text-brand-text-muted max-w-2xl">
          Access real-time voter statistics, locate registration centres, and stay updated with the latest news and opportunities from the Independent Electoral and Boundaries Commission.
        </p>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 mb-6">
          <TabsTrigger value="dashboard">Dashboard Overview</TabsTrigger>
          <TabsTrigger value="intelligence">IEBC AI Analyst</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-8">
            {/* Stats Overview */}
            <VoterStats />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Registration Centres (Takes up 2 cols) */}
                <div className="lg:col-span-2">
                    <RegistrationCentres />
                </div>

                {/* Right Column: News & Jobs (Takes up 1 col) */}
                <div className="lg:col-span-1">
                    <NewsAndJobs />
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
                        <h3 className="font-semibold text-brand-text mb-2">About IEBC AI</h3>
                        <div className="text-sm text-brand-text-muted leading-relaxed">
                            Our AI Analyst uses real-time data from the IEBC portal to provide instant insights.
                            <br/><br/>
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
