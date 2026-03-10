import { useState, useMemo } from 'react'
import { MarketplaceListing } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ListingCard } from '@/components/ListingCard'
import { MagnifyingGlass, Funnel, SortAscending, Storefront } from '@phosphor-icons/react'
import { getListingCategories, sortListings } from '@/lib/marketplace-utils'

interface MarketplaceBrowseProps {
  listings: MarketplaceListing[]
  onPurchase: (listing: MarketplaceListing) => void
  onViewDetails: (listing: MarketplaceListing) => void
}

export function MarketplaceBrowse({ listings, onPurchase, onViewDetails }: MarketplaceBrowseProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'popular' | 'newest' | 'rating'>('popular')
  const [priceRange, setPriceRange] = useState<'all' | 'under-100' | '100-500' | 'over-500'>('all')

  const categories = getListingCategories()

  const filteredAndSortedListings = useMemo(() => {
    let filtered = listings

    if (searchQuery) {
      filtered = filtered.filter((listing) =>
        listing.token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.sellerName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter((listing) => listing.category === selectedCategory)
    }

    switch (priceRange) {
      case 'under-100':
        filtered = filtered.filter((listing) => listing.price < 100)
        break
      case '100-500':
        filtered = filtered.filter((listing) => listing.price >= 100 && listing.price <= 500)
        break
      case 'over-500':
        filtered = filtered.filter((listing) => listing.price > 500)
        break
    }

    return sortListings(filtered, sortBy)
  }, [listings, searchQuery, selectedCategory, sortBy, priceRange])

  const featuredListings = listings.filter((listing) => listing.featured).slice(0, 3)

  return (
    <div className="space-y-6">
      {featuredListings.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Storefront weight="duotone" className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold">Featured Listings</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mb-8">
            {featuredListings.map((listing, index) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onPurchase={onPurchase}
                onViewDetails={onViewDetails}
                index={index}
              />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <MagnifyingGlass 
              weight="duotone" 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="search-marketplace"
              placeholder="Search tokens, sellers, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/50 border-border/50"
            />
          </div>

          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px] bg-card/50">
                <Funnel weight="duotone" className="mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={(value: typeof priceRange) => setPriceRange(value)}>
              <SelectTrigger className="w-[140px] bg-card/50">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-100">Under $100</SelectItem>
                <SelectItem value="100-500">$100 - $500</SelectItem>
                <SelectItem value="over-500">Over $500</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value: typeof sortBy) => setSortBy(value)}>
              <SelectTrigger className="w-[140px] bg-card/50">
                <SortAscending weight="duotone" className="mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>{filteredAndSortedListings.length} listings found</p>
          {(searchQuery || selectedCategory !== 'All Categories' || priceRange !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All Categories')
                setPriceRange('all')
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {filteredAndSortedListings.length === 0 ? (
        <div className="text-center py-16">
          <Storefront weight="duotone" className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No listings found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredAndSortedListings.map((listing, index) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onPurchase={onPurchase}
              onViewDetails={onViewDetails}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  )
}
