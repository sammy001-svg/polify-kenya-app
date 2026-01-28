import {
  Briefcase,
  DollarSign,
  GraduationCap,
  Laptop,
  Sprout,
  Brain as BrainIcon,
} from "lucide-react";
import React from "react";

export interface PoliticianResponse {
  id: string;
  politicianName: string;
  position: string;
  party: string;
  avatarUrl: string;
  isVerified: boolean;
  response: {
    position: string;
    proposedActions: string[];
    timeline: string;
    resources: string;
    successMetrics: string[];
  };
  timestamp: Date;
  likes: number;
  rating: number;
  ratingCount: number;
}

export interface YouthIssue {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  color: string;
  activeDiscussions: number;
  politicianResponses: number;
  keyStats: {
    label: string;
    value: string;
  }[];
}

export const YOUTH_ISSUES: YouthIssue[] = [
  {
    id: "unemployment",
    title: "Unemployment & Job Creation",
    icon: Briefcase,
    description:
      "Addressing youth unemployment, creating job opportunities, and fostering entrepreneurship.",
    color: "bg-blue-500",
    activeDiscussions: 342,
    politicianResponses: 18,
    keyStats: [
      { label: "Youth Unemployment Rate", value: "67%" },
      { label: "Jobs Created (2024)", value: "23,400" },
      { label: "Active Youth Entrepreneurs", value: "89,200" },
    ],
  },
  {
    id: "cost-of-living",
    title: "Cost of Living & Economic Justice",
    icon: DollarSign,
    description:
      "Tackling inflation, housing affordability, and economic inequality affecting young Kenyans.",
    color: "bg-green-500",
    activeDiscussions: 521,
    politicianResponses: 24,
    keyStats: [
      { label: "Inflation Rate", value: "7.9%" },
      { label: "Housing Affordability Gap", value: "45%" },
      { label: "Youth Below Poverty Line", value: "36%" },
    ],
  },
  {
    id: "education",
    title: "Education & Skills Development",
    icon: GraduationCap,
    description:
      "Improving education quality, accessibility, and alignment with job market demands.",
    color: "bg-purple-500",
    activeDiscussions: 298,
    politicianResponses: 31,
    keyStats: [
      { label: "Tertiary Enrollment", value: "12.3%" },
      { label: "Skills Gap Index", value: "58%" },
      { label: "TVET Graduates (2024)", value: "142,000" },
    ],
  },
  {
    id: "digital-economy",
    title: "Digital Economy & Innovation",
    icon: Laptop,
    description:
      "Expanding digital infrastructure, supporting tech startups, and building digital literacy.",
    color: "bg-cyan-500",
    activeDiscussions: 187,
    politicianResponses: 15,
    keyStats: [
      { label: "Internet Penetration", value: "87%" },
      { label: "Tech Startups Funded", value: "234" },
      { label: "Digital Jobs Created", value: "67,800" },
    ],
  },
  {
    id: "climate",
    title: "Climate & Environmental Sustainability",
    icon: Sprout,
    description:
      "Addressing climate change impacts, promoting green jobs, and environmental conservation.",
    color: "bg-emerald-500",
    activeDiscussions: 156,
    politicianResponses: 12,
    keyStats: [
      { label: "Green Jobs Created", value: "12,400" },
      { label: "Renewable Energy %", value: "73%" },
      { label: "Youth in Climate Action", value: "234,000" },
    ],
  },
  {
    id: "mental-health",
    title: "Mental Health & Wellbeing",
    icon: BrainIcon,
    description:
      "Expanding mental health services, reducing stigma, and promoting youth wellbeing.",
    color: "bg-pink-500",
    activeDiscussions: 412,
    politicianResponses: 9,
    keyStats: [
      { label: "Mental Health Facilities", value: "89" },
      { label: "Youth Accessing Services", value: "23%" },
      { label: "Counselors per 100k", value: "2.3" },
    ],
  },
];

