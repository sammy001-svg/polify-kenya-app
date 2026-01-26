import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Calendar, Banknote } from "lucide-react";
import { Project } from "@/lib/tracker-data";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusColor = 
    project.status === 'Completed' ? 'bg-kenya-green/10 text-kenya-green border-kenya-green/20' :
    project.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
    project.status === 'Stalled' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
    'bg-gray-500/10 text-gray-500 border-gray-500/20';

  return (
    <Card className="bg-brand-surface border-border overflow-hidden flex flex-col h-full hover:border-brand-primary/50 transition-colors">
        {/* Header Image / Status */}
        <div className="relative h-32 bg-brand-surface-highlight">
            {/* If we had a single image, we'd show it here. For now, gradient or pattern */}
             <div className="absolute inset-0 bg-linear-to-br from-brand-surface-highlight to-brand-bg opacity-50" />
             <div className="absolute top-3 right-3">
                 <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", statusColor)}>
                     {project.status}
                 </span>
             </div>
             <div className="absolute bottom-3 left-3">
                 <Badge variant="outline" className="bg-brand-bg/80 backdrop-blur-sm border-0 text-brand-text">
                    {project.sector}
                 </Badge>
             </div>
        </div>

        <div className="p-4 flex-1 flex flex-col gap-4">
            <div>
                <h3 className="font-bold text-lg leading-tight mb-1 line-clamp-2">{project.title}</h3>
                <p className="text-sm text-brand-text-muted line-clamp-2">{project.description}</p>
            </div>

            <div className="space-y-2 text-sm text-brand-text-muted mt-auto">
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{project.constituency}, {project.ward}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 shrink-0" />
                    <span>KES {project.budget.toLocaleString()}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
            </div>
        </div>
    </Card>
  );
}
