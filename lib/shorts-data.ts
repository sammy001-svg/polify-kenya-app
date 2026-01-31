/* cSpell:ignore PoliFy maandamano Bunge */

export interface ShortVideo {
  id: string;
  videoUrl: string;
  title: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  stats: {
    likes: string;
    comments: string;
    shares: string;
  };
  verificationStatus: "Verified" | "Fact-Checked" | "True" | "False" | "Misleading" | "Context Needed" | "Context Added" | "Pending" | "Opinion";
  citations?: { label: string; url: string }[];
  detailedAnalysis?: string;
  description: string;
  tags: string[];
}

export const SHORTS_DATA: ShortVideo[] = [
  {
    id: "short-1",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    title: "Finance Bill 2026: The Tea ☕️",
    creator: {
      id: "bunge-roaster",
      name: "Bunge Roaster 254",
      avatar: "/creators/bunge-roaster.jpg",
      isVerified: true
    },
    stats: {
      likes: "45.2K",
      comments: "2.1K",
      shares: "12K"
    },
    verificationStatus: 'Verified',
    citations: [
      { label: "Parliamentary Budget Office Report 2025", url: "https://parliament.go.ke" },
      { label: "Treasury Gazette Notice #442", url: "https://treasury.go.ke" }
    ],
    detailedAnalysis: "The 2% Digital Levy mentioned is confirmed in the Finance Bill 2026, Section 14. However, the exemptions for small-scale creators are still under debate.",
    description: "Breaking down the new levies in less than 60 seconds. Know your taxes! #FinanceBill #Kenya",
    tags: ["#FinanceBill", "#Kenya", "#Taxes"]
  },
  {
    id: "short-2",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "Recalling your MP? Step 1 ✍️",
    creator: {
      id: "sheria-mtaani",
      name: "Sheria Mtaani",
      avatar: "/creators/sheria-mtaani.jpg",
      isVerified: true
    },
    stats: {
      likes: "22.8K",
      comments: "1.5K",
      shares: "8.4K"
    },
    verificationStatus: 'Fact-Checked',
    citations: [
      { label: "The Constitution of Kenya, Article 105", url: "https://kenyalaw.org" },
      { label: "IEBC Recall Guide", url: "https://iebc.or.ke" }
    ],
    detailedAnalysis: "Article 105 of the Constitution and the Elections Act provide the framework for recall. The first step is indeed a petition signed by 30% of registered voters in the constituency.",
    description: "Think it's hard to recall an MP? Here's the first legal step you need to take. #CivicDuty #KenyaLaws",
    tags: ["#CivicDuty", "#KenyaLaws", "#RecallMP"]
  },
  {
    id: "short-3",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    title: "Nairobi County Assembly Drama 🎭",
    creator: {
      id: "county-watch",
      name: "County Watch KE",
      avatar: "/creators/county-watch.jpg",
      isVerified: false
    },
    stats: {
      likes: "15.4K",
      comments: "890",
      shares: "3.2K"
    },
    verificationStatus: 'Pending',
    description: "MCAs at it again! Budget readings turned into a literal shouting match today. #Devolution #Nairobi",
    tags: ["#Devolution", "#Nairobi", "#MCAs"]
  }
];
