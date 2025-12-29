import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'
import { organizations } from './organizations'

export const members = pgTable('members', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id')
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  role: text('role').notNull().default('member'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export type Member = typeof members.$inferSelect
export type NewMember = typeof members.$inferInsert
