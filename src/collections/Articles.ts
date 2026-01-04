import { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'code', 'category', 'revision'],
    group: 'Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'code',
      type: 'text',
      required: true,
      admin: {
        description: 'Ex: ART-01',
        placeholder: 'ART-01',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Architecture', value: 'ARCHITECTURE' },
        { label: 'Infrastructure', value: 'INFRA' },
        { label: 'Systems', value: 'SYSTEMS' },
        { label: 'TypeScript', value: 'TYPESCRIPT' },
        { label: 'DevOps', value: 'DEVOPS' },
      ],
    },
    {
      name: 'revision',
      type: 'text',
      defaultValue: 'REV_1.0',
      admin: {
        description: 'Version du document',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea', // Sera remplacé par Rich Text plus tard
      required: true,
    },
    {
      name: 'hash',
      type: 'text',
      admin: {
        description: 'Empreinte numérique (ex: 0xbf2d9e1a)',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
    },
  ],
}
