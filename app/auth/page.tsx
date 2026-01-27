import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, LandPlot, Mic2, ArrowRight } from "lucide-react";

export default function AuthPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-brand-primary">Join Unify</h1>
        <p className="text-xl text-brand-muted">Select your role to get started</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Citizen Card */}
        <Link href="/auth/signup/citizen" className="group">
          <Card className="h-full border-brand-border bg-brand-bg hover:border-brand-primary/50 transition-all duration-300 group-hover:shadow-[0_0_30px_-5px_var(--color-brand-primary)]">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <User className="h-6 w-6 text-blue-500" />
              </div>
              <CardTitle>Citizen</CardTitle>
              <CardDescription>
                Engage with leaders, track promises, and voice your opinion.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm font-medium text-blue-500">
                Join as Citizen <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Politician Card */}
        <Link href="/auth/signup/politician" className="group">
          <Card className="h-full border-brand-border bg-brand-bg hover:border-brand-accent/50 transition-all duration-300 group-hover:shadow-[0_0_30px_-5px_var(--color-brand-accent)]">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <LandPlot className="h-6 w-6 text-orange-500" />
              </div>
              <CardTitle>Politician</CardTitle>
              <CardDescription>
                Manage your campaign, share your manifesto, and connect with voters.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm font-medium text-orange-500">
                Start Campaign <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Creator Card */}
        <Link href="/auth/signup/creator" className="group">
          <Card className="h-full border-brand-border bg-brand-bg hover:border-purple-500/50 transition-all duration-300 group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)]">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mic2 className="h-6 w-6 text-purple-500" />
              </div>
              <CardTitle>Creator</CardTitle>
              <CardDescription>
                Host discussions, analyze policies, and grow your audience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm font-medium text-purple-500">
                Become a Creator <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="text-center pt-8">
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
