import type { CollectionConfig } from 'payload';

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true },
    { name: 'site', type: 'relationship', relationTo: 'sites' },
    { name: 'icon', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'seoText', type: 'richText', localized: true },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
    },
  ],
};
