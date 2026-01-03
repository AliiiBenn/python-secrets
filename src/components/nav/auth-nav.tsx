'use client'

import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { UserAvatar } from '@/components/user/user-avatar'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export const AuthNav = () => {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
  }

  // Composant réutilisable pour les boutons de connexion
  const AuthButtons = ({ vertical = false }: { vertical?: boolean }) => (
    <div className={`flex ${vertical ? 'flex-col w-full' : 'items-center'} gap-2`}>
      <Button size={'sm'} variant={'outline'} asChild className={vertical ? 'w-full' : ''}>
        <Link href="/login">Login</Link>
      </Button>
      <Button size={'sm'} asChild className={vertical ? 'w-full' : ''}>
        <Link href="/signup">Sign up</Link>
      </Button>
    </div>
  )

  return (
    <>
      {/* Version DESKTOP (cachée sur mobile) */}
      <div className="hidden md:flex items-center gap-4">
        {session ? (
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserAvatar className="h-9 w-9 border" />
          </div>
        ) : (
          <AuthButtons />
        )}
      </div>

      {/* Version MOBILE (Sheet) */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader className="text-left mb-6">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            
            <div className="flex flex-col gap-4">
              {session ? (
                <div className="flex flex-col gap-4">
                   <div className="flex items-center gap-3 mb-2">
                      <UserAvatar className="h-10 w-10 border" />
                      <span className="text-sm font-medium">{session.user.name}</span>
                   </div>
                   <Button asChild className="w-full justify-start" variant="ghost">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  {/* Tu peux ajouter ici un bouton Logout si besoin */}
                </div>
              ) : (
                <AuthButtons vertical />
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}