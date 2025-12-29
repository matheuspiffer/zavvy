---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - "prd.md"
  - "architecture.md"
  - "project-planning-artifacts/ux-design-specification.md"
  - "project-planning-artifacts/product-brief-zavvy-2025-12-25.md"
workflowType: 'epics'
project_name: 'zavvy'
user_name: 'Piffer'
date: '2025-12-27'
status: 'complete'
totalEpics: 10
totalStories: 113
frCoverage: '132/132 (100%)'
---

# zavvy - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for zavvy, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

**Total: 132 FRs in 10 capability areas**

#### 1. Account & Onboarding (7 FRs)
- **FR1:** Professional can create an account via web with email, password, name, and profession
- **FR2:** Professional can connect their Google Calendar via OAuth
- **FR3:** Professional can configure their first service during onboarding
- **FR4:** Professional can configure their availability during onboarding
- **FR5:** Professional can activate WhatsApp connection as the final onboarding step
- **FR6:** Professional can execute their first WhatsApp action to complete onboarding
- **FR7:** System validates onboarding completion only after first successful WhatsApp action

#### 2. Service Configuration (7 FRs)
- **FR8:** Professional can create services with name and duration
- **FR9:** Professional can set buffer time between services
- **FR10:** Client can select one or more services during booking, and system dynamically calculates total duration
- **FR11:** Professional can set price for services (optional, display only)
- **FR12:** Professional can edit existing services
- **FR13:** Professional can delete services
- **FR14:** Professional can view all their services in a list

#### 3. Availability Management (6 FRs)
- **FR15:** Professional can set working days (e.g., Monday-Friday)
- **FR16:** Professional can set working hours per day (e.g., 8h-12h, 14h-18h)
- **FR17:** Professional can set break periods (e.g., lunch 12h-14h)
- **FR18:** Professional can create exceptions to availability (specific dates)
- **FR19:** Professional can block specific time slots manually
- **FR20:** System calculates available slots based on services, availability, and existing appointments

#### 4. WhatsApp Assistant - Professional Command Center (52 FRs)

**4.1 Core Infrastructure (FR21-FR27)**
- **FR21:** Professional can receive messages from Zavvy via WhatsApp
- **FR22:** System provides immediate acknowledgment within 300ms of message receipt
- **FR23:** System uses AI to analyze free-text messages and identify intent
- **FR24:** System processes button/list/flow responses directly without AI analysis
- **FR25:** All system responses are AI-generated for natural, contextual communication
- **FR26:** System falls back to deterministic flow when AI processing exceeds 1.5s
- **FR27:** System routes unrecognized intents to helpful fallback with web redirect option

**4.2 Discoverability & Menu (FR28-FR32)**
- **FR28:** System sends welcome message on first WhatsApp activation explaining capabilities
- **FR29:** Professional can request menu/help at any time to see available actions
- **FR30:** System displays menu using hybrid format (text explanation + List Message)
- **FR31:** System provides contextual action suggestions after each interaction
- **FR32:** Suggestions appear as Reply Buttons (max 3) relevant to current context

**4.3 Schedule Queries (FR33-FR37)**
- **FR33:** Professional can view agenda via WhatsApp (today, tomorrow, week, specific date)
- **FR34:** Professional can ask "who is my next client?" to get next appointment details
- **FR35:** Professional can view appointment details by selecting from list or asking naturally
- **FR36:** Professional can ask natural language questions about schedule
- **FR37:** Schedule responses include Reply Buttons for common follow-up actions

**4.4 Appointment Management (FR38-FR43)**
- **FR38:** Professional can create appointments via natural conversation
- **FR39:** System uses List Message to show available time slots when creating appointment
- **FR40:** Professional can reschedule appointments via conversation or button selection
- **FR41:** Professional can cancel appointments via conversation or button selection
- **FR42:** System requests confirmation via Reply Buttons before destructive actions
- **FR43:** System automatically notifies client when appointment is created/changed/cancelled

**4.5 Time Blocks (FR44-FR47)**
- **FR44:** Professional can block time slots via conversation
- **FR45:** Professional can unblock/release time slots via conversation
- **FR46:** Professional can view active blocks for a period
- **FR47:** System uses Reply Buttons to confirm block creation/removal

**4.6 Client Management (FR48-FR53)**
- **FR48:** Professional can search clients by name via conversation
- **FR49:** System displays client search results using List Message
- **FR50:** Professional can view client details and appointment history
- **FR51:** Professional can register new client via WhatsApp Flow
- **FR52:** Professional can edit client information via WhatsApp Flow
- **FR53:** Client list responses include Reply Buttons for common actions

**4.7 Service Management (FR54-FR58)**
- **FR54:** Professional can view list of registered services
- **FR55:** Professional can create new service via WhatsApp Flow
- **FR56:** Professional can edit existing service via WhatsApp Flow
- **FR57:** Professional can activate/deactivate services via Reply Buttons
- **FR58:** System uses List Message to select which service to edit/manage

**4.8 Availability Management (FR59-FR63)**
- **FR59:** Professional can view current availability configuration
- **FR60:** Professional can modify working hours for a specific day via conversation
- **FR61:** Professional can add exception/day off via conversation or WhatsApp Flow
- **FR62:** Professional can remove exception via conversation
- **FR63:** System uses Reply Buttons to confirm availability changes

**4.9 Intelligent Redirect to Web (FR64-FR67)**
- **FR64:** System recognizes requests that require web (OAuth, payment, reports)
- **FR65:** System responds with helpful explanation + CTA URL Button to relevant web page
- **FR66:** Redirect responses maintain friendly tone
- **FR67:** CTA URL Buttons deep-link to specific web app sections when possible

**4.10 Error Handling & Fallback (FR68-FR72)**
- **FR68:** System handles errors gracefully with friendly message + suggested actions
- **FR69:** Error responses always include option to retry or access web
- **FR70:** System provides CTA URL Button to web when WhatsApp cannot complete action
- **FR71:** Fallback messages suggest specific alternatives, never just "try again"
- **FR72:** System maintains conversation context to help user recover from errors

#### 5. Appointment Management - System & Web (9 FRs)
- **FR73:** System creates appointments automatically when client books via booking link
- **FR74:** System prevents double-booking (conflict detection)
- **FR75:** System suggests alternative slots when requested slot is unavailable
- **FR76:** System releases slot automatically when appointment is cancelled or rescheduled
- **FR77:** Professional can view all appointments in web app
- **FR78:** Professional can view appointment details (client, service, time) in web app
- **FR79:** Professional can manually create appointments via web app
- **FR80:** Professional can manually edit appointments via web app
- **FR81:** Professional can manually cancel appointments via web app

#### 6. Calendar Integration (5 FRs)
- **FR82:** System syncs appointments to Google Calendar
- **FR83:** System reads availability from Google Calendar as source of truth for busy slots
- **FR84:** System treats Google Calendar events as blocking availability, regardless of origin
- **FR85:** System updates Google Calendar when appointments change
- **FR86:** Professional can disconnect and reconnect Google Calendar

#### 7. Client Booking / Self-Service (8 FRs)
- **FR87:** Client can access booking link without login
- **FR88:** Client can view available services on booking page
- **FR89:** Client can select one or more services to book
- **FR90:** Client can view available time slots based on selected service(s) total duration
- **FR91:** Client can select a time slot
- **FR92:** Client can provide name and WhatsApp number to confirm booking
- **FR93:** Client receives WhatsApp confirmation after booking (automatic)
- **FR94:** Professional receives WhatsApp notification of new booking (automatic)

