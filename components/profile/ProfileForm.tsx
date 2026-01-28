"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Save, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export function ProfileForm() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    async function getProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          setEmail(user.email || "");
          
          // Fetch basic profile
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error && error.code !== 'PGRST116') {
            throw error;
          }

          if (data) {
            setFullName(data.full_name || "");
            setRole(data.role || "voter");
          }

          // Fetch stats from view
          const { data: stats } = await supabase
            .from('profile_stats')
            .select('*')
            .eq('profile_id', user.id)
            .single();
          
          if (stats) {
            setFollowersCount(stats.followers_count || 0);
            setFollowingCount(stats.following_count || 0);
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    }
    getProfile();
  }, [supabase]);

  async function updateProfile() {
    try {
      setSaving(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error("No user");

      const updates = {
        id: user.id,
        full_name: fullName,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) throw error;
      
      router.refresh();
      // Optional: Add toast notification here
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <Card className="bg-brand-surface border-border">
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
        <CardDescription>Manage your public identity on the platform</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-brand-text-muted">Email</label>
          <Input value={email} disabled className="bg-brand-bg opacity-50" />
        </div>
        
        <div className="space-y-2">
           <label className="text-sm font-medium text-brand-text-muted">Role</label>
           <div className="p-2 border border-border rounded-md bg-brand-bg text-sm capitalize">
              {role}
           </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border">
          <div className="text-center p-3 bg-brand-bg rounded-lg border border-border">
            <p className="text-2xl font-black text-brand-text">{followersCount}</p>
            <p className="text-[10px] text-brand-text-muted uppercase tracking-widest font-bold">Followers</p>
          </div>
          <div className="text-center p-3 bg-brand-bg rounded-lg border border-border">
            <p className="text-2xl font-black text-brand-text">{followingCount}</p>
            <p className="text-[10px] text-brand-text-muted uppercase tracking-widest font-bold">Following</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <div className="relative">
             <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
             <Input 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                className="pl-10"
                placeholder="Your Name"
             />
          </div>
        </div>

        <Button 
          onClick={updateProfile} 
          disabled={saving}
          className="bg-brand-primary hover:bg-brand-primary/90"
        >
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}
