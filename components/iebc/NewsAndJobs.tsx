"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Briefcase, FileText, Calendar, ChevronRight } from 'lucide-react';
import { mockNews, mockJobs } from '@/data/iebc-data';

export function NewsAndJobs() {
  return (
    <div className="space-y-6">
      {/* News Section */}
      <Card className="bg-brand-surface border-white/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
             <FileText className="h-5 w-5 text-blue-400" />
             Latest News
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockNews.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <Badge variant="outline" className="text-[10px] border-white/10 text-brand-text-muted">
                  {item.category}
                </Badge>
                <div className="flex items-center text-[10px] text-brand-text-muted gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                </div>
              </div>
              <h4 className="font-medium text-brand-text group-hover:text-kenya-red transition-colors text-sm line-clamp-2">
                {item.title}
              </h4>
              <p className="text-xs text-brand-text-muted mt-1 line-clamp-2">
                {item.summary}
              </p>
            </div>
          ))}
          <Button variant="link" className="w-full text-xs text-brand-text-muted hover:text-white h-auto p-0 pt-2">
            View All News <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </CardContent>
      </Card>

      {/* Jobs Section */}
      <Card className="bg-brand-surface border-white/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
             <Briefcase className="h-5 w-5 text-orange-400" />
             Career Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockJobs.map((job) => (
            <div key={job.id} className="flex items-start justify-between p-3 rounded-md bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
              <div>
                <h4 className="font-medium text-brand-text text-sm">{job.title}</h4>
                <div className="text-[11px] text-brand-text-muted mt-1 flex flex-col sm:flex-row sm:gap-2">
                    <span>{job.department}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{job.location}</span>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-brand-text-muted hover:text-white">
                 <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
