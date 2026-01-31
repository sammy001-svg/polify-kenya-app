"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Book, ChevronRight, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  getArticlesByChapter, 
  getChapterMetadata, 
  CONSTITUTION_CHAPTERS
} from "@/lib/constitution-data";

export default function ChapterPage() {
  const params = useParams();
  const router = useRouter();
  const chapterId = params.chapterId as string;
  
  const chapter = getChapterMetadata(chapterId);
  const articles = getArticlesByChapter(chapterId);

  if (!chapter) {
      if (!chapterId) return <div className="p-10 text-white">Loading...</div>; // Handling initial mount if params undefined
      
      return (
          <div className="p-10 text-center">
              <h1 className="text-2xl font-bold text-white mb-4">Chapter Not Found</h1>
              <Button onClick={() => router.push('/constitution')}>Return to Constitution</Button>
          </div>
      )
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] overflow-hidden">
        {/* Sidebar: Chapter Navigation (Desktop) */}
        <div className="w-80 border-r border-white/5 bg-black/20 hidden lg:flex flex-col">
            <div className="p-4 border-b border-white/5">
                <Link href="/constitution" className="flex items-center gap-2 text-sm text-brand-text-muted hover:text-white transition-colors mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Overview
                </Link>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-kenya-green/10 flex items-center justify-center border border-kenya-green/20">
                        <Book className="w-4 h-4 text-kenya-green" />
                    </div>
                    <span className="font-bold text-white">Chapters</span>
                </div>
            </div>
            
            <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                    {CONSTITUTION_CHAPTERS.map((c) => (
                        <Link 
                            key={c.id} 
                            href={`/constitution/${c.id}`}
                            className={`flex items-center justify-between p-3 rounded-xl transition-all text-sm group ${
                                c.id === chapterId 
                                ? "bg-brand-primary/20 text-brand-primary border border-brand-primary/30" 
                                : "text-brand-text-muted hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <span className="font-medium truncate">{c.title}</span>
                            {c.id === chapterId && <ChevronRight className="w-4 h-4" />}
                        </Link>
                    ))}
                </div>
            </ScrollArea>
        </div>

        {/* Main Content: Articles */}
        <div className="flex-1 flex flex-col bg-brand-surface">
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-brand-surface shrink-0">
                <div className="lg:hidden mb-4">
                    <Link href="/constitution" className="flex items-center gap-2 text-sm text-brand-text-muted hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Overview
                    </Link>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                        <div className="text-xs uppercase tracking-widest font-bold text-brand-primary mb-1">
                            {chapter.articlesRange}
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                            {chapter.title}
                        </h1>
                        <p className="text-brand-text-muted text-lg max-w-2xl">
                            {chapter.description}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="border-white/10 hover:bg-white/5">
                            <Share2 className="w-4 h-4 text-brand-text-muted" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Articles List */}
            <ScrollArea className="flex-1 p-6">
                <div className="max-w-4xl mx-auto space-y-8 pb-20">
                    {articles.length > 0 ? (
                        articles.map((article) => (
                            <div key={article.id} className="group relative">
                                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-brand-primary/0 group-hover:bg-brand-primary/50 transition-all rounded-full" />
                                
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="font-black text-kenya-green text-sm uppercase tracking-wide">
                                        Article {article.number}
                                    </span>
                                    <h3 className="font-bold text-xl text-white">
                                        {article.title}
                                    </h3>
                                </div>
                                
                                <div className="prose prose-invert prose-p:text-brand-text-muted prose-p:leading-relaxed max-w-none ml-0 md:ml-0 bg-black/20 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                    <p>{article.content}</p>
                                </div>

                                <div className="flex gap-2 mt-3 ml-0">
                                     {article.keywords.map(k => (
                                         <span key={k} className="text-[10px] bg-white/5 text-brand-text-muted px-2 py-1 rounded-full border border-white/5">
                                             #{k}
                                         </span>
                                     ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                             <Book className="w-12 h-12 text-white/20 mx-auto mb-4" />
                             <h3 className="text-white font-bold mb-2">Content Coming Soon</h3>
                             <p className="text-brand-text-muted max-w-md mx-auto">
                                 The full text for this chapter is being digitized and will be available shortly. 
                                 <br/>Try searching for specific articles in the chat assistant.
                             </p>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    </div>
  );
}
