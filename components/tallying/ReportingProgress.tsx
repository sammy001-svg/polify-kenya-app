"use client";

import { TallyStats } from "@/actions/tallying";

interface ReportingProgressProps {
  stats: TallyStats | null;
}

export function ReportingProgress({ stats }: ReportingProgressProps) {
  if (!stats) return null;

  const percentage =
    stats.total_stations > 0
      ? (stats.reporting_stations / stats.total_stations) * 100
      : 0;

  return (
    <div className="card-premium p-4 md:p-6">
      <div className="flex justify-between items-end mb-3">
        <div>
          <h3 className="text-gray-500 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
            Stations Reporting
          </h3>
          <p className="text-xl md:text-2xl font-black text-white">
            {stats.reporting_stations.toLocaleString()}{" "}
            <span className="text-gray-500 text-sm md:text-base font-medium">
              / {stats.total_stations.toLocaleString()}
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl md:text-3xl font-black text-kenya-gold">
            {percentage.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="h-4 w-full bg-kenya-green/10 rounded-full overflow-hidden relative">
        {/* Striped Animation Background */}
        <div className="absolute inset-0 w-full h-full opacity-20 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-size-[20px_20px] animate-[progress-stripes_1s_linear_infinite]" />

        {/* Fill */}
        <div
          className="h-full bg-linear-to-r from-kenya-green to-kenya-gold transition-all duration-1000 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </div>
      </div>

      <p className="text-[10px] text-gray-500 mt-2 text-right font-mono">
        LAST UPDATED: {new Date(stats.last_updated).toLocaleTimeString()}
      </p>
    </div>
  );
}
