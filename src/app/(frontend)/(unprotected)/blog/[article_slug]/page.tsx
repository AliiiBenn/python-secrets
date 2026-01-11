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
import { RichText } from '@/components/richtext'
import { SummaryBold, BlogSidebar } from '@/components/blog'

interface PageProps {
  params: Promise<{ article_slug: string }>
}

export default async function BlogPostPage({ params }: PageProps) {
  const { article_slug } = await params

  // Récupération des données depuis Payload
  const payload = await getPayload({ config })

  const { docs: blogs } = await payload.find({
    collection: 'blog',
    where: { slug: { equals: article_slug } },
    depth: 1, // Populer les relatedBlogPosts
  })

  const blog = blogs[0]

  if (!blog) {
    notFound()
  }

  // Formatage de la date
  const formattedDate = new Date(blog.publishedDate)
    .toLocaleDateString('en-CA')
    .replace(/-/g, '.')

  // Formatage de l'heure
  const formattedTime = new Date(blog.publishedDate).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <div className="flex flex-col min-h-screen">
      <main className="w-full max-w-5xl mx-auto border-zinc-200 dark:border-zinc-800 sm:border-x flex-1 flex flex-col tracking-tighter">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 bg-zinc-50/50 dark:bg-zinc-900/30">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white uppercase transition-colors"
          >
            <ArrowLeft size={12} /> Back_to_Logs
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

        {/* Blog Post Header */}
        <header className="p-6 sm:p-12 border-b border-zinc-200 dark:border-zinc-800">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black px-2 py-0.5 bg-blue-600 dark:bg-blue-400 text-white dark:text-black uppercase">
                {blog.category}
              </span>
              <SignalStatusBadge status={blog.signalStatus} />
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                REF_{blog.code}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black italic leading-[0.9] uppercase py-2">
              {blog.title}
            </h1>

            <p className="text-lg sm:text-xl text-zinc-500 normal-case font-medium leading-relaxed max-w-3xl">
              {blog.excerpt}
            </p>

            <div className="flex flex-wrap gap-8 pt-6 border-t border-zinc-100 dark:border-zinc-900 mt-10">
              <MetaItem label="AUTHOR" value="SYSTEM_ARCH" />
              <MetaItem label="LOCATION" value={blog.locationNode} />
              <MetaItem label="PUBLISHED" value={`${formattedDate} ${formattedTime}`} />
            </div>
          </div>
        </header>

        <TerminalDecoration path={`./root/logs/comms/${blog.slug}.log`} />

        {/* Blog Post Content Area */}
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Main Body */}
          <article className="flex-1 px-6 sm:px-12 py-6 normal-case prose prose-zinc dark:prose-invert max-w-none border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800">
            {/* Rich Text Content */}
            <RichText data={blog.content} />

            {/* Summary Bold Citation */}
            {blog.summaryBold && (
              <SummaryBold>{blog.summaryBold}</SummaryBold>
            )}
          </article>

          {/* Table of Contents / Sidebar */}
          <BlogSidebar blog={blog} />
        </div>

        <TrackFooter progress={100} />
      </main>
    </div>
  )
}

interface SignalStatusBadgeProps {
  status: string
}

function SignalStatusBadge({ status }: SignalStatusBadgeProps) {
  const statusConfig = {
    STABLE: {
      color: 'text-green-500',
      borderColor: 'border-green-500/20',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
    },
    ENCRYPTED: {
      color: 'text-blue-500',
      borderColor: 'border-blue-500/20',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    },
    INTERCEPTED: {
      color: 'text-amber-500',
      borderColor: 'border-amber-500/20',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
    },
    CORRUPTED: {
      color: 'text-red-500',
      borderColor: 'border-red-500/20',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
    },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.STABLE

  return (
    <Badge
      variant="outline"
      className={cn(
        'text-[10px] font-bold uppercase',
        config.borderColor,
        config.bgColor,
        config.color
      )}
    >
      {status.toLowerCase()}
    </Badge>
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
