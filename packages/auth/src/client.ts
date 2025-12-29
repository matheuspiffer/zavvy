import { createAuthClient } from 'better-auth/react'
import { organizationClient } from 'better-auth/client/plugins'

// URL is configured via Vite's import.meta.env in consuming apps
// For SSR safety, we default to localhost
const getBaseURL = (): string => {
  if (typeof window === 'undefined') {
    return 'http://localhost:3002'
  }
  // In browser, try to get from Vite env or use default
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const env = (import.meta as any).env
    return env?.VITE_API_URL || 'http://localhost:3002'
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
