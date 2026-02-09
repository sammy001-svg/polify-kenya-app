"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send, Bot, User, BarChart } from "lucide-react";
import { analyzeIEBCData, askIEBCAI, AIResponse } from "@/lib/iebc-ai";

interface Message {
  role: "ai" | "user";
  content: string;
  type?: AIResponse["type"];
}

export function AIAnalyst() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content:
        "Jambo! I am the IEBC AI Analyst. I can help you analyze electoral data or answer questions about the IEBC. Try clicking 'Analyze Live Data' or ask me a question!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: "Analyze the current live data." },
    ]);

    try {
      const response = await analyzeIEBCData();
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: response.text, type: "analysis" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Sorry, I encountered an error analyzing the data.",
        },
      ]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const question = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setIsAnalyzing(true);

    try {
      const response = await askIEBCAI(question);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: response.text, type: "answer" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Sorry, I couldn't process your request." },
      ]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="bg-brand-surface border-white/5 h-[600px] flex flex-col shadow-xl shadow-purple-900/5">
      <CardHeader className="border-b border-white/5 bg-brand-surface-secondary/30">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 rounded-lg bg-purple-500/10">
               <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            IEBC AI Analyst
          </CardTitle>
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 text-white gap-2 shadow-lg shadow-purple-600/20 transition-all hover:scale-105"
          >
            <BarChart className="w-4 h-4" />
            {isAnalyzing ? "Analyzing..." : "Analyze Live Data"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth" ref={scrollRef}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "ai" && (
                <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/10">
                  <Bot className="w-5 h-5 text-purple-400" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm shadow-md leading-relaxed ${
                  msg.role === "user"
                    ? "bg-purple-600 text-white rounded-tr-none"
                    : "bg-brand-surface-secondary/80 text-brand-text border border-white/5 rounded-tl-none backdrop-blur-sm"
                }`}
              >
                <div className="whitespace-pre-wrap font-medium">{msg.content}</div>
                {msg.type === "analysis" && (
                   <div className="mt-2 text-xs text-purple-300/80 font-mono border-t border-white/10 pt-2 flex items-center gap-1">
                      <BarChart className="w-3 h-3" />
                      Live Data Analysis
                   </div>
                )}
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-purple-600/20">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}
          {isAnalyzing && (
            <div className="flex gap-4 items-center animate-pulse">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex gap-1 bg-brand-surface-secondary/50 px-4 py-3 rounded-2xl rounded-tl-none">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-white/5 bg-brand-surface-secondary/30 backdrop-blur-md">
          <div className="flex gap-3 items-end">
            <Textarea
              placeholder="Ask about voters, centres, or electoral laws..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="min-h-[50px] bg-brand-bg/50 border-white/10 focus:border-purple-500/50 focus-visible:ring-purple-500/20 resize-none rounded-xl"
              disabled={isAnalyzing}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isAnalyzing}
              size="icon"
              className="h-[50px] w-[50px] bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-600/20 rounded-xl transition-all active:scale-95"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
