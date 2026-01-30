"use client";

import { useMemo } from "react";
import {
  PositionType,
  getPoliticiansByPosition,
} from "@/lib/representatives";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface ContestingPoliticiansProps {
  office: string;
}

export function ContestingPoliticians({ office }: ContestingPoliticiansProps) {
  const candidates = useMemo(() => {
    const mapOfficeToPosition = (officeKey: string): PositionType | null => {
      switch (officeKey.toLowerCase()) {
        case "president":
          return "President";
        case "governor":
          return "Governor";
        case "senator":
          return "Senator";
        case "mp":
          return "MP";
        case "mca":
          return "MCA";
        default:
          return null;
      }
    };

    const position = mapOfficeToPosition(office);
    if (position) {
      return getPoliticiansByPosition(position);
    }
    return [];
  }, [office]);

  if (candidates.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
      <div className="flex items-center justify-between">
        <h3 className="font-black text-lg flex items-center gap-2">
          <span className="w-1 h-6 bg-kenya-red rounded-full" />
          Contesting Candidates
        </h3>
        <span className="text-xs font-bold text-brand-text-muted uppercase tracking-wider">
          {candidates.length} Confirmed
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {candidates.map((candidate) => (
          <Card
            key={candidate.id}
            className="group relative overflow-hidden bg-brand-surface-highlight/30 border-white/5 hover:border-kenya-red/30 transition-all hover:bg-brand-surface-highlight/50"
          >
            <div className="p-4 flex gap-4">
              <div className="relative shrink-0">
                <Avatar className="w-16 h-16 border-2 border-white/10 group-hover:border-kenya-red/50 transition-colors">
                  <AvatarImage src={candidate.photo || ""} alt={candidate.name} />
                  <AvatarFallback className="bg-brand-surface font-bold text-xl">
                    {candidate.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {candidate.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-brand-surface rounded-full p-0.5">
                    <CheckCircle2 className="w-5 h-5 text-kenya-green fill-current" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold truncate text-base group-hover:text-kenya-red transition-colors">
                      {candidate.name}
                    </h4>
                    <p className="text-xs text-brand-text-muted font-medium uppercase tracking-wide">
                      {candidate.party}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-brand-text italic line-clamp-2 mt-2 leading-relaxed opacity-80">
                  &quot;{candidate.slogan}&quot;
                </p>
              </div>
            </div>

            <div className="px-4 pb-4 pt-0">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {candidate.keyAgenda.slice(0, 2).map((agenda, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="text-[10px] bg-white/5 hover:bg-white/10 text-brand-text-muted font-normal"
                  >
                    {agenda}
                  </Badge>
                ))}
                {candidate.keyAgenda.length > 2 && (
                  <Badge
                    variant="secondary"
                    className="text-[10px] bg-white/5 text-brand-text-muted font-normal"
                  >
                    +{candidate.keyAgenda.length - 2} more
                  </Badge>
                )}
              </div>

              <Button className="w-full bg-brand-surface hover:bg-brand-surface-highlight border border-white/10 text-xs font-bold h-8 group/btn">
                View Profile{" "}
                <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
