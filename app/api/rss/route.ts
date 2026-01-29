import { NextResponse } from "next/server";

// Official Channel IDs
const CHANNELS = {
  citizen: "UChBQgieUidXV1CmDxSdRm3g",
  parliament: "UC6QjtrmjCTrDFGG62GE4KZQ",
  kbc: "UCypNjM5hP1qcUqQZe57jNfg",
};

export async function GET() {
  try {
    // Fetch from all channels in parallel
    const promises = Object.entries(CHANNELS).map(async ([key, id]) => {
      try {
        const res = await fetch(
          `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`,
          {
            next: { revalidate: 300 }, // Cache for 5 minutes
          },
        );

        if (!res.ok) return [];

        const xmlText = await res.text();

        // Simple Regex Parsing to avoid heavyweight XML parsers
        // We need: title, link (videoId), published, name (author)
        const entries = xmlText.split("<entry>");
        entries.shift(); // Remove header

        return entries
          .map((entry) => {
            const titleMatch = entry.match(/<title>(.*?)<\/title>/);
            const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
            const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
            const authorMatch = entry.match(/<name>(.*?)<\/name>/);

            if (!titleMatch || !videoIdMatch) return null;

            return {
              id: videoIdMatch[1],
              title: titleMatch[1],
              link: `https://www.youtube.com/watch?v=${videoIdMatch[1]}`,
              published: publishedMatch
                ? publishedMatch[1]
                : new Date().toISOString(),
              author: authorMatch ? authorMatch[1] : key,
              channelKey: key,
            };
          })
          .filter(Boolean);
      } catch (e) {
        console.error(`Failed to fetch RSS for ${key}`, e);
        return [];
      }
    });

    const results = await Promise.all(promises);
    const flattened = results.flat();

    // Type guard to ensure flattened list is non-null for TypeScript
    const validVideos = flattened.filter((v): v is NonNullable<typeof v> => v !== null);

    validVideos.sort((a, b) => {
      const timeA = new Date(a.published).getTime() || 0;
      const timeB = new Date(b.published).getTime() || 0;
      return timeB - timeA;
    });

    return NextResponse.json({ videos: validVideos });
  } catch (error) {
    console.error("RSS API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch feeds" },
      { status: 500 },
    );
  }
}
