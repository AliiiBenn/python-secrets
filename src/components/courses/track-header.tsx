interface TrackHeaderProps {
  title: string;
  version: string;
  description: string;
  progressPercent: number;
  stats: {
    courses: number;
    completed: number;
    duration: string;
    difficulty: string;
  };
}

export function TrackHeader({ title, version, description, progressPercent, stats }: TrackHeaderProps) {
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
      {/* Breadcrumbs */}
      <div className="px-4 sm:px-6 py-3 border-b border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-400 flex flex-wrap items-center gap-2">
        <span>ROOT</span><span>/</span><span>COURSES</span><span>/</span>
        <span className="text-zinc-900 dark:text-zinc-100 font-bold tracking-normal underline decoration-1 underline-offset-2 uppercase">
          {title.replace(/\s+/g, '_')}_TRACK
        </span>
      </div>

      <div className="p-4 sm:p-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div className="space-y-6 w-full lg:w-2/3">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tighter italic leading-none">
              {title} <span className="text-zinc-400 font-light px-2 border border-zinc-200 dark:border-zinc-800 not-italic ml-1 sm:ml-2 text-xs sm:text-base uppercase align-middle">{version}</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-2xl normal-case leading-relaxed font-medium">
              {description}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end text-[10px] mb-1">
              <span className="text-zinc-400">TRACK_PROGRESSION</span>
              <span className="text-zinc-900 dark:text-zinc-100 font-bold">{progressPercent}%</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-none overflow-hidden flex">
              <div 
                className="h-full bg-zinc-900 dark:bg-white transition-all duration-700 ease-in-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 sm:gap-10 w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800 pt-8 lg:pt-0 lg:pl-10">
          <StatItem label="Courses" value={stats.courses.toString().padStart(2, '0')} />
          <StatItem label="Completed" value={stats.completed.toString().padStart(2, '0')} variant="emerald" />
          <StatItem label="Est. Time" value={stats.duration} />
          <StatItem label="Difficulty" value={stats.difficulty} />
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, variant }: { label: string, value: string, variant?: "emerald" }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] text-zinc-400 font-bold">{label}</span>
      <span className={`text-lg sm:text-xl font-bold tabular-nums ${variant === 'emerald' ? 'text-emerald-600 dark:text-emerald-500' : ''}`}>
        {value}
      </span>
    </div>
  );
}