export const MOCK_RESPONSES: Record<string, PoliticianResponse[]> = {
  unemployment: [
    {
      id: "resp-1",
      politicianName: "Hon. Sarah Kamau",
      position: "MP, Nairobi West",
      party: "ODM",
      avatarUrl: "/placeholder-avatar.jpg",
      isVerified: true,
      response: {
        position:
          "Youth unemployment is a national crisis requiring immediate, comprehensive action. I support a multi-pronged approach combining skills development, entrepreneurship support, and private sector partnerships.",
        proposedActions: [
          "Establish a Ksh 5B Youth Enterprise Fund with reduced interest rates (3-5%)",
          "Partner with 50+ tech companies to create 10,000 paid internships annually",
          "Launch nationwide digital skills training targeting 100,000 youth per year",
          "Tax incentives for companies hiring youth (first 2 years of employment)",
        ],
        timeline:
          "Q2 2026 - Fund launch; Q3 2026 - First internship cohort; Ongoing from Q4 2026",
        resources: "Ksh 8.2B allocated over 3 years (National Budget 2026/27)",
        successMetrics: [
          "15,000 youth businesses funded by end of year 1",
          "10,000 internships placed annually",
          "Reduce youth unemployment by 10% within 2 years",
          "100,000 youth trained in digital skills by 2028",
        ],
      },
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      likes: 1247,
      rating: 4.6,
      ratingCount: 342,
    },
    {
      id: "resp-2",
      politicianName: "Hon. David Mwangi",
      position: "Senator, Kiambu",
      party: "UDA",
      avatarUrl: "/placeholder-avatar.jpg",
      isVerified: true,
      response: {
        position:
          "Job creation must be driven by the private sector with government creating the enabling environment. Focus on infrastructure and reducing bureaucratic barriers to business formation.",
        proposedActions: [
          "Fast-track business registration to 24 hours for youth startups",
          "Invest Ksh 12B in county-level innovation hubs and incubators",
          "Create special economic zones targeting youth-led manufacturing",
          "Launch mentorship program pairing 5,000 youth with established entrepreneurs",
        ],
        timeline:
          "Business registration reforms - Q2 2026; Innovation hubs - Q4 2026 to Q2 2027",
        resources:
          "Ksh 15B infrastructure investment; Ksh 2B for mentorship programs",
        successMetrics: [
          "20,000 new youth businesses registered in year 1",
          "47 innovation hubs operational by 2027",
          "5,000 youth mentorships completed annually",
          "25,000 direct jobs created through SEZs by 2028",
        ],
      },
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      likes: 892,
      rating: 4.3,
      ratingCount: 217,
    },
  ],
  "cost-of-living": [
    {
      id: "resp-3",
      politicianName: "Hon. Grace Njeri",
      position: "MP, Nakuru Town",
      party: "Jubilee",
      avatarUrl: "/placeholder-avatar.jpg",
      isVerified: true,
      response: {
        position:
          "The cost of living crisis disproportionately affects young people starting their careers. We need immediate relief measures alongside long-term economic reforms.",
        proposedActions: [
          "Suspend VAT on essential goods for youth households (18-35 years)",
          "Introduce affordable housing scheme with 5% deposit for first-time youth buyers",
          "Cap interest rates on youth loans at 9%",
          "Subsidize public transport for students and young workers (50% discount)",
        ],
        timeline:
          "VAT suspension - Immediate (pending Finance Bill); Housing scheme - Q3 2026",
        resources:
          "Ksh 4.5B tax revenue foregone; Ksh 20B housing development fund",
        successMetrics: [
          "15% reduction in youth cost of living index within 12 months",
          "10,000 affordable housing units for youth by 2027",
          "Transport costs reduced by 50% for 500,000+ youth",
          "20% increase in youth savings rates",
        ],
      },
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      likes: 2134,
      rating: 4.8,
      ratingCount: 567,
    },
  ],
  education: [
    {
      id: "resp-4",
      politicianName: "Hon. Peter Ochieng",
      position: "MP, Kisumu Central",
      party: "ODM",
      avatarUrl: "/placeholder-avatar.jpg",
      isVerified: true,
      response: {
        position:
          "Our education system must evolve to meet 21st-century job market demands. We need radical reforms focusing on STEM, technical skills, and entrepreneurship education.",
        proposedActions: [
          "Increase HELB funding by 40% with income-based repayment",
          "Establish 20 Centers of Excellence for STEM across all counties",
          "Mandatory entrepreneurship training in all tertiary institutions",
          "Scholarship program for 10,000 youth in high-demand fields (AI, data science, renewable energy)",
        ],
        timeline:
          "HELB increase - FY 2026/27; Centers of Excellence - 2027-2029 rollout",
        resources: "Ksh 12B education budget increase; Ksh 3B scholarship fund",
        successMetrics: [
          "40% increase in HELB beneficiaries by 2027",
          "20 STEM Centers operational by 2029",
          "80% graduate employment rate within 6 months",
          "10,000 scholarships awarded in priority fields",
        ],
      },
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      likes: 1567,
      rating: 4.5,
      ratingCount: 412,
    },
  ],
  "digital-economy": [
    {
      id: "resp-5",
      politicianName: "Hon. Linda Wambui",
      position: "Senator, Nairobi",
      party: "UDA",
      avatarUrl: "/placeholder-avatar.jpg",
      isVerified: true,
      response: {
        position:
          "Kenya must position itself as Africa's digital economy leader. Youth are our greatest asset in achieving this vision through tech innovation and digital entrepreneurship.",
        proposedActions: [
          "Establish Ksh 10B Digital Innovation Fund for youth-led tech startups",
          "Deploy 5G infrastructure to all 47 counties by 2027",
          "Create 100,000 digital jobs through BPO and remote work facilitation",
          "Launch national coding bootcamps targeting 50,000 youth annually",
        ],
        timeline:
          "Innovation Fund - Q2 2026; 5G rollout - 2026-2027; Coding bootcamps - Q3 2026",
        resources:
          "Ksh 25B digital infrastructure; Ksh 10B innovation fund; Ksh 2B training",
        successMetrics: [
          "500 tech startups funded by 2028",
          "100% county 5G coverage by 2027",
          "100,000 digital jobs created",
          "150,000 youth trained in coding by 2028",
        ],
      },
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      likes: 1823,
      rating: 4.7,
      ratingCount: 489,
    },
  ],
  climate: [
    {
      id: "resp-6",
      politicianName: "Hon. James Kipchoge",
      position: "MP, Uasin Gishu",
      party: "UDA",
      avatarUrl: "/placeholder-avatar.jpg",
      isVerified: true,
      response: {
        position:
          "Climate action and youth employment can go hand-in-hand through green economy initiatives. We must invest in renewable energy, sustainable agriculture, and environmental conservation.",
        proposedActions: [
          "Create 50,000 green jobs in renewable energy sector by 2027",
          "Ksh 8B fund for youth-led climate adaptation projects",
          "National tree planting program employing 20,000 youth",
          "Green skills training for 30,000 youth in solar installation, sustainable agriculture",
        ],
        timeline:
          "Green jobs program - Q3 2026; Climate fund - Q2 2026; Tree planting - Ongoing",
        resources:
          "Ksh 15B green economy investment; Ksh 8B climate adaptation fund",
        successMetrics: [
          "50,000 green jobs created by 2027",
          "500 youth-led climate projects funded",
          "100 million trees planted by youth groups",
          "30,000 youth certified in green skills",
        ],
      },
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      likes: 987,
      rating: 4.4,
      ratingCount: 234,
    },
  ],
  "mental-health": [
    {
      id: "resp-7",
      politicianName: "Hon. Mary Akinyi",
      position: "Senator, Homa Bay",
      party: "ODM",
      avatarUrl: "/placeholder-avatar.jpg",
      isVerified: true,
      response: {
        position:
          "Mental health is a critical but neglected aspect of youth wellbeing. We need urgent investment in accessible, affordable, and youth-friendly mental health services.",
        proposedActions: [
          "Establish mental health centers in all 47 counties with free youth services",
          "Train 5,000 peer counselors from youth communities",
          "Launch national mental health awareness campaign targeting 10M youth",
          "Integrate mental health education in all schools and colleges",
        ],
        timeline:
          "County centers - 2026-2027 rollout; Peer training - Q3 2026; Campaign - Q2 2026",
        resources:
          "Ksh 6B mental health infrastructure; Ksh 1.5B training and awareness",
        successMetrics: [
          "47 youth mental health centers operational by 2027",
          "5,000 peer counselors trained",
          "Triple youth accessing mental health services",
          "50% reduction in mental health stigma (survey-based)",
        ],
      },
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      likes: 2456,
      rating: 4.9,
      ratingCount: 678,
    },
  ],
};
