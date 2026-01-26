// import { LucideIcon } from "lucide-react"; // Unused import removed

export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type UserLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: BadgeRarity;
  xpReward: number;
  requirements: string[];
  category: 'learning' | 'engagement' | 'achievement' | 'special';
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  contentType: 'video' | 'quiz' | 'reading';
  duration: string; // in minutes
  xpReward: number;
  completed?: boolean;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string; // total time
  modules: LearningModule[];
  badge: Badge;
  icon: string;
  color: string;
  totalXP: number;
}

export interface UserProgress {
  userId: string;
  level: UserLevel;
  currentXP: number;
  totalXP: number;
  nextLevelXP: number;
  badges: string[]; // badge IDs
  completedPaths: string[]; // path IDs
  completedModules: string[]; // module IDs
  currentStreak: number;
  longestStreak: number;
  lastLoginDate: string;
  joinDate: string;
}

export interface PolicyIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  author: {
    name: string;
    level: UserLevel;
    badges: string[];
  };
  votes: number;
  commentCount: number;
  status: 'submitted' | 'under-review' | 'popular' | 'presented' | 'implemented';
  submittedDate: string;
  impactStatement: string;
  targetAudience: string[];
}

// XP Thresholds for each level
export const LEVEL_THRESHOLDS: Record<UserLevel, number> = {
  1: 0,
  2: 500,
  3: 1500,
  4: 3500,
  5: 7000,
  6: 12000,
  7: 20000,
};

export const LEVEL_NAMES: Record<UserLevel, string> = {
  1: 'Citizen',
  2: 'Learner',
  3: 'Contributor',
  4: 'Activist',
  5: 'Advocate',
  6: 'Leader',
  7: 'Champion',
};

// XP rewards for different activities
export const XP_REWARDS = {
  DAILY_LOGIN: 10,
  QUIZ_COMPLETION: 50,
  MODULE_COMPLETION: 80,
  PATH_COMPLETION: 500,
  POLICY_SUBMISSION: 200,
  POLICY_VOTE: 5,
  COMMENT: 10,
  BADGE_SHARE: 25,
};

// Badge color by rarity
export const BADGE_COLORS: Record<BadgeRarity, string> = {
  common: '#CD7F32',
  rare: '#C0C0C0',
  epic: '#FFD700',
  legendary: '#B9F2FF',
};

