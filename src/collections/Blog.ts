import { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'code', 'category', 'signalStatus'],
    group: 'Content'
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
        description: 'Ex: LOG_982',
        placeholder: 'LOG_982',
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
        { label: 'Editorial', value: 'EDITORIAL' },
        { label: 'Reflections', value: 'REFLECTIONS' },
        { label: 'Opinion', value: 'OPINION' },
        { label: 'Post Mortem', value: 'POST_MORTEM' },
      ],
    },
    {
      name: 'signalStatus',
      type: 'select',
      defaultValue: 'STABLE',
      options: [
        { label: 'Signal Stable', value: 'STABLE' },
        { label: 'Encrypted Signal', value: 'ENCRYPTED' },
        { label: 'Intercepted', value: 'INTERCEPTED' },
        { label: 'Corrupted', value: 'CORRUPTED' },
      ],
    },
    {
      name: 'locationNode',
      type: 'text',
      defaultValue: 'Brussels_Central',
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Feature this transmission on top',
      defaultValue: false,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Résumé court pour la liste du blog',
      },
    },
    {
      name: 'summaryBold',
      type: 'text',
      admin: {
        description: "La citation en gras au milieu de l'article",
      },
    },
    {
      name: 'content',
      type: 'textarea', // Sera remplacé par Rich Text plus tard
      required: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
    },
  ],
}
