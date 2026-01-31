"use client";

import { use } from "react";
import { LEARNING_PATHS, MOCK_USER_PROGRESS } from "@/lib/gamification";
import { ArrowLeft, Play, CheckCircle2, Award, Clock, BookOpen, ChevronRight, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BadgeCard } from "@/components/gamification/BadgeCard";
import { useState } from "react";
import { CertificateGenerator } from "@/components/learning/CertificateGenerator";
import { cn } from "@/lib/utils";

export default function PathDetailsPage({
  params,
}: {
  params: Promise<{ pathId: string }>;
}) {
  const { pathId } = use(params);
  const [showCertificate, setShowCertificate] = useState(false);
  
  const path = LEARNING_PATHS.find(p => p.id === pathId);
  
  if (!path) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Path not found</h2>
        <Link href="/learn" className="text-kenya-gold hover:underline">← Back to Learning Paths</Link>
      </div>
    );
  }

  const completedModules = path.modules.filter(m => 
    MOCK_USER_PROGRESS.completedModules.includes(m.id)
  ).length;
  
  const progress = Math.round((completedModules / path.modules.length) * 100);
  const isCompleted = progress === 100;

  if (showCertificate && isCompleted) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => setShowCertificate(false)}
          className="text-brand-text-muted hover:text-white gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Course
        </Button>
        <CertificateGenerator path={path} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
       {/* Navigation */}
       <Link href="/learn" className="inline-flex items-center gap-2 text-brand-text-muted hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Learning Paths
       </Link>

       {/* Hero Section */}
       <div className="bg-brand-surface border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className={cn("p-8 md:p-12 relative overflow-hidden", path.color, "bg-opacity-10")}>
             {/* Abstract Background Element */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
             
             <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="text-7xl md:text-8xl p-6 bg-brand-surface-secondary rounded-2xl border border-white/5 shadow-inner">
                   {path.icon}
                </div>
                
                <div className="space-y-4 flex-1">
                   <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-brand-surface-highlight text-brand-text text-[10px] font-black uppercase tracking-widest rounded-full border border-white/5">
                         {path.category}
                      </span>
                      <span className="px-3 py-1 bg-brand-surface-highlight text-kenya-gold text-[10px] font-black uppercase tracking-widest rounded-full border border-white/5">
                         {path.difficulty}
                      </span>
                      {isCompleted && (
                        <span className="px-3 py-1 bg-kenya-green/20 text-kenya-green text-[10px] font-black uppercase tracking-widest rounded-full border border-kenya-green/20 flex items-center gap-1">
                           <CheckCircle2 className="w-3 h-3" /> Path Completed
                        </span>
                      )}
                   </div>
                   
                   <h1 className="text-4xl md:text-5xl font-black tracking-tight">{path.title}</h1>
                   <p className="text-lg text-brand-text-muted leading-relaxed max-w-2xl">{path.description}</p>
                   
                   <div className="flex flex-wrap gap-6 pt-2">
                      <div className="flex items-center gap-2 text-brand-text-muted">
                         <Clock className="w-5 h-5 text-kenya-gold" />
                         <span className="font-bold">{path.estimatedTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-brand-text-muted">
                         <Award className="w-5 h-5 text-kenya-green" />
                         <span className="font-bold">{path.totalXP} TOTAL XP</span>
                      </div>
                      <div className="flex items-center gap-2 text-brand-text-muted">
                         <BookOpen className="w-5 h-5 text-kenya-red" />
                         <span className="font-bold">{path.modules.length} Modules</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="p-8 bg-brand-surface border-t border-white/5">
             <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="w-full md:max-w-md space-y-2">
                   <div className="flex justify-between text-xs font-black uppercase tracking-widest text-brand-text-muted">
                      <span>Course Progress</span>
                      <span className="text-white">{progress}%</span>
                   </div>
                   <Progress value={progress} className="h-3 bg-brand-surface-highlight" />
                </div>
                
                <div className="flex gap-4 w-full md:w-auto">
                   {isCompleted ? (
                      <Button 
                        size="lg" 
                        onClick={() => setShowCertificate(true)}
                        className="flex-1 md:flex-none bg-kenya-green hover:bg-kenya-green/90 text-white font-black uppercase tracking-widest h-14 px-10 gap-2 shadow-xl shadow-kenya-green/20"
                      >
                         <Award className="w-5 h-5" /> View Certificate
                      </Button>
                   ) : (
                      <Link 
                        href={`/learn/${path.id}/${path.modules.find(m => !MOCK_USER_PROGRESS.completedModules.includes(m.id))?.id || path.modules[0].id}`}
                        className="flex-1"
                      >
                        <Button 
                           size="lg" 
                           className="w-full bg-linear-to-r from-kenya-red to-kenya-gold hover:scale-105 transition-all text-white font-black uppercase tracking-widest h-14 px-10 gap-2 shadow-xl shadow-kenya-red/20"
                        >
                           <Play className="w-5 h-5 fill-current" /> {progress > 0 ? 'Continue Path' : 'Start Journey'}
                        </Button>
                      </Link>
                   )}
                </div>
             </div>
          </div>
       </div>

       {/* Modules List */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
             <h3 className="text-xs font-black uppercase tracking-[2px] text-brand-text-muted flex items-center gap-2 mb-6">
                <BookOpen className="w-4 h-4" /> Curriculum Breakdown
             </h3>
             
             <div className="space-y-3">
                {path.modules.map((module, idx) => {
                   const isModuleCompleted = MOCK_USER_PROGRESS.completedModules.includes(module.id);
                   const isNext = !isModuleCompleted && idx === completedModules;
                   const isLocked = !isModuleCompleted && idx > completedModules;
                   
                   return (
                      <div 
                         key={module.id}
                         className={cn(
                            "group p-5 rounded-2xl border transition-all flex items-center justify-between",
                            isModuleCompleted ? "bg-kenya-green/5 border-kenya-green/20" : 
                            isNext ? "bg-brand-surface border-kenya-gold/30 shadow-lg" : 
                            "bg-brand-surface-secondary border-white/5 opacity-60"
                         )}
                      >
                         <div className="flex items-center gap-4">
                            <div className={cn(
                               "w-10 h-10 rounded-full flex items-center justify-center font-black text-sm",
                               isModuleCompleted ? "bg-kenya-green text-white" : 
                               isNext ? "bg-kenya-gold text-black" : "bg-white/5 text-brand-text-muted"
                            )}>
                               {isModuleCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                            </div>
                            
                            <div>
                               <h4 className={cn("font-bold text-lg", isLocked ? "text-brand-text-muted" : "text-white")}>
                                  {module.title}
                               </h4>
                               <div className="flex items-center gap-3 mt-0.5">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-1">
                                     <Clock className="w-3 h-3" /> {module.duration} MIN
                                  </span>
                                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-1 leading-none">
                                     <div className="w-1 h-1 rounded-full bg-white/20" /> {module.contentType}
                                  </span>
                               </div>
                            </div>
                         </div>
                         
                         <div>
                            {isLocked ? (
                               <Lock className="w-5 h-5 text-white/10" />
                            ) : (
                               <Link href={`/learn/${pathId}/${module.id}`}>
                                  <Button 
                                     variant="ghost" 
                                     size="sm" 
                                     className={cn(
                                        "gap-1 hover:bg-brand-surface-highlight",
                                        isModuleCompleted ? "text-kenya-green" : "text-kenya-gold"
                                     )}
                                  >
                                     {isModuleCompleted ? 'Review' : 'Play'} <ChevronRight className="w-4 h-4" />
                                  </Button>
                               </Link>
                            )}
                         </div>
                      </div>
                   );
                })}
             </div>
          </div>
          
          <div className="space-y-6">
             <div className="bg-brand-surface-secondary border border-white/5 rounded-2xl p-6 space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[2px] text-brand-text-muted">Mastery Reward</h3>
                <BadgeCard badge={path.badge} isEarned={isCompleted} size="lg" />
                <div className="space-y-3 pt-4 border-t border-white/5">
                   <p className="text-xs text-brand-text-muted leading-relaxed">
                      Complete all modules in this path to earn the <span className="text-kenya-gold font-bold">digital certificate</span> and the <span className="text-white font-bold">{path.badge.name}</span> badge on your profile.
                   </p>
                </div>
             </div>
             
             <div className="hero-gradient rounded-2xl p-6 text-center">
                <blockquote className="text-sm italic text-white/80 leading-relaxed mb-4">
                   &quot;Citizenship is not a spectator sport. It&apos;s a calling to participate.&quot;
                </blockquote>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">— National Education Team</p>
             </div>
          </div>
       </div>
    </div>
  );
}
