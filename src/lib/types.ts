export type TokenType = 'access' | 'refresh' | 'api' | 'service'

export type TokenStatus = 'active' | 'expired' | 'revoked' | 'listed'

export type TokenScope = 
  | 'read:user' 
  | 'write:user' 
  | 'read:data' 
  | 'write:data' 
  | 'admin:all'
  | 'delete:resources'

export interface Token {
  id: string
  name: string
  type: TokenType
  value: string
  status: TokenStatus
  scopes: TokenScope[]
  createdAt: string
  lastUsed: string | null
  expiresAt: string | null
  usageCount: number
  ownerId?: string
  listedPrice?: number
}

export interface TokenUsage {
  date: string
  count: number
  endpoint?: string
}

export interface SecurityEvent {
  id: string
  type: 'created' | 'revoked' | 'used' | 'failed' | 'expired' | 'refreshed' | 'listed' | 'sold' | 'purchased' | 'delisted'
  tokenId: string
  tokenName: string
  timestamp: string
  details: string
}

export interface MarketplaceListing {
  id: string
  tokenId: string
  token: Token
  sellerId: string
  sellerName: string
  price: number
  description: string
  category: string
  rating: number
  reviewCount: number
  listedAt: string
  featured: boolean
  views: number
  status: 'active' | 'sold' | 'delisted'
}

export interface Transaction {
  id: string
  listingId: string
  tokenId: string
  tokenName: string
  buyerId: string
  buyerName: string
  sellerId: string
  sellerName: string
  price: number
  timestamp: string
  status: 'completed' | 'pending' | 'failed'
}

export interface UserBalance {
  userId: string
  balance: number
  totalEarnings: number
  totalSpent: number
}