#### 8. Billing & Subscription (8 FRs)
- **FR95:** Professional can start a 7-day trial
- **FR96:** Professional can view their subscription status
- **FR97:** Professional can subscribe to Starter plan
- **FR98:** Professional can update payment method
- **FR99:** Professional can cancel subscription
- **FR100:** System blocks creation of new appointments and automations when trial expires
- **FR101:** System maintains read-only access to web app, data, and history when subscription lapses
- **FR102:** System sends billing-related notifications via email

#### 9. Admin Operations / Zavvy (12 FRs)
- **FR103:** Operator can view list of all tenants (professionals)
- **FR104:** Operator can view tenant status (active, trial, cancelled)
- **FR105:** Operator can view message delivery metrics (near-real-time acceptable)
- **FR106:** Operator can view system health alerts
- **FR107:** Operator can manage WhatsApp message templates (CRUD)
- **FR108:** Operator can submit templates for Meta approval
- **FR109:** Operator can view template approval status and error rates
- **FR110:** Operator can send manual WhatsApp messages to clients
- **FR111:** Operator can view conversation logs per tenant
- **FR112:** Operator can view latency metrics p50/p95 (near-real-time acceptable)
- **FR113:** System alerts operator when delivery rate drops below 98%
- **FR114:** System alerts operator when latency exceeds thresholds

#### 10. Landing Page (18 FRs)
- **FR115:** Landing page displays clear value proposition in hero section
- **FR116:** Landing page shows 3-4 pain points that resonate with target audience
- **FR117:** Landing page explains how Zavvy works in 3-4 simple steps
- **FR118:** Landing page displays key features with visual icons/illustrations
- **FR119:** Landing page shows pricing information (Starter plan, trial period)
- **FR120:** Landing page includes FAQ section with common questions
- **FR121:** Landing page has Terms of Use page accessible from footer
- **FR122:** Landing page has Privacy Policy page accessible from footer (LGPD-compliant)
- **FR123:** Landing page displays LGPD-compliant cookie consent banner on first visit
- **FR124:** Landing page is fully responsive (mobile-first design)
- **FR125:** Landing page loads in under 3 seconds on mobile connection
- **FR126:** Landing page CTA collects email for waitlist (pre-launch phase)
- **FR127:** Landing page CTA redirects to signup (post-launch phase)
- **FR128:** System sends confirmation email when user joins waitlist
- **FR129:** Landing page includes social proof section (placeholder for now)
- **FR130:** Landing page footer includes links to legal pages and social media
- **FR131:** Landing page has basic SEO (meta tags, Open Graph, sitemap)
- **FR132:** Landing page tracks analytics events (page views, CTA clicks, scroll depth)

### NonFunctional Requirements

#### Performance
| Metric | Target |
|--------|--------|
| Immediate acknowledgment | ≤ 300ms |
| Intelligent response | p50 < 1.5s, p95 ≤ 2.5s |
| AI processing timeout | 1.5s hard limit |
| Maximum acceptable delay | 5s absolute max |
| Booking page load | < 3s |
| Web app page load | < 2s |

#### Reliability
| Metric | Target |
|--------|--------|
| Core uptime | 99.9% (~43 min/month max) |
| Message delivery rate | ≥ 98% |
| Calendar sync window | ≤ 5 min |
| Data durability | No data loss |

#### Security
- Data encryption at rest (all tenant data)
- Data encryption in transit (HTTPS/TLS)
- OAuth token security (minimal scopes, rotation)
- Payment data via PCI-DSS provider (never store cards)
- Tenant isolation (complete data separation)
- Admin access logging
- Rate limiting per tenant
- LGPD auditability

#### Scalability (MVP)
| Metric | MVP Target | 12-Month Target |
|--------|------------|-----------------|
| Concurrent tenants | 100 | 1,000 |
| Messages per day | 10,000 | 100,000 |
| Appointments per day | 1,000 | 10,000 |

#### Monitoring & Observability
- Latency visibility: p50, p95, p99 per endpoint
- Error alerting: < 5 min to detection
- Delivery rate monitoring: Near-real-time
- Tenant health visibility: Per-tenant activity metrics
- Human SLO: Operator notified if 3+ repeated failures within 15-min window

### Additional Requirements

#### From Architecture

**Technology Stack:**
- API Framework: Hono
- ORM: Drizzle ORM
- Database: PostgreSQL with Row Level Security
- Frontend: Vite + React
- Auth: Better Auth + Organization plugin
- Styling: Tailwind CSS + shadcn/ui
- Cache/Queue: Redis + BullMQ
- Hosting: Railway
- CI/CD: GitHub Actions

**Monorepo Structure:**
- `apps/api` - Hono API server
- `apps/web` - Professional dashboard (Vite + React)
- `apps/admin` - Zavvy operations panel (Vite + React)
- `apps/booking` - Public booking link (Vite + React)
- `apps/landing` - Public landing page (Next.js) - **PHASE 0**
- `packages/db` - Drizzle schema + migrations
- `packages/auth` - Better Auth shared config
- `packages/ui` - shadcn/ui shared components
- `packages/shared` - Zod schemas, utils

**BullMQ Queues:**
- `reminder-queue` - Appointment reminders (24h, 1h before)
- `calendar-sync` - Google Calendar bidirectional sync
- `notification-queue` - WhatsApp/email notifications
- `whatsapp-processor` - Incoming message processing

**Implementation Patterns:**
- Feature-based organization in frontend
- Co-located unit tests
- REST API with `/api/v1/*` versioning
- OpenAPI documentation via `@hono/zod-openapi`
- SSE for real-time updates
- TanStack Query for server state, Zustand for client state

**LGPD Compliance:**
- Client phone numbers encrypted at rest
- Conversation logs: 90-day retention policy
- Payment data handled by Stripe (PCI compliant)

#### From UX Design

