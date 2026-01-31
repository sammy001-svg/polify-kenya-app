export type BillStage = 'First Reading' | 'Second Reading' | 'Committee' | 'Third Reading' | 'Presidential Assent';

export interface Bill {
  id: string;
  title: string;
  sponsor: string;
  stage: BillStage;
  status: string; // Compatibility for UI
  summary: string;
  voteDeadline: string;
  lastUpdated: string; // Compatibility for UI
  progress: number; // Compatibility for UI (0-100)
  supportCount: number;
  opposeCount: number;
  myVote?: 'yay' | 'nay' | 'abstain';
  tags: string[];
}

export interface HansardRecord {
  id: string;
  date: string;
  title: string;
  summary: string;
  speakers: string[];
  tags: string[];
}

export interface Vote {
  id: string;
  billId: string;
  mpName: string;
  party: string;
  constituency: string;
  vote: "Yes" | "No" | "Abstain" | "Absent";
  imageUrl?: string;
}

export const BILLS: Bill[] = [
  {
    id: "bill-finance-2024",
    title: "The Finance Bill, 2024",
    stage: "Presidential Assent",
    status: "Assented",
    sponsor: "Hon. Kuria Kimani",
    summary: "A Bill to formulate the proposals announced in the Budget for 2024/2025 relating to revenue raising measures.",
    voteDeadline: "June 20, 2024",
    lastUpdated: "2024-06-26",
    progress: 100,
    supportCount: 195,
    opposeCount: 106,
    tags: ["Finance", "Taxation"]
  },
  {
    id: "bill-housing-2023",
    title: "Affordable Housing Bill, 2023",
    stage: "Presidential Assent",
    status: "Assented",
    sponsor: "Hon. Kimani Ichung'wah",
    summary: "A Bill to provide a legal framework for the implementation of the Affordable Housing Policy.",
    voteDeadline: "March 15, 2024",
    lastUpdated: "2024-03-19",
    progress: 100,
    supportCount: 180,
    opposeCount: 90,
    tags: ["Housing", "Social Welfare"]
  },
  {
    id: "bill-conflict-interest-2023",
    title: "The Conflict of Interest Bill, 2023",
    stage: "Second Reading",
    status: "Second Reading",
    sponsor: "Hon. Kimani Ichung'wah",
    summary: "A Bill to provide for the management of conflict of interest in the discharge of official duties.",
    voteDeadline: "August 10, 2024",
    lastUpdated: "2024-02-28",
    progress: 40,
    supportCount: 45,
    opposeCount: 12,
    tags: ["Governance", "Ethics"]
  },
  {
    id: "bill-maandamano-2024",
    title: "The Assembly and Demonstration Regulation Bill, 2024",
    stage: "First Reading",
    status: "First Reading",
    sponsor: "Hon. Geoffrey Ruku",
    summary: "A Bill to regulate public assemblies and demonstrations.",
    voteDeadline: "October 12, 2024",
    lastUpdated: "2024-07-01",
    progress: 20,
    supportCount: 20,
    opposeCount: 85,
    tags: ["Security", "Rights"]
  }
];

export const STAGES: BillStage[] = [
  'First Reading', 
  'Second Reading', 
  'Committee', 
  'Third Reading', 
  'Presidential Assent'
];

export const HANSARD_RECORDS: HansardRecord[] = [
  {
    id: "hansard-2024-06-25",
    date: "2024-06-25",
    title: "Morning Sitting - Third Reading of Finance Bill",
    summary: "Debate on the third reading of the Finance Bill 2024. Intense discussion on tax measures.",
    speakers: ["Hon. Kimani Ichung'wah", "Hon. Opiyo Wandayi", "Hon. Ndindi Nyoro"],
    tags: ["Finance Bill", "Taxation", "Budget"]
  }
];

export const VOTING_RECORDS: Vote[] = [
  { id: "v1", billId: "bill-finance-2024", mpName: "Hon. Kimani Ichung'wah", party: "UDA", constituency: "Kikuyu", vote: "Yes" },
  { id: "v2", billId: "bill-finance-2024", mpName: "Hon. Opiyo Wandayi", party: "ODM", constituency: "Ugunja", vote: "No" }
];
