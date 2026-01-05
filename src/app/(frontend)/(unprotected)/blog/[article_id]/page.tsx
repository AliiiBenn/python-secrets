import { AppHeader } from '@/components/headers/app-header'
import { ChevronLeft, ShieldCheck, Wifi, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Imports Payload
import { getPayload } from 'payload'
import config from '@payload-config'
import { TerminalDecoration } from '@/components/courses/terminal-decoration'
import { TrackFooter } from '@/components/courses/track-footer'

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  // 1. Initialisation Payload
  const payload = await getPayload({ config })

  // 2. Récupération du post par slug
  const { docs } = await payload.find({
    collection: 'blog',
    where: {
      slug: { equals: slug },
    },
  })

  const post = docs[0]

  // 3. Si pas de post, 404
  if (!post) {
    return notFound()
  }

  // 4. Formatage des dates et heures système
  const dateObj = new Date(post.publishedDate)
  const formattedDate = dateObj.toLocaleDateString('en-CA').replace(/-/g, '.')
  const formattedTime = dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  // Mappage du statut de signal pour l'icône
  const signalLabel = post.signalStatus?.replace('_', ' ') || 'SIGNAL_STABLE'

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />

      <main className="w-full max-w-5xl mx-auto border-zinc-200 dark:border-zinc-800 sm:border-x flex-1 flex flex-col tracking-tighter uppercase">
        
        {/* Navigation / Header Status */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-2 bg-zinc-900 text-zinc-400">
          <Link href="/blog" className="flex items-center gap-1 text-[10px] font-bold hover:text-white transition-colors uppercase">
            <ChevronLeft size={10} /> Ret_to_Logs
          </Link>
          <div className="flex items-center gap-4 text-[10px] font-mono">
            <span className="flex items-center gap-1.5">
                <Wifi size={10} className={post.signalStatus === 'CORRUPTED' ? 'text-rose-500' : 'text-green-500'} /> 
                {signalLabel}
            </span>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <span className="hidden sm:flex items-center gap-1.5">
                <ShieldCheck size={10} /> {post.code || 'NO_REF'}
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <header className="p-6 sm:p-12 border-b border-zinc-200 dark:border-zinc-800 relative overflow-hidden">
          {/* Background ID Watermark */}
          <div className="absolute top-0 right-0 text-[120px] font-black text-zinc-100 dark:text-zinc-900/40 -z-10 translate-x-1/4 -translate-y-1/4 select-none pointer-events-none">
            {post.code}
          </div>

          <div className="space-y-8">
            <div className="inline-flex flex-col">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                TRANSMISSION_TYPE: {post.category}
              </span>
              <h1 className="text-4xl sm:text-7xl font-black italic leading-[0.85] uppercase mt-2 max-w-4xl">
                {post.title}
              </h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-zinc-100 dark:border-zinc-900 pt-8">
              <LogMeta label="Log_ID" value={post.code} />
              <LogMeta label="Timestamp" value={`${formattedDate} T${formattedTime}`} />
              <LogMeta label="Origin" value={post.locationNode || 'UNKNOWN_NODE'} />
              <LogMeta label="Author" value="ADMIN_CORE" />
            </div>
          </div>
        </header>

        <TerminalDecoration path={`./logs/entries/${post.slug}.log`} />

        {/* Content Area */}
        <div className="flex flex-col lg:flex-row flex-1">
          <div className="flex-1 p-6 sm:p-12 space-y-8">
            <div className="prose prose-zinc dark:prose-invert max-w-none normal-case">
              {/* Affichage du contenu (Textarea pour le moment) */}
              <div className="text-xl font-medium leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">
                {post.content}
              </div>
              
              {/* Citation mise en avant (SummaryBold dans Payload) */}
              {post.summaryBold && (
                <div className="my-12 p-8 border-y-2 border-zinc-900 dark:border-white flex flex-col gap-4 bg-zinc-50 dark:bg-zinc-900/30">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Critical_Observation //</span>
                  <p className="text-2xl font-bold italic tracking-tighter uppercase leading-tight">
                    "{post.summaryBold}"
                  </p>
                </div>
              )}
            </div>

            {/* Post-Actions */}
            <div className="pt-12 mt-12 border-t border-zinc-100 dark:border-zinc-900 flex flex-wrap gap-4 uppercase">
              <button className="px-6 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black text-[10px] font-black tracking-widest hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-colors">
                Share_Transmission
              </button>
              <Link href="/blog" className="px-6 py-2 border border-zinc-200 dark:border-zinc-800 text-[10px] font-black tracking-widest hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center gap-2">
                <ArrowLeft size={12} /> Return_to_List
              </Link>
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
                {post.code}
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
      <span className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100 uppercase tabular-nums">{value || '---'}</span>
    </div>
  )
}