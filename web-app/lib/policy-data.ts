export interface PolicyClause {
  title: string;
  content: string;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface DecodedPolicy {
  id: string;
  title: string;
  summary: string;
  category: string;
  status: 'Proposed' | 'Active' | 'Under Review';
  lastUpdated: string;
  
  // AI Scorecard
  feasibility: number;
  impactScore: number;
  fiscalLoad: number;
  
  // Deep Dive
  pros: string[];
  cons: string[];
  keyClauses: PolicyClause[];
  
  // Context
  impactStatement: string;
}

export const DECODED_POLICIES: DecodedPolicy[] = [
  {
    id: 'finance-bill-2026',
    title: 'The Finance Bill 2026',
    category: 'Economy',
    status: 'Proposed',
    lastUpdated: '2026-01-28',
    summary: 'A comprehensive legislative proposal aiming to expand the tax base specifically targeting digital assets, eco-levies, and specialized export zones.',
    feasibility: 68,
    impactScore: 85,
    fiscalLoad: 92,
    pros: [
       "Projected to reduce budget deficit by 12%",
       "Protects local manufacturing via higher import tariffs",
       "Introduces tax holidays for green energy startups"
    ],
    cons: [
       "Increases cost of digital devices by 15%",
       "Higher fuel levy may drive up transport costs",
       "Strict compliance requirements for SMEs"
    ],
    keyClauses: [
       { title: "Digital Asset Tax", content: "Introduction of a 3% tax on transfer of all digital assets including cryptocurrency and clean eco-credits.", impact: "neutral" },
       { title: "Eco-Levy", content: "A levy on all imported goods that have a harmful environmental footprint, aimed at waste management funding.", impact: "positive" },
       { title: "Motor Vehicle Circulation Tax", content: "Annual tax payable at the time of insurance cover acquisition, pegged at vehicle value.", impact: "negative" }
    ],
    impactStatement: "This bill fundamentally shifts the tax burden towards consumption and digital economy participants, aiming to shore up revenue but potentially raising the cost of living for the middle class."
  },
  {
    id: 'affordable-housing-act',
    title: 'Affordable Housing Act 2025',
    category: 'Housing',
    status: 'Active',
    lastUpdated: '2025-11-15',
    summary: 'The legal framework establishing the Housing Levy and defining the mandate of the Affordable Housing Fund to construct low-cost residential units.',
    feasibility: 88,
    impactScore: 92,
    fiscalLoad: 45,
    pros: [
       "Creates direct employment for 200,000+ artisans",
       "Standardizes low-cost housing quality",
       "Mandatory employer contribution matching"
    ],
    cons: [
       "1.5% gross salary deduction reduces disposable income",
       "Questions around allocation transparency",
       "Litigation risks regarding levy constitutionality"
    ],
    keyClauses: [
       { title: "The Housing Levy", content: "Mandatory deduction of 1.5% from gross salary for all employees, matched by employers.", impact: "neutral" },
       { title: "Allocation Eligibility", content: "Priority allocation for first-time homeowners and specialized 'Boma Yangu' saving scheme members.", impact: "positive" },
       { title: "Fund Management", content: "Establishment of an independent board to oversee fund disbursement and project commissioning.", impact: "positive" }
    ],
    impactStatement: "A massive infrastructure project that aims to solve the urban housing dignity crisis, though it faces stiff resistance due to its mandatory contributory nature."
  },
  {
    id: 'digital-health-bill',
    title: 'Digital Health Bill 2025',
    category: 'Healthcare',
    status: 'Active',
    lastUpdated: '2025-10-01',
    summary: 'Establishes the Digital Health Superhighway, mandating electronic health records for all facilities and creating a centralized health data bank.',
    feasibility: 72,
    impactScore: 95,
    fiscalLoad: 60,
    pros: [
       "Portable health records across any facility",
       "Real-time disease outbreak monitoring",
       "Telemedicine legal framework establishment"
    ],
    cons: [
       "Data privacy concerns regarding central storage",
       "High initial hardware cost for rural clinics",
       "System downtime risks affecting care delivery"
    ],
    keyClauses: [
       { title: "E-Health Records", content: "Mandatory digitization of patient records for all Level 4-6 hospitals within 12 months.", impact: "positive" },
       { title: "Data Protection", content: "Strict liability for data breaches involving patient health information.", impact: "neutral" },
       { title: "Telemedicine Standards", content: "Licensing requirements for doctors practicing remote medicine and prescription handling.", impact: "positive" }
    ],
    impactStatement: "This bill modernizes Kenya's healthcare infrastructure, potentially saving thousands of lives through better data, despite significant implementation hurdles in remote areas."
  }
];

export function getPolicyById(id: string): DecodedPolicy | undefined {
  return DECODED_POLICIES.find(p => p.id === id);
}
