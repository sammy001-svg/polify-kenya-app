import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

const MOCK_REPS = [
  {
    role: "Governor",
    name: "Sakaja Arthur Johnson",
    image: "https://pbs.twimg.com/profile_images/1564556487532380161/7k_gQeQ__400x400.jpg",
    area: "Nairobi City County"
  },
  {
    role: "Senator",
    name: "Edwin Sifuna",
    image: "https://pbs.twimg.com/profile_images/1615286154694164481/u2J2V2k__400x400.jpg",
    area: "Nairobi Senate"
  },
  {
    role: "MP",
    name: "Babu Owino",
    image: "https://pbs.twimg.com/profile_images/1582267606354890753/wXyH_3q3_400x400.jpg",
    area: "Embakasi East"
  }
];

export function MyRepresentatives() {
  return (
    <Card className="bg-brand-surface border-border h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
            <CardTitle className="text-lg">My Representatives</CardTitle>
            <Button variant="link" size="sm" className="text-brand-primary p-0 h-auto">View All <ArrowRight className="w-4 h-4 ml-1" /></Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {MOCK_REPS.map((rep, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-brand-bg/50 border border-border hover:border-brand-primary/30 transition-colors group">
                <Avatar className="h-12 w-12 border-2 border-brand-surface">
                    <AvatarImage src={rep.image} />
                    <AvatarFallback>{rep.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-brand-primary uppercase tracking-wide">{rep.role}</p>
                    <p className="font-semibold truncate text-brand-text">{rep.name}</p>
                    <p className="text-xs text-brand-text-muted truncate">{rep.area}</p>
                </div>
                <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Mail className="w-4 h-4" />
                </Button>
            </div>
        ))}
      </CardContent>
    </Card>
  );
}
