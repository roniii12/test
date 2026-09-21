"use client";

import type { TrustBadge } from "@/config";
import { cn } from "@/lib/utils";

interface TrustBadgesProps {
  title: string;
  badges: TrustBadge[];
  customClasses?: string;
}

export function TrustBadges({ title, badges, customClasses }: TrustBadgesProps) {
  return (
    <section className={cn("trust-section", customClasses)}>
      <div className="container-theme py-8 sm:py-10">
        <h2 className="section-title text-center">{title}</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {badges.map((badge) => (
            <div key={badge.title} className="trust-card">
              <span className="trust-card-icon">{badge.icon}</span>
              <h3 className="trust-card-title">{badge.title}</h3>
              <p className="trust-card-desc">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
