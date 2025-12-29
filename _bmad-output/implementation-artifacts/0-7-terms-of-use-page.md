# Story 0.7: Terms of Use Page

Status: done

## Story

As a potential customer,
I want to read the Terms of Use,
so that I understand the service conditions before signing up.

## Acceptance Criteria

1. **Terms of Use page accessible from footer**
   - Given a visitor views the footer
   - When they click "Termos de Uso"
   - Then they navigate to /termos-de-uso
   - And the page loads correctly

2. **Complete Terms of Use content**
   - Given a visitor accesses /termos-de-uso
   - When the page loads
   - Then they see the complete Terms of Use document
   - And the document includes: service description, user obligations, limitations, intellectual property, termination
   - And the page shows last updated date

3. **Proper heading structure**
   - Given a visitor views the Terms of Use page
   - When they read the content
   - Then the page has proper heading structure (h1, h2, h3)
   - And content is organized in logical sections

4. **Navigation back to home**
   - Given a visitor is on /termos-de-uso
   - When they want to return home
   - Then navigation back to home is available (header or explicit link)

5. **Responsive design**
   - Given a visitor views on any device
   - When they see the Terms of Use page
   - Then the layout adapts correctly for mobile, tablet, and desktop
   - And text is readable with proper line-height and max-width

6. **SEO metadata**
   - Given search engines crawl the page
   - When they index /termos-de-uso
   - Then proper meta tags are present (title, description)
   - And the page is indexable

## Tasks / Subtasks