// Learning Paths
export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'budget-basics',
    title: 'Budget Basics',
    description: 'Master government budgeting from taxation to expenditure tracking',
    category: 'Finance',
    difficulty: 'beginner',
    estimatedTime: '45 min',
    icon: '📊',
    color: 'bg-blue-500',
    totalXP: 500,
    modules: [
      {
        id: 'bb-1',
        title: 'Where Does the Money Come From?',
        description: 'Understanding taxation and government revenue sources',
        contentType: 'video',
        duration: '8',
        xpReward: 80,
      },
      {
        id: 'bb-2',
        title: 'How Budgets Are Made',
        description: 'The annual budget cycle and approval process',
        contentType: 'reading',
        duration: '10',
        xpReward: 80,
      },
      {
        id: 'bb-3',
        title: 'Following the Money',
        description: 'Tracking government expenditure and accountability',
        contentType: 'video',
        duration: '12',
        xpReward: 80,
      },
      {
        id: 'bb-4',
        title: 'Reading Budget Documents',
        description: 'How to interpret budget reports and statements',
        contentType: 'reading',
        duration: '10',
        xpReward: 80,
      },
      {
        id: 'bb-5',
        title: 'Your Right to Participate',
        description: 'Public participation in the budget process',
        contentType: 'quiz',
        duration: '5',
        xpReward: 100,
      },
    ],
    badge: {
      id: 'badge-budget-master',
      name: 'Budget Master',
      description: 'Completed Budget Basics learning path',
      icon: '💰',
      rarity: 'rare',
      xpReward: 100,
      requirements: ['Complete all Budget Basics modules'],
      category: 'learning',
    },
  },
  {
    id: 'election-ready',
    title: 'Election Ready',
    description: 'Everything you need to know about Kenyan elections',
    category: 'Democracy',
    difficulty: 'beginner',
    estimatedTime: '35 min',
    icon: '🗳️',
    color: 'bg-green-500',
    totalXP: 400,
    modules: [
      {
        id: 'er-1',
        title: 'Voter Registration',
        description: 'How, when, and where to register as a voter',
        contentType: 'video',
        duration: '8',
        xpReward: 80,
      },
      {
        id: 'er-2',
        title: 'How Elections Work',
        description: 'Electoral system, IEBC role, and election day process',
        contentType: 'reading',
        duration: '12',
        xpReward: 80,
      },
      {
        id: 'er-3',
        title: 'Your Vote Matters',
        description: 'Vote counting, results transmission, and verification',
        contentType: 'video',
        duration: '10',
        xpReward: 80,
      },
      {
        id: 'er-4',
        title: 'Beyond Voting',
        description: 'Election monitoring, reporting irregularities',
        contentType: 'quiz',
        duration: '5',
        xpReward: 100,
      },
    ],
    badge: {
      id: 'badge-democracy-champion',
      name: 'Democracy Champion',
      description: 'Completed Election Ready learning path',
      icon: '🗳️',
      rarity: 'rare',
      xpReward: 100,
      requirements: ['Complete all Election Ready modules'],
      category: 'learning',
    },
  },
  {
    id: 'constitution-champion',
    title: 'Constitution Champion',
    description: 'Deep dive into Kenya\'s Constitution and your rights',
    category: 'Law',
    difficulty: 'intermediate',
    estimatedTime: '60 min',
    icon: '⚖️',
    color: 'bg-purple-500',
    totalXP: 600,
    modules: [
      {
        id: 'cc-1',
        title: 'Bill of Rights Basics',
        description: 'Fundamental freedoms and constitutional rights',
        contentType: 'video',
        duration: '10',
        xpReward: 80,
      },
      {
        id: 'cc-2',
        title: 'Structure of Government',
        description: 'Three arms of government and separation of powers',
        contentType: 'reading',
        duration: '12',
        xpReward: 80,
      },
      {
        id: 'cc-3',
        title: 'Devolution Explained',
        description: 'National vs county government functions',
        contentType: 'video',
        duration: '10',
        xpReward: 80,
      },
      {
        id: 'cc-4',
        title: 'Public Participation',
        description: 'Your constitutional right to participate in governance',
        contentType: 'reading',
        duration: '8',
        xpReward: 80,
      },
      {
        id: 'cc-5',
        title: 'Constitutional Bodies',
        description: 'IEBC, EACC, Judiciary, and other independent bodies',
        contentType: 'video',
        duration: '12',
        xpReward: 80,
      },
      {
        id: 'cc-6',
        title: 'Amending the Constitution',
        description: 'Process, limits, and why it\'s difficult',
        contentType: 'quiz',
        duration: '8',
        xpReward: 120,
      },
    ],
    badge: {
      id: 'badge-constitution-expert',
      name: 'Constitution Expert',
      description: 'Completed Constitution Champion learning path',
      icon: '⚖️',
      rarity: 'epic',
      xpReward: 150,
      requirements: ['Complete all Constitution Champion modules'],
      category: 'learning',
    },
  },
  {
    id: 'parliament-pro',
    title: 'Parliament Pro',
    description: 'Master the legislative process and parliamentary oversight',
    category: 'Government',
    difficulty: 'intermediate',
    estimatedTime: '50 min',
    icon: '🏛️',
    color: 'bg-red-500',
    totalXP: 500,
    modules: [
      {
        id: 'pp-1',
        title: 'MP vs Senator vs MCA',
        description: 'Understanding role differences and responsibilities',
        contentType: 'video',
        duration: '10',
        xpReward: 80,
      },
      {
        id: 'pp-2',
        title: 'How Laws Are Made',
        description: 'The legislative process from bill to law',
        contentType: 'reading',
        duration: '12',
        xpReward: 80,
      },
      {
        id: 'pp-3',
        title: 'Committee Work',
        description: 'Where the real work of parliament happens',
        contentType: 'video',
        duration: '10',
        xpReward: 80,
      },
      {
        id: 'pp-4',
        title: 'Oversight Functions',
        description: 'How parliament holds government accountable',
        contentType: 'reading',
        duration: '10',
        xpReward: 80,
      },
      {
        id: 'pp-5',
        title: 'Your MP\'s Performance',
        description: 'How to track and evaluate your representative',
        contentType: 'quiz',
        duration: '8',
        xpReward: 100,
      },
    ],
    badge: {
      id: 'badge-legislative-guru',
      name: 'Legislative Guru',
      description: 'Completed Parliament Pro learning path',
      icon: '🏛️',
      rarity: 'epic',
      xpReward: 150,
      requirements: ['Complete all Parliament Pro modules'],
      category: 'learning',
    },
  },
  {
    id: 'devolution-deep-dive',
    title: 'Devolution Deep Dive',
    description: 'Understanding county governments and local participation',
    category: 'Governance',
    difficulty: 'beginner',
    estimatedTime: '40 min',
    icon: '🌍',
    color: 'bg-cyan-500',
    totalXP: 400,
    modules: [
      {
        id: 'dd-1',
        title: 'Why Devolution?',
        description: 'History and purpose of devolved government',
        contentType: 'video',
        duration: '10',
        xpReward: 80,
      },
      {
        id: 'dd-2',
        title: 'County Government Structure',
        description: 'Governor, county assembly, and executive',
        contentType: 'reading',
        duration: '10',
        xpReward: 80,
      },
      {
        id: 'dd-3',
        title: 'County vs National Functions',
        description: 'Who does what: division of responsibilities',
        contentType: 'video',
        duration: '12',
        xpReward: 80,
      },
      {
        id: 'dd-4',
        title: 'Participating in County Affairs',
        description: 'Town halls, petitions, and public participation',
        contentType: 'quiz',
        duration: '8',
        xpReward: 100,
      },
    ],
    badge: {
      id: 'badge-devolution-expert',
      name: 'Devolution Expert',
      description: 'Completed Devolution Deep Dive learning path',
      icon: '🌍',
      rarity: 'rare',
      xpReward: 100,
      requirements: ['Complete all Devolution Deep Dive modules'],
      category: 'learning',
    },
  },
  {
    id: 'path-public-participation',
    title: 'Public Participation 101',
    description: 'A step-by-step video guide on how to attend forums and make your voice heard.',
    category: 'Practical Skills',
    difficulty: 'beginner',
    estimatedTime: '30 min',
    icon: '🗣️',
    color: 'bg-orange-500',
    totalXP: 300,
    modules: [
      {
        id: 'ppp-1',
        title: 'Finding the Forum',
        description: 'How to track down public participation schedules in your county',
        contentType: 'video',
        duration: '5',
        xpReward: 50,
      },
      {
        id: 'ppp-2',
        title: 'Preparing Your Contribution',
        description: 'Drafting clear, concise points to raise',
        contentType: 'reading',
        duration: '10',
        xpReward: 50,
      },
      {
        id: 'ppp-3',
        title: 'How to Speak Up',
        description: 'Protocol and tips for speaking at a public baraza',
        contentType: 'video',
        duration: '15',
        xpReward: 100,
      },
    ],
    badge: {
      id: 'badge-voice-of-reason',
      name: 'Voice of Reason',
      description: 'Completed Public Participation guide',
      icon: '📢',
      rarity: 'common',
      xpReward: 100,
      requirements: ['Complete all Public Participation modules'],
      category: 'engagement',
    },
  },
  {
    id: 'path-engaging-leaders',
    title: 'Engaging Your Leaders',
    description: 'How to effectively raise issues with MCAs, MPs, and Senators.',
    category: 'Practical Skills',
    difficulty: 'beginner',
    estimatedTime: '40 min',
    icon: '🤝',
    color: 'bg-indigo-500',
    totalXP: 400,
    modules: [
      {
        id: 'pel-1',
        title: 'Who Handles What?',
        description: 'Knowing whether to call your MCA, MP, or Governor',
        contentType: 'quiz',
        duration: '10',
        xpReward: 80,
      },
      {
        id: 'pel-2',
        title: 'Drafting a Petition',
        description: 'How to write a formal petition or letter',
        contentType: 'reading',
        duration: '15',
        xpReward: 100,
      },
      {
        id: 'pel-3',
        title: 'The Right Way to Contact',
        description: 'Official channels vs social media: what works best?',
        contentType: 'video',
        duration: '15',
        xpReward: 100,
      },
    ],
    badge: {
      id: 'badge-citizen-action',
      name: 'Citizen Action',
      description: 'Learned how to engage leaders effectively',
      icon: '✍️',
      rarity: 'common',
      xpReward: 120,
      requirements: ['Complete Engaging Leaders path'],
      category: 'engagement',
    },
  },
  {
    id: 'path-budget-realities',
    title: 'Budgets & Daily Life',
    description: 'Understanding how county budgets affect farming, markets, and services.',
    category: 'Practical Skills',
    difficulty: 'intermediate',
    estimatedTime: '45 min',
    icon: '🛒',
    color: 'bg-teal-500',
    totalXP: 450,
    modules: [
      {
        id: 'pbr-1',
        title: 'Market Fees Explained',
        description: 'Where do your market stall fees actually go?',
        contentType: 'video',
        duration: '10',
        xpReward: 80,
      },
      {
        id: 'pbr-2',
        title: 'Fertilizer & Farming Subsidies',
        description: 'How to access county agricultural support',
        contentType: 'reading',
        duration: '15',
        xpReward: 100,
      },
      {
        id: 'pbr-3',
        title: 'Garbage & Local Services',
        description: 'Tracking service delivery funds in your ward',
        contentType: 'video',
        duration: '20',
        xpReward: 120,
      },
    ],
    badge: {
      id: 'badge-budget-hawk',
      name: 'Budget Hawk',
      description: 'Understood local budget impacts',
      icon: '🦅',
      rarity: 'rare',
      xpReward: 150,
      requirements: ['Complete Budget Realities path'],
      category: 'learning',
    },
  },
  {
    id: 'path-first-vote',
    title: 'Your First Vote',
    description: 'A friendly, step-by-step journey for first-time voters. No prior knowledge needed!',
    category: 'Foundations',
    difficulty: 'beginner',
    estimatedTime: '30 min',
    icon: '🗳️',
    color: 'bg-pink-500',
    totalXP: 350,
    modules: [
      {
        id: 'pfv-1',
        title: 'Democracy 101: Why We Vote',
        description: 'Understanding the power of your vote in shaping Kenya\'s future.',
        contentType: 'video',
        duration: '5',
        xpReward: 50,
      },
      {
        id: 'pfv-2',
        title: 'Meet the Referee: The IEBC',
        description: 'Who runs the elections and how they ensure fairness.',
        contentType: 'reading',
        duration: '8',
        xpReward: 50,
      },
      {
        id: 'pfv-3',
        title: 'Before You Vote: The Checklist',
        description: 'Registration, verification, and what to bring on the day.',
        contentType: 'reading',
        duration: '7',
        xpReward: 50,
      },
      {
        id: 'pfv-4',
        title: 'Election Day Walkthrough',
        description: 'From the queue to the ballot box: a complete video guide.',
        contentType: 'video',
        duration: '10',
        xpReward: 100,
      },
      {
        id: 'pfv-6',
        title: 'Practice Vote: Ballot Simulator',
        description: 'Try our interactive mock ballot to avoid spoilt votes!',
        contentType: 'quiz',
        duration: '10',
        xpReward: 120,
      },
      {
        id: 'pfv-7',
        title: 'Common Mistakes & How to Avoid Them',
        description: 'What makes a vote "spoilt" and how to ensure yours counts.',
        contentType: 'reading',
        duration: '8',
        xpReward: 80,
      },
      {
        id: 'pfv-5',
        title: 'After the Vote',
        description: 'Counting, tallying, and accepting the results.',
        contentType: 'quiz',
        duration: '5',
        xpReward: 100,
      },
    ],
    badge: {
      id: 'badge-first-voter',
      name: 'Future Voter',
      description: 'Ready to cast your first vote with confidence!',
      icon: '✨',
      rarity: 'common',
      xpReward: 100,
      requirements: ['Complete Your First Vote path'],
      category: 'learning',
    },
  },
  {
    id: 'path-know-your-leaders',
    title: 'Know Your Leaders',
    description: 'A simple breakdown of every elective office in Kenya. Who does what?',
    category: 'Foundations',
    difficulty: 'beginner',
    estimatedTime: '35 min',
    icon: '👔',
    color: 'bg-cyan-600',
    totalXP: 350,
    modules: [
      {
        id: 'kyl-1',
        title: 'The President',
        description: 'Head of State and Government. Commander-in-Chief.',
        contentType: 'reading',
        duration: '5',
        xpReward: 50,
      },
      {
        id: 'kyl-2',
        title: 'The Governor',
        description: 'The CEO of your County. Manages local resources and services.',
        contentType: 'video',
        duration: '8',
        xpReward: 60,
      },
      {
        id: 'kyl-3',
        title: 'The Senator',
        description: 'Protector of County Interests. Oversights national revenue to counties.',
        contentType: 'reading',
        duration: '5',
        xpReward: 50,
      },
      {
        id: 'kyl-4',
        title: 'Member of Parliament (MP)',
        description: 'Represents your Constituency. Makes laws and manages NG-CDF.',
        contentType: 'video',
        duration: '7',
        xpReward: 60,
      },
      {
        id: 'kyl-5',
        title: 'Woman Representative',
        description: 'Promotes interests of women and marginalized groups in the county.',
        contentType: 'reading',
        duration: '5',
        xpReward: 50,
      },
      {
        id: 'kyl-6',
        title: 'Member of County Assembly (MCA)',
        description: 'Your Ward Rep. Makes county laws and oversights the Governor.',
        contentType: 'quiz',
        duration: '5',
        xpReward: 80,
      },
    ],
    badge: {
      id: 'badge-civic-scholar',
      name: 'Civic Scholar',
      description: 'Mastered the roles of all elected officials',
      icon: '🎓',
      rarity: 'common',
      xpReward: 120,
      requirements: ['Complete Know Your Leaders path'],
      category: 'learning',
    },
  },
];

