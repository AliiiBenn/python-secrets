'use client'

import { getProgress, updateProgress } from '@/api/courses'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useLessonProgress = (userId: string, lessonId: number, courseId: number) => {
  const queryClient = useQueryClient()

  const queryKey = ['progress', userId, lessonId]

  const { data: progress, isLoading } = useQuery({
    queryKey,
    queryFn: () => getProgress(userId, lessonId),
    enabled: !!userId && !!lessonId, // Ne s'exécute que si les IDs sont présents
  })

  const mutation = useMutation({
    mutationFn: (updates: { solutionUnlocked?: boolean; status?: 'completed' | 'in_progress' }) =>
      updateProgress({
        userId,
        lessonId,
        courseId,
        updates,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  return {
    progress,
    isLoading,
    isUnlocked: progress?.solutionUnlocked || progress?.status === 'completed',

    unlockSolution: () => mutation.mutate({ solutionUnlocked: true }),
    markAsCompleted: () => mutation.mutate({ status: 'completed' }),

    isUpdating: mutation.isPending,
  }
}
