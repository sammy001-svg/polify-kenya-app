"use client";

import { Users, FileCheck, Ban, Percent, LucideIcon } from "lucide-react";

interface TurnoutStats {
  registered: number;
  cast: number;
  rejected: number;
  turnoutPercent: number;
}

export function TurnoutCard({ stats }: { stats: TurnoutStats | null }) {
  if (!stats)
    return <div className="h-32 bg-white/5 rounded-xl animate-pulse"></div>;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
      <StatBox
        icon={Users}
        label="Registered"
        value={stats.registered.toLocaleString()}
        color="text-blue-400"
      />
      <StatBox
        icon={FileCheck}
        label="Votes Cast"
        value={stats.cast.toLocaleString()}
        color="text-green-400"
      />
      <StatBox
        icon={Ban}
        label="Rejected"
        value={stats.rejected.toLocaleString()}
        color="text-red-400"
      />
      <StatBox
        icon={Percent}
        label="Turnout"
        value={`${stats.turnoutPercent.toFixed(1)}%`}
        color="text-kenya-gold"
      />
    </div>
  );
}

function StatBox({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="card-premium p-3 md:p-4 flex flex-col gap-1 md:gap-2">
      <div className="flex justify-between items-start">
        <span className="text-[9px] md:text-xs text-brand-text-muted font-black uppercase tracking-widest">
          {label}
        </span>
        <Icon className={`w-3 h-3 md:w-4 md:h-4 ${color} opacity-80`} />
      </div>
      <div className="text-lg md:text-2xl font-black text-white tracking-tight">
        {value}
      </div>
    </div>
  );
}
