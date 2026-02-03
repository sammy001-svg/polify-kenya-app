"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface SubscriptionGuardProps {
  isSubscribed: boolean;
  children: React.ReactNode;
}

export function SubscriptionGuard({
  isSubscribed,
  children,
}: SubscriptionGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If not subscribed and NOT on the subscription page, redirect
    if (!isSubscribed && pathname !== "/campaign/subscription") {
      // Avoid infinite loops and allow public pages if any (none yet in campaign)
      router.push("/campaign/subscription");
    }
  }, [isSubscribed, pathname, router]);

  // If not subscribed and trying to access protected route (checking pathname again to be safe during render)
  if (!isSubscribed && pathname !== "/campaign/subscription") {
    return null; // Don't render protected content until redirect happens
  }

  return <>{children}</>;
}
