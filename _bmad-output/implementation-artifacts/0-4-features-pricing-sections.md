# Story 0.4: Features & Pricing Sections

Status: done

## Story

As a potential customer,
I want to see the key features and pricing,
so that I can evaluate if Zavvy fits my needs and budget.

## Acceptance Criteria

1. **Features section displays 6-8 key features with icons**
   - Given a visitor scrolls to the "Funcionalidades" section
   - When they view the section
   - Then they see 6-8 key features with icons
   - And features include: WhatsApp assistant, booking link, calendar sync, automatic reminders, etc.

2. **Each feature has an icon and description**
   - Given a visitor views each feature
   - When they look at the feature content
   - Then each feature has a relevant Lucide React icon
   - And each feature has a title and brief description

3. **Pricing section displays Starter plan**
   - Given a visitor scrolls to the "Preço" section
   - When they view the section
   - Then they see the Starter plan price (R$49/mês)
   - And they see "7 dias grátis" trial information prominently
   - And they see what's included in the plan

4. **Pricing section has CTA button**
   - Given a visitor views the pricing section
   - When they look for action buttons
   - Then they see a CTA button to join waitlist
   - And the button scrolls to waitlist section

5. **Responsive design across all breakpoints**
   - Given a visitor views on any device
   - When they see the Features and Pricing sections
   - Then the layout adapts correctly for mobile, tablet, and desktop
   - And all content remains legible and well-spaced

6. **Smooth scroll navigation works**
   - Given a visitor clicks "Funcionalidades" or "Preço" in the header
   - When the page scrolls
   - Then the scroll is smooth and lands at the correct section

## Tasks / Subtasks

