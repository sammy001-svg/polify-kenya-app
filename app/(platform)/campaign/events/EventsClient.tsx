"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Plus,
  Mic2,
  HandHeart,
  Briefcase,
  Loader2,
  Trash2,
  Rocket,
  Megaphone,
  Handshake,
} from "lucide-react";
import Link from "next/link";
import {
  createEvent,
  deleteEvent,
  CampaignEvent,
  EventType,
} from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/lib/supabase";
import { cn } from "@/lib/utils";

const getEventIcon = (type: EventType) => {
  switch (type) {
    case "Rally":
      return <Mic2 className="w-5 h-5" />;
    case "TownHall":
      return <Users className="w-5 h-5" />;
    case "Fundraiser":
      return <Briefcase className="w-5 h-5" />;
    case "MeetUp":
      return <Handshake className="w-5 h-5" />;
    case "Press":
      return <Megaphone className="w-5 h-5" />;
    case "Launch":
      return <Rocket className="w-5 h-5" />;
    default:
      return <Calendar className="w-5 h-5" />;
  }
};

const getEventColor = (type: EventType) => {
  switch (type) {
    case "Rally":
      return "text-kenya-red bg-kenya-red/10 border-kenya-red/20";
    case "TownHall":
      return "text-blue-500 bg-blue-500/10 border-blue-500/20";
    case "Fundraiser":
      return "text-kenya-gold bg-kenya-gold/10 border-kenya-gold/20";
    case "MeetUp":
      return "text-kenya-green bg-kenya-green/10 border-kenya-green/20";
    case "Press":
      return "text-purple-500 bg-purple-500/10 border-purple-500/20";
    case "Launch":
      return "text-brand-primary bg-brand-primary/10 border-brand-primary/20";
    default:
      return "text-gray-500 bg-gray-500/10 border-gray-500/20";
  }
};

interface EventsClientProps {
  initialEvents: CampaignEvent[];
}