**Design System:**
- Tailwind CSS + shadcn/ui
- Primary color: Trust Green (#10B981)
- Font: Inter (or Geist)
- Mobile-first approach

**Custom Components Required:**
- TimeSlotPicker (booking)
- ServiceCard (booking)
- StatusBanner (dashboard)
- AppointmentCard (dashboard, lists)
- WeekCalendarView (dashboard)
- AvailabilityEditor (onboarding, settings)

**UX Principles:**
- "Doing nothing is success" for professional
- "Silence kills trust" - always respond
- "Web = setup, WhatsApp = life"
- Client booking: ≤47 seconds, 3-4 clicks
- Immediate ack (300ms), full response (≤2.5s)

**Emotional Design:**
- Professional: Relief
- End Client: Confidence
- Zavvy Operator: Control

**WhatsApp Message Patterns:**
- Short, scannable messages
- 1-2 emojis max per message
- Never numeric menus
- Informal Brazilian Portuguese
- Action items at the end

### FR Coverage Map

| FR Range | Epic | Description |
|----------|------|-------------|
| FR1-FR7 | Epic 2 | Professional Onboarding & Account |
| FR8-FR20 | Epic 3 | Service & Availability Configuration |
| FR21-FR37 | Epic 4 | WhatsApp Command Center - Core |
| FR38-FR72 | Epic 5 | WhatsApp Command Center - Full Operations |
| FR73-FR81 | Epic 6 | Web App Dashboard & Appointments |
| FR82-FR86 | Epic 7 | Calendar Integration |
| FR87-FR94 | Epic 8 | Client Booking Link |
| FR95-FR102 | Epic 9 | Billing & Subscription |
| FR103-FR114 | Epic 1 | Admin Operations & Template Management |
| FR115-FR132 | Epic 0 | Landing Page & Public Presence |

**Coverage:** 132/132 FRs mapped (100%)

## Epic List

### Epic 0: Landing Page & Public Presence
Professionals can discover Zavvy online and join the waitlist. Meta can verify the business for WhatsApp Business API approval. This is the critical first step that unblocks all WhatsApp functionality.

**FRs covered:** FR115, FR116, FR117, FR118, FR119, FR120, FR121, FR122, FR123, FR124, FR125, FR126, FR127, FR128, FR129, FR130, FR131, FR132

**Implementation Notes:**
- Next.js with App Router for SSR/SEO
- Deployed on Vercel (separate from Railway)
- Terms of Use + Privacy Policy required for Meta
- Waitlist API with email confirmation

---

### Epic 1: Admin Operations & Template Management
Zavvy operators can manage the platform, create WhatsApp message templates, submit them for Meta approval, and monitor system health. This enables WhatsApp messaging after Meta approves templates.

**FRs covered:** FR103, FR104, FR105, FR106, FR107, FR108, FR109, FR110, FR111, FR112, FR113, FR114

**Implementation Notes:**
- Vite + React admin panel
- Template CRUD with Meta approval workflow
- Monitoring dashboard for latency and delivery rates
- Manual message sending capability

---

### Epic 2: Professional Onboarding & Account
Professionals can create an account, connect their Google Calendar, configure their first service and availability, and activate WhatsApp connection. Onboarding completes only after first successful WhatsApp action.

**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7

**Implementation Notes:**
- Web-first onboarding flow
- Google Calendar OAuth integration
- WhatsApp activation as final step
- First action validates complete setup

---

### Epic 3: Service & Availability Configuration
Professionals can fully configure their business offering: create/edit/delete services with duration, price, and buffer time; set working hours, breaks, and availability exceptions.

**FRs covered:** FR8, FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR20

**Implementation Notes:**
- Service CRUD with duration and buffer
- Visual availability editor
- Exception/block management
- Slot calculation engine

---

### Epic 4: WhatsApp Command Center - Core
Professionals can receive WhatsApp messages from Zavvy, view their schedule (today, tomorrow, week), ask natural language questions, and receive AI-powered responses. System provides immediate acknowledgment and falls back gracefully.

**FRs covered:** FR21, FR22, FR23, FR24, FR25, FR26, FR27, FR28, FR29, FR30, FR31, FR32, FR33, FR34, FR35, FR36, FR37

**Implementation Notes:**
- Webhook handler with ≤300ms ack
- Vercel AI SDK + OpenAI (gpt-4o-mini)
- Hybrid processing: AI for text, direct for buttons
- Reply Buttons and List Messages
- 3-layer fallback strategy

---

### Epic 5: WhatsApp Command Center - Full Operations
Professionals can manage appointments (create, reschedule, cancel), block time, manage clients (search, create via Flow, view history), manage services, and adjust availability—all via WhatsApp. Errors gracefully redirect to web.

**FRs covered:** FR38, FR39, FR40, FR41, FR42, FR43, FR44, FR45, FR46, FR47, FR48, FR49, FR50, FR51, FR52, FR53, FR54, FR55, FR56, FR57, FR58, FR59, FR60, FR61, FR62, FR63, FR64, FR65, FR66, FR67, FR68, FR69, FR70, FR71, FR72

**Implementation Notes:**
- WhatsApp Flows for forms (client, service)
- CTA URL Buttons for web redirects
- Automatic client notifications
- Context-aware error handling

---

### Epic 6: Web App Dashboard & Appointments
Professionals can view their calendar, see all appointments, view appointment details, and manually create/edit/cancel appointments via the web interface.

**FRs covered:** FR73, FR74, FR75, FR76, FR77, FR78, FR79, FR80, FR81

**Implementation Notes:**
- Week calendar view component
- Conflict detection and alternative suggestions
- Appointment cards with status
- CRUD operations via REST API

---

### Epic 7: Calendar Integration
Appointments sync automatically with Google Calendar. External events block availability. Changes in Zavvy reflect in Google and vice versa.

**FRs covered:** FR82, FR83, FR84, FR85, FR86

**Implementation Notes:**
- Google Calendar API bidirectional sync
- BullMQ worker for sync jobs
- ≤5 min sync window
- Conflict resolution (Google as truth)

---

### Epic 8: Client Booking Link
End clients can access a public booking link, view available services, select time slots, provide name and WhatsApp number, and receive confirmation—all without login in ≤47 seconds.

**FRs covered:** FR87, FR88, FR89, FR90, FR91, FR92, FR93, FR94

**Implementation Notes:**
- Public route without authentication
- Service selection with duration calculation
- TimeSlotPicker component
- Automatic WhatsApp confirmations (client + professional)

---

### Epic 9: Billing & Subscription
Professionals can start a 7-day trial, subscribe to Starter plan, manage payment method, and cancel subscription. System enforces paywall and sends billing notifications.

**FRs covered:** FR95, FR96, FR97, FR98, FR99, FR100, FR101, FR102

**Implementation Notes:**
- Stripe integration for payments
- Trial period with full access
- Graceful degradation on expiry (read-only)
- Email notifications for billing events

---

## Epic 0: Landing Page & Public Presence

**Goal:** Professionals can discover Zavvy online and join the waitlist. Meta can verify the business for WhatsApp Business API approval.

**FRs:** FR115-FR132 | **Stories:** 10

---

### Story 0.1: Landing Page Structure & Hero

As a potential customer,
I want to see a compelling hero section when I visit zavvy.app,
So that I immediately understand the value proposition and feel motivated to learn more.

**Acceptance Criteria:**

**Given** a visitor accesses zavvy.app
**When** the page loads
**Then** the page loads in under 3 seconds on mobile (3G connection)
**And** the hero section displays a clear headline about WhatsApp scheduling
**And** the hero shows a primary CTA button ("Entrar na lista de espera")
**And** the page is fully responsive on mobile, tablet, and desktop
**And** the header contains logo and navigation links

**Technical Notes:**
- Next.js App Router with `app/page.tsx`
- Tailwind CSS + shadcn/ui components
- Mobile-first responsive design
- Create `app/layout.tsx` with metadata

**FRs covered:** FR115, FR124, FR125

---

### Story 0.2: Pain Points & Solution Sections

As a potential customer,
I want to see pain points that resonate with my daily struggles,
So that I feel understood and see Zavvy as the solution.

**Acceptance Criteria:**

**Given** a visitor scrolls past the hero section
**When** they reach the pain points section
**Then** they see 3-4 pain points about WhatsApp scheduling chaos
**And** each pain point has an icon and brief description
**And** the solution section follows immediately after
**And** the solution section shows how Zavvy solves each pain point

**Technical Notes:**
- PainPoints component with icon grid
- Solution component with before/after framing
- Smooth scroll behavior

**FRs covered:** FR116

---

### Story 0.3: How It Works Section

As a potential customer,
I want to understand how Zavvy works in simple steps,
So that I can visualize using it in my business.

**Acceptance Criteria:**

**Given** a visitor scrolls to the "Como Funciona" section
**When** they view the section
**Then** they see 3-4 numbered steps explaining the process
**And** each step has an illustration or icon
**And** steps are: 1) Configure services 2) Share link 3) Clients book 4) WhatsApp manages
**And** the section is visually engaging with proper spacing

**Technical Notes:**
- HowItWorks component with step cards
- Numbered visual progression
- Optional subtle animations on scroll

