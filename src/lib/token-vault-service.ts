/**
 * Auth0 Token Vault Service
 *
 * This service layer provides methods for interacting with Auth0's
 * Token Vault feature. Token Vault enables AI agents to securely
 * access third-party API tokens on behalf of authenticated users.
 *
 * Flow:
 * 1. User authenticates with Auth0 and connects external accounts
 * 2. Auth0 stores OAuth tokens securely in the Token Vault
 * 3. AI agents request tokens via the Token Exchange endpoint
 * 4. Agents use tokens to call third-party APIs on the user's behalf
 *
 * Reference: https://auth0.com/ai/docs/intro/token-vault
 */

import { auth0Config, TOKEN_VAULT_PROVIDERS, type TokenVaultProvider } from './auth0-config'

export interface ConnectedAccount {
  provider: string
  providerName: string
  connectedAt: string
  status: 'active' | 'expired' | 'revoked'
  lastUsed: string | null
}

export interface TokenExchangeResult {
  accessToken: string
  tokenType: string
  expiresIn: number
  scope: string
  provider: string
}

export interface AIAgentAction {
  id: string
  name: string
  description: string
  provider: string
  requiredScopes: string[]
  icon: string
}

/** Pre-defined AI agent actions that use Token Vault */
export const AI_AGENT_ACTIONS: AIAgentAction[] = [
  {
    id: 'read-calendar',
    name: 'Read Calendar Events',
    description: 'AI agent reads upcoming calendar events to help plan your schedule',
    provider: 'google-oauth2',
    requiredScopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    icon: '📅',
  },
  {
    id: 'summarize-emails',
    name: 'Summarize Emails',
    description: 'AI agent summarizes your recent important emails',
    provider: 'google-oauth2',
    requiredScopes: ['https://www.googleapis.com/auth/gmail.readonly'],
    icon: '📧',
  },
  {
    id: 'list-repos',
    name: 'List Repositories',
    description: 'AI agent lists your GitHub repositories and recent activity',
    provider: 'github',
    requiredScopes: ['read:user', 'repo'],
    icon: '📦',
  },
  {
    id: 'review-prs',
    name: 'Review Pull Requests',
    description: 'AI agent reviews open pull requests and provides summaries',
    provider: 'github',
    requiredScopes: ['repo'],
    icon: '🔍',
  },
  {
    id: 'read-messages',
    name: 'Read Slack Messages',
    description: 'AI agent reads and summarizes recent Slack messages',
    provider: 'slack',
    requiredScopes: ['channels:history', 'channels:read'],
    icon: '💬',
  },
  {
    id: 'crm-insights',
    name: 'CRM Insights',
    description: 'AI agent analyzes Salesforce CRM data for sales insights',
    provider: 'salesforce',
    requiredScopes: ['api'],
    icon: '📊',
  },
]

/**
 * Get the provider configuration for a given provider ID.
 */
export function getProvider(providerId: string): TokenVaultProvider | undefined {
  return TOKEN_VAULT_PROVIDERS.find((p) => p.id === providerId)
}

/**
 * Build the authorization URL for connecting a new external account.
 * This initiates the OAuth flow through Auth0's Token Vault.
 */
export function buildConnectAccountUrl(
  providerId: string,
  userId: string,
  returnTo?: string
): string {
  const params = new URLSearchParams({
    connection: providerId,
    client_id: auth0Config.clientId,
    redirect_uri: returnTo || auth0Config.callbackUrl,
    response_type: 'code',
    scope: 'openid profile email',
    state: JSON.stringify({ action: 'connect_account', provider: providerId }),
  })

  return `https://${auth0Config.domain}/authorize?${params.toString()}`
}

/**
 * Exchange an Auth0 access token for a third-party provider token
 * using the Token Vault's Token Exchange endpoint (RFC 8693).
 *
 * In production, this call should be made from a secure backend.
 * The backend uses a confidential client (machine-to-machine)
 * to perform the token exchange with Auth0.
 */
export async function exchangeTokenForProvider(
  auth0AccessToken: string,
  providerId: string
): Promise<TokenExchangeResult> {
  const response = await fetch(`https://${auth0Config.domain}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
      subject_token: auth0AccessToken,
      subject_token_type: 'urn:ietf:params:oauth:token-type:access_token',
      requested_token_type: 'urn:ietf:params:oauth:token-type:access_token',
      audience: `https://${auth0Config.domain}/api/v2/`,
      scope: 'openid profile email',
      connection: providerId,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error_description || error.error || 'Token exchange failed')
  }

  const data = await response.json()
  return {
    accessToken: data.access_token,
    tokenType: data.token_type,
    expiresIn: data.expires_in,
    scope: data.scope,
    provider: providerId,
  }
}

/**
 * Simulate an AI agent action that uses Token Vault.
 * In production, this would call exchangeTokenForProvider()
 * then use the resulting token to call the third-party API.
 */
export function simulateAIAgentAction(action: AIAgentAction): {
  status: 'success' | 'needs_connection'
  message: string
  data?: Record<string, unknown>
} {
  const provider = getProvider(action.provider)
  if (!provider) {
    return {
      status: 'needs_connection',
      message: `Provider ${action.provider} is not configured`,
    }
  }

  // Simulate successful agent action
  const simulatedResponses: Record<string, Record<string, unknown>> = {
    'read-calendar': {
      events: [
        { title: 'Team Standup', time: '9:00 AM', duration: '30 min' },
        { title: 'Sprint Planning', time: '2:00 PM', duration: '1 hour' },
        { title: 'Code Review Session', time: '4:00 PM', duration: '45 min' },
      ],
      summary: 'You have 3 meetings today. The busiest period is in the afternoon.',
    },
    'summarize-emails': {
      emails: [
        { subject: 'Q4 Budget Approval', from: 'finance@company.com', priority: 'high' },
        { subject: 'New Feature Request', from: 'product@company.com', priority: 'medium' },
      ],
      summary: '2 important emails need attention. Q4 Budget requires immediate review.',
    },
    'list-repos': {
      repositories: [
        { name: 'auth0-token-vault', stars: 42, language: 'TypeScript' },
        { name: 'ai-agent-toolkit', stars: 128, language: 'Python' },
      ],
      summary: 'You have 2 active repositories. ai-agent-toolkit is trending.',
    },
    'review-prs': {
      pullRequests: [
        { title: 'Add Token Vault integration', status: 'open', reviewers: 2 },
        { title: 'Fix auth middleware', status: 'needs_review', reviewers: 0 },
      ],
      summary: '2 open PRs. "Fix auth middleware" needs reviewers.',
    },
    'read-messages': {
      channels: [
        { name: '#engineering', unread: 5 },
        { name: '#general', unread: 12 },
      ],
      summary: '17 unread messages across 2 channels. Engineering has important updates.',
    },
    'crm-insights': {
      deals: [
        { name: 'Enterprise Deal', stage: 'Negotiation', value: '$50,000' },
        { name: 'Startup Package', stage: 'Closed Won', value: '$5,000' },
      ],
      summary: 'Pipeline is healthy. Enterprise deal in negotiation stage.',
    },
  }

  return {
    status: 'success',
    message: `${action.name} completed successfully using Token Vault`,
    data: simulatedResponses[action.id] || { result: 'Action completed' },
  }
}
