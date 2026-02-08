export interface ConstitutionArticle {
  id: string;
  chapter: string;
  number: number;
  title: string;
  content: string;
  keywords: string[];
}

export interface ChapterMetadata {
  id: string;
  title: string;
  description: string;
  articlesRange: string;
}

export const CONSTITUTION_CHAPTERS: ChapterMetadata[] = [
  { id: 'chapter-1', title: 'Chapter 1: Sovereignty of the People', description: 'Supremacy of the constitution and defense of the constitution.', articlesRange: 'Art. 1-3' },
  { id: 'chapter-2', title: 'Chapter 2: The Republic', description: 'National symbols, language, and culture.', articlesRange: 'Art. 4-11' },
  { id: 'chapter-3', title: 'Chapter 3: Citizenship', description: 'Entitlements of citizens, retention and acquisition of citizenship.', articlesRange: 'Art. 12-18' },
  { id: 'chapter-4', title: 'Chapter 4: The Bill of Rights', description: 'Fundamental rights and freedoms guaranteed to all persons.', articlesRange: 'Art. 19-59' },
  { id: 'chapter-5', title: 'Chapter 5: Land and Environment', description: 'Principles of land policy and obligations of the State.', articlesRange: 'Art. 60-72' },
  { id: 'chapter-6', title: 'Chapter 6: Leadership and Integrity', description: 'Responsibilities of leadership and conduct of state officers.', articlesRange: 'Art. 73-80' },
  { id: 'chapter-7', title: 'Chapter 7: Representation of the People', description: 'Electoral system and process.', articlesRange: 'Art. 81-92' },
  { id: 'chapter-8', title: 'Chapter 8: The Legislature', description: 'Composition and role of Parliament.', articlesRange: 'Art. 93-128' },
  { id: 'chapter-9', title: 'Chapter 9: The Executive', description: 'Powers and functions of the President and Cabinet.', articlesRange: 'Art. 129-158' },
  { id: 'chapter-10', title: 'Chapter 10: Judiciary', description: 'Judicial authority and legal system.', articlesRange: 'Art. 159-173' },
  { id: 'chapter-11', title: 'Chapter 11: Devolved Government', description: 'Objects and principles of devolved government.', articlesRange: 'Art. 174-200' },
  { id: 'chapter-12', title: 'Chapter 12: Public Finance', description: 'Principles and framework of public finance.', articlesRange: 'Art. 201-231' },
  { id: 'chapter-13', title: 'Chapter 13: The Public Service', description: 'Values and principles of public service.', articlesRange: 'Art. 232-237' },
  { id: 'chapter-14', title: 'Chapter 14: National Security', description: 'National security organs and their functions.', articlesRange: 'Art. 238-247' },
  { id: 'chapter-15', title: 'Chapter 15: Commissions and Independent Offices', description: 'Constitutional commissions and independent offices.', articlesRange: 'Art. 248-254' },
  { id: 'chapter-16', title: 'Chapter 16: Amendment of this Constitution', description: 'Process of amending the constitution.', articlesRange: 'Art. 255-257' },
  { id: 'chapter-17', title: 'Chapter 17: General Provisions', description: 'Enforcement and interpretation.', articlesRange: 'Art. 258-260' },
  { id: 'chapter-18', title: 'Chapter 18: Transitional Provisions', description: 'Transitional and consequential provisions.', articlesRange: 'Art. 261-264' }
];

