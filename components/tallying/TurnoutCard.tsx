"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, FileCheck, Ban, Percent, LucideIcon } from "lucide-react";

interface TurnoutStats {
    registered: number;
    cast: number;
    rejected: number;
    turnoutPercent: number;
}

export function TurnoutCard({ stats }: { stats: TurnoutStats | null }) {
    if (!stats) return <div className="h-32 bg-white/5 rounded-xl animate-pulse"></div>;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatBox 
                icon={Users} 
                label="Registered Voters" 
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
                label="Rejected Votes" 
                value={stats.rejected.toLocaleString()} 
                color="text-red-400" 
            />
             <StatBox 
                icon={Percent} 
                label="Turnout" 
                value={`${stats.turnoutPercent.toFixed(2)}%`} 
                color="text-yellow-400" 
            />
        </div>
    );
}

function StatBox({ icon: Icon, label, value, color }: { icon: LucideIcon, label: string, value: string, color: string }) {
    return (
        <Card className="bg-black/40 border-white/10 backdrop-blur">
            <CardContent className="p-4 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">{label}</span>
                    <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div className="text-2xl font-bold font-mono text-white">{value}</div>
            </CardContent>
        </Card>
    );
}
