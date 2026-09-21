import type { ThemeConfig } from "./types";

/**
 * Maps a ThemeConfig JSON into a flat dictionary of CSS custom property
 * key-value pairs ready for injection on :root.
 *
 * Example output:
 * {
 *   "--color-primary": "#2563eb",
 *   "--font-family": "Inter",
 *   "--radius-md": "0.5rem",
 *   ...
 * }
 */
export function mapTokensToCSSVars(
  config: ThemeConfig
): Record<string, string> {
  return {
    // ── Colors ──────────────────────────────────────────────
    "--color-primary": config.colors.primary,
    "--color-primary-foreground": config.colors.primaryForeground,
    "--color-secondary": config.colors.secondary,
    "--color-secondary-foreground": config.colors.secondaryForeground,
    "--color-background": config.colors.background,
    "--color-foreground": config.colors.foreground,
    "--color-muted": config.colors.muted,
    "--color-muted-foreground": config.colors.mutedForeground,
    "--color-accent": config.colors.accent,
    "--color-accent-foreground": config.colors.accentForeground,
    "--color-border": config.colors.border,
    "--color-ring": config.colors.ring,
    "--color-destructive": config.colors.destructive,
    "--color-destructive-foreground": config.colors.destructiveForeground,
    "--color-success": config.colors.success,
    "--color-success-foreground": config.colors.successForeground,

    // ── Typography ──────────────────────────────────────────
    "--font-family": config.typography.fontFamily,
    "--font-family-heading": config.typography.fontFamilyHeading,
    "--font-size-base": config.typography.baseFontSize,
    "--line-height-base": config.typography.lineHeight,

    // ── Spacing ─────────────────────────────────────────────
    "--spacing-unit": config.spacing.unit,
    "--container-max-width": config.spacing.containerMaxWidth,
    "--grid-gap": config.spacing.gridGap,
    "--section-padding": config.spacing.sectionPadding,

    // ── Border Radius ───────────────────────────────────────
    "--radius-sm": config.borderRadius.sm,
    "--radius-md": config.borderRadius.md,
    "--radius-lg": config.borderRadius.lg,
    "--radius-xl": config.borderRadius.xl,
    "--radius-full": config.borderRadius.full,
  };
}
