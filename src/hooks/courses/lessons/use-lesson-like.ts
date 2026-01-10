// hooks/courses/lessons/use-lesson-like.ts
'use client'

import { getEngagement, toggleEngagement } from '@/api/courses/engagement'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useLessonLike = (userId: string, lessonId: number) => {
  const queryClient = useQueryClient()
  const queryKey = ['engagement', userId, lessonId]

  const { data: engagementType, isLoading } = useQuery({
    queryKey,
    queryFn: () => getEngagement(userId, lessonId),
    enabled: !!userId && !!lessonId,
  })

  const mutation = useMutation({
    mutationFn: (newType: 'like' | 'dislike' | null) =>
      toggleEngagement({
        userId,
        lessonId,
        engagementType: newType,
      }),
    onMutate: async (newType) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey })

      // Snapshot previous value
      const previousValue = queryClient.getQueryData(queryKey)

      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, newType)

      // Return context with previous value for rollback
      return { previousValue }
    },
    onError: (err, newType, context) => {
      // Rollback to previous value on error
      queryClient.setQueryData(queryKey, context?.previousValue)
    },
    onSettled: () => {
      // Refetch to ensure server consistency
      queryClient.invalidateQueries({ queryKey })
    },
  })

  const toggleLike = () => {
    const newType = engagementType === 'like' ? null : 'like'
    mutation.mutate(newType)
  }

  const toggleDislike = () => {
    const newType = engagementType === 'dislike' ? null : 'dislike'
    mutation.mutate(newType)
  }

  return {
    engagementType, // 'like' | 'dislike' | null
    isLoading,
    isMutating: mutation.isPending,
    isLiked: engagementType === 'like',
    isDisliked: engagementType === 'dislike',
    toggleLike,
    toggleDislike,
  }
}
