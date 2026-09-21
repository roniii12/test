# Architecture — NextGen E-commerce Platform

> **Read this first.** Every agent working on this project must read and understand this document before making any changes.

---

## 1. System Overview & Vision

We are building a **multi-tenant headless e-commerce platform**. One codebase powers unlimited stores.

**The Vision:** A user creates a new store inside a CMS admin panel, picks a starting template (like our "MyGan" garden-sheds theme), and immediately has a fully functional e-commerce site—complete with its own domain, colors, navigation, product catalog, and checkout flow. All of this is editable visually.

**The Current State (Phase 1 — Static Template):** A standalone Next.js App Router application functioning as a single monolith. Site identity, page layouts, product data, and theme config are **hardcoded in TypeScript/JSON files**. There is **no database**, **no admin panel**, and **no backend server**.

**The Target State (Phase 2 — Clean Architecture Monorepo):** We use a **pnpm workspaces** Monorepo. The backend is completely separated into `apps/admin` (Powered by Payload CMS v3 and PostgreSQL), providing a headless REST API and the Admin UI. The storefront remains a pure frontend application at `apps/storefront` that fetches data from the Admin API. Types and shared Logic sit in `packages/`.

---

## 2. Tech Stack

| Layer             | Current (Phase 1)     | Target (Phase 2 - Monorepo)              |
| ----------------- | --------------------- | ---------------------------------------- |
| **Workspace**     | Single App            | `pnpm workspaces` + Turborepo            |
| **Frontend App**  | Next.js 16 + React 19 | `apps/storefront` (Pure Next.js)         |
| **Backend App**   | _None (static files)_ | `apps/admin` (Payload CMS v3 + API)      |
| **Communication** | Static imports        | REST API (Storefront -> Admin)           |
| **Database**      | _None_                | PostgreSQL via `@payloadcms/db-postgres` |
| **Shared Types**  | Manually defined      | `packages/types` (Auto-generated)        |

---

## 3. Directory Structure

### Current (Phase 1)

```
ecommerce-startup/
├── apps/
│   └── storefront/                      ← The entire application lives here
│       ├── src/
│       │   ├── app/                     ← Next.js App Router pages
│       │   │   ├── layout.tsx           ← Root layout: providers, shell (TopBar, Nav, Footer)
│       │   │   ├── page.tsx             ← Homepage: imports static config, renders PageRenderer
│       │   │   ├── globals.css          ← Tailwind + CSS variable tokens + component layer imports
│       │   │   ├── cart/page.tsx         ← Cart page
│       │   │   ├── category/[slug]/     ← Category listing page
│       │   │   └── contact/page.tsx     ← Contact page
│       │   │
│       │   ├── components/
│       │   │   ├── blocks/              ← Visual block components (11 files)
│       │   │   │   ├── HeroBanner.tsx       ← Full-width hero carousel with side banners
│       │   │   │   ├── ProductGrid.tsx      ← Horizontal product carousel
│       │   │   │   ├── ProductCard.tsx      ← Single product card (image, price, badge, CTA)
│       │   │   │   ├── CategoryCircleGrid.tsx ← 3×2 category cards grid
│       │   │   │   ├── TrustBadges.tsx      ← Trust indicators row
│       │   │   │   ├── AboutSection.tsx     ← HTML content section
│       │   │   │   ├── TopBar.tsx           ← Info strip + top links
│       │   │   │   ├── MainNav.tsx          ← Logo, search, nav links, cart icon
│       │   │   │   ├── Footer.tsx           ← Multi-column footer
│       │   │   │   ├── Breadcrumb.tsx       ← Breadcrumb navigation
│       │   │   │   └── ThemeSwitcher.tsx    ← Dev tool: switch themes/direction
│       │   │   └── PageRenderer.tsx     ← Maps block JSON → React components via registry
│       │   │
│       │   ├── config/                  ← Static configuration (to be replaced by Payload)
│       │   │   ├── site-config.ts       ← TypeScript interfaces: SiteConfig, SiteBrand, NavItem, etc.
│       │   │   ├── page-config.ts       ← TypeScript interfaces: PageBlock union, Product, HeroSlide, etc.
│       │   │   ├── SiteProvider.tsx      ← React Context providing SiteConfig to the tree
│       │   │   ├── index.ts             ← Re-exports
│       │   │   └── sites/
│       │   │       ├── mygan.json       ← MyGan site identity (brand, nav, footer, contact, SEO)
│       │   │       ├── mygan-homepage.ts ← MyGan homepage block data (hero slides, products, categories)
│       │   │       └── mygan-pages.ts   ← MyGan category page data
│       │   │
│       │   ├── styles/                  ← CSS files (one per component, imported as Tailwind layers)
│       │   │   ├── topbar.css, mainnav.css, hero.css, product-card.css,
│       │   │   │   trust.css, footer.css, category.css, contact.css, cart.css
│       │   │   └── responsive.css       ← Breakpoint overrides
│       │   │
│       │   ├── theme/                   ← Design token system
│       │   │   ├── types.ts             ← ThemeConfig interface (colors, typography, spacing, radius)
│       │   │   ├── token-map.ts         ← Converts ThemeConfig → CSS custom property key-value pairs
│       │   │   ├── ThemeProvider.tsx     ← React Context: injects CSS vars on :root, manages dir
│       │   │   ├── index.ts             ← Re-exports + useTheme hook
│       │   │   └── presets/
│       │   │       ├── default.json     ← MyGan green theme (#6eb43f)
│       │   │       └── bold.json        ← Alternative theme preset
│       │   │
│       │   ├── i18n/                    ← Internationalization
│       │   │   ├── I18nProvider.tsx      ← React Context + dot-path resolver + useTranslation hook
│       │   │   ├── index.ts
│       │   │   └── locales/
│       │   │       ├── he.json          ← Hebrew (default)
│       │   │       └── en.json          ← English
│       │   │
│       │   └── lib/
│       │       └── mock-data.ts         ← Dummy product/category/hero data with TypeScript types
│       │
│       ├── public/                      ← Static assets (favicon, images)
│       ├── package.json                 ← next 16, react 19, tailwindcss 4
│       └── next.config.ts
│
└── docs/                                ← Architecture & execution plans
    ├── ARCHITECTURE.md                  ← This file
    ├── agents/                          ← Per-module reference guides for agents
    │   ├── BLOCKS.md, CONFIG.md, THEME.md, STYLING.md, I18N.md
    └── gap-analysis/                    ← Per-agent execution checklists
        ├── 01-backend-admin-agent.md
        ├── 02-frontend-shell-agent.md
        ├── 03-frontend-homepage-agent.md
        ├── 04-frontend-product-agent.md
        └── 05-ui-design-agent.md
```

