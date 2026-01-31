import { Bill } from "@/lib/parliament-data";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ArrowRight, Calendar, User, CheckCircle2, XCircle, Clock } from "lucide-react";
import Link from "next/link";

interface BillStatusCardProps {
  bill: Bill;
}

export function BillStatusCard({ bill }: BillStatusCardProps) {
  const getStatusColor = (status: Bill["status"]) => {
    switch (status) {
      case "Assented": return "text-green-500 bg-green-500/10 border-green-500/20";
      case "Rejected":
      case "Withdrawn": return "text-red-500 bg-red-500/10 border-red-500/20";
      default: return "text-blue-500 bg-blue-500/10 border-blue-500/20";
    }
  };

  return (
    <div className="group relative bg-brand-surface border border-white/5 rounded-2xl p-6 hover:border-brand-primary/50 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <Badge variant="outline" className={cn("flex items-center gap-1.5", getStatusColor(bill.status))}>
            {bill.status === "Assented" && <CheckCircle2 className="w-3.5 h-3.5" />}
            {(bill.status === "Rejected" || bill.status === "Withdrawn") && <XCircle className="w-3.5 h-3.5" />}
            {!["Assented", "Rejected", "Withdrawn"].includes(bill.status) && <Clock className="w-3.5 h-3.5" />}
            {bill.status}
        </Badge>
        <span className="text-xs text-brand-text-muted flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {bill.lastUpdated}
        </span>
      </div>

      <h3 className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors mb-2">
        {bill.title}
      </h3>

      <div className="flex items-center gap-2 text-xs text-brand-text-muted mb-4">
        <User className="w-3.5 h-3.5" />
        <span>Sponsor: {bill.sponsor}</span>
      </div>

      <p className="text-sm text-brand-text-muted mb-6 line-clamp-2">
        {bill.summary}
      </p>

      {/* Progress Bar */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-[10px] text-brand-text-muted uppercase tracking-wider font-semibold">
            <span>Introduction</span>
            <span>Committee</span>
            <span>Assent</span>
        </div>
        <Progress value={bill.progress} className="h-1.5 bg-white/10" indicatorClassName={
            bill.status === "Withdrawn" || bill.status === "Rejected" ? "bg-red-500" : "bg-brand-primary"
        } />
      </div>

      <Link href={`/parliament/bills/${bill.id}`} className="flex items-center gap-2 text-sm font-medium text-white hover:text-brand-primary transition-colors">
        View Full Details
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
