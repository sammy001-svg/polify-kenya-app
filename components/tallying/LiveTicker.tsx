"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";

const INITIAL_UPDATES = [
    "POLLS CLOSED AT 5:00 PM • COUNTING UNDERWAY IN ALL 47 COUNTIES",
    "IEBC CHAIRMAN URGES CALM AS RESULTS TRICKLE IN",
    "TURNOUT ESTIMATED AT 65% NATIONWIDE",
    "Follow verified results only on this portal"
];

export function LiveTicker() {
    const [updates] = useState(INITIAL_UPDATES);

    return (
        <div className="bg-kenya-red text-white py-2 overflow-hidden flex items-center relative z-20 border-y border-white/10">
            <div className="bg-kenya-red absolute left-0 z-10 px-4 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-2xl">
                <span className="animate-pulse w-2 h-2 bg-brand-primary rounded-full block" />
                Live Updates
            </div>
            
            <div className="flex animate-marquee whitespace-nowrap">
                {/* Repeat for seamless loop */}
                {[...updates, ...updates, ...updates].map((update, i) => (
                    <div key={i} className="mx-8 text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
                        <AlertCircle className="w-2.5 h-2.5 text-white/70" />
                        {update}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Add these to globals.css if not present
// @keyframes marquee {
//   0% { transform: translateX(0); }
//   100% { transform: translateX(-50%); }
// }
// .animate-marquee {
//   animation: marquee 30s linear infinite;
// }
