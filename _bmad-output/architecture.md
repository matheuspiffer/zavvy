---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - "prd.md"
  - "project-planning-artifacts/product-brief-zavvy-2025-12-25.md"
  - "project-planning-artifacts/ux-design-specification.md"
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2025-12-26'
project_name: 'zavvy'
user_name: 'Piffer'
date: '2025-12-26'
hasProjectContext: true
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

---

## 1. Project Context Analysis

### 1.1 Requirements Summary

| Area | FR Count | Key Requirements |
|------|----------|------------------|
| Onboarding & Signup | 7 | Email/OAuth signup, WhatsApp activation, service wizard |
| Service Configuration | 7 | CRUD services, duration, buffer, pricing |
| Availability Management | 6 | Working hours, breaks, exceptions, blocks |
| **WhatsApp Assistant** | **52** | **Professional Command Center: ~20 intents, hybrid AI, Reply Buttons, List Messages, WhatsApp Flows, CTA URLs, auto-notifications** |
| Appointment Management | 9 | CRUD operations, conflict detection, calendar sync |
| Calendar Integration | 5 | Google Calendar OAuth, bidirectional sync |
| Booking Link | 8 | Public link, service selection, zero-login booking |
| Subscription & Billing | 8 | Stripe integration, trial, paywall |
| Admin Operations | 12 | Templates, monitoring, tenant management |
| **Landing Page** | **18** | **Meta verification prerequisite, waitlist, legal pages, LGPD compliance** |

**Total: 132 Functional Requirements**

### 1.2 Complexity Assessment

| Dimension | Level | Rationale |
|-----------|-------|-----------|
| Integration Complexity | **High** | WhatsApp WABA + Interactive Components, Google Calendar OAuth, Stripe payments |
| Real-time Requirements | **High** | ≤300ms ack, p95 ≤2.5s response, 1.5s AI timeout |
| Multi-tenancy | **Medium-High** | Tenant isolation, centralized WABA routing |
| AI/NLP | **High** | ~20 intents, hybrid processing (AI for text, direct for buttons), 100% AI-generated responses, WhatsApp Flows |
| Compliance | **Medium** | LGPD, Meta/WhatsApp policies |

**Overall Complexity: High**

### 1.3 Central Entity Model

```
                    ┌─────────────────┐
                    │   APPOINTMENT   │
                    │   (Central)     │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│   TENANT      │   │   SERVICE     │   │   CLIENT      │
│   (Business)  │   │   (Offering)  │   │   (Consumer)  │
└───────────────┘   └───────────────┘   └───────────────┘
        │                                        │
        ▼                                        ▼
┌───────────────┐                       ┌───────────────┐
│ AVAILABILITY  │                       │ CONVERSATION  │
│   (Schedule)  │                       │  (WhatsApp)   │
└───────────────┘                       └───────────────┘
```

### 1.4 Key Architectural Implications

1. **Multi-tenant with Centralized WABA**: Single WhatsApp number, routing by tenant_id
2. **WhatsApp as Professional Command Center**: Primary operational channel with full CRUD capabilities
3. **Hybrid AI Processing**: AI analyzes free text → Direct processing for buttons/lists/flows → AI generates ALL responses
4. **Interactive WhatsApp Components**: Reply Buttons, List Messages, WhatsApp Flows, CTA URL Buttons
5. **Event-Driven Core**: Appointment state changes trigger automatic client notifications, calendar syncs
6. **3-Layer Fallback**: Ack (300ms) → AI processing (1.5s timeout) → Deterministic with buttons
7. **Calendar as External Source of Truth**: Bidirectional sync with conflict resolution
8. **Graceful Degradation**: Errors always offer web fallback via CTA URL Button

### 1.5 Cross-Cutting Concerns

- **Tenant Isolation**: Row-level security, API scoping
- **Observability**: Structured logging, metrics, distributed tracing
- **Rate Limiting**: WhatsApp API limits, calendar sync throttling
- **Graceful Degradation**: Queue-based retry, circuit breakers

---

## 2. Technology Stack & Architecture

### 2.1 Selected Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **API Framework** | Hono | Lightweight, fast, edge-ready, excellent for webhooks |
| **ORM** | Drizzle ORM | Type-safe, high performance, native PostgreSQL support |
| **Database** | PostgreSQL | Robust, Row Level Security for multi-tenancy |
| **Frontend Web** | Vite + React | Fast SPA for professionals |
| **Frontend Admin** | Vite + React | Separate SPA for Zavvy operators |
| **Landing Page** | Next.js (App Router) | SSR/SSG for SEO, Meta verification |
| **Auth** | Better Auth + Organization plugin | Multi-tenancy ready, OAuth support |
| **Styling** | Tailwind CSS + shadcn/ui | Per UX Design Specification |

### 2.2 Architecture Overview

```
┌─────────────────────┐   ┌─────────────────────┐
│   Vite Web App      │   │   Vite Admin        │
│   (Profissionais)   │   │   (Zavvy Ops)       │
│   - Dashboard       │   │   - Templates       │
│   - Booking config  │   │   - Monitoring      │
│   - Settings        │   │   - Tenants         │
└──────────┬──────────┘   └──────────┬──────────┘
           │                         │
           └───────────┬─────────────┘
                       │ REST/JSON
           ┌───────────▼───────────┐
           │       Hono API        │
           │  ├─ /api/auth/*       │ ← Better Auth
           │  ├─ /api/v1/*         │ ← Business logic
           │  ├─ /webhooks/wa      │ ← WhatsApp
           │  └─ /webhooks/stripe  │ ← Payments
           └───────────┬───────────┘
                       │
           ┌───────────▼───────────┐
           │   Drizzle ORM         │
           └───────────┬───────────┘
                       │
           ┌───────────▼───────────┐
           │     PostgreSQL        │
           │  + Row Level Security │
           └───────────────────────┘
```

