/* cSpell:ignore supabase */
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import { Loader2, Trash2, FileText, Plus, Target, Users, Image as ImageIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { uploadPetitionImage } from "@/lib/upload-helper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Petition } from "@/types/petition";

interface PolicyIdea {
  id: string;
  title: string;
  status: string;
  created_at: string;
  category: string;
}

export function MyActivity() {
  const supabase = createClient();
  const [ideas, setIdeas] = useState<PolicyIdea[]>([]);
  const [petitions, setPetitions] = useState<Petition[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("policies");

  // New Petition State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newPetitionTitle, setNewPetitionTitle] = useState("");
  const [newPetitionDesc, setNewPetitionDesc] = useState("");
  const [newPetitionTarget, setNewPetitionTarget] = useState(1000);
  const [newPetitionImage, setNewPetitionImage] = useState<File | null>(null);
  const [creating, setCreating] = useState(false);

  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch Role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        setUserRole(profile?.role || null);

        // Fetch Policy Ideas
        const { data: ideasData } = await supabase
          .from('policy_ideas')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        setIdeas(ideasData || []);

        // Fetch Petitions
        const { data: petitionsData } = await supabase
          .from('petitions')
          .select('*')
          .eq('created_by', user.id)
          .order('created_at', { ascending: false });

        setPetitions(petitionsData as Petition[] || []);

      } catch (error) {
        console.error("Error fetching activity:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [supabase]);

  async function deleteIdea(id: string) {
    if (!confirm("Are you sure you want to delete this idea?")) return;
    try {
      setDeletingId(id);
      const { error } = await supabase.from('policy_ideas').delete().eq('id', id);
      if (error) throw error;
      setIdeas(ideas.filter(i => i.id !== id));
    } catch (error) {
      console.error("Error deleting idea:", error);
    } finally {
      setDeletingId(null);
    }
  }

  async function deletePetition(id: string) {
    if (!confirm("Are you sure you want to delete this petition?")) return;
    try {
      setDeletingId(id);
      const { error } = await supabase.from('petitions').delete().eq('id', id);
      if (error) throw error;
      setPetitions(petitions.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error deleting petition:", error);
    } finally {
      setDeletingId(null);
    }
  }


  async function createPetition() {
    if (!newPetitionTitle.trim()) return;
    try {
      setCreating(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user");

      let imageUrl = null;
      if (newPetitionImage) {
        try {
           imageUrl = await uploadPetitionImage(newPetitionImage, user.id);
        } catch (uploadError) {
           console.error("Image upload failed:", uploadError);
           // Continue without image or alert?
           alert("Failed to upload image, but continuing creating.");
        }
      }

      const newPetition = {
        title: newPetitionTitle,
        description: newPetitionDesc,
        target_signatures: newPetitionTarget,
        created_by: user.id,
        status: 'active',
        current_signatures: 0,
        image_url: imageUrl
      };

      const { data, error } = await supabase
        .from('petitions')
        .insert(newPetition)
        .select()
        .single();

      if (error) throw error;

      setPetitions([data as Petition, ...petitions]);
      setIsCreateOpen(false);
      setNewPetitionTitle("");
      setNewPetitionDesc("");
      setNewPetitionImage(null);
      setActiveTab("petitions");
    } catch (error) {
      console.error("Error creating petition:", error);
      alert("Failed to create petition. Please try again.");
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
     return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-brand-primary" /></div>;
  }

  return (
    <Card className="bg-brand-surface border-border h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
            <CardTitle>My Civic Duty</CardTitle>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-black text-white hover:bg-neutral-800 border border-white/10 shadow-lg shadow-black/20">
                  <Plus className="w-4 h-4 mr-2" />
                  Start Petition
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-brand-surface border-border">
                <DialogHeader>
                  <DialogTitle>Start a New Petition</DialogTitle>
                  <DialogDescription>
                    Mobilize your community around a cause that matters.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input 
                      placeholder="e.g., Install Street Lights in Ward 4" 
                      value={newPetitionTitle}
                      onChange={(e) => setNewPetitionTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Goal (Signatures)</label>
                    <Input 
                      type="number"
                      value={newPetitionTarget}
                      onChange={(e) => setNewPetitionTarget(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea 
                      placeholder="Explain why this matters..."
                      value={newPetitionDesc}
                      onChange={(e) => setNewPetitionDesc(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Cover Image (Optional)</label>
                    <div className="flex items-center gap-2">
                        <Input 
                            type="file" 
                            accept="image/*"
                            className="hidden"
                            id="petition-image-upload"
                            onChange={(e) => setNewPetitionImage(e.target.files?.[0] || null)}
                        />
                        <label 
                            htmlFor="petition-image-upload" 
                            className="flex items-center justify-center w-full p-4 border-2 border-dashed border-border rounded-lg hover:border-brand-primary/50 cursor-pointer transition-colors"
                        >
                            {newPetitionImage ? (
                                <span className="text-sm text-brand-primary font-medium flex items-center">
                                    <ImageIcon className="w-4 h-4 mr-2" />
                                    {newPetitionImage.name}
                                </span>
                            ) : (
                                <span className="text-sm text-brand-text-muted flex items-center">
                                    <ImageIcon className="w-4 h-4 mr-2" />
                                    Click to upload cover image
                                </span>
                            )}
                        </label>
                        {newPetitionImage && (
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setNewPetitionImage(null)}
                                className="text-red-500"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button disabled={creating} onClick={createPetition}>
                    {creating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Launch Petition
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 bg-brand-bg/50">
                <TabsTrigger value="policies">Policy Ideas</TabsTrigger>
                <TabsTrigger value="petitions">Active Petitions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="policies" className="space-y-4">
                {ideas.length === 0 ? (
                <div className="text-center py-12 text-brand-text-muted">
                    <p>You haven&apos;t submitted any policy ideas yet.</p>
                </div>
                ) : (
                <div className="space-y-4">
                    {ideas.map((idea) => (
                    <div key={idea.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-brand-bg/50 hover:bg-brand-bg transition-colors">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-brand-surface-secondary rounded">
                                <FileText className="w-5 h-5 text-brand-primary" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">{idea.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="secondary" className="text-[10px] h-5">{idea.category || 'General'}</Badge>
                                    <span className="text-xs text-brand-text-muted">{new Date(idea.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                        {userRole === 'admin' && (
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-500/10"
                            onClick={() => deleteIdea(idea.id)}
                            disabled={deletingId === idea.id}
                        >
                            {deletingId === idea.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </Button>
                        )}
                    </div>
                    ))}
                </div>
                )}
            </TabsContent>

            <TabsContent value="petitions" className="space-y-4">
                {petitions.length === 0 ? (
                    <div className="text-center py-12 text-brand-text-muted bg-brand-bg/30 rounded-lg border border-dashed border-border">
                        <Target className="w-12 h-12 mx-auto text-muted-foreground mb-3 opacity-50" />
                        <h3 className="font-semibold text-brand-text">No active petitions</h3>
                        <p className="text-sm text-brand-text-muted mt-1">Start a petition to drive change in your community.</p>
                        <Button variant="link" onClick={() => setIsCreateOpen(true)} className="mt-2 text-brand-primary">
                            Start your first petition
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {petitions.map((petition) => {
                            const progress = Math.min(100, (petition.current_signatures / petition.target_signatures) * 100);
                            return (
                                <div key={petition.id} className="p-4 rounded-lg border border-border bg-brand-bg/50 hover:bg-brand-bg transition-colors space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-sm text-brand-text">{petition.title}</h4>
                                            <p className="text-xs text-brand-text-muted line-clamp-1 mt-0.5">{petition.description}</p>
                                        </div>
                                        <Badge className={`
                                            ${petition.status === 'active' ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : ''}
                                            ${petition.status === 'closed' ? 'bg-gray-500/10 text-gray-500' : ''}
                                            ${petition.status === 'victory' ? 'bg-yellow-500/10 text-yellow-500' : ''}
                                        `}>
                                            {petition.status.toUpperCase()}
                                        </Badge>
                                    </div>
                                    
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-xs">
                                            <span className="flex items-center gap-1 text-brand-text-muted">
                                                <Users className="w-3 h-3" />
                                                <strong className="text-brand-text">{petition.current_signatures}</strong> signed
                                            </span>
                                            <span className="text-brand-text-muted">Goal: {petition.target_signatures}</span>
                                        </div>
                                        <Progress value={progress} className="h-2 bg-brand-bg border border-white/5" />
                                    </div>

                                    <div className="flex justify-end gap-2 pt-1">
                                        {/* Only allow Admins to delete content */}
                                        {userRole === 'admin' && (
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-500/10"
                                            onClick={() => deletePetition(petition.id)}
                                            disabled={deletingId === petition.id}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
