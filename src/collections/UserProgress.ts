import { CollectionConfig } from 'payload'

export const UserProgress: CollectionConfig = {
  slug: 'user-progress',
  admin: {
    useAsTitle: 'userId',
    group: 'Learning State',
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
        description: 'External user identifier from the authentication provider' 
      },
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
    },
    {
      name: 'lesson',
      type: 'relationship',
      relationTo: 'lessons',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'not_started',
      options: [
        { label: 'Not Started', value: 'not_started' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Completed', value: 'completed' },
      ],
    },
    {
      name: 'solutionUnlocked',
      type: 'checkbox',
      defaultValue: false,
      admin: { 
        description: 'Check if the user has manually unlocked the solution' 
      }
    },
    {
      name: 'codeSnapshot',
      type: 'json',
      admin: { 
        description: 'Stores the current state of the IDE (files, code) for the user' 
      }
    },
    {
      name: 'quizAnswers',
      type: 'json',
      admin: { 
        description: 'Stores the user selected answers for quiz-type lessons' 
      }
    },
    {
      name: 'lastViewedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
  ],
}