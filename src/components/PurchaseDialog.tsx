import { MarketplaceListing } from '@/lib/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/marketplace-utils'
import { ShoppingCart, Warning, CurrencyDollar, Check } from '@phosphor-icons/react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface PurchaseDialogProps {
  listing: MarketplaceListing | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  userBalance: number
}

export function PurchaseDialog({
  listing,
  open,
  onOpenChange,
  onConfirm,
  userBalance,
}: PurchaseDialogProps) {
  if (!listing) return null

  const canAfford = userBalance >= listing.price
  const remainingBalance = userBalance - listing.price

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart weight="duotone" className="w-6 h-6 text-primary" />
            Confirm Purchase
          </DialogTitle>
          <DialogDescription>
            Review your purchase details before confirming
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{listing.token.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {listing.description}
                </p>
              </div>
              <Badge className="ml-2">{listing.token.type}</Badge>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {listing.token.scopes.map((scope) => (
                <Badge key={scope} variant="outline" className="text-xs">
                  {scope}
                </Badge>
              ))}
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Seller</span>
                <span className="font-mono">{listing.sellerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span>{listing.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rating</span>
                <span>{listing.rating} / 5.0 ({listing.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-card border border-border/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current Balance</span>
                <span className="font-mono">{formatPrice(userBalance)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Purchase Price</span>
                <span className="text-2xl font-bold text-accent">
                  {formatPrice(listing.price)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="font-medium">Remaining Balance</span>
                <span className={`font-mono ${!canAfford ? 'text-destructive' : 'text-chart-5'}`}>
                  {formatPrice(remainingBalance)}
                </span>
              </div>
            </div>

            {!canAfford && (
              <Alert variant="destructive">
                <Warning weight="fill" className="h-4 w-4" />
                <AlertDescription>
                  Insufficient balance. You need {formatPrice(listing.price - userBalance)} more to complete this purchase.
                </AlertDescription>
              </Alert>
            )}

            {canAfford && (
              <Alert className="border-chart-5/50 bg-chart-5/10">
                <Check weight="bold" className="h-4 w-4 text-chart-5" />
                <AlertDescription className="text-chart-5">
                  This token will be added to your vault immediately after purchase.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
            disabled={!canAfford}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <CurrencyDollar weight="bold" className="mr-2" />
            Confirm Purchase
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
