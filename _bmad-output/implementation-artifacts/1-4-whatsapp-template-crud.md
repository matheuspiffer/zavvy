# Story 1.4: WhatsApp Template CRUD

Status: review

## Story

As a **Zavvy operator**,
I want to manage WhatsApp message templates (create, view, edit, delete),
So that I can prepare templates for Meta approval and use them for automated messaging.

## Acceptance Criteria

### AC1: Templates page accessible from dashboard
**Given** an authenticated operator on the admin dashboard
**When** they click "Templates" or navigate to /templates
**Then** they are taken to the WhatsApp Templates management page
**And** the page displays a loading state while fetching data

### AC2: Template list displays core information
**Given** an authenticated operator on the Templates page
**When** the data is loaded
**Then** they see a table with columns: Name, Category, Language, Status, Created Date
**And** data is paginated (20 items per page by default)
**And** total count is displayed above the table

### AC3: Template status displayed correctly
**Given** the template table is displayed
**When** viewing the Status column
**Then** status shows one of: Draft, Pending, Approved, Rejected
**And** each status has a distinct visual indicator (badge color):
  - Draft: Gray badge
  - Pending: Yellow badge
  - Approved: Green badge
  - Rejected: Red badge

### AC4: Create new template
**Given** an authenticated operator on the Templates page
**When** they click "New Template" button
**Then** a form/dialog opens with fields: Name, Category, Language, Header (optional), Body, Footer (optional), Buttons (optional)
**And** upon successful creation, the template is saved with "Draft" status
**And** the list refreshes to show the new template

### AC5: View template details
**Given** a template in the list
**When** the operator clicks on the template row or "View" action
**Then** a detail view shows all template fields
**And** preview section shows how the template will appear in WhatsApp
**And** variables are highlighted (e.g., {{1}}, {{2}})

### AC6: Edit existing template
**Given** a template with "Draft" status
**When** the operator clicks "Edit" action
**Then** the edit form opens with current values pre-filled
**And** changes can be saved
**Note:** Templates with "Pending" or "Approved" status cannot be edited

### AC7: Delete template
**Given** a template with "Draft" or "Rejected" status
**When** the operator clicks "Delete" action
**Then** a confirmation dialog appears
**And** upon confirmation, the template is deleted
**Note:** Templates with "Pending" or "Approved" status cannot be deleted

### AC8: Template validation
**Given** the operator is creating or editing a template
**When** they try to save
**Then** validation occurs:
  - Name is required, max 512 chars, alphanumeric with underscores
  - Category is required (MARKETING, UTILITY, AUTHENTICATION)
  - Language is required (pt_BR for MVP)
  - Body is required, max 1024 chars
  - Header: max 60 chars (if provided)
  - Footer: max 60 chars (if provided)
  - Buttons: max 3, each max 25 chars (if provided)

### AC9: Error handling
**Given** an error occurs during any CRUD operation
**When** the API call fails
**Then** an appropriate error message is displayed
**And** the error is logged for debugging

---

## Tasks / Subtasks

### Task 1: Create database schema for templates (AC: #2, #3)
- [x] 1.1 Create `whatsapp_templates` table in packages/db/src/schema
- [x] 1.2 Add columns: id, name, category, language, header, body, footer, buttons (JSON), status, meta_template_id (nullable), created_at, updated_at
- [x] 1.3 Add enum type for status: draft, pending, approved, rejected
- [x] 1.4 Add enum type for category: marketing, utility, authentication
- [x] 1.5 Run migration to create table (db:push ready, schema exported)

### Task 2: Create API endpoints for templates (AC: #2, #4, #6, #7, #8, #9)
- [x] 2.1 Create `/api/admin/templates` route file in apps/api
- [x] 2.2 Implement `GET /api/admin/templates` with pagination, sorting, filtering
- [x] 2.3 Implement `GET /api/admin/templates/:id` for single template
- [x] 2.4 Implement `POST /api/admin/templates` with Zod validation
- [x] 2.5 Implement `PUT /api/admin/templates/:id` with status check (only draft editable)
- [x] 2.6 Implement `DELETE /api/admin/templates/:id` with status check
- [x] 2.7 Add error handling with proper error responses

