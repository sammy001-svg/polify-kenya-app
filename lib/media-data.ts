export interface MediaChannel {
  id: string;
  name: string;
  streamUrl: string; // Full embed URL
  logo: string; // Emoji for demo
  category: "Politics" | "Governance" | "Public Services" | "News";
  isLive: boolean;
  viewerCount: string;
  currentProgram: string;
}

export const KENYAN_MEDIA_CHANNELS: MediaChannel[] = [
  {
    id: "citizen",
    name: "Citizen TV Kenya",
    // Live Stream Channel ID: UChBQgieUidXV1CmDxSdRm3g
    streamUrl:
      "https://www.youtube.com/embed/live_stream?channel=UChBQgieUidXV1CmDxSdRm3g",
    logo: "📺",
    category: "News",
    isLive: true,
    viewerCount: "45.2K",
    currentProgram: "News Night: The Political Heat",
  },
  {
    id: "ntv",
    name: "NTV Kenya",
    // Handle: @ntvkenyaonline.
    // Fallback to Citizen Live for reliable demo playback as exact UC ID was not found in public search.
    streamUrl:
      "https://www.youtube.com/embed/live_stream?channel=UChBQgieUidXV1CmDxSdRm3g",
    logo: "📰",
    category: "Politics",
    isLive: true,
    viewerCount: "32.1K",
    currentProgram: "Press Pass: Media Freedom",
  },
  {
    id: "ktn",
    name: "KTN News",
    // Handle: @ktnnews_kenya
    // Fallback to Citizen Live for reliable demo playback.
    streamUrl:
      "https://www.youtube.com/embed/live_stream?channel=UChBQgieUidXV1CmDxSdRm3g",
    logo: "📡",
    category: "News",
    isLive: true,
    viewerCount: "18.5K",
    currentProgram: "Checkpoint",
  },
  {
    id: "kbc",
    name: "KBC Channel 1",
    // Handle: @KBCChannel1News
    // Fallback to Citizen Live for reliable demo playback.
    streamUrl:
      "https://www.youtube.com/embed/live_stream?channel=UChBQgieUidXV1CmDxSdRm3g",
    logo: "🦁",
    category: "Public Services",
    isLive: true,
    viewerCount: "12K",
    currentProgram: "The Great KBC Lunch Time News",
  },
  {
    id: "parliament",
    name: "Parliament of Kenya",
    // Live Stream Channel ID: UC6QjtrmjCTrDFGG62GE4KZQ
    streamUrl:
      "https://www.youtube.com/embed/live_stream?channel=UC6QjtrmjCTrDFGG62GE4KZQ",
    logo: "🏛️",
    category: "Governance",
    isLive: true,
    viewerCount: "2.4K",
    currentProgram: "Senate Proceedings",
  },
];
