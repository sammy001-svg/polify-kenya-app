"use client";

import { useEffect, useState, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getResults, simulateIncomingVotes, getTurnoutStats, getPartyDistribution, getRegionalBreakdown, CandidateResult, TallyStats, TurnoutStats, PartyDistributionData, RegionalBreakdownData } from "@/actions/tallying";
import { ResultCard } from "./ResultCard";
import { TurnoutCard } from "./TurnoutCard";
import { PartyDistributionChart } from "./PartyDistributionChart";
import { RegionalTileMap } from "./RegionalTileMap";
import { Loader2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveTicker } from "./LiveTicker";
import { ReportingProgress } from "./ReportingProgress";
import { AILogConsole } from "./AILogConsole";
import { createClient } from "@/lib/supabase";

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
    
    const supabase = createClient();

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [resData, turnoutData, partyStats, regData] = await Promise.all([
                getResults(level, locationName),
                getTurnoutStats(level, locationName),
                getPartyDistribution(level, locationName),
                getRegionalBreakdown(level)
            ]);

            setResults(resData.results);
            setStats(resData.stats);
            setTurnout(turnoutData);
            setPartyData(partyStats);
            setRegionalData(regData);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    }, [level, locationName]);

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

            <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/10 backdrop-blur-md sticky top-0 z-10 shadow-2xl">
                <div>
                   <h2 className="text-2xl font-black bg-clip-text text-transparent bg-linear-to-r from-kenya-red via-white to-kenya-green flex items-center gap-3">
                       <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_red]" />
                       {locationName === 'Kenya' ? 'PRESIDENTIAL TALLY' : `${locationName.toUpperCase()} TALLY`}
                   </h2>
                   <p className="text-sm text-gray-400 font-mono tracking-widest pl-6">
                       LIVE FROM BOMAS OF KENYA
                   </p>
                </div>
                
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
            </div>

            <ReportingProgress stats={stats} />
            
            <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <AILogConsole />
            </div>

            <Tabs value={level} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-white/5 p-1 border border-white/10 rounded-lg">
                    <TabsTrigger value="national" className="data-[state=active]:bg-kenya-red data-[state=active]:text-white uppercase font-bold text-xs">National</TabsTrigger>
                    <TabsTrigger value="county" className="data-[state=active]:bg-kenya-red data-[state=active]:text-white uppercase font-bold text-xs">County</TabsTrigger>
                    <TabsTrigger value="constituency" className="data-[state=active]:bg-kenya-red data-[state=active]:text-white uppercase font-bold text-xs">Constituency</TabsTrigger>
                    <TabsTrigger value="ward" className="data-[state=active]:bg-kenya-red data-[state=active]:text-white uppercase font-bold text-xs">Ward</TabsTrigger>
                </TabsList>
                
                <div className="mt-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                             <TurnoutCard stats={turnout} />
                             
                             <div className="space-y-4">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span className="w-1 h-6 bg-kenya-gold block" />
                                    Candidate Performance
                                </h3>
                                
                                {loading ? (
                                    <div className="flex justify-center py-20">
                                        <Loader2 className="h-10 w-10 animate-spin text-kenya-red" />
                                    </div>
                                ) : (
                                    <div className="grid gap-3">
                                        {results.map((r, i) => (
                                            <div key={r.candidate_id} className="animate-in fade-in slide-in-from-left duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                                                <ResultCard result={r} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {!loading && results.length === 0 && (
                                    <div className="text-center py-20 text-gray-500 bg-white/5 rounded-xl border border-white/5">
                                        No results available for this level yet.
                                    </div>
                                )}
                             </div>
                        </div>

                        <div className="space-y-6">
                            <PartyDistributionChart data={partyData} />
                            <RegionalTileMap data={regionalData} onRegionSelect={handleRegionSelect} />
                        </div>
                    </div>
                </div>
            </Tabs>
        </div>
    );
}
