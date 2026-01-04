// collections/Tutorials.ts
import { CollectionConfig } from 'payload';

export const Tutorials: CollectionConfig = {
  slug: 'tutorials',
  admin: { useAsTitle: 'title' },
  fields: [
    // --- Metadata (Identique aux formations) ---
    { name: 'title', type: 'text', required: true },
    { name: 'code', type: 'text', required: true }, // ex: LAB-01
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'difficulty',
      type: 'select',
      options: [
        { label: 'Beginner', value: 'BEGINNER' },
        { label: 'Intermediate', value: 'INTERMEDIATE' },
        { label: 'Advanced', value: 'ADVANCED' },
      ],
    },
    { name: 'duration', type: 'text' }, // Durée totale (ex: 03H 45M)
    { name: 'description', type: 'textarea' },

    // --- La Structure en Chapitres ---
    {
      name: 'chapters',
      type: 'array',
      admin: {
        description: 'Organisez le tutoriel par sections logiques',
      },
      fields: [
        {
          name: 'chapterTitle',
          type: 'text',
          required: true,
          admin: { placeholder: 'ex: 01_INTRODUCTION' }
        },
        {
          name: 'articles',
          type: 'relationship',
          relationTo: 'tutorial-articles',
          hasMany: true,
          required: true,
          admin: {
            description: 'Sélectionnez les articles/leçons pour ce chapitre',
          }
        },
      ],
    },

    // --- Métadonnées Système (Design) ---
    { name: 'checksum', type: 'text' },
    { 
      name: 'status', 
      type: 'select', 
      defaultValue: 'available',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Coming Soon', value: 'coming_soon' },
      ]
    },
  ],
};