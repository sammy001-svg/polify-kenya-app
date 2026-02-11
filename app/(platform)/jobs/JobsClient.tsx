"use client";

import { useState } from "react";
import { Job } from "./actions";
import { JobCard } from "@/components/jobs/JobCard";
import { Search, Filter, Briefcase, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface JobsClientProps {
  initialJobs: Job[];
}

export function JobsClient({ initialJobs }: JobsClientProps) {
  const [jobs] = useState<Job[]>(initialJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Government", "NGO", "Tech", "Agriculture", "Healthcare", "Education", "Other"];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || job.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-10 pb-20">
      {/* Hero Section */}
      <section className="relative h-[250px] md:h-[300px] rounded-3xl overflow-hidden mb-8 group">
        <div className="absolute inset-0 bg-linear-to-r from-kenya-black via-kenya-black/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" />
        
        <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-12 max-w-2xl space-y-4">
          <div className="flex items-center gap-2 text-brand-primary uppercase tracking-widest text-xs font-black">
             <Briefcase className="w-4 h-4" />
             <span>Career Opportunities</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold italic tracking-tighter text-white leading-none">
            FIND YOUR <span className="title-green">IMPACT</span>
          </h1>
          <p className="text-lg text-white/70 font-medium leading-relaxed max-w-lg">
            Discover roles in government, NGOs, and civic-tech. Build your career while building the nation.
          </p>
        </div>
      </section>

      {/* Control Bar */}
      <div className="sticky top-20 z-40 flex flex-col md:flex-row gap-4 justify-between items-center bg-black/80 p-4 rounded-2xl border border-white/10 backdrop-blur-2xl transition-all duration-300 shadow-xl">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted" />
            <input
              type="text"
              placeholder="Search by title, company, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-surface border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-primary transition-colors placeholder:text-white/20"
            />
          </div>
          <div className="h-8 w-px bg-white/10 hidden md:block" />
          <Filter className="w-4 h-4 text-brand-text-muted cursor-pointer hover:text-brand-primary transition-colors hidden md:block" />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar items-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                activeCategory === cat
                  ? "bg-brand-primary text-black border-brand-primary shadow-[0_0_10px_rgba(255,193,7,0.3)]"
                  : "bg-white/5 text-brand-text-muted border-white/10 hover:border-white/20 hover:bg-white/10",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Job List */}
      <div className="space-y-4">
          <div className="flex items-center justify-between text-brand-text-muted text-xs uppercase tracking-widest font-bold px-1"> 
             <span>{filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found</span>
             <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> All Locations</span>
          </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-24 bg-brand-surface/20 rounded-3xl border border-dashed border-white/10 flex flex-col items-center space-y-6">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center animate-pulse">
              <Search className="w-8 h-8 text-brand-text-muted opacity-30" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black italic tracking-tighter text-white">
                No Opportunities Found
              </h3>
              <p className="text-brand-text-muted max-w-xs mx-auto text-sm font-medium">
                Try adjusting your search terms or filters to find what you&apos;re looking for.
              </p>
            </div>
            <Button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              variant="outline"
              className="rounded-full border-white/20 text-xs font-black uppercase tracking-widest px-8 hover:bg-white/10 hover:text-white"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
