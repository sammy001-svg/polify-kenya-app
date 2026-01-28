export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  type: 'milestone' | 'event' | 'deadline';
}

export interface CampaignProfile {
  id: string;
  candidateName: string;
  office: string;
  jurisdiction: string; // e.g., "Westlands Constituency" or "Nairobi County"
  party: string;
  partyLogo?: string; // URL or emoji for now
  bio: string;
  photoUrl: string;
  slogan: string;
  timeline: TimelineEvent[];
  stats: {
    supporters: number;
    volunteers: number;
    eventsHeld: number;
  };
}

export const MOCK_CAMPAIGN_PROFILE: CampaignProfile = {
  id: 'cp-1',
  candidateName: 'Hon. Candidate',
  office: 'Member of Parliament (MP)',
  jurisdiction: 'Westlands Constituency',
  party: 'Vision Party',
  partyLogo: '🦁',
  photoUrl: '/placeholder-avatar.jpg',
  slogan: 'A New Vision for Westlands',
  bio: 'A dedicated community leader with over 10 years of experience in civic advocacy and youth empowerment. Former chairman of the Westlands Youth Alliance and board member of the Local Traders Association. Committed to transparent leadership, improved education infrastructure, and economic opportunities for all.',
  stats: {
    supporters: 1250,
    volunteers: 45,
    eventsHeld: 12,
  },
  timeline: [
    {
      id: 't1',
      title: 'Campaign Team Assembly',
      date: '2026-01-05',
      description: 'Recruited key team members: Campaign Manager, Comms Officer, and Mobilizers.',
      status: 'completed',
      type: 'milestone',
    },
    {
      id: 't2',
      title: 'IEBC Clearance',
      date: '2026-02-15',
      description: 'Submit nomination papers and receive clearance certificate.',
      status: 'current',
      type: 'deadline',
    },
    {
      id: 't3',
      title: 'Manifesto Launch',
      date: '2026-03-01',
      description: 'Official public release of "The Westlands Plan" focusing on Education and Trade.',
      status: 'upcoming',
      type: 'event',
    },
    {
      id: 't4',
      title: 'Town Hall Series',
      date: '2026-03-10',
      description: 'Community barazas in Kangemi, Parklands, and Mountain View.',
      status: 'upcoming',
      type: 'event',
    },
    {
      id: 't5',
      title: 'Election Day',
      date: '2027-08-08',
      description: 'Mobilize voters and protect the vote.',
      status: 'upcoming',
      type: 'milestone',
    },
  ],
};
