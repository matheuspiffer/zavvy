import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { db, organizations } from '@zavvy/db'
import { count, ilike, or, asc, desc } from 'drizzle-orm'
import type { AuthContext } from '../../middleware/auth'

// Query params schema
const listQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  sort: z.enum(['name', 'email', 'status', 'created_at']).default('created_at'),
  order: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().optional(),
})

// Organization status type
type OrganizationStatus = 'active' | 'trial' | 'expired' | 'cancelled'

// Calculate organization status based on subscription data
function calculateStatus(org: {
  subscriptionStatus: string | null
  trialEndsAt: Date | null
}): OrganizationStatus {
  // Active subscription
  if (org.subscriptionStatus === 'active') {
    return 'active'
  }

  // Cancelled subscription
  if (org.subscriptionStatus === 'cancelled') {
    return 'cancelled'
  }

  // No subscription - check trial status
  const now = new Date()
  if (org.trialEndsAt && org.trialEndsAt > now) {
    return 'trial'
  }

  // Trial ended or no trial set
  return 'expired'
}

// Create admin organizations router
export const adminOrganizationsRouter = new Hono<AuthContext>()

// Escape special ILIKE characters (%, _) to prevent injection edge cases
function escapeILike(value: string): string {
  return value.replace(/[%_]/g, '\\$&')
}

// GET /api/admin/organizations - List all organizations with pagination, sorting, and search
adminOrganizationsRouter.get(
  '/',
  zValidator('query', listQuerySchema),
  async (c) => {
    try {
      const { page, limit, sort, order, search } = c.req.valid('query')
      const offset = (page - 1) * limit

      // Build where clause for search (escape special chars for ILIKE)
      const escapedSearch = search ? escapeILike(search) : undefined
      const whereClause = escapedSearch
        ? or(
            ilike(organizations.name, `%${escapedSearch}%`),
            ilike(organizations.email, `%${escapedSearch}%`)
          )
        : undefined

      // Determine sort column
      // Note: status sorting uses subscriptionStatus as proxy - calculated status
      // (trial/expired) depends on trialEndsAt which requires post-processing
      const sortColumn = (() => {
        switch (sort) {
          case 'name':
            return organizations.name
          case 'email':
            return organizations.email
          case 'created_at':
            return organizations.createdAt
          case 'status':
            return organizations.subscriptionStatus
          default:
            return organizations.createdAt
        }
      })()

      // Build order by clause
      const orderByClause = order === 'asc' ? asc(sortColumn) : desc(sortColumn)

      // Execute queries in parallel
      const [orgsResult, countResult] = await Promise.all([
        // Get paginated organizations
        db
          .select()
          .from(organizations)
          .where(whereClause)
          .orderBy(orderByClause)
          .limit(limit)
          .offset(offset),

        // Get total count
        db
          .select({ count: count() })
          .from(organizations)
          .where(whereClause),
      ])

      const total = countResult[0]?.count ?? 0

      // Transform data with calculated status
      const data = orgsResult.map((org) => ({
        id: org.id,
        name: org.name,
        email: org.email,
        status: calculateStatus({
          subscriptionStatus: org.subscriptionStatus,
          trialEndsAt: org.trialEndsAt,
        }),
        createdAt: org.createdAt.toISOString(),
      }))

      return c.json({
        data,
        meta: {
          total,
          page,
          limit,
          hasMore: offset + data.length < total,
          timestamp: new Date().toISOString(),
        },
      })
    } catch (error) {
      // Log error for debugging (never expose internal details to client)
      console.error('[Admin Organizations] Database error:', error)

      return c.json(
        {
          error: 'Internal Server Error',
          message: 'Failed to fetch organizations',
        },
        500
      )
    }
  }
)
