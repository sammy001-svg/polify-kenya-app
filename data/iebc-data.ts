export interface VoterStats {
  category: 'National' | 'County' | 'Constituency' | 'Ward';
  name: string;
  count: number;
}

export interface RegistrationCentre {
  id: string;
  name: string;
  ward: string;
  constituency: string;
  county: string;
  status: 'Open' | 'Closed';
  openingHours: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: 'Press Release' | 'Update' | 'Event';
  link: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  deadline: string;
  link: string;
}

export const mockVoterStats: VoterStats[] = [
  { category: 'National', name: 'Kenya', count: 22120458 },
  { category: 'County', name: 'Nairobi City', count: 2415310 },
  { category: 'Constituency', name: 'Westlands', count: 160739 },
  { category: 'Ward', name: 'Kitisuru', count: 32450 },
  { category: 'Ward', name: 'Parklands', count: 28900 },
];

export const mockRegistrationCentres: RegistrationCentre[] = [
  { id: '1', name: 'Westlands Primary School', ward: 'Parklands/Highridge', constituency: 'Westlands', county: 'Nairobi', status: 'Open', openingHours: '8:00 AM - 5:00 PM' },
  { id: '2', name: 'Kangemi Social Hall', ward: 'Kangemi', constituency: 'Westlands', county: 'Nairobi', status: 'Open', openingHours: '8:00 AM - 5:00 PM' },
  { id: '3', name: 'Muguga Green Primary', ward: 'Kitisuru', constituency: 'Westlands', county: 'Nairobi', status: 'Closed', openingHours: '8:00 AM - 5:00 PM' },
  { id: '4', name: 'Lavington Primary School', ward: 'Kileleshwa', constituency: 'Dagoretti North', county: 'Nairobi', status: 'Open', openingHours: '8:00 AM - 5:00 PM' },
  { id: '5', name: 'Olympic Primary School', ward: 'Kibra', constituency: 'Kibra', county: 'Nairobi', status: 'Open', openingHours: '8:00 AM - 5:00 PM' },
];

export const mockNews: NewsItem[] = [
  { id: '1', title: 'Voter Registration Week Launch', summary: 'IEBC announces the start of the nationwide voter registration drive.', date: '2026-02-01', category: 'Event', link: '#' },
  { id: '2', title: 'By-Election Results for Ugunja', summary: 'Check out the official results for the Ugunja constituency by-election.', date: '2026-01-28', category: 'Press Release', link: '#' },
  { id: '3', title: 'New Diaspora Polling Stations', summary: '5 new polling stations opened in the UK and USA for diaspora voters.', date: '2026-01-20', category: 'Update', link: '#' },
];

export const mockJobs: Job[] = [
  { id: '1', title: 'ICT Officer', department: 'Information Technology', location: 'Nairobi HQ', deadline: '2026-02-28', link: '#' },
  { id: '2', title: 'Constituency Election Coordinator', department: 'Operations', location: 'Turkana Central', deadline: '2026-03-15', link: '#' },
  { id: '3', title: 'Voter Education Assistant', department: 'Voter Education', location: 'Mombasa', deadline: '2026-02-25', link: '#' },
];
