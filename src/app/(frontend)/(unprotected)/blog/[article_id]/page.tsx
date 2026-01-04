import { AppHeader } from '@/components/headers/app-header'
import { TerminalDecoration } from '@/components/courses/terminal-decoration'
import { TrackFooter } from '@/components/courses/track-footer'
import { ChevronLeft, Share, ShieldCheck, Wifi } from 'lucide-react'
import Link from 'next/link'

// Dummy Data pour le post de blog
const BLOG_DETAIL = {
  id: 'entry-001',
  code: 'LOG_982',
  title: "The shift to AI-native development",
  date: "2024.03.24",
  time: "14:20:00",
  author: "ADMIN_CORE",
  category: "EDITORIAL",
  status: "ENCRYPTED_SIGNAL",
  location: "Brussels_Central",
  content: [
    "The transition from writing code to orchestrating AI models is no longer a future projection—it is the current production reality. In the last six months, our internal velocity has increased by 40%, but at a significant cost to architectural legibility.",
    "We are seeing a new type of technical debt: 'Prompt Rot'. This occurs when the logic of a system is hidden within non-deterministic natural language instructions rather than structured code.",
  ]
}

export default function BlogDetailPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="w-full max-w-5xl mx-auto border-zinc-200 dark:border-zinc-800 sm:border-x flex-1 flex flex-col tracking-tighter">
        
        {/* Navigation / Header Status */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-2 bg-zinc-900 text-zinc-400">
          <Link href="/blog" className="flex items-center gap-1 text-[10px] font-bold hover:text-white transition-colors uppercase">
            <ChevronLeft size={10} /> Ret_to_Logs
          </Link>
          <div className="flex items-center gap-4 text-[10px] font-mono">
            <span className="flex items-center gap-1.5"><Wifi size={10} className="text-green-500" /> SIGNAL_STABLE</span>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <span className="hidden sm:flex items-center gap-1.5"><ShieldCheck size={10} /> {BLOG_DETAIL.status}</span>
          </div>
        </div>

        {/* Hero Section */}
        <header className="p-6 sm:p-12 border-b border-zinc-200 dark:border-zinc-800 relative overflow-hidden">
          {/* Background ID Watermark */}
          <div className="absolute top-0 right-0 text-[120px] font-black text-zinc-100 dark:text-zinc-900/50 -z-10 translate-x-1/4 -translate-y-1/4 select-none">
            {BLOG_DETAIL.code}
          </div>

          <div className="space-y-8">
            <div className="inline-flex flex-col">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">TRANSMISSION_TYPE: {BLOG_DETAIL.category}</span>
              <h1 className="text-4xl sm:text-7xl font-black italic leading-[0.85] uppercase mt-2">
                {BLOG_DETAIL.title}
              </h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-zinc-100 dark:border-zinc-900 pt-8">
              <LogMeta label="Log_ID" value={BLOG_DETAIL.code} />
              <LogMeta label="Timestamp" value={`${BLOG_DETAIL.date} T${BLOG_DETAIL.time}`} />
              <LogMeta label="Origin" value={BLOG_DETAIL.location} />
              <LogMeta label="Author" value={BLOG_DETAIL.author} />
            </div>
          </div>
        </header>

        <TerminalDecoration path={`./logs/entries/${BLOG_DETAIL.code}.log`} />

        {/* Content Area */}
        <div className="flex flex-col lg:flex-row flex-1">
          <div className="flex-1 p-6 sm:p-12 space-y-8">
            <div className="prose prose-zinc dark:prose-invert max-w-none normal-case">
              <p className="text-xl font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
                {BLOG_DETAIL.content[0]}
              </p>
              
              <div className="my-12 p-8 border-y-2 border-zinc-900 dark:border-white flex flex-col gap-4 bg-zinc-50 dark:bg-zinc-900/30">
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Critical_Observation //</span>
                <p className="text-2xl font-bold italic tracking-tighter uppercase">
                  "The compiler is no longer our only source of truth; the latent space is the new execution environment."
                </p>
              </div>

              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {BLOG_DETAIL.content[1]}
              </p>

              <h2 className="text-2xl font-black italic uppercase mt-12 mb-6">Structural_Anomalies</h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                As we move forward, the role of the Senior Engineer evolves into that of a 'System Verifier'. 
                We are no longer building from scratch; we are pruning and guiding hyper-intelligent stochastic parrots.
              </p>
            </div>

            {/* Post-Actions */}
            <div className="pt-12 mt-12 border-t border-zinc-100 dark:border-zinc-900 flex flex-wrap gap-4">
              <button className="px-6 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black text-[10px] font-black tracking-widest uppercase hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-colors">
                Share_Transmission
              </button>
              <button className="px-6 py-2 border border-zinc-200 dark:border-zinc-800 text-[10px] font-black tracking-widest uppercase hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                Download_PDF_Log
              </button>
            </div>
          </div>

          {/* Right Gutter (Metadata Decorator) */}
          <aside className="hidden lg:block w-16 border-l border-zinc-200 dark:border-zinc-800 relative">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col gap-20 items-center">
              <span className="rotate-90 text-[10px] font-bold text-zinc-300 dark:text-zinc-700 whitespace-nowrap uppercase tracking-[0.5em]">
                System_Log_v3.0
              </span>
              <div className="w-[1px] h-32 bg-zinc-200 dark:bg-zinc-800"></div>
              <span className="rotate-90 text-[10px] font-bold text-zinc-300 dark:text-zinc-700 whitespace-nowrap uppercase tracking-[0.5em]">
                {BLOG_DETAIL.code}
              </span>
            </div>
          </aside>
        </div>

        <TrackFooter progress={100} />
      </main>
    </div>
  )
}

function LogMeta({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{label}</span>
      <span className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100 uppercase tabular-nums">{value}</span>
    </div>
  )
}