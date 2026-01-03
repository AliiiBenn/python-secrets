export function TerminalDecoration({ path }: { path: string }) {
  return (
    <div className="px-4 sm:px-6 py-2 bg-zinc-900 text-zinc-400 text-[10px] flex items-center gap-4 overflow-hidden whitespace-nowrap">
      <span className="text-green-500">$</span>
      <span className="tracking-widest">ls --all --classify {path}</span>
      <span className="ml-auto opacity-50 hidden md:block">Encoding: UTF-8</span>
    </div>
  );
}