"use server";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";
  salary_range: string;
  description: string;
  posted_at: string;
  application_link: string;
  logo_url?: string;
  category: "Tech" | "Government" | "NGO" | "Healthcare" | "Education" | "Agriculture" | "Other";
}

const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Policy Analyst",
    company: "Ministry of Devolution",
    location: "Nairobi, Kenya",
    type: "Full-time",
    salary_range: "KES 150,000 - 250,000",
    description: "Analyze and formulate policies to support devolution in Kenya. Requires 5+ years of experience in public policy.",
    posted_at: new Date().toISOString(),
    application_link: "#",
    category: "Government",
  },
  {
    id: "2",
    title: "Community Outreach Coordinator",
    company: "PoliFy Kenya Foundation",
    location: "Mombasa, Kenya",
    type: "Contract",
    salary_range: "KES 80,000 - 120,000",
    description: "Lead community engagement initiatives and civic education programs in the coastal region.",
    posted_at: new Date(Date.now() - 86400000).toISOString(),
    application_link: "#",
    category: "NGO",
  },
  {
    id: "3",
    title: "Frontend Developer (React/Next.js)",
    company: "TechDemocracy",
    location: "Remote",
    type: "Full-time",
    salary_range: "KES 200,000 - 350,000",
    description: "Build digital tools to enhance civic participation. Expertise in Next.js, Tailwind CSS, and TypeScript required.",
    posted_at: new Date(Date.now() - 172800000).toISOString(),
    application_link: "#",
    category: "Tech",
  },
  {
    id: "4",
    title: "Agricultural Extension Officer",
    company: "Kilimo Bora Initiative",
    location: "Nakuru, Kenya",
    type: "Full-time",
    salary_range: "KES 60,000 - 90,000",
    description: "Support local farmers with modern farming techniques and market access strategies.",
    posted_at: new Date(Date.now() - 259200000).toISOString(),
    application_link: "#",
    category: "Agriculture",
  },
  {
    id: "5",
    title: "County Health Administrator",
    company: "Kiambu County Government",
    location: "Kiambu, Kenya",
    type: "Full-time",
    salary_range: "KES 120,000 - 180,000",
    description: "Oversee operations of county health facilities and implement public health programs.",
    posted_at: new Date(Date.now() - 345600000).toISOString(),
    application_link: "#",
    category: "Healthcare",
  },
];

export async function getJobs(): Promise<Job[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_JOBS;
}