### Target (Phase 2 — Clean Architecture Monorepo)

```
ecommerce-startup/
├── turbo.json                           ← Turborepo configuration
├── package.json                         ← Root workspace config (pnpm workspaces)
│
├── packages/                            ← Shared logic and boundaries
│   ├── types/                           ← Auto-generated Interfaces from Payload
│   └── config/                          ← (Optional) Shared ESLint/TS configs
│
├── apps/
│   ├── admin/                           ← NEW: Payload CMS Control Center
│   │   ├── src/
│   │   │   ├── payload.config.ts        ← Main Payload config (DB, Collections, API)
│   │   │   ├── collections/             ← Data models (Users, Sites, Pages, Products)
│   │   │   ├── globals/                 ← Singleton settings (Header, Footer, Theme)
│   │   │   ├── blocks/                  ← Payload block schemas
│   │   │   ├── endpoints/               ← REST/GraphQL API customizations
│   │   │   └── app/(payload)/admin/     ← Admin UI routes
│   │   └── package.json                 ← Admin dependencies (@payloadcms)
│   │
│   └── storefront/                      ← CLEANED: Pure Next.js Customer App
│       ├── src/
│       │   ├── app/
│       │   │   └── [site]/              ← Dynamic site param (resolved by middleware)
│       │   │       ├── layout.tsx       ← Fetches Theme via REST from apps/admin
│       │   │       ├── page.tsx         ← Fetches blocks via REST from apps/admin
│       │   │       ├── [slug]/page.tsx
│       │   │       ├── product/[slug]/page.tsx
│       │   │       └── ...
│       │   ├── components/              ← React visual blocks (No DB logic)
│       │   ├── lib/api.ts               ← Functions to call apps/admin REST API
│       │   └── middleware.ts            ← Reads Host header → rewrites URL
│       └── package.json                 ← NO Payload/Database dependencies
```

---

## 4. The Core Concept: Block-Based Page Architecture

Every page is a **JSON array of blocks**. Each block has a `type` (string) and data fields. The `PageRenderer` component maps each type to a React component.

