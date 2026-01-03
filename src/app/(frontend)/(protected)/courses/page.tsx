import { AppHeader } from '@/components/headers/app-header'
import { TrackHeader } from '@/components/courses/track-header'
import { CourseCard } from '@/components/courses/course-card'
import { TerminalDecoration } from '@/components/courses/terminal-decoration'
import { TrackFooter } from '@/components/courses/track-footer'

export const PYTHON_COURSES = [
  {
    id: 'python-312-fundamentals',
    code: 'PY-CORE',
    title: 'Python 3.12 Fundamentals',
    description:
      'Deep dive into structural pattern matching, static typing with MyPy, and advanced memory management techniques.',
    level: 'BEGINNER',
    duration: '10H 45M',
    status: 'completed',
  },
  {
    id: 'fastapi-high-performance',
    code: 'PY-FAST',
    title: 'High Performance FastAPI',
    description:
      'Architecting production-ready asynchronous APIs using Pydantic v2 and complex dependency injection patterns.',
    level: 'INTERMEDIATE',
    duration: '08H 20M',
    status: 'available',
  },
  {
    id: 'data-eng-polars',
    code: 'PY-DATA',
    title: 'Data Engineering with Polars',
    description:
      'Transitioning from Pandas to Polars for multi-threaded data processing and Lazy API query optimization.',
    level: 'ADVANCED',
    duration: '12H 00M',
    status: 'completed',
  },
  {
    id: 'llm-langchain-python',
    code: 'PY-AI',
    title: 'LLM Orchestration with LangChain',
    description:
      'Designing autonomous agents and RAG (Retrieval-Augmented Generation) pipelines within the Python ecosystem.',
    level: 'INTERMEDIATE',
    duration: '06H 15M',
    status: 'coming_soon',
  },
]

export default function Page() {
  const completedCount = PYTHON_COURSES.filter((c) => c.status === 'completed').length
  const progressPercent = Math.round((completedCount / PYTHON_COURSES.length) * 100)

  return (
    <div className="flex flex-col ">
      <AppHeader />

      <main className="w-full max-w-5xl mx-auto border-zinc-200 dark:border-zinc-800 sm:border-x flex-1 flex flex-col uppercase tracking-tighter">
        <TrackHeader
          title="Python Mastery"
          version="v3.12"
          description="The complete curriculum to master the modern Python ecosystem. From core syntax to asynchronous architectures and AI model orchestration."
          progressPercent={progressPercent}
          stats={{
            courses: PYTHON_COURSES.length,
            completed: completedCount,
            duration: '37H',
            difficulty: 'MLTI',
          }}
        />

        <TerminalDecoration path="./courses/python" />

        <div className="flex flex-col flex-1">
          {PYTHON_COURSES.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <TrackFooter progress={progressPercent} />
      </main>
    </div>
  )
}
