"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle2, Clock, PlayCircle } from "lucide-react";
import { mockTimeline, TimelineEvent } from "@/data/iebc-data";
import { cn } from "@/lib/utils";

export function ElectionTimeline() {
  return (
    <Card className="bg-brand-surface border-white/5 h-full">
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <Calendar className="w-5 h-5 text-kenya-red" />
          <CardTitle>Electoral Roadmap</CardTitle>
        </div>
        <CardDescription>
          Key milestones leading up to the 2027 General Elections.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-linear-to-b before:from-kenya-red before:via-white/20 before:to-transparent">
          {mockTimeline.map((event: TimelineEvent) => (
            <div
              key={event.id}
              className="relative flex items-start gap-6 group"
            >
              <div
                className={cn(
                  "absolute left-0 mt-1.5 w-10 h-10 rounded-full border-4 border-brand-bg flex items-center justify-center z-10 transition-transform group-hover:scale-110",
                  event.status === "Completed"
                    ? "bg-kenya-green"
                    : event.status === "Ongoing"
                      ? "bg-kenya-red animate-pulse"
                      : "bg-brand-surface-secondary border-white/10",
                )}
              >
                {event.status === "Completed" && (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                )}
                {event.status === "Ongoing" && (
                  <PlayCircle className="w-5 h-5 text-white" />
                )}
                {event.status === "Upcoming" && (
                  <Clock className="w-5 h-5 text-brand-text-muted" />
                )}
              </div>

              <div className="ml-12 bg-white/5 border border-white/5 p-4 rounded-2xl flex-1 hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">
                    {event.date}
                  </span>
                  <Badge
                    className={cn(
                      "text-[8px] font-black uppercase px-2 py-0 border-none",
                      event.status === "Completed"
                        ? "bg-kenya-green/10 text-kenya-green"
                        : event.status === "Ongoing"
                          ? "bg-kenya-red/10 text-kenya-red"
                          : "bg-white/5 text-brand-text-muted",
                    )}
                  >
                    {event.status}
                  </Badge>
                </div>
                <h4 className="font-bold text-sm text-white mb-1">
                  {event.title}
                </h4>
                <p className="text-xs text-brand-text-muted leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
