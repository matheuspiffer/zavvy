---
project_name: 'zavvy'
user_name: 'Piffer'
date: '2025-12-26'
sections_completed: ['technology_stack', 'implementation_rules', 'whatsapp', 'brasil_lgpd', 'booking_link']
status: 'complete'
---

# Project Context for AI Agents - Zavvy

_Critical rules and patterns that AI agents must follow when implementing code. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

| Category | Technology | Version |
|----------|------------|---------|
| Runtime | Node.js | >=20.x |
| Language | TypeScript | 5.x (strict) |
| API | Hono | latest |
| ORM | Drizzle | latest |
| Database | PostgreSQL | 15+ |
| Auth | Better Auth | latest |
| Queue | BullMQ | latest |
| Cache | Redis | 7+ |
| Frontend | React | 19.x |
| Build (Apps) | Vite | 6.x |
| Build (Landing) | Next.js | 15.x |
| Router | TanStack Router | latest |
| State | TanStack Query + Zustand | latest |
| Forms | React Hook Form + Zod | latest |
| UI | shadcn/ui + Tailwind CSS | latest |
| Testing | Vitest + Playwright | latest |
| Logging | Pino | latest |
| AI SDK | Vercel AI SDK | latest |
| LLM | OpenAI (gpt-4o-mini) | latest |

---

## Critical Implementation Rules

### TypeScript Rules

- ALWAYS use strict mode (`"strict": true`)
- NEVER use `any` - use `unknown` and narrow
- ALWAYS define Zod schemas in `packages/shared/schemas/`
- Use `as const` for literal types

### Multi-Tenancy Rules (CRITICAL)

- EVERY database query MUST include `organization_id` filter
- NEVER expose data across organizations
- API routes MUST use `organization` middleware
- Better Auth session contains `organizationId`

### API Rules (Hono)

- Routes in `apps/api/src/routes/`
- Use `@hono/zod-openapi` for validation
- Response format: `{ data, meta }` or `{ error }`
- Error codes: 400 validation, 401 auth, 403 forbidden, 404 not found, 429 rate limit, 500 server

### Database Rules (Drizzle)

- Tables: `snake_case`, plural (`appointments`)
- Columns: `snake_case` (`created_at`)
- ALWAYS include `organization_id` on tenant tables
- Use `timestamptz` for dates (UTC)

### BullMQ Rules

- Job names: `domain.action` (`appointment.created`)
- Default retry: 3 attempts, exponential backoff
- Workers in `apps/api/src/jobs/workers/`
- Queue definitions in `apps/api/src/jobs/queues.ts`

### Frontend Rules

- Components: `PascalCase.tsx`
- Hooks: `use{Name}.ts`
- Feature-based organization (`features/{domain}/`)
- TanStack Query for server state ONLY
- Zustand for UI state ONLY

### Testing Rules

- Unit tests: co-located (`*.test.ts`)
- E2E tests: `tests/e2e/`
- Use Vitest for unit/integration
- Use Playwright for E2E

### Security Rules

- NEVER log sensitive data (tokens, passwords)
- Validate ALL webhook signatures
- Rate limit external API calls
- Encrypt client phone numbers at rest

### Anti-Patterns (NEVER DO)

- NEVER skip organization_id filtering
- NEVER use `console.log` (use Pino)
- NEVER commit .env files
- NEVER hardcode secrets
- NEVER use `any` type

---

## WhatsApp Integration Rules (CRITICAL)

### Architecture: Professional Command Center

WhatsApp is the PRIMARY operational channel. The professional can do almost everything via WhatsApp that they can do on web, with intelligent redirects for what requires browser (OAuth, payments, reports).

### Latency Requirements

