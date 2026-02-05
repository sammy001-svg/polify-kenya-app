"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Sparkles,
  Mic,
  Twitter,
  Newspaper,
  Copy,
  Check,
  Wand2,
  FileImage,
  Video,
  Download,
} from "lucide-react";
import Link from "next/link";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

type ContentType = "speech" | "social" | "press" | "flyer" | "video";

export default function ContentStudioPage() {
  const [activeType, setActiveType] = useState<ContentType>("speech");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("inspiring");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [copied, setCopied] = useState(false);
  const flyerRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    if (!topic) return;
    setIsGenerating(true);
    setGeneratedContent(""); // Clear previous

    // Simulate AI generation
    setTimeout(() => {
      let content = "";
      if (activeType === "speech") {
        content = `[OPENING]\nMy fellow citizens, we gather here today not just to talk, but to act. The issue of ${topic} has weighed heavily on our community for too long.\n\n[BODY]\nI have listened to your concerns. I have walked the streets of our wards. And I tell you this: We will fix this. By implementing strict oversight and allocating resources where they matter most, we will turn the tide on ${topic}.\n\n[CLOSING]\nTogether, we are unstoppable. Let us march forward towards a brighter future! Thank you, and God bless you all.`;
      } else if (activeType === "social") {
        content = `🚨 TIME FOR ACTION!\n\nWe cannot ignore the ${topic} crisis any longer. My administration promises IMMEDIATE solutions, not just empty talk. \n\nAre you with me? 👇 #Campaign2027 #Fix${topic.replace(/\s/g, "")} #Leadership`;
      } else if (activeType === "press") {
        content = `FOR IMMEDIATE RELEASE\n\nSTATEMENT ON ${topic.toUpperCase()}\n\n[CITY, Date] – The Campaign Office firmly addresses the ongoing situation regarding ${topic}. We categorically state our commitment to transparency and rapid development.\n\n"We are rolling out a 3-point plan to tackle this head-on," said the Candidate. "Our focus remains on the people."\n\n###`;
      } else if (activeType === "flyer") {
        // For flyer, we just set a flag or short copy, the visual preview will handle the rest
        content = JSON.stringify({
          headline: `A New Vision for ${topic}`,
          slogan: "Leadership That Listens, Action That Matters",
          bullet1: "✔ Community-first solutions",
          bullet2: "✔ Transparency & Accountability",
          bullet3: "✔ Immediate Resource Allocation",
        });
      } else if (activeType === "video") {
        content = `[SCENE START]\n\nFADE IN:\n\nINT. CAMPAIGN OFFICE - DAY\n\nCandidate looks comfortably into the camera.\n\nCANDIDATE\n"They said it couldn't be done. They said ${topic} was too complex."\n\nCUT TO:\n\nMontage of community work and engagement.\n\nCANDIDATE (V.O)\n"But we are proving them wrong every single day."\n\nGRAPHIC ON SCREEN: VOTE FOR CHANGE\n\n[SCENE END]`;
      }

      setGeneratedContent(content);
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = async () => {
    if (!flyerRef.current) return;

    try {
      const canvas = await html2canvas(flyerRef.current, {
        scale: 2, // Higher resolution
        useCORS: true, // Handle images if any
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("campaign-flyer.pdf");
    } catch (err) {
      console.error("Failed to generate PDF", err);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-border pb-6">
        <Link
          href="/campaign"
          className="p-2 hover:bg-brand-surface-secondary rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-brand-text-muted" />
        </Link>
        <div>
          <h1 className="text-3xl font-black mb-1 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-kenya-purple" />
            AI Content Studio
          </h1>
          <p className="text-brand-text-muted">
            Generate campaign speeches, social posts, flyers, and video scripts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Content Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-bold text-brand-text-muted uppercase tracking-wider">
                  Content Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => { setActiveType("speech"); setGeneratedContent(""); }}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${activeType === "speech" ? "bg-kenya-purple/10 border-kenya-purple text-kenya-purple" : "bg-brand-surface-secondary border-transparent hover:border-brand-text-muted/20"}`}
                  >
                    <Mic className="w-5 h-5" />
                    <span className="text-xs font-bold">Speech</span>
                  </button>
                  <button
                    onClick={() => { setActiveType("social"); setGeneratedContent(""); }}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${activeType === "social" ? "bg-blue-500/10 border-blue-500 text-blue-500" : "bg-brand-surface-secondary border-transparent hover:border-brand-text-muted/20"}`}
                  >
                    <Twitter className="w-5 h-5" />
                    <span className="text-xs font-bold">Social</span>
                  </button>
                  <button
                    onClick={() => { setActiveType("press"); setGeneratedContent(""); }}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${activeType === "press" ? "bg-kenya-orange/10 border-kenya-orange text-kenya-orange" : "bg-brand-surface-secondary border-transparent hover:border-brand-text-muted/20"}`}
                  >
                    <Newspaper className="w-5 h-5" />
                    <span className="text-xs font-bold">Press</span>
                  </button>
                  <button
                    onClick={() => { setActiveType("flyer"); setGeneratedContent(""); }}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${activeType === "flyer" ? "bg-green-500/10 border-green-500 text-green-500" : "bg-brand-surface-secondary border-transparent hover:border-brand-text-muted/20"}`}
                  >
                    <FileImage className="w-5 h-5" />
                    <span className="text-xs font-bold">Flyer</span>
                  </button>
                  <button
                    onClick={() => { setActiveType("video"); setGeneratedContent(""); }}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${activeType === "video" ? "bg-pink-500/10 border-pink-500 text-pink-500" : "bg-brand-surface-secondary border-transparent hover:border-brand-text-muted/20"}`}
                  >
                    <Video className="w-5 h-5" />
                    <span className="text-xs font-bold">Video</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-brand-text-muted uppercase tracking-wider">
                  Topic / Core Policy
                </label>
                <Textarea
                  placeholder="e.g. Youth Unemployment, Road Infrastructure in Ward 4..."
                  className="bg-brand-surface-secondary border-transparent resize-none h-24"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-brand-text-muted uppercase tracking-wider">
                  Tone
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Inspiring", "Aggressive", "Empathetic", "Fact-Based"].map(
                    (t) => (
                      <button
                        key={t}
                        onClick={() => setTone(t.toLowerCase())}
                        className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${tone === t.toLowerCase() ? "bg-white text-black border-white" : "bg-transparent border-brand-text-muted/30 text-brand-text-muted hover:border-white/50"}`}
                      >
                        {t}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!topic || isGenerating}
                className="w-full h-12 bg-linear-to-r from-kenya-purple to-indigo-600 hover:opacity-90 text-white font-black uppercase tracking-widest text-sm"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />{" "}
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" /> Generate Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Output Area */}
        <div className="lg:col-span-2">
          <Card className="h-full border-border bg-brand-surface-highlight/10 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/50">
              <div>
                <CardTitle className="text-lg">Generated Draft</CardTitle>
                <CardDescription>
                  Review and edit before publishing.
                </CardDescription>
              </div>
              {generatedContent && (
                <div className="flex gap-2">
                  {activeType === "flyer" ? (
                    <Button
                      size="sm"
                      onClick={handleDownloadPDF}
                      className="bg-kenya-red hover:bg-kenya-red/90 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" /> Download PDF
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </div>
              )}
            </CardHeader>
            <CardContent className="flex-1 p-6 flex flex-col">
              {generatedContent ? (
                <>
                  {activeType === "flyer" ? (
                    <div className="flex-1 flex items-center justify-center p-4 bg-gray-100 rounded-lg overflow-auto">
                      <div
                        ref={flyerRef}
                        className="w-[400px] h-[560px] text-white p-8 flex flex-col justify-between relative shadow-2xl"
                        style={{
                          background: "linear-gradient(to bottom right, #0f172a, #000000)",
                          backgroundImage: "linear-gradient(to bottom right, #0f172a, #000000), url('/placeholder-bg.jpg')",
                          backgroundSize: "cover",
                          backgroundBlendMode: "overlay",
                        }}
                      >
                        <div className="absolute top-0 right-0 p-4">
                          <div className="w-16 h-16 bg-kenya-red rounded-full flex items-center justify-center font-black text-xl">
                            Vote
                          </div>
                        </div>
                        <div className="z-10 mt-10">
                          <h2 className="text-4xl font-black uppercase leading-tight mb-4 text-kenya-yellow">
                            {JSON.parse(generatedContent).headline}
                          </h2>
                          <p className="text-lg font-medium text-gray-200">
                            {JSON.parse(generatedContent).slogan}
                          </p>
                        </div>

                        <div className="z-10 space-y-4 my-8">
                          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                            <span className="text-kenya-green font-bold text-xl">
                              ✓
                            </span>
                            <span className="font-bold">
                              {JSON.parse(generatedContent).bullet1.replace(
                                "✔ ",
                                "",
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                            <span className="text-kenya-green font-bold text-xl">
                              ✓
                            </span>
                            <span className="font-bold">
                              {JSON.parse(generatedContent).bullet2.replace(
                                "✔ ",
                                "",
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                            <span className="text-kenya-green font-bold text-xl">
                              ✓
                            </span>
                            <span className="font-bold">
                              {JSON.parse(generatedContent).bullet3.replace(
                                "✔ ",
                                "",
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="z-10 border-t border-white/30 pt-4 flex items-center justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-widest text-gray-400">
                              Candidate for Ward 4
                            </p>
                            <p className="text-xl font-black">Jane Doe</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-kenya-yellow font-bold">
                              #Campaign2027
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : activeType === "video" ? (
                    <div className="prose prose-invert max-w-none flex-1">
                      <div className="bg-black/50 p-6 rounded-lg border border-white/10 font-mono text-sm">
                        {generatedContent.split("\n").map((line, i) => (
                          <div
                            key={i}
                            className={`${line.includes("CANDIDATE") || line.includes("SCENE") ? "text-kenya-yellow font-bold mt-4" : "text-gray-300"}`}
                          >
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="prose prose-invert max-w-none">
                      <p className="whitespace-pre-wrap text-lg leading-relaxed font-serif text-brand-text/90">
                        {generatedContent}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-brand-text-muted opacity-50 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-brand-surface-secondary flex items-center justify-center">
                    <Sparkles className="w-10 h-10" />
                  </div>
                  <p className="text-sm font-medium">
                    Ready to create magic. Enter a topic to start.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