**FRs covered:** FR117

---

### Story 0.4: Features & Pricing Sections

As a potential customer,
I want to see the key features and pricing,
So that I can evaluate if Zavvy fits my needs and budget.

**Acceptance Criteria:**

**Given** a visitor scrolls to the features section
**When** they view the section
**Then** they see 6-8 key features with icons
**And** features include: WhatsApp assistant, booking link, calendar sync, etc.

**Given** a visitor scrolls to the pricing section
**When** they view the section
**Then** they see the Starter plan price (R$49/mês)
**And** they see "7 dias grátis" trial information
**And** they see what's included in the plan
**And** a CTA button is present to join waitlist

**Technical Notes:**
- Features component with icon grid
- Pricing component with plan card
- Highlight trial period prominently

**FRs covered:** FR118, FR119

---

### Story 0.5: FAQ Section

As a potential customer,
I want to find answers to common questions,
So that I can make an informed decision without contacting support.

**Acceptance Criteria:**

**Given** a visitor scrolls to the FAQ section
**When** they view the section
**Then** they see 6-8 frequently asked questions
**And** questions are displayed in an accordion/collapsible format
**And** clicking a question reveals the answer
**And** questions cover: pricing, trial, WhatsApp, integrations, cancellation

**Technical Notes:**
- Use shadcn/ui Accordion component
- Questions in pt-BR
- Include questions about Meta/WhatsApp Business

**FRs covered:** FR120

---

### Story 0.6: Waitlist Form & API

As a potential customer,
I want to join the waitlist by providing my email,
So that I'm notified when Zavvy launches.

**Acceptance Criteria:**

**Given** a visitor clicks the CTA button
**When** the waitlist modal/form appears
**Then** they see an email input field
**And** they can submit their email

**Given** a visitor submits a valid email
**When** the form is submitted
**Then** the email is saved to the database
**And** a confirmation message is displayed
**And** a confirmation email is sent to the user

**Given** a visitor submits an invalid email
**When** the form is submitted
**Then** a validation error is displayed
**And** the form is not submitted

**Given** a visitor submits an email that already exists
**When** the form is submitted
**Then** a friendly message indicates they're already registered

**Technical Notes:**
- Create `app/api/waitlist/route.ts` API endpoint
- Zod validation for email
- Store in PostgreSQL (waitlist table)
- Send email via transactional email service (Resend/SendGrid)
- Rate limiting: 3 requests per IP per minute

**FRs covered:** FR126, FR128

---

### Story 0.7: Terms of Use Page

As a potential customer,
I want to read the Terms of Use,
So that I understand the service conditions before signing up.

**Acceptance Criteria:**

**Given** a visitor clicks "Termos de Uso" in the footer
**When** the page loads
**Then** they see the complete Terms of Use document
**And** the page has proper heading structure
**And** the page includes: service description, user obligations, limitations, intellectual property, termination
**And** the page shows last updated date
**And** navigation back to home is available

**Technical Notes:**
- Create `app/termos-de-uso/page.tsx`
- Legal content in Brazilian Portuguese
- Proper SEO metadata
- Simple, readable typography

**FRs covered:** FR121

---

### Story 0.8: Privacy Policy Page

As a potential customer,
I want to read the Privacy Policy,
So that I understand how my data will be handled (LGPD compliance).

**Acceptance Criteria:**

**Given** a visitor clicks "Política de Privacidade" in the footer
**When** the page loads
**Then** they see the complete Privacy Policy document
**And** the document is LGPD-compliant
**And** it includes: data collected, legal basis, data rights, retention period, contact information
**And** the page shows last updated date
**And** DPO/contact email is provided

**Technical Notes:**
- Create `app/politica-de-privacidade/page.tsx`
- LGPD-compliant content structure
- Include data subject rights (access, correction, deletion)
- Proper SEO metadata

**FRs covered:** FR122

---

### Story 0.9: Cookie Consent & Footer

As a visitor,
I want to be informed about cookie usage and consent to it,
So that my privacy preferences are respected (LGPD compliance).

**Acceptance Criteria:**

**Given** a first-time visitor accesses the site
**When** the page loads
**Then** a cookie consent banner appears at the bottom
**And** the banner explains cookie usage briefly
**And** the visitor can accept or reject non-essential cookies
**And** the preference is stored and banner doesn't reappear

**Given** a visitor views the footer
**When** they scroll to the bottom
**Then** they see links to Terms of Use and Privacy Policy
**And** they see social media links (Instagram, LinkedIn)
**And** they see copyright information
**And** they see a placeholder "Depoimentos em breve" section or subtle social proof

**Technical Notes:**
- CookieConsent component with localStorage persistence
- Footer component with all required links
- Social proof section as placeholder

**FRs covered:** FR123, FR129, FR130

---

### Story 0.10: SEO & Analytics

As the Zavvy team,
I want proper SEO and analytics setup,
So that we can track visitors and rank well in search engines.

**Acceptance Criteria:**

**Given** the landing page is deployed
**When** search engines crawl the site
**Then** proper meta tags are present (title, description, keywords)
**And** Open Graph tags are configured for social sharing
**And** a sitemap.xml is generated
**And** robots.txt is properly configured

**Given** a visitor interacts with the page
**When** they view pages, click CTAs, or scroll
**Then** page view events are tracked
**And** CTA click events are tracked
**And** scroll depth is tracked (25%, 50%, 75%, 100%)

**Given** the CTA button functionality changes post-launch
**When** FR127 needs to be activated
**Then** the CTA can be easily switched from waitlist to signup redirect

**Technical Notes:**
- Next.js metadata API for SEO
- Google Analytics 4 or Plausible
- Event tracking for conversions
- Environment variable to switch CTA behavior

**FRs covered:** FR127, FR131, FR132

---

## Epic 1: Admin Operations & Template Management

**Goal:** Operadores Zavvy podem gerenciar templates WhatsApp, submeter para aprovação Meta, e monitorar saúde do sistema.

**FRs:** FR103-FR114 | **Stories:** 10

---

### Story 1.1: Monorepo Foundation & Admin App Setup

As a **Zavvy developer**,
I want the monorepo structure initialized with the admin app foundation,
So that I have a working development environment to build admin features.

**Acceptance Criteria:**

**Given** a fresh clone of the repository
**When** I run `pnpm install && pnpm dev:admin`
**Then** the admin app starts on localhost:3001
**And** the Turborepo workspace is properly configured

**Technical Notes:**
- Initialize Turborepo with pnpm workspace
- Create apps/admin with Vite + React
- Create packages skeleton (db, auth, ui, shared)

**FRs covered:** Infrastructure foundation

---

### Story 1.2: Database Schema & Admin Auth

As a **Zavvy operator**,
I want to log into the admin panel securely,
So that only authorized team members can access operations.

**Acceptance Criteria:**

**Given** a Zavvy operator with valid credentials
**When** they access the admin login page
**Then** they can authenticate with email/password

**Technical Notes:**
- Create packages/db with Drizzle schema
- Configure Better Auth for admin panel
- PostgreSQL with RLS policies

**FRs covered:** Foundation for FR103-FR114

---

### Story 1.3: Tenant List & Status View

As a **Zavvy operator**,
I want to view all registered professionals (tenants),
So that I can monitor the customer base.

**Acceptance Criteria:**

**Given** an authenticated operator
**When** they access the Tenants page
**Then** they see a table with all tenants (name, email, status, created date)

**Technical Notes:**
- Create `/api/admin/tenants` endpoint
- TanStack Table for data display

