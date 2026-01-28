export type BillStage = 'First Reading' | 'Second Reading' | 'Committee' | 'Third Reading' | 'Presidential Assent';

export interface Bill {
  id: string;
  title: string;
  sponsor: string;
  stage: BillStage;
  summary: string;
  voteDeadline: string;
  supportCount: number;
  opposeCount: number;
  myVote?: 'yay' | 'nay' | 'abstain';
  tags: string[];
}

export const MOCK_BILLS: Bill[] = [
  {
    id: 'bill-001',
    title: 'The Digital Economy Bill 2025',
    sponsor: 'Hon. A. M. Ochieng',
    stage: 'Second Reading',
    summary: 'Aims to tax digital assets and regulate freelance platforms. Proposes a 1.5% levy on digital services.',
    voteDeadline: 'Feb 15, 2026',
    supportCount: 1450,
    opposeCount: 3200,
    tags: ['Finance', 'ICT', 'Tax']
  },
  {
    id: 'bill-002',
    title: 'County Revenue Allocation (Amendment) Bill',
    sponsor: 'Sen. K. Mutua',
    stage: 'Committee',
    summary: 'Adjusts the formula for revenue sharing to prioritize population density over land mass.',
    voteDeadline: 'Mar 01, 2026',
    supportCount: 500,
    opposeCount: 120,
    tags: ['Devolution', 'Finance']
  },
  {
    id: 'bill-003',
    title: 'Universal Health Coverage (UHC) Enforcement Bill',
    sponsor: 'Cabinet Secretary (Health)',
    stage: 'Third Reading',
    summary: 'Mandates NHIF registration for all adults and introduces a tiered contribution model.',
    voteDeadline: 'Jan 30, 2026',
    supportCount: 8900,
    opposeCount: 450,
    tags: ['Health', 'Social Services']
  },
  {
    id: 'bill-004',
    title: 'Agricultural Subsidy Reform Bill',
    sponsor: 'Hon. P. Njoroge',
    stage: 'First Reading',
    summary: 'Proposes direct mobile money transfers to farmers instead of fertilizer distribution.',
    voteDeadline: 'Apr 10, 2026',
    supportCount: 2100,
    opposeCount: 800,
    tags: ['Agriculture', 'Economy']
  },
  {
    id: 'bill-005',
    title: 'Cybersecurity & Data Protection Act 2026',
    sponsor: 'Hon. S. Wanjiku',
    stage: 'Presidential Assent',
    summary: 'Establishes the National Cyber Command and mandates data localization for banks.',
    voteDeadline: 'Passed',
    supportCount: 12000,
    opposeCount: 300,
    tags: ['Security', 'ICT']
  }
];

export const STAGES: BillStage[] = [
  'First Reading', 
  'Second Reading', 
  'Committee', 
  'Third Reading', 
  'Presidential Assent'
];
