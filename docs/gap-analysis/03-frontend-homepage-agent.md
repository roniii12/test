# Gap Analysis — Frontend Homepage & Blocks Agent

> **Role:** You are responsible for creating Payload block schemas that mirror the existing React block components, updating `PageRenderer`, and wiring the homepage to fetch its block layout from Payload.
>
> **Working Directory:** `apps/storefront/src/payload/blocks/`, `src/components/PageRenderer.tsx`, `src/app/(storefront)/[site]/page.tsx`

---

## 🛠️ Current State — What Exists Today

### `PageRenderer.tsx` (current):

```typescript
const BLOCK_REGISTRY: Record<string, React.ComponentType<{ block: PageBlock }>> = {
  hero: ({ block }) => <HeroBanner {...block.props} />,
  categoryBanners: ({ block }) => <CategoryBanners {...block.props} />,
  productGrid: ({ block }) => <ProductGrid {...block.props} />,
  trustBadges: ({ block }) => <TrustBadges {...block.props} />,
  about: ({ block }) => <AboutSection {...block.props} />,
  customHtml: ({ block }) => <section dangerouslySetInnerHTML={{ __html: block.props.html }} />,
};
```

### `app/page.tsx` (current):

```typescript
import { myganHomepage } from "@/config/sites/mygan-homepage";
import { PageRenderer } from "@/components/PageRenderer";

export default function HomePage() {
  return <PageRenderer blocks={myganHomepage} />;
}
```

**Problem:** `myganHomepage` is a static import. It needs to be fetched from Payload.

### Existing React Block Components (DO NOT MODIFY visually):

| Component            | File                            | Props it expects                                                                    |
| -------------------- | ------------------------------- | ----------------------------------------------------------------------------------- |
| `HeroBanner`         | `blocks/HeroBanner.tsx`         | `slides: HeroSlide[]`, `sideBanners?: HeroSideBanner[]`, `autoPlayMs?: number`      |
| `CategoryCircleGrid` | `blocks/CategoryCircleGrid.tsx` | `title?: string`, `categories: CategoryItem[]`, `columns?: number`                  |
| `ProductGrid`        | `blocks/ProductGrid.tsx`        | `title: string`, `products: Product[]`, `showAllLabel?: string`, `columns?: number` |
| `TrustBadges`        | `blocks/TrustBadges.tsx`        | `title: string`, `badges: TrustBadge[]`                                             |
| `AboutSection`       | `blocks/AboutSection.tsx`       | `html: string`                                                                      |

---

## 🚀 Target State

### `app/(storefront)/[site]/page.tsx` (target):

```typescript
import { getPayload } from 'payload';
import configPromise from '@/payload/payload.config';
import { PageRenderer } from '@/components/PageRenderer';

export default async function HomePage({ params }) {
  const { site } = await params;
  const payload = await getPayload({ config: configPromise });

  const siteDoc = await payload.find({
    collection: 'sites', where: { domain: { equals: site } }, limit: 1,
  });

  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' }, site: { equals: siteDoc.docs[0].id } },
    depth: 2, // Populate relationships (products, categories)
  });

  return <PageRenderer blocks={page.docs[0].layout} />;
}
```

### `PageRenderer.tsx` (target changes):

```typescript
// Change: Instead of block.props, Payload uses direct fields + blockType
const BLOCK_REGISTRY: Record<string, React.ComponentType<any>> = {
  hero: (block) => <HeroBanner slides={block.slides} sideBanners={block.sideBanners} autoPlayMs={block.autoPlayMs} />,
  productGrid: (block) => <ProductGrid title={block.title} products={block.products} showAllLabel={block.showAllLabel} />,
  categoryBanners: (block) => <CategoryCircleGrid title={block.title} categories={block.categories} />,
  trustBadges: (block) => <TrustBadges title={block.title} badges={block.badges} />,
  about: (block) => <AboutSection html={block.content} />,
};

// Payload returns: { blockType: "hero", slides: [...] }
// instead of:      { type: "hero", props: { slides: [...] } }
export function PageRenderer({ blocks }) {
  return blocks.map((block, i) => {
    const Component = BLOCK_REGISTRY[block.blockType];
    return Component ? <Component key={i} {...block} /> : null;
  });
}
```

---

## ✅ Task Checklist

### Phase 1: Create Payload Block Schemas

**Prerequisite:** Backend Agent (01) has Payload installed and `payload.config.ts` working.

- [ ] **Create `src/payload/blocks/HeroBlock.ts`:**
  - slug: `hero`
  - Fields: `slides` (array: headline, subheadline, cta, ctaHref, bgGradient, image upload), `sideBanners` (array: headline, cta, ctaHref, bgGradient, image upload), `autoPlayMs` (number, default 5000).
- [ ] **Create `src/payload/blocks/ProductGridBlock.ts`:**
  - slug: `productGrid`
  - Fields: `title` (text), `showAllLabel` (text), `products` (relationship to 'products', hasMany), `columns` (number, default 4).
- [ ] **Create `src/payload/blocks/CategoryBannersBlock.ts`:**
  - slug: `categoryBanners`
  - Fields: `title` (text), `categories` (relationship to 'categories', hasMany), `columns` (number, default 3).
- [ ] **Create `src/payload/blocks/TrustBadgesBlock.ts`:**
  - slug: `trustBadges`
  - Fields: `title` (text), `badges` (array: icon text, title text, description text).
- [ ] **Create `src/payload/blocks/AboutBlock.ts`:**
  - slug: `about`
  - Fields: `content` (richText).

### Phase 2: Wire Blocks into Pages Collection

- [ ] **Update `Pages` collection** to include `layout` blocks field referencing all block schemas above.
- [ ] **Verify in Admin:** Create a Page → add a Hero block → fill fields → save → check the JSON via Payload REST API (`GET /api/pages`).

### Phase 3: Update PageRenderer

- [ ] **Update `PageRenderer.tsx`** to use `block.blockType` instead of `block.type` and spread block fields instead of `block.props`.
- [ ] **Handle relationship population:** When `ProductGridBlock` receives `products`, Payload returns populated Product objects if `depth >= 2`. Verify the Product object shape matches what `<ProductCard />` expects. If not, write a mapping function.
- [ ] **Handle richText for AboutBlock:** Payload Lexical returns a structured JSON for richText. You may need to use `@payloadcms/richtext-lexical/react` to render it, or convert to HTML.

### Phase 4: Homepage Route

- [ ] **Create `app/(storefront)/[site]/page.tsx`** as a Server Component that queries Payload for the page with slug `home` belonging to the active site.
- [ ] **Create `app/(storefront)/[site]/[slug]/page.tsx`** for any other pages (about, etc.).
- [ ] **Verify:** Homepage loads from Payload data. Edit Hero headline in `/admin` → refresh storefront → see the new headline.

---

**Agent Instruction:** Mark items as `[x]` when complete. Do NOT change the visual design of any React component — only change how they receive their data.
