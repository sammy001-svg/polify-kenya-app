import { CandidateResult } from "@/actions/tallying";
import Image from "next/image";
import { Form34AViewer } from "./Form34AViewer";

interface ResultCardProps {
    result: CandidateResult;
}

export function ResultCard({ result }: ResultCardProps) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3 hover:bg-white/10 transition-colors group">
            <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-white/20">
                     {/* Use a placeholder if photo_url fails or is empty */}
                    <Image 
                        src={result.photo_url || "/avatars/placeholder.jpg"} 
                        alt={result.candidate_name} 
                        fill
                        className="object-cover" 
                    />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-white">{result.candidate_name}</h3>
                        <span className="text-xl font-mono text-white tracking-widest">{result.percentage.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-400 mt-1">
                        <div className="flex items-center gap-2">
                             <span className={`px-2 py-0.5 rounded text-xs font-bold text-black ${result.party_color}`}>
                                {result.party}
                            </span>
                            <span>{result.votes.toLocaleString()} Votes</span>
                        </div>
                        
                        <Form34AViewer 
                            stationName="Sample Station"
                            candidateName={result.candidate_name}
                            votes={result.votes}
                        />
                    </div>
                </div>
            </div>
            
            <div className="relative h-4 w-full bg-gray-800 rounded-full overflow-hidden">
                <div 
                    className={`h-full ${result.party_color} transition-all duration-1000 ease-out`}
                    style={{ width: `${result.percentage}%` }}
                />
            </div>
        </div>
    );
}
