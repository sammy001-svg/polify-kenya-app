export type TeamRole = 'Candidate' | 'Content Manager' | 'Policy Advisor' | 'Comms Officer';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  status: 'active' | 'pending';
  joinedDate: string;
  permissions: string[];
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  role: TeamRole;
  action: string;
  details: string;
  timestamp: string;
}

export const ROLE_PERMISSIONS: Record<TeamRole, string[]> = {
  'Candidate': ['all'],
  'Content Manager': ['create_post', 'edit_post', 'delete_post', 'view_analytics'],
  'Policy Advisor': ['draft_manifesto', 'edit_policy', 'view_analytics'],
  'Comms Officer': ['view_analytics', 'view_engagement', 'export_reports'],
};

export const MOCK_TEAM: TeamMember[] = [
  {
    id: 'u1',
    name: 'Hon. Candidate',
    email: 'candidate@campaign.ke',
    role: 'Candidate',
    status: 'active',
    joinedDate: '2026-01-01',
    permissions: ROLE_PERMISSIONS['Candidate'],
  },
  {
    id: 'u2',
    name: 'Sarah Mwangi',
    email: 'sarah@campaign.ke',
    role: 'Content Manager',
    status: 'active',
    joinedDate: '2026-01-05',
    permissions: ROLE_PERMISSIONS['Content Manager'],
  },
  {
    id: 'u3',
    name: 'Dr. John Ochieng',
    email: 'john@campaign.ke',
    role: 'Policy Advisor',
    status: 'active',
    joinedDate: '2026-01-10',
    permissions: ROLE_PERMISSIONS['Policy Advisor'],
  },
  {
    id: 'u4',
    name: 'Brian Kipkorir',
    email: 'brian@campaign.ke',
    role: 'Comms Officer',
    status: 'pending',
    joinedDate: '2026-01-25',
    permissions: ROLE_PERMISSIONS['Comms Officer'],
  },
];

export const MOCK_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'l1',
    userId: 'u2',
    userName: 'Sarah Mwangi',
    role: 'Content Manager',
    action: 'Created Post',
    details: 'Drafted "Youth Empowerment" update for Facebook',
    timestamp: '2026-01-26T09:30:00',
  },
  {
    id: 'l2',
    userId: 'u3',
    userName: 'Dr. John Ochieng',
    role: 'Policy Advisor',
    action: 'Edited Manifesto',
    details: 'Updated "Health Sector" chapter with new statistics',
    timestamp: '2026-01-26T10:15:00',
  },
  {
    id: 'l3',
    userId: 'u2',
    userName: 'Sarah Mwangi',
    role: 'Content Manager',
    action: 'Published Video',
    details: 'Uploaded "Rally Highlights" to YouTube',
    timestamp: '2026-01-26T11:45:00',
  },
  {
    id: 'l4',
    userId: 'u4',
    userName: 'Brian Kipkorir',
    role: 'Comms Officer',
    action: 'Exported Report',
    details: 'Downloaded weekly engagement analytics summary',
    timestamp: '2026-01-26T14:20:00',
  },
];
