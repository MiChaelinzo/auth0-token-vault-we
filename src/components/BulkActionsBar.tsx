import { Token } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { X, ArrowsClockwise, Prohibit, TagSimple, Trash, Selection } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

interface BulkActionsBarProps {
  selectedTokens: Token[]
  onClearSelection: () => void
  onSelectAll: () => void
  onBulkRevoke: () => void
  onBulkRefresh: () => void
  onBulkDelete: () => void
  onBulkExport: () => void
  totalTokens: number
}

export function BulkActionsBar({
  selectedTokens,
  onClearSelection,
  onSelectAll,
  onBulkRevoke,
  onBulkRefresh,
  onBulkDelete,
  onBulkExport,
  totalTokens,
}: BulkActionsBarProps) {
  const selectedCount = selectedTokens.length

  if (selectedCount === 0) return null

  const activeTokensCount = selectedTokens.filter(t => t.status === 'active').length
  const expiredTokensCount = selectedTokens.filter(t => t.status === 'expired').length
  const revokedTokensCount = selectedTokens.filter(t => t.status === 'revoked').length

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="bg-card/95 backdrop-blur-xl border-2 border-primary/50 rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Selection weight="duotone" className="w-5 h-5 text-primary" />
              <Badge variant="secondary" className="font-mono font-semibold text-base px-3 py-1">
                {selectedCount}
              </Badge>
              <span className="text-sm text-muted-foreground">selected</span>
            </div>

            {selectedCount > 0 && (
              <div className="flex items-center gap-2 pl-3 border-l border-border/50">
                {activeTokensCount > 0 && (
                  <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                    {activeTokensCount} active
                  </Badge>
                )}
                {expiredTokensCount > 0 && (
                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                    {expiredTokensCount} expired
                  </Badge>
                )}
                {revokedTokensCount > 0 && (
                  <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
                    {revokedTokensCount} revoked
                  </Badge>
                )}
              </div>
            )}
          </div>

          <div className="h-8 w-px bg-border/50" />

          <div className="flex items-center gap-2">
            {selectedCount < totalTokens && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSelectAll}
                className="text-primary hover:text-primary hover:bg-primary/10"
              >
                <Selection weight="bold" className="mr-2" />
                Select All
              </Button>
            )}

            {activeTokensCount > 0 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBulkRefresh}
                  className="text-accent hover:text-accent hover:bg-accent/10"
                >
                  <ArrowsClockwise weight="bold" className="mr-2" />
                  Refresh ({activeTokensCount})
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBulkRevoke}
                  className="text-warning hover:text-warning hover:bg-warning/10"
                >
                  <Prohibit weight="bold" className="mr-2" />
                  Revoke ({activeTokensCount})
                </Button>
              </>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  More Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={onBulkExport}>
                  <TagSimple weight="duotone" className="mr-2" />
                  Export Selected
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={onBulkDelete}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash weight="duotone" className="mr-2" />
                  Delete Selected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="h-8 w-px bg-border/50" />

            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              className="text-muted-foreground hover:text-foreground"
            >
              <X weight="bold" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
