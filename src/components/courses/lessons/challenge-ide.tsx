import { IDE } from '@/core/ide/components'

interface ChallengeIDEProps {
  data: any
}

export function ChallengeIDE({ data }: ChallengeIDEProps) {
  return (
    <div className="h-full">
      <IDE />
    </div>
  )
}
