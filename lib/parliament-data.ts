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
    status: "Rejected by President",
    sponsor: "Hon. Kimani Ichung'wah",
    summary: "Proposed various tax increases aimed at raising KSh 346 billion. Rejected after widespread public protests.",
    voteDeadline: "June 20, 2024",
    lastUpdated: "2024-06-28",
    progress: 100,
    supportCount: 195,
    opposeCount: 106,
    tags: ["Finance", "Taxation", "Protests"]
  },
  {
    id: "bill-finance-2025",
    title: "The Finance Bill, 2025",
    stage: "Presidential Assent",
    status: "Assented",
    sponsor: "Hon. Kuria Kimani",
    summary: "Introduces reforms targeting job creation, innovation, and local manufacturing. Signed into law June 2025.",
    voteDeadline: "June 15, 2025",
    lastUpdated: "2025-06-19",
    progress: 100,
    supportCount: 210,
    opposeCount: 85,
    tags: ["Finance", "Digital Economy"]
  },
  {
    id: "bill-housing-2024",
    title: "Affordable Housing Act, 2024",
    stage: "Presidential Assent",
    status: "Assented",
    sponsor: "Hon. Alice Wahome",
    summary: "Establishes a framework for affordable housing development and an Affordable Housing Levy.",
    voteDeadline: "February 15, 2024",
    lastUpdated: "2024-02-15",
    progress: 100,
    supportCount: 180,
    opposeCount: 90,
    tags: ["Housing", "Levy"]
  },
  {
    id: "bill-climate-2024",
    title: "Climate Change (Carbon Markets) Regulations, 2024",
    stage: "Presidential Assent",
    status: "Assented",
    sponsor: "Hon. Soipan Tuya",
    summary: "Framework for carbon project implementation and trading in Kenya.",
    voteDeadline: "May 20, 2024",
    lastUpdated: "2024-05-22",
    progress: 100,
    supportCount: 220,
    opposeCount: 10,
    tags: ["Environment", "Carbon Markets"]
  },
  {
    id: "bill-const-amend-2025",
    title: "Constitution of Kenya (Amendment) Bill, 2025",
    stage: "First Reading",
    status: "In Progress",
    sponsor: "Senate Majority Leader",
    summary: "Seeks to entrench NG-CDF, National Government Affirmative Action Fund, and Senate Oversight Fund.",
    voteDeadline: "August 30, 2025",
    lastUpdated: "2025-08-07",
    progress: 20,
    supportCount: 150,
    opposeCount: 20,
    tags: ["Constitution", "Devolution"]
  },
  {
    id: "bill-ai-2026",
    title: "The Artificial Intelligence Bill, 2026",
    stage: "First Reading",
    status: "Tabelled",
    sponsor: "Sen. Karen Nyamu",
    summary: "Proposes the establishment of an Artificial Intelligence Commissioner's office for oversight and regulation.",
    voteDeadline: "April 10, 2026",
    lastUpdated: "2026-02-15",
    progress: 10,
    supportCount: 45,
    opposeCount: 5,
    tags: ["Technology", "AI", "Regulation"]
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
    title: "Morning Sitting - Third Reading of Finance Bill 2024",
    summary: "Debate on the third reading of the Finance Bill 2024. Intense discussion on tax measures and public outcry.",
    speakers: ["Hon. Kimani Ichung'wah", "Hon. Opiyo Wandayi", "Hon. Ndindi Nyoro"],
    tags: ["Finance Bill", "Taxation", "Budget"]
  },
  {
    id: "hansard-2025-06-18",
    date: "2025-06-18",
    title: "Afternoon Sitting - Finance Bill 2025 Passage",
    summary: "Final debate and voting on the Finance Bill 2025 with focus on digital services tax.",
    speakers: ["Hon. Kuria Kimani", "Hon. John Mbadi"],
    tags: ["Finance Bill 2025", "Digital Economy"]
  },
  {
    id: "hansard-2024-02-14",
    date: "2024-02-14",
    title: "Special Sitting - Affordable Housing Act",
    summary: "Debate on the Affordable Housing Act following court rulings and public participation.",
    speakers: ["Hon. Alice Wahome", "Hon. Otiende Amollo"],
    tags: ["Housing", "Levy"]
  }
];

export const VOTING_RECORDS: Vote[] = [
  { id: "v1", billId: "bill-finance-2024", mpName: "Hon. Kimani Ichung'wah", party: "UDA", constituency: "Kikuyu", vote: "Yes" },
  { id: "v2", billId: "bill-finance-2024", mpName: "Hon. Opiyo Wandayi", party: "ODM", constituency: "Ugunja", vote: "No" },
  { id: "v3", billId: "bill-finance-2024", mpName: "Hon. Babu Owino", party: "ODM", constituency: "Embakasi East", vote: "No" },
  { id: "v4", billId: "bill-finance-2024", mpName: "Hon. Ndindi Nyoro", party: "UDA", constituency: "Kiharu", vote: "Yes" },
  { id: "v5", billId: "bill-finance-2024", mpName: "Hon. Jalang'o", party: "ODM", constituency: "Lang'ata", vote: "Yes" },
  { id: "v6", billId: "bill-finance-2024", mpName: "Hon. Millie Odhiambo", party: "ODM", constituency: "Suba North", vote: "No" },
  { id: "v7", billId: "bill-finance-2024", mpName: "Hon. Sylvanus Osoro", party: "UDA", constituency: "South Mugirango", vote: "Yes" },
  { id: "v8", billId: "bill-housing-2024", mpName: "Hon. Kimani Ichung'wah", party: "UDA", constituency: "Kikuyu", vote: "Yes" },
  { id: "v9", billId: "bill-housing-2024", mpName: "Hon. Opiyo Wandayi", party: "ODM", constituency: "Ugunja", vote: "No" },
  { id: "v10", billId: "bill-finance-2025", mpName: "Hon. Kuria Kimani", party: "UDA", constituency: "Molo", vote: "Yes" },
  { id: "v11", billId: "bill-finance-2025", mpName: "Hon. Peter Kaluma", party: "ODM", constituency: "Homa Bay Town", vote: "No" },
  { id: "v12", billId: "bill-const-amend-2025", mpName: "Hon. Aaron Cheruiyot", party: "UDA", constituency: "Kericho", vote: "Yes" },
  { id: "v13", billId: "bill-const-amend-2025", mpName: "Hon. Stewart Madzayo", party: "ODM", constituency: "Kilifi", vote: "Yes" },
];
