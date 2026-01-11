// components/courses/lessons/lesson-rating-buttons.tsx
'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLessonLike } from '@/hooks/courses/lessons/use-lesson-like'
import { RatingDialog } from '@/components/courses/lessons/rating-dialog'
import { cn } from '@/lib/utils'

interface LessonRatingButtonsProps {
  userId: string
  lessonId: number
}

export function LessonRatingButtons({ userId, lessonId }: LessonRatingButtonsProps) {
  const { isLiked, isDisliked, toggleLike, toggleDislike, isLoading, isMutating } =
    useLessonLike(userId, lessonId)

  const [showRatingDialog, setShowRatingDialog] = useState(false)

  const isDisabled = isLoading || isMutating || !userId

  return (
    <>
      <div className="flex gap-1 w-full justify-between">
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'h-8 gap-2 text-xs',
              isLiked && 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
            )}
            onClick={() => toggleLike()}
            disabled={isDisabled}
          >
            <ThumbsUp className="h-4 w-4" />
            <span className="hidden sm:inline">Like</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'h-8 gap-2 text-xs',
              isDisliked && 'bg-destructive/10 text-destructive hover:bg-destructive/20'
            )}
            onClick={() => toggleDislike()}
            disabled={isDisabled}
          >
            <ThumbsDown className="h-4 w-4" />
            <span className="hidden sm:inline">Dislike</span>
          </Button>
        </div>

        <Button
          variant="link"
          size="sm"
          className="h-8 gap-2 text-xs"
          onClick={() => setShowRatingDialog(true)}
          disabled={isDisabled}
        >
          <span className="hidden sm:inline">Rate this lesson</span>
        </Button>
      </div>

      <RatingDialog
        open={showRatingDialog}
        onOpenChange={setShowRatingDialog}
        userId={userId}
        lessonId={lessonId}
      />
    </>
  )
}
