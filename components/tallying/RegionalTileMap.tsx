import { RegionalBreakdownData } from "@/actions/tallying";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

// Grid Layout: x (col), y (row). Top-left is 0,0.
// Attempting to roughly mimic Kenya's shape.
// Columns: 0-12 (West -> East)
// Rows: 0-12 (North -> South)
const FULL_KENYA_LAYOUT = [
    // NORTH
    { id: 23, name: "Turkana", x: 1, y: 0 },
    { id: 10, name: "Marsabit", x: 6, y: 0 },
    { id: 9, name: "Mandera", x: 11, y: 0 },
    { id: 8, name: "Wajir", x: 10, y: 2 },
    
    // WEST / NORTH RIFT
    { id: 24, name: "West Pokot", x: 2, y: 2 },
    { id: 26, name: "Trans Nzoia", x: 1, y: 3 },
    { id: 39, name: "Bungoma", x: 0, y: 4 },
    { id: 40, name: "Busia", x: 0, y: 5 },
    { id: 37, name: "Kakamega", x: 1, y: 4 },
    { id: 38, name: "Vihiga", x: 1, y: 5 },
    { id: 42, name: "Kisumu", x: 1, y: 6 },
    { id: 41, name: "Siaya", x: 0, y: 6 },
    { id: 43, name: "Homa Bay", x: 0, y: 7 },
    { id: 44, name: "Migori", x: 0, y: 8 },
    { id: 45, name: "Kisii", x: 1, y: 7 },
    { id: 46, name: "Nyamira", x: 2, y: 7 },

    // NORTH RIFT / CENTRAL RIFT
    { id: 25, name: "Samburu", x: 5, y: 2 },
    { id: 11, name: "Isiolo", x: 7, y: 3 },
    { id: 27, name: "Uasin Gishu", x: 2, y: 3 },
    { id: 28, name: "Elgeyo-Marakwet", x: 3, y: 3 },
    { id: 30, name: "Baringo", x: 4, y: 3 },
    { id: 29, name: "Nandi", x: 2, y: 4 },
    { id: 35, name: "Kericho", x: 2, y: 5 },
    { id: 36, name: "Bomet", x: 2, y: 6 },
    { id: 32, name: "Nakuru", x: 3, y: 5 },
    { id: 33, name: "Narok", x: 2, y: 8 },
    { id: 34, name: "Kajiado", x: 4, y: 9 },

    // CENTRAL / MT KENYA
    { id: 31, name: "Laikipia", x: 5, y: 4 },
    { id: 12, name: "Meru", x: 7, y: 4 },
    { id: 13, name: "Tharaka-Nithi", x: 8, y: 5 },
    { id: 19, name: "Nyeri", x: 5, y: 5 },
    { id: 18, name: "Nyandarua", x: 4, y: 5 },
    { id: 20, name: "Kirinyaga", x: 6, y: 5 },
    { id: 21, name: "Murang'a", x: 5, y: 6 },
    { id: 22, name: "Kiambu", x: 5, y: 7 },
    { id: 47, name: "Nairobi", x: 5, y: 8 },

    // EASTERN
    { id: 14, name: "Embu", x: 7, y: 5 },
    { id: 16, name: "Machakos", x: 6, y: 8 },
    { id: 15, name: "Kitui", x: 8, y: 7 },
    { id: 17, name: "Makueni", x: 7, y: 9 },

    // COAST
    { id: 7, name: "Garissa", x: 10, y: 5 },
    { id: 4, name: "Tana River", x: 10, y: 7 },
    { id: 5, name: "Lamu", x: 11, y: 8 },
    { id: 3, name: "Kilifi", x: 9, y: 9 },
    { id: 1, name: "Mombasa", x: 9, y: 10 },
    { id: 2, name: "Kwale", x: 9, y: 11 },
    { id: 6, name: "Taita-Taveta", x: 8, y: 10 },
];

interface RegionalTileMapProps {
    data: RegionalBreakdownData[];
    onRegionSelect?: (region: string) => void;
}

