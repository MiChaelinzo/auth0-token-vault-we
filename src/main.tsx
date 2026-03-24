import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import { Auth0Provider } from '@auth0/auth0-react'
import "@github/spark/spark"

import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'
import { auth0Config, isAuth0Configured } from './lib/auth0-config.ts'

import "./main.css"
import "./styles/theme.css"
import "./index.css"

function Root() {
  if (isAuth0Configured()) {
    return (
      <Auth0Provider
        domain={auth0Config.domain}
        clientId={auth0Config.clientId}
        authorizationParams={{
          redirect_uri: auth0Config.callbackUrl,
          audience: auth0Config.audience || undefined,
          scope: 'openid profile email offline_access',
        }}
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <App />
        </ErrorBoundary>
      </Auth0Provider>
    )
  }

  // When Auth0 is not configured, render the app without the Auth0 provider
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <App />
    </ErrorBoundary>
  )
}

createRoot(document.getElementById('root')!).render(<Root />)
