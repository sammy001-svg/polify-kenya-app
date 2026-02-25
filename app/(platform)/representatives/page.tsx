"use client";

import { useState } from "react";
import { KENYA_COUNTIES, SAMPLE_POLITICIANS, PositionType } from "@/lib/representatives";
import { PoliticianCard } from "@/components/representatives/PoliticianCard";
import { Users, MapPin, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RepresentativesPage() {
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const positions: (PositionType | "all")[] = ["all", "Governor", "Senator", "Woman Rep", "MP", "MCA"];
  
  // Filter politicians
  let filteredPoliticians = SAMPLE_POLITICIANS;
  
  // Search filter
  if (searchQuery) {
    filteredPoliticians = filteredPoliticians.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.party.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  if (selectedCounty) {
    filteredPoliticians = filteredPoliticians.filter(p => p.county === selectedCounty);
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
          <h1 className="text-5xl font-black tracking-tight">My Representative</h1>
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
            onChange={(e) => setSelectedCounty(e.target.value)}
            className="w-full px-4 py-2 bg-black border border-border rounded-lg text-white focus:outline-none focus:border-kenya-gold"
          >
            <option value="">All Counties (47)</option>
            {KENYA_COUNTIES.map(county => (
              <option key={county.id} value={county.id}>{county.name} County</option>
            ))}
          </select>
        </div>
        
        {/* Position Filter */}
        <div className="flex gap-2">
          {positions.map(pos => (
            <Button
              key={pos}
              onClick={() => setSelectedPosition(pos)}
              variant={selectedPosition === pos ? "primary" : "secondary"}
              size="sm"
              className="capitalize"
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
      {selectedCounty && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-brand-text-muted">
            Showing representatives for <span className="font-bold text-brand-text">
              {KENYA_COUNTIES.find(c => c.id === selectedCounty)?.name} County
            </span>
          </p>
          <p className="text-sm font-bold text-brand-text">
            {filteredPoliticians.length} {filteredPoliticians.length === 1 ? 'representative' : 'representatives'}
          </p>
        </div>
      )}
      
      {/* Representatives by Position */}
      {selectedPosition === "all" ? (
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
      
      {/* Empty State */}
      {filteredPoliticians.length === 0 && (
        <div className="text-center py-16">
          <Users className="w-16 h-16 text-brand-text-muted mx-auto mb-4 opacity-50" />
          <p className="text-brand-text-muted mb-2">No representatives found</p>
          <p className="text-sm text-brand-text-muted">
            Try selecting a different county or position filter
          </p>
        </div>
      )}
      
      {/* Call to Action */}
      <div className="bg-linear-to-r from-kenya-red to-kenya-gold rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-3">Are You a Politician?</h3>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Create your campaign profile, share your manifesto, and connect directly with voters across Kenya.
        </p>
        <Link href="/representatives/create-campaign">
          <button className="bg-brand-primary text-black font-bold px-8 py-3 rounded-lg hover:bg-brand-primary/90 transition-colors">
            Start Your Campaign
          </button>
        </Link>
      </div>
    </div>
  );
}
