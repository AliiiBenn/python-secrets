'use client'

import { TableOfContents } from './table-of-contents'
import type { Article } from '@/payload-types'

interface ArticleSidebarProps {
  article: Article
}

export function ArticleSidebar({ article }: ArticleSidebarProps) {
  const relatedArticles = (article.relatedArticles as any[]) || []

  return (
    <aside className="w-full lg:w-64 p-6 bg-zinc-50/30 dark:bg-zinc-900/10 space-y-8">
      {/* Table of Contents */}
      <TableOfContents />

      {/* Tags Section */}
      {article.tags && article.tags.length > 0 && (
        <section className={cn('border-t border-zinc-200 dark:border-zinc-800 pt-8')}>
          <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">
            Tags
          </h4>
          <div className="space-y-4">
            {(article.tags as { tag: string }[]).map((tagItem, index) => (
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

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section
          className={cn(
            'border-t border-zinc-200 dark:border-zinc-800 pt-8',
            article.tags && article.tags.length > 0 ? '' : ''
          )}
        >
          <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">
            Related_Articles
          </h4>
          <div className="space-y-3">
            {relatedArticles.map((relatedArticle) => (
              <a
                key={relatedArticle.id}
                href={`/articles/${relatedArticle.slug}`}
                className="block text-[11px] font-bold text-zinc-500 hover:text-emerald-500 transition-colors"
              >
                {relatedArticle.title}
              </a>
            ))}
          </div>
        </section>
      )}
    </aside>
  )
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}
