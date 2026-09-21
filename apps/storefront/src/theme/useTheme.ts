"use client";

import { useContext } from "react";
import { ThemeContext, type ThemeContextValue } from "./ThemeProvider";

/**
 * Convenience hook to access the current ThemeConfig, setTheme, dir, and toggleDir.
 *
 * @example
 * ```tsx
 * const { theme, setTheme, dir, toggleDir } = useTheme();
 * ```
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error(
      "useTheme() must be used within a <ThemeProvider>. " +
        "Wrap your app root with <ThemeProvider initialTheme={...}>."
    );
  }

  return ctx;
}
