"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export type EventType =
  | "Rally"
  | "TownHall"
  | "Fundraiser"
  | "MeetUp"
  | "Press"
  | "Launch";

export interface CampaignEvent {
  id: string;
  created_by: string;
  title: string;
  type: EventType;
  description: string | null;
  location: string;
  date: string; // ISO string
  time: string | null;
  image_url: string | null;
  volunteers_needed: number;
  volunteers_registered: number;
  status: string;
}

export interface CampaignEventWithProfile extends CampaignEvent {
  profiles: {
    full_name: string | null;
    avatar_url: string | null;
    party: string | null;
  } | null;
}

export async function getEvents(): Promise<CampaignEvent[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("campaign_events")
    .select("*")
    .eq("created_by", user.id)
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }
  return (data as CampaignEvent[]) || [];
}

export async function getAllPublicEvents(): Promise<CampaignEventWithProfile[]> {
  const supabase = await createClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("campaign_events")
    .select("*, profiles:created_by(full_name, avatar_url, party)")
    .gte("date", now) // Only fetch upcoming events
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching public events:", error);
    return [];
  }
  return (data as CampaignEventWithProfile[]) || [];
}

export async function createEvent(formData: Partial<CampaignEvent>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const {
    title,
    type,
    description,
    location,
    date,
    time = null,
    image_url = null,
    volunteers_needed = 0,
  } = formData;

  // Validate minimum data
  if (!title || !date || !location) {
    return { error: "Missing required fields: Title, Date, and Location are required." };
  }

  // Ensure volunteers_needed is a valid positive number
  const vNeeded = typeof volunteers_needed === 'number' && !isNaN(volunteers_needed) 
    ? Math.max(0, volunteers_needed) 
    : 0;

  const { error } = await supabase.from("campaign_events").insert({
    created_by: user.id,
    title,
    type: type || "TownHall",
    description: description || null,
    location,
    date,
    time,
    image_url,
    volunteers_needed: vNeeded,
    volunteers_registered: 0,
    status: "Upcoming",
  });

  if (error) {
    console.error("Error creating event:", error);
    return { error: error.message };
  }

  revalidatePath("/campaign/events");
  revalidatePath("/live");
  return { success: true };
}

export async function deleteEvent(eventId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { error } = await supabase
    .from("campaign_events")
    .delete()
    .eq("id", eventId)
    .eq("created_by", user.id); // Ensure ownership

  if (error) {
    console.error("Error deleting event:", error);
    return { error: error.message };
  }

  revalidatePath("/campaign/events");
  revalidatePath("/live");
  return { success: true };
}
