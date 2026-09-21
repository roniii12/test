# Gap Analysis — Backend & Admin Panel Agent

> **Role:** You are responsible for installing Payload CMS, PostgreSQL connectivity, defining ALL Payload collections/globals/blocks, the seed script, and the template cloning API endpoint.
>
> **Working Directory:** `apps/storefront/src/payload/`

---

## 🛠️ Current State

There is **no backend**. The `src/` directory at the project root (mentioned in old docs) does **not exist**. The frontend (`apps/storefront/`) runs as a pure Next.js app with zero database connections and zero API routes.

All "data" is hardcoded in:

- `src/config/sites/mygan.json` — site identity (brand, nav, footer, contact, SEO)
- `src/config/sites/mygan-homepage.ts` — homepage blocks (hero, products, categories)
- `src/config/sites/mygan-pages.ts` — category page data
- `src/theme/presets/default.json` — theme tokens
- `src/lib/mock-data.ts` — product/category type definitions + sample data

---

## 🚀 Target State

Payload CMS v3 is embedded natively in the Next.js app. It provides:

- An admin panel at `/admin`.
- REST and Local APIs to query content.
- A PostgreSQL database storing ALL content.
- A seed script to initialize the DB with the MyGan template.
- A custom endpoint to clone a template site into a new tenant.

---

## ✅ Task Checklist

### Phase 1: Install & Initialize

- [x] **Install dependencies** in `apps/storefront/`:
  ```bash
  npm install payload @payloadcms/next @payloadcms/db-postgres @payloadcms/richtext-lexical graphql
  ```
- [x] **Create `.env.local`** at the root of `apps/storefront/`:
  ```env
  DATABASE_URI=postgresql://postgres:postgres@127.0.0.1:5432/ecommerce_cms
  PAYLOAD_SECRET=a-random-secret-string-at-least-32-chars
  ```
- [x] **Create the main Payload config file** at `src/payload/payload.config.ts`:

  ```typescript
  import { buildConfig } from "payload";
  import { postgresAdapter } from "@payloadcms/db-postgres";
  import { lexicalEditor } from "@payloadcms/richtext-lexical";
  import { Users } from "./collections/Users";
  import { Sites } from "./collections/Sites";
  import { Pages } from "./collections/Pages";
  import { Products } from "./collections/Products";
  import { Categories } from "./collections/Categories";
  import { Media } from "./collections/Media";

  export default buildConfig({
    editor: lexicalEditor(),
    db: postgresAdapter({
      pool: { connectionString: process.env.DATABASE_URI! },
    }),
    collections: [Users, Sites, Pages, Products, Categories, Media],
    globals: [], // SiteSettings will be a collection, not a global (for multi-tenancy)
    admin: { user: Users.slug },
    typescript: { outputFile: "src/payload/payload-types.ts" },
  });
  ```

- [ ] **Create `Users` collection** (`src/payload/collections/Users.ts`):
  - Slug: `users`
  - Auth: `true`
  - Fields: `role` (select: `admin` | `editor`).
- [ ] **Next.js Integration:**
  - Update `next.config.ts` to wrap config with `withPayload()`.
  - Create `src/app/(payload)/admin/[[...segments]]/page.tsx` (mounts Payload Admin).
  - Create `src/app/(payload)/api/[...slug]/route.ts` (mounts Payload REST API).

**✅ Checkpoint:** `npm run dev` → navigate to `localhost:3000/admin` → see "Create First User" screen.

---

### Phase 2: Core Collections

- [x] **Create `Sites` collection** (`src/payload/collections/Sites.ts`):
- [x] **Create `Pages` collection** (`src/payload/collections/Pages.ts`):
- [x] **Create `Products` collection** (`src/payload/collections/Products.ts`):
- [x] **Create `Categories` collection** (`src/payload/collections/Categories.ts`):
- [x] **Create `Media` collection** (`src/payload/collections/Media.ts`):

**✅ Checkpoint:** All collections appear in `/admin`. Can create a Site, a Page with blocks, and a Product.

---

### Phase 3: Block Schemas

Create Payload Block schemas in `src/payload/blocks/`. Each schema's fields **must exactly match** the props expected by the existing React component.

- [x] **`HeroBlock.ts`** — maps to `<HeroBanner />`:
- [x] **`ProductGridBlock.ts`** — maps to `<ProductGrid />`:
- [x] **`CategoryBannersBlock.ts`** — maps to `<CategoryCircleGrid />`:
- [x] **`TrustBadgesBlock.ts`** — maps to `<TrustBadges />`:
- [x] **`AboutBlock.ts`** — maps to `<AboutSection />`:

Register all blocks in the `Pages` collection's `layout` field.

---

### Phase 4: Seed Script

- [x] **Create `src/payload/seed.ts`:**
  - Read the static data from `config/sites/mygan.json`, `mygan-homepage.ts`, `default.json`.
  - Create a `Site` record with `isTemplate: true`.
  - Create `Category` records.
  - Create `Product` records with images.
  - Create the `Page` for "Home" with blocks matching the homepage config.

---

### Phase 5: Template Cloning Endpoint

- [x] **Create `src/payload/endpoints/cloneSite.ts`:**
  - `POST /api/sites/clone` body: `{ templateSiteId: string, newDomain: string, newName: string }`
  - Logic:
    1. Find the template Site and all its Pages and Products.
    2. Create a new Site with `isTemplate: false`.
    3. Deep-copy all Pages (with blocks) linking to the new Site.
    4. Deep-copy all Products linking to the new Site.
  - Return the new Site ID.

---

**Agent Instruction:** Mark items as `[x]` when complete. After each Phase, run `npm run dev` and verify the checkpoint.
