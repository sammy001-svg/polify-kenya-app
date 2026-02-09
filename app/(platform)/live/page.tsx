/* cSpell:ignore MASHINANI PoliFy Poli */
"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, Calendar, Share2, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { EventCard } from "@/components/campaign/EventCard";
import {
  getAllPublicEvents,
  CampaignEventWithProfile,
} from "@/app/(platform)/campaign/events/actions";
import { CAMPAIGN_EVENTS, CampaignEvent, EventType } from "@/lib/events-data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

export default function TownHallPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "All" | EventType
  >("All");
  const [events, setEvents] = useState<CampaignEvent[]>(CAMPAIGN_EVENTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      const data: CampaignEventWithProfile[] = await getAllPublicEvents();
      // Map DB events to EventCard expected format
      const mappedEvents: CampaignEvent[] = (data || []).map((e) => ({
        id: e.id,
        politicianName: e.profiles?.full_name || "Unknown Candidate",
        politicianAvatar:
          e.profiles?.avatar_url ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${e.id}`,
        party: e.profiles?.party || "Independent",
        title: e.title,
        description: e.description || "No description provided.",
        image_url:
          e.image_url ||
          "https://images.unsplash.com/photo-1540910419892-f39aefe24aa2?q=80&w=2070&auto=format&fit=crop",
        location: e.location,
        date: format(new Date(e.date), "PPP") + (e.time ? ` at ${e.time}` : ""),
        type: e.type as EventType,
        attendees: `${e.volunteers_registered || 0} RSVPs`,
      }));
      setEvents([...mappedEvents, ...CAMPAIGN_EVENTS]);
      setLoading(false);
    }
    loadEvents();
  }, []);

  const handleSharePage = async () => {
    const shareData = {
      title: "PoliFy Kenya | Campaign Pulse",
      text: "Track real-time campaign rallies and events across Kenya on PoliFy!",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied",
          description: "Campaign Pulse link copied to clipboard!",
        });
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.politicianName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || event.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-10 pb-20">
      {/* Hero Section */}
      <section className="relative h-[250px] md:h-[350px] rounded-3xl overflow-hidden group">
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540910419892-f39aefe24aa2?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" />

        <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-12 max-w-2xl space-y-4">
          <Badge className="w-fit bg-kenya-red/20 text-kenya-red border-kenya-red/30 py-1 px-4 font-black uppercase tracking-widest italic flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-kenya-red animate-pulse" />
            Live Campaign Pulse
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white leading-none">
            MASHINANI <span className="text-brand-primary">EVENTS</span>
          </h1>
          <p className="text-lg text-white/70 font-medium leading-relaxed max-w-lg">
            Real-time updates from the ground. Track rallies, town halls, and
            major policy launches across all 47 counties.
          </p>
        </div>
      </section>

      {/* Control Bar */}
      <div className="sticky top-20 z-40 flex flex-col md:flex-row gap-4 justify-between items-center bg-black/80 p-4 rounded-2xl border border-white/10 backdrop-blur-2xl transition-all duration-300">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted" />
            <input
              type="text"
              placeholder="Search by politician or event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-surface border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>
          <div className="h-8 w-px bg-white/10" />
          <Filter className="w-4 h-4 text-brand-text-muted" />
          <div className="h-8 w-px bg-white/10" />
          <button
            onClick={handleSharePage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/5 text-brand-text-muted transition-colors active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">
              Share Pulse
            </span>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {(
            [
              "All",
              "Rally",
              "TownHall",
              "Launch",
              "Press",
              "MeetUp",
              "Fundraiser",
            ] as const
          ).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                activeFilter === filter
                  ? "bg-brand-primary text-black border-brand-primary"
                  : "bg-white/5 text-brand-text-muted border-white/10 hover:border-white/20",
              )}
            >
              {filter === "All" ? "All Updates" : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
          <Loader2 className="w-12 h-12 text-brand-primary animate-spin mb-4" />
          <p className="text-xs font-black uppercase tracking-widest text-brand-text-muted">
            Synchronizing Pulse Feed...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && filteredEvents.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-brand-text-muted opacity-20" />
          </div>
          <p className="text-brand-text-muted font-bold tracking-tight">
            No campaign events found for this selection.
          </p>
        </div>
      )}
    </div>
  );
}
