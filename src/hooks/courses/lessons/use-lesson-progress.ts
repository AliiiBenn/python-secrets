// hooks/courses/lessons/use-lesson-progress.ts
'use client'

import { getProgress, updateProgress } from '@/api/courses'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useLessonProgress = (userId: string, lessonId: number, courseId: number) => {
  const queryClient = useQueryClient()
  const queryKey = ['progress', userId, lessonId]

  const { data: progress, isLoading } = useQuery({
    queryKey,
    queryFn: () => getProgress(userId, lessonId),
    enabled: !!userId && !!lessonId,
  })

  const mutation = useMutation({
    mutationFn: (updates: { solutionUnlocked?: boolean; status?: 'completed' | 'in_progress' }) =>
      updateProgress({
        userId,
        lessonId,
        courseId,
        updates,
      }),
    onSuccess: (newData) => {
      // Mise à jour optimiste ou simple invalidation
      queryClient.setQueryData(queryKey, newData)
      // On invalide quand même pour être sûr d'être synchro avec le serveur
      queryClient.invalidateQueries({ queryKey })
    },
  })

  return {
    progress,
    isLoading,
    // La solution est débloquée si le flag est vrai OU si la leçon est terminée
    isUnlocked: progress?.solutionUnlocked || progress?.status === 'completed',
    // On expose la fonction mutateAsync pour pouvoir utiliser "await" dans le composant
    unlockSolution: () => mutation.mutateAsync({ solutionUnlocked: true }),
    markAsCompleted: () => mutation.mutateAsync({ status: 'completed' }),
    isUpdating: mutation.isPending,
  }
}