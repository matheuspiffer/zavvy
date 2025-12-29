---
stepsCompleted: [1, 2, 3, 4, 7, 8, 9, 10, 11]
inputDocuments:
  - "project-planning-artifacts/product-brief-zavvy-2025-12-25.md"
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 0
workflowType: 'prd'
lastStep: 11
status: complete
project_name: 'zavvy'
user_name: 'Piffer'
date: '2025-12-26'
---

# Product Requirements Document - zavvy

**Author:** Piffer
**Date:** 2025-12-26

## Executive Summary

Zavvy is a WhatsApp-first intelligent scheduling SaaS designed for solo professionals and small businesses in Brazil. The product addresses a critical pain point: professionals who sell their time (therapists, lawyers, hairdressers, consultants) spend excessive mental energy managing appointments through WhatsApp—the dominant communication channel in Brazil—without proper scheduling infrastructure.

**Core Problem:** WhatsApp became the primary contact channel in Brazil, but it was never designed to manage calendars. The result is manual, exhausting, and unscalable scheduling processes that cause lost clients, scheduling conflicts, and constant mental stress.

**Solution:** Zavvy delivers automated scheduling with a personal assistant experience through WhatsApp. Unlike traditional scheduling tools (Calendly, Google Calendar) that require behavior change, Zavvy integrates into the professional's existing workflow—where WhatsApp already is.

**Key Differentiator:** Zavvy operates a centralized WhatsApp Business API (WABA) infrastructure to send notifications to professionals and their clients. Professionals connect their personal WhatsApp number to receive notifications and operate their schedule via conversation with Zavvy. Clients book through a self-service booking link and receive automatic confirmations—no manual responses needed from the professional.

**Value Proposition:** "Tools organize calendars. Zavvy takes care of yours."

## Project Classification

**Technical Type:** SaaS B2B
**Domain:** General (Scheduling/Productivity)
**Complexity:** Medium
**Project Context:** Greenfield - new project

### Key Technical Characteristics
- WhatsApp Business API integration (centralized WABA model)
- Calendar integrations (Google Calendar, Outlook)
- AI-powered natural language understanding for scheduling intents
- Service-based booking with duration and buffer management
- Multi-tenant architecture for professional accounts
- Subscription-based monetization (R$39-59/month Starter plan)

### Product Differentiators
1. **WhatsApp-First (Cultural Fit)** - No behavior change required
2. **Zero Setup WhatsApp Infrastructure** - Zavvy operates centralized WABA for notifications; professionals just connect their number
3. **Assistant, Not Tool** - Feels like someone helping, not software to configure
4. **Control Without Effort** - Professional defines rules, Zavvy executes
5. **Perceived Professionalism** - End clients see organized professional via seamless self-service booking and automatic confirmations

## Success Criteria

### User Success

**Core Success Definition:**
Users stop spending mental energy on calendar and WhatsApp management. Success is measured not by active engagement with Zavvy, but by the absence of scheduling-related stress.

**Three-Layer Aha Moment Framework:**

| Layer | Timing | Moment | Indicator |
|-------|--------|--------|-----------|
| **Aha #1: Immediate Automation** | Days 1-3 | "A client booked by themselves and I didn't even see the conversation" | Activation trigger |
| **Aha #2: Control & Predictability** | Weeks 1-2 | "I know who my clients are and when they return" | Retention driver |
| **Aha #3: Growth Without Effort** | Month 1+ | "Zavvy is helping me make more money" | Subscription justification |

**Behavioral Success Indicators:**
- Connects calendar and doesn't disconnect
- Keeps Zavvy active on WhatsApp
- Doesn't disable automations
- Lets Zavvy confirm appointments autonomously
- Spontaneously recommends to other professionals

**Success Phrase:** "It was worth it because I stopped worrying about this."

### Business Success

**3-Month Targets (Early Validation):**
| Metric | Target |
|--------|--------|
| Active professionals | 50-100 |
| Daily/near-daily usage | ≥ 40% |
| Willing to pay | ≥ 20-30% |
| Organic feedback | Audio, text, referrals |

**Key Question:** "If we turn off Zavvy tomorrow, how many people complain?"

**12-Month Targets (Initial Product-Market Fit):**
| Metric | Target |
|--------|--------|
| Active users | 1,000+ |
| Monthly retention | > 70% |
| Monthly churn | < 5-7% |
| Referral-driven acquisition | Significant portion |
| Revenue | Sustainable for product operation |

**Key Question:** "For whom is Zavvy obvious?"

**North Star Metric:**
Appointments confirmed automatically per user per week

### Technical Success

**Golden Rule:** "Dashboard can go down, but WhatsApp cannot stop."

**SLA Targets:**
| System | Requirement |
|--------|-------------|
| Core (messages + scheduling) | 99.9% uptime (~43 min/month max) |
| WhatsApp message delivery | ≥ 98% success rate |
| Template errors | ≤ 1% |
| Technical errors | ≤ 1% |

**Response Time Targets (p95):**
| Stage | Target |
|-------|--------|
| Webhook → backend | < 300ms |
| Decision (rule/flow) | < 300ms |
| AI (LLM) processing | < 1.5s |
| WhatsApp send | < 300ms |
| **Total end-to-end** | **≤ 2.5s** |

**User Perception:** ≤ 1s = instant, 1-3s = normal, 3-5s = slow

**Core Metrics to Monitor:**
- Webhook latency (p95)
- Total response time
- Provider failure rate
- Template send errors
- Appointments created automatically
- % of appointments without human intervention

### Measurable Outcomes

**MVP Success (60-90 days):**
| Metric | Target |
|--------|--------|
| Active professionals | 100+ |
| Automatic appointments | ≥ 60% |
| Weekly web app access | ≥ 30% |
| Paying users | ≥ 25% |
| Monthly churn | < 10% |

**Validation Question:** "Did this become part of your business?"

**Product KPIs:**
| KPI | Purpose |
|-----|---------|
| Setup completion rate | Onboarding friction |
| Time to first "Aha" | Value delivery speed |
| Manual exceptions | Automation effectiveness |
| Conversation failure rate | AI quality |

## Product Scope

### MVP - Minimum Viable Product

