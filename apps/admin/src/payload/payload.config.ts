import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Users } from "./collections/Users";
import { Sites } from "./collections/Sites";
import { Pages } from "./collections/Pages";
import { Products } from "./collections/Products";
import { Categories } from "./collections/Categories";
import { Media } from "./collections/Media";

export default buildConfig({
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI! },
  }),
  collections: [Users, Sites, Pages, Products, Categories, Media],
  localization: {
    locales: ['en', 'he'],
    defaultLocale: 'he',
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-dev',
  globals: [], // SiteSettings will be a collection, not a global (for multi-tenancy)
  admin: { user: Users.slug },
  typescript: { outputFile: "src/payload/generated-types.ts" },
  endpoints: [
    {
      path: '/sites/clone',
      method: 'post',
      handler: async (req) => {
        const { cloneSiteEndpoint } = await import('./endpoints/cloneSite')
        return cloneSiteEndpoint(req)
      },
    },
    {
      path: '/ai/generate-tailwind',
      method: 'post',
      handler: async (req) => {
        const { aiGenerateTailwindEndpoint } = await import('./endpoints/ai');
        return aiGenerateTailwindEndpoint.handler(req);
      },
    },
  ],
});

