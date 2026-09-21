import type { Site as PayloadSite } from "./payload-types";

export type Site = PayloadSite;
export type SiteBrand = PayloadSite["brand"];
export type SiteTheme = PayloadSite["theme"];
export type SiteHeader = PayloadSite["header"];
export type SiteFooter = PayloadSite["footer"];
export type SiteContact = PayloadSite["contact"];
export type SocialLink = NonNullable<PayloadSite["social"]>[number];
