import { Context, Next } from 'hono'
import type { AuthContext } from './auth'

export type OrganizationContext = AuthContext & {
  Variables: AuthContext['Variables'] & {
    organizationId: string | null
  }
}

export async function organizationMiddleware(c: Context<OrganizationContext>, next: Next) {
  const session = c.get('session')

  if (!session) {
    c.set('organizationId', null)
    return next()
  }

  // Extract activeOrganizationId from the session
  // This is set by Better Auth's organization plugin
  const organizationId = session.activeOrganizationId || null

  c.set('organizationId', organizationId)

  return next()
}

export async function requireOrganization(c: Context<OrganizationContext>, next: Next) {
  const session = c.get('session')
  const user = c.get('user')

  if (!session || !user) {
    return c.json({ error: 'Unauthorized', message: 'Authentication required' }, 401)
  }

  const organizationId = session.activeOrganizationId

  if (!organizationId) {
    return c.json(
      { error: 'No Organization', message: 'No active organization selected' },
      403
    )
  }

  c.set('organizationId', organizationId)

  return next()
}
