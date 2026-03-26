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
import { CampaignEvent, EventType } from "@/lib/events-data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/lib/supabase";
import Image from "next/image";

const HERO_SLIDES = [
  {
    title: "Mashinani Pulse",
    description: "Real-time updates from the ground. Track rallies, town halls, and major policy launches across all 47 counties.",
    image: "/poli-landing-v2-3.png",
    color: "from-kenya-red/40"
  },
  {
    title: "Citizen Voice",
    description: "Join the conversation at local town halls. Your presence shapes the future of our nation's leadership.",
    image: "/poli-landing-v2-1.jpg",
    color: "from-kenya-green/40"
  },
  {
    title: "Vision 2027",
    description: "Experience history in the making. Follow the official launch of transformative manifestos and campaign promises.",
    image: "/poli-landing-v2-2.png",
    color: "from-kenya-gold/40"
  }
];

export default function TownHallPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "All" | EventType
  >("All");
  const [events, setEvents] = useState<CampaignEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        const data: CampaignEventWithProfile[] = await getAllPublicEvents();
        // Map DB events to EventCard expected format
        const mappedEvents: CampaignEvent[] = (data || []).map((e) => ({
          id: e.id,
          politicianName: e.profiles?.full_name || e.profiles?.username || "Citizen Creator",
          politicianAvatar:
            e.profiles?.avatar_url ||
            `https://api.dicebear.com/7.x/pixel-art/svg?seed=${e.id}`,
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
          reservation_count: e.reservation_count,
          likes_count: e.likes_count,
        }));
        setEvents(mappedEvents);
      } catch (err: unknown) {
        console.error("Failed to load events:", err);
        toast({
          title: "Database Error",
          description: (err as Error).message || "Could not synchronize events pulse.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }
    loadEvents();
  }, [toast]);

  // Real-time updates for MASHINANI EVENTS
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("live_events_updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "campaign_events" },
        async (payload) => {
          if (payload.eventType === "INSERT" || payload.eventType === "UPDATE" || payload.eventType === "DELETE") {
            const data: CampaignEventWithProfile[] = await getAllPublicEvents();
            const mappedEvents: CampaignEvent[] = (data || []).map((e) => ({
              id: e.id,
              politicianName: e.profiles?.full_name || e.profiles?.username || "Citizen Creator",
              politicianAvatar: e.profiles?.avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${e.id}`,
              party: e.profiles?.party || "Independent",
              title: e.title,
              description: e.description || "No description provided.",
              image_url: e.image_url || "https://images.unsplash.com/photo-1540910419892-f39aefe24aa2?q=80&w=2070&auto=format&fit=crop",
              location: e.location,
              date: format(new Date(e.date), "PPP") + (e.time ? ` at ${e.time}` : ""),
              type: e.type as EventType,
              attendees: `${e.volunteers_registered || 0} RSVPs`,
              reservation_count: e.reservation_count,
              likes_count: e.likes_count,
            }));
            setEvents(mappedEvents);
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "event_likes" },
        async () => {
          const data: CampaignEventWithProfile[] = await getAllPublicEvents();
          const mappedEvents: CampaignEvent[] = (data || []).map((e) => ({
            id: e.id,
            politicianName: e.profiles?.full_name || e.profiles?.username || "Citizen Creator",
            politicianAvatar: e.profiles?.avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${e.id}`,
            party: e.profiles?.party || "Independent",
            title: e.title,
            description: e.description || "No description provided.",
            image_url: e.image_url || "https://images.unsplash.com/photo-1540910419892-f39aefe24aa2?q=80&w=2070&auto=format&fit=crop",
            location: e.location,
            date: format(new Date(e.date), "PPP") + (e.time ? ` at ${e.time}` : ""),
            type: e.type as EventType,
            attendees: `${e.volunteers_registered || 0} RSVPs`,
            reservation_count: e.reservation_count,
            likes_count: e.likes_count,
          }));
          setEvents(mappedEvents);
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "event_reservations" },
        async () => {
          // Re-fetch everything when reservations change to get new counts
          const data: CampaignEventWithProfile[] = await getAllPublicEvents();
          const mappedEvents: CampaignEvent[] = (data || []).map((e) => ({
            id: e.id,
            politicianName: e.profiles?.full_name || e.profiles?.username || "Citizen Creator",
            politicianAvatar: e.profiles?.avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${e.id}`,
            party: e.profiles?.party || "Independent",
            title: e.title,
            description: e.description || "No description provided.",
            image_url: e.image_url || "https://images.unsplash.com/photo-1540910419892-f39aefe24aa2?q=80&w=2070&auto=format&fit=crop",
            location: e.location,
            date: format(new Date(e.date), "PPP") + (e.time ? ` at ${e.time}` : ""),
            type: e.type as EventType,
            attendees: `${e.volunteers_registered || 0} RSVPs`,
            reservation_count: e.reservation_count,
            likes_count: e.likes_count,
          }));
          setEvents(mappedEvents);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
    } catch (err: unknown) {
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
      {/* Hero Carousel Section */}
      <section className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_SLIDES[currentSlideIndex].image}
              alt={HERO_SLIDES[currentSlideIndex].title}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay */}
            <div className={cn("absolute inset-0 bg-linear-to-r from-black via-black/40 to-transparent z-10", HERO_SLIDES[currentSlideIndex].color)} />

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-12 max-w-2xl space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <Badge className="w-fit bg-kenya-red/20 text-kenya-red border-kenya-red/30 py-1 px-4 font-black uppercase tracking-widest italic flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-kenya-red animate-pulse" />
                  Live Campaign Pulse
                </Badge>
                <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white leading-none mb-4 uppercase">
                  {HERO_SLIDES[currentSlideIndex].title.split(' ')[0]} <span className="text-brand-primary">{HERO_SLIDES[currentSlideIndex].title.split(' ')[1]}</span>
                </h1>
                <p className="text-lg text-white/90 font-medium leading-relaxed max-w-lg text-shadow-md">
                  {HERO_SLIDES[currentSlideIndex].description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-6 md:left-12 flex items-center gap-2 z-30">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlideIndex(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer",
                i === currentSlideIndex 
                  ? "w-10 bg-brand-primary shadow-[0_0_15px_rgba(255,188,0,0.4)]" 
                  : "bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
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

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar flex-nowrap scroll-smooth snap-x items-center justify-start md:justify-end">
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
                "px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all border shrink-0 snap-start",
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
