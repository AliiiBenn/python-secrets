import { AppHeader } from '@/components/headers/app-header'
import { TerminalDecoration } from '@/components/courses/terminal-decoration'
import { TrackFooter } from '@/components/courses/track-footer'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Share2, Bookmark } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cn } from '@/lib/utils'
import { RichText } from '@/components/articles'
import { ArticleSidebar } from '@/components/articles/article-sidebar'

interface PageProps {
  params: Promise<{ article_slug: string }>
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { article_slug } = await params

  // Récupération des données depuis Payload
  const payload = await getPayload({ config })

  const { docs: articles } = await payload.find({
    collection: 'articles',
    where: { slug: { equals: article_slug } },
    depth: 1, // Populer les relatedArticles
  })

  const article = articles[0]

  if (!article) {
    notFound()
  }

  // Formatage de la date
  const formattedDate = new Date(article.publishedDate)
    .toLocaleDateString('en-CA')
    .replace(/-/g, '.')

  return (
    <div className="flex flex-col min-h-screen">
      <main className="w-full max-w-5xl mx-auto border-zinc-200 dark:border-zinc-800 sm:border-x flex-1 flex flex-col tracking-tighter">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 bg-zinc-50/50 dark:bg-zinc-900/30">
          <Link
            href="/articles"
            className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white uppercase transition-colors"
          >
            <ArrowLeft size={12} /> Back_to_Index
          </Link>
          <div className="flex items-center gap-4">
            <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <Share2 size={14} />
            </button>
            <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <Bookmark size={14} />
            </button>
          </div>
        </div>

        {/* Article Header */}
        <header className="p-6 sm:p-12 border-b border-zinc-200 dark:border-zinc-800">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black px-2 py-0.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black uppercase">
                {article.category}
              </span>
              <Badge
                variant="outline"
                className={cn(
                  'border-amber-500/20',
                  article.difficulty === 'BEGINNER' ? 'text-green-500' : 'text-amber-500',
                )}
              >
                {article.difficulty?.toLowerCase()}
              </Badge>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                DOC_ID: {article.slug} // {article.revision || 'REV_1.0'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black italic leading-[0.9] uppercase py-2">
              {article.title}
            </h1>

            <p className="text-lg sm:text-xl text-zinc-500 normal-case font-medium leading-relaxed max-w-3xl">
              {article.subtitle}
            </p>

            <div className="flex flex-wrap gap-8 pt-6 border-t border-zinc-100 dark:border-zinc-900 mt-10">
              <MetaItem label="CODE" value={article.code || 'N/A'} />
              <MetaItem label="PUBLISHED" value={formattedDate} />
              {article.hash && (
                <MetaItem label="HASH" value={article.hash} className="hidden md:flex" />
              )}
            </div>
          </div>
        </header>

        <TerminalDecoration path={`./root/docs/articles/${article.slug}.md`} />

        {/* Article Content Area */}
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Main Body */}
          <article className="flex-1 px-6 sm:px-12 py-6 normal-case prose prose-zinc dark:prose-invert max-w-none border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800">
            {/* Rich Text Content */}
            <RichText data={article.content} />
          </article>

          {/* Table of Contents / Sidebar */}
          <ArticleSidebar article={article} />
        </div>

        <TrackFooter progress={100} />
      </main>
    </div>
  )
}

function MetaItem({
  label,
  value,
  className = '',
}: {
  label: string
  value: string
  className?: string
}) {
  return (
    <div className={cn('flex flex-col', className)}>
      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{label}</span>
      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{value}</span>
    </div>
  )
}