- [x] Task 1: Create Terms of Use page (AC: #1, #2, #3, #5, #6)
  - [x] Create `app/termos-de-uso/page.tsx`
  - [x] Add proper SEO metadata (title, description)
  - [x] Create page structure with proper heading hierarchy
  - [x] Use container class for consistent max-width
  - [x] Add responsive typography (text-sm md:text-base)

- [x] Task 2: Write Terms of Use content (AC: #2, #3)
  - [x] Write introduction/acceptance section
  - [x] Write service description section
  - [x] Write user obligations section
  - [x] Write limitations of liability section
  - [x] Write intellectual property section
  - [x] Write account termination section
  - [x] Write governing law section (Brazilian law)
  - [x] Add last updated date (December 2025)

- [x] Task 3: Add navigation elements (AC: #4)
  - [x] Ensure Header component is visible on the page
  - [x] Add "Voltar para home" link or breadcrumb

- [x] Task 4: Update Footer with link (AC: #1)
  - [x] Create Footer component if not exists
  - [x] Add "Termos de Uso" link to footer
  - [x] Update page.tsx to include Footer

- [x] Task 5: Create unit tests (AC: #1, #2, #3, #4, #5, #6)
  - [x] Create `app/termos-de-uso/page.test.tsx`
  - [x] Test page renders with correct h1 heading
  - [x] Test all main sections are present
  - [x] Test last updated date is visible
  - [x] Test navigation elements are present
  - [x] Test proper heading hierarchy
  - [x] Test responsive classes

- [x] Task 6: Verify and polish (AC: #1, #5, #6)
  - [x] Test on mobile (375px), tablet (768px), desktop (1440px)
  - [x] Verify link from footer works
  - [x] Verify Header is present
  - [x] Run build to verify no errors

## Dev Notes

### Architecture Compliance

**File Locations:**
- `app/termos-de-uso/page.tsx` - Terms of Use page
- `app/termos-de-uso/page.test.tsx` - Unit tests
- `components/Footer.tsx` - Footer component (NEW)
- `components/Footer.test.tsx` - Footer tests (NEW)

### Technical Requirements

| Component | Technology | Notes |
|-----------|------------|-------|
| Framework | Next.js 15 (App Router) | Static page with metadata |
| Styling | Tailwind CSS | Mobile-first utilities |
| Typography | prose classes or custom | Readable legal text |
| Testing | Vitest | Co-located tests |

### Design Specifications (from UX Design)

**Colors:**
- Background: White
- Text Primary: `#1F2937` (text-text)
- Text Muted: `#6B7280` (text-text-muted)
- Links: `#10B981` (text-primary)

**Typography:**
- Page heading: 32px/40px semibold (h1)
- Section headings: 24px/32px semibold (h2)
- Subsection headings: 18px/28px medium (h3)
- Body text: 14px/24px regular (readable line-height)
- Last updated: text-sm text-text-muted

**Layout:**
- Section padding: `py-16 md:py-24`
- Content max-width: `max-w-3xl mx-auto` for readability
- Section spacing: `space-y-8` between sections

### Content (pt-BR)

```
Page Title: "Termos de Uso"
Meta Title: "Termos de Uso | Zavvy"
Meta Description: "Termos e condições de uso da plataforma Zavvy de agendamento via WhatsApp."

Last Updated: "Última atualização: Dezembro de 2025"

Sections:
1. Aceitação dos Termos
2. Descrição do Serviço
3. Cadastro e Conta
4. Obrigações do Usuário
5. Limitações de Responsabilidade
6. Propriedade Intelectual
7. Encerramento da Conta
8. Modificações dos Termos
9. Lei Aplicável e Foro
10. Contato
```

### Content Guidelines

**Legal Requirements:**
- All text in Brazilian Portuguese
- Reference LGPD where applicable
- Clear, plain language (avoid excessive legalese)
- Contact email: contato@zavvy.app

**Tone:**
- Professional but accessible
- Clear section headers
- Bullet points for lists
- Numbered items for sequential obligations

### Responsive Breakpoints

**Layout:**
| Breakpoint | Layout |
|------------|--------|
| All | Single column, max-w-3xl centered |
| Mobile | px-4 padding |
| Desktop | Larger padding, same max-width |

### Learned Patterns from Previous Stories

**From Story 0.1-0.6:**
- Use `container` class for consistent max-width and padding
- Use `text-text` and `text-text-muted` for typography colors
- Add aria-labelledby to main content sections
- Add Portuguese accents (é, ã, ç, ê, í, ó, ú)
- Test all content renders in unit tests
- Test accessibility attributes
- Use theme tokens (text-text, text-muted) not hardcoded colors

**From Story 0.6 Code Review:**
- Test for empty states and edge cases
- Avoid logging PII
- Use proper aria-labels for accessibility
- Test container class usage

### Anti-Patterns to Avoid

- **DO NOT** use English - all content in pt-BR
- **DO NOT** hardcode colors - use Tailwind theme tokens
- **DO NOT** forget Portuguese accents
- **DO NOT** skip responsive classes
- **DO NOT** use `px-4` for page container - use `container` class
- **DO NOT** create overly long paragraphs - use bullet points
- **DO NOT** skip SEO metadata
- **DO NOT** forget to test heading hierarchy

### Footer Component Structure

```tsx
// components/Footer.tsx
<footer className="py-8 border-t border-border-light">
  <div className="container">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-text-muted text-sm">
        © 2025 Zavvy. Todos os direitos reservados.
      </p>
      <nav className="flex gap-4 text-sm">
        <Link href="/termos-de-uso" className="text-text-muted hover:text-primary">
          Termos de Uso
        </Link>
        <Link href="/politica-de-privacidade" className="text-text-muted hover:text-primary">
          Política de Privacidade
        </Link>
      </nav>
    </div>
  </div>
</footer>
```

### Testing Checklist

- [ ] Page renders with "Termos de Uso" h1 heading
- [ ] All 10 content sections are present
- [ ] Last updated date is visible
- [ ] Header is present on page
- [ ] Navigation link back to home works
- [ ] Footer link to /termos-de-uso works
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Text is readable (proper line-height, max-width)
- [ ] Layout correct on mobile (375px)
- [ ] Layout correct on desktop (1440px)
- [ ] Portuguese accents are correct throughout
- [ ] SEO metadata is present
- [ ] aria-labelledby on main content

### References

- [Source: _bmad-output/project-planning-artifacts/epics.md#Story 0.7]
- [Source: _bmad-output/project-context.md#Frontend Rules]
- [Source: _bmad-output/implementation-artifacts/0-6-waitlist-form-api.md#Learned Patterns]
- [Source: Brazilian Consumer Code (CDC)]
- [Source: LGPD - Lei Geral de Proteção de Dados]

### FRs Covered

- **FR121:** Landing page has Terms of Use page accessible from footer

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

N/A

### Completion Notes List

- Created Terms of Use page at /termos-de-uso with 10 legal sections in pt-BR
- Added SEO metadata (title, description)
- Created Footer component with links to legal pages
- Updated page.tsx to use Footer component instead of placeholder
- Added "Voltar para home" navigation link
- Fixed ESLint quote escaping errors with HTML entities (&ldquo;, &rdquo;)
- Created 15 unit tests for Terms of Use page
- Created 8 unit tests for Footer component
- All 141 tests passing
- Build successful (114 kB first load JS for /termos-de-uso)

### File List

- app/termos-de-uso/page.tsx (NEW)
- app/termos-de-uso/page.test.tsx (NEW)
- components/Footer.tsx (NEW)
- components/Footer.test.tsx (NEW)
- app/page.tsx (MODIFIED - replaced placeholder footer with Footer component)

## Change Log

- 2025-12-26: Story created with comprehensive developer context.
- 2025-12-26: Implementation complete. All tasks done. Status → review.
- 2025-12-27: Code review completed. 6 issues found and fixed:
  - [H1] Added focus indicator styles to back link (accessibility)
  - [M1] Added aria-labelledby to all 10 sections (landmark structure)
  - [M2] Changed copyright year from hardcoded to dynamic
  - [M3] Added test for focus indicator styles
  - [L1] Merged with M1 (sections now have aria-labelledby)
  - [L2] Added comprehensive Portuguese accent tests
  Tests: 141 → 144. Status → done.
