import { QueryProvider } from './query-provider'
import { ThemeProvider } from './theme-provider'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </QueryProvider>
  )
}
