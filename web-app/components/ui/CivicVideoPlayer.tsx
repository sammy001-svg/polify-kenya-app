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
  loop?: boolean;
  muted?: boolean;
  onPlayToggle?: (isPlaying: boolean) => void;
}

export function CivicVideoPlayer({ 
  src, 
  poster, 
  className, 
  autoPlay = false, 
  loop = false,
  muted = true,
  onPlayToggle 
}: CivicVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(muted);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    // Improved UX: If playing but muted (e.g. from autoplay), unmute on first click
    if (isPlaying && isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
      return;
    }

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      // Always unmute when manually starting
      if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
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

  const handleSeek = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pos = (clientX - rect.left) / rect.width;
    const seekTime = pos * videoRef.current.duration;
    
    videoRef.current.currentTime = seekTime;
    setProgress(pos * 100);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const p = (video.currentTime / video.duration) * 100;
      setProgress(p);
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);

    if (autoPlay) {
      // Browsers usually require muted for autoplay
      video.muted = true;
      video.play().catch(() => {
        console.log("Autoplay blocked");
      });
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [autoPlay]);

  return (
    <div className={cn("relative group overflow-hidden bg-black rounded-lg shadow-xl", className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover cursor-pointer"
        playsInline
        muted={isMuted}
        loop={loop}
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
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <button 
            onClick={(e) => { e.stopPropagation(); togglePlay(); }} 
            className="pointer-events-auto transform hover:scale-110 transition-transform active:scale-95"
          >
            <PolifyPlayIcon size="lg" />
          </button>
        </div>
      )}

      {/* Controls Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
        {/* Seeker */}
        <div 
          ref={progressBarRef}
          className="relative w-full h-1.5 bg-white/10 rounded-full mb-5 cursor-pointer group/seeker overflow-hidden"
          onClick={handleSeek}
        >
          {/* Progress fill */}
          <div 
            className="absolute top-0 left-0 h-full bg-kenya-green transition-all duration-75 ease-linear" 
            style={{ width: `${progress}%` }}
          />
          {/* Hover highlight */}
          <div className="absolute top-0 left-0 h-full bg-white/10 w-full opacity-0 group-hover/seeker:opacity-100 transition-opacity" />
        </div>

        <div className="flex items-center gap-4">
          <button onClick={togglePlay} className="text-white hover:text-kenya-green transition-colors shrink-0">
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
          </button>
          
          <div className="text-[11px] font-bold text-white/90 tabular-nums shrink-0 bg-black/20 px-2 py-1 rounded">
            {formatTime(currentTime)} <span className="text-white/40 mx-1">/</span> {formatTime(duration)}
          </div>

          <div className="flex-1" />

          <button onClick={toggleMute} className="text-white hover:text-kenya-green transition-colors shrink-0 flex items-center gap-2 group/vol">
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 shadow-sm" />}
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover/vol:opacity-100 transition-opacity hidden sm:inline">
              {isMuted ? "Unmute" : "Mute"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

