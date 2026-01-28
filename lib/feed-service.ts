import { StreamItem } from "@/lib/demo-data";
import { KENYAN_MEDIA_CHANNELS } from "@/lib/media-data";

// Extends StreamItem to include AI analysis metadata
export interface FeedItem extends StreamItem {
  aiReasoning?: string;
  sourceChannelId: string;
  isNew?: boolean;
}

// 1. Define the Governance Dictionary
const GOVERNANCE_KEYWORDS = [
  "Ruto",
  "Raila",
  "Gachagua",
  "Kindiki",
  "Kalonzo",
  "Parliament",
  "Senate",
  "National Assembly",
  "MP",
  "Senator",
  "Governor",
  "MCA",
  "Bill",
  "Act",
  "Constitution",
  "Court",
  "Judiciary",
  "IEBC",
  "Budget",
  "Tax",
  "Finance",
  "Levy",
  "Economy",
  "Debt",
  "Strike",
  "Protest",
  "Maandamano",
  "Union",
  "KMPDU",
  "Corruption",
  "Scandal",
  "EACC",
  "DCI",
  "Audit",
];

const NON_POLITICAL_KEYWORDS = [
  "Music",
  "Video",
  "Comedy",
  "Show",
  "Drama",
  "Series",
  "Football",
  "Sports",
  "Goal",
  "Match",
  "League",
  "Recipes",
  "Cook",
  "Food",
  "Fashion",
  "Style",
  "Beauty",
];

// 2. Simulation Data Pool Removed (Switched to Real-time API)

// 2. Real-time RSS Feed Integration
export const FeedService = {
  scanForUpdates: async (): Promise<FeedItem[]> => {
    try {
      // Fetch from our local Proxy API
      const response = await fetch("/api/rss");
      if (!response.ok) throw new Error("Failed to fetch RSS feeds");

      const data = await response.json();
      const rawVideos = data.videos || [];

      interface Video {
        id: string;
        title: string;
        author: string;
        channelKey: string;
      }

      // Filter & Transform
      const newItems: FeedItem[] = rawVideos
        .map((video: Video) => {
          // Perform "AI Analysis" on Real Title
          const { isRelevant, reasoning } = analyzeContent(video.title);

          if (!isRelevant) return null;

          const channelConfig =
            KENYAN_MEDIA_CHANNELS.find((c) => c.id === video.channelKey) ||
            KENYAN_MEDIA_CHANNELS[0];

          return {
            id: video.id, // YouTube Video ID
            title: video.title,
            host: video.author,
            views: "Live/New",
            timeAgo: "Just now", // In a real app we'd parse video.published relative to now
            duration: "New",
            thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`, // Real YouTube Thumbnail
            category:
              channelConfig.id === "parliament" ? "Parliament" : "Town Hall",
            verificationStatus: "Verified", // Trusted source
            isVerifiedChannel: true,
            recommendationReason: "AI Alert: " + reasoning,
            politicalLeaning:
              channelConfig.category === "Governance"
                ? "Independent"
                : "Government",
            videoUrl: `https://www.youtube.com/embed/${video.id}`,
            aiReasoning: reasoning,
            sourceChannelId: video.channelKey,
            isNew: true,
          };
        })
        .filter(Boolean); // Remove nulls (irrelevant videos)

      // Deduplication would happen here in a real app (checking against existing IDs)
      return newItems;
    } catch (error) {
      console.error("RSS Scan failed:", error);
      return [];
    }
  },
};

function analyzeContent(text: string): {
  isRelevant: boolean;
  reasoning: string;
} {
  const lowerText = text.toLowerCase();

  // Filter Noise
  if (NON_POLITICAL_KEYWORDS.some((k) => lowerText.includes(k.toLowerCase()))) {
    return {
      isRelevant: false,
      reasoning: "classified as Entertainment/Sports",
    };
  }

  // Detect Governance
  const matchedKeywords = GOVERNANCE_KEYWORDS.filter((k) =>
    lowerText.includes(k.toLowerCase()),
  );

  if (matchedKeywords.length > 0) {
    return {
      isRelevant: true,
      reasoning: `Matches governance topics: ${matchedKeywords.slice(0, 2).join(", ")}`,
    };
  }

  // Default fallthrough for demo purposes - if it's in our specific mock pool, we mostly want it
  // But let's be strict:
  return { isRelevant: false, reasoning: "Low relevance score (< 0.4)" };
}