### 2.3 Multi-Tenancy Model

```
User (1) ──── belongs to ────► (1) Organization (Tenant)

MVP Constraint: 1 user = 1 organization
Future-ready: Schema supports 1 user = N organizations
```

**Implementation:**
- Better Auth Organization plugin handles tenant association
- Drizzle enforces `organization_id` on all tenant-scoped tables
- PostgreSQL RLS policies for data isolation

### 2.4 Monorepo Structure

```
zavvy/
├── apps/
│   ├── api/              # Hono API server
│   │   ├── src/
│   │   │   ├── routes/   # API routes
│   │   │   ├── services/ # Business logic
│   │   │   ├── webhooks/ # WhatsApp, Stripe handlers
│   │   │   └── index.ts  # Hono app entry
│   │   └── package.json
│   ├── web/              # Vite - Professional dashboard
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   └── main.tsx
│   │   └── package.json
│   ├── admin/            # Vite - Zavvy operations
│   │   ├── src/
│   │   └── package.json
│   ├── booking/          # Vite - Public booking link
│   │   ├── src/
│   │   └── package.json
│   └── landing/          # Next.js - Public landing page (Meta verification)
│       ├── app/
│       └── package.json
├── packages/
│   ├── db/               # Drizzle schema + migrations
│   │   ├── schema/
│   │   ├── migrations/
│   │   └── drizzle.config.ts
│   ├── auth/             # Better Auth shared config
│   ├── ui/               # shadcn/ui shared components
│   └── shared/           # Zod schemas, utils
├── package.json          # pnpm workspace
├── pnpm-workspace.yaml
└── turbo.json            # Turborepo config
```

### 2.5 Key Architectural Decisions

| Decision | Choice | Alternative Considered | Rationale |
|----------|--------|------------------------|-----------|
| API Framework | Hono | Next.js API, NestJS | Lightweight, no cold starts, edge-compatible |
| Frontend | Vite SPA | Next.js | Simpler, faster dev, no SSR needed for dashboard |
| Auth | Better Auth | NextAuth, Clerk | Free, organization plugin, self-hosted |
| ORM | Drizzle | Prisma | Better performance, native PostgreSQL features |
| Monorepo | Turborepo + pnpm | Nx, Lerna | Simpler config, fast builds |

---

## 3. Core Architectural Decisions

### 3.1 Data Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Validation** | Zod | Type-safe, integrates with Drizzle (`drizzle-zod`) and Better Auth |
| **Cache** | Redis | Required for rate limiting, session, job queues |
| **Background Jobs** | BullMQ | Redis-based, scheduled jobs for reminders, retry logic |

**BullMQ Queues:**
```
zavvy-queues/
├── reminder-queue      # Appointment reminders (24h, 1h before)
├── calendar-sync       # Google Calendar bidirectional sync
├── notification-queue  # WhatsApp/email notifications
└── whatsapp-processor  # Incoming message processing
```

### 3.2 Authentication & Security

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Authorization** | Organization-based | All data filtered by `organization_id`, RBAC-ready schema |
| **Rate Limiting** | Redis-based | Protects WhatsApp API limits, prevents abuse |
| **CORS** | Whitelist | Only web app, admin, booking link domains |
| **Webhook Auth** | Signature verification | HMAC for WhatsApp, secret for Stripe |

**LGPD Compliance:**
| Data | Protection |
|------|------------|
| Client phone numbers | Encrypted at rest |
| Conversation logs | 90-day retention policy |
| Payment data | Stripe handles (PCI compliant) |

### 3.3 API & Communication

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **API Style** | REST | Simple, well-understood, Hono native |
| **Versioning** | `/api/v1/*` | URL-based versioning |
| **Documentation** | OpenAPI + Scalar UI | Auto-generated from Zod schemas via `@hono/zod-openapi` |
| **Real-time** | SSE | Unidirectional server→client, native Hono support |

**Response Format:**
```typescript
// Success
{
  "data": { ... },
  "meta": { "timestamp": "2025-01-01T00:00:00Z" }
}

// Error
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [{ "field": "email", "message": "Invalid email format" }]
  }
}
```

**Error Handling:**
| Error Type | HTTP Code | Handling |
|------------|-----------|----------|
| Validation | 400 | Zod errors formatted |
| Unauthorized | 401 | Better Auth handles |
| Forbidden | 403 | Organization scope violation |
| Not Found | 404 | Resource-specific message |
| Rate Limited | 429 | Retry-After header |
| Server Error | 500 | Log to Sentry, generic response |

### 3.4 Frontend Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Server State** | TanStack Query | Caching, refetch, optimistic updates |
| **Client State** | Zustand | Lightweight, simple API for UI state |
| **Routing** | TanStack Router | Type-safe, file-based, integrates with TanStack Query |
| **Forms** | React Hook Form + Zod | Performant, schema validation |
| **HTTP Client** | ky | Lightweight fetch wrapper, clean syntax |

**State Architecture:**
```
┌─────────────────────────────────────────────────┐
│                  React App                       │
├─────────────────────────────────────────────────┤
│  TanStack Query          │  Zustand             │
│  ├─ appointments         │  ├─ ui.sidebarOpen   │
│  ├─ services             │  ├─ ui.currentModal  │
│  ├─ clients              │  └─ ui.theme         │
│  └─ dashboard stats      │                      │
└─────────────────────────────────────────────────┘
```

