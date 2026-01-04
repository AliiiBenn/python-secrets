// collections/TutorialArticles.ts
import { CollectionConfig } from 'payload';

export const TutorialArticles: CollectionConfig = {
  slug: 'tutorial-articles',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'content', type: 'textarea', required: true }, // Sera RichText plus tard
    {
      name: 'duration',
      type: 'text',
      admin: { placeholder: '15:20' }
    }
  ],
};