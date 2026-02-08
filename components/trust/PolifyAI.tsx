"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Send, Bot, BookOpen, ExternalLink } from "lucide-react";
import { searchConstitution } from "@/lib/constitution-data";
import { searchPlatformKnowledge } from "@/lib/bot-knowledge";
import { Button } from "@/components/ui/button";

export function PolifyAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<
    Array<{
      role: "user" | "bot";
      text: string;
      source?: { id: string; title: string; chapter: string; content: string };
      platformAction?: { text: string; link: string };
    }>
  >([
    {
      role: "bot",
      text: "Habari! I am Polify AI, your platform guide. Ask me about Election Results, Government Spending, or your Constitutional Rights.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!query.trim()) return;

    const userMessage = query;
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setQuery("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      // 1. Try Platform Knowledge first
      const platformMatch = searchPlatformKnowledge(userMessage);

      if (platformMatch) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: platformMatch.response,
            platformAction: platformMatch.link
              ? {
                  text: platformMatch.linkText || "View Section",
                  link: platformMatch.link,
                }
              : undefined,
          },
        ]);
      } else {
        // 2. Fallback to Constitution
        const article = searchConstitution(userMessage);
        let responseText =
          "I couldn't find a specific section or article on that, but the Constitution covers fundamental rights in Chapter 4. Would you like to see the Bill of Rights?";

        if (article) {
          responseText = `According to ${article.title} (${article.chapter}): "${article.content}"`;
        }

        setMessages((prev) => [
          ...prev,
          { role: "bot", text: responseText, source: article },
        ]);
      }
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button className="w-14 h-14 rounded-full bg-kenya-green hover:bg-kenya-green/90 hover:scale-105 shadow-[0_0_20px_rgba(0,140,81,0.3)] flex items-center justify-center group border-2 border-white/20 transition-all p-0">
              <Bot className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] bg-brand-surface border-l-border p-0 flex flex-col">
            <SheetHeader className="p-6 border-b border-white/5 bg-brand-surface-secondary">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-kenya-green/10 flex items-center justify-center border border-kenya-green/20 shadow-[0_0_15px_rgba(0,140,81,0.1)]">
                  <Bot className="w-6 h-6 text-kenya-green" />
                </div>
                <div>
                  <SheetTitle className="text-white text-lg font-black italic tracking-tighter">
                    Polify AI
                  </SheetTitle>
                  <p className="text-[10px] text-kenya-green font-black uppercase tracking-widest">
                    Digital Constitutionalist
                  </p>
                </div>
              </div>
            </SheetHeader>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      m.role === "user"
                        ? "bg-brand-primary text-black font-bold rounded-tr-none"
                        : "bg-brand-surface-highlight text-white border border-white/5 rounded-tl-none"
                    }`}
                  >
                    {m.text}
                    {m.source && (
                      <div className="mt-2 p-2 bg-black/20 rounded-lg border border-white/10 text-[10px] font-medium text-brand-text-muted">
                        <div className="flex items-center gap-1 mb-1">
                          <BookOpen className="w-3 h-3 text-kenya-gold" />
                          <span className="text-white">
                            Source: {m.source.id.toUpperCase()}
                          </span>
                        </div>
                        {m.source.title}
                      </div>
                    )}
                    {m.platformAction && (
                      <Link
                        href={m.platformAction.link}
                        onClick={() => setIsOpen(false)}
                        className="mt-3 flex items-center justify-between p-2.5 bg-kenya-green/10 border border-kenya-green/20 rounded-xl group/link transition-all hover:bg-kenya-green/20"
                      >
                        <span className="text-[11px] font-black text-kenya-green uppercase tracking-wider">
                          {m.platformAction.text}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-kenya-green group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </Link>
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
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
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
