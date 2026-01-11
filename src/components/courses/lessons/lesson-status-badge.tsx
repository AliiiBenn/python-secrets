'use client'

import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useLessonStatus } from '@/hooks/courses/lessons/use-lesson-status'
import { cn } from '@/lib/utils'

interface LessonStatusBadgeProps {
  userId: string
  lessonId: number
  courseId: number
}

export function LessonStatusBadge({ userId, lessonId, courseId }: LessonStatusBadgeProps) {
  const { displayStatus, isLoading } = useLessonStatus(userId, lessonId, courseId)

  const getStatusClass = () => {
    switch (displayStatus) {
      case 'In Progress': return 'bg-amber-500/10 text-amber-500 border border-amber-500'
      case 'Completed': return 'bg-green-500/10 text-green-500 border border-green-500'
      default: return 'bg-muted/10 text-muted-foreground border border-muted'
    }
  }

  if (isLoading) {
    return <Skeleton className="hidden sm:flex h-6 w-24 rounded-full" />
  }

  return (
    <Badge className={cn('hidden sm:flex', getStatusClass())}>
      {displayStatus}
    </Badge>
  )
}
