import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Token } from '@/lib/types'
import { getTokenStatusColor, formatRelativeTime, isTokenExpired, isTokenExpiringSoon, getTokenTypeIcon, canRefreshToken } from '@/lib/token-utils'
import { calculateTokenHealth, getHealthColor } from '@/lib/health-utils'
import { Clock, Copy, Key, Trash, Eye, ArrowClockwise, Star } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface TokenCardProps {
  token: Token
  onView: (token: Token) => void
  onRevoke: (token: Token) => void
  onRefresh?: (token: Token) => void
  onToggleFavorite?: (token: Token) => void
  index: number
  isSelected?: boolean
  onToggleSelection?: (token: Token) => void
  selectionMode?: boolean
}

export function TokenCard({ token, onView, onRevoke, onRefresh, onToggleFavorite, index, isSelected = false, onToggleSelection, selectionMode = false }: TokenCardProps) {
  const isExpired = isTokenExpired(token.expiresAt)
  const isExpiringSoon = isTokenExpiringSoon(token.expiresAt)
  const canRefresh = canRefreshToken(token)
  const healthData = calculateTokenHealth(token)
  
  const getExpirationProgress = () => {
    if (!token.expiresAt) return 100
    const created = new Date(token.createdAt).getTime()
    const expires = new Date(token.expiresAt).getTime()
    const now = Date.now()
    const total = expires - created
    const elapsed = now - created
    return Math.max(0, Math.min(100, 100 - (elapsed / total) * 100))
  }

  const handleCardClick = () => {
    if (selectionMode && onToggleSelection) {
      onToggleSelection(token)
    } else {
      onView(token)
    }
  }

  const handleCheckboxChange = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onToggleSelection) {
      onToggleSelection(token)
    }
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onToggleFavorite) {
      onToggleFavorite(token)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Card 
        className={`token-glow border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer group bg-card/50 backdrop-blur-sm relative ${
          isSelected ? 'ring-2 ring-primary border-primary' : ''
        } ${token.favorite ? 'border-warning/50' : ''}`}
        onClick={handleCardClick}
      >
        {token.favorite && (
          <div className="absolute top-2 right-2 z-10">
            <Star weight="fill" className="w-5 h-5 text-warning" />
          </div>
        )}
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {selectionMode && (
                <div onClick={handleCheckboxChange}>
                  <Checkbox
                    checked={isSelected}
                    className="w-5 h-5"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-2xl">{getTokenTypeIcon(token.type)}</span>
                  <Badge variant="outline" className="capitalize text-xs">
                    {token.type}
                  </Badge>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge 
                          variant="outline" 
                          className={`text-xs font-semibold ${getHealthColor(healthData.score)}`}
                        >
                          {healthData.grade} {healthData.score}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <p className="font-semibold mb-1">Security Health: {healthData.score}/100</p>
                        {healthData.issues.length > 0 && (
                          <div className="text-xs space-y-1">
                            {healthData.issues.slice(0, 2).map((issue, i) => (
                              <p key={i}>• {issue.message}</p>
                            ))}
                          </div>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <CardTitle className="text-lg font-semibold tracking-tight truncate">
                  {token.name}
                </CardTitle>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {onToggleFavorite && (
                <button
                  onClick={handleFavoriteClick}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Star 
                    weight={token.favorite ? "fill" : "regular"} 
                    className={`w-5 h-5 ${token.favorite ? 'text-warning' : 'text-muted-foreground hover:text-warning'}`}
                  />
                </button>
              )}
              <Badge 
                variant="outline" 
                className={`${getTokenStatusColor(token.status)} px-2 py-1 text-xs font-medium`}
              >
                {token.status}
              </Badge>
            </div>
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
