export interface Commitment {
  id: string;
  title: string;
  description: string;
  successIndicator: string; // "e.g., 50km of tarmacked road"
  timeline: string; // "e.g., By Dec 2027"
  status: 'Draft' | 'Locked';
  category: 'Infrastructure' | 'Education' | 'Health' | 'Economy' | 'Governance';
  progress?: number; // 0-100 (for dashboard view)
}

export const CATEGORIES = ['Infrastructure', 'Education', 'Health', 'Economy', 'Governance', 'Security', 'Environment', 'Social'];

export const MOCK_COMMITMENTS: Commitment[] = [
    {
        id: 'c1',
        title: 'New Maternity Wing for Westlands Health Centre',
        description: 'Expand the current capacity to handle 50 deliveries per day.',
        successIndicator: 'Fully equipped wing operational with 20 new beds.',
        timeline: 'By June 2027',
        status: 'Draft',
        category: 'Health',
        progress: 0
    },
    {
        id: 'c2',
        title: 'Youth Digital Innovation Hub',
        description: 'Establish a tech center for coding and digital skills.',
        successIndicator: 'Center opened with 50 computers and high-speed internet.',
        timeline: 'By Dec 2026',
        status: 'Draft',
        category: 'Education',
        progress: 0
    }
];
