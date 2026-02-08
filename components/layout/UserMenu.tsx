"use client";

import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { User, LogOut, Settings } from "lucide-react";
import Link from "next/link";

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

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
        className="rounded-full overflow-hidden bg-brand-highlight hover:bg-brand-highlight/80"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="w-5 h-5 text-brand-text" />
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
