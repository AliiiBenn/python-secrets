'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

interface GetLessonParams {
  courseSlug: string
  chapterSlug: string
  lessonSlug: string
}

export async function getLesson({ courseSlug, chapterSlug, lessonSlug }: GetLessonParams) {
  const payload = await getPayload({ config })
  
  const courseQuery = await payload.find({
    collection: 'courses',
    where: {
      slug: { equals: courseSlug },
    },
    depth: 2,
  })

  const course = courseQuery.docs[0]
  if (!course) return null

  const modules = course.modules || []

  const chapter = modules.find((m) => m.slug === chapterSlug)
  if (!chapter) return null

  const lessonsInChapter = chapter.lessons || []
  const lesson = lessonsInChapter.find(
    (l: any) => typeof l === 'object' && l.slug === lessonSlug
  ) as any

  if (!lesson) return null

  const allLessonsInCourse = modules.flatMap((m) => 
    (m.lessons || []).map((l: any) => ({
      ...l,
      moduleSlug: m.slug 
    }))
  )

  const currentIndex = allLessonsInCourse.findIndex((l) => l.id === lesson.id)
  
  const prevLesson = currentIndex > 0 ? allLessonsInCourse[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessonsInCourse.length - 1 
    ? allLessonsInCourse[currentIndex + 1] 
    : null

  return {
    lesson,
    chapter: {
      title: chapter.moduleTitle,
      slug: chapter.slug
    },
    course: {
      id: course.id,
      title: course.title,
      slug: course.slug
    },
    navigation: {
      prev: prevLesson ? `/courses/${courseSlug}/${prevLesson.moduleSlug}/${prevLesson.slug}` : null,
      next: nextLesson ? `/courses/${courseSlug}/${nextLesson.moduleSlug}/${nextLesson.slug}` : null,
      currentIndex: currentIndex,
      totalLessons: allLessonsInCourse.length
    }
  }
}



export async function getProgress(userId: string, lessonId: number) {
  const payload = await getPayload({ config })
  
  const result = await payload.find({
    collection: 'user-progress',
    where: {
      and: [
        { userId: { equals: userId } },
        { lesson: { equals: lessonId } }
      ]
    }
  })

  return result.docs[0] || { status: 'not_started', solutionUnlocked: false }
}

export async function updateProgress({
  userId,
  lessonId,
  courseId,
  updates
}: {
  userId: string
  lessonId: number
  courseId: number
  updates: { solutionUnlocked?: boolean; status?: 'completed' | 'in_progress' }
}) {
  const payload = await getPayload({ config })

    console.log(userId)
  
  const existing = await payload.find({
    collection: 'user-progress',
    where: {
      and: [{ userId: { equals: userId } }, { lesson: { equals: lessonId } }]
    }
  })

  if (existing.docs.length > 0) {
    return await payload.update({
      collection: 'user-progress',
      id: existing.docs[0].id,
      data: updates,
    })
  } else {
    return await payload.create({
      collection: 'user-progress',
      data: {
        userId,
        lesson: lessonId,
        course: courseId,
        ...updates
      }
    })
  }
}