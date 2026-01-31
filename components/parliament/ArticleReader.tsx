import { useEffect, useState } from "react";
import { ExternalLink, Loader2, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { CommentSection } from "@/components/parliament/CommentSection";

interface ArticleReaderProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
  originalTitle?: string;
}

interface ArticleData {
  title: string;
  byline: string;
  content: string;
  siteName: string;
  url: string;
}

export function ArticleReader({ url, isOpen, onClose, originalTitle }: ArticleReaderProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ArticleData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && url) {
      const fetchData = async () => {
          setLoading(true);
          setError(null);
          try {
            const res = await fetch(`/api/parliament/read?url=${encodeURIComponent(url)}`);
            if (!res.ok) throw new Error("Failed to load article");
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setData(data);
          } catch (err) {
            console.error(err);
            // We set a generic error string to trigger the error UI view
            setError("Unable to load article content.");
          } finally {
            setLoading(false);
          }
      };
      
      fetchData();
    }
  }, [isOpen, url]);


  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      {/* 
        Updated Layout:
        - Max width increased to 6xl for side-by-side view.
        - Grid layout: 1 column on mobile, 3 columns on lg screens.
        - Article takes 2 spans, Comments takes 1 span.
      */}
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] flex flex-col p-0 bg-brand-surface border-white/10 gap-0 overflow-hidden">
        <DialogHeader className="p-4 border-b border-white/10 flex flex-row items-center justify-between shrink-0 bg-brand-surface z-10">
            <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-kenya-green/10 flex items-center justify-center border border-kenya-green/20">
                    <Sparkles className="w-4 h-4 text-kenya-green" />
                </span>
                <div className="flex flex-col">
                    <DialogTitle className="text-sm font-bold text-white">Smart Reader</DialogTitle>
                    <span className="text-[10px] text-brand-text-muted">AI-Enhanced • Distraction Free</span>
                </div>
            </div>
            
            {/* Explicit Close Button for better UX in large modal */}
            <DialogClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4 text-white" />
                <span className="sr-only">Close</span>
            </DialogClose>
        </DialogHeader>

        <div className="flex-1 overflow-hidden relative bg-neutral-900/50 flex flex-col lg:flex-row">
            {/* Left Column: Article Content (Scrollable) */}
            <div className="flex-1 lg:basis-2/3 h-full overflow-hidden relative border-r border-white/5">
              {loading ? (
                  <div className="flex flex-col items-center justify-center h-full text-brand-text-muted gap-3">
                      <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
                      <p className="text-xs animate-pulse">Analyzing and extracting content...</p>
                  </div>
              ) : error ? (
                  <div className="flex flex-col items-center justify-center h-full text-brand-text-muted gap-4 p-8 text-center max-w-md mx-auto">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-2">
                          <ExternalLink className="w-8 h-8 text-white/50" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Read on Source</h3>
                      <p className="text-sm text-brand-text-muted mb-4">
                          This publisher protects their content from external readers. You can view the full story on their official website.
                      </p>
                      <Button 
                          className="bg-brand-primary text-black hover:bg-brand-primary/90 font-bold" 
                          onClick={() => window.open(url, '_blank')}
                      >
                          Open Article <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                  </div>
              ) : data ? (
                  <ScrollArea className="h-full w-full">
                      <div className="p-6 md:p-10 lg:p-12">
                        <article className="prose prose-invert prose-lg max-w-3xl mx-auto">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-4 leading-tight">
                                {data.title || originalTitle}
                            </h1>
                            
                            <div className="flex items-center gap-2 text-sm text-brand-text-muted mb-8 pb-8 border-b border-white/10">
                                {data.siteName && (
                                    <span className="font-bold text-brand-primary uppercase tracking-wider text-xs border border-brand-primary/30 px-2 py-0.5 rounded">
                                        {data.siteName}
                                    </span>
                                )}
                                {data.byline && <span>By {data.byline}</span>}
                                <a href={data.url} target="_blank" rel="noopener noreferrer" className="ml-auto flex items-center gap-1 hover:text-white transition-colors text-xs">
                                    Original Source <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>

                            {/* Content Injection */}
                            <div 
                                className="reader-content text-gray-300 leading-relaxed space-y-4"
                                dangerouslySetInnerHTML={{ __html: data.content }} 
                            />
                            
                            <div className="mt-12 pt-8 border-t border-white/10 text-center">
                                <p className="text-xs text-brand-text-muted italic">
                                    Content analyzed and reformatted by Political Intelligence AI. 
                                    All rights reserved to original publisher: {data.siteName}.
                                </p>
                            </div>
                        </article>
                      </div>
                  </ScrollArea>
              ) : null}
            </div>

            {/* Right Column: Comments (Sticky Sidebar) */}
            <div className="lg:basis-1/3 h-[40vh] lg:h-full bg-brand-surface/50 border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col">
               <CommentSection />
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
