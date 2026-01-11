'use client'

import { TableOfContents } from '@/components/articles/table-of-contents'
import { cn } from '@/lib/utils'
import type { Blog } from '@/payload-types'

interface BlogSidebarProps {
  blog: Blog
}

export function BlogSidebar({ blog }: BlogSidebarProps) {
  const relatedBlogPosts = (blog.relatedBlogPosts as any[]) || []

  return (
    <aside className="w-full lg:w-64 p-6 bg-zinc-50/30 dark:bg-zinc-900/10 space-y-8">
      {/* Table of Contents */}
      <TableOfContents />

      {/* Signal Status Badge */}
      {blog.signalStatus && (
        <section className="border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">
            Signal_Status
          </h4>
          <SignalStatusBadge status={blog.signalStatus} />
        </section>
      )}

      {/* Location Node */}
      {blog.locationNode && (
        <section className="border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">
            Location_Node
          </h4>
          <div className="text-[11px] font-mono text-zinc-500">
            {blog.locationNode}
          </div>
        </section>
      )}

      {/* Tags Section */}
      {blog.tags && blog.tags.length > 0 && (
        <section className="border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">
            Tags
          </h4>
          <div className="space-y-4">
            {(blog.tags as { tag: string }[]).map((tagItem, index) => (
              <span
                key={index}
                className="block text-[10px] font-mono border border-zinc-200 dark:border-zinc-800 px-2 py-1 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black cursor-pointer transition-colors"
              >
                #{tagItem.tag.toUpperCase().replace(/\s/g, '_')}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Related Blog Posts Section */}
      {relatedBlogPosts.length > 0 && (
        <section className="border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">
            Related_Transmissions
          </h4>
          <div className="space-y-3">
            {relatedBlogPosts.map((relatedPost) => (
              <a
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}`}
                className="block text-[11px] font-bold text-zinc-500 hover:text-blue-500 transition-colors"
              >
                {relatedPost.title}
              </a>
            ))}
          </div>
        </section>
      )}
    </aside>
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
    <div className={cn(
      'inline-flex items-center gap-2 px-3 py-1.5 rounded-md border font-mono text-[10px] font-bold uppercase',
      config.borderColor,
      config.bgColor,
      config.color
    )}>
      <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
      {status.toLowerCase()}
    </div>
  )
}
