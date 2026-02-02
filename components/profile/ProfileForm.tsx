"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; 
import { Loader2, Save, User, MapPin, Globe, AlignLeft, Camera } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { uploadAvatar } from "@/lib/upload-helper";
import { KENYA_LOCATIONS } from "@/lib/location-data";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export function ProfileForm() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [civicId, setCivicId] = useState("");
  const [bio, setBio] = useState("");
  
  // Location State
  const [county, setCounty] = useState("");
  const [constituency, setConstituency] = useState("");
  const [ward, setWard] = useState("");
  
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function getProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!mounted || !user) return;
        
        if (mounted) setEmail(user.email || "");
          
        // Fetch basic profile
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        if (mounted && data) {
          setFullName(data.full_name || "");
          setRole(data.role || "citizen");
          setUsername(data.username || "");
          setCivicId(data.civic_id || "");
          setBio(data.bio || "");
          // Location data
          setCounty(data.county || "");
          setConstituency(data.constituency || "");
          setWard(data.ward || "");
          
          setWebsite(data.website || "");
          setAvatarUrl(data.avatar_url || "");
        }

        // Fetch stats from view
        const { data: stats } = await supabase
          .from('profile_stats')
          .select('*')
          .eq('profile_id', user.id)
          .single();
        
        if (mounted && stats) {
          setFollowersCount(stats.followers_count || 0);
          setFollowingCount(stats.following_count || 0);
        }
      } catch (error: unknown) {
        if (mounted) {
           const err = error as { message?: string };
           console.error("Error loading user data:", err.message || JSON.stringify(error));
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    
    getProfile(); // Initial fetch

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array as supabase client is stable

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function updateProfile() {
    try {
      setSaving(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error("No user");

      let finalAvatarUrl = avatarUrl;

      // Handle Avatar Upload if File Selected
      if (avatarFile) {
         try {
           finalAvatarUrl = await uploadAvatar(avatarFile, user.id);
           setAvatarUrl(finalAvatarUrl); // Update local state
         } catch (uploadError) {
            console.error("Avatar upload failed:", uploadError);
            alert("Failed to upload profile photo. Saving other changes.");
         }
      }

      const updates = {
        id: user.id,
        full_name: fullName,
        bio,
        county,
        constituency,
        ward,
        website,
        avatar_url: finalAvatarUrl,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        console.error("Error updating profile:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          fullError: JSON.stringify(error)
        });
        throw error;
      }
      
      console.log("✅ Profile updated successfully!");
      // Reset file input state
      setAvatarFile(null);
      setAvatarPreview(null);
      router.refresh();
      // Optional: Add toast notification here
    } catch (error: unknown) {
      const err = error as { message?: string; details?: string; hint?: string };
      console.error("Error updating profile:", {
        message: err?.message || "Unknown error",
        details: err?.details || "No details available",
        hint: err?.hint || "No hint available",
        stringified: JSON.stringify(error)
      });
      alert(`Failed to update profile: ${err?.message || "Unknown error occurred. Please check console for details."}`);
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
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Avatar className="h-16 w-16 border-2 border-border">
              <AvatarImage src={avatarPreview || avatarUrl} alt={fullName} className="object-cover" />
              <AvatarFallback className="bg-brand-primary/10 text-brand-primary text-xl font-bold">
                {fullName ? fullName.substring(0, 2).toUpperCase() : "ME"}
              </AvatarFallback>
            </Avatar>
            <label 
              htmlFor="avatar-upload" 
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
            >
              <Camera className="w-6 h-6" />
            </label>
            <input 
              id="avatar-upload"
              type="file" 
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <div>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>Manage your public identity on the platform</CardDescription>
          </div>
        </div>
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

        {username && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-text-muted">Username</label>
            <div className="p-2.5 border border-border rounded-md bg-brand-bg/50 text-sm font-medium">
              @{username}
            </div>
          </div>
        )}

        {civicId && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-text-muted">Civic ID</label>
            <div className="p-2.5 border border-border rounded-md bg-brand-bg/50 text-sm font-mono font-semibold text-brand-primary">
              {civicId}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Bio</label>
          <div className="relative">
             <AlignLeft className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
             <Textarea 
                value={bio} 
                onChange={(e) => setBio(e.target.value)} 
                className="pl-10 min-h-[100px]"
                placeholder="Tell us about yourself..."
             />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <div className="space-y-3">
               {/* County Select */}
               <Select value={county} onValueChange={(value) => {
                 setCounty(value);
                 setConstituency(""); // Reset sub-selections
                 setWard("");
               }}>
                 <SelectTrigger>
                   <div className="flex items-center gap-2">
                     <MapPin className="h-4 w-4 text-muted-foreground" />
                     <SelectValue placeholder="Select County" />
                   </div>
                 </SelectTrigger>
                 <SelectContent className="bg-black text-white border-gray-800">
                   {KENYA_LOCATIONS.map((c) => (
                     <SelectItem key={c.name} value={c.name}>
                       {c.name}
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>

               {/* Constituency Select */}
               <Select 
                 value={constituency} 
                 onValueChange={(value) => {
                   setConstituency(value);
                   setWard("");
                 }}
                 disabled={!county}
               >
                 <SelectTrigger>
                   <SelectValue placeholder="Select Constituency" />
                 </SelectTrigger>
                 <SelectContent className="bg-black text-white border-gray-800">
                   {county && KENYA_LOCATIONS.find(c => c.name === county)?.constituencies.map((c) => (
                     <SelectItem key={c.name} value={c.name}>
                       {c.name}
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>

               {/* Ward Select */}
               <Select 
                 value={ward} 
                 onValueChange={setWard}
                 disabled={!constituency}
               >
                 <SelectTrigger>
                   <SelectValue placeholder="Select Ward" />
                 </SelectTrigger>
                 <SelectContent className="bg-black text-white border-gray-800">
                   {constituency && KENYA_LOCATIONS.find(c => c.name === county)
                     ?.constituencies.find(c => c.name === constituency)
                     ?.wards.map((w) => (
                       <SelectItem key={w} value={w}>
                         {w}
                       </SelectItem>
                     ))}
                 </SelectContent>
               </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Website</label>
            <div className="relative">
               <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
               <Input 
                  value={website} 
                  onChange={(e) => setWebsite(e.target.value)} 
                  className="pl-10"
                  placeholder="https://example.com"
               />
            </div>
          </div>
        </div>

        <Button 
          onClick={updateProfile} 
          disabled={saving}
          className="bg-black text-white hover:bg-black/90 w-full"
        >
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}
