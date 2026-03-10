import { useState, useEffect, useRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { Token, TokenType, TokenScope, SecurityEvent, MarketplaceListing, Transaction, UserBalance } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TokenCard } from '@/components/TokenCard'
import { CreateTokenDialog } from '@/components/CreateTokenDialog'
import { TokenDetailsDialog } from '@/components/TokenDetailsDialog'
import { SecurityDashboard } from '@/components/SecurityDashboard'
import { EmptyState } from '@/components/EmptyState'
import { MarketplaceBrowse } from '@/components/MarketplaceBrowse'
import { PurchaseDialog } from '@/components/PurchaseDialog'
import { TransactionsView } from '@/components/TransactionsView'
import { TokenAnalytics } from '@/components/TokenAnalytics'
import { ListForSaleDialog } from '@/components/ListForSaleDialog'
import { LockKey, Plus, ShieldCheck, MagnifyingGlass, Storefront, Receipt, CurrencyDollar, Wallet, DotsThree, DownloadSimple, UploadSimple, ChartBar } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { isTokenExpired, refreshTokenValue, getExpirationDate } from '@/lib/token-utils'
import { generateSampleListings, formatPrice } from '@/lib/marketplace-utils'
import { downloadVaultBackup, importVaultData } from '@/lib/export-utils'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [tokens, setTokens] = useKV<Token[]>('tokens', [])
  const [events, setEvents] = useKV<SecurityEvent[]>('security-events', [])
  const [marketplaceListings, setMarketplaceListings] = useKV<MarketplaceListing[]>('marketplace-listings', [])
  const [transactions, setTransactions] = useKV<Transaction[]>('transactions', [])
  const [userBalance, setUserBalance] = useKV<UserBalance>('user-balance', {
    userId: 'current-user',
    balance: 5000,
    totalEarnings: 0,
    totalSpent: 0,
  })
  
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false)
  const [listForSaleDialogOpen, setListForSaleDialogOpen] = useState(false)
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('vault')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const tokensList = tokens || []
  const eventsList = events || []
  const listingsList = marketplaceListings || []
  const transactionsList = transactions || []
  const balance = userBalance || { userId: 'current-user', balance: 5000, totalEarnings: 0, totalSpent: 0 }

  useEffect(() => {
    if (listingsList.length === 0) {
      setMarketplaceListings(generateSampleListings())
    }
  }, [])

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
      ownerId: 'current-user',
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

  const handlePurchaseListing = (listing: MarketplaceListing) => {
    setSelectedListing(listing)
    setPurchaseDialogOpen(true)
  }

  const handleConfirmPurchase = () => {
    if (!selectedListing || balance.balance < selectedListing.price) return

    const purchasedToken: Token = {
      ...selectedListing.token,
      id: uuidv4(),
      ownerId: 'current-user',
      status: 'active',
    }

    setTokens((currentTokens) => [...(currentTokens || []), purchasedToken])

    setUserBalance((currentBalance) => ({
      ...currentBalance!,
      balance: currentBalance!.balance - selectedListing.price,
      totalSpent: currentBalance!.totalSpent + selectedListing.price,
    }))

    const newTransaction: Transaction = {
      id: uuidv4(),
      listingId: selectedListing.id,
      tokenId: purchasedToken.id,
      tokenName: selectedListing.token.name,
      buyerId: 'current-user',
      buyerName: 'You',
      sellerId: selectedListing.sellerId,
      sellerName: selectedListing.sellerName,
      price: selectedListing.price,
      timestamp: new Date().toISOString(),
      status: 'completed',
    }

    setTransactions((currentTransactions) => [newTransaction, ...(currentTransactions || [])])

    setMarketplaceListings((currentListings) =>
      (currentListings || []).filter((l) => l.id !== selectedListing.id)
    )

    const newEvent: SecurityEvent = {
      id: uuidv4(),
      type: 'purchased',
      tokenId: purchasedToken.id,
      tokenName: purchasedToken.name,
      timestamp: new Date().toISOString(),
      details: `Purchased from ${selectedListing.sellerName} for ${formatPrice(selectedListing.price)}`,
    }
    setEvents((currentEvents) => [newEvent, ...(currentEvents || [])])

    toast.success(`Token "${selectedListing.token.name}" purchased successfully`, {
      description: `Added to your vault. Remaining balance: ${formatPrice(balance.balance - selectedListing.price)}`,
    })

    setSelectedListing(null)
  }

  const handleViewListingDetails = (listing: MarketplaceListing) => {
    toast.info('Listing details', {
      description: `${listing.token.name} - ${listing.description.substring(0, 80)}...`,
    })
  }

  const handleExportData = () => {
    downloadVaultBackup(tokensList, eventsList, transactionsList, balance)
    toast.success('Vault data exported successfully', {
      description: 'Your backup file has been downloaded',
    })
  }

  const handleImportData = async () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const backup = await importVaultData(file)
      
      setTokens(backup.tokens)
      setEvents(backup.events)
      setTransactions(backup.transactions)
      setUserBalance(backup.balance)

      toast.success('Vault data imported successfully', {
        description: `Restored ${backup.tokens.length} tokens and ${backup.transactions.length} transactions`,
      })
    } catch (error) {
      toast.error('Failed to import vault data', {
        description: error instanceof Error ? error.message : 'Invalid backup file',
      })
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleListTokenForSale = (token: Token) => {
    setSelectedToken(token)
    setListForSaleDialogOpen(true)
  }

  const handleConfirmListing = (tokenId: string, price: number, description: string, category: string) => {
    const token = tokensList.find((t) => t.id === tokenId)
    if (!token) return

    const newListing: MarketplaceListing = {
      id: uuidv4(),
      tokenId: token.id,
      token: { ...token, status: 'listed' },
      sellerId: 'current-user',
      sellerName: 'You',
      price,
      description,
      category,
      rating: 0,
      reviewCount: 0,
      listedAt: new Date().toISOString(),
      featured: false,
      views: 0,
      status: 'active',
    }

    setMarketplaceListings((currentListings) => [newListing, ...(currentListings || [])])

    setTokens((currentTokens) =>
      (currentTokens || []).map((t) =>
        t.id === tokenId ? { ...t, status: 'listed' as const, listedPrice: price } : t
      )
    )

    const newEvent: SecurityEvent = {
      id: uuidv4(),
      type: 'listed',
      tokenId: token.id,
      tokenName: token.name,
      timestamp: new Date().toISOString(),
      details: `Listed for sale at ${formatPrice(price)} in ${category}`,
    }
    setEvents((currentEvents) => [newEvent, ...(currentEvents || [])])

    toast.success(`Token "${token.name}" listed for sale`, {
      description: `Now available in marketplace for ${formatPrice(price)}`,
    })
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
                <p className="text-sm text-muted-foreground">Secure Token Management & Marketplace</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border/50 px-4 py-2 rounded-lg">
                <Wallet weight="duotone" className="w-5 h-5 text-chart-5" />
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Balance</p>
                  <p className="font-mono font-semibold text-lg text-chart-5">
                    {formatPrice(balance.balance)}
                  </p>
                </div>
              </div>

              {tokensList.length > 0 && (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="lg">
                        <DotsThree weight="bold" className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={handleExportData}>
                        <DownloadSimple weight="duotone" className="mr-2" />
                        Export Vault Data
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleImportData}>
                        <UploadSimple weight="duotone" className="mr-2" />
                        Import Vault Data
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setActiveTab('analytics')}>
                        <ChartBar weight="duotone" className="mr-2" />
                        View Analytics
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button 
                    size="lg" 
                    onClick={() => setCreateDialogOpen(true)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Plus weight="bold" className="mr-2" />
                    Create Token
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <main className="container mx-auto px-4 py-8">
        {tokensList.length === 0 && activeTab === 'vault' ? (
          <EmptyState onCreateToken={() => setCreateDialogOpen(true)} />
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-card/50 backdrop-blur-sm border border-border/50">
              <TabsTrigger value="vault" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <LockKey weight="duotone" className="mr-2" />
                My Vault ({activeTokens.length})
              </TabsTrigger>
              <TabsTrigger value="marketplace" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Storefront weight="duotone" className="mr-2" />
                Marketplace ({listingsList.length})
              </TabsTrigger>
              <TabsTrigger value="transactions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Receipt weight="duotone" className="mr-2" />
                Transactions ({transactionsList.length})
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <ChartBar weight="duotone" className="mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <ShieldCheck weight="duotone" className="mr-2" />
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vault" className="space-y-6">
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

            <TabsContent value="marketplace">
              <MarketplaceBrowse
                listings={listingsList}
                onPurchase={handlePurchaseListing}
                onViewDetails={handleViewListingDetails}
              />
            </TabsContent>

            <TabsContent value="transactions">
              <TransactionsView
                transactions={transactionsList}
                currentUserId="current-user"
              />
            </TabsContent>

            <TabsContent value="analytics">
              <TokenAnalytics tokens={getProcessedTokens()} />
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

      <PurchaseDialog
        listing={selectedListing}
        open={purchaseDialogOpen}
        onOpenChange={setPurchaseDialogOpen}
        onConfirm={handleConfirmPurchase}
        userBalance={balance.balance}
      />

      <ListForSaleDialog
        token={selectedToken}
        open={listForSaleDialogOpen}
        onOpenChange={setListForSaleDialogOpen}
        onList={handleConfirmListing}
      />
    </div>
  )
}

export default App
