import { BILLS, VOTING_RECORDS } from "@/lib/parliament-data";
import { BillStatusCard } from "@/components/parliament/BillStatusCard";
import { VotingTable } from "@/components/parliament/VotingTable";
import { HansardSearch } from "@/components/parliament/HansardSearch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gavel, FileText, Vote } from "lucide-react";

export default function ParliamentPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
          <Gavel className="w-10 h-10 text-brand-primary" />
          Parliament Watch
        </h1>
        <p className="text-brand-text-muted text-lg max-w-2xl">
          Track legislative progress, monitor representation, and search parliamentary records in real-time.
        </p>
      </div>

      <Tabs defaultValue="bills" className="w-full">
        <TabsList className="bg-brand-surface border border-white/5 mb-8 p-1 rounded-xl h-auto">
          <TabsTrigger 
            value="bills" 
            className="data-[state=active]:bg-brand-primary data-[state=active]:text-black px-6 py-2.5 rounded-lg flex gap-2 items-center transition-all"
          >
            <FileText className="w-4 h-4" />
            Active Bills
          </TabsTrigger>
          <TabsTrigger 
            value="voting" 
            className="data-[state=active]:bg-brand-primary data-[state=active]:text-black px-6 py-2.5 rounded-lg flex gap-2 items-center transition-all"
          >
            <Vote className="w-4 h-4" />
            Voting Records
          </TabsTrigger>
          <TabsTrigger 
            value="hansard" 
            className="data-[state=active]:bg-brand-primary data-[state=active]:text-black px-6 py-2.5 rounded-lg flex gap-2 items-center transition-all"
          >
            <Gavel className="w-4 h-4" />
            Hansard Search
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bills" className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BILLS.map((bill) => (
              <BillStatusCard key={bill.id} bill={bill} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="voting" className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-brand-surface border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Vote className="w-5 h-5 text-brand-primary" />
                Latest Division Votes
            </h2>
            <VotingTable initialVotes={VOTING_RECORDS} />
          </div>
        </TabsContent>

        <TabsContent value="hansard" className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-brand-surface border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-primary" />
                Parliamentary Records (Hansard)
            </h2>
            <HansardSearch />
          </div>
        </TabsContent>
        
      </Tabs>
    </div>
  );
}
