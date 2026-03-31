import { Shield, FileText, Scale, Lock, Globe } from "lucide-react";

export function TermsContent() {
  const lastUpdated = "March 31, 2026";

  return (
    <div className="space-y-12 py-4">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-brand-primary mb-2">
          <FileText className="h-6 w-6" />
          <h1 className="text-[10px] font-black uppercase tracking-[0.3em]">Governance Protocol</h1>
        </div>
        <h2 className="text-2xl font-black tracking-tight font-baskerville">Terms & Conditions</h2>
        <p className="text-brand-muted text-sm border-b border-white/5 pb-4">
          Last Updated: <span className="text-white font-mono">{lastUpdated}</span>
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-12">
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-brand-primary/10 rounded-lg">
              <Globe className="h-4 w-4 text-brand-primary" />
            </div>
            <h3 className="text-lg font-bold font-baskerville italic text-white">1. Introduction</h3>
          </div>
          <p className="text-brand-muted leading-relaxed text-sm">
            Welcome to <span className="text-white font-bold">PoliFy Kenya</span>. These Terms and Conditions govern your use of our platform, 
            designed to enhance civic engagement and transparency in Kenya. By accessing or using PoliFy, you agree to be bound by these 
            terms, which constitute a legally binding agreement between you and PoliFy Kenya.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-brand-primary/10 rounded-lg">
              <Lock className="h-4 w-4 text-brand-primary" />
            </div>
            <h3 className="text-lg font-bold font-baskerville italic text-white">2. User Accounts</h3>
          </div>
          <div className="space-y-4 text-brand-muted leading-relaxed text-sm">
            <p>
              To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your 
              credentials and for all activities that occur under your account.
            </p>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2">Account Security</h4>
              <p className="text-xs">
                PoliFy utilizes end-to-end encryption for sensitive data. However, the security of your device is your responsibility.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-brand-primary/10 rounded-lg">
              <Shield className="h-4 w-4 text-brand-primary" />
            </div>
            <h3 className="text-lg font-bold font-baskerville italic text-white">3. Privacy & Data Protection</h3>
          </div>
          <p className="text-brand-muted leading-relaxed text-sm">
            Your privacy is paramount. Consistent with the <span className="text-white font-bold">Data Protection Act, 2019 (Kenya)</span>, 
            we collect and process data to facilitate civic engagement. We do not sell your personal information to third parties.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-brand-primary/10 rounded-lg">
              <Scale className="h-4 w-4 text-brand-primary" />
            </div>
            <h3 className="text-lg font-bold font-baskerville italic text-white">4. Prohibited Conduct</h3>
          </div>
          <ul className="grid gap-3">
            {[
              "Violate any local or international law.",
              "Spread verified misinformation (Fake News).",
              "Engage in hate speech or ethnic incitement.",
              "Attempt to breach platform security.",
              "Harass or intimidate other users.",
              "Automate data extraction without authorization."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-xs text-brand-muted">
                <div className="mt-1.5 w-1 h-1 rounded-full bg-brand-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-brand-primary/10 rounded-lg">
              <Scale className="h-4 w-4 text-brand-primary" />
            </div>
            <h3 className="text-lg font-bold font-baskerville italic text-white">5. Content Ownership</h3>
          </div>
          <p className="text-brand-muted leading-relaxed text-sm">
            While you retain ownership of the content you post, by sharing it on PoliFy, you grant us a non-exclusive, royalty-free 
            license to use, display, and distribute that content to promote civic awareness and transparency.
          </p>
        </section>
      </div>
    </div>
  );
}
