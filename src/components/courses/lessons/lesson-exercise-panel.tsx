import { QuizExercise } from './quiz-exercise'
import { ChallengeIDE } from './challenge-ide'
import { EmptyIDE } from './empty-ide'

interface LessonExercisePanelProps {
  exercise?: {
    relationTo: 'quizzes' | 'challenges-exercices'
    value: any
  }
  userId?: string
  lessonId?: number
  courseId?: number
}

export function LessonExercisePanel({ exercise, userId, lessonId, courseId }: LessonExercisePanelProps) {
  switch (exercise?.relationTo) {
    case 'quizzes':
      return (
        <QuizExercise
          data={exercise.value}
          userId={userId}
          lessonId={lessonId}
          courseId={courseId}
        />
      )
    case 'challenges-exercices':
      return <ChallengeIDE data={exercise.value} />
    default:
      return <EmptyIDE />
  }
}
