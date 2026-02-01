import { Trophy, Star, Target, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ProfileStats() {
  return (
    <Card className="bg-brand-surface border-border overflow-hidden relative">
        <div className="absolute top-0 right-0 p-32 bg-brand-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-kenya-gold" />
          Civic Impact
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 relative z-10">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-brand-text-muted">Civic Score</span>
            <span className="font-bold text-kenya-green">850 / 1000</span>
          </div>
          <Progress value={85} className="h-2 bg-brand-bg" indicatorClassName="bg-kenya-green" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-brand-bg/50 rounded-lg border border-border flex items-center gap-3">
             <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
                <Star className="w-4 h-4" />
             </div>
             <div>
                <p className="text-xs text-brand-text-muted uppercase font-bold">Rank</p>
                <p className="text-sm font-bold">Ward Admin</p>
             </div>
          </div>
          <div className="p-3 bg-brand-bg/50 rounded-lg border border-border flex items-center gap-3">
             <div className="p-2 rounded-full bg-purple-500/10 text-purple-500">
                <Target className="w-4 h-4" />
             </div>
             <div>
                <p className="text-xs text-brand-text-muted uppercase font-bold">Impact</p>
                <p className="text-sm font-bold">Top 5%</p>
             </div>
          </div>
        </div>
        
        <div className="pt-2 border-t border-border flex justify-between items-center text-xs text-brand-text-muted">
            <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-kenya-green" />
                <span className="text-kenya-green font-bold">+12%</span> this month
            </div>
            <span>Next Rank: MCA (150 pts)</span>
        </div>
      </CardContent>
    </Card>
  );
}
