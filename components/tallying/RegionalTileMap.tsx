"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


// Fix visible errors in my layout array memory
// 4 is Taita Taveta. 6 is Tana River.
const FIXED_LAYOUT = [
    {r: 1, c: 2, id: 23, name: "Turkana"}, {r: 1, c: 3, id: 24, name: "West Pokot"}, {r: 1, c: 4, id: 25, name: "Samburu"}, {r: 1, c: 5, id: 10, name: "Marsabit"}, {r: 1, c: 6, id: 9, name: "Mandera"},
    {r: 2, c: 2, id: 26, name: "Trans Nzoia"}, {r: 2, c: 3, id: 27, name: "Uasin Gishu"}, {r: 2, c: 4, id: 30, name: "Baringo"}, {r: 2, c: 5, id: 11, name: "Isiolo"}, {r: 2, c: 6, id: 8, name: "Wajir"},
    {r: 3, c: 0, id: 39, name: "Bungoma"}, {r: 3, c: 1, id: 37, name: "Kakamega"}, {r: 3, c: 2, id: 28, name: "Elgeyo Marakwet"}, {r: 3, c: 3, id: 29, name: "Nandi"}, {r: 3, c: 4, id: 31, name: "Laikipia"}, {r: 3, c: 5, id: 12, name: "Meru"}, {r: 3, c: 6, id: 7, name: "Garissa"},
    {r: 4, c: 0, id: 40, name: "Busia"}, {r: 4, c: 1, id: 38, name: "Vihiga"}, {r: 4, c: 2, id: 42, name: "Kisumu"}, {r: 4, c: 3, id: 35, name: "Kericho"}, {r: 4, c: 4, id: 19, name: "Nyeri"}, {r: 4, c: 5, id: 13, name: "Tharaka Nithi"},
    {r: 5, c: 0, id: 41, name: "Siaya"}, {r: 5, c: 1, id: 43, name: "Homa Bay"}, {r: 5, c: 2, id: 45, name: "Kisii"}, {r: 5, c: 3, id: 36, name: "Bomet"}, {r: 5, c: 4, id: 18, name: "Nyandarua"}, {r: 5, c: 5, id: 14, name: "Embu"}, {r: 5, c: 6, id: 6, name: "Tana River"},
    {r: 6, c: 1, id: 44, name: "Migori"}, {r: 6, c: 2, id: 46, name: "Nyamira"}, {r: 6, c: 3, id: 32, name: "Nakuru"}, {r: 6, c: 4, id: 20, name: "Kirinyaga"}, {r: 6, c: 5, id: 15, name: "Kitui"}, {r: 6, c: 6, id: 5, name: "Lamu"},
    {r: 7, c: 3, id: 33, name: "Narok"}, {r: 7, c: 4, id: 47, name: "Nairobi"}, {r: 7, c: 5, id: 22, name: "Kiambu"}, {r: 7, c: 6, id: 3, name: "Kilifi"},
    {r: 8, c: 4, id: 21, name: "Murang'a"}, {r: 8, c: 5, id: 16, name: "Machakos"}, {r: 8, c: 6, id: 1, name: "Mombasa"},
    {r: 9, c: 4, id: 34, name: "Kajiado"}, {r: 9, c: 5, id: 17, name: "Makueni"}, {r: 9, c: 6, id: 2, name: "Kwale"},
    {r: 10, c: 5, id: 4, name: "Taita Taveta"} // Adjusted for flow
    // Note: This is an artistic approximation, not geographically perfect!
];

interface RegionalData {
    location: string;
    winner: string;
    party: string;
    votes: number;
    color: string;
}

export function RegionalTileMap({ data }: { data: RegionalData[] }) {
    // Convert data to map for easy lookup
    const dataMap = new Map(data.map(d => [d.location, d]));

    return (
        <div className="bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur">
            <h3 className="text-xl font-bold text-white mb-6">County Performance Map</h3>
            
            <div className="overflow-x-auto">
                <div 
                    className="grid gap-2 min-w-[600px] mx-auto"
                    style={{ 
                        gridTemplateColumns: `repeat(8, 1fr)`,
                        gridTemplateRows: `repeat(11, 1fr)`
                    }}
                >
                    {FIXED_LAYOUT.map((tile) => {
                        const regionData = dataMap.get(tile.name);
                        const color = regionData ? regionData.color : "bg-white/5";
                        
                        return (
                            <TooltipProvider key={tile.id}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div 
                                            className={`${color} rounded-sm aspect-square flex items-center justify-center text-[10px] font-bold text-white cursor-pointer hover:scale-110 transition-transform shadow-sm border border-black/20`}
                                            style={{ 
                                                gridColumn: tile.c + 1, // CSS Grid is 1-indexed
                                                gridRow: tile.r
                                            }}
                                        >
                                            {tile.id}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-black border border-white/20 text-white">
                                        <div className="text-center">
                                            <p className="font-bold text-lg">{tile.name}</p>
                                            {regionData ? (
                                                <>
                                                    <p className="text-sm text-gray-400">Leading: <span className="text-white">{regionData.winner}</span></p>
                                                    <p className="text-xs opacity-70">{regionData.party}</p>
                                                    <p className="text-xs font-mono mt-1">{regionData.votes.toLocaleString()} votes</p>
                                                </>
                                            ) : (
                                                <p className="text-xs text-gray-500">No data</p>
                                            )}
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        );
                    })}
                </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 justify-center text-xs text-gray-400">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-400 rounded-sm"></div> UDA</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded-sm"></div> ODM</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-400 rounded-sm"></div> WIPER</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-600 rounded-sm"></div> ROOTS</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white/10 rounded-sm"></div> Pending</div>
            </div>
        </div>
    );
}
