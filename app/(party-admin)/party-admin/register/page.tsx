"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Landmark, Building2, Globe, Phone, Mail, User, ChevronRight,
  ChevronLeft, Check, Loader2, Palette, FileText, CreditCard, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase";
import { generateCivicId } from "@/lib/generate-civic-id";
import { motion, AnimatePresence } from "framer-motion";

// ── Subscription Plans ───────────────────────────────────────────────
const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "KES 5,000",
    period: "/month",
    badge: null,
    color: "border-blue-500/40 hover:border-blue-500",
    accent: "text-blue-400",
    bg: "bg-blue-500/5",
    features: ["Basic party dashboard", "1 admin account", "Public party profile", "Voter analytics (basic)"],
  },
  {
    id: "growth",
    name: "Growth",
    price: "KES 15,000",
    period: "/month",
    badge: "Popular",
    color: "border-green-500/50 hover:border-green-400",
    accent: "text-green-400",
    bg: "bg-green-500/5",
    features: ["Full party dashboard", "Up to 3 admin accounts", "Opinion polls & surveys", "Advanced voter analytics", "Campaign management"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "KES 40,000",
    period: "/month",
    badge: "Full Suite",
    color: "border-purple-500/40 hover:border-purple-500",
    accent: "text-purple-400",
    bg: "bg-purple-500/5",
    features: ["Everything in Growth", "Unlimited admin accounts", "Dedicated account manager", "API access", "Custom branding", "Priority support"],
  },
];

