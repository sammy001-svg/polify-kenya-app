export interface Bill {
  id: string;
  title: string;
  status: "First Reading" | "Second Reading" | "Committee Stage" | "Third Reading" | "Assented" | "Rejected" | "Withdrawn";
  sponsor: string;
  summary: string;
  dateIntroduced: string;
  lastUpdated: string;
  progress: number; // 0 to 100
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
    status: "Withdrawn",
    sponsor: "Hon. Kuria Kimani (National Assembly Finance Committee)",
    summary: "A Bill to formulate the proposals announced in the Budget for 2024/2025 relating to revenue raising measures. Withdrawn following public protests.",
    dateIntroduced: "2024-05-09",
    lastUpdated: "2024-06-26",
    progress: 100
  },
  {
    id: "bill-housing-2023",
    title: "Affordable Housing Bill, 2023",
    status: "Assented",
    sponsor: "Hon. Kimani Ichung'wah (Majority Leader)",
    summary: "A Bill to provide a legal framework for the implementation of the Affordable Housing Policy.",
    dateIntroduced: "2023-12-04",
    lastUpdated: "2024-03-19",
    progress: 100
  },
  {
    id: "bill-conflict-interest-2023",
    title: "The Conflict of Interest Bill, 2023",
    status: "Second Reading",
    sponsor: "Hon. Kimani Ichung'wah (Majority Leader)",
    summary: "A Bill to provide for the management of conflict of interest in the discharge of official duties.",
    dateIntroduced: "2023-02-15",
    lastUpdated: "2024-02-28",
    progress: 40
  },
  {
    id: "bill-maandamano-2024",
    title: "The Assembly and Demonstration Regulation Bill, 2024",
    status: "First Reading",
    sponsor: "Hon. Geoffrey Ruku (Mbeere North)",
    summary: "A Bill to regulate public assemblies and demonstrations.",
    dateIntroduced: "2024-07-01",
    lastUpdated: "2024-07-01",
    progress: 20
  }
];

export const HANSARD_RECORDS: HansardRecord[] = [
  {
    id: "hansard-2024-06-25",
    date: "2024-06-25",
    title: "Morning Sitting - Third Reading of Finance Bill",
    summary: "Debate on the third reading of the Finance Bill 2024. Intense discussion on tax measures.",
    speakers: ["Hon. Kimani Ichung'wah", "Hon. Opiyo Wandayi", "Hon. Ndindi Nyoro"],
    tags: ["Finance Bill", "Taxation", "Budget"]
  },
  {
    id: "hansard-2024-06-20",
    date: "2024-06-20",
    title: "Afternoon Sitting - Committee of the Whole House",
    summary: "Committee stage processing of proposed amendments to the Finance Bill.",
    speakers: ["Hon. Gladys Shollei", "Hon. John Mbadi"],
    tags: ["Amendments", "Finance Bill"]
  },
  {
    id: "hansard-2024-02-14",
    date: "2024-02-14",
    title: "Special Sitting - Affordable Housing Bill",
    summary: "Debate on the Affordable Housing Bill following public participation reports.",
    speakers: ["Hon. Alice Wahome", "Hon. Kalonzo Musyoka (Guest)"],
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
  { id: "v8", billId: "bill-housing-2023", mpName: "Hon. Kimani Ichung'wah", party: "UDA", constituency: "Kikuyu", vote: "Yes" },
  { id: "v9", billId: "bill-housing-2023", mpName: "Hon. Opiyo Wandayi", party: "ODM", constituency: "Ugunja", vote: "No" },
];