### 3.5 Infrastructure & Deployment

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Hosting** | Railway | All-in-one, PostgreSQL + Redis included, simple |
| **CI/CD** | GitHub Actions + Railway | Tests/lint in GH Actions, auto-deploy on Railway |
| **Error Tracking** | Sentry | Free tier, excellent error grouping |
| **Logging** | Pino | Structured JSON logs, high performance |

**Environment Strategy:**
| Environment | Branch | URL |
|-------------|--------|-----|
| Development | local | localhost:* |
| Staging | `develop` | staging.zavvy.app |
| Production | `main` | app.zavvy.app |

**Deployment Flow:**
```
Push to develop → GitHub Actions (test, lint) → Railway staging
Push to main    → GitHub Actions (test, lint) → Railway production
```

### 3.6 WhatsApp & AI Architecture

**WhatsApp as Professional Command Center:**

WhatsApp is the PRIMARY operational channel. Professionals can perform almost all operations via WhatsApp that they can do on web.

#### 3.6.1 Interactive Components (Meta Cloud API)

| Component | Usage | Implementation |
|-----------|-------|----------------|
| **Reply Buttons** | Confirmations, quick actions, contextual suggestions | Max 3 buttons per message |
| **List Messages** | Client selection, service selection, time slots | Max 10 items with sections |
| **WhatsApp Flows** | Forms: new client, new service, edit data | Meta-approved JSON flows |
| **CTA URL Buttons** | Redirect to web (OAuth, payments, settings) | Max 2 buttons with URL |

#### 3.6.2 Hybrid AI Processing Model

```
┌─────────────────────────────────────────────────────────────┐
│                    MESSAGE RECEIVED                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    INPUT TYPE CHECK                          │
├─────────────────────────────────────────────────────────────┤
│ Free text message    │ Button/List/Flow response            │
│         │            │              │                        │
│         ▼            │              ▼                        │
│   AI Intent Analysis │        Direct Action                  │
│   (LLM - 1.5s max)   │   (No AI analysis needed)            │
│         │            │              │                        │
│         └────────────┼──────────────┘                        │
│                      ▼                                       │
│              Execute Business Logic                          │
│                      │                                       │
│                      ▼                                       │
│         AI Response Generation (ALWAYS)                      │
│         - Natural Brazilian Portuguese                       │
│         - Contextual suggestions                             │
│         - Reply Buttons for next actions                     │
└─────────────────────────────────────────────────────────────┘
```

#### 3.6.3 Intent Categories

| Category | Intents | Components Used |
|----------|---------|-----------------|
| **Schedule Queries** | view_agenda, next_client, appointment_details, availability_check | Text + List/Buttons |
| **Appointments** | create, reschedule, cancel | Conversation + Confirmation Buttons |
| **Blocks** | block_time, unblock_time, view_blocks | Conversation + Buttons |
| **Clients** | search, view, create, edit | List + WhatsApp Flow |
| **Services** | list, create, edit, toggle | List + WhatsApp Flow |
| **Availability** | view, change_hours, add_exception, remove_exception | Conversation + Buttons |
| **Help** | menu, help | Text + List Menu |
| **Web Redirect** | connect_calendar, payments, reports, settings | CTA URL Button |

#### 3.6.4 AI/LLM Stack

| Component | Choice | Rationale |
|-----------|--------|-----------|
| **SDK** | Vercel AI SDK | Unified API, streaming support, easy provider switching |
| **LLM Provider** | OpenAI | GPT-4o-mini for speed/cost, GPT-4o for complex cases |
| **Model (Intent)** | gpt-4o-mini | Fast (~300-500ms), cost-effective, good pt-BR |
| **Model (Response)** | gpt-4o-mini | Consistent tone, streaming capable |
| **Timeout** | 1.5s hard limit | Fallback to deterministic response |
| **Language** | Brazilian Portuguese (native) | Target market |
| **Tone** | Informal, friendly, helpful | "Assistant, not tool" positioning |

**Vercel AI SDK Benefits:**
- Unified API for multiple providers (easy to switch if needed)
- Built-in streaming support
- Edge-compatible
- TypeScript-first
- Tool calling / function calling support

**Implementation Pattern:**
```typescript
// apps/api/src/lib/ai/client.ts
import { openai } from '@ai-sdk/openai'
export const aiModel = openai('gpt-4o-mini')

// apps/api/src/lib/ai/intent.ts
import { generateText } from 'ai'
import { aiModel } from './client'

export async function recognizeIntent(message: string, context: ConversationContext) {
  const { text: intent } = await generateText({
    model: aiModel,
    system: INTENT_SYSTEM_PROMPT,
    prompt: buildIntentPrompt(message, context),
    maxTokens: 50,
    temperature: 0,
  })
  return intent
}

// apps/api/src/lib/ai/response.ts
export async function generateResponse(intent: string, data: BusinessData, context: Context) {
  const { text: response } = await generateText({
    model: aiModel,
    system: RESPONSE_SYSTEM_PROMPT,
    prompt: buildResponsePrompt(intent, data, context),
    maxTokens: 500,
    temperature: 0.7,
  })
  return response
}
```

**AI Module Structure:**
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

**Cost Optimization:**
- Skip LLM analysis for structured inputs (buttons, lists, flows)
- Use gpt-4o-mini (10x cheaper than gpt-4o)
- Rate limit per tenant
- Cache common response patterns
- Fallback to deterministic on timeout

#### 3.6.5 Fallback Strategy

| Layer | Timing | Action |
|-------|--------|--------|
| **Layer 1** | 0-300ms | Immediate ack: "👌 Já vejo isso pra você..." |
| **Layer 2** | 300ms-1.5s | LLM processes intent |
| **Layer 3** | >1.5s | Deterministic response with List/Buttons |

