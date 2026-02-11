"use client";

import { Job } from "@/app/(platform)/jobs/actions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { MapPin, Briefcase, Calendar, Building2, ArrowUpRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="group overflow-hidden bg-brand-surface/40 backdrop-blur-md border-white/10 hover:border-brand-primary/30 transition-all duration-300 flex flex-col h-full hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl font-black text-white group-hover:text-brand-primary transition-colors">
              {job.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-brand-text-muted text-sm font-medium">
              <Building2 className="w-4 h-4" />
              <span>{job.company}</span>
            </div>
          </div>
          <Badge variant="outline" className="border-brand-primary/20 text-brand-primary bg-brand-primary/10 whitespace-nowrap">
            {job.type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 grow">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-brand-text-muted">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {job.location}
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" />
            {job.salary_range}
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formatDistanceToNow(new Date(job.posted_at), { addSuffix: true })}
          </div>
        </div>
        
        <CardDescription className="line-clamp-3 text-sm leading-relaxed text-white/70">
          {job.description}
        </CardDescription>
        
        <div className="pt-2">
           <Badge variant="secondary" className="bg-white/5 hover:bg-white/10 text-xs font-normal text-white/60">
             {job.category}
           </Badge>
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Link 
          href={job.application_link}
          className="inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 disabled:pointer-events-none disabled:opacity-50 h-11 px-6 text-sm w-full bg-white/5 hover:bg-brand-primary hover:text-black text-white border border-white/10 group-hover:border-brand-primary/50 gap-2"
        >
          Apply Now
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
