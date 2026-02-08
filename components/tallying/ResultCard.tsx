import { CandidateResult } from "@/actions/tallying";
import Image from "next/image";
import { Form34AViewer } from "./Form34AViewer";

interface ResultCardProps {
  result: CandidateResult;
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="card-premium p-3 md:p-4 flex flex-col gap-3 group transition-all duration-500">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="relative h-12 w-12 md:h-14 md:w-14 rounded-full overflow-hidden border-2 border-white/10 shrink-0">
          {/* Use a placeholder if photo_url fails or is empty */}
          <Image
            src={result.photo_url || "/avatars/placeholder.jpg"}
            alt={result.candidate_name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-black text-base md:text-lg text-white truncate">
              {result.candidate_name}
            </h3>
            <span className="text-lg md:text-xl font-black text-white tracking-tight shrink-0">
              {result.percentage.toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between items-center text-[10px] md:text-sm text-brand-text-muted mt-0.5">
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded-lg text-[8px] md:text-xs font-black text-black uppercase ${result.party_color}`}
              >
                {result.party}
              </span>
              <span className="font-bold">
                {result.votes.toLocaleString()}{" "}
                <span className="hidden md:inline">Votes</span>
              </span>
            </div>

            <div className="scale-75 md:scale-100 origin-right">
              <Form34AViewer
                stationName="Sample Station"
                candidateName={result.candidate_name}
                votes={result.votes}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-2 md:h-3 w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full ${result.party_color} transition-all duration-1000 ease-out relative`}
          style={{ width: `${result.percentage}%` }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-white/40" />
        </div>
      </div>
    </div>
  );
}
