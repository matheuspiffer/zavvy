import { Context, Next } from 'hono'
import { auth } from '@zavvy/auth/server'

export type AuthContext = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}

export async function authMiddleware(c: Context<AuthContext>, next: Next) {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  })

  if (!session) {
    c.set('user', null)
    c.set('session', null)
    return next()
  }

  c.set('user', session.user)
  c.set('session', session.session)

  return next()
}

export async function requireAuth(c: Context<AuthContext>, next: Next) {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  })

  if (!session) {
    return c.json({ error: 'Unauthorized', message: 'Authentication required' }, 401)
  }

  c.set('user', session.user)
  c.set('session', session.session)

  return next()
}
