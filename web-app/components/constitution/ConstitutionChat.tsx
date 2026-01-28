"use client";

import { useState, useRef, useEffect } from "react";
import { ConstitutionArticle, searchConstitution } from "@/lib/constitution-data";
import { cn } from "@/lib/utils";
import { Send, Scale, Book, Sparkles, User, Bot } from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  source?: ConstitutionArticle; // Citation
}

const COMMON_QUESTIONS = [
  "Can police search my phone?",
  "Do I have the right to protest?",
  "Is healthcare a right?"
];

export function ConstitutionChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'welcome', 
      role: 'assistant', 
      content: "Jambo! I am your Constitutional Guardian. I can cite specific articles to help you understand your rights. What would you like to know?" 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    // 1. User Message
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // 2. Simulate AI Processing
    setTimeout(() => {
      // Simple Keyword Search "RAG"
      const relevantArticle = searchConstitution(text);
      
      let aiContent = "I'm sorry, I couldn't find a specific article matching your query in my database. Could you try rephrasing?";
      
      if (relevantArticle) {
         if (relevantArticle.id === 'art-37') aiContent = "Yes, absolutely. The Constitution guarantees your freedom of assembly and picketing.";
         else if (relevantArticle.id === 'art-31') aiContent = "No, they generally cannot without a warrant. Your privacy is protected, including your communications.";
         else if (relevantArticle.id === 'art-43') aiContent = "Yes, the Constitution explicitly states that every person has the right to the highest attainable standard of health.";
         else if (relevantArticle.id === 'art-35') aiContent = "Yes, you have the right to access information held by the State.";
         else aiContent = `Here is what the Constitution says about ${relevantArticle.keywords[0]}...`;
      }

      setMessages(prev => [...prev, { 
        id: crypto.randomUUID(), 
        role: 'assistant', 
        content: aiContent,
        source: relevantArticle
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[600px] bg-brand-surface border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative">
       {/* Header */}
       <div className="p-4 border-b border-white/5 bg-black/40 backdrop-blur-md z-10 flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-linear-to-tr from-kenya-gold to-yellow-600 flex items-center justify-center shadow-lg shadow-kenya-gold/20">
               <Scale className="w-5 h-5 text-black" />
           </div>
           <div>
               <h3 className="font-bold text-white text-sm">Constitutional Guardian</h3>
               <p className="text-[10px] text-brand-text-muted uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-kenya-green animate-pulse" /> Active • 2010 Constitution
               </p>
           </div>
       </div>

       {/* Chat Area */}
       <div 
         ref={scrollRef}
         className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
       >
          {messages.map((msg) => (
             <div key={msg.id} className={cn("flex flex-col gap-2", msg.role === 'user' ? "items-end" : "items-start")}>
                 {/* Message Bubble */}
                 <div className="flex gap-3 max-w-[85%]">
                     {msg.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-brand-surface-highlight border border-white/10 flex items-center justify-center shrink-0 mt-1">
                           <Bot className="w-4 h-4 text-kenya-gold" />
                        </div>
                     )}
                     
                     <div className={cn(
                       "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                       msg.role === 'user' 
                         ? "bg-brand-primary text-white rounded-tr-none" 
                         : "bg-brand-surface-secondary border border-white/10 text-gray-100 rounded-tl-none"
                     )}>
                        {msg.content}
                     </div>

                     {msg.role === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-brand-surface-highlight border border-white/10 flex items-center justify-center shrink-0 mt-1">
                           <User className="w-4 h-4 text-white" />
                        </div>
                     )}
                 </div>

                 {/* Citation Card (if source exists) */}
                 {msg.source && (
                    <div className="ml-11 max-w-[80%] animate-in slide-in-from-left-4 fade-in duration-700">
                        <div className="bg-kenya-gold/10 border border-kenya-gold/30 rounded-xl p-4 relative group hover:bg-kenya-gold/20 transition-colors">
                            <div className="absolute top-0 right-0 p-2 opacity-50">
                               <Book className="w-12 h-12 text-kenya-gold/20" />
                            </div>
                            
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[9px] font-black uppercase text-kenya-gold bg-kenya-gold/10 px-2 py-0.5 rounded tracking-wider">
                                   citation
                                </span>
                                <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
                                   {msg.source.chapter}
                                </span>
                            </div>
                            
                            <h4 className="text-sm font-bold text-white mb-2 underline decoration-kenya-gold/50 underline-offset-4">
                               Article {msg.source.number}: {msg.source.title}
                            </h4>
                            <p className="text-xs text-brand-text-muted italic leading-relaxed border-l-2 border-kenya-gold pl-3">
                               &quot;{msg.source.content}&quot;
                            </p>
                        </div>
                    </div>
                 )}
             </div>
          ))}

          {isTyping && (
             <div className="flex gap-3 ml-1">
                 <div className="w-8 h-8 rounded-full bg-brand-surface-highlight border border-white/10 flex items-center justify-center shrink-0">
                     <Bot className="w-4 h-4 text-kenya-gold" />
                 </div>
                 <div className="bg-brand-surface-secondary border border-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1.5 items-center h-12 w-20">
                     <span className="w-2 h-2 bg-brand-text-muted rounded-full animate-bounce [animation-delay:-0.3s]" />
                     <span className="w-2 h-2 bg-brand-text-muted rounded-full animate-bounce [animation-delay:-0.15s]" />
                     <span className="w-2 h-2 bg-brand-text-muted rounded-full animate-bounce" />
                 </div>
             </div>
          )}
       </div>

       {/* Input Area */}
       <div className="p-4 border-t border-white/5 bg-black/40 backdrop-blur-md space-y-3">
           {/* Quick Chips */}
           {messages.length < 3 && !isTyping && (
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                 {COMMON_QUESTIONS.map((q, i) => (
                   <button 
                      key={i} 
                      onClick={() => handleSend(q)}
                      className="whitespace-nowrap text-[10px] px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-kenya-gold/30 transition-colors text-brand-text-muted hover:text-white flex items-center gap-1.5"
                   >
                      <Sparkles className="w-3 h-3 text-kenya-gold opacity-50" /> {q}
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
                placeholder="Ask about your rights..."
                className="w-full bg-brand-surface-highlight border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-hidden focus:border-kenya-gold/50 focus:ring-1 focus:ring-kenya-gold/50 placeholder:text-white/20 pr-12 shadow-inner"
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-kenya-gold hover:text-black transition-all"
              >
                 <Send className="w-4 h-4" />
              </button>
           </div>
       </div>
    </div>
  );
}
