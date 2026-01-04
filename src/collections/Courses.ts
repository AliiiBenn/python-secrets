// collections/Courses.ts
export const Courses = {
  slug: 'courses',
  admin: { useAsTitle: 'title' },
  fields: [
    // --- Identité visuelle (pour CourseCard) ---
    { name: 'title', type: 'text', required: true },
    { name: 'code', type: 'text', required: true, admin: { description: 'Ex: PY-CORE' } },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'version', type: 'text', defaultValue: 'v1.0' },
    
    // --- Métadonnées (pour TrackHeader) ---
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
    { name: 'duration', type: 'text', admin: { description: 'Ex: 10H 45M' } },
    { name: 'description', type: 'textarea', required: true },
    { name: 'author', type: 'text', defaultValue: 'CORE_ARCHITECT' },

    // --- Structure des Modules (L'arborescence) ---
    {
      name: 'modules',
      type: 'array',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'moduleTitle',
          type: 'text',
          required: true,
          admin: { placeholder: '01_CORE_SYNTAX' }
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

    // --- Status & Access ---
    {
      name: 'status',
      type: 'select',
      defaultValue: 'available',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Coming Soon', value: 'coming_soon' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'techStack',
      type: 'array',
      fields: [{ name: 'tech', type: 'text' }],
    }
  ],
}