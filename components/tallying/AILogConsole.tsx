"use client";

import { useEffect, useRef, useState } from "react";
import { triggerAgentCycle } from "@/actions/ai-tallying";
import { ProcessingLog } from "@/lib/ai-tally-agent";
import { Cpu, RefreshCw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export function AILogConsole() {
  const [logs, setLogs] = useState<ProcessingLog[]>([]);
  const [isAutoPilot, setIsAutoPilot] = useState(false);
  const [processing, setProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-pilot effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPilot) {
      interval = setInterval(async () => {
        if (!processing) {
          await runCycle();
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPilot, processing]);

  const runCycle = async () => {
    setProcessing(true);
    try {
      const newLogs = await triggerAgentCycle();
      setLogs((prev) => [...prev, ...newLogs]); // Append new logs to bottom logic if we reversed?
      // Actually the server returns them in specific order. Let's simpler prepend or just fetch all.
      // For the visual effect, purely appending the new batch is better.
    } catch (e) {
      console.error(e);
    } finally {
      setProcessing(false);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="card-premium overflow-hidden flex flex-col h-[300px] md:h-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 md:px-4 py-2 border-b border-white/10 bg-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Cpu className="w-3 h-3 md:w-4 md:h-4 text-kenya-green" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-kenya-green rounded-full animate-ping" />
          </div>
          <span className="text-xs font-black tracking-tighter text-white">
            AI VERIFICATION NODE{" "}
            <span className="text-kenya-green uppercase tracking-widest">
              Active
            </span>
          </span>
          <Badge
            variant="outline"
            className="text-[8px] h-4 border-kenya-green/30 text-kenya-green bg-kenya-green/5 font-black tracking-widest"
          >
            NODE CONSENSUS ACTIVE
          </Badge>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div
            className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${isAutoPilot ? "bg-kenya-green/20 border-kenya-green text-kenya-green animate-pulse" : "bg-gray-800 border-white/10 text-gray-400"}`}
          >
            <Cpu className="w-3 h-3" />
            {isAutoPilot ? "AUTO-PILOT ACTIVE" : "MANUAL"}
          </div>

          <button
            onClick={() => setIsAutoPilot(!isAutoPilot)}
            className="text-[10px] md:text-xs text-white hover:text-kenya-green transition-colors font-black uppercase border border-white/20 px-3 py-1 rounded-lg hover:bg-white/5"
          >
            {isAutoPilot ? "STOP" : "START"}
          </button>
        </div>
      </div>

      {/* Console Output */}
      <ScrollArea
        className="flex-1 bg-black/95 p-4 font-mono text-sm"
        ref={scrollRef}
      >
        <div className="space-y-2">
          {logs.length === 0 && (
            <div className="text-gray-600">
              System ready. Waiting for initiation...
            </div>
          )}

          {logs.map((log) => (
            <div
              key={log.id}
              className="flex gap-3 items-start animate-in fade-in slide-in-from-left-2 duration-300"
            >
              <span className="text-gray-600 shrink-0">[{log.timestamp}]</span>

              <Badge
                variant="outline"
                className={`
                                w-24 justify-center shrink-0 text-[10px]
                                ${log.action === "INGEST" ? "border-blue-500 text-blue-500" : ""}
                                ${log.action === "VERIFY" ? "border-purple-500 text-purple-500" : ""}
                                ${log.action === "UPDATE" ? "border-green-500 text-green-500" : ""}
                                ${log.action === "ALERT" ? "border-red-500 text-red-500" : ""}
                            `}
              >
                {log.action}
              </Badge>

              <div className="flex-1">
                <span
                  className={`
                                    ${log.status === "SUCCESS" ? "text-gray-300" : ""}
                                    ${log.status === "WARNING" ? "text-yellow-400" : ""}
                                    ${log.status === "ERROR" ? "text-red-500 font-bold" : ""}
                                `}
                >
                  {log.message}
                </span>
              </div>
            </div>
          ))}

          {processing && (
            <div className="text-kenya-green animate-pulse flex items-center gap-2">
              <RefreshCw className="w-3 h-3 animate-spin" />
              PROCESSING...
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
