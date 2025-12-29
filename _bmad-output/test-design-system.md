# System-Level Test Design: Zavvy

> **Mode**: System-Level Testability Review (Phase 3)
> **Generated**: 2025-12-27
> **Status**: Complete

---

## Executive Summary

O Zavvy apresenta **boa testabilidade geral** com algumas áreas críticas que requerem atenção:

### Pontos Fortes
- **Monorepo bem estruturado**: Turborepo + pnpm permite testes isolados por package
- **API-First (Hono)**: Endpoints stateless facilitam testes de contrato
- **Database com RLS**: Políticas de segurança testáveis via role impersonation

### Riscos Críticos
| Risco | Score | Mitigação |
|-------|-------|-----------|
| WhatsApp API inacessível em testes | 9 | Sandbox Meta + mock webhooks |
| AI não-determinístico | 6 | Seed prompts + mock OpenAI |
| RLS gaps não detectados | 6 | Suite multi-tenant + testes negativos |

### Recomendações
1. **Priorizar test infrastructure** nos Epics 0-2 (fundação)
2. **k6 para load testing** (não Playwright) para validar SLAs de performance
3. **Testcontainers** para PostgreSQL/Redis em CI
4. **Mock layer** para WhatsApp/OpenAI desde o início

### Cobertura Esperada
- **Unit (60%)**: Lógica de booking, validadores, parsers
- **Integration (30%)**: API contracts, DB operations, queue processing
- **E2E (10%)**: Jornadas críticas (onboarding, booking flow)

---

## 1. Architecture Testability Review

### 1.1 Tech Stack Analysis

| Layer | Technology | Testability Rating | Notes |
|-------|------------|-------------------|-------|
| Frontend | Vite + React + Tailwind + shadcn/ui | ✅ HIGH | Component isolation via Vitest + React Testing Library |
| API | Hono + TypeScript | ✅ HIGH | Lightweight, easy to mock/test |
| Database | PostgreSQL + Drizzle ORM | ✅ HIGH | RLS policies testable, migrations with Drizzle-Kit |
| Auth | Better Auth | ⚠️ MEDIUM | Session management needs integration testing |
| Queue | Redis + BullMQ | ⚠️ MEDIUM | Async processing requires job completion assertions |
| External | WhatsApp Business API | 🔴 LOW | External dependency, requires mocking/sandboxing |
| AI | Vercel AI SDK + OpenAI | 🔴 LOW | Non-deterministic, requires seeded responses |

### 1.2 Testability Strengths

1. **Monorepo Structure (Turborepo + pnpm)**
   - Clear package boundaries enable isolated unit testing
   - Shared packages (`@zavvy/db`, `@zavvy/validators`) can be tested independently
   - Consistent tooling across packages

2. **API-First Design (Hono)**
   - Stateless endpoints easily testable via Playwright API requests
   - Input validation at boundary (Zod) simplifies test data factories
   - Health endpoints (`/api/health`) enable readiness checks

3. **Database with RLS (PostgreSQL)**
   - Row-Level Security policies can be tested via role impersonation
   - Drizzle migrations provide reproducible test databases
   - Organization-scoped queries enable tenant isolation testing

4. **Queue-Based Architecture (BullMQ)**
   - Jobs can be traced and asserted on completion events
   - Redis testcontainers for integration tests
   - Job retry logic testable with failure injection

### 1.3 Testability Concerns

| Concern | Impact | Mitigation |
|---------|--------|------------|
| WhatsApp API dependency | Cannot test real message delivery | Mock via sandbox + webhook simulation |
| AI non-determinism | LLM responses vary | Seed prompts, mock OpenAI in tests |
| Multi-tenancy RLS | Complex permission testing | Test with multiple org contexts |
| Async job completion | Race conditions in assertions | Use BullMQ `completed` events, not polling |
| External calendar sync | Google/Outlook dependencies | Mock OAuth + calendar API responses |

---

## 2. Architecturally Significant Requirements (ASRs)

### 2.1 ASR Identification via Utility Tree

