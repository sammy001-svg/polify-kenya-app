import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, LandPlot, Mic2, ArrowRight } from "lucide-react";

export default function AuthPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white font-baskerville">Join PoliFy</h1>
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
      </div>

      <div className="pt-6 border-t border-brand-border">
        <p className="text-brand-muted">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-brand-primary font-medium hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
