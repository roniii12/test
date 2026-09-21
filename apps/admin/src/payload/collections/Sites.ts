import type { CollectionConfig } from 'payload';

export const Sites: CollectionConfig = {
  slug: 'sites',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'domain', type: 'text', required: true, unique: true },
    { name: 'isTemplate', type: 'checkbox', defaultValue: false },
    {
      name: 'brand',
      type: 'group',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'shortName', type: 'text' },
        { name: 'logoText', type: 'text' },
        { name: 'tagline', type: 'text' },
      ],
    },
    {
      name: 'theme',
      type: 'group',
      fields: [
        {
          name: 'colors',
          type: 'group',
          fields: [
            { name: 'primary', type: 'text' },
            { name: 'primaryForeground', type: 'text' },
            { name: 'secondary', type: 'text' },
            { name: 'secondaryForeground', type: 'text' },
            { name: 'background', type: 'text' },
            { name: 'foreground', type: 'text' },
            { name: 'muted', type: 'text' },
            { name: 'mutedForeground', type: 'text' },
            { name: 'accent', type: 'text' },
            { name: 'accentForeground', type: 'text' },
            { name: 'border', type: 'text' },
            { name: 'ring', type: 'text' },
            { name: 'destructive', type: 'text' },
            { name: 'destructiveForeground', type: 'text' },
            { name: 'success', type: 'text' },
            { name: 'successForeground', type: 'text' },
          ],
        },
        {
          name: 'typography',
          type: 'group',
          fields: [
            { name: 'fontFamily', type: 'text' },
            { name: 'fontFamilyHeading', type: 'text' },
            { name: 'baseFontSize', type: 'text' },
            { name: 'lineHeight', type: 'text' },
          ],
        },
        {
          name: 'spacing',
          type: 'group',
          fields: [
            { name: 'unit', type: 'text' },
            { name: 'containerMaxWidth', type: 'text' },
            { name: 'gridGap', type: 'text' },
            { name: 'sectionPadding', type: 'text' },
          ],
        },
        {
          name: 'borderRadius',
          type: 'group',
          fields: [
            { name: 'sm', type: 'text' },
            { name: 'md', type: 'text' },
            { name: 'lg', type: 'text' },
            { name: 'xl', type: 'text' },
            { name: 'full', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'header',
      type: 'group',
      fields: [
        { name: 'logoText', type: 'text' },
        {
          name: 'infoStrip',
          type: 'array',
          fields: [
            { name: 'icon', type: 'text' },
            { name: 'text', type: 'text' },
          ],
        },
        {
          name: 'topLinks',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'href', type: 'text' },
          ],
        },
        {
          name: 'navigation',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'href', type: 'text' },
            { name: 'highlight', type: 'checkbox' },
            {
              name: 'children',
              type: 'array',
              fields: [
                { name: 'label', type: 'text' },
                { name: 'href', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        {
          name: 'columns',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            {
              name: 'links',
              type: 'array',
              fields: [
                { name: 'label', type: 'text' },
                { name: 'href', type: 'text' },
              ],
            },
          ],
        },
        { name: 'copyrightText', type: 'text' },
        { name: 'bottomNote', type: 'textarea' },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'text' },
        { name: 'address', type: 'text' },
        { name: 'wazeLink', type: 'text' },
        {
          name: 'hours',
          type: 'group',
          fields: [
            { name: 'weekdays', type: 'text' },
            { name: 'friday', type: 'text' },
            { name: 'notes', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'social',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'TikTok', value: 'tiktok' },
          ],
        },
        { name: 'url', type: 'text' },
        { name: 'label', type: 'text' },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'locale',
      type: 'group',
      fields: [
        { name: 'defaultLocale', type: 'text', defaultValue: 'he' },
        {
          name: 'defaultDir',
          type: 'select',
          options: [
            { label: 'RTL', value: 'rtl' },
            { label: 'LTR', value: 'ltr' },
          ],
          defaultValue: 'rtl',
        },
      ],
    },
  ],
};
