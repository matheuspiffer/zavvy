import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { db, whatsappTemplates } from '@zavvy/db'
import { count, ilike, eq, asc, desc, and } from 'drizzle-orm'
import type { AuthContext } from '../../middleware/auth'
import { adminLogger } from '../../lib/logger'

const log = adminLogger.child({ route: 'templates' })

// Template button schema
const templateButtonSchema = z.object({
  type: z.enum(['QUICK_REPLY', 'URL', 'PHONE_NUMBER']),
  text: z.string().max(25, 'Button text max 25 characters'),
  url: z.string().url().optional(),
  phoneNumber: z.string().optional(),
})

// Query params schema for listing
const listQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  sort: z.enum(['name', 'category', 'status', 'created_at']).default('created_at'),
  order: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().optional(),
  status: z.enum(['draft', 'pending', 'approved', 'rejected']).optional(),
  category: z.enum(['marketing', 'utility', 'authentication']).optional(),
})

// Create template schema
const createTemplateSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(512, 'Name max 512 characters')
    .regex(/^[a-z0-9_]+$/, 'Name must be lowercase alphanumeric with underscores only'),
  category: z.enum(['marketing', 'utility', 'authentication']),
  language: z.string().default('pt_BR'),
  header: z.string().max(60, 'Header max 60 characters').optional().nullable(),
  body: z.string().min(1, 'Body is required').max(1024, 'Body max 1024 characters'),
  footer: z.string().max(60, 'Footer max 60 characters').optional().nullable(),
  buttons: z.array(templateButtonSchema).max(3, 'Max 3 buttons allowed').optional().nullable(),
})

// Update template schema (same as create but all optional except what changes)
const updateTemplateSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(512)
    .regex(/^[a-z0-9_]+$/, 'Name must be lowercase alphanumeric with underscores only')
    .optional(),
  category: z.enum(['marketing', 'utility', 'authentication']).optional(),
  language: z.string().optional(),
  header: z.string().max(60).optional().nullable(),
  body: z.string().min(1).max(1024).optional(),
  footer: z.string().max(60).optional().nullable(),
  buttons: z.array(templateButtonSchema).max(3).optional().nullable(),
})

// Create admin templates router
export const adminTemplatesRouter = new Hono<AuthContext>()

// Escape special ILIKE characters
function escapeILike(value: string): string {
  return value.replace(/[%_]/g, '\\$&')
}

