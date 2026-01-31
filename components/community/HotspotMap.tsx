"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2, Map as MapIcon, Layers, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HotspotMapProps {
  countyName?: string;
}

export function HotspotMap({ countyName = "Nairobi" }: HotspotMapProps) {
  return (
    <Card className="bg-brand-surface border-white/5 overflow-hidden h-full flex flex-col">
      <CardHeader className="bg-white/5 border-b border-white/5 px-6 py-4 flex flex-row items-center justify-between shrink-0">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapIcon className="w-5 h-5 text-kenya-red" />
          {countyName} Hotspot Intelligence
        </CardTitle>
        <div className="flex gap-2">
           <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><Layers className="w-4 h-4 text-brand-text-muted" /></button>
           <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><Share2 className="w-4 h-4 text-brand-text-muted" /></button>
        </div>
      </CardHeader>
      <CardContent className="p-0 relative flex-1 min-h-[400px]">
        {/* Placeholder for Interactive Map */}
        <div className="absolute inset-0 bg-[#0a0a0b] flex flex-col items-center justify-center p-8 text-center overflow-hidden">
             {/* Abstract Map Background */}
             <div className="absolute inset-0 opacity-10 pointer-events-none grayscale invert" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}></div>
             
             {/* Mock Map Markings */}
             <div className="relative w-full max-w-lg aspect-square">
                {/* Hotspot Pulse 1 */}
                <div className="absolute top-[30%] left-[40%]">
                    <div className="w-6 h-6 bg-kenya-red rounded-full animate-ping opacity-75"></div>
                    <div className="absolute inset-0 w-6 h-6 bg-kenya-red rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(235,0,0,0.5)] cursor-pointer group">
                       <span className="text-[10px] font-bold text-white">12</span>
                       <div className="absolute bottom-full mb-2 hidden group-hover:block bg-brand-surface border border-white/10 p-2 rounded shadow-xl z-10 w-32">
                          <p className="text-[10px] font-bold text-white">Water Shortage</p>
                          <p className="text-[8px] text-brand-text-muted">Upper Hill Ward</p>
                       </div>
                    </div>
                </div>

                {/* Hotspot Pulse 2 */}
                <div className="absolute top-[50%] left-[60%]">
                    <div className="w-4 h-4 bg-kenya-gold rounded-full animate-ping opacity-75"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-kenya-gold rounded-full shadow-[0_0_15px_rgba(255,190,0,0.5)] cursor-pointer" />
                </div>

                {/* Hotspot Pulse 3 */}
                <div className="absolute top-[20%] left-[70%]">
                    <div className="w-3 h-3 bg-kenya-red rounded-full animate-ping opacity-75"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-kenya-red rounded-full shadow-[0_0_10px_rgba(235,0,0,0.5)] cursor-pointer" />
                </div>
             </div>

             <div className="z-10 mt-4 space-y-4">
                <div className="flex flex-col items-center gap-2">
                   <Badge variant="outline" className="bg-black/80 backdrop-blur border-white/10 text-[10px] font-black uppercase px-3 py-1">
                      Satellite Intelligence Enabled
                   </Badge>
                   <p className="text-xs text-brand-text-muted max-w-xs">
                      Cross-referencing citizen reports with available satellite data for verification.
                   </p>
                </div>
             </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 left-6 bg-brand-surface/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl space-y-3 z-10">
           <h5 className="text-[10px] font-black uppercase text-brand-text-muted tracking-widest flex items-center gap-2">
              <Info className="w-3 h-3" /> Legend
           </h5>
           <ul className="space-y-2">
              <li className="flex items-center gap-2 text-[10px] font-bold">
                 <div className="w-2 h-2 bg-kenya-red rounded-full" /> Critical Hotspot (5+ Reports)
              </li>
              <li className="flex items-center gap-2 text-[10px] font-bold">
                 <div className="w-2 h-2 bg-kenya-gold rounded-full" /> Emerging Issue (2-4 Reports)
              </li>
              <li className="flex items-center gap-2 text-[10px] font-bold">
                 <div className="w-2 h-2 bg-kenya-green rounded-full" /> Verified Addressed
              </li>
           </ul>
        </div>
      </CardContent>
    </Card>
  );
}
