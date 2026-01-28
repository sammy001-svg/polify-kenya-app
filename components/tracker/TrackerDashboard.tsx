'use client';

import { useState } from 'react';
import { MOCK_PROJECTS, CONSTITUENCY_STATS } from '@/lib/tracker-data';
import { ProjectCard } from './ProjectCard';
import { SectorStats } from './SectorStats';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { ProjectWatchdog } from './ProjectWatchdog';
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowLeft } from 'lucide-react';

export function TrackerDashboard() {
  const [selectedConstituencyId, setSelectedConstituencyId] = useState<string>(CONSTITUENCY_STATS[0].id);
  const [activeTab, setActiveTab] = useState<'projects' | 'impact'>('projects');
  const [selectedProject, setSelectedProject] = useState<typeof MOCK_PROJECTS[0] | null>(null);

  const stats = CONSTITUENCY_STATS.find(c => c.id === selectedConstituencyId) || CONSTITUENCY_STATS[0];
  const projects = MOCK_PROJECTS.filter(p => p.constituency === stats.name);

  return (
    <div className="space-y-8">
      {/* Header / Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            {selectedProject && (
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full bg-brand-surface-secondary"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Button>
            )}
            <div>
                <h1 className="text-3xl font-bold mb-1">
                    {selectedProject ? "Project Watchdog" : "Development Tracker"}
                </h1>
                <p className="text-brand-text-muted">
                    {selectedProject ? `Reporting on: ${selectedProject.title}` : "Track CDF usage and development projects in your area."}
                </p>
            </div>
        </div>
        
        {!selectedProject && (
            <div className="flex bg-brand-surface p-1 rounded-lg border border-border">
                {CONSTITUENCY_STATS.map(c => (
                    <button
                        key={c.id}
                        onClick={() => setSelectedConstituencyId(c.id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            selectedConstituencyId === c.id 
                            ? 'bg-brand-surface-highlight text-white shadow-xs' 
                            : 'text-brand-text-muted hover:text-brand-text'
                        }`}
                    >
                        {c.name} Constituency
                    </button>
                ))}
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
             
             {selectedProject ? (
                 <ProjectWatchdog 
                    projectId={selectedProject.id} 
                    projectTitle={selectedProject.title} 
                 />
             ) : (
                <>
                    {/* Tabs */}
                    <div className="flex gap-4 border-b border-border pb-1">
                        <button 
                            onClick={() => setActiveTab('projects')}
                            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === 'projects' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-brand-text-muted hover:text-brand-text'
                            }`}
                        >
                            Active Projects
                        </button>
                        <button 
                            onClick={() => setActiveTab('impact')}
                            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === 'impact' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-brand-text-muted hover:text-brand-text'
                            }`}
                        >
                            Impact Stories
                        </button>
                    </div>

                    {/* Search/Filter Toolbar */}
                    {activeTab === 'projects' && (
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted" />
                                <input 
                                    type="text" 
                                    placeholder="Search projects..." 
                                    className="w-full bg-brand-surface border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                                />
                            </div>
                            <Button variant="outline" size="icon">
                                <Filter className="w-4 h-4" />
                            </Button>
                        </div>
                    )}

                    {/* Render Projects */}
                    {activeTab === 'projects' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.map(project => (
                                <div key={project.id} onClick={() => setSelectedProject(project)} className="cursor-pointer">
                                    <ProjectCard project={project} />
                                </div>
                            ))}
                            {projects.length === 0 && (
                                <div className="col-span-2 py-12 text-center text-brand-text-muted bg-brand-surface/50 rounded-xl border border-dashed border-border">
                                    No projects found for this selection.
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {projects.filter(p => p.beforeImage).map(project => (
                                <div key={project.id} className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold">{project.title}</h3>
                                        <span className="text-sm text-brand-text-muted">{project.ward} Ward</span>
                                    </div>
                                    {project.beforeImage && project.afterImage && (
                                        <BeforeAfterSlider 
                                            beforeImage={project.beforeImage} 
                                            afterImage={project.afterImage} 
                                            beforeLabel="Before Upgrade"
                                            afterLabel="Current Status"
                                        />
                                    )}
                                    <p className="text-brand-text-muted">{project.description}</p>
                                </div>
                            ))}
                            {projects.filter(p => p.beforeImage).length === 0 && (
                                <div className="text-center py-12 text-brand-text-muted">
                                    No impact stories available with visual comparisons yet.
                                </div>
                            )}
                        </div>
                    )}
                </>
             )}
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
              <SectorStats stats={stats} />
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                  <div className="bg-brand-surface p-4 rounded-xl border border-border text-center">
                      <div className="text-3xl font-bold mb-1">{stats.projectsCount}</div>
                      <div className="text-xs text-brand-text-muted uppercase tracking-wider">Active Projects</div>
                  </div>
                   <div className="bg-brand-surface p-4 rounded-xl border border-border text-center">
                      <div className="text-3xl font-bold mb-1">{stats.completionRate}%</div>
                      <div className="text-xs text-brand-text-muted uppercase tracking-wider">Completion Rate</div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
