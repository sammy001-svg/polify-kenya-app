"use client";

import { PARTIES_DATA } from "@/lib/parties-data";
import { PartyCard } from "@/components/parties/PartyCard";
import { Megaphone, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function PoliticalPartiesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredParties = PARTIES_DATA.filter((party) =>
    party.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    party.abbreviation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-kenya-red/10 rounded-xl flex items-center justify-center shrink-0">
            <Megaphone className="w-6 h-6 text-kenya-red" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight leading-none">
              Political Parties
            </h1>
            <p className="text-sm text-brand-text-muted mt-1 font-medium">
              Browse and analyze registered political parties
            </p>
          </div>
        </div>
        
        <div className="relative w-full md:w-72">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted" />
           <Input 
             placeholder="Search parties..." 
             className="pl-9 bg-brand-surface border-white/10 focus:border-kenya-red/50 transition-colors"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {filteredParties.map((party) => (
             <PartyCard key={party.id} party={party} />
         ))}
      </div>
      
      {filteredParties.length === 0 && (
          <div className="text-center py-12">
              <p className="text-brand-text-muted">No parties found matching "{searchQuery}"</p>
          </div>
      )}
    </div>
  );
}
