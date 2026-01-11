'use client'

import { cn } from '@/lib/utils'
import { Quote } from 'lucide-react'

interface SummaryBoldProps {
  children: React.ReactNode
  className?: string
}

export function SummaryBold({ children, className }: SummaryBoldProps) {
  return (
    <figure className={cn('my-12 relative', className)}>
      <div className="flex items-start gap-4 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 dark:border-blue-400 p-6 rounded-r-lg">
        <Quote className="h-6 w-6 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-1" />
        <blockquote className="flex-1">
          <p className="text-xl sm:text-2xl font-semibold text-blue-900 dark:text-blue-100 italic leading-relaxed">
            {children}
          </p>
        </blockquote>
      </div>
    </figure>
  )
}
