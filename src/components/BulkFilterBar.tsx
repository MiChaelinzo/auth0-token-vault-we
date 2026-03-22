import { Token, TokenType, TokenStatus } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Funnel, X, CheckCircle, Circle } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface FilterOption {
  label: string
  value: string
  count: number
}

interface BulkFilterBarProps {
  tokens: Token[]
  onFilterSelect: (tokenIds: string[]) => void
  selectedCount: number
}

export function BulkFilterBar({ tokens, onFilterSelect, selectedCount }: BulkFilterBarProps) {
  const statusOptions: FilterOption[] = [
    {
      label: 'Active',
      value: 'active',
      count: tokens.filter(t => t.status === 'active').length,
    },
    {
      label: 'Expired',
      value: 'expired',
      count: tokens.filter(t => t.status === 'expired').length,
    },
    {
      label: 'Revoked',
      value: 'revoked',
      count: tokens.filter(t => t.status === 'revoked').length,
    },
    {
      label: 'Listed',
      value: 'listed',
      count: tokens.filter(t => t.status === 'listed').length,
    },
  ]

  const typeOptions: FilterOption[] = [
    {
      label: 'Access',
      value: 'access',
      count: tokens.filter(t => t.type === 'access').length,
    },
    {
      label: 'Refresh',
      value: 'refresh',
      count: tokens.filter(t => t.type === 'refresh').length,
    },
    {
      label: 'API',
      value: 'api',
      count: tokens.filter(t => t.type === 'api').length,
    },
    {
      label: 'Service',
      value: 'service',
      count: tokens.filter(t => t.type === 'service').length,
    },
  ]

  const getExpirationCategory = (token: Token): string => {
    if (!token.expiresAt) return 'never'
    const expiresAt = new Date(token.expiresAt)
    const now = new Date()
    const daysUntilExpiry = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysUntilExpiry < 0) return 'expired'
    if (daysUntilExpiry <= 7) return 'week'
    if (daysUntilExpiry <= 30) return 'month'
    return 'later'
  }

  const expirationOptions: FilterOption[] = [
    {
      label: 'Expiring This Week',
      value: 'week',
      count: tokens.filter(t => getExpirationCategory(t) === 'week').length,
    },
    {
      label: 'Expiring This Month',
      value: 'month',
      count: tokens.filter(t => getExpirationCategory(t) === 'month').length,
    },
    {
      label: 'Expired',
      value: 'expired',
      count: tokens.filter(t => getExpirationCategory(t) === 'expired').length,
    },
    {
      label: 'Never Expires',
      value: 'never',
      count: tokens.filter(t => getExpirationCategory(t) === 'never').length,
    },
  ]

  const handleFilterByStatus = (status: string) => {
    const filteredTokens = tokens.filter(t => t.status === status)
    onFilterSelect(filteredTokens.map(t => t.id))
  }

  const handleFilterByType = (type: string) => {
    const filteredTokens = tokens.filter(t => t.type === type)
    onFilterSelect(filteredTokens.map(t => t.id))
  }

  const handleFilterByExpiration = (category: string) => {
    const filteredTokens = tokens.filter(t => getExpirationCategory(t) === category)
    onFilterSelect(filteredTokens.map(t => t.id))
  }

  const FilterSection = ({ 
    title, 
    options, 
    onSelect 
  }: { 
    title: string
    options: FilterOption[]
    onSelect: (value: string) => void 
  }) => (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-foreground px-2">{title}</h4>
      <div className="space-y-1">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            disabled={option.count === 0}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
              option.count > 0
                ? "hover:bg-accent/50 text-foreground cursor-pointer"
                : "text-muted-foreground cursor-not-allowed opacity-50"
            )}
          >
            <span>{option.label}</span>
            <Badge 
              variant={option.count > 0 ? "secondary" : "outline"} 
              className="font-mono text-xs"
            >
              {option.count}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="gap-2"
          >
            <Funnel weight="duotone" />
            Quick Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-80 p-4 bg-card/95 backdrop-blur-xl border-border/50" 
          align="start"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Select Tokens By</h3>
              {selectedCount > 0 && (
                <Badge variant="default" className="font-mono">
                  {selectedCount} selected
                </Badge>
              )}
            </div>

            <Separator className="bg-border/50" />

            <FilterSection
              title="Status"
              options={statusOptions}
              onSelect={handleFilterByStatus}
            />

            <Separator className="bg-border/50" />

            <FilterSection
              title="Type"
              options={typeOptions}
              onSelect={handleFilterByType}
            />

            <Separator className="bg-border/50" />

            <FilterSection
              title="Expiration"
              options={expirationOptions}
              onSelect={handleFilterByExpiration}
            />
          </div>
        </PopoverContent>
      </Popover>

      {selectedCount > 0 && (
        <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-md">
          <CheckCircle weight="fill" className="text-primary w-4 h-4" />
          <span className="text-sm font-medium text-primary">
            {selectedCount} token{selectedCount !== 1 ? 's' : ''} selected
          </span>
        </div>
      )}
    </div>
  )
}
