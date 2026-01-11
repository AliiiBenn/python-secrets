'use client'

import { cn } from '@/lib/utils'
import { Check, Copy, Terminal } from 'lucide-react'
import type React from 'react'
import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'

export type CodeBlockProps = {
  children?: React.ReactNode
  className?: string
  filename?: string
  language?: string
} & React.HTMLProps<HTMLDivElement>

function CodeBlock({ children, className, filename, language, ...props }: CodeBlockProps) {
  return (
    <figure
      className={cn(
        'my-3 rounded-md bg-fd-card border outline-none not-prose overflow-hidden text-sm',
        className,
      )}
      tabIndex={0}
      {...props}
    >
      {children}
    </figure>
  )
}

export type CodeBlockCodeProps = {
  code: string
  language?: string
  theme?: string
  className?: string
  filename?: string
} & React.HTMLProps<HTMLDivElement>

function CodeBlockCode({
  code,
  language = 'text',
  theme = 'github-dark',
  className,
  filename,
  ...props
}: CodeBlockCodeProps) {
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function highlight() {
      try {
        const html = await codeToHtml(code, { lang: language as any, theme })
        setHighlightedHtml(html)
      } catch {
        // Fallback to plain text if language is not supported
        const html = await codeToHtml(code, { lang: 'text', theme })
        setHighlightedHtml(html)
      }
    }
    highlight()
  }, [code, language, theme])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const classNames = cn(
    'text-[14px] p-4 overflow-auto max-h-[600px] [&>pre]:!bg-transparent',
    className,
  )

  return (
    <>
      {(filename || language) && (
        <div className="flex items-center justify-between px-2 py-1 bg-muted/80 border-b border-border/40 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 text-xs font-medium uppercase">
            <Terminal className="h-3.5 w-3.5" />
            <span>{filename || language}</span>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors duration-100 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none hover:bg-fd-accent hover:text-fd-accent-foreground [&_svg]:size-3.5"
            aria-label="Copy Text"
            onClick={handleCopy}
          >
            {copied ? <Check /> : <Copy />}
          </button>
        </div>
      )}
      {highlightedHtml ? (
        <div
          className={classNames}
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          {...props}
        />
      ) : (
        <div className={classNames} {...props}>
          <pre className="min-w-full w-max *:flex *:flex-col">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </>
  )
}

export type CodeBlockGroupProps = React.HTMLAttributes<HTMLDivElement>

function CodeBlockGroup({ children, className, ...props }: CodeBlockGroupProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 py-2 border-b border-border/40 text-sm text-muted-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { CodeBlock, CodeBlockCode, CodeBlockGroup }
