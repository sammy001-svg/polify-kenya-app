"use server";

import { createClient } from "@/lib/supabase-server";

export interface CandidateResult {
    candidate_id: string;
    candidate_name: string;
    party: string;
    party_color: string; // Derived or stored
    photo_url: string;
    votes: number;
    total_valid_votes: number;
    percentage: number;
}

export interface TallyStats {
    reporting_stations: number;
    total_stations: number;
    last_updated: string;
}

export async function getActiveElection() {
    const supabase = await createClient();
    const { data } = await supabase
        .from('elections')
        .select('*')
        .eq('status', 'active')
        .single();
    return data;
}

interface RawQueryResult {
    id: string;
    votes: number;
    total_valid_votes: number;
    reporting_stations: number;
    total_stations: number;
    updated_at: string;
    election_candidates: {
        id: string;
        name: string;
        party: string;
        photo_url: string;
        position: string;
    };
}

export async function getResults(level: 'national' | 'county' | 'constituency' | 'ward', locationName: string = 'Kenya') {
    const supabase = await createClient();

    // 1. Get Active Election
    const election = await getActiveElection();
    if (!election) return { results: [], stats: null };

    // 2. Get Results for this level and location
    const { data: queryData, error } = await supabase
        .from('election_results')
        .select(`
            id,
            votes,
            total_valid_votes,
            reporting_stations,
            total_stations,
            updated_at,
            election_candidates (
                id,
                name,
                party,
                photo_url,
                position
            )
        `)
        .eq('level', level)
        .eq('location_name', locationName)
        .returns<RawQueryResult[]>();
    
    if (error) {
        console.error("Error fetching results:", error);
        return { results: [], stats: null };
    }

    // 3. Format Data
    const formattedResults: CandidateResult[] = (queryData || []).map((r) => {
        const candidate = r.election_candidates;
        const total = r.total_valid_votes || 1; 
        
        let color = 'bg-gray-500';
        if (candidate.party === 'UDA') color = 'bg-yellow-400';
        if (candidate.party === 'ODM') color = 'bg-orange-500';
        if (candidate.party === 'WIPER') color = 'bg-blue-400';
        if (candidate.party === 'ROOTS') color = 'bg-green-600';

        return {
            candidate_id: candidate.id,
            candidate_name: candidate.name,
            party: candidate.party,
            party_color: color,
            photo_url: candidate.photo_url,
            votes: r.votes,
            total_valid_votes: r.total_valid_votes,
            percentage: (r.votes / total) * 100
        };
    });

    // Sort by votes descending
    formattedResults.sort((a, b) => b.votes - a.votes);

    // 4. Extract Stats (Assume same for all candidates in same location/level for now)
    const stats: TallyStats = (queryData || []).length > 0 ? {
        reporting_stations: queryData![0].reporting_stations,
        total_stations: queryData![0].total_stations,
        last_updated: queryData![0].updated_at
    } : { reporting_stations: 0, total_stations: 0, last_updated: new Date().toISOString() };

    return { results: formattedResults, stats };
}

// Helper to simulate "Live" updates by adding random votes (Demo Only)
export async function simulateIncomingVotes() {
    const supabase = await createClient();
    const { data: results } = await supabase.from('election_results').select('id, votes, reporting_stations, total_stations');
    
    if (!results) return;

    for (const res of results) {
        // Random increment
        const increment = Math.floor(Math.random() * 500);
        const stationsIncrement = Math.random() > 0.7 ? 1 : 0; // Occasionally increment station count
        
        if (res.reporting_stations >= res.total_stations) continue; // Done

        await supabase.from('election_results').update({
            votes: res.votes + increment,
            reporting_stations: Math.min(res.reporting_stations + stationsIncrement, res.total_stations),
            updated_at: new Date().toISOString()
        }).eq('id', res.id);
    }
}


export interface TurnoutStats {
    registered: number;
    cast: number;
    rejected: number;
    turnoutPercent: number;
}

export async function getTurnoutStats(level: 'national' | 'county' | 'constituency' | 'ward', locationName: string = 'Kenya'): Promise<TurnoutStats> {
     const { results } = await getResults(level, locationName);
     
     const totalCast = results.reduce((acc, r) => acc + r.votes, 0);
     const registered = Math.floor(totalCast / 0.65); // Simulate 65% turnout
     const rejected = Math.floor(totalCast * 0.01); // 1% rejected

     return {
         registered,
         cast: totalCast,
         rejected,
         turnoutPercent: (totalCast / registered) * 100
     };
}

// Define raw DB response shape
interface DbElectionResult {
    votes: number;
    location_name: string;
    election_candidates: {
        name: string;
        party: string;
        photo_url?: string;
        id?: string;
        position?: string;
    };
    total_valid_votes?: number;
}

export interface PartyDistributionData {
    party: string;
    votes: number;
    color: string;
    percentage: number;
}

export async function getPartyDistribution(level: 'national' | 'county' | 'constituency' | 'ward', locationName: string = 'Kenya'): Promise<PartyDistributionData[]> {
    const { results } = await getResults(level, locationName);
    
    const distribution: Record<string, { votes: number, color: string }> = {};
    
    results.forEach(r => {
        if (!distribution[r.party]) {
            distribution[r.party] = { votes: 0, color: r.party_color };
        }
        distribution[r.party].votes += r.votes;
    });
    
    // Convert to array
    return Object.entries(distribution).map(([party, data]) => ({
        party,
        votes: data.votes,
        color: data.color,
        percentage: 0 // Will calc on frontend or here
    }));
}

export interface RegionalBreakdownData {
    location: string;
    winner: string;
    party: string;
    votes: number;
    color: string;
}

export async function getRegionalBreakdown(level: 'national' | 'county' | 'constituency' | 'ward'): Promise<RegionalBreakdownData[]> {
    const supabase = await createClient();
    
    // Determine child level (National -> County components)
    // For now, only National -> County map is supported for the demo
    if (level !== 'national') return [];

    const { data: results, error } = await supabase
        .from('election_results')
        .select(`
            votes,
            location_name,
            election_candidates (
                name,
                party
            )
        `)
        .eq('level', 'county')
        .returns<DbElectionResult[]>();

    if (error || !results) return [];

    // Group by location
    const locationGroups: Record<string, DbElectionResult[]> = {};
    results.forEach((r) => {
        if (!locationGroups[r.location_name]) locationGroups[r.location_name] = [];
        locationGroups[r.location_name].push(r);
    });

    // Find winner per location
    const breakdown = Object.entries(locationGroups).map(([location, candidates]) => {
        // Sort by votes desc
        candidates.sort((a, b) => b.votes - a.votes);
        const winner = candidates[0];
        const winnerCandidate = winner.election_candidates;

        // Determine color
        let color = 'bg-gray-500';
        if (winnerCandidate.party === 'UDA') color = 'bg-yellow-400';
        if (winnerCandidate.party === 'ODM') color = 'bg-orange-500';
        if (winnerCandidate.party === 'WIPER') color = 'bg-blue-400';
        if (winnerCandidate.party === 'ROOTS') color = 'bg-green-600';

        return {
            location,
            winner: winnerCandidate.name,
            party: winnerCandidate.party,
            votes: winner.votes,
            color
        };
    });

    return breakdown;
}

