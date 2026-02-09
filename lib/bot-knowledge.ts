/**
 * PoliFy Kenya Bot Knowledge Base
 * Maps user intent keywords to platform information and feature links.
 */

export interface KnowledgeEntry {
  keywords: string[];
  response: string;
  link?: string;
  linkText?: string;
  category:
    | "tallying"
    | "campaign"
    | "parliament"
    | "auditor"
    | "constitution"
    | "general"
    | "youth";
}

export const PLATFORM_KNOWLEDGE: KnowledgeEntry[] = [
  {
    category: "tallying",
    keywords: [
      "tally",
      "results",
      "presidential",
      "leading",
      "votes",
      "election",
      "bomas",
    ],
    response:
      "The National Tallying Centre provides real-time, verified results streaming directly from Bomas of Kenya. You can see live maps, party distributions, and AI-powered outcome projections.",
    link: "/tallying",
    linkText: "Go to Tallying Centre",
  },
  {
    category: "campaign",
    keywords: [
      "campaign",
      "funding",
      "donate",
      "candidate",
      "politician",
      "hq",
      "support",
    ],
    response:
      "Campaign HQ allows you to track campaign financing, see who is supporting your favorite candidates, or even start your own mobilization efforts. We ensure full transparency in political funding.",
    link: "/campaign",
    linkText: "Open Campaign HQ",
  },
  {
    category: "parliament",
    keywords: [
      "parliament",
      "bill",
      "law",
      "mp",
      "senator",
      "debate",
      "hansard",
      "legislative",
    ],
    response:
      "Parliament Watch keeps you updated on active Bills, parliamentary debates (Hansard), and the performance of your representatives. You can track exactly what laws are being made.",
    link: "/parliament",
    linkText: "View Parliament Watch",
  },
  {
    category: "auditor",
    keywords: [
      "corruption",
      "budget",
      "spending",
      "auditor",
      "money",
      "theft",
      "accountability",
      "tax",
    ],
    response:
      "Our Auditor General section tracks public spending and flags potential corruption nodes using AI. You can see how your taxes are utilized and report community-level issues.",
    link: "/auditor",
    linkText: "Audit Public Spending",
  },
  {
    category: "constitution",
    keywords: [
      "constitution",
      "rights",
      "freedom",
      "article",
      "chapter",
      "law",
      "supreme",
    ],
    response:
      "I can help you navigate the 18 chapters and various articles of the Kenyan Constitution. Ask me about your rights, the Bill of Rights (Chapter 4), or the structure of Government.",
    link: "/constitution",
    linkText: "Read the Constitution",
  },
  {
    category: "youth",
    keywords: [
      "youth",
      "genz",
      "organize",
      "issue",
      "speak",
      "hub",
      "community",
    ],
    response:
      "The Youth Issue Hubs are designed for active mobilization and organizing. Join local 'Barazas' to discuss issues that matter to your generation.",
    link: "/youth",
    linkText: "Join Issue Hubs",
  },
  {
    category: "campaign",
    keywords: ["mashinani", "rally", "event", "meeting", "townhall", "pulse"],
    response:
      "Check out the Mashinani Campaign Pulse to see real-time updates from political rallies, town halls, and policy launches across the country.",
    link: "/live",
    linkText: "View Campaign Pulse",
  },
  {
    category: "general",
    keywords: ["hello", "hi", "who are you", "what can you do", "help"],
    response:
      "I am Polify AI, your green-themed Digital Constitutionalist and Platform Guide. I can help you track elections, audit government spending, find your representatives, and understand the Constitution.",
  },
];

export function searchPlatformKnowledge(query: string): KnowledgeEntry | null {
  const q = query.toLowerCase();

  // Find entry with most matching keywords
  let bestMatch: KnowledgeEntry | null = null;
  let maxMatches = 0;

  for (const entry of PLATFORM_KNOWLEDGE) {
    const matches = entry.keywords.filter((k) => q.includes(k)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = entry;
    }
  }

  return maxMatches > 0 ? bestMatch : null;
}
