import React from 'react'
import '@/styles/globals.css'
import { AppProvider } from '@/components/providers'
import { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <main>
          <AppProvider>{children}</AppProvider>
        </main>
      </body>
    </html>
  )
}
