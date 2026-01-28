export interface ConstitutionArticle {
  id: string;
  chapter: string;
  number: number;
  title: string;
  content: string;
  keywords: string[];
}

export const CONSTITUTION_KNOWLEDGE_BASE: ConstitutionArticle[] = [
  {
    id: 'art-1',
    chapter: 'Chapter 1: Sovereignty of the People',
    number: 1,
    title: 'Sovereignty of the people',
    content: 'All sovereign power belongs to the people of Kenya and shall be exercised only in accordance with this Constitution.',
    keywords: ['power', 'people', 'sovereignty']
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
    id: 'art-43',
    chapter: 'Chapter 4: The Bill of Rights',
    number: 43,
    title: 'Economic and social rights',
    content: 'Every person has the right to the highest attainable standard of health, accessible and adequate housing, reasonable standards of sanitation, to be free from hunger, and to clean and safe water.',
    keywords: ['health', 'housing', 'water', 'food', 'social', 'economic']
  },
  {
    id: 'art-2',
    chapter: 'Chapter 1: Sovereignty of the People',
    number: 2,
    title: 'Supremacy of this Constitution',
    content: 'This Constitution is the supreme law of the Republic and binds all persons and all State organs at both levels of government.',
    keywords: ['law', 'supreme', 'binds', 'government']
  }
];

// Helper to simulate RAG (Retrieval Augmented Generation)
export function searchConstitution(query: string): ConstitutionArticle | undefined {
  const lowerQuery = query.toLowerCase();
  return CONSTITUTION_KNOWLEDGE_BASE.find(article => 
    article.keywords.some(k => lowerQuery.includes(k)) || 
    article.title.toLowerCase().includes(lowerQuery)
  );
}
