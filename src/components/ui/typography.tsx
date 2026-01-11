import { cn } from '@/lib/utils'

// Typography components
export function TypographyH1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight text-balance', className)}
      {...props}
    />
  )
}

export function TypographyH2({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-10', className)}
      {...props}
    />
  )
}

export function TypographyH3({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('scroll-m-20 text-2xl font-semibold tracking-tight mt-8', className)}
      {...props}
    />
  )
}

export function TypographyH4({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn('scroll-m-20 text-xl font-semibold tracking-tight mt-6', className)}
      {...props}
    />
  )
}

export function TypographyP({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    />
  )
}

export function TypographyBlockquote({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 italic text-muted-foreground', className)}
      {...props}
    />
  )
}

export function TypographyList({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}
      {...props}
    />
  )
}

export function TypographyOL({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      className={cn('my-6 ml-6 list-decimal [&>li]:mt-2', className)}
      {...props}
    />
  )
}

export function TypographyInlineCode({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn('bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold', className)}
      {...props}
    />
  )
}

export function TypographyLead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-muted-foreground text-xl', className)}
      {...props}
    />
  )
}

export function TypographyLarge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  )
}

export function TypographySmall({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <small
      className={cn('text-sm leading-none font-medium', className)}
      {...props}
    />
  )
}

export function TypographyMuted({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

export function TypographyTable({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className={cn('my-6 w-full overflow-y-auto', className)}>
      <table className="w-full" {...props} />
    </div>
  )
}

export function TypographyAnchor({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn('font-medium text-primary underline underline-offset-4', className)}
      {...props}
    />
  )
}

export function TypographyHr({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className={cn('my-4 border-border', className)}
      {...props}
    />
  )
}

export function TypographyStrong({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <strong
      className={cn('font-semibold', className)}
      {...props}
    />
  )
}
