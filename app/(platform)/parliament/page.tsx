"use client";

import { useState } from "react";
import { BillKanban } from "@/components/parliament/BillKanban";
import { MOCK_BILLS } from "@/lib/parliament-data";
import { Search, Filter, BookOpen, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ParliamentPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleVote = (id: string, vote: 'yay' | 'nay') => {
    // In a real app, this would mutate state/DB
    console.log(`Voted ${vote} on bill ${id}`);
    alert(`Vote recorded: ${vote.toUpperCase()} for Bill ${id}`);
  };

  return (
    <div className="flex flex-col h-full bg-black/95">
      {/* Header & Search */}
      <div className="p-6 border-b border-white/5 bg-brand-surface sticky top-0 z-20">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
                <h1 className="text-2xl font-black tracking-tight flex items-center gap-3">
                   <span className="w-10 h-10 rounded-lg bg-kenya-green/10 flex items-center justify-center border border-kenya-green/20">
                      <BookOpen className="w-5 h-5 text-kenya-green" />
                   </span>
                   Digital Parliament
                </h1>
                <p className="text-sm text-brand-text-muted mt-1 font-medium ml-1">
                   Track Legislation • Simulate Voting • Search Hansard
                </p>
             </div>

             <div className="flex gap-2 w-full md:w-auto">
                 <div className="relative flex-1 md:w-80">
                    <Search className="w-4 h-4 text-brand-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="Search bills, sponsors, or hansard keywords..." 
                      className="w-full bg-brand-surface-secondary border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-hidden focus:border-brand-primary/50 transition-all text-white placeholder:text-white/20"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                 </div>
                 <Button variant="outline" className="border-white/10 bg-brand-surface-secondary text-brand-text-muted hover:text-white">
                    <Filter className="w-4 h-4 mr-2" /> Filter
                 </Button>
             </div>
         </div>
      </div>

      {/* Main Kanban Content */}
      <div className="flex-1 overflow-hidden p-6 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
         <div className="h-full">
            <BillKanban bills={MOCK_BILLS} onVote={handleVote} />
         </div>
      </div>

       {/* Floating Hansard Alert (Demo) */}
       <div className="absolute bottom-6 right-6 z-30 animate-in slide-in-from-bottom-6 duration-700 delay-500">
           <div className="bg-brand-surface border border-kenya-gold/30 p-4 rounded-xl shadow-2xl flex items-start gap-3 max-w-sm">
               <div className="bg-kenya-gold/10 p-2 rounded-lg shrink-0">
                  <AlertCircle className="w-5 h-5 text-kenya-gold" />
               </div>
               <div>
                  <h4 className="text-xs font-black uppercase text-kenya-gold tracking-widest mb-1">Live from Hansard</h4>
                  <p className="text-xs text-brand-text-muted leading-relaxed">
                     <span className="text-white font-bold">Hon. A. M. Ochieng</span> is currently debating the <span className="text-white font-bold">Digital Economy Bill</span>. &quot;We must protect local freelancers from double taxation...&quot;
                  </p>
                  <button className="text-[10px] font-bold text-white mt-2 hover:underline">
                     Read Full Transcript →
                  </button>
               </div>
           </div>
       </div>
    </div>
  );
}
