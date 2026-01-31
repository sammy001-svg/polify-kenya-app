"use client";

import { useState } from "react";
import { HANSARD_RECORDS } from "@/lib/parliament-data";
import { Search, FileText, Calendar } from "lucide-react";

export function HansardSearch() {
  const [query, setQuery] = useState("");
  
  const results = HANSARD_RECORDS.filter(record => 
    record.title.toLowerCase().includes(query.toLowerCase()) ||
    record.summary.toLowerCase().includes(query.toLowerCase()) ||
    record.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="space-y-6">
       <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-muted" />
        <input 
            type="text"
            placeholder="Search keywords (e.g. 'Finance Bill', 'Education', 'Tax')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-brand-surface border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-brand-text-muted focus:outline-none focus:ring-1 focus:ring-brand-primary/50 transition-all"
        />
       </div>

       <div className="space-y-4">
        {results.map(record => (
            <div key={record.id} className="group bg-brand-surface border border-white/5 rounded-xl p-5 hover:border-brand-primary/30 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white group-hover:text-brand-primary transition-colors">{record.title}</h4>
                    <span className="text-xs text-brand-text-muted flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                        <Calendar className="w-3 h-3" />
                        {record.date}
                    </span>
                </div>
                <p className="text-sm text-brand-text-muted mb-3">{record.summary}</p>
                <div className="flex flex-wrap gap-2">
                    {record.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-semibold text-brand-text uppercase px-2 py-1 bg-white/5 rounded-full border border-white/5">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        ))}

        {results.length === 0 && (
            <div className="text-center py-12 opacity-50">
                <FileText className="w-12 h-12 text-brand-text-muted mx-auto mb-3" />
                <p className="text-brand-text-muted">No hansard records found matching &quot;{query}&quot;</p>
            </div>
        )}
       </div>
    </div>
  );
}
