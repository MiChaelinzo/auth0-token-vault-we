import { Token } from '@/lib/types'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Warning, ArrowsClockwise, Prohibit, Trash } from '@phosphor-icons/react'

interface BulkConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  action: 'revoke' | 'refresh' | 'delete' | null
  tokens: Token[]
}

export function BulkConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  action,
  tokens,
}: BulkConfirmationDialogProps) {
  if (!action) return null

  const actionConfig = {
    revoke: {
      title: 'Revoke Multiple Tokens',
      description: 'This will immediately revoke all selected active tokens. They will no longer be usable for authentication.',
      icon: <Prohibit weight="duotone" className="w-6 h-6 text-warning" />,
      confirmText: 'Revoke Tokens',
      confirmVariant: 'default' as const,
    },
    refresh: {
      title: 'Refresh Multiple Tokens',
      description: 'This will generate new token values and extend expiration dates by 30 days for all selected tokens. Old values will be immediately invalidated.',
      icon: <ArrowsClockwise weight="duotone" className="w-6 h-6 text-accent" />,
      confirmText: 'Refresh Tokens',
      confirmVariant: 'default' as const,
    },
    delete: {
      title: 'Delete Multiple Tokens',
      description: 'This will permanently delete all selected tokens from your vault. This action cannot be undone.',
      icon: <Trash weight="duotone" className="w-6 h-6 text-destructive" />,
      confirmText: 'Delete Tokens',
      confirmVariant: 'destructive' as const,
    },
  }

  const config = actionConfig[action]
  const activeTokens = tokens.filter(t => t.status === 'active')
  const tokensToProcess = action === 'delete' ? tokens : activeTokens

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-card rounded-lg border border-border/50">
              {config.icon}
            </div>
            <AlertDialogTitle className="text-2xl">{config.title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base">
            {config.description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-base px-3 py-1 font-mono">
              {tokensToProcess.length}
            </Badge>
            <span className="text-sm text-muted-foreground">
              token{tokensToProcess.length !== 1 ? 's' : ''} will be {action === 'delete' ? 'deleted' : action === 'revoke' ? 'revoked' : 'refreshed'}
            </span>
          </div>

          {tokensToProcess.length > 0 && (
            <ScrollArea className="h-[200px] rounded-lg border border-border/50 bg-muted/30">
              <div className="p-4 space-y-2">
                {tokensToProcess.map((token) => (
                  <div
                    key={token.id}
                    className="flex items-center justify-between p-3 bg-card rounded-lg border border-border/50"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{token.name}</p>
                        <p className="text-sm text-muted-foreground font-mono">{token.type}</p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        token.status === 'active'
                          ? 'default'
                          : token.status === 'expired'
                          ? 'secondary'
                          : 'outline'
                      }
                      className={
                        token.status === 'active'
                          ? 'bg-success/20 text-success border-success/50'
                          : token.status === 'expired'
                          ? 'bg-warning/20 text-warning border-warning/50'
                          : 'bg-muted text-muted-foreground'
                      }
                    >
                      {token.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {action !== 'delete' && activeTokens.length < tokens.length && (
            <div className="flex items-start gap-2 p-3 bg-warning/10 border border-warning/30 rounded-lg">
              <Warning weight="duotone" className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-sm text-warning">
                {tokens.length - activeTokens.length} inactive token{tokens.length - activeTokens.length !== 1 ? 's' : ''} will be skipped (only active tokens can be {action === 'revoke' ? 'revoked' : 'refreshed'})
              </p>
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={config.confirmVariant === 'destructive' ? 'bg-destructive hover:bg-destructive/90' : ''}
          >
            {config.confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
