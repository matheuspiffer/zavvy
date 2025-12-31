# Story 1.5: Template Submission to Meta

Status: ready-for-dev

## Story

As a **Zavvy operator**,
I want to submit WhatsApp message templates to Meta for approval,
So that we can use them for automated messaging once approved.

## Acceptance Criteria

### AC1: Submit button available for draft templates
**Given** a template with "Draft" status on the Templates page
**When** the operator clicks "Submit for Approval" action
**Then** a confirmation dialog appears explaining the submission process
**And** the dialog shows template preview and Meta guidelines compliance check

### AC2: Template validation before submission
**Given** the operator confirms template submission
**When** the system validates the template
**Then** the system checks:
  - Name follows Meta naming rules (lowercase, alphanumeric, underscores)
  - Category is valid (MARKETING, UTILITY, AUTHENTICATION)
  - Body does not exceed 1024 characters
  - Header/Footer do not exceed 60 characters each
  - Buttons do not exceed 3 count, 25 characters each
  - Variables format is correct ({{1}}, {{2}}, etc.)
**And** validation errors are displayed if any rule is violated

### AC3: Template submitted to Meta Business API
**Given** validation passes
**When** the template is submitted
**Then** the system calls Meta Business API to create the template
**And** the template status changes from "Draft" to "Pending"
**And** the `meta_template_id` is stored for status tracking
**And** a success toast notification is displayed

### AC4: Handle Meta API errors gracefully
**Given** the Meta API returns an error
**When** submission fails
**Then** an error message is displayed with Meta's error details
**And** the template remains in "Draft" status
**And** the error is logged for debugging
**And** suggestions are provided based on common error causes

### AC5: Webhook receives status updates from Meta
**Given** Meta reviews a submitted template
**When** Meta sends a webhook notification
**Then** the system receives the webhook at `/webhooks/meta/templates`
**And** the template status is updated to "Approved" or "Rejected"
**And** if rejected, the `rejection_reason` is stored

### AC6: Display rejection reason
**Given** a template with "Rejected" status
**When** viewing template details
**Then** the rejection reason from Meta is displayed
**And** a "Resubmit" action is available to edit and submit again
**Note:** Only templates with "Rejected" status can be edited and resubmitted

### AC7: Pending templates show submission timestamp
**Given** a template with "Pending" status
**When** viewing the template in the list or details
**Then** the "Submitted at" timestamp is displayed
**And** an estimated review time note is shown (usually 24-48 hours)

### AC8: Prevent duplicate submissions
**Given** a template is already pending approval
**When** the operator attempts to submit it again
**Then** the submit action is disabled
**And** a message indicates the template is already pending review

---

## Tasks / Subtasks

### Task 1: Meta Business API Integration Setup (AC: #3, #4)
- [ ] 1.1 Create `apps/api/src/lib/meta/client.ts` with Meta Business API client
- [ ] 1.2 Add environment variables: `META_ACCESS_TOKEN`, `META_WABA_ID`, `META_BUSINESS_ID`
- [ ] 1.3 Create `apps/api/src/lib/meta/templates.ts` with template submission function
- [ ] 1.4 Implement error mapping from Meta API error codes to user-friendly messages
- [ ] 1.5 Add unit tests for Meta client functions

### Task 2: Template Submission API Endpoint (AC: #1, #2, #3, #4)
- [ ] 2.1 Create `POST /api/admin/templates/:id/submit` endpoint
- [ ] 2.2 Implement pre-submission validation (Meta-specific rules)
- [ ] 2.3 Call Meta Business API to create message template
- [ ] 2.4 Update template status to "pending" and store `meta_template_id`
- [ ] 2.5 Add `submitted_at` column to whatsapp_templates table
- [ ] 2.6 Implement proper error handling with structured error responses
- [ ] 2.7 Add unit tests for submission endpoint

### Task 3: Meta Webhook Handler for Status Updates (AC: #5)
- [ ] 3.1 Create `apps/api/src/webhooks/meta.ts` webhook handler
- [ ] 3.2 Implement signature verification for Meta webhooks
- [ ] 3.3 Handle `message_template_status_update` webhook events
- [ ] 3.4 Update template status (approved/rejected) based on webhook payload
- [ ] 3.5 Store `rejection_reason` when template is rejected
- [ ] 3.6 Add webhook verification endpoint for Meta initial setup
- [ ] 3.7 Add unit tests for webhook handler

### Task 4: Database Schema Updates (AC: #5, #7)
- [ ] 4.1 Add `submitted_at` timestamp column to whatsapp_templates
- [ ] 4.2 Add `rejection_reason` text column to whatsapp_templates
- [ ] 4.3 Run migration (db:push)

### Task 5: Submission UI - Confirmation Dialog (AC: #1, #2)
- [ ] 5.1 Create `apps/admin/src/features/templates/components/SubmitTemplateDialog.tsx`
- [ ] 5.2 Add template preview in dialog
- [ ] 5.3 Add Meta guidelines checklist display
- [ ] 5.4 Implement client-side validation warnings before submission
- [ ] 5.5 Add loading state during submission

### Task 6: Update Template Table and Actions (AC: #1, #6, #7, #8)
- [ ] 6.1 Add "Submit for Approval" action in TemplateTable dropdown (for draft templates)
- [ ] 6.2 Add "Resubmit" action for rejected templates
- [ ] 6.3 Disable submit action for pending templates with tooltip explanation
- [ ] 6.4 Display "Submitted at" in table/details for pending templates
- [ ] 6.5 Display rejection reason in TemplateDetailDialog for rejected templates

