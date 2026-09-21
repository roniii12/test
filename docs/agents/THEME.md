# Agent Guide — Theme System

> **Scope:** `apps/storefront/src/theme/` + `src/app/globals.css` (`@theme inline` section)
>
> **You are responsible for:** Design tokens, color palettes, typography, spacing, theme presets, and runtime theme switching.

---

## How the Theme System Works

```
ThemeConfig JSON
  → mapTokensToCSSVars()           (theme/token-map.ts)
  → document.documentElement.style  (theme/ThemeProvider.tsx)
  → CSS custom properties on :root
  → Tailwind utilities resolve them (e.g. bg-primary → var(--color-primary))
```

## ThemeConfig Schema

Defined in `theme/types.ts`:

```typescript
interface ThemeConfig {
  name: string; // "MyGan Default"
  colors: {
    primary;
    primaryForeground;
    secondary;
    secondaryForeground;
    background;
    foreground;
    muted;
    mutedForeground;
    accent;
    accentForeground;
    border;
    ring;
    destructive;
    destructiveForeground;
    success;
    successForeground;
  };
  typography: {
    fontFamily; // "Heebo, sans-serif"
    fontFamilyHeading; // "Heebo, sans-serif"
    baseFontSize; // "14px"
    lineHeight; // "1.5"
  };
  spacing: {
    unit; // "4px"
    containerMaxWidth; // "1180px"
    gridGap; // "1rem"
    sectionPadding; // "2rem"
  };
  borderRadius: {
    sm;
    md;
    lg;
    xl;
    full; // "4px", "6px", "8px", "12px", "9999px"
  };
}
```

## Critical Rules

### 1. `@theme inline` must use static values

In `globals.css`, the `@theme inline` block provides **compile-time** values for Tailwind:

```css
@theme inline {
  --color-primary: #6eb43f; /* ✅ Static hex */
  --color-primary: var(--x); /* ❌ WILL BREAK — no var() allowed */
}
```

The `ThemeProvider` then **overrides** these at runtime via JavaScript.

### 2. Never use `bg-black/0` or opacity modifiers on black

Tailwind v4 uses `color-mix(in oklab)` which renders purple. Use `bg-transparent` instead.

### 3. Keep `@theme inline` and `token-map.ts` in sync

Every variable in `@theme inline` must have a corresponding entry in `mapTokensToCSSVars()`. If you add a new token, update both files.

## Adding a New Design Token

1. Add to `ThemeConfig` interface in `types.ts`
2. Add the CSS variable mapping in `token-map.ts`
3. Add a default value in `globals.css` → `@theme inline`
4. Add values to all presets in `presets/*.json`

## Creating a New Theme Preset

Create a new file in `theme/presets/`:

```json
{
  "name": "Dark Mode",
  "colors": {
    "primary": "#6eb43f",
    "background": "#1a1a2e",
    "foreground": "#e0e0e0",
    ...
  },
  ...
}
```

The `ThemeSwitcher` component (dev tool at bottom-left) allows hot-swapping presets.

## Files Reference

| File                   | Purpose                                                    |
| ---------------------- | ---------------------------------------------------------- |
| `types.ts`             | TypeScript interfaces for ThemeConfig                      |
| `token-map.ts`         | Maps ThemeConfig → CSS variable key-value pairs            |
| `ThemeProvider.tsx`    | React Context provider, injects vars on `:root`            |
| `useTheme.ts`          | Hook: `useTheme()` → `{ theme, setTheme, dir, toggleDir }` |
| `index.ts`             | Re-exports                                                 |
| `presets/default.json` | Green-themed MyGan default                                 |
| `presets/bold.json`    | Bold variant with different radius/spacing                 |
