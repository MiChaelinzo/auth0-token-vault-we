import { Transaction } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatPrice } from '@/lib/marketplace-utils'
import { Receipt, ShoppingCart, CurrencyDollar, ArrowDown, ArrowUp } from '@phosphor-icons/react'
import { format } from 'date-fns'

interface TransactionsViewProps {
  transactions: Transaction[]
  currentUserId: string
}

export function TransactionsView({ transactions, currentUserId }: TransactionsViewProps) {
  const purchases = transactions.filter((t) => t.buyerId === currentUserId)
  const sales = transactions.filter((t) => t.sellerId === currentUserId)

  const totalSpent = purchases.reduce((sum, t) => sum + t.price, 0)
  const totalEarned = sales.reduce((sum, t) => sum + t.price, 0)

  const TransactionCard = ({ transaction, type }: { transaction: Transaction; type: 'buy' | 'sell' }) => (
    <Card className="bg-card/50">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {type === 'buy' ? (
                <ArrowDown weight="bold" className="w-4 h-4 text-destructive" />
              ) : (
                <ArrowUp weight="bold" className="w-4 h-4 text-chart-5" />
              )}
              <h3 className="font-semibold">{transaction.tokenName}</h3>
            </div>
            <div className="text-sm text-muted-foreground space-y-0.5">
              <p>
                {type === 'buy' ? 'Purchased from' : 'Sold to'}{' '}
                <span className="font-mono text-foreground">
                  {type === 'buy' ? transaction.sellerName : transaction.buyerName}
                </span>
              </p>
              <p>{format(new Date(transaction.timestamp), 'PPp')}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-xl font-bold ${type === 'buy' ? 'text-destructive' : 'text-chart-5'}`}>
              {type === 'buy' ? '-' : '+'}{formatPrice(transaction.price)}
            </p>
            <Badge 
              variant={transaction.status === 'completed' ? 'default' : 'secondary'}
              className="mt-1"
            >
              {transaction.status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Receipt weight="duotone" />
              Total Transactions
            </CardDescription>
            <CardTitle className="text-3xl">{transactions.length}</CardTitle>
          </CardHeader>
        </Card>

        <Card className="bg-gradient-to-br from-destructive/10 to-card border-destructive/20">
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <ShoppingCart weight="duotone" />
              Total Spent
            </CardDescription>
            <CardTitle className="text-3xl text-destructive">{formatPrice(totalSpent)}</CardTitle>
          </CardHeader>
        </Card>

        <Card className="bg-gradient-to-br from-chart-5/10 to-card border-chart-5/20">
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <CurrencyDollar weight="duotone" />
              Total Earned
            </CardDescription>
            <CardTitle className="text-3xl text-chart-5">{formatPrice(totalEarned)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-card/50 backdrop-blur-sm border border-border/50">
          <TabsTrigger value="all">
            All ({transactions.length})
          </TabsTrigger>
          <TabsTrigger value="purchases">
            Purchases ({purchases.length})
          </TabsTrigger>
          <TabsTrigger value="sales">
            Sales ({sales.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {transactions.length === 0 ? (
            <Card className="bg-card/30">
              <CardContent className="pt-6 text-center py-12">
                <Receipt weight="duotone" className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No transactions yet</h3>
                <p className="text-muted-foreground">
                  Your purchase and sale history will appear here
                </p>
              </CardContent>
            </Card>
          ) : (
            <ScrollArea className="h-[600px]">
              <div className="space-y-3 pr-4">
                {transactions
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .map((transaction) => (
                    <TransactionCard
                      key={transaction.id}
                      transaction={transaction}
                      type={transaction.buyerId === currentUserId ? 'buy' : 'sell'}
                    />
                  ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>

        <TabsContent value="purchases" className="space-y-4">
          {purchases.length === 0 ? (
            <Card className="bg-card/30">
              <CardContent className="pt-6 text-center py-12">
                <ShoppingCart weight="duotone" className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No purchases yet</h3>
                <p className="text-muted-foreground">
                  Browse the marketplace to find tokens for your projects
                </p>
              </CardContent>
            </Card>
          ) : (
            <ScrollArea className="h-[600px]">
              <div className="space-y-3 pr-4">
                {purchases
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .map((transaction) => (
                    <TransactionCard key={transaction.id} transaction={transaction} type="buy" />
                  ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          {sales.length === 0 ? (
            <Card className="bg-card/30">
              <CardContent className="pt-6 text-center py-12">
                <CurrencyDollar weight="duotone" className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No sales yet</h3>
                <p className="text-muted-foreground">
                  List your tokens in the marketplace to start earning
                </p>
              </CardContent>
            </Card>
          ) : (
            <ScrollArea className="h-[600px]">
              <div className="space-y-3 pr-4">
                {sales
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .map((transaction) => (
                    <TransactionCard key={transaction.id} transaction={transaction} type="sell" />
                  ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
