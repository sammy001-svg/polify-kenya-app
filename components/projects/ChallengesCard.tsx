"use client";

import React from 'react';
import { AlertTriangle, ShieldX, Ban, HelpCircle, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

export function ChallengesCard() {
  const challenges = [
    { 
      title: "Fiscal Pressure", 
      desc: "Debt constraints limiting project financing and slowing down procurement.",
      icon: TrendingDown,
      color: "text-kenya-red"
    },
    { 
      title: "Regulatory Hurdles", 
      desc: "Delayed procurement processes and complex legal frameworks for new funding models.",
      icon: Ban,
      color: "text-kenya-gold"
    },
    { 
      title: "Corruption Risks", 
      desc: "Need for enhanced oversight to prevent leakage in multi-billion infrastructure funds.",
      icon: ShieldX,
      color: "text-red-500"
    },
    { 
      title: "Institutional Gaps", 
      desc: "Coordination challenges between county and national government implementation units.",
      icon: HelpCircle,
      color: "text-blue-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {challenges.map((challenge, index) => (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          key={challenge.title}
          className="group relative p-8 rounded-[2.5rem] bg-white/2 border border-white/5 hover:bg-white/5 transition-all overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <AlertTriangle className="w-16 h-16 text-kenya-red" />
          </div>
          
          <div className="relative z-10 space-y-4">
            <div className={`p-3 rounded-2xl bg-white/5 inline-flex ${challenge.color}`}>
              <challenge.icon className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-white">{challenge.title}</h3>
            <p className="text-[13px] leading-relaxed text-brand-text-muted font-medium">
              {challenge.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
