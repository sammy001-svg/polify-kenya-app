// Mock Data for Parliament Watch Integration

export interface Bill {
  id: string;
  title: string;
  sponsorId: string; // politicianId
  status: "First Reading" | "Second Reading" | "Committee Stage" | "Third Reading" | "Passed" | "Assented" | "Rejected";
  introductionDate: string;
  lastActionDate: string;
  summary: string;
}

export interface Vote {
  id: string;
  billId: string; // references a Bill
  politicianId: string;
  vote: "Yes" | "No" | "Abstain" | "Absent";
  date: string;
  billTitle: string; // Denormalized for easier display
}

export interface HansardContribution {
  id: string;
  politicianId: string;
  date: string;
  topic: string;
  summary: string;
  type: "Question" | "Statement" | "Motion" | "Contribution";
}

export interface ParliamentPerformance {
  politicianId: string;
  attendance: {
    present: number;
    absentWithApology: number;
    absent: number;
    totalSittings: number;
  };
  billsSponsored: string[]; // Bill IDs
  committeeRoles: {
    committee: string;
    role: "Chairperson" | "Vice-Chairperson" | "Member";
  }[];
}

// Mock Data

export const MOCK_BILLS: Bill[] = [
  {
    id: "bill-1",
    title: "The Youth Employment Authority Bill, 2025",
    sponsorId: "pol-1", // Hon. Sarah Kamau
    status: "Second Reading",
    introductionDate: "2025-02-15",
    lastActionDate: "2025-04-10",
    summary: "A Bill to establish an authority responsible for coordinating all youth employment initiatives and managing the national internship program."
  },
  {
    id: "bill-2",
    title: "The Carbon Credit Trading Regulation Bill, 2025",
    sponsorId: "pol-6", // Hon. James Kipchoge
    status: "Committee Stage",
    introductionDate: "2025-01-20",
    lastActionDate: "2025-03-05",
    summary: "A Bill to regulate the trading of carbon credits and ensure local communities benefit from climate action projects."
  },
  {
    id: "bill-3",
    title: "The Digital Rights and Safety Bill, 2024",
    sponsorId: "pol-5", // Hon. Linda Wambui
    status: "Passed",
    introductionDate: "2024-11-10",
    lastActionDate: "2025-02-28",
    summary: "A Bill to protect digital rights of citizens and establish safety standards for online platforms operating in Kenya."
  }
];

export const MOCK_VOTES: Vote[] = [
  {
    id: "vote-1",
    billId: "bill-3",
    politicianId: "pol-1",
    vote: "Yes",
    date: "2025-02-28",
    billTitle: "The Digital Rights and Safety Bill, 2024"
  },
  {
    id: "vote-2",
    billId: "bill-finance",
    politicianId: "pol-1",
    vote: "No",
    date: "2024-06-25",
    billTitle: "The Finance Bill, 2024"
  },
  {
    id: "vote-3",
    billId: "bill-finance",
    politicianId: "pol-2",
    vote: "Yes",
    date: "2024-06-25",
    billTitle: "The Finance Bill, 2024"
  }
];

export const MOCK_HANSARD: HansardContribution[] = [
  {
    id: "han-1",
    politicianId: "pol-1",
    date: "2025-04-12",
    type: "Question",
    topic: "Youth Fund Disbursement",
    summary: "Asked the Cabinet Secretary for Youth Affairs to explain the delay in disbursement of funds to youth groups in Nairobi West."
  },
  {
    id: "han-2",
    politicianId: "pol-1",
    date: "2025-03-25",
    type: "Contribution",
    topic: "Affordable Housing Debate",
    summary: "Contributed to the debate supporting the amendment to include student housing in the affordable housing program."
  }
];

export const MOCK_PERFORMANCE: Record<string, ParliamentPerformance> = {
  "pol-1": {
    politicianId: "pol-1",
    attendance: {
      present: 45,
      absentWithApology: 3,
      absent: 2,
      totalSittings: 50
    },
    billsSponsored: ["bill-1"],
    committeeRoles: [
      { committee: "Public Accounts Committee", role: "Member" },
      { committee: "Committee on Youth & Sports", role: "Vice-Chairperson" }
    ]
  },
  "pol-2": {
    politicianId: "pol-2",
    attendance: {
      present: 48,
      absentWithApology: 2,
      absent: 0,
      totalSittings: 50
    },
    billsSponsored: [],
    committeeRoles: [
      { committee: "Budget & Appropriations Committee", role: "Member" }
    ]
  }
};
