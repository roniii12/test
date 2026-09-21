# Gap Analysis — Frontend Shell & Routing Agent

> **Role:** You are responsible for converting the single-tenant Next.js routing to multi-tenant, connecting `layout.tsx` to Payload for dynamic shell rendering (Header, Footer, Theme), and implementing Next.js Middleware.
>
> **Working Directory:** `apps/storefront/src/app/`, `src/middleware.ts`

---

## 🛠️ Current State — What Exists Today

### `layout.tsx` (current):

```typescript
import { ThemeProvider } from "@/theme";
import { SiteProvider } from "@/config/SiteProvider";
import { I18nProvider } from "@/i18n";
import myganConfig from "@/config/sites/mygan.json";
import defaultTheme from "@/theme/presets/default.json";

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <ThemeProvider initialTheme={defaultTheme}>
          <SiteProvider config={myganConfig}>
            <I18nProvider locale="he">
              <TopBar />
              <MainNav />
              <main>{children}</main>
              <Footer />
            </I18nProvider>
          </SiteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Problems:**

1. `myganConfig` is a **hardcoded import** — not from a database.
2. `defaultTheme` is a **static JSON file** — not configurable per tenant.
3. Routes are **flat** (`/`, `/cart`, `/category/[slug]`) — no site param, no multi-tenancy.
4. No `middleware.ts` exists.

---

## 🚀 Target State

### `middleware.ts` (new):

```typescript
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host") || "localhost:3000";

  // Skip Payload admin and API routes
  if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/api"))
    return;

  // Rewrite: mygan.co.il/about → /mygan.co.il/about (internal)
  url.pathname = `/${hostname}${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = { matcher: ["/((?!_next|favicon|media|admin|api).*)"] };
```

### `app/(storefront)/[site]/layout.tsx` (new):

```typescript
import { getPayload } from 'payload';
import configPromise from '@/payload/payload.config';

export default async function SiteLayout({ children, params }) {
  const { site } = await params;
  const payload = await getPayload({ config: configPromise });

  // Fetch site settings from Payload
  const siteData = await payload.find({
    collection: 'sites',
    where: { domain: { equals: site } },
    limit: 1,
  });

  const siteConfig = siteData.docs[0];
  const themeTokens = siteConfig.theme;
  const headerConfig = siteConfig.header;
  const footerConfig = siteConfig.footer;

  return (
    <ThemeProvider initialTheme={themeTokens}>
      <SiteProvider config={siteConfig}>
        <I18nProvider locale={siteConfig.locale?.defaultLocale || 'he'}>
          <TopBar infoStrip={headerConfig.infoStrip} topLinks={headerConfig.topLinks} />
          <MainNav navigation={headerConfig.navigation} brand={siteConfig} />
          <main>{children}</main>
          <Footer config={footerConfig} contact={siteConfig.contact} social={siteConfig.social} />
        </I18nProvider>
      </SiteProvider>
    </ThemeProvider>
  );
}
```

---

## ✅ Task Checklist

### Phase 1: Multi-Tenant Middleware

- [x] **Create `src/middleware.ts`** with hostname detection and URL rewriting logic (code above).
- [x] **Restructure App Router directory:**
  - Move `app/page.tsx` → `app/(storefront)/[site]/page.tsx`
  - Move `app/cart/page.tsx` → `app/(storefront)/[site]/cart/page.tsx`
  - Move `app/category/` → `app/(storefront)/[site]/category/`
  - Move `app/contact/` → `app/(storefront)/[site]/contact/`
  - Keep `app/globals.css` and `app/layout.tsx` (root) in place.
  - `app/layout.tsx` (root) should only have `<html>` and `<body>` — all providers move to `[site]/layout.tsx`.
- [x] **Verify:** In dev mode, `localhost:3000/` should still work (middleware rewrites to `/localhost:3000/`).

### Phase 2: Dynamic Shell from Payload

**Prerequisite:** Backend Agent (01) has created the `Sites` collection with embedded header/footer/theme groups.

- [x] **Update `SiteProvider.tsx`** to accept a serializable `SiteConfig` object from server component props instead of a static import. The provider should remain a client component.
- [x] **Create `app/(storefront)/[site]/layout.tsx`** as a **Server Component** that:
  1. Reads the `[site]` param.
  2. Calls `payload.find({ collection: 'sites', where: { domain: site } })`.
  3. Passes the response data as props to `<SiteProvider>`, `<ThemeProvider>`, `<TopBar>`, `<MainNav>`, `<Footer>`.
- [x] **Update `TopBar.tsx`** to accept `infoStrip` and `topLinks` as props (currently reads from `useSiteConfig()`). Keep backward compatibility — if no props passed, fall back to Context.
- [x] **Update `MainNav.tsx`** to accept `navigation` and `brand` as props.
- [x] **Update `Footer.tsx`** to accept `config`, `contact`, and `social` as props.

### Phase 3: Theme Integration

- [x] **Update `ThemeProvider.tsx`** to accept theme tokens from Payload's `Sites.theme` group and generate CSS variables from them using `mapTokensToCSSVars()`.
- [x] **Verify:** Change `colorPrimary` in Payload Admin for a site → reload the storefront → green buttons should become the new color.

### Phase 4: Fallback for Dev Mode

- [x] **Implement fallback logic:** When `middleware.ts` can't find a matching site (e.g., `localhost:3000`), default to the first site with `isTemplate: true`.
- [x] This ensures `npm run dev` works without configuring a custom domain.

---

**Agent Instruction:** Mark items as `[x]` when complete. The shell components (`TopBar`, `MainNav`, `Footer`) must remain visually identical — only their data source changes.