### How it works today (Static):

```
1. mygan-homepage.ts exports:
   [{ type: "hero", props: { slides: [...] } },
    { type: "productGrid", props: { title: "...", products: [...] } }]

2. app/page.tsx hard-imports this array

3. PageRenderer.tsx iterates → finds type "hero" → renders <HeroBanner />
```

### How it will work with Payload CMS:

```
1. Admin opens /admin → creates a Page → adds Hero block → fills fields → Save
   (Payload stores: { blockType: "hero", slides: [...] } in PostgreSQL)

2. app/[site]/[slug]/page.tsx fetches via REST: GET http://localhost:3000/api/pages?where[slug]=...

3. PageRenderer.tsx receives the same JSON shape → renders <HeroBanner />
```

**The React components (`src/components/blocks/`) do NOT change.** Only the data source changes.

### Current Block Registry

| Block Type        | React Component          | CSS File           | Props Interface                                                        |
| ----------------- | ------------------------ | ------------------ | ---------------------------------------------------------------------- |
| `hero`            | `HeroBanner.tsx`         | `hero.css`         | `slides: HeroSlide[]`, `sideBanners?: HeroSideBanner[]`, `autoPlayMs?` |
| `categoryBanners` | `CategoryCircleGrid.tsx` | `category.css`     | `title?`, `categories: CategoryItem[]`, `columns?`                     |
| `productGrid`     | `ProductGrid.tsx`        | `product-card.css` | `title`, `products: Product[]`, `showAllLabel?`, `columns?`            |
| `trustBadges`     | `TrustBadges.tsx`        | `trust.css`        | `title`, `badges: TrustBadge[]`                                        |
| `about`           | `AboutSection.tsx`       | _(none)_           | `html: string`                                                         |
| `customHtml`      | _(inline)_               | _(none)_           | `html: string`                                                         |

---

## 5. Provider Hierarchy (Current)

`layout.tsx` wraps every page in a strict provider chain:

```
<html lang="he" dir="rtl">
  <ThemeProvider initialTheme={defaultPreset}>     ← Injects CSS vars on :root
    <SiteProvider config={myganConfig}>              ← Provides SiteConfig via Context
      <I18nProvider locale="he">                     ← Provides t() translation function
        <TopBar />                                   ← Uses SiteConfig.infoStrip, topLinks
        <MainNav />                                  ← Uses SiteConfig.navigation, brand
        <main>{children}</main>                      ← Page content (PageRenderer)
        <Footer />                                   ← Uses SiteConfig.footer, contact, social
        <ThemeSwitcher />                            ← Dev tool (bottom-left)
      </I18nProvider>
    </SiteProvider>
  </ThemeProvider>
</html>
```

**In Phase 2:** `SiteProvider` and `ThemeProvider` will receive their data via standard network requests (REST API fetch) to `apps/admin` in a Server Component layout instead of static imports.

---

## 6. Multi-Tenancy & Routing

### Current (Single Tenant):

Routes are static: `/`, `/cart`, `/category/[slug]`, `/contact`. Hard-imports `mygan.json`.

### Target (Multi-Tenant):

```
Request: mygan.co.il/about
  ↓
middleware.ts reads Host header → rewrites to /mygan.co.il/about
  ↓
app/(storefront)/[site]/[slug]/page.tsx
  ↓
Server Component calls: GET /api/pages?where[slug]=about&where[site]=siteId (from Admin API)
```

---

## 7. Templates & Cloning

Our current static "MyGan" theme IS the default template. Here's how it becomes a reusable template in Payload:

1. **Seed Script** converts `mygan.json`, `mygan-homepage.ts`, and `default.json` into Payload database records.
2. The seeded Site gets `isTemplate: true`.
3. **Clone Endpoint** (`POST /api/sites/clone`) deep-copies all Pages, Settings, and Theme tokens to a new Site with a new domain.
4. The new site owner edits their copy freely without affecting the original template.

---

## 8. Theme & CSS System

### Token Flow:

```
ThemeConfig JSON → mapTokensToCSSVars() → :root CSS Variables → Tailwind utilities
```

### Token Categories:

| Category   | CSS Variable            | Example             |
| ---------- | ----------------------- | ------------------- |
| Colors     | `--color-primary`       | `#6eb43f`           |
| Colors     | `--color-background`    | `#ffffff`           |
| Typography | `--font-family`         | `Heebo, sans-serif` |
| Spacing    | `--container-max-width` | `1180px`            |
| Radius     | `--radius-md`           | `6px`               |

