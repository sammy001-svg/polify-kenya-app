"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { uploadAvatar } from "@/lib/upload-helper";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Upload, Camera, CheckCircle2 } from "lucide-react";

const MAX_BIO_LENGTH = 500;

export function ProfileSetupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  
  const role = searchParams.get("role") || "citizen";
  
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [civicId, setCivicId] = useState("");
  const [username, setUsername] = useState("");

  // Load civic ID and username
  useEffect(() => {
    let mounted = true;

    async function loadUserInfo() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!mounted || !user) return;

        const { data } = await supabase
          .from('profiles')
          .select('civic_id, username')
          .eq('id', user.id)
          .single();
        
        if (mounted && data) {
          setCivicId(data.civic_id || "");
          setUsername(data.username || "");
        }
      } catch (error) {
        console.error("Error loading user info:", error);
      }
    }
    
    loadUserInfo();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array as supabase client is stable from import

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDropRejected: (fileRejections) => {
      const rejection = fileRejections[0];
      if (rejection) {
        const errorCode = rejection.errors[0]?.code;
        if (errorCode === "file-too-large") {
          setError("File size exceeds 5MB. Please upload a smaller image.");
        } else if (errorCode === "file-invalid-type") {
          setError("Invalid file type. Please upload a JPG, PNG, or WebP image.");
        } else {
          setError("Failed to upload file. Please try again.");
        }
      }
    },
  });

  const handleComplete = async () => {
    setUploading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Not authenticated");
      }

      let avatarUrl = "";
      
      // Upload avatar if provided
      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile, user.id);
      }

      // Update profile with bio and avatar
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          bio: bio || null,
          avatar_url: avatarUrl || null,
          profile_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) {
        throw updateError;
      }

      // Redirect to home page
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      const error = err as { message?: string };
      console.error("Error completing profile:", err);
      setError(error?.message || "Failed to complete profile. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSkip = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Mark profile as completed even if skipped
        await supabase
          .from("profiles")
          .update({ profile_completed: true })
          .eq("id", user.id);
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Error skipping profile setup:", err);
      // Redirect anyway
      router.push("/");
      router.refresh();
    }
  };

  const getRoleTitle = () => {
    switch (role) {
      case "politician":
        return "Campaign Profile";
      case "creator":
        return "Creator Profile";
      default:
        return "Profile";
    }
  };

  return (
    <Card className="w-full border-brand-accent/20 bg-brand-bg/50 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-2">
          <div className="flex items-center gap-2 text-sm text-brand-text-muted">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Account Created</span>
            </div>
            <span>→</span>
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 rounded-full bg-brand-primary flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">2</span>
              </div>
              <span className="font-medium text-brand-text">Complete Profile</span>
            </div>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-brand-primary">
          Complete Your {getRoleTitle()}
        </CardTitle>
        <CardDescription className="text-brand-muted">
          Add a profile photo and bio to personalize your account
        </CardDescription>
        {civicId && (
          <div className="mt-4 p-4 bg-brand-primary/5 rounded-lg border border-brand-primary/20">
            <p className="text-xs text-brand-text-muted uppercase tracking-wide mb-2">
              Your Civic Identification
            </p>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-brand-text-muted">Username</p>
                <p className="text-sm font-semibold text-brand-text">@{username}</p>
              </div>
              <div>
                <p className="text-xs text-brand-text-muted">Civic ID</p>
                <p className="text-lg font-bold text-brand-primary font-mono">{civicId}</p>
              </div>
            </div>
            <p className="text-xs text-brand-text-muted mt-3">
              💡 Use your email, username, or civic ID to sign in
            </p>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar Upload */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Profile Photo (Optional)</label>
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-32 w-32 border-4 border-brand-accent/20">
              {avatarPreview ? (
                <AvatarImage src={avatarPreview} alt="Profile preview" />
              ) : (
                <AvatarFallback className="bg-brand-primary/10">
                  <Camera className="h-12 w-12 text-brand-primary/40" />
                </AvatarFallback>
              )}
            </Avatar>
            
            <div
              {...getRootProps()}
              className={`w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? "border-brand-primary bg-brand-primary/10"
                  : "border-brand-border hover:border-brand-primary/50 bg-brand-surface"
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-8 w-8 mx-auto mb-2 text-brand-text-muted" />
              {isDragActive ? (
                <p className="text-sm text-brand-primary">Drop your image here...</p>
              ) : (
                <>
                  <p className="text-sm text-brand-text mb-1">
                    Drag & drop your photo, or click to browse
                  </p>
                  <p className="text-xs text-brand-text-muted">
                    JPG, PNG or WebP (max 5MB)
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Bio (Optional)</label>
            <span className="text-xs text-brand-text-muted">
              {bio.length}/{MAX_BIO_LENGTH}
            </span>
          </div>
          <Textarea
            value={bio}
            onChange={(e) => {
              if (e.target.value.length <= MAX_BIO_LENGTH) {
                setBio(e.target.value);
              }
            }}
            placeholder="Tell people a little about yourself..."
            className="min-h-[120px] bg-brand-surface border-brand-border resize-none"
            maxLength={MAX_BIO_LENGTH}
          />
        </div>

        {error && (
          <div className="text-sm text-red-500 font-medium text-center bg-red-500/10 p-3 rounded-lg">
            {error}
          </div>
        )}

        <Button
          onClick={handleComplete}
          disabled={uploading}
          className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Setting up your profile...
            </>
          ) : (
            "Complete Profile"
          )}
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-brand-border pt-6">
        <button
          onClick={handleSkip}
          disabled={uploading}
          className="text-sm text-brand-text-muted hover:text-brand-text transition-colors"
        >
          Skip for now
        </button>
      </CardFooter>
    </Card>
  );
}
