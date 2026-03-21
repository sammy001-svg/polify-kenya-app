"use client";

import { useState, useMemo } from "react";
import { 
  NATIONAL_PROJECTS, 
  PROJECT_CATEGORIES, 
} from "@/lib/national-projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { 
  BarChart3, 
  Globe2, 
  Search, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Calculator,
  Target
} from "lucide-react";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function NationalProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    return NATIONAL_PROJECTS.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const stats = [
    { label: "Active Projects", value: NATIONAL_PROJECTS.filter(p => p.status === "In Progress").length, icon: Zap, color: "text-kenya-gold" },
    { label: "Completed Promises", value: NATIONAL_PROJECTS.filter(p => p.status === "Completed").length, icon: ShieldCheck, color: "text-kenya-green" },
    { label: "Total Budget Tracked", value: "KSh 520B", icon: Calculator, color: "text-blue-400" },
    { label: "Delivery Score", value: "68%", icon: Target, color: "text-kenya-red" },
  ];

  return (
    <div className="min-h-screen text-white font-sans selection:bg-kenya-gold/30">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-kenya-gold/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-kenya-red/5 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      <div className="relative z-10 p-6 lg:p-12 space-y-12 max-w-[1600px] mx-auto">
        {/* Header Section */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-12 border-b border-white/5">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl group">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kenya-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-kenya-green"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted group-hover:text-white transition-colors">National Development Tracker • 2022-2027</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-white">
              PROJECTS <span className="text-transparent bg-clip-text bg-linear-to-r from-kenya-gold via-white to-kenya-red">&</span> PROMISES
            </h1>
            <p className="text-lg text-brand-text-muted font-medium max-w-xl">
               Real-time monitoring of Presidential pledges, infrastructure development, and budget transparency across the Republic of Kenya.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
            {stats.map((stat, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                key={stat.label} 
                className="bg-white/2 backdrop-blur-3xl border border-white/10 rounded-4xl p-10 mb-12 hover:bg-white/5 transition-all group"
              >
                <stat.icon className={cn("w-6 h-6 mb-4", stat.color)} />
                <div className="text-3xl font-black mb-1 group-hover:scale-110 transition-transform origin-left">{stat.value}</div>
                <div className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </header>

        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative w-full lg:w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted group-focus-within:text-kenya-gold transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search for projects, promises..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-kenya-gold/30 focus:border-kenya-gold/50 transition-all placeholder:text-brand-text-muted/50"
                />
            </div>

            <ScrollArea className="w-full lg:w-auto pb-4">
                <div className="flex gap-3">
                    {PROJECT_CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                                "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 border",
                                selectedCategory === cat 
                                    ? "bg-white/10 border-white/20 text-white shadow-lg shadow-white/5" 
                                    : "bg-white/2 border-white/5 text-brand-text-muted hover:bg-white/5 hover:border-white/10"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="promises" onValueChange={setActiveTab} className="space-y-12">
          <TabsList className="bg-white/5 p-2 rounded-4xl border border-white/10 h-auto gap-2">
            <TabsTrigger value="promises" className="rounded-2xl px-8 py-4 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-xl text-[10px] font-black uppercase tracking-widest gap-2">
              <Zap className="w-4 h-4 text-kenya-gold" /> Presidential Promises
            </TabsTrigger>
            <TabsTrigger value="budget" className="rounded-2xl px-8 py-4 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-xl text-[10px] font-black uppercase tracking-widest gap-2">
              <TrendingUp className="w-4 h-4 text-kenya-green" /> Economic Impact
            </TabsTrigger>
            <TabsTrigger value="map" className="rounded-2xl px-8 py-4 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-xl text-[10px] font-black uppercase tracking-widest gap-2">
              <Globe2 className="w-4 h-4 text-blue-400" /> Geographic View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="promises" className="m-0 focus-visible:ring-0">
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </AnimatePresence>
             </div>
             {filteredProjects.length === 0 && (
                <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-4 border-2 border-dashed border-white/5 rounded-[3rem]">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                        <Search className="w-10 h-10 text-brand-text-muted/20" />
                    </div>
                    <div>
                        <p className="text-xl font-black text-white">No projects found</p>
                        <p className="text-brand-text-muted text-sm font-medium">Try adjusting your filters or search query</p>
                    </div>
                </div>
             )}
          </TabsContent>

          <TabsContent value="budget" className="m-0 focus-visible:ring-0">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/2 border border-white/5 rounded-[3rem] p-12 flex flex-col justify-center items-center gap-6 min-h-[500px]">
                    <div className="w-16 h-16 rounded-full bg-kenya-green/10 flex items-center justify-center">
                        <BarChart3 className="w-8 h-8 text-kenya-green" />
                    </div>
                    <h2 className="text-3xl font-black text-white text-center">Expenditure Oversight</h2>
                    <p className="text-brand-text-muted text-center max-w-sm font-medium">Detailed breakdown of how development funds are utilized across each project category.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                     {[
                        { label: "Agriculture", amount: "KSh 15B", change: "+12%" },
                        { label: "Infrastructure", amount: "KSh 250B", change: "-5%" },
                        { label: "ICT", amount: "KSh 120B", change: "+45%" },
                        { label: "Healthcare", amount: "KSh 80B", change: "+18%" },
                     ].map((item) => (
                        <div key={item.label} className="bg-white/2 border border-white/5 rounded-4xl p-8 flex flex-col justify-between hover:bg-white/5 transition-all">
                            <span className="text-[10px] font-black text-brand-text-muted uppercase tracking-widest">{item.label}</span>
                            <div className="space-y-1">
                                <div className="text-3xl font-black text-white">{item.amount}</div>
                                <div className="text-[10px] font-bold text-kenya-green uppercase tracking-widest">{item.change} Absorption</div>
                            </div>
                        </div>
                     ))}
                </div>
             </div>
          </TabsContent>

          <TabsContent value="map" className="m-0 focus-visible:ring-0">
             <div className="bg-white/2 border border-white/5 rounded-[3rem] p-12 h-[600px] flex flex-col items-center justify-center gap-6 relative overflow-hidden group">
                <div className="absolute inset-0 grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-1000 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Kenya_location_map.svg/1200px-Kenya_location_map.svg.png')] bg-center bg-no-repeat bg-contain" />
                <div className="relative z-10 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-blue-400/10 flex items-center justify-center mx-auto">
                        <Globe2 className="w-8 h-8 text-blue-400" />
                    </div>
                    <h2 className="text-3xl font-black text-white">Project Density Map</h2>
                    <p className="text-brand-text-muted max-w-sm font-medium">Interactive visualization of projects across all 47 counties of Kenya. (Coming Soon)</p>
                </div>
             </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modern Footer */}
      <footer className="border-t border-white/5 py-12 px-6 lg:px-12 mt-24">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-kenya-red flex items-center justify-center font-black text-white">P</div>
             <div>
                <div className="font-black text-sm uppercase tracking-tighter">Polify Intelligence</div>
                <div className="text-[10px] text-brand-text-muted uppercase tracking-widest font-black">Citizen Oversight Platform</div>
             </div>
          </div>
          <div className="flex gap-8 text-[10px] font-black text-brand-text-muted uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">API Docs</a>
            <a href="#" className="hover:text-white transition-colors">Transparency Report</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
