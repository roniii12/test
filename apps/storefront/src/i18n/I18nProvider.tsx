"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import heLocale from "./locales/he.json";
import enLocale from "./locales/en.json";

type TranslationDict = Record<string, unknown>;

const locales: Record<string, TranslationDict> = {
  he: heLocale,
  en: enLocale,
};

interface I18nContextValue {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * Resolve a dotted key path like "product.details" from a nested object.
 */
function resolveKey(dict: TranslationDict, key: string): string {
  const parts = key.split(".");
  let current: unknown = dict;
  for (const part of parts) {
    if (current && typeof current === "object" && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return key; // fallback: return key itself
    }
  }
  return typeof current === "string" ? current : key;
}

export function I18nProvider({
  initialLocale = "he",
  children,
}: {
  initialLocale?: string;
  children: ReactNode;
}) {
  const [locale, setLocale] = useState(initialLocale);

  const t = useCallback(
    (key: string) => {
      const dict = locales[locale] || locales.he;
      return resolveKey(dict, key);
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useTranslation() must be used within an <I18nProvider>.");
  }
  return ctx;
}
