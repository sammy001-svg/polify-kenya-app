import { notFound } from "next/navigation";
import Link from "next/link";
import { BILLS, VOTING_RECORDS } from "@/lib/parliament-data";
import { VotingTable } from "@/components/parliament/VotingTable";
import { ChevronLeft, Calendar, User, FileText, Share2, Info, ArrowRight, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{
    billId: string;
  }>;
}

export default async function BillDetailPage({ params }: PageProps) {
  const { billId } = await params;
  const bill = BILLS.find((b) => b.id === billId);

  if (!bill) {
    notFound();
  }

  const billVotes = VOTING_RECORDS.filter(v => v.billId === billId);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Navigation */}
      <Link 
        href="/parliament" 
        className="inline-flex items-center text-sm text-brand-text-muted hover:text-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Parliament Watch
      </Link>

      {/* Header */}
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 items-center">
            <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20">
                {bill.status}
            </Badge>
            <span className="text-brand-text-muted text-sm flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full">
                <Calendar className="w-3.5 h-3.5" />
                Updated: {bill.lastUpdated}
            </span>
        </div>
        
        <h1 className="text-4xl font-black text-white leading-tight">
            {bill.title}
        </h1>

        <div className="flex items-center gap-2 text-brand-text-muted">
            <User className="w-4 h-4" />
            <span>Sponsored by <span className="text-white font-bold">{bill.sponsor}</span></span>
        </div>
      </div>

      {/* Hero Section with Progress */}
      <div className="bg-brand-surface border border-white/5 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary/20" />
        <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-end">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Info className="w-5 h-5 text-brand-primary" />
                    Legislative Journey
                </h2>
                <span className="text-brand-primary font-black text-3xl">{bill.progress}%</span>
            </div>
            
            <div className="space-y-4">
                <Progress value={bill.progress} className="h-4 bg-white/10" indicatorClassName="bg-brand-primary" />
                <div className="grid grid-cols-4 text-[10px] sm:text-xs font-bold text-brand-text-muted uppercase tracking-widest text-center">
                    <div className={cn(bill.progress >= 20 ? "text-brand-primary" : "")}>1st Reading</div>
                    <div className={cn(bill.progress >= 50 ? "text-brand-primary" : "")}>2nd Reading</div>
                    <div className={cn(bill.progress >= 80 ? "text-brand-primary" : "")}>3rd Reading</div>
                    <div className={cn(bill.progress === 100 ? "text-brand-primary" : "")}>Assent</div>
                </div>
            </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">
        <div className="lg:col-span-2 space-y-6">
            <section className="bg-brand-surface border border-white/5 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-primary" />
                    Executive Summary
                </h3>
                <p className="text-brand-text-muted leading-relaxed text-lg">
                    {bill.summary}
                </p>
            </section>

            {/* Voting Records for this bill */}
            {billVotes.length > 0 && (
                <section className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Vote className="w-5 h-5 text-brand-primary" />
                        Division Voting Records
                    </h3>
                    <div className="bg-brand-surface border border-white/5 rounded-2xl p-6">
                        <VotingTable initialVotes={billVotes} />
                    </div>
                </section>
            )}
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-4">
            <div className="p-6 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl">
                <h4 className="font-bold mb-2">Citizen Action</h4>
                <p className="text-sm text-brand-text-muted mb-4">You can voice your opinion on this bill to your representative.</p>
                <Button className="w-full bg-brand-primary text-black hover:bg-brand-primary/90 gap-2">
                    Message MP
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
            <Button variant="outline" className="w-full gap-2 py-6">
                <Share2 className="w-4 h-4" />
                Share Analysis
            </Button>
        </div>
      </div>
    </div>
  );
}
