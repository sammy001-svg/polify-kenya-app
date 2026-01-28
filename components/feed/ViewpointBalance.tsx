"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale } from "lucide-react";
import { DEMO_STREAMS } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export function ViewpointBalance() {
  // Calculate distribution
  const total = DEMO_STREAMS.length;
  const counts = DEMO_STREAMS.reduce((acc, item) => {
    acc[item.politicalLeaning] = (acc[item.politicalLeaning] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = [
    { label: "Government", count: counts["Government"] || 0, color: "var(--accent-red)", glow: "glow-red" },
    { label: "Opposition", count: counts["Opposition"] || 0, color: "var(--accent-green)", glow: "glow-green" },
    { label: "Independent", count: counts["Independent"] || 0, color: "var(--accent-gold)", glow: "glow-gold" },
    { label: "Civil Society", count: counts["Civil Society"] || 0, color: "var(--foreground-muted)", glow: "" }
  ].filter(d => d.count > 0);

  // SVG Donut Logic
  let cumulativePercent = 0;
  const size = 120;
  const center = size / 2;
  const radius = 45;
  const thickness = 10;
  const circumference = 2 * Math.PI * radius;

  return (
    <Card className="bg-brand-surface/60 glass-dark border-white/5 overflow-hidden group">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-brand-text-muted">
          <Scale className="w-4 h-4 text-kenya-gold animate-pulse" />
          Perspective Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center p-4 relative">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg] transform transition-transform duration-1000 group-hover:scale-110">
            {data.map((item, i) => {
              const percent = item.count / total;
              const strokeDasharray = `${percent * circumference} ${circumference}`;
              const strokeDashoffset = -cumulativePercent * circumference;
              cumulativePercent += percent;
              
              return (
                <circle
                  key={item.label}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth={thickness}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className={cn("transition-all duration-1000 ease-out", item.glow)}
                  style={{ transitionDelay: `${i * 150}ms` }}
                />
              );
            })}
            {/* Center Label */}
            <text 
              x="50%" 
              y="50%" 
              dominantBaseline="middle" 
              textAnchor="middle" 
              className="fill-brand-text font-black text-xs rotate-90"
              style={{ fontSize: '14px' }}
            >
              100%
            </text>
          </svg>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {data.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-tighter">{item.label}</span>
                </div>
                <span className="text-sm font-black pl-4">
                  {Math.round((item.count / total) * 100)}%
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/5">
            <p className="text-[11px] text-brand-text-muted leading-relaxed font-medium">
              Feeding an <span className="text-white font-bold">Unbiased Dashboard</span>. Our algorithm ensures 4 distinct political voices are balanced hourly.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
