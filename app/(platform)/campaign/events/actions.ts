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
  reservation_count?: number;
  likes_count?: number;
}

export interface CampaignEventWithProfile extends CampaignEvent {
  profiles: {
    full_name: string | null;
    avatar_url: string | null;
    party: string | null;
    username: string | null;
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
      .select("*, event_reservations(count), event_likes(count)")
      .eq("created_by", user.id)
      .order("date", { ascending: true });

    if (error) throw error;
    return (data as (CampaignEvent & { 
      event_reservations: { count: number }[];
      event_likes: { count: number }[];
    })[]).map(e => ({
      ...e,
      reservation_count: e.event_reservations?.[0]?.count || 0,
      likes_count: e.event_likes?.[0]?.count || 0
    })) as CampaignEvent[];
  } catch (error: unknown) {
    const err = error as { message?: string; details?: string; hint?: string };
    console.error("Error in getEvents:", err?.message || error, err?.details, err?.hint);
    return [];
  }
}

export async function getAllPublicEvents(): Promise<
  CampaignEventWithProfile[]
> {
  try {
    const supabase = await createClient();
    const today = new Date().toISOString().split("T")[0];

    const { data: rawData } = await supabase
      .from("campaign_events")
      .select("*, event_reservations(count), event_likes(count)")
      .gte("date", today);

    const { data, error: profileError } = await supabase
      .from("campaign_events")
      .select(
        "*, profiles:created_by(full_name, avatar_url, party, username), event_reservations(count), event_likes(count)",
      )
      .gte("date", today)
      .order("date", { ascending: true });

    if (profileError) {
      console.warn("Profiles join failed, falling back to raw events:", profileError);
      // Fallback: return raw data mapped with empty profiles but KEEP counts if available
      return ((rawData as (CampaignEvent & { 
        event_reservations: { count: number }[];
        event_likes: { count: number }[];
      })[]) || []).map((e) => ({
        ...(e as object),
        profiles: null,
        reservation_count: e.event_reservations?.[0]?.count || 0,
        likes_count: e.event_likes?.[0]?.count || 0,
      })) as CampaignEventWithProfile[];
    }

    if (!data || data.length === 0) {
      console.log("No public events found or query returned empty.");
      return [];
    }
    
    // Log the first result to debug counts
    console.log("First event reservation data:", {
      id: data[0].id,
      res_data: data[0].event_reservations,
      count: data[0].event_reservations?.[0]?.count
    });

    return (data as (CampaignEventWithProfile & { 
      event_reservations: { count: number }[];
      event_likes: { count: number }[];
    })[]).map((e) => ({
      ...e,
      reservation_count: e.event_reservations?.[0]?.count || 0,
      likes_count: e.event_likes?.[0]?.count || 0,
    })) as CampaignEventWithProfile[];
  } catch (error: unknown) {
    const err = error as { message?: string; details?: string; hint?: string };
    console.error("Error in getAllPublicEvents:", err?.message || error, err?.details, err?.hint);
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

    const result = await supabase.from("campaign_events").insert({
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

    const { error } = result;

    if (error) {
      console.error("Supabase Error:", error);
      return {
        error: `Database Error (${error.code}): ${error.message}`,
        details: error.hint,
      };
    }

    revalidatePath("/campaign/events");
    revalidatePath("/live");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error in createEvent:", error);
    return { error: (error as Error).message || "Failed to create event." };
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
    revalidatePath("/campaign/events");
    revalidatePath("/live");
    return { success: true };
  } catch (error) {
    console.error("Error in deleteEvent:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to delete event.",
    };
  }
}

export async function joinEvent(
  eventId: string,
  fullName: string,
  phoneNumber: string,
) {
  try {
    const supabase = await createClient();

    if (!fullName || !phoneNumber) {
      return { error: "Name and Phone Number are required." };
    }

    const { error } = await supabase.from("event_reservations").insert({
      event_id: eventId,
      full_name: fullName,
      phone_number: phoneNumber,
    });

    if (error) {
      if (error.code === "23505") {
        return {
          error:
            "You have already registered for this event with this phone number.",
        };
      }
      throw error;
    }

    revalidatePath("/live");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error in joinEvent:", error);
    return { error: (error as Error).message || "Failed to join event." };
  }
}

export async function getEventReservations(eventId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthorized" };

    // Verify user owns the event
    const { data: event, error: eventError } = await supabase
      .from("campaign_events")
      .select("created_by")
      .eq("id", eventId)
      .single();

    if (eventError || !event || event.created_by !== user.id) {
      return { error: "You don't have permission to view these reservations." };
    }

    const { data, error } = await supabase
      .from("event_reservations")
      .select("*")
      .eq("event_id", eventId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { data };
  } catch (error: unknown) {
    console.error("Error in getEventReservations:", error);
    return { error: (error as Error).message || "Failed to fetch reservations." };
  }
}

export async function likeEvent(eventId: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("event_likes").insert({
      event_id: eventId,
    });

    if (error) throw error;
    revalidatePath("/live");
    revalidatePath("/campaign/events");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error in likeEvent:", error);
    return { error: (error as Error).message || "Failed to like event." };
  }
}