// Special Achievement Badges
export const ACHIEVEMENT_BADGES: Badge[] = [
  {
    id: 'badge-streak-master',
    name: 'Streak Master',
    description: 'Maintained a 30-day login streak',
    icon: '🔥',
    rarity: 'epic',
    xpReward: 300,
    requirements: ['Login for 30 consecutive days'],
    category: 'achievement',
  },
  {
    id: 'badge-perfect-score',
    name: 'Perfect Scholar',
    description: 'Achieved 100% on 10 quizzes',
    icon: '🎯',
    rarity: 'epic',
    xpReward: 250,
    requirements: ['Score 100% on 10 different quizzes'],
    category: 'achievement',
  },
  {
    id: 'badge-idea-champion',
    name: 'Idea Champion',
    description: 'Submitted 3 policy ideas with 100+ votes each',
    icon: '💡',
    rarity: 'legendary',
    xpReward: 500,
    requirements: ['3 policy ideas with 100+ votes'],
    category: 'engagement',
  },
  {
    id: 'badge-community-leader',
    name: 'Community Leader',
    description: 'Referred 10 friends to the platform',
    icon: '👥',
    rarity: 'rare',
    xpReward: 200,
    requirements: ['Refer 10 users who complete registration'],
    category: 'special',
  },
  {
    id: 'badge-knowledge-seeker',
    name: 'Knowledge Seeker',
    description: 'Completed all learning paths',
    icon: '📚',
    rarity: 'legendary',
    xpReward: 1000,
    requirements: ['Complete all 5 learning paths'],
    category: 'achievement',
  },
];

