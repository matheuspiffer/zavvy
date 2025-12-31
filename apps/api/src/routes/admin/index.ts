import { Hono } from 'hono'
import type { AuthContext } from '../../middleware/auth'
import { adminOrganizationsRouter } from './organizations'
import { adminTemplatesRouter } from './templates'

// Create admin router - these routes are for Zavvy operators
export const adminRouter = new Hono<AuthContext>()

// Mount organization routes
adminRouter.route('/organizations', adminOrganizationsRouter)

// Mount templates routes
adminRouter.route('/templates', adminTemplatesRouter)
