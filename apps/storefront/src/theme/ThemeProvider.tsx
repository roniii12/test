"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { ThemeConfig } from "./types";
import { mapTokensToCSSVars } from "./token-map";

/* ---------- Context value shape ---------- */
export interface ThemeContextValue {
  /** Currently active theme config */
  theme: ThemeConfig;
  /** Hot-swap the entire theme at runtime */
  setTheme: (config: ThemeConfig) => void;
  /** Current text direction */
  dir: "rtl" | "ltr";
  /** Toggle text direction */
  toggleDir: () => void;
  /** Set text direction explicitly */
  setDir: (dir: "rtl" | "ltr") => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

/* ---------- Provider component ---------- */
interface ThemeProviderProps {
  /** Initial theme config — usually the default preset */
  initialTheme: ThemeConfig;
  /** Initial text direction — defaults to "rtl" */
  initialDir?: "rtl" | "ltr";
  children: ReactNode;
}

export function ThemeProvider({
  initialTheme,
  initialDir = "rtl",
  children,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeConfig>(initialTheme);
  const [dir, setDirState] = useState<"rtl" | "ltr">(initialDir);

  /* Apply CSS variables to :root whenever the theme changes */
  useEffect(() => {
    const vars = mapTokensToCSSVars(theme);
    const root = document.documentElement;

    Object.entries(vars).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    root.style.setProperty(
      "color-scheme",
      isLightBackground(theme.colors.background) ? "light" : "dark"
    );
  }, [theme]);

  /* Apply dir attribute whenever direction changes */
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = dir === "rtl" ? "he" : "en";
  }, [dir]);

  const setTheme = useCallback((config: ThemeConfig) => {
    setThemeState(config);
  }, []);

  const toggleDir = useCallback(() => {
    setDirState((prev) => (prev === "rtl" ? "ltr" : "rtl"));
  }, []);

  const setDir = useCallback((newDir: "rtl" | "ltr") => {
    setDirState(newDir);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, dir, toggleDir, setDir }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ---------- Helpers ---------- */

/** Naive check: is the background color "light" (brightness > 128)? */
function isLightBackground(hex: string): boolean {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}
