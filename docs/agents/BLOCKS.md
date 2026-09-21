# Agent Guide — Block Components & Payload Integration

> **Scope:** `apps/storefront/src/components/blocks/`, `PageRenderer.tsx`, and `src/payload/blocks/`
>
> **You are responsible for:** Creating and maintaining the visual block components in React AND their corresponding data schema in Payload CMS.

---

## 1. The Block Paradigm

Pages are assembled dynamically. The `PageRenderer` (`PageRenderer.tsx`) takes a JSON array of blocks from the Payload CMS REST API and maps each `block.blockType` to a React component.

```typescript
// PageRenderer.tsx — the block registry
const BLOCK_REGISTRY: Record<string, React.ComponentType<{ block: any }>> = {
  hero: ({ block }) => <HeroBanner {...block} />,
  categoryBanners: ({ block }) => <CategoryBanners {...block} />,
  productGrid: ({ block }) => <ProductGrid {...block} />,
  trustBadges: ({ block }) => <TrustBadges {...block} />,
};
```

## 2. Adding a New Block — End to End

To add a new block (e.g., `Testimonials`), you must implement both the Backend (Payload Schema) and the Frontend (React Component).

### Step 2.1: Create Payload Schema (Backend)

Define the data structure that the admin will see in the Payload UI.

```typescript
// src/payload/blocks/TestimonialsBlock.ts
import { Block } from "payload";

export const TestimonialsBlock: Block = {
  slug: "testimonials", // This matches block.blockType in REST output
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "items",
      type: "array",
      fields: [
        { name: "name", type: "text" },
        { name: "text", type: "textarea" },
      ],
    },
  ],
};
```

_Add this block to the `blocks` array in the `Pages` collection._

### Step 2.2: Create React Component (Frontend)

Create the visual component that receives the data from Payload.

```typescript
// src/components/blocks/Testimonials.tsx
"use client";

interface TestimonialsProps {
  title: string;
  items: { name: string; text: string }[];
}

export function Testimonials({ title, items }: TestimonialsProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-theme">
        <h2 className="section-title">{title}</h2>
        {/* Render items */}
      </div>
    </section>
  );
}
```

### Step 2.3: Register in PageRenderer

```typescript
// src/components/PageRenderer.tsx
import { Testimonials } from "./blocks/Testimonials";

const BLOCK_REGISTRY = {
  // ...
  testimonials: ({ block }) => <Testimonials {...block} />,
};
```

## Conventions

- **Always** use `"use client"` directive for visual React components.
- **Data Flow:** The props received by the React component correspond exactly to the fields defined in the Payload block schema.
- **Styling:** Use CSS custom properties (`var(--color-primary)`). Do not hardcode hex colors.
- **RTL Support:** Use logical properties (`padding-inline`, `inset-inline-start`).
