import { Field } from "payload";

export const TailwindClassesField: Field = {
  name: "customClasses",
  type: "text",
  admin: {
    description: "Specify custom Tailwind classes. Use the AI button for help.",
    components: {
      Field: "@/payload/components/TailwindAIField#TailwindAIField",
    },
  },
};
