"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck,
  BrainCircuit,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Waves,
  Send,
  Loader2,
  User,
  Bot,
  FileText,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { NATIONAL_PROJECTS } from "@/lib/national-projects";
import { BILLS } from "@/lib/parliament-data";
import { SAMPLE_POLITICIANS, KENYA_COUNTIES } from "@/lib/representatives";

// Types for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

export function AIConsultant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Intent Recognition and Grounded Response Logic
  const getGroundedResponse = (userInput: string): string => {
    const lowInput = userInput.toLowerCase();
    
    // GREETINGS (Human Nature)
    if (lowInput.match(/^(habari|hello|sasa|hi|mambo|jambo)/)) {
      const greetings = [
        "Habari yako! I'm your Polify Lead Consultant, fully synchronized with our national data. How can I help you today?",
        "Salama! It's rewarding to engage with a proactive citizen. What's on your mind—Bills, Projects, or Leadership?",
        "Jambo! I've been monitoring the civic feeds. Is there a specific initiative you'd like to dive into?",
        "Hello! I'm powered up and ready to analyze. How are you feeling about our current national progress?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // BILLS & PARLIAMENT
    const billMatch = BILLS.find(b => lowInput.includes(b.title.toLowerCase()) || lowInput.includes(b.id.toLowerCase()));
    if (billMatch || lowInput.includes("bill") || lowInput.includes("parliament") || lowInput.includes("hansard")) {
      if (billMatch) {
         return `The ${billMatch.title} is currently at the ${billMatch.stage} stage. Its status is marked as "${billMatch.status}". It focuses on ${billMatch.summary.slice(0, 100)}... There are ${billMatch.supportCount} supportive votes and ${billMatch.opposeCount} opposing. Where should we focus our analysis for this legislation?`;
      }
      return `I'm tracking ${BILLS.length} active bills in Parliament, including the ${BILLS[0].title} and ${BILLS[BILLS.length-1].title}. I also have access to Hansard records and real-time voting trends. Would you like a summary of the latest legislative sitting?`;
    }

    // LEADERS & REPRESENTATIVES
    const leaderMatch = SAMPLE_POLITICIANS.find(p => lowInput.includes(p.name.toLowerCase()));
    if (leaderMatch) {
      return `${leaderMatch.name} serves as ${leaderMatch.position} for ${leaderMatch.county || "National level"}. Affiliated with the ${leaderMatch.party} party. Their bio highlights: ${leaderMatch.bio}. Their track record includes ${leaderMatch.trackRecord?.billsSponsored || 0} bills sponsored and an attendance rate of ${leaderMatch.trackRecord?.attendanceRate || 0}%. What more would you like to know about their performance?`;
    }

    // COUNTIES
    const countyMatch = KENYA_COUNTIES.find(c => lowInput.includes(c.name.toLowerCase()));
    if (countyMatch) {
      const countyReps = SAMPLE_POLITICIANS.filter(p => p.county?.toLowerCase() === countyMatch.id.toLowerCase());
      return `In ${countyMatch.name} County, I'm analyzing data for several key leaders including ${countyReps.map(r => r.name).slice(0, 2).join(" and ")}. Their focus areas range from infrastructure to social welfare. Should we look at the specific projects currently active in ${countyMatch.name}?`;
    }

    // NATIONAL PROJECTS (Previous scope)
    const projectMatch = NATIONAL_PROJECTS.find(p => 
      lowInput.includes(p.title.toLowerCase()) || 
      p.tags.some(t => lowInput.includes(t.toLowerCase()))
    );
    if (projectMatch) {
      return `Ah, the ${projectMatch.title}. This falls under ${projectMatch.category}. It is currently ${projectMatch.status} with ${projectMatch.progress}% progress. Budget allocated is ${projectMatch.budget}. Shall we analyze the local impact in ${projectMatch.location}?`;
    }

    // CIVIC FEEDS & NEWS
    if (lowInput.includes("news") || lowInput.includes("feed") || lowInput.includes("activity") || lowInput.includes("happening")) {
      return "I'm integrated with our real-time Civic Feeds. Currently, we're tracking intense debates on finance and social health insurance. The community is particularly active in discussing national projects. I can summarize the top three trending civic stories for you—interested?";
    }

    // USER PROFILE & ROLE
    if (lowInput.includes("profile") || lowInput.includes("me") || lowInput.includes("my role") || lowInput.includes("account")) {
      return "As part of the Polify ecosystem, you're currently operating as a Strategic Analyst. Your profile enables you to track bills, monitor representatives, and analyze national projects in high resolution. Every interaction you have here helps build a clearer picture of our civic health. How can I more effectively support your mission today?";
    }

    // INFORMAL / PERSONAL
    if (lowInput.includes("how are you") || lowInput.includes("who are you")) {
      return "I'm fully operational and excited to be your guide! I'm the Polify Intelligence Hub—not just an AI, but a bridge between you and the heartbeat of Kenyan governance. I understand our bills, our leaders, our projects, and most importantly, your goals. What shall we achieve together today?";
    }

    // FALLBACK
    return `As your Lead Consultant, I recommend we explore that through one of our system nodes—perhaps by looking at relevant Bills or the track records of your Representatives. Which path should we take?`;
  };

  // Initialize Speech Synthesis Voices
  const initVoices = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return;

    // Priority: African language codes, then female names with authoritative profiles
    const africanLangs = ['en-KE', 'en-NG', 'en-ZA', 'sw-KE', 'en-GB'];
    const voice = voices.find(v => (v.lang === 'en-KE' || v.lang === 'sw-KE') && v.name.toLowerCase().includes('female'))
               || voices.find(v => v.lang === 'en-NG' && v.name.toLowerCase().includes('female'))
               || voices.find(v => v.lang === 'en-ZA' && v.name.toLowerCase().includes('female'))
               || voices.find(v => africanLangs.some(l => v.lang.includes(l)) && 
                          (v.name.toLowerCase().includes('female') || 
                           v.name.toLowerCase().includes('zira') || 
                           v.name.toLowerCase().includes('samantha'))) 
               || voices.find(v => v.lang.includes('en') && v.name.toLowerCase().includes('female'))
               || voices[0];
    setSelectedVoice(voice || null);
  }, []);

  useEffect(() => {
    // Initial check wrapped in timeout to avoid cascading render warning
    const timer = setTimeout(() => initVoices(), 0);
    
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = initVoices;
    }
    
    return () => {
      clearTimeout(timer);
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [initVoices]);

  const speak = useCallback((text: string) => {
    if (!isVoiceEnabled || typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Stop any current speech
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) utterance.voice = selectedVoice;
    
    // "Lead Voice" parameters: Lower pitch for authority, slightly slower for clarity
    utterance.pitch = 0.95; 
    utterance.rate = 0.85; 
    utterance.volume = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  }, [selectedVoice, isVoiceEnabled]);

  // Auto-welcome message with voice
  useEffect(() => {
    const welcome = setTimeout(() => {
      const welcomeContent = "Habari! Welcome to Polify AI Analysts. I'm your dedicated policy consultant. How can I help you navigate the complexities of Kenyan governance today? We can discuss national projects, policy initiatives, or even draft a legislative proposal together.";
      const welcomeMsg: Message = {
        id: "welcome",
        role: "ai",
        content: welcomeContent,
        timestamp: new Date(),
      };
      setMessages([welcomeMsg]);
      speak(welcomeContent);
    }, 1500);

    return () => {
      clearTimeout(welcome);
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [speak]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = useCallback(async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // AI "Thinking" state
    setTimeout(() => {
      const responseContent = getGroundedResponse(textToSend);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: responseContent,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      speak(responseContent);
    }, 2000);
  }, [input, speak]);

  // Initialize Speech Recognition
  useEffect(() => {
    const win = window as any;
    const Recognition = win.SpeechRecognition || win.webkitSpeechRecognition;
    
    if (Recognition) {
      const recognition = new Recognition() as SpeechRecognition;
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-KE';

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSend(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      
      // Use microtask to avoid cascading render lint
      Promise.resolve().then(() => setIsSpeechSupported(true));
    } else {
      Promise.resolve().then(() => setIsSpeechSupported(false));
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [handleSend]);

  const toggleListening = () => {
    if (!isSpeechSupported) {
      alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error("Speech recognition error:", e);
        setIsListening(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-6xl mx-auto w-full bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] relative group/main">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-kenya-gold/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Immersive Strategic Header */}
      <div className="p-10 border-b border-white/5 flex items-center justify-between bg-linear-to-b from-white/2 to-transparent relative z-10">
        <div className="flex items-center gap-6">
          <div className="relative">
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-4 bg-brand-primary/20 blur-2xl rounded-full" 
            />
            <div className="relative p-4 rounded-3xl bg-linear-to-br from-brand-primary/20 to-black border border-brand-primary/30 text-brand-primary shadow-2xl">
              <BrainCircuit className="w-8 h-8" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic flex items-center gap-3">
              Polify Intelligence Hub
              <span className="text-[10px] font-medium bg-brand-primary/20 text-brand-primary px-2 py-0.5 rounded-full tracking-normal normal-case not-italic">v4.2.0-Alpha</span>
            </h2>
            <div className="flex items-center gap-3 mt-1">
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2.5 h-2.5 rounded-full bg-kenya-green shadow-[0_0_10px_rgba(20,132,10,0.5)]" 
              />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Neural Node Synchronized</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            className={cn(
              "p-4 rounded-2xl border transition-all duration-700 relative group/btn",
              isVoiceEnabled ? "bg-brand-primary/10 border-brand-primary/50 text-brand-primary shadow-[0_0_20px_rgba(235,10,31,0.2)]" : "bg-white/5 border-white/10 text-white/20"
            )}
          >
            {isVoiceEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            {isVoiceEnabled && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-primary rounded-full animate-ping" />
            )}
          </motion.button>
          
          <div className="hidden lg:flex flex-col items-end">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-kenya-green" />
              <span className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em]">Encrypted Session</span>
            </div>
            <span className="text-[9px] font-medium text-white/20 uppercase tracking-widest">Kenya Govt Open Data Protocol 1.0</span>
          </div>
        </div>
      </div>

      {/* Chat Display Segment */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-10 py-12 space-y-12 scroll-smooth custom-scrollbar relative z-10"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg, idx) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: msg.role === 'user' ? 40 : -40, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "flex gap-8 group/msg",
                msg.role === "user" ? "ml-auto flex-row-reverse max-w-[70%]" : "mr-auto max-w-[85%]"
              )}
            >
              {/* Specialized Avatars */}
              <div className="relative shrink-0 mt-2">
                {msg.role === 'ai' && (
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute -inset-3 bg-kenya-gold/20 blur-xl rounded-full opacity-0 group-hover/msg:opacity-100 transition-opacity" 
                  />
                )}
                <div className={cn(
                  "relative p-4 rounded-2xl shadow-2xl transition-transform duration-500 group-hover/msg:scale-110",
                  msg.role === "user" ? "bg-linear-to-br from-brand-primary to-black border border-brand-primary/20 text-white" : "bg-linear-to-br from-white/10 to-black border border-white/10 text-kenya-gold"
                )}>
                  {msg.role === "user" ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                </div>
              </div>

              <div className={cn(
                "space-y-4",
                msg.role === "user" ? "text-right" : "text-left"
              )}>
                <div className={cn(
                  "relative p-8 overflow-hidden group/text",
                  msg.role === "user" 
                    ? "bg-linear-to-br from-brand-primary to-brand-primary/80 text-white rounded-[2.5rem] rounded-tr-none shadow-3xl shadow-brand-primary/20" 
                    : "bg-white/3 border border-white/8 text-white/90 rounded-[3rem] rounded-tl-none backdrop-blur-2xl"
                )}>
                  {/* Glass highlight effect */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-white/5 to-transparent pointer-events-none" />
                  
                  {msg.role === 'ai' && isSpeaking && idx === messages.length - 1 && (
                    <div className="flex gap-1.5 mb-6">
                       {[1,2,3,4,5,6].map(i => (
                         <motion.div 
                          key={i}
                          animate={{ height: [10, 24, 10], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                          className="w-1.5 bg-kenya-gold rounded-full"
                         />
                       ))}
                    </div>
                  )}
                  
                  <p className="text-base md:text-lg leading-[1.8] font-medium tracking-tight">
                    {msg.content}
                  </p>
                </div>
                
                <div className={cn(
                  "flex items-center gap-4 px-4 opacity-30 text-[9px] font-black uppercase tracking-[0.25em]",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}>
                  <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="w-1 h-1 rounded-full bg-white/50" />
                  <span>{msg.role === 'ai' ? 'Polify Intel Core' : 'Citizen Verified'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {(isTyping || isListening) && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-6 items-center px-4"
          >
            <div className="relative">
               <motion.div 
                animate={{ scale: [1, 1.4, 1], rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
                className={cn(
                  "absolute -inset-2 blur-lg rounded-full",
                  isListening ? "bg-kenya-green/30" : "bg-brand-primary/30"
                )} 
              />
              <div className="relative p-5 rounded-2xl bg-white/5 border border-white/10 shadow-2xl">
                {isListening ? (
                  <Waves className="w-6 h-6 text-kenya-green" />
                ) : (
                  <Loader2 className="w-6 h-6 text-brand-primary animate-spin" />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-black uppercase tracking-[0.4em] italic text-brand-primary animate-pulse">
                {isListening ? "Voice Protocol Engaged" : "Processing System Nodes"}
              </span>
              <span className="text-[9px] font-medium text-white/30 uppercase tracking-widest">
                {isListening ? "Waiting for audio input..." : "Fetching grounded intelligence..."}
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Floating Interaction Hub */}
      <div className="p-10 pb-12 relative z-20">
        <div className="max-w-4xl mx-auto relative group/input">
          {/* Input container border glow */}
          <div className={cn(
            "absolute -inset-1 rounded-[2.5rem] blur-xl opacity-20 transition-all duration-1000",
            isListening ? "bg-kenya-green opacity-40" : "bg-brand-primary group-hover/input:opacity-30"
          )} />
          
          <div className="relative flex items-center bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-3 shadow-3xl overflow-hidden">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isListening ? "Listening effectively..." : "Ask me anything about Polify..."}
              className={cn(
                "flex-1 bg-transparent py-6 px-8 text-xl font-bold text-white placeholder:text-white/10 focus:outline-hidden transition-all",
                isListening && "placeholder:text-kenya-green/40 italic"
              )}
            />
            
            <div className="flex items-center gap-4 pr-4">
               <motion.button 
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleListening}
                  className={cn(
                    "p-5 rounded-2xl transition-all duration-700 relative overflow-hidden",
                    isListening ? "bg-kenya-green text-white shadow-[0_0_40px_rgba(20,132,10,0.4)]" : "bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10"
                  )}
               >
                 <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                   {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                 </div>
                 {isListening && (
                    <motion.div 
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="absolute inset-0 bg-white/20 rounded-full"
                    />
                 )}
               </motion.button>

               <motion.button 
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="p-6 rounded-2xl bg-white text-black hover:bg-brand-primary hover:text-white disabled:opacity-10 disabled:grayscale transition-all shadow-2xl active:scale-95"
                >
                  <Send className="w-7 h-7" />
               </motion.button>
            </div>
          </div>
        </div>

        {/* System Intelligence Nodes */}
        <div className="flex flex-wrap items-center justify-center gap-12 mt-12 mb-4">
           {[
             { label: 'Parliamentary Bills', value: BILLS.length, color: 'text-brand-primary', icon: FileText },
             { label: 'Verified Representatives', value: SAMPLE_POLITICIANS.length, color: 'text-kenya-gold', icon: ShieldCheck },
             { label: 'Civic Feed Sync', value: 'Live', color: 'text-kenya-green', icon: Zap }
           ].map((node, i) => (
             <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="flex items-center gap-4 group/node"
             >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/node:bg-white/10 transition-colors">
                  <node.icon className={cn("w-4 h-4", node.color)} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] group-hover/node:text-white/60 transition-colors">{node.label}</span>
                    <span className={cn("text-[10px] font-black", node.color)}>{node.value}</span>
                  </div>
                  <div className="h-0.5 w-0 bg-brand-primary group-hover/node:w-full transition-all duration-500" />
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
}
