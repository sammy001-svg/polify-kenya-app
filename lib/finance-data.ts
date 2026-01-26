
export type SourceType = 'M-Pesa' | 'Bank Transfer' | 'Cash' | 'In-Kind';
export type ExpenseCategory = 'Logistics' | 'Media' | 'Personnel' | 'Materials' | 'Events' | 'Other';

export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  date: string;
  source: SourceType;
  status: 'Received' | 'Pending' | 'Failed';
  reference?: string; // e.g., M-Pesa Code
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  receiptUrl?: string;
  status: 'Paid' | 'Pending';
}

export interface CampaignBudget {
  totalTarget: number;
  totalRaised: number;
  totalSpent: number;
  categories: Record<ExpenseCategory, number>; // Budget allocation per category
}

export const MOCK_DONATIONS: Donation[] = [
  { id: 'd1', donorName: 'John Doe', amount: 5000, date: '2026-01-20', source: 'M-Pesa', status: 'Received', reference: 'QWE123456' },
  { id: 'd2', donorName: 'Jane Smith', amount: 10000, date: '2026-01-22', source: 'Bank Transfer', status: 'Received' },
  { id: 'd3', donorName: 'Youth Group A', amount: 2500, date: '2026-01-25', source: 'Cash', status: 'Received' },
  { id: 'd4', donorName: 'Anonymous', amount: 500, date: '2026-01-26', source: 'M-Pesa', status: 'Received', reference: 'RTY789012' },
];

export const MOCK_EXPENSES: Expense[] = [
  { id: 'e1', description: 'T-Shirt Printing', amount: 15000, category: 'Materials', date: '2026-01-15', status: 'Paid' },
  { id: 'e2', description: 'Rally Sound System', amount: 8000, category: 'Logistics', date: '2026-01-18', status: 'Paid' },
  { id: 'e3', description: 'Facebook Ads', amount: 5000, category: 'Media', date: '2026-01-20', status: 'Pending' },
];

export const MOCK_BUDGET: CampaignBudget = {
  totalTarget: 5000000, // 5 Million KES
  totalRaised: 18000, // Calculated from mocks (mock values are placeholders)
  totalSpent: 23000,
  categories: {
    'Logistics': 1500000,
    'Media': 1000000,
    'Personnel': 1000000,
    'Materials': 1000000,
    'Events': 500000,
    'Other': 0
  }
};
