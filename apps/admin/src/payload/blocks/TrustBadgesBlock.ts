import { Block } from "payload";
import { TailwindClassesField } from "../fields/TailwindClassesField";

export const TrustBadgesBlock: Block = {
  slug: "trustBadges",
  interfaceName: "TrustBadgesBlockType",
  fields: [
    TailwindClassesField,
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "badges",
      type: "array",
      fields: [
        { name: "icon", type: "text" },
        { name: "title", type: "text", localized: true },
        { name: "description", type: "text", localized: true },
      ],
    },
  ],
};
