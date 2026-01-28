// import { Video, Users, TrendingUp, Award } from "lucide-react"; // Unused imports removed
// import { LucideIcon } from "lucide-react"; // Unused import removed
// Actually the error said they are unused.
// "Video is defined but never used"
// checking file content...
// It uses CONTENT_TYPE_INFO later which has "icon: 'CheckCircle2'". It doesn't use the imported components directly.
// So I can clear the imports.


export type ContentType = 'fact' | 'opinion' | 'satire';

export interface CivicCreator {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
  bannerUrl: string;
  isVerified: boolean;
  verifiedDate: string;
  expertise: string[];
  followers: number;
  totalVideos: number;
  totalViews: string;
  contentDistribution: {
    facts: number;
    opinions: number;
    satire: number;
  };
  signature: string;
  joinedDate: string;
}

export interface CoHostedDiscussion {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  expertName: string;
  expertTitle: string;
  expertCredentials: string[];
  topic: string;
  expertiseArea: string;
  duration: string;
  views: string;
  publishedDate: string;
  thumbnailUrl: string;
  sections: {
    timestamp: string;
    title: string;
    host: 'creator' | 'expert' | 'both';
  }[];
  whyThisMatters: string;
  actionItems: string[];
}

export const CIVIC_CREATORS: CivicCreator[] = [
  {
    id: "siasa-decoded",
    name: "Brian Kimani",
    username: "@SiasaDecoded",
    bio: "Making constitutional law accessible to Gen Z through animated explainers. Let's decode this siasa real quick! 🇰🇪",
    avatarUrl: "/creators/siasa-decoded.jpg",
    bannerUrl: "/creators/siasa-banner.jpg",
    isVerified: true,
    verifiedDate: "2025-03-15",
    expertise: ["Constitutional Law", "Governance", "Civic Education"],
    followers: 127000,
    totalVideos: 89,
    totalViews: "4.2M",
    contentDistribution: {
      facts: 60,
      opinions: 30,
      satire: 10,
    },
    signature: "Let's decode this siasa real quick...",
    joinedDate: "2023-08-12",
  },
  {
    id: "civic-millennial",
    name: "Sharon Wanjiru",
    username: "@TheCivicMillennial",
    bio: "Policy analyst breaking down complex legislation for young Kenyans. Data-driven, youth-focused civic discourse. 📊",
    avatarUrl: "/creators/civic-millennial.jpg",
    bannerUrl: "/creators/civic-banner.jpg",
    isVerified: true,
    verifiedDate: "2025-04-22",
    expertise: ["Policy Analysis", "Youth Advocacy", "Economic Policy"],
    followers: 98500,
    totalVideos: 56,
    totalViews: "2.8M",
    contentDistribution: {
      facts: 40,
      opinions: 50,
      satire: 10,
    },
    signature: "Here's what the data actually shows...",
    joinedDate: "2024-01-20",
  },
  {
    id: "bunge-roaster",
    name: "Kevin Otieno",
    username: "@BungeRoaster254",
    bio: "Your favorite Parliament correspondent... if Parliament was actually entertaining. Political satire meets civic education. 😂🏛️",
    avatarUrl: "/creators/bunge-roaster.jpg",
    bannerUrl: "/creators/bunge-banner.jpg",
    isVerified: true,
    verifiedDate: "2025-06-10",
    expertise: ["Parliamentary Procedure", "Political Comedy", "Satire"],
    followers: 215000,
    totalVideos: 134,
    totalViews: "8.9M",
    contentDistribution: {
      facts: 20,
      opinions: 20,
      satire: 60,
    },
    signature: "Today on Parliament Chronicles...",
    joinedDate: "2023-05-03",
  },
  {
    id: "sheria-mtaani",
    name: "Mercy Kiplagat",
    username: "@SheriaMtaani",
    bio: "Legal rights educator bringing the law to the streets. Know your rights, use your voice. ⚖️✊",
    avatarUrl: "/creators/sheria-mtaani.jpg",
    bannerUrl: "/creators/sheria-banner.jpg",
    isVerified: true,
    verifiedDate: "2025-05-18",
    expertise: ["Legal Education", "Human Rights", "Constitutional Rights"],
    followers: 156000,
    totalVideos: 72,
    totalViews: "3.6M",
    contentDistribution: {
      facts: 70,
      opinions: 25,
      satire: 5,
    },
    signature: "Chapter and verse, let's break it down...",
    joinedDate: "2023-11-08",
  },
  {
    id: "budget-watchdog",
    name: "Daniel Mwangi",
    username: "@BudgetWatchdogKE",
    bio: "Following the money trail. Accountant-turned-civic-educator tracking public spending and fiscal policy. 💰🔍",
    avatarUrl: "/creators/budget-watchdog.jpg",
    bannerUrl: "/creators/budget-banner.jpg",
    isVerified: true,
    verifiedDate: "2025-07-02",
    expertise: ["Public Finance", "Budget Analysis", "Accountability"],
    followers: 83000,
    totalVideos: 45,
    totalViews: "1.9M",
    contentDistribution: {
      facts: 80,
      opinions: 15,
      satire: 5,
    },
    signature: "Let's follow the money...",
    joinedDate: "2024-03-14",
  },
  {
    id: "devolution-diaries",
    name: "Faith Njeri",
    username: "@DevolutionDiaries",
    bio: "County government explainer. Making devolution make sense, one county at a time. 🗺️",
    avatarUrl: "/creators/devolution-diaries.jpg",
    bannerUrl: "/creators/devolution-banner.jpg",
    isVerified: true,
    verifiedDate: "2025-08-20",
    expertise: ["Devolution", "County Government", "Local Governance"],
    followers: 67000,
    totalVideos: 38,
    totalViews: "1.4M",
    contentDistribution: {
      facts: 55,
      opinions: 35,
      satire: 10,
    },
    signature: "County by county, here's what's happening...",
    joinedDate: "2024-06-05",
  },
];

