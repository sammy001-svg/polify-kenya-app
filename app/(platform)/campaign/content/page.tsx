"use client";

import { useState, useRef, useCallback } from "react";
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
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { generateAIContent } from "@/actions/ai-content";
import { MOCK_CAMPAIGN_PROFILE } from "@/lib/campaign-profile";

type ContentType = "speech" | "social" | "press" | "flyer" | "video";

export default function ContentStudioPage() {
  const profile = MOCK_CAMPAIGN_PROFILE;
  const [activeType, setActiveType] = useState<ContentType>("speech");
  const [briefMessage, setBriefMessage] = useState("");
  const [tone, setTone] = useState("inspiring");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [userImage, setUserImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const flyerRef = useRef<HTMLDivElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleGenerate = async () => {
    if (!briefMessage) return;
    setIsGenerating(true);
    setGeneratedContent(""); 

    try {
      const result = await generateAIContent(activeType, briefMessage, tone, !!userImage);
      setGeneratedContent(result);
    } catch (error) {
      console.error("AI Generation Error:", error);
      setGeneratedContent("An error occurred during AI generation. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = async () => {
    if (!flyerRef.current) return;
    setIsDownloading(true);
    const toastId = toast.loading("Preparing high-quality PDF...");

    try {
      const canvas = await html2canvas(flyerRef.current, {
        scale: 2, // Standard high quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#000000", // Fallback bg
        logging: false, // Cleaner console
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95); // JPEG slightly smaller/faster than PNG
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      // A4 is 595.28 x 841.89 pt
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate ratio to fit the page
      const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
      const imgWidth = canvas.width * ratio;
      const imgHeight = canvas.height * ratio;
      
      // Center it
      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;

      pdf.addImage(imgData, "JPEG", x, y, imgWidth, imgHeight);
      pdf.save(`${profile.candidateName.toLowerCase().replace(/\s/g, "-")}-flyer.pdf`);
      
      toast.success("Success! Your flyer has been downloaded.", { id: toastId });
    } catch (err) {
      console.error("Failed to generate PDF", err);
      toast.error("Error: Could not generate PDF. Try using a simpler image or re-generating.", { id: toastId });
    } finally {
      setIsDownloading(false);
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
            Generate campaign speeches, social posts, flyers, and video scripts for {profile.candidateName}.
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

              {/* Image Upload Grid */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-brand-text-muted uppercase tracking-wider">
                  Image Content (Optional)
                </label>
                {userImage ? (
                   <div className="relative w-full aspect-video rounded-xl overflow-hidden group border border-border bg-black/20">
                     <Image src={userImage} alt="User upload" fill className="object-cover" />
                     <button 
                       onClick={() => setUserImage(null)}
                       className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-kenya-red"
                     >
                       <X className="w-4 h-4" />
                     </button>
                   </div>
                ) : (
                  <div 
                    {...getRootProps()} 
                    className={`h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${isDragActive ? "border-kenya-purple bg-kenya-purple/5" : "border-white/10 hover:border-white/20 hover:bg-white/5"}`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="w-5 h-5 text-brand-text-muted" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">
                      {isDragActive ? "Drop here" : "Upload Image"}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-brand-text-muted uppercase tracking-wider">
                  Brief Message
                </label>
                <Textarea
                  placeholder="e.g. My plan for youth jobs, why I'm running for ward 4..."
                  className="bg-brand-surface-secondary border-transparent resize-none h-24"
                  value={briefMessage}
                  onChange={(e) => setBriefMessage(e.target.value)}
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
                disabled={!briefMessage || isGenerating}
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
                      disabled={isDownloading}
                      className="bg-kenya-red hover:bg-kenya-red/90 text-white min-w-[140px]"
                    >
                      {isDownloading ? (
                        <>
                          <Sparkles className="w-4 h-4 mr-2 animate-spin" /> Preparing...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" /> Download PDF
                        </>
                      )}
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
                    <div className="flex-1 flex items-center justify-center p-4 bg-black/20 rounded-lg overflow-auto">
                      {(() => {
                        let data;
                        try {
                          data = JSON.parse(generatedContent);
                        } catch {
                          return (
                            <div className="text-center p-8 bg-brand-surface-secondary rounded-xl border border-dashed border-white/20">
                              <Sparkles className="w-8 h-8 mx-auto mb-4 text-brand-text-muted" />
                              <p className="text-sm font-medium">Please re-generate your flyer to see the latest design.</p>
                            </div>
                          );
                        }
                        
                        return (
                          <div
                            ref={flyerRef}
                            className="w-[400px] h-[560px] text-white p-8 flex flex-col justify-between relative shadow-2xl"
                            style={{
                              background: "linear-gradient(to bottom right, #060a11, #000000)",
                              backgroundImage: `linear-gradient(to bottom right, rgba(6, 10, 17, 0.9), rgba(0, 0, 0, 0.95)), url('${userImage || "/placeholder-bg.jpg"}')`,
                              backgroundSize: "cover",
                              backgroundBlendMode: "overlay",
                            }}
                          >
                            <div className="absolute top-0 right-0 p-4">
                              <div className="w-16 h-16 bg-kenya-red rounded-full flex items-center justify-center font-black text-xl shadow-lg border-2 border-white/20">
                                Vote
                              </div>
                            </div>
                            
                            <div className="z-10 mt-6">
                              <h2 className={`font-black uppercase leading-tight mb-4 text-kenya-yellow drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] ${data.headline?.length > 30 ? 'text-3xl' : 'text-4xl'}`}>
                                {data.headline}
                              </h2>
                              <p className="text-lg font-medium text-white drop-shadow-md italic opacity-90">
                                {data.slogan}
                              </p>
                            </div>

                            <div className="z-10 space-y-4 my-6">
                              {[data.bullet1, data.bullet2, data.bullet3].map((bullet, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                                  <span className="text-kenya-green font-bold text-xl drop-shadow-sm">✓</span>
                                  <span className="font-bold text-sm tracking-wide">
                                    {bullet}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <div className="z-10 border-t border-white/20 pt-4 flex items-center justify-between">
                              <div>
                                <p className="text-[9px] uppercase font-black tracking-[0.25em] text-kenya-yellow/70 mb-1">
                                  Candidate for {profile.office}
                                </p>
                                <p className="text-2xl font-black tracking-tighter leading-none">{profile.candidateName}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-3xl mb-1 grayscale brightness-125">{profile.partyLogo}</div>
                                <p className="text-[10px] text-white/50 font-black uppercase tracking-widest">
                                  {profile.party}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  ) : activeType === "video" ? (
                    <div className="prose prose-invert max-w-none flex-1">
                      <div className="bg-black/50 p-6 rounded-lg border border-white/10 font-mono text-sm leading-relaxed">
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