**Core 0: Landing Page & Legal (FIRST - Meta Verification Prerequisite)**
- Public-facing landing page with conversion-optimized design
- Waitlist functionality (pre-launch)
- Terms of Use page (LGPD-compliant)
- Privacy Policy page (LGPD-compliant)
- Cookie consent banner
- Required for Meta Business verification before WABA access

**Core 1: Intelligent WhatsApp Assistant (Professional Command Center)**
- Professional manages schedule via natural conversation with Zavvy
- Zavvy understands intents: view agenda, create/reschedule/cancel appointments, block time
- AI-powered responses in Brazilian Portuguese
- Automatic notifications to professional about bookings and changes
- Clients book via self-service booking link (not WhatsApp conversation)
- Automatic WhatsApp confirmations sent to clients after booking
- Via Zavvy's centralized WABA (no professional WABA setup required)

**Core 2: Service-Based Scheduling**
- Service name, duration, optional buffer
- Price (optional but structural)
- AI identifies requested service
- Calculate possible time windows
- Prevent conflicts

**Core 3: Calendar Integrations**
- Google Calendar
- Outlook Calendar
- Read availability, create events, prevent conflicts

**Core 4: Professional Web App**
- Calendar view with appointment status
- Light CRM (client list, WhatsApp, history)
- Services management
- Settings (working hours, availability rules)

**Core 5: SaaS Subscription**
- Starter Plan: R$39-59/month
- 1 professional account
- Centralized WABA access
- Google + Outlook integration
- Unlimited services and clients
- Web app included

**Core 6: Proper Paywall**
- If not paying: new automatic appointments disabled
- Keeps access to: web app (read-only), client data, history

**Core 7: Zavvy Admin Panel**
- Client management (status, plans)
- WhatsApp template management (Meta compliance)
- Billing management
- Monitoring (failed conversations, errors)

### Growth Features (Post-MVP)

- Payment integration within scheduling flow
- Multi-professional support (small teams)
- Advanced notification rules
- Intelligent CRM features
- Enhanced reporting and analytics

### Vision (Future)

- Professional's own WABA connection (Pro plan)
- Proactive messages ("30 days since last visit")
- Schedule optimization suggestions
- Predictable revenue features
- High LTV expansion

**Out of Scope (MVP):**
- Payments within WhatsApp
- Marketing campaigns
- Advanced CRM
- Multi-professional support
- Multi-location support
- Advanced reports/BI
- Long-term AI memory
- Deep message customization
- Professional's own WABA connection

## User Journeys

### Journey 1: Dra. Carolina Mendes - A Psicóloga que Recuperou Suas Noites

Carolina é psicóloga clínica em São Paulo. Atende 6-8 pacientes por dia, das 8h às 20h. Entre sessões, ela responde WhatsApp: "Tem horário quinta?", "Preciso remarcar", "Pode ser às 15h?". Às 22h, ainda está confirmando agenda do dia seguinte. Seu namorado reclama que ela "nunca desliga".

Um domingo, após perder um paciente novo por demorar 4 horas para responder, Carolina pesquisa "secretária virtual WhatsApp" e encontra Zavvy.

Na segunda de manhã, ela conecta seu Google Calendar, cadastra "Sessão Individual - 50min" e "Primeira Consulta - 1h20", define horários (8h-12h, 14h-20h), e ativa o WhatsApp. Leva 8 minutos.

Às 11h, enquanto atende, seu celular vibra: **"Nova consulta confirmada: João Silva, Primeira Consulta, terça 14h."** Carolina nem viu a conversa. Não respondeu nada. Simplesmente aconteceu.

Na sexta, ela percebe que não checou WhatsApp de agendamento a semana inteira. Sua agenda está correta. Seus pacientes chegam no horário certo. Às 20h, ela está livre.

**Seis meses depois**, Carolina dobrou sua carteira de pacientes. Não porque trabalha mais - porque parou de gastar energia com logística. Seu namorado nota: "Você está diferente. Mais presente."

> **Requisitos revelados:** Cadastro de serviços com duração, integração Google Calendar, WhatsApp automático, confirmações sem intervenção, notificações claras para profissional.

---

### Journey 2: Ricardo - O Barbeiro que Quase Perdeu um Cliente VIP

Ricardo tem uma barbearia em Curitiba. Usa Zavvy há 3 semanas e confia no sistema. Quinta-feira, 16h, ele está no meio de um degradê quando seu cliente VIP (um empresário que paga R$200 por corte) precisa remarcar por conta de uma viagem.

O cliente acessa o link de agendamento que Ricardo compartilha no Instagram e WhatsApp. Em 30 segundos, ele mesmo remarca de quinta 17h para sábado 11h. O Zavvy confirma automaticamente via WhatsApp:

> "Oi Marcos! Seu agendamento com Ricardo Barbearia foi alterado: Corte Premium, sábado 11h. Até lá!"

Ao mesmo tempo, Ricardo recebe uma notificação do Zavvy no WhatsApp dele:

> "📅 Agendamento alterado: Marcos (VIP) moveu de quinta 17h para sábado 11h. Horário de quinta liberado automaticamente."

Ricardo termina o degradê tranquilo. Quando olha o celular, 20 minutos depois, já está tudo resolvido. O cliente se auto-atendeu, e Ricardo nem precisou responder nada.

**O momento crítico:** Quando Ricardo vê que o cliente conseguiu remarcar sozinho pelo link, sem precisar de resposta manual, ele pensa: "Isso é melhor que uma secretária de verdade."

> **Requisitos revelados:** Booking link para self-service do cliente, liberação automática de slots, notificação de alterações para profissional, confirmação WhatsApp automática para cliente. Profissional não precisa responder manualmente.

---

### Journey 3: Juliana - A Cliente que Só Queria Marcar Rápido

Juliana é gerente de projetos. Trabalha das 8h às 18h, reunião atrás de reunião. Seu cabelo está horrível, mas ela não tem 10 minutos para ficar trocando mensagem com a cabeleireira.

Sexta às 22h, scrollando Instagram, ela vê o story da Patrícia Cabeleireira: "Agende pelo link na bio". Juliana clica.

