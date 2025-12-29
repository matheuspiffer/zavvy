import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { auth } from '@zavvy/auth/server'
import {
  authMiddleware,
  requireAuth,
  organizationMiddleware,
  requireOrganization,
  type OrganizationContext,
} from './middleware'

// Create main app
const app = new Hono()

// Logging
app.use('*', logger())

// CORS configuration
app.use(
  '*',
  cors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
)

// Health check (public)
app.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }))

// Better Auth routes (public)
app.on(['GET', 'POST'], '/api/auth/**', (c) => auth.handler(c.req.raw))

// API v1 routes with auth middleware
const apiV1 = new Hono<OrganizationContext>()

// Apply auth middleware to all API v1 routes
apiV1.use('*', authMiddleware)
apiV1.use('*', organizationMiddleware)

// Public API info endpoint
apiV1.get('/', (c) => c.json({ message: 'Zavvy API v1', version: '0.0.1' }))

// Protected routes example - require auth and organization
apiV1.get('/me', requireAuth, requireOrganization, (c) => {
  const user = c.get('user')
  const organizationId = c.get('organizationId')
  return c.json({ user, organizationId })
})

// Mount API v1
app.route('/api/v1', apiV1)

const port = Number(process.env.PORT) || 3002

// Using logger() middleware instead of console.log
// Server startup is logged via the logger middleware
serve({
  fetch: app.fetch,
  port,
})