**Error Fallback:**
- NEVER show technical errors
- ALWAYS offer: [Tentar novamente] [Fazer pelo app]
- CTA URL deep-links to relevant web section

#### 3.6.6 BullMQ Workers for WhatsApp

```
whatsapp-queues/
├── whatsapp.message.received   # Incoming message processing
├── whatsapp.message.send       # Outgoing message (interactive)
├── whatsapp.template.send      # Template-based notifications
├── whatsapp.flow.process       # WhatsApp Flow submissions
└── whatsapp.ai.generate        # AI response generation
```

### 3.7 Decision Impact Analysis

**Implementation Sequence (Updated for Meta Verification Dependencies):**

**Phase 0: Meta Verification Prerequisites**
1. Landing Page (public website for Meta Business verification)
2. Terms of Use + Privacy Policy pages (LGPD)
3. Waitlist functionality (email collection)

**Phase 1: Admin Panel (Template/Flow Creation)**
4. Monorepo setup (Turborepo + pnpm)
5. Database schema (Drizzle + PostgreSQL)
6. Basic API (Hono + Admin routes)
7. Admin Panel (templates, flows for Meta approval)

**Phase 2: Core Infrastructure**
8. Auth setup (Better Auth + Organization)
9. API foundation (Hono + OpenAPI)
10. Frontend foundation (Vite + TanStack)
11. Background jobs (BullMQ + Redis)

**Phase 3: WhatsApp (Post-Meta Approval)**
12. WhatsApp webhook + basic messaging
13. AI/LLM integration + intent recognition
14. Interactive components (Buttons, Lists, Flows)

**Phase 4: Full Product**
15. Professional Web App
16. Booking Link
17. External integrations (Calendar, Stripe)

**Cross-Component Dependencies:**
```
Zod ──────► Drizzle (schema validation)
    ├─────► React Hook Form (form validation)
    ├─────► Hono OpenAPI (API validation)
    └─────► Better Auth (auth validation)

Redis ────► BullMQ (job queues)
      ├───► Rate Limiting (API + AI protection)
      └───► Cache (availability, sessions, AI responses)

LLM ──────► Intent Recognition (free text)
     └────► Response Generation (ALL messages)
```

---

## 4. Implementation Patterns & Consistency Rules

### 4.1 Naming Patterns

#### Database Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Tables | `snake_case`, plural | `appointments`, `services`, `clients` |
| Columns | `snake_case` | `created_at`, `organization_id`, `start_time` |
| Foreign Keys | `{table_singular}_id` | `client_id`, `service_id`, `organization_id` |
| Indexes | `idx_{table}_{column}` | `idx_appointments_date`, `idx_clients_phone` |
| Enums | `PascalCase` | `AppointmentStatus`, `NotificationType` |
| Constraints | `{table}_{type}_{column}` | `appointments_fk_client_id` |

#### API Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Endpoints | plural, `kebab-case` | `/api/v1/appointments`, `/api/v1/booking-links` |
| Route params | `:camelCase` | `/appointments/:appointmentId` |
| Query params | `camelCase` | `?startDate=2025-01-01&organizationId=123` |
| Headers | `X-Custom-Name` | `X-Organization-Id`, `X-Request-Id` |
| Webhooks | `/webhooks/{provider}` | `/webhooks/whatsapp`, `/webhooks/stripe` |

#### Code Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Component files | `PascalCase.tsx` | `AppointmentCard.tsx`, `ServiceList.tsx` |
| Utility files | `camelCase.ts` | `dateHelpers.ts`, `formatters.ts` |
| Hook files | `use{Name}.ts` | `useAppointments.ts`, `useAuth.ts` |
| Functions | `camelCase` | `getAppointmentById()`, `formatPhoneNumber()` |
| Types/Interfaces | `PascalCase` | `Appointment`, `CreateAppointmentInput` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_RETRY_ATTEMPTS`, `DEFAULT_TIMEZONE` |
| Zod schemas | `camelCase` + Schema | `appointmentSchema`, `createServiceSchema` |
| Environment vars | `UPPER_SNAKE_CASE` | `DATABASE_URL`, `WHATSAPP_API_KEY` |

### 4.2 Structure Patterns

#### Test Organization

| Test Type | Location | Naming |
|-----------|----------|--------|
| Unit tests | Co-located | `appointment.test.ts` next to `appointment.ts` |
| Integration | `tests/integration/` | `appointments.integration.test.ts` |
| E2E | `tests/e2e/` | `booking-flow.e2e.test.ts` |

#### Feature-Based Organization

```
apps/web/src/
├── features/
│   ├── appointments/
│   │   ├── components/
│   │   │   ├── AppointmentCard.tsx
│   │   │   └── AppointmentList.tsx
│   │   ├── hooks/
│   │   │   └── useAppointments.ts
│   │   ├── api/
│   │   │   └── appointments.ts
│   │   └── index.ts          # Public exports
│   ├── services/
│   ├── clients/
│   └── dashboard/
├── shared/
│   ├── components/           # Shared UI (from packages/ui)
│   ├── hooks/               # Shared hooks
│   └── utils/               # Shared utilities
└── app/                     # TanStack Router pages
```

### 4.3 Format Patterns

#### JSON Field Conventions

| Context | Convention | Transformation |
|---------|------------|----------------|
| API responses | `camelCase` | Drizzle auto-maps from snake_case |
| Database | `snake_case` | Native PostgreSQL |
| Frontend | `camelCase` | Matches API |

#### Date/Time Standards

| Context | Format | Example |
|---------|--------|---------|
| API (JSON) | ISO 8601 UTC | `"2025-01-15T14:30:00Z"` |
| Display (BR) | `DD/MM/YYYY HH:mm` | `15/01/2025 14:30` |
| Database | `timestamptz` | Always UTC |
| Timezone | America/Sao_Paulo | For display conversion |

#### API Response Structures

```typescript
// Single resource
{
  "data": { "id": "123", "name": "..." },
  "meta": { "timestamp": "2025-01-01T00:00:00Z" }
}