// GET /api/admin/templates - List all templates with pagination, sorting, filtering
adminTemplatesRouter.get('/', zValidator('query', listQuerySchema), async (c) => {
  try {
    const { page, limit, sort, order, search, status, category } = c.req.valid('query')
    const offset = (page - 1) * limit

    // Build where conditions
    const conditions = []

    // Search filter
    if (search) {
      const escapedSearch = escapeILike(search)
      conditions.push(ilike(whatsappTemplates.name, `%${escapedSearch}%`))
    }

    // Status filter
    if (status) {
      conditions.push(eq(whatsappTemplates.status, status))
    }

    // Category filter
    if (category) {
      conditions.push(eq(whatsappTemplates.category, category))
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    // Determine sort column
    const sortColumn = (() => {
      switch (sort) {
        case 'name':
          return whatsappTemplates.name
        case 'category':
          return whatsappTemplates.category
        case 'status':
          return whatsappTemplates.status
        case 'created_at':
        default:
          return whatsappTemplates.createdAt
      }
    })()

    const orderByClause = order === 'asc' ? asc(sortColumn) : desc(sortColumn)

    // Execute queries in parallel
    const [templatesResult, countResult] = await Promise.all([
      db
        .select()
        .from(whatsappTemplates)
        .where(whereClause)
        .orderBy(orderByClause)
        .limit(limit)
        .offset(offset),

      db.select({ count: count() }).from(whatsappTemplates).where(whereClause),
    ])

    const total = countResult[0]?.count ?? 0

    // Transform data
    const data = templatesResult.map((template) => ({
      id: template.id,
      name: template.name,
      category: template.category,
      language: template.language,
      header: template.header,
      body: template.body,
      footer: template.footer,
      buttons: template.buttons,
      status: template.status,
      metaTemplateId: template.metaTemplateId,
      rejectionReason: template.rejectionReason,
      createdAt: template.createdAt.toISOString(),
      updatedAt: template.updatedAt.toISOString(),
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
    log.error({ err: error }, 'Failed to list templates')
    return c.json({ error: 'Internal Server Error', message: 'Failed to fetch templates' }, 500)
  }
})

// GET /api/admin/templates/:id - Get single template
adminTemplatesRouter.get('/:id', async (c) => {
  try {
    const id = c.req.param('id')

    const result = await db
      .select()
      .from(whatsappTemplates)
      .where(eq(whatsappTemplates.id, id))
      .limit(1)

    if (result.length === 0) {
      return c.json({ error: 'Not Found', message: 'Template not found' }, 404)
    }

    const template = result[0]!

    return c.json({
      data: {
        id: template.id,
        name: template.name,
        category: template.category,
        language: template.language,
        header: template.header,
        body: template.body,
        footer: template.footer,
        buttons: template.buttons,
        status: template.status,
        metaTemplateId: template.metaTemplateId,
        rejectionReason: template.rejectionReason,
        createdAt: template.createdAt.toISOString(),
        updatedAt: template.updatedAt.toISOString(),
      },
    })
  } catch (error) {
    log.error({ err: error, templateId: c.req.param('id') }, 'Failed to fetch template')
    return c.json({ error: 'Internal Server Error', message: 'Failed to fetch template' }, 500)
  }
})

// POST /api/admin/templates - Create new template
adminTemplatesRouter.post('/', zValidator('json', createTemplateSchema), async (c) => {
  try {
    const data = c.req.valid('json')

    // Check if template name already exists
    const existing = await db
      .select({ id: whatsappTemplates.id })
      .from(whatsappTemplates)
      .where(eq(whatsappTemplates.name, data.name))
      .limit(1)

    if (existing.length > 0) {
      return c.json(
        { error: 'Conflict', message: 'Template with this name already exists' },
        409
      )
    }

    const result = await db
      .insert(whatsappTemplates)
      .values({
        name: data.name,
        category: data.category,
        language: data.language,
        header: data.header ?? null,
        body: data.body,
        footer: data.footer ?? null,
        buttons: data.buttons ?? null,
        status: 'draft',
      })
      .returning()

    const template = result[0]!

    return c.json(
      {
        data: {
          id: template.id,
          name: template.name,
          category: template.category,
          language: template.language,
          header: template.header,
          body: template.body,
          footer: template.footer,
          buttons: template.buttons,
          status: template.status,
          metaTemplateId: template.metaTemplateId,
          rejectionReason: template.rejectionReason,
          createdAt: template.createdAt.toISOString(),
          updatedAt: template.updatedAt.toISOString(),
        },
      },
      201
    )
  } catch (error) {
    log.error({ err: error }, 'Failed to create template')
    return c.json({ error: 'Internal Server Error', message: 'Failed to create template' }, 500)
  }
})

// PUT /api/admin/templates/:id - Update template (only draft status)
adminTemplatesRouter.put('/:id', zValidator('json', updateTemplateSchema), async (c) => {
  try {
    const id = c.req.param('id')
    const data = c.req.valid('json')

    // Check if template exists and is editable
    const existing = await db
      .select()
      .from(whatsappTemplates)
      .where(eq(whatsappTemplates.id, id))
      .limit(1)

    if (existing.length === 0) {
      return c.json({ error: 'Not Found', message: 'Template not found' }, 404)
    }

    const template = existing[0]!

    // Only draft templates can be edited
    if (template.status !== 'draft') {
      return c.json(
        {
          error: 'Forbidden',
          message: `Cannot edit template with status '${template.status}'. Only draft templates can be edited.`,
        },
        403
      )
    }

    // Check if new name already exists (if changing name)
    if (data.name && data.name !== template.name) {
      const nameExists = await db
        .select({ id: whatsappTemplates.id })
        .from(whatsappTemplates)
        .where(eq(whatsappTemplates.name, data.name))
        .limit(1)

      if (nameExists.length > 0) {
        return c.json(
          { error: 'Conflict', message: 'Template with this name already exists' },
          409
        )
      }
    }

    const result = await db
      .update(whatsappTemplates)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(whatsappTemplates.id, id))
      .returning()

    const updated = result[0]!

    return c.json({
      data: {
        id: updated.id,
        name: updated.name,
        category: updated.category,
        language: updated.language,
        header: updated.header,
        body: updated.body,
        footer: updated.footer,
        buttons: updated.buttons,
        status: updated.status,
        metaTemplateId: updated.metaTemplateId,
        rejectionReason: updated.rejectionReason,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      },
    })
  } catch (error) {
    log.error({ err: error, templateId: c.req.param('id') }, 'Failed to update template')
    return c.json({ error: 'Internal Server Error', message: 'Failed to update template' }, 500)
  }
})

// DELETE /api/admin/templates/:id - Delete template (only draft or rejected status)
adminTemplatesRouter.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id')

    // Check if template exists and is deletable
    const existing = await db
      .select()
      .from(whatsappTemplates)
      .where(eq(whatsappTemplates.id, id))
      .limit(1)

    if (existing.length === 0) {
      return c.json({ error: 'Not Found', message: 'Template not found' }, 404)
    }

    const template = existing[0]!

    // Only draft or rejected templates can be deleted
    if (template.status !== 'draft' && template.status !== 'rejected') {
      return c.json(
        {
          error: 'Forbidden',
          message: `Cannot delete template with status '${template.status}'. Only draft or rejected templates can be deleted.`,
        },
        403
      )
    }

    await db.delete(whatsappTemplates).where(eq(whatsappTemplates.id, id))

    return c.json({ data: { success: true, id } })
  } catch (error) {
    log.error({ err: error, templateId: c.req.param('id') }, 'Failed to delete template')
    return c.json({ error: 'Internal Server Error', message: 'Failed to delete template' }, 500)
  }
})
