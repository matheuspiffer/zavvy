// Re-export server auth for API usage
export { auth, type Session, type User } from './server'

// Re-export client auth for React apps
export {
  authClient,
  signIn,
  signOut,
  signUp,
  useSession,
  organizationApi,
} from './client'
