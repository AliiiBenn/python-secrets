'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import type { Quiz } from '@/payload-types'

interface SubmitQuizAnswersParams {
  userId: string
  lessonId: number
  courseId: number
  answers: Record<string, string>  // questionId -> answerId
}

interface QuizResult {
  success: boolean
  score: number  // 0-100
  correct: number
  total: number
  status: 'completed' | 'in_progress'
}

export async function submitQuizAnswers({
  userId,
  lessonId,
  courseId,
  answers,
}: SubmitQuizAnswersParams): Promise<QuizResult> {
  const payload = await getPayload({ config })

  // 1. Récupérer la leçon avec le quiz peuplé
  const lessonQuery = await payload.find({
    collection: 'lessons',
    where: {
      id: { equals: lessonId },
    },
    depth: 2,  // Pour peupler exercise
  })

  const lesson = lessonQuery.docs[0]
  if (!lesson || !lesson.exercise) {
    throw new Error('Lesson or exercise not found')
  }

  // Vérifier que c'est bien un quiz
  if (lesson.exercise.relationTo !== 'quizzes') {
    throw new Error('Exercise is not a quiz')
  }

  const quiz = lesson.exercise.value as Quiz
  if (!quiz || typeof quiz === 'number') {
    throw new Error('Quiz data not found')
  }

  const questions = quiz.questions || []
  if (questions.length === 0) {
    return {
      success: false,
      score: 0,
      correct: 0,
      total: 0,
      status: 'in_progress',
    }
  }

  // 2. Calculer le score
  let correct = 0

  questions.forEach((question) => {
    const qId = question.id || `q-${questions.indexOf(question)}`
    const selectedAnswerId = answers[qId]
    const selectedAnswer = question.answers?.find(a => a.id === selectedAnswerId)

    if (selectedAnswer?.isCorrect === true) {
      correct++
    }
  })

  const score = Math.round((correct / questions.length) * 100)
  const status = score === 100 ? 'completed' : 'in_progress'

  // 3. Mettre à jour UserProgress
  const existing = await payload.find({
    collection: 'user-progress',
    where: {
      and: [
        { userId: { equals: userId } },
        { lesson: { equals: lessonId } },
      ],
    },
  })

  const progressData = {
    quizAnswers: answers,
    status,
    lastViewedAt: new Date(),
  }

  if (existing.docs.length > 0) {
    await payload.update({
      collection: 'user-progress',
      id: existing.docs[0].id,
      data: progressData,
    })
  } else {
    await payload.create({
      collection: 'user-progress',
      data: {
        userId,
        lesson: lessonId,
        course: courseId,
        ...progressData,
      },
    })
  }

  return {
    success: true,
    score,
    correct,
    total: questions.length,
    status,
  }
}

interface GetQuizProgressParams {
  userId: string
  lessonId: number
}

interface QuizProgress {
  answers: Record<string, string> | null
  hasProgress: boolean
}

export async function getQuizProgress({
  userId,
  lessonId,
}: GetQuizProgressParams): Promise<QuizProgress> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'user-progress',
    where: {
      and: [
        { userId: { equals: userId } },
        { lesson: { equals: lessonId } },
      ],
    },
  })

  const progress = result.docs[0]

  if (!progress || !progress.quizAnswers) {
    return {
      answers: null,
      hasProgress: false,
    }
  }

  return {
    answers: progress.quizAnswers as Record<string, string>,
    hasProgress: true,
  }
}

interface RetryQuizQuestionParams {
  userId: string
  lessonId: number
  questionId: string
}

export async function retryQuizQuestion({
  userId,
  lessonId,
  questionId,
}: RetryQuizQuestionParams): Promise<void> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'user-progress',
    where: {
      and: [
        { userId: { equals: userId } },
        { lesson: { equals: lessonId } },
      ],
    },
  })

  const progress = result.docs[0]
  if (!progress || !progress.quizAnswers) {
    return
  }

  const answers = progress.quizAnswers as Record<string, string>
  delete answers[questionId]

  await payload.update({
    collection: 'user-progress',
    id: progress.id,
    data: {
      quizAnswers: answers,
      lastViewedAt: new Date(),
    },
  })
}
