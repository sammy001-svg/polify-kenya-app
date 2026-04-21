"use client";

import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { User, LogOut, Settings, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isPartyAdmin, setIsPartyAdmin] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  // Fetch avatar and role
  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch profile avatar
        const { data: profile } = await supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", user.id)
          .single();
        
        if (profile?.avatar_url) {
          setAvatarUrl(profile.avatar_url);
        }

        // Check party admin role
        const { data: member } = await supabase
          .from("party_memberships")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "party_admin")
          .eq("status", "active")
          .maybeSingle();
        
        if (member) {
          setIsPartyAdmin(true);
        }
      }
    }
    fetchProfile();
  }, [supabase]);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
    router.refresh();
  };

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full overflow-hidden bg-brand-highlight hover:bg-brand-highlight/80 w-10 h-10 p-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Avatar className="w-10 h-10">
          <AvatarImage src={avatarUrl || ""} alt="User profile" />
          <AvatarFallback className="bg-brand-highlight">
            <User className="w-5 h-5 text-brand-text" />
          </AvatarFallback>
        </Avatar>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-brand-surface bg-linear-to-b from-kenya-green/10 via-transparent to-transparent border border-white/5 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200 backdrop-blur-xl">
          <Link
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 text-sm text-brand-text hover:bg-brand-surface-secondary w-full"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="w-4 h-4" />
            My Profile
          </Link>

          {isPartyAdmin && (
            <Link
              href="/party-admin"
              className="flex items-center gap-2 px-4 py-2 text-sm text-brand-primary hover:bg-brand-primary/10 w-full"
              onClick={() => setIsOpen(false)}
            >
              <ShieldCheck className="w-4 h-4" />
              Party Console
            </Link>
          )}

          <div className="h-px bg-border my-1" />

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 w-full text-left"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
