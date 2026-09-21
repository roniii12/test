/**
 * ThemeConfig — The single JSON contract that defines a store's entire visual identity.
 *
 * Swap this object and every Tailwind utility in the app resolves to new values
 * via CSS custom properties on :root.
 */

export interface ThemeColorTokens {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  ring: string;
  destructive: string;
  destructiveForeground: string;
  success: string;
  successForeground: string;
}

export interface ThemeTypographyTokens {
  /** Google Font family name, e.g. "Inter" */
  fontFamily: string;
  /** Google Font family name for headings, e.g. "Outfit" */
  fontFamilyHeading: string;
  /** Base font size, e.g. "16px" */
  baseFontSize: string;
  /** Base line height, e.g. "1.6" */
  lineHeight: string;
}

export interface ThemeSpacingTokens {
  /** Atomic spacing unit, e.g. "4px" */
  unit: string;
  /** Max width of main container, e.g. "1280px" */
  containerMaxWidth: string;
  /** Gap between grid items, e.g. "1.5rem" */
  gridGap: string;
  /** Vertical padding for page sections, e.g. "4rem" */
  sectionPadding: string;
}

export interface ThemeBorderRadiusTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ThemeConfig {
  /** Human-readable theme name */
  name: string;
  colors: ThemeColorTokens;
  typography: ThemeTypographyTokens;
  spacing: ThemeSpacingTokens;
  borderRadius: ThemeBorderRadiusTokens;
}
