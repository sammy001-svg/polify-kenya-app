export interface Petition {
  id: string;
  title: string;
  target: string;
  signatures: number;
  goal: number;
  description: string;
  imageUrl: string;
  daysLeft: number;
}

export interface CivicEvent {
  id: string;
  title: string;
  type: 'Town Hall' | 'Protest' | 'Cleanup' | 'Workshop';
  date: string;
  time: string;
  location: string;
  attendees: number;
}

export const MOCK_PETITIONS: Petition[] = [
  {
    id: 'pet-1',
    title: 'Repair Outer Ring Road Streetlights',
    target: 'Nairobi City County',
    signatures: 4520,
    goal: 5000,
    description: 'The lack of lighting on Outer Ring Road has led to increased insecurity. We demand immediate repair of all 45 streetlights.',
    imageUrl: 'https://images.unsplash.com/photo-1542316410-b3bd302f3a46?q=80&w=1000&auto=format&fit=crop',
    daysLeft: 12
  },
  {
    id: 'pet-2',
    title: 'Stop Demolitions in Mukuru Kwa Njenga',
    target: 'Ministry of Lands',
    signatures: 12500,
    goal: 50000,
    description: 'Halt the evictions until proper resettlement plans are made for the 10,000 affected families.',
    imageUrl: 'https://images.unsplash.com/photo-1542316410-b3bd302f3a46?q=80&w=1000&auto=format&fit=crop',
    daysLeft: 25
  },
  {
    id: 'pet-3',
    title: 'Audit the Ward Development Fund',
    target: 'Auditor General',
    signatures: 890,
    goal: 1000,
    description: 'We suspect misappropriation of funds in the recent drainage project. We call for a full forensic audit.',
    imageUrl: 'https://images.unsplash.com/photo-1542316410-b3bd302f3a46?q=80&w=1000&auto=format&fit=crop',
    daysLeft: 5
  }
];

export const MOCK_EVENTS: CivicEvent[] = [
  {
    id: 'evt-1',
    title: 'Budget Participation Forum',
    type: 'Town Hall',
    date: 'Feb 15, 2026',
    time: '10:00 AM',
    location: 'Charter Hall, Nairobi',
    attendees: 120
  },
  {
    id: 'evt-2',
    title: 'Clean Up Nairobi River',
    type: 'Cleanup',
    date: 'Feb 20, 2026',
    time: '08:00 AM',
    location: 'Michuki Park',
    attendees: 450
  },
  {
    id: 'evt-3',
    title: 'Know Your Rights Workshop',
    type: 'Workshop',
    date: 'Feb 25, 2026',
    time: '02:00 PM',
    location: 'Ufungamano House',
    attendees: 85
  }
];