**FRs covered:** FR103, FR104

---

### Story 1.4: WhatsApp Template CRUD

As a **Zavvy operator**,
I want to manage WhatsApp message templates,
So that I can create and update templates for Meta approval.

**Acceptance Criteria:**

**Given** an authenticated operator
**When** they access the Templates page
**Then** they see a list of all templates with status

**Technical Notes:**
- Create templates table in database
- CRUD API endpoints: `/api/admin/templates`

**FRs covered:** FR107

---

### Story 1.5: Template Submission to Meta

As a **Zavvy operator**,
I want to submit templates to Meta for approval,
So that we can use them for WhatsApp messaging.

**Acceptance Criteria:**

**Given** a draft template
**When** the operator clicks "Submit for Approval"
**Then** the template is sent to Meta Business API

**Technical Notes:**
- Integrate Meta Business API
- Create webhook handler for status updates

**FRs covered:** FR108, FR109

---

### Story 1.6: Template Error Rate Monitoring

As a **Zavvy operator**,
I want to see template performance metrics,
So that I can identify problematic templates.

**Acceptance Criteria:**

**Given** an authenticated operator viewing a template
**When** they see the template details
**Then** they see: total sends, delivery rate, error rate

**FRs covered:** FR109

---

### Story 1.7: Manual Message Sending

As a **Zavvy operator**,
I want to send manual WhatsApp messages to clients,
So that I can resolve issues when automation fails.

**Acceptance Criteria:**

**Given** a selected client
**When** the operator types a message and clicks "Send"
**Then** the message is sent via WhatsApp API

**FRs covered:** FR110

---

### Story 1.8: Conversation Logs View

As a **Zavvy operator**,
I want to view conversation logs per tenant,
So that I can debug issues.

**Acceptance Criteria:**

**Given** an authenticated operator viewing a tenant
**When** they click "View Logs"
**Then** they see all messages exchanged

**FRs covered:** FR111

---

### Story 1.9: System Health Dashboard

As a **Zavvy operator**,
I want to see system health metrics at a glance,
So that I can identify issues quickly.

**Acceptance Criteria:**

**Given** an authenticated operator on the Dashboard
**When** the page loads
**Then** they see: active tenants, messages sent, delivery rate, latency p95

**FRs covered:** FR105, FR106, FR112, FR113, FR114

---

### Story 1.10: Alert System & Notifications

As a **Zavvy operator**,
I want to receive alerts when issues occur,
So that I can respond quickly.

**Acceptance Criteria:**

**Given** the system detects an issue
**When** the condition persists
**Then** an alert is created and shown in the admin panel

**FRs covered:** FR106, FR113, FR114

---

## Epic 2: Professional Onboarding & Account

**Goal:** Profissionais podem criar conta, conectar Google Calendar, configurar primeiro serviço e disponibilidade, ativar WhatsApp.

**FRs:** FR1-FR7 | **Stories:** 7

---

### Story 2.1: Professional Registration & Account Creation

As a **professional**,
I want to create an account with my email, password, name, and profession,
So that I can start using Zavvy.

**Acceptance Criteria:**

**Given** a visitor on the signup page
**When** they fill in email, password, name, and profession
**Then** an account is created and they are redirected to onboarding

**Technical Notes:**
- Create apps/web with Vite + React + TanStack Router
- Better Auth signup flow
- Create organization on registration

**FRs covered:** FR1

---

### Story 2.2: Professional Login & Session

As a **professional**,
I want to log into my account,
So that I can access my dashboard.

**Acceptance Criteria:**

**Given** a registered professional
**When** they enter correct email and password
**Then** they are authenticated and redirected to dashboard

**FRs covered:** FR1

---

### Story 2.3: Google Calendar OAuth Connection

As a **professional**,
I want to connect my Google Calendar,
So that Zavvy can read my availability and sync appointments.

**Acceptance Criteria:**

**Given** a professional in onboarding step 2
**When** they click "Connect Google Calendar"
**Then** Google OAuth flow initiates and tokens are stored securely

**Technical Notes:**
- Google OAuth with calendar.readonly and calendar.events scopes
- Store tokens encrypted in database

**FRs covered:** FR2

---

### Story 2.4: First Service Configuration

As a **professional**,
I want to configure my first service during onboarding,
So that clients can book appointments.

**Acceptance Criteria:**

**Given** a professional in onboarding step 3
**When** they enter service name, duration, buffer time, and price
**Then** the service is created and they advance to next step

**FRs covered:** FR3

---

### Story 2.5: Availability Configuration

As a **professional**,
I want to configure my working hours,
So that clients only see times when I'm available.

**Acceptance Criteria:**

**Given** a professional in onboarding step 4
**When** they set working days and hours
**Then** availability rules are stored

**FRs covered:** FR4

---

### Story 2.6: WhatsApp Connection Activation

As a **professional**,
I want to activate my WhatsApp connection,
So that Zavvy can communicate with me and my clients.

**Acceptance Criteria:**

**Given** a professional in onboarding step 5
**When** they enter their WhatsApp number and verify
**Then** their number is linked to their organization

**FRs covered:** FR5

---

### Story 2.7: First WhatsApp Action & Onboarding Completion

As a **professional**,
I want to execute my first WhatsApp action,
So that I verify the system works.

**Acceptance Criteria:**

**Given** a professional with WhatsApp connected
**When** they send a message to Zavvy and receive a response
**Then** onboarding is marked as complete

**FRs covered:** FR6, FR7

---

## Epic 3: Service & Availability Configuration

**Goal:** Profissionais podem configurar serviços com duração/preço/buffer e definir horários de trabalho com exceções.

**FRs:** FR8-FR20 | **Stories:** 10

---

### Story 3.1: Service Creation with Duration & Buffer

As a **professional**,
I want to create services with name, duration, and buffer time,
So that my schedule correctly accounts for appointment length.

**Acceptance Criteria:**

**Given** a professional on the Services page
**When** they create a service with name, duration, buffer
**Then** the service is created and appears in the list

**FRs covered:** FR8, FR9

---

### Story 3.2: Service Pricing (Optional Display)

As a **professional**,
I want to set a price for my services,
So that clients can see the cost when booking.

**Acceptance Criteria:**

**Given** a service
**When** price is set
**Then** it displays formatted as "R$ 150,00" on booking link

**FRs covered:** FR11

---

### Story 3.3: Service List & Management

As a **professional**,
I want to view and manage all my services,
So that I can keep my offerings organized.

**Acceptance Criteria:**

**Given** a professional on the Services page
**When** viewing the list
**Then** they can edit and delete services

**FRs covered:** FR12, FR13, FR14

---

### Story 3.4: Multiple Service Selection & Duration Calculation

As a **client**,
I want to select multiple services when booking,
So that I can book a combined appointment.

**Acceptance Criteria:**

**Given** a booking page with multiple services
**When** 2+ services are selected
**Then** total duration and price are calculated

**FRs covered:** FR10

---

### Story 3.5: Working Days Configuration

As a **professional**,
I want to set which days of the week I work,
So that clients can only book on my working days.

**Acceptance Criteria:**

**Given** a professional on the Availability page
**When** they toggle days as Working/Not Working
**Then** availability is updated accordingly

**FRs covered:** FR15

---

### Story 3.6: Working Hours Configuration

As a **professional**,
I want to set my working hours for each day,
So that clients can only book during my available times.

**Acceptance Criteria:**

**Given** a working day
**When** time ranges are set
**Then** only those hours are available for booking

**FRs covered:** FR16

---

