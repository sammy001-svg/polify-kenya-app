import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { PartySidebar } from "@/components/parties/PartySidebar";
import { cookies } from "next/headers";

export default async function PartyAdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo_party_session")?.value === "true";
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isDemo) {
    redirect("/party-admin/login");
  }

  if (!isDemo && user) {
    // Check if user is a party admin in the database
    const { data: member, error } = await supabase
      .from("party_memberships")
      .select("role, party_id")
      .eq("user_id", user.id)
      .eq("role", "party_admin")
      .eq("status", "active")
      .single();

    if (error || !member) {
      redirect("/feed");
    }
  }

  return (
    <div className="flex h-screen bg-brand-bg text-brand-text overflow-hidden">
      <PartySidebar />
      <main className="flex-1 overflow-y-auto bg-brand-bg relative">
        {/* HUD Scanline Effect */}
        <div className="fixed inset-0 bg-scanline opacity-[0.02] pointer-events-none z-50" />
        
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-brand-surface sticky top-0 z-10 box-shadow-xl">
           <div className="flex items-center gap-4">
              <h2 className="font-bold text-lg text-white">Party Command Center</h2>
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20">
                 <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" />
                 <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest text shadow-sm">Live System</span>
              </div>
           </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
           {children}
        </div>
      </main>
    </div>
  );
}
