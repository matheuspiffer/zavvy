# Story 1.3: Organization List & Status View

Status: done

## Story

As a **Zavvy operator**,
I want to view all registered organizations with their status,
So that I can monitor the customer base and identify accounts that need attention.

## Acceptance Criteria

### AC1: Organizations page accessible from dashboard
**Given** an authenticated operator on the admin dashboard
**When** they click "Organizations" card or navigate to /organizations
**Then** they are taken to the Organizations management page
**And** the page displays a loading state while fetching data

### AC2: Organization table displays core information
**Given** an authenticated operator on the Organizations page
**When** the data is loaded
**Then** they see a table with columns: Name, Email, Status, Created Date
**And** data is paginated (20 items per page by default)
**And** total count is displayed above the table

### AC3: Organization status displayed correctly
**Given** the organization table is displayed
**When** viewing the Status column
**Then** status shows one of: Active, Trial, Expired, Cancelled
**And** each status has a distinct visual indicator (badge color):
  - Active: Green badge
  - Trial: Blue badge
  - Expired: Yellow/Orange badge
  - Cancelled: Gray badge

### AC4: Table supports sorting
**Given** the organization table is displayed
**When** the operator clicks on a column header (Name, Email, Status, Created)
**Then** the table sorts by that column
**And** clicking again toggles ascending/descending order
**And** a visual indicator shows current sort direction

### AC5: Table supports search/filter
**Given** the organization table is displayed
**When** the operator types in the search input
**Then** the table filters by name or email (case-insensitive)
**And** filtering happens with debounce (300ms delay)
**And** clear button appears to reset the filter

### AC6: Empty state handled gracefully
**Given** no organizations exist OR search returns no results
**When** the table would be empty
**Then** a friendly empty state message is displayed
**And** appropriate call-to-action or suggestion is shown

### AC7: Error state handled gracefully
**Given** an error occurs while fetching organization data
**When** the API call fails
**Then** an error message is displayed with retry option
**And** the error is logged for debugging

---

## Tasks / Subtasks

### Task 1: Create API endpoint for organization list (AC: #2, #4, #5)
- [x] 1.1 Create `/api/admin/organizations` GET endpoint in apps/api
- [x] 1.2 Add query params: `page`, `limit`, `sort`, `order`, `search`
- [x] 1.3 Implement pagination with total count in response
- [x] 1.4 Implement sorting by name, email, status, created_at
- [x] 1.5 Implement search filter (name OR email ILIKE)
- [x] 1.6 Return proper error responses for edge cases

### Task 2: Create Organizations page route (AC: #1)
- [x] 2.1 Create `apps/admin/src/routes/organizations.tsx` route file
- [x] 2.2 Add protected route wrapper (same pattern as index.tsx)
- [x] 2.3 Add navigation link from dashboard to organizations page
- [x] 2.4 Update dashboard "Organizations" card to be clickable

### Task 3: Add required shadcn/ui components (AC: #2, #4, #5)
- [x] 3.1 Add Table component to packages/ui (`pnpm --filter @zavvy/ui dlx shadcn@latest add table`)
- [x] 3.2 Add Badge component to packages/ui (`pnpm --filter @zavvy/ui dlx shadcn@latest add badge`)
- [x] 3.3 Add Skeleton component for loading states
- [x] 3.4 Export new components from packages/ui/src/index.ts

### Task 4: Create OrganizationTable component (AC: #2, #3)
- [x] 4.1 Create `apps/admin/src/features/organizations/components/OrganizationTable.tsx`
- [x] 4.2 Implement columns: Name, Email, Status (Badge), Created Date
- [x] 4.3 Add status badge variants with correct colors
- [x] 4.4 Format dates as DD/MM/YYYY (Brazil locale)

### Task 5: Implement table sorting (AC: #4)
- [x] 5.1 Add sortable column headers with click handlers
- [x] 5.2 Add sort direction indicators (arrows)
- [x] 5.3 Connect to API query params via TanStack Query

### Task 6: Implement search/filter (AC: #5)
- [x] 6.1 Create SearchInput component with debounce (300ms)
- [x] 6.2 Add clear button to reset search
- [x] 6.3 Connect search to API query params

### Task 7: Implement pagination (AC: #2)
- [x] 7.1 Add pagination controls (Previous, Next, page info)
- [x] 7.2 Show "Showing X-Y of Z organizations" count
- [x] 7.3 Connect pagination to API query params

