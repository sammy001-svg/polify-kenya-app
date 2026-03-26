import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Share2, Heart } from "lucide-react";
import Image from "next/image";
import { CampaignEvent } from "@/lib/events-data";
import { cn } from "@/lib/utils";
import { JoinEventDialog } from "./JoinEventDialog";
import { likeEvent } from "@/app/(platform)/campaign/events/actions";

interface EventCardProps {
  event: CampaignEvent;
}

export function EventCard({ event }: EventCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(event.likes_count || 0);

  const handleLike = async () => {
    if (isLiked) return;
    setIsLiked(true);
    setLocalLikes((prev: number) => prev + 1);
    const result = await likeEvent(event.id);
    if (result.error) {
      setIsLiked(false);
      setLocalLikes((prev: number) => prev - 1);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `JOIN EVENT: ${event.title}`,
      text: `Join ${event.politicianName} for "${event.title}" in ${event.location}. Check it out here:`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        alert("Event details copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <Card className="group overflow-hidden bg-kenya-deep border-kenya-green/20 hover:border-kenya-green/50 transition-all duration-500 shadow-2xl relative">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={event.image_url}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

        {/* Type Badge */}
        <Badge
          className={cn(
            "absolute top-4 left-4 font-black uppercase text-[10px] tracking-widest px-3 py-1 border-none shadow-lg",
            event.type === "Rally"
              ? "bg-kenya-red text-white"
              : event.type === "TownHall"
                ? "bg-kenya-green text-white"
                : event.type === "Launch"
                  ? "bg-brand-primary text-black"
                  : "bg-white/20 backdrop-blur-md text-white border border-white/20",
          )}
        >
          {event.type}
        </Badge>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-brand-primary overflow-hidden bg-brand-surface">
              <Image
                src={event.politicianAvatar}
                alt={event.politicianName}
                width={40}
                height={40}
              />
            </div>
            <div>
              <p className="text-white font-black text-sm italic tracking-tighter">
                {event.politicianName}
              </p>
              <p className="text-brand-primary text-[10px] font-bold uppercase tracking-widest">
                {event.party}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-end">
             <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-white">
              <Users className="w-3.5 h-3.5 text-brand-primary" />
              <span className="text-[10px] font-black">
                {event.reservation_count !== undefined 
                  ? `${event.reservation_count} RSVPs` 
                  : event.attendees}
              </span>
            </div>
            {localLikes > 0 && (
              <div className="flex items-center gap-1.5 bg-kenya-red/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-kenya-red/30 text-kenya-red animate-in fade-in zoom-in duration-300">
                <Heart className="w-3 h-3 fill-current" />
                <span className="text-[9px] font-black">{localLikes}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-brand-text-muted mb-2">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {event.date}
            </span>
          </div>
          <span className="text-white/20">•</span>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-wider truncate max-w-[150px]">
              {event.location}
            </span>
          </div>
        </div>
        <CardTitle className="text-xl font-black italic tracking-tighter text-white group-hover:text-brand-primary transition-colors leading-tight">
          {event.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm font-medium text-brand-text-muted leading-relaxed line-clamp-3">
          {event.description}
        </p>
      </CardContent>

      <CardFooter className="pt-2 pb-6 flex gap-3">
        <JoinEventDialog eventId={event.id} eventTitle={event.title}>
          <Button className="flex-1 bg-white text-black font-black uppercase tracking-widest text-[10px] h-10 rounded-xl hover:bg-white/90 transition-all active:scale-95 border-none shadow-lg">
            Join Event
          </Button>
        </JoinEventDialog>
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-xl border-white/10 hover:bg-white/5 text-white active:scale-90 transition-transform"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "w-10 h-10 rounded-xl border-white/10 transition-all active:scale-90",
            isLiked 
              ? "bg-kenya-red/20 border-kenya-red/50 text-kenya-red" 
              : "hover:bg-white/5 text-white"
          )}
          onClick={handleLike}
          disabled={isLiked}
        >
          <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
        </Button>
      </CardFooter>
    </Card>
  );
}
