"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Calendar, MapPin, Mic2, Users, Briefcase, Clock } from "lucide-react";

type EventType = 'Rally' | 'TownHall' | 'Fundraiser' | 'MeetUp';

interface CampaignEvent {
    id: string;
    title: string;
    type: EventType;
    description: string;
    location: string;
    date: string;
    time: string;
    status: string;
}

const getEventIcon = (type: EventType) => {
    switch (type) {
        case 'Rally': return <Mic2 className="w-4 h-4" />;
        case 'TownHall': return <Users className="w-4 h-4" />;
        case 'Fundraiser': return <Briefcase className="w-4 h-4" />;
        default: return <Calendar className="w-4 h-4" />;
    }
};

const getEventColor = (type: EventType) => {
    switch (type) {
        case 'Rally': return 'text-kenya-red bg-kenya-red/10 border-kenya-red/20';
        case 'TownHall': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
        case 'Fundraiser': return 'text-kenya-gold bg-kenya-gold/10 border-kenya-gold/20';
        default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
};

export function PublicEventsList({ politicianId }: { politicianId: string }) {
    const [events, setEvents] = useState<CampaignEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchEvents() {
            const { data } = await supabase
                .from('campaign_events')
                .select('*')
                .eq('created_by', politicianId)
                .eq('status', 'Upcoming')
                .gte('date', new Date().toISOString()) // Only future events
                .order('date', { ascending: true })
                .limit(3); // Show top 3
            
            if (data) {
                setEvents(data as CampaignEvent[]);
            }
            setLoading(false);
        }
        fetchEvents();
    }, [politicianId, supabase]);

    if (loading) return null; // discrete loading
    if (events.length === 0) return null; // Don't show section if empty

    return (
        <div className="bg-brand-surface-secondary border border-border rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-brand-text mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-kenya-red" />
                Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                    <div key={event.id} className="bg-brand-surface-highlight border border-border hover:border-kenya-red/50 transition-colors rounded-xl p-4 flex flex-col group">
                        <div className="flex justify-between items-start mb-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold uppercase border ${getEventColor(event.type)}`}>
                                {getEventIcon(event.type)}
                                {event.type}
                            </span>
                            <div className="text-center bg-brand-surface border border-border rounded p-1 min-w-[50px]">
                                <span className="block text-[10px] uppercase font-bold text-brand-text-muted">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                                <span className="block text-xl font-black text-brand-text leading-none">{new Date(event.date).getDate()}</span>
                            </div>
                        </div>

                        <h3 className="font-bold text-lg text-brand-text mb-2 line-clamp-1 group-hover:text-kenya-red transition-colors">
                            {event.title}
                        </h3>

                        <div className="space-y-1 text-sm text-brand-text-muted mb-4 flex-1">
                             <div className="flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5" /> {event.time || new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                             </div>
                             <div className="flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5" /> {event.location}
                             </div>
                        </div>

                        <button className="w-full mt-auto py-2 bg-brand-surface border border-border rounded-lg text-xs font-bold uppercase hover:bg-white hover:text-black transition-colors">
                           RSVP Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
