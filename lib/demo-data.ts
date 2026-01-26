export type ContentType = 'fact' | 'opinion' | 'satire';

export interface StreamItem {
  id: number;
  title: string;
  host: string;
  views: string;
  timeAgo: string;
  duration: string;
  thumbnailUrl: string;
  category: "Parliament" | "County Assembly" | "Explainer" | "Interview" | "Town Hall";
  verificationStatus: "Verified" | "Pending" | "Context Added";
  isVerifiedChannel: boolean;
  recommendationReason: string;
  politicalLeaning: "Government" | "Opposition" | "Independent" | "Civil Society";
  contentType?: ContentType;
  creatorId?: string;
}

export interface LearningItem {
  id: number;
  title: string;
  description: string;
  duration: string;
  category: "Constitution" | "Policy" | "Parliament";
  progress: number; // 0-100
  thumbnailUrl: string;
}

export interface Poll {
  id: number;
  question: string;
  options: { label: string; votes: number }[];
  totalVotes: number;
  isOpen: boolean;
}

export interface FactCheck {
  id: number;
  timestamp: string;
  statement: string;
  verdict: "True" | "False" | "Misleading" | "Context Needed";
  explanation: string;
  citations: { label: string; url: string; }[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface SimulationScenario {
  id: number;
  title: string;
  description: string;
  choices: {
    text: string;
    consequences: {
      publicTrust: number;
      budget: number;
      development: number;
    };
    outcome: string;
  }[];
}

export interface PoliticalMeme {
  id: number;
  caption: string; // Sheng/English mix
  context: string; // Factual background
  category: "Parliament Roasts" | "County Drama" | "Policy Explainers" | "Youth Reactions";
  reactions: {
    fire: number;
    lol: number;
    facts: number;
  };
  shares: number;
  trendingScore: number;
  timestamp: string;
  contentType: ContentType;
  creatorId?: string;
}

export const DEMO_STREAMS: StreamItem[] = [
  {
    id: 1,
    title: "Understanding Article 43: Economic and Social Rights in Kenya",
    host: "Civic Ed Kenya",
    views: "12K",
    timeAgo: "2 hours ago",
    duration: "12:45",
    thumbnailUrl: "/thumbnails/explainer.png",
    category: "Explainer",
    verificationStatus: "Verified",
    isVerifiedChannel: true,
    recommendationReason: "Educational content",
    politicalLeaning: "Civil Society"
  },
  {
    id: 2,
    title: "Live: Nairobi County Assembly - Budget Reading 2026/2027",
    host: "Nairobi Assembly Channel",
    views: "3.4K",
    timeAgo: "Live Now",
    duration: "Live",
    thumbnailUrl: "/thumbnails/parliament.png",
    category: "County Assembly",
    verificationStatus: "Pending",
    isVerifiedChannel: true,
    recommendationReason: "Trending in your county",
    politicalLeaning: "Government"
  },
  {
    id: 3,
    title: "Senate Standing Committee on Energy: Public Participation",
    host: "Parliament of Kenya",
    views: "8.9K",
    timeAgo: "1 day ago",
    duration: "2:15:30",
    thumbnailUrl: "/thumbnails/townhall.png",
    category: "Parliament",
    verificationStatus: "Verified",
    isVerifiedChannel: true,
    recommendationReason: "From verified source you follow",
    politicalLeaning: "Independent"
  },
  {
    id: 4,
    title: "Exclusive Interview: The Future of CBC Education System",
    host: "Education Watch",
    views: "45K",
    timeAgo: "3 days ago",
    duration: "45:20",
    thumbnailUrl: "/thumbnails/interview.png",
    category: "Interview",
    verificationStatus: "Context Added",
    isVerifiedChannel: false,
    recommendationReason: "High engagement quality",
    politicalLeaning: "Independent"
  },
  {
    id: 5,
    title: "Makueni Town Hall: Water & Sanitation Projects Review",
    host: "Gov. Mutula Kilonzo Jr.",
    views: "15K",
    timeAgo: "5 days ago",
    duration: "1:30:00",
    thumbnailUrl: "/thumbnails/townhall.png",
    category: "Town Hall",
    verificationStatus: "Verified",
    isVerifiedChannel: true,
    recommendationReason: "Relevant to your interests",
    politicalLeaning: "Government"
  },
  {
    id: 6,
    title: "What is the Finance Bill? Break down for Gen Z",
    host: "Siasa Place",
    views: "102K",
    timeAgo: "1 week ago",
    duration: "08:15",
    thumbnailUrl: "/thumbnails/explainer.png",
    category: "Explainer",
    verificationStatus: "Verified",
    isVerifiedChannel: true,
    recommendationReason: "Educational content",
    politicalLeaning: "Civil Society"
  },
  {
    id: 7,
    title: "Debate: Affordable Housing Levy Amendment v2",
    host: "Citizen TV Kenya",
    views: "230K",
    timeAgo: "2 weeks ago",
    duration: "1:45:00",
    thumbnailUrl: "/thumbnails/interview.png",
    category: "Interview",
    verificationStatus: "Pending",
    isVerifiedChannel: true,
    recommendationReason: "Diverse viewpoint",
    politicalLeaning: "Opposition"
  },
  {
    id: 8,
    title: "Process of Recalling an MP: Constitutional Steps",
    host: "Sheria Mtaani",
    views: "56K",
    timeAgo: "3 weeks ago",
    duration: "15:00",
    thumbnailUrl: "/thumbnails/explainer.png",
    category: "Explainer",
    verificationStatus: "Verified",
    isVerifiedChannel: false,
    recommendationReason: "Balanced coverage",
    politicalLeaning: "Opposition"
  }
];

export const DEMO_CHAT = [
  { user: "Wanjiku_Ke", message: "This is exactly what we needed to hear! Transparency is key.", color: "bg-kenya-red" },
  { user: "Patriot_254", message: "Can the Minister clarify on the generated jobs data?", color: "bg-kenya-green" },
  { user: "Civic_Defender", message: "Article 35 guarantees us the right to this information.", color: "bg-blue-500" },
  { user: "Youth_Rep", message: "We are watching from Eldoret. Keep it up!", color: "bg-kenya-gold" },
  { user: "Policy_Nerd", message: "The timeline for implementation seems too short.", color: "bg-purple-500" },
];

export const DEMO_UPLOADS = [
  {
    id: 1,
    title: "Nairobi County Finance Bill Explainer",
    date: "2 days ago",
    views: "12K",
    thumbnail: "/thumbnails/explainer.png"
  },
  {
    id: 2,
    title: "Response to Petition: Green Park Terminus Safety",
    date: "1 week ago",
    views: "8.5K",
    thumbnail: "/thumbnails/townhall.png"
  },
  {
    id: 3,
    title: "Weekly Development Round-up: Eastlands",
    date: "2 weeks ago",
    views: "22K",
    thumbnail: "/thumbnails/parliament.png"
  }
];

export const DEMO_LEARNING: LearningItem[] = [
  // Constitution
  {
    id: 1,
    title: "Chapter 4: The Bill of Rights Explained",
    description: "Know your fundamental rights and freedoms as a Kenyan citizen.",
    duration: "10:00",
    category: "Constitution",
    progress: 100,
    thumbnailUrl: "/thumbnails/explainer.png"
  },
  {
    id: 2,
    title: "Devolution 101: History & Structure",
    description: "How power was decentralized from the national government to 47 counties.",
    duration: "15:30",
    category: "Constitution",
    progress: 45,
    thumbnailUrl: "/thumbnails/parliament.png"
  },
  // Policy
  {
    id: 3,
    title: "The Finance Bill Process: From Proposal to Law",
    description: "An animated breakdown of how tax laws are debated and passed.",
    duration: "08:15",
    category: "Policy",
    progress: 0,
    thumbnailUrl: "/thumbnails/townhall.png"
  },
  {
    id: 4,
    title: "Affordable Housing Levy: Where Does the Money Go?",
    description: "A fact-based look at the housing fund structure and projects.",
    duration: "12:00",
    category: "Policy",
    progress: 10,
    thumbnailUrl: "/thumbnails/interview.png"
  },
  // Parliament
  {
    id: 5,
    title: "The Budget Cycle: When Can You Participate?",
    description: "Key dates for public participation in the national budget process.",
    duration: "09:45",
    category: "Parliament",
    progress: 0,
    thumbnailUrl: "/thumbnails/parliament.png"
  },
  {
    id: 6,
    title: "Roles of MPs, Senators, and MCAs",
    description: "Understanding who does what in the legislative process.",
    duration: "14:20",
    category: "Parliament",
    progress: 80,
    thumbnailUrl: "/thumbnails/townhall.png"
  }
];

export const DEMO_POLLS: Poll[] = [
  {
    id: 1,
    question: "Should the Digital Services Tax be increased to 3%?",
    options: [
      { label: "Yes, tax the giants", votes: 450 },
      { label: "No, it hurts startups", votes: 1200 },
      { label: "Undecided", votes: 150 }
    ],
    totalVotes: 1800,
    isOpen: true
  }
];

export const DEMO_FACT_CHECKS: FactCheck[] = [
  {
    id: 1,
    timestamp: "14:02",
    statement: "We have created 200,000 digital jobs...",
    verdict: "Context Needed",
    explanation: "Strictly 'digital' jobs verified are approx 45,000. The 200k figure likely includes gig economy roles.",
    citations: [
      { label: "Ministry of ICT Report 2024", url: "#" },
      { label: "Ajira Digital Platform Data", url: "#" }
    ]
  },
  {
    id: 2,
    timestamp: "14:15",
    statement: "Internet penetration in rural areas is now at 85%.",
    verdict: "True",
    explanation: "CAK reports show 3G/4G coverage has reached 96% of the population, with actual usage at 85%.",
    citations: [
      { label: "CAK Sector Statistics Q3 2025", url: "#" }
    ]
  }
];

export const DEMO_QUIZZES: QuizQuestion[] = [
  {
    id: 1,
    question: "How many articles are in the Kenyan Constitution of 2010?",
    options: ["174", "264", "350", "200"],
    correctAnswer: 1,
    explanation: "The Constitution has 264 Articles organized into 18 Chapters.",
    difficulty: "Medium"
  },
  {
    id: 2,
    question: "Who has the power to dissolve Parliament in Kenya?",
    options: ["The President", "The Chief Justice", "The Speaker", "No one - it cannot be dissolved"],
    correctAnswer: 3,
    explanation: "Unlike some countries, Kenya's Parliament cannot be dissolved by the President. It serves its full 5-year term.",
    difficulty: "Hard"
  },
  {
    id: 3,
    question: "What percentage of county revenue must be allocated to development?",
    options: ["At least 15%", "At least 30%", "At least 50%", "No minimum requirement"],
    correctAnswer: 1,
    explanation: "The Public Finance Management Act requires counties to allocate at least 30% of their budget to development.",
    difficulty: "Hard"
  }
];

export const DEMO_SIMULATIONS: SimulationScenario[] = [
  {
    id: 1,
    title: "County Hospital Strike",
    description: "Doctors at the main county hospital have gone on strike demanding salary increases. The strike has entered its second week and patients are suffering.",
    choices: [
      {
        text: "Negotiate immediately and agree to 80% of their demands",
        consequences: { publicTrust: 10, budget: -15, development: -5 },
        outcome: "The strike ends quickly. Public praises your swift action, but the treasury is strained and other projects are delayed."
      },
      {
        text: "Hold firm and wait for doctors to return to work",
        consequences: { publicTrust: -20, budget: 5, development: 0 },
        outcome: "The strike drags on for another month. Patient deaths are reported. Your approval rating plummets, though the budget remains intact."
      },
      {
        text: "Set up a public committee to review the salary structure",
        consequences: { publicTrust: 5, budget: -5, development: 0 },
        outcome: "A balanced approach. The strike continues but conversation starts. Public sees you as deliberate, not weak."
      }
    ]
  }
];

export const DEMO_MEMES: PoliticalMeme[] = [
  {
    id: 1,
    caption: "Bro really said 'digital jobs' 💀",
    context: "Reference to government claim of 200k digital jobs created. Official figures show ~45k verified positions, with remainder being gig economy roles.",
    category: "Parliament Roasts",
    reactions: { fire: 2400, lol: 3800, facts: 1200 },
    shares: 890,
    trendingScore: 95,
    timestamp: "2 hours ago",
    contentType: "satire" as const,
    creatorId: "bunge-roaster"
  },
  {
    id: 2,
    caption: "Nairobi County budget be like: 🛣️❌ 🚗✅",
    context: "Citizens joking about prioritization of governor's vehicles over road repairs. County allocated 15M for official cars vs. 8M for road maintenance in Q3 2025.",
    category: "County Drama",
    reactions: { fire: 1800, lol: 4200, facts: 950 },
    shares: 1200,
    trendingScore: 88,
    timestamp: "5 hours ago",
    contentType: "satire" as const,
    creatorId: "bunge-roaster"
  },
  {
    id: 3,
    caption: "When they explain devolution but your county still has no water 😭🚰",
    context: "Devolution was meant to bring services closer to people. Despite county funds, many rural areas still lack basic infrastructure.",
    category: "Policy Explainers",
    reactions: { fire: 3100, lol: 2200, facts: 1800 },
    shares: 650,
    trendingScore: 82,
    timestamp: "1 day ago",
    contentType: "opinion" as const,
    creatorId: "devolution-diaries"
  },
  {
    id: 4,
    caption: "Finance Bill: 'We reduce taxes' Also Finance Bill: *introduces 5 new levies*",
    context: "Classic misdirection in policy. While headline tax rate dropped 2%, several sector-specific levies were introduced, net effect was tax increase for most SMEs.",
    category: "Parliament Roasts",
    reactions: { fire: 2900, lol: 3200, facts: 2100 },
    shares: 980,
    trendingScore: 91,
    timestamp: "12 hours ago",
    contentType: "fact" as const,
    creatorId: "budget-watchdog"
  },
  {
    id: 5,
    caption: "Gen Z watching MPs 'debate' for 6hrs with no conclusion 🍿😴",
    context: "Parliamentary sessions often stretch due to procedural delays. Average substantive debate time is ~2hrs despite 6hr sessions.",
    category: "Youth Reactions",
    reactions: { fire: 1500, lol: 5100, facts: 720 },
    shares: 1450,
    trendingScore: 79,
    timestamp: "8 hours ago",
    contentType: "satire" as const,
    creatorId: "bunge-roaster"
  },
  {
    id: 6,
    caption: "Affordable Housing Levy hitting different when you're unemployed 💸😂",
    context: "The 1.5% housing levy applies to all employed citizens. Youth unemployment at 67% means many targeted beneficiaries can't contribute or benefit.",
    category: "Policy Explainers",
    reactions: { fire: 2200, lol: 2800, facts: 1600 },
    shares: 780,
    trendingScore: 85,
    timestamp: "18 hours ago",
    contentType: "opinion" as const,
    creatorId: "civic-millennial"
  }
];
