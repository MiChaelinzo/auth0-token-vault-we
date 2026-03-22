import { Token } from './types'
import { isTokenExpired } from './token-utils'

export interface HealthScore {
  score: number
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  issues: HealthIssue[]
  recommendations: string[]
}

export interface HealthIssue {
  severity: 'high' | 'medium' | 'low'
  message: string
  type: 'expiration' | 'scope' | 'usage' | 'security'
}

export const calculateTokenHealth = (token: Token): HealthScore => {
  let score = 100
  const issues: HealthIssue[] = []
  const recommendations: string[] = []

  if (token.status === 'revoked') {
    score = 0
    return {
      score,
      grade: 'F',
      issues: [{ severity: 'high', message: 'Token is revoked', type: 'security' }],
      recommendations: ['Create a new token to restore access'],
    }
  }

  if (token.expiresAt) {
    const now = new Date()
    const expiresAt = new Date(token.expiresAt)
    const daysUntilExpiration = Math.floor((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    if (isTokenExpired(token.expiresAt)) {
      score -= 50
      issues.push({
        severity: 'high',
        message: 'Token has expired',
        type: 'expiration',
      })
      recommendations.push('Refresh or regenerate this token immediately')
    } else if (daysUntilExpiration <= 7) {
      score -= 20
      issues.push({
        severity: 'medium',
        message: `Token expires in ${daysUntilExpiration} day${daysUntilExpiration !== 1 ? 's' : ''}`,
        type: 'expiration',
      })
      recommendations.push('Consider refreshing this token soon')
    } else if (daysUntilExpiration <= 30) {
      score -= 10
      issues.push({
        severity: 'low',
        message: `Token expires in ${daysUntilExpiration} days`,
        type: 'expiration',
      })
    }
  } else {
    score -= 5
    issues.push({
      severity: 'low',
      message: 'Token has no expiration date',
      type: 'security',
    })
    recommendations.push('Consider setting an expiration date for better security')
  }

  if (token.scopes.includes('admin:all')) {
    score -= 15
    issues.push({
      severity: 'medium',
      message: 'Token has admin-level access',
      type: 'security',
    })
    recommendations.push('Verify that admin access is necessary for this token')
  }

  if (token.scopes.includes('delete:resources')) {
    score -= 10
    issues.push({
      severity: 'medium',
      message: 'Token can delete resources',
      type: 'security',
    })
    recommendations.push('Ensure delete permissions are required')
  }

  if (token.scopes.length > 4) {
    score -= 10
    issues.push({
      severity: 'low',
      message: 'Token has many scopes',
      type: 'scope',
    })
    recommendations.push('Consider limiting token permissions to only what is needed')
  }

  if (token.scopes.length === 0) {
    score -= 30
    issues.push({
      severity: 'high',
      message: 'Token has no scopes assigned',
      type: 'scope',
    })
    recommendations.push('Add appropriate scopes to this token')
  }

  if (!token.lastUsed) {
    score -= 5
    issues.push({
      severity: 'low',
      message: 'Token has never been used',
      type: 'usage',
    })
  } else {
    const lastUsed = new Date(token.lastUsed)
    const daysSinceUsed = Math.floor((new Date().getTime() - lastUsed.getTime()) / (1000 * 60 * 60 * 24))

    if (daysSinceUsed > 90) {
      score -= 15
      issues.push({
        severity: 'medium',
        message: 'Token has not been used in over 90 days',
        type: 'usage',
      })
      recommendations.push('Consider revoking unused tokens')
    } else if (daysSinceUsed > 30) {
      score -= 5
      issues.push({
        severity: 'low',
        message: 'Token has not been used recently',
        type: 'usage',
      })
    }
  }

  score = Math.max(0, Math.min(100, score))

  const grade: 'A' | 'B' | 'C' | 'D' | 'F' = 
    score >= 90 ? 'A' :
    score >= 80 ? 'B' :
    score >= 70 ? 'C' :
    score >= 60 ? 'D' : 'F'

  return {
    score,
    grade,
    issues,
    recommendations,
  }
}

export const getHealthColor = (score: number): string => {
  if (score >= 90) return 'text-chart-5'
  if (score >= 80) return 'text-primary'
  if (score >= 70) return 'text-accent'
  if (score >= 60) return 'text-warning'
  return 'text-destructive'
}

export const getHealthBadgeVariant = (score: number): 'default' | 'secondary' | 'destructive' | 'outline' => {
  if (score >= 80) return 'default'
  if (score >= 60) return 'secondary'
  return 'destructive'
}
