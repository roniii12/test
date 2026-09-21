# Agent Guide — CSS & Styling Architecture

> **Scope:** `apps/storefront/src/styles/` + `src/app/globals.css`
>
> **You are responsible for:** Component styling, responsive design, visual consistency, and Tailwind CSS v4 integration.

---

## How Styles Are Organized

```
globals.css
├── @import "tailwindcss";                      ← Tailwind v4 base
├── @import "../styles/topbar.css" layer(components);
├── @import "../styles/mainnav.css" layer(components);
├── @import "../styles/hero.css" layer(components);
├── @import "../styles/product-card.css" layer(components);
├── @import "../styles/trust.css" layer(components);
├── @import "../styles/footer.css" layer(components);
├── @import "../styles/category.css" layer(components);
├── @import "../styles/contact.css" layer(components);
├── @import "../styles/cart.css" layer(components);
├── @import "../styles/responsive.css" layer(components);
├── @theme inline { ... }                       ← Design tokens
└── Base reset + utility classes                ← .container-theme, .section-title, etc.
```

## File-to-Component Mapping

| CSS File           | Component(s)                             | Key Classes                                           |
| ------------------ | ---------------------------------------- | ----------------------------------------------------- |
| `topbar.css`       | `TopBar.tsx`                             | `.top-bar`, `.info-strip`                             |
| `mainnav.css`      | `MainNav.tsx`                            | `.main-nav`, `.nav-link`, `.search-box`               |
| `hero.css`         | `HeroBanner.tsx`                         | `.hero-carousel`, `.hero-slide`, `.side-banners`      |
| `product-card.css` | `ProductCard.tsx`, `ProductGrid.tsx`     | `.product-card`, `.carousel-track`, `.carousel-arrow` |
| `trust.css`        | `TrustBadges.tsx`                        | `.trust-card`, `.trust-card-icon`                     |
| `footer.css`       | `Footer.tsx`                             | `.footer-grid`, `.footer-col`, `.footer-bottom`       |
| `category.css`     | `CategoryCircleGrid.tsx`, category pages | `.cat-grid`, `.cat-card`, `.cat-card-title-bar`       |
| `contact.css`      | Contact page                             | `.contact-grid`, `.contact-card`                      |
| `cart.css`         | Cart page                                | `.cart-table`, `.cart-summary`                        |
| `responsive.css`   | All — media query overrides              | Breakpoint-specific overrides                         |

## Global Utility Classes (in `globals.css`)

| Class                   | Purpose                                                 |
| ----------------------- | ------------------------------------------------------- |
| `.container-theme`      | Max-width 1180px centered container with inline padding |
| `.section-padding`      | Standard vertical padding for page sections             |
| `.section-title`        | Section heading style (1.25rem, weight 800)             |
| `.section-header-bar`   | Flex header with bottom green border                    |
| `.theme-switcher-panel` | Dev tool panel (fixed bottom-left)                      |

## Tailwind CSS v4 — Critical Rules

### 1. `@theme inline` — Static values only

```css
/* ✅ Correct */
@theme inline {
  --color-primary: #6eb43f;
}

/* ❌ BROKEN — CSS vars not allowed in @theme inline */
@theme inline {
  --color-primary: var(--some-var);
}
```

### 2. No `bg-black/0` or opacity modifiers on black

Tailwind v4 uses `color-mix(in oklab)` which renders these as purple. Use:

```css
/* ✅ */ bg-transparent
/* ❌ */ bg-black/0
```

### 3. Dynamic class names won't be scanned

```tsx
// ❌ Tailwind v4 won't detect this
const cls = `bg-${color}-500`;

// ✅ Use complete class strings
const cls = color === "red" ? "bg-red-500" : "bg-blue-500";
```

### 4. CSS layers matter

All component CSS is imported as `layer(components)`. Tailwind utilities (`layer(utilities)`) always win. This means:

- A Tailwind class on an element **overrides** component CSS
- Use `!important` only as a last resort

## CSS Convention Naming

Use BEM-inspired flat naming (no nesting in class names):

```css
/* Component block */
.trust-card {
}

/* Element within block */
.trust-card-icon {
}
.trust-card-title {
}

/* State/modifier */
.trust-card:hover {
}
.carousel-arrow-prev {
}
.carousel-arrow-next {
}
```

## Color System — Always Use Variables

```css
/* ✅ Correct */
color: var(--color-primary);
border-color: var(--color-border);
background: var(--color-background);

/* ❌ NEVER hardcode colors */
color: #6eb43f;
border-color: #e5e5e5;
```

## RTL Support

Use **CSS logical properties** for directional values:

```css
/* ✅ RTL-safe */
padding-inline-start: 1rem;
margin-inline-end: 0.5rem;
inset-inline-start: 0;
border-inline-start: 2px solid green;

/* ❌ NOT RTL-safe */
padding-left: 1rem;
margin-right: 0.5rem;
left: 0;
border-left: 2px solid green;
```

## Adding Styles for a New Component

1. Create `styles/<component-name>.css`
2. Add `@import "../styles/<component-name>.css" layer(components);` to `globals.css`
3. Use CSS custom properties for theming
4. Add responsive overrides to `responsive.css` or within the component's CSS file using `@media`
5. Test in both RTL (Hebrew) and LTR (English) modes