// Collection with pagination
{
  "data": [{ ... }, { ... }],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "hasMore": true,
    "timestamp": "2025-01-01T00:00:00Z"
  }
}

// Error response
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human readable message",
    "details": [
      { "field": "email", "message": "Invalid email format" }
    ]
  }
}
```

### 4.4 Communication Patterns

#### BullMQ Event Naming

| Pattern | Convention | Examples |
|---------|------------|----------|
| Domain events | `{domain}.{action}` | `appointment.created`, `client.updated` |
| Commands | `{domain}.{verb}` | `reminder.send`, `calendar.sync` |
| Completed | Past tense | `reminder.sent`, `notification.delivered` |

**Standard Job Names:**
```typescript
// Appointments
'appointment.created'
'appointment.updated'
'appointment.cancelled'
'appointment.reminder.send'

// Calendar
'calendar.sync.start'
'calendar.sync.complete'
'calendar.event.push'

// WhatsApp
'whatsapp.message.received'
'whatsapp.message.send'
'whatsapp.template.send'

// Notifications
'notification.send'
'notification.delivered'
'notification.failed'
```

#### Zustand Store Patterns

```typescript
// Store naming: use{Domain}Store
export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  currentModal: null,

  // Actions: verbNoun pattern
  openSidebar: () => set({ sidebarOpen: true }),
  closeSidebar: () => set({ sidebarOpen: false }),
  openModal: (modal) => set({ currentModal: modal }),
  closeModal: () => set({ currentModal: null }),
}))

// Separate stores by domain
useUIStore      // UI state (modals, sidebar)
useAuthStore    // Auth state (user, session)
```

### 4.5 Process Patterns

#### Loading State Pattern

```typescript
// TanStack Query standard pattern
const { data, isLoading, isError, error } = useQuery({
  queryKey: ['appointments', filters],
  queryFn: () => api.appointments.list(filters),
})

