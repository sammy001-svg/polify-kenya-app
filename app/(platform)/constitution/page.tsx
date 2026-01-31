"use client";

import Link from "next/link";
import { ConstitutionChat } from "@/components/constitution/ConstitutionChat";
import { Book, Scale, ShieldCheck, FileText } from "lucide-react";

const QUICK_LINKS = [
  { title: "Bill of Rights", articles: "Art. 19-59", icon: ShieldCheck, href: "/constitution/chapter-4" },
  { title: "Devolution", articles: "Art. 174-200", icon: Scale, href: "/constitution/chapter-11" },
  { title: "Citizenship", articles: "Art. 12-18", icon: UserIcon, href: "/constitution/chapter-3" },
  { title: "Public Finance", articles: "Art. 201-231", icon: FileText, href: "/constitution/chapter-12" }
];

function UserIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    )
}

export default function ConstitutionPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 h-[calc(100vh-6rem)]">
       {/* Main Chat Area */}
       <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-4 mb-2">
             <div className="w-12 h-12 rounded-xl bg-kenya-green/10 flex items-center justify-center border border-kenya-green/20">
                <Book className="w-6 h-6 text-kenya-green" />
             </div>
             <div>
                <h1 className="text-2xl font-black tracking-tight">Constitution of Kenya 2010</h1>
                <p className="text-sm text-brand-text-muted font-medium">
                   AI-Powered Legal Assistant • Full Text Search • Citation Engine
                </p>
             </div>
          </div>
          
          <div className="flex-1">
             <ConstitutionChat />
          </div>
       </div>

       {/* Sidebar: Quick Reference */}
       <div className="lg:col-span-1 space-y-6">
           <div className="bg-brand-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
               <h3 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-kenya-red rounded-full" /> Quick Reference
               </h3>
               
               <div className="space-y-3">
                  {QUICK_LINKS.map((link) => (
                     <Link 
                       key={link.title}
                       href={link.href}
                       className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-brand-primary/30 transition-all text-left group"
                     >
                        <div className="w-10 h-10 rounded-lg bg-black/20 flex items-center justify-center text-brand-text-muted group-hover:text-white transition-colors">
                           <link.icon className="w-5 h-5" />
                        </div>
                        <div>
                           <div className="font-bold text-sm text-gray-200 group-hover:text-white">{link.title}</div>
                           <div className="text-[10px] uppercase font-bold text-brand-text-muted bg-black/20 self-start inline-block px-1.5 py-0.5 rounded mt-1">
                              {link.articles}
                           </div>
                        </div>
                     </Link>
                  ))}
               </div>
           </div>

           <div className="bg-linear-to-br from-kenya-green/20 to-transparent border border-kenya-green/30 rounded-2xl p-6">
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                 <ShieldCheck className="w-5 h-5 text-kenya-green" /> Did You Know?
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                 Article 1 states that all sovereign power belongs to the people. You exercise this power either directly or through elected representatives.
              </p>
              <Link href="/constitution/chapter-1" className="block text-center w-full py-2 rounded-lg bg-kenya-green/20 text-kenya-green text-xs font-bold hover:bg-kenya-green hover:text-white transition-colors border border-kenya-green/30">
                 Read Chapter 1
              </Link>
           </div>
       </div>
    </div>
  );
}
