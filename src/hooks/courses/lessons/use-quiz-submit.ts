'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { submitQuizAnswers, getQuizProgress, retryQuizQuestion } from '@/api/courses/quizzes'
import type { Quiz } from '@/payload-types'

interface UseQuizSubmitProps {
  userId: string | undefined
  lessonId: number
  courseId: number
  quizData: Quiz
}

interface QuizSubmissionResult {
  success: boolean
  score: number
  correct: number
  total: number
  status: 'completed' | 'in_progress'
}

export function useQuizSubmit({
  userId,
  lessonId,
  courseId,
  quizData,
}: UseQuizSubmitProps) {
  const queryClient = useQueryClient()

  // Mutation pour soumettre les réponses
  const submitMutation = useMutation({
    mutationFn: async (answers: Record<string, string>) => {
      if (!userId) {
        throw new Error('User not authenticated')
      }

      return submitQuizAnswers({
        userId,
        lessonId,
        courseId,
        answers,
      })
    },
    onSuccess: () => {
      // Invalider le cache du statut de leçon
      queryClient.invalidateQueries({
        queryKey: ['progress', userId, lessonId],
      })
    },
  })

  // Mutation pour retry une question
  const retryMutation = useMutation({
    mutationFn: async (questionId: string) => {
      if (!userId) {
        throw new Error('User not authenticated')
      }

      return retryQuizQuestion({
        userId,
        lessonId,
        questionId,
      })
    },
    onSuccess: () => {
      // Invalider le cache
      queryClient.invalidateQueries({
        queryKey: ['progress', userId, lessonId],
      })
    },
  })

  // Query pour charger les réponses sauvegardées
  const { data: savedProgress, isLoading: isLoadingProgress } = useQuery({
    queryKey: ['quiz-progress', userId, lessonId],
    queryFn: async () => {
      if (!userId) {
        return null
      }

      return getQuizProgress({
        userId,
        lessonId,
      })
    },
    enabled: !!userId && !!lessonId,
  })

  const submitQuiz = async (answers: Map<string, string>): Promise<QuizSubmissionResult> => {
    // Convert Map to Record
    const answersRecord: Record<string, string> = {}
    answers.forEach((value, key) => {
      answersRecord[key] = value
    })

    const result = await submitMutation.mutateAsync(answersRecord)
    return result
  }

  const loadSavedAnswers = (): Map<string, string> | null => {
    if (!savedProgress?.answers) {
      return null
    }

    const answersMap = new Map<string, string>()
    Object.entries(savedProgress.answers).forEach(([key, value]) => {
      answersMap.set(key, value)
    })

    return answersMap
  }

  const retryQuestion = async (questionId: string) => {
    await retryMutation.mutateAsync(questionId)
  }

  return {
    submitQuiz,
    loadSavedAnswers,
    retryQuestion,

    isLoading: submitMutation.isPending || retryMutation.isPending || isLoadingProgress,
    error: submitMutation.error || retryMutation.error,

    hasSavedProgress: savedProgress?.hasProgress ?? false,
  }
}
