import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, FileText, Users, Eye } from "lucide-react";
import Link from "next/link";
import { SAMPLE_POLITICIANS, PARTY_METADATA } from "@/lib/representatives";

interface MyRepresentativesProps {
  location?: {
    county?: string;
    constituency?: string;
    ward?: string;
  };
}

export function MyRepresentatives({ location }: MyRepresentativesProps) {
  // Define positions we want to show
  const positions: { role: string; type: string; area?: string }[] = [
    { role: 'Governor', type: 'Governor', area: location?.county },
    { role: 'Senator', type: 'Senator', area: location?.county },
    { role: 'Woman Representative', type: 'Woman Rep', area: location?.county },
    { role: 'Member of Parliament', type: 'MP', area: location?.constituency },
    { role: 'MCA', type: 'MCA', area: location?.ward },
  ];

  // Filter relevant representatives
  const getRepForPosition = (type: string) => {
    if (!location) return null;
    
    return SAMPLE_POLITICIANS.find(p => {
      if (p.position !== type) return false;
      
      if (type === 'Governor' || type === 'Senator') {
        return p.county?.toLowerCase() === location.county?.toLowerCase();
      }
      if (type === 'MP') {
        return p.constituency?.toLowerCase() === location.constituency?.toLowerCase();
      }
      if (type === 'MCA') {
        return p.ward?.toLowerCase() === location.ward?.toLowerCase();
      }
      return false;
    });
  };
  return (
    <Card className="bg-brand-surface border-border h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
            <CardTitle className="text-lg">My Representatives</CardTitle>
            <Button variant="link" size="sm" className="text-brand-primary p-0 h-auto">View All <ArrowRight className="w-4 h-4 ml-1" /></Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {positions.map((pos, idx) => {
          const rep = getRepForPosition(pos.type);
          
          if (rep) {
            return (
              <div key={rep.id} className="flex flex-col gap-3 p-4 rounded-xl bg-brand-bg/50 border border-border hover:border-brand-primary/30 transition-all group relative overflow-hidden">
                  {/* Background Accent */}
                  <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full opacity-5 blur-2xl ${PARTY_METADATA[rep.party]?.color || 'bg-brand-primary'}`} />
                  
                  <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-brand-surface shadow-lg">
                          <AvatarImage src={rep.photo} />
                          <AvatarFallback className="font-bold">{rep.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                              <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest">{rep.position}</p>
                              {rep.isIncumbent && (
                                  <span className="bg-green-500/10 text-green-500 text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-tighter">Incumbent</span>
                              )}
                          </div>
                          <p className="font-bold truncate text-brand-text leading-tight">{rep.name}</p>
                          <p className="text-[10px] text-brand-text-muted truncate font-medium uppercase tracking-wide">
                              {rep.ward || rep.constituency || rep.county || "Kenya"}
                          </p>
                      </div>
                      <Link href={`/representatives/${rep.id}`}>
                          <Button size="icon" variant="ghost" className="rounded-full hover:bg-brand-primary/10 hover:text-brand-primary">
                              <Eye className="w-4 h-4" />
                          </Button>
                      </Link>
                  </div>

                  {/* Fact Data Section */}
                  {rep.trackRecord && (
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 mt-1">
                          <div className="text-center">
                              <div className="flex items-center justify-center gap-1 text-brand-text-muted mb-0.5">
                                  <Users className="w-2.5 h-2.5" />
                                  <span className="text-[8px] font-black uppercase tracking-tighter">Attnd</span>
                              </div>
                              <p className="text-xs font-black text-white">{rep.trackRecord.attendanceRate}%</p>
                          </div>
                          <div className="text-center border-x border-white/5">
                              <div className="flex items-center justify-center gap-1 text-brand-text-muted mb-0.5">
                                  <FileText className="w-2.5 h-2.5" />
                                  <span className="text-[8px] font-black uppercase tracking-tighter">Bills</span>
                              </div>
                              <p className="text-xs font-black text-white">{rep.trackRecord.billsSponsored}</p>
                          </div>
                          <div className="text-center">
                              <div className="flex items-center justify-center gap-1 text-brand-text-muted mb-0.5">
                                  <TrendingUp className="w-2.5 h-2.5" />
                                  <span className="text-[8px] font-black uppercase tracking-tighter">Proj</span>
                              </div>
                              <p className="text-xs font-black text-white">{rep.trackRecord.projectsCompleted}</p>
                          </div>
                      </div>
                  )}
              </div>
            );
          }

          // Placeholder for missing representative data
          return (
            <div key={idx} className="p-4 rounded-xl bg-brand-bg/30 border border-dashed border-white/10 flex flex-col gap-1 items-center justify-center text-center group">
               <p className="text-[10px] font-black text-brand-text-muted uppercase tracking-widest">{pos.role}</p>
               <p className="text-[10px] text-brand-text-muted/60 italic">
                 {pos.area ? `Data for ${pos.area} coming soon` : "Select location in profile to see leader"}
               </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
