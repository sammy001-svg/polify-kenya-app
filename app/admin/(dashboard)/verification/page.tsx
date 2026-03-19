import { ShieldCheck, Scale, Landmark, UserCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const pendingAdvocates = [
  { id: "1", name: "Alice Kamau", lsk: "LSK/2024/0912", location: "Nairobi", specialty: "Constitutional Law" },
  { id: "2", name: "Bob Mwangi", lsk: "LSK/2023/1184", location: "Mombasa", specialty: "Civil Litigation" },
];

const pendingPoliticians = [
  { id: "p1", name: "Hon. Jane Doe", office: "MCA", region: "Kileleshwa", party: "Independent" },
];

export default function VerificationCenter() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Verification Center</h1>
            <p className="text-brand-text-muted text-sm">Review and approve professional credentials for platform integrity.</p>
         </div>
         <div className="flex items-center gap-2 px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-brand-primary" />
            <span className="text-xs font-bold text-brand-primary">SECURE PROTOCOL ACTIVE</span>
         </div>
      </div>

      <Tabs defaultValue="advocates" className="w-full">
        <TabsList className="bg-brand-surface border border-border">
          <TabsTrigger value="advocates" className="gap-2">
            <Scale className="w-4 h-4" />
            Advocates
          </TabsTrigger>
          <TabsTrigger value="politicians" className="gap-2">
            <Landmark className="w-4 h-4" />
            Politicians
          </TabsTrigger>
          <TabsTrigger value="organizations" className="gap-2">
             <UserCheck className="w-4 h-4" />
             Civil Societies
          </TabsTrigger>
        </TabsList>

        <TabsContent value="advocates" className="mt-6">
          <Card className="bg-brand-surface border-border">
            <CardHeader>
               <CardTitle className="text-sm font-bold text-white uppercase tracking-widest">Advocate Registration Queue</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  {pendingAdvocates.map((adv) => (
                    <div key={adv.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-black/20 group hover:border-brand-primary/30 transition-colors">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold">
                             {adv.name[0]}
                          </div>
                          <div>
                             <p className="text-sm font-bold text-white">{adv.name}</p>
                             <p className="text-[10px] text-brand-text-muted uppercase tracking-widest">{adv.lsk} • {adv.specialty}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest hover:text-red-500">Decline</Button>
                          <Button size="sm" className="bg-brand-primary hover:bg-brand-primary/80 text-black text-[10px] font-bold uppercase tracking-widest">Approve</Button>
                       </div>
                    </div>
                  ))}
               </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="politicians" className="mt-6">
          <Card className="bg-brand-surface border-border">
             <CardHeader>
                <CardTitle className="text-sm font-bold text-white uppercase tracking-widest">Candidate Verification Hub</CardTitle>
             </CardHeader>
             <CardContent>
                <div className="space-y-4">
                   {pendingPoliticians.map((pol) => (
                     <div key={pol.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-black/20 group hover:border-brand-primary/30 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold">
                              {pol.name[5]}
                           </div>
                           <div>
                              <p className="text-sm font-bold text-white">{pol.name}</p>
                              <p className="text-[10px] text-brand-text-muted uppercase tracking-widest">{pol.office} ({pol.region}) • {pol.party}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest hover:text-red-500">Flag for Review</Button>
                           <Button size="sm" className="bg-brand-primary hover:bg-brand-primary/80 text-black text-[10px] font-bold uppercase tracking-widest">Verify ID</Button>
                        </div>
                     </div>
                   ))}
                </div>
             </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
