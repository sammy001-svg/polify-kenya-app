"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ConflictingResult,
  getConflictingResults,
  resolveDiscrepancy,
} from "@/actions/tallying";
import {
  AlertCircle,
  CheckCircle2,
  Gavel,
  ArrowRight,
  History,
  ShieldAlert,
  MessageSquare,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function DiscrepancyCentre() {
  const [conflicts, setConflicts] = useState<ConflictingResult[]>([]);
  const [selected, setSelected] = useState<ConflictingResult | null>(null);
  const [rationale, setRationale] = useState("");
  const [corrections, setCorrections] = useState<Record<string, number>>({});
  const [resolving, setResolving] = useState(false);

  const loadConflicts = useCallback(async () => {
    const data = await getConflictingResults();
    setConflicts(data);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadConflicts();
  }, [loadConflicts]);

  const handleSelect = (conflict: ConflictingResult) => {
    setSelected(conflict);
    setRationale("");
    setCorrections({ ...conflict.iebc_value });
  };

  const handleAuthorize = async () => {
    if (!selected || !rationale) {
      toast.error("Rationale is required for authorization.");
      return;
    }
    setResolving(true);
    const res = await resolveDiscrepancy(selected.id, corrections, rationale);
    if (res.success) {
      toast.success(res.message);
      await loadConflicts();
      setSelected(null);
    }
    setResolving(false);
  };

  return (
    <div className="card-premium overflow-hidden flex flex-col h-[600px] md:h-[700px] transition-all duration-500">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center shrink-0">
        <div>
          <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2 uppercase tracking-tighter">
            <Gavel className="w-4 h-4 md:w-5 md:h-5 text-kenya-red" />
            Discrepancy Centre
          </h3>
          <p className="text-[10px] text-brand-text-muted font-black uppercase tracking-widest leading-none">
            CONFLICT RESOLUTION
          </p>
        </div>
        <Badge
          variant="destructive"
          className="animate-pulse bg-red-900/50 text-red-400 border-red-500/30 text-[9px] font-black tracking-widest rounded-lg"
        >
          {conflicts.filter((c) => c.status === "PENDING").length} PENDING
        </Badge>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Conflict Queue */}
        <div className="w-full md:w-1/3 border-r border-white/10 flex flex-col bg-white/5">
          <div className="p-3 bg-black/40 border-b border-white/5">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <History className="w-3 h-3" />
              Resolution Queue
            </p>
          </div>
          <ScrollArea className="flex-1 p-2">
            <div className="space-y-2">
              {conflicts.map((conflict) => (
                <button
                  key={conflict.id}
                  onClick={() => handleSelect(conflict)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${selected?.id === conflict.id ? "bg-red-950/20 border-red-500/50" : "bg-white/5 border-white/5 hover:bg-white/10"}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <Badge
                      variant="outline"
                      className={`text-[8px] h-3 ${conflict.status === "PENDING" ? "border-red-500/50 text-red-400" : "border-green-500/50 text-green-400"}`}
                    >
                      {conflict.status}
                    </Badge>
                    <span className="text-[10px] text-gray-500 font-mono">
                      #{conflict.id}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white truncate">
                    {conflict.station_name}
                  </div>
                  <div className="text-[10px] text-gray-500 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3 text-red-500" />
                    Delta: {conflict.discrepancy_delta}%
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Conflict Resolution Workspace */}
        <div className="flex-1 flex flex-col bg-black/60 relative">
          {selected ? (
            <div className="flex-1 flex flex-col">
              {/* Comparison Panel */}
              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 border-b border-white/10">
                {/* Media Data (Flagged) */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-black text-red-500 tracking-widest uppercase flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      FLAGGED SOURCE ({selected.media_source})
                    </h4>
                    <Badge
                      variant="outline"
                      className="text-[8px] border-red-500/30 text-red-400"
                    >
                      UNTRUSTED
                    </Badge>
                  </div>
                  <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-4 space-y-4">
                    {Object.entries(selected.media_value).map(
                      ([candidate, votes]) => (
                        <div
                          key={candidate}
                          className="flex justify-between items-center bg-black/40 p-2 rounded-lg border border-red-500/10"
                        >
                          <span className="text-xs text-gray-400">
                            {candidate}
                          </span>
                          <span className="text-xs font-bold text-red-400">
                            {votes.toLocaleString()}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* IEBC Data (Gold Standard) */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-black text-kenya-green tracking-widest uppercase flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      IEBC PORTAL DATA
                    </h4>
                    <Badge
                      variant="outline"
                      className="text-[8px] border-green-500/30 text-green-400"
                    >
                      VERIFIED REFERENCE
                    </Badge>
                  </div>
                  <div className="bg-kenya-green/10 border border-kenya-green/20 rounded-xl p-4 space-y-4">
                    {Object.entries(selected.iebc_value).map(
                      ([candidate, votes]) => (
                        <div
                          key={candidate}
                          className="flex justify-between items-center bg-black/40 p-2 rounded-lg border border-green-500/10"
                        >
                          <span className="text-xs text-gray-400">
                            {candidate}
                          </span>
                          <span className="text-xs font-bold text-kenya-green">
                            {votes.toLocaleString()}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* Resolution Form */}
              <div className="flex-1 p-6 space-y-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-white tracking-widest uppercase flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    AUTHORIZE RESOLUTION
                  </h4>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Final Correction Values */}
                    <div className="space-y-3">
                      <p className="text-[10px] text-gray-500 font-bold uppercase">
                        Final Tally Correction
                      </p>
                      {Object.keys(selected.iebc_value).map((candidate) => (
                        <div
                          key={candidate}
                          className="flex items-center gap-3"
                        >
                          <span className="text-[10px] text-gray-400 w-32 truncate">
                            {candidate}
                          </span>
                          <Input
                            type="number"
                            value={corrections[candidate] || 0}
                            onChange={(e) =>
                              setCorrections({
                                ...corrections,
                                [candidate]: parseInt(e.target.value),
                              })
                            }
                            className="bg-black border-white/10 text-xs h-8"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Observer Rationale */}
                    <div className="space-y-3">
                      <p className="text-[10px] text-gray-500 font-bold uppercase">
                        Audit Rationale (Required)
                      </p>
                      <Textarea
                        placeholder="Enter full rationale for this override..."
                        value={rationale}
                        onChange={(e) => setRationale(e.target.value)}
                        className="bg-black border-white/10 text-xs min-h-[100px] resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-[10px] text-gray-500">
                    <ArrowRight className="w-3 h-3" />
                    Resolution will be hashed and committed to Global Audit
                    Vault
                  </div>
                  <Button
                    onClick={handleAuthorize}
                    disabled={resolving || !rationale}
                    className="bg-kenya-red hover:bg-kenya-red/80 text-white font-black tracking-widest text-xs h-10 px-6"
                  >
                    {resolving ? "AUTHORIZING..." : "AUTHORIZE CORRECTION"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center opacity-20">
              <MessageSquare className="w-20 h-20 mb-4" />
              <p className="text-sm font-black tracking-widest uppercase">
                Select a conflict to resolve
              </p>
            </div>
          )}

          {/* Background decoration */}
          <div className="absolute bottom-4 right-4 opacity-10 pointer-events-none">
            <Gavel className="w-32 h-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
