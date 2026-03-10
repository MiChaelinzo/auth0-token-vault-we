import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Token } from '@/lib/types'
import { getTokenStatusColor, formatRelativeTime, isTokenExpired, isTokenExpiringSoon, getTokenTypeIcon, canRefreshToken } from '@/lib/token-utils'
import { Clock, Copy, Key, Trash, Eye, ArrowClockwise } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { Progress } from '@/components/ui/progress'

interface TokenCardProps {
  token: Token
  onView: (token: Token) => void
  onRevoke: (token: Token) => void
  onRefresh?: (token: Token) => void
  index: number
}

export function TokenCard({ token, onView, onRevoke, onRefresh, index }: TokenCardProps) {
  const isExpired = isTokenExpired(token.expiresAt)
  const isExpiringSoon = isTokenExpiringSoon(token.expiresAt)
  const canRefresh = canRefreshToken(token)
  
  const getExpirationProgress = () => {
    if (!token.expiresAt) return 100
    const created = new Date(token.createdAt).getTime()
    const expires = new Date(token.expiresAt).getTime()
    const now = Date.now()
    const total = expires - created
    const elapsed = now - created
    return Math.max(0, Math.min(100, 100 - (elapsed / total) * 100))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Card 
        className="token-glow border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer group bg-card/50 backdrop-blur-sm"
        onClick={() => onView(token)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{getTokenTypeIcon(token.type)}</span>
                <Badge variant="outline" className="capitalize text-xs">
                  {token.type}
                </Badge>
              </div>
              <CardTitle className="text-lg font-semibold tracking-tight truncate">
                {token.name}
              </CardTitle>
            </div>
            <Badge 
              variant="outline" 
              className={`${getTokenStatusColor(token.status)} px-2 py-1 text-xs font-medium`}
            >
              {token.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">ID</span>
              <code className="font-mono text-xs bg-muted/50 px-2 py-1 rounded">
                {token.id.slice(0, 12)}...
              </code>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Usage</span>
              <span className="font-medium text-accent">{token.usageCount.toLocaleString()} calls</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <Clock weight="duotone" className="w-3.5 h-3.5" />
                Last Used
              </span>
              <span className="font-medium">{formatRelativeTime(token.lastUsed)}</span>
            </div>

            {token.expiresAt && (
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Expires</span>
                  <span className={`font-medium ${isExpired ? 'text-destructive' : isExpiringSoon ? 'text-yellow-400' : ''}`}>
                    {formatRelativeTime(token.expiresAt)}
                  </span>
                </div>
                {!isExpired && (
                  <Progress 
                    value={getExpirationProgress()} 
                    className="h-1.5"
                  />
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2">
            {canRefresh && onRefresh && (
              <Button
                size="sm"
                variant="outline"
                className="border-accent/50 text-accent hover:bg-accent/10"
                onClick={(e) => {
                  e.stopPropagation()
                  onRefresh(token)
                }}
              >
                <ArrowClockwise weight="duotone" className="mr-1.5" />
                Refresh
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className={canRefresh ? '' : 'flex-1'}
              onClick={(e) => {
                e.stopPropagation()
                onView(token)
              }}
            >
              <Eye weight="duotone" className="mr-1.5" />
              View
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation()
                onRevoke(token)
              }}
            >
              <Trash weight="duotone" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
