# Story 0.3: How It Works Section

Status: done

## Story

As a potential customer,
I want to understand how Zavvy works in simple steps,
so that I can visualize using it in my business.

## Acceptance Criteria

1. **Section displays 3-4 numbered steps explaining the process**
   - Given a visitor scrolls to the "Como Funciona" section
   - When they view the section
   - Then they see 3-4 numbered steps explaining the process
   - And the steps are clearly numbered (1, 2, 3, 4)

2. **Each step has an illustration or icon**
   - Given a visitor views each step
   - When they look at the step content
   - Then each step has a relevant Lucide React icon
   - And the icon visually represents the step's action

3. **Steps follow the correct flow**
   - Given a visitor reads the steps in order
   - When they understand the flow
   - Then the steps are:
     1. Configure services (setup)
     2. Share link (distribution)
     3. Clients book (booking)
     4. WhatsApp manages (automation)

4. **Section is visually engaging with proper spacing**
   - Given a visitor views the section
   - When they scan the layout
   - Then the section has visual hierarchy with numbered progression
   - And spacing is consistent with other sections (py-16 md:py-24)
   - And the layout is visually engaging

5. **Responsive design across all breakpoints**
   - Given a visitor views on any device
   - When they see the How It Works section
   - Then the layout adapts correctly for mobile, tablet, and desktop
   - And all content remains legible and well-spaced

6. **Smooth scroll navigation works**
   - Given a visitor clicks "Como Funciona" in the header
   - When the page scrolls
   - Then the scroll is smooth and lands at the correct section

## Tasks / Subtasks

