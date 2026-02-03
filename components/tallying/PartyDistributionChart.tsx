"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PartyStat {
    party: string;
    votes: number;
    color: string;
}

export function PartyDistributionChart({ data }: { data: PartyStat[] }) {
    const total = data.reduce((acc, curr) => acc + curr.votes, 0);

    return (
        <Card className="bg-black/40 border-white/10 backdrop-blur">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400 uppercase tracking-wider">Party Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Visual Bar */}
                <div className="flex h-4 w-full rounded-full overflow-hidden mb-4">
                    {data.map((p) => (
                        <div 
                            key={p.party}
                            className={`h-full ${p.color}`}
                            style={{ width: `${(p.votes / total) * 100}%` }}
                        />
                    ))}
                </div>

                {/* Legend */}
                <div className="space-y-2">
                    {data.map((p) => (
                        <div key={p.party} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${p.color}`} />
                                <span className="text-white font-medium">{p.party}</span>
                            </div>
                            <span className="text-gray-400 font-mono">
                                {((p.votes / total) * 100).toFixed(1)}%
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
