import { pgTable, text, timestamp, jsonb, pgEnum } from 'drizzle-orm/pg-core'

// Enum for template status
export const templateStatusEnum = pgEnum('template_status', [
  'draft',
  'pending',
  'approved',
  'rejected',
])

// Enum for template category (Meta WhatsApp API categories)
export const templateCategoryEnum = pgEnum('template_category', [
  'marketing',
  'utility',
  'authentication',
])

// Template button type
export type TemplateButton = {
  type: 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER'
  text: string
  url?: string
  phoneNumber?: string
}

// WhatsApp Templates table
export const whatsappTemplates = pgTable('whatsapp_templates', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),

  // Template identification
  name: text('name').notNull(), // alphanumeric + underscores, max 512 chars

  // Template categorization
  category: templateCategoryEnum('category').notNull(),
  language: text('language').notNull().default('pt_BR'),

  // Template content
  header: text('header'), // optional, max 60 chars
  body: text('body').notNull(), // required, max 1024 chars
  footer: text('footer'), // optional, max 60 chars
  buttons: jsonb('buttons').$type<TemplateButton[]>(), // optional, max 3 buttons

  // Status tracking
  status: templateStatusEnum('status').notNull().default('draft'),
  metaTemplateId: text('meta_template_id'), // ID from Meta after submission
  rejectionReason: text('rejection_reason'), // Reason if rejected by Meta

  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// Type exports
export type WhatsAppTemplate = typeof whatsappTemplates.$inferSelect
export type NewWhatsAppTemplate = typeof whatsappTemplates.$inferInsert
export type TemplateStatus = 'draft' | 'pending' | 'approved' | 'rejected'
export type TemplateCategory = 'marketing' | 'utility' | 'authentication'
