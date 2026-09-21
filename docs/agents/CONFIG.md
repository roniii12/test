# Agent Guide — Global Settings, Sites & Routing (Payload CMS)

> **Scope:** `src/payload/collections/Sites.ts`, `src/payload/globals/`, and `src/app/(storefront)/[site]/`
>
> **You are responsible for:** Site identity, multi-tenant routing, global settings (nav, footer, theme).

---

## 1. Multi-Tenant Architecture

The platform serves multiple distinct stores from a single codebase.

1. **Payload `Sites` Collection:** Defines the active domains (e.g., `mygan.co.il`, `demo.store.com`).
2. **Next.js Middleware:** Detects the incoming `Host` header and rewrites the URL to inject the site domain into the path (e.g., `/[site]/[slug]`).
3. **Dynamic Data Fetching:** Server components query Payload for contents matching the specific `site`.

## 2. Global Settings (Payload Globals)

Instead of hardcoded JSON files, site-wide settings are managed in Payload "Globals". Because we are multi-tenant, these Globals must either be configured with a `site` relationship field or managed via a robust multi-tenant approach.

### Key Configuration Areas:

- **Header Navigation:** Links, Logos, Top Bar announcement strips.
- **Footer:** Columns, Social Links, Copyright text.
- **Theme Tokens:** Colors, Typography, Spacing.

```typescript
// Example: src/payload/globals/Theme.ts
import { GlobalConfig } from "payload";

export const ThemeGlobal: GlobalConfig = {
  slug: "theme",
  fields: [
    {
      name: "site",
      type: "relationship",
      relationTo: "sites",
    },
    {
      name: "colorPrimary",
      type: "text",
      defaultValue: "#6eb43f",
    },
    // ...other theme tokens
  ],
};
```

## 3. Data Flow

```
1. User requests mygan.co.il/about
2. Middleware rewrites to /[site="mygan.co.il"]/[slug="about"]
3. layout.tsx fetches Header/Footer Globals where site = mygan.co.il
4. layout.tsx injects CSS properties based on Theme Global
5. page.tsx fetches Page where slug = 'about' AND site = mygan.co.il
```

## Rules

- **Never** hardcode configuration data in TypeScript/JSON files. All new configuration options must be added as fields to the relevant Payload Global schema.
- **Always** ensure queries to Payload include the correct `site` identifier to prevent data leakage between tenants.
