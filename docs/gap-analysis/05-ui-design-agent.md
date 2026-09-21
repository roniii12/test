# Gap Analysis — UI, Theme & Styling Agent

> **Role:** You are responsible for ensuring visual perfection across the entire storefront: dynamic theme injection from Payload, Tailwind v4 correctness, RTL layout compliance, animations, and design polish.
>
> **Working Directory:** `apps/storefront/src/styles/`, `src/theme/`, `src/app/globals.css`, all `*.tsx` files

---

## 🛠️ Current State — What Exists Today

### Theme System:

1. `theme/types.ts` defines `ThemeConfig` interface (colors, typography, spacing, borderRadius).
2. `theme/token-map.ts` converts `ThemeConfig` → `Record<string, string>` of CSS variable key-value pairs.
3. `theme/ThemeProvider.tsx` applies these to `document.documentElement.style` at runtime.
4. `globals.css` has `@theme inline { ... }` with hardcoded hex values for Tailwind v4 compile-time resolution.
5. Theme presets: `presets/default.json` (green MyGan), `presets/bold.json` (alternative).

### CSS Architecture:

- 10 CSS files in `styles/` imported as `layer(components)` in `globals.css`.
- Utility classes in `globals.css`: `.container-theme`, `.section-padding`, `.section-title`, `.section-header-bar`.
- BEM-like naming: `.trust-card`, `.trust-card-icon`, `.cat-card-title-bar`.

### Known Issues:

- Some components may use physical properties (`left`, `right`) instead of logical (`inline-start`, `inline-end`).
- The `bg-black/0` Tailwind v4 bug (renders purple) — was fixed in `CategoryCircleGrid` but may exist elsewhere.
- No microinteractions on product cards (no scale/shadow on hover).

---

## 🚀 Target State

1. **Theme tokens come from Payload** — the `ThemeProvider` reads `Sites.theme` from the Payload DB query (passed by the Shell Agent's `layout.tsx`).
2. **100% RTL-correct** — every margin, padding, border, and position uses CSS logical properties.
3. **Tailwind v4 clean** — no `bg-black/0`, no dynamic class interpolation, all `@theme inline` values sync with `token-map.ts`.
4. **Premium feel** — smooth transitions, hover effects, skeleton loading states.

---

## ✅ Task Checklist

### Phase 1: Audit Existing CSS for RTL Issues

Scan every file in `src/styles/` and `src/components/**/*.tsx` for physical CSS properties.

- [ ] **Audit `src/styles/topbar.css`** — Replace `left`/`right` with `inset-inline-start`/`inset-inline-end`, `margin-left` with `margin-inline-start`, etc.
- [ ] **Audit `src/styles/mainnav.css`** — Same.
- [ ] **Audit `src/styles/hero.css`** — Check carousel arrow positions, slide padding.
- [ ] **Audit `src/styles/product-card.css`** — Check card layout, badge positions.
- [ ] **Audit `src/styles/trust.css`** — Check hover effects.
- [ ] **Audit `src/styles/footer.css`** — Check column layout direction.
- [ ] **Audit `src/styles/category.css`** — Check grid and card title bar.
- [ ] **Audit `src/styles/contact.css`** — Check form layout.
- [ ] **Audit `src/styles/cart.css`** — Check table alignment.
- [ ] **Audit `src/styles/responsive.css`** — Check media query overrides.
- [ ] **Audit all `.tsx` files** for inline `style={{ marginLeft: ... }}` or Tailwind `ml-*` / `mr-*` (should be `ms-*` / `me-*`).

### Phase 2: Audit Tailwind v4 Compliance

- [ ] **Search entire codebase** for `bg-black/0`, `bg-white/0`, or any `/0` opacity modifier. Replace with `bg-transparent`.
- [ ] **Search for dynamic class strings** like `` `bg-${variable}` `` or `` `text-${color}` ``. Replace with complete conditional strings.
- [ ] **Verify `@theme inline` in globals.css** matches every token in `token-map.ts`:
  - Currently: `--color-primary`, `--color-primary-foreground`, `--color-secondary`, `--color-secondary-foreground`, `--color-background`, `--color-foreground`, `--color-muted`, `--color-muted-foreground`, `--color-accent`, `--color-accent-foreground`, `--color-destructive`, `--color-destructive-foreground`, `--color-card`, `--color-card-foreground`, `--color-border`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`.
  - If `token-map.ts` generates tokens not in `@theme inline`, add them.

### Phase 3: Dynamic Theme Integration

**Prerequisite:** Shell Agent (02) has `layout.tsx` fetching `Sites.theme` from Payload.

- [ ] **Update `token-map.ts`** to accept the Payload `Sites.theme` group structure (field names: `colorPrimary`, `colorBackground`, etc.) and map them to CSS variable names (`--color-primary`, `--color-background`, etc.).
- [ ] **Verify round-trip:** Change `colorPrimary` to `#ff0000` in Payload Admin → reload storefront → all green buttons should be red.
- [ ] **Remove direct dependency on `presets/default.json`** from any component (presets become a fallback for development only).

### Phase 4: Animations & Visual Polish

- [ ] **Product Card hover effect:** Scale up slightly (1.02), add shadow, smooth 200ms transition.
- [ ] **Trust Badge hover:** Already has green border + lift — verify it works on all browsers.
- [ ] **Category Card hover:** Slight overlay darkening, title bar highlight.
- [ ] **Button interactions:** All primary buttons (`bg-primary`) should have a subtle brightness increase on hover.
- [ ] **Page transitions:** Add subtle fade-in animation when blocks render.
- [ ] **Loading skeleton for product images:** Show a gray shimmer placeholder while images load.

### Phase 5: Product Detail Page Styling

**Prerequisite:** Product Agent (04) has created the PDP components.

- [ ] **Create `src/styles/product-detail.css`** — New CSS file for the PDP layout.
- [ ] **Import in `globals.css`:** `@import "../styles/product-detail.css" layer(components);`
- [ ] **Style the image gallery:** Thumbnail strip, main image zoom effect, YouTube embed responsive container.
- [ ] **Style the specs table:** Alternating row colors using `var(--color-muted)` and `var(--color-background)`.
- [ ] **Style the upgrades section:** Custom select dropdowns, price additions highlighted in green.
- [ ] **Style the delivery section:** Radio button styling.
- [ ] **Style the "Add to Cart" button:** Large, full-width, green with white text, sticky on mobile scroll.

### Phase 6: Responsive Design

- [ ] **Verify all pages at these breakpoints:**
  - Mobile: 375px (iPhone SE)
  - Tablet: 768px (iPad)
  - Desktop: 1180px+ (container max-width)
- [ ] **PDP responsive layout:** Single column on mobile (image → info → specs), two columns on desktop.
- [ ] **Navigation:** Hamburger menu on mobile (if not already implemented).
- [ ] **Update `responsive.css`** with any needed overrides.

---

**Agent Instruction:** Mark items as `[x]` when complete. You are the guardian of visual quality. Every pixel matters. Use `var(--color-*)` for all colors, logical properties for all directions, and smooth transitions for all interactive elements.