Uma página simples aparece:
- **Patrícia Cabeleireira**
- Serviços: Corte (1h - R$80) | Corte + Escova (1h30 - R$120) | Corte + Pintura (3h - R$250)

Juliana escolhe "Corte + Escova". Vê os horários disponíveis: sábado 9h, 10h30, 14h. Escolhe 10h30. Digita nome e WhatsApp. Confirma.

3 segundos depois, recebe no WhatsApp:

> "Oi Juliana! Seu agendamento está confirmado com Patrícia Cabeleireira: Corte + Escova, sábado 10h30. Endereço: Rua das Flores, 123. Até lá!"

Total: 47 segundos. Sem conversa. Sem espera. Sem "vou verificar e te retorno".

**Sábado 10h30**, Juliana chega. Patrícia já sabe o serviço. Tudo funciona.

> **Requisitos revelados:** Link de agendamento público, seleção de serviço, visualização de disponibilidade, confirmação instantânea via WhatsApp, dados mínimos (nome + WhatsApp), zero login, zero conta, mobile-first.

---

### Journey 4: Lucas - O Operador que Mantém Zavvy Funcionando

Lucas é parte do time de operações da Zavvy. Segunda-feira 9h, ele abre o Admin Panel para o check matinal.

**Dashboard mostra:**
- 847 profissionais ativos
- 12.340 mensagens enviadas (últimas 24h)
- Taxa de entrega: 98.7%
- 3 alertas amarelos

Lucas clica nos alertas:
1. Template "confirmação_lembrete" com taxa de rejeição acima de 1% → Precisa revisar texto
2. Profissional "ID 4521" com 0 agendamentos em 7 dias → Possível churn, marcar para CS
3. Latência média subiu para 2.8s (p95) → Ainda OK, mas monitorar

Ele entra no gerenciador de templates, ajusta o texto do lembrete (removia emoji que Meta não gostou), e submete para aprovação.

Às 14h, o template está aprovado. Lucas ativa. Taxa de rejeição cai para 0.2%.

**Quinta-feira**, um profissional novo reclama que mensagens não estão chegando. Lucas abre o log do profissional, vê que o número do cliente está formatado errado (falta código do país). Identifica o bug, reporta para dev, e manda mensagem manual para o cliente enquanto isso.

> **Requisitos revelados:** Dashboard de métricas de saúde (não só uso), alertas automáticos, templates como entidade de primeira classe (CRUD + aprovação Meta), logs por profissional, envio manual de mensagens, monitoramento de latência. Pode ser feio, não pode ser frágil.

---

### Journey 5: Ana - O Onboarding Web-First

Ana é nutricionista. Descobriu Zavvy pelo Instagram. Clicou no link, caiu na landing page. Leu "Secretária no WhatsApp". Clicou "Começar grátis".

**Step 1: Cadastro (Web)**
- Email, senha, nome, profissão
- Conta Zavvy criada

**Step 2: Assinatura (Web)**
- Escolhe plano (trial 7 dias ou Starter R$49/mês)
- Confirma billing
- Acesso liberado

**Step 3: Calendário (Web)**
- "Conectar Google Calendar" → OAuth em 2 cliques
- Permissões claras, calendário sincronizado

**Step 4: Serviços (Web)**
- Formulário estruturado:
  - Nome: "Consulta de retorno"
  - Duração: 45 minutos
  - Buffer entre consultas: 15 minutos
- Adiciona segundo serviço: "Primeira consulta" - 1h30
- Pode criar combinações (ex: avaliação + plano alimentar)

**Step 5: Disponibilidade (Web)**
- Interface visual de calendário
- Segunda a sexta: 8h-12h, 14h-18h
- Sábado: 8h-12h
- Almoço: 12h-14h bloqueado automaticamente
- Exceções fáceis de adicionar

**Step 6: Ativação WhatsApp (Web → WhatsApp)**
- Conecta número do profissional
- Confirmação de opt-in
- Tela mostra: "Agora o Zavvy vai começar a trabalhar no seu WhatsApp."

**Step 7: Primeira Ação (WhatsApp - OBRIGATÓRIO)**

A tela web instrui:
> "Abra seu WhatsApp e envie sua primeira mensagem para o Zavvy."

Sugestões:
- "Zavvy, como está minha agenda amanhã?"
- "Bloqueia hoje das 18h às 19h"
- "Quem são meus clientes de sexta?"

Ana manda: "Zavvy, como está minha agenda amanhã?"

Zavvy responde em 2 segundos:
> "Amanhã você tem 4 consultas: 8h Maria, 9h João, 14h Carla, 15h30 Pedro. Quer que eu faça alguma alteração?"

Ana olha a tela web - a agenda reflete exatamente o que o WhatsApp disse.

**Aha Moment:**
> "Não preciso mais abrir o sistema pra mexer na minha agenda."

Ana compartilha o link de agendamento no Instagram. O hábito muda: ela opera pelo WhatsApp, só abre o web quando precisa de visão ampla.

> **Requisitos revelados:** Onboarding web-first estruturado, OAuth Google/Outlook, formulários de serviços (não chat), interface visual de disponibilidade, ativação WhatsApp como último step, primeira ação obrigatória via WhatsApp (não teste de cliente), link compartilhável, separação clara de canais (Web = setup/visão, WhatsApp = operação).

---

### Journey Requirements Summary

| Journey | Capabilities Revealed | MVP Guardrails |
|---------|----------------------|----------------|
| **Carolina (Happy Path)** | Serviços com duração, integração calendário, WhatsApp automático, confirmações sem intervenção, notificações claras | Notificação = produto, não feature |
| **Ricardo (Edge Case)** | Booking link self-service para cliente, liberação automática de slots, notificação ao profissional, confirmação WhatsApp automática | Cliente se auto-atende, profissional não responde manualmente |
| **Juliana (Cliente Final)** | Link público, seleção de serviço, disponibilidade visual, confirmação WhatsApp | Zero login, zero conta, mobile-first |
| **Lucas (Operador)** | Dashboard métricas de saúde, templates como entidade, logs por profissional, envio manual | Pode ser feio, não pode ser frágil |
| **Ana (Onboarding)** | Web-first estruturado, OAuth, formulários de serviços, interface visual disponibilidade, 1ª ação WhatsApp obrigatória | Web = setup, WhatsApp = operação |