export function EventsClient({ initialEvents }: EventsClientProps) {
  const { toast } = useToast();
  const [events, setEvents] = useState<CampaignEvent[]>(initialEvents);
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CampaignEvent>>({
    type: "TownHall",
    status: "Upcoming",
  });
  const supabase = createClient();

  // Real-time updates
  useEffect(() => {
    const channel = supabase
      .channel("events_updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "campaign_events" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setEvents((prev) => [payload.new as CampaignEvent, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setEvents((prev) =>
              prev.map((e) => (e.id === payload.new.id ? (payload.new as CampaignEvent) : e))
            );
          } else if (payload.eventType === "DELETE") {
            setEvents((prev) => prev.filter((e) => e.id === payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // Dynamic Stats
  const volNeeded = useMemo(() => {
    return events.reduce(
      (acc, e) => acc + (Math.max(0, (e.volunteers_needed || 0) - (e.volunteers_registered || 0))),
      0
    );
  }, [events]);

  const handleCreate = async () => {
    if (!newEvent.title || !newEvent.date || !newEvent.location) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const res = await createEvent(newEvent);

    if (res.error) {
      toast({ title: "Error", description: res.error, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Event scheduled successfully." });
      setShowAddForm(false);
      setNewEvent({ type: "TownHall", status: "Upcoming" });
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to cancel and delete this event?"))
      return;
    const res = await deleteEvent(id);
    if (res.error) {
      toast({ title: "Error", description: res.error, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Event deleted." });
    }
  };

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/campaign"
            className="p-2 hover:bg-brand-surface-secondary rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-brand-text-muted" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="w-6 h-6 text-kenya-red" />
              Campaign Scheduler
            </h1>
            <p className="text-sm text-brand-text-muted">
              Manage events, rallies, and volunteer assignments.
            </p>
          </div>
        </div>
        <Button
          className="bg-kenya-red hover:bg-kenya-red/90 text-white gap-2"
          onClick={() => setShowAddForm(true)}
        >
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
                  value={newEvent.title || ""}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Event Type</label>
                <select
                  className="flex h-10 w-full rounded-md border border-border bg-brand-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={newEvent.type}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      type: e.target.value as EventType,
                    })
                  }
                >
                  <option value="Rally">Rally</option>
                  <option value="TownHall">Town Hall</option>
                  <option value="Fundraiser">Fundraiser</option>
                  <option value="MeetUp">Meet-up</option>
                  <option value="Press">Press Conference</option>
                  <option value="Launch">Policy Launch</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold">Location</label>
                <Input
                  placeholder="Venue Name"
                  value={newEvent.location || ""}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, location: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Date</label>
                <Input
                  type="date"
                  value={
                    newEvent.date && !isNaN(new Date(newEvent.date).getTime())
                      ? new Date(newEvent.date).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!val) {
                      setNewEvent({ ...newEvent, date: undefined });
                      return;
                    }
                    const date = new Date(val);
                    if (!isNaN(date.getTime())) {
                      setNewEvent({
                        ...newEvent,
                        date: date.toISOString(),
                      });
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Time</label>
                <Input
                  type="time"
                  value={newEvent.time || ""}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, time: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold">Event Description</label>
              <Textarea
                placeholder="Event details..."
                value={newEvent.description || ""}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold">Header Image URL</label>
              <Input
                placeholder="https://images.unsplash.com/..."
                value={newEvent.image_url || ""}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, image_url: e.target.value })
                }
              />
              <p className="text-[10px] text-brand-text-muted mt-1 italic">
                Use high-quality images from Unsplash for better visibility.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center gap-2">
                <HandHeart className="w-4 h-4 text-kenya-green" /> Volunteers
                Needed
              </label>
              <Input
                type="number"
                placeholder="0"
                className="w-32"
                value={newEvent.volunteers_needed ?? ""}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setNewEvent({
                    ...newEvent,
                    volunteers_needed: isNaN(val) ? 0 : val,
                  });
                }}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="ghost" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button
                className="bg-kenya-red text-white"
                onClick={handleCreate}
                disabled={submitting}
              >
                {submitting && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Save Event
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {events.length === 0 && !showAddForm ? (
        <div className="text-center py-16 border-2 border-dashed border-border rounded-xl">
          <Calendar className="w-12 h-12 text-brand-text-muted mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold mb-2">No Events Scheduled</h3>
          <p className="text-brand-text-muted mb-6">
            Start planning your campaign trail today.
          </p>
          <Button onClick={() => setShowAddForm(true)}>
            Schedule First Event
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Event List */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              Upcoming Events
              <Badge variant="outline" className="ml-2">
                {events.length}
              </Badge>
            </h3>
            {events.map((event) => (
              <Card
                key={event.id}
                className="border-border hover:border-brand-text-muted transition-colors group"
              >
                <CardContent className="p-0 flex flex-col md:flex-row relative">
                  {/* Date Box */}
                  <div className="bg-brand-surface-secondary p-6 md:w-32 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
                    <span className="text-xs font-bold uppercase text-brand-text-muted">
                      {new Date(event.date).toLocaleString("default", {
                        month: "short",
                      })}
                    </span>
                    <span className="text-3xl font-black text-brand-text">
                      {new Date(event.date).getDate()}
                    </span>
                    <span className="text-xs text-brand-text-muted">
                      {event.time}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="p-6 flex-1 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div
                        className={cn(
                          "inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold uppercase border",
                          getEventColor(event.type)
                        )}
                      >
                        {getEventIcon(event.type)}
                        {event.type}
                      </div>
                      <div className="text-sm text-brand-text-muted flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {event.location}
                      </div>
                    </div>
                    <h4 className="font-bold text-lg group-hover:text-kenya-red transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-sm text-brand-text-muted line-clamp-2">
                      {event.description}
                    </p>

                    <div className="mt-auto pt-4 flex items-center gap-6 text-xs font-medium">
                      <div className="flex items-center gap-1 text-brand-text">
                        <Users className="w-4 h-4 text-brand-text-muted" />
                        {event.volunteers_registered || 0} RSVPs
                      </div>
                      {event.volunteers_needed > 0 && (
                        <div className="flex items-center gap-1 text-kenya-green">
                          <HandHeart className="w-4 h-4" />
                          {event.volunteers_registered || 0}/
                          {event.volunteers_needed} Volunteers
                        </div>
                      )}
                    </div>

                    {/* Delete Action */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:bg-red-500/10"
                        onClick={() => handleDelete(event.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
                  {volNeeded}
                </div>
                <p className="text-sm opacity-90">
                  Open slots across upcoming events.
                </p>
                <Button
                  variant="secondary"
                  className="w-full mt-4 text-kenya-green font-bold"
                >
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
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <div
                      key={`head-${i}`}
                      className="font-bold text-brand-text-muted"
                    >
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {Array.from({ length: 30 }).map((_, i) => {
                    const day = i + 1;
                    const hasEvent = events.some(
                      (e) => new Date(e.date).getDate() === day,
                    );
                    return (
                      <div
                        key={i}
                        className={cn(
                          "aspect-square flex items-center justify-center rounded-full cursor-pointer hover:bg-brand-surface-secondary",
                          hasEvent ? "bg-kenya-red text-white font-bold" : ""
                        )}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