### Task 3: Create Templates page route (AC: #1)
- [x] 3.1 Create `apps/admin/src/routes/templates.tsx` route file
- [x] 3.2 Add protected route wrapper (same pattern as organizations.tsx)
- [x] 3.3 Add navigation link from dashboard to templates page
- [x] 3.4 Update dashboard "Templates" card to be clickable

### Task 4: Add required shadcn/ui components (AC: #4, #5, #6)
- [x] 4.1 Add Dialog component to packages/ui (already exists)
- [x] 4.2 Add Textarea component to packages/ui (already exists)
- [x] 4.3 Add Select component to packages/ui (already exists)
- [x] 4.4 Add Alert component for preview/validation messages
- [x] 4.5 Export new components from packages/ui/src/index.ts

### Task 5: Create TemplateTable component (AC: #2, #3)
- [x] 5.1 Create `apps/admin/src/features/templates/components/TemplateTable.tsx`
- [x] 5.2 Implement columns: Name, Category, Language, Status (Badge), Created Date
- [x] 5.3 Add status badge variants with correct colors
- [x] 5.4 Add row actions dropdown: View, Edit, Delete
- [x] 5.5 Create `apps/admin/src/features/templates/hooks/useTemplates.ts`

### Task 6: Create Template form components (AC: #4, #6, #8)
- [x] 6.1 Create `apps/admin/src/features/templates/components/TemplateForm.tsx`
- [x] 6.2 Add form fields: Name, Category (select), Language (select), Header, Body (textarea), Footer, Buttons
- [x] 6.3 Implement validation schema matching API
- [x] 6.4 Create `apps/admin/src/features/templates/components/CreateTemplateDialog.tsx`
- [x] 6.5 Create `apps/admin/src/features/templates/components/EditTemplateDialog.tsx`

### Task 7: Create Template preview component (AC: #5)
- [x] 7.1 Create `apps/admin/src/features/templates/components/TemplatePreview.tsx`
- [x] 7.2 Style to resemble WhatsApp message bubble
- [x] 7.3 Highlight variables ({{1}}, {{2}}) with visual indicator
- [x] 7.4 Show buttons preview at bottom if present

### Task 8: Create Template detail view (AC: #5, #7)
- [x] 8.1 Create `apps/admin/src/features/templates/components/TemplateDetailDialog.tsx`
- [x] 8.2 Show all template fields with labels
- [x] 8.3 Include TemplatePreview component
- [x] 8.4 Add Edit and Delete buttons (respecting status rules)
- [x] 8.5 Create delete confirmation dialog

### Task 9: Implement search and filtering (AC: #2)
- [x] 9.1 Add search input for template name
- [x] 9.2 Add status filter dropdown
- [x] 9.3 Add category filter dropdown
- [x] 9.4 Connect filters to API query params

### Task 10: Feature barrel export (AC: all)
- [x] 10.1 Create `apps/admin/src/features/templates/index.ts` barrel file
- [x] 10.2 Export TemplateTable, TemplateForm, TemplatePreview, TemplateDetail

---

## Dev Notes

### Architecture Patterns & Constraints

- **API Framework**: Hono with `@hono/zod-openapi` for validation
- **Database**: Drizzle ORM with PostgreSQL, tables in `snake_case`
- **Frontend State**: TanStack Query for server state
- **UI Components**: shadcn/ui from `@zavvy/ui` package
- **Language**: All UI text in pt-BR (Brazilian Portuguese)

### WhatsApp Template Rules (Meta API)

- Templates must be approved by Meta before use
- Name: alphanumeric + underscores only
- Categories: MARKETING, UTILITY, AUTHENTICATION
- Body max: 1024 characters
- Header/Footer max: 60 characters each
- Buttons: max 3, each max 25 characters
- Variables format: `{{1}}`, `{{2}}`, etc.

### Source Tree Components to Touch

