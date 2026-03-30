export type ProjectStatus = 'Completed' | 'In Progress' | 'Stalled' | 'Not Started' | 'Planned';

export interface NationalProject {
  id: string;
  title: string;
  category: string;
  promiseDate?: string;
  completionDate?: string;
  description: string;
  budget?: string;
  amountUsed?: string;
  status: ProjectStatus;
  achievements?: string[];
  impact?: string;
  location?: string;
  progress: number; // 0-100
  tags: string[];
  purpose?: string;
  goal?: string;
  components?: string[];
}

export const NATIONAL_PROJECTS: NationalProject[] = [
  {
    id: "sgr-mombasa-nairobi",
    title: "Standard Gauge Railway (SGR)",
    category: "Transport & Infrastructure",
    description: "Phase 1 (Mombasa–Nairobi) and Phase 2 (Naivasha) completed. Regional trade and logistics corridor.",
    status: "Completed",
    purpose: "Regional trade + logistics corridor",
    location: "Mombasa → Nairobi → Naivasha",
    progress: 100,
    tags: ["Transport", "Infrastructure", "Trade"]
  },
  {
    id: "lapsset-corridor",
    title: "LAPSSET Corridor Project",
    category: "Transport & Infrastructure",
    description: "Lamu Port–South Sudan–Ethiopia Transport corridor including port, highways, and oil pipeline.",
    status: "Stalled",
    purpose: "Transform northern Kenya into trade hub",
    location: "Lamu, Northern Kenya",
    progress: 25,
    tags: ["Transport", "Energy", "Regional hub"]
  },
  {
    id: "road-expansion",
    title: "Road Infrastructure Expansion",
    category: "Transport & Infrastructure",
    description: "Nairobi Expressways, bypasses, and rural road connectivity programs.",
    status: "In Progress",
    location: "National",
    progress: 65,
    tags: ["Roads", "Infrastructure", "Connectivity"]
  },
  {
    id: "jkia-expansion",
    title: "JKIA Expansion",
    category: "Transport & Infrastructure",
    description: "Expansion to address overcapacity at Kenya's main international airport.",
    status: "Planned",
    goal: "Address overcapacity",
    location: "Nairobi",
    progress: 5,
    tags: ["Aviation", "Infrastructure", "Tourism"]
  },
  {
    id: "renewable-energy",
    title: "Renewable Energy Expansion",
    category: "Energy & Utilities",
    description: "Geothermal (Olkaria) and Wind (Lake Turkana) power projects.",
    status: "In Progress",
    goal: "Increase power capacity for industrialization",
    location: "Rift Valley / Marsabit",
    progress: 85,
    tags: ["Energy", "Green", "Industrialization"]
  },
  {
    id: "thwake-dam",
    title: "Thwake Dam",
    category: "Energy & Utilities",
    description: "Multi-purpose dam for water supply, irrigation, and power.",
    status: "In Progress",
    purpose: "Water supply + irrigation + power",
    location: "Kitui/Makueni",
    progress: 70,
    tags: ["Water", "Energy", "Agriculture"]
  },
  {
    id: "affordable-housing-nationwide",
    title: "Affordable Housing Programme",
    category: "Urban & Housing",
    description: "Nationwide mass housing construction to reduce deficit.",
    status: "In Progress",
    goal: "Reduce housing deficit",
    location: "National",
    progress: 40,
    tags: ["Housing", "Urban", "Social"]
  },
  {
    id: "konza-technopolis",
    title: "Konza Technopolis (Silicon Savannah)",
    category: "Urban & Housing",
    description: "Tech hub and smart city development.",
    status: "In Progress",
    purpose: "Tech hub + smart city",
    location: "Makueni",
    progress: 30,
    tags: ["Technology", "Smart City", "Innovation"]
  },
  {
    id: "huduma-kenya",
    title: "Huduma Kenya",
    category: "Digital & Public Services",
    description: "One-stop government service centers operational nationwide.",
    status: "Completed",
    goal: "Improve access to services",
    location: "National",
    progress: 100,
    tags: ["Governance", "Services", "Efficiency"]
  },
  {
    id: "digital-superhighway-beta",
    title: "Digital Superhighway",
    category: "Digital & Public Services",
    description: "Fiber expansion and eCitizen platform enhancement.",
    status: "In Progress",
    location: "National",
    progress: 35,
    tags: ["ICT", "Internet", "E-Government"]
  },
  {
    id: "uhc-rollout",
    title: "Universal Health Coverage (UHC)",
    category: "Social Sector",
    description: "Rollout of affordable healthcare for all citizens.",
    status: "In Progress",
    goal: "Affordable healthcare for all",
    location: "National",
    progress: 50,
    tags: ["Health", "Social", "Universal"]
  },
  {
    id: "education-expansion",
    title: "Education Infrastructure Expansion",
    category: "Social Sector",
    description: "CBC implementation support and school infrastructure development.",
    status: "In Progress",
    location: "National",
    progress: 60,
    tags: ["Education", "Social", "Literacy"]
  }
];

export const BETA_AGENDA = [
  {
    title: "Agriculture Transformation",
    promises: ["Subsidized fertilizer", "Food security programs"],
    status: "In Progress"
  },
  {
    title: "MSME Economy (Hustler Fund)",
    promises: ["Small business financing"],
    status: "In Progress"
  },
  {
    title: "Affordable Housing",
    promises: ["Mass housing construction"],
    status: "In Progress"
  },
  {
    title: "Healthcare Reform",
    promises: ["Transition from NHIF → SHIF"],
    status: "In Progress"
  },
  {
    title: "Digital Economy",
    promises: ["ICT jobs, fiber, innovation"],
    status: "In Progress"
  }
];

export const VISION_2030_FLAGSHIP = [
  { project: "SGR Railway", sector: "Transport", status: "Completed + Ongoing extension" },
  { project: "LAPSSET Corridor", sector: "Transport", status: "Ongoing" },
  { project: "Konza City", sector: "ICT", status: "Ongoing" },
  { project: "Thwake Dam", sector: "Water", status: "Ongoing" },
  { project: "Geothermal Power", sector: "Energy", status: "Ongoing" },
  { project: "Isiolo Airport", sector: "Transport", status: "Completed" },
  { project: "Major highways", sector: "Roads", status: "Completed + expansion ongoing" },
  { project: "Huduma Centres", sector: "Governance", status: "Completed" },
];

export const PROJECT_CATEGORIES = [
  "All",
  "Transport & Infrastructure",
  "Energy & Utilities",
  "Urban & Housing",
  "Digital & Public Services",
  "Social Sector"
];
