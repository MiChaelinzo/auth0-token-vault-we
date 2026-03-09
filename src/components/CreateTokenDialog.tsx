import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { TokenType, TokenScope } from '@/lib/types'
import { AVAILABLE_SCOPES, generateTokenValue, getExpirationDate } from '@/lib/token-utils'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Copy, CheckCircle, Warning } from '@phosphor-icons/react'
import { copyToClipboard } from '@/lib/token-utils'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

interface CreateTokenDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateToken: (token: {
    name: string
    type: TokenType
    scopes: TokenScope[]
    expiresAt: string | null
    value: string
  }) => void
}

export function CreateTokenDialog({ open, onOpenChange, onCreateToken }: CreateTokenDialogProps) {
  const [step, setStep] = useState<'form' | 'generated'>('form')
  const [name, setName] = useState('')
  const [type, setType] = useState<TokenType>('api')
  const [scopes, setScopes] = useState<TokenScope[]>(['read:data'])
  const [expiration, setExpiration] = useState<string>('30')
  const [generatedToken, setGeneratedToken] = useState('')
  const [copied, setCopied] = useState(false)

  const handleCreate = () => {
    const tokenValue = generateTokenValue()
    const expiresAt = expiration === 'never' ? null : getExpirationDate(parseInt(expiration))
    
    onCreateToken({
      name,
      type,
      scopes,
      expiresAt,
      value: tokenValue
    })
    
    setGeneratedToken(tokenValue)
    setStep('generated')
  }

  const handleCopy = async () => {
    await copyToClipboard(generatedToken)
    setCopied(true)
    toast.success('Token copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClose = () => {
    onOpenChange(false)
    setTimeout(() => {
      setStep('form')
      setName('')
      setType('api')
      setScopes(['read:data'])
      setExpiration('30')
      setGeneratedToken('')
      setCopied(false)
    }, 200)
  }

  const toggleScope = (scope: TokenScope) => {
    setScopes(current =>
      current.includes(scope)
        ? current.filter(s => s !== scope)
        : [...current, scope]
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-card/95 backdrop-blur-xl border-border/50">
        {step === 'form' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold tracking-tight">Create New Token</DialogTitle>
              <DialogDescription>
                Generate a new API token with specific scopes and expiration
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="token-name" className="text-sm font-medium">
                  Token Name
                </Label>
                <Input
                  id="token-name"
                  placeholder="My Production API Token"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="token-type" className="text-sm font-medium">
                  Token Type
                </Label>
                <Select value={type} onValueChange={(v) => setType(v as TokenType)}>
                  <SelectTrigger id="token-type" className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="api">API Token</SelectItem>
                    <SelectItem value="access">Access Token</SelectItem>
                    <SelectItem value="refresh">Refresh Token</SelectItem>
                    <SelectItem value="service">Service Token</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Scopes</Label>
                <div className="space-y-3 border border-border/50 rounded-md p-4 bg-background/30">
                  {AVAILABLE_SCOPES.map((scope) => (
                    <div key={scope.value} className="flex items-start space-x-3">
                      <Checkbox
                        id={`scope-${scope.value}`}
                        checked={scopes.includes(scope.value)}
                        onCheckedChange={() => toggleScope(scope.value)}
                      />
                      <div className="flex-1 leading-none space-y-1">
                        <label
                          htmlFor={`scope-${scope.value}`}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {scope.label}
                        </label>
                        <p className="text-xs text-muted-foreground">
                          {scope.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiration" className="text-sm font-medium">
                  Expiration
                </Label>
                <Select value={expiration} onValueChange={setExpiration}>
                  <SelectTrigger id="expiration" className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="never">Never expires</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreate}
                disabled={!name.trim() || scopes.length === 0}
                className="bg-primary hover:bg-primary/90"
              >
                Generate Token
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <CheckCircle weight="duotone" className="text-accent" />
                Token Generated
              </DialogTitle>
              <DialogDescription>
                Save this token now - you won't be able to see it again
              </DialogDescription>
            </DialogHeader>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 py-4"
            >
              <Alert className="border-accent/30 bg-accent/10">
                <Warning weight="duotone" className="h-4 w-4 text-accent" />
                <AlertDescription className="text-sm">
                  This is the only time this token will be displayed. Make sure to copy it now.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Your Token</Label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-background/50 border border-border/50 rounded-md p-3 font-mono text-sm break-all">
                    {generatedToken}
                  </div>
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

              <div className="space-y-2 pt-2">
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium capitalize">{type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Scopes:</span>
                    <span className="font-medium">{scopes.length} granted</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-end">
              <Button onClick={handleClose} className="bg-primary hover:bg-primary/90">
                Done
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
