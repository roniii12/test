import { Block } from "payload";
import { TailwindClassesField } from "../fields/TailwindClassesField";

export const CategoryBannersBlock: Block = {
  slug: "categoryBanners",
  interfaceName: "CategoryBannersBlockType",
  fields: [
    TailwindClassesField,
    {
      name: "title",
      type: "text",
      localized: true,
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
    },
    {
      name: "columns",
      type: "number",
      defaultValue: 3,
    },
  ],
};
