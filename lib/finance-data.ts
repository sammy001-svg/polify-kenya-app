// ==========================================
// 1. PUBLIC FINANCE TRACKER (Transparency Hub)
// ==========================================

export interface BudgetAllocation {
  id: string;
  sector: string;
  amountAllocated: number; // in Billions KES
  amountAbsorbed: number; // in Billions KES
  riskLevel: "Low" | "Medium" | "High";
  flaggedProjects: number;
}

export const NATIONAL_BUDGET_2025: BudgetAllocation[] = [
  {
    id: "sec-1",
    sector: "Education",
    amountAllocated: 628,
    amountAbsorbed: 580,
    riskLevel: "Low",
    flaggedProjects: 12,
  },
  {
    id: "sec-2",
    sector: "Infrastructure & Transport",
    amountAllocated: 395,
    amountAbsorbed: 210,
    riskLevel: "High",
    flaggedProjects: 45,
  },
  {
    id: "sec-3",
    sector: "Health",
    amountAllocated: 148,
    amountAbsorbed: 130,
    riskLevel: "Medium",
    flaggedProjects: 23,
  },
  {
    id: "sec-4",
    sector: "National Security",
    amountAllocated: 380,
    amountAbsorbed: 375,
    riskLevel: "Medium",
    flaggedProjects: 5,
  },
  {
    id: "sec-5",
    sector: "Agriculture",
    amountAllocated: 85,
    amountAbsorbed: 40,
    riskLevel: "High",
    flaggedProjects: 38,
  },
];

export const TOTAL_BUDGET = NATIONAL_BUDGET_2025.reduce(
  (acc, curr) => acc + curr.amountAllocated,
  0,
);

// ==========================================
// 2. CAMPAIGN FINANCE MANAGER (Campaign Dashboard)
// ==========================================

export type SourceType =
  | "M-Pesa"
  | "Bank Transfer"
  | "Cash"
  | "Crypto"
  | "Check";
export type ExpenseCategory =
  | "Logistics"
  | "Media"
  | "Personnel"
  | "Materials"
  | "Events";

export interface Donation {
  id: string;
  amount: number;
  donorName: string;
  source: SourceType;
  date: string;
  status: "Received" | "Pending";
}

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: ExpenseCategory;
  date: string;
  status: "Paid" | "Pending";
}

export const MOCK_BUDGET = {
  totalTarget: 5000000, // 5M KES
};

export const MOCK_DONATIONS: Donation[] = [
  {
    id: "d1",
    amount: 5000,
    donorName: "John Kamau",
    source: "M-Pesa",
    date: "2025-06-01",
    status: "Received",
  },
  {
    id: "d2",
    amount: 15000,
    donorName: "Sarah Ochieng",
    source: "Bank Transfer",
    date: "2025-06-02",
    status: "Received",
  },
  {
    id: "d3",
    amount: 2000,
    donorName: "Peter Njoroge",
    source: "M-Pesa",
    date: "2025-06-03",
    status: "Received",
  },
  {
    id: "d4",
    amount: 50000,
    donorName: "Business Association",
    source: "Check",
    date: "2025-06-05",
    status: "Received",
  },
  {
    id: "d5",
    amount: 1000,
    donorName: "Jane Wanjiku",
    source: "Cash",
    date: "2025-06-06",
    status: "Received",
  },
];

export const MOCK_EXPENSES: Expense[] = [
  {
    id: "e1",
    amount: 12000,
    description: "Poster Printing",
    category: "Materials",
    date: "2025-06-02",
    status: "Paid",
  },
  {
    id: "e2",
    amount: 5000,
    description: "Facebook Ads",
    category: "Media",
    date: "2025-06-04",
    status: "Paid",
  },
  {
    id: "e3",
    amount: 45000,
    description: "Venue Booking for Rally",
    category: "Events",
    date: "2025-06-05",
    status: "Paid",
  },
  {
    id: "e4",
    amount: 8000,
    description: "Transport for Team",
    category: "Logistics",
    date: "2025-06-06",
    status: "Paid",
  },
];
