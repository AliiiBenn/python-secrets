// components/courses/lessons/rating-dialog.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useLessonRating } from '@/hooks/courses/lessons/use-lesson-rating'
import { cn } from '@/lib/utils'

interface RatingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId: string
  lessonId: number
}

export function RatingDialog({ open, onOpenChange, userId, lessonId }: RatingDialogProps) {
  const { rating, isLoading, setRating, isUpdating } = useLessonRating(userId, lessonId)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)

  const handleRatingClick = (value: number) => {
    setSelectedRating(value)
  }

  const handleConfirm = async () => {
    if (selectedRating !== null) {
      await setRating(selectedRating)
      onOpenChange(false)
      setSelectedRating(null)
    }
  }

  const handleCancel = () => {
    setSelectedRating(null)
    onOpenChange(false)
  }

  const displayRating = selectedRating ?? rating

  return (
    <Dialog open={open} onOpenChange={isUpdating ? undefined : onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Rate this lesson</DialogTitle>
          <DialogDescription className="text-center pt-2">
            How would you rate this lesson?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center py-6">
          <ButtonGroup orientation="horizontal">
            {[1, 2, 3, 4, 5].map((value) => (
              <Button
                key={value}
                variant={displayRating === value ? 'default' : 'outline'}
                onClick={() => handleRatingClick(value)}
                disabled={isLoading || isUpdating}
                className="w-12 h-12"
              >
                {value}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        <DialogFooter className="flex sm:justify-center gap-2 pt-4">
          <Button
            variant="ghost"
            onClick={handleCancel}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleConfirm}
            disabled={selectedRating === null || isUpdating}
            className="gap-2 min-w-[100px]"
          >
            {isUpdating ? 'Saving...' : 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
