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

  return (
    <div className="container mx-auto flex flex-col items-center justify-center space-y-6">
      <SignupForm role={role as "citizen" | "politician" | "creator"} />
    </div>
  );
}
