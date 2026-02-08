export interface CampaignEvent {
  id: string;
  politicianName: string;
  politicianAvatar: string;
  party: string;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  date: string;
  type: "Rally" | "TownHall" | "Press" | "Launch";
  attendees: string;
}

export const CAMPAIGN_EVENTS: CampaignEvent[] = [
  {
    id: "event-1",
    politicianName: "William Ruto",
    politicianAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ruto",
    party: "UDA",
    title: "Mashinani Economic Forum - Nakuru",
    description:
      "Engaging with local traders and farmers in Nakuru to discuss the Bottom-Up Economic Transformation Agenda. We are listening to your concerns and building a better Kenya for everyone.",
    imageUrl:
      "https://images.unsplash.com/photo-1541872703-74c5e4063857?q=80&w=2070&auto=format&fit=crop",
    location: "Nakuru City Hall",
    date: "Today, 2:00 PM",
    type: "TownHall",
    attendees: "2.5K",
  },
  {
    id: "event-2",
    politicianName: "Raila Odinga",
    politicianAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=raila",
    party: "ODM",
    title: "Azimio La Umoja Mega Rally",
    description:
      "The movement for a united Kenya continues! Join us at Tononoka Grounds in Mombasa as we share our vision for social justice and economic prosperity.",
    imageUrl:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop",
    location: "Tononoka Grounds, Mombasa",
    date: "Tomorrow, 10:00 AM",
    type: "Rally",
    attendees: "15K",
  },
  {
    id: "event-3",
    politicianName: "Kalonzo Musyoka",
    politicianAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kalonzo",
    party: "Wiper",
    title: "Infrastructure Policy Launch",
    description:
      "Presenting the official Wiper Party infrastructure strategy for 2027. We are focusing on high-speed rail and expanded digital connectivity for all counties.",
    imageUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
    location: "Intercontinental, Nairobi",
    date: "Wed, 9:00 AM",
    type: "Launch",
    attendees: "500",
  },
  {
    id: "event-4",
    politicianName: "Martha Karua",
    politicianAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=martha",
    party: "Narc-Kenya",
    title: "Constitutional Integrity Seminar",
    description:
      "A deep dive into Chapter 6 of the Kenyan Constitution. Understanding leadership and integrity as the foundation of our democracy.",
    imageUrl:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070&auto=format&fit=crop",
    location: "Ufundi House, Nairobi",
    date: "Friday, 4:00 PM",
    type: "Press",
    attendees: "120",
  },
];
