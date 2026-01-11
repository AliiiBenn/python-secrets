'use client'

import { getProgress } from '@/api/courses'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const useLessonStatus = (userId: string | undefined, lessonId: number, courseId: number) => {
  const queryClient = useQueryClient()

  const { data: progress, isLoading, refetch } = useQuery({
    queryKey: ['progress', userId, lessonId],
    queryFn: () => getProgress(userId!, lessonId),
    enabled: !!userId && !!lessonId,
  })

  // Logique métier : "In Progress" si solutionUnlocked OU status === 'in_progress'
  const displayStatus = !progress ? 'Not Started'
    : progress.solutionUnlocked || progress.status === 'in_progress' ? 'In Progress'
    : progress.status === 'completed' ? 'Completed'
    : 'Not Started'

  return {
    displayStatus,
    isLoading,
    refetch,
  }
}
