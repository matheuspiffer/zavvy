import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { auth } from '@zavvy/auth/server'

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

// Health check
app.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }))

// Better Auth routes
app.on(['GET', 'POST'], '/api/auth/**', (c) => auth.handler(c.req.raw))

// API v1 placeholder
app.get('/api/v1', (c) => c.json({ message: 'Zavvy API v1', version: '0.0.1' }))

const port = Number(process.env.PORT) || 3002

console.log(`🚀 Zavvy API running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
