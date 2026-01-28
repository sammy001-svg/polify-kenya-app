"use client";

import { CivicEvent } from "@/lib/action-data";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventListProps {
  events: CivicEvent[];
}

export function EventList({ events }: EventListProps) {
  return (
    <div className="space-y-4">
       {events.map((event) => (
         <div key={event.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-brand-surface-secondary border border-white/5 rounded-xl hover:border-brand-primary/30 transition-all group">
             <div className="flex gap-4">
                 {/* Date Box */}
                 <div className="w-14 h-14 bg-white/5 rounded-lg flex flex-col items-center justify-center border border-white/10 shrink-0">
                     <span className="text-xs uppercase font-bold text-kenya-red">{event.date.split(' ')[0]}</span>
                     <span className="text-lg font-black text-white">{event.date.split(' ')[1].replace(',', '')}</span>
                 </div>
                 
                 <div>
                    <h4 className="font-bold text-white group-hover:text-brand-primary transition-colors">{event.title}</h4>
                    <div className="flex flex-col gap-1 mt-1">
                        <div className="flex items-center gap-1.5 text-xs text-brand-text-muted">
                            <MapPin className="w-3.5 h-3.5" /> {event.location}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-brand-text-muted">
                           <Clock className="w-3.5 h-3.5" /> {event.time} • <span className="text-kenya-green font-medium">{event.attendees} attending</span>
                        </div>
                    </div>
                 </div>
             </div>

             <Button size="sm" variant="outline" className="mt-4 md:mt-0 border-white/10 text-brand-text-muted hover:text-white hover:bg-white/10 w-full md:w-auto">
                 RSVP <ArrowRight className="w-3 h-3 ml-2" />
             </Button>
         </div>
       ))}

       <div className="bg-kenya-gold/10 border border-kenya-gold/20 rounded-xl p-4 flex items-center justify-center gap-2 text-sm font-bold text-kenya-gold hover:bg-kenya-gold/20 cursor-pointer transition-colors">
           View All 34 Upcoming Events near You
       </div>
    </div>
  );
}
