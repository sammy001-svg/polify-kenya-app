"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MapPin, Clock, Plus, Users } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MOCK_EVENTS = [
  { id: 1, day: 28, title: "Town Hall: Youth Jobs", time: "10:00 AM", location: "Central Ward Hall", type: "rally" },
  { id: 2, day: 29, title: "Market Visit", time: "06:00 AM", location: "Gikomba Market", type: "meetup" },
  { id: 3, day: 5, title: "TV Debate Prep", time: "02:00 PM", location: "Campaign HQ", type: "internal" },
];

export function EventsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Simple calendar grid generation
  const daysInMonth = 31; // Mocking for demo
  const startDay = 3; // Wednesday start for mock

  return (
    <div className="bg-brand-surface border border-white/5 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
           <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
             <CalendarIcon className="w-4 h-4 text-kenya-red" /> Campaign Schedule
           </h3>
           <p className="text-xs text-brand-text-muted mt-1">January 2026</p>
        </div>
        <div className="flex gap-1">
           <button className="p-1 rounded hover:bg-white/10 text-white"><ChevronLeft className="w-4 h-4" /></button>
           <button className="p-1 rounded hover:bg-white/10 text-white"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
         {DAYS.map(day => (
           <div key={day} className="text-[10px] font-bold text-brand-text-muted uppercase py-2">{day}</div>
         ))}
      </div>

      <div className="grid grid-cols-7 gap-1 flex-1">
         {Array.from({ length: startDay }).map((_, i) => (
           <div key={`empty-${i}`} className="aspect-square bg-transparent" />
         ))}
         {Array.from({ length: daysInMonth }).map((_, i) => {
           const day = i + 1;
           const events = MOCK_EVENTS.filter(e => e.day === day);
           const isToday = day === 28;

           return (
             <div 
               key={day} 
               className={cn(
                 "aspect-square rounded-lg border border-white/5 p-1 relative flex flex-col justify-between hover:bg-white/5 transition-colors cursor-pointer group",
                 isToday && "bg-kenya-red/10 border-kenya-red/30"
               )}
             >
                <span className={cn(
                  "text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full",
                   isToday ? "bg-kenya-red text-white" : "text-brand-text-muted group-hover:text-white"
                )}>
                  {day}
                </span>

                {events.map((event, idx) => (
                   <div key={idx} className={cn(
                     "mt-1 w-full h-1.5 rounded-full mb-0.5",
                     event.type === 'rally' ? "bg-kenya-red" :
                     event.type === 'meetup' ? "bg-kenya-green" : "bg-kenya-gold"
                   )} />
                ))}
             </div>
           );
         })}
      </div>

      {/* Upcoming Events List */}
      <div className="mt-6 space-y-3 pt-6 border-t border-white/5">
         <div className="flex justify-between items-center">
             <h4 className="text-xs font-bold text-white uppercase">Upcoming</h4>
             <button className="p-1 rounded-full bg-brand-primary/20 text-brand-primary hover:bg-brand-primary/30">
                <Plus className="w-3 h-3" />
             </button>
         </div>
         
         <div className="space-y-3">
            {MOCK_EVENTS.map(event => (
               <div key={event.id} className="flex gap-3 items-start group cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex flex-col items-center justify-center shrink-0 border border-white/10",
                    event.type === 'rally' ? "bg-kenya-red/20 text-kenya-red" :
                    event.type === 'meetup' ? "bg-kenya-green/20 text-kenya-green" : "bg-kenya-gold/20 text-kenya-gold"
                  )}>
                     <span className="text-xs font-black">{event.day}</span>
                     <span className="text-[8px] uppercase font-bold text-white/50">Jan</span>
                  </div>
                  <div className="flex-1 min-w-0">
                     <p className="text-xs font-bold text-white truncate group-hover:text-brand-primary transition-colors">{event.title}</p>
                     <div className="flex items-center gap-3 mt-1 text-[10px] text-brand-text-muted">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.time}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
