import { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: { useAsTitle: 'title' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General Info',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'slug', type: 'text', required: true, unique: true },
            { 
              name: 'code', 
              type: 'text', 
              admin: { description: 'Unique internal course code (e.g., PY-CORE-01)' } 
            },
            { name: 'description', type: 'textarea', required: true },
            {
              name: 'level',
              type: 'select',
              required: true,
              options: [
                { label: 'Beginner', value: 'BEGINNER' },
                { label: 'Intermediate', value: 'INTERMEDIATE' },
                { label: 'Advanced', value: 'ADVANCED' },
              ],
            },
          ],
        },
        {
          label: 'Curriculum (Chapters)',
          fields: [
            {
              name: 'modules',
              label: 'Chapters',
              type: 'array',
              admin: { 
                initCollapsed: true,
                description: 'Manage the structure of the course by adding chapters and assigning lessons'
              },
              fields: [
                {
                  name: 'moduleTitle',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'slug',
                  type: 'text',
                  required: true,
                  admin: { description: 'Slug for this chapter (e.g., introduction-to-syntax)' }
                },
                {
                  name: 'lessons',
                  type: 'relationship',
                  relationTo: 'lessons',
                  hasMany: true,
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Settings',
          fields: [
            { 
              name: 'duration', 
              type: 'text', 
              admin: { placeholder: 'e.g., 10h 45m' } 
            },
            { 
              name: 'status', 
              type: 'select', 
              defaultValue: 'available', 
              options: [
                { label: 'Available', value: 'available' },
                { label: 'Coming Soon', value: 'coming_soon' },
                { label: 'Archived', value: 'archived' },
              ] 
            },
          ],
        }
      ],
    },
  ],
}