// Mock Policy Ideas
export const MOCK_POLICY_IDEAS: PolicyIdea[] = [
  {
    id: 'policy-1',
    title: 'Free WiFi in All Public Universities',
    description: 'Provide high-speed internet access to all public university students to support online learning and research. This would level the playing field for students from low-income backgrounds.',
    category: 'Education',
    author: {
      name: 'Sarah Kimani',
      level: 5,
      badges: ['badge-budget-master', 'badge-democracy-champion'],
    },
    votes: 342,
    commentCount: 28,
    status: 'popular',
    submittedDate: '2026-01-15',
    impactStatement: 'Would benefit over 500,000 university students across Kenya',
    targetAudience: ['Students', 'Educators', 'Researchers'],
  },
  {
    id: 'policy-2',
    title: 'Youth Employment Tax Incentive',
    description: 'Provide tax breaks to companies that hire recent graduates for their first job. Companies would get 50% tax reduction on salaries for youth employees in their first year.',
    category: 'Employment',
    author: {
      name: 'David Omondi',
      level: 4,
      badges: ['badge-constitution-expert'],
    },
    votes: 289,
    commentCount: 45,
    status: 'popular',
    submittedDate: '2026-01-18',
    impactStatement: 'Could create 100,000+ entry-level jobs for youth annually',
    targetAudience: ['Youth', 'Job Seekers', 'Employers'],
  },
  {
    id: 'policy-3',
    title: 'Mental Health Services in All Counties',
    description: 'Mandate that every county government must have at least one mental health facility with trained counselors. Include mental health in universal healthcare coverage.',
    category: 'Healthcare',
    author: {
      name: 'Grace Wanjiru',
      level: 6,
      badges: ['badge-knowledge-seeker', 'badge-legislative-guru'],
    },
    votes: 567,
    commentCount: 72,
    status: 'presented',
    submittedDate: '2026-01-10',
    impactStatement: 'Addresses mental health crisis affecting 25% of youth population',
    targetAudience: ['Youth', 'Healthcare Workers', 'Counties'],
  },
];

