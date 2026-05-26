import { Resource } from "./data";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    publishedAt: string;
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
  };
}

function parseYouTubeDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";

  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export async function fetchYouTubeVideos(
  query: string,
  maxResults: number = 10
): Promise<Partial<Resource>[]> {
  if (!YOUTUBE_API_KEY) {
    console.warn("YouTube API key not configured, returning empty results");
    return [];
  }

  try {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query
    )}&type=video&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`;

    const response = await fetch(searchUrl);
    const data = await response.json();

    if (!data.items) return [];

    const videoIds = data.items.map((item: any) => item.id.videoId).join(",");
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    const detailsMap = new Map<string, YouTubeVideo>();
    detailsData.items?.forEach((item: YouTubeVideo) => {
      detailsMap.set(item.id, item);
    });

    return data.items.map((item: any) => {
      const details = detailsMap.get(item.id.videoId);
      return {
        title: item.snippet.title,
        description: item.snippet.description.slice(0, 200),
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        thumbnail: item.snippet.thumbnails.high?.url,
        duration: details ? parseYouTubeDuration(details.contentDetails.duration) : undefined,
        views: details ? parseInt(details.statistics.viewCount) : 0,
        publishedAt: new Date(item.snippet.publishedAt).toISOString().split("T")[0],
      };
    });
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}

export async function fetchClaudeCodeVideos(): Promise<Partial<Resource>[]> {
  return fetchYouTubeVideos("Claude Code tutorial", 15);
}

export async function fetchCursorVideos(): Promise<Partial<Resource>[]> {
  return fetchYouTubeVideos("Cursor AI editor tutorial", 15);
}

export async function fetchOpenClaudeVideos(): Promise<Partial<Resource>[]> {
  return fetchYouTubeVideos("OpenCLAUDE tutorial", 10);
}

export async function scrapeWebPage(url: string): Promise<{
  title: string;
  description: string;
  content?: string;
}> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AI-Learning-Hub/1.0)",
      },
    });
    const html = await response.text();

    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i);
    const ogDescMatch = html.match(/<meta[^>]*property="og:description"[^>]*content="([^"]+)"/i);

    return {
      title: titleMatch ? titleMatch[1] : "",
      description: descMatch ? descMatch[1] : ogDescMatch ? ogDescMatch[1] : "",
    };
  } catch (error) {
    console.error("Error scraping webpage:", error);
    return { title: "", description: "" };
  }
}

export function generateResourceId(): string {
  return `res_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}