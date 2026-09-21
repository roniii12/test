"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Site } from "./site-config";

const SiteContext = createContext<Site | null>(null);

export function SiteProvider({
  config,
  children,
}: {
  config: Site;
  children: ReactNode;
}) {
  return (
    <SiteContext.Provider value={config}>{children}</SiteContext.Provider>
  );
}

export function useSiteConfig(): Site {
  const ctx = useContext(SiteContext);
  if (!ctx) {
    throw new Error("useSiteConfig() must be used within a <SiteProvider>.");
  }
  return ctx;
}
