import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TOKEN_VAULT_PROVIDERS } from '@/lib/auth0-config'
import type { ConnectedAccount } from '@/lib/token-vault-service'
import { Link, ShieldCheck, ArrowsClockwise, PlugsConnected } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface ConnectedAccountsProps {
  connectedAccounts: ConnectedAccount[]
  onConnect: (providerId: string) => void
  onDisconnect: (providerId: string) => void
}

export function ConnectedAccounts({
  connectedAccounts,
  onConnect,
  onDisconnect,
}: ConnectedAccountsProps) {
  const getAccountStatus = (providerId: string): ConnectedAccount | undefined => {
    return connectedAccounts.find((a) => a.provider === providerId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <PlugsConnected weight="duotone" className="w-6 h-6 text-primary" />
        <div>
          <h3 className="text-lg font-semibold">Connected Accounts</h3>
          <p className="text-sm text-muted-foreground">
            Link external accounts to enable AI agents to access APIs on your behalf via Auth0 Token Vault
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TOKEN_VAULT_PROVIDERS.map((provider, index) => {
          const account = getAccountStatus(provider.id)
          const isConnected = account?.status === 'active'

          return (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`transition-all ${
                  isConnected
                    ? 'border-accent/50 bg-accent/5'
                    : 'border-border/50 hover:border-primary/50'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{provider.icon}</span>
                      <CardTitle className="text-base">{provider.name}</CardTitle>
                    </div>
                    {isConnected ? (
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                        <ShieldCheck weight="fill" className="w-3 h-3 mr-1" />
                        Connected
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        Not linked
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{provider.description}</p>

                  {isConnected && account?.lastUsed && (
                    <p className="text-xs text-muted-foreground">
                      Last used: {new Date(account.lastUsed).toLocaleDateString()}
                    </p>
                  )}

                  <Button
                    variant={isConnected ? 'outline' : 'default'}
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      isConnected ? onDisconnect(provider.id) : onConnect(provider.id)
                    }
                  >
                    {isConnected ? (
                      <>
                        <ArrowsClockwise weight="duotone" className="mr-2 w-4 h-4" />
                        Reconnect
                      </>
                    ) : (
                      <>
                        <Link weight="duotone" className="mr-2 w-4 h-4" />
                        Connect Account
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
  )
}
