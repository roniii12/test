import type { 
  Page as PayloadPage,
  HeroBlockType,
  ProductGridBlockType,
  CategoryBannersBlockType,
  TrustBadgesBlockType,
  AboutBlockType
} from "./payload-types";

export type Page = PayloadPage;
export type PageLayout = PayloadPage["layout"];

export type {
  HeroBlockType,
  ProductGridBlockType,
  CategoryBannersBlockType,
  TrustBadgesBlockType,
  AboutBlockType
};

export type Block = NonNullable<PageLayout>[number];
