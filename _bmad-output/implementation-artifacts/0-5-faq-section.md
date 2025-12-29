# Story 0.5: FAQ Section

Status: done

## Story

As a potential customer,
I want to find answers to common questions,
so that I can make an informed decision without contacting support.

## Acceptance Criteria

1. **FAQ section displays 6-8 questions in accordion format**
   - Given a visitor scrolls to the FAQ section
   - When they view the section
   - Then they see 6-8 frequently asked questions
   - And questions are displayed in an accordion/collapsible format

2. **Clicking a question reveals the answer**
   - Given a visitor sees a collapsed question
   - When they click on the question
   - Then the answer expands and is visible
   - And clicking again collapses the answer

3. **Questions cover key topics**
   - Given a visitor reads the FAQ
   - When they view the questions
   - Then they see questions about: pricing, trial, WhatsApp, integrations, cancellation, Meta/WhatsApp Business

4. **FAQ section has proper navigation anchor**
   - Given a visitor clicks "FAQ" in the header
   - When the page scrolls
   - Then the scroll is smooth and lands at the FAQ section

5. **Responsive design across all breakpoints**
   - Given a visitor views on any device
   - When they see the FAQ section
   - Then the layout adapts correctly for mobile, tablet, and desktop
   - And all content remains legible and well-spaced

6. **Accessibility requirements met**
   - Given a screen reader user navigates the FAQ
   - When they interact with accordion items
   - Then aria attributes are properly set
   - And keyboard navigation works correctly

## Tasks / Subtasks

