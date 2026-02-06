"use client";

import { useEffect, useState, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getResults, simulateIncomingVotes, getTurnoutStats, getPartyDistribution, getRegionalBreakdown, getProjections, CandidateResult, TallyStats, TurnoutStats, PartyDistributionData, RegionalBreakdownData } from "@/actions/tallying";
import { ResultCard } from "./ResultCard";
import { TurnoutCard } from "./TurnoutCard";
import { PartyDistributionChart } from "./PartyDistributionChart";
import { CountyMap } from "./CountyMap";
import { TallyReportGenerator } from "./TallyReportGenerator";
import { Loader2, RefreshCcw, TrendingUp, BarChart3, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveTicker } from "./LiveTicker";
import { ReportingProgress } from "./ReportingProgress";
import { AILogConsole } from "./AILogConsole";
import { ComplianceTracker } from "./ComplianceTracker";
import { AuditVault } from "./AuditVault";
import { DiscrepancyCentre } from "./DiscrepancyCentre";
import { createClient } from "@/lib/supabase";
import { Toaster } from "sonner";

export function TallyDashboard() {
    const [level, setLevel] = useState<'national' | 'county' | 'constituency' | 'ward'>('national');
    const [locationName, setLocationName] = useState<string>('Kenya');
    
    const [results, setResults] = useState<CandidateResult[]>([]);
    const [stats, setStats] = useState<TallyStats | null>(null);
    const [turnout, setTurnout] = useState<TurnoutStats | null>(null);
    const [partyData, setPartyData] = useState<PartyDistributionData[]>([]);
    const [regionalData, setRegionalData] = useState<RegionalBreakdownData[]>([]);
    
    const [loading, setLoading] = useState(true);
    const [simulating, setSimulating] = useState(false);
    const [showProjections, setShowProjections] = useState(false);
    const [activeView, setActiveView] = useState<'tally' | 'audit' | 'conflicts'>('tally');
    
    const supabase = createClient();

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [resData, turnoutData, partyStats, regData] = await Promise.all([
                showProjections && level === 'national' ? getProjections().then(r => ({ results: r, stats })) : getResults(level, locationName),
                getTurnoutStats(level, locationName),
                getPartyDistribution(level, locationName),
                getRegionalBreakdown(level)
            ]);

            setResults(resData.results);
            if (resData.stats) setStats(resData.stats);
            setTurnout(turnoutData);
            setPartyData(partyStats);
            setRegionalData(regData);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    }, [level, locationName, showProjections, stats]);

    useEffect(() => {
        fetchData();
        
        // REALTIME SUBSCRIPTION
        const channel = supabase
            .channel('public:election_results')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'election_results' },
                () => {
                    fetchData();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchData, supabase]);

    const handleSimulate = async () => {
        setSimulating(true);
        await simulateIncomingVotes();
        setSimulating(false);
    };

    const handleRegionSelect = (regionName: string) => {
        setLocationName(regionName);
        setLevel('county');
    };

    const handleTabChange = (val: string) => {
        const newLevel = val as 'national' | 'county' | 'constituency' | 'ward';
        setLevel(newLevel);
        if (newLevel === 'national') setLocationName('Kenya');
    };

    return (
        <div className="space-y-6 relative">
            <LiveTicker />

            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-black/40 p-4 rounded-xl border border-white/10 backdrop-blur-md sticky top-0 z-10 shadow-2xl">
                <div>
                   <h2 className="text-2xl font-black bg-clip-text text-transparent bg-linear-to-r from-kenya-red via-white to-kenya-green flex items-center gap-3">
                       <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_red]" />
                       {showProjections ? 'AI OUTCOME PROJECTION' : (locationName === 'Kenya' ? 'PRESIDENTIAL TALLY' : `${locationName.toUpperCase()} TALLY`)}
                   </h2>
                   <p className="text-sm text-gray-400 font-mono tracking-widest pl-6">
                       {showProjections ? 'PROBABILISTIC FORECAST V2.0' : 'LIVE FROM BOMAS OF KENYA'}
                   </p>
                </div>
                
                <div className="flex items-center gap-2">
                    <div className="flex bg-white/5 border border-white/10 rounded-lg p-1 mr-4">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setActiveView('tally')}
                            className={`text-[10px] h-7 px-3 font-black tracking-tighter transition-all ${activeView === 'tally' ? 'bg-kenya-red text-white' : 'text-gray-500 hover:text-white'}`}
                        >
                            DASHBOARD
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setActiveView('audit')}
                            className={`text-[10px] h-7 px-3 font-black tracking-tighter transition-all ${activeView === 'audit' ? 'bg-kenya-red text-white' : 'text-gray-500 hover:text-white'}`}
                        >
                            AUDIT VAULT
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setActiveView('conflicts')}
                            className={`text-[10px] h-7 px-3 font-black tracking-tighter transition-all ${activeView === 'conflicts' ? 'bg-kenya-red text-white' : 'text-gray-500 hover:text-white'}`}
                        >
                            CONTROL CENTRE
                            <div className="ml-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        </Button>
                    </div>

                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowProjections(!showProjections)}
                        className={`text-xs font-bold border transition-all ${showProjections ? 'bg-kenya-gold text-black border-kenya-gold' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'}`}
                    >
                        {showProjections ? <BarChart3 className="h-4 w-4 mr-2"/> : <TrendingUp className="h-4 w-4 mr-2"/>}
                        {showProjections ? "Show Current Tally" : "AI Projection"}
                    </Button>


                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleSimulate} 
                        disabled={simulating}
                        className="text-xs border-white/10 bg-white/5 hover:bg-white/10 hover:text-white"
                    >
                        {simulating ? <Loader2 className="h-4 w-4 animate-spin mr-2"/> : <RefreshCcw className="h-4 w-4 mr-2"/>}
                        {simulating ? "Simulating..." : "Simulate Incoming"}
                    </Button>

                    <div className="flex items-center gap-2 px-3 py-1 bg-kenya-green/10 border border-kenya-green/20 rounded-full ml-2">
                        <ShieldCheck className="w-3 h-3 text-kenya-green" />
                        <span className="text-[10px] font-black text-kenya-green tracking-widest uppercase">Certified</span>
                    </div>
                </div>
            </div>

            {activeView === 'tally' && (
                <>
                <ReportingProgress stats={stats} />

                {level === 'national' && (
                    <ComplianceTracker candidate={results[0]} />
                )}
                
                <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <AILogConsole />
                </div>

                <Tabs value={level} onValueChange={handleTabChange} className="w-full">
                    <div className="flex justify-between items-center mb-6">
                        <TabsList className="bg-black/50 border border-white/10 h-10 p-1">
                            <TabsTrigger value="national" className="text-xs data-[state=active]:bg-kenya-red data-[state=active]:text-white">NATIONAL</TabsTrigger>
                            <TabsTrigger value="county" className="text-xs data-[state=active]:bg-kenya-red data-[state=active]:text-white">COUNTY</TabsTrigger>
                            <TabsTrigger value="constituency" className="text-xs data-[state=active]:bg-kenya-red data-[state=active]:text-white">CONSTITUENCY</TabsTrigger>
                            <TabsTrigger value="ward" className="text-xs data-[state=active]:bg-kenya-red data-[state=active]:text-white">WARD</TabsTrigger>
                        </TabsList>
                    </div>

                    {loading ? (
                        <div className="h-[400px] flex items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-kenya-red" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Results List */}
                            <div className="xl:col-span-1 space-y-4">
                                {results.map((result) => (
                                    <ResultCard key={result.candidate_id} result={result} />
                                ))}
                                {results.length === 0 && (
                                    <div className="text-center py-20 text-gray-500 bg-white/5 rounded-xl border border-white/5">
                                        No results available for this level yet.
                                    </div>
                                )}
                            </div>

                            {/* Visualizations Column */}
                            <div className="xl:col-span-2 space-y-6">
                                    {/* Map & Distribution Group */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <CountyMap data={regionalData} onRegionSelect={handleRegionSelect} />
                                        <PartyDistributionChart data={partyData} />
                                    </div>
                                    
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div className="lg:col-span-2">
                                            <TurnoutCard stats={turnout} />
                                        </div>
                                        <div className="lg:col-span-1">
                                            <TallyReportGenerator level={level} location={locationName} />
                                        </div>
                                    </div>
                            </div>
                        </div>
                    )}
                </Tabs>
                </>
            )}

            {activeView === 'audit' && (
                <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <AuditVault />
                </div>
            )}

            {activeView === 'conflicts' && (
                <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <DiscrepancyCentre />
                </div>
            )}
            
            <Toaster position="top-right" theme="dark" />
        </div>
    );
}
