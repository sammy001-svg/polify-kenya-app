import Parser from 'rss-parser';

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  source: string;
  category: 'Legislation' | 'Committee' | 'Budget' | 'Proceedings' | 'Debate';
  relevanceScore: number;
}

const parser = new Parser({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    }
});

const FEEDS = [
  { name: 'The Standard', url: 'https://www.standardmedia.co.ke/rss/politics.php' },
  { name: 'KBC News', url: 'https://www.kbc.co.ke/feed/' },
  { name: 'Kenya News Agency', url: 'https://www.kenyanews.go.ke/feed/' },
  // { name: 'The Star', url: 'https://www.the-star.co.ke/rss' }, // Malformed/404
  // { name: 'Daily Nation', url: 'https://nation.africa/kenya/rss' }, // Blocked/404
];

// Strict keywords for "AI" Analysis
const KEYWORDS = {
  Legislation: [
    'bill', 'act', 'amendment', 'law', 'legislation', 'assent', 'gazette', 
    'statute', 'clause', 'regulations', 'petition', 'constitution'
  ],
  Debate: [
    'debate', 'motion', 'point of order', 'speaker', 'ruling', 'house', 
    'senate', 'assembly', 'parliament', 'mp', 'senator', 'legislator', 'politics'
  ],
  Committee: [
    'committee', 'probe', 'vetting', 'summon', 'audit', 'pac', 'pic', 
    'report', 'inquiry', 'hearing', 'oversight', 'ps', 'cs', 'nominee', 'eacc'
  ],
  Budget: [
    'budget', 'finance bill', 'appropriations', 'estimates', 'supplementary', 
    'treasury', 'expenditure', 'allocation', 'debt', 'tax', 'economy'
  ],
  Proceedings: [
    'proceedings', 'session', 'sitting', 'recess', 'adjourn', 'order paper', 
    'hansard', 'record', 'vote', 'reading'
  ]
};

// Negative keywords to filter out pure politics/campaigns
const BLOCKLIST = [
  'campaign', 'rally', 'vote hunt', 'endorse', 
  'party', 'nomination', 'azimio', 'uda', 'odm', 'kalonzo', 'raila' // Names alone shouldn't trigger, but often indicate pure politics unless combined with parliament terms
];

import fs from 'fs';
import path from 'path';

const CACHE_FILE = path.join(process.cwd(), 'data', 'parliament-news-cache.json');
const CACHE_DURATION = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
const MAX_STORIES = 60;

export async function fetchParliamentNews(): Promise<NewsItem[]> {
  // Ensure data directory exists
  const dataDir = path.dirname(CACHE_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  let cachedData: { lastUpdated: number; items: NewsItem[] } = { lastUpdated: 0, items: [] };

  // 1. Read Cache
  if (fs.existsSync(CACHE_FILE)) {
    try {
      const raw = fs.readFileSync(CACHE_FILE, 'utf-8');
      cachedData = JSON.parse(raw);
    } catch (e) {
      console.error("Failed to read news cache", e);
    }
  }

  const now = Date.now();
  const isStale = (now - cachedData.lastUpdated) > CACHE_DURATION;

  // 2. Return Cache if valid and sufficient
  if (!isStale && cachedData.items.length >= 50) {
    console.log("Serving news from cache.");
    return cachedData.items.slice(0, MAX_STORIES);
  }

  console.log("Cache stale or insufficient. Fetching fresh news...");

  // 3. Fetch New Data
  const newItems: NewsItem[] = [];
  const promises = FEEDS.map(async (feed) => {
    try {
      const feedData = await parser.parseURL(feed.url);
      
      feedData.items.forEach((item) => {
        if (!item.title || !item.link) return;

        const { category, score, isBlocked } = analyzeNewsItem(item.title, item.contentSnippet || '');
        
        // Revised filtering: Lower threshold to 2 to get more items
        if (score >= 2 && !isBlocked) {
            newItems.push({
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
    }
  });

  await Promise.all(promises);

  // 4. Merge & Deduplicate
  const existingLinks = new Set(cachedData.items.map(i => i.link));
  const uniqueNewItems = newItems.filter(i => !existingLinks.has(i.link));
  
  const allItems = [...uniqueNewItems, ...cachedData.items];

  // 5. Sort & Trim
  const sortedItems = allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  const finalItems = sortedItems.slice(0, MAX_STORIES);

  // 6. Save Cache
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify({
        lastUpdated: now,
        items: finalItems
    }, null, 2));
    console.log(`Cache updated with ${finalItems.length} stories.`);
  } catch (e) {
    console.error("Failed to write news cache", e);
  }

  return finalItems;
}

function analyzeNewsItem(title: string, snippet: string): { 
    category: NewsItem['category']; 
    score: number;
    isBlocked: boolean;
} {
  const text = `${title} ${snippet}`.toLowerCase();
  
  // Check Blocklist first
  // If it mentions parliament AND a politician, it might be valid. 
  // But if it's purely "Ruto heads to Narok for tally", it's blocked.
  // We'll trust the Positive Score to override weak blocklist matches, 
  // but strong blocklist matches should kill it.
  
  const isExplicitlyBlocked = BLOCKLIST.some(word => text.includes(word));

  if (isExplicitlyBlocked) {
      // If blocked, we kill it unless it has a VERY high score (e.g. explicitly mentions "parliament bill" AND "ruto")
      // But for safety, let's just kill it if it feels like a campaign event.
      // Refined check:
      if (text.includes('rally') || text.includes('campaign') || text.includes('vote hunt')) {
          return { category: 'Debate', score: 0, isBlocked: true };
      }
      // If it mentions a blocked politician name but also "parliament", we proceed but check score.
  }

  // Scoring
  let bestCategory: NewsItem['category'] = 'Debate'; // Default
  
  // Base score for trusted political feeds to ensure we get volume (target 50+)
  // We rely on the source being "Standard Politics" or "KBC" which are generally relevant.
  let maxScore = 2; 

  for (const [cat, words] of Object.entries(KEYWORDS)) {
    let score = 0;
    for (const word of words) {
        if (text.includes(word)) {
            // Title matches are worth more
            if (title.toLowerCase().includes(word)) {
                score += 3;
            } else {
                score += 1;
            }
        }
    }
    
    if (score > maxScore) {
        maxScore = score;
        bestCategory = cat as NewsItem['category'];
    }
  }

  // Mandatory context check removed to allow more general political news from these specific feeds
  // const contextKeywords = ['parliament', 'senate', 'assembly', 'committee', 'house', 'mp', 'laws'];
  // const hasContext = contextKeywords.some(w => text.includes(w));
  // if (!hasContext) { maxScore = 0; }

  return { category: maxScore > 0 ? bestCategory : 'Debate', score: maxScore, isBlocked: false };
}