// Mock user progress (for demonstration)
export const MOCK_USER_PROGRESS: UserProgress = {
  userId: 'user-1',
  level: 3,
  currentXP: 2100,
  totalXP: 2100,
  nextLevelXP: 3500,
  badges: ['badge-budget-master', 'badge-democracy-champion'],
  completedPaths: ['budget-basics', 'election-ready'],
  completedModules: ['bb-1', 'bb-2', 'bb-3', 'bb-4', 'bb-5', 'er-1', 'er-2', 'er-3', 'er-4'],
  currentStreak: 7,
  longestStreak: 15,
  lastLoginDate: '2026-01-26',
  joinDate: '2025-12-01',
};

// Utility function to calculate level from XP
export function calculateLevel(totalXP: number): UserLevel {
  if (totalXP >= 20000) return 7;
  if (totalXP >= 12000) return 6;
  if (totalXP >= 7000) return 5;
  if (totalXP >= 3500) return 4;
  if (totalXP >= 1500) return 3;
  if (totalXP >= 500) return 2;
  return 1;
}

// Utility function to get XP for next level
export function getXPForNextLevel(currentLevel: UserLevel): number {
  if (currentLevel >= 7) return 0; // Max level
  const nextLevel = (currentLevel + 1) as UserLevel;
  return LEVEL_THRESHOLDS[nextLevel];
}
