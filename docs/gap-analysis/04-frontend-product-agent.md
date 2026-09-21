# Gap Analysis — Frontend Product & Catalog Agent

> **Role:** You are responsible for building the Product Detail Page (PDP) and Category listing pages. These are NEW pages that don't exist yet (only a simple placeholder exists). You must also work with the Backend Agent to ensure the Product Payload schema has all required fields.
>
> **Working Directory:** `apps/storefront/src/app/(storefront)/[site]/product/`, `src/components/blocks/`, `src/styles/`
>
> **Reference URL:** `https://mygan.co.il/items/1496369-מחסן-מתכת-פרמיום-2-13X1-27-T74-דגם-EverGreen`

---

## 🛠️ Current State

- **No Product Detail Page exists.** There is no `/product/[slug]` route.
- The `Product` interface in `page-config.ts` is minimal: `{ id, name, description, specs?, price, salePrice?, badge?, inStock, image? }`.
- `ProductCard.tsx` exists for the homepage grid, but it only renders a card preview, not a full PDP.

---

## 🚀 Target State — The Full Product Detail Page

Based on the MyGan reference, the PDP must include these sections (top to bottom):

### Section 1: Breadcrumbs

```
ראשי > מחסני מתכת > מחסן מתכת פרמיום 2.13X1.27 T74 דגם EverGreen
```

Use existing `<Breadcrumb />` component.

### Section 2: Product Hero (Two-Column Layout)

#### Left column (in RTL = right side visually): Image Gallery

- Large main image
- Thumbnail strip below (click to swap)
- Optional embedded YouTube video
- Lightbox on click (zoom)

#### Right column (in RTL = left side visually): Product Info

- **Product title** (h1)
- **SKU / Catalog number** (small text)
- **Price block:**
  - Original price (strikethrough): `1,490 ₪`
  - Sale price (large, colored): `999 ₪`
  - Savings badge: `חסכת 491 ₪`
- **Stock status:** "במלאי" / "אזל מהמלאי"
- **Short description** (1-2 lines)
- **Highlights strip:** Icons with text (warranty, assembly time, material)
  - Example: `🛡️ 5 שנות אחריות | ⏱️ הרכבה כ-2 שעות | 📦 משלוח עד הבית`

### Section 3: Upgrades & Add-ons (תוספות ושדרוגים)

- Dropdown/select menus for each upgrade category:
  - **מנעול:** None | מנעול כפתור (+69₪) | מנעול תליה (+49₪)
  - **מדפים:** None | מדף אחד (+89₪) | 2 מדפים (+159₪)
  - **ריצפה:** None | ריצפת מתכת (+249₪)
  - **הרכבה:** None | הרכבה מקצועית (+350₪)
- Price updates dynamically based on selected upgrades

### Section 4: Add to Cart

- **Quantity selector** (- / number / +)
- **Add to Cart button** (large, green, full-width)
- **Total price** (base + upgrades)

### Section 5: Delivery Options (אפשרויות משלוח)

- Radio buttons or list:
  - `הובלה בין חדרה - גדרה: 199 ₪`
  - `הובלת מדרכה מעבר לחדרה-גדרה: 250 ₪`
  - `איסוף עצמי: 0 ₪ (חינם)`

### Section 6: Technical Specs Table (מפרט טכני)

- Two-column table (striped rows):
  ```
  רוחב מטאורי      | 2.13 מ'
  עומק פנימי       | 1.10 מ'
  גובה             | 1.95 מ'
  חומר              | פלדה מגולוונת
  צבע               | ירוק
  ```

### Section 7: Detailed Description (מידע נוסף)

- Rich text content (Lexical) with headers, lists, images
- May include accordion/tabs for:
  - תיאור מוצר
  - אחריות
  - מדיניות משלוחים
  - הוראות הרכבה

### Section 8: Related Products (מומלץ לקנות יחד)

- Horizontal carousel of `<ProductCard />` components (reuse from homepage)

### Section 9: Customer Reviews (Optional / Future)

- Placeholder for future implementation

---

## ✅ Task Checklist

### Phase 1: Product Page Route & Layout

- [ ] **Create `app/(storefront)/[site]/product/[slug]/page.tsx`** — Server Component that:
  1. Receives `params.slug`.
  2. Queries Payload: `payload.find({ collection: 'products', where: { slug, site } })`.
  3. Passes product data to the `<ProductDetailPage />` client component.

- [ ] **Create `src/components/blocks/ProductDetailPage.tsx`** — Main PDP component:
  - Orchestrates all sections above.
  - Uses `"use client"` for interactive elements (gallery, upgrades, quantity).
  - Accepts the full `Product` object as props.

### Phase 2: Image Gallery

- [ ] **Create `src/components/blocks/ProductGallery.tsx`:**
  - State: `activeImageIndex`.
  - Main image display (large).
  - Thumbnail strip (horizontal scrollable).
  - Click thumbnail → swap main image.
  - Optional: YouTube embed if `youtubeVideoUrl` is present.
- [ ] **Create `src/styles/product-detail.css`** — All PDP styles, imported in `globals.css`.

### Phase 3: Price & Upgrades

- [ ] **Create `src/components/blocks/ProductUpgrades.tsx`:**
  - Renders upgrade groups as `<select>` dropdowns.
  - Calculates total price: `basePrice + sum(selectedUpgradePrices)`.
  - Passes total price up to parent via callback.
- [ ] **Create `src/components/blocks/AddToCartSection.tsx`:**
  - Quantity selector (min 1).
  - "Add to Cart" button.
  - Shows final calculated price.

### Phase 4: Specs & Description

- [ ] **Create `src/components/blocks/ProductSpecs.tsx`:**
  - Renders `specs: { key, value }[]` as a striped two-column table.
- [ ] **Create `src/components/blocks/ProductDescription.tsx`:**
  - Renders Lexical rich text content.
  - Option: accordion for multiple sections.
- [ ] **Create `src/components/blocks/DeliveryOptions.tsx`:**
  - Renders `deliveryOptions: { label, price }[]` as a selectable list.

### Phase 5: Related Products

- [ ] **Reuse `<ProductGrid />`** component to render `relatedProducts` and `bundleProducts` as horizontal carousels at the bottom of the PDP.

### Phase 6: Category Listing Page

- [ ] **Create `app/(storefront)/[site]/category/[slug]/page.tsx`:**
  - Server Component that queries Payload for the Category and its Products.
  - Renders breadcrumbs, category title, optional SEO text, and a product grid.
- [ ] **Add sorting/filtering UI:** Price range, in-stock only (client-side filtering from prefetched data initially).

---

**Agent Instruction:** Mark items as `[x]` when complete. The PDP must feel **premium and robust** — identical in data richness and layout complexity to the MyGan reference URL. Use CSS custom properties for all colors. Use logical properties for all directional values (RTL).
