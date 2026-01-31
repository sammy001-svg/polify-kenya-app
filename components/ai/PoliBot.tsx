"use client";

import { useState, useRef, useEffect } from "react";
import { 
  X, 
  Send, 
  Bot, 
  Sparkles,
  ChevronDown,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

// Initial welcome message
const INITIAL_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "Hi! I'm PoliBot, your civic assistant. \n\nI can help you understand the **Constitution**, analyze **Bills**, or find your **Representative**. \n\nTry asking: 'What is Article 1?' or 'Summarize the Finance Bill'.",
  timestamp: new Date()
};

const KNOWLEDGE_BASE: Record<string, string> = {
    "finance bill": "The Finance Bill 2026 proposes new taxes on digital content (3%), eco-levies on imports, and a motor vehicle circulation tax. Supporters argue it reduces the deficit; opponents say it increases the cost of living.",
    "article 1": "Article 1 represents the Sovereignty of the People. It states that all sovereign power belongs to the people of Kenya and shall be exercised only in accordance with the Constitution.",
    "article 20": "Article 20 applies to the Bill of Rights. It states that the Bill of Rights applies to all law and binds all State organs and all persons.",
    "kibra": "Kibra constituency is represented by MP Peter Orero. Key projects include the ongoing road upgrades in Sarang'ombe ward.",
    "president": "The President of the Republic of Kenya is the Head of State and Government. The current President is William Ruto.",
    "corruption": "Report corruption to the EACC. You can also track project funds using our 'Project Tracker' feature to ensure accountability.",
    "taxes": "Current tax proposals are detailed in the Finance Bill 2026. See the 'Policy Decoded' section for a full breakdown of the fiscal load."
};

export function PoliBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: inputValue.trim(),
        timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI Latency
    setTimeout(() => {
        let response = "I'm still learning about that specific topic. Try asking about the 'Finance Bill', 'Article 1', or 'Kibra'.";
        
        const lowerInput = userMsg.content.toLowerCase();
        
        // Simple keyword matching for mock intelligence
        for (const [key, value] of Object.entries(KNOWLEDGE_BASE)) {
            if (lowerInput.includes(key)) {
                response = value;
                break;
            }
        }
        
        // Greeting override
        if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
            response = "Hello! Ready to explore Kenyan politics? How can I help?";
        }

        const aiMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: response,
            timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button 
                    className={cn(
                        "h-14 w-14 rounded-full shadow-2xl transition-all duration-300",
                        isOpen ? "bg-red-500 hover:bg-red-600 rotate-90" : "bg-linear-to-r from-brand-primary to-purple-600 hover:scale-110"
                    )}
                >
                    {isOpen ? <X className="w-6 h-6 text-white" /> : <Bot className="w-8 h-8 text-white" />}
                    
                    {!isOpen && (
                         <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kenya-gold opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-kenya-gold"></span>
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent 
                className="w-[380px] h-[600px] p-0 mr-4 mb-2 bg-brand-surface border border-white/10 shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5" 
                side="top" 
                align="end"
            >
                {/* Header */}
                <div className="p-4 bg-linear-to-r from-brand-primary/20 to-purple-600/20 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-brand-primary to-purple-600 flex items-center justify-center p-0.5">
                            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-white flex items-center gap-2">
                                PoliBot 
                                <span className="bg-brand-primary/20 text-brand-primary text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest border border-brand-primary/30">
                                    Beta
                                </span>
                            </h3>
                            <p className="text-xs text-brand-text-muted flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-kenya-green animate-pulse" /> Online
                            </p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-white" onClick={() => setIsOpen(false)}>
                        <ChevronDown className="w-5 h-5" />
                    </Button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent" ref={scrollRef}>
                    {messages.map((msg) => (
                        <div 
                            key={msg.id} 
                            className={cn(
                                "flex w-full mb-4",
                                msg.role === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            <div className={cn(
                                "max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed relative group",
                                msg.role === "user" 
                                    ? "bg-brand-primary text-white rounded-tr-none" 
                                    : "bg-brand-surface-secondary border border-white/5 text-brand-text rounded-tl-none"
                            )}>
                                <div className="markdown-prose">
                                   {msg.content.split('\n').map((line, i) => (
                                       <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
                                   ))}
                                </div>
                                <span className="text-[10px] opacity-40 mt-2 block text-right">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                
                                {msg.role === "assistant" && (
                                    <div className="absolute -bottom-6 left-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1 hover:text-kenya-green transition-colors"><ThumbsUp className="w-3 h-3" /></button>
                                        <button className="p-1 hover:text-kenya-red transition-colors"><ThumbsDown className="w-3 h-3" /></button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    
                    {isTyping && (
                        <div className="flex justify-start w-full animate-in fade-in slide-in-from-bottom-2">
                             <div className="bg-brand-surface-secondary border border-white/5 rounded-2xl rounded-tl-none p-4 flex gap-1 items-center">
                                <span className="w-2 h-2 bg-brand-text-muted rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-brand-text-muted rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-brand-text-muted rounded-full animate-bounce"></span>
                             </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className="p-4 bg-brand-surface border-t border-white/5">
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about bills, laws, politicians..."
                            className="w-full bg-brand-surface-highlight border border-white/10 rounded-full pl-5 pr-12 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-primary placeholder:text-brand-text-muted/50 transition-all"
                            autoFocus
                        />
                        <Button 
                            size="icon" 
                            className={cn(
                                "absolute right-1.5 top-1.5 h-8 w-8 rounded-full transition-all",
                                inputValue.trim() ? "bg-brand-primary text-white hover:bg-brand-primary/90" : "bg-transparent text-white/20"
                            )}
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim()}
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                    <p className="text-[10px] text-center text-brand-text-muted mt-3">
                        <Sparkles className="w-3 h-3 inline mr-1 text-kenya-gold" />
                        AI generated. Check critical info.
                    </p>
                </div>
            </PopoverContent>
        </Popover>
    </div>
  );
}