| Quality Attribute | ASR | Business Priority | Technical Risk | Score (P×R) |
|-------------------|-----|-------------------|----------------|-------------|
| **Performance** | ≤300ms ack, p95 ≤2.5s response | HIGH (3) | MEDIUM (2) | 6 |
| **Performance** | 100 concurrent conversations/professional | MEDIUM (2) | HIGH (3) | 6 |
| **Reliability** | 99.9% uptime (8.76h/year downtime) | HIGH (3) | MEDIUM (2) | 6 |
| **Reliability** | ≥98% message delivery rate | HIGH (3) | HIGH (3) | 9 🚨 |
| **Security** | RLS-enforced tenant isolation | HIGH (3) | MEDIUM (2) | 6 |
| **Security** | Magic-link authentication only | MEDIUM (2) | LOW (1) | 2 |
| **Scalability** | Linear scaling with professional count | MEDIUM (2) | MEDIUM (2) | 4 |
| **Usability** | WhatsApp-first, zero-friction booking | HIGH (3) | LOW (1) | 3 |

### 2.2 Critical ASRs (Score ≥ 6)

#### ASR-1: Message Delivery Reliability (Score: 9) 🚨

**Requirement**: ≥98% of WhatsApp messages must be successfully delivered

**Quality Scenario**:
- **Source**: End-user sends booking request via WhatsApp
- **Stimulus**: Message arrives at Zavvy webhook
- **Artifact**: Message processing queue + WhatsApp API
- **Environment**: Normal load (< 100 concurrent conversations)
- **Response**: Message acknowledged, processed, response sent
- **Measure**: ≥98% delivery rate, <2.5s response time

**Testing Approach**:
- **Integration**: Mock WhatsApp API, verify retry logic on 5xx errors
- **E2E**: Sandbox environment with webhook simulation
- **Load**: Verify delivery rate under concurrent load (k6)

#### ASR-2: Response Time SLA (Score: 6)

**Requirement**: ≤300ms acknowledgment, p95 ≤2.5s response

**Quality Scenario**:
- **Source**: WhatsApp webhook delivers message
- **Stimulus**: POST to `/api/whatsapp/webhook`
- **Artifact**: API + Queue + AI processing
- **Environment**: Peak load (100 concurrent users)
- **Response**: HTTP 200 within 300ms, full response within 2.5s
- **Measure**: p95 latency metrics

**Testing Approach**:
- **Unit**: Measure pure processing time without I/O
- **Integration**: End-to-end latency with mocked AI (deterministic)
- **Load (k6)**: p95 validation under sustained load

#### ASR-3: Multi-Tenant Isolation (Score: 6)

**Requirement**: Organization data completely isolated via RLS

**Quality Scenario**:
- **Source**: Professional A queries data
- **Stimulus**: API request with auth token
- **Artifact**: PostgreSQL RLS policies
- **Environment**: Multiple orgs in same database
- **Response**: Only org A data returned
- **Measure**: Zero cross-tenant data leakage

**Testing Approach**:
- **Integration**: Create test users in different orgs, verify isolation
- **Security**: Attempt unauthorized access, verify 403 responses
- **E2E**: Cross-org booking attempts blocked

---

## 3. Test Levels Strategy

### 3.1 Test Pyramid Distribution

```
                    ┌─────────────────┐
                    │    E2E (10%)    │  ← Critical user journeys only
                    ├─────────────────┤
                    │ Integration(30%)│  ← API contracts, DB operations
                    ├─────────────────┤
                    │   Unit (60%)    │  ← Business logic, validators
                    └─────────────────┘
```

### 3.2 Test Level Assignments

| Domain | Unit | Integration | E2E |
|--------|------|-------------|-----|
| **Booking Logic** | Slot calculation, conflict detection | API endpoint contracts | Full booking flow |
| **WhatsApp Flow** | Message parsing, intent extraction | Webhook processing | - (mocked) |
| **AI Processing** | Prompt templates, response parsing | - (mocked LLM) | - |
| **Calendar Sync** | Event mapping, timezone handling | OAuth + calendar API | - (mocked) |
| **Authentication** | Token validation | Login/logout flows | Magic-link journey |
| **Billing** | Subscription calculation | Stripe webhooks | Upgrade flow |

### 3.3 Tool Selection

| Level | Tool | Rationale |
|-------|------|-----------|
| Unit | Vitest | Native ESM, fast, TypeScript-first |
| Component | Vitest + Testing Library | React component isolation |
| Integration | Vitest + Testcontainers | Real DB/Redis in containers |
| API | Playwright API Testing | Contract validation |
| E2E | Playwright | Cross-browser, network interception |
| Load | k6 | Performance thresholds, CI-friendly |

---

## 4. NFR Testing Approach

### 4.1 Performance Testing

**Tool**: k6 (NOT Playwright for load testing)

