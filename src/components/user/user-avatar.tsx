'use client'

import { useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { authClient } from '@/lib/auth-client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface UserAvatarProps {
  className?: string
}

export function UserAvatar({ className }: UserAvatarProps) {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const user = session?.user

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login') // Redirige vers login après déconnexion
          router.refresh()
        },
      },
    })
  }

  if (!user) return null

  const avatarUrl = `https://avatar.vercel.sh/${user.email}`
  const initials = user.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "U"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className={`cursor-pointer hover:opacity-80 transition ${className}`}>
          <AvatarImage src={avatarUrl} alt={user.name || 'User avatar'} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}