"use client";

interface PartyStat {
  party: string;
  votes: number;
  color: string;
}

export function PartyDistributionChart({ data }: { data: PartyStat[] }) {
  const total = data.reduce((acc, curr) => acc + curr.votes, 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted">
          Party Distribution
        </h3>
        <span className="text-[10px] font-black text-white/40">
          {total.toLocaleString()} Total
        </span>
      </div>

      {/* Visual Bar */}
      <div className="flex h-3 md:h-4 w-full rounded-full overflow-hidden bg-white/5 border border-white/10">
        {data.map((p) => (
          <div
            key={p.party}
            className={`h-full ${p.color} transition-all duration-1000 ease-out`}
            style={{ width: `${(p.votes / total) * 100}%` }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="space-y-3 mt-2">
        {data.map((p) => (
          <div key={p.party} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-2.5 h-2.5 rounded-full ${p.color} shadow-[0_0_10px_currentColor]`}
              />
              <span className="text-xs md:text-sm font-bold text-white uppercase tracking-tight">
                {p.party}
              </span>
            </div>
            <span className="text-xs md:text-sm font-black text-brand-text-muted">
              {((p.votes / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
