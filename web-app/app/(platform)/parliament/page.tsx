"use client";

import { useState, useEffect } from "react";
import { NewsItem } from "@/lib/news-service"; // We need to export this type from client side or redefine it? Better to redefine or import type.
import { Search, Filter, BookOpen, ExternalLink, RefreshCw, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface ClientNewsItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  source: string;
  category: string;
  relevanceScore: number;
}

export default function ParliamentPage() {
  const [news, setNews] = useState<ClientNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/parliament/news");
      const data = await res.json();
      if (data.news) {
        setNews(data.news);
      }
    } catch (err) {
      console.error("Failed to fetch news", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.contentSnippet && item.contentSnippet.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = activeFilter === "All" || item.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col h-full bg-black/95">
      {/* Header & Search */}
      <div className="p-6 border-b border-white/5 bg-brand-surface sticky top-0 z-20">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
                <h1 className="text-2xl font-black tracking-tight flex items-center gap-3">
                   <span className="w-10 h-10 rounded-lg bg-kenya-green/10 flex items-center justify-center border border-kenya-green/20">
                      <Radio className="w-5 h-5 text-kenya-green animate-pulse" />
                   </span>
                   Parliament Watch
                   <span className="text-xs bg-kenya-red/20 text-kenya-red border border-kenya-red/30 px-2 py-0.5 rounded-full">LIVE</span>
                </h1>
                <p className="text-sm text-brand-text-muted mt-1 font-medium ml-1">
                   Real-time legislative updates & media analysis
                </p>
             </div>

             <div className="flex gap-2 w-full md:w-auto">
                 <div className="relative flex-1 md:w-80">
                    <Search className="w-4 h-4 text-brand-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="Search updates..." 
                      className="w-full bg-brand-surface-secondary border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-hidden focus:border-brand-primary/50 transition-all text-white placeholder:text-white/20"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                 </div>
                 <Button 
                   variant="outline" 
                   onClick={fetchNews}
                   className="border-white/10 bg-brand-surface-secondary text-brand-text-muted hover:text-white"
                 >
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Refresh
                 </Button>
             </div>
         </div>
         
         {/* Categories */}
         <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            {["All", "Legislation", "Debate", "Scandal", "Politics"].map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                        activeFilter === cat 
                        ? "bg-brand-primary/20 border-brand-primary text-brand-primary" 
                        : "bg-white/5 border-white/10 text-brand-text-muted hover:bg-white/10"
                    }`}
                >
                    {cat}
                </button>
            ))}
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
         {loading && news.length === 0 ? (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
            </div>
         ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredNews.map((item, idx) => (
                    <div key={idx} className="group relative flex flex-col justify-between bg-brand-surface border border-white/5 rounded-xl p-5 hover:border-brand-primary/30 transition-all hover:bg-brand-surface/80">
                        <div>
                            <div className="flex justify-between items-start mb-3">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                                    item.category === 'Scandal' ? 'bg-red-500/10 text-red-400' :
                                    item.category === 'Legislation' ? 'bg-blue-500/10 text-blue-400' :
                                    'bg-white/5 text-brand-text-muted'
                                }`}>
                                    {item.category}
                                </span>
                                <span className="text-[10px] text-brand-text-muted flex items-center gap-1">
                                    {item.source} • {formatDistanceToNow(new Date(item.pubDate), { addSuffix: true })}
                                </span>
                            </div>
                            
                            <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-brand-primary transition-colors line-clamp-3">
                                {item.title}
                            </h3>
                            
                            <p className="text-sm text-brand-text-muted line-clamp-4">
                                {item.contentSnippet}
                            </p>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                            <a 
                                href={item.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs font-bold text-white flex items-center gap-1 hover:underline"
                            >
                                Read Full Story <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                ))}
                
                {filteredNews.length === 0 && !loading && (
                    <div className="col-span-full text-center py-20 text-brand-text-muted">
                        No updates found matching your criteria.
                    </div>
                )}
             </div>
         )}
      </div>
    </div>
  );
}