### Story 3.7: Break Periods Configuration

As a **professional**,
I want to set break periods (like lunch),
So that I'm not booked during my breaks.

**Acceptance Criteria:**

**Given** a professional with working hours 08:00-18:00
**When** they add a break from 12:00-14:00
**Then** that time shows no available slots

**FRs covered:** FR17

---

### Story 3.8: Date-Specific Exceptions

As a **professional**,
I want to create exceptions for specific dates,
So that I can mark holidays or special schedules.

**Acceptance Criteria:**

**Given** a professional
**When** they add a "Day Off" or "Special Hours" exception
**Then** that date's availability is modified accordingly

**FRs covered:** FR18

---

### Story 3.9: Manual Time Blocking

As a **professional**,
I want to manually block specific time slots,
So that I can reserve time for personal activities.

**Acceptance Criteria:**

**Given** a professional
**When** they block a time range
**Then** that slot becomes unavailable for booking

**FRs covered:** FR19

---

### Story 3.10: Slot Calculation Engine

As a **professional**,
I want the system to calculate available slots accurately,
So that clients only see bookable times.

**Acceptance Criteria:**

**Given** a professional with configured availability
**When** available slots are calculated
**Then** system considers: working hours, breaks, exceptions, appointments, blocks

**FRs covered:** FR20

---

## Epic 4: WhatsApp Command Center - Core

**Goal:** Profissionais podem consultar agenda, receber notificações, e fazer perguntas em linguagem natural via WhatsApp.

**FRs:** FR21-FR37 | **Stories:** 14

---

### Story 4.1: WhatsApp Webhook Infrastructure

As a **Zavvy system**,
I want to receive and process WhatsApp messages via webhook,
So that I can respond to professionals and clients.

**Acceptance Criteria:**

**Given** an incoming message from WhatsApp
**When** the webhook receives it
**Then** the message is acknowledged with 200 OK within 300ms and queued for processing

**FRs covered:** FR21, FR22

---

### Story 4.2: Immediate Acknowledgment System

As a **professional**,
I want to receive immediate acknowledgment when I send a message,
So that I know Zavvy received my request.

**Acceptance Criteria:**

**Given** a professional sends a text message
**When** the message is received
**Then** an ack is sent within 300ms: "👌 Já vejo isso pra você..."

**FRs covered:** FR22

---

### Story 4.3: AI Intent Recognition

As a **Zavvy system**,
I want to analyze free-text messages and identify user intent,
So that I can route the request correctly.

**Acceptance Criteria:**

**Given** a free-text message
**When** the AI analyzes it
**Then** an intent is identified within 1.5s

**FRs covered:** FR23, FR26

---

### Story 4.4: Direct Button/List Response Processing

As a **Zavvy system**,
I want to process button and list responses directly,
So that I can skip AI analysis for structured inputs.

**Acceptance Criteria:**

**Given** a Reply Button click
**When** received
**Then** the action is executed directly without AI

**FRs covered:** FR24

---

### Story 4.5: AI Response Generation

As a **professional**,
I want to receive natural, contextual responses,
So that Zavvy feels like a helpful assistant.

**Acceptance Criteria:**

**Given** an intent is identified
**When** generating the response
**Then** AI creates a natural Brazilian Portuguese message

**FRs covered:** FR25

---

### Story 4.6: Fallback & Unrecognized Intent Handling

As a **professional**,
I want helpful fallback when Zavvy doesn't understand me,
So that I can still accomplish my goal.

**Acceptance Criteria:**

**Given** AI cannot determine intent
**When** fallback is triggered
**Then** a friendly message with options is sent

**FRs covered:** FR26, FR27

---

### Story 4.7: Welcome Message on First Activation

As a **professional**,
I want to receive a welcome message when I first activate WhatsApp,
So that I understand what Zavvy can do.

**Acceptance Criteria:**

**Given** a professional completes WhatsApp activation
**When** confirmed
**Then** a welcome message explaining capabilities is sent

**FRs covered:** FR28

---

### Story 4.8: Help Menu & Discoverability

As a **professional**,
I want to see what Zavvy can do at any time,
So that I can discover features.

**Acceptance Criteria:**

**Given** a professional sends "ajuda" or "menu"
**When** recognized
**Then** a help message with List Message options is sent

**FRs covered:** FR29, FR30

---

### Story 4.9: Contextual Action Suggestions

As a **professional**,
I want to see relevant suggestions after each interaction,
So that I can take related actions easily.

**Acceptance Criteria:**

**Given** a professional views their agenda
**When** the response is sent
**Then** Reply Buttons suggest relevant follow-up actions

**FRs covered:** FR31, FR32

---

### Story 4.10: View Agenda via WhatsApp

As a **professional**,
I want to ask about my schedule via WhatsApp,
So that I can check appointments without opening the app.

**Acceptance Criteria:**

**Given** a professional asks "agenda de hoje"
**When** processed
**Then** today's appointments are listed

**FRs covered:** FR33

---

### Story 4.11: Next Client Query

As a **professional**,
I want to ask "quem é meu próximo cliente?",
So that I can quickly see my next appointment.

**Acceptance Criteria:**

**Given** the question
**When** processed
**Then** the next upcoming appointment is shown

**FRs covered:** FR34

---

### Story 4.12: Appointment Details View

As a **professional**,
I want to view details of a specific appointment,
So that I can see all information about a booking.

**Acceptance Criteria:**

**Given** an appointment selected
**When** details requested
**Then** full details are shown

**FRs covered:** FR35

---

### Story 4.13: Natural Language Schedule Questions

As a **professional**,
I want to ask natural questions about my schedule,
So that I can get quick answers.

**Acceptance Criteria:**

**Given** a question like "tenho horário livre sexta?"
**When** processed
**Then** availability is checked and response provided

**FRs covered:** FR36

---

### Story 4.14: Schedule Response with Action Buttons

As a **professional**,
I want action buttons included in schedule responses,
So that I can quickly take follow-up actions.

**Acceptance Criteria:**

**Given** any schedule-related response
**When** sent
**Then** relevant Reply Buttons are included

**FRs covered:** FR37

---

## Epic 5: WhatsApp Command Center - Full Operations

**Goal:** Profissionais podem criar/editar/cancelar agendamentos, bloquear horários, gerenciar clientes e serviços via WhatsApp.

**FRs:** FR38-FR72 | **Stories:** 24

---

### Story 5.1: Create Appointment via Conversation

As a **professional**,
I want to create appointments via natural conversation,
So that I can schedule clients without opening the web app.

**Acceptance Criteria:**

**Given** a professional says "agendar consulta com Maria amanhã às 14h"
**When** processed
**Then** the appointment is created after confirmation

**FRs covered:** FR38

---

### Story 5.2: Time Slot Selection via List Message

As a **professional**,
I want to see available time slots when creating appointments,
So that I can quickly choose a valid time.

**Acceptance Criteria:**

**Given** a professional wants to create an appointment
**When** date is specified but not time
**Then** available slots are shown as List Message

**FRs covered:** FR39

---

### Story 5.3: Reschedule Appointment via WhatsApp

As a **professional**,
I want to reschedule appointments via conversation or buttons,
So that I can quickly adjust my schedule.

**Acceptance Criteria:**

**Given** a professional says "remarcar consulta da Maria"
**When** processed
**Then** the appointment is updated to the new time

**FRs covered:** FR40

---

### Story 5.4: Cancel Appointment via WhatsApp

As a **professional**,
I want to cancel appointments via conversation or buttons,
So that I can free up slots when needed.

