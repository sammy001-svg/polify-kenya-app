"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchIdeas();
  }, []);

  async function fetchIdeas() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('policy_ideas')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIdeas(data || []);
    } catch (error) {
      console.error("Error fetching activity:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteIdea(id: string) {
    if (!confirm("Are you sure you want to delete this idea?")) return;
    
    try {
      setDeletingId(id);
      const { error } = await supabase
        .from('policy_ideas')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setIdeas(ideas.filter(i => i.id !== id));
    } catch (error) {
      console.error("Error deleting idea:", error);
      alert("Failed to delete idea. Check permissions.");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
     return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-brand-primary" /></div>;
  }

  return (
    <Card className="bg-brand-surface border-border h-full">
      <CardHeader>
        <CardTitle>My Contributions</CardTitle>
      </CardHeader>
      <CardContent>
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
                 <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-500/10"
                    onClick={() => deleteIdea(idea.id)}
                    disabled={deletingId === idea.id}
                 >
                    {deletingId === idea.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                 </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