- [x] Task 1: Install shadcn/ui Accordion component (AC: #1, #2, #6)
  - [x] Run `npx shadcn@latest add accordion`
  - [x] Verify accordion component files are created in `components/ui/`
  - [x] Ensure @radix-ui/react-accordion peer dependency is installed

- [x] Task 2: Create FAQ component (AC: #1, #2, #3, #5)
  - [x] Create `components/FAQ.tsx`
  - [x] Define faqItems array with 6-8 questions and answers
  - [x] Use shadcn/ui Accordion component for collapsible Q&A
  - [x] Add section id="faq" for navigation anchor
  - [x] Add aria-labelledby for accessibility
  - [x] Use alternating background pattern (white - after Pricing gray-50)

- [x] Task 3: Create FAQ content in Portuguese (AC: #3)
  - [x] Write 6-8 FAQ items covering:
    - Pricing and trial period
    - WhatsApp Business requirements
    - Google Calendar integration
    - How booking link works
    - Cancellation policy
    - Data privacy/LGPD
    - Supported professions
    - Getting started

- [x] Task 4: Integrate into page (AC: #4, #5)
  - [x] Import FAQ into `app/page.tsx`
  - [x] Replace placeholder FAQ section with actual component
  - [x] Verify section spacing and backgrounds alternate correctly
  - [x] Verify smooth scroll from header nav works

- [x] Task 5: Create unit tests (AC: #1, #2, #3, #5, #6)
  - [x] Create `components/FAQ.test.tsx`
  - [x] Test section heading renders "Perguntas Frequentes" or "FAQ"
  - [x] Test all FAQ items render
  - [x] Test accordion open/close functionality
  - [x] Test keyboard accessibility
  - [x] Test aria-labelledby accessibility
  - [x] Test section id for navigation anchor

- [x] Task 6: Verify and polish (AC: #4, #5, #6)
  - [x] Test on mobile (375px), tablet (768px), desktop (1440px)
  - [x] Verify smooth scroll from header nav works
  - [x] Ensure WCAG AA contrast compliance
  - [x] Run build to verify no errors

## Dev Notes

### Architecture Compliance

**File Location:** `apps/landing/components/`
- FAQ.tsx
- FAQ.test.tsx
- ui/accordion.tsx (installed via shadcn)

**Styling:** Tailwind CSS utility classes (no custom CSS files)

**Component Library:** shadcn/ui Accordion (built on Radix UI)

### Technical Requirements

| Component | Technology | Notes |
|-----------|------------|-------|
| Framework | Next.js 15 (App Router) | Server Components by default |
| Styling | Tailwind CSS | Mobile-first utilities |
| UI Component | shadcn/ui Accordion | Must install via CLI |
| Icons | Lucide React | ChevronDown for accordion |
| Fonts | Inter/Geist | Already configured in Story 0.1 |
| Testing | Vitest + Testing Library | Co-located tests |

### Design Specifications (from UX Design)

**Colors:**
- FAQ Background: White `#FFFFFF` (alternating pattern after Pricing gray-50)
- Text Primary: `#1F2937` (text-text)
- Text Muted: `#6B7280` (text-text-muted)
- Accent: Trust Green `#10B981` (for trigger hover)
- Border: `#E5E7EB` (border-DEFAULT) for accordion dividers

**Typography:**
- Section heading: 32px/40px semibold (desktop), 24px/32px (mobile)
- Question text: 16px/24px medium
- Answer text: 14px/20px regular, text-muted

**Spacing:**
- Section padding: `py-16 md:py-24` (64px mobile, 96px desktop)
- Accordion item padding: `py-4` for triggers
- Max-width for content: `max-w-3xl mx-auto` for readability

### Content (pt-BR)

**FAQ Section:**

```
Heading: "Perguntas Frequentes" ou "Dúvidas Frequentes"
Subtitle: "Tudo que você precisa saber sobre a Zavvy"

Q1: "Quanto custa a Zavvy?"
A1: "O plano Starter custa R$49/mês. Você pode testar grátis por 7 dias, sem precisar de cartão de crédito. Cancele quando quiser, sem fidelidade."

Q2: "Preciso ter WhatsApp Business?"
A2: "Não! A Zavvy usa sua própria infraestrutura de WhatsApp Business. Você só precisa de um número de WhatsApp pessoal para receber as notificações e gerenciar sua agenda."

Q3: "Como funciona a integração com Google Calendar?"
A3: "Ao conectar seu Google Calendar, a Zavvy sincroniza automaticamente. Eventos externos bloqueiam horários na sua agenda de atendimentos. Tudo fica sempre atualizado."

Q4: "Como meus clientes agendam?"
A4: "Você compartilha seu link de agendamento personalizado. Seus clientes escolhem o serviço, horário disponível e confirmam. Sem troca de mensagens, sem ligações."

Q5: "Posso cancelar a qualquer momento?"
A5: "Sim! Não há fidelidade ou multa. Você pode cancelar quando quiser diretamente pelo app. Seus dados ficam disponíveis por 30 dias após o cancelamento."

Q6: "Meus dados estão seguros?"
A6: "Sim. Seguimos a LGPD rigorosamente. Seus dados e os de seus clientes são criptografados e nunca compartilhados com terceiros. Você pode solicitar exclusão a qualquer momento."

Q7: "A Zavvy funciona para qualquer profissão?"
A7: "A Zavvy é ideal para profissionais que trabalham com agendamento de horários: psicólogos, advogados, nutricionistas, personal trainers, cabeleireiros, e muitos outros."

Q8: "Como começo a usar?"
A8: "Entre na lista de espera e avisaremos quando sua conta estiver pronta. O cadastro leva menos de 10 minutos: configure seus serviços, disponibilidade, e pronto!"
```

### Responsive Breakpoints

**FAQ Layout:**
| Breakpoint | Layout |
|------------|--------|
| All | Single column, max-w-3xl centered |

### Learned Patterns from Previous Stories

**From Story 0.1-0.4:**
- Use `container` class for consistent max-width and padding
- Use `text-text` and `text-text-muted` for typography colors
- Add aria-labelledby to sections with id="section-heading"
- Section backgrounds alternate: Pricing (gray-50) → FAQ (white)
- Add Portuguese accents (é, ã, ç, etc.)
- Test all content renders in unit tests
- Test accessibility attributes
- Add hover effects with transitions on interactive elements
- Test keyboard interactions for interactive components

**Code Review Patterns to Apply:**
- Add aria-labelledby for accessibility
- Test all FAQ items render (not just a few)
- Use Portuguese accents consistently
- Use theme tokens (text-text, text-muted) not hardcoded colors
- Test accordion open/close functionality
- Test keyboard navigation (Enter/Space to toggle)

### Anti-Patterns to Avoid

- **DO NOT** create custom accordion - use shadcn/ui Accordion
- **DO NOT** create custom CSS files - use Tailwind utilities only
- **DO NOT** hardcode colors - use Tailwind theme tokens
- **DO NOT** skip responsive classes
- **DO NOT** use `px-4` for sections - use `container` class
- **DO NOT** forget Portuguese accents (é, ã, ç, ê, í, ó, ú)
- **DO NOT** forget aria attributes for accessibility
- **DO NOT** skip hover effects on accordion triggers
- **DO NOT** use default Accordion styling - customize with Tailwind

### shadcn/ui Accordion Installation

```bash
# Run from apps/landing directory
npx shadcn@latest add accordion
```

This will:
1. Install @radix-ui/react-accordion if not present
2. Create components/ui/accordion.tsx with pre-styled components
3. Add necessary Tailwind animations

### Testing Checklist

- [ ] FAQ section renders with correct heading
- [ ] All 6-8 FAQ items display
- [ ] Accordion items are initially collapsed
- [ ] Clicking question expands answer
- [ ] Clicking again collapses answer
- [ ] Only one item can be open at a time (optional, can be multiple)
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] aria-labelledby is present and correct
- [ ] Section id="faq" exists for navigation
- [ ] Smooth scroll works from header nav (#faq)
- [ ] Layout correct on mobile (375px)
- [ ] Layout correct on desktop (1440px)
- [ ] Portuguese accents are correct throughout
- [ ] Hover effects on triggers

### References

- [Source: _bmad-output/project-planning-artifacts/epics.md#Story 0.5]
- [Source: _bmad-output/architecture.md#apps/landing structure]
- [Source: _bmad-output/project-planning-artifacts/ux-design-specification.md#Design System]
- [Source: _bmad-output/project-context.md#Frontend Rules]
- [Source: _bmad-output/implementation-artifacts/0-4-features-pricing-sections.md#Learned Patterns]
- [Source: shadcn/ui docs: https://ui.shadcn.com/docs/components/accordion]

### FRs Covered

- **FR120:** Landing page includes FAQ section with common questions

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

N/A

### Completion Notes List

- Installed shadcn/ui Accordion via CLI (accordion.tsx + tailwind animations)
- Created FAQ component with 8 Q&A items in Portuguese
- Used collapsible single-item Accordion with smooth animations
- Added proper accessibility (aria-labelledby, keyboard navigation via Radix)
- Integrated into page.tsx after Pricing section (alternating white background)
- Created 16 unit tests covering render, accordion behavior, accessibility
- All 86 tests passing
- Build successful (121kB first load JS)

### File List

- components/ui/accordion.tsx (NEW - installed via shadcn)
- components/FAQ.tsx (NEW)
- components/FAQ.test.tsx (NEW)
- app/page.tsx (MODIFIED - added FAQ import and component)
- tailwind.config.ts (MODIFIED - accordion animations added by shadcn)

## Senior Developer Review (AI)

**Reviewer:** Claude Opus 4.5
**Date:** 2025-12-26

### Review Summary

| Category | Count |
|----------|-------|
| High Issues | 0 |
| Medium Issues | 1 (fixed) |
| Low Issues | 1 (fixed) |

### Issues Found & Fixed

1. **[M1][FIXED]** FAQ.test.tsx - Added tests for keyboard accessibility (focusable, aria-expanded)
2. **[L1][FIXED]** FAQ.test.tsx - Added test for responsive padding classes (py-16, md:py-24)

### Verification

- ✅ All 86 tests passing
- ✅ Build successful
- ✅ All ACs implemented
- ✅ All tasks verified complete

**Outcome:** APPROVED ✅

## Change Log

- 2025-12-26: Story created with comprehensive developer context.
- 2025-12-26: Implementation complete. All tasks done. Status → review.
- 2025-12-26: Code review complete. 2 issues fixed. Status → done.
