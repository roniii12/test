"use client";

import { useTheme } from "@/theme/useTheme";
import { useTranslation } from "@/i18n";

/**
 * Floating theme/locale switcher panel — dev tool only.
 * Fully dynamic: no hardcoded strings.
 */
export function ThemeSwitcher() {
  const { dir, toggleDir } = useTheme();
  const { locale, setLocale } = useTranslation();

  return (
    <div className="theme-switcher-panel">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleDir}
          className="px-2 py-1 bg-gray-100 rounded text-xs hover:bg-gray-200 transition-colors cursor-pointer"
        >
          {dir === "rtl" ? "RTL → LTR" : "LTR → RTL"}
        </button>
        <button
          onClick={() => setLocale(locale === "he" ? "en" : "he")}
          className="px-2 py-1 bg-gray-100 rounded text-xs hover:bg-gray-200 transition-colors cursor-pointer"
        >
          {locale === "he" ? "HE → EN" : "EN → HE"}
        </button>
      </div>
    </div>
  );
}
