'use client'

import { cn } from '@/lib/utils'
import { useTableOfContents, type Heading } from '@/hooks/articles/use-table-of-contents'
import Link from 'next/link'

export function TableOfContents() {
  const { headings, activeId } = useTableOfContents()

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className="space-y-8">
      <div>
        <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">
          On_This_Page
        </h4>
        <ul className="space-y-3">
          {headings.map((heading) => (
            <li key={heading.id}>
              <TableOfContentsItem
                heading={heading}
                isActive={heading.id === activeId}
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

interface TableOfContentsItemProps {
  heading: Heading
  isActive: boolean
}

function TableOfContentsItem({ heading, isActive }: TableOfContentsItemProps) {
  const indent = (heading.level - 1) * 12

  return (
    <Link
      href={`#${heading.id}`}
      className={cn(
        'block text-[11px] font-bold transition-colors border-l-2 hover:text-emerald-500',
        isActive
          ? 'text-emerald-500 border-emerald-500'
          : 'text-zinc-500 border-transparent'
      )}
      style={{ paddingLeft: `${indent}px` }}
    >
      {heading.text}
    </Link>
  )
}
