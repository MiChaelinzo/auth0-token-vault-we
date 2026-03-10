import { MarketplaceListing, Token } from './types'
import { v4 as uuidv4 } from 'uuid'

export const generateSampleListings = (userTokens: Token[] = []): MarketplaceListing[] => {
  const sampleListings: MarketplaceListing[] = [
    {
      id: uuidv4(),
      tokenId: uuidv4(),
      token: {
        id: uuidv4(),
        name: 'GitHub Enterprise API',
        type: 'api',
        value: 'ghp_' + generateRandomString(36),
        status: 'listed',
        scopes: ['read:data', 'write:data'],
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        usageCount: 145,
      },
      sellerId: 'seller-1',
      sellerName: 'devmaster',
      price: 299.99,
      description: 'Premium GitHub Enterprise access token with full read/write permissions. Ideal for automation workflows and CI/CD pipelines.',
      category: 'Development Tools',
      rating: 4.8,
      reviewCount: 23,
      listedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      featured: true,
      views: 456,
      status: 'active',
    },
    {
      id: uuidv4(),
      tokenId: uuidv4(),
      token: {
        id: uuidv4(),
        name: 'Stripe Payment Gateway',
        type: 'service',
        value: 'sk_live_' + generateRandomString(48),
        status: 'listed',
        scopes: ['read:user', 'write:user'],
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        lastUsed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
        usageCount: 89,
      },
      sellerId: 'seller-2',
      sellerName: 'paymentpro',
      price: 499.99,
      description: 'Live Stripe API key for production payment processing. Verified merchant account with high transaction limits.',
      category: 'Payment Processing',
      rating: 4.9,
      reviewCount: 41,
      listedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      featured: true,
      views: 789,
      status: 'active',
    },
    {
      id: uuidv4(),
      tokenId: uuidv4(),
      token: {
        id: uuidv4(),
        name: 'AWS S3 Storage Access',
        type: 'access',
        value: 'AKIA' + generateRandomString(16),
        status: 'listed',
        scopes: ['read:data', 'write:data'],
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        lastUsed: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        usageCount: 234,
      },
      sellerId: 'seller-3',
      sellerName: 'cloudkeeper',
      price: 199.99,
      description: 'AWS S3 bucket access credentials with 500GB storage. Perfect for backup solutions and media hosting.',
      category: 'Cloud Storage',
      rating: 4.6,
      reviewCount: 18,
      listedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      featured: false,
      views: 234,
      status: 'active',
    },
    {
      id: uuidv4(),
      tokenId: uuidv4(),
      token: {
        id: uuidv4(),
        name: 'OpenAI GPT-4 API',
        type: 'api',
        value: 'sk-' + generateRandomString(48),
        status: 'listed',
        scopes: ['admin:all'],
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        lastUsed: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        usageCount: 567,
      },
      sellerId: 'seller-4',
      sellerName: 'aiwhisperer',
      price: 899.99,
      description: 'High-tier OpenAI API key with GPT-4 access. Includes $500 credit balance. Great for AI applications and chatbots.',
      category: 'AI/ML',
      rating: 5.0,
      reviewCount: 67,
      listedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      featured: true,
      views: 1234,
      status: 'active',
    },
    {
      id: uuidv4(),
      tokenId: uuidv4(),
      token: {
        id: uuidv4(),
        name: 'Twilio SMS Gateway',
        type: 'service',
        value: 'SK' + generateRandomString(32),
        status: 'listed',
        scopes: ['write:user'],
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        lastUsed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        expiresAt: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(),
        usageCount: 312,
      },
      sellerId: 'seller-5',
      sellerName: 'smsking',
      price: 149.99,
      description: 'Twilio API credentials for SMS and voice services. Includes free message credits worth $50.',
      category: 'Communication',
      rating: 4.7,
      reviewCount: 29,
      listedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      featured: false,
      views: 345,
      status: 'active',
    },
    {
      id: uuidv4(),
      tokenId: uuidv4(),
      token: {
        id: uuidv4(),
        name: 'SendGrid Email API',
        type: 'api',
        value: 'SG.' + generateRandomString(68),
        status: 'listed',
        scopes: ['write:data'],
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        usageCount: 178,
      },
      sellerId: 'seller-2',
      sellerName: 'paymentpro',
      price: 99.99,
      description: 'SendGrid transactional email API key. Send up to 100,000 emails per month with high deliverability.',
      category: 'Communication',
      rating: 4.5,
      reviewCount: 15,
      listedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      featured: false,
      views: 189,
      status: 'active',
    },
  ]

  return sampleListings
}

function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export const getListingCategories = (): string[] => {
  return [
    'All Categories',
    'Development Tools',
    'Payment Processing',
    'Cloud Storage',
    'AI/ML',
    'Communication',
    'Analytics',
    'Security',
  ]
}

export const sortListings = (
  listings: MarketplaceListing[],
  sortBy: 'price-asc' | 'price-desc' | 'popular' | 'newest' | 'rating'
): MarketplaceListing[] => {
  const sorted = [...listings]
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'popular':
      return sorted.sort((a, b) => b.views - a.views)
    case 'newest':
      return sorted.sort((a, b) => new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime())
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    default:
      return sorted
  }
}
