"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Resource } from "@/lib/data";

interface VideoPlayerProps {
  resource: Resource;
  className?: string;
}

export function VideoPlayer({ resource, className }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  if (resource.type !== "video") return null;

  return (
    <div className={cn("relative aspect-video bg-black rounded-xl overflow-hidden", className)}>
      <iframe
        src={`https://www.youtube.com/embed/${getYouTubeId(resource.url)}?rel=0&modestbranding=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

function getYouTubeId(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  return match ? match[1] : "";
}