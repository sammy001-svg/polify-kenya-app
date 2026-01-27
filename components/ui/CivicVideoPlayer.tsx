"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PolifyPlayIcon } from "./PolifyPlayIcon";

interface CivicVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  onPlayToggle?: (isPlaying: boolean) => void;
}

export function CivicVideoPlayer({ src, poster, className, autoPlay = false, onPlayToggle }: CivicVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);
    onPlayToggle?.(nextPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const p = (video.currentTime / video.duration) * 100;
      setProgress(p);
    };

    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);

    if (autoPlay) {
      video.play().catch(() => {
        // Autoplay might fail if not muted or user hasn't interacted
        console.log("Autoplay blocked");
      });
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [autoPlay]);

  return (
    <div className={cn("relative group overflow-hidden bg-black", className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        playsInline
        muted={isMuted}
        onPlay={() => {
          setIsPlaying(true);
          onPlayToggle?.(true);
        }}
        onPause={() => {
          setIsPlaying(false);
          onPlayToggle?.(false);
        }}
        onClick={togglePlay}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      )}

      {/* Central Play Button (Only shown when paused) */}
      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button onClick={togglePlay}>
            <PolifyPlayIcon size="lg" />
          </button>
        </div>
      )}

      {/* Controls Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <div className="flex items-center gap-4">
          <button onClick={togglePlay} className="text-white hover:text-kenya-red transition-colors">
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
          </button>
          
          <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-kenya-red transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>

          <button onClick={toggleMute} className="text-white hover:text-white/80">
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
