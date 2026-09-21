import { Block } from "payload";
import { TailwindClassesField } from "../fields/TailwindClassesField";

export const HeroBlock: Block = {
  slug: "hero",
  interfaceName: "HeroBlockType",
  fields: [
    TailwindClassesField,
    {
      name: "slides",
      type: "array",
      fields: [
        { name: "headline", type: "text", localized: true },
        { name: "subheadline", type: "text", localized: true },
        { name: "cta", type: "text", localized: true },
        { name: "ctaHref", type: "text" },
        { name: "bgGradient", type: "text" },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "sideBanners",
      type: "array",
      fields: [
        { name: "headline", type: "text", localized: true },
        { name: "cta", type: "text", localized: true },
        { name: "ctaHref", type: "text" },
        { name: "bgGradient", type: "text" },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "autoPlayMs",
      type: "number",
      defaultValue: 5000,
    },
  ],
};