### Task 7: API Client Updates (AC: #3, #4)
- [ ] 7.1 Add `submitTemplate(id)` function to `apps/admin/src/features/templates/api/templates.ts`
- [ ] 7.2 Create `useSubmitTemplate` mutation hook with proper error handling
- [ ] 7.3 Add optimistic update for status change
- [ ] 7.4 Invalidate templates query on successful submission

### Task 8: Error Handling & User Feedback (AC: #4)
- [ ] 8.1 Create error message mapping for common Meta API errors
- [ ] 8.2 Display Meta error details in user-friendly format
- [ ] 8.3 Add suggestions for fixing common issues (policy violations, formatting, etc.)
- [ ] 8.4 Add toast notifications for success/error states

---

## Dev Notes

### Architecture Patterns & Constraints

- **API Framework**: Hono with `@hono/zod-openapi` for validation
- **Database**: Drizzle ORM with PostgreSQL
- **Frontend State**: TanStack Query for server state
- **UI Components**: shadcn/ui from `@zavvy/ui` package
- **Language**: All UI text in pt-BR (Brazilian Portuguese)
- **Logging**: Use Pino logger (adminLogger), NOT console.log

### Meta Business API Integration

**API Endpoint:**
```
POST https://graph.facebook.com/v21.0/{WABA_ID}/message_templates
```

**Required Headers:**
```
Authorization: Bearer {META_ACCESS_TOKEN}
Content-Type: application/json
```

**Request Body Structure:**
```json
{
  "name": "template_name",
  "language": "pt_BR",
  "category": "MARKETING",
  "components": [
    {
      "type": "HEADER",
      "format": "TEXT",
      "text": "Header text"
    },
    {
      "type": "BODY",
      "text": "Body with {{1}} variables"
    },
    {
      "type": "FOOTER",
      "text": "Footer text"
    },
    {
      "type": "BUTTONS",
      "buttons": [
        { "type": "QUICK_REPLY", "text": "Button text" }
      ]
    }
  ]
}
```

**Common Error Codes:**
| Code | Description | User Message |
|------|-------------|--------------|
| 100 | Invalid parameter | Verifique o formato do template |
| 190 | Invalid access token | Erro de autenticação com Meta |
| 368 | Temporarily blocked | Conta temporariamente bloqueada |
| 80008 | Rate limit | Aguarde alguns minutos |
| 132000 | Template already exists | Template com este nome já existe |
| 132001 | Invalid template category | Categoria inválida |
| 132007 | Policy violation | Conteúdo viola políticas da Meta |

### Webhook Setup

**Webhook URL:** `POST /webhooks/meta/templates`

**Verification (GET):**
```
GET /webhooks/meta/templates?hub.mode=subscribe&hub.verify_token={TOKEN}&hub.challenge={CHALLENGE}
```

**Status Update Payload:**
```json
{
  "entry": [{
    "id": "{WABA_ID}",
    "changes": [{
      "value": {
        "event": "message_template_status_update",
        "message_template_id": "{ID}",
        "message_template_name": "template_name",
        "message_template_language": "pt_BR",
        "reason": "REJECTED_UNSPECIFIED",
        "message_template_status": "REJECTED"
      },
      "field": "message_template_status_update"
    }]
  }]
}
```

### Environment Variables Required

```env
# Meta Business API
META_ACCESS_TOKEN=your_access_token
META_WABA_ID=your_waba_id
META_BUSINESS_ID=your_business_id
META_WEBHOOK_VERIFY_TOKEN=your_webhook_verify_token
META_APP_SECRET=your_app_secret_for_signature_verification
```

### Source Tree Components to Touch

```
packages/db/
├── src/schema/
│   └── whatsapp-templates.ts    # ADD: submitted_at, rejection_reason

apps/api/
├── src/lib/meta/                # NEW: Meta API client
│   ├── client.ts
│   └── templates.ts
├── src/routes/admin/
│   └── templates.ts             # ADD: POST /:id/submit
├── src/webhooks/
│   └── meta.ts                  # NEW: Meta webhook handler
└── src/index.ts                 # REGISTER: meta webhook route

apps/admin/
├── src/features/templates/
│   ├── api/
│   │   └── templates.ts         # ADD: submitTemplate function
│   ├── components/
│   │   ├── SubmitTemplateDialog.tsx  # NEW
│   │   └── TemplateTable.tsx    # UPDATE: Add submit action
│   └── hooks/
│       └── useTemplates.ts      # ADD: useSubmitTemplate mutation
```

### Testing Standards

- Co-located unit tests (e.g., `templates.test.ts` next to `templates.ts`)
- Use Vitest for unit/integration tests
- Mock Meta API responses for testing
- Test webhook signature verification

### Security Considerations

- Validate Meta webhook signatures using `META_APP_SECRET`
- Never log access tokens
- Rate limit submission endpoint (prevent abuse)
- Sanitize rejection reasons before displaying

### References

- [Source: architecture.md#3.6.6] - Template messages require pre-approval
- [Source: architecture.md#1.1] - FR108: Operator can submit templates for Meta approval
- [Source: architecture.md#1.1] - FR109: Operator can view template approval status
- [Source: project-context.md#WhatsApp Integration Rules] - Template rules
- [Meta Message Templates API](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates)

---

## Changelog

- 2025-12-30: Story created with comprehensive AC, tasks, and dev notes

---

## Dev Agent Record

### Agent Model Used

(To be filled during implementation)

### Debug Log References

(To be filled during implementation)

### Completion Notes List

(To be filled during implementation)

### File List

(To be filled during implementation)
