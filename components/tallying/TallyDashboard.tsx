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

export function TallyDashboard() {
    const [level, setLevel] = useState<'national' | 'county'>('national');
    // derived location for now
    const [results, setResults] = useState<CandidateResult[]>([]);
    const [stats, setStats] = useState<TallyStats | null>(null);
    const [turnout, setTurnout] = useState<TurnoutStats | null>(null);
    const [partyData, setPartyData] = useState<PartyDistributionData[]>([]);
    const [regionalData, setRegionalData] = useState<RegionalBreakdownData[]>([]);
    
    const [loading, setLoading] = useState(true);
    const [simulating, setSimulating] = useState(false);

    const fetchData = useCallback(async () => {
        const loc = level === 'national' ? 'Kenya' : 'Nairobi'; 
        
        // Parallel fetches
        const [resData, turnoutData, partyStats, regData] = await Promise.all([
            getResults(level, loc),
            getTurnoutStats(level, loc),
            getPartyDistribution(level, loc),
            getRegionalBreakdown(level)
        ]);

        setResults(resData.results);
        setStats(resData.stats);
        setTurnout(turnoutData);
        setPartyData(partyStats);
        setRegionalData(regData);
        
        setLoading(false);
    }, [level]);

    useEffect(() => {
        const load = async () => {
            await fetchData();
        };
        load();
        
        const interval = setInterval(() => void fetchData(), 5000); 
        return () => clearInterval(interval);
    }, [fetchData]);

    const handleSimulate = async () => {
        setSimulating(true);
        await simulateIncomingVotes();
        await fetchData();
        setSimulating(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/10 backdrop-blur-md sticky top-0 z-10">
                <div>
                   <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-kenya-red via-white to-kenya-green">
                       {level === 'national' ? 'PRESIDENTIAL TALLY' : 'GUBERNATORIAL TALLY'}
                   </h2>
                   <p className="text-sm text-gray-400 font-mono">
                       LIVE FROM BOMAS OF KENYA • {stats?.reporting_stations.toLocaleString()} / {stats?.total_stations.toLocaleString()} STATIONS
                   </p>
                </div>
                
                {/* Simulation Button (Hidden in Prod usually) */}
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSimulate} 
                    disabled={simulating}
                    className="text-xs text-gray-500 hover:text-white"
                >
                    {simulating ? <Loader2 className="h-4 w-4 animate-spin mr-2"/> : <RefreshCcw className="h-4 w-4 mr-2"/>}
                    {simulating ? "Updating..." : "Simulate Incoming"}
                </Button>
            </div>

            <Tabs defaultValue="national" onValueChange={(val) => setLevel(val as 'national' | 'county')} className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-white/5">
                    <TabsTrigger value="national">NATIONAL</TabsTrigger>
                    <TabsTrigger value="county">COUNTY</TabsTrigger>
                    <TabsTrigger value="constituency" disabled>CONSTITUENCY</TabsTrigger>
                    <TabsTrigger value="ward" disabled>WARD</TabsTrigger>
                </TabsList>
                
                <div className="mt-6">
                    {/* 1. Turnout Stats Row */}
                    <TurnoutCard stats={turnout} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* 2. Main Results Column (2/3 width) */}
                        <div className="lg:col-span-2 space-y-4">
                             <h3 className="text-xl font-bold text-white mb-4">Candidate Performance</h3>
                             {loading ? (
                                <div className="flex justify-center py-20">
                                    <Loader2 className="h-10 w-10 animate-spin text-kenya-red" />
                                </div>
                            ) : (
                                results.map((r) => (
                                    <ResultCard key={r.candidate_id} result={r} />
                                ))
                            )}
                             {!loading && results.length === 0 && (
                                <div className="text-center py-20 text-gray-500">
                                    No results available for this level yet.
                                </div>
                            )}
                        </div>

                        {/* 3. Analytics Column (1/3 width) */}
                        <div className="space-y-6">
                            <PartyDistributionChart data={partyData} />
                            
                            {/* Regional Map */}
                            <RegionalTileMap data={regionalData} />
                        </div>
                    </div>
                </div>
            </Tabs>
        </div>
    );
}
