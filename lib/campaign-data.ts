import { LucideIcon, MapPin, Building2, Gavel, Users, Scale, HeartHandshake } from 'lucide-react';

export type OfficeType = 'President' | 'Governor' | 'Senator' | 'MP' | 'Woman Rep' | 'MCA';

export interface CampaignTemplate {
  office: OfficeType;
  title: string;
  description: string;
  icon: LucideIcon;
  mandate: string[];
  keyFocusAreas: string[];
  requiredDocs: string[];
  stepByStep: {
    title: string;
    description: string;
  }[];
}

export const CAMPAIGN_TEMPLATES: CampaignTemplate[] = [
  {
    office: 'President',
    title: 'Presidential Campaign',
    description: 'Running for the higest office in the land. National unity and economic stewardship.',
    icon: Building2,
    mandate: [
      'Head of State and Government',
      'Commander-in-Chief of the Kenya Defence Forces',
      'Symbol of National Unity',
      'Protecting the Constitution and Sovereignty'
    ],
    keyFocusAreas: [
      'National Economy & Debt Management',
      'National Security',
      'International Relations',
      'Devolution Support',
      'Infrastructure Development'
    ],
    requiredDocs: [
      'Kenyan Citizenship',
      'University Degree',
      'Clearance from EACC',
      'Nomination by a Political Party or Independent (2000 signatures from majority of counties)'
    ],
    stepByStep: [
      { title: 'Party Nomination', description: 'Secure the ticket of a major coalition or register as an independent.' },
      { title: 'Manifesto Launch', description: 'Outline your vision for the country (The Plan).' },
      { title: 'National Campaign', description: 'Tour all 47 counties to sell your agenda.' },
      { title: 'Debates', description: 'Face off with opponents on live TV.' }
    ]
  },
  {
    office: 'Governor',
    title: 'Gubernatorial Campaign',
    description: 'The CEO of the County. Focusing on service delivery and local development.',
    icon: MapPin,
    mandate: [
      'Chief Executive of the County',
      'Implement County Legislation',
      'Manage County Resources',
      'Deliver Services (Health, Water, Agriculture, Early Education)'
    ],
    keyFocusAreas: [
      'Healthcare (County Hospitals)',
      'Agriculture & Markets',
      'County Roads & Infrastructure',
      'Early Childhood Education (ECDE)',
      'Water & Sanitation'
    ],
    requiredDocs: [
      'University Degree',
      'Registered Voter in the County',
      'Clearance from EACC',
      'Integrity Clearance (Chapter 6)'
    ],
    stepByStep: [
      { title: 'Community Listening', description: 'Identify pressing local issues (roads, hospitals).' },
      { title: 'Running Mate Selection', description: 'Choose a deputy who balances your ticket (regional/gender balance).' },
      { title: 'Ward Tours', description: 'Visit every ward to connect with grassroots voters.' }
    ]
  },
  {
    office: 'Senator',
    title: 'Senatorial Campaign',
    description: 'The Protector of Devolution. Oversighting county funds.',
    icon: Scale,
    mandate: [
      'Represent the County at National Level',
      'Protect the Interests of the County',
      'Oversight of County Revenue',
      'Determine Revenue Allocation to Counties'
    ],
    keyFocusAreas: [
      'Revenue Allocation Formula',
      'Oversight of Governor\'s Spending',
      'Defending Devolution',
      'Impeachment Proceedings (if necessary)'
    ],
    requiredDocs: [
      'University Degree',
      'Registered Voter',
      'Clearance from EACC'
    ],
    stepByStep: [
      { title: 'Audit Review', description: 'Highlight gaps in current county spending.' },
      { title: 'Public Barazas', description: 'Sensitize residents on their rights and county budget.' },
      { title: 'Media Engagement', description: 'Debate national issues affecting the county.' }
    ]
  },
  {
    office: 'MP',
    title: 'Member of Parliament (MP)',
    description: 'Representing the Constituency. Legislation and NG-CDF management.',
    icon: Gavel,
    mandate: [
      'Legislation (Making Laws)',
      'Representation of Constituency',
      'Oversight of National Government',
      'Management of NG-CDF (Development Fund)'
    ],
    keyFocusAreas: [
      'School Infrastructure (NG-CDF)',
      'Security (Police Posts)',
      'Bursaries for Students',
      'National Legislation'
    ],
    requiredDocs: [
      'Post-Secondary Qualification (Degree not mandatory currently but recommended)',
      'Registered Voter',
      'Clearance from EACC'
    ],
    stepByStep: [
      { title: 'Project Identification', description: 'Identify schools and stations needing renovation.' },
      { title: 'Bursary Plan', description: 'Propose a fair distribution model for education funds.' },
      { title: 'Town Halls', description: 'Engage directly with constituents on legislative priorities.' }
    ]
  },
  {
    office: 'Woman Rep',
    title: 'Woman Representative',
    description: 'Affirmative Action position. Promoting gender equity and marginalized groups.',
    icon: HeartHandshake,
    mandate: [
      'Promote interests of women, youth, and PWDs',
      'Manage NGAAF (Affirmative Action Fund)',
      'Legislation on social issues'
    ],
    keyFocusAreas: [
      'Women Empowerment Projects',
      'Table Banking & Saccos',
      'Gender-Based Violence Awareness',
      'Girl Child Education'
    ],
    requiredDocs: [
      'Post-Secondary Qualification',
      'Registered Voter',
      'Clearance from EACC'
    ],
    stepByStep: [
      { title: 'Group Mobilization', description: 'Meet with women groups and chamas.' },
      { title: 'Empowerment Workshops', description: 'Host training on economic independence.' },
      { title: 'Advocacy', description: 'Champion legislation protecting women and children.' }
    ]
  },
  {
    office: 'MCA',
    title: 'Member of County Assembly (MCA)',
    description: 'The closest leader to the people. Ward-level representation.',
    icon: Users,
    mandate: [
      'Legislation at County Assembly',
      'Representation of the Ward',
      'Oversight of County Executive (Governor)',
      'Approve County Budget and Plans (CIDP)'
    ],
    keyFocusAreas: [
      'Ward-level Access Roads',
      'Bursaries (Ward Fund)',
      'Local Dispensaries',
      'Street Lighting'
    ],
    requiredDocs: [
      'Post-Secondary Qualification',
      'Registered Voter in the Ward',
      'Clearance from EACC'
    ],
    stepByStep: [
      { title: 'Door-to-Door', description: 'Meet voters in their homes.' },
      { title: 'Problem Solving', description: 'Fix small local issues (drainage, lighting) to show initiative.' },
      { title: 'Market Visits', description: 'Engage with small traders and mama mbogas.' }
    ]
  }
];
