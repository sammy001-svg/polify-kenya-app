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
  try {
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

    if (error) throw error;
    return (data as CampaignEvent[]) || [];
  } catch (error) {
    console.error("Error in getEvents:", error);
    return [];
  }
}

export async function getAllPublicEvents(): Promise<CampaignEventWithProfile[]> {
  try {
    const supabase = await createClient();
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from("campaign_events")
      .select("*, profiles:created_by(full_name, avatar_url, party)")
      .gte("date", now)
      .order("date", { ascending: true });

    if (error) throw error;
    return (data as CampaignEventWithProfile[]) || [];
  } catch (error) {
    console.error("Error in getAllPublicEvents:", error);
    return [];
  }
}

export async function createEvent(formData: Partial<CampaignEvent>) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "You must be logged in to create events." };

    const title = formData.title?.trim();
    const location = formData.location?.trim();
    const date = formData.date;
    const type = formData.type || "TownHall";
    const description = formData.description?.trim() || null;
    const time = formData.time || null;
    const image_url = formData.image_url?.trim() || null;
    const volunteers_needed = formData.volunteers_needed || 0;

    // Validate required fields
    if (!title || !date || !location) {
      return { error: "Title, Date, and Location are required." };
    }

    // Validate date is not in the past
    const eventDate = new Date(date);
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Check by day
    if (eventDate < now) {
      return { error: "Event date cannot be in the past." };
    }

    // Ensure volunteers_needed is a valid positive number
    const vNeeded = Math.max(0, Number(volunteers_needed) || 0);

    const { error } = await supabase.from("campaign_events").insert({
      created_by: user.id,
      title,
      type,
      description,
      location,
      date,
      time,
      image_url,
      volunteers_needed: vNeeded,
      volunteers_registered: 0,
      status: "Upcoming",
    });

    if (error) throw error;

    revalidatePath("/campaign/events");
    revalidatePath("/live");
    return { success: true };
  } catch (error) {
    console.error("Error in createEvent:", error);
    return { error: error instanceof Error ? error.message : "Failed to create event." };
  }
}

export async function deleteEvent(eventId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthorized" };

    const { error } = await supabase
      .from("campaign_events")
      .delete()
      .eq("id", eventId)
      .eq("created_by", user.id);

    if (error) throw error;

    revalidatePath("/campaign/events");
    revalidatePath("/live");
    return { success: true };
  } catch (error) {
    console.error("Error in deleteEvent:", error);
    return { error: error instanceof Error ? error.message : "Failed to delete event." };
  }
}
