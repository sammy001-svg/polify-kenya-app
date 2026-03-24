"use client";

import { useState } from "react";
import { KENYA_COUNTIES, SAMPLE_POLITICIANS, PositionType } from "@/lib/representatives";
import { KENYA_LOCATIONS } from "@/lib/location-data";
import { PoliticianCard } from "@/components/representatives/PoliticianCard";
import { Users, MapPin, Filter, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase";
import { useEffect } from "react";
import Link from "next/link";

export default function RepresentativesPage() {
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [selectedConstituency, setSelectedConstituency] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<{name: string, county: string, constituency: string, ward: string} | null>(null);
  
  const positions: (PositionType | "all")[] = ["all", "Governor", "Senator", "Woman Rep", "MP", "MCA"];

  useEffect(() => {
    async function fetchUserLocation() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, county, constituency, ward')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setUserProfile({
            name: profile.full_name || "Citizen",
            county: profile.county || "",
            constituency: profile.constituency || "",
            ward: profile.ward || ""
          });

          // Robust matching for county
          const profileCounty = profile.county?.toLowerCase() || "";
          const foundCounty = KENYA_COUNTIES.find(c => 
            c.name.toLowerCase() === profileCounty || 
            c.id.toLowerCase() === profileCounty ||
            profileCounty.includes(c.name.toLowerCase()) ||
            c.name.toLowerCase().includes(profileCounty)
          );
          
          if (foundCounty) {
            setSelectedCounty(foundCounty.id);
            // Default select constituency if it matches
            if (profile.constituency) {
              const profileConst = profile.constituency.toLowerCase();
              // Check if this constituency exists in this county
              const countyLoc = KENYA_LOCATIONS.find(kl => kl.name.toLowerCase() === foundCounty.name.toLowerCase());
              const matchedConst = countyLoc?.constituencies.find(c => 
                c.name.toLowerCase() === profileConst || 
                profileConst.includes(c.name.toLowerCase())
              );
              if (matchedConst) {
                setSelectedConstituency(matchedConst.name);
                
                if (profile.ward) {
                  const profileWard = profile.ward.toLowerCase();
                  const matchedWard = matchedConst.wards.find(w => 
                    w.toLowerCase() === profileWard || 
                    profileWard.includes(w.toLowerCase())
                  );
                  if (matchedWard) setSelectedWard(matchedWard);
                }
              }
            }
          }
        }
      }
      setLoading(false);
    }
    
    fetchUserLocation();
  }, []);

  // Get constituencies for the selected county
  const currentCountyData = KENYA_LOCATIONS.find(c => 
    c.name.toLowerCase() === selectedCounty.toLowerCase() ||
    KENYA_COUNTIES.find(cc => cc.id === selectedCounty)?.name.toLowerCase() === c.name.toLowerCase()
  );
  
  const constituencies = currentCountyData?.constituencies || [];
  
  // Get wards for the selected constituency
  const wards = constituencies.find(c => 
    c.name.toLowerCase() === selectedConstituency.toLowerCase()
  )?.wards || [];
  
  // Filter politicians
  let filteredPoliticians = SAMPLE_POLITICIANS;

  // 1. Base Filter by County (User's County by default if no selection)
  const filterCounty = selectedCounty || (userProfile?.county ? KENYA_COUNTIES.find(c => c.name.toLowerCase() === userProfile.county.toLowerCase())?.id : "");
  
  if (filterCounty) {
    filteredPoliticians = filteredPoliticians.filter(p => p.county?.toLowerCase() === filterCounty.toLowerCase());
  }

  // 2. Strict Position Restriction (Only show user's leaders for MP/MCA unless manually exploring)
  if (userProfile && userProfile.county && !searchQuery) {
    filteredPoliticians = filteredPoliticians.filter(p => {
      // President and Opposition are always visible
      if (p.position === 'President' || p.position === 'Opposition Leader') return true;
      
      // If manually exploring a DIFFERENT county, show all leaders in that county
      if (selectedCounty && selectedCounty.toLowerCase() !== (KENYA_COUNTIES.find(c => c.name.toLowerCase() === userProfile.county.toLowerCase())?.id || "").toLowerCase()) {
         return true; 
      }

      // If in user's county, restrict MP and MCA
      if (p.position === 'MP') {
        const targetConst = selectedConstituency || userProfile.constituency;
        if (!targetConst) return true; // Show all MPs if no target at all (unlikely)
        return p.constituency?.toLowerCase() === targetConst.toLowerCase() ||
               p.constituency?.replace(/[-\s]/g, '') === targetConst.toLowerCase().replace(/[-\s]/g, '');
      }
      
      if (p.position === 'MCA') {
        const targetWard = selectedWard || userProfile.ward;
        if (!targetWard) return true;
        return p.ward?.toLowerCase() === targetWard.toLowerCase();
      }

      return true; // Governor, Senator, Woman Rep
    });
  }
  
  // Search filter
  if (searchQuery) {
    filteredPoliticians = filteredPoliticians.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.party.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  if (selectedPosition !== "all") {
    filteredPoliticians = filteredPoliticians.filter(p => p.position === selectedPosition);
  }
  
  // Sort politicians
  filteredPoliticians.sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "party":
        return a.party.localeCompare(b.party);
      case "attendance":
        return (b.trackRecord?.attendanceRate || 0) - (a.trackRecord?.attendanceRate || 0);
      case "projects":
        return (b.trackRecord?.projectsCompleted || 0) - (a.trackRecord?.projectsCompleted || 0);
      default:
        return 0;
    }
  });
  
  // Group by position
  const groupedByPosition = positions.slice(1).reduce((acc, position) => {
    acc[position as PositionType] = filteredPoliticians.filter(p => p.position === position);
    return acc;
  }, {} as Record<PositionType, typeof filteredPoliticians>);
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 py-6">
        <div className="flex items-center justify-center gap-3">
          <Users className="w-10 h-10 text-kenya-gold" />
          <h1 className="text-5xl font-black tracking-tight text-white">My Representatives</h1>
        </div>
        <p className="text-lg text-brand-text-muted max-w-3xl mx-auto">
          Find your elected leaders from MCA to President. Discover their campaigns, track their promises, and hold them accountable.
        </p>
      </div>
      
      {/* Info Banner */}
      <div className="bg-linear-to-r from-kenya-red/10 to-kenya-gold/10 border border-kenya-gold/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-kenya-gold/20 flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6 text-kenya-gold" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-brand-text mb-2">Find Your Representatives</h3>
            <p className="text-sm text-brand-text-muted leading-relaxed mb-4">
              Select your county below to see all your elected representatives across 5 levels of government - from your Ward MCA all the way to the President.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-kenya-green" />
                <span className="text-brand-text font-medium">Ward (MCA)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-kenya-gold" />
                <span className="text-brand-text font-medium">Constituency (MP)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-kenya-gold" />
                <span className="text-brand-text font-medium">Woman Rep</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-kenya-red" />
                <span className="text-brand-text font-medium">County (Governor, Senator)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-brand-text font-medium">National (President)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-brand-text-muted" />
          <span className="text-sm font-semibold text-brand-text">Filters:</span>
        </div>
        
        {/* Search Box */}
        <div className="flex-1 min-w-[200px] max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or party..."
              className="w-full pl-10 pr-4 py-2 bg-black border border-border rounded-lg text-white placeholder-brand-text-muted focus:outline-none focus:border-kenya-gold"
            />
          </div>
        </div>
        
        {/* County Selector */}
        <div className="flex-1 min-w-[200px] max-w-xs">
          <select
            value={selectedCounty}
            onChange={(e) => {
              setSelectedCounty(e.target.value);
              setSelectedConstituency("");
              setSelectedWard("");
            }}
            className="w-full px-4 py-2 bg-black border border-border rounded-lg text-white focus:outline-none focus:border-kenya-gold"
          >
            <option value="">All Counties (47)</option>
            {KENYA_COUNTIES.map(county => (
              <option key={county.id} value={county.id}>{county.name} County</option>
            ))}
          </select>
        </div>

        {/* Constituency Selector */}
        {selectedCounty && (
          <div className="flex-1 min-w-[200px] max-w-xs">
            <select
              value={selectedConstituency}
              onChange={(e) => {
                setSelectedConstituency(e.target.value);
                setSelectedWard("");
              }}
              className="w-full px-4 py-2 bg-black border border-border rounded-lg text-white focus:outline-none focus:border-kenya-gold"
            >
              <option value="">All Constituencies</option>
              {constituencies.map(c => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Ward Selector */}
        {selectedConstituency && (
          <div className="flex-1 min-w-[200px] max-w-xs">
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-border rounded-lg text-white focus:outline-none focus:border-kenya-gold"
            >
              <option value="">All Wards</option>
              {wards.map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>
        )}
        
        {/* Position Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {positions.map(pos => (
            <Button
              key={pos}
              onClick={() => setSelectedPosition(pos)}
              variant={selectedPosition === pos ? "primary" : "secondary"}
              size="sm"
              className="whitespace-nowrap font-black uppercase tracking-widest text-[10px]"
            >
              {pos === "all" ? "All Positions" : pos}
            </Button>
          ))}
        </div>
        
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-brand-text-muted">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 bg-black border border-border rounded-lg text-white text-sm focus:outline-none focus:border-kenya-gold"
          >
            <option value="name">Name (A-Z)</option>
            <option value="party">Party</option>
            <option value="attendance">Attendance ↓</option>
            <option value="projects">Projects ↓</option>
          </select>
        </div>
      </div>
      
      {/* Results Count */}
      {!loading && selectedCounty && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-brand-text-muted">
            Showing results for <span className="font-bold text-brand-text">
              {KENYA_COUNTIES.find(c => c.id === selectedCounty)?.name} County
              {selectedConstituency && ` / ${selectedConstituency}`}
              {selectedWard && ` / ${selectedWard}`}
            </span>
          </p>
          <p className="text-sm font-bold text-brand-text">
            {filteredPoliticians.length} {filteredPoliticians.length === 1 ? 'representative' : 'representatives'}
          </p>
        </div>
      )}
      
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-kenya-gold" />
          <span className="ml-3 text-brand-text-muted">Loading your leaders...</span>
        </div>
      )}
      
      {/* Representatives by Position */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-brand-surface/30 rounded-3xl border border-border/50">
          <Loader2 className="w-12 h-12 animate-spin text-kenya-gold mb-4" />
          <p className="text-lg font-bold text-white uppercase tracking-widest">Identifying Your Leaders...</p>
          <p className="text-sm text-brand-text-muted mt-2">Connecting to civic database...</p>
        </div>
      ) : selectedPosition === "all" ? (
        <div className="space-y-8">
          {(Object.entries(groupedByPosition) as [PositionType, typeof filteredPoliticians][]).map(([position, pols]) => {
            if (pols.length === 0) return null;
            
            return (
              <div key={position}>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-bold text-brand-text">{position}s</h2>
                  <span className="px-3 py-1 bg-brand-surface-highlight rounded-full text-sm font-bold text-brand-text">
                    {pols.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pols.map(politician => (
                    <PoliticianCard key={politician.id} politician={politician} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPoliticians.map(politician => (
            <PoliticianCard key={politician.id} politician={politician} />
          ))}
        </div>
      )}
      
      {/* Empty State / Coming Soon */}
      {filteredPoliticians.length === 0 && (
        <div className="text-center py-20 bg-brand-surface/30 rounded-3xl border border-dashed border-border">
          <MapPin className="w-16 h-16 text-kenya-gold/30 mx-auto mb-6" />
          <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">
            Data Coming Soon
          </h3>
          <p className="text-brand-text-muted max-w-md mx-auto mb-8 font-medium">
            We are currently verifying representative data for 
            <span className="text-kenya-gold ml-1">
              {selectedWard || selectedConstituency || (selectedCounty ? `${KENYA_COUNTIES.find(c => c.id === selectedCounty)?.name} County` : "this location")}
            </span>.
            Check back soon for verified performance records and campaign manifestos.
          </p>
          <Button 
            variant="secondary" 
            onClick={() => {
              setSelectedCounty("");
              setSelectedConstituency("");
              setSelectedWard("");
            }}
            className="font-bold"
          >
            Clear All Filters
          </Button>
        </div>
      )}
      
      {/* Call to Action */}
      <div className="bg-linear-to-r from-kenya-red/20 to-kenya-gold/20 border border-kenya-gold/30 rounded-2xl p-8 text-center backdrop-blur-sm relative overflow-hidden group">
        <div className="absolute inset-0 bg-scanline pointer-events-none opacity-5" />
        <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight">Are You a Politician?</h3>
        <p className="text-brand-text-muted mb-6 max-w-2xl mx-auto font-medium">
          Create your campaign profile, share your manifesto, and connect directly with voters across Kenya.
        </p>
        <Link href="/representatives/create-campaign">
          <Button 
            className="bg-kenya-gold text-black font-black uppercase tracking-widest px-8 py-6 rounded-xl hover:bg-white transition-all shadow-lg shadow-kenya-gold/20"
          >
            Start Your Campaign
          </Button>
        </Link>
      </div>
    </div>
  );
}