// ── Step Indicator ───────────────────────────────────────────────────
const STEPS = ["Party Details", "Contact Admin", "Choose Plan"];

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                i < currentStep
                  ? "bg-green-500 text-white"
                  : i === currentStep
                  ? "bg-white text-black"
                  : "bg-white/10 text-white/40"
              }`}
            >
              {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-[10px] font-medium uppercase tracking-wider hidden sm:block ${i === currentStep ? "text-white" : "text-white/30"}`}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-8 sm:w-16 h-px mb-4 transition-all ${i < currentStep ? "bg-green-500" : "bg-white/10"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────
export default function PartyRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Step 1 — Party Details
  const [partyName, setPartyName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [website, setWebsite] = useState("");
  const [color, setColor] = useState("#006400");
  const [description, setDescription] = useState("");

  // Step 2 — Admin Contact
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const [adminTitle, setAdminTitle] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  // Step 3 — Plan
  const [selectedPlan, setSelectedPlan] = useState("growth");

  const validateStep = () => {
    if (step === 0) {
      if (!partyName.trim()) return "Party name is required.";
      if (!abbreviation.trim()) return "Abbreviation is required.";
      if (abbreviation.length > 10) return "Abbreviation must be 10 characters or less.";
    }
    if (step === 1) {
      if (!adminName.trim()) return "Admin full name is required.";
      if (!adminEmail.trim() || !adminEmail.includes("@")) return "A valid email is required.";
      if (!adminPhone.trim()) return "Phone number is required.";
      if (!adminPassword || adminPassword.length < 8) return "Password must be at least 8 characters.";
    }
    return null;
  };

  const handleNext = () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError(null);
    setStep((s) => s + 1);
  };

  const handleBack = () => { setError(null); setStep((s) => s - 1); };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const civicId = await generateCivicId();
      const generatedUsername = adminName.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 15) + Math.floor(Math.random() * 1000);

      // 1. Create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: adminEmail,
        password: adminPassword,
        options: {
          data: {
            full_name: adminName,
            role: "citizen",
            phone_number: adminPhone,
            civic_id: civicId,
            username: generatedUsername,
          },
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Could not create account. Please try again.");

      // 2. Insert party registration request
      const { error: regError } = await supabase
        .from("party_registrations")
        .insert({
          party_name: partyName,
          abbreviation: abbreviation.toUpperCase(),
          website: website || null,
          brand_color: color,
          description: description || null,
          contact_name: adminName,
          contact_email: adminEmail,
          contact_phone: adminPhone,
          contact_title: adminTitle || null,
          plan_id: selectedPlan,
          user_id: authData.user.id,
          status: "pending",
        });

      if (regError) throw regError;
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#020202] p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-black text-white">Registration Submitted!</h1>
          <p className="text-brand-text-muted text-sm leading-relaxed">
            Your party registration for <strong className="text-white">{partyName} ({abbreviation.toUpperCase()})</strong> has been submitted successfully.
            <br /><br />
            Our team will review your application and activate your account within <strong className="text-green-400">1–2 business days</strong>. You will receive a confirmation email at <strong className="text-white">{adminEmail}</strong>.
          </p>
          <Button
            onClick={() => router.push("/party-admin/login")}
            className="w-full h-12 bg-white text-black font-black uppercase tracking-widest hover:bg-white/90 rounded-xl"
          >
            Go to Party Login
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#020202] flex flex-col items-center justify-start p-6 pt-12">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="w-full max-w-xl z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-[#111] border border-white/10 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,200,0,0.1)]">
            <Landmark className="w-7 h-7 text-green-500" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Register Your Party</h1>
          <p className="text-xs text-white/40 font-bold tracking-widest uppercase mt-1">
            Official Party Onboarding Portal
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={step} />

        {/* Step Content */}
        <div className="bg-white/5 border border-white/5 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
          <AnimatePresence mode="wait">

            {/* ── STEP 0: Party Details ── */}
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-5 h-5 text-green-400" />
                  <h2 className="text-lg font-bold text-white">Party Information</h2>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Party Full Name *</label>
                  <Input value={partyName} onChange={(e) => setPartyName(e.target.value)}
                    placeholder="e.g. Orange Democratic Movement"
                    className="bg-black/40 border-white/5 focus:border-green-500/40 text-white placeholder:text-white/20 rounded-xl" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Abbreviation *</label>
                  <Input value={abbreviation} onChange={(e) => setAbbreviation(e.target.value.toUpperCase())}
                    placeholder="e.g. ODM" maxLength={10}
                    className="bg-black/40 border-white/5 focus:border-green-500/40 text-white placeholder:text-white/20 rounded-xl" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Website (optional)</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-2.5 w-4 h-4 text-white/20" />
                    <Input value={website} onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourparty.co.ke"
                      className="pl-9 bg-black/40 border-white/5 focus:border-green-500/40 text-white placeholder:text-white/20 rounded-xl" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white/60 uppercase tracking-wider flex items-center gap-2">
                    <Palette className="w-3.5 h-3.5" /> Brand Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-white/10 bg-black/40 cursor-pointer" />
                    <span className="text-sm text-white/50 font-mono">{color}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white/60 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5" /> Party Description (optional)
                  </label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                    rows={3} placeholder="Brief description of your party's vision and mandate..."
                    className="w-full rounded-xl bg-black/40 border border-white/5 focus:border-green-500/40 text-white placeholder:text-white/20 text-sm p-3 outline-none resize-none transition-colors" />
                </div>
              </motion.div>
            )}

            {/* ── STEP 1: Admin Contact ── */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-green-400" />
                  <h2 className="text-lg font-bold text-white">Administrator Details</h2>
                </div>
                <p className="text-xs text-white/40">This person will become the primary admin for the party backend.</p>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-white/20" />
                    <Input value={adminName} onChange={(e) => setAdminName(e.target.value)}
                      placeholder="John Otieno"
                      className="pl-9 bg-black/40 border-white/5 focus:border-green-500/40 text-white placeholder:text-white/20 rounded-xl" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Official Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-white/20" />
                    <Input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="admin@yourparty.co.ke"
                      className="pl-9 bg-black/40 border-white/5 focus:border-green-500/40 text-white placeholder:text-white/20 rounded-xl" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-white/20" />
                    <Input type="tel" value={adminPhone} onChange={(e) => setAdminPhone(e.target.value)}
                      placeholder="+254 7XX XXX XXX"
                      className="pl-9 bg-black/40 border-white/5 focus:border-green-500/40 text-white placeholder:text-white/20 rounded-xl" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Title / Role in Party (optional)</label>
                  <Input value={adminTitle} onChange={(e) => setAdminTitle(e.target.value)}
                    placeholder="e.g. Secretary General, IT Director"
                    className="bg-black/40 border-white/5 focus:border-green-500/40 text-white placeholder:text-white/20 rounded-xl" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Set Password *</label>
                  <Input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    className="bg-black/40 border-white/5 focus:border-green-500/40 text-white placeholder:text-white/20 rounded-xl" />
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Subscription Plan ── */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-green-400" />
                  <h2 className="text-lg font-bold text-white">Choose Your Plan</h2>
                </div>
                <p className="text-xs text-white/40 mb-4">Select the plan that best fits your party&apos;s needs. You can upgrade anytime.</p>

                <div className="space-y-3">
                  {PLANS.map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`w-full text-left border rounded-2xl p-4 transition-all duration-200 ${plan.bg} ${
                        selectedPlan === plan.id ? plan.color + " ring-1 ring-current" : "border-white/5 hover:border-white/15"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`font-bold text-base ${selectedPlan === plan.id ? plan.accent : "text-white"}`}>
                              {plan.name}
                            </span>
                            {plan.badge && (
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${plan.accent} border-current bg-current/10`}>
                                {plan.badge}
                              </span>
                            )}
                          </div>
                          <ul className="space-y-0.5">
                            {plan.features.map((f, i) => (
                              <li key={i} className="text-xs text-white/50 flex items-center gap-1.5">
                                <Check className="w-3 h-3 text-white/30 shrink-0" /> {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <p className={`text-lg font-black ${selectedPlan === plan.id ? plan.accent : "text-white"}`}>{plan.price}</p>
                          <p className="text-xs text-white/30">{plan.period}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <p className="text-[11px] text-white/30 text-center pt-2">
                  Payment details will be collected after your registration is approved.
                </p>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Error */}
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 bg-red-500/5 border border-red-500/20 rounded-xl flex items-center gap-2 text-sm text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3 mt-6">
            {step > 0 && (
              <Button type="button" variant="outline" onClick={handleBack}
                className="flex-1 h-11 border-white/10 text-white/70 hover:bg-white/5 rounded-xl">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            )}
            {step < 2 ? (
              <Button type="button" onClick={handleNext}
                className="flex-1 h-11 bg-white text-black font-bold hover:bg-white/90 rounded-xl">
                Continue <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit} disabled={loading}
                className="flex-1 h-11 bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-wider rounded-xl">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Registration"}
              </Button>
            )}
          </div>
        </div>

        {/* Footer link */}
        <p className="text-center text-xs text-white/30 mt-6">
          Already registered?{" "}
          <a href="/party-admin/login" className="text-green-400 hover:underline font-medium">
            Login to your console →
          </a>
        </p>
      </div>
    </div>
  );
}