- Acknowledge webhook within ≤300ms (return 200 immediately)
- Queue message processing via BullMQ (don't block webhook)
- AI intent processing timeout: 1.5s max
- Total response target: p95 ≤2.5s

### Message Flow (Hybrid AI Processing)

```
Webhook receives → immediate 200 response
        ↓
Queue job `whatsapp.message.received`
        ↓
┌─────────────────────────────────────┐
│ Input type?                         │
├─────────────────────────────────────┤
│ Free text    → AI analyzes intent   │
│ Button click → Direct action        │
│ List select  → Direct action        │
│ Flow submit  → Direct action        │
└─────────────────────────────────────┘
        ↓
Execute business logic
        ↓
AI generates response (ALWAYS)
        ↓
Send via `whatsapp.message.send` job
```

### Interactive Components (Meta Cloud API)

| Component | Usage | Limits |
|-----------|-------|--------|
| **Reply Buttons** | Confirmations, quick actions, contextual suggestions | Max 3 buttons |
| **List Messages** | Client selection, service selection, time slots | Max 10 items, with sections |
| **WhatsApp Flows** | Forms: new client, new service, edit data | Meta-approved flows |
| **CTA URL Buttons** | Redirect to web (OAuth, payments, settings) | Max 2 buttons |

### Intent Categories

| Category | Intents | Processing |
|----------|---------|------------|
| **Schedule Queries** | view_agenda, next_client, appointment_details, availability_check | AI + List/Buttons |
| **Appointments** | create_appointment, reschedule, cancel | AI + Confirmation Buttons |
| **Blocks** | block_time, unblock_time, view_blocks | AI + Buttons |
| **Clients** | search_client, view_client, create_client, edit_client | AI + List + Flow |
| **Services** | list_services, create_service, edit_service, toggle_service | AI + List + Flow |
| **Availability** | view_availability, change_hours, add_exception, remove_exception | AI + Buttons |
| **Help** | menu, help, what_can_you_do | AI + List Menu |
| **Web Redirect** | connect_calendar, payments, reports, settings | AI + CTA URL |

### Discoverability Rules

- **First activation**: Send welcome message explaining capabilities
- **Menu command**: Always available via "menu", "ajuda", "help"
- **Contextual suggestions**: After EVERY response, include Reply Buttons with relevant next actions
- **Menu format**: Hybrid (text explanation + List Message for detailed options)

### Response Generation Rules

- ALL responses are AI-generated (100%)
- Language: Brazilian Portuguese, informal, friendly
- Tone: "Assistant helping", not "System responding"
- Max message length: 1024 chars (Meta limit for interactive)
- Include emojis sparingly (1-2 per message)

### Fallback Strategy (3 Layers)

| Layer | Timing | Action |
|-------|--------|--------|
| **Layer 1** | 0-300ms | Ack: "👌 Já vejo isso pra você..." |
| **Layer 2** | 300ms-1.5s | AI processes intent |
| **Layer 3** | >1.5s | Deterministic: Show options as List/Buttons |

### Error Handling Rules

- NEVER show technical errors to user
- ALWAYS offer alternative action or web redirect
- Error response format:
  ```
  Ops, não consegui fazer isso agora. 😅

  [Tentar novamente] [Fazer pelo app]
  ```
- CTA URL deep-links to relevant web section

### Template Messages

- ALL outbound proactive messages use pre-approved templates
- Template variables: `{{1}}`, `{{2}}`, etc.
- Templates stored in admin panel, managed by operators
- Interactive messages (buttons, lists) don't require templates
- Session messages (within 24h window) can be free-form

### Centralized WABA

- Single WhatsApp number for all tenants
- Route by `tenant_id` extracted from conversation metadata
- Store mapping: `client_phone` → `organization_id`

### Client Notifications (Automatic)

- Professional does NOT choose to notify - system does automatically
- Appointment created → Notify client with confirmation
- Appointment changed → Notify client with new details
- Appointment cancelled → Notify client
- Reminder 24h before → Automatic

---

## AI/LLM Implementation Rules

### AI Module Location

AI code lives in `apps/api/src/lib/ai/` (not in packages - only API uses it).

```
apps/api/src/lib/ai/
├── client.ts           # Vercel AI SDK + OpenAI config
├── intent.ts           # Intent recognition
├── response.ts         # Response generation
├── prompts/
│   ├── intent.ts       # Intent system prompt
│   └── response.ts     # Response system prompt
└── index.ts            # Public exports
```

### Vercel AI SDK Usage

```typescript
// apps/api/src/lib/ai/client.ts
import { openai } from '@ai-sdk/openai'
export const aiModel = openai('gpt-4o-mini')
```

### Intent Recognition Pattern

```typescript
// apps/api/src/lib/ai/intent.ts
import { generateText } from 'ai'
import { aiModel } from './client'

export async function recognizeIntent(message: string, context: ConversationContext) {
  const { text: intent } = await generateText({
    model: aiModel,
    system: INTENT_SYSTEM_PROMPT,
    prompt: buildIntentPrompt(message, context),
    maxTokens: 50,
    temperature: 0, // Deterministic
  })
  return intent
}
```

### Response Generation Pattern

```typescript
// apps/api/src/lib/ai/response.ts
export async function generateResponse(intent: string, data: BusinessData, context: Context) {
  const { text: response } = await generateText({
    model: aiModel,
    system: RESPONSE_SYSTEM_PROMPT,
    prompt: buildResponsePrompt(intent, data, context),
    maxTokens: 500,
    temperature: 0.7, // Natural feel
  })
  return response
}
```

### AI Rules (CRITICAL)

- ALWAYS use `apps/api/src/lib/ai/` for AI-related code
- NEVER call OpenAI directly - use Vercel AI SDK
- ALWAYS set timeout: 1.5s max for intent, 2s max for response
- ALWAYS have fallback for timeout/error
- NEVER expose API keys - use environment variables
- ALWAYS log AI usage for cost tracking
- Rate limit: max 100 AI calls/tenant/hour

### Error Handling

```typescript
try {
  const result = await Promise.race([
    recognizeIntent(message, context),
    timeout(1500) // 1.5s timeout
  ])
} catch (error) {
  // ALWAYS fallback to deterministic response
  return buildDeterministicResponse(context)
}
```

---

## Brasil Locale Rules

### Language

- ALL user-facing text in pt-BR
- Date format display: `DD/MM/YYYY` (ex: 25/12/2025)
- Time format: 24h (`14:30`, not `2:30 PM`)
- Currency: `R$ 150,00` (comma for decimals)

### Timezone

- Database: ALWAYS store UTC
- Display: Convert to `America/Sao_Paulo`
- API responses: ISO 8601 UTC (`2025-01-15T14:30:00Z`)
- Frontend: Convert on render using user's org timezone

### Phone Numbers

- Format: `+55 11 99999-9999`
- Store: E.164 format (`+5511999999999`)
- Validate: Brazilian mobile (9 digits after DDD)

---

## LGPD Compliance Rules

### Data Protection

- Encrypt `client.phone` at rest (AES-256)
- Encrypt `client.email` at rest
- NEVER log PII (phone, email, name in plain text)

### Data Retention

- Conversation logs: 90 days max
- Implement `DELETE /api/v1/clients/:id/data` for data erasure
- Audit log for all data access

### Consent

- First booking = implicit consent for scheduling
- Explicit opt-in for marketing messages
- Track consent timestamp and source

---

## Booking Link Rules (Public Access)

### Authentication

- NO auth required for booking link
- Public routes: `/api/v1/booking/*`
- Rate limit: 10 requests/minute per IP

### URL Structure

- Format: `booking.zavvy.app/:slug`
- Slug = organization's unique identifier
- Resolve slug → `organization_id` in API

### Data Access

- ONLY expose: services, availability, organization name/avatar
- NEVER expose: client list, appointment details, revenue

### Booking Flow

1. `GET /api/v1/booking/:slug` → org info + services
2. `GET /api/v1/booking/:slug/availability?date=&service=` → time slots
3. `POST /api/v1/booking/:slug/appointments` → create appointment
4. Response includes confirmation code (no auth token)

### Client Creation

- Auto-create client record on first booking
- Match by phone number (E.164)
- If existing client → link to existing record

### Rate Limiting

- 10 req/min per IP for reads
- 3 req/min per IP for booking creation
- Block suspicious patterns (bot detection)

---

_Generated: 2025-12-26 | Zavvy WhatsApp-first Scheduling SaaS_