export const COHOSTED_DISCUSSIONS: CoHostedDiscussion[] = [
  {
    id: "finance-bill-breakdown",
    title: "Finance Bill 2026: What Gen Z Actually Needs to Know",
    description: "Brian from Siasa Decoded teams up with tax policy expert Prof. Wambugu to break down the Finance Bill's real impact on young workers.",
    creatorId: "siasa-decoded",
    expertName: "Prof. James Wambugu",
    expertTitle: "Tax Policy Expert",
    expertCredentials: [
      "Professor of Economics, University of Nairobi",
      "Former KRA Policy Advisory Board Member",
      "Author: 'Taxation in East Africa'",
    ],
    topic: "Finance Bill 2026",
    expertiseArea: "Tax Policy & Economics",
    duration: "42:30",
    views: "234K",
    publishedDate: "2 weeks ago",
    thumbnailUrl: "/thumbnails/cohosted-finance.jpg",
    sections: [
      { timestamp: "00:00", title: "Introduction: Why This Bill Matters", host: "creator" },
      { timestamp: "05:20", title: "Key Provisions Explained", host: "expert" },
      { timestamp: "18:45", title: "Impact on Youth Employment", host: "both" },
      { timestamp: "27:10", title: "Hidden Clauses Deep Dive", host: "expert" },
      { timestamp: "35:00", title: "What Can We Do About It?", host: "creator" },
      { timestamp: "40:00", title: "Youth Q&A", host: "both" },
    ],
    whyThisMatters: "The Finance Bill directly affects how much you pay in taxes, what services you get, and whether there will be jobs for young people. Understanding it isn't optional—it's essential.",
    actionItems: [
      "Submit your views on the Finance Bill Portal by March 15th",
      "Attend your MP's town hall meeting (check their social media)",
      "Join the youth-led tax justice campaign #OurMoneyOurFuture",
    ],
  },
  {
    id: "affordable-housing-reality",
    title: "Affordable Housing: Can Gen Z Actually Afford It?",
    description: "Sharon from The Civic Millennial and housing economist Dr. Mutua crunch the numbers on the affordable housing scheme.",
    creatorId: "civic-millennial",
    expertName: "Dr. Lucy Mutua",
    expertTitle: "Housing Economist",
    expertCredentials: [
      "PhD in Urban Economics, LSE",
      "Senior Researcher, Kenya Housing Research Institute",
      "Policy Advisor to Nairobi County Government",
    ],
    topic: "Affordable Housing Scheme",
    expertiseArea: "Housing Policy & Urban Economics",
    duration: "38:15",
    views: "189K",
    publishedDate: "1 week ago",
    thumbnailUrl: "/thumbnails/cohosted-housing.jpg",
    sections: [
      { timestamp: "00:00", title: "The Housing Crisis in Numbers", host: "creator" },
      { timestamp: "07:30", title: "How the Levy Actually Works", host: "expert" },
      { timestamp: "16:20", title: "Real Cost Breakdown", host: "both" },
      { timestamp: "24:45", title: "Eligibility & Application Process", host: "expert" },
      { timestamp: "31:00", title: "Alternative Housing Solutions", host: "both" },
      { timestamp: "36:00", title: "Viewer Questions", host: "both" },
    ],
    whyThisMatters: "With youth unemployment at 67%, understanding whether the housing levy is an investment or a burden is crucial for financial planning.",
    actionItems: [
      "Calculate your actual levy contribution using the online calculator",
      "Check if you qualify for affordable housing (minimum 3 years contribution)",
      "Explore alternative housing schemes like SACCOs",
    ],
  },
  {
    id: "parliamentary-procedure",
    title: "How to Recall Your MP (And Actually Succeed)",
    description: "Mercy from Sheria Mtaani and constitutional lawyer Adv. Odhiambo explain the legal process of constituency recall.",
    creatorId: "sheria-mtaani",
    expertName: "Adv. Michael Odhiambo",
    expertTitle: "Constitutional Lawyer",
    expertCredentials: [
      "Advocate of the High Court of Kenya",
      "Constitutional petition specialist",
      "Lecturer, Kenya School of Law",
    ],
    topic: "MP Recall Process",
    expertiseArea: "Constitutional Law",
    duration: "29:50",
    views: "312K",
    publishedDate: "3 days ago",
    thumbnailUrl: "/thumbnails/cohosted-recall.jpg",
    sections: [
      { timestamp: "00:00", title: "When Can You Recall an MP?", host: "creator" },
      { timestamp: "06:15", title: "Constitutional Provisions (Article 104)", host: "expert" },
      { timestamp: "13:40", title: "The Petition Process Step-by-Step", host: "both" },
      { timestamp: "20:30", title: "Common Mistakes That Fail Recalls", host: "expert" },
      { timestamp: "25:00", title: "Organizing Your Constituency", host: "creator" },
      { timestamp: "28:00", title: "Final Tips", host: "both" },
    ],
    whyThisMatters: "Your vote doesn't end on election day. If your MP isn't representing you, you have the constitutional right and power to recall them.",
    actionItems: [
      "Download the recall petition template from IEBC website",
      "Understand the 30% voter threshold requirement",
      "Start organizing with local youth groups and civil society",
    ],
  },
];

export const CONTENT_TYPE_INFO = {
  fact: {
    label: "Verified Fact",
    color: "green",
    description: "Fact-checked information with citations and sources",
    icon: "CheckCircle2",
  },
  opinion: {
    label: "Opinion",
    color: "blue",
    description: "Personal viewpoints and analysis from the creator",
    icon: "MessageCircle",
  },
  satire: {
    label: "Satire",
    color: "yellow",
    description: "Humorous and satirical commentary on political topics",
    icon: "Laugh",
  },
};
