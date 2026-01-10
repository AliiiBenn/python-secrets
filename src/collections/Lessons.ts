// collections/Lessons.ts
import { difficultyField } from '@/fields/Difficulty'

export const Lessons = {
  slug: 'lessons',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    difficultyField,
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'solution',
      type: 'richText',
    },
    {
      name: 'exercise',
      type: 'relationship',
      relationTo: ['quizzes', 'challenges-exercices'],
    },
  ],
}