export const CONSTITUTION_KNOWLEDGE_BASE: ConstitutionArticle[] = [
  // Chapter 1
  {
    id: 'art-1',
    chapter: 'Chapter 1: Sovereignty of the People',
    number: 1,
    title: 'Sovereignty of the people',
    content: 'All sovereign power belongs to the people of Kenya and shall be exercised only in accordance with this Constitution. The people may exercise their sovereign power either directly or through their democratically elected representatives.',
    keywords: ['power', 'people', 'sovereignty', 'democracy']
  },
  {
    id: 'art-2',
    chapter: 'Chapter 1: Sovereignty of the People',
    number: 2,
    title: 'Supremacy of this Constitution',
    content: 'This Constitution is the supreme law of the Republic and binds all persons and all State organs at both levels of government. No person may claim or exercise State authority except as authorised under this Constitution.',
    keywords: ['law', 'supreme', 'binds', 'government', 'authority']
  },
  {
    id: 'art-3',
    chapter: 'Chapter 1: Sovereignty of the People',
    number: 3,
    title: 'Defence of this Constitution',
    content: 'Every person has an obligation to respect, uphold and defend this Constitution. Any attempt to establish a government otherwise than in compliance with this Constitution is unlawful.',
    keywords: ['defence', 'obligation', 'uphold', 'constitution']
  },
  
  // Chapter 2
  {
    id: 'art-4',
    chapter: 'Chapter 2: The Republic',
    number: 4,
    title: 'Declaration of the Republic',
    content: 'Kenya is a sovereign Republic. The Republic of Kenya shall be a multi-party democratic State founded on the national values and principles of governance referred to in Article 10.',
    keywords: ['republic', 'sovereign', 'democratic', 'multi-party']
  },
  {
    id: 'art-5',
    chapter: 'Chapter 2: The Republic',
    number: 5,
    title: 'Territory of Kenya',
    content: 'Kenya consists of the territory and territorial waters comprising Kenya on the effective date, and any additional territory and territorial waters as defined by an Act of Parliament.',
    keywords: ['territory', 'boundaries', 'waters']
  },
  {
    id: 'art-6',
    chapter: 'Chapter 2: The Republic',
    number: 6,
    title: 'Devolution and access to services',
    content: 'The territory of Kenya is divided into the counties specified in the First Schedule. The governments at the national and county levels are distinct and inter-dependent and shall conduct their mutual relations on the basis of consultation and cooperation.',
    keywords: ['devolution', 'counties', 'services', 'cooperation']
  },
  {
    id: 'art-7',
    chapter: 'Chapter 2: The Republic',
    number: 7,
    title: 'National, official and other languages',
    content: 'The national language of the Republic is Kiswahili. The official languages of the Republic are Kiswahili and English. The State shall promote and protect the diversity of language of the people of Kenya.',
    keywords: ['language', 'kiswahili', 'english', 'diversity']
  },
  {
    id: 'art-8',
    chapter: 'Chapter 2: The Republic',
    number: 8,
    title: 'State and religion',
    content: 'There shall be no State religion.',
    keywords: ['religion', 'secular', 'state']
  },
  {
    id: 'art-9',
    chapter: 'Chapter 2: The Republic',
    number: 9,
    title: 'National symbols and national days',
    content: 'The national symbols of the Republic are the national flag, the national anthem, the coat of arms, and the public seal. The national days are Madaraka Day (1st June), Mashujaa Day (20th October), and Jamhuri Day (12th December).',
    keywords: ['symbols', 'flag', 'anthem', 'days', 'holidays']
  },
  {
    id: 'art-10',
    chapter: 'Chapter 2: The Republic',
    number: 10,
    title: 'National values and principles of governance',
    content: 'The national values and principles of governance include patriotism, national unity, sharing and devolution of power, the rule of law, democracy and participation of the people, human dignity, equity, social justice, inclusiveness, equality, human rights, non-discrimination and protection of the marginalised.',
    keywords: ['values', 'governance', 'patriotism', 'unity', 'democracy', 'integrity']
  },
  {
    id: 'art-11',
    chapter: 'Chapter 2: The Republic',
    number: 11,
    title: 'Culture',
    content: 'This Constitution recognises culture as the foundation of the nation and as the cumulative civilisation of the Kenyan people and nation. The State shall promote all forms of national and cultural expression.',
    keywords: ['culture', 'foundation', 'expression', 'heritage']
  },

  // Chapter 3
  {
    id: 'art-12',
    chapter: 'Chapter 3: Citizenship',
    number: 12,
    title: 'Entitlements of citizens',
    content: 'Every citizen is entitled to the rights, privileges and benefits of citizenship, subject to the limits provided or permitted by this Constitution. Every citizen is entitled to a Kenyan passport and any document of registration or identification issued by the State to citizens.',
    keywords: ['citizen', 'rights', 'privileges', 'passport']
  },
  {
    id: 'art-13',
    chapter: 'Chapter 3: Citizenship',
    number: 13,
    title: 'Retention and acquisition of citizenship',
    content: 'Every person who was a citizen immediately before the effective date retains that citizenship. Citizenship may be acquired by birth or registration.',
    keywords: ['citizenship', 'retention', 'acquisition']
  },
  {
    id: 'art-14',
    chapter: 'Chapter 3: Citizenship',
    number: 14,
    title: 'Citizenship by birth',
    content: 'A person is a citizen by birth if on the day of the person’s birth, whether or not the person is born in Kenya, either the mother or father of the person is a citizen.',
    keywords: ['birth', 'citizen', 'parent']
  },
  {
    id: 'art-15',
    chapter: 'Chapter 3: Citizenship',
    number: 15,
    title: 'Citizenship by registration',
    content: 'A person who has been married to a citizen for a period of at least seven years is entitled on application to be registered as a citizen. A person who has been lawfully resident in Kenya for a continuous period of at least seven years may apply to be registered as a citizen.',
    keywords: ['registration', 'marriage', 'residency']
  },
  {
    id: 'art-16',
    chapter: 'Chapter 3: Citizenship',
    number: 16,
    title: 'Dual citizenship',
    content: 'A citizen by birth does not lose citizenship by acquiring the citizenship of another country.',
    keywords: ['dual', 'citizenship']
  },
  {
    id: 'art-17',
    chapter: 'Chapter 3: Citizenship',
    number: 17,
    title: 'Revocation of citizenship',
    content: 'Citizenship by registration may be revoked if a person acquired it by fraud, false representation or concealment of any material fact.',
    keywords: ['revocation', 'fraud', 'citizenship']
  },
  {
    id: 'art-18',
    chapter: 'Chapter 3: Citizenship',
    number: 18,
    title: 'Legislation on citizenship',
    content: 'Parliament shall enact legislation governing the acquisition and voluntary loss of citizenship, and procedures for revocation of citizenship.',
    keywords: ['law', 'legislation', 'citizenship']
  },

  // Chapter 4 (Bill of Rights)
  {
    id: 'art-19',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 19,
    title: 'Rights and fundamental freedoms',
    content: 'The Bill of Rights is an integral part of Kenya’s democratic state and is the framework for social, economic and cultural policies. The purpose of recognising and protecting human rights and fundamental freedoms is to preserve the dignity of individuals and communities.',
    keywords: ['rights', 'freedoms', 'policy', 'dignity']
  },
  {
    id: 'art-20',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 20,
    title: 'Application of Bill of Rights',
    content: 'The Bill of Rights applies to all law and binds all State organs and all persons. Every person shall enjoy the rights and fundamental freedoms in the Bill of Rights to the greatest extent consistent with the nature of the right or fundamental freedom.',
    keywords: ['application', 'law', 'binds', 'rights']
  },
  {
    id: 'art-21',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 21,
    title: 'Implementation of rights and fundamental freedoms',
    content: 'It is a fundamental duty of the State and every State organ to observe, respect, protect, promote and fulfil the rights and fundamental freedoms in the Bill of Rights.',
    keywords: ['implementation', 'duty', 'state', 'respect']
  },
  {
    id: 'art-22',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 22,
    title: 'Enforcement of Bill of Rights',
    content: 'Every person has the right to institute court proceedings claiming that a right or fundamental freedom in the Bill of Rights has been denied, violated or infringed, or is threatened.',
    keywords: ['court', 'sue', 'enforce', 'justice', 'standing']
  },
  {
    id: 'art-23',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 23,
    title: 'Authority of courts to uphold and enforce the Bill of Rights',
    content: 'The High Court has jurisdiction, in accordance with Article 165, to hear and determine applications for redress of a denial, violation or infringement of, or threat to, a right or fundamental freedom in the Bill of Rights.',
    keywords: ['high court', 'jurisdiction', 'redress', 'enforce']
  },
  {
    id: 'art-24',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 24,
    title: 'Limitation of rights and fundamental freedoms',
    content: 'A right or fundamental freedom in the Bill of Rights shall not be limited except by law, and then only to the extent that the limitation is reasonable and justifiable in an open and democratic society.',
    keywords: ['limitation', 'law', 'justifiable', 'democracy']
  },
  {
    id: 'art-25',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 25,
    title: 'Fundamental Rights and freedoms that may not be limited',
    content: 'Despite any other provision in this Constitution, the following rights and fundamental freedoms shall not be limited: freedom from torture and cruel, inhuman or degrading treatment or punishment; freedom from slavery or servitude; the right to a fair trial; and the right to an order of habeas corpus.',
    keywords: ['non-limitable', 'torture', 'slavery', 'fair trial', 'habeas corpus']
  },
  {
    id: 'art-26',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 26,
    title: 'Right to life',
    content: 'Every person has the right to life. The life of a person begins at conception. A person shall not be deprived of life intentionally, except to the extent authorised by this Constitution or other written law.',
    keywords: ['life', 'conception', 'abortion', 'death penalty']
  },
  {
    id: 'art-27',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 27,
    title: 'Equality and freedom from discrimination',
    content: 'Every person is equal before the law and has the right to equal protection and equal benefit of the law. Equality includes the full and equal enjoyment of all rights and fundamental freedoms. The State shall not discriminate directly or indirectly against any person on any ground.',
    keywords: ['equality', 'discrimination', 'gender', 'race', 'affirmative action']
  },
  {
    id: 'art-28',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 28,
    title: 'Human dignity',
    content: 'Every person has inherent dignity and the right to have that dignity respected and protected.',
    keywords: ['dignity', 'respect', 'humanity']
  },
  {
    id: 'art-29',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 29,
    title: 'Freedom and security of the person',
    content: 'Every person has the right to freedom and security of the person, which includes the right not to be: deprived of freedom arbitrarily or without just cause; detained without trial, except during a state of emergency.',
    keywords: ['security', 'freedom', 'detention', 'violence', 'torture']
  },
  {
    id: 'art-30',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 30,
    title: 'Slavery, servitude and forced labour',
    content: 'A person shall not be held in slavery or servitude. A person shall not be required to perform forced labour.',
    keywords: ['slavery', 'servitude', 'forced labour']
  },
  {
    id: 'art-31',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 31,
    title: 'Privacy',
    content: 'Every person has the right to privacy, which includes the right not to have their person, home or property searched; their possessions seized; information relating to their family or private affairs unnecessarily required or revealed; or the privacy of their communications infringed.',
    keywords: ['privacy', 'search', 'seizure', 'communications']
  },
  {
    id: 'art-32',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 32,
    title: 'Freedom of conscience, religion, belief and opinion',
    content: 'Every person has the right to freedom of conscience, religion, thought, belief and opinion. Every person has the right, either individually or in community with others, in public or in private, to manifest any religion or belief through worship, practice, teaching or observance.',
    keywords: ['religion', 'conscience', 'belief', 'opinion', 'worship']
  },
  {
    id: 'art-33',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 33,
    title: 'Freedom of expression',
    content: 'Every person has the right to freedom of expression, which includes freedom to seek, receive or impart information or ideas; freedom of artistic creativity; and academic freedom and freedom of scientific research.',
    keywords: ['expression', 'speech', 'ideas', 'art', 'academic freedom']
  },
  {
    id: 'art-34',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 34,
    title: 'Freedom of the media',
    content: 'Freedom and independence of electronic, print and all other types of media is guaranteed. The State shall not exercise control over or interfere with any person engaged in broadcasting, the production or circulation of any publication or the dissemination of information by any medium.',
    keywords: ['media', 'press', 'broadcasting', 'information']
  },
  {
    id: 'art-35',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 35,
    title: 'Access to information',
    content: 'Every citizen has the right of access to information held by the State; and information held by another person and required for the exercise or protection of any right or fundamental freedom.',
    keywords: ['information', 'access', 'state records', 'transparency']
  },
  {
    id: 'art-36',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 36,
    title: 'Freedom of association',
    content: 'Every person has the right to freedom of association, which includes the right to form, join or participate in the activities of an association of any kind. A person shall not be compelled to join an association of any kind.',
    keywords: ['association', 'groups', 'membership']
  },
  {
    id: 'art-37',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 37,
    title: 'Assembly, demonstration, picketing and petition',
    content: 'Every person has the right, peaceably and unarmed, to assemble, to demonstrate, to picket, and to present petitions to public authorities.',
    keywords: ['protest', 'assemble', 'demonstrate', 'picket', 'petition']
  },
  {
    id: 'art-38',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 38,
    title: 'Political rights',
    content: 'Every citizen is free to make political choices, which includes the right to form, or participate in forming, a political party; to participate in the activities of, or recruit members for, a political party; and to campaign for a political party or cause.',
    keywords: ['politics', 'voting', 'election', 'parties']
  },
  {
    id: 'art-39',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 39,
    title: 'Freedom of movement and residence',
    content: 'Every person has the right to freedom of movement. Every person has the right to leave Kenya. Every citizen has the right to enter, remain in and reside anywhere in Kenya.',
    keywords: ['movement', 'residence', 'travel', 'passport']
  },
  {
    id: 'art-40',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 40,
    title: 'Protection of right to property',
    content: 'Every person has the right, either individually or in association with others, to acquire and own property of any description and in any part of Kenya. Parliament shall not enact a law that permits the State or any person to arbitrarily deprive a person of property.',
    keywords: ['property', 'land', 'ownership', 'assets']
  },
  {
    id: 'art-41',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 41,
    title: 'Labour relations',
    content: 'Every person has the right to fair labour practices. Every worker has the right to fair remuneration; to reasonable working conditions; to form, join or participate in the activities and programmes of a trade union; and to go on strike.',
    keywords: ['labour', 'workers', 'unions', 'strike', 'employment']
  },
  {
    id: 'art-42',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 42,
    title: 'Environment',
    content: 'Every person has the right to a clean and healthy environment, which includes the right to have the environment protected for the benefit of present and future generations through legislative and other measures.',
    keywords: ['environment', 'pollution', 'conservation']
  },
  {
    id: 'art-43',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 43,
    title: 'Economic and social rights',
    content: 'Every person has the right to the highest attainable standard of health; to accessible and adequate housing, and to reasonable standards of sanitation; to be free from hunger, and to have adequate food; to clean and safe water; to social security; and to education.',
    keywords: ['health', 'housing', 'water', 'food', 'education', 'social security']
  },
  {
    id: 'art-44',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 44,
    title: 'Language and culture',
    content: 'Every person has the right to use the language, and to participate in the cultural life, of the person’s choice. A person belonging to a cultural or linguistic community has the right, with other members of that community, to enjoy the person’s culture and use the person’s language.',
    keywords: ['language', 'culture', 'heritage']
  },
  {
    id: 'art-45',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 45,
    title: 'Family',
    content: 'The family is the natural and fundamental unit of society and the necessary basis of social order. Every adult has the right to marry a person of the opposite sex, based on the free consent of the parties.',
    keywords: ['family', 'marriage', 'society']
  },
  {
    id: 'art-46',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 46,
    title: 'Consumer rights',
    content: 'Consumers have the right to goods and services of reasonable quality; to the information necessary for them to gain full benefit from goods and services; to the protection of their health, safety, and economic interests.',
    keywords: ['consumer', 'quality', 'safety', 'refund']
  },
  {
    id: 'art-47',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 47,
    title: 'Fair administrative action',
    content: 'Every person has the right to administrative action that is expeditious, efficient, lawful, reasonable and procedurally fair. If a right or fundamental freedom has been or is likely to be adversely affected by administrative action, the person has the right to be given written reasons for the action.',
    keywords: ['administration', 'fairness', 'due process', 'efficiency']
  },
  {
    id: 'art-48',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 48,
    title: 'Access to justice',
    content: 'The State shall ensure access to justice for all persons and, if any fee is required, it shall be reasonable and shall not impede access to justice.',
    keywords: ['justice', 'courts', 'legal aid', 'access']
  },
  {
    id: 'art-49',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 49,
    title: 'Rights of arrested persons',
    content: 'An arrested person has the right to be informed promptly of the reason for the arrest; the right to remain silent; the right to communicate with an advocate; and to be brought before a court as soon as reasonably possible, but not later than twenty-four hours after being arrested.',
    keywords: ['arrest', 'police', 'silent', 'advocate', 'bail']
  },
  {
    id: 'art-50',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 50,
    title: 'Fair hearing',
    content: 'Every person has the right to have any dispute that can be resolved by the application of law decided in a fair and public hearing before a court or, if appropriate, another independent and impartial tribunal or body.',
    keywords: ['hearing', 'court', 'trial', 'evidence', 'defense']
  },
  {
    id: 'art-51',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 51,
    title: 'Rights of persons detained, held in custody or imprisoned',
    content: 'A person who is detained, held in custody or imprisoned retains all the rights and fundamental freedoms in the Bill of Rights, except to the extent that a right or a fundamental freedom is clearly incompatible with the fact that the person is detained.',
    keywords: ['detention', 'prison', 'custody', 'prisoner rights']
  },
  {
    id: 'art-52',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 52,
    title: 'Interpretation of this Part',
    content: 'This Part shall be interpreted in a manner that promotes the purposes and objects of the Bill of Rights. In interpreting the Bill of Rights, a court, tribunal or other authority shall promote the values that underlie an open and democratic society.',
    keywords: ['interpretation', 'values', 'democracy']
  },
  {
    id: 'art-53',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 53,
    title: 'Children',
    content: 'Every child has the right to a name and nationality from birth; to free and compulsory basic education; to basic nutrition, shelter and health care; to be protected from abuse, neglect and hazardous or exploitative labour.',
    keywords: ['children', 'education', 'nutrition', 'protection']
  },
  {
    id: 'art-54',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 54,
    title: 'Persons with disabilities',
    content: 'A person with any disability is entitled to be treated with dignity and respect; to access educational institutions and facilities for persons with disabilities that are integrated into society; and to reasonable access to all places, public transport and information.',
    keywords: ['disability', 'dignity', 'access', 'braille', 'sign language']
  },
  {
    id: 'art-55',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 55,
    title: 'Youth',
    content: 'The State shall take measures to ensure that the youth access relevant education and training; have opportunities to associate, be represented and participate in political, social, economic and other spheres of life; and are protected from exploitation.',
    keywords: ['youth', 'employment', 'representation']
  },
  {
    id: 'art-56',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 56,
    title: 'Minorities and marginalised groups',
    content: 'The State shall put in place affirmative action programmes designed to ensure that minorities and marginalised groups participate and are represented in governance; are provided special opportunities in educational and economic fields; and have reasonable access to water, health services and infrastructure.',
    keywords: ['minorities', 'marginalised', 'affirmative action']
  },
  {
    id: 'art-57',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 57,
    title: 'Older members of society',
    content: 'The State shall take measures to ensure the rights of older persons to fully participate in the affairs of society; to pursue their personal development; to live in dignity and respect and be free from abuse; and to receive reasonable care and assistance.',
    keywords: ['older persons', 'elders', 'aging', 'dignity']
  },
  {
    id: 'art-58',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 58,
    title: 'State of emergency',
    content: 'A state of emergency may be declared only by the President. A declaration of a state of emergency shall have effect for not more than fourteen days, unless the National Assembly resolves to extend the declaration.',
    keywords: ['emergency', 'president', 'parliament', 'security']
  },
  {
    id: 'art-59',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 59,
    title: 'Kenya National Human Rights and Equality Commission',
    content: 'There is established the Kenya National Human Rights and Equality Commission. The functions of the Commission are to promote respect for human rights and develop a culture of human rights in the Republic.',
    keywords: ['KNCHR', 'commission', 'human rights', 'equality']
  },

  // Chapter 5: Land and Environment
  {
    id: 'art-60',
    chapter: 'Chapter 5: Land and Environment',
    number: 60,
    title: 'Principles of land policy',
    content: 'Land in Kenya shall be held, used and managed in a manner that is equitable, efficient, productive and sustainable.',
    keywords: ['land', 'policy', 'equity', 'sustainability']
  },
  {
    id: 'art-61',
    chapter: 'Chapter 5: Land and Environment',
    number: 61,
    title: 'Classification of land',
    content: 'All land in Kenya belongs to the people of Kenya collectively as a nation, as communities and as individuals. Land is classified as public, community or private land.',
    keywords: ['land', 'classification', 'public', 'private', 'community']
  },
  {
    id: 'art-62',
    chapter: 'Chapter 5: Land and Environment',
    number: 62,
    title: 'Public land',
    content: 'Public land includes land which at the effective date was unalienated government land, land used or occupied by any State organ, and land in respect of which no individual or community ownership can be established.',
    keywords: ['public land', 'government land']
  },
  {
    id: 'art-63',
    chapter: 'Chapter 5: Land and Environment',
    number: 63,
    title: 'Community land',
    content: 'Community land shall vest in and be held by communities identified on the basis of ethnicity, culture or similar community of interest.',
    keywords: ['community land', 'trust land']
  },
  {
    id: 'art-64',
    chapter: 'Chapter 5: Land and Environment',
    number: 64,
    title: 'Private land',
    content: 'Private land consists of registered land held by any person under any freehold tenure; land held by any person under leasehold tenure; and any other land declared to be private land under an Act of Parliament.',
    keywords: ['private land', 'freehold', 'leasehold']
  },
  {
    id: 'art-65',
    chapter: 'Chapter 5: Land and Environment',
    number: 65,
    title: 'Landholding by non-citizens',
    content: 'A person who is not a citizen may hold land on the basis of leasehold tenure only, and any such lease, however granted, shall not exceed ninety-nine years.',
    keywords: ['non-citizens', 'leasehold', '99 years']
  },
  {
    id: 'art-66',
    chapter: 'Chapter 5: Land and Environment',
    number: 66,
    title: 'Regulation of land use and property',
    content: 'The State may regulate the use of any land, or any interest in or right over any land, in the interest of defence, public safety, public order, public morality, public health, or land use planning.',
    keywords: ['regulation', 'land use', 'planning', 'property']
  },
  {
    id: 'art-67',
    chapter: 'Chapter 5: Land and Environment',
    number: 67,
    title: 'National Land Commission',
    content: 'The functions of the National Land Commission are to manage public land on behalf of the national and county governments, and to recommend a national land policy.',
    keywords: ['NLC', 'commission', 'land management']
  },
  {
    id: 'art-68',
    chapter: 'Chapter 5: Land and Environment',
    number: 68,
    title: 'Legislation on land',
    content: 'Parliament shall enact legislation to revise, consolidate and rationalise existing land laws; and to prescribe minimum and maximum residential land sizes.',
    keywords: ['land laws', 'parliament', 'acreage']
  },
  {
    id: 'art-69',
    chapter: 'Chapter 5: Land and Environment',
    number: 69,
    title: 'Obligations in respect of the environment',
    content: 'The State shall ensure sustainable exploitation, utilisation, management and conservation of the environment and natural resources.',
    keywords: ['environment', 'conservation', 'resources', 'sustainability']
  },
  {
    id: 'art-70',
    chapter: 'Chapter 5: Land and Environment',
    number: 70,
    title: 'Enforcement of environmental rights',
    content: 'If a person alleges that a right to a clean and healthy environment has been, is being or is likely to be, denied, violated, infringed or threatened, the person may apply to a court for redress.',
    keywords: ['environmental rights', 'court', 'redress']
  },
  {
    id: 'art-71',
    chapter: 'Chapter 5: Land and Environment',
    number: 71,
    title: 'Agreements relating to natural resources',
    content: 'A transaction involving the grant of a right or concession by or on behalf of any person, including the national government, to another person for the exploitation of any natural resource of Kenya is subject to ratification by Parliament.',
    keywords: ['natural resources', 'ratification', 'parliament', 'concessions']
  },
  {
    id: 'art-72',
    chapter: 'Chapter 5: Land and Environment',
    number: 72,
    title: 'Legislation relating to the environment',
    content: 'Parliament shall enact legislation to give full effect to the provisions of this Part (Environment and Natural Resources).',
    keywords: ['environment', 'legislation', 'parliament']
  },

  // Chapter 6: Leadership and Integrity
  {
    id: 'art-73',
    chapter: 'Chapter 6: Leadership and Integrity',
    number: 73,
    title: 'Responsibilities of leadership',
    content: 'Authority assigned to a State officer is a public trust to be exercised in a manner that is consistent with the purposes and objects of this Constitution, brings honour to the nation and dignity to the office, and promotes public confidence.',
    keywords: ['trust', 'integrity', 'responsibility', 'leadership']
  },
  {
    id: 'art-74',
    chapter: 'Chapter 6: Leadership and Integrity',
    number: 74,
    title: 'Oath of office of State officers',
    content: 'Before assuming office, or performing any functions of office, each State officer shall take and subscribe the oath or solemn affirmation of office as prescribed in the Third Schedule.',
    keywords: ['oath', 'affirmation', 'inauguration']
  },
  {
    id: 'art-75',
    chapter: 'Chapter 6: Leadership and Integrity',
    number: 75,
    title: 'Conduct of State officers',
    content: 'A State officer shall behave, whether in public and official life, in private life, or in association with other persons, in a manner that avoids any conflict between personal interests and public or official duties.',
    keywords: ['conduct', 'ethics', 'conflict of interest']
  },
  {
    id: 'art-76',
    chapter: 'Chapter 6: Leadership and Integrity',
    number: 76,
    title: 'Financial probity of State officers',
    content: 'A gift or donation to a State officer on a public or official occasion is a gift or donation to the Republic. A State officer shall not maintain a bank account outside Kenya except in accordance with an Act of Parliament.',
    keywords: ['financial probity', 'gifts', 'foreign accounts', 'corruption']
  },
  {
    id: 'art-77',
    chapter: 'Chapter 6: Leadership and Integrity',
    number: 77,
    title: 'Restriction on activities of State officers',
    content: 'A full-time State officer shall not participate in any other gainful employment. Any appointed State officer shall not hold office in a political party.',
    keywords: ['restrictions', 'employment', 'political office']
  },
  {
    id: 'art-78',
    chapter: 'Chapter 6: Leadership and Integrity',
    number: 78,
    title: 'Citizenship and leadership',
    content: 'A person is not eligible for election or appointment to a State office unless the person is a citizen of Kenya. A State officer or a member of the defence forces shall not be a citizen of another country.',
    keywords: ['citizenship', 'eligibility', 'dual citizenship']
  },
  {
    id: 'art-79',
    chapter: 'Chapter 6: Leadership and Integrity',
    number: 79,
    title: 'Ethics and Anti-Corruption Commission',
    content: 'Parliament shall establish an ethics and anti-corruption commission, which shall have the status and powers of a commission under Chapter Fifteen.',
    keywords: ['EACC', 'corruption', 'ethics']
  },
  {
    id: 'art-80',
    chapter: 'Chapter 6: Leadership and Integrity',
    number: 80,
    title: 'Legislation on leadership',
    content: 'Parliament shall enact legislation establishing procedures and mechanisms for the effective administration of this Chapter.',
    keywords: ['leadership law', 'integrity act', 'legislation']
  },

  // Chapter 7: Representation of the People
  {
    id: 'art-81',
    chapter: 'Chapter 7: Representation of the People',
    number: 81,
    title: 'General principles for the electoral system',
    content: 'The electoral system shall comply with the following principles: freedom of citizens to exercise their political rights; not more than two-thirds of the members of elective public bodies shall be of the same gender; fair representation of persons with disabilities; universal suffrage.',
    keywords: ['election', 'vote', 'representation', 'gender rule']
  },
  {
    id: 'art-82',
    chapter: 'Chapter 7: Representation of the People',
    number: 82,
    title: 'Legislation on elections',
    content: 'Parliament shall enact legislation to provide for: the delimitation of electoral units; nomination of candidates; continuous registration of citizens as voters; the conduct of elections and referenda and the regulation and efficient supervision of elections and referenda.',
    keywords: ['legislation', 'elections', 'voter registration']
  },
  {
    id: 'art-83',
    chapter: 'Chapter 7: Representation of the People',
    number: 83,
    title: 'Registration as a voter',
    content: 'A person qualifies for registration as a voter if the person: is an adult citizen; is not declared to be of unsound mind; and has not been convicted of an election offence during the preceding five years.',
    keywords: ['voter registration', 'qualifications', 'citizen']
  },
  {
    id: 'art-84',
    chapter: 'Chapter 7: Representation of the People',
    number: 84,
    title: 'Candidates for election and commissions',
    content: 'In every election, all candidates and all political parties shall comply with the code of conduct prescribed by the Independent Electoral and Boundaries Commission.',
    keywords: ['candidates', 'code of conduct', 'IEBC']
  },
  {
    id: 'art-85',
    chapter: 'Chapter 7: Representation of the People',
    number: 85,
    title: 'Eligibility for election as independent candidate',
    content: 'Any person is eligible to stand as an independent candidate for election if the person: is not a member of a registered political party and has not been a member for at least three months immediately before the relevant election.',
    keywords: ['independent candidate', 'eligibility']
  },
  {
    id: 'art-86',
    chapter: 'Chapter 7: Representation of the People',
    number: 86,
    title: 'Voting',
    content: 'At every election, the Independent Electoral and Boundaries Commission shall ensure that: the method of voting is simple, accurate, verifiable, secure, accountable and transparent.',
    keywords: ['voting', 'transparency', 'accountability']
  },
  {
    id: 'art-87',
    chapter: 'Chapter 7: Representation of the People',
    number: 87,
    title: 'Electoral disputes',
    content: 'Parliament shall enact legislation to establish mechanisms for timely settling of electoral disputes. Petitions concerning an election, other than a presidential election, shall be filed within twenty-eight days after the declaration of the election results.',
    keywords: ['electoral disputes', 'petitions', 'court']
  },
  {
    id: 'art-88',
    chapter: 'Chapter 7: Representation of the People',
    number: 88,
    title: 'Independent Electoral and Boundaries Commission',
    content: 'There is established the Independent Electoral and Boundaries Commission (IEBC) responsible for conducting or supervising referenda and elections to any elective body established by this Constitution.',
    keywords: ['IEBC', 'elections', 'boundaries', 'voting']
  },
  {
    id: 'art-89',
    chapter: 'Chapter 7: Representation of the People',
    number: 89,
    title: 'Delimitation of electoral units',
    content: 'There shall be two hundred and ninety constituencies for the purposes of the election of the members of the National Assembly. The Independent Electoral and Boundaries Commission shall review the names and boundaries of constituencies at intervals of not less than eight years, and not more than twelve years.',
    keywords: ['constituencies', 'boundaries', 'IEBC', 'delimitation']
  },
  {
    id: 'art-90',
    chapter: 'Chapter 7: Representation of the People',
    number: 90,
    title: 'Allocation of party list seats',
    content: 'The Independent Electoral and Boundaries Commission shall be responsible for the substitution of candidates on a party list and for the allocation of seats from those lists. The system shall be based on proportional representation.',
    keywords: ['party list', 'proportional representation', 'seats']
  },
  {
    id: 'art-91',
    chapter: 'Chapter 7: Representation of the People',
    number: 91,
    title: 'Basic requirements for political parties',
    content: 'Every political party shall have a national character; have a democratically elected governing body; promote and uphold national unity; abide by the democratic principles of good governance.',
    keywords: ['party', 'politics', 'requirements', 'democracy']
  },
  {
    id: 'art-92',
    chapter: 'Chapter 7: Representation of the People',
    number: 92,
    title: 'Legislation on political parties',
    content: 'Parliament shall enact legislation to provide for: the registration, regulation and supervision of political parties; the establishment and management of a political parties fund; and the account-ability of political parties.',
    keywords: ['legislation', 'political parties', 'funding']
  },

  // Chapter 8: The Legislature
  {
    id: 'art-93',
    chapter: 'Chapter 8: The Legislature',
    number: 93,
    title: 'Establishment of Parliament',
    content: 'There is established a Parliament of Kenya, which shall consist of the National Assembly and the Senate.',
    keywords: ['parliament', 'national assembly', 'senate', 'bicameral']
  },
  {
    id: 'art-94',
    chapter: 'Chapter 8: The Legislature',
    number: 94,
    title: 'Role of Parliament',
    content: 'The legislative authority of the Republic is derived from the people and, at the national level, is vested in and exercised by Parliament.',
    keywords: ['parliament', 'laws', 'legislature', 'authority']
  },
  {
    id: 'art-95',
    chapter: 'Chapter 8: The Legislature',
    number: 95,
    title: 'Role of the National Assembly',
    content: 'The National Assembly represents the people of the constituencies and special interests. It deliberates on and resolves issues of concern to the people, enacts legislation, and exercises oversight over national revenue and its expenditure.',
    keywords: ['national assembly', 'oversight', 'legislation', 'revenue']
  },
  {
    id: 'art-96',
    chapter: 'Chapter 8: The Legislature',
    number: 96,
    title: 'Role of the Senate',
    content: 'The Senate represents the counties, and serves to protect the interests of the counties and their governments. The Senate participates in the law-making function of Parliament by considering, debating and approving Bills concerning counties.',
    keywords: ['senate', 'counties', 'legislation', 'devolution']
  },
  {
    id: 'art-97',
    chapter: 'Chapter 8: The Legislature',
    number: 97,
    title: 'Membership of the National Assembly',
    content: 'The National Assembly consists of two hundred and ninety members, each elected by the registered voters of single member constituencies; forty-seven women, each elected by the registered voters of the counties; and twelve members nominated by political parties.',
    keywords: ['national assembly', 'membership', 'constituencies', 'nominations']
  },
  {
    id: 'art-98',
    chapter: 'Chapter 8: The Legislature',
    number: 98,
    title: 'Membership of the Senate',
    content: 'The Senate consists of forty-seven members each elected by the registered voters of the counties; sixteen women members who shall be nominated by political parties; two members, being one man and one woman, representing the youth; and two members, being one man and one woman, representing persons with disabilities.',
    keywords: ['senate', 'membership', 'nominations', 'youth', 'disability']
  },
  {
    id: 'art-99',
    chapter: 'Chapter 8: The Legislature',
    number: 99,
    title: 'Qualifications for election as member of Parliament',
    content: 'Unless disqualified under Article 101, a person is eligible for election as a member of Parliament if the person: is registered as a voter; satisfies any educational, moral and ethical requirements prescribed by this Constitution or by an Act of Parliament.',
    keywords: ['qualifications', 'eligibility', 'elections']
  },
  {
    id: 'art-100',
    chapter: 'Chapter 8: The Legislature',
    number: 100,
    title: 'Promotion of representation of marginalised groups',
    content: 'Parliament shall enact legislation to promote the representation in Parliament of: women; persons with disabilities; youth; ethnic and other minorities; and marginalised communities.',
    keywords: ['marginalised', 'representation', 'affirmative action']
  },
  {
    id: 'art-101',
    chapter: 'Chapter 8: The Legislature',
    number: 101,
    title: 'Election of members of Parliament',
    content: 'A general election of members of Parliament shall be held on the second Tuesday in August in every fifth year.',
    keywords: ['election', 'calendar', 'voting']
  },
  {
    id: 'art-102',
    chapter: 'Chapter 8: The Legislature',
    number: 102,
    title: 'Term of Parliament',
    content: 'The term of each House of Parliament expires on the date of the next general election. When Kenya is at war, Parliament may from time to time extend the term of Parliament by not more than six months at a time.',
    keywords: ['term', 'duration', 'war', 'extension']
  },
  {
    id: 'art-103',
    chapter: 'Chapter 8: The Legislature',
    number: 103,
    title: 'Vacation of office of member of Parliament',
    content: 'The office of a member of Parliament becomes vacant: if the member dies; if the member is absent from eight sittings of the relevant House without permission in writing from the Speaker; if the member resigns from Parliament in writing to the Speaker.',
    keywords: ['vacancies', 'resignation', 'absenteeism']
  },
  {
    id: 'art-104',
    chapter: 'Chapter 8: The Legislature',
    number: 104,
    title: 'Right of recall',
    content: 'The electorate under Articles 97 and 98 have the right to recall the member of Parliament elected by them before the end of the term of the relevant House of Parliament.',
    keywords: ['recall', 'electorate', 'accountability']
  },
  {
    id: 'art-105',
    chapter: 'Chapter 8: The Legislature',
    number: 105,
    title: 'Determination of questions of membership',
    content: 'The High Court shall hear and determine any question whether: a person has been validly elected as a member of Parliament; or the seat of a member has become vacant.',
    keywords: ['high court', 'membership disputes', 'eligibility']
  },
  {
    id: 'art-106',
    chapter: 'Chapter 8: The Legislature',
    number: 106,
    title: 'Speakers and Deputy Speakers of Parliament',
    content: 'There shall be a Speaker for each House of Parliament, who shall be elected by that House in accordance with the Standing Orders.',
    keywords: ['speaker', 'parliament', 'house']
  },
  {
    id: 'art-107',
    chapter: 'Chapter 8: The Legislature',
    number: 107,
    title: 'Presiding in Parliament',
    content: 'At any sitting of a House of Parliament, the Speaker shall preside. If the Speaker is absent, the Deputy Speaker or a member of that House elected by the House for that purpose shall preside.',
    keywords: ['presiding', 'speaker', 'deputy speaker']
  },
  {
    id: 'art-108',
    chapter: 'Chapter 8: The Legislature',
    number: 108,
    title: 'Party leaders',
    content: 'There shall be a leader of the majority party and a leader of the minority party in the National Assembly. The leader of the majority party shall be the person who is the leader in the National Assembly of the largest party or coalition of parties.',
    keywords: ['majority leader', 'minority leader', 'coalition']
  },
  {
    id: 'art-109',
    chapter: 'Chapter 8: The Legislature',
    number: 109,
    title: 'Exercise of legislative powers',
    content: 'Parliament shall exercise its legislative power through Bills passed by Parliament and assented to by the President. Any Bill may originate in the National Assembly.',
    keywords: ['legislative power', 'bills', 'assent']
  },
  {
    id: 'art-110',
    chapter: 'Chapter 8: The Legislature',
    number: 110,
    title: 'Bills concerning county government',
    content: 'A Bill concerning county government is a Bill which contains provisions that affect the functions and powers of the county governments. Such Bills must be considered by both Houses.',
    keywords: ['county bills', 'counties', 'senate']
  },
  {
    id: 'art-111',
    chapter: 'Chapter 8: The Legislature',
    number: 111,
    title: 'Special Bills concerning county governments',
    content: 'A special Bill concerning county governments is a Bill that relates to the election of members of a county assembly or a county executive. It may be passed by the National Assembly and then the Senate.',
    keywords: ['special bills', 'county assembly', 'elections']
  },
  {
    id: 'art-112',
    chapter: 'Chapter 8: The Legislature',
    number: 112,
    title: 'Ordinary Bills concerning county governments',
    content: 'An ordinary Bill concerning county governments is a Bill that is not a special Bill. If one House passes an ordinary Bill and the other House rejects it, the Bill shall be referred to a mediation committee.',
    keywords: ['ordinary bills', 'mediation', 'disagreement']
  },
  {
    id: 'art-113',
    chapter: 'Chapter 8: The Legislature',
    number: 113,
    title: 'Mediation committees',
    content: 'If the Houses are unable to agree on a Bill, the Speakers of both Houses shall appoint a mediation committee consisting of an equal number of members from each House to attempt to develop a version of the Bill that both Houses will pass.',
    keywords: ['mediation committee', 'consensus', 'joint committee']
  },
  {
    id: 'art-114',
    chapter: 'Chapter 8: The Legislature',
    number: 114,
    title: 'Money Bills',
    content: 'A money Bill is a Bill that contains provisions dealing with taxes, the appropriation of money, or the raising of any loan by the Government. Only the National Assembly may originate a money Bill.',
    keywords: ['money bill', 'taxes', 'budget', 'appropriation']
  },
  {
    id: 'art-115',
    chapter: 'Chapter 8: The Legislature',
    number: 115,
    title: 'Presidential assent and referral',
    content: 'Within fourteen days after receipt of a Bill, the President shall assent to the Bill or refer the Bill back to Parliament for reconsideration, noting any reservations that the President has concerning the Bill.',
    keywords: ['presidential assent', 'referral', 'veto', 'reservations']
  },
  {
    id: 'art-116',
    chapter: 'Chapter 8: The Legislature',
    number: 116,
    title: 'Coming into force of laws',
    content: 'A Bill passed by Parliament and assented to by the President shall be published in the Gazette within seven days after assent. It shall come into force on the fourteenth day after its publication.',
    keywords: ['force of law', 'gazette', 'publication', 'enactment']
  },
  {
    id: 'art-117',
    chapter: 'Chapter 8: The Legislature',
    number: 117,
    title: 'Powers, privileges and immunities',
    content: 'There shall be freedom of speech and debate in Parliament. No civil or criminal proceedings may be instituted against a member of Parliament for anything said or done in Parliament or its committees.',
    keywords: ['privileges', 'immunity', 'speech', 'debate']
  },
  {
    id: 'art-118',
    chapter: 'Chapter 8: The Legislature',
    number: 118,
    title: 'Public access and participation',
    content: 'Parliament shall: facilitate public participation in the legislative and other business of Parliament and its committees; and conduct its business in an open manner, and its sittings and those of its committees shall be in public.',
    keywords: ['public participation', 'transparency', 'openness']
  },
  {
    id: 'art-119',
    chapter: 'Chapter 8: The Legislature',
    number: 119,
    title: 'Right to petition Parliament',
    content: 'Every person has a right to petition Parliament to enact, amend or repeal any legislation. Parliament shall make provision for the procedure for the exercise of this right.',
    keywords: ['petition', 'citizens', 'legislative changes']
  },
  {
    id: 'art-120',
    chapter: 'Chapter 8: The Legislature',
    number: 120,
    title: 'Official languages of Parliament',
    content: 'The official languages of Parliament shall be Kiswahili, English and Kenyan Sign Language, and the business of Parliament may be conducted in any of those languages.',
    keywords: ['language', 'kiswahili', 'english', 'sign language']
  },
  {
    id: 'art-121',
    chapter: 'Chapter 8: The Legislature',
    number: 121,
    title: 'Quorum',
    content: 'The quorum of the National Assembly shall be fifty members. The quorum of the Senate shall be fifteen members.',
    keywords: ['quorum', 'participation', 'session']
  },
  {
    id: 'art-122',
    chapter: 'Chapter 8: The Legislature',
    number: 122,
    title: 'Voting in Parliament',
    content: 'Except as otherwise provided in this Constitution, any question proposed for decision in either House shall be determined by a majority of the members in that House, present and voting.',
    keywords: ['voting', 'majority', 'decisions']
  },
  {
    id: 'art-123',
    chapter: 'Chapter 8: The Legislature',
    number: 123,
    title: 'Decisions of Senate',
    content: 'On a question proposed for decision in the Senate: each county shall have one vote to be cast by the head of the county delegation or, in that person’s absence, by another member of the delegation.',
    keywords: ['senate decisions', 'county vote', 'delegation']
  },
  {
    id: 'art-124',
    chapter: 'Chapter 8: The Legislature',
    number: 124,
    title: 'Committees and Standing Orders',
    content: 'Each House of Parliament may establish committees, and shall make Standing Orders for the orderly conduct of its proceedings, including the proceedings of its committees.',
    keywords: ['committees', 'standing orders', 'procedure']
  },
  {
    id: 'art-125',
    chapter: 'Chapter 8: The Legislature',
    number: 125,
    title: 'Power to call for evidence',
    content: 'Either House of Parliament, and any of its committees, has power to summon any person to appear before it for the purpose of giving evidence or providing information.',
    keywords: ['evidence', 'summon', 'witness', 'oversight']
  },
  {
    id: 'art-126',
    chapter: 'Chapter 8: The Legislature',
    number: 126,
    title: 'Location of sittings of Parliament',
    content: 'A sitting of either House may be held at any place within Kenya and may commence at any time that the House appoints.',
    keywords: ['location', 'sittings', 'parliamentary calendar']
  },
  {
    id: 'art-127',
    chapter: 'Chapter 8: The Legislature',
    number: 127,
    title: 'Parliamentary Service Commission',
    content: 'There is established the Parliamentary Service Commission, which consists of the Speaker of the National Assembly as chairperson, and other members representing both Houses.',
    keywords: ['PSC', 'administration', 'staffing', 'welfare']
  },
  {
    id: 'art-128',
    chapter: 'Chapter 8: The Legislature',
    number: 128,
    title: 'Clerks and staff of Parliament',
    content: 'There shall be a Clerk for each House of Parliament, and such other offices in the parliamentary service as may be established by the Parliamentary Service Commission.',
    keywords: ['clerks', 'parliamentary staff', 'civil service']
  },

  // Chapter 9: The Executive
  {
    id: 'art-129',
    chapter: 'Chapter 9: The Executive',
    number: 129,
    title: 'Principles of executive authority',
    content: 'Executive authority derives from the people of Kenya and shall be exercised in a manner compatible with the principle of service to the people of Kenya, and for their well-being and benefit.',
    keywords: ['executive', 'authority', 'service', 'people']
  },
  {
    id: 'art-130',
    chapter: 'Chapter 9: The Executive',
    number: 130,
    title: 'The National Executive',
    content: 'The national executive of the Republic comprises the President, the Deputy President and the Cabinet.',
    keywords: ['president', 'executive', 'cabinet', 'deputy president']
  },
  {
    id: 'art-131',
    chapter: 'Chapter 9: The Executive',
    number: 131,
    title: 'Authority of the President',
    content: 'The President is the Head of State and Government, and Commander-in-Chief of the Kenya Defence Forces. The President shall be a symbol of national unity.',
    keywords: ['president', 'commander', 'chief', 'unity']
  },
  {
    id: 'art-132',
    chapter: 'Chapter 9: The Executive',
    number: 132,
    title: 'Functions of the President',
    content: 'The President shall address the opening of each newly elected Parliament; address a special sitting of Parliament once every year; and may, with the approval of Parliament, appoint high commissioners, ambassadors, and diplomatic and consular representatives.',
    keywords: ['president', 'functions', 'parliament', 'appointments']
  },
  {
    id: 'art-133',
    chapter: 'Chapter 9: The Executive',
    number: 133,
    title: 'Power of mercy',
    content: 'On the petition of any person, the President may exercise a power of mercy in accordance with the advice of the Advisory Committee, by granting a free or conditional pardon to a person convicted of an offence.',
    keywords: ['mercy', 'pardon', 'conviction', 'president']
  },
  {
    id: 'art-134',
    chapter: 'Chapter 9: The Executive',
    number: 134,
    title: 'Exercise of presidential powers during temporary incumbency',
    content: 'A person who holds the office of President or who is authorised in terms of this Constitution to exercise the powers of the President during a temporary incumbency may not exercise the power of mercy or the power to appoint or dismiss various high-ranking officials.',
    keywords: ['incumbency', 'temporary', 'powers']
  },
  {
    id: 'art-135',
    chapter: 'Chapter 9: The Executive',
    number: 135,
    title: 'Decisions of the President',
    content: 'A decision of the President in the performance of any function of the President under this Constitution shall be in writing and shall bear the seal and signature of the President.',
    keywords: ['decisions', 'writing', 'seal', 'signature']
  },
  {
    id: 'art-136',
    chapter: 'Chapter 9: The Executive',
    number: 136,
    title: 'Election of the President',
    content: 'The President shall be elected by registered voters in a national election. The presidential election shall be held on the same day as the general election for members of Parliament.',
    keywords: ['election', 'president', 'voters', 'national']
  },
  {
    id: 'art-137',
    chapter: 'Chapter 9: The Executive',
    number: 137,
    title: 'Qualifications for election as President',
    content: 'A person qualifies for nomination as a presidential candidate if the person: is a citizen by birth; is qualified to stand for election as a member of Parliament; and is nominated by a political party or is an independent candidate.',
    keywords: ['qualifications', 'president', 'nomination', 'citizen']
  },
  {
    id: 'art-138',
    chapter: 'Chapter 9: The Executive',
    number: 138,
    title: 'Procedure at presidential election',
    content: 'If only one candidate for President is nominated, that candidate shall be declared elected. A candidate shall be declared elected as President if the candidate receives more than half of all the votes cast and at least twenty-five per cent of the votes cast in each of more than half of the counties.',
    keywords: ['election procedure', 'votes', 'counties', 'majority']
  },
  {
    id: 'art-139',
    chapter: 'Chapter 9: The Executive',
    number: 139,
    title: 'Death before assuming office',
    content: 'If a President-elect dies before being declared elected as President, the Deputy President-elect shall be sworn in as President.',
    keywords: ['death', 'president-elect', 'succession']
  },
  {
    id: 'art-140',
    chapter: 'Chapter 9: The Executive',
    number: 140,
    title: 'Questions as to validity of presidential election',
    content: 'A person may file a petition in the Supreme Court to challenge the election of the President-elect within seven days after the date of the declaration of the results of the presidential election.',
    keywords: ['validity', 'supreme court', 'petition', 'challenge']
  },
  {
    id: 'art-141',
    chapter: 'Chapter 9: The Executive',
    number: 141,
    title: 'Assumption of office of President',
    content: 'The President-elect shall be sworn in on the first Tuesday following the fourteenth day after the date of the declaration of the result of the presidential election.',
    keywords: ['assumption', 'swearing-in', 'office']
  },
  {
    id: 'art-142',
    chapter: 'Chapter 9: The Executive',
    number: 142,
    title: 'Term of office of President',
    content: 'The President shall hold office for a term beginning on the date on which the President was sworn in, and ending when the person next elected President in accordance with Article 136 (2) is sworn in.',
    keywords: ['term', 'duration', 'service']
  },
  {
    id: 'art-143',
    chapter: 'Chapter 9: The Executive',
    number: 143,
    title: 'Protection from legal proceedings',
    content: 'Criminal proceedings shall not be instituted or continued in any court against the President or a person performing the functions of that office, during their tenure of office.',
    keywords: ['protection', 'immunity', 'legal proceedings']
  },
  {
    id: 'art-144',
    chapter: 'Chapter 9: The Executive',
    number: 144,
    title: 'Removal of President on grounds of incapacity',
    content: 'A member of the National Assembly, supported by at least a quarter of all the members, may move a motion for the investigation of the President’s physical or mental capacity to perform the functions of office.',
    keywords: ['removal', 'incapacity', 'medical', 'investigation']
  },
  {
    id: 'art-145',
    chapter: 'Chapter 9: The Executive',
    number: 145,
    title: 'Removal of President by impeachment',
    content: 'A member of the National Assembly, supported by at least a third of all the members, may move a motion for the impeachment of the President on various grounds including a gross violation of a provision of this Constitution.',
    keywords: ['impeachment', 'removal', 'violation', 'parliament']
  },
  {
    id: 'art-146',
    chapter: 'Chapter 9: The Executive',
    number: 146,
    title: 'Vacancy in the office of President',
    content: 'If the office of President becomes vacant, the Deputy President shall assume office as President for the remainder of the term of the President.',
    keywords: ['vacancy', 'succession', 'deputy president']
  },
  {
    id: 'art-147',
    chapter: 'Chapter 9: The Executive',
    number: 147,
    title: 'Functions of the Deputy President',
    content: 'The Deputy President shall be the principal assistant of the President and shall deputise for the President in the execution of the President’s functions. The Deputy President shall perform the functions conferred by this Constitution and any other functions the President may assign.',
    keywords: ['deputy president', 'assistant', 'deputise', 'functions']
  },
  {
    id: 'art-148',
    chapter: 'Chapter 9: The Executive',
    number: 148,
    title: 'Election and swearing-in of Deputy President',
    content: 'Each candidate in a presidential election shall nominate a person who is qualified for nomination for election as President, as a candidate for Deputy President. The Deputy President-elect shall be sworn in on the same day as the President-elect.',
    keywords: ['deputy president', 'election', 'swearing-in', 'nomination']
  },
  {
    id: 'art-149',
    chapter: 'Chapter 9: The Executive',
    number: 149,
    title: 'Vacancy in the office of Deputy President',
    content: 'Within fourteen days after a vacancy arises in the office of Deputy President, the President shall nominate a person to fill the vacancy, and the National Assembly shall vote on the nomination within sixty days after receiving it.',
    keywords: ['vacancy', 'deputy president', 'nomination', 'appointment']
  },
  {
    id: 'art-150',
    chapter: 'Chapter 9: The Executive',
    number: 150,
    title: 'Removal of Deputy President',
    content: 'The Deputy President may be removed from office on various grounds including physical or mental incapacity to perform the functions of office, or impeachment on the same grounds as the President.',
    keywords: ['removal', 'deputy president', 'impeachment', 'incapacity']
  },
  {
    id: 'art-151',
    chapter: 'Chapter 9: The Executive',
    number: 151,
    title: 'Remuneration and benefits of President and Deputy President',
    content: 'The remuneration, alleviation and other benefits of the President and Deputy President shall be a charge on the Consolidated Fund. The remuneration and benefits shall not be varied to their disadvantage during their term of office.',
    keywords: ['remuneration', 'benefits', 'salary']
  },
  {
    id: 'art-152',
    chapter: 'Chapter 9: The Executive',
    number: 152,
    title: 'The Cabinet',
    content: 'The Cabinet consists of the President, the Deputy President, the Attorney-General, and not fewer than fourteen and not more than twenty-two Cabinet Secretaries.',
    keywords: ['cabinet', 'secretaries', 'ministers']
  },
  {
    id: 'art-153',
    chapter: 'Chapter 9: The Executive',
    number: 153,
    title: 'Decisions, responsibility and accountability of the Cabinet',
    content: 'Decisions of the Cabinet shall be in writing. Cabinet Secretaries are accountable individually, and collectively, to the President for the exercise of their powers and the performance of their functions.',
    keywords: ['cabinet', 'decisions', 'accountability', 'responsibility']
  },
  {
    id: 'art-154',
    chapter: 'Chapter 9: The Executive',
    number: 154,
    title: 'Secretary to the Cabinet',
    content: 'There is established the office of Secretary to the Cabinet. The Secretary to the Cabinet shall be responsible, subject to the directions of the Cabinet, for arranging the business, and keeping the minutes, of the Cabinet.',
    keywords: ['secretary', 'cabinet', 'minutes']
  },
  {
    id: 'art-155',
    chapter: 'Chapter 9: The Executive',
    number: 155,
    title: 'Principal Secretaries',
    content: 'The President shall nominate, and with the approval of the National Assembly, appoint Principal Secretaries. Each State department shall be under the administration of a Principal Secretary.',
    keywords: ['principal secretaries', 'administration', 'departments']
  },
  {
    id: 'art-156',
    chapter: 'Chapter 9: The Executive',
    number: 156,
    title: 'Attorney-General',
    content: 'There is established the office of Attorney-General. The Attorney-General shall be the principal legal adviser to the Government, and shall represent the national government in court or in any other legal proceedings to which the national government is a party.',
    keywords: ['attorney-general', 'legal adviser', 'litigation']
  },
  {
    id: 'art-157',
    chapter: 'Chapter 9: The Executive',
    number: 157,
    title: 'Director of Public Prosecutions',
    content: 'There is established the office of Director of Public Prosecutions. The Director shall have power to institute and undertake criminal proceedings against any person before any court (other than a court martial) in respect of any offence alleged to have been committed.',
    keywords: ['DPP', 'prosecutions', 'criminal proceedings']
  },
  {
    id: 'art-158',
    chapter: 'Chapter 9: The Executive',
    number: 158,
    title: 'Removal and resignation of Director of Public Prosecutions',
    content: 'The Director of Public Prosecutions may be removed from office only on specific grounds including a gross violation of this Constitution. The process of removal involves a petition to the Public Service Commission.',
    keywords: ['removal', 'DPP', 'resignation', 'petition']
  },

  // Chapter 10: Judiciary
  {
    id: 'art-159',
    chapter: 'Chapter 10: Judiciary',
    number: 159,
    title: 'Judicial authority',
    content: 'Judicial authority is derived from the people and vests in, and shall be exercised by, the courts and tribunals established by or under this Constitution. Justice shall be done to all, irrespective of status, and shall not be delayed.',
    keywords: ['courts', 'judiciary', 'justice', 'authority']
  },
  {
    id: 'art-160',
    chapter: 'Chapter 10: Judiciary',
    number: 160,
    title: 'Independence of the Judiciary',
    content: 'In the exercise of judicial authority, the Judiciary shall be subject only to this Constitution and the law and shall not be subject to the control or direction of any person or authority.',
    keywords: ['independence', 'judiciary', 'law', 'autonomy']
  },
  {
    id: 'art-161',
    chapter: 'Chapter 10: Judiciary',
    number: 161,
    title: 'Judicial offices and officers',
    content: 'The Judiciary shall consist of the judges of the superior courts, magistrates, other judicial officers and staff. The Chief Justice shall be the Head of the Judiciary.',
    keywords: ['chief justice', 'judicial officers', 'staff']
  },
  {
    id: 'art-162',
    chapter: 'Chapter 10: Judiciary',
    number: 162,
    title: 'System of courts',
    content: 'The superior courts are the Supreme Court, the Court of Appeal, the High Court and the courts referred to in clause (2). Parliament shall establish courts with the status of the High Court to hear and determine disputes relating to employment and labour relations; and the environment and the use and occupation of, and title to, land.',
    keywords: ['superior courts', 'subordinate courts', 'specialised courts', 'labour', 'environment']
  },
  {
    id: 'art-163',
    chapter: 'Chapter 10: Judiciary',
    number: 163,
    title: 'Supreme Court',
    content: 'There is established the Supreme Court, which shall consist of the Chief Justice, the Deputy Chief Justice and five other judges. The Supreme Court shall have exclusive original jurisdiction to hear and determine disputes relating to the elections to the office of President.',
    keywords: ['supreme court', 'chief justice', 'election disputes']
  },
  {
    id: 'art-164',
    chapter: 'Chapter 10: Judiciary',
    number: 164,
    title: 'Court of Appeal',
    content: 'There is established the Court of Appeal, which shall consist of the number of judges prescribed by an Act of Parliament, and shall be organised and administered in the manner prescribed by an Act of Parliament.',
    keywords: ['court of appeal', 'petitions']
  },
  {
    id: 'art-165',
    chapter: 'Chapter 10: Judiciary',
    number: 165,
    title: 'High Court',
    content: 'There is established the High Court, which shall have unlimited original jurisdiction in criminal and civil matters; and jurisdiction to determine the question whether a right or fundamental freedom in the Bill of Rights has been denied, violated, infringed or threatened.',
    keywords: ['high court', 'jurisdiction', 'bill of rights']
  },
  {
    id: 'art-166',
    chapter: 'Chapter 10: Judiciary',
    number: 166,
    title: 'Appointment of judges',
    content: 'The President shall appoint the Chief Justice and the Deputy Chief Justice, in accordance with the recommendation of the Judicial Service Commission, and subject to the approval of the National Assembly.',
    keywords: ['appointments', 'judges', 'chief justice', 'JSC']
  },
  {
    id: 'art-167',
    chapter: 'Chapter 10: Judiciary',
    number: 167,
    title: 'Tenure of office of the Chief Justice and other judges',
    content: 'A judge shall retire from office on attaining the age of seventy years, but may elect to retire at any time after attaining the age of sixty-five years. The Chief Justice shall hold office for a maximum of ten years or until retiring, whichever is the earlier.',
    keywords: ['tenure', 'retirement', 'term limits']
  },
  {
    id: 'art-168',
    chapter: 'Chapter 10: Judiciary',
    number: 168,
    title: 'Removal from office',
    content: 'A judge of a superior court may be removed from office only on the grounds of: inability to perform the functions of office arising from mental or physical incapacity; a breach of a code of conduct; or bankruptcy.',
    keywords: ['removal', 'misconduct', 'incapacity', 'tribunal']
  },
  {
    id: 'art-169',
    chapter: 'Chapter 10: Judiciary',
    number: 169,
    title: 'Subordinate courts',
    content: 'The subordinate courts are: the Magistrates courts; the Kadhis’ Courts; the Courts Martial; and any other court or local tribunal as may be established by an Act of Parliament.',
    keywords: ['subordinate courts', 'magistrates', 'courts martial']
  },
  {
    id: 'art-170',
    chapter: 'Chapter 10: Judiciary',
    number: 170,
    title: 'Kadhis’ Courts',
    content: 'There shall be a Chief Kadhi and such number, being not fewer than three, of other Kadhis as may be prescribed by or under an Act of Parliament. The jurisdiction of a Kadhis’ court shall be limited to the determination of questions of Muslim law relating to personal status, marriage, divorce or inheritance.',
    keywords: ['kadhi', 'muslim law', 'marriage', 'inheritance']
  },
  {
    id: 'art-171',
    chapter: 'Chapter 10: Judiciary',
    number: 171,
    title: 'Establishment of the Judicial Service Commission',
    content: 'There is established the Judicial Service Commission, which consists of the Chief Justice (Chairperson) and other members representing various stakeholders including judges, legal practitioners, and the public.',
    keywords: ['JSC', 'judiciary oversight', 'commission']
  },
  {
    id: 'art-172',
    chapter: 'Chapter 10: Judiciary',
    number: 172,
    title: 'Functions of the Judicial Service Commission',
    content: 'The Judicial Service Commission shall promote and facilitate the independence and accountability of the Judiciary and the efficient, effective and transparent administration of justice.',
    keywords: ['JSC functions', 'accountability', 'justice administration']
  },
  {
    id: 'art-173',
    chapter: 'Chapter 10: Judiciary',
    number: 173,
    title: 'Judiciary Fund',
    content: 'There is established a fund to be known as the Judiciary Fund which shall be administered by the Chief Registrar of the Judiciary. The Fund shall be used for the administrative expenses of the Judiciary and such other purposes as may be necessary for the discharge of the functions of the Judiciary.',
    keywords: ['judiciary fund', 'finance', 'budget', 'registrar']
  },

  // Chapter 11: Devolved Government
  {
    id: 'art-174',
    chapter: 'Chapter 11: Devolved Government',
    number: 174,
    title: 'Objects of devolution',
    content: 'The objects of the devolution of government are to promote democratic and accountable exercise of power; to foster national unity by recognising diversity; to give self-governance to the people and enhance the participation of the people in the exercise of the powers of the State.',
    keywords: ['devolution', 'counties', 'unity', 'participation']
  },
  {
    id: 'art-175',
    chapter: 'Chapter 11: Devolved Government',
    number: 175,
    title: 'Principles of devolved government',
    content: 'County governments established under this Constitution shall reflect the democratic and accountable exercise of power; and have reliable sources of revenue to enable them to govern and deliver services effectively.',
    keywords: ['county', 'government', 'democracy', 'revenue']
  },
  {
    id: 'art-176',
    chapter: 'Chapter 11: Devolved Government',
    number: 176,
    title: 'County governments',
    content: 'There shall be a county government for each county, consisting of a county assembly and a county executive.',
    keywords: ['county government', 'assembly', 'executive']
  },
  {
    id: 'art-177',
    chapter: 'Chapter 11: Devolved Government',
    number: 177,
    title: 'Membership of county assembly',
    content: 'A county assembly consists of members elected by the registered voters of the wards, each ward constituting a single member constituency; and members nominated by political parties to ensure gender balance and representation of special groups.',
    keywords: ['county assembly', 'membership', 'wards', 'nominations']
  },
  {
    id: 'art-178',
    chapter: 'Chapter 11: Devolved Government',
    number: 178,
    title: 'Speaker of a county assembly',
    content: 'Each county assembly shall have a Speaker who shall be elected by the assembly from among persons who are not members of the assembly.',
    keywords: ['speaker', 'county assembly', 'leader']
  },
  {
    id: 'art-179',
    chapter: 'Chapter 11: Devolved Government',
    number: 179,
    title: 'County executive committees',
    content: 'The executive authority of the county is vested in, and exercised by, a county executive committee. The committee consists of the county governor, the deputy county governor, and members appointed by the county governor with the approval of the assembly.',
    keywords: ['county executive', 'governor', 'CEC']
  },
  {
    id: 'art-180',
    chapter: 'Chapter 11: Devolved Government',
    number: 180,
    title: 'Election of county governor and deputy county governor',
    content: 'The county governor shall be directly elected by the registered voters in the county. Each candidate for election as county governor shall nominate a person as a candidate for deputy governor.',
    keywords: ['governor', 'election', 'deputy governor']
  },
  {
    id: 'art-181',
    chapter: 'Chapter 11: Devolved Government',
    number: 181,
    title: 'Removal of a county governor',
    content: 'A county governor may be removed from office on grounds of: gross violation of this Constitution or any other law; where there are serious reasons for believing that the county governor has committed a crime; or physical or mental incapacity.',
    keywords: ['removal', 'governor', 'impeachment', 'incapacity']
  },
  {
    id: 'art-182',
    chapter: 'Chapter 11: Devolved Government',
    number: 182,
    title: 'Vacancy in the office of county governor',
    content: 'If a vacancy occurs in the office of county governor, the deputy county governor shall assume office as county governor for the remainder of the term of the county governor.',
    keywords: ['vacancy', 'succession', 'governor']
  },
  {
    id: 'art-183',
    chapter: 'Chapter 11: Devolved Government',
    number: 183,
    title: 'Functions of county executive committees',
    content: 'A county executive committee shall implement county legislation, implement national legislation within the county, manage and coordinate the functions of the county administration and its departments.',
    keywords: ['CEC functions', 'administration', 'legislation']
  },
  {
    id: 'art-184',
    chapter: 'Chapter 11: Devolved Government',
    number: 184,
    title: 'Urban areas and cities',
    content: 'National legislation shall provide for the governance and management of urban areas and cities and shall establish criteria for classifying areas as urban areas or cities.',
    keywords: ['urban', 'cities', 'towns', 'governance']
  },
  {
    id: 'art-185',
    chapter: 'Chapter 11: Devolved Government',
    number: 185,
    title: 'Legislative authority of county assemblies',
    content: 'The legislative authority of a county is vested in, and exercised by, its county assembly. A county assembly may make any laws that are necessary for, or incidental to, the effective performance of the functions and exercise of the powers of the county government.',
    keywords: ['legislation', 'county assembly', 'authority']
  },
  {
    id: 'art-186',
    chapter: 'Chapter 11: Devolved Government',
    number: 186,
    title: 'Respective functions and powers of national and county governments',
    content: 'The functions and powers of the national government and the county governments, respectively, are as set out in the Fourth Schedule. Any function or power not assigned by this Constitution or any other law to a county is a function or power of the national government.',
    keywords: ['functions', 'powers', 'division of labor', 'residual powers']
  },
  {
    id: 'art-187',
    chapter: 'Chapter 11: Devolved Government',
    number: 187,
    title: 'Transfer of functions and powers between levels of government',
    content: 'A function or power of government at one level may be transferred to a government at the other level by agreement between the governments if the function or power would be more effectively performed or exercised by the receiving government.',
    keywords: ['transfer', 'intergovernmental', 'cooperation']
  },
  {
    id: 'art-188',
    chapter: 'Chapter 11: Devolved Government',
    number: 188,
    title: 'Boundaries of counties',
    content: 'The boundaries of a county may be altered only by a resolution of the National Assembly and the Senate, supported by at least two-thirds of all the members of each House.',
    keywords: ['boundaries', 'county alterations', 'redistricting']
  },
  {
    id: 'art-189',
    chapter: 'Chapter 11: Devolved Government',
    number: 189,
    title: 'Cooperation between national and county governments',
    content: 'Government at either level shall perform its functions and exercise its powers in a manner that respects the functional and institutional integrity of government at the other level, and shall assist, inform and consult as appropriate.',
    keywords: ['cooperation', 'integrity', 'consultation']
  },
  {
    id: 'art-190',
    chapter: 'Chapter 11: Devolved Government',
    number: 190,
    title: 'Support for county governments',
    content: 'Parliament shall by legislation ensure that county governments have adequate support to enable them to perform their functions.',
    keywords: ['support', 'capacity building']
  },
  {
    id: 'art-191',
    chapter: 'Chapter 11: Devolved Government',
    number: 191,
    title: 'Conflict of laws',
    content: 'This Article applies to conflicts between national legislation and county legislation. National legislation prevails over county legislation if the national legislation is necessary for national security, economic unity, or the protection of common markets.',
    keywords: ['conflicts', 'legal hierarchy', 'national interest']
  },
  {
    id: 'art-192',
    chapter: 'Chapter 11: Devolved Government',
    number: 192,
    title: 'Suspension of a county government',
    content: 'The President may suspend a county government in an emergency arising out of internal conflict or war; or in any other exceptional circumstances.',
    keywords: ['suspension', 'emergency', 'governance crisis']
  },
  {
    id: 'art-193',
    chapter: 'Chapter 11: Devolved Government',
    number: 193,
    title: 'Qualifications for election as member of county assembly',
    content: 'A person is eligible for election as a member of a county assembly if the person is registered as a voter and satisfies any educational, moral and ethical requirements prescribed by this Constitution or by an Act of Parliament.',
    keywords: ['qualifications', 'MCA', 'voter']
  },
  {
    id: 'art-194',
    chapter: 'Chapter 11: Devolved Government',
    number: 194,
    title: 'Vacation of office of member of county assembly',
    content: 'The office of a member of a county assembly becomes vacant if the member dies, resigns in writing to the Speaker, or is absent from eight sittings without permission.',
    keywords: ['vacation', 'resignation', 'vacancy']
  },
  {
    id: 'art-195',
    chapter: 'Chapter 11: Devolved Government',
    number: 195,
    title: 'County assembly power to summon witnesses',
    content: 'A county assembly or any of its committees has power to summon any person to appear before it for the purpose of giving evidence or providing information.',
    keywords: ['summon', 'witness', 'evidence']
  },
  {
    id: 'art-196',
    chapter: 'Chapter 11: Devolved Government',
    number: 196,
    title: 'Public access and participation, and county assembly powers, privileges and immunities',
    content: 'A county assembly shall facilitate public participation in its legislative and other business and conduct its business in an open manner.',
    keywords: ['public participation', 'transparency', 'immunity']
  },
  {
    id: 'art-197',
    chapter: 'Chapter 11: Devolved Government',
    number: 197,
    title: 'Gender balance and diversity',
    content: 'Not more than two-thirds of the members of any county assembly or county executive committee shall be of the same gender.',
    keywords: ['gender', 'diversity', 'affirmative action']
  },
  {
    id: 'art-198',
    chapter: 'Chapter 11: Devolved Government',
    number: 198,
    title: 'County government during transition',
    content: 'While a county assembly is dissolved, the functions of the county assembly shall be exercised in accordance with an Act of Parliament.',
    keywords: ['transition', 'dissolution']
  },
  {
    id: 'art-199',
    chapter: 'Chapter 11: Devolved Government',
    number: 199,
    title: 'Publication of county legislation',
    content: 'County legislation shall be published in the Gazette within seven days after it is passed or assented to.',
    keywords: ['publication', 'gazette', 'legislation']
  },
  {
    id: 'art-200',
    chapter: 'Chapter 11: Devolved Government',
    number: 200,
    title: 'Legislation on Chapter eleven',
    content: 'Parliament shall enact legislation providing for all matters necessary or convenient to give effect to this Chapter.',
    keywords: ['legislation', 'devolution laws']
  },

  // Chapter 12: Public Finance
  {
    id: 'art-201',
    chapter: 'Chapter 12: Public Finance',
    number: 201,
    title: 'Principles of public finance',
    content: 'The following principles shall guide all aspects of public finance: openness and accountability; the public finance system shall promote an equitable society; the burdens and benefits of the use of resources and public borrowing shall be shared equitably between present and future generations.',
    keywords: ['finance', 'taxes', 'money', 'accountability', 'equity']
  },
  {
    id: 'art-202',
    chapter: 'Chapter 12: Public Finance',
    number: 202,
    title: 'Equitable sharing of national revenue',
    content: 'Revenue raised nationally shall be shared equitably between the national and county governments. County governments may be given additional allocations from the national government’s share of the revenue, either conditionally or unconditionally.',
    keywords: ['revenue sharing', 'counties', 'national government']
  },
  {
    id: 'art-203',
    chapter: 'Chapter 12: Public Finance',
    number: 203,
    title: 'Equitable sharing of national revenue',
    content: 'Revenue raised nationally shall be shared equitably among the national and county governments.',
    keywords: ['revenue', 'sharing', 'equity', 'counties']
  },
  {
    id: 'art-204',
    chapter: 'Chapter 12: Public Finance',
    number: 204,
    title: 'Equalisation Fund',
    content: 'There is established an Equalisation Fund into which shall be paid one half per cent of all the revenue collected by the national government each year. The national government shall use the Equalisation Fund only to provide basic services to marginalised areas to the extent necessary to bring the quality of those services in those areas to the level generally enjoyed by the rest of the nation.',
    keywords: ['equalisation fund', 'marginalised areas', 'services', 'water', 'health', 'roads']
  },
  {
    id: 'art-205',
    chapter: 'Chapter 12: Public Finance',
    number: 205,
    title: 'Consultation on financial legislation affecting counties',
    content: 'When a Bill that includes provisions that affect the financial interests of county governments is introduced in the National Assembly, the Speaker shall consult the Speaker of the Senate.',
    keywords: ['consultation', 'legislation', 'financial interest']
  },
  {
    id: 'art-206',
    chapter: 'Chapter 12: Public Finance',
    number: 206,
    title: 'Consolidated Fund and other public funds',
    content: 'There is established the Consolidated Fund into which shall be paid all money raised or received by or on behalf of the national government except money that is reasonably excluded from the Fund by an Act of Parliament.',
    keywords: ['consolidated fund', 'national budget', 'treasury']
  },
  {
    id: 'art-207',
    chapter: 'Chapter 12: Public Finance',
    number: 207,
    title: 'Revenue Funds for county governments',
    content: 'There shall be established a Revenue Fund for each county government, into which shall be paid all money raised or received by or on behalf of the county government.',
    keywords: ['county revenue', 'revenue fund']
  },
  {
    id: 'art-208',
    chapter: 'Chapter 12: Public Finance',
    number: 208,
    title: 'Contingencies Fund',
    content: 'Parliament may establish a Contingencies Fund and shall make laws to provide for advances from that Fund if the Cabinet Secretary responsible for finance is satisfied that there is an urgent and unforeseen need for expenditure for which there is no other provision.',
    keywords: ['contingencies', 'emergency expenditure', 'urgent']
  },
  {
    id: 'art-209',
    chapter: 'Chapter 12: Public Finance',
    number: 209,
    title: 'Power to impose taxes',
    content: 'Only the national government may impose income tax; value-added tax; customs duties and other duties on import and export goods; and excise duty. A county government may impose property rates; entertainment taxes; and any other tax that it is authorised to impose by an Act of Parliament.',
    keywords: ['taxes', 'VAT', 'income tax', 'property rates']
  },
  {
    id: 'art-210',
    chapter: 'Chapter 12: Public Finance',
    number: 210,
    title: 'Imposition of tax',
    content: 'No tax or licensing fee may be imposed, waived or varied except as provided by legislation. If legislation permits the waiver of any tax or licensing fee, a public record of each waiver shall be maintained together with the reason for the waiver.',
    keywords: ['tax waiver', 'legislation', 'licensing fees']
  },
  {
    id: 'art-211',
    chapter: 'Chapter 12: Public Finance',
    number: 211,
    title: 'Borrowing by national government',
    content: 'Parliament shall by legislation— prescribe the terms on which the national government may borrow; and impose reporting requirements. The Cabinet Secretary responsible for finance shall at such times as shall be prescribed by an Act of Parliament, report to the relevant committee of Parliament on the relevant loan.',
    keywords: ['borrowing', 'national debt', 'parliamentary oversight']
  },
  {
    id: 'art-212',
    chapter: 'Chapter 12: Public Finance',
    number: 212,
    title: 'Borrowing by county governments',
    content: 'A county government may borrow only— if the national government guarantees the loan; and with the approval of the county government’s assembly.',
    keywords: ['county borrowing', 'guarantees', 'assembly approval']
  },
  {
    id: 'art-213',
    chapter: 'Chapter 12: Public Finance',
    number: 213,
    title: 'Loan guarantees by national government',
    content: 'An Act of Parliament shall prescribe terms and conditions under which the national government may guarantee loans. Within seven days after guaranteeing a loan, the Cabinet Secretary responsible for finance shall publish at least the following information: the nature and purposes of the loan; and the terms of the guarantee.',
    keywords: ['loan guarantees', 'treasury', 'transparency']
  },
  {
    id: 'art-214',
    chapter: 'Chapter 12: Public Finance',
    number: 214,
    title: 'Public debt',
    content: 'The public debt is a charge on the Consolidated Fund, but an Act of Parliament may provide for charging all or part of the public debt to other public funds. For the purposes of this Article, "public debt" means all liabilities of the Government to pay money.',
    keywords: ['public debt', 'liabilities', 'consolidated fund']
  },
  {
    id: 'art-215',
    chapter: 'Chapter 12: Public Finance',
    number: 215,
    title: 'Commission on Revenue Allocation',
    content: 'There is established the Commission on Revenue Allocation. The Commission shall consist of a chairperson, and eight other members. The chairperson and other members shall be appointed by the President.',
    keywords: ['CRA', 'revenue allocation', 'commission']
  },
  {
    id: 'art-216',
    chapter: 'Chapter 12: Public Finance',
    number: 216,
    title: 'Functions of the Commission on Revenue Allocation',
    content: 'The principal function of the Commission on Revenue Allocation is to make recommendations concerning the basis for the equitable sharing of revenue raised by the national government between the national and county governments; and among the county governments.',
    keywords: ['CRA functions', 'revenue sharing', 'recommendations']
  },
  {
    id: 'art-217',
    chapter: 'Chapter 12: Public Finance',
    number: 217,
    title: 'Division of revenue',
    content: 'Once every five years, the Senate shall, by resolution, determine the basis for allocating among the counties the share of national revenue that is annually allocated to the county level of government.',
    keywords: ['revenue division', 'senate', 'allocation basis']
  },
  {
    id: 'art-218',
    chapter: 'Chapter 12: Public Finance',
    number: 218,
    title: 'Annual Division and Allocation of Revenue Bills',
    content: 'At least two months before the end of each financial year, there shall be introduced in Parliament a Division of Revenue Bill, which shall divide revenue raised nationally among the national and county levels of government.',
    keywords: ['revenue bills', 'appropriation', 'parliament']
  },
  {
    id: 'art-219',
    chapter: 'Chapter 12: Public Finance',
    number: 219,
    title: 'Transfer of equitable share',
    content: 'A county’s share of revenue raised by the national government shall be transferred to the county without undue delay and without deduction, except when the transfer has been stopped under Article 225.',
    keywords: ['revenue transfer', 'undue delay', 'counties']
  },
  {
    id: 'art-220',
    chapter: 'Chapter 12: Public Finance',
    number: 220,
    title: 'Form, content and timing of budgets',
    content: 'Budgets of the national and county governments shall contain estimates of revenue and expenditure, differentiating between recurrent and development expenditure. National legislation shall prescribe the form, content and timing of budgets.',
    keywords: ['budget format', 'revenue estimates', 'expenditure']
  },
  {
    id: 'art-221',
    chapter: 'Chapter 12: Public Finance',
    number: 221,
    title: 'Budget estimates and annual Appropriation Bill',
    content: 'At least two months before the end of each financial year, the Cabinet Secretary responsible for finance shall submit to the National Assembly estimates of the revenue and expenditure of the national government for the next financial year.',
    keywords: ['budget estimates', 'appropriation bill', 'finance']
  },
  {
    id: 'art-222',
    chapter: 'Chapter 12: Public Finance',
    number: 222,
    title: 'Expenditure before annual Appropriation Act is passed',
    content: 'If the Appropriation Act for a financial year has not been passed, or is not likely to be passed, by the beginning of that financial year, the National Assembly may authorise the withdrawal of money from the Consolidated Fund.',
    keywords: ['expenditure', 'vote on account', 'withdrawal']
  },
  {
    id: 'art-223',
    chapter: 'Chapter 12: Public Finance',
    number: 223,
    title: 'Supplementary appropriation',
    content: 'The national government may spend money that has not been appropriated if— the amount appropriated for any purpose under the Appropriation Act is insufficient; or a need has arisen for expenditure for a purpose for which no amount has been appropriated by that Act.',
    keywords: ['supplementary budget', 'appropriation', 'extra funding']
  },
  {
    id: 'art-224',
    chapter: 'Chapter 12: Public Finance',
    number: 224,
    title: 'County appropriation Bills',
    content: 'On the basis of the Allocation of Revenue Act, each county government shall prepare and adopt its own annual budget and appropriation Bill.',
    keywords: ['county budget', 'appropriation bill', 'county revenue']
  },
  {
    id: 'art-225',
    chapter: 'Chapter 12: Public Finance',
    number: 225,
    title: 'Financial control',
    content: 'Parliament shall enact legislation to ensure both expenditure control and transparency in all levels of government.',
    keywords: ['budget', 'expenditure', 'transparency']
  },
  {
    id: 'art-226',
    chapter: 'Chapter 12: Public Finance',
    number: 226,
    title: 'Reporting by public entities',
    content: 'An Act of Parliament shall provide for— the keeping of financial records and the auditing of accounts of all governments and other public entities, and ensure that expenditure is as provided in the estimates.',
    keywords: ['reporting', 'accounting', 'auditing']
  },
  {
    id: 'art-227',
    chapter: 'Chapter 12: Public Finance',
    number: 227,
    title: 'Procurement of public goods and services',
    content: 'When a State organ or any other public entity contracts for goods or services, it shall do so in accordance with a system that is fair, equitable, transparent, competitive and cost-effective.',
    keywords: ['procurement', 'tenders', 'contracts']
  },
  {
    id: 'art-228',
    chapter: 'Chapter 12: Public Finance',
    number: 228,
    title: 'Controller of Budget',
    content: 'There shall be a Controller of Budget who shall be appointed by the President with the approval of the National Assembly. The Controller of Budget shall oversee the implementation of the budgets of the national and county governments by authorising withdrawals from public funds.',
    keywords: ['Controller of Budget', 'oversight', 'withdrawals']
  },
  {
    id: 'art-229',
    chapter: 'Chapter 12: Public Finance',
    number: 229,
    title: 'Auditor-General',
    content: 'There shall be an Auditor-General who shall be appointed by the President with the approval of the National Assembly. Within six months after the end of each financial year, the Auditor-General shall audit and report on the accounts of various public entities.',
    keywords: ['Auditor-General', 'auditing', 'reports']
  },
  {
    id: 'art-230',
    chapter: 'Chapter 12: Public Finance',
    number: 230,
    title: 'Salaries and Remuneration Commission',
    content: 'There is established the Salaries and Remuneration Commission. The powers and functions of the Salaries and Remuneration Commission shall be to set and regularly review the remuneration and benefits of all State officers; and advise the national and county governments on the remuneration and benefits of all other public officers.',
    keywords: ['SRC', 'salaries', 'remuneration', 'benefits']
  },
  {
    id: 'art-231',
    chapter: 'Chapter 12: Public Finance',
    number: 231,
    title: 'Central Bank of Kenya',
    content: 'There is established the Central Bank of Kenya. The Central Bank of Kenya shall be responsible for formulating monetary policy, promoting price stability, issuing currency and performing other functions conferred on it by an Act of Parliament.',
    keywords: ['CBK', 'monetary policy', 'currency', 'stability']
  },

  // Chapter 13: The Public Service
  {
    id: 'art-232',
    chapter: 'Chapter 13: The Public Service',
    number: 232,
    title: 'Values and principles of public service',
    content: 'The values and principles of public service include high standards of professional ethics; efficient, effective and economic use of resources; responsive, prompt, effective, impartial and equitable provision of services.',
    keywords: ['ethics', 'service', 'public', 'efficiency', 'professionalism']
  },
  {
    id: 'art-233',
    chapter: 'Chapter 13: The Public Service',
    number: 233,
    title: 'The Public Service Commission',
    content: 'There is established the Public Service Commission. The Commission consists of a chairperson, a vice-chairperson, and seven other members appointed by the President with the approval of the National Assembly.',
    keywords: ['PSC', 'Public Service Commission', 'appointments']
  },
  {
    id: 'art-234',
    chapter: 'Chapter 13: The Public Service',
    number: 234,
    title: 'Functions and powers of the Public Service Commission',
    content: 'The Commission shall establish and abolish offices in the public service; and appoint persons to hold or act in those offices, and confirm appointments.',
    keywords: ['PSC functions', 'appointments', 'recruitment', 'discipline']
  },
  {
    id: 'art-235',
    chapter: 'Chapter 13: The Public Service',
    number: 235,
    title: 'Staffing of county governments',
    content: 'A county government is responsible, within the framework of uniform norms and standards prescribed by an Act of Parliament, for establishing and abolishing offices in its public service; appointing persons to hold or act in those offices; and exercising disciplinary control over and removing persons holding or acting in those offices.',
    keywords: ['county staff', 'county public service']
  },
  {
    id: 'art-236',
    chapter: 'Chapter 13: The Public Service',
    number: 236,
    title: 'Protection of public officers',
    content: 'A public officer shall not be victimised or discriminated against for having performed the functions of office in accordance with this Constitution or any other law; or dismissed, removed from office, demoted in rank or otherwise subjected to disciplinary action without due process of law.',
    keywords: ['due process', 'protection', 'rights of officers']
  },
  {
    id: 'art-237',
    chapter: 'Chapter 13: The Public Service',
    number: 237,
    title: 'The Teachers Service Commission',
    content: 'There is established the Teachers Service Commission. The functions of the Commission are to register trained teachers; recruit and employ registered teachers; and assign teachers employed by the Commission for service in any public school or institution.',
    keywords: ['TSC', 'teachers', 'education', 'employment']
  },

  // Chapter 14: National Security
  {
    id: 'art-238',
    chapter: 'Chapter 14: National Security',
    number: 238,
    title: 'Principles of national security',
    content: 'National security is the protection against internal and external threats to Kenya’s territorial integrity and sovereignty, its people, their rights, freedoms, property, peace, stability and prosperity.',
    keywords: ['security', 'defense', 'sovereignty', 'protection']
  },
  {
    id: 'art-239',
    chapter: 'Chapter 14: National Security',
    number: 239,
    title: 'National security organs',
    content: 'The national security organs are the Kenya Defence Forces, the National Intelligence Service, and the National Police Service. These organs shall at all times be subordinate to civilian authority.',
    keywords: ['security organs', 'civilian authority', 'KDF', 'NIS', 'Police']
  },
  {
    id: 'art-240',
    chapter: 'Chapter 14: National Security',
    number: 240,
    title: 'Establishment of the National Security Council',
    content: 'There is established the National Security Council. The Council consists of the President, the Deputy President, the Cabinet Secretaries responsible for defence, foreign affairs and internal security, the Attorney-General, the Chief of Kenya Defence Forces, and the Director-General of the National Intelligence Service.',
    keywords: ['NSC', 'security council', 'oversight', 'president']
  },
  {
    id: 'art-241',
    chapter: 'Chapter 14: National Security',
    number: 241,
    title: 'Kenya Defence Forces',
    content: 'There are established the Kenya Defence Forces comprising the Kenya Army, the Kenya Air Force, and the Kenya Navy.',
    keywords: ['KDF', 'army', 'air force', 'navy']
  },
  {
    id: 'art-242',
    chapter: 'Chapter 14: National Security',
    number: 242,
    title: 'Establishment of National Intelligence Service',
    content: 'There is established the National Intelligence Service. The National Intelligence Service is responsible for security intelligence and counter-intelligence to enhance national security in accordance with this Constitution.',
    keywords: ['NIS', 'intelligence', 'counter-intelligence']
  },
  {
    id: 'art-243',
    chapter: 'Chapter 14: National Security',
    number: 243,
    title: 'Establishment of the National Police Service',
    content: 'There is established the National Police Service, which consists of the Kenya Police Service and the Administration Police Service.',
    keywords: ['police', 'KPS', 'APS', 'law enforcement']
  },
  {
    id: 'art-244',
    chapter: 'Chapter 14: National Security',
    number: 244,
    title: 'Objects and functions of the National Police Service',
    content: 'The National Police Service shall strive for the highest standards of professionalism and discipline among its members; prevent corruption and promote and practice transparency and accountability.',
    keywords: ['police functions', 'professionalism', 'accountability']
  },
  {
    id: 'art-245',
    chapter: 'Chapter 14: National Security',
    number: 245,
    title: 'Command of the National Police Service',
    content: 'There is established the office of the Inspector-General of the National Police Service. The Inspector-General shall be appointed by the President with the approval of Parliament and shall exercise independent command over the National Police Service.',
    keywords: ['Inspector-General', 'police command', 'IG']
  },
  {
    id: 'art-246',
    chapter: 'Chapter 14: National Security',
    number: 246,
    title: 'National Police Service Commission',
    content: 'There is established the National Police Service Commission. The Commission is responsible for recruiting and appointing persons to hold or act in offices in the Service, confirming appointments, and determining promotions and transfers.',
    keywords: ['NPSC', 'police commission', 'human resources']
  },
  {
    id: 'art-247',
    chapter: 'Chapter 14: National Security',
    number: 247,
    title: 'Other police services',
    content: 'Parliament may enact legislation establishing other police services under the supervision of the National Police Service and the command of the Inspector-General of the National Police Service.',
    keywords: ['other police', 'special units']
  },

  // Chapter 15: Commissions and Independent Offices
  {
    id: 'art-248',
    chapter: 'Chapter 15: Commissions and Independent Offices',
    number: 248,
    title: 'Application of Chapter',
    content: 'This Chapter applies to the constitutional commissions and independent offices, including the Kenya National Human Rights and Equality Commission, the National Land Commission, and the Independent Electoral and Boundaries Commission.',
    keywords: ['commissions', 'independent bodies', 'IEBC', 'NLC']
  },
  {
    id: 'art-249',
    chapter: 'Chapter 15: Commissions and Independent Offices',
    number: 249,
    title: 'Objects of commissions and independent offices',
    content: 'The objects of the commissions and independent offices are to protect the sovereignty of the people; secure the observance by all State organs of democratic values and principles; and promote constitutionalism.',
    keywords: ['democracy', 'oversight', 'sovereignty', 'constitutionalism']
  },
  {
    id: 'art-250',
    chapter: 'Chapter 15: Commissions and Independent Offices',
    number: 250,
    title: 'Composition, appointment and terms of office',
    content: 'Each commission shall consist of at least three, but not more than nine members. The chairperson and members of commissions, and holders of independent offices, shall be appointed by the President with the approval of the National Assembly.',
    keywords: ['appointments', 'commissioners', 'tenure', 'diversity']
  },
  {
    id: 'art-251',
    chapter: 'Chapter 15: Commissions and Independent Offices',
    number: 251,
    title: 'Removal from office',
    content: 'A member of a commission or the holder of an independent office may be removed from office only for serious violation of this Constitution; gross misconduct; physical or mental incapacity; incompetence; or bankruptcy.',
    keywords: ['removal', 'tribunal', 'impeachment', 'misconduct']
  },
  {
    id: 'art-252',
    chapter: 'Chapter 15: Commissions and Independent Offices',
    number: 252,
    title: 'General functions and powers',
    content: 'Each commission, and each holder of an independent office may conduct investigations on its own initiative or on a complaint made by a member of the public; and has the powers necessary for conciliation, mediation and negotiation.',
    keywords: ['powers', 'investigations', 'staffing', 'summons']
  },
  {
    id: 'art-253',
    chapter: 'Chapter 15: Commissions and Independent Offices',
    number: 253,
    title: 'Incorporation of commissions and independent offices',
    content: 'Each commission and each independent office is a body corporate with perpetual succession and a seal, and is capable of suing and being sued in its corporate name.',
    keywords: ['body corporate', 'legal status', 'suing']
  },
  {
    id: 'art-254',
    chapter: 'Chapter 15: Commissions and Independent Offices',
    number: 254,
    title: 'Reporting by commissions and independent offices',
    content: 'As soon as practicable after the end of each financial year, each commission, and each holder of an independent office, shall submit a report to the President and to Parliament.',
    keywords: ['reporting', 'accountability', 'annual report']
  },

  // Chapter 16: Amendment of this Constitution
  {
    id: 'art-255',
    chapter: 'Chapter 16: Amendment of this Constitution',
    number: 255,
    title: 'Amendment of this Constitution',
    content: 'A proposed amendment to this Constitution shall be enacted in accordance with Article 256 or 257, and approved in accordance with clause (2) or (3) via a referendum if it touches on the supremacy of this Constitution, the territory of Kenya, or the sovereignty of the people.',
    keywords: ['amendment', 'change', 'referendum', 'constitutional change']
  },
  {
    id: 'art-256',
    chapter: 'Chapter 16: Amendment of this Constitution',
    number: 256,
    title: 'Amendment by parliamentary initiative',
    content: 'A Bill to amend this Constitution may be introduced in either House of Parliament. The Bill shall be passed by both the National Assembly and the Senate, with a majority of at least two-thirds of the members of each House.',
    keywords: ['parliamentary initiative', 'bill', 'two-thirds majority']
  },
  {
    id: 'art-257',
    chapter: 'Chapter 16: Amendment of this Constitution',
    number: 257,
    title: 'Amendment by popular initiative',
    content: 'An amendment to this Constitution may be proposed by a popular initiative signed by at least one million registered voters. The initiative may be in the form of a general suggestion or a formulated draft Bill.',
    keywords: ['popular initiative', 'voters', 'million signatures', 'referendum']
  },

  // Chapter 17: General Provisions
  {
    id: 'art-258',
    chapter: 'Chapter 17: General Provisions',
    number: 258,
    title: 'Enforcement of this Constitution',
    content: 'Every person has the right to institute court proceedings, claiming that this Constitution has been contravened, or is threatened with contravention.',
    keywords: ['enforcement', 'court', 'sue', 'legal action']
  },
  {
    id: 'art-259',
    chapter: 'Chapter 17: General Provisions',
    number: 259,
    title: 'Construing this Constitution',
    content: 'This Constitution shall be interpreted in a manner that— promotes its purposes, values and principles; advances the rule of law, and the human rights and fundamental freedoms in the Bill of Rights; and permits the development of the law.',
    keywords: ['interpretation', 'construing', 'rule of law', 'principles']
  },
  {
    id: 'art-260',
    chapter: 'Chapter 17: General Provisions',
    number: 260,
    title: 'Interpretation',
    content: 'In this Constitution, unless the context otherwise requires— "adult" means an individual who has attained the age of eighteen years; "child" means an individual who has not attained the age of eighteen years; and other key definitions for "State office" and "public officer".',
    keywords: ['definitions', 'interpretation', 'glossary', 'terms']
  },

  // Chapter 18: Transitional Provisions
  {
    id: 'art-261',
    chapter: 'Chapter 18: Transitional Provisions',
    number: 261,
    title: 'Consequential legislation',
    content: 'Parliament shall enact any legislation required by this Constitution to be enacted to govern a particular matter within the period specified in the Fifth Schedule.',
    keywords: ['transition', 'law', 'schedule', 'legislation']
  },
  {
    id: 'art-262',
    chapter: 'Chapter 18: Transitional Provisions',
    number: 262,
    title: 'Transitional and consequential provisions',
    content: 'The transitional and consequential provisions set out in the Sixth Schedule shall take effect on the effective date.',
    keywords: ['transition', 'sixth schedule', 'arrangements']
  },
  {
    id: 'art-263',
    chapter: 'Chapter 18: Transitional Provisions',
    number: 263,
    title: 'Effective Date',
    content: 'This Constitution shall come into force on its promulgation by the President or on the expiry of a period of fourteen days from the date of the publication of the results of the referendum, whichever is earlier.',
    keywords: ['effective date', 'promulgation', '2010']
  },
  {
    id: 'art-264',
    chapter: 'Chapter 18: Transitional Provisions',
    number: 264,
    title: 'Repeal of previous Constitution',
    content: 'The Constitution in force immediately before the effective date is repealed on the effective date, subject to the Sixth Schedule.',
    keywords: ['repeal', 'old constitution', 'transition']
  },
];

export function getArticlesByChapter(chapterId: string): ConstitutionArticle[] {
  // Simple mapping based on the chapter naming convention in the mock data
  // In a real app, this would query a DB or filter more robustly
  const normalizedId = chapterId.toLowerCase(); // e.g., 'chapter-1'
  
  // Extract number from 'chapter-1' -> '1'
  const chapterNum = normalizedId.replace('chapter-', ''); 
  
  return CONSTITUTION_KNOWLEDGE_BASE.filter(article => 
    article.chapter.toLowerCase().startsWith(`chapter ${chapterNum}:`)
  ).sort((a, b) => a.number - b.number);
}

// Helper to simulate RAG (Retrieval Augmented Generation)
export function searchConstitution(query: string): ConstitutionArticle | undefined {
  const lowerQuery = query.toLowerCase();
  return CONSTITUTION_KNOWLEDGE_BASE.find(article => 
    article.keywords.some(k => lowerQuery.includes(k)) || 
    article.title.toLowerCase().includes(lowerQuery)
  );
}

export function getChapterMetadata(chapterId: string): ChapterMetadata | undefined {
    return CONSTITUTION_CHAPTERS.find(c => c.id === chapterId);
}