### MVP Principles from Journeys

| Principle | Implication |
|-----------|-------------|
| **Channel separation** | Web = Setup + Vision + Control. WhatsApp = Daily Operation only |
| **AI recognizes, doesn't guess** | 3 intents: schedule, reschedule, cancel. Everything else → human |
| **Notification = relief** | Without clear notification, emotional value doesn't close |
| **Zero friction for end client** | Zero login, zero account, 47 seconds |
| **Robust admin > pretty admin** | Logs, templates, health metrics working |
| **First action is mandatory** | Onboarding completes only when user executes real action via WhatsApp |

### Channel Architecture

| Channel | Purpose | Used For |
|---------|---------|----------|
| **Web** | Setup + Vision + Control | Account creation, billing, calendar connection, services config, availability, CRM view, settings, admin |
| **WhatsApp** | Daily Operation (Assistant) | View agenda, create/edit/cancel appointments, block hours, register clients, quick questions |
| **Booking Link** | Client Self-Service | End clients book directly, zero friction, no login |

**Aha Moment:** "I don't need to open the system to manage my schedule anymore."

## SaaS B2B Specific Requirements

### Tenant Model

**Decision:** Tenant = Business (not person)

Even in MVP with 1 user, tenant represents the business entity.

**Data Structure:**
```
Tenant (Business)
├── name: "Patrícia Cabeleireira"
├── plan: "starter"
├── waba_routing: tenant_id (logical routing, not separate number)
└── Users[]
    └── User (Owner) - MVP: 1 per tenant
        └── Future: N users (receptionist, partner, etc.)

Tenant-Isolated Data:
├── Clients[]
├── Services[]
├── Appointments[] ← CENTRAL ENTITY (everything orbits around this)
├── Availability Rules
└── Settings
```

**Architecture Clarification:**
- MVP: Centralized WABA with logical routing by `tenant_id`
- Pro (future): Tenant can have dedicated WABA
- Important: Tenant ≠ WhatsApp number. Don't couple these concepts.

**Why this matters now:**
- Avoids heavy refactoring for multi-professional
- Enables Pro plan with multiple users
- Clear mental model: "Zavvy serves businesses, not individuals"

### Central Entity: Appointments

All system components orbit around Appointments:
- WhatsApp conversations → create/modify Appointments
- Calendar sync → reflects Appointments
- Notifications → triggered by Appointments
- Billing metrics → count Appointments
- Client history → list of Appointments

This architectural clarity helps scope and prioritize.

### Permission Model (RBAC Matrix)

**Client-Facing (MVP):**
| Role | Scope |
|------|-------|
| Owner | Single role, full tenant access |

No complex RBAC for clients in MVP - intentional simplification.

**Admin Panel (Zavvy Operations):**
| Role | Permissions |
|------|-------------|
| Admin | Full access: clients, billing, templates, logs, manual messages |
| Operator | View clients, logs, send manual messages |
| Viewer | Read-only: dashboards, metrics |

**MVP Implementation:** All operators start as Admin, but model roles in database from day 1.

### Subscription Tiers

**Starter (MVP) - R$39-59/month:**
- 1 tenant (business)
- 1 user (owner)
- Centralized WABA (Zavvy infrastructure, routed by tenant_id)
- Google + Outlook integration
- Unlimited services
- Unlimited clients
- Booking link
- WhatsApp automation active

**Trial - 7 days:**
- Full experience (no UX downgrade)
- Recommended: No card required for trial
- Card required only to activate continuous automations after trial
- Rationale: Solo professionals have high friction with upfront card; value is perceived in 1-2 days

**Pro (Future - Not MVP):**
- Professional's own WABA connection
- Multiple users per tenant
- Higher SLA
- Advanced customization
- Webhooks / API access

### Integration List

**MVP - Required:**
| Integration | Status | Notes |
|-------------|--------|-------|
| WhatsApp Business API | Core | Centralized (Zavvy), routed by tenant_id |
| Google Calendar | Core | OAuth |
| Outlook Calendar | Core | OAuth |
| Payment Gateway | Required | Stripe / Pagar.me / Mercado Pago |
| Transactional Email | Basic | Login, billing, alerts |

**Explicitly Out of MVP:**
| Integration | Reason |
|-------------|--------|
| Zapier / n8n | Only after PMF |
| External Webhooks | Pro plan only |
| External CRM | Not now |
| Client's own WABA | Pro plan only |

### Compliance Requirements

**WhatsApp / Meta Compliance (Mandatory):**

1. **Templates**
   - Templates as first-class entity
   - Versioning
   - Approval history
   - Error rate monitoring

2. **Opt-in**
   - Explicit opt-in from professional (connects WhatsApp number)
   - Implicit opt-in from end client via booking action (provides WhatsApp number when booking)

3. **Policies**
   - No spam
   - Transactional messages only
   - Logs accessible for audit

**LGPD (Brazil) - Pragmatic Compliance:**

| Aspect | Implementation |
|--------|----------------|
| Data collected | Name, phone, appointment history |
| Legal basis | Contract execution |
| Rights | Export data, delete on request |
| Isolation | Data isolated per tenant |
| Operational logs | May contain minimal personal data, follow same tenant isolation policy |

No complex consent flow in MVP.

**Security Minimum:**
- OAuth scopes minimal (Calendar only)
- Rotatable tokens
- Admin access logs
- Rate limiting per tenant

## Project Scoping & Phased Development

### MVP Philosophy: Experience MVP

**Approach:** Deliver the complete relief loop with minimal but fully functional flows.

**Guiding Principle:** "Few flows, but complete and reliable."

The value of Zavvy is not in isolated features, but in the complete relief loop:

```
Client requests → Zavvy understands → Schedules → Confirms → Professional does nothing → Feels relief
```

If any part of this loop fails, the product doesn't "close" emotionally.

