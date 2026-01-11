import { postgresAdapter } from '@payloadcms/db-postgres'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import {
  Admins,
  Media,
  Courses,
  Articles,
  Blog,
  Tutorials,
  TutorialArticles,
  Lessons,
  UserProgress,
  Quizzes,
  ChallengesExercices,
  LessonEngagement,
} from '@/collections'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Admins,
    Media,
    Courses,
    Articles,
    Blog,
    Tutorials,
    TutorialArticles,
    Lessons,
    UserProgress,
    Quizzes,
    ChallengesExercices,
    LessonEngagement,
  ],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({
        blocks: [
          {
            slug: 'Code',
            fields: [
              {
                name: 'language',
                type: 'select',
                options: [
                  { label: 'TypeScript', value: 'ts' },
                  { label: 'TSX', value: 'tsx' },
                  { label: 'JavaScript', value: 'js' },
                  { label: 'JSX', value: 'jsx' },
                  { label: 'JSON', value: 'json' },
                  { label: 'HTML', value: 'html' },
                  { label: 'CSS', value: 'css' },
                  { label: 'Bash', value: 'bash' },
                  { label: 'Plain Text', value: 'plaintext' },
                ],
                defaultValue: 'ts',
              },
              {
                name: 'code',
                type: 'code',
              },
            ],
          },
        ],
        inlineBlocks: [],
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    schemaName: 'payload',
  }),
  sharp,
  plugins: [],
})
