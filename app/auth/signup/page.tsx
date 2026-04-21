import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, LandPlot, Mic2, ArrowRight, Landmark } from "lucide-react";

export default function SignupRolePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white font-baskerville">
          Join PoliFy
        </h1>
        <p className="text-lg text-brand-muted">Select your role to get started</p>
      </div>

      <div className="grid gap-4">
        {/* Citizen Card */}
        <Link href="/auth/signup/citizen" className="group">
          <Card className="border-brand-border bg-brand-surface hover:border-brand-primary/50 transition-all duration-300 group-hover:bg-brand-highlight">
            <CardHeader className="flex flex-row items-center gap-4 py-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <User className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">Citizen</CardTitle>
                <CardDescription className="text-xs">
                  Engage with leaders and track promises.
                </CardDescription>
              </div>
              <ArrowRight className="h-4 w-4 text-brand-muted group-hover:text-brand-primary transition-all group-hover:translate-x-1" />
            </CardHeader>
          </Card>
        </Link>

        {/* Politician Card */}
        <Link href="/auth/signup/politician" className="group">
          <Card className="border-brand-border bg-brand-surface hover:border-brand-accent/50 transition-all duration-300 group-hover:bg-brand-highlight">
            <CardHeader className="flex flex-row items-center gap-4 py-4">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <LandPlot className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">Politician</CardTitle>
                <CardDescription className="text-xs">
                  Manage your campaign and connect with voters.
                </CardDescription>
              </div>
              <ArrowRight className="h-4 w-4 text-brand-muted group-hover:text-brand-accent transition-all group-hover:translate-x-1" />
            </CardHeader>
          </Card>
        </Link>

        {/* Creator Card */}
        <Link href="/auth/signup/creator" className="group">
          <Card className="border-brand-border bg-brand-surface hover:border-purple-500/50 transition-all duration-300 group-hover:bg-brand-highlight">
            <CardHeader className="flex flex-row items-center gap-4 py-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mic2 className="h-5 w-5 text-purple-500" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">Creator</CardTitle>
                <CardDescription className="text-xs">
                  Host discussions and analyze policies.
                </CardDescription>
              </div>
              <ArrowRight className="h-4 w-4 text-brand-muted group-hover:text-purple-500 transition-all group-hover:translate-x-1" />
            </CardHeader>
          </Card>
        </Link>

        {/* Political Parties Console Card */}
        <Link href="/party-admin/login" className="group">
          <Card className="border-green-900/40 bg-brand-surface hover:border-green-500/50 transition-all duration-300 group-hover:bg-green-950/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-green-500/5 to-transparent pointer-events-none" />
            <CardHeader className="flex flex-row items-center gap-4 py-4">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform ring-1 ring-green-500/20">
                <Landmark className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <CardTitle className="text-lg text-white">Political Parties Console</CardTitle>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
                    Official
                  </span>
                </div>
                <CardDescription className="text-xs">
                  Access the administrative backend for registered political parties.
                </CardDescription>
              </div>
              <ArrowRight className="h-4 w-4 text-brand-muted group-hover:text-green-500 transition-all group-hover:translate-x-1" />
            </CardHeader>
          </Card>
        </Link>

        {/* Register a new party sub-link */}
        <p className="text-center text-xs text-brand-muted -mt-2">
          New party?{" "}
          <Link
            href="/party-admin/register"
            className="text-green-400 hover:text-green-300 hover:underline font-medium transition-colors"
          >
            Register your party here →
          </Link>
        </p>
      </div>

      <div className="pt-6 border-t border-brand-border">
        <p className="text-brand-muted">
          Already have an account?{" "}
          <Link href="/auth" className="text-brand-primary font-medium hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
