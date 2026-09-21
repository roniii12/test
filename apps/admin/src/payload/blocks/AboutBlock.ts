import { Block } from "payload";
import { TailwindClassesField } from "../fields/TailwindClassesField";

export const AboutBlock: Block = {
  slug: "about",
  interfaceName: "AboutBlockType",
  fields: [
    TailwindClassesField,
    {
      name: "content",
      type: "richText",
      localized: true,
    },
  ],
};
