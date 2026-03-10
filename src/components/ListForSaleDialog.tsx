import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Token } from '@/lib/types'
import { CurrencyDollar, Storefront, Tag } from '@phosphor-icons/react'
import { getListingCategories } from '@/lib/marketplace-utils'

interface ListForSaleDialogProps {
  token: Token | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onList: (tokenId: string, price: number, description: string, category: string) => void
}

export function ListForSaleDialog({ token, open, onOpenChange, onList }: ListForSaleDialogProps) {
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Development Tools')

  const categories = getListingCategories().filter((c) => c !== 'All Categories')

  const handleSubmit = () => {
    if (!token || !price || !description) return

    const priceNumber = parseFloat(price)
    if (isNaN(priceNumber) || priceNumber <= 0 || priceNumber > 10000) {
      return
    }

    onList(token.id, priceNumber, description, category)
    setPrice('')
    setDescription('')
    setCategory('Development Tools')
    onOpenChange(false)
  }

  const isValid = token && price && description && parseFloat(price) > 0 && parseFloat(price) <= 10000

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Storefront weight="duotone" className="w-6 h-6 text-primary" />
            <DialogTitle>List Token for Sale</DialogTitle>
          </div>
          <DialogDescription>
            Create a marketplace listing to sell this token to other users
          </DialogDescription>
        </DialogHeader>

        {token && (
          <div className="space-y-6 py-4">
            <div className="p-4 bg-muted/30 rounded-lg border border-border/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">{token.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {token.type} • {token.scopes.length} scope(s)
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Usage</p>
                  <p className="font-mono text-sm font-medium">{token.usageCount}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="listing-price" className="flex items-center gap-2">
                <CurrencyDollar weight="duotone" className="w-4 h-4" />
                Price
              </Label>
              <Input
                id="listing-price"
                type="number"
                placeholder="299.99"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0.01"
                max="10000"
                step="0.01"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Set a price between $0.01 and $10,000
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="listing-category" className="flex items-center gap-2">
                <Tag weight="duotone" className="w-4 h-4" />
                Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="listing-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="listing-description">
                Description
              </Label>
              <Textarea
                id="listing-description"
                placeholder="Describe what makes this token valuable, what it includes, and any special features..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                {description.length} / 500 characters
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isValid}
            className="bg-primary hover:bg-primary/90"
          >
            <Storefront weight="duotone" className="mr-2" />
            List for Sale
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
