/**
 * Theme system barrel export.
 *
 * Usage:
 *   import { ThemeProvider, useTheme, type ThemeConfig } from "@/theme";
 */

export { ThemeProvider } from "./ThemeProvider";
export { useTheme } from "./useTheme";
export { mapTokensToCSSVars } from "./token-map";
export type {
  ThemeConfig,
  ThemeColorTokens,
  ThemeTypographyTokens,
  ThemeSpacingTokens,
  ThemeBorderRadiusTokens,
} from "./types";
