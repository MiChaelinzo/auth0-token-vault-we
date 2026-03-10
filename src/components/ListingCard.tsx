import { MarketplaceListing } from '@/lib/types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Star, Eye, TrendUp } from '@phosphor-icons/react'
import { formatPrice } from '@/lib/marketplace-utils'
import { motion } from 'framer-motion'

interface ListingCardProps {
  listing: MarketplaceListing
  onPurchase: (listing: MarketplaceListing) => void
  onViewDetails: (listing: MarketplaceListing) => void
  index: number
}

export function ListingCard({ listing, onPurchase, onViewDetails, index }: ListingCardProps) {
  const getTypeBadgeColor = () => {
    switch (listing.token.type) {
      case 'api':
        return 'bg-primary/20 text-primary border-primary/30'
      case 'service':
        return 'bg-accent/20 text-accent-foreground border-accent/30'
      case 'access':
        return 'bg-chart-3/20 text-chart-3 border-chart-3/30'
      case 'refresh':
        return 'bg-chart-5/20 text-chart-5 border-chart-5/30'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card 
        className="group hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--primary),0.2)] cursor-pointer bg-card/80 backdrop-blur-sm relative overflow-hidden"
        onClick={() => onViewDetails(listing)}
      >
        {listing.featured && (
          <div className="absolute top-0 right-0 bg-gradient-to-bl from-accent/30 to-transparent p-6">
            <TrendUp weight="bold" className="w-5 h-5 text-accent" />
          </div>
        )}
        
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {listing.token.name}
            </CardTitle>
            <Badge className={getTypeBadgeColor()}>
              {listing.token.type}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star weight="fill" className="w-4 h-4 text-amber-400" />
              <span>{listing.rating.toFixed(1)}</span>
              <span>({listing.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye weight="duotone" className="w-4 h-4" />
              <span>{listing.views}</span>
            </div>
          </div>

          <CardDescription className="line-clamp-2">
            {listing.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {listing.token.scopes.slice(0, 3).map((scope) => (
              <Badge key={scope} variant="outline" className="text-xs">
                {scope}
              </Badge>
            ))}
            {listing.token.scopes.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{listing.token.scopes.length - 3}
              </Badge>
            )}
          </div>

          <div className="text-xs text-muted-foreground">
            Seller: <span className="font-mono text-foreground">{listing.sellerName}</span>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-border/50 pt-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-accent">
              {formatPrice(listing.price)}
            </span>
            <span className="text-xs text-muted-foreground">one-time payment</span>
          </div>
          
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onPurchase(listing)
            }}
            className="bg-primary hover:bg-primary/90"
          >
            <ShoppingCart weight="bold" className="mr-2" />
            Buy Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