**Scenarios**:
1. **Baseline Load**: 50 VUs, 5 minutes → Establish p50/p95/p99 baselines
2. **Target Load**: 100 VUs, 10 minutes → Validate 100 concurrent conversations
3. **Spike Test**: 50→200→50 VUs, 5 minutes → Handle traffic spikes
4. **Endurance**: 50 VUs, 1 hour → Detect memory leaks

**Thresholds**:
```javascript
thresholds: {
  http_req_duration: ['p(95)<2500'],     // 2.5s SLA
  http_req_duration: ['p(99)<5000'],     // 5s max
  http_req_failed: ['rate<0.02'],        // <2% error rate
  webhook_ack_time: ['p(95)<300'],       // 300ms ack
}
```

**CI Integration**: Run on every release candidate, block on threshold breach.

### 4.2 Security Testing

**Approach**: Playwright E2E + OWASP ZAP + npm audit

**Test Cases**:
1. **Authentication**
   - Unauthenticated access → redirect to login
   - Expired magic-link → error message
   - Session hijacking → token validation

2. **Authorization (RLS)**
   - Cross-org data access → 403 Forbidden
   - Role-based permissions → verify RBAC

3. **Input Validation**
   - SQL injection attempts → blocked
   - XSS in service descriptions → sanitized

4. **Secrets**
   - Credentials never in logs → verified via log inspection
   - API keys not exposed in responses → validated

**CI Integration**: Run npm audit on every PR, OWASP ZAP on weekly schedule.

### 4.3 Reliability Testing

**Approach**: Playwright E2E + API tests + Chaos engineering (future)

**Test Cases**:
1. **Error Handling**
   - WhatsApp API 500 → retry with backoff
   - OpenAI timeout → graceful degradation
   - Database connection lost → circuit breaker activates

2. **Recovery**
   - Failed job → retry via BullMQ
   - Crashed worker → job picked up by another

3. **Health Checks**
   - `/api/health` returns status of all dependencies
   - Unhealthy DB → readiness probe fails

### 4.4 Maintainability Testing

**Approach**: CI tools + Playwright observability validation

**Metrics**:
| Metric | Target | Tool |
|--------|--------|------|
| Test Coverage | ≥80% lines | Vitest --coverage |
| Code Duplication | <5% | jscpd |
| Vulnerabilities | 0 critical/high | npm audit |
| Type Coverage | 100% strict | TypeScript strict mode |

---

## 5. Testability Concerns & Mitigations

### 5.1 Critical Concerns

| ID | Concern | Probability | Impact | Score | Mitigation | Owner |
|----|---------|-------------|--------|-------|------------|-------|
| TC-1 | WhatsApp API unavailable in tests | HIGH (3) | HIGH (3) | 9 | Use Meta sandbox + mock webhooks | Backend |
| TC-2 | AI responses non-deterministic | HIGH (3) | MEDIUM (2) | 6 | Seed prompts, mock OpenAI responses | Backend |
| TC-3 | RLS policy gaps undetected | MEDIUM (2) | HIGH (3) | 6 | Multi-tenant integration test suite | Backend |
| TC-4 | Calendar OAuth complexity | MEDIUM (2) | MEDIUM (2) | 4 | Mock OAuth flow, test token refresh | Backend |
| TC-5 | BullMQ job race conditions | MEDIUM (2) | MEDIUM (2) | 4 | Use `completed` event listeners | Backend |

### 5.2 Mitigation Details

#### TC-1: WhatsApp API Testing

**Problem**: Cannot send real WhatsApp messages in automated tests.

**Solution**:
1. **Sandbox Mode**: Use Meta's WhatsApp Business API sandbox for staging
2. **Webhook Simulation**: Create test endpoint that mimics Meta webhook payloads
3. **Mock Layer**: Abstract WhatsApp client, inject mock in tests

```typescript
// Example: WhatsApp client abstraction
interface WhatsAppClient {
  sendMessage(to: string, message: Message): Promise<MessageId>;
  sendTemplate(to: string, template: Template): Promise<MessageId>;
}

// Test implementation
class MockWhatsAppClient implements WhatsAppClient {
  sentMessages: Array<{to: string; message: Message}> = [];

  async sendMessage(to: string, message: Message) {
    this.sentMessages.push({to, message});
    return { id: `mock-${Date.now()}` };
  }
}
```

#### TC-2: AI Testing

**Problem**: OpenAI responses vary, making assertions unreliable.

**Solution**:
1. **Seed Responses**: For unit tests, mock entire OpenAI client
2. **Snapshot Testing**: For integration, capture and validate response structure
3. **Prompt Testing**: Validate prompt construction separately from LLM