### CSS Architecture:

- One CSS file per component in `styles/`
- All imported as `@import "../styles/x.css" layer(components)` in `globals.css`
- `@theme inline { ... }` in `globals.css` provides compile-time values for Tailwind v4

### Tailwind v4 Gotchas:

- `@theme inline` requires **static hex values** (no `var()`) — ThemeProvider overrides at runtime
- `bg-black/0` renders **purple** (color-mix bug) — always use `bg-transparent`
- Dynamic class strings like `` `bg-${color}` `` won't be scanned — use complete strings

---

## 9. Data Contracts (TypeScript Interfaces)

### `SiteConfig` (Shell identity — Header, Footer, Theme):

```typescript
SiteConfig {
  brand: { name, shortName, tagline, logoText }
  contact: { phone, email, address, wazeLink?, hours: { weekdays, friday, notes? } }
  social: SocialLink[]              // facebook, instagram, youtube, whatsapp, tiktok
  topLinks: TopLink[]               // { label, href }
  infoStrip: InfoStripItem[]        // { icon, text }
  navigation: NavItem[]             // { label, href, highlight?, children?: NavItem[] }
  footer: { columns: FooterColumn[], copyrightText, bottomNote }
  seo: { title, description, ogImage? }
  locale: { defaultLocale, defaultDir: "rtl" | "ltr" }
}
```

### `Product` (Current — minimal):

```typescript
Product {
  id, name, description, specs?, price, salePrice?,
  regularPriceLabel?, badge?, inStock, image?
}
```

### `Product` (Target — rich, matching MyGan reference):

```typescript
Product {
  // Identity
  id, sku, name, slug
  // Pricing
  price, salePrice?, regularPriceLabel?
  // Media
  images: { url, alt }[]
  youtubeVideoUrl?
  // Content
  shortDescription                     // One-line summary
  longDescription                      // Rich text (Lexical)
  // Technical Specs
  specs: { key: string, value: string }[]   // e.g. { "רוחב": "2.13 מ'" }
  // Highlights / Trust
  highlights: { icon, text }[]              // "12 שנות אחריות", "הרכבה 2 שעות"
  warranty?: string                          // "5 שנים על חלודה"
  // Upgrades / Add-ons
  upgrades: { name, options: { label, priceAdd }[] }[]  // Lock type, shelving, floor
  // Delivery
  deliveryOptions: { label, price }[]        // "הובלה חדרה-גדרה 199₪", "איסוף עצמי 0₪"
  assemblyTime?: string
  // Relations
  category, relatedProducts[], bundleProducts[]
  // SEO
  metaTitle?, metaDescription?
  // Status
  inStock, badge?
}
```

---

## 10. Internationalization (i18n)

Custom lightweight system — no external packages.

```typescript
const { t, locale, setLocale } = useTranslation();
t("product.addToCart"); // → "הוסף לסל" (he) or "Add to Cart" (en)
```

- Locale files: `i18n/locales/he.json`, `en.json`
- Dot-path key resolution
- Fallback: returns key string if missing
- **UI text** uses `t()` — **Content** (product names, etc.) comes directly from config/CMS

---

## 11. Gap Analysis — Execution Plans

The migration from Phase 1 to Phase 2 is broken into **5 independent agent tracks** that can run in parallel.

| #   | Agent File                      | Scope                                                                 | Dependencies  |
| --- | ------------------------------- | --------------------------------------------------------------------- | ------------- |
| 00  | `00-monorepo-setup-agent.md`    | Setup pnpm workspaces, move files to `apps/admin` & `apps/storefront` | None          |
| 01  | `01-backend-admin-agent.md`     | Payload config, DB Collections, Seeds, REST API generation            | Depends on 00 |
| 02  | `02-frontend-shell-agent.md`    | Clean `storefront` deps, fetch Globals via REST, Multi-tenant router  | Depends on 01 |
| 03  | `03-frontend-homepage-agent.md` | Homepage REST fetch integration & PageRenderer updates                | Depends on 01 |
| 04  | `04-frontend-product-agent.md`  | Product REST fetch, PDP page, Category pages, search                  | Depends on 01 |
| 05  | `05-ui-design-agent.md`         | Theme token injection from Admin REST API, RTL audit, animations      | Depends on 02 |

See `docs/gap-analysis/` for the detailed per-agent checklists.
