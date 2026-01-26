"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale } from "lucide-react";
import { DEMO_STREAMS } from "@/lib/demo-data";

export function ViewpointBalance() {
  // Calculate distribution
  const total = DEMO_STREAMS.length;
  const counts = DEMO_STREAMS.reduce((acc, item) => {
    acc[item.politicalLeaning] = (acc[item.politicalLeaning] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const distribution = [
    { label: "Government", count: counts["Government"] || 0, color: "bg-blue-500" },
    { label: "Opposition", count: counts["Opposition"] || 0, color: "bg-red-500" },
    { label: "Independent", count: counts["Independent"] || 0, color: "bg-green-500" },
    { label: "Civil Society", count: counts["Civil Society"] || 0, color: "bg-purple-500" }
  ];

  return (
    <Card className="bg-brand-surface border-kenya-gold/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Scale className="w-4 h-4 text-kenya-gold" />
          Viewpoint Balance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-brand-text-muted">
          Your feed includes diverse political perspectives:
        </p>
        
        {/* Visual Distribution Bar */}
        <div className="h-3 flex rounded-full overflow-hidden">
          {distribution.map((item) => (
            item.count > 0 && (
              <div
                key={item.label}
                className={item.color}
                style={{ width: `${(item.count / total) * 100}%` }}
                title={`${item.label}: ${Math.round((item.count / total) * 100)}%`}
              />
            )
          ))}
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {distribution.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-brand-text-muted">
                {item.label}: <span className="font-bold text-brand-text">{Math.round((item.count / total) * 100)}%</span>
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs text-brand-text-muted italic pt-2 border-t border-border">
          We actively balance your feed to prevent echo chambers.
        </p>
      </CardContent>
    </Card>
  );
}
