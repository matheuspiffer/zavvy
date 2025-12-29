import { createAuthClient } from 'better-auth/react'
import { organizationClient } from 'better-auth/client/plugins'

// Vite environment type declaration
interface ViteEnv {
  VITE_API_URL?: string
}

interface ImportMetaWithEnv {
  env?: ViteEnv
}

// URL is configured via Vite's import.meta.env in consuming apps
// For SSR safety, we default to localhost
const getBaseURL = (): string => {
  if (typeof window === 'undefined') {
    return 'http://localhost:3002'
  }
  // In browser, try to get from Vite env or use default
  try {
    const meta = import.meta as ImportMetaWithEnv
    return meta.env?.VITE_API_URL || 'http://localhost:3002'
  } catch {
    return 'http://localhost:3002'
  }
}

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  plugins: [organizationClient()],
})

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  organization: organizationApi,
} = authClient
