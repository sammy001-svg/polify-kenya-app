import Parser from 'rss-parser';

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  source: string;
  category: 'Legislation' | 'Scandal' | 'Debate' | 'Politics' | 'Other';
  relevanceScore: number;
}

const parser = new Parser();

const FEEDS = [
  { name: 'Daily Nation', url: 'https://nation.africa/service/rss/kenya/news' },
  { name: 'The Standard', url: 'https://www.standardmedia.co.ke/rss/politics.php' },
  { name: 'Capital FM', url: 'https://www.capitalfm.co.ke/news/category/politics/feed/' },
  // Add more reliable feeds here
];

// Simple keywords for "AI" Analysis
const KEYWORDS = {
  Legislation: ['bill', 'act', 'law', 'amendment', 'legislation', 'reading', 'assent', 'gazette'],
  Debate: ['debate', 'parliament', 'senate', 'assembly', 'motion', 'speaker', 'mp', 'senator'],
  Scandal: ['corruption', 'scandal', 'graft', 'arrest', 'charges', 'audit', 'probe'],
  Politics: ['election', 'party', 'ticket', 'nomination', 'poll', 'campaign', 'ruto', 'raila']
};

export async function fetchParliamentNews(): Promise<NewsItem[]> {
  const allNews: NewsItem[] = [];

  const promises = FEEDS.map(async (feed) => {
    try {
      const feedData = await parser.parseURL(feed.url);
      
      feedData.items.forEach((item) => {
        if (!item.title || !item.link) return;

        const { category, score } = analyzeNewsItem(item.title, item.contentSnippet || '');
        
        // Only include items with some relevance to politics/parliament
        if (score > 0) {
            allNews.push({
                title: item.title,
                link: item.link,
                pubDate: item.pubDate || new Date().toISOString(),
                contentSnippet: item.contentSnippet,
                source: feed.name,
                category,
                relevanceScore: score
            });
        }
      });
    } catch (error) {
      console.warn(`Failed to fetch feed from ${feed.name}:`, error);
      // Continue even if one feed fails
    }
  });

  await Promise.all(promises);

  // Sort by date (newest first)
  return allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}

function analyzeNewsItem(title: string, snippet: string): { category: NewsItem['category']; score: number } {
  const text = `${title} ${snippet}`.toLowerCase();
  
  // Scoring
  let bestCategory: NewsItem['category'] = 'Other';
  let maxScore = 0;

  for (const [cat, words] of Object.entries(KEYWORDS)) {
    let score = 0;
    for (const word of words) {
        if (text.includes(word)) {
            score += 1;
        }
    }
    
    // Weighted scoring: Title matches are worth more
    for (const word of words) {
        if (title.toLowerCase().includes(word)) {
            score += 2;
        }
    }

    if (score > maxScore) {
        maxScore = score;
        bestCategory = cat as NewsItem['category'];
    }
  }

  // Parliament specific boost
  if (text.includes('parliament') || text.includes('assembly') || text.includes('senate')) {
      maxScore += 2;
  }

  return { category: maxScore > 0 ? bestCategory : 'Other', score: maxScore };
}
