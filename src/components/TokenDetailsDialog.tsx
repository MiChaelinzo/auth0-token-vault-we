import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Token } from '@/lib/types'
import { getTokenStatusColor, formatDate, formatRelativeTime, copyToClipboard, AVAILABLE_SCOPES } from '@/lib/token-utils'
import { Copy, Eye, EyeSlash, Trash, CheckCircle } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

interface TokenDetailsDialogProps {
  token: Token | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onRevoke: (token: Token) => void
}

export function TokenDetailsDialog({ token, open, onOpenChange, onRevoke }: TokenDetailsDialogProps) {
  const [showToken, setShowToken] = useState(false)
  const [copied, setCopied] = useState(false)
  const [revokeConfirmOpen, setRevokeConfirmOpen] = useState(false)

  if (!token) return null

  const handleCopy = async () => {
    await copyToClipboard(token.value)
    setCopied(true)
    toast.success('Token copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRevoke = () => {
    onRevoke(token)
    setRevokeConfirmOpen(false)
    onOpenChange(false)
  }

  const getScopeInfo = (scopeValue: string) => {
    return AVAILABLE_SCOPES.find(s => s.value === scopeValue)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] bg-card/95 backdrop-blur-xl border-border/50 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold tracking-tight">{token.name}</DialogTitle>
              <Badge 
                variant="outline" 
                className={`${getTokenStatusColor(token.status)} px-3 py-1`}
              >
                {token.status}
              </Badge>
            </div>
            <DialogDescription>
              Comprehensive token details and management
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Token Value</h3>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="flex-1 bg-background/50 border border-border/50 rounded-md p-3 font-mono text-sm break-all">
                      {showToken ? token.value : '•'.repeat(48)}
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setShowToken(!showToken)}
                    >
                      {showToken ? <EyeSlash weight="duotone" /> : <Eye weight="duotone" />}
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={handleCopy}
                      className={copied ? 'border-accent text-accent' : ''}
                    >
                      {copied ? <CheckCircle weight="fill" /> : <Copy weight="duotone" />}
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Token ID</p>
                    <code className="font-mono text-sm bg-muted/50 px-2 py-1 rounded block truncate">
                      {token.id}
                    </code>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Type</p>
                    <p className="text-sm font-medium capitalize">{token.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Created</p>
                    <p className="text-sm font-medium">{formatDate(token.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Last Used</p>
                    <p className="text-sm font-medium">{formatRelativeTime(token.lastUsed)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Usage Count</p>
                    <p className="text-sm font-medium text-accent">{token.usageCount.toLocaleString()} calls</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Expires</p>
                    <p className="text-sm font-medium">
                      {token.expiresAt ? formatDate(token.expiresAt) : 'Never'}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Granted Scopes</h3>
                <div className="space-y-2">
                  {token.scopes.map((scope) => {
                    const info = getScopeInfo(scope)
                    return (
                      <div
                        key={scope}
                        className="flex items-start justify-between bg-background/30 border border-border/30 rounded-md p-3"
                      >
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">{info?.label || scope}</p>
                          <p className="text-xs text-muted-foreground">{info?.description}</p>
                        </div>
                        <CheckCircle weight="fill" className="text-accent mt-0.5" />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-border/50">
            <Button
              variant="destructive"
              onClick={() => setRevokeConfirmOpen(true)}
              disabled={token.status === 'revoked'}
            >
              <Trash weight="duotone" className="mr-2" />
              Revoke Token
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={revokeConfirmOpen} onOpenChange={setRevokeConfirmOpen}>
        <AlertDialogContent className="bg-card/95 backdrop-blur-xl border-border/50">
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke Token?</AlertDialogTitle>
            <AlertDialogDescription>
              This will immediately invalidate "{token.name}" and all API calls using this token will fail.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRevoke}
              className="bg-destructive hover:bg-destructive/90"
            >
              Revoke
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