```
packages/db/
├── src/schema/
│   ├── whatsapp-templates.ts    # NEW: Template schema
│   └── index.ts                 # Update: Export templates

apps/api/
├── src/routes/admin/
│   └── templates.ts             # NEW: Template CRUD endpoints

apps/admin/
├── src/routes/
│   └── templates.tsx            # NEW: Templates page route
├── src/features/templates/      # NEW: Feature folder
│   ├── api/
│   │   └── templates.ts
│   ├── components/
│   │   ├── TemplateTable.tsx
│   │   ├── TemplateForm.tsx
│   │   ├── TemplatePreview.tsx
│   │   ├── TemplateDetail.tsx
│   │   ├── CreateTemplateDialog.tsx
│   │   ├── EditTemplateDialog.tsx
│   │   ├── StatusBadge.tsx
│   │   └── DeleteConfirmDialog.tsx
│   ├── hooks/
│   │   └── useTemplates.ts
│   └── index.ts
```

### Testing Standards

- Co-located unit tests (e.g., `templates.test.ts` next to `templates.ts`)
- Use Vitest for unit/integration tests
- Test API endpoints with proper error cases

### Project Structure Notes

- Follows feature-based organization pattern from architecture
- API routes in `apps/api/src/routes/admin/` (admin-only endpoints)
- Reuse StatusBadge pattern from organizations feature (adapt colors for template status)

### References

- [Source: architecture.md#3.6.6] - Template messages require pre-approval
- [Source: architecture.md#1.1] - FR107: Operator can manage WhatsApp message templates (CRUD)
- [Source: project-context.md#WhatsApp Integration Rules] - Template variables format
- [Source: epics.md#Story 1.4] - Original story definition

---

## Changelog

- 2025-12-29: Story created with comprehensive AC, tasks, and dev notes
- 2025-12-30: Implementation completed - all tasks done, ready for review

---

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Typecheck passed for @zavvy/db, @zavvy/api, @zavvy/ui, @zavvy/admin
- All components follow existing patterns from organizations feature

### Completion Notes List

- Created Drizzle schema with pgEnum for status and category
- Implemented full CRUD API with Zod validation and proper error handling
- Status-based edit/delete restrictions enforced at API level
- Created complete feature folder with hooks (TanStack Query), API client, and components
- TemplatePreview component styled like WhatsApp message bubble with variable highlighting
- All forms include client-side validation matching API constraints
- Search, status filter, and category filter connected to API query params
- Dashboard link to /templates updated and functional
- routeTree.gen.ts updated for new route

### File List

**New Files:**
- packages/db/src/schema/whatsapp-templates.ts
- apps/api/src/routes/admin/templates.ts
- apps/admin/src/routes/templates.tsx
- apps/admin/src/features/templates/api/templates.ts
- apps/admin/src/features/templates/hooks/useTemplates.ts
- apps/admin/src/features/templates/components/TemplateTable.tsx
- apps/admin/src/features/templates/components/TemplateForm.tsx
- apps/admin/src/features/templates/components/TemplatePreview.tsx
- apps/admin/src/features/templates/components/TemplateDetailDialog.tsx
- apps/admin/src/features/templates/components/CreateTemplateDialog.tsx
- apps/admin/src/features/templates/components/EditTemplateDialog.tsx
- apps/admin/src/features/templates/components/DeleteConfirmDialog.tsx
- apps/admin/src/features/templates/components/StatusBadge.tsx
- apps/admin/src/features/templates/components/SearchInput.tsx
- apps/admin/src/features/templates/components/TablePagination.tsx
- apps/admin/src/features/templates/components/EmptyState.tsx
- apps/admin/src/features/templates/components/ErrorState.tsx
- apps/admin/src/features/templates/index.ts

**Modified Files:**
- packages/db/src/schema/index.ts (added whatsapp-templates export)
- packages/ui/src/index.ts (added Textarea, Select, AlertDialog, DropdownMenu, Alert exports)
- apps/api/src/routes/admin/index.ts (mounted templates router)
- apps/admin/src/routes/index.tsx (made Templates card clickable with Link)
- apps/admin/src/routeTree.gen.ts (added /templates route)
