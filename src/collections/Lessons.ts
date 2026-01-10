// collections/Lessons.ts
export const Lessons = {
  slug: 'lessons',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'duration', type: 'text', admin: { placeholder: '12:45' } },
    { name: 'videoUrl', type: 'text' }, // Lien Vimeo/YouTube/Mux
    { name: 'content', type: 'textarea' }, // RichText plus tard
    { name: 'isPreview', type: 'checkbox', label: 'Accès gratuit sans connexion', defaultValue: false },
    {
      name: 'exercise',
      type: 'relationship',
      relationTo: ['quizzes', 'challenges-exercices'],
      admin: {
        description: 'Optional exercise associated with this lesson (quiz or challenge)',
      },
    },
  ],
}