**Acceptance Criteria:**

**Given** a professional says "cancelar consulta das 14h"
**When** confirmed via Reply Buttons
**Then** the appointment is cancelled

**FRs covered:** FR41, FR42

---

### Story 5.5: Automatic Client Notification on Changes

As a **client**,
I want to be notified when my appointment changes,
So that I'm always aware of my booking status.

**Acceptance Criteria:**

**Given** an appointment is created/rescheduled/cancelled
**When** confirmed
**Then** the client receives WhatsApp notification

**FRs covered:** FR43

---

### Story 5.6: Block Time Slots via Conversation

As a **professional**,
I want to block time slots via WhatsApp,
So that I can reserve time without opening the app.

**Acceptance Criteria:**

**Given** a professional says "bloqueia sexta das 14h às 16h"
**When** processed
**Then** the time block is created

**FRs covered:** FR44

---

### Story 5.7: Unblock Time Slots via Conversation

As a **professional**,
I want to unblock/release time slots via WhatsApp,
So that I can make times available again.

**Acceptance Criteria:**

**Given** a professional says "libera o bloqueio de sexta"
**When** confirmed
**Then** the block is removed

**FRs covered:** FR45

---

### Story 5.8: View Active Time Blocks

As a **professional**,
I want to view my active time blocks,
So that I can see what times I've reserved.

**Acceptance Criteria:**

**Given** a professional asks "quais são meus bloqueios?"
**When** processed
**Then** active blocks are listed

**FRs covered:** FR46, FR47

---

### Story 5.9: Search Clients via Conversation

As a **professional**,
I want to search for clients by name via WhatsApp,
So that I can find client information quickly.

**Acceptance Criteria:**

**Given** a professional says "procurar cliente Maria"
**When** processed
**Then** matching clients are shown as List Message

**FRs covered:** FR48, FR49

---

### Story 5.10: View Client Details & History

As a **professional**,
I want to view client details and appointment history,
So that I can see their booking patterns.

**Acceptance Criteria:**

**Given** a client is selected
**When** details requested
**Then** client info and last 5 appointments are shown

**FRs covered:** FR50, FR53

---

### Story 5.11: Create Client via WhatsApp Flow

As a **professional**,
I want to register new clients via WhatsApp,
So that I can add clients without leaving the chat.

**Acceptance Criteria:**

**Given** a professional wants to create a client
**When** they complete the WhatsApp Flow form
**Then** the client is created

**FRs covered:** FR51

---

### Story 5.12: Edit Client via WhatsApp Flow

As a **professional**,
I want to edit client information via WhatsApp,
So that I can update details without the web app.

**Acceptance Criteria:**

**Given** viewing a client with "Editar" button
**When** WhatsApp Flow is completed
**Then** the client is updated

**FRs covered:** FR52

---

### Story 5.13: View Services via WhatsApp

As a **professional**,
I want to view my registered services via WhatsApp,
So that I can check my offerings quickly.

**Acceptance Criteria:**

**Given** a professional asks "quais são meus serviços?"
**When** processed
**Then** services are listed

**FRs covered:** FR54, FR58

---

### Story 5.14: Create Service via WhatsApp Flow

As a **professional**,
I want to create new services via WhatsApp,
So that I can add offerings on the go.

**Acceptance Criteria:**

**Given** a professional wants to create a service
**When** they complete the WhatsApp Flow
**Then** the service is created

**FRs covered:** FR55

---

### Story 5.15: Edit Service via WhatsApp Flow

As a **professional**,
I want to edit existing services via WhatsApp,
So that I can update offerings without the web app.

**Acceptance Criteria:**

**Given** a service is selected
**When** edit flow is completed
**Then** the service is updated

**FRs covered:** FR56

---

### Story 5.16: Activate/Deactivate Services

As a **professional**,
I want to activate or deactivate services via WhatsApp,
So that I can control what's available for booking.

**Acceptance Criteria:**

**Given** viewing a service
**When** "Ativar" or "Desativar" is clicked
**Then** the service status is toggled

**FRs covered:** FR57

---

### Story 5.17: View Availability Configuration

As a **professional**,
I want to view my availability configuration via WhatsApp,
So that I can see my working hours quickly.

**Acceptance Criteria:**

**Given** a professional asks "quais são meus horários?"
**When** processed
**Then** working days and hours are summarized

**FRs covered:** FR59

---

### Story 5.18: Modify Working Hours via Conversation

As a **professional**,
I want to modify my working hours for a specific day via conversation,
So that I can adjust my schedule quickly.

**Acceptance Criteria:**

**Given** a professional says "segunda eu trabalho das 10h às 18h"
**When** processed
**Then** the working hours for Monday are updated

**FRs covered:** FR60, FR63

---

### Story 5.19: Add Date Exception via Conversation

As a **professional**,
I want to add exceptions (days off) via WhatsApp,
So that I can mark holidays without the web app.

**Acceptance Criteria:**

**Given** a professional says "dia 25 de dezembro eu não trabalho"
**When** processed
**Then** a day_off exception is created

**FRs covered:** FR61

---

### Story 5.20: Remove Exception via Conversation

As a **professional**,
I want to remove availability exceptions via WhatsApp,
So that I can restore normal hours.

**Acceptance Criteria:**

**Given** a professional says "remover exceção do dia 25"
**When** confirmed
**Then** the exception is removed

**FRs covered:** FR62

---

### Story 5.21: Intelligent Web Redirect

As a **professional**,
I want to be redirected to the web app for complex actions,
So that I can complete tasks that require more interface.

**Acceptance Criteria:**

**Given** a professional requests OAuth or payment action
**When** processed
**Then** a CTA URL Button links to the relevant web page

**FRs covered:** FR64, FR65, FR66, FR67

---

### Story 5.22: Graceful Error Handling

As a **professional**,
I want helpful error messages when something goes wrong,
So that I can recover and complete my task.

**Acceptance Criteria:**

**Given** an error occurs
**When** responding
**Then** a friendly message with retry and web options is sent

**FRs covered:** FR68, FR69, FR70

---

### Story 5.23: Specific Fallback Suggestions

As a **professional**,
I want specific alternatives when something fails,
So that I always have a path forward.

**Acceptance Criteria:**

**Given** any fallback message
**When** sent
**Then** it offers at least one specific alternative

**FRs covered:** FR71

---

### Story 5.24: Conversation Context Recovery

As a **professional**,
I want Zavvy to remember context during errors,
So that I don't have to repeat myself.

**Acceptance Criteria:**

**Given** a multi-step conversation
**When** an error occurs
**Then** the context is preserved for retry

**FRs covered:** FR72

---

## Epic 6: Web App Dashboard & Appointments

**Goal:** Profissionais podem visualizar calendário, ver detalhes de agendamentos, e gerenciar agenda via interface web.

**FRs:** FR73-FR81 | **Stories:** 11

---

### Story 6.1: Dashboard Layout & Status Overview

As a **professional**, I want to see my schedule status at a glance, So that I know if everything is under control.

**FRs covered:** FR77

---

### Story 6.2: Week Calendar View

As a **professional**, I want to see my week's appointments in a calendar view, So that I can visualize my schedule.

**FRs covered:** FR77

---

### Story 6.3: Appointment List View

As a **professional**, I want to see my appointments as a list, So that I can quickly scan upcoming bookings.

**FRs covered:** FR77

---

### Story 6.4: Appointment Details View

As a **professional**, I want to view full details of an appointment, So that I can see all information about a booking.

**FRs covered:** FR78

---

