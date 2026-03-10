export type TokenType = 'access' | 'refresh' | 'api' | 'service'

export type TokenStatus = 'active' | 'expired' | 'revoked'

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
}

export interface TokenUsage {
  date: string
  count: number
  endpoint?: string
}

export interface SecurityEvent {
  id: string
  type: 'created' | 'revoked' | 'used' | 'failed' | 'expired' | 'refreshed'
  tokenId: string
  tokenName: string
  timestamp: string
  details: string
}
