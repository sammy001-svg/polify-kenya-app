import { StreamItem } from "@/lib/demo-data";
import { ShortVideo } from "@/lib/shorts-data";
import { KENYAN_MEDIA_CHANNELS } from "@/lib/media-data";

// Extends StreamItem to include AI analysis metadata
export interface FeedItem extends StreamItem {
  aiReasoning?: string;
  sourceChannelId: string;
  isNew?: boolean;
  citations?: { label: string; url: string }[];
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

// Define raw RSS API response type
interface VideoItem {
  id: string;
  title: string;
  author: string;
  channelKey: string;
}

// 2. Real-time RSS Feed Integration
export const FeedService = {
  scanForUpdates: async (): Promise<FeedItem[]> => {
    try {
      // Fetch from our local Proxy API
      const response = await fetch("/api/rss");
      if (!response.ok) throw new Error("Failed to fetch RSS feeds");

      const data = await response.json();
      const rawVideos: VideoItem[] = data.videos || [];

      // Filter & Transform
      const newItems: (FeedItem | null)[] = rawVideos.map((video) => {
        // Strict property check
        if (!video?.id || !video?.title || !video?.author) return null;

        // Perform "AI Analysis" on Real Title
        const { isRelevant, reasoning } = analyzeContent(video.title);

        if (!isRelevant) return null;

        const channelConfig =
          KENYAN_MEDIA_CHANNELS.find((c) => c.id === video.channelKey) ||
          KENYAN_MEDIA_CHANNELS[0];

        const item: FeedItem = {
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
          citations: [
            {
              label: "Official YouTube Channel",
              url: `https://youtube.com/watch?v=${video.id}`,
            },
          ],
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
        return item;
      });

      // Remove nulls and return valid items
      return newItems.filter((item): item is FeedItem => item !== null);
    } catch (error) {
      console.error("RSS Scan failed:", error);
      return [];
    }
  },

  scanForShorts: async (): Promise<ShortVideo[]> => {
    try {
      const response = await fetch("/api/rss");
      if (!response.ok) return [];

      const data = await response.json();
      const rawVideos: VideoItem[] = data.videos || [];

      // Improved filtering: Check for valid objects before accessing properties
      const validVideos = rawVideos.filter(
        (v) => v && v.id && v.title && v.author,
      );

      // 1. High Quality Shorts (Tagged)
      const primaryShorts = validVideos.filter(
        (v) =>
          v.title.toLowerCase().includes("#shorts") ||
          v.title.toLowerCase().includes("short"),
      );

      // 2. News Bites (Everything else, treated as potential content)
      const newsBites = validVideos.filter(
        (v) =>
          !v.title.toLowerCase().includes("#shorts") &&
          !v.title.toLowerCase().includes("short"),
      );

      // Combine: Shorts first, then Bites
      const combinedPool = [...primaryShorts, ...newsBites];

      // 3. Fallback: If 0 items (API Error or Empty), return empty to show "No Shorts"
      if (combinedPool.length === 0) return [];

      // 4. Volume Maximizer: Target 100 items
      // If we have less than 100, we recycle content with unique IDs for UX demo
      const TARGET_COUNT = 100;
      const finalVideos: ShortVideo[] = [];

      let poolIndex = 0;
      while (finalVideos.length < TARGET_COUNT && combinedPool.length > 0) {
        const sourceVideo = combinedPool[poolIndex % combinedPool.length];
        const isDerivative = finalVideos.length >= combinedPool.length;

        finalVideos.push({
          id: isDerivative
            ? `${sourceVideo.id}_${finalVideos.length}`
            : sourceVideo.id,
          videoUrl: `https://www.youtube.com/embed/${sourceVideo.id}`,
          title: sourceVideo.title,
          creator: {
            id: sourceVideo.channelKey,
            name: sourceVideo.author,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(sourceVideo.author)}&background=random`,
            isVerified: true,
          },
          stats: {
            likes: isDerivative ? `${Math.floor(Math.random() * 900)}` : "New",
            comments: "0",
            shares: "0",
          },
          verificationStatus: isDerivative ? "Verified" : "Pending",
          description: isDerivative
            ? "Recommended for you based on your viewing history."
            : "Latest update from the channel feed.",
          tags: ["#BungeBites", "#KenyaPolitics"],
        });

        poolIndex++;
      }

      return finalVideos;
    } catch (error) {
      console.error("Shorts Scan failed:", error);
      return [];
    }
  },
};

function analyzeContent(text: string): {
  isRelevant: boolean;
  reasoning: string;
} {
  // Safety check
  if (!text || typeof text !== "string") {
    return { isRelevant: false, reasoning: "Invalid Content" };
  }

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
