import { CollectionConfig } from 'payload'

export const LessonEngagement: CollectionConfig = {
  slug: 'lesson-engagement',
  admin: {
    useAsTitle: 'userId',
    group: 'Engagement',
  },
  indexes: [
    {
      fields: ['userId', 'lesson'],
      unique: true,
    },
  ],
  fields: [
    {
      name: 'userId',
      type: 'text',
      required: true,
      admin: {
        description: 'External user identifier from the authentication provider',
      },
    },
    {
      name: 'lesson',
      type: 'relationship',
      relationTo: 'lessons',
      required: true,
    },
    {
      name: 'engagementType',
      type: 'select',
      required: false,
      options: [
        { label: 'Like', value: 'like' },
        { label: 'Dislike', value: 'dislike' },
      ],
      admin: {
        description: 'Like or dislike (independent from rating)',
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: false,
      min: 1,
      max: 5,
      admin: {
        description: 'Rating from 1 to 5 (independent from engagement type)',
      },
    },
  ],
}
