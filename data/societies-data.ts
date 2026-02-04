export interface SocietyGroup {
  id: string;
  name: string;
  category: 'Youth' | 'Women' | 'Disability' | 'Business' | 'Community' | 'Environmental';
  level: 'National' | 'County' | 'Constituency' | 'Ward';
  county?: string;
  constituency?: string;
  ward?: string;
  membersCount: number;
  description: string;
  contactEmail?: string;
  contactPhone?: string;
}

export const mockSocieties: SocietyGroup[] = [
  {
    id: '1',
    name: 'National Youth Council',
    category: 'Youth',
    level: 'National',
    membersCount: 150000,
    description: 'The official voice of the youth in Kenya, advocating for youth rights and opportunities.',
    contactEmail: 'info@nyc.go.ke'
  },
  {
    id: '2',
    name: 'Maendeleo Ya Wanawake',
    category: 'Women',
    level: 'National',
    membersCount: 400000,
    description: 'A non-profit voluntary women\'s organization working to improve the quality of life for women and communities.',
  },
  {
    id: '3',
    name: 'Nairobi Business Community',
    category: 'Business',
    level: 'County',
    county: 'Nairobi',
    membersCount: 5000,
    description: 'A network of business owners in Nairobi fostering economic growth and policy advocacy.',
  },
  {
    id: '4',
    name: 'Westlands Youth Alliance',
    category: 'Youth',
    level: 'Constituency',
    county: 'Nairobi',
    constituency: 'Westlands',
    membersCount: 1200,
    description: 'Empowering young people in Westlands through skills training and civic engagement.',
  },
  {
    id: '5',
    name: 'Kibra Women for Peace',
    category: 'Women',
    level: 'Constituency',
    county: 'Nairobi',
    constituency: 'Kibra',
    membersCount: 850,
    description: 'Women organizing for peace and conflict resolution in Kibra.',
  },
  {
    id: '6',
    name: 'Persons with Disabilities Action Network',
    category: 'Disability',
    level: 'National',
    membersCount: 25000,
    description: 'Advocating for the rights, inclusion, and welfare of PWDs across Kenya.',
  },
  {
    id: '7',
    name: 'Greening Kenya Initiative',
    category: 'Environmental',
    level: 'National',
    membersCount: 12000,
    description: 'Tree planting and environmental conservation efforts nationwide.',
  },
  {
    id: '8',
    name: 'Turkana Pastoralist Community',
    category: 'Community',
    level: 'County',
    county: 'Turkana',
    membersCount: 3000,
    description: 'Supporting pastoralist livelihoods and cultural heritage in Turkana County.',
  },
  {
    id: '9',
    name: 'Parklands Residents Association',
    category: 'Community',
    level: 'Ward',
    county: 'Nairobi',
    constituency: 'Westlands',
    ward: 'Parklands',
    membersCount: 450,
    description: 'Residents working together for better services and neighborhood safety.',
  },
  {
    id: '10',
    name: 'Mombasa Tech Hub',
    category: 'Business',
    level: 'County',
    county: 'Mombasa',
    membersCount: 600,
    description: 'A community of tech innovators and startups in the coastal region.',
  }
];
