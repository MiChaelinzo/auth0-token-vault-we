/**
 * Auth0 Token Vault Configuration
 *
 * This module configures the Auth0 authentication and Token Vault
 * integration for AI Agents. Token Vault securely stores and manages
 * third-party OAuth tokens, enabling AI agents to call external APIs
 * on behalf of authenticated users.
 *
 * Setup:
 * 1. Create an Auth0 tenant at https://manage.auth0.com
 * 2. Enable the Token Vault feature in your Auth0 dashboard
 * 3. Register this SPA application and a Custom API client
 * 4. Add third-party connections (Google, GitHub, etc.)
 * 5. Set the environment variables below
 */

export const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || '',
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || '',
  audience: import.meta.env.VITE_AUTH0_AUDIENCE || '',
  callbackUrl: import.meta.env.VITE_AUTH0_CALLBACK_URL || window.location.origin,
}

/** Whether Auth0 has been configured with valid credentials */
export function isAuth0Configured(): boolean {
  return Boolean(auth0Config.domain && auth0Config.clientId)
}

/** Supported third-party providers for Token Vault connected accounts */
export const TOKEN_VAULT_PROVIDERS = [
  {
    id: 'google-oauth2',
    name: 'Google',
    icon: '🔵',
    description: 'Access Google Calendar, Gmail, Drive, and other Google APIs',
    scopes: ['openid', 'profile', 'email', 'https://www.googleapis.com/auth/calendar.readonly'],
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '🐙',
    description: 'Access GitHub repositories, issues, and pull requests',
    scopes: ['openid', 'profile', 'read:user', 'repo'],
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    icon: '🟦',
    description: 'Access Microsoft 365, Outlook, and Azure services',
    scopes: ['openid', 'profile', 'email', 'User.Read', 'Calendars.Read'],
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: '💬',
    description: 'Access Slack workspaces, channels, and messages',
    scopes: ['openid', 'profile', 'email'],
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    icon: '☁️',
    description: 'Access Salesforce CRM data and APIs',
    scopes: ['openid', 'profile', 'email', 'api'],
  },
] as const

export type TokenVaultProvider = (typeof TOKEN_VAULT_PROVIDERS)[number]
