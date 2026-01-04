import { AppHeader } from '@/components/headers/app-header'
import { TrackHeader } from '@/components/courses/track-header'
import { TerminalDecoration } from '@/components/courses/terminal-decoration'
import { TrackFooter } from '@/components/courses/track-footer'
import Link from 'next/link'

// Imports Payload
import { getPayload } from 'payload'
import config from '@payload-config'
import { FlaskConical, AlertTriangle } from 'lucide-react'

export default async function TutorialsPage() {
  // 1. Initialisation de Payload
  const payload = await getPayload({ config })

  // 2. Récupération des tutoriels
  const { docs: tutorials } = await payload.find({
    collection: 'tutorials',
    sort: '-createdAt',
  })

  // Pour le moment, on simule le compte "completed" à 0 tant que le système d'auth n'est pas lié
  const completedCount = 0 
  const progressPercent = tutorials.length > 0 ? Math.round((completedCount / tutorials.length) * 100) : 0

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />

      <main className="w-full max-w-5xl mx-auto border-zinc-200 dark:border-zinc-800 sm:border-x flex-1 flex flex-col uppercase tracking-tighter">
        <TrackHeader
          title="Technical Labs"
          version="v2.0"
          description="Focused, high-impact technical tutorials. Master specific features and implementation patterns with step-by-step documentation."
          progressPercent={progressPercent}
          stats={{
            courses: tutorials.length,
            completed: completedCount,
            duration: 'VARIOUS',
            difficulty: 'PRACTICAL',
          }}
        />

        <TerminalDecoration path="./tutorials/labs" />

        <div className="flex flex-col flex-1">
          {tutorials.length > 0 ? (
            tutorials.map((tutorial) => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))
          ) : (
            <EmptyLabsState />
          )}
        </div>

        <TrackFooter progress={progressPercent} />
      </main>
    </div>
  )
}

/**
 * Composant d'état vide pour les Labs
 */
function EmptyLabsState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-12 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10">
      <FlaskConical size={48} className="text-zinc-300 dark:text-zinc-700 mb-4 animate-pulse" />
      <div className="text-center space-y-2">
        <h3 className="text-xl font-black italic">404_LAB_NOT_FOUND</h3>
        <p className="text-xs text-zinc-500 normal-case max-w-xs mx-auto leading-relaxed">
          The experiment queue is empty. No technical labs have been initialized in the current sequence.
        </p>
      </div>
      <div className="mt-8 flex items-center gap-2 text-[10px] text-amber-600 dark:text-amber-500 font-bold">
        <AlertTriangle size={12} /> SYSTEM_STATUS: IDLE_WAITING_FOR_DATA
      </div>
    </div>
  )
}

/**
 * Carte Tutoriel adaptée
 */
function TutorialCard({ tutorial }: { tutorial: any }) {
  const isComingSoon = tutorial.status === 'coming_soon'

  return (
    <Link
      href={isComingSoon ? '#' : `/tutorials/${tutorial.slug}`}
      className={`grid grid-cols-12 gap-4 sm:gap-8 py-10 sm:py-14 px-4 sm:px-8 border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 transition-colors group relative overflow-hidden ${
        isComingSoon ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      {/* Badge statut si disponible (on pourrait imaginer un champ isSolved en DB plus tard) */}
      {tutorial.status === "completed" && (
        <div className="absolute top-0 right-0 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black px-4 py-1 text-[10px] font-black tracking-[0.2em]">
          SOLVED
        </div>
      )}

      <div className="col-span-12 md:col-span-2 flex md:flex-col items-center md:items-start justify-between md:justify-start gap-3">
        <span className="text-zinc-400 font-bold text-xs tracking-widest group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
          [{tutorial.code || 'LAB-XX'}]
        </span>
        <span className={`text-[9px] border px-2 py-0.5 font-bold uppercase ${
          tutorial.difficulty === 'BEGINNER' ? 'text-emerald-500 border-emerald-500/30' : 
          tutorial.difficulty === 'INTERMEDIATE' ? 'text-amber-500 border-amber-500/30' : 
          'text-rose-500 border-rose-500/30'
        }`}>
          {tutorial.difficulty}
        </span>
      </div>

      <div className="col-span-12 md:col-span-7 flex flex-col gap-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:underline underline-offset-[12px] decoration-1">
          {tutorial.title}
        </h2>
        <p className="text-sm text-zinc-500 leading-relaxed normal-case font-medium max-w-lg">
          {tutorial.description}
        </p>
      </div>

      <div className="col-span-12 md:col-span-3 flex flex-row md:flex-col items-center md:items-end justify-between pt-4 md:pt-0 border-t md:border-t-0 border-zinc-100 dark:border-zinc-900">
        <div className="md:text-right">
          <span className="block text-[10px] text-zinc-400 font-bold">EST_TIME</span>
          <span className="text-base font-bold tabular-nums">{tutorial.duration || 'N/A'}</span>
        </div>

        <div className="mt-0 md:mt-6">
          <TutorialButton status={tutorial.status} />
        </div>
      </div>
    </Link>
  );
}

function TutorialButton({ status }: { status: string }) {
  if (status === "coming_soon") {
    return (
      <span className="text-[10px] text-zinc-400 border border-dashed border-zinc-300 dark:border-zinc-700 px-4 py-2 opacity-50">
        PENDING_RELEASE
      </span>
    );
  }

  return (
    <div className={`border px-6 py-2 bg-transparent text-[10px] font-bold tracking-widest ${
        status === "completed" 
        ? "border-zinc-900 dark:border-white bg-zinc-900 text-white dark:bg-white dark:text-black" 
        : "border-black dark:border-white group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all"
    }`}>
      {status === "completed" ? "REPLAY_LAB" : "EXEC_TUTORIAL"}
    </div>
  );
}