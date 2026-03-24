import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { ConnectedAccounts } from '@/components/ConnectedAccounts'
import { AI_AGENT_ACTIONS, simulateAIAgentAction, getProvider } from '@/lib/token-vault-service'
import type { ConnectedAccount } from '@/lib/token-vault-service'
import { Robot, Lightning, ShieldCheck, ArrowRight, CheckCircle, WarningCircle, Info } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

interface AgentActionResult {
  actionId: string
  actionName: string
  status: 'success' | 'needs_connection' | 'running'
  message: string
  data?: Record<string, unknown>
  timestamp: string
}

export function AIAgentPanel() {
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([
    {
      provider: 'google-oauth2',
      providerName: 'Google',
      connectedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      status: 'active',
      lastUsed: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      provider: 'github',
      providerName: 'GitHub',
      connectedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
      status: 'active',
      lastUsed: new Date(Date.now() - 7200000).toISOString(),
    },
  ])

  const [actionResults, setActionResults] = useState<AgentActionResult[]>([])
  const [runningAction, setRunningAction] = useState<string | null>(null)

  const handleConnectAccount = (providerId: string) => {
    const provider = getProvider(providerId)
    if (!provider) return

    // Simulate connecting via Auth0 Token Vault
    const newAccount: ConnectedAccount = {
      provider: providerId,
      providerName: provider.name,
      connectedAt: new Date().toISOString(),
      status: 'active',
      lastUsed: null,
    }

    setConnectedAccounts((prev) => {
      const filtered = prev.filter((a) => a.provider !== providerId)
      return [...filtered, newAccount]
    })

    toast.success(`${provider.name} account connected`, {
      description: 'Token securely stored in Auth0 Token Vault',
    })
  }

  const handleDisconnectAccount = (providerId: string) => {
    const provider = getProvider(providerId)
    setConnectedAccounts((prev) => prev.filter((a) => a.provider !== providerId))
    toast.info(`${provider?.name || providerId} account disconnected`)
  }

  const handleRunAction = async (actionId: string) => {
    const action = AI_AGENT_ACTIONS.find((a) => a.id === actionId)
    if (!action) return

    const isProviderConnected = connectedAccounts.some(
      (a) => a.provider === action.provider && a.status === 'active'
    )

    if (!isProviderConnected) {
      const provider = getProvider(action.provider)
      toast.error(`${provider?.name || action.provider} not connected`, {
        description: 'Connect the account first to enable this AI agent action',
      })
      setActionResults((prev) => [
        {
          actionId: action.id,
          actionName: action.name,
          status: 'needs_connection',
          message: `Connect your ${provider?.name || action.provider} account to use this action`,
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ])
      return
    }

    setRunningAction(actionId)

    // Simulate async AI agent operation with Token Vault
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const result = simulateAIAgentAction(action)

    setActionResults((prev) => [
      {
        actionId: action.id,
        actionName: action.name,
        status: result.status,
        message: result.message,
        data: result.data,
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ])

    // Update lastUsed for the connected account
    setConnectedAccounts((prev) =>
      prev.map((a) =>
        a.provider === action.provider ? { ...a, lastUsed: new Date().toISOString() } : a
      )
    )

    setRunningAction(null)

    if (result.status === 'success') {
      toast.success(result.message, {
        description: 'Token exchange completed via Auth0 Token Vault',
      })
    }
  }

  const connectedProviderIds = new Set(
    connectedAccounts.filter((a) => a.status === 'active').map((a) => a.provider)
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="relative">
          <Robot weight="duotone" className="w-12 h-12 text-primary" />
          <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full" />
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">AI Agent Hub</h2>
          <p className="text-muted-foreground">
            AI agents securely access your connected services through Auth0 Token Vault.
            Tokens are exchanged on-demand using OAuth 2.0 Token Exchange (RFC 8693).
          </p>
        </div>
      </div>

      {/* Token Vault Info Banner */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info weight="duotone" className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium">How Auth0 Token Vault Works</p>
              <p className="text-xs text-muted-foreground">
                When you connect an external account, Auth0 securely stores and manages the OAuth tokens
                in the Token Vault. When an AI agent needs to act on your behalf, it requests a token
                exchange — Auth0 validates the request and provides a scoped access token for the
                specific third-party API, without exposing your long-lived credentials.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connected Accounts Section */}
      <ConnectedAccounts
        connectedAccounts={connectedAccounts}
        onConnect={handleConnectAccount}
        onDisconnect={handleDisconnectAccount}
      />

      <Separator />

      {/* AI Agent Actions */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Lightning weight="duotone" className="w-6 h-6 text-accent" />
          <div>
            <h3 className="text-lg font-semibold">AI Agent Actions</h3>
            <p className="text-sm text-muted-foreground">
              Run AI-powered actions that use Token Vault to securely access your connected services
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {AI_AGENT_ACTIONS.map((action, index) => {
            const isConnected = connectedProviderIds.has(action.provider)
            const isRunning = runningAction === action.id
            const provider = getProvider(action.provider)

            return (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`transition-all h-full ${
                    isConnected
                      ? 'hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5'
                      : 'opacity-75'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{action.icon}</span>
                      <Badge
                        variant="outline"
                        className={
                          isConnected
                            ? 'bg-accent/10 text-accent border-accent/30'
                            : 'text-muted-foreground'
                        }
                      >
                        {provider?.name || action.provider}
                      </Badge>
                    </div>
                    <CardTitle className="text-base">{action.name}</CardTitle>
                    <CardDescription className="text-sm">{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full"
                      variant={isConnected ? 'default' : 'outline'}
                      disabled={isRunning}
                      onClick={() => handleRunAction(action.id)}
                    >
                      {isRunning ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                          Running...
                        </>
                      ) : isConnected ? (
                        <>
                          <Robot weight="duotone" className="mr-2 w-4 h-4" />
                          Run Agent Action
                        </>
                      ) : (
                        <>
                          <ShieldCheck weight="duotone" className="mr-2 w-4 h-4" />
                          Connect to Enable
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Results Log */}
      {actionResults.length > 0 && (
        <>
          <Separator />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Agent Activity Log</h3>
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                <AnimatePresence>
                  {actionResults.map((result, index) => (
                    <motion.div
                      key={`${result.actionId}-${result.timestamp}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card
                        className={`${
                          result.status === 'success'
                            ? 'border-accent/30'
                            : 'border-destructive/30'
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            {result.status === 'success' ? (
                              <CheckCircle
                                weight="duotone"
                                className="w-5 h-5 text-accent mt-0.5 shrink-0"
                              />
                            ) : (
                              <WarningCircle
                                weight="duotone"
                                className="w-5 h-5 text-destructive mt-0.5 shrink-0"
                              />
                            )}
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">{result.actionName}</p>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(result.timestamp).toLocaleTimeString()}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground">{result.message}</p>
                              {result.data && (
                                <div className="mt-2 p-2 rounded bg-background/50 border border-border/30">
                                  <p className="text-xs font-medium mb-1">Response Data:</p>
                                  {result.data.summary && (
                                    <p className="text-xs text-accent">
                                      {result.data.summary as string}
                                    </p>
                                  )}
                                  {!result.data.summary && (
                                    <pre className="text-xs text-muted-foreground overflow-auto">
                                      {JSON.stringify(result.data, null, 2)}
                                    </pre>
                                  )}
                                </div>
                              )}
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <ShieldCheck weight="fill" className="w-3 h-3 text-primary" />
                                <span>Secured by Auth0 Token Vault</span>
                                <ArrowRight weight="bold" className="w-3 h-3 mx-1" />
                                <span>Token Exchange (RFC 8693)</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </div>
        </>
      )}
    </div>
  )
}
