'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function getRating(userId: string, lessonId: number) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'lesson-engagement',
    where: {
      and: [{ userId: { equals: userId } }, { lesson: { equals: lessonId } }],
    },
  })

  return result.docs[0]?.rating || null
}

export async function updateRating({
  userId,
  lessonId,
  rating,
}: {
  userId: string
  lessonId: number
  rating: number | null
}) {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'lesson-engagement',
    where: {
      and: [{ userId: { equals: userId } }, { lesson: { equals: lessonId } }],
    },
  })

  if (existing.docs.length > 0) {
    return await payload.update({
      collection: 'lesson-engagement',
      id: existing.docs[0].id,
      data: { rating },
    })
  } else {
    return await payload.create({
      collection: 'lesson-engagement',
      data: {
        userId,
        lesson: lessonId,
        rating,
        engagementType: null,
      },
    })
  }
}

export async function getEngagement(userId: string, lessonId: number) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'lesson-engagement',
    where: {
      and: [{ userId: { equals: userId } }, { lesson: { equals: lessonId } }],
    },
  })

  return result.docs[0]?.engagementType || null
}

export async function toggleEngagement({
  userId,
  lessonId,
  engagementType,
}: {
  userId: string
  lessonId: number
  engagementType: 'like' | 'dislike' | null
}) {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'lesson-engagement',
    where: {
      and: [{ userId: { equals: userId } }, { lesson: { equals: lessonId } }],
    },
  })

  if (existing.docs.length > 0) {
    return await payload.update({
      collection: 'lesson-engagement',
      id: existing.docs[0].id,
      data: { engagementType },
    })
  } else {
    return await payload.create({
      collection: 'lesson-engagement',
      data: {
        userId,
        lesson: lessonId,
        engagementType,
        rating: null,
      },
    })
  }
}
