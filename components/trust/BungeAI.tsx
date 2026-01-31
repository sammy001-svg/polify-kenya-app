"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Send, Bot, BookOpen } from "lucide-react";
import { searchConstitution } from "@/lib/constitution-data";
import { Button } from "@/components/ui/button";

export function BungeAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot', text: string, source?: { id: string, title: string, chapter: string, content: string } }>>([
    { role: 'bot', text: "Hello! I am Bunge AI. Ask me anything about the Kenyan Constitution or current Bills." }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!query.trim()) return;

    const userMessage = query;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setQuery("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const article = searchConstitution(userMessage);
      let responseText = "I couldn't find a specific article on that, but usually, the Constitution covers fundamental rights in Chapter 4. Would you like to see the Bill of Rights?";
      
      if (article) {
        responseText = `According to ${article.title} (${article.chapter}): "${article.content}"`;
      } else if (userMessage.toLowerCase().includes("budget")) {
        responseText = "The 2025/26 National Budget is KES 4.2 Trillion. Major allocations include Education (KES 628B) and Infrastructure (KES 395B). You can see the full breakdown in the Transparency Hub.";
      } else if (userMessage.toLowerCase().includes("tax")) {
        responseText = "Kenya uses a progressive tax system (PAYE) and 16% VAT. Use our Tax Calculator in the Transparency Hub to see exactly where your shillings go.";
      }

      setMessages(prev => [...prev, { role: 'bot', text: responseText, source: article }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button 
              className="w-14 h-14 rounded-full bg-linear-to-tr from-kenya-red to-kenya-green hover:scale-105 shadow-2xl flex items-center justify-center group border-2 border-white/20 transition-all p-0"
            >
              <Bot className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] bg-brand-surface border-l-border p-0 flex flex-col">
            <SheetHeader className="p-6 border-b border-white/5 bg-brand-surface-secondary">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-b from-kenya-green to-kenya-red flex items-center justify-center border border-white/10">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <SheetTitle className="text-white text-lg font-black">Bunge AI</SheetTitle>
                  <p className="text-[10px] text-kenya-gold font-black uppercase tracking-widest">Constitutional Guide</p>
                </div>
              </div>
            </SheetHeader>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-brand-primary text-black font-bold rounded-tr-none' 
                      : 'bg-brand-surface-highlight text-white border border-white/5 rounded-tl-none'
                  }`}>
                    {m.text}
                    {m.source && (
                      <div className="mt-2 p-2 bg-black/20 rounded-lg border border-white/10 text-[10px] font-medium text-brand-text-muted">
                        <div className="flex items-center gap-1 mb-1">
                          <BookOpen className="w-3 h-3 text-kenya-gold" />
                          <span className="text-white">Source: {m.source.id.toUpperCase()}</span>
                        </div>
                        {m.source.title}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-brand-surface-highlight p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-brand-text-muted rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-brand-text-muted rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-brand-text-muted rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-brand-surface-secondary border-t border-white/5">
              <div className="relative">
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Article 37 or Bills..."
                  className="w-full bg-brand-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-primary transition-colors pr-12"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1.5 p-2 bg-brand-primary rounded-lg text-black hover:scale-105 transition-transform"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
