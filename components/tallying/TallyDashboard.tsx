"use client";

import { useEffect, useState, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getResults,
  simulateIncomingVotes,
  getTurnoutStats,
  getPartyDistribution,
  getRegionalBreakdown,
  getProjections,
  CandidateResult,
  TallyStats,
  TurnoutStats,
  PartyDistributionData,
  RegionalBreakdownData,
} from "@/actions/tallying";
import { ResultCard } from "./ResultCard";
import { TurnoutCard } from "./TurnoutCard";
import { PartyDistributionChart } from "./PartyDistributionChart";
import { CountyMap } from "./CountyMap";
import { TallyReportGenerator } from "./TallyReportGenerator";
import { BarChart3, TrendingUp, RefreshCcw, Loader2 } from "lucide-react";
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
  const [level, setLevel] = useState<
    "national" | "county" | "constituency" | "ward"
  >("national");
  const [locationName, setLocationName] = useState<string>("Kenya");

  const [results, setResults] = useState<CandidateResult[]>([]);
  const [stats, setStats] = useState<TallyStats | null>(null);
  const [turnout, setTurnout] = useState<TurnoutStats | null>(null);
  const [partyData, setPartyData] = useState<PartyDistributionData[]>([]);
  const [regionalData, setRegionalData] = useState<RegionalBreakdownData[]>([]);

  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);
  const [showProjections, setShowProjections] = useState(false);
  const [activeView, setActiveView] = useState<"tally" | "audit" | "conflicts">(
    "tally",
  );

  const supabase = createClient();

  useEffect(() => {
    console.log("Tallying Centre: Scrollable Layout Active (v3)");
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [resData, turnoutData, partyStats, regData] = await Promise.all([
        showProjections && level === "national"
          ? getProjections().then((r) => ({ results: r, stats }))
          : getResults(level, locationName),
        getTurnoutStats(level, locationName),
        getPartyDistribution(level, locationName),
        getRegionalBreakdown(level),
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
      .channel("public:election_results")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "election_results" },
        () => {
          fetchData();
        },
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
    setLevel("county");
  };

  const handleTabChange = (val: string) => {
    const newLevel = val as "national" | "county" | "constituency" | "ward";
    setLevel(newLevel);
    if (newLevel === "national") setLocationName("Kenya");
  };

  return (
    <div className="flex flex-col space-y-4 md:space-y-6 relative">
      <LiveTicker />

      <div className="sticky top-16 z-30 flex flex-col md:flex-row gap-3 md:gap-4 justify-between items-start md:items-center bg-kenya-deep p-3 md:p-4 rounded-2xl border border-kenya-green/20 shrink-0 shadow-2xl transition-all duration-300">
        <div className="flex flex-col">
          <h2 className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-linear-to-r from-kenya-red via-white to-kenya-green flex items-center gap-3">
            <span className="w-2 h-2 md:w-3 md:h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_red]" />
            {showProjections
              ? "AI OUTCOME PROJECTION"
              : locationName === "Kenya"
                ? "PRESIDENTIAL TALLY"
                : `${locationName.toUpperCase()} TALLY`}
          </h2>
          <p className="text-[10px] md:text-xs text-brand-text-muted font-black uppercase tracking-widest pl-5 md:pl-6">
            {showProjections
              ? "PROBABILISTIC FORECAST V2.0"
              : "LIVE FROM BOMAS OF KENYA"}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-0.5 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveView("tally")}
              className={`text-[9px] md:text-[10px] h-7 px-3 md:px-4 font-black tracking-tighter transition-all rounded-lg ${activeView === "tally" ? "bg-kenya-red text-white" : "text-gray-500 hover:text-white"}`}
            >
              DASHBOARD
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveView("audit")}
              className={`text-[9px] md:text-[10px] h-7 px-3 md:px-4 font-black tracking-tighter transition-all rounded-lg ${activeView === "audit" ? "bg-kenya-red text-white" : "text-gray-500 hover:text-white"}`}
            >
              AUDIT
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveView("conflicts")}
              className={`text-[9px] md:text-[10px] h-7 px-3 md:px-4 font-black tracking-tighter transition-all rounded-lg ${activeView === "conflicts" ? "bg-kenya-red text-white" : "text-gray-500 hover:text-white"}`}
            >
              CONTROL
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowProjections(!showProjections)}
            className={`text-[10px] md:text-xs h-8 font-bold border rounded-lg transition-all shrink-0 ${showProjections ? "bg-kenya-gold text-black border-kenya-gold" : "bg-white/5 border-white/10 text-gray-400 hover:text-white"}`}
          >
            {showProjections ? (
              <BarChart3 className="h-3 w-3 md:h-4 md:w-4 mr-1.5" />
            ) : (
              <TrendingUp className="h-3 w-3 md:h-4 md:w-4 mr-1.5" />
            )}
            {showProjections ? "Tally" : "AI"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSimulate}
            disabled={simulating}
            className="text-[10px] md:text-xs h-8 border-white/10 bg-white/5 hover:bg-white/10 hover:text-white rounded-lg shrink-0"
          >
            {simulating ? (
              <Loader2 className="h-3 w-3 md:h-4 md:w-4 animate-spin mr-1.5" />
            ) : (
              <RefreshCcw className="h-3 w-3 md:h-4 md:w-4 mr-1.5" />
            )}
            {simulating ? "..." : "Simulate"}
          </Button>
        </div>
      </div>

      <div className="pr-1">
        {activeView === "tally" && (
          <div className="space-y-6 pb-20 md:pb-6">
            <ReportingProgress stats={stats} />

            {level === "national" && (
              <ComplianceTracker candidate={results[0]} />
            )}

            <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <AILogConsole />
            </div>

            <Tabs
              value={level}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-6 overflow-x-auto no-scrollbar">
                <TabsList className="bg-black/50 border border-white/10 h-10 p-1 rounded-xl">
                  <TabsTrigger
                    value="national"
                    className="text-[10px] md:text-xs rounded-lg data-[state=active]:bg-kenya-red data-[state=active]:text-white uppercase font-black"
                  >
                    NATIONAL
                  </TabsTrigger>
                  <TabsTrigger
                    value="county"
                    className="text-[10px] md:text-xs rounded-lg data-[state=active]:bg-kenya-red data-[state=active]:text-white uppercase font-black"
                  >
                    COUNTY
                  </TabsTrigger>
                  <TabsTrigger
                    value="constituency"
                    className="text-[10px] md:text-xs rounded-lg data-[state=active]:bg-kenya-red data-[state=active]:text-white uppercase font-black"
                  >
                    CONSTITUENCY
                  </TabsTrigger>
                  <TabsTrigger
                    value="ward"
                    className="text-[10px] md:text-xs rounded-lg data-[state=active]:bg-kenya-red data-[state=active]:text-white uppercase font-black"
                  >
                    WARD
                  </TabsTrigger>
                </TabsList>
              </div>

              {loading ? (
                <div className="h-[300px] flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-kenya-red" />
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Results List */}
                  <div className="xl:col-span-1 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted">
                        Live Results
                      </h3>
                      <div className="px-2 py-0.5 rounded-full bg-kenya-green/10 border border-kenya-green/20 text-[9px] font-black text-kenya-green uppercase tracking-widest">
                        Certified
                      </div>
                    </div>
                    <div className="space-y-4">
                      {results.map((result) => (
                        <ResultCard key={result.candidate_id} result={result} />
                      ))}
                    </div>
                    {results.length === 0 && (
                      <div className="text-center py-20 text-gray-500 bg-white/5 rounded-3xl border border-white/5">
                        No results available for this level yet.
                      </div>
                    )}
                  </div>

                  {/* Visualizations Column */}
                  <div className="xl:col-span-2 space-y-6">
                    {/* Map & Distribution Group */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="card-premium p-1">
                        <CountyMap
                          data={regionalData}
                          onRegionSelect={handleRegionSelect}
                        />
                      </div>
                      <div className="card-premium">
                        <PartyDistributionChart data={partyData} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <TurnoutCard stats={turnout} />
                      </div>
                      <div className="lg:col-span-1">
                        <TallyReportGenerator
                          level={level}
                          location={locationName}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Tabs>
          </div>
        )}

        {activeView === "audit" && (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 pb-20 md:pb-6">
            <AuditVault />
          </div>
        )}

        {activeView === "conflicts" && (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 pb-20 md:pb-6">
            <DiscrepancyCentre />
          </div>
        )}
      </div>

      <Toaster position="top-right" theme="dark" />
    </div>
  );
}
