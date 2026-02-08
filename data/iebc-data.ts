export interface VoterStats {
  category: "National" | "County" | "Constituency" | "Ward";
  name: string;
  count: number;
}

export interface RegistrationCentre {
  id: string;
  name: string;
  ward: string;
  constituency: string;
  county: string;
  status: "Open" | "Closed";
  openingHours: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: "Press Release" | "Update" | "Event";
  link: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  deadline: string;
  link: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  status: "Upcoming" | "Completed" | "Ongoing";
  description: string;
}

export interface EducationResource {
  id: string;
  title: string;
  category: "Registration" | "Voting" | "Disputes" | "Rights";
  summary: string;
  icon: string;
}

export const mockTimeline: TimelineEvent[] = [
  {
    id: "1",
    title: "Boundary Delimitation Commission Formation",
    date: "Oct 2025",
    status: "Completed",
    description: "Panel formed to review constituency boundaries.",
  },
  {
    id: "2",
    title: "National Voter Registration Drive",
    date: "Feb - Mar 2026",
    status: "Ongoing",
    description: "Mass registration of new voters across all 47 counties.",
  },
  {
    id: "3",
    title: "Party Primaries Window",
    date: "June 2026",
    status: "Upcoming",
    description:
      "Official window for political parties to nominate candidates.",
  },
  {
    id: "4",
    title: "Candidate Clearance",
    date: "August 2026",
    status: "Upcoming",
    description: "Verification of candidate qualifications and credentials.",
  },
  {
    id: "5",
    title: "General Election Day",
    date: "August 11, 2027",
    status: "Upcoming",
    description:
      "Nationwide voting for Presidential, Parliamentary, and County seats.",
  },
];

export const mockEducationResources: EducationResource[] = [
  {
    id: "1",
    title: "How to register as a voter",
    category: "Registration",
    summary: "Understand the requirements and steps to get your voter card.",
    icon: "ClipboardCheck",
  },
  {
    id: "2",
    title: "Your rights on election day",
    category: "Rights",
    summary: "Learn about the protections and secrecy of your ballot.",
    icon: "ShieldCheck",
  },
  {
    id: "3",
    title: "How to verify your status",
    category: "Registration",
    summary: "Use SMS or online portal to check your details.",
    icon: "Search",
  },
  {
    id: "4",
    title: "Election dispute resolution",
    category: "Disputes",
    summary: "Procedures for filing complaints and appeals.",
    icon: "Scale",
  },
];

export const mockVoterStats: VoterStats[] = [
  { category: "National", name: "Kenya", count: 22120458 },
  { category: "County", name: "Nairobi City", count: 2415310 },
  { category: "Constituency", name: "Westlands", count: 160739 },
  { category: "Ward", name: "Kitisuru", count: 32450 },
  { category: "Ward", name: "Parklands", count: 28900 },
];

export const mockRegistrationCentres: RegistrationCentre[] = [
  {
    id: "1",
    name: "Westlands Primary School",
    ward: "Parklands/Highridge",
    constituency: "Westlands",
    county: "Nairobi",
    status: "Open",
    openingHours: "8:00 AM - 5:00 PM",
  },
  {
    id: "2",
    name: "Kangemi Social Hall",
    ward: "Kangemi",
    constituency: "Westlands",
    county: "Nairobi",
    status: "Open",
    openingHours: "8:00 AM - 5:00 PM",
  },
  {
    id: "3",
    name: "Muguga Green Primary",
    ward: "Kitisuru",
    constituency: "Westlands",
    county: "Nairobi",
    status: "Closed",
    openingHours: "8:00 AM - 5:00 PM",
  },
  {
    id: "4",
    name: "Lavington Primary School",
    ward: "Kileleshwa",
    constituency: "Dagoretti North",
    county: "Nairobi",
    status: "Open",
    openingHours: "8:00 AM - 5:00 PM",
  },
  {
    id: "5",
    name: "Olympic Primary School",
    ward: "Kibra",
    constituency: "Kibra",
    county: "Nairobi",
    status: "Open",
    openingHours: "8:00 AM - 5:00 PM",
  },
];

export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Voter Registration Week Launch",
    summary:
      "IEBC announces the start of the nationwide voter registration drive.",
    date: "2026-02-01",
    category: "Event",
    link: "#",
  },
  {
    id: "2",
    title: "By-Election Results for Ugunja",
    summary:
      "Check out the official results for the Ugunja constituency by-election.",
    date: "2026-01-28",
    category: "Press Release",
    link: "#",
  },
  {
    id: "3",
    title: "New Diaspora Polling Stations",
    summary:
      "5 new polling stations opened in the UK and USA for diaspora voters.",
    date: "2026-01-20",
    category: "Update",
    link: "#",
  },
];

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "ICT Officer",
    department: "Information Technology",
    location: "Nairobi HQ",
    deadline: "2026-02-28",
    link: "#",
  },
  {
    id: "2",
    title: "Constituency Election Coordinator",
    department: "Operations",
    location: "Turkana Central",
    deadline: "2026-03-15",
    link: "#",
  },
  {
    id: "3",
    title: "Voter Education Assistant",
    department: "Voter Education",
    location: "Mombasa",
    deadline: "2026-02-25",
    link: "#",
  },
];