// UI rendering pattern
if (isLoading) return <AppointmentsSkeleton />
if (isError) return <ErrorState error={error} onRetry={refetch} />
return <AppointmentsList data={data} />
```

#### Error Handling Layers

| Layer | Strategy | Action |
|-------|----------|--------|
| API Routes | Global middleware | Log to Sentry, return formatted error |
| Frontend | Error boundaries | Show fallback UI per feature |
| Background Jobs | Retry + DLQ | 3 retries, exponential backoff, then dead letter |
| External APIs | Circuit breaker | Fail fast after threshold |

#### Retry Configuration

```typescript
// BullMQ job options
const defaultJobOptions = {
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 1000,  // 1s, 2s, 4s
  },
  removeOnComplete: 100,  // Keep last 100
  removeOnFail: 500,      // Keep last 500 for debugging
}
```

### 4.6 Enforcement Guidelines

**All AI Agents MUST:**

1. Follow naming conventions exactly as documented
2. Place new code in the correct feature directory
3. Use established response/error formats
4. Add tests co-located with the code
5. Use BullMQ for any async/background work
6. Log errors to Sentry before returning error responses

**Pattern Verification:**
- ESLint rules enforce naming conventions
- TypeScript strict mode catches type mismatches
- PR review checklist includes pattern compliance
- CI fails on linting errors

---

## 5. Project Structure & Boundaries

### 5.1 Complete Monorepo Structure

```
zavvy/
├── README.md
├── package.json                    # Workspace root
├── pnpm-workspace.yaml
├── turbo.json                      # Turborepo config
├── tsconfig.base.json              # Shared TS config
├── .env.example
├── .gitignore
├── .github/
│   └── workflows/
│       ├── ci.yml                  # Lint, test, typecheck
│       └── deploy.yml              # Railway deploy
│
├── apps/
│   ├── api/                        # Hono API Server
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── .env.example
│   │   ├── src/
│   │   │   ├── index.ts            # Entry point
│   │   │   ├── app.ts              # Hono app setup
│   │   │   ├── routes/
│   │   │   │   ├── index.ts        # Route aggregator
│   │   │   │   ├── auth.ts         # /api/auth/*
│   │   │   │   ├── appointments.ts # /api/v1/appointments
│   │   │   │   ├── services.ts     # /api/v1/services
│   │   │   │   ├── clients.ts      # /api/v1/clients
│   │   │   │   ├── availability.ts # /api/v1/availability
│   │   │   │   ├── booking-links.ts
│   │   │   │   └── dashboard.ts    # /api/v1/dashboard
│   │   │   ├── webhooks/
│   │   │   │   ├── whatsapp.ts     # /webhooks/whatsapp
│   │   │   │   ├── stripe.ts       # /webhooks/stripe
│   │   │   │   └── calendar.ts     # /webhooks/calendar
│   │   │   ├── services/
│   │   │   │   ├── appointment.service.ts
│   │   │   │   ├── calendar-sync.service.ts
│   │   │   │   ├── whatsapp.service.ts
│   │   │   │   ├── notification.service.ts
│   │   │   │   └── ai-intent.service.ts
│   │   │   ├── jobs/
│   │   │   │   ├── queues.ts       # BullMQ queue definitions
│   │   │   │   ├── workers/
│   │   │   │   │   ├── reminder.worker.ts
│   │   │   │   │   ├── calendar-sync.worker.ts
│   │   │   │   │   ├── notification.worker.ts
│   │   │   │   │   └── whatsapp.worker.ts
│   │   │   │   └── index.ts
│   │   │   ├── middleware/
│   │   │   │   ├── auth.ts
│   │   │   │   ├── organization.ts # Tenant scoping
│   │   │   │   ├── rate-limit.ts
│   │   │   │   └── error-handler.ts
│   │   │   ├── lib/
│   │   │   │   ├── redis.ts
│   │   │   │   ├── sentry.ts
│   │   │   │   └── logger.ts       # Pino config
│   │   │   └── types/
│   │   │       └── index.ts
│   │   └── tests/
│   │       ├── routes/
│   │       └── services/
│   │
│   ├── web/                        # Vite - Professional Dashboard
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   ├── index.html
│   │   ├── src/
│   │   │   ├── main.tsx
│   │   │   ├── app/                # TanStack Router
│   │   │   │   ├── routes/
│   │   │   │   │   ├── __root.tsx
│   │   │   │   │   ├── index.tsx           # Dashboard
│   │   │   │   │   ├── appointments.tsx
│   │   │   │   │   ├── services.tsx
│   │   │   │   │   ├── clients.tsx
│   │   │   │   │   ├── settings.tsx
│   │   │   │   │   └── onboarding/
│   │   │   │   │       ├── index.tsx
│   │   │   │   │       ├── whatsapp.tsx
│   │   │   │   │       ├── services.tsx
│   │   │   │   │       └── availability.tsx
│   │   │   │   └── router.ts
│   │   │   ├── features/
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── components/
│   │   │   │   │   ├── hooks/
│   │   │   │   │   └── api/
│   │   │   │   ├── appointments/
│   │   │   │   ├── services/
│   │   │   │   ├── clients/
│   │   │   │   ├── settings/
│   │   │   │   └── onboarding/
│   │   │   ├── shared/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useAuth.ts
│   │   │   │   └── lib/
│   │   │   │       ├── api.ts      # ky client
│   │   │   │       └── queryClient.ts
│   │   │   ├── stores/
│   │   │   │   └── ui.store.ts
│   │   │   └── styles/
│   │   │       └── globals.css
│   │   └── tests/
│   │
│   ├── admin/                      # Vite - Zavvy Operations
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── src/
│   │   │   ├── main.tsx
│   │   │   ├── app/
│   │   │   │   └── routes/
│   │   │   │       ├── index.tsx       # Dashboard
│   │   │   │       ├── tenants.tsx
│   │   │   │       ├── templates.tsx   # WhatsApp templates
│   │   │   │       └── monitoring.tsx
│   │   │   └── features/
│   │   │       ├── tenants/
│   │   │       ├── templates/
│   │   │       └── monitoring/
│   │   └── tests/
│   │
│   ├── booking/                    # Vite - Public Booking Link
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── src/
│   │   │   ├── main.tsx
│   │   │   ├── app/
│   │   │   │   └── routes/
│   │   │   │       ├── $slug.tsx       # /:slug (booking link)
│   │   │   │       └── $slug.confirm.tsx
│   │   │   └── features/
│   │   │       └── booking/
│   │   │           ├── components/
│   │   │           │   ├── ServiceSelect.tsx
│   │   │           │   ├── DateTimePicker.tsx
│   │   │           │   ├── ClientForm.tsx
│   │   │           │   └── Confirmation.tsx
│   │   │           └── api/
│   │   └── tests/
│   │
│   └── landing/                    # Next.js - Public Landing Page (Phase 0)
│       ├── package.json
│       ├── next.config.js
│       ├── tailwind.config.ts
│       ├── app/
│       │   ├── layout.tsx              # Root layout + metadata
│       │   ├── page.tsx                # Home landing page (/)
│       │   ├── termos-de-uso/
│       │   │   └── page.tsx            # Terms of Use
│       │   ├── politica-de-privacidade/
│       │   │   └── page.tsx            # Privacy Policy
│       │   └── api/
│       │       └── waitlist/
│       │           └── route.ts        # POST /api/waitlist
│       ├── components/
│       │   ├── Header.tsx
│       │   ├── Hero.tsx
│       │   ├── PainPoints.tsx
│       │   ├── HowItWorks.tsx
│       │   ├── Features.tsx
│       │   ├── Pricing.tsx
│       │   ├── FAQ.tsx
│       │   ├── WaitlistForm.tsx
│       │   ├── CookieConsent.tsx
│       │   └── Footer.tsx
│       ├── lib/
│       │   └── analytics.ts
│       └── public/
│           └── images/
│
├── packages/
│   ├── db/                         # Drizzle ORM
│   │   ├── package.json
│   │   ├── drizzle.config.ts
│   │   ├── src/
│   │   │   ├── index.ts            # DB client export
│   │   │   ├── schema/
│   │   │   │   ├── index.ts
│   │   │   │   ├── organizations.ts
│   │   │   │   ├── users.ts
│   │   │   │   ├── services.ts
│   │   │   │   ├── appointments.ts
│   │   │   │   ├── clients.ts
│   │   │   │   ├── availability.ts
│   │   │   │   ├── conversations.ts
│   │   │   │   └── subscriptions.ts
│   │   │   └── migrations/
│   │   └── package.json
│   │
│   ├── auth/                       # Better Auth config
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── server.ts           # Server-side auth
│   │   │   └── client.ts           # Client-side auth
│   │   └── package.json
│   │
│   ├── ui/                         # Shared shadcn/ui
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   └── ...
│   │   │   └── index.ts
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   │
│   └── shared/                     # Shared utilities
│       ├── package.json
│       ├── src/
│       │   ├── schemas/            # Zod schemas
│       │   │   ├── appointment.ts
│       │   │   ├── service.ts
│       │   │   └── client.ts
│       │   ├── types/
│       │   │   └── index.ts
│       │   └── utils/
│       │       ├── dates.ts
│       │       └── phone.ts
│       └── package.json
│
└── tests/
    ├── e2e/                        # Playwright E2E
    │   ├── booking-flow.spec.ts
    │   ├── onboarding.spec.ts
    │   └── playwright.config.ts
    └── integration/
        └── api.integration.test.ts
