import { AppHeader } from '@/components/headers/app-header'
import { TerminalDecoration } from '@/components/courses/terminal-decoration'
import { TrackFooter } from '@/components/courses/track-footer'
import { ArrowLeft, Clock, Share2, Printer, Bookmark } from 'lucide-react'
import Link from 'next/link'

// Dummy Data pour l'article
const ARTICLE_CONTENT = {
  id: 'clean-architecture-nextjs',
  code: 'ART-01',
  category: 'ARCHITECTURE',
  title: 'Clean Architecture in Next.js 14',
  subtitle: 'Decoupling business logic from framework-specific hooks and server components for long-term maintainability.',
  author: 'ARCH_CORE_01',
  date: '2024.03.12',
  readTime: '08 MIN',
  hash: '0xbf2d9e1a',
  tags: ['Next.js', 'Clean Architecture', 'Design Patterns', 'TypeScript']
}

export default function ArticleDetailPage() {
  return (
    <div className="flex flex-col min-h-screen">

      <main className="w-full max-w-5xl mx-auto border-zinc-200 dark:border-zinc-800 sm:border-x flex-1 flex flex-col tracking-tighter">
        
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 bg-zinc-50/50 dark:bg-zinc-900/30">
          <Link href="/articles" className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white uppercase transition-colors">
            <ArrowLeft size={12} /> Back_to_Index
          </Link>
          <div className="flex items-center gap-4">
            <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"><Share2 size={14} /></button>
            <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"><Bookmark size={14} /></button>
          </div>
        </div>

        {/* Article Header */}
        <header className="p-6 sm:p-12 border-b border-zinc-200 dark:border-zinc-800">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black px-2 py-0.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black uppercase">
                {ARTICLE_CONTENT.category}
              </span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                DOC_ID: {ARTICLE_CONTENT.id} // REV_0.4
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black italic leading-[0.9] uppercase py-2">
              {ARTICLE_CONTENT.title}
            </h1>

            <p className="text-lg sm:text-xl text-zinc-500 normal-case font-medium leading-relaxed max-w-3xl">
              {ARTICLE_CONTENT.subtitle}
            </p>

            <div className="flex flex-wrap gap-8 pt-6 border-t border-zinc-100 dark:border-zinc-900 mt-10">
              <MetaItem label="AUTHOR" value={ARTICLE_CONTENT.author} />
              <MetaItem label="PUBLISHED" value={ARTICLE_CONTENT.date} />
              <MetaItem label="READ_TIME" value={ARTICLE_CONTENT.readTime} />
              <MetaItem label="HASH" value={ARTICLE_CONTENT.hash} className="hidden md:flex" />
            </div>
          </div>
        </header>

        <TerminalDecoration path={`./root/docs/articles/${ARTICLE_CONTENT.id}.md`} />

        {/* Article Content Area */}
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Main Body */}
          <article className="flex-1 p-6 sm:p-12 normal-case prose prose-zinc dark:prose-invert max-w-none border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800">
            <p className="lead text-xl text-zinc-400 font-medium italic mb-12 border-l-4 border-zinc-200 dark:border-zinc-800 pl-6">
              "Architecture is about the important stuff. Whatever that is." — Ralph Johnson
            </p>

            <h2 className="uppercase font-black italic text-2xl tracking-tighter mt-12 mb-6">01_The_Problem_with_Framework_Coupling</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              Modern frontend frameworks like Next.js make it incredibly easy to leak infrastructure concerns into your business logic. 
              When you use `useRouter` or `useSearchParams` directly inside your domain services, you're effectively marriage-locking 
              your logic to a specific framework version.
            </p>

            <div className="my-10 bg-zinc-900 p-6 rounded-none border-l-4 border-emerald-500 overflow-x-auto">
              <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2">
                <span className="text-[10px] font-mono text-zinc-500">example_repository.ts</span>
                <span className="text-[10px] font-mono text-zinc-500">TypeScript</span>
              </div>
              <pre className="text-emerald-400 font-mono text-sm leading-6">
{`interface UserRepository {
  getById(id: string): Promise<User>;
  save(user: User): Promise<void>;
}

// Implement without Next.js dependencies
export class SqlUserRepository implements UserRepository {
  // ... implementation details
}`}
              </pre>
            </div>

            <h2 className="uppercase font-black italic text-2xl tracking-tighter mt-12 mb-6">02_Defining_The_Entities</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              The innermost circle of Clean Architecture is the Domain Entities. These are plain objects and functions that represent 
              your business rules. They should have zero dependencies on external libraries.
            </p>
          </article>

          {/* Table of Contents / Sidebar */}
          <aside className="w-full lg:w-64 p-6 bg-zinc-50/30 dark:bg-zinc-900/10 space-y-8">
            <section>
              <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">In_This_Document</h4>
              <ul className="space-y-3">
                {['Introduction', 'Framework_Coupling', 'Defining_Entities', 'Use_Case_Logic', 'Conclusion'].map(item => (
                  <li key={item} className="text-[11px] font-bold text-zinc-500 hover:text-emerald-500 cursor-pointer transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700"></span> {item.toUpperCase()}
                  </li>
                ))}
              </ul>
            </section>

            <section className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">Related_Nodes</h4>
              <div className="space-y-4">
                {ARTICLE_CONTENT.tags.map(tag => (
                  <span key={tag} className="block text-[10px] font-mono border border-zinc-200 dark:border-zinc-800 px-2 py-1 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black cursor-pointer transition-colors">
                    #{tag.toUpperCase().replace(/\s/g, '_')}
                  </span>
                ))}
              </div>
            </section>
          </aside>
        </div>

        <TrackFooter progress={100} />
      </main>
    </div>
  )
}

function MetaItem({ label, value, className = "" }: { label: string, value: string, className?: string }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{label}</span>
      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{value}</span>
    </div>
  )
}