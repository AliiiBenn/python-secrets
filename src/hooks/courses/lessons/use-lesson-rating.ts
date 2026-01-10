// hooks/courses/lessons/use-lesson-rating.ts
'use client'

import { getRating, updateRating } from '@/api/courses/engagement'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useLessonRating = (userId: string, lessonId: number) => {
  const queryClient = useQueryClient()
  const queryKey = ['rating', userId, lessonId]

  const { data: rating, isLoading } = useQuery({
    queryKey,
    queryFn: () => getRating(userId, lessonId),
    enabled: !!userId && !!lessonId,
  })

  const mutation = useMutation({
    mutationFn: (newRating: number | null) =>
      updateRating({
        userId,
        lessonId,
        rating: newRating,
      }),
    onSuccess: (newData) => {
      // Mise à jour optimiste du cache
      queryClient.setQueryData(queryKey, newData.rating)
      // Invalidation pour s'assurer d'être synchro avec le serveur
      queryClient.invalidateQueries({ queryKey })
    },
  })

  return {
    rating: rating || null,
    isLoading,
    setRating: (newRating: number) => mutation.mutateAsync(newRating),
    removeRating: () => mutation.mutateAsync(null),
    isUpdating: mutation.isPending,
  }
}
