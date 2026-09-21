"use client";

import { cn } from "@/lib/utils";

import { HeroBanner } from "./blocks/HeroBanner";
import { CategoryBanners } from "./blocks/CategoryCircleGrid";
import { ProductGrid } from "./blocks/ProductGrid";
import { TrustBadges } from "./blocks/TrustBadges";
import { AboutSection } from "./blocks/AboutSection";

/**
 * Block registry — maps block type to React component.
 * Extend this record to add new block types.
 */
const BLOCK_REGISTRY: Record<string, React.ComponentType<any>> = {
  hero: (block) => (
    <HeroBanner
      slides={block.slides}
      sideBanners={block.sideBanners}
      autoPlayMs={block.autoPlayMs}
      customClasses={block.customClasses}
    />
  ),
  categoryBanners: (block) => (
    <CategoryBanners
      title={block.title}
      categories={block.categories}
      columns={block.columns}
      customClasses={block.customClasses}
    />
  ),
  productGrid: (block) => (
    <ProductGrid
      title={block.title}
      showAllLabel={block.showAllLabel}
      products={block.products}
      columns={block.columns}
      customClasses={block.customClasses}
    />
  ),
  trustBadges: (block) => (
    <TrustBadges
      title={block.title}
      badges={block.badges}
      customClasses={block.customClasses}
    />
  ),
  about: (block) => (
    <AboutSection
      html={block.content ? "<div>[Lexical Rich Text Content - Pending Implementation]</div>" : ""}
      customClasses={block.customClasses}
    />
  ),
  customHtml: (block) => (
    <section
      className={cn("section-padding", block.customClasses)}
      dangerouslySetInnerHTML={{ __html: block.html }}
    />
  ),
};

interface PageRendererProps {
  blocks: any[];
}

/**
 * Dynamic page renderer.
 * Iterates over Payload blocks array and renders each block using the registry.
 */
export function PageRenderer({ blocks }: PageRendererProps) {
  if (!blocks || !Array.isArray(blocks)) return null;
  return (
    <>
      {blocks.map((block, idx) => {
        const BlockComponent = BLOCK_REGISTRY[block.blockType];
        if (!BlockComponent) {
          console.warn(`Unknown block type: ${block.blockType}`);
          return null;
        }
        return <BlockComponent key={`${block.blockType}-${idx}`} {...block} />;
      })}
    </>
  );
}
