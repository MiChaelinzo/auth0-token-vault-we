import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, SignOut, Gear, ShieldCheck } from '@phosphor-icons/react'
import { isAuth0Configured } from '@/lib/auth0-config'

export function Auth0UserMenu() {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0()

  if (!isAuth0Configured()) {
    return (
      <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border/50 px-3 py-2 rounded-lg">
        <ShieldCheck weight="duotone" className="w-5 h-5 text-accent" />
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Auth0 Token Vault</p>
          <p className="text-xs text-accent">Configure .env</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border/50 px-3 py-2 rounded-lg animate-pulse">
        <div className="w-8 h-8 rounded-full bg-muted" />
        <div className="w-16 h-4 rounded bg-muted" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <Button
        variant="outline"
        onClick={() => loginWithRedirect()}
        className="border-accent/50 text-accent hover:bg-accent/10"
      >
        <User weight="duotone" className="mr-2" />
        Sign In with Auth0
      </Button>
    )
  }

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 rounded-lg px-2 gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.picture} alt={user?.name || 'User'} />
            <AvatarFallback className="bg-primary/20 text-primary text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden sm:inline-block">
            {user?.name || user?.email}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2">
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <Gear weight="duotone" className="mr-2" />
          Account Settings
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <ShieldCheck weight="duotone" className="mr-2" />
          Connected Accounts
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        >
          <SignOut weight="duotone" className="mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
