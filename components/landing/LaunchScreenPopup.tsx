"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Zap, Activity, Cpu, X } from "lucide-react";

/**
 * LaunchScreenPopup Component
 * Provides a cinematic entry experience with a 5-second countdown, 
 * multi-color particle interactions (Kenyan palette), and a background 
 * celebratory image.
 */
export const LaunchScreenPopup = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [countdown, setCountdown] = useState(5);
    const [isLaunching, setIsLaunching] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number; warpDelay: number; angle: number; dist: number; color: string; }[]>([]);

    useEffect(() => {
        // Hydration fix: Prevent cascading renders by deferring state updates until next frame
        requestAnimationFrame(() => {
            setHasMounted(true);
            
            // Randomized sparkles only on the client (450 for high density)
            const colors = ["#bb1919", "#008c51", "#fdb931", "#ffffff"]; // Red, Green, Gold, White
            setSparkles(
                Array.from({ length: 450 }).map((_, i) => ({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 2 + 0.5,
                    duration: 2 + Math.random() * 3,
                    delay: Math.random() * 5,
                    warpDelay: Math.random() * 0.3, // Pre-calculated for pure render
                    angle: Math.random() * 360,
                    dist: 300 + Math.random() * 500, // Multiplied expansion for room-filling effect
                    color: colors[Math.floor(Math.random() * colors.length)],
                }))
            );
        });

        // Cinematic countdown timer (1.5s per tick)
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsLaunching(true);
                    // Sustained 6.0s "Warp-Rush" + 0.5s fade-out delay
                    setTimeout(() => setIsVisible(false), 6500);
                    return 0;
                }
                return prev - 1;
            });
        }, 1500);

        return () => clearInterval(timer);
    }, []);

    const handleEnter = () => setIsVisible(false);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-9999 flex items-center justify-center bg-black overflow-hidden font-inter"
            >
                {/* Background Image Layer: Celebratory Crowd */}
                <AnimatePresence>
                    {hasMounted && (
                        <motion.div 
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.4 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="absolute inset-0 z-0"
                        >
                            <Image 
                                src="/images/launch-bg.jpg"
                                alt="Kenyan Celebration"
                                fill
                                className="object-cover blur-[2px]"
                                priority
                            />
                            {/* Cinematic Overlays */}
                            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/80" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-70" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Accessibility Close Button */}
                <button 
                    onClick={handleEnter}
                    className="absolute top-8 right-8 z-50 p-2 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close Launch Screen"
                >
                    <X size={20} />
                </button>
                
                {/* Background HUD Layers */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent-red)_0%,transparent_70%)] opacity-20 pointer-events-none" />
                <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none" />
                
                {/* Animated Grid */}
                <div 
                    className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                    style={{ 
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '100px 100px'
                    }} 
                />

                {/* Rotating HUD Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[1200px] h-[1200px] border-white/3 rounded-full"
                    />
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[900px] h-[900px] border-2 border-dashed border-kenya-red/5 rounded-full"
                    />
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[600px] h-[600px] border border-kenya-gold/10 rounded-full"
                    />
                </div>

                {/* Left Side HUD Data Panels */}
                <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-8 opacity-20 hide-on-mobile pointer-events-none">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col gap-1">
                            <div className="w-32 h-px bg-zinc-800 overflow-hidden">
                                <motion.div 
                                    animate={{ x: [-128, 128] }}
                                    transition={{ duration: 2 + i, repeat: Infinity, ease: "linear" }}
                                    className="w-full h-full bg-kenya-red"
                                />
                            </div>
                            <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-zinc-500">Node_Channel_{1024 + i}</span>
                        </div>
                    ))}
                </div>

                {/* Right Side HUD System Stats */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-6 opacity-20 text-right hide-on-mobile pointer-events-none">
                     <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-kenya-gold">UPTIME</span>
                        <span className="text-xl font-mono text-white">99.99%</span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-kenya-gold">LATENCY</span>
                        <span className="text-xl font-mono text-white">12MS</span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-kenya-gold">AUTH_MODE</span>
                        <span className="text-xl font-mono text-white italic">PORTAL_X</span>
                     </div>
                </div>

                {/* Main Cinematic Content */}
                <div className="relative z-10 flex flex-col items-center max-w-4xl px-6 text-center">
                    {/* Logo Section */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-80 h-24 mb-6"
                    >
                        <div className="absolute inset-0 blur-[80px] bg-kenya-red/30 rounded-full animate-pulse" />
                        <Image
                            src="/images/polify-logo-v3.png"
                            alt="Polify Kenya Logo"
                            fill
                            className="object-contain relative z-10 brightness-[1.5] drop-shadow-[0_0_20px_rgba(187,25,25,0.6)]"
                            priority
                        />
                    </motion.div>

                    {/* Welcome Header */}
                    <motion.h2 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white text-xl font-black tracking-[0.6em] uppercase mb-16 ml-[0.6em]"
                    >
                        Welcome to Polify
                    </motion.h2>

                    {/* Countdown/Launch Timer */}
                    <div className="relative mb-20">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={countdown}
                                initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col items-center"
                            >
                                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-kenya-gold mb-4">
                                    Polify is Launching in
                                </span>
                                <span className="text-9xl md:text-[12rem] font-black text-white leading-none italic flex items-center justify-center">
                                    {countdown > 0 ? (
                                        countdown
                                    ) : (
                                        <motion.div
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                            className="relative w-80 h-32 md:w-[480px] md:h-48"
                                        >
                                            <Image 
                                                src="/images/polify-logo-v3.png"
                                                alt="Polify"
                                                fill
                                                className="object-contain brightness-[1.5] drop-shadow-[0_0_30px_rgba(187,25,25,0.8)]"
                                                priority
                                            />
                                        </motion.div>
                                    )}
                                </span>
                            </motion.div>
                        </AnimatePresence>

                        {/* Interactive Sparkle Layer */}
                        {hasMounted && sparkles.map((sparkle) => (
                            <motion.div
                                key={sparkle.id}
                                className="absolute bg-white rounded-full pointer-events-none"
                                initial={{ 
                                    opacity: 0,
                                    scale: 0,
                                    left: `${sparkle.x}%`,
                                    top: `${sparkle.y}%`,
                                }}
                                animate={isLaunching ? {
                                    opacity: [1, 0.8, 0],
                                    scale: [1, 20],
                                    x: [0, Math.cos(sparkle.angle) * sparkle.dist * 10],
                                    y: [0, Math.sin(sparkle.angle) * sparkle.dist * 10],
                                } : { 
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0],
                                    y: [0, -20],
                                }}
                                transition={{ 
                                    duration: isLaunching ? 6.0 : sparkle.duration,
                                    repeat: isLaunching ? 0 : Infinity,
                                    delay: isLaunching ? sparkle.warpDelay : sparkle.delay,
                                    ease: isLaunching ? [0.16, 1, 0.3, 1] : "easeInOut"
                                }}
                                style={{
                                    width: sparkle.size,
                                    height: sparkle.size,
                                    backgroundColor: sparkle.color,
                                    boxShadow: `0 0 10px ${sparkle.color}`,
                                    zIndex: isLaunching ? 10000 : 0
                                }}
                            />
                        ))}
                    </div>

                    {/* Operational Status */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-mono"
                    >
                        Initializing Portals / Syncing Data / <span className="text-kenya-red animate-pulse">Live</span>
                    </motion.div>

                    {/* Global Capability Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 opacity-30">
                        {[
                            { icon: ShieldCheck, label: "Verified Data" },
                            { icon: Activity, label: "Live Analytics" },
                            { icon: Zap, label: "Instant Access" },
                            { icon: Cpu, label: "AI Insights" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-3">
                                <item.icon className="text-white" size={20} />
                                <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-zinc-400">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom HUD System Labels */}
                <div className="absolute bottom-8 left-8 flex items-center gap-4">
                    <div className="w-10 h-px bg-zinc-800" />
                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.4em]">Polify_OS_Kernel_v2.5</span>
                </div>
                
                <div className="absolute bottom-8 right-8 flex items-center gap-4 text-right">
                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.4em]">Authorized_Access_Only</span>
                    <div className="w-10 h-px bg-zinc-800" />
                </div>

                {/* Corner Accents for HUD Alignment */}
                <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-white/5" />
                <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-white/5" />
                <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-white/5" />
                <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-white/5" />
            </motion.div>
        </AnimatePresence>
    );
};
