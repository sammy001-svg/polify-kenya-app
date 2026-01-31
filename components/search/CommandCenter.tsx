"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  FileText,
  BookOpen,
  Home,
  User 
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { SAMPLE_POLITICIANS } from "@/lib/representatives";
import { DECODED_POLICIES } from "@/lib/policy-data";
import { CONSTITUTION_CHAPTERS } from "@/lib/constitution-data";

interface CommandCenterProps {
  isMobileTrigger?: boolean;
}

export function CommandCenter({ isMobileTrigger }: CommandCenterProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      {isMobileTrigger ? (
        <button
          onClick={() => setOpen(true)}
          className="flex flex-col items-center justify-center gap-1 text-brand-text-muted hover:text-white transition-colors"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Search</span>
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-input bg-brand-surface-secondary px-4 py-2 text-sm font-medium text-brand-text-muted shadow-xs transition-colors hover:bg-brand-surface-highlight focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          <Search className="h-4 w-4" />
          <span className="hidden lg:inline-flex">Search PoliFy...</span>
          <span className="hidden lg:inline-flex text-xs text-brand-text-muted/60 ml-4">
             <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-brand-surface px-1.5 font-mono text-[10px] font-medium text-brand-text-muted opacity-100">
                <span className="text-xs">⌘</span>K
             </kbd>
          </span>
        </button>
      )}

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="bg-brand-surface border-border">
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/tracker"))}>
              <Search className="mr-2 h-4 w-4" />
              <span>Project Tracker</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/leaderboard"))}>
              <User className="mr-2 h-4 w-4" />
              <span>Leaderboard</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Politicians">
            {SAMPLE_POLITICIANS.slice(0, 5).map((politician) => (
               <CommandItem 
                  key={politician.id} 
                  onSelect={() => runCommand(() => router.push(`/representatives/${politician.id}`))}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>{politician.name}</span>
                  <span className="ml-2 text-xs text-brand-text-muted">({politician.position})</span>
               </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />
        
          <CommandGroup heading="Policies">
             {DECODED_POLICIES.map((policy) => (
               <CommandItem 
                  key={policy.id} 
                  onSelect={() => runCommand(() => router.push(`/policies/${policy.id}`))}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>{policy.title}</span>
               </CommandItem>
             ))}
          </CommandGroup>

          <CommandGroup heading="Constitution">
             {CONSTITUTION_CHAPTERS.slice(0, 5).map((chapter) => (
                <CommandItem
                  key={chapter.id}
                  onSelect={() => runCommand(() => router.push(`/constitution/${chapter.id}`))}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>{chapter.title}</span>
                </CommandItem>
             ))}
          </CommandGroup>

        </CommandList>
      </CommandDialog>
    </>
  );
}
