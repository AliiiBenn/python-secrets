import { CollectionConfig } from 'payload'
import { difficultyField } from '@/fields/Difficulty'

export const ChallengesExercices: CollectionConfig = {
  slug: 'challenges-exercices',
  admin: { useAsTitle: 'title' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    difficultyField,
    {
      name: 'fileStructure',
      type: 'json',
      required: true,
    },
    {
      name: 'tests',
      type: 'json',
      required: true,
    },
  ],
}