**Implications:**
- ❌ Cannot launch "half automation"
- ❌ Cannot launch without functional WhatsApp
- ❌ Cannot launch without real calendar integration
- ✅ Can launch with fewer options, but with closed loop

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
| Journey | MVP Status |
|---------|------------|
| Carolina (Happy Path) | ✅ Full support |
| Ricardo (Edge Cases) | ✅ 3 intents + fallback |
| Juliana (Client Booking) | ✅ Full support |
| Lucas (Zavvy Operations) | ⚠️ Functional but not pretty |
| Ana (Onboarding) | ✅ Full web-first flow |

**Must-Have Capabilities (Non-Negotiable):**
- WhatsApp functioning with real automation
- Automatic appointment creation
- Calendar sync (Google Calendar)
- Clear notifications for professional
- Service-based booking with duration
- Booking link for clients
- Web app for setup and vision
- Subscription billing

**MVP Simplifications (Intentional):**
- Google Calendar only (Outlook = MVP+1)
- Admin Panel functional but not polished
- Web App essential features only
- Single user per tenant

### AI Latency Fallback Strategy

**Target:** p95 end-to-end ≤ 2.5s, acceptable up to 3s

**Golden Rule:** Never leave the client waiting without response.

**3-Layer Fallback (Required for MVP):**

| Layer | Timing | Action |
|-------|--------|--------|
| **Layer 1** | 0-300ms | Immediate acknowledgment: "Perfeito, só um instante que já vejo isso pra você 👌" |
| **Layer 2** | 300ms-1.5s | AI processing with hard timeout |
| **Layer 3** | >1.5s | Deterministic fallback questions |

**Fallback Examples:**
- New appointment: "Você prefere manhã, tarde ou noite?"
- Reschedule: "Sem problema! Quer outro dia ou outro horário?"

**Key Insight:** Fallback doesn't break trust. Silence does.

### Resource Contingency (If Cuts Needed)

**Priority Order for Scope Reduction:**

| Priority | Cut | Impact | When to Cut |
|----------|-----|--------|-------------|
| 🥇 First | Outlook Calendar | Low - Google covers target market | If timeline pressure |
| 🥈 Second | Admin Panel polish | Medium - Operate via ugly tables | If resources constrained |
| 🥉 Third | Web App advanced features | Medium - Keep essentials only | Last resort |

### MVP Validation Tests (Non-Negotiable)

**Golden Rule:** Test anything that, if it fails, breaks the feeling of "I didn't have to respond to anyone."

#### Test 1: Complete Value Loop (End-to-End) — MOST IMPORTANT

Mandatory scenario:
1. Client accesses booking link and selects service/time
2. Client provides name and WhatsApp number
3. System creates the appointment
4. System syncs with Google Calendar
5. System sends WhatsApp confirmation to client
6. System sends WhatsApp notification to professional
7. Professional does nothing (self-service worked)

**Approval Criteria:**
- Loop closes without human intervention
- No manual steps
- Clear messages
- Professional feels "relief"

> If this fails, nothing else matters.

#### Test 2: Real Latency (WhatsApp + AI)

| Metric | Target |
|--------|--------|
| p50 | < 1.5s |
| p95 | ≤ 2.5s |
| Max | Never > 5s |

**Also test:** Artificial latency injection to verify fallback layers trigger correctly.

**Approval Criteria:** Never any perceived silence by the client.

#### Test 3: Core Intents (Happy + Edge)

Test all 3 intents with real natural language, not ideal phrases:

| Intent | Test Variations |
|--------|-----------------|
| Schedule | "tem horário amanhã?", "quero marcar", "preciso de uma consulta" |
| Reschedule | "preciso mudar meu horário", "posso remarcar?", "trocar o dia" |
| Cancel | "não vou conseguir ir", "cancela", "desmarcar" |

**Approval Criteria:**
- ≥90% of messages fall into correct intent
- Edge cases go to fallback, never break the flow

#### Test 4: Schedule Conflict

Prevents the biggest emotional error of the product.

**Mandatory scenarios:**
- Two clients trying same slot
- Manually blocked slot
- Event created directly in Google Calendar

**Approval Criteria:**
- Never create double booking
- Always suggest alternative
- Clear, friendly message

#### Test 5: Calendar Sync (Google)

**Mandatory tests:**
- Create event via Zavvy → appears in Google
- Create event directly in Google → Zavvy respects it
- Edit/cancel event → reflects correctly

**Approval Criteria:**
- Total consistency
- Maximum few seconds delay

#### Test 6: Onboarding Web → WhatsApp

**Mandatory flow:**
1. User creates account on web
2. Configures services + availability
3. Connects WhatsApp
4. First functional message

**Approval Criteria:**
- User understands what to do without human help
- First automation works same day

#### Test 7: Billing & Paywall

**Mandatory tests:**
- 7-day trial works
- Expired trial → correct blocking
- Active subscription → everything unlocked
- Cancellation → expected behavior

**Approval Criteria:**
- No user "pays and doesn't work"
- No user "uses forever without paying"

#### Test 8: Graceful Degradation

**Mandatory scenario:**
- Simulate WhatsApp API unavailability

**Approval Criteria:**
- Clear log in admin
- Professional notified (message or banner)
- Manual action capability (even if ugly)

#### Tests NOT Required for MVP

Can ignore without guilt:
- High-scale load testing
- A/B tests
- Pixel-perfect UI tests
- Multi-language tests
- Multi-professional tests
- Campaign/marketing tests

### Post-MVP Features (Phase 2)

| Feature | Trigger |
|---------|---------|
| Outlook Calendar | After initial validation |
| Admin Panel polish | After 50+ tenants |
| Advanced web filters | User feedback |
| Multiple users per tenant | Pro plan launch |
| Webhooks/API | Enterprise demand |

### Phase 3 (Expansion)

- Professional's own WABA connection
- Multi-location support
- Advanced CRM features
- Proactive messaging ("30 days since last visit")
- Schedule optimization AI

### Risk Mitigation Strategy

| Risk Type | Risk | Mitigation |
|-----------|------|------------|
| **Technical** | AI latency > 3s | 3-layer fallback strategy |
| **Technical** | WhatsApp API downtime | Health monitoring, manual fallback |
| **Market** | Trial → Paid conversion | 7-day trial, Aha moment in 1-2 days |
| **Resource** | Team too small | Prioritized cut list ready |