- [x] Task 1: Create HowItWorks component (AC: #1, #2, #3, #5)
  - [x] Create `components/HowItWorks.tsx`
  - [x] Design step card layout with number indicator
  - [x] Add 4 steps with Lucide React icons
  - [x] Implement responsive grid (1-col mobile, 2-col tablet, 4-col desktop)
  - [x] Add section id="como-funciona" for navigation anchor
  - [x] Add aria-labelledby for accessibility

- [x] Task 2: Style step cards with visual progression (AC: #1, #3, #4)
  - [x] Create numbered badge/indicator for each step
  - [x] Add connecting visual element between steps (optional arrow/line)
  - [x] Apply consistent card styling matching previous sections
  - [x] Implement hover effects for interactivity

- [x] Task 3: Integrate into page (AC: #4, #6)
  - [x] Import HowItWorks into `app/page.tsx`
  - [x] Place section after Solution component
  - [x] Update placeholder section with actual component
  - [x] Verify section spacing (64-80px between sections)

- [x] Task 4: Create unit tests (AC: #1, #2, #3, #5)
  - [x] Create `components/HowItWorks.test.tsx`
  - [x] Test section heading renders
  - [x] Test all 4 steps render with correct text
  - [x] Test icons render correctly
  - [x] Test responsive grid classes
  - [x] Test aria-labelledby accessibility

- [x] Task 5: Verify and polish (AC: #4, #5, #6)
  - [x] Verify smooth scroll from header nav works
  - [x] Test on mobile (375px), tablet (768px), desktop (1440px)
  - [x] Ensure WCAG AA contrast compliance
  - [x] Run build to verify no errors

## Dev Notes

### Architecture Compliance

**File Location:** `apps/landing/components/`
- HowItWorks.tsx
- HowItWorks.test.tsx

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
- Background: White `#FFFFFF` (alternating with Solution's gray-50)
- Text Primary: `#1F2937`
- Text Muted: `#6B7280`
- Accent/Numbers: Trust Green `#10B981`
- Icon background: Light green `#D1FAE5` (primary-light)

**Typography:**
- Section heading: 32px/40px semibold (desktop), 24px/32px (mobile)
- Step number: 24px bold (Trust Green)
- Step title: 18px/24px semibold
- Step description: 16px/24px regular, text-muted

**Spacing:**
- Section padding: `py-16 md:py-24` (64px mobile, 96px desktop)
- Card gap: `gap-6 md:gap-8` (24px mobile, 32px desktop)
- Icon size: 48px (w-12 h-12) with light green background
- Step number margin: mb-3

### Content (pt-BR)

**Section Heading:**
"Como funciona"

**Optional Subtitle:**
"Em 4 passos simples, você automatiza sua agenda"

**Step 1:**
- Number: "1"
- Icon: Settings (or Cog)
- Title: "Configure seus serviços"
- Description: "Cadastre os serviços que você oferece, com duração e preço. Leva menos de 5 minutos."

**Step 2:**
- Number: "2"
- Icon: Share2 (or Link)
- Title: "Compartilhe seu link"
- Description: "Envie seu link de agendamento para clientes no WhatsApp, Instagram ou onde preferir."

**Step 3:**
- Number: "3"
- Icon: CalendarCheck (or UserCheck)
- Title: "Clientes agendam sozinhos"
- Description: "Sem troca de mensagens. Cliente escolhe horário disponível e confirma na hora."

**Step 4:**
- Number: "4"
- Icon: MessageCircle (or Zap)
- Title: "Zavvy cuida do resto"
- Description: "Confirmações, lembretes e reagendamentos automáticos pelo WhatsApp. Você só atende."

### Responsive Breakpoints

| Breakpoint | Layout | Grid |
|------------|--------|------|
| Mobile (< 640px) | Single column | `grid-cols-1` |
| Tablet (640-1024px) | 2 columns | `sm:grid-cols-2` |
| Desktop (> 1024px) | 4 columns | `lg:grid-cols-4` |

### Learned Patterns from Previous Stories

**From Story 0.1:**
- Use `container` class for consistent max-width and padding
- Use `text-text` and `text-text-muted` for typography colors
- Use `bg-primary-light` for icon backgrounds
- Use `text-primary` for accent colors
- Add aria-labelledby to sections with id="section-heading"

**From Story 0.2:**
- Section backgrounds alternate: gray-50 → white → gray-50
- Story 0.2 used `bg-gray-50` for PainPoints and white for Solution
- This section (0.3) should use `bg-gray-50` for alternating pattern
- Use Lucide React icons consistently
- Add Portuguese accents (é, ã, ç, etc.)
- Header nav already has `#como-funciona` link (from placeholder)
- Test responsive grid classes in unit tests

**Code Review Patterns to Apply:**
- Add aria-labelledby for accessibility (H2 → H3 issue from 0.2)
- Test responsive breakpoint classes
- Use Portuguese accents consistently
- Use theme tokens (primary-light, text-muted) not hardcoded colors

### Anti-Patterns to Avoid

- **DO NOT** create custom CSS files - use Tailwind utilities only
- **DO NOT** use icons from other libraries - stick to Lucide React
- **DO NOT** add new fonts - use Inter/Geist from Story 0.1
- **DO NOT** hardcode colors - use Tailwind theme tokens (primary, text-muted, etc.)
- **DO NOT** skip responsive classes - always include sm: and lg: variants
- **DO NOT** use `px-4` for sections - use `container` class for consistency
- **DO NOT** forget Portuguese accents (é, ã, ç, ê, í, ó, ú)
- **DO NOT** use red colors for icons - use Trust Green theme

### Testing Checklist

- [x] Section renders with correct heading "Como funciona"
- [x] All 4 steps display with numbers (1, 2, 3, 4)
- [x] All 4 steps have Lucide React icons
- [x] All 4 steps have title and description
- [x] Smooth scroll works from header nav (#como-funciona)
- [x] Layout correct on mobile (375px) - 1 column
- [x] Layout correct on tablet (768px) - 2 columns
- [x] Layout correct on desktop (1440px) - 4 columns
- [x] Text contrast meets WCAG AA (4.5:1)
- [x] aria-labelledby is present and correct
- [x] Portuguese accents are correct throughout

### References

- [Source: _bmad-output/project-planning-artifacts/epics.md#Story 0.3]
- [Source: _bmad-output/architecture.md#apps/landing structure]
- [Source: _bmad-output/project-planning-artifacts/ux-design-specification.md#Design System]
- [Source: _bmad-output/project-planning-artifacts/ux-design-specification.md#Visual Design Foundation]
- [Source: _bmad-output/project-context.md#Frontend Rules]
- [Source: _bmad-output/implementation-artifacts/0-1-landing-page-structure-hero.md#Dev Notes]
- [Source: _bmad-output/implementation-artifacts/0-2-pain-points-solution-sections.md#Dev Notes]

### FRs Covered

- **FR117:** Landing page explains how Zavvy works in 3-4 simple steps

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Build completed successfully
- All 44 unit tests passed (HowItWorks: 11, PainPoints: 8, Solution: 9, Hero: 6, Header: 10)

### Completion Notes List

- Created HowItWorks.tsx with 4 numbered step cards
- Used Lucide React icons: Settings, Share2, CalendarCheck, MessageCircle
- Implemented responsive grid (1→2→4 columns)
- Added step number badges with Trust Green background
- Added hover effects with scale animation on icons
- Added aria-labelledby for accessibility
- Integrated into app/page.tsx after Solution component
- Removed placeholder section
- Created comprehensive unit tests (11 tests)
- Portuguese accents used throughout content

### File List

- apps/landing/components/HowItWorks.tsx (NEW)
- apps/landing/components/HowItWorks.test.tsx (NEW)
- apps/landing/app/page.tsx (MODIFIED)

## Change Log

- 2025-12-26: Story created with comprehensive developer context.
- 2025-12-26: Implementation complete. All tasks completed, all 44 tests passing.
- 2025-12-26: Code review fixes applied. All 47 tests passing. Issues fixed:
  - H1: Added connecting ChevronRight arrows between steps on desktop
  - M1: Added test for hover effect on icon containers
  - M2: Added test for step card structure
  - L2: Adjusted icon size to match spec (w-12 h-12 = 48px)
