
'use client';

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getActiveAds, Advertisement } from "@/app/(platform)/campaign/ads/actions";
import { Sparkles, ExternalLink } from "lucide-react";
import Image from "next/image";
import { FeedItem } from "@/lib/feed-service"; // Assuming reusing FeedItem type
import { CivicVideoPlayer } from "@/components/ui/CivicVideoPlayer";

interface HeroFeedCarouselProps {
    initialVideos: FeedItem[];
}

type CarouselItem = 
    | { type: 'ad'; data: Advertisement }
    | { type: 'video'; data: FeedItem };

export function HeroFeedCarousel({ initialVideos }: HeroFeedCarouselProps) {
    const [items, setItems] = useState<CarouselItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    // Load Ads and Mix with Videos
    useEffect(() => {
        async function loadContent() {
            const ads = await getActiveAds();
            
            // Transform ads to carousel items
            const adItems: CarouselItem[] = ads.map(ad => ({ type: 'ad', data: ad }));
            
            // Transform videos (limit to top 3 featured AI picks or just first 3)
            const videoItems: CarouselItem[] = initialVideos.slice(0, 3).map(v => ({ type: 'video', data: v }));

            // Interleave logic: Ad -> Video -> Ad -> Video
            const mixed: CarouselItem[] = [];
            const maxLength = Math.max(adItems.length, videoItems.length);
            
            for (let i = 0; i < maxLength; i++) {
                if(adItems[i]) mixed.push(adItems[i]);
                if(videoItems[i]) mixed.push(videoItems[i]);
            }

            // Fallback if empty
            if(mixed.length === 0 && initialVideos.length > 0) {
                 mixed.push({ type: 'video', data: initialVideos[0] });
            }

            setItems(mixed);
        }
        loadContent();
    }, [initialVideos]);

    // Timer Logic
    useEffect(() => {
        if (items.length <= 1) return;

        const currentItem = items[currentIndex];
        // Duration: 10s for Ads, 30s for Video snippets (or until end? simplistic 15s for now)
        const duration = currentItem.type === 'ad' ? 10000 : 15000; 
        const intervalStep = 100; // update progress every 100ms

        const timer = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + (intervalStep / duration) * 100;
                if (newProgress >= 100) {
                    // Next Slide
                    setCurrentIndex(prevIndex => (prevIndex + 1) % items.length);
                    return 0; // Reset progress here
                }
                return newProgress;
            });
        }, intervalStep);

        return () => clearInterval(timer);
    }, [currentIndex, items]);


    if (items.length === 0) return (
        <div className="w-full h-full bg-black/90 flex items-center justify-center text-white/50">
            <span className="animate-pulse">Loading Feed...</span>
        </div>
    );

    const currentItem = items[currentIndex];

    return (
        <div className="relative w-full h-full bg-black overflow-hidden group">
            <AnimatePresence mode="wait">
                {currentItem.type === 'ad' ? (
                    <motion.div
                        key={`ad-${currentItem.data.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full h-full"
                    >
                        <Image 
                            src={currentItem.data.image_url} 
                            alt={currentItem.data.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />
                        
                        {/* Info */}
                        <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                            <span className="bg-kenya-gold text-black text-xs font-bold px-2 py-1 rounded mb-2 inline-block uppercase tracking-wider">
                                Sponsored
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-xl mb-2">
                                {currentItem.data.title}
                            </h2>
                            {currentItem.data.target_url && (
                                <a 
                                    href={currentItem.data.target_url} 
                                    target="_blank"
                                    className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors text-sm font-bold"
                                >
                                    Learn More <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key={`vid-${currentItem.data.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative w-full h-full"
                    >
                         {currentItem.data.videoUrl && (currentItem.data.videoUrl.includes("youtube") || currentItem.data.videoUrl.includes("youtu.be")) ? (
                             <iframe
                                src={`https://www.youtube.com/embed/${currentItem.data.videoUrl.split("v=")[1]?.split("&")[0] || currentItem.data.videoUrl.split("/").pop()}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&start=0`}
                                title={currentItem.data.title}
                                className="w-full h-full pointer-events-none scale-125" // Scale up to remove bars
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                             />
                         ) : (
                             <CivicVideoPlayer 
                                src={currentItem.data.videoUrl || ""}
                                poster={currentItem.data.thumbnailUrl}
                                autoPlay
                                className="w-full h-full object-cover"
                             />
                         )}
                         
                         {/* AI Pick Overlay */}
                         <div className="absolute top-4 left-4 z-20">
                             <div className="bg-brand-primary/90 text-white backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-wider shadow-lg">
                                 <Sparkles className="w-3 h-3 fill-current animate-pulse" />
                                 AI Pick of the Hour
                             </div>
                         </div>

                         {/* Info */}
                         <div className="absolute bottom-0 left-0 p-8 w-full z-10 bg-linear-to-t from-black/90 to-transparent">
                            <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow-xl mb-1 line-clamp-2">
                                {currentItem.data.title}
                            </h2>
                            <p className="text-white/80 font-medium">
                                {currentItem.data.host} • {currentItem.data.views}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/10 z-30">
                <motion.div 
                    className="h-full bg-kenya-red"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Navigation Dots (Optional, for context) */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-30">
                {items.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-white' : 'bg-white/30'}`}
                    />
                ))}
            </div>
        </div>
    );
}
