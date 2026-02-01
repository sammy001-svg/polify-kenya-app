'use client';

import { useState } from 'react';
import { MOCK_EVENTS, CampaignEvent, EventType } from '@/lib/events-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Plus, 
  Mic2,
  HandHeart,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';

// Define type helper for styling
const getEventIcon = (type: EventType) => {
    switch (type) {
        case 'Rally': return <Mic2 className="w-5 h-5" />;
        case 'TownHall': return <Users className="w-5 h-5" />;
        case 'Fundraiser': return <Briefcase className="w-5 h-5" />;
        default: return <Calendar className="w-5 h-5" />;
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

export default function EventsPage() {
  const [events, setEvents] = useState<CampaignEvent[]>(MOCK_EVENTS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CampaignEvent>>({
      type: 'TownHall',
      status: 'Upcoming'
  });

  const handleCreate = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.location) return;

    const event: CampaignEvent = {
        id: Date.now().toString(),
        title: newEvent.title!,
        type: (newEvent.type as EventType) || 'TownHall',
        location: newEvent.location!,
        date: newEvent.date!,
        time: newEvent.time || '12:00',
        status: 'Upcoming',
        description: newEvent.description || '',
        rsvpCount: 0,
        volunteersNeeded: newEvent.volunteersNeeded || 0,
        volunteersRegistered: 0
    };

    setEvents([...events, event].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setShowAddForm(false);
    setNewEvent({ type: 'TownHall', status: 'Upcoming' });
  };

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4 space-y-8">
       {/* Header */}
       <div className="flex items-center justify-between border-b border-border pb-6">
             <div className="flex items-center gap-4">
                <Link href="/campaign" className="p-2 hover:bg-brand-surface-secondary rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-brand-text-muted" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-kenya-red" />
                        Campaign Scheduler
                    </h1>
                    <p className="text-sm text-brand-text-muted">Manage events, rallies, and volunteer assignments.</p>
                </div>
            </div>
            <Button className="bg-kenya-red hover:bg-kenya-red/90 text-white gap-2" onClick={() => setShowAddForm(true)}>
                <Plus className="w-4 h-4" /> Schedule Event
            </Button>
        </div>

        {/* Add Event Form */}
        {showAddForm && (
            <Card className="border-kenya-red/50 animate-in fade-in slide-in-from-top-4">
                <CardHeader>
                    <CardTitle>Schedule New Event</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Event Title</label>
                            <Input 
                                placeholder="e.g., Ward 4 Meet-up" 
                                value={newEvent.title || ''}
                                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Event Type</label>
                            <select 
                                className="flex h-10 w-full rounded-md border border-border bg-brand-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                value={newEvent.type}
                                onChange={(e) => setNewEvent({...newEvent, type: e.target.value as EventType})}
                            >
                                <option value="Rally">Rally</option>
                                <option value="TownHall">Town Hall</option>
                                <option value="Fundraiser">Fundraiser</option>
                                <option value="MeetUp">Meet-up</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Location</label>
                            <Input 
                                placeholder="Venue Name" 
                                value={newEvent.location || ''}
                                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Date</label>
                            <Input 
                                type="date"
                                value={newEvent.date || ''}
                                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Time</label>
                            <Input 
                                type="time"
                                value={newEvent.time || ''}
                                onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Description</label>
                        <Textarea 
                            placeholder="Event details..."
                            value={newEvent.description || ''}
                            onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                        />
                    </div>

                    <div className="space-y-2">
                         <label className="text-sm font-bold flex items-center gap-2">
                             <HandHeart className="w-4 h-4 text-kenya-green" /> Volunteers Needed
                         </label>
                         <Input 
                             type="number" 
                             placeholder="0"
                             className="w-32" 
                             value={newEvent.volunteersNeeded || ''}
                             onChange={(e) => setNewEvent({...newEvent, volunteersNeeded: parseInt(e.target.value)})}
                         />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</Button>
                        <Button className="bg-kenya-red text-white" onClick={handleCreate}>Save Event</Button>
                    </div>
                </CardContent>
            </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Event List */}
            <div className="lg:col-span-2 space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    Upcoming Events
                    <Badge variant="outline" className="ml-2">{events.length}</Badge>
                </h3>
                {events.map((event) => (
                    <Card key={event.id} className="border-border hover:border-brand-text-muted transition-colors group">
                        <CardContent className="p-0 flex flex-col md:flex-row">
                            {/* Date Box */}
                            <div className="bg-brand-surface-secondary p-6 md:w-32 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
                                <span className="text-xs font-bold uppercase text-brand-text-muted">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                                <span className="text-3xl font-black text-brand-text">{new Date(event.date).getDate()}</span>
                                <span className="text-xs text-brand-text-muted">{event.time}</span>
                            </div>

                            {/* Details */}
                            <div className="p-6 flex-1 flex flex-col gap-2">
                                <div className="flex justify-between items-start">
                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold uppercase border ${getEventColor(event.type)}`}>
                                        {getEventIcon(event.type)}
                                        {event.type}
                                    </div>
                                    <div className="text-sm text-brand-text-muted flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> {event.location}
                                    </div>
                                </div>
                                <h4 className="font-bold text-lg group-hover:text-kenya-red transition-colors">{event.title}</h4>
                                <p className="text-sm text-brand-text-muted line-clamp-2">{event.description}</p>
                                
                                <div className="mt-auto pt-4 flex items-center gap-6 text-xs font-medium">
                                    <div className="flex items-center gap-1 text-brand-text">
                                        <Users className="w-4 h-4 text-brand-text-muted" />
                                        {event.rsvpCount} RSVPs
                                    </div>
                                    {event.volunteersNeeded > 0 && (
                                        <div className="flex items-center gap-1 text-kenya-green">
                                            <HandHeart className="w-4 h-4" />
                                            {event.volunteersRegistered}/{event.volunteersNeeded} Volunteers
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Stats / Sidebar */}
            <div className="space-y-6">
                <Card className="bg-kenya-green text-white border-none">
                     <CardContent className="p-6">
                         <h3 className="font-bold mb-1">Volunteers Needed</h3>
                         <div className="text-4xl font-black mb-2">
                             {events.reduce((acc, e) => acc + (e.volunteersNeeded - e.volunteersRegistered), 0)}
                         </div>
                         <p className="text-sm opacity-90">Open slots across next 3 events.</p>
                         <Button variant="secondary" className="w-full mt-4 text-kenya-green font-bold">
                             Manage Volunteers
                         </Button>
                     </CardContent>
                </Card>

                <Card className="border-border">
                    <CardHeader>
                        <CardTitle className="text-base">Event Calendar</CardTitle>
                    </CardHeader>
                    <CardContent>
                         {/* Simple Mock Calendar Grid */}
                         <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                             {['S','M','T','W','T','F','S'].map((d, i) => <div key={`${d}-${i}`} className="font-bold text-brand-text-muted">{d}</div>)}
                         </div>
                         <div className="grid grid-cols-7 gap-1 text-center text-xs">
                             {Array.from({length: 30}).map((_, i) => {
                                 const day = i + 1;
                                 const hasEvent = events.some(e => new Date(e.date).getDate() === day);
                                 return (
                                     <div key={i} className={`aspect-square flex items-center justify-center rounded-full cursor-pointer hover:bg-brand-surface-secondary ${
                                         hasEvent ? 'bg-kenya-red text-white font-bold' : ''
                                     }`}>
                                         {day}
                                     </div>
                                 )
                             })}
                         </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
