import type { CollectionConfig } from 'payload';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true },
    { name: 'sku', type: 'text' },
    { name: 'site', type: 'relationship', relationTo: 'sites', required: true },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    { name: 'price', type: 'number', required: true },
    { name: 'salePrice', type: 'number' },
    { name: 'regularPrice', type: 'number' },
    {
      name: 'images',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'alt', type: 'text' },
      ],
    },
    { name: 'youtubeVideoUrl', type: 'text' },
    { name: 'shortDescription', type: 'textarea', localized: true },
    { name: 'longDescription', type: 'richText', localized: true },
    {
      name: 'specs',
      type: 'array',
      fields: [
        { name: 'key', type: 'text', localized: true },
        { name: 'value', type: 'text', localized: true },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        { name: 'icon', type: 'text' },
        { name: 'text', type: 'text', localized: true },
      ],
    },
    { name: 'warranty', type: 'textarea', localized: true },
    {
      name: 'upgrades',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', localized: true },
        {
          name: 'options',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', localized: true },
            { name: 'priceAdd', type: 'number' },
          ],
        },
      ],
    },
    {
      name: 'deliveryOptions',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'price', type: 'number' },
      ],
    },
    { name: 'assemblyTime', type: 'text', localized: true },
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'bundleProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    { name: 'metaTitle', type: 'text', localized: true },
    { name: 'metaDescription', type: 'textarea', localized: true },
    { name: 'inStock', type: 'checkbox', defaultValue: true },
    { name: 'badge', type: 'text' },
  ],
};
