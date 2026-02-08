"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export type EventType = "Rally" | "TownHall" | "Fundraiser" | "MeetUp";

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

export async function getEvents() {
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
  return data as CampaignEvent[];
}

export async function getAllPublicEvents() {
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
  return data;
}

export async function createEvent(formData: Partial<CampaignEvent>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  // Validate minimum data
  if (!formData.title || !formData.date || !formData.location) {
    return { error: "Missing required fields" };
  }

  const { error } = await supabase.from("campaign_events").insert({
    created_by: user.id,
    title: formData.title,
    type: formData.type || "TownHall",
    description: formData.description,
    location: formData.location,
    date: formData.date,
    time: formData.time,
    image_url: formData.image_url,
    volunteers_needed: formData.volunteers_needed || 0,
    status: "Upcoming",
  });

  if (error) return { error: error.message };

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

  if (error) return { error: error.message };

  revalidatePath("/campaign/events");
  return { success: true };
}
