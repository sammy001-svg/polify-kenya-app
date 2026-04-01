
export interface ElectedOfficial {
  name: string;
  county: string;
  role: 'Governor' | 'Senator' | 'MP' | 'Women Rep' | 'MCA';
}

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
  electedWomenReps: number;
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
  electedOfficials: ElectedOfficial[];
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
      electedGovernors: 21,
      electedSenators: 20,
      electedMPs: 133,
      electedWomenReps: 25,
      electedMCAs: 650
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
    },
    electedOfficials: [
      { name: 'Fatuma Achani', county: 'Kwale', role: 'Governor' },
      { name: 'Muthomi Njuki', county: 'Tharaka Nithi', role: 'Governor' },
      { name: 'Cecily Mbarire', county: 'Embu', role: 'Governor' },
      { name: 'Moses Kiarie Badilisha', county: 'Nyandarua', role: 'Governor' },
      { name: 'Mutahi Kahiga', county: 'Nyeri', role: 'Governor' },
      { name: 'Anne Waiguru', county: 'Kirinyaga', role: 'Governor' },
      { name: 'Irungu Kang’ata', county: 'Murang’a', role: 'Governor' },
      { name: 'Kimani Wamatangi', county: 'Kiambu', role: 'Governor' },
      { name: 'Simon Kachapin', county: 'West Pokot', role: 'Governor' },
      { name: 'Jonathan Lelelit', county: 'Samburu', role: 'Governor' },
      { name: 'Jonathan Bii Chelilim', county: 'Uasin Gishu', role: 'Governor' },
      { name: 'Wisley Rotich', county: 'Elgeyo Marakwet', role: 'Governor' },
      { name: 'Stephen Sang', county: 'Nandi', role: 'Governor' },
      { name: 'Benjamin Cheboi', county: 'Baringo', role: 'Governor' },
      { name: 'Joshua Irungu', county: 'Laikipia', role: 'Governor' },
      { name: 'Susan Kihika', county: 'Nakuru', role: 'Governor' },
      { name: 'Patrick Ole Ntutu', county: 'Narok', role: 'Governor' },
      { name: 'Eric Mutai', county: 'Kericho', role: 'Governor' },
      { name: 'Hillary Barchok', county: 'Bomet', role: 'Governor' },
      { name: 'Amos Nyaribo', county: 'Nyamira', role: 'Governor' },
      { name: 'Johnson Sakaja', county: 'Nairobi', role: 'Governor' }
    ]
  },
  {
      id: 'dcp',
      name: 'Democracy for the Citizens Party',
      abbreviation: 'DCP',
      symbol: '/parties/dcp-logo.png',
      color: 'bg-[#39FF14]', // Neon Green
      slogan: 'Skiza Wakenya',
      ideology: 'Bottom-up Empowerment / Grassroots',
      description: 'A movement for the "Betrayed", targeting Kenyans who feel overtaxed and unheard. Focused on 2027 General Elections.',
      leadership: { 
        leader: { name: 'Rigathi Gachagua' }, 
        secretaryGeneral: { name: 'Hezron Obatha' }, 
        chairperson: { name: 'Cleophas Malala' } // Assuming Deputy/Chair role for schema
      },
      stats: { founded: '2024', membersCount: '1.2M', electedGovernors: 0, electedSenators: 0, electedMPs: 2, electedWomenReps: 0, electedMCAs: 15 },
      manifestoSummary: [
          'Skiza Wakenya: Listening to ordinary citizens',
          'Tuko Kadi: Intensive voter registration',
          'Opposition to overtaxation and night demolitions'
      ],
      constitutionParameters: { 
          membershipFee: 'KES 50', 
          nominationFee: 'Standard', 
          termLimit: '5 Years' 
      },
      electedOfficials: []
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
        membersCount: '6.2M',
        electedGovernors: 16,
        electedSenators: 15,
        electedMPs: 97,
        electedWomenReps: 15,
        electedMCAs: 350
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
    },
    electedOfficials: [
      { name: 'Abdulswamad Nassir', county: 'Mombasa', role: 'Governor' },
      { name: 'Gideon Mung’aro', county: 'Kilifi', role: 'Governor' },
      { name: 'Dhadho Godhana', county: 'Tana River', role: 'Governor' },
      { name: 'Nathif Jama', county: 'Garissa', role: 'Governor' },
      { name: 'Ahmed Abdullahi', county: 'Wajir', role: 'Governor' },
      { name: 'Mohamud Ali', county: 'Marsabit', role: 'Governor' },
      { name: 'Jeremiah Lomorukai', county: 'Turkana', role: 'Governor' },
      { name: 'Joseph Ole Lenku', county: 'Kajiado', role: 'Governor' },
      { name: 'Fernandes Barasa', county: 'Kakamega', role: 'Governor' },
      { name: 'Wilber Ottichilo', county: 'Vihiga', role: 'Governor' },
      { name: 'Paul Otuoma', county: 'Busia', role: 'Governor' },
      { name: 'James Orengo', county: 'Siaya', role: 'Governor' },
      { name: 'Anyang’ Nyong’o', county: 'Kisumu', role: 'Governor' },
      { name: 'Gladys Wanga', county: 'Homa Bay', role: 'Governor' },
      { name: 'Ochilo Ayacko', county: 'Migori', role: 'Governor' },
      { name: 'Simba Arati', county: 'Kisii', role: 'Governor' }
    ]
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
      electedSenators: 3,
      electedMPs: 23,
      electedWomenReps: 2,
      electedMCAs: 100
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
    },
    electedOfficials: [
      { name: 'Mutula Kilonzo Jnr', county: 'Makueni', role: 'Governor' },
      { name: 'Wavinya Ndeti', county: 'Machakos', role: 'Governor' },
      { name: 'Julius Malombe', county: 'Kitui', role: 'Governor' }
    ]
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
        membersCount: '2.8M',
        electedGovernors: 1,
        electedSenators: 5,
        electedMPs: 35,
        electedWomenReps: 4,
        electedMCAs: 150
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
    },
    electedOfficials: [
      { name: 'Abdi Guyo', county: 'Isiolo', role: 'Governor' }
    ]
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
      electedMPs: 1,
      electedWomenReps: 0,
      electedMCAs: 5
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
    },
    electedOfficials: []
  },
  {
    id: 'agano',
    name: 'Agano Party',
    abbreviation: 'AGANO',
    symbol: '/parties/agano-lamp.png',
    color: 'bg-blue-900',
    slogan: 'Badilisha Kenya',
    ideology: 'Christian Democracy',
    description: 'A party focused on integrity, religious values and anti-corruption.',
    leadership: {
      leader: { name: 'David Mwaure' },
      secretaryGeneral: { name: 'Waihenya Ndirangu' },
      chairperson: { name: 'Sammy Kamotho' }
    },
    stats: {
      founded: '2006',
      membersCount: '0.5M',
      electedGovernors: 0,
      electedSenators: 0,
      electedMPs: 0,
      electedWomenReps: 0,
      electedMCAs: 0
    },
    manifestoSummary: ['Anti-corruption', 'Family Values', 'Economic Recovery'],
    constitutionParameters: {
        membershipFee: 'KES 50',
        nominationFee: 'KES 10,000',
        termLimit: '5 Years'
    },
    electedOfficials: []
  },
  {
    id: 'roots',
    name: 'Roots Party of Kenya',
    abbreviation: 'ROOTS',
    symbol: '/parties/roots-leaf.png',
    color: 'bg-green-500',
    slogan: 'Freedom and justice',
    ideology: 'Libertarianism',
    description: 'Advocating for the legalization of marijuana for medicinal and economic purposes.',
    leadership: {
      leader: { name: 'George Wajackoyah' },
      secretaryGeneral: { name: 'Adam Kadernani' },
      chairperson: { name: 'Vinicent Musyoka' }
    },
    stats: {
      founded: '2011',
      membersCount: '0.8M',
      electedGovernors: 0,
      electedSenators: 0,
      electedMPs: 0,
      electedWomenReps: 0,
      electedMCAs: 0
    },
    manifestoSummary: ['Marijuana Legalization', 'Snake Farming', 'Debt Management'],
    constitutionParameters: {
        membershipFee: 'Free',
        nominationFee: 'KES 0',
        termLimit: 'Collective'
    },
    electedOfficials: []
  },
  {
    id: 'anc',
    name: 'Amani National Congress',
    abbreviation: 'ANC',
    symbol: '/parties/anc.png',
    color: 'bg-green-600',
    slogan: 'Uchumi Bora, Maisha Bora',
    ideology: 'Social Democracy',
    description: 'Focused on economic stability and national unity.',
    leadership: {
      leader: { name: 'Musalia Mudavadi' },
      secretaryGeneral: { name: 'Omboko Milemba' },
      chairperson: { name: 'Kevin Lunani' }
    },
    stats: { founded: '2015', membersCount: '2.1M', electedGovernors: 1, electedSenators: 1, electedMPs: 8, electedWomenReps: 1, electedMCAs: 80 },
    manifestoSummary: ['Economic Stability', 'Decentralization'],
    constitutionParameters: { 
        membershipFee: 'KES 100', 
        nominationFee: 'Standard', 
        termLimit: '5 Years' 
    },
    electedOfficials: [
      { name: 'Issa Timamy', county: 'Lamu', role: 'Governor' }
    ]
  },
  {
    id: 'ford-k',
    name: 'Forum for the Restoration of Democracy-Kenya',
    abbreviation: 'FORD-K',
    symbol: '/parties/ford-k.png',
    color: 'bg-green-400',
    slogan: 'Haki na Ukweli',
    ideology: 'Liberalism',
    description: 'One of the oldest multi-party era parties focused on democracy.',
    leadership: {
      leader: { name: 'Moses Wetangula' },
      secretaryGeneral: { name: 'John Chikati' },
      chairperson: { name: 'Ken Lusaka' }
    },
    stats: { founded: '1992', membersCount: '1.8M', electedGovernors: 1, electedSenators: 1, electedMPs: 6, electedWomenReps: 0, electedMCAs: 60 },
    manifestoSummary: ['Good Governance', 'Agricultural Reform'],
    constitutionParameters: { 
        membershipFee: 'KES 50', 
        nominationFee: 'Standard', 
        termLimit: '5 Years' 
    },
    electedOfficials: [
      { name: 'Ken Lusaka', county: 'Bungoma', role: 'Governor' }
    ]
  },
  {
    id: 'kanu',
    name: 'Kenya African National Union',
    abbreviation: 'KANU',
    symbol: '/parties/kanu.png',
    color: 'bg-red-700',
    slogan: 'Amani, Na Upendo',
    ideology: 'Conservatism',
    description: 'The independence party of Kenya.',
    leadership: {
      leader: { name: 'Gideon Moi' },
      secretaryGeneral: { name: 'Nick Salat' },
      chairperson: { name: 'Samuel Poghisio' }
    },
    stats: { founded: '1960', membersCount: '3.5M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
    manifestoSummary: ['Social Justice', 'Peaceful Coexistence'],
    constitutionParameters: { membershipFee: 'KES 100', nominationFee: 'Standard', termLimit: 'N/A' },
    electedOfficials: []
  },
  {
      id: 'dap-k',
      name: 'Democratic Action Party-Kenya',
      abbreviation: 'DAP-K',
      symbol: '/parties/dapk.png',
      color: 'bg-blue-500',
      slogan: 'Kazi Iendelee',
      ideology: 'Progressivism',
      description: 'A relatively new party with strong presence in Western Kenya.',
      leadership: {
        leader: { name: 'Wafula Wamunyinyi' },
        secretaryGeneral: { name: 'Eseli Simiyu' },
        chairperson: { name: 'Eugene Wamalwa' }
      },
      stats: { founded: '2021', membersCount: '0.9M', electedGovernors: 1, electedSenators: 0, electedMPs: 5, electedWomenReps: 0, electedMCAs: 22 },
      manifestoSummary: ['Social Democracy', 'Accountability'],
      constitutionParameters: { 
        membershipFee: 'KES 20', 
        nominationFee: 'Free', 
        termLimit: '5 Years' 
      },
      electedOfficials: [
        { name: 'George Natembeya', county: 'Trans Nzoia', role: 'Governor' }
      ]
  },
  {
      id: 'paa',
      name: 'Pamoja African Alliance',
      abbreviation: 'PAA',
      symbol: '/parties/paa.png',
      color: 'bg-cyan-500',
      slogan: 'Tuvunje Mwiko',
      ideology: 'Regionalism',
      description: 'Focused on the interests of the Coast region.',
      leadership: {
        leader: { name: 'Amason Kingi' },
        secretaryGeneral: { name: 'Lucas Maitha' },
        chairperson: { name: 'Ibrahim Babangida' }
      },
      stats: { founded: '2021', membersCount: '0.4M', electedGovernors: 0, electedSenators: 0, electedMPs: 3, electedWomenReps: 0, electedMCAs: 20 },
      manifestoSummary: ['Coast Empowerment', 'Land Rights'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'mazingira',
      name: 'Mazingira Green Party of Kenya',
      abbreviation: 'MAZINGIRA',
      symbol: '/parties/mazingira.png',
      color: 'bg-green-800',
      slogan: 'Green is Life',
      ideology: 'Environmentalism',
      description: 'Focusing on environmental protection and sustainable development.',
      leadership: {
        leader: { name: 'Hamilton Nganga' },
        secretaryGeneral: { name: 'Julia Chege' },
        chairperson: { name: 'Isaac Kalua' }
      },
      stats: { founded: '1997', membersCount: '0.6M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Climate Action', 'Sustainable Agriculture'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Low', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'mccp',
      name: 'Maendeleo Chap Chap Party',
      abbreviation: 'MCCP',
      symbol: '/parties/mccp.png',
      color: 'bg-orange-600',
      slogan: 'Inawezekana na Chap Chap',
      ideology: 'Social Democracy',
      description: 'Advocating for fast-paced development and efficient service delivery.',
      leadership: {
        leader: { name: 'Alfred Mutua' },
        secretaryGeneral: { name: 'Francis Mwangangi' },
        chairperson: { name: 'Sammy Leshore' }
      },
      stats: { founded: '2016', membersCount: '1.5M', electedGovernors: 0, electedSenators: 0, electedMPs: 2, electedWomenReps: 0, electedMCAs: 15 },
      manifestoSummary: ['Efficient Governance', 'Youth Employment'],
      constitutionParameters: { membershipFee: 'KES 100', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'pnu',
      name: 'Party of National Unity',
      abbreviation: 'PNU',
      symbol: '/parties/pnu.png',
      color: 'bg-blue-300',
      slogan: 'Kazi Iendelee',
      ideology: 'Liberalism',
      description: 'A historic party focused on economic growth and infrastructure.',
      leadership: {
        leader: { name: 'Peter Munya' },
        secretaryGeneral: { name: 'John Okemwa' },
        chairperson: { name: 'David Kamau' }
      },
      stats: { founded: '2007', membersCount: '2.0M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Economic Growth', 'Infrastructure Development'],
      constitutionParameters: { membershipFee: 'KES 100', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'narc-k',
      name: 'National Rainbow Coalition-Kenya',
      abbreviation: 'NARC-K',
      symbol: '/parties/narck.png',
      color: 'bg-orange-400',
      slogan: 'Haki na Ukweli',
      ideology: 'Social Liberalism',
      description: 'Led by Martha Karua, focusing on integrity and constitutionalism.',
      leadership: {
        leader: { name: 'Martha Karua' },
        secretaryGeneral: { name: 'Michael Orwa' },
        chairperson: { name: 'Alois Chando' }
      },
      stats: { founded: '2005', membersCount: '1.2M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Anti-corruption', 'Integrity', 'Women Rights'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'tsp',
      name: 'The Service Party',
      abbreviation: 'TSP',
      symbol: '/parties/tsp.png',
      color: 'bg-yellow-600',
      slogan: 'Kazi ni Kazi',
      ideology: 'Service-oriented',
      description: 'Focused on community service and agricultural empowerment.',
      leadership: {
        leader: { name: 'Mwangi Kiunjuri' },
        secretaryGeneral: { name: 'Maina Kyalo' },
        chairperson: { name: 'Sammy Mwaura' }
      },
      stats: { founded: '2020', membersCount: '0.8M', electedGovernors: 0, electedSenators: 0, electedMPs: 2, electedWomenReps: 0, electedMCAs: 10 },
      manifestoSummary: ['Food Security', 'Service Delivery'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'ccu',
      name: 'Chama Cha Uzalendo',
      abbreviation: 'CCU',
      symbol: '/parties/ccu.png',
      color: 'bg-red-500',
      slogan: 'Mwananchi Kwanza',
      ideology: 'Patriotism',
      description: 'Advocating for patriotism and citizen-centered governance.',
      leadership: {
        leader: { name: 'Nzioka Waita' },
        secretaryGeneral: { name: 'Philippe Sadjah' },
        chairperson: { name: 'John Mutua' }
      },
      stats: { founded: '2005', membersCount: '0.5M', electedGovernors: 0, electedSenators: 0, electedMPs: 1, electedWomenReps: 0, electedMCAs: 5 },
      manifestoSummary: ['Patriotism', 'Youth Empowerment'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'udp',
      name: 'United Democratic Party',
      abbreviation: 'UDP',
      symbol: '/parties/udp.png',
      color: 'bg-slate-700',
      slogan: 'Strength in Unity',
      ideology: 'Social Democracy',
      description: 'Focusing on community development and welfare.',
      leadership: {
        leader: { name: 'Cyrus Jirongo' },
        secretaryGeneral: { name: 'Bernard Koros' },
        chairperson: { name: 'Sammy Kamotho' }
      },
      stats: { founded: '1999', membersCount: '0.4M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Community Welfare', 'Social Justice'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'dp',
      name: 'Democratic Party of Kenya',
      abbreviation: 'DP',
      symbol: '/parties/dp.png',
      color: 'bg-gray-500',
      slogan: 'Justice and Liberty',
      ideology: 'Conservatism',
      description: 'A historic party founded by Mwai Kibaki.',
      leadership: {
        leader: { name: 'Justin Muturi' },
        secretaryGeneral: { name: 'Jacob Haji' },
        chairperson: { name: 'Esau Kioni' }
      },
      stats: { founded: '1991', membersCount: '1.4M', electedGovernors: 0, electedSenators: 1, electedMPs: 1, electedWomenReps: 0, electedMCAs: 5 },
      manifestoSummary: ['Economic Stability', 'Rule of Law'],
      constitutionParameters: { membershipFee: 'KES 100', nominationFee: 'Standard', termLimit: '10 Years' },
      electedOfficials: []
  },
  {
      id: 'upa',
      name: 'United Progressive Alliance',
      abbreviation: 'UPA',
      symbol: '/parties/upa.png',
      color: 'bg-green-700',
      slogan: 'Kazi na maendeleo',
      ideology: 'Progressivism',
      description: 'A party with strong roots in the Gusii region focusing on development.',
      leadership: { leader: { name: 'Amos Nyaribo' }, secretaryGeneral: { name: 'Jacob Haji' }, chairperson: { name: 'Samuel Omwando' } },
      stats: { founded: '2021', membersCount: '0.5M', electedGovernors: 0, electedSenators: 0, electedMPs: 1, electedWomenReps: 0, electedMCAs: 5 },
      manifestoSummary: ['Regional Development', 'Resource Allocation'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Medium', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'upia',
      name: 'United Party of Independent Alliance',
      abbreviation: 'UPIA',
      symbol: '/parties/upia.png',
      color: 'bg-blue-600',
      slogan: 'Power to the People',
      ideology: 'Liberalism',
      description: 'Strongly rooted in Northern Kenya (Mandera/Marsabit).',
      leadership: { leader: { name: 'Ukur Yatani' }, secretaryGeneral: { name: 'Mohamed Abdi' }, chairperson: { name: 'Ali Kiti' } },
      stats: { founded: '2021', membersCount: '0.4M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Arid Lands Development', 'Social Inclusion'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'tujibebe',
      name: 'Tujibebe Wakenya Party',
      abbreviation: 'Tujibebe',
      symbol: '/parties/tujibebe.png',
      color: 'bg-orange-500',
      slogan: 'Wasiwasi itishe',
      ideology: 'Economic Empowerment',
      description: 'Founded by William Kabogo focusing on grassroots empowerment.',
      leadership: { leader: { name: 'William Kabogo' }, secretaryGeneral: { name: 'Gatu Nganga' }, chairperson: { name: 'Raymond Ndungu' } },
      stats: { founded: '2021', membersCount: '0.6M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Youth Jobs', 'Ease of Doing Business'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Low', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'kadu-asili',
      name: 'Kenya African Democratic Union-Asili',
      abbreviation: 'KADU-Asili',
      symbol: '/parties/kadu.png',
      color: 'bg-red-600',
      slogan: 'Haki iwe Ngao Yetu',
      ideology: 'Regionalism',
      description: 'Advocating for the rights and resources of the coastal people.',
      leadership: { leader: { name: 'Khamis Juma' }, secretaryGeneral: { name: 'John Chikati' }, chairperson: { name: 'Mwakwere Ali' } },
      stats: { founded: '2006', membersCount: '0.3M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Land Rights', 'Blue Economy'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'ncck',
      name: 'New Democrats',
      abbreviation: 'TND',
      symbol: '/parties/tnd.png',
      color: 'bg-purple-600',
      slogan: 'Nguvu kwa mwananchi',
      ideology: 'Social Democracy',
      description: 'Focusing on democratic renewal and transparency.',
      leadership: { leader: { name: 'Jimmy Wanjigi' }, secretaryGeneral: { name: 'Fredrick Muteti' }, chairperson: { name: 'David Ngugi' } },
      stats: { founded: '2012', membersCount: '0.7M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Economic Revolution', 'Food Security'],
      constitutionParameters: { membershipFee: 'KES 100', nominationFee: 'Premium', termLimit: 'Undefined' },
      electedOfficials: []
  },
  {
      id: 'pep',
      name: 'People’s Empowerment Party',
      abbreviation: 'PEP',
      symbol: '/parties/pep.png',
      color: 'bg-emerald-600',
      slogan: 'Maendeleo na watu',
      ideology: 'Populism',
      description: 'A party focused on micro-empowerment at the ward level.',
      leadership: { leader: { name: 'Moses Kuria' }, secretaryGeneral: { name: 'James Kimani' }, chairperson: { name: 'Sarah Maina' } },
      stats: { founded: '2007', membersCount: '0.9M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Micro-governance', 'Trade Protection'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'mdg',
      name: 'Movement for Democracy and Growth',
      abbreviation: 'MDG',
      symbol: '/parties/mdg.png',
      color: 'bg-green-600',
      slogan: 'Ugrow, We grow',
      ideology: 'Social Democracy',
      description: 'Focusing on community-led development.',
      leadership: { leader: { name: 'David Ochieng' }, secretaryGeneral: { name: 'Mary Otieno' }, chairperson: { name: 'John Okello' } },
      stats: { founded: '2017', membersCount: '0.2M', electedGovernors: 0, electedSenators: 0, electedMPs: 1, electedWomenReps: 0, electedMCAs: 5 },
      manifestoSummary: ['Community Growth', 'Democratic Space'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'udm',
      name: 'United Democratic Movement',
      abbreviation: 'UDM',
      symbol: '/parties/udm.png',
      color: 'bg-yellow-500',
      slogan: 'Nguvu kwa Watu',
      ideology: 'Liberalism',
      description: 'Mainly active in Northern Kenya.',
      leadership: { leader: { name: 'Ali Roba' }, secretaryGeneral: { name: 'David Ohito' }, chairperson: { name: 'Mohamed Abdi' } },
      stats: { founded: '1999', membersCount: '0.5M', electedGovernors: 1, electedSenators: 2, electedMPs: 8, electedWomenReps: 1, electedMCAs: 50 },
      manifestoSummary: ['Arid Land Development', 'Security'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: [
        { name: 'Mohamed Adan Khalif', county: 'Mandera', role: 'Governor' }
      ]
  },
  {
      id: 'ugm',
      name: 'United Green Movement',
      abbreviation: 'UGM',
      symbol: '/parties/ugm.png',
      color: 'bg-emerald-500',
      slogan: 'Kenya is Green',
      ideology: 'Green Politics',
      description: 'Eco-conscious party focused on youth and environment.',
      leadership: { leader: { name: 'Agostinho Neto' }, secretaryGeneral: { name: 'Hamisa Zaja' }, chairperson: { name: 'John Doe' } },
      stats: { founded: '2021', membersCount: '0.1M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Environmental Rights', 'Youth Mentorship'],
      constitutionParameters: { membershipFee: 'KES 20', nominationFee: 'Free', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'ptp',
      name: 'People’s Trust Party',
      abbreviation: 'PTP',
      symbol: '/parties/ptp.png',
      color: 'bg-blue-500',
      slogan: 'Trust the People',
      ideology: 'Centrism',
      description: 'Focusing on transparency and trust in governance.',
      leadership: { leader: { name: 'Mutua Katuku' }, secretaryGeneral: { name: 'John Kimani' }, chairperson: { name: 'Sarah Wambui' } },
      stats: { founded: '2007', membersCount: '0.15M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Transparency', 'Accountability'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'jfp',
      name: 'Justice and Freedom Party',
      abbreviation: 'JFP',
      symbol: '/parties/jfp.png',
      color: 'bg-black',
      slogan: 'Haki na Uhuru',
      ideology: 'Human Rights',
      description: 'Defending the rights and freedoms of all Kenyans.',
      leadership: { leader: { name: 'Charles Manyara' }, secretaryGeneral: { name: 'John Omondi' }, chairperson: { name: 'Alice Njeri' } },
      stats: { founded: '2016', membersCount: '0.1M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Civil Rights', 'Judicial Equality'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'kpp',
      name: 'Kenya Patriots Party',
      abbreviation: 'KPP',
      symbol: '/parties/kpp.png',
      color: 'bg-red-900',
      slogan: 'Nchi Yetu, Fahari Yetu',
      ideology: 'Patriotism',
      description: 'Advocating for national pride and civic duty.',
      leadership: { leader: { name: 'Dr. Migwe' }, secretaryGeneral: { name: 'John Doe' }, chairperson: { name: 'Alice Lee' } },
      stats: { founded: '2016', membersCount: '0.2M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['National Security', 'Youth Service'],
      constitutionParameters: { membershipFee: 'KES 20', nominationFee: 'Standard', termLimit: 'N/A' },
      electedOfficials: []
  },
  {
      id: 'gck',
      name: 'Green Congress of Kenya',
      abbreviation: 'GCK',
      symbol: '/parties/gck.png',
      color: 'bg-green-300',
      slogan: 'Going Green',
      ideology: 'Ecologism',
      description: 'A party focused on sustainability and environmental rights.',
      leadership: { leader: { name: 'Martin Ogindo' }, secretaryGeneral: { name: 'Scola Chepkirui' }, chairperson: { name: 'Hillary Alila' } },
      stats: { founded: '2021', membersCount: '0.1M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Green Economy', 'Water Rights'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Low', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'cpk',
      name: 'Communist Party of Kenya',
      abbreviation: 'CPK',
      symbol: '/parties/cpk.png',
      color: 'bg-red-800',
      slogan: 'Workers of the World Unite',
      ideology: 'Marxism-Leninism',
      description: 'A socialist party championing for workers rights and land reform.',
      leadership: { leader: { name: 'Mwandawiro Mghanga' }, secretaryGeneral: { name: 'Benedict Wachira' }, chairperson: { name: 'Booker Ngesa Omole' } },
      stats: { founded: '1998', membersCount: '0.15M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Class Struggle', 'Common Ownership'],
      constitutionParameters: { membershipFee: 'Free', nominationFee: 'KES 0', termLimit: 'Collective' },
      electedOfficials: []
  },
  {
      id: 'nlp',
      name: 'National Liberal Party',
      abbreviation: 'NLP',
      symbol: '/parties/nlp.png',
      color: 'bg-blue-400',
      slogan: 'Haki na Ukweli',
      ideology: 'Liberalism',
      description: 'Advocating for democratic freedoms.',
      leadership: { leader: { name: 'Stephen Onyango' }, secretaryGeneral: { name: 'Jane Wambui' }, chairperson: { name: 'Peter Kimani' } },
      stats: { founded: '2012', membersCount: '0.1M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Civil Liberties', 'Market Economy'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'upf',
      name: 'Ubuntu Peoples Forum',
      abbreviation: 'UPF',
      symbol: '/parties/upf.png',
      color: 'bg-amber-600',
      slogan: 'I am because we are',
      ideology: 'Ubuntuism',
      description: 'Fostered on the philosophy of Ubuntu, mainly active in Nakuru.',
      leadership: { leader: { name: 'Lee Kinyanjui' }, secretaryGeneral: { name: 'Samuel Gichuru' }, chairperson: { name: 'Beatrice Nyawira' } },
      stats: { founded: '2021', membersCount: '0.3M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Inclusion', 'Development'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'dpk',
      name: 'Devolution Party of Kenya',
      abbreviation: 'DPK',
      symbol: '/parties/dpk.png',
      color: 'bg-teal-600',
      slogan: 'Nguvu kwa Kaunti',
      ideology: 'Devolution',
      description: 'A party solely focused on strengthening county governments.',
      leadership: { leader: { name: 'Moses Kamau' }, secretaryGeneral: { name: 'George Wajir' }, chairperson: { name: 'Sarah Ali' } },
      stats: { founded: '2016', membersCount: '0.2M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Resource Allocation', 'County Autonomy'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'ccm',
      name: 'Chama Cha Mashinani',
      abbreviation: 'CCM',
      symbol: '/parties/ccm.png',
      color: 'bg-green-500',
      slogan: 'Haki na Maendeleo kwa Wote',
      ideology: 'Regionalism',
      description: 'Advocating for grassroots development and resources.',
      leadership: { leader: { name: 'Isaac Ruto' }, secretaryGeneral: { name: 'Albert Kochei' }, chairperson: { name: 'Mohamed Abdi' } },
      stats: { founded: '2016', membersCount: '1.2M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Devolution', 'Empowerment'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'twa',
      name: 'Thirdway Alliance Kenya',
      abbreviation: 'TWA',
      symbol: '/parties/twa.png',
      color: 'bg-blue-900',
      slogan: 'Punguza Mizigo',
      ideology: 'Reformism',
      description: 'Known for the Punguza Mizigo bill aimed at constitutional reform.',
      leadership: { leader: { name: 'Ekuru Aukot' }, secretaryGeneral: { name: 'Fredrick Okango' }, chairperson: { name: 'Miruru Waweru' } },
      stats: { founded: '2017', membersCount: '0.8M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Constitutional Reform', 'Tax Reduction'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'ukweli',
      name: 'Ukweli Party',
      abbreviation: 'UKWELI',
      symbol: '/parties/ukweli.png',
      color: 'bg-yellow-400',
      slogan: 'Ukweli na Haki',
      ideology: 'Social Justice',
      description: 'Focused on integrity and ethical leadership.',
      leadership: { leader: { name: 'Boniface Mwangi' }, secretaryGeneral: { name: 'John Kimani' }, chairperson: { name: 'Sarah Wambui' } },
      stats: { founded: '2017', membersCount: '0.1M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Integrity', 'Public Service'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Free', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'napa',
      name: 'National Agenda Party',
      abbreviation: 'NAPA',
      symbol: '/parties/napa.png',
      color: 'bg-red-500',
      slogan: 'Agenda kwa Kenya',
      ideology: 'Centrism',
      description: 'Advocating for a national agenda focused on unity.',
      leadership: { leader: { name: 'Alfayo Agufana' }, secretaryGeneral: { name: 'John Doe' }, chairperson: { name: 'Alice Lee' } },
      stats: { founded: '2012', membersCount: '0.2M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Unity', 'Economic Growth'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'dep',
      name: 'Devolution Empowerment Party',
      abbreviation: 'DEP',
      symbol: '/parties/dep.png',
      color: 'bg-yellow-400',
      slogan: 'Mbus Iendelee',
      ideology: 'Regionalism',
      description: 'Commonly known as "The Bus", strong in the Meru region.',
      leadership: { leader: { name: 'Kiraitu Murungi' }, secretaryGeneral: { name: 'Alfrick Muasya' }, chairperson: { name: 'Lenny Kivuti' } },
      stats: { founded: '2021', membersCount: '1.1M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Regional Devolution', 'Resource Allocation'],
      constitutionParameters: { membershipFee: 'KES 100', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'fpk',
      name: 'Federal Party of Kenya',
      abbreviation: 'FPK',
      symbol: '/parties/fpk.png',
      color: 'bg-green-600',
      slogan: 'Shirikisho kwa Wote',
      ideology: 'Federalism',
      description: 'Advocating for a federal system of government.',
      leadership: { leader: { name: 'Kennedy Kiliku' }, secretaryGeneral: { name: 'John Doe' }, chairperson: { name: 'Alice Lee' } },
      stats: { founded: '1992', membersCount: '0.4M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Federalism', 'Local Governance'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'ucdp',
      name: 'United Christian Democratic Party',
      abbreviation: 'UCDP',
      symbol: '/parties/ucdp.png',
      color: 'bg-white',
      slogan: 'Haki iwe Ngao Yetu',
      ideology: 'Christian Democracy',
      description: 'Focusing on Christian values in governance.',
      leadership: { leader: { name: 'James Kimani' }, secretaryGeneral: { name: 'Sarah Wambui' }, chairperson: { name: 'John Doe' } },
      stats: { founded: '2012', membersCount: '0.2M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Values', 'Integrity'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'nvp',
      name: 'National Vision Party',
      abbreviation: 'NVP',
      symbol: '/parties/nvp.png',
      color: 'bg-teal-500',
      slogan: 'Vision for Kenya',
      ideology: 'Centrism',
      description: 'Founded by Nicholas Biwott, focusing on national vision.',
      leadership: { leader: { name: 'Nicholas Biwott' }, secretaryGeneral: { name: 'John Doe' }, chairperson: { name: 'Alice Lee' } },
      stats: { founded: '2008', membersCount: '0.6M', electedGovernors: 0, electedSenators: 0, electedMPs: 0, electedWomenReps: 0, electedMCAs: 0 },
      manifestoSummary: ['Vision 2030', 'Education'],
      constitutionParameters: { membershipFee: 'KES 50', nominationFee: 'Standard', termLimit: '5 Years' },
      electedOfficials: []
  },
  {
      id: 'independent',
      name: 'Independent Candidates',
      abbreviation: 'IND',
      symbol: '/parties/independent.png',
      color: 'bg-white/10',
      slogan: 'Service without Bias',
      ideology: 'Pragmatism',
      description: 'Candidates who run for office without affiliation to any registered political party.',
      leadership: { 
        leader: { name: 'Various' }, 
        secretaryGeneral: { name: 'N/A' }, 
        chairperson: { name: 'N/A' } 
      },
      stats: { 
        founded: 'N/A', 
        membersCount: 'N/A', 
        electedGovernors: 2, 
        electedSenators: 0, 
        electedMPs: 10, 
        electedWomenReps: 0, 
        electedMCAs: 50 
      },
      manifestoSummary: ['Independent Voting', 'Issue-based Leadership'],
      constitutionParameters: { membershipFee: 'N/A', nominationFee: 'IEBC Set', termLimit: '5 Years' },
      electedOfficials: [
        { name: 'Andrew Mwadime', county: 'Taita Taveta', role: 'Governor' },
        { name: 'Kawira Mwangaza', county: 'Meru', role: 'Governor' }
      ]
  }
];
