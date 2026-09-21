"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AboutSectionProps {
  html: string | ReactNode;
  customClasses?: string;
}

export function AboutSection({ html, customClasses }: AboutSectionProps) {
  return (
    <section className={cn("section-padding bg-white", customClasses)}>
      <div className="container-theme">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-500 leading-loose text-justify">{html}</p>
        </div>
      </div>
    </section>
  );
}
