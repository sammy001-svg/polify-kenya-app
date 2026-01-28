"use client";

import { AlertTriangle } from "lucide-react";

export function EnvStatus() {
  // Check if variables are missing or using the hardcoded placeholder
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  const isMissing = !key || key === 'placeholder' || !url || url.includes('replace_with');

  if (!isMissing) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500/90 text-black px-4 py-2 text-center text-xs font-bold flex items-center justify-center gap-2 backdrop-blur-sm">
      <AlertTriangle className="w-4 h-4" />
      <span>
        CONFIGURATION ERROR: Supabase keys are missing. Authentication will fail. 
        <span className="hidden sm:inline"> Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your Vercel Environment Variables and redeploy.</span>
      </span>
    </div>
  );
}
