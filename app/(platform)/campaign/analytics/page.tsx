'use client';

import { MOCK_DEMOGRAPHICS, MOCK_WARDS } from '@/lib/analytics-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  BarChart3, 
  Map, 
  Users, 
  TrendingUp, 
  Activity
} from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsPage() {
  const totalVoters = MOCK_WARDS.reduce((acc, ward) => acc + ward.registeredVoters, 0);
  const avgTurnout = Math.round(MOCK_WARDS.reduce((acc, ward) => acc + ward.projectedTurnout, 0) / MOCK_WARDS.length);

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4 space-y-8">
       {/* Header */}
       <div className="flex items-center justify-between border-b border-border pb-6">
             <div className="flex items-center gap-4">
                <Link href="/campaign" className="p-2 hover:bg-brand-surface-secondary rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-brand-text-muted" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <BarChart3 className="w-6 h-6 text-kenya-green" />
                        Campaign Analytics
                    </h1>
                </div>
            </div>
            <Link href="/campaign/voters">
                <Button variant="outline" className="gap-2">
                    <Users className="w-4 h-4" /> View Voter Registry
                </Button>
            </Link>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border">
                <CardContent className="p-6 flex flex-col gap-2">
                    <span className="text-sm font-bold text-brand-text-muted uppercase flex items-center gap-2">
                        <Users className="w-4 h-4" /> Total Registered Voters
                    </span>
                    <span className="text-4xl font-black">{totalVoters.toLocaleString()}</span>
                    <span className="text-xs text-kenya-green font-bold">+2.4% from last month</span>
                </CardContent>
            </Card>
            <Card className="border-border">
                <CardContent className="p-6 flex flex-col gap-2">
                    <span className="text-sm font-bold text-brand-text-muted uppercase flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Projected Turnout
                    </span>
                    <span className="text-4xl font-black">{avgTurnout}%</span>
                    <span className="text-xs text-brand-text-muted">Based on historical data</span>
                </CardContent>
            </Card>
            <Card className="border-border">
                <CardContent className="p-6 flex flex-col gap-2">
                    <span className="text-sm font-bold text-brand-text-muted uppercase flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" /> Win Probability
                    </span>
                    <span className="text-4xl font-black text-kenya-green">68%</span>
                    <span className="text-xs text-brand-text-muted">Leading in 3/4 Wards</span>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ward Performance Heatmap */}
            <Card className="border-border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Map className="w-5 h-5" /> Ward Performance
                    </CardTitle>
                    <CardDescription>Support levels and key issues by ward</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {MOCK_WARDS.map((ward) => (
                            <div key={ward.id} className="flex items-center justify-between p-4 rounded-lg bg-brand-surface-secondary">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-lg">{ward.name}</h4>
                                        <Badge className={`${
                                            ward.supportLevel === 'Strong' ? 'bg-kenya-green' :
                                            ward.supportLevel === 'Leaning' ? 'bg-kenya-green/70' :
                                            ward.supportLevel === 'Swing' ? 'bg-kenya-orange' :
                                            'bg-kenya-red'
                                        } text-white border-none`}>
                                            {ward.supportLevel}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-brand-text-muted">
                                        {ward.registeredVoters.toLocaleString()} Voters • Top Issue: <span className="text-brand-text font-medium">{ward.topIssues[0]}</span>
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold">{ward.projectedTurnout}%</div>
                                    <div className="text-[10px] uppercase text-brand-text-muted">Turnout</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Demographics */}
            <Card className="border-border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" /> Demographics
                    </CardTitle>
                    <CardDescription>Voter distribution by age group</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="space-y-6">
                         {MOCK_DEMOGRAPHICS.map((demo) => (
                             <div key={demo.ageGroup} className="space-y-2">
                                 <div className="flex justify-between text-sm font-medium">
                                     <span>{demo.ageGroup} Years</span>
                                     <span>{demo.percentage}%</span>
                                 </div>
                                 <div className="h-4 w-full bg-brand-surface-secondary rounded-full overflow-hidden flex">
                                     <div 
                                        className="h-full bg-blue-500" 
                                        style={{ width: `${(demo.genderSplit.male / 100) * 100}%` }}
                                        title={`Male: ${demo.genderSplit.male}%`} 
                                     />
                                     <div 
                                        className="h-full bg-pink-500" 
                                        style={{ width: `${(demo.genderSplit.female / 100) * 100}%` }}
                                        title={`Female: ${demo.genderSplit.female}%`}
                                     />
                                 </div>
                                 <div className="flex justify-between text-[10px] text-brand-text-muted">
                                     <span>Male: {demo.genderSplit.male}%</span>
                                     <span>Female: {demo.genderSplit.female}%</span>
                                 </div>
                             </div>
                         ))}
                     </div>
                     <div className="mt-6 pt-4 border-t border-border flex justify-center gap-6 text-xs font-bold">
                         <div className="flex items-center gap-2">
                             <div className="w-3 h-3 bg-blue-500 rounded-full" /> Male
                         </div>
                         <div className="flex items-center gap-2">
                             <div className="w-3 h-3 bg-pink-500 rounded-full" /> Female
                         </div>
                     </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