```

### 5.2 Architectural Boundaries

#### API Boundaries

| Boundary | Endpoints | Auth Required |
|----------|-----------|---------------|
| Public API | `/api/v1/booking/*` | No (public booking) |
| Professional API | `/api/v1/*` | Yes (Better Auth session) |
| Admin API | `/api/admin/*` | Yes (Zavvy operator role) |
| Webhooks | `/webhooks/*` | Signature verification |

#### Data Boundaries

| Package | Responsibility | Consumers |
|---------|---------------|-----------|
| `@zavvy/db` | Schema, migrations, client | `apps/api` only |
| `@zavvy/auth` | Auth config, session | `apps/api`, `apps/web`, `apps/admin` |
| `@zavvy/ui` | UI components | `apps/web`, `apps/admin`, `apps/booking`, `apps/landing` |
| `@zavvy/shared` | Zod schemas, utils | All apps and packages |

### 5.3 Requirements to Structure Mapping

| PRD Area | Primary Location | Secondary |
|----------|-----------------|-----------|
| **Onboarding & Signup** | `apps/web/src/features/onboarding/` | `apps/api/src/routes/auth.ts` |
| **Booking Link** | `apps/booking/` | `apps/api/src/routes/booking-links.ts` |
| **WhatsApp Conversations** | `apps/api/src/webhooks/whatsapp.ts` | `services/whatsapp.service.ts` |
| **Appointment Management** | `apps/api/src/routes/appointments.ts` | `apps/web/src/features/appointments/` |
| **Calendar Integration** | `apps/api/src/services/calendar-sync.service.ts` | `jobs/workers/calendar-sync.worker.ts` |
| **Notifications & Reminders** | `apps/api/src/jobs/workers/` | `services/notification.service.ts` |
| **Web App Dashboard** | `apps/web/src/features/dashboard/` | `apps/api/src/routes/dashboard.ts` |
| **Subscription & Billing** | `apps/api/src/webhooks/stripe.ts` | `apps/web/src/features/settings/` |
| **Settings & Preferences** | `apps/web/src/features/settings/` | `apps/api/src/routes/settings.ts` |

### 5.4 Integration Points

#### External Services

| Service | Integration Point | Handler |
|---------|------------------|---------|
| WhatsApp WABA | `POST /webhooks/whatsapp` | `whatsapp.worker.ts` |
| Google Calendar | OAuth + `POST /webhooks/calendar` | `calendar-sync.worker.ts` |
| Stripe | `POST /webhooks/stripe` | Direct in webhook handler |
| AI/NLP | `ai-intent.service.ts` | Called from WhatsApp worker |

#### Internal Communication

```
apps/web ──► REST ──► apps/api ──► packages/db
apps/admin ──► REST ──► apps/api ──► packages/db
apps/booking ──► REST ──► apps/api ──► packages/db

apps/api ──► BullMQ ──► Redis ──► Workers
Workers ──► External APIs (WhatsApp, Calendar, Stripe)
```

### 5.5 Development Workflow

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in dev mode |
| `pnpm dev:api` | Start API only |
| `pnpm dev:web` | Start web dashboard only |
| `pnpm build` | Build all packages and apps |
| `pnpm test` | Run all tests |
| `pnpm db:migrate` | Run Drizzle migrations |
| `pnpm db:studio` | Open Drizzle Studio |

---

## 6. Architecture Validation Results

### 6.1 Coherence Validation ✅

**Decision Compatibility:**
All technology choices verified compatible:
- Hono + Drizzle: Both TypeScript-first, work seamlessly together
- Better Auth + Hono: Better Auth has official Hono adapter
- TanStack Router + Query: Same family, native integration
- Vite + React + shadcn/ui: Standard stack, well-documented
- BullMQ + Redis: BullMQ is built on Redis
- Zod: Used consistently across Drizzle, forms, API validation

**Pattern Consistency:**
- Naming conventions align with TypeScript/Node.js ecosystem
- Structure patterns support monorepo architecture
- Communication patterns match async event-driven design

**Structure Alignment:**
- Project structure fully supports all architectural decisions
- Clear separation between apps and shared packages
- Integration points properly mapped

### 6.2 Requirements Coverage ✅

**Functional Requirements: 75/75 Covered**

| PRD Area | Count | Architectural Support |
|----------|-------|----------------------|
| Onboarding & Signup | 6 | `apps/web/features/onboarding/` + Better Auth |
| Booking Link | 8 | `apps/booking/` + public API routes |
| WhatsApp Conversations | 12 | Webhooks + BullMQ workers + AI intent service |
| Appointment Management | 10 | REST API + Web features + Drizzle schema |
| Calendar Integration | 8 | calendar-sync.service + dedicated worker |
| Notifications & Reminders | 9 | BullMQ scheduled jobs + notification worker |
| Web App Dashboard | 10 | `apps/web/features/dashboard/` + SSE |
| Subscription & Billing | 7 | Stripe webhook + subscription routes |
| Settings & Preferences | 5 | `apps/web/features/settings/` |

**Non-Functional Requirements:**

| Requirement | Architectural Support |
|-------------|----------------------|
| ≤300ms WhatsApp ack | Hono (lightweight) + dedicated always-on worker |
| p95 ≤2.5s response | Redis caching + optimized Drizzle queries |
| Multi-tenancy | Better Auth organization plugin + PostgreSQL RLS |
| LGPD compliance | Encryption at rest + 90-day retention policy |
| Scalability | Stateless API + Redis-based job queue |

### 6.3 Testing Strategy (Added)

| Layer | Tool | Scope |
|-------|------|-------|
| **Unit Tests** | Vitest | Functions, services, utilities |
| **Component Tests** | Vitest + Testing Library | React components |
| **Integration Tests** | Vitest | API routes, database operations |
| **E2E Tests** | Playwright | Full user flows |

**Testing Configuration:**
```
zavvy/
├── vitest.config.ts          # Root shared config
├── vitest.workspace.ts       # Workspace definition
├── apps/
│   ├── api/vitest.config.ts  # Node environment
│   └── web/vitest.config.ts  # JSDOM environment
└── tests/e2e/
    └── playwright.config.ts  # E2E configuration
```

### 6.4 Implementation Readiness ✅

**Decision Completeness:**
- [x] All critical decisions documented
- [x] Technology versions can be verified at implementation time
- [x] Patterns comprehensive for consistent implementation
- [x] Examples provided for major patterns

**Structure Completeness:**
- [x] Full directory tree defined
- [x] All files and directories specified
- [x] Integration points clearly mapped
- [x] Component boundaries well-defined

**Pattern Completeness:**
- [x] All naming conventions specified
- [x] Communication patterns fully defined
- [x] Error handling patterns documented
- [x] Testing strategy included

### 6.5 Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed (75 FRs)
- [x] Scale and complexity assessed (Medium-High)
- [x] Technical constraints identified (WhatsApp latency, LGPD)
- [x] Cross-cutting concerns mapped (tenant isolation, observability)

**✅ Architectural Decisions**
- [x] Critical decisions documented (Hono, Drizzle, Better Auth)
- [x] Technology stack fully specified
- [x] Integration patterns defined (REST, webhooks, BullMQ)
- [x] Performance considerations addressed

**✅ Implementation Patterns**
- [x] Naming conventions established
- [x] Structure patterns defined (feature-based)
- [x] Communication patterns specified (events, state)
- [x] Process patterns documented (error handling, retry)

**✅ Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### 6.6 Architecture Readiness Assessment

**Overall Status: ✅ READY FOR IMPLEMENTATION**

**Confidence Level: HIGH**

**Key Strengths:**
1. Modern, lightweight stack (Hono, Vite, Drizzle)
2. Type-safe end-to-end (Zod everywhere)
3. Clear multi-tenancy model (Better Auth organizations)
4. Event-driven architecture (BullMQ) for async operations
5. Well-defined boundaries and patterns

**Areas for Future Enhancement:**
1. Detailed caching strategy (post-MVP)
2. Advanced monitoring/APM (post-MVP)
3. Multi-region deployment (scale phase)

---

## 7. Architecture Completion Summary

### Workflow Completion

| Item | Status |
|------|--------|
| **Architecture Decision Workflow** | COMPLETED ✅ |
| **Total Steps Completed** | 8 |
| **Date Completed** | 2025-12-26 |
| **Document Location** | `_bmad-output/architecture.md` |

### Final Architecture Deliverables

**Complete Architecture Document:**
- 20+ architectural decisions documented
- 5 implementation pattern categories defined
- 5 apps + 4 packages in monorepo structure
- 132 functional requirements fully supported

### Technology Stack Summary

| Layer | Technology |
|-------|------------|
| **API** | Hono |
| **Database** | PostgreSQL + Drizzle ORM |
| **Auth** | Better Auth + Organization plugin |
| **Cache/Queue** | Redis + BullMQ |
| **Frontend (Apps)** | Vite + React + TanStack |
| **Frontend (Landing)** | Next.js (App Router) |
| **Styling** | Tailwind CSS + shadcn/ui |
| **AI/LLM** | Vercel AI SDK + OpenAI (gpt-4o-mini) |
| **Testing** | Vitest + Playwright |
| **Hosting** | Railway (Vercel for Landing) |

### Implementation Handoff

**First Implementation Priority:**
```bash
# 1. Create monorepo structure
mkdir zavvy && cd zavvy
pnpm init

# 2. Setup workspace
# Create pnpm-workspace.yaml, turbo.json, tsconfig.base.json

# 3. Initialize apps
# apps/api (Hono)
# apps/web (Vite + React)
# apps/admin (Vite + React)
# apps/booking (Vite + React)

# 4. Initialize packages
# packages/db (Drizzle)
# packages/auth (Better Auth)
# packages/ui (shadcn)
# packages/shared (Zod schemas)
```

**Development Sequence (Updated for Meta Verification Dependencies):**

**Phase 0: Meta Verification Prerequisites (FIRST)**
1. Landing Page with Next.js (SSG for SEO)
2. Terms of Use + Privacy Policy pages
3. Waitlist API + email collection

**Phase 1: Admin Panel (Template/Flow Creation)**
4. Initialize monorepo with Turborepo + pnpm
5. Setup PostgreSQL + Drizzle schema
6. Basic Hono API (admin routes)
7. Admin Panel (templates for Meta approval)

**Phase 2: Core Infrastructure**
8. Configure Better Auth with organization plugin
9. Build full API with Hono
10. Professional Web App with shared UI
11. Setup BullMQ workers

**Phase 3: Full Product (Post-Meta Approval)**
12. WhatsApp integration
13. Booking Link
14. External integrations (Calendar, Stripe)

---

**Architecture Status: READY FOR IMPLEMENTATION ✅**

---

*Architecture document generated collaboratively on 2025-12-26*
*Workflow: create-architecture | Version: 1.0*

