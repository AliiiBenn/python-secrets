import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'difficulty', 'slug'],
  },
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Course Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Used for the URL of the course',
      },
    },
    {
      name: 'difficulty',
      type: 'select',
      required: true,
      defaultValue: 'beginner',
      options: [
        {
          label: 'Beginner',
          value: 'beginner',
        },
        {
          label: 'Intermediate',
          value: 'intermediate',
        },
        {
          label: 'Advanced',
          value: 'advanced',
        },
      ],
      label: 'Difficulty Level',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
  ],
}