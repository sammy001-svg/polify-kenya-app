"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Clock } from "lucide-react";
import Image from "next/image";
import { LearningItem } from "@/lib/demo-data"; // Ensure this matches your export

interface LearningModuleProps {
  title: string;
  description: string;
  items: LearningItem[];
}

export function LearningModule({ title, description, items }: LearningModuleProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
        <p className="text-brand-text-muted text-lg">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="group cursor-pointer bg-brand-surface border-border hover:border-kenya-red/50 transition-colors overflow-hidden">
            {/* Thumbnail */}
            <div className="relative aspect-video bg-black/20">
              <Image 
                src={item.thumbnailUrl} 
                alt={item.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-kenya-red flex items-center justify-center text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <PlayCircle className="w-6 h-6 fill-current" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 rounded text-xs font-medium text-white flex items-center gap-1">
                <Clock className="w-3 h-3" /> {item.duration}
              </div>
            </div>

            <CardContent className="p-4 space-y-3">
              <div>
                 <h3 className="font-bold leading-tight line-clamp-2 mb-1 group-hover:text-kenya-red transition-colors">
                   {item.title}
                 </h3>
                 <p className="text-sm text-brand-text-muted line-clamp-2">{item.description}</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className={item.progress === 100 ? "text-kenya-green" : "text-brand-text-muted"}>
                    {item.progress === 100 ? "Completed" : `${item.progress}% Complete`}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-brand-surface-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${item.progress === 100 ? 'bg-kenya-green' : 'bg-kenya-red'}`} 
                    style={{ width: `${item.progress}%` }} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
