import { SignupForm } from "@/components/auth/AuthForms";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ role: string }>;
};

// Allow only valid roles
const validRoles = ["citizen", "politician", "creator"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params;
  const titleRole = role.charAt(0).toUpperCase() + role.slice(1);
  return {
    title: `Sign Up as ${titleRole} | PoliFy`,
  };
}

export default async function SignupPage({ params }: Props) {
  const { role } = await params;

  if (!validRoles.includes(role as typeof validRoles[number])) {
    notFound();
  }

  const titleRole = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <div className="w-full space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white font-baskerville">Create {titleRole} Account</h1>
        <p className="text-brand-muted">Enter your details to join the platform</p>
      </div>
      <SignupForm role={role as "citizen" | "politician" | "creator"} />
    </div>
  );
}
