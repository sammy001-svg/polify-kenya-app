"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  ShieldCheck,
  FileText,
  ExternalLink,
  Image as ImageIcon,
  Link2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StationResult, searchStations } from "@/actions/tallying";

export function AuditVault() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StationResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedStation, setSelectedStation] = useState<StationResult | null>(
    null,
  );

  const handleSearch = async () => {
    setSearching(true);
    const data = await searchStations(query);
    setResults(data);
    setSearching(false);
  };

  return (
    <div className="card-premium overflow-hidden flex flex-col h-[500px] md:h-[600px] transition-all duration-500">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-white/5 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center shrink-0">
        <div>
          <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2 uppercase tracking-tighter">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-kenya-green" />
            Audit Vault
          </h3>
          <p className="text-[10px] text-brand-text-muted font-black uppercase tracking-widest">
            Digital tally verification
          </p>
        </div>

        <div className="flex w-full md:w-auto gap-2">
          <Input
            placeholder="Search Station..."
            className="bg-black/50 border-white/10 text-[10px] md:text-xs text-white h-9 rounded-xl px-4"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button
            size="sm"
            className="bg-kenya-green hover:bg-kenya-green/90 text-white h-9 rounded-xl px-4 font-black text-[10px] uppercase tracking-widest"
            onClick={handleSearch}
            disabled={searching}
          >
            {searching ? "..." : <Search className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Station List */}
        <div className="w-full md:w-1/3 border-r border-white/10 flex flex-col">
          <ScrollArea className="flex-1 p-2">
            <div className="space-y-2">
              {results.length === 0 && !searching && (
                <div className="text-center py-10 opacity-30">
                  <FileText className="w-10 h-10 mx-auto mb-2" />
                  <p className="text-xs">
                    No records found. Search by name or ID.
                  </p>
                </div>
              )}
              {results.map((station) => (
                <button
                  key={station.station_id}
                  onClick={() => setSelectedStation(station)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${selectedStation?.station_id === station.station_id ? "bg-kenya-green/20 border-kenya-green" : "bg-white/5 border-white/5 hover:bg-white/10"}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <Badge
                      variant="outline"
                      className="text-[8px] h-3 border-white/20 text-gray-400"
                    >
                      {station.station_id}
                    </Badge>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {new Date(station.verified_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white truncate">
                    {station.station_name}
                  </div>
                  <div className="text-[10px] text-gray-500 truncate">
                    {station.location}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Details / Side-by-Side */}
        <div className="hidden md:flex flex-1 flex-col bg-black/60">
          {selectedStation ? (
            <ScrollArea className="flex-1 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Simulated Form scan */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-kenya-gold tracking-widest uppercase flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    ORIGINAL FORM 34A SCAN
                  </h4>
                  <div className="aspect-3/4 bg-white/5 rounded-lg border border-white/10 overflow-hidden relative group">
                    <Image
                      src={selectedStation.form_34a_url}
                      alt="Form 34A"
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity blur-[1px] group-hover:blur-0"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-black text-white border-white/20"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Full Size
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 bg-red-900/10 border border-red-500/20 rounded-lg">
                    <p className="text-[10px] text-red-100/60 leading-relaxed italic">
                      * This is a high-fidelity simulation for audit
                      demonstration. Original documents are sourced from the
                      IEBC Portal.
                    </p>
                  </div>
                </div>

                {/* Digital Breakdown */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-kenya-green tracking-widest uppercase flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      DIGITAL VERIFICATION
                    </h4>
                    <div className="bg-black/80 border border-white/10 rounded-xl p-4 space-y-4">
                      {Object.entries(selectedStation.digital_tally)
                        .sort((a, b) => b[1] - a[1])
                        .map(([candidate, votes]) => (
                          <div key={candidate} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">{candidate}</span>
                              <span className="text-white font-bold">
                                {votes.toLocaleString()} votes
                              </span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-kenya-green/50"
                                style={{ width: `${(votes / 2100) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs font-black text-gray-500 tracking-widest uppercase">
                      <Link2 className="w-4 h-4" />
                      INTEGRITY HASH
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg font-mono text-[10px] text-kenya-gold break-all leading-tight">
                      {selectedStation.integrity_hash}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-kenya-green font-bold">
                      <ShieldCheck className="w-3 h-3" />
                      CRYPTOGRAPHIC MATCH DETECTED IN AI NODE V2.0
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center opacity-20">
              <ShieldCheck className="w-20 h-20 mb-4" />
              <p className="text-sm font-black tracking-widest uppercase">
                Select a station to audit
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