### Task 8: Handle empty and error states (AC: #6, #7)
- [x] 8.1 Create EmptyState component for no results
- [x] 8.2 Create ErrorState component with retry button
- [x] 8.3 Implement loading skeleton for table

### Task 9: Verify and test
- [x] 9.1 Run `pnpm typecheck` - all packages pass
- [x] 9.2 Run `pnpm dev:admin` - verify page loads
- [x] 9.3 Test with empty database (empty state)
- [x] 9.4 Test sorting functionality
- [x] 9.5 Test search/filter functionality
- [x] 9.6 Test pagination with multiple pages

---

## Dev Notes

### API Endpoint Design

```typescript
// GET /api/admin/organizations
// Query params:
// - page: number (default 1)
// - limit: number (default 20, max 100)
// - sort: 'name' | 'email' | 'status' | 'created_at' (default 'created_at')
// - order: 'asc' | 'desc' (default 'desc')
// - search: string (optional, searches name OR email)

// Response:
{
  "data": [
    {
      "id": "uuid",
      "name": "Organization Name",
      "email": "email@example.com",
      "status": "active" | "trial" | "expired" | "cancelled",
      "createdAt": "2025-01-15T14:30:00Z"
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "hasMore": true,
    "timestamp": "2025-01-01T00:00:00Z"
  }
}
```

### Component Architecture

```
apps/admin/src/
├── routes/
│   └── organizations.tsx              # Page route
└── features/
    └── organizations/
        ├── components/
        │   ├── OrganizationTable.tsx   # Main table component
        │   ├── OrganizationRow.tsx     # Table row component
        │   ├── StatusBadge.tsx         # Status badge with colors
        │   ├── SearchInput.tsx         # Debounced search input
        │   └── Pagination.tsx          # Pagination controls
        ├── hooks/
        │   └── useOrganizations.ts     # TanStack Query hook
        └── api/
            └── organizations.ts        # API client functions
```

### Status Badge Colors (Tailwind)

```typescript
const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  trial: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  expired: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100',
}
```

### Data Source

Organization data comes from the `organizations` table (via Better Auth organization plugin). Status is determined by subscription state:

- **active**: Has active subscription (`subscription_status = 'active'`)
- **trial**: Within trial period (`trial_ends_at > now()` AND no subscription)
- **expired**: Trial ended, no subscription (`trial_ends_at <= now()` AND no subscription)
- **cancelled**: Subscription cancelled (`subscription_status = 'cancelled'`)

### Project Structure Notes

- **Route file**: Create `apps/admin/src/routes/organizations.tsx` following TanStack Router pattern
- **Feature folder**: Create `apps/admin/src/features/organizations/` for components, hooks, api
- **Shared components**: Table, Badge, Skeleton go in `packages/ui` for reuse
- **API endpoint**: Create `apps/api/src/routes/admin/organizations.ts` (admin-only route)

### Architecture Compliance

- Use TanStack Query for data fetching (server state)
- Use Zustand only if UI state needed (probably not for this story)
- Follow feature-based organization pattern
- Use Zod schemas for API validation
- Format dates to DD/MM/YYYY for Brazil locale
- Use existing @zavvy/ui components where possible

### Testing Considerations

- Mock API responses for component tests
- Test sorting with different column clicks
- Test debounced search (wait for 300ms)
- Test empty state when no organizations exist
- Test error state when API fails

---

## Previous Story Intelligence

**From Story 1.2.5 (Tailwind CSS & shadcn/ui Setup):**
- Tailwind v4 uses CSS-first configuration in `packages/ui/src/globals.css`
- Components added via `pnpm --filter @zavvy/ui dlx shadcn@latest add <component>`
- All components must be exported from `packages/ui/src/index.ts`
- Import components from `@zavvy/ui` in apps/admin
- Removed `tailwind.config.ts` references - Tailwind v4 uses CSS-based config

**From Story 1.2 (Database & Auth):**
- Better Auth configured with organization plugin
- Admin auth uses session-based authentication
- Database has organizations table with organization data
- Use `useSession()` hook for auth state

**Patterns Established:**
- Routes use `createFileRoute` from @tanstack/react-router
- Protected routes wrap content in `<ProtectedRoute>` component
- Components import from `@zavvy/ui`: `Button`, `Card`, etc.
- Tailwind classes work directly (bg-background, text-muted-foreground, etc.)

---

## Git Intelligence

