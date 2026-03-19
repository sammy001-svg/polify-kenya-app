import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { cookies } from "next/headers";

export const metadata = {
  title: "Admin Panel | Political Intelligence",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const isDemo = cookieStore.get("admin-demo-session")?.value === "true";

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect if NOT logged in AND NOT in demo mode
  if (!user && !isDemo) {
    redirect("/admin/login");
  }

  // Check Role (Skip if in demo mode or if user exists)
  let userRole = "guest";
  const userEmail = user?.email || "Demo Administrator";

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    
    userRole = profile?.role || "user";
  } else if (isDemo) {
    userRole = "admin"; // Grant demo access
  }

  if (userRole !== "admin") {
    // Instead of redirecting potentially causing confusion, let's show an error page
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-6 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
        <p className="text-gray-400 mb-8 max-w-md">
          You do not have permission to view the Admin Panel. 
          Your current role is: <strong className="text-white">{userRole}</strong>
        </p>
        <div className="flex gap-4">
           <a href="/profile" className="px-4 py-2 bg-white/10 rounded hover:bg-white/20 transition">Go Back to Profile</a>
        </div>
        <div className="mt-12 text-xs text-gray-600 border-t border-gray-800 pt-4">
           <p>Developer Note: Use Supabase Dashboard to update your profile role to &apos;admin&apos;.</p>
        </div>
      </div>
    );

  }

  return (
    <div className="flex h-screen bg-brand-bg text-brand-text overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-brand-bg">
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-brand-surface sticky top-0 z-10">
           <div className="flex items-center gap-4">
              <h2 className="font-semibold text-lg text-white">Super Admin Command Center</h2>
              <div className="hidden md:flex items-center gap-2 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Production Environment</span>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <span className="text-xs text-brand-text-muted">Administrator: <strong className="text-white">{userEmail}</strong></span>
           </div>
        </header>
        <div className="p-8">
           {children}
        </div>
      </main>
    </div>
  );
}
