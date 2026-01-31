"use client";

import { use } from "react";
import { LEARNING_PATHS, MOCK_USER_PROGRESS } from "@/lib/gamification";
import { CheckCircle2, Award, Play, BookOpen, Clock, ChevronRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ModulePlayerPage({
  params,
}: {
  params: Promise<{ pathId: string; moduleId: string }>;
}) {
  const { pathId, moduleId } = use(params);
  const [complete, setComplete] = useState(MOCK_USER_PROGRESS.completedModules.includes(moduleId));
  const [activeQuizStep, setActiveQuizStep] = useState<number | null>(null);
  
  const path = LEARNING_PATHS.find(p => p.id === pathId);
  const learningModule = path?.modules.find(m => m.id === moduleId);
  const moduleIndex = path?.modules.findIndex(m => m.id === moduleId) ?? 0;
  const nextModule = path?.modules[moduleIndex + 1];

  if (!path || !learningModule) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Module not found</h2>
        <Link href="/learn" className="text-kenya-gold hover:underline">← Back to Learn</Link>
      </div>
    );
  }

  const handleComplete = () => {
    setComplete(true);
    // In real app, update user progress in DB here
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
       {/* Breadcrumbs */}
       <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-text-muted">
          <Link href="/learn" className="hover:text-white">Learn</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/learn/${path.id}`} className="hover:text-white">{path.title}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white">Module {moduleIndex + 1}</span>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Module Content Area */}
          <div className="lg:col-span-3 space-y-6">
             {/* Content Title */}
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                   <h1 className="text-3xl font-black tracking-tight">{learningModule.title}</h1>
                   <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-kenya-gold px-2 py-0.5 bg-kenya-gold/10 rounded border border-kenya-gold/20">
                         {learningModule.contentType}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-1">
                         <Clock className="w-3 h-3" /> {learningModule.duration} Minutes
                      </span>
                   </div>
                </div>
                
                {complete && (
                   <div className="flex items-center gap-2 text-kenya-green font-black uppercase text-[10px] tracking-widest bg-kenya-green/10 px-4 py-2 rounded-full border border-kenya-green/20 scale-in shadow-lg">
                      <CheckCircle2 className="w-4 h-4" /> Lesson Completed
                   </div>
                )}
             </div>

             {/* Player / Content View */}
             <div className="bg-black/40 border border-white/5 rounded-3xl overflow-hidden aspect-video relative group">
                {learningModule.contentType === 'video' ? (
                   <>
                      <div className="absolute inset-0 bg-linear-to-b from-black/0 to-black/60 z-10" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-kenya-red transition-all cursor-pointer">
                            <Play className="w-8 h-8 text-white fill-current ml-1" />
                         </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                         <div className="flex flex-col gap-2">
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                               <div className="h-full bg-kenya-red w-1/3" />
                            </div>
                            <div className="flex justify-between items-center">
                               <span className="text-[10px] font-mono text-white/60">03:42 / {learningModule.duration}:00</span>
                               <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">4K Civic Cinema</span>
                            </div>
                         </div>
                      </div>
                   </>
                ) : learningModule.contentType === 'reading' ? (
                   <div className="absolute inset-0 p-12 overflow-y-auto scrollbar-thin">
                      <div className="max-w-2xl mx-auto space-y-6">
                         <p className="text-xl leading-relaxed text-brand-text/90 italic border-l-4 border-kenya-gold pl-6">
                            &quot;{learningModule.description}&quot;
                         </p>
                         <div className="space-y-4 text-brand-text-muted leading-relaxed">
                            <p>Kenya&apos;s governance structure is built upon the foundation of public trust and accountability. Every citizen has a constitutional mandate to oversee how resources are utilized at both national and county levels.</p>
                            <p>In this module, we explore the specific mechanisms of participation. From Article 10 that outlines our national values, to the practical steps of attending a budget forum. Understanding these legal frameworks is the first step toward effective advocacy.</p>
                            <h3 className="text-white font-bold text-lg pt-4">Key Takeaways:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                               <li>Article 1 is the most powerful: All sovereignty belongs to the people.</li>
                               <li>Public participation is not a favor, but a constitutional requirement.</li>
                               <li>Transparency is the best deterrent for corruption.</li>
                            </ul>
                         </div>
                      </div>
                   </div>
                ) : (
                   <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-6">
                      <div className="w-20 h-20 rounded-full bg-kenya-gold/20 flex items-center justify-center mb-2">
                         <HelpCircle className="w-10 h-10 text-kenya-gold" />
                      </div>
                      <div className="space-y-2">
                         <h3 className="text-2xl font-black">Knowledge Check</h3>
                         <p className="text-brand-text-muted">Test your understanding of the concepts covered so far.</p>
                      </div>
                      <Button 
                         onClick={() => setActiveQuizStep(1)}
                         className="bg-kenya-gold text-black font-black uppercase tracking-widest px-10 h-12 shadow-lg shadow-kenya-gold/20 hover:scale-105 transition-all"
                      >
                         Begin Quiz
                      </Button>
                   </div>
                )}

                {activeQuizStep && (
                   <div className="absolute inset-0 bg-brand-surface z-30 flex flex-col items-center justify-center p-12 animate-in fade-in zoom-in duration-300">
                      <div className="max-w-md w-full space-y-8">
                         <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-brand-text-muted">
                            <span>Question 1 of 5</span>
                            <span className="text-kenya-gold">Required: 100%</span>
                         </div>
                         <h3 className="text-xl font-bold">Which section of the Constitution grants all sovereignty to the people of Kenya?</h3>
                         <div className="space-y-3">
                            {['Article 10', 'Article 1', 'Article 37', 'Article 2'].map((opt) => (
                               <button 
                                  key={opt}
                                  onClick={() => {
                                      handleComplete();
                                      setActiveQuizStep(null);
                                  }}
                                  className="w-full p-4 bg-brand-surface-secondary border border-white/5 rounded-xl hover:border-kenya-gold hover:bg-brand-surface-highlight text-left font-medium transition-all group flex items-center justify-between"
                               >
                                  {opt}
                                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                               </button>
                            ))}
                         </div>
                      </div>
                   </div>
                )}
             </div>

             {/* Description & Navigation */}
             <div className="flex flex-col md:flex-row justify-between items-start gap-8 pt-4">
                <div className="max-w-2xl space-y-4">
                   <h4 className="text-sm font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> About this lesson
                   </h4>
                   <p className="text-brand-text-muted leading-relaxed">
                      {learningModule.description}
                   </p>
                </div>
                
                <div className="flex gap-4 w-full md:w-auto">
                   <Button 
                      onClick={handleComplete}
                      disabled={complete}
                      className={cn(
                         "flex-1 md:flex-none h-14 px-8 font-black uppercase tracking-widest transition-all",
                         complete ? "bg-kenya-green/10 text-kenya-green border border-kenya-green/20" : "bg-white text-black hover:bg-brand-primary"
                      )}
                   >
                      {complete ? 'Lesson Complete' : 'Mark as Complete'}
                   </Button>
                   
                   {nextModule && (
                      <Link href={`/learn/${pathId}/${nextModule.id}`} className="flex-1 md:flex-none">
                         <Button 
                            disabled={!complete}
                            className="w-full h-14 px-8 bg-brand-surface-highlight text-white border border-white/5 font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all"
                         >
                            Next Module <ChevronRight className="w-5 h-5" />
                         </Button>
                      </Link>
                   )}
                   
                   {!nextModule && complete && (
                      <Link href={`/learn/${pathId}`} className="flex-1 md:flex-none">
                         <Button 
                            className="w-full h-14 px-8 bg-linear-to-r from-kenya-red to-kenya-gold text-white font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all"
                         >
                            Return & Claim Reward <Award className="w-5 h-5" />
                         </Button>
                      </Link>
                   )}
                </div>
             </div>
          </div>

          {/* Sidebar: Path Progress */}
          <div className="space-y-6">
             <div className="bg-brand-surface-secondary border border-white/5 rounded-2xl p-6 space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-linear-to-br from-kenya-red to-kenya-gold p-0.5">
                      <div className="w-full h-full bg-brand-surface-secondary rounded-lg flex items-center justify-center text-xl">
                         {path.icon}
                      </div>
                   </div>
                   <div>
                      <h4 className="font-bold text-sm leading-tight">{path.title}</h4>
                      <p className="text-[10px] text-brand-text-muted uppercase font-black">{moduleIndex + 1} of {path.modules.length} Completed</p>
                   </div>
                </div>

                <div className="space-y-2">
                   {path.modules.map((m, idx) => {
                      const isModComplete = idx < moduleIndex || (idx === moduleIndex && complete);
                      const isCurrent = idx === moduleIndex;
                      
                      return (
                         <div key={m.id} className="flex items-center gap-3">
                            <div className={cn(
                               "w-2 h-2 rounded-full",
                               isModComplete ? "bg-kenya-green" : isCurrent ? "bg-kenya-gold animate-pulse" : "bg-white/10"
                            )} />
                            <Link 
                               href={idx <= moduleIndex ? `/learn/${pathId}/${m.id}` : '#'}
                               className={cn(
                                  "text-[11px] font-bold transition-colors truncate flex-1",
                                  isModComplete ? "text-brand-text-muted line-through" : 
                                  isCurrent ? "text-white" : "text-brand-text-muted/50 cursor-not-allowed"
                               )}
                            >
                               {m.title}
                            </Link>
                         </div>
                      );
                   })}
                </div>
             </div>

             <div className="bg-brand-surface-secondary border border-white/5 rounded-2xl p-6 text-center space-y-4">
                <div className="flex flex-col items-center">
                   <div className="w-16 h-16 rounded-full bg-linear-to-tr from-brand-primary/20 to-kenya-green/20 flex items-center justify-center mb-3">
                      <Award className="w-8 h-8 text-kenya-green" />
                   </div>
                   <h5 className="font-black uppercase tracking-widest text-[10px] text-brand-text-muted">Earn Achievement</h5>
                   <p className="font-bold text-sm mt-1">{path.badge.name}</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
