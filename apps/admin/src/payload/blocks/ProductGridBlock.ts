import { Block } from "payload";
import { TailwindClassesField } from "../fields/TailwindClassesField";

export const ProductGridBlock: Block = {
  slug: "productGrid",
  interfaceName: "ProductGridBlockType",
  fields: [
    TailwindClassesField,
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "showAllLabel",
      type: "text",
      localized: true,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
    {
      name: "columns",
      type: "number",
      defaultValue: 4,
    },
  ],
};
