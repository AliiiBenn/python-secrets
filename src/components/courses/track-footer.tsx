export function TrackFooter({ progress }: { progress: number }) {
  return (
    <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-zinc-400 font-mono px-2">
        <div className="flex flex-wrap justify-center sm:justify-start gap-6">
          <FooterLabel label="ENV" value="Production" />
          <FooterLabel label="PROGRESS" value={`${progress}%_LOADED`} />
          <FooterLabel label="NODES" value="Brussels_Central" className="hidden md:inline" />
        </div>
        <div className="flex items-center gap-3 font-bold uppercase tracking-[0.2em]">
          <span className="w-2 h-2 bg-green-500 animate-[pulse_1.5s_infinite]"></span>
          <span className="text-zinc-900 dark:text-zinc-100">Status_Operational</span>
        </div>
      </div>
    </footer>
  );
}

function FooterLabel({ label, value, className = "" }: { label: string, value: string, className?: string }) {
  return (
    <span className={`flex gap-1 ${className}`}>
      <span className="text-zinc-500">{label}:</span> 
      <span className="text-zinc-900 dark:text-zinc-100 font-bold uppercase">{value}</span>
    </span>
  );
}