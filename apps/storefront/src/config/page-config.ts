/* ───────────────────────────────────────────────
 *  PageConfig — bridge to @repo/types
 *  Aligning storefront components with Payload CMS blocks.
 * ─────────────────────────────────────────────── */

import { 
  HeroBlockType, 
  ProductGridBlockType, 
  CategoryBannersBlockType, 
  TrustBadgesBlockType, 
  AboutBlockType,
  Product as RepoProduct,
  Page as RepoPage
} from "@repo/types";

// Re-export shared types
export * from "@repo/types";

// Specialized Storefront types for navigation/layouts
export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface SubCategory {
  id: string;
  name: string;
  href: string;
  count?: number;
}

// Legacy Bridge Types (for existing components until fully transitioned)
export type PageBlock = 
  | HeroBlockType 
  | ProductGridBlockType 
  | CategoryBannersBlockType 
  | TrustBadgesBlockType 
  | AboutBlockType;

export type PageConfig = PageBlock[];

export interface CategoryPageConfig {
  slug: string;
  title: string;
  description: string;
  seoText?: string;
  breadcrumbs: BreadcrumbItem[];
  subCategories?: SubCategory[];
  products: RepoProduct[];
}
