
export type EventType = 'Rally' | 'TownHall' | 'Fundraiser' | 'MeetUp' | 'DoorToDoor';
export type EventStatus = 'Upcoming' | 'Completed' | 'Cancelled';

export interface CampaignEvent {
  id: string;
  title: string;
  type: EventType;
  location: string;
  date: string;
  time: string;
  status: EventStatus;
  description: string;
  rsvpCount: number;
  volunteersNeeded: number;
  volunteersRegistered: number;
}

export const MOCK_EVENTS: CampaignEvent[] = [
  {
    id: 'e1',
    title: 'Westlands Youth Rally',
    type: 'Rally',
    location: 'Kangemi Market Grounds',
    date: '2026-02-10',
    time: '14:00',
    status: 'Upcoming',
    description: 'Major youth engagement rally focusing on employment and digital skills.',
    rsvpCount: 450,
    volunteersNeeded: 50,
    volunteersRegistered: 35
  },
  {
    id: 'e2',
    title: 'Parklands Town Hall',
    type: 'TownHall',
    location: 'Parklands Sports Club',
    date: '2026-02-15',
    time: '18:00',
    status: 'Upcoming',
    description: 'Community dialogue on security and business licensing.',
    rsvpCount: 120,
    volunteersNeeded: 10,
    volunteersRegistered: 8
  },
  {
    id: 'e3',
    title: 'Business Leaders Dinner',
    type: 'Fundraiser',
    location: 'Sarit Centre',
    date: '2026-02-20',
    time: '19:00',
    status: 'Upcoming',
    description: 'Fundraising dinner with local business community.',
    rsvpCount: 45,
    volunteersNeeded: 5,
    volunteersRegistered: 5
  }
];
