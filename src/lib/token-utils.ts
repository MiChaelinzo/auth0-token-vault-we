import { Token, TokenType, TokenScope } from './types'

export function generateTokenValue(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = 'tvault_'
  for (let i = 0; i < 48; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

export function getTokenStatusColor(status: Token['status']): string {
  switch (status) {
    case 'active':
      return 'bg-accent/20 text-accent border-accent/30'
    case 'expired':
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
    case 'revoked':
      return 'bg-muted-foreground/20 text-muted-foreground border-muted-foreground/30'
  }
}

export function getTokenTypeIcon(type: TokenType): string {
  switch (type) {
    case 'access':
      return '🔑'
    case 'refresh':
      return '🔄'
    case 'api':
      return '⚡'
    case 'service':
      return '🤖'
  }
}

export function isTokenExpired(expiresAt: string | null): boolean {
  if (!expiresAt) return false
  return new Date(expiresAt) < new Date()
}

export function isTokenExpiringSoon(expiresAt: string | null): boolean {
  if (!expiresAt) return false
  const daysUntilExpiry = (new Date(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  return daysUntilExpiry <= 7 && daysUntilExpiry > 0
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

export function formatRelativeTime(date: string | null): string {
  if (!date) return 'Never'
  
  const now = Date.now()
  const then = new Date(date).getTime()
  const diffMs = now - then
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 30) return `${diffDays}d ago`
  return formatDate(date)
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}

export const AVAILABLE_SCOPES: { value: TokenScope; label: string; description: string }[] = [
  { value: 'read:user', label: 'Read User', description: 'View user profile information' },
  { value: 'write:user', label: 'Write User', description: 'Modify user profile data' },
  { value: 'read:data', label: 'Read Data', description: 'Access application data' },
  { value: 'write:data', label: 'Write Data', description: 'Create and modify data' },
  { value: 'admin:all', label: 'Admin Access', description: 'Full administrative privileges' },
  { value: 'delete:resources', label: 'Delete Resources', description: 'Remove data and resources' },
]

export function getExpirationDate(days: number | null): string | null {
  if (days === null) return null
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

export function canRefreshToken(token: { status: string; expiresAt: string | null }): boolean {
  if (token.status === 'revoked') return false
  if (!token.expiresAt) return false
  return isTokenExpired(token.expiresAt) || isTokenExpiringSoon(token.expiresAt)
}

export function refreshTokenValue(originalValue: string): string {
  return generateTokenValue()
}
