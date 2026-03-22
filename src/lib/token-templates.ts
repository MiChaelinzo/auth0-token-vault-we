import { TokenType, TokenScope } from './types'

export interface TokenTemplate {
  id: string
  name: string
  service: string
  description: string
  icon: string
  type: TokenType
  defaultScopes: TokenScope[]
  expirationDays: number | null
  category: 'development' | 'finance' | 'cloud' | 'social' | 'productivity'
  popular: boolean
}

export const TOKEN_TEMPLATES: TokenTemplate[] = [
  {
    id: 'github-full',
    name: 'GitHub Full Access',
    service: 'GitHub',
    description: 'Complete repository and organization access',
    icon: '🔧',
    type: 'api',
    defaultScopes: ['read:data', 'write:data', 'read:user', 'write:user'],
    expirationDays: 90,
    category: 'development',
    popular: true,
  },
  {
    id: 'github-readonly',
    name: 'GitHub Read-Only',
    service: 'GitHub',
    description: 'Read-only access to repositories',
    icon: '📖',
    type: 'api',
    defaultScopes: ['read:data', 'read:user'],
    expirationDays: 30,
    category: 'development',
    popular: true,
  },
  {
    id: 'stripe-payments',
    name: 'Stripe Payments',
    service: 'Stripe',
    description: 'Payment processing and customer management',
    icon: '💳',
    type: 'api',
    defaultScopes: ['read:data', 'write:data'],
    expirationDays: null,
    category: 'finance',
    popular: true,
  },
  {
    id: 'openai-api',
    name: 'OpenAI API',
    service: 'OpenAI',
    description: 'Access to GPT models and AI endpoints',
    icon: '🤖',
    type: 'api',
    defaultScopes: ['read:data', 'write:data'],
    expirationDays: null,
    category: 'development',
    popular: true,
  },
  {
    id: 'aws-s3',
    name: 'AWS S3 Storage',
    service: 'AWS',
    description: 'Cloud storage and file management',
    icon: '☁️',
    type: 'service',
    defaultScopes: ['read:data', 'write:data', 'delete:resources'],
    expirationDays: 365,
    category: 'cloud',
    popular: false,
  },
  {
    id: 'sendgrid-email',
    name: 'SendGrid Email',
    service: 'SendGrid',
    description: 'Transactional email sending',
    icon: '📧',
    type: 'api',
    defaultScopes: ['write:data'],
    expirationDays: null,
    category: 'productivity',
    popular: false,
  },
  {
    id: 'twitter-api',
    name: 'Twitter/X API',
    service: 'Twitter',
    description: 'Post tweets and read social data',
    icon: '🐦',
    type: 'api',
    defaultScopes: ['read:data', 'write:data', 'read:user'],
    expirationDays: 30,
    category: 'social',
    popular: false,
  },
  {
    id: 'slack-bot',
    name: 'Slack Bot',
    service: 'Slack',
    description: 'Bot access for workspace automation',
    icon: '💬',
    type: 'service',
    defaultScopes: ['read:data', 'write:data', 'read:user'],
    expirationDays: null,
    category: 'productivity',
    popular: true,
  },
]

export const getTemplatesByCategory = (category: string) => {
  return TOKEN_TEMPLATES.filter(t => t.category === category)
}

export const getPopularTemplates = () => {
  return TOKEN_TEMPLATES.filter(t => t.popular)
}

export const getTemplateById = (id: string) => {
  return TOKEN_TEMPLATES.find(t => t.id === id)
}