**Recent Commits (relevant to this story):**
- `fa5fb70` - Database schema and admin authentication setup
- `1f667f4` - Initialize pnpm workspace and base TypeScript configuration

**Files Modified in Previous Stories:**
- `apps/admin/src/routes/index.tsx` - Dashboard with placeholder cards
- `packages/ui/src/index.ts` - Component exports
- `packages/ui/src/components/ui/` - shadcn components

---

## Technical Requirements Summary

| Requirement | Specification |
|-------------|---------------|
| **Framework** | TanStack Router + TanStack Query |
| **UI Components** | shadcn/ui (Table, Badge, Input, Skeleton) |
| **Styling** | Tailwind CSS v4 |
| **API Pattern** | REST `/api/admin/organizations` |
| **Data Fetching** | TanStack Query with pagination |
| **Date Format** | DD/MM/YYYY (Brazil) |
| **Pagination** | 20 items per page default |
| **Debounce** | 300ms for search input |

---

## References

- [Source: _bmad-output/architecture.md#5.2-Architectural-Boundaries] - Admin API uses `/api/admin/*` pattern
- [Source: _bmad-output/architecture.md#4.1-Naming-Patterns] - Table naming: snake_case, plural
- [Source: _bmad-output/project-context.md#Frontend-Rules] - Feature-based organization
- [Source: _bmad-output/project-context.md#Brasil-Locale-Rules] - Date format DD/MM/YYYY
- [Source: _bmad-output/epics.md#Story-1.3] - Original story definition

---

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References
- Typecheck passed for all packages
- Build successful for @zavvy/admin

### Completion Notes List
- Created API endpoint at `/api/admin/organizations` with pagination, sorting, and search
- Added subscription fields to organizations schema (subscriptionStatus, trialEndsAt, email)
- Created OrganizationTable component with full functionality
- Implemented StatusBadge with color variants per status type
- Implemented SearchInput with 300ms debounce
- Implemented TablePagination with Previous/Next controls
- Created EmptyState and ErrorState components
- Created TableSkeleton for loading states
- Added TanStack Query integration for data fetching
- Added TanStack Router plugin for route generation
- Dates formatted to DD/MM/YYYY (Brazil locale)

### File List
**New Files:**
- apps/api/src/routes/admin/organizations.ts
- apps/api/src/routes/admin/index.ts
- apps/admin/src/routes/organizations.tsx
- apps/admin/src/features/organizations/index.ts
- apps/admin/src/features/organizations/api/organizations.ts
- apps/admin/src/features/organizations/hooks/useOrganizations.ts
- apps/admin/src/features/organizations/components/OrganizationTable.tsx
- apps/admin/src/features/organizations/components/StatusBadge.tsx
- apps/admin/src/features/organizations/components/SearchInput.tsx
- apps/admin/src/features/organizations/components/TablePagination.tsx
- apps/admin/src/features/organizations/components/EmptyState.tsx
- apps/admin/src/features/organizations/components/ErrorState.tsx
- apps/admin/src/features/organizations/components/TableSkeleton.tsx
- apps/admin/src/vite-env.d.ts

**Modified Files:**
- packages/db/src/schema/organizations.ts (added email, subscriptionStatus, trialEndsAt)
- packages/ui/src/index.ts (exported Table, Badge, Skeleton components)
- apps/api/src/index.ts (mounted admin router)
- apps/api/package.json (added zod, @hono/zod-validator, drizzle-orm)
- apps/admin/package.json (added @tanstack/react-query, @tanstack/router-plugin)
- apps/admin/src/App.tsx (added QueryClientProvider)
- apps/admin/src/routes/index.tsx (added Organizations card with Link)
- apps/admin/vite.config.ts (added TanStackRouterVite plugin)

---

## Change Log

- 2025-12-29: Implemented Story 1.3 - Organization List & Status View
  - Created admin API endpoint with pagination, sorting, search
  - Built OrganizationTable with all required features
  - Added subscription fields to organizations schema
  - Status: ready-for-dev → review
- 2025-12-29: Code Review Completed & Fixes Applied
  - H1: Added error logging in OrganizationTable (AC7 compliance)
  - H2: Added try/catch error handling in API endpoint
  - M1: Added escapeILike() function to prevent SQL injection edge cases
  - M2: Fixed terminology (tenants → organizations)
  - Translated entire UI to pt-BR (Brazilian Portuguese)
  - Status: review → done
