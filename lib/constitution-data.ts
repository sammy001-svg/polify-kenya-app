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
  { id: 'chapter-7', title: 'Chapter 7: Representation of the People', description: 'Electoral system and process.', articlesRange: 'Art. 81-105' },
  { id: 'chapter-8', title: 'Chapter 8: The Legislature', description: 'Composition and role of Parliament.', articlesRange: 'Art. 106-128' },
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
    content: 'All sovereign power belongs to the people of Kenya and shall be exercised only in accordance with this Constitution.',
    keywords: ['power', 'people', 'sovereignty']
  },
  {
    id: 'art-2',
    chapter: 'Chapter 1: Sovereignty of the People',
    number: 2,
    title: 'Supremacy of this Constitution',
    content: 'This Constitution is the supreme law of the Republic and binds all persons and all State organs at both levels of government.',
    keywords: ['law', 'supreme', 'binds', 'government']
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
    id: 'art-10',
    chapter: 'Chapter 2: The Republic',
    number: 10,
    title: 'National values and principles of governance',
    content: 'The national values and principles of governance include patriotism, national unity, sharing and devolution of power, the rule of law, democracy and participation of the people.',
    keywords: ['values', 'governance', 'patriotism', 'unity', 'democracy']
  },

  // Chapter 3
  {
    id: 'art-12',
    chapter: 'Chapter 3: Citizenship',
    number: 12,
    title: 'Entitlements of citizens',
    content: 'Every citizen is entitled to the rights, privileges and benefits of citizenship, subject to the limits provided or permitted by this Constitution.',
    keywords: ['citizen', 'rights', 'privileges']
  },
  {
    id: 'art-14',
    chapter: 'Chapter 3: Citizenship',
    number: 14,
    title: 'Citizenship by birth',
    content: 'A person is a citizen by birth if on the day of the person’s birth, whether or not the person is born in Kenya, either the mother or father of the person is a citizen.',
    keywords: ['birth', 'citizen', 'parent']
  },

  // Chapter 4 (Bill of Rights - Key selections)
  {
    id: 'art-19',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 19,
    title: 'Rights and fundamental freedoms',
    content: 'The Bill of Rights is an integral part of Kenya’s democratic state and is the framework for social, economic and cultural policies.',
    keywords: ['rights', 'freedoms', 'policy']
  },
  {
    id: 'art-22',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 22,
    title: 'Enforcement of Bill of Rights',
    content: 'Every person has the right to institute court proceedings claiming that a right or fundamental freedom in the Bill of Rights has been denied, violated or infringed, or is threatened.',
    keywords: ['court', 'sue', 'enforce', 'justice']
  },
  {
    id: 'art-31',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 31,
    title: 'Privacy',
    content: 'Every person has the right to privacy, which includes the right not to have their person, home or property searched, their possessions seized, or information relating to their family or private affairs unnecessarily required or revealed.',
    keywords: ['privacy', 'search', 'seize', 'home', 'phone', 'data']
  },
  {
    id: 'art-35',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 35,
    title: 'Access to information',
    content: 'Every citizen has the right of access to information held by the State; and information held by another person and required for the exercise or protection of any right or fundamental freedom.',
    keywords: ['information', 'access', 'transparency', 'state', 'records']
  },
  {
    id: 'art-37',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 37,
    title: 'Assembly, demonstration, picketing and petition',
    content: 'Every person has the right, peaceably and unarmed, to assemble, to demonstrate, to picket, and to present petitions to public authorities.',
    keywords: ['protest', 'assemble', 'demonstrate', 'picket', 'petition', 'rights']
  },
  {
    id: 'art-43',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 43,
    title: 'Economic and social rights',
    content: 'Every person has the right to the highest attainable standard of health, accessible and adequate housing, reasonable standards of sanitation, to be free from hunger, and to clean and safe water.',
    keywords: ['health', 'housing', 'water', 'food', 'social', 'economic']
  },

  // Chapter 5
  {
    id: 'art-60',
    chapter: 'Chapter 5: Land and Environment',
    number: 60,
    title: 'Principles of land policy',
    content: 'Land in Kenya shall be held, used and managed in a manner that is equitable, efficient, productive and sustainable.',
    keywords: ['land', 'policy', 'sustainable', 'equitable']
  },
  {
    id: 'art-69',
    chapter: 'Chapter 5: Land and Environment',
    number: 69,
    title: 'Obligations in respect of the environment',
    content: 'The State shall ensure sustainable exploitation, utilisation, management and conservation of the environment and natural resources.',
    keywords: ['environment', 'conservation', 'nature']
  },

  // Chapter 6
  {
    id: 'art-73',
    chapter: 'Chapter 6: Leadership and Integrity',
    number: 73,
    title: 'Responsibilities of leadership',
    content: 'Authority assigned to a State officer is a public trust to be exercised in a manner that is consistent with the purposes and objects of this Constitution.',
    keywords: ['integrity', 'leadership', 'trust', 'ethics']
  },
  {
    id: 'art-75',
    chapter: 'Chapter 6: Leadership and Integrity',
    number: 75,
    title: 'Conduct of State officers',
    content: 'A State officer shall behave, whether in public and official life, in private life, or in association with other persons, in a manner that avoids any conflict between personal interests and public or official duties.',
    keywords: ['conduct', 'conflict', 'interest', 'ethics']
  },

  // Chapter 7
  {
    id: 'art-81',
    chapter: 'Chapter 7: Representation of the People',
    number: 81,
    title: 'General principles for the electoral system',
    content: 'The electoral system shall comply with the following principles: freedom of citizens to exercise their political rights under Article 38.',
    keywords: ['election', 'vote', 'representation']
  },
  {
    id: 'art-91',
    chapter: 'Chapter 7: Representation of the People',
    number: 91,
    title: 'Basic requirements for political parties',
    content: 'Every political party shall have a national character as prescribed by an Act of Parliament.',
    keywords: ['party', 'politics', 'requirements']
  },

  // Chapter 8
  {
    id: 'art-94',
    chapter: 'Chapter 8: The Legislature',
    number: 94,
    title: 'Role of Parliament',
    content: 'The legislative authority of the Republic is derived from the people and, at the national level, is vested in and exercised by Parliament.',
    keywords: ['parliament', 'laws', 'legislature']
  },
  {
    id: 'art-106',
    chapter: 'Chapter 8: The Legislature',
    number: 106,
    title: 'Speakers and Deputy Speakers of Parliament',
    content: 'There shall be a Speaker for each House of Parliament, who shall be elected by that House in accordance with the Standing Orders.',
    keywords: ['speaker', 'parliament', 'house']
  },

  // Chapter 9
  {
    id: 'art-130',
    chapter: 'Chapter 9: The Executive',
    number: 130,
    title: 'The National Executive',
    content: 'The national executive of the Republic comprises the President, the Deputy President and the Cabinet.',
    keywords: ['president', 'executive', 'cabinet']
  },
  {
    id: 'art-131',
    chapter: 'Chapter 9: The Executive',
    number: 131,
    title: 'Authority of the President',
    content: 'The President is the Head of State and Government, and Commander-in-Chief of the Kenya Defence Forces.',
    keywords: ['president', 'commander', 'chief']
  },

  // Chapter 10
  {
    id: 'art-159',
    chapter: 'Chapter 10: Judiciary',
    number: 159,
    title: 'Judicial authority',
    content: 'Judicial authority is derived from the people and vests in, and shall be exercised by, the courts and tribunals established by or under this Constitution.',
    keywords: ['courts', 'judiciary', 'justice']
  },
  {
    id: 'art-160',
    chapter: 'Chapter 10: Judiciary',
    number: 160,
    title: 'Independence of the Judiciary',
    content: 'In the exercise of judicial authority, the Judiciary, as constituted by Article 161, shall be subject only to this Constitution and the law.',
    keywords: ['independence', 'judiciary', 'law']
  },

  // Chapter 11
  {
    id: 'art-174',
    chapter: 'Chapter 11: Devolved Government',
    number: 174,
    title: 'Objects of devolution',
    content: 'The objects of the devolution of government are to promote democratic and accountable exercise of power and to foster national unity by recognising diversity.',
    keywords: ['devolution', 'counties', 'unity']
  },
  {
    id: 'art-175',
    chapter: 'Chapter 11: Devolved Government',
    number: 175,
    title: 'Principles of devolved government',
    content: 'County governments established under this Constitution shall reflect the democratic and accountable exercise of power.',
    keywords: ['county', 'government', 'democracy']
  },

  // Chapter 12
  {
    id: 'art-201',
    chapter: 'Chapter 12: Public Finance',
    number: 201,
    title: 'Principles of public finance',
    content: 'The following principles shall guide all aspects of public finance in the Republic: there shall be openness and accountability, including public participation in financial matters.',
    keywords: ['finance', 'taxes', 'money', 'budget']
  },
  {
    id: 'art-203',
    chapter: 'Chapter 12: Public Finance',
    number: 203,
    title: 'Equitable sharing of national revenue',
    content: 'The following criteria shall be taken into account in determining the equitable shares provided for under Article 202: the national interest, the public debt...',
    keywords: ['revenue', 'sharing', 'equity']
  },

  // Chapter 13
  {
    id: 'art-232',
    chapter: 'Chapter 13: The Public Service',
    number: 232,
    title: 'Values and principles of public service',
    content: 'The values and principles of public service include high standards of professional ethics, efficient, effective and economic use of resources, and responsive, prompt, effective, impartial and equitable provision of services.',
    keywords: ['ethics', 'service', 'public', 'efficiency']
  },

  // Chapter 14
  {
    id: 'art-238',
    chapter: 'Chapter 14: National Security',
    number: 238,
    title: 'Principles of national security',
    content: 'National security is the protection against internal and external threats to Kenya’s territorial integrity and sovereignty, its people, their rights, freedoms, property, peace, stability and prosperity.',
    keywords: ['security', 'defense', 'protection']
  },

  // Chapter 15
  {
    id: 'art-248',
    chapter: 'Chapter 15: Commissions and Independent Offices',
    number: 248,
    title: 'Application of Chapter',
    content: 'This Chapter applies to the constitutional commissions and independent offices.',
    keywords: ['commissions', 'independent', 'bodies']
  },
  {
    id: 'art-249',
    chapter: 'Chapter 15: Commissions and Independent Offices',
    number: 249,
    title: 'Objects of commissions and independent offices',
    content: 'The objects of the commissions and independent offices are to protect the sovereignty of the people, secure the observance by all State organs of democratic values and principles, and promote constitutionalism.',
    keywords: ['democracy', 'oversight', 'integrity']
  },

  // Chapter 16
  {
    id: 'art-255',
    chapter: 'Chapter 16: Amendment of this Constitution',
    number: 255,
    title: 'Amendment of this Constitution',
    content: 'A proposed amendment to this Constitution shall be enacted in accordance with Article 256 or 257, and approved in accordance with clause (2) or (3).',
    keywords: ['amendment', 'change', 'referendum']
  },

  // Chapter 17
  {
    id: 'art-258',
    chapter: 'Chapter 17: General Provisions',
    number: 258,
    title: 'Enforcement of this Constitution',
    content: 'Every person has the right to institute court proceedings, claiming that this Constitution has been contravened, or is threatened with contravention.',
    keywords: ['enforcement', 'court', 'sue']
  },

  // Chapter 18
  {
    id: 'art-261',
    chapter: 'Chapter 18: Transitional Provisions',
    number: 261,
    title: 'Consequential legislation',
    content: 'Parliament shall enact any legislation required by this Constitution to be enacted to govern a particular matter within the period specified in the Fifth Schedule.',
    keywords: ['transition', 'law', 'schedule']
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
