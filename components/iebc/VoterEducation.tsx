"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ClipboardCheck,
  ShieldCheck,
  Search,
  Scale,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { mockEducationResources } from "@/data/iebc-data";

const iconMap: Record<string, React.ElementType> = {
  ClipboardCheck,
  ShieldCheck,
  Search,
  Scale,
};

export function VoterEducation() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-kenya-green" />
            Voter Education Hub
          </h2>
          <p className="text-sm text-brand-text-muted">
            Empowering you with knowledge for the next election.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-brand-primary hover:text-brand-primary/80 gap-1"
        >
          View All <ArrowRight className="w-3 h-3" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockEducationResources.map((resource) => {
          const Icon = iconMap[resource.icon] || ClipboardCheck;
          return (
            <Card
              key={resource.id}
              className="bg-brand-surface border-white/5 hover:border-brand-primary/20 transition-all group cursor-pointer overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon className="w-16 h-16" />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-white/5 text-brand-primary border border-white/5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">
                    {resource.category}
                  </span>
                </div>
                <CardTitle className="text-sm font-bold group-hover:text-brand-primary transition-colors">
                  {resource.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-brand-text-muted leading-relaxed line-clamp-2">
                  {resource.summary}
                </p>
                <div className="mt-4 flex items-center gap-1 text-[10px] font-black uppercase text-brand-primary opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  Read More <ExternalLink className="w-3 h-3" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-linear-to-br from-kenya-red/20 to-transparent border-kenya-red/20 overflow-hidden relative group">
        <div className="absolute -bottom-4 -right-4 opacity-10 rotate-12 transition-transform group-hover:scale-110 group-hover:rotate-6">
          <ClipboardCheck className="w-32 h-32 text-white" />
        </div>
        <CardContent className="p-6 relative z-10">
          <h3 className="text-lg font-black italic tracking-tighter text-white mb-2">
            READY TO REGISTER?
          </h3>
          <p className="text-sm text-white/70 max-w-sm mb-4 leading-relaxed font-medium">
            Join the millions of Kenyans making their voices count. Find your
            nearest registration centre today.
          </p>
          <Button className="bg-white text-black font-black uppercase tracking-widest text-[10px] h-9 px-6 rounded-xl hover:bg-white/90">
            Find Centres Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
