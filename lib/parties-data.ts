

export interface PartyOfficial {
  name: string;
  id?: string; // Links to PoliticianProfile.id
}

export interface PartyLeadership {
  leader: PartyOfficial;
  secretaryGeneral: PartyOfficial;
  chairperson: PartyOfficial;
}

export interface PartyStats {
  founded: string;
  membersCount: string;
  electedGovernors: number;
  electedSenators: number;
  electedMPs: number;
  electedMCAs: number;
}

export interface PoliticalParty {
  id: string;
  name: string;
  abbreviation: string;
  symbol: string; // URL to symbol image or icon name
  color: string; // CSS class or hex
  slogan: string;
  ideology: string;
  description: string;
  leadership: PartyLeadership;
  stats: PartyStats;
  manifestoSummary: string[];
  constitutionParameters: {
      membershipFee: string;
      nominationFee: string;
      termLimit: string;
  };
}

export const PARTIES_DATA: PoliticalParty[] = [
  {
    id: 'uda',
    name: 'United Democratic Alliance',
    abbreviation: 'UDA',
    symbol: '/parties/uda-wheelbarrow.png', // Placeholder
    color: 'bg-yellow-400',
    slogan: 'Kazi ni Kazi',
    ideology: 'Bottom-up Economic Model',
    description: 'The ruling party focusing on economic empowerment of the ordinary citizen (Hustler Nation) through a bottom-up approach.',
    leadership: {
      leader: { name: 'H.E. William Ruto', id: 'pol-ruto' },
      secretaryGeneral: { name: 'Hassan Omar' },
      chairperson: { name: 'Cecily Mbarire' }
    },
    stats: {
      founded: '2020',
      membersCount: '8.5M',
      electedGovernors: 22,
      electedSenators: 32,
      electedMPs: 145,
      electedMCAs: 680
    },
    manifestoSummary: [
      'Bottom-up Economic Transformation Agenda (BETA)',
      'Affordable Housing & Universal Healthcare',
      'Digital Superhighway & Creative Economy'
    ],
    constitutionParameters: {
        membershipFee: 'KES 200',
        nominationFee: 'KES 50,000 (MCA) - 1M (Pres)',
        termLimit: '2 Terms (Party Officials)'
    }
  },
  {
    id: 'odm',
    name: 'Orange Democratic Movement',
    abbreviation: 'ODM',
    symbol: '/parties/odm-orange.png', 
    color: 'bg-orange-500',
    slogan: 'Mbele Pamoja',
    ideology: 'Social Democracy',
    description: 'A social democratic party that has been a major force in Kenyan politics, championing for devolution and social justice.',
    leadership: {
      leader: { name: 'Rt. Hon. Raila Odinga', id: 'pol-raila' },
      secretaryGeneral: { name: 'Edwin Sifuna', id: 'pol-2' },
      chairperson: { name: 'Gladys Wanga', id: 'pol-3' }
    },
    stats: {
      founded: '2005',
      membersCount: '7.2M',
      electedGovernors: 15,
      electedSenators: 18,
      electedMPs: 86,
      electedMCAs: 450
    },
    manifestoSummary: [
      'Social Protection (Inua Jamii)',
      'Baba Care (Universal Health Coverage)',
      'Manufacturing & Industrialization'
    ],
    constitutionParameters: {
        membershipFee: 'KES 100',
        nominationFee: 'KES 20,000 - 500,000',
        termLimit: '5 Years Renewable'
    }
  },
  {
    id: 'wiper',
    name: 'Wiper Democratic Movement',
    abbreviation: 'WIPER',
    symbol: '/parties/wiper-umbrella.png',
    color: 'bg-blue-400',
    slogan: 'One Kenya, One People',
    ideology: 'Social Conservatism',
    description: 'A major political party advocating for a united Kenya with a strong focus on integrity and peace.',
    leadership: {
      leader: { name: 'Kalonzo Musyoka', id: 'pol-kalonzo' },
      secretaryGeneral: { name: 'Shakila Abdalla' },
      chairperson: { name: 'Chirau Ali Mwakwere' }
    },
    stats: {
      founded: '2006',
      membersCount: '3.1M',
      electedGovernors: 3,
      electedSenators: 4,
      electedMPs: 25,
      electedMCAs: 180
    },
    manifestoSummary: [
      '24-hour Economy',
      'Free Secondary Education',
      'Fight Against Corruption'
    ],
    constitutionParameters: {
        membershipFee: 'KES 100',
        nominationFee: 'Standard IEBC Rates',
        termLimit: '5 Years'
    }
  },
    {
    id: 'jubilee',
    name: 'Jubilee Party',
    abbreviation: 'JUBILEE',
    symbol: '/parties/jubilee-dove.png',
    color: 'bg-red-600',
    slogan: 'Tuko Pamoja',
    ideology: 'National Unity',
    description: 'Formed to unite Kenyans and led the country from 2013 to 2022 emphasizing major infrastructure projects.',
    leadership: {
      leader: { name: 'Uhuru Kenyatta' },
      secretaryGeneral: { name: 'Jeremiah Kioni' },
      chairperson: { name: 'David Murathe' }
    },
    stats: {
      founded: '2016',
      membersCount: '4.5M',
      electedGovernors: 2,
      electedSenators: 3,
      electedMPs: 28,
      electedMCAs: 120
    },
    manifestoSummary: [
      'Big 4 Agenda Continuity',
      'Infrastructure Expansion',
      'National Unity & Cohesion'
    ],
    constitutionParameters: {
        membershipFee: 'KES 50',
        nominationFee: 'Varied',
        termLimit: '5 Years'
    }
  },
    {
    id: 'safina',
    name: 'Safina Party',
    abbreviation: 'SAFINA',
    symbol: '/parties/safina-ark.png',
    color: 'bg-green-700',
    slogan: 'Safina ni Haki',
    ideology: 'Liberalism',
    description: 'A historic party that fought for multi-party democracy in Kenya, continuing to advocate for justice and rule of law.',
    leadership: {
      leader: { name: 'Paul Muite' },
      secretaryGeneral: { name: 'John Wamagata' },
      chairperson: { name: 'Dr. David Makali' }
    },
    stats: {
      founded: '1995',
      membersCount: '1.2M',
      electedGovernors: 0,
      electedSenators: 0,
      electedMPs: 2,
      electedMCAs: 15
    },
    manifestoSummary: [
        'Rule of Law & Justice',
        'Economic Liberalization',
        'Human Rights Protection'
    ],
    constitutionParameters: {
        membershipFee: 'KES 50',
        nominationFee: 'Low Cost Entry',
        termLimit: 'Undefined'
    }
  }
];