```typescript
// Example: Mocked AI response
vi.mock('@ai-sdk/openai', () => ({
  generateText: vi.fn().mockResolvedValue({
    text: '{"intent": "book", "service": "Corte de cabelo", "date": "2025-01-15"}'
  })
}));
```

#### TC-3: Multi-Tenant Testing

**Problem**: RLS policies might have gaps allowing cross-tenant access.

**Solution**:
1. **Test Matrix**: Create users in org A and org B, attempt cross-access
2. **Negative Tests**: Explicitly test that org A cannot see org B data
3. **RLS Policy Unit Tests**: Test policies in isolation with pg_has_table_privilege

```typescript
// Example: Multi-tenant test
test('org A cannot access org B bookings', async ({ request }) => {
  const orgAToken = await loginAs('userA@orgA.com');
  const orgBBookingId = 'booking-from-org-b';

  const response = await request.get(`/api/bookings/${orgBBookingId}`, {
    headers: { Authorization: `Bearer ${orgAToken}` }
  });

  expect(response.status()).toBe(403);
});
```

---

## 6. Test Infrastructure Recommendations

### 6.1 Test Environment Setup

```
┌─────────────────────────────────────────────────────┐
│                   CI Pipeline                        │
├─────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐  │
│  │   Vitest     │  │  Playwright  │  │    k6     │  │
│  │  Unit/Int    │  │   API/E2E    │  │   Load    │  │
│  └──────┬───────┘  └──────┬───────┘  └─────┬─────┘  │
│         │                 │                │        │
│  ┌──────▼─────────────────▼────────────────▼─────┐  │
│  │              Testcontainers                    │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐ │  │
│  │  │PostgreSQL│  │  Redis   │  │MockWhatsApp │ │  │
│  │  └──────────┘  └──────────┘  └──────────────┘ │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### 6.2 Data Factory Pattern

```typescript
// packages/testing/factories/booking.factory.ts
import { faker } from '@faker-js/faker';

export function createBooking(overrides?: Partial<Booking>): Booking {
  return {
    id: faker.string.uuid(),
    professionalId: faker.string.uuid(),
    clientPhone: faker.phone.number('+55119########'),
    serviceId: faker.string.uuid(),
    startsAt: faker.date.future(),
    duration: 60,
    status: 'confirmed',
    createdAt: new Date(),
    ...overrides
  };
}
```

### 6.3 Fixture Architecture

```typescript
// packages/testing/fixtures/database.fixture.ts
import { test as base } from '@playwright/test';

export const test = base.extend<{
  seedBooking: (data?: Partial<Booking>) => Promise<Booking>;
}>({
  seedBooking: async ({ request }, use) => {
    const created: string[] = [];

    const seedBooking = async (data?: Partial<Booking>) => {
      const booking = createBooking(data);
      await request.post('/api/test/bookings', { data: booking });
      created.push(booking.id);
      return booking;
    };

    await use(seedBooking);

    // Cleanup
    for (const id of created) {
      await request.delete(`/api/test/bookings/${id}`);
    }
  }
});
```

---

## 7. Implementation Priorities

### Phase 1: Foundation (Epic 0-2)
- [ ] Setup Vitest + Testing Library for unit/component tests
- [ ] Setup Playwright for API testing
- [ ] Create data factories for core entities
- [ ] Implement database fixtures with auto-cleanup

### Phase 2: Core Flows (Epic 3-4)
- [ ] Integration tests for booking logic
- [ ] WhatsApp webhook processing tests (mocked)
- [ ] RLS policy validation tests
- [ ] API contract tests

### Phase 3: Quality Gates (Epic 5+)
- [ ] k6 load testing for performance SLAs
- [ ] Security test suite (OWASP)
- [ ] Coverage enforcement in CI
- [ ] Reliability tests (error handling, retries)

---

## 8. Validation Checklist

- [x] Architecture reviewed for testability
- [x] ASRs identified with quality scenarios
- [x] Test levels defined with tool assignments
- [x] NFR testing approach documented
- [x] Testability concerns flagged with mitigations
- [x] Test infrastructure recommendations provided
- [ ] Implementation priorities aligned with epics

---

## Next Steps

1. **Review this document** with the development team
2. **Validate priorities** against sprint planning
3. **Create implementation stories** for test infrastructure setup
4. **Execute Epic-Level Test Design** for each epic as implementation begins

---

*Generated by TEA (Test Engineering Architect) | BMAD Workflow v6.0*
