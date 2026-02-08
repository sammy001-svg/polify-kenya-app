"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send, Bot, User, BarChart } from "lucide-react";
import { analyzeIEBCData, askIEBCAI } from "@/lib/iebc-ai";

interface Message {
  role: "ai" | "user";
  content: string;
  type?: "analysis" | "answer";
}

export function AIAnalyst() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: "ai",
      content:
        "Jambo! I am the IEBC AI Analyst. I can help you analyze electoral data or answer questions about the IEBC. Try clicking 'Analyze Live Data' or ask me a question!",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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
    <Card className="bg-brand-surface border-white/5 h-[600px] flex flex-col">
      <CardHeader className="border-b border-white/5">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Polify AI Analyst
          </CardTitle>
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
          >
            <BarChart className="w-4 h-4" />
            {isAnalyzing ? "Analyzing..." : "Analyze Live Data"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "ai" && (
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-purple-400" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-brand-surface-secondary text-white"
                    : "bg-white/5 text-brand-text border border-white/5"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}
          {isAnalyzing && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-white/5 bg-black/20">
          <div className="flex gap-2">
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
              className="min-h-[50px] bg-brand-bg border-white/10 focus-visible:ring-purple-500/50 resize-none"
              disabled={isAnalyzing}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isAnalyzing}
              size="icon"
              className="h-[50px] w-[50px] bg-white text-black hover:bg-white/90"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
