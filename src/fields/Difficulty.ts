import type { Field } from 'payload'

export const difficultyField: Field = {
  name: 'difficulty',
  type: 'select',
  required: true,
  options: [
    { label: 'Beginner', value: 'BEGINNER' },
    { label: 'Intermediate', value: 'INTERMEDIATE' },
    { label: 'Advanced', value: 'ADVANCED' },
  ],
}