## Functional Requirements

**Total: 132 FRs in 10 capability areas**

This section defines THE CAPABILITY CONTRACT for the entire product:
- UX designers will ONLY design what's listed here
- Architects will ONLY support what's listed here
- Epic breakdown will ONLY implement what's listed here

### 1. Account & Onboarding

- **FR1:** Professional can create an account via web with email, password, name, and profession
- **FR2:** Professional can connect their Google Calendar via OAuth
- **FR3:** Professional can configure their first service during onboarding
- **FR4:** Professional can configure their availability during onboarding
- **FR5:** Professional can activate WhatsApp connection as the final onboarding step
- **FR6:** Professional can execute their first WhatsApp action to complete onboarding
- **FR7:** System validates onboarding completion only after first successful WhatsApp action

### 2. Service Configuration

- **FR8:** Professional can create services with name and duration
- **FR9:** Professional can set buffer time between services
- **FR10:** Client can select one or more services during booking, and system dynamically calculates total duration
- **FR11:** Professional can set price for services (optional, display only)
- **FR12:** Professional can edit existing services
- **FR13:** Professional can delete services
- **FR14:** Professional can view all their services in a list

### 3. Availability Management

- **FR15:** Professional can set working days (e.g., Monday-Friday)
- **FR16:** Professional can set working hours per day (e.g., 8h-12h, 14h-18h)
- **FR17:** Professional can set break periods (e.g., lunch 12h-14h)
- **FR18:** Professional can create exceptions to availability (specific dates)
- **FR19:** Professional can block specific time slots manually
- **FR20:** System calculates available slots based on services, availability, and existing appointments

### 4. WhatsApp Assistant (Professional Command Center)

**Architecture:** WhatsApp is the primary operational channel for professionals. The assistant uses a hybrid AI approach with interactive WhatsApp components (Reply Buttons, List Messages, WhatsApp Flows, CTA URL Buttons).

**AI Processing Model:**
- Text input → AI analyzes intent → Executes action → AI generates response
- Button/List/Flow input → Direct action (no AI analysis) → AI generates response
- All responses are 100% AI-generated for natural, contextual communication

#### 4.1 Core Infrastructure

- **FR21:** Professional can receive messages from Zavvy via WhatsApp
- **FR22:** System provides immediate acknowledgment within 300ms of message receipt
- **FR23:** System uses AI to analyze free-text messages and identify intent
- **FR24:** System processes button/list/flow responses directly without AI analysis
- **FR25:** All system responses are AI-generated for natural, contextual communication
- **FR26:** System falls back to deterministic flow when AI processing exceeds 1.5s
- **FR27:** System routes unrecognized intents to helpful fallback with web redirect option

#### 4.2 Discoverability & Menu

- **FR28:** System sends welcome message on first WhatsApp activation explaining capabilities
- **FR29:** Professional can request menu/help at any time to see available actions
- **FR30:** System displays menu using hybrid format (text explanation + List Message for options)
- **FR31:** System provides contextual action suggestions after each interaction (sugestivo)
- **FR32:** Suggestions appear as Reply Buttons (max 3) relevant to current context

#### 4.3 Schedule Queries (Read Operations)

- **FR33:** Professional can view agenda via WhatsApp (today, tomorrow, week, specific date)
- **FR34:** Professional can ask "who is my next client?" to get next appointment details
- **FR35:** Professional can view appointment details by selecting from list or asking naturally
- **FR36:** Professional can ask natural language questions about schedule ("do I have availability Friday?")
- **FR37:** Schedule responses include Reply Buttons for common follow-up actions

#### 4.4 Appointment Management (CRUD)

- **FR38:** Professional can create appointments via natural conversation
- **FR39:** System uses List Message to show available time slots when creating appointment
- **FR40:** Professional can reschedule appointments via conversation or button selection
- **FR41:** Professional can cancel appointments via conversation or button selection
- **FR42:** System requests confirmation via Reply Buttons before destructive actions (cancel)
- **FR43:** System automatically notifies client when appointment is created/changed/cancelled

#### 4.5 Time Blocks

- **FR44:** Professional can block time slots via conversation ("block Friday 2pm to 4pm")
- **FR45:** Professional can unblock/release time slots via conversation
- **FR46:** Professional can view active blocks for a period
- **FR47:** System uses Reply Buttons to confirm block creation/removal

#### 4.6 Client Management

- **FR48:** Professional can search clients by name via conversation
- **FR49:** System displays client search results using List Message
- **FR50:** Professional can view client details and appointment history
- **FR51:** Professional can register new client via WhatsApp Flow (name, phone, notes)
- **FR52:** Professional can edit client information via WhatsApp Flow
- **FR53:** Client list responses include Reply Buttons for common actions (view history, schedule)

#### 4.7 Service Management

- **FR54:** Professional can view list of registered services
- **FR55:** Professional can create new service via WhatsApp Flow (name, duration, price, buffer)
- **FR56:** Professional can edit existing service via WhatsApp Flow
- **FR57:** Professional can activate/deactivate services via Reply Buttons
- **FR58:** System uses List Message to select which service to edit/manage

#### 4.8 Availability Management

- **FR59:** Professional can view current availability configuration
- **FR60:** Professional can modify working hours for a specific day via conversation
- **FR61:** Professional can add exception/day off via conversation or WhatsApp Flow
- **FR62:** Professional can remove exception via conversation
- **FR63:** System uses Reply Buttons to confirm availability changes

#### 4.9 Intelligent Redirect to Web

- **FR64:** System recognizes requests that require web (OAuth, payment, reports)
- **FR65:** System responds with helpful explanation + CTA URL Button to relevant web page
- **FR66:** Redirect responses maintain friendly tone ("Para isso, é melhor pelo app...")
- **FR67:** CTA URL Buttons deep-link to specific web app sections when possible

#### 4.10 Error Handling & Fallback

- **FR68:** System handles errors gracefully with friendly message + suggested actions
- **FR69:** Error responses always include option to retry or access web
- **FR70:** System provides CTA URL Button to web when WhatsApp cannot complete action
- **FR71:** Fallback messages suggest specific alternatives, never just "try again"
- **FR72:** System maintains conversation context to help user recover from errors

