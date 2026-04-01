"use client";

import React, { useEffect, useRef } from "react";

interface AdSenseProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  className?: string;
}

export const AdSense: React.FC<AdSenseProps> = ({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
}) => {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && publisherId) {
      const handlePush = () => {
        try {
          if (adRef.current && !adRef.current.hasAttribute("data-adsbygoogle-status")) {
            // @ts-expect-error adsbygoogle is not defined on window
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        } catch (err) {
          console.error("AdSense push error:", err);
        }
      };

      // In Next.js dev mode, components sometimes mount twice. 
      // A small delay ensures the DOM is stable and we only push once.
      const timeoutId = setTimeout(handlePush, 150);
      return () => clearTimeout(timeoutId);
    }
  }, [publisherId]);

  if (!publisherId) {
    return null;
  }

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={publisherId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
};
