import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Token, TokenType, TokenScope, SecurityEvent } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { TokenCard } from '@/components/TokenCard'
import { CreateTokenDialog } from '@/components/CreateTokenDialog'
import { TokenDetailsDialog } from '@/components/TokenDetailsDialog'
import { SecurityDashboard } from '@/components/SecurityDashboard'
import { EmptyState } from '@/components/EmptyState'
import { LockKey, Plus, ShieldCheck, MagnifyingGlass } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { isTokenExpired, refreshTokenValue, getExpirationDate } from '@/lib/token-utils'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [tokens, setTokens] = useKV<Token[]>('tokens', [])
  const [events, setEvents] = useKV<SecurityEvent[]>('security-events', [])
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('tokens')

  const tokensList = tokens || []
  const eventsList = events || []

  const handleCreateToken = (tokenData: {
    name: string
    type: TokenType
    scopes: TokenScope[]
    expiresAt: string | null
    value: string
  }) => {
    const newToken: Token = {
      id: uuidv4(),
      name: tokenData.name,
      type: tokenData.type,
      value: tokenData.value,
      status: 'active',
      scopes: tokenData.scopes,
      createdAt: new Date().toISOString(),
      lastUsed: null,
      expiresAt: tokenData.expiresAt,
      usageCount: 0,
    }

    setTokens((currentTokens) => [...(currentTokens || []), newToken])

    const newEvent: SecurityEvent = {
      id: uuidv4(),
      type: 'created',
      tokenId: newToken.id,
      tokenName: newToken.name,
      timestamp: new Date().toISOString(),
      details: `Created ${tokenData.type} token with ${tokenData.scopes.length} scope(s)`,
    }
    setEvents((currentEvents) => [newEvent, ...(currentEvents || [])])

    toast.success(`Token "${tokenData.name}" created successfully`)
  }

  const handleRevokeToken = (token: Token) => {
    setTokens((currentTokens) =>
      (currentTokens || []).map((t) =>
        t.id === token.id ? { ...t, status: 'revoked' as const } : t
      )
    )

    const newEvent: SecurityEvent = {
      id: uuidv4(),
      type: 'revoked',
      tokenId: token.id,
      tokenName: token.name,
      timestamp: new Date().toISOString(),
      details: `Token revoked by user`,
    }
    setEvents((currentEvents) => [newEvent, ...(currentEvents || [])])

    toast.success(`Token "${token.name}" has been revoked`)
  }

  const handleRefreshToken = (token: Token) => {
    const newValue = refreshTokenValue(token.value)
    const newExpiresAt = getExpirationDate(30)
    
    setTokens((currentTokens) =>
      (currentTokens || []).map((t) =>
        t.id === token.id
          ? {
              ...t,
              value: newValue,
              expiresAt: newExpiresAt,
              status: 'active' as const,
            }
          : t
      )
    )

    const newEvent: SecurityEvent = {
      id: uuidv4(),
      type: 'refreshed',
      tokenId: token.id,
      tokenName: token.name,
      timestamp: new Date().toISOString(),
      details: `Token refreshed with new value and extended expiration (30 days)`,
    }
    setEvents((currentEvents) => [newEvent, ...(currentEvents || [])])

    toast.success(`Token "${token.name}" has been refreshed`, {
      description: 'New token value generated and expiration extended by 30 days',
    })
  }

  const handleViewToken = (token: Token) => {
    setSelectedToken(token)
    setDetailsDialogOpen(true)
  }

  const getProcessedTokens = () => {
    return tokensList.map((token) => {
      if (token.status === 'active' && isTokenExpired(token.expiresAt)) {
        return { ...token, status: 'expired' as const }
      }
      return token
    })
  }

  const filteredTokens = getProcessedTokens().filter((token) =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeTokens = filteredTokens.filter(t => t.status === 'active')

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <LockKey weight="duotone" className="w-10 h-10 text-primary" />
                <div className="absolute inset-0 blur-xl bg-primary/30 rounded-full" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Token Vault</h1>
                <p className="text-sm text-muted-foreground">Secure API Token Management</p>
              </div>
            </div>

            {tokensList.length > 0 && (
              <Button 
                size="lg" 
                onClick={() => setCreateDialogOpen(true)}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus weight="bold" className="mr-2" />
                Create Token
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {tokensList.length === 0 ? (
          <EmptyState onCreateToken={() => setCreateDialogOpen(true)} />
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-card/50 backdrop-blur-sm border border-border/50">
              <TabsTrigger value="tokens" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <LockKey weight="duotone" className="mr-2" />
                Tokens ({activeTokens.length})
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <ShieldCheck weight="duotone" className="mr-2" />
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tokens" className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <MagnifyingGlass 
                    weight="duotone" 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="search-tokens"
                    placeholder="Search tokens..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-card/50 border-border/50"
                  />
                </div>
              </div>

              {filteredTokens.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No tokens found matching your search</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredTokens.map((token, index) => (
                    <TokenCard
                      key={token.id}
                      token={token}
                      onView={handleViewToken}
                      onRevoke={handleRevokeToken}
                      onRefresh={handleRefreshToken}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="security">
              <SecurityDashboard tokens={getProcessedTokens()} events={eventsList} />
            </TabsContent>
          </Tabs>
        )}
      </main>

      <CreateTokenDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreateToken={handleCreateToken}
      />

      <TokenDetailsDialog
        token={selectedToken}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        onRevoke={handleRevokeToken}
        onRefresh={handleRefreshToken}
      />
    </div>
  )
}

export default App