#### 4.11 Interactive Components Usage

| Component | Use Cases |
|-----------|-----------|
| **Reply Buttons** (max 3) | Confirmations, quick choices, contextual suggestions |
| **List Messages** (max 10 items) | Client selection, service selection, time slots |
| **WhatsApp Flows** | New client form, new service form, edit forms |
| **CTA URL Buttons** | Redirect to web for OAuth, payments, settings, reports |

### 5. Appointment Management (System & Web)

- **FR73:** System creates appointments automatically when client books via booking link
- **FR74:** System prevents double-booking (conflict detection)
- **FR75:** System suggests alternative slots when requested slot is unavailable
- **FR76:** System releases slot automatically when appointment is cancelled or rescheduled
- **FR77:** Professional can view all appointments in web app
- **FR78:** Professional can view appointment details (client, service, time) in web app
- **FR79:** Professional can manually create appointments via web app
- **FR80:** Professional can manually edit appointments via web app
- **FR81:** Professional can manually cancel appointments via web app

### 6. Calendar Integration

- **FR82:** System syncs appointments to Google Calendar
- **FR83:** System reads availability from Google Calendar as source of truth for busy slots
- **FR84:** System treats Google Calendar events as blocking availability, regardless of origin
- **FR85:** System updates Google Calendar when appointments change
- **FR86:** Professional can disconnect and reconnect Google Calendar

### 7. Client Booking (Self-Service via Booking Link)

- **FR87:** Client can access booking link without login
- **FR88:** Client can view available services on booking page
- **FR89:** Client can select one or more services to book
- **FR90:** Client can view available time slots based on selected service(s) total duration
- **FR91:** Client can select a time slot
- **FR92:** Client can provide name and WhatsApp number to confirm booking
- **FR93:** Client receives WhatsApp confirmation after booking (automatic, no professional action needed)
- **FR94:** Professional receives WhatsApp notification of new booking (automatic)

### 8. Billing & Subscription

- **FR95:** Professional can start a 7-day trial
- **FR96:** Professional can view their subscription status
- **FR97:** Professional can subscribe to Starter plan
- **FR98:** Professional can update payment method
- **FR99:** Professional can cancel subscription
- **FR100:** System blocks creation of new appointments and automations when trial expires without subscription
- **FR101:** System maintains read-only access to web app, data, and history when subscription lapses
- **FR102:** System sends billing-related notifications via email

### 9. Admin Operations (Zavvy)

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

## Non-Functional Requirements

### Performance

| Metric | Target | Context |
|--------|--------|---------|
| **Immediate acknowledgment** | ≤ 300ms | Prevents WhatsApp timeout; does NOT need to contain useful response |
| **Intelligent response** | p50 < 1.5s, p95 ≤ 2.5s | Actual scheduling/AI response after ack |
| **AI processing timeout** | 1.5s hard limit | Before deterministic fallback triggers |
| **Maximum acceptable delay** | 5s absolute max | Any response path |
| **Booking page load** | < 3s | Client self-service |
| **Web app page load** | < 2s | Professional dashboard |

**Clarifications:**
- Immediate ack and intelligent response are separate. Ack buys time for AI processing.
- If AI timeout is reached, system must return a deterministic, rule-based response. No "waiting a bit longer."

### Reliability

| Metric | Target | Notes |
|--------|--------|-------|
| **Core uptime** | 99.9% | ~43 min/month max downtime |
| **Message delivery rate** | ≥ 98% | WhatsApp API |
| **Calendar sync window** | ≤ 5 min | Eventual consistency acceptable |
| **Data durability** | No data loss | Appointments are critical |

**Core Services Definition:**
- WhatsApp message handling
- Availability calculation
- Appointment creation/modification
- Calendar sync

**NOT Core (lower SLA acceptable):**
- Web dashboard
- Admin panel
- Reporting/metrics

**Recovery Requirement:** Automatic recovery and retry mechanisms are required for all core services.

**Calendar Conflict Resolution:** Google Calendar is source of truth. If conflict detected, Zavvy respects Google Calendar event.

**Sync Failure Alerting:** Repeated sync failures must raise an alert after 3 consecutive retries.

### Security

| Requirement | Implementation |
|-------------|----------------|
| **Data encryption at rest** | All tenant data encrypted |
| **Data encryption in transit** | HTTPS/TLS everywhere |
| **OAuth token security** | Minimal scopes, secure storage, rotation |
| **Payment data** | PCI-DSS via payment provider (never store card data) |
| **Tenant isolation** | Complete data separation per tenant |
| **Admin access logging** | All operator actions logged |
| **Rate limiting** | Per tenant to prevent abuse |
| **LGPD auditability** | All data access and deletion requests must be auditable |

### Integration Reliability

| Integration | SLA | Fallback |
|-------------|-----|----------|
| **WhatsApp Business API** | Dependent on Meta | Manual message via Admin Dashboard (not WhatsApp) |
| **Google Calendar** | Dependent on Google | Queue changes, sync when restored (≤5 min window) |
| **Payment Gateway** | Dependent on provider | Clear error messaging, retry option |

**WhatsApp Fallback Clarification:** Manual fallback is via Admin Dashboard only. Never attempt to bypass Meta API.

### Scalability (MVP)

| Metric | MVP Target | 12-Month Target |
|--------|------------|-----------------|
| **Concurrent tenants** | 100 | 1,000 |
| **Messages per day** | 10,000 | 100,000 |
| **Appointments per day** | 1,000 | 10,000 |

**Architecture Principle:** Design for 10x current load, but don't over-engineer MVP.

**AI Rate Limiting:** AI usage must be rate-limited per tenant to protect core scheduling performance and control costs.

**Load Priority:** Under load, scheduling and WhatsApp message handling must be prioritized over AI enrichment.

### Monitoring & Observability

| Requirement | Target |
|-------------|--------|
| **Latency visibility** | p50, p95, p99 per endpoint |
| **Error alerting** | < 5 min to detection |
| **Delivery rate monitoring** | Near-real-time |
| **Tenant health visibility** | Per-tenant activity metrics |
| **Human SLO** | Operator must be notified if same tenant experiences 3+ repeated failures within 15-minute window |

