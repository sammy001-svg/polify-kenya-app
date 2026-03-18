export interface VoterStats {
  category: "National" | "County" | "Constituency" | "Ward";
  name: string;
  count: number;
}


export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: "Press Release" | "Update" | "Event";
  link: string;
  content?: string;
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
    title: "Official Boundary Delimitation Kick-off",
    date: "Oct 2025",
    status: "Completed",
    description: "Commission panel formed to review constituency and ward boundaries.",
  },
  {
    id: "2",
    title: "Enhanced Continuous Voter Registration (ECVR)",
    date: "March 30, 2026",
    status: "Ongoing",
    description: "Launch of mass registration targeting 2.5 million new voters in phase one.",
  },
  {
    id: "3",
    title: "Final Voters' Roll Audit & Verification",
    date: "January 2027",
    status: "Upcoming",
    description: "Official verification of the voter registry by independent auditors.",
  },
  {
    id: "4",
    title: "National General Election Day",
    date: "August 10, 2027",
    status: "Upcoming",
    description: "Nationwide voting for Presidential, Parliamentary, and County seats.",
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
  { category: "Ward", name: "Kitisuru", count: 29237 },
];

// Redundant mock data removed to use factual kenya-locations.ts hierarchy

export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "IEBC Announces Enhanced Continuous Voter Registration (ECVR)",
    summary: "The commission targets 2.5 million new voters in the first phase starting March 2026.",
    date: "Just Now",
    category: "Event",
    link: "#",
    content: "The Independent Electoral and Boundaries Commission (IEBC) has officially announced that the Enhanced Continuous Voter Registration (ECVR) exercise will commence on March 30, 2026. Running for 30 days, this initial phase aims to register 2.5 million new voters across all 47 counties. The commission ultimately anticipates registering a total of 6.3 million new voters to achieve a projected total of 28.5 million voters for the 2027 General Election. To support this massive undertaking, the IEBC will be hiring over 12,000 temporary staff members."
  },
  {
    id: "2",
    title: "Ksh 6.9 Billion Funding Request for 2027 Election Preparedness",
    summary: "IEBC Chairperson details the financial requirements for the upcoming election cycle.",
    date: "2 Hours Ago",
    category: "Press Release",
    link: "#",
    content: "IEBC Chairperson Erastus Ethekon has formally presented the commission's budget requirements for the upcoming election cycle. The commission will require Ksh 6.9 billion specifically for nationwide voter registration ahead of the 2027 General Election. Furthermore, Ksh 12.4 billion has been requested for staff wages and an additional Ksh 6.2 billion to replace the outdated Kenya Integrated Election Management System (KIEMS) kits. An emergency request of Ksh 888 million was also submitted for immediate office renovations and vehicle updates."
  },
  {
    id: "3",
    title: "New Electronic Results Transmission System Rollout",
    summary: "IEBC outlines the technology roadmap leading up to the 2027 elections.",
    date: "5 Hours Ago",
    category: "Update",
    link: "#",
    content: "As part of the official 2027 General Election Roadmap, the IEBC has unveiled plans to establish completely revamped election technology. A new, robust electronic results transmission system is actively being developed and is expected to be finalized and audited by October 2026. This technology will replace the legacy KIEMS kits and aims to ensure 100% transparency and near real-time verifiable tallying from all polling stations on Tuesday, August 10, 2027."
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
