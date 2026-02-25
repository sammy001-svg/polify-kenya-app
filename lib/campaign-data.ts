export interface WardSentiment {
  id: string;
  name: string;
  sentimentScore: number; // 0-100
  topIssue: string;
  voterCount: number;
  trend: 'up' | 'down' | 'stable';
}

export interface CampaignMetric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: 'users' | 'trending-up' | 'thumbs-up' | 'activity';
}

export const MOCK_WARD_DATA: WardSentiment[] = [
  { id: 'ward-1', name: 'Central Ward', sentimentScore: 78, topIssue: 'Road Repairs', voterCount: 12500, trend: 'up' },
  { id: 'ward-2', name: 'Westlands', sentimentScore: 45, topIssue: 'Water Shortage', voterCount: 8900, trend: 'down' },
  { id: 'ward-3', name: 'Market District', sentimentScore: 62, topIssue: 'Sanitation', voterCount: 15200, trend: 'stable' },
  { id: 'ward-4', name: 'Industrial Area', sentimentScore: 30, topIssue: 'Youth Jobs', voterCount: 10100, trend: 'down' },
  { id: 'ward-5', name: 'Green Estate', sentimentScore: 88, topIssue: 'Security', voterCount: 6500, trend: 'up' },
];

export const CAMPAIGN_METRICS: CampaignMetric[] = [
  { label: 'Total Reach', value: '45.2K', change: '+12%', isPositive: true, icon: 'users' },
  { label: 'Sentiment Score', value: '64/100', change: '+5%', isPositive: true, icon: 'thumbs-up' },
  { label: 'Engagement', value: '18.5%', change: '-2%', isPositive: false, icon: 'activity' },
  { label: 'Predicted Votes', value: '32,450', change: '+8%', isPositive: true, icon: 'trending-up' },
];

export const CAMPAIGN_ALERTS = [
  { id: 3, type: 'info', message: 'Town Hall scheduled for Friday is 85% fully booked.' },
];

// --- Restored Templates Data ---

import { LucideIcon, Building2, Gavel, Users, Scale, Crown, Heart } from 'lucide-react';

export interface CampaignTemplate {
  office: string;
  title: string;
  description: string;
  icon: LucideIcon;
  mandate: string[];
  requiredDocs: string[];
  stepByStep: { title: string; description: string }[];
}

export const CAMPAIGN_TEMPLATES: CampaignTemplate[] = [
  {
    office: 'president',
    title: 'President of the Republic',
    description: 'Targeting National Executive Leadership',
    icon: Crown,
    mandate: [
      'Head of State & Government',
      'Commander-in-Chief of Defence Forces',
      'Symbol of National Unity',
      'Protection of Constitution'
    ],
    requiredDocs: [
      'University Degree (Recognized)',
      '2,000 Signatures from Majority of Counties',
      'EACC & Police Clearance',
      'Nomination by Political Party / Independent'
    ],
    stepByStep: [
      { title: 'National Coalition Building', description: 'Form alliances across regions.' },
      { title: 'Grand Manifesto Launch', description: 'Televised launch of national agenda.' },
      { title: '47-County Tour', description: 'Massive logistical mobilization.' },
      { title: 'Presidential Debates', description: 'National media engagement.' }
    ]
  },
  {
    office: 'mca',
    title: 'Member of County Assembly (MCA)',
    description: 'Targeting Ward Level Leadership & Legislation',
    icon: Users,
    mandate: [
      'Representation of Ward residents',
      'Legislation in County Assembly',
      'Oversight of County Eecutive'
    ],
    requiredDocs: [
      'IEBC Clearance Certificate',
      'Party Nomination Certificate',
      'Self-Declaration Form (EACC)',
      'Certified Copies of ID/Passport'
    ],
    stepByStep: [
      { title: 'Community Mapping', description: 'Identify key influencers and ward-specific issues.' },
      { title: 'Voter Registration Drive', description: 'Ensure your supporters are registered.' },
      { title: 'Door-to-Door Campaign', description: 'Personal engagement is key at ward level.' },
      { title: 'Town Hall Meetings', description: 'Address community concerns directly.' }
    ]
  },
  {
    office: 'mp',
    title: 'Member of Parliament (MP)',
    description: 'Targeting Constituency Legislation & NG-CDF',
    icon: Building2,
    mandate: [
      'National Legislation',
      'Representation of Constituency',
      'Oversight of National Revenue',
      'Management of NG-CDF'
    ],
    requiredDocs: [
      'University Degree (Required)',
      'IEBC & Party Clearance',
      'Tax Compliance Certificate',
      'Certificate of Good Conduct'
    ],
    stepByStep: [
      { title: 'Constituency Needs Analysis', description: 'Analyze development gaps for NG-CDF.' },
      { title: 'Stakeholder Engagement', description: 'Meet with elders, youth, and women groups.' },
      { title: 'Media Strategy', description: 'Local radio and social media presence.' },
      { title: 'Manifesto Launch', description: 'Present your legislative agenda.' }
    ]
  },
  {
    office: 'senator',
    title: 'Senator',
    description: 'Targeting County Oversight & Devolution Protection',
    icon: Scale,
    mandate: [
      'Representing County Interests',
      'Oversight of County Revenue',
      ' Legislation on Counties',
      'Impeachment Hearings'
    ],
    requiredDocs: [
      'University Degree',
      'Clearance Certificates',
      'Political Party Certificate'
    ],
    stepByStep: [
      { title: 'County-Wide Tour', description: 'Visit all constituencies in the county.' },
      { title: 'Policy Debates', description: 'Engage in debates on devolution protection.' },
      { title: 'Oversight Agenda', description: 'Highlight gaps in current county governance.' }
    ]
  },
  {
    office: 'governor',
    title: 'Governor',
    description: 'Targeting County Executive Leadership',
    icon: Gavel,
    mandate: [
      'Chief Executive of County',
      'Management of County Resources',
      'Implementation of County Laws',
      'Development Planning'
    ],
    requiredDocs: [
      'University Degree',
      'Wait Deputy Governor Nominee',
      'High Clearance Thresholds'
    ],
    stepByStep: [
      { title: 'Running Mate Selection', description: 'Balance regional and ethnic arithmetic.' },
      { title: 'Detailed Manifesto', description: 'Comprehensive development plan for 5 years.' },
      { title: 'Resource Mobilization', description: 'High-budget campaign fundraising.' },
      { title: 'County Rallies', description: 'Large scale mobilization events.' }
    ]
  },
  {
    office: 'women-rep',
    title: 'Women Representative',
    description: 'Targeting County-Wide Affirmative Action Leadership',
    icon: Heart,
    mandate: [
      'Representation of women and marginalized groups',
      'Promotion of interests of women in the county',
      'Management of NGAAF (Affirmative Action Fund)',
      'Legislative and oversight roles in Parliament'
    ],
    requiredDocs: [
      'University Degree',
      'IEBC Clearance Certificate',
      'Party Nomination / Independent Clearance',
      'EACC & Tax Compliance Certificates'
    ],
    stepByStep: [
      { title: 'County-Wide Engagement', description: 'Consult women groups and community leaders across the county.' },
      { title: 'Affirmative Action Agenda', description: 'Draft a clear plan for NGAAF utilization and social protection.' },
      { title: 'Regional Logistical Strategy', description: 'Mobilize across all constituencies within the county.' },
      { title: 'Empowerment Forums', description: 'Host sessions focusing on economic and social empowerment.' }
    ]
  }
];