export function RegionalTileMap({ data, onRegionSelect }: RegionalTileMapProps) {
    // Convert data to map for easy lookup
    const dataMap = new Map(data.map(d => [d.location, d]));

    return (
        <div className="bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur flex flex-col items-center">
            <h3 className="text-xl font-bold text-white mb-6 self-start flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-kenya-green animate-pulse" />
                COUNTY PERFORMANCE MAP
            </h3>
            
            <div className="overflow-auto w-full flex justify-center">
                <div 
                    className="grid gap-1.5"
                    style={{ 
                        gridTemplateColumns: `repeat(12, 1fr)`,
                        gridTemplateRows: `repeat(12, 1fr)`,
                        maxWidth: '600px',
                        width: '100%',
                        aspectRatio: '1/1'
                    }}
                >
                    {FULL_KENYA_LAYOUT.map((tile) => {
                        const regionData = dataMap.get(tile.name);
                        const hasData = !!regionData;
                        const color = regionData ? regionData.color : "bg-white/5";
                        
                        return (
                            <TooltipProvider key={tile.id}>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <div 
                                            onClick={() => onRegionSelect?.(tile.name)}
                                            className={`
                                                ${color} 
                                                rounded-sm 
                                                flex items-center justify-center 
                                                text-[8px] sm:text-[10px] 
                                                font-bold 
                                                ${hasData ? 'text-white cursor-pointer hover:scale-125 hover:z-50 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'text-gray-600 cursor-default'}
                                                transition-all duration-300
                                                border border-white/5
                                                relative
                                                aspect-square
                                            `}
                                            style={{ 
                                                gridColumn: tile.x + 1, // CSS Grid is 1-indexed
                                                gridRow: tile.y + 1
                                            }}
                                        >
                                            <span className="z-10">{tile.id}</span>
                                            {/* Digital glow effect for active tiles */}
                                            {hasData && (
                                                <div className="absolute inset-0 bg-white/10 rounded-sm animate-pulse" />
                                            )}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="bg-black/90 border border-white/20 text-white p-3 shadow-2xl backdrop-blur-md">
                                        <div className="text-center min-w-[120px]">
                                            <div className="flex items-center justify-center gap-2 mb-2 border-b border-white/10 pb-1">
                                                <span className="text-kenya-red font-black text-xs">#{tile.id}</span>
                                                <p className="font-bold text-lg uppercase">{tile.name}</p>
                                            </div>
                                            {regionData ? (
                                                <>
                                                    <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                                                        <span>LEADING:</span>
                                                        <span className="text-white font-bold">{regionData.winner}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                                                        <span>PARTY:</span>
                                                        <span className="text-kenya-gold">{regionData.party}</span>
                                                    </div>
                                                    {/* Mini Bar */}
                                                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-1">
                                                        <div className={`h-full ${regionData.color} w-[60%]`} /> 
                                                    </div>
                                                    <p className="text-[10px] font-mono text-gray-500">{regionData.votes.toLocaleString()} votes processed</p>
                                                </>
                                            ) : (
                                                <p className="text-xs text-gray-500 italic py-2">Waiting for results...</p>
                                            )}
                                            {hasData && <p className="text-[9px] text-kenya-green mt-2 font-mono border-t border-white/10 pt-1 tracking-wider">CLICK TO DRILL-DOWN</p>}
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        );
                    })}
                </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 justify-center text-xs font-medium text-gray-400 border-t border-white/5 pt-4 w-full">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-400 rounded-sm shadow-[0_0_5px_rgba(250,204,21,0.5)]"></div> UDA</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded-sm shadow-[0_0_5px_rgba(249,115,22,0.5)]"></div> ODM</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-400 rounded-sm shadow-[0_0_5px_rgba(96,165,250,0.5)]"></div> WIPER</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-600 rounded-sm shadow-[0_0_5px_rgba(22,163,74,0.5)]"></div> ROOTS</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white/5 border border-white/10 rounded-sm"></div> Pending</div>
            </div>
        </div>
    );
}
