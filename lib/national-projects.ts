export type ProjectStatus = 'Completed' | 'In Progress' | 'Stalled' | 'Not Started';

export interface NationalProject {
  id: string;
  title: string;
  category: string;
  promiseDate: string;
  completionDate?: string;
  description: string;
  budget: string; // Formatting as string for easier display, e.g., "KSh 50B"
  amountUsed: string;
  status: ProjectStatus;
  achievements: string[];
  impact: string;
  location: string;
  progress: number; // 0-100
  tags: string[];
}

export const NATIONAL_PROJECTS: NationalProject[] = [
  {
    id: "proj-hustler-fund",
    title: "Financial Inclusion Fund (Hustler Fund)",
    category: "Economic Empowerment",
    promiseDate: "2022-09-13",
    description: "Digital lending and savings product for SMEs and individuals at bottom of the pyramid.",
    budget: "KSh 50 Billion",
    amountUsed: "KSh 39 Billion",
    status: "Completed",
    achievements: [
      "21 million+ Kenyans registered",
      "KSh 40B+ disbursed to date",
      "Phase 2 (Individual Micro-loans) launched"
    ],
    impact: "Increased access to credit for unbanked Kenyans.",
    location: "National",
    progress: 100,
    tags: ["Economy", "SME", "Financial Inclusion"]
  },
  {
    id: "proj-affordable-housing",
    title: "Affordable Housing Program (AHP)",
    category: "Social Housing",
    promiseDate: "2022-10-01",
    description: "Construction of 200,000 units annually to address the national housing deficit.",
    budget: "KSh 250 Billion",
    amountUsed: "KSh 85 Billion",
    status: "In Progress",
    achievements: [
      "Mukuru Metisite (13,000 units) ongoing",
      "Kibera Soweto B project initialized",
      "Housing Levy established for sustainability"
    ],
    impact: "Direct employment for over 120,000 artisans.",
    location: "Urban Centers (Nairobi, Mombasa, Nakuru)",
    progress: 45,
    tags: ["Infrastructure", "Housing", "Employment"]
  },
  {
    id: "proj-fertilizer-subsidy",
    title: "National Fertilizer Subsidy Program",
    category: "Agriculture",
    promiseDate: "2022-09-15",
    description: "Reducing agricultural input costs to ensure food security and lower cost of living.",
    budget: "KSh 15 Billion (Annual)",
    amountUsed: "KSh 12 Billion",
    status: "Completed",
    achievements: [
      "Price reduced from KSh 6,500 to KSh 2,500 per 50kg bag",
      "E-voucher system implemented for transparency",
      "Major harvest increase in 2023/2024 seasons"
    ],
    impact: "Reduced cost of maize production by 30%.",
    location: "Arable Counties (Rift Valley, Central, Western)",
    progress: 100,
    tags: ["Agriculture", "Food Security", "Cost of Living"]
  },
  {
    id: "proj-digital-highway",
    title: "Digital Superhighway (Fiber Optic)",
    category: "Technology",
    promiseDate: "2022-11-20",
    description: "Deployment of 100,000km of fiber optic cable to connect schools, hospitals, and markets.",
    budget: "KSh 120 Billion",
    amountUsed: "KSh 30 Billion",
    status: "In Progress",
    achievements: [
      "10,000km of fiber laid in 2023",
      "1,450 digital hubs identified for construction",
      "Free Wi-Fi hotspots launched in various markets"
    ],
    impact: "Boosted digital economy and online job opportunities.",
    location: "National",
    progress: 30,
    tags: ["Technology", "Digital Economy", "Infrastructure"]
  },
  {
    id: "proj-uhc-shif",
    title: "Social Health Insurance Fund (SHIF)",
    category: "Healthcare",
    promiseDate: "2023-10-20",
    description: "Transitioning from NHIF to SHIF to provide universal healthcare coverage regardless of income.",
    budget: "KSh 80 Billion (Projected)",
    amountUsed: "KSh 10 Billion",
    status: "In Progress",
    achievements: [
      "Registration of over 10 million Kenyans initiated",
      "Facility assessments for SHA compliance",
      "Digital transition developed"
    ],
    impact: "Elimination of out-of-pocket medical expenses for terminal illnesses.",
    location: "National",
    progress: 25,
    tags: ["Health", "Universal Coverage", "SHA"]
  },
  {
    id: "proj-nairobi-river",
    title: "Nairobi River Basin Regeneration",
    category: "Environment",
    promiseDate: "2023-02-22",
    description: "Comprehensive restoration and cleanup of the Nairobi River ecosystem.",
    budget: "KSh 5 Billion",
    amountUsed: "KSh 1.2 Billion",
    status: "Stalled",
    achievements: [
      "Commission established for oversight",
      "Initial cleanup drives in Gikomba and Korogocho",
      "Relocation plan for riparian encroachers"
    ],
    impact: "Environmental restoration and flood mitigation.",
    location: "Nairobi County",
    progress: 15,
    tags: ["Environment", "Regeneration", "Sustainability"]
  }
];

export const PROJECT_CATEGORIES = [
  "All",
  "Economic Empowerment",
  "Agriculture",
  "Infrastructure",
  "Health",
  "Technology",
  "Environment",
  "Education"
];
