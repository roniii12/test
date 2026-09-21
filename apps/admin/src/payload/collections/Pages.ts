import type { CollectionConfig } from 'payload';
import { HeroBlock } from '../blocks/HeroBlock';
import { ProductGridBlock } from '../blocks/ProductGridBlock';
import { CategoryBannersBlock } from '../blocks/CategoryBannersBlock';
import { TrustBadgesBlock } from '../blocks/TrustBadgesBlock';
import { AboutBlock } from '../blocks/AboutBlock';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true },
    { name: 'site', type: 'relationship', relationTo: 'sites', required: true },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        ProductGridBlock,
        CategoryBannersBlock,
        TrustBadgesBlock,
        AboutBlock,
      ],
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
};
