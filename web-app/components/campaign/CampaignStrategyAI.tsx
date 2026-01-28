"use client";

import { useState } from "react";
import { Send, Sparkles, Bot, User, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  "How can I improve youth engagement in Ward 4?",
  "Draft a speech for the market sanitation rally",
  "Analyze competitor weaknesses in Westlands"
];

export function CampaignStrategyAI() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'welcome', 
      role: 'assistant', 
      content: "Hello! I'm your Campaign Strategist. I've analyzed the latest ward data. We're seeing a dip in Westlands - shall we draft a counter-strategy?" 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on sentiment analysis, focusing on youth employment could swing the undecided vote by 12%. I recommend a targeted social media campaign.",
        "I've drafted 3 talking points for your rally: 1) Local job creation, 2) Transparent bursary funds, 3) Improved market lighting.",
        "Your opponent is gaining ground on the 'Water Shortage' issue. We should release your detailed infrastructure plan immediately."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: randomResponse 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="bg-brand-surface border border-white/5 rounded-xl flex flex-col h-[500px] relative overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/5 bg-black/20 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-linear-to-tr from-brand-primary to-purple-500 flex items-center justify-center">
           <Sparkles className="w-4 h-4 text-white animate-pulse" />
        </div>
        <div>
           <h3 className="font-bold text-white text-sm">Campaign Strategist</h3>
           <div className="flex items-center gap-1.5">
             <span className="w-1.5 h-1.5 rounded-full bg-kenya-green animate-pulse" />
             <p className="text-[10px] text-brand-text-muted uppercase tracking-wider">Online • Connected to Ward Data</p>
           </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex gap-3", msg.role === 'user' ? "justify-end" : "justify-start")}>
             {msg.role === 'assistant' && (
               <div className="w-6 h-6 rounded-full bg-brand-surface-highlight border border-white/10 flex items-center justify-center shrink-0 mt-1">
                 <Bot className="w-3 h-3 text-brand-primary" />
               </div>
             )}
             
             <div className={cn(
               "max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed",
               msg.role === 'user' 
                 ? "bg-brand-primary text-white rounded-tr-none" 
                 : "bg-brand-surface-secondary border border-white/5 text-gray-200 rounded-tl-none"
             )}>
                {msg.content}
             </div>

             {msg.role === 'user' && (
               <div className="w-6 h-6 rounded-full bg-brand-surface-highlight border border-white/10 flex items-center justify-center shrink-0 mt-1">
                 <User className="w-3 h-3 text-white" />
               </div>
             )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
             <div className="w-6 h-6 rounded-full bg-brand-surface-highlight border border-white/10 flex items-center justify-center shrink-0">
                 <Bot className="w-3 h-3 text-brand-primary" />
             </div>
             <div className="bg-brand-surface-secondary border border-white/5 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center h-10">
                <span className="w-1.5 h-1.5 bg-brand-text-muted rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-brand-text-muted rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-brand-text-muted rounded-full animate-bounce" />
             </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 bg-black/20 space-y-3">
         {/* Quick Suggestions */}
         {messages.length < 3 && !isTyping && (
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
               {SUGGESTIONS.map((s, i) => (
                 <button 
                    key={i} 
                    onClick={() => { setInput(s); handleSend(); }}
                    className="whitespace-nowrap text-[10px] px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-brand-primary/30 transition-colors text-brand-text-muted hover:text-white"
                 >
                    {s}
                 </button>
               ))}
            </div>
         )}

         <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for strategy advice..."
              className="w-full bg-brand-surface-highlight border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-hidden focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 placeholder:text-white/20 pr-12"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-brand-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-primary/90 transition-colors"
            >
               <Send className="w-4 h-4" />
            </button>
         </div>
      </div>
    </div>
  );
}
