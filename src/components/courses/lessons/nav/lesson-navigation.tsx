'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { FileText, Lightbulb, History, Lock, Unlock, AlertTriangle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { useLessonProgress } from '@/hooks/courses/lessons/use-lesson-progress'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface LessonSidebarHeaderProps {
  userId: string
  lessonId: number
  courseId: number
}

export function LessonSidebarHeader({ userId, lessonId, courseId }: LessonSidebarHeaderProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeTab = searchParams.get('tab') || 'description'
  const [showUnlockDialog, setShowUnlockDialog] = useState(false)

  const { isUnlocked, isLoading, unlockSolution, isUpdating } = useLessonProgress(userId, lessonId, courseId)

  const getTabClass = (tabName: string) => cn(
    "flex-1 gap-2 rounded-none border-0 border-b h-12 transition-all",
    activeTab === tabName 
      ? "bg-background border-b-2 border-b-primary font-bold" 
      : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
  )

  // Intercepte le clic sur l'onglet Solution
  const handleSolutionClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isUnlocked) {
      e.preventDefault() // Empêche la navigation immédiate
      setShowUnlockDialog(true)
    }
  }

  const handleConfirmUnlock = async () => {
    await unlockSolution()
    setShowUnlockDialog(false)
    // Une fois débloqué, on navigue vers l'onglet solution
    router.push('?tab=solution')
  }

  return (
    <>
      <header className="shrink-0">
        <ButtonGroup className="w-full">
          <Button variant="outline" className={cn(getTabClass('description'), "border-r")} asChild>
            <Link href="?tab=description">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Description</span>
            </Link>
          </Button>

          <Button
            variant="outline"
            className={cn(getTabClass('solution'), "border-x")}
            asChild
          >
            <Link href="?tab=solution" onClick={handleSolutionClick}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isUnlocked ? (
                <Lightbulb className="h-4 w-4 text-amber-500" />
              ) : (
                <Lock className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="hidden sm:inline">Solution</span>
            </Link>
          </Button>

          <Button variant="outline" className={getTabClass('submissions')} asChild>
            <Link href="?tab=submissions">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">Submissions</span>
            </Link>
          </Button>
        </ButtonGroup>
      </header>

      {/* Dialog de déblocage */}
      <Dialog open={showUnlockDialog} onOpenChange={setShowUnlockDialog}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <DialogTitle className="text-center text-xl">Unlock Solution?</DialogTitle>
            <DialogDescription className="text-center pt-2">
              Are you sure you want to see the solution? 
              <br />
              <span className="font-semibold text-foreground">Trying to solve it yourself is the best way to learn!</span>
              <br /><br />
              Unlocking will reveal the full code and marks this exercise as assisted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex sm:justify-center gap-2 pt-4">
            <Button variant="ghost" onClick={() => setShowUnlockDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              onClick={handleConfirmUnlock}
              disabled={isUpdating}
              className="gap-2"
            >
              {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Unlock className="h-4 w-4" />}
              Yes, reveal solution
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}