### Story 6.5: Manual Appointment Creation (Web)

As a **professional**, I want to manually create appointments via the web app, So that I can schedule bookings received outside the booking link.

**FRs covered:** FR79

---

### Story 6.6: Appointment Conflict Detection

As a **system**, I want to prevent double-booking, So that professionals never have overlapping appointments.

**FRs covered:** FR74

---

### Story 6.7: Alternative Slot Suggestions

As a **client or professional**, I want to see alternative times when my preferred slot is unavailable, So that I can quickly find another option.

**FRs covered:** FR75

---

### Story 6.8: Automatic Slot Release

As a **system**, I want to automatically release slots when appointments change, So that availability stays accurate.

**FRs covered:** FR76

---

### Story 6.9: Edit Appointment (Web)

As a **professional**, I want to edit appointments via the web app, So that I can update details when needed.

**FRs covered:** FR80

---

### Story 6.10: Cancel Appointment (Web)

As a **professional**, I want to cancel appointments via the web app, So that I can free up slots when needed.

**FRs covered:** FR81

---

### Story 6.11: Automatic Appointment Creation from Booking

As a **system**, I want to automatically create appointments when clients book via the booking link, So that the professional's calendar updates without manual intervention.

**FRs covered:** FR73

---

## Epic 7: Calendar Integration

**Goal:** Agendamentos sincronizam automaticamente com Google Calendar. Eventos externos bloqueiam disponibilidade.

**FRs:** FR82-FR86 | **Stories:** 7

---

### Story 7.1: Sync Appointments to Google Calendar

As a **professional**, I want my Zavvy appointments to appear in Google Calendar, So that I have a unified view of my schedule.

**FRs covered:** FR82

---

### Story 7.2: Read Busy Times from Google Calendar

As a **system**, I want to read busy times from Google Calendar, So that external events are considered when calculating availability.

**FRs covered:** FR83

---

### Story 7.3: External Events Block Availability

As a **professional**, I want external Google Calendar events to block my availability, So that I'm never double-booked across systems.

**FRs covered:** FR84

---

### Story 7.4: Update Google Calendar on Changes

As a **professional**, I want my Google Calendar to update when appointments change, So that my calendar stays in sync.

**FRs covered:** FR85

---

### Story 7.5: Bidirectional Sync Worker

As a **system**, I want a background worker to keep calendars in sync, So that changes in either system are reflected.

**FRs covered:** FR82-FR85

---

### Story 7.6: Disconnect Google Calendar

As a **professional**, I want to disconnect my Google Calendar, So that I can stop syncing if I no longer want it.

**FRs covered:** FR86

---

### Story 7.7: Reconnect Google Calendar

As a **professional**, I want to reconnect my Google Calendar after disconnecting, So that I can resume syncing when needed.

**FRs covered:** FR86

---

## Epic 8: Client Booking Link

**Goal:** Clientes finais podem agendar em ≤47 segundos via link público, sem login, recebendo confirmação automática no WhatsApp.

**FRs:** FR87-FR94 | **Stories:** 10

---

### Story 8.1: Public Booking Link Access

As a **client**, I want to access a professional's booking link without login, So that I can schedule an appointment quickly.

**FRs covered:** FR87

---

### Story 8.2: Professional Profile Display

As a **client**, I want to see the professional's information, So that I feel confident I'm booking with the right person.

**FRs covered:** FR87

---

### Story 8.3: Service List Display

As a **client**, I want to see available services with duration and price, So that I can choose what I need.

**FRs covered:** FR88

---

### Story 8.4: Single & Multiple Service Selection

As a **client**, I want to select one or more services, So that I can book exactly what I need.

**FRs covered:** FR89

---

### Story 8.5: Calendar & Date Selection

As a **client**, I want to see available dates on a calendar, So that I can pick a day that works for me.

**FRs covered:** FR90

---

### Story 8.6: Time Slot Display & Selection

As a **client**, I want to see and select available time slots, So that I can choose a convenient time.

**FRs covered:** FR90, FR91

---

### Story 8.7: Client Information Form

As a **client**, I want to provide my name and WhatsApp number, So that I can receive booking confirmation.

**FRs covered:** FR92

---

### Story 8.8: Booking Confirmation & Success Screen

As a **client**, I want to see confirmation when my booking is complete, So that I know it was successful.

**FRs covered:** FR92

---

### Story 8.9: Client WhatsApp Confirmation

As a **client**, I want to receive WhatsApp confirmation after booking, So that I have the details saved in my chat.

**FRs covered:** FR93

---

### Story 8.10: Professional WhatsApp Notification

As a **professional**, I want to receive WhatsApp notification when a client books, So that I'm immediately aware of new appointments.

**FRs covered:** FR94

---

## Epic 9: Billing & Subscription

**Goal:** Profissionais podem iniciar trial, assinar plano Starter, gerenciar pagamento. Sistema aplica paywall quando necessário.

**FRs:** FR95-FR102 | **Stories:** 10

---

### Story 9.1: Automatic Trial Start

As a **professional**, I want to start with a 7-day free trial automatically, So that I can experience Zavvy before paying.

**FRs covered:** FR95

---

### Story 9.2: Subscription Status Display

As a **professional**, I want to see my subscription status clearly, So that I know my current plan and billing situation.

**FRs covered:** FR96

---

### Story 9.3: Subscribe to Starter Plan

As a **professional**, I want to subscribe to the Starter plan, So that I can continue using Zavvy after my trial.

**FRs covered:** FR97

---

### Story 9.4: Update Payment Method

As a **professional**, I want to update my payment method, So that I can ensure uninterrupted service.

**FRs covered:** FR98

---

### Story 9.5: Cancel Subscription

As a **professional**, I want to cancel my subscription, So that I can stop being charged if I no longer need Zavvy.

**FRs covered:** FR99

---

### Story 9.6: Trial Expiration Paywall

As a **system**, I want to block new appointments when trial expires, So that professionals must subscribe to continue.

**FRs covered:** FR100

---

### Story 9.7: Read-Only Access on Expiration

As a **professional**, I want to still access my data when my subscription lapses, So that I don't lose my client information.

**FRs covered:** FR101

---

### Story 9.8: Billing Email Notifications

As a **professional**, I want to receive billing-related emails, So that I'm informed about payments and subscription changes.

**FRs covered:** FR102

---

### Story 9.9: Stripe Webhook Handler

As a **system**, I want to process Stripe webhooks reliably, So that subscription states stay in sync.

**FRs covered:** FR97-FR102

---

### Story 9.10: Subscription Reactivation

As a **professional**, I want to reactivate my subscription after cancellation or expiration, So that I can resume using Zavvy.

**FRs covered:** FR97, FR99

---

## Final Summary

| Epic | Stories | FRs |
|------|---------|-----|
| Epic 0: Landing Page | 10 | FR115-FR132 |
| Epic 1: Admin Operations | 10 | FR103-FR114 |
| Epic 2: Professional Onboarding | 7 | FR1-FR7 |
| Epic 3: Service & Availability | 10 | FR8-FR20 |
| Epic 4: WhatsApp Core | 14 | FR21-FR37 |
| Epic 5: WhatsApp Full | 24 | FR38-FR72 |
| Epic 6: Web Dashboard | 11 | FR73-FR81 |
| Epic 7: Calendar Integration | 7 | FR82-FR86 |
| Epic 8: Booking Link | 10 | FR87-FR94 |
| Epic 9: Billing | 10 | FR95-FR102 |
| **Total** | **113** | **132 FRs (100%)** |