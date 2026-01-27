import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Scale, Clock, ShieldCheck, TrendingUp } from "lucide-react";

export default function TransparencyPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-3">How Our Algorithm Works</h1>
        <p className="text-lg text-brand-text-muted">
          Transparency builds trust. Here&apos;s exactly how we rank content in your feed.
        </p>
      </div>

      {/* What We Rank On */}
      <Card className="bg-brand-surface border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <CheckCircle className="w-6 h-6" />
            What We Prioritize
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-green-400 mt-1" />
            <div>
              <h3 className="font-bold mb-1">Verification Status</h3>
              <p className="text-sm text-brand-text-muted">
                Content from verified sources and fact-checked material ranks higher.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-green-400 mt-1" />
            <div>
              <h3 className="font-bold mb-1">Recency & Relevance</h3>
              <p className="text-sm text-brand-text-muted">
                Recent content on topics relevant to your county or interests.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-green-400 mt-1" />
            <div>
              <h3 className="font-bold mb-1">Engagement Quality</h3>
              <p className="text-sm text-brand-text-muted">
                We measure thoughtful discussion, not just clicks. Comments that ask questions rank higher than angry reactions.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Scale className="w-5 h-5 text-green-400 mt-1" />
            <div>
              <h3 className="font-bold mb-1">Viewpoint Diversity</h3>
              <p className="text-sm text-brand-text-muted">
                We actively balance your feed to include government, opposition, and independent perspectives.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What We DON'T Rank On */}
      <Card className="bg-brand-surface border-red-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <XCircle className="w-6 h-6" />
            What We Explicitly Avoid
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <XCircle className="w-5 h-5 text-red-400 mt-1" />
            <div>
              <h3 className="font-bold mb-1">Outrage Amplification</h3>
              <p className="text-sm text-brand-text-muted">
                We don&apos;t boost content just because it makes people angry. Emotional manipulation is penalized.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <XCircle className="w-5 h-5 text-red-400 mt-1" />
            <div>
              <h3 className="font-bold mb-1">Clickbait Farming</h3>
              <p className="text-sm text-brand-text-muted">
                Misleading titles or sensationalist framing are downranked automatically.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <XCircle className="w-5 h-5 text-red-400 mt-1" />
            <div>
              <h3 className="font-bold mb-1">Echo Chamber Formation</h3>
              <p className="text-sm text-brand-text-muted">
                We don&apos;t show you only what you agree with. Balanced exposure to diverse views is a core principle.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <XCircle className="w-5 h-5 text-red-400 mt-1" />
            <div>
              <h3 className="font-bold mb-1">Paid Promotion (Hidden)</h3>
              <p className="text-sm text-brand-text-muted">
                All sponsored content is clearly labeled. Organic ranking cannot be bought.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Algorithm Principles */}
      <Card className="bg-brand-surface border-kenya-gold/30">
        <CardHeader>
          <CardTitle>Our Core Principles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="font-medium">
            🎯 <strong>Goal:</strong> Informed citizens, not addicted users.
          </p>
          <p className="font-medium">
            🔍 <strong>Transparency:</strong> Every recommendation has a reason you can see.
          </p>
          <p className="font-medium">
            ⚖️ <strong>Fairness:</strong> Diverse viewpoints get equal opportunity to reach audiences.
          </p>
          <p className="font-medium">
            🛡️ <strong>Safety:</strong> Misinformation is flagged, not amplified.
          </p>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-brand-text-muted pt-4">
        <p>This page is updated whenever we change our ranking algorithm.</p>
        <p className="mt-1">Last updated: January 2026</p>
      </div>
    </div>
  );
}