### Compliance

- **LGPD:** Data export, deletion on request, tenant isolation, audit trail for all data requests
- **Meta/WhatsApp:** Template compliance, opt-in rules, transactional only
- **Billing:** Clear subscription status, no hidden charges

### AI/LLM Architecture

**Processing Model:** Hybrid approach optimizing for cost, latency, and user experience.

| Input Type | Processing | Rationale |
|------------|------------|-----------|
| **Free text** | LLM analyzes intent | Natural language requires understanding |
| **Reply Button click** | Direct action | Intent is explicit from button ID |
| **List Message selection** | Direct action | Intent is explicit from selection |
| **WhatsApp Flow submit** | Direct action | Structured data, no interpretation needed |

**Response Generation:** 100% AI-generated for all responses to maintain natural, contextual, Brazilian Portuguese communication.

**LLM Requirements:**

| Requirement | Target | Rationale |
|-------------|--------|-----------|
| **Latency** | p95 < 1.5s | Hard timeout before fallback |
| **Language** | Brazilian Portuguese (native) | Target market |
| **Context window** | Conversation + user data | Personalized responses |
| **Tone** | Informal, friendly, helpful | "Assistant, not tool" positioning |

**Cost Control:**
- Skip LLM analysis for structured inputs (buttons, lists, flows)
- Rate limit per tenant (prevents abuse, controls costs)
- Cache common response patterns where appropriate
- Fallback to deterministic responses on timeout

**Fallback Strategy (3 layers):**

| Layer | Timing | Action |
|-------|--------|--------|
| **Layer 1** | 0-300ms | Immediate ack: "👌 Já vejo isso..." |
| **Layer 2** | 300ms-1.5s | LLM processing with hard timeout |
| **Layer 3** | >1.5s | Deterministic response with options |

**AI/LLM Stack (Decided):**

| Component | Choice | Rationale |
|-----------|--------|-----------|
| **SDK** | Vercel AI SDK | Unified API, streaming, TypeScript-first, easy provider switching |
| **Provider** | OpenAI | Reliable, excellent pt-BR, fast |
| **Model** | gpt-4o-mini | ~300-500ms latency, cost-effective, good quality |

**Why Vercel AI SDK:**
- Unified API across providers (can switch to Claude/Groq if needed)
- Built-in streaming support
- Edge-compatible (works with Hono)
- TypeScript-first with excellent DX
- Tool calling / function calling support for structured outputs

## Landing Page (Meta Business Verification Prerequisite)

### Priority Context

The Landing Page is the **first deliverable** of the project because:
1. **Meta Business Verification Requirement:** Meta requires a functional website with Terms of Use and Privacy Policy before approving WhatsApp Business API access
2. **No WABA = No Product:** Without WABA approval, the core WhatsApp functionality cannot work
3. **Dependency Chain:** Landing Page → Meta Verification → Admin Panel (template creation) → WhatsApp functional

### Landing Page Requirements

**Core Structure:**

| Section | Purpose | Priority |
|---------|---------|----------|
| **Header** | Navigation, logo, CTA | Must-have |
| **Hero** | Value proposition, primary CTA | Must-have |
| **Pain Points** | Problem agitation (3-4 pain points) | Must-have |
| **Solution** | Zavvy as the answer | Must-have |
| **How It Works** | 3-4 step visual flow | Must-have |
| **Features** | Key features with icons | Must-have |
| **Pricing** | Starter plan + Trial info | Must-have |
| **Social Proof** | "Em breve" placeholder | Nice-to-have |
| **FAQ** | Common questions | Must-have |
| **Final CTA** | Secondary conversion point | Must-have |
| **Footer** | Links, legal, social | Must-have |

**Legal Pages (Required for Meta):**

| Page | Content |
|------|---------|
| **Terms of Use** | Service terms, user obligations, limitations |
| **Privacy Policy** | LGPD-compliant data handling, rights, contact |

**Technical Requirements:**

| Requirement | Specification |
|-------------|---------------|
| **Language** | Portuguese (pt-BR) only - no i18n |
| **Design** | Mobile-first, highly converting |
| **Performance** | < 3s initial load |
| **SEO** | Basic meta tags, sitemap |
| **Analytics** | Page views, CTA clicks, scroll depth |
| **Cookie Consent** | LGPD-compliant banner |

**CTA Behavior:**

| Phase | CTA Text | Action |
|-------|----------|--------|
| **Pre-launch** | "Entrar na lista de espera" | Collect email → Waitlist |
| **Post-launch** | "Começar grátis" | Redirect to web app signup |

**Waitlist Flow:**
1. User clicks CTA
2. Modal/form appears (email only)
3. Email stored in database
4. Confirmation message displayed
5. Welcome email sent

**Design Reference:** https://whispify.app/ (user's previous landing page)

### 10. Landing Page

- **FR115:** Landing page displays clear value proposition in hero section
- **FR116:** Landing page shows 3-4 pain points that resonate with target audience (solo professionals)
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
- **FR129:** Landing page includes social proof section (placeholder "Em breve" for now)
- **FR130:** Landing page footer includes links to legal pages and social media
- **FR131:** Landing page has basic SEO (meta tags, Open Graph, sitemap)
- **FR132:** Landing page tracks analytics events (page views, CTA clicks, scroll depth)

### Implementation Priority (Updated)

Based on dependencies and Meta verification requirements:

| Phase | Deliverable | Rationale |
|-------|-------------|-----------|
| **Phase 0** | Landing Page + Legal Pages | Meta Business verification prerequisite |
| **Phase 1** | Admin Panel (Templates/Flows) | Create templates for Meta approval |
| **Phase 2** | Core API + Database + Auth | Foundation for all features |
| **Phase 3** | WhatsApp Integration | Depends on Meta approval from Phase 0-1 |
| **Phase 4** | Professional Web App | Setup interface for professionals |
| **Phase 5** | Booking Link | Client-facing scheduling |
| **Phase 6** | Billing & Subscription | Monetization |

**Critical Path:** Landing Page → Meta Verification → WABA Access → WhatsApp Functional
