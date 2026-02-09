import { Metadata } from "next";
import { getEvents } from "./actions";
import { EventsClient } from "./EventsClient";

export const metadata: Metadata = {
  title: "Campaign Events | PoliFy Kenya",
  description: "Schedule and manage your campaign trail, rallies, and town halls.",
};

export default async function EventsPage() {
  const events = await getEvents();
  
  return <EventsClient initialEvents={events} />;
}