- [x] Task 1: Create Features component (AC: #1, #2, #5)
  - [x] Create `components/Features.tsx`
  - [x] Design feature card layout with icon
  - [x] Add 6-8 features with Lucide React icons
  - [x] Implement responsive grid (1-col mobile, 2-col tablet, 3-4-col desktop)
  - [x] Add section id="funcionalidades" for navigation anchor
  - [x] Add aria-labelledby for accessibility

- [x] Task 2: Create Pricing component (AC: #3, #4, #5)
  - [x] Create `components/Pricing.tsx`
  - [x] Design pricing card with plan details
  - [x] Add R$49/mês price with "7 dias grátis" badge
  - [x] List included features with check icons
  - [x] Add CTA button linking to #waitlist
  - [x] Add section id="preco" for navigation anchor
  - [x] Add aria-labelledby for accessibility

- [x] Task 3: Integrate into page (AC: #5, #6)
  - [x] Import Features and Pricing into `app/page.tsx`
  - [x] Replace placeholder sections with actual components
  - [x] Verify section spacing and backgrounds alternate correctly
  - [x] Verify smooth scroll from header nav works

- [x] Task 4: Create unit tests (AC: #1, #2, #3, #4, #5)
  - [x] Create `components/Features.test.tsx`
  - [x] Create `components/Pricing.test.tsx`
  - [x] Test section headings render
  - [x] Test all features render with icons
  - [x] Test pricing displays correctly (R$49, 7 dias grátis)
  - [x] Test CTA button exists and links to #waitlist
  - [x] Test responsive grid classes
  - [x] Test aria-labelledby accessibility

- [x] Task 5: Verify and polish (AC: #5, #6)
  - [x] Verify smooth scroll from header nav works
  - [x] Test on mobile (375px), tablet (768px), desktop (1440px)
  - [x] Ensure WCAG AA contrast compliance
  - [x] Run build to verify no errors

## Dev Notes

### Architecture Compliance

**File Location:** `apps/landing/components/`
- Features.tsx
- Features.test.tsx
- Pricing.tsx
- Pricing.test.tsx

**Styling:** Tailwind CSS utility classes (no custom CSS files)

**Icon Library:** Lucide React (already installed with shadcn/ui)

### Technical Requirements

| Component | Technology | Notes |
|-----------|------------|-------|
| Framework | Next.js 15 (App Router) | Server Components by default |
| Styling | Tailwind CSS | Mobile-first utilities |
| Icons | Lucide React | Clean, consistent iconography |
| Fonts | Inter/Geist | Already configured in Story 0.1 |
| Testing | Vitest + Testing Library | Co-located tests |

### Design Specifications (from UX Design)

**Colors:**
- Features Background: White `#FFFFFF` (alternating pattern)
- Pricing Background: `bg-gray-50` (alternating pattern)
- Text Primary: `#1F2937`
- Text Muted: `#6B7280`
- Accent: Trust Green `#10B981`
- Icon background: Light green `#D1FAE5` (primary-light)
- Price highlight: Trust Green for trial badge

**Typography:**
- Section heading: 32px/40px semibold (desktop), 24px/32px (mobile)
- Feature title: 18px/24px semibold
- Feature description: 14px/20px regular, text-muted
- Price: 48px/56px bold
- Price period: 16px regular, text-muted

**Spacing:**
- Section padding: `py-16 md:py-24` (64px mobile, 96px desktop)
- Card gap: `gap-6 md:gap-8` (24px mobile, 32px desktop)
- Icon size: 48px (w-12 h-12) with light green background

### Content (pt-BR)

**Features Section:**

```
Heading: "Funcionalidades"
Subtitle: "Tudo que você precisa para automatizar sua agenda"

Feature 1:
Icon: MessageCircle
Title: "Assistente WhatsApp"
Description: "Gerencie tudo pelo WhatsApp. Consulte agenda, crie agendamentos e mais."

Feature 2:
Icon: Link
Title: "Link de agendamento"
Description: "Seus clientes agendam sozinhos, 24 horas por dia, sem troca de mensagens."

Feature 3:
Icon: Calendar
Title: "Sincronização com Google Calendar"
Description: "Sua agenda sempre atualizada. Eventos externos bloqueiam horários automaticamente."

Feature 4:
Icon: Bell
Title: "Lembretes automáticos"
Description: "Clientes recebem lembretes 24h e 1h antes. Menos faltas, mais tranquilidade."

Feature 5:
Icon: RefreshCw
Title: "Confirmações e reagendamentos"
Description: "Confirmação automática. Cliente pode reagendar sem te incomodar."

Feature 6:
Icon: Users
Title: "Gestão de clientes"
Description: "Histórico completo de cada cliente. Saiba quem são seus melhores clientes."

Feature 7 (optional):
Icon: BarChart3
Title: "Relatórios simples"
Description: "Veja quantos agendamentos, faltas e cancelamentos você teve."

Feature 8 (optional):
Icon: Shield
Title: "Seguro e confiável"
Description: "Seus dados protegidos. Backup automático. Sem perder informações."
```

**Pricing Section:**

```
Heading: "Preço"
Subtitle: "Simples e transparente. Sem surpresas."

Plan Name: "Starter"
Price: "R$49"
Period: "/mês"
Trial Badge: "7 dias grátis"

Included Features:
- Assistente WhatsApp completo
- Link de agendamento personalizado
- Sincronização com Google Calendar
- Lembretes automáticos ilimitados
- Confirmações e reagendamentos
- Gestão de clientes
- Suporte por WhatsApp

CTA Button: "Entrar na lista de espera"
Note: "Cancele quando quiser. Sem fidelidade."
```

### Responsive Breakpoints

**Features Grid:**
| Breakpoint | Layout | Grid |
|------------|--------|------|
| Mobile (< 640px) | Single column | `grid-cols-1` |
| Tablet (640-1024px) | 2 columns | `sm:grid-cols-2` |
| Desktop (> 1024px) | 3-4 columns | `lg:grid-cols-3` or `lg:grid-cols-4` |

**Pricing:**
| Breakpoint | Layout |
|------------|--------|
| All | Centered single card, max-width ~400px |

### Learned Patterns from Previous Stories

**From Story 0.1-0.3:**
- Use `container` class for consistent max-width and padding
- Use `text-text` and `text-text-muted` for typography colors
- Use `bg-primary-light` for icon backgrounds
- Use `text-primary` for accent colors
- Add aria-labelledby to sections with id="section-heading"
- Section backgrounds alternate: HowItWorks (gray-50) → Features (white) → Pricing (gray-50)
- Use Lucide React icons consistently
- Add Portuguese accents (é, ã, ç, etc.)
- Test responsive grid classes in unit tests
- Add hover effects with transitions
- Icon size: w-12 h-12 (48px) per design spec

**Code Review Patterns to Apply:**
- Add aria-labelledby for accessibility
- Test responsive breakpoint classes
- Use Portuguese accents consistently
- Use theme tokens (primary-light, text-muted) not hardcoded colors
- Add connecting visual elements where appropriate

### Anti-Patterns to Avoid

- **DO NOT** create custom CSS files - use Tailwind utilities only
- **DO NOT** use icons from other libraries - stick to Lucide React
- **DO NOT** add new fonts - use Inter/Geist from Story 0.1
- **DO NOT** hardcode colors - use Tailwind theme tokens
- **DO NOT** skip responsive classes - always include sm: and lg: variants
- **DO NOT** use `px-4` for sections - use `container` class
- **DO NOT** forget Portuguese accents (é, ã, ç, ê, í, ó, ú)
- **DO NOT** use red colors for icons - use Trust Green theme
- **DO NOT** forget hover effects on interactive elements

### Testing Checklist

- [ ] Features section renders with correct heading "Funcionalidades"
- [ ] All 6-8 features display with icons
- [ ] All features have title and description
- [ ] Pricing section renders with correct heading "Preço"
- [ ] Price displays as "R$49/mês"
- [ ] Trial badge shows "7 dias grátis"
- [ ] Plan features list renders with check icons
- [ ] CTA button exists and links to #waitlist
- [ ] Smooth scroll works from header nav (#funcionalidades, #preco)
- [ ] Layout correct on mobile (375px)
- [ ] Layout correct on tablet (768px)
- [ ] Layout correct on desktop (1440px)
- [ ] Text contrast meets WCAG AA (4.5:1)
- [ ] aria-labelledby is present and correct on both sections
- [ ] Portuguese accents are correct throughout

### References

- [Source: _bmad-output/project-planning-artifacts/epics.md#Story 0.4]
- [Source: _bmad-output/architecture.md#apps/landing structure]
- [Source: _bmad-output/project-planning-artifacts/ux-design-specification.md#Design System]
- [Source: _bmad-output/project-planning-artifacts/ux-design-specification.md#Visual Design Foundation]
- [Source: _bmad-output/project-context.md#Frontend Rules]
- [Source: _bmad-output/implementation-artifacts/0-3-how-it-works-section.md#Dev Notes]

### FRs Covered

- **FR118:** Landing page displays key features with visual icons/illustrations
- **FR119:** Landing page shows pricing information (Starter plan, trial period)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

N/A

### Completion Notes List

- Features component created with 8 feature cards using Lucide React icons
- Pricing component created with Starter plan, R$49/mês price, 7 dias grátis trial badge
- Features grid: 1-col mobile, 2-col tablet, 4-col desktop
- Both sections integrated into page.tsx
- 21 unit tests added (9 for Features, 12 for Pricing)
- All 68 tests passing
- Build successful (106kB first load JS)

### File List

- components/Features.tsx (NEW)
- components/Features.test.tsx (NEW)
- components/Pricing.tsx (NEW)
- components/Pricing.test.tsx (NEW)
- app/page.tsx (MODIFIED - added Features and Pricing imports)

## Senior Developer Review (AI)

**Reviewer:** Claude Opus 4.5
**Date:** 2025-12-26

### Review Summary

| Category | Count |
|----------|-------|
| High Issues | 0 |
| Medium Issues | 2 (fixed) |
| Low Issues | 1 (fixed) |

### Issues Found & Fixed

1. **[M1][FIXED]** Features.test.tsx - Added test for feature card structure (icon → title → description)
2. **[M2][FIXED]** Pricing.test.tsx - Added test for CTA button hover effect
3. **[L1][FIXED]** Features.test.tsx - Extended description test to cover all 8 features (was 4/8)

### Verification

- ✅ All 70 tests passing
- ✅ Build successful
- ✅ All ACs implemented
- ✅ All tasks verified complete

**Outcome:** APPROVED ✅

## Change Log

- 2025-12-26: Story created with comprehensive developer context.
- 2025-12-26: Implementation complete. All tasks done. Status → review.
- 2025-12-26: Code review complete. 3 issues fixed. Status → done.
