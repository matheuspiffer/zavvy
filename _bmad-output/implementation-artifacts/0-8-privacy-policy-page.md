# Story 0.8: Privacy Policy Page

Status: done

## Story

As a potential customer,
I want to read the Privacy Policy,
so that I understand how my data will be handled (LGPD compliance).

## Acceptance Criteria

1. **Privacy Policy page accessible from footer**
   - Given a visitor views the footer
   - When they click "Política de Privacidade"
   - Then they navigate to /politica-de-privacidade
   - And the page loads correctly

2. **Complete LGPD-compliant Privacy Policy content**
   - Given a visitor accesses /politica-de-privacidade
   - When the page loads
   - Then they see the complete Privacy Policy document
   - And the document is LGPD-compliant
   - And it includes: data collected, legal basis, data rights, retention period, contact information
   - And the page shows last updated date

3. **DPO/Contact information**
   - Given a visitor views the Privacy Policy page
   - When they read the contact section
   - Then they see DPO/contact email (contato@zavvy.app)
   - And they see instructions for exercising data rights

4. **Proper heading structure**
   - Given a visitor views the Privacy Policy page
   - When they read the content
   - Then the page has proper heading structure (h1, h2, h3)
   - And content is organized in logical sections

5. **Navigation back to home**
   - Given a visitor is on /politica-de-privacidade
   - When they want to return home
   - Then navigation back to home is available (header or explicit link)

6. **Responsive design**
   - Given a visitor views on any device
   - When they see the Privacy Policy page
   - Then the layout adapts correctly for mobile, tablet, and desktop
   - And text is readable with proper line-height and max-width

7. **SEO metadata**
   - Given search engines crawl the page
   - When they index /politica-de-privacidade
   - Then proper meta tags are present (title, description)
   - And the page is indexable

## Tasks / Subtasks

- [x] Task 1: Create Privacy Policy page (AC: #1, #4, #5, #6, #7)
  - [x] Create `app/politica-de-privacidade/page.tsx`
  - [x] Add proper SEO metadata (title, description)
  - [x] Create page structure with proper heading hierarchy
  - [x] Use container class for consistent max-width
  - [x] Add responsive typography (text-sm md:text-base)
  - [x] Include Header and Footer components
  - [x] Add "Voltar para home" link with focus styles

- [x] Task 2: Write LGPD-compliant Privacy Policy content (AC: #2, #3, #4)
  - [x] Write introduction/controller identification section
  - [x] Write data collected section (what data we collect)
  - [x] Write legal basis section (LGPD Article 7)
  - [x] Write data usage purpose section
  - [x] Write data sharing section
  - [x] Write data retention section
  - [x] Write data subject rights section (LGPD Articles 17-22)
  - [x] Write security measures section
  - [x] Write cookies section
  - [x] Write changes to policy section
  - [x] Write contact/DPO section
  - [x] Add last updated date (December 2025)

- [x] Task 3: Verify footer link works (AC: #1)
  - [x] Verify "Política de Privacidade" link in Footer navigates correctly
  - [x] Footer already has link from Story 0.7

- [x] Task 4: Create unit tests (AC: #1, #2, #3, #4, #5, #6, #7)
  - [x] Create `app/politica-de-privacidade/page.test.tsx`
  - [x] Test page renders with correct h1 heading
  - [x] Test all LGPD-required sections are present
  - [x] Test last updated date is visible
  - [x] Test DPO/contact email is visible
  - [x] Test navigation elements are present
  - [x] Test proper heading hierarchy
  - [x] Test responsive classes
  - [x] Test focus indicator styles on back link
  - [x] Test sections have aria-labelledby

- [x] Task 5: Verify and polish (AC: #1, #6, #7)
  - [x] Test on mobile (375px), tablet (768px), desktop (1440px)
  - [x] Verify link from footer works
  - [x] Verify Header is present
  - [x] Run build to verify no errors
  - [x] Run all tests to verify no regressions

## Dev Notes

### Architecture Compliance

**File Locations:**
- `app/politica-de-privacidade/page.tsx` - Privacy Policy page (NEW)
- `app/politica-de-privacidade/page.test.tsx` - Unit tests (NEW)
- `components/Footer.tsx` - Already has link (from Story 0.7)

### Technical Requirements

| Component | Technology | Notes |
|-----------|------------|-------|
| Framework | Next.js 15 (App Router) | Static page with metadata |
| Styling | Tailwind CSS | Mobile-first utilities |
| Typography | Custom with theme tokens | Readable legal text |
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

### LGPD-Compliant Content Structure (pt-BR)

```
Page Title: "Política de Privacidade"
Meta Title: "Política de Privacidade | Zavvy"
Meta Description: "Política de privacidade da plataforma Zavvy. Saiba como coletamos, usamos e protegemos seus dados pessoais conforme a LGPD."

Last Updated: "Última atualização: Dezembro de 2025"

Sections:
1. Identificação do Controlador
2. Dados Pessoais Coletados
3. Finalidade do Tratamento
4. Base Legal (LGPD Art. 7)
5. Compartilhamento de Dados
6. Armazenamento e Segurança
7. Retenção de Dados
8. Seus Direitos (LGPD Arts. 17-22)
9. Cookies e Tecnologias de Rastreamento
10. Alterações nesta Política
11. Contato e Encarregado (DPO)
```

### LGPD Required Content

**Data Subject Rights (LGPD Articles 17-22):**
- Confirmação da existência de tratamento
- Acesso aos dados
- Correção de dados incompletos ou desatualizados
- Anonimização, bloqueio ou eliminação de dados desnecessários
- Portabilidade dos dados
- Eliminação dos dados tratados com consentimento
- Informação sobre compartilhamento
- Revogação do consentimento

**Legal Bases for Processing (LGPD Article 7):**
- Execução de contrato (agendamentos)
- Consentimento (marketing, waitlist)
- Legítimo interesse (melhorias do serviço)
- Cumprimento de obrigação legal (fiscais)

**Data Collected:**
- Dados de identificação (nome, email, telefone)
- Dados de uso (logs, preferências)
- Dados de agendamento (serviços, horários)
- Dados de pagamento (processados por Stripe)

### Content Guidelines

**Legal Requirements:**
- All text in Brazilian Portuguese
- Reference LGPD articles explicitly
- Clear, plain language (avoid excessive legalese)
- Contact email: contato@zavvy.app
- DPO email: privacidade@zavvy.app

**Tone:**
- Professional but accessible
- Clear section headers
- Bullet points for lists
- Numbered items for sequential rights

### Responsive Breakpoints

**Layout:**
| Breakpoint | Layout |
|------------|--------|
| All | Single column, max-w-3xl centered |
| Mobile | px-4 padding |
| Desktop | Larger padding, same max-width |

### Learned Patterns from Story 0.7 (CRITICAL - MUST FOLLOW)

**From Story 0.7 Implementation:**
- Use `container` class for consistent max-width and padding
- Use `text-text` and `text-text-muted` for typography colors
- Add `aria-labelledby` to main element AND all sections
- Add `id` attributes to h2 headings for aria-labelledby
- Use `&ldquo;` and `&rdquo;` for quotes in JSX (ESLint requirement)
- Add focus indicator styles to back link: `focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`
- Use dynamic year in Footer (already done)
- Test Portuguese accents (é, ã, ç, ê, í, ó, ú)
- Test heading hierarchy (h1 → h2)
- Test container class usage
- Test focus indicator classes

**Page Structure (copy from termos-de-uso):**
```tsx
export default function PoliticaDePrivacidadePage() {
  return (
    <>
      <Header />
      <main
        id="politica-de-privacidade"
        aria-labelledby="politica-heading"
        className="py-16 md:py-24"
      >
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-text-muted hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors mb-8"
            >
              ← Voltar para home
            </Link>
            <h1 id="politica-heading" className="...">
              Política de Privacidade
            </h1>
            {/* sections with aria-labelledby */}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
```

**From Story 0.7 Code Review Fixes:**
- Always add focus styles to interactive links
- Use aria-labelledby on sections pointing to h2 IDs
- Test focus indicator styles in unit tests
- Test Portuguese accented terms in unit tests

### Anti-Patterns to Avoid

- **DO NOT** use English - all content in pt-BR
- **DO NOT** hardcode colors - use Tailwind theme tokens
- **DO NOT** forget Portuguese accents
- **DO NOT** skip responsive classes
- **DO NOT** use `px-4` for page container - use `container` class
- **DO NOT** create overly long paragraphs - use bullet points
- **DO NOT** skip SEO metadata
- **DO NOT** forget to test heading hierarchy
- **DO NOT** use regular quotes in JSX - use &ldquo; and &rdquo;
- **DO NOT** forget focus styles on back link
- **DO NOT** forget aria-labelledby on sections

### Testing Checklist

- [ ] Page renders with "Política de Privacidade" h1 heading
- [ ] All 11 LGPD content sections are present
- [ ] Last updated date is visible
- [ ] DPO/contact email is visible and clickable
- [ ] Header is present on page
- [ ] Navigation link back to home works
- [ ] Footer link to /politica-de-privacidade works
- [ ] Proper heading hierarchy (h1 → h2)
- [ ] Text is readable (proper line-height, max-width)
- [ ] Layout correct on mobile (375px)
- [ ] Layout correct on desktop (1440px)
- [ ] Portuguese accents are correct throughout
- [ ] SEO metadata is present
- [ ] aria-labelledby on main content
- [ ] aria-labelledby on each section
- [ ] Focus styles present on back link
- [ ] LGPD data rights section is complete

### References

- [Source: _bmad-output/project-planning-artifacts/epics.md#Story 0.8]
- [Source: _bmad-output/project-context.md#LGPD Compliance Rules]
- [Source: _bmad-output/implementation-artifacts/0-7-terms-of-use-page.md#Learned Patterns]
- [Source: LGPD - Lei Geral de Proteção de Dados (Lei 13.709/2018)]
- [Source: LGPD Articles 7, 17-22]

### FRs Covered

- **FR122:** Landing page has Privacy Policy page accessible from footer (LGPD-compliant)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

N/A

### Completion Notes List

- Created Privacy Policy page at /politica-de-privacidade with 11 LGPD-compliant sections in pt-BR
- Added SEO metadata (title, description)
- Included all LGPD-required content: data collected, legal basis (Art. 7), data rights (Arts. 17-22), retention, DPO contact
- Added aria-labelledby to main element and all 11 sections for accessibility
- Added focus indicator styles to back link
- Used HTML entities for quotes (&ldquo;, &rdquo;) per ESLint requirement
- Created 21 unit tests for Privacy Policy page
- All 165 tests passing (21 new + 144 existing)
- Build successful (114 kB first load JS for /politica-de-privacidade)
- Footer link from Story 0.7 already points to /politica-de-privacidade

### File List

- app/politica-de-privacidade/page.tsx (NEW)
- app/politica-de-privacidade/page.test.tsx (NEW)

## Change Log

- 2025-12-27: Story created with comprehensive developer context by create-story workflow.
- 2025-12-27: Implementation complete. All tasks done. Status → review.
- 2025-12-27: Code review completed. 4 issues found and fixed:
  - [H1] Added focus styles to all 5 email links (accessibility)
  - [M1] Added test for email link focus styles
  - [M2] Added IDs to h3 headings (section-2-1, section-2-2, section-2-3)
  - [L1] Added tests for h3 headings (count and IDs)
  Tests: 165 → 168. Status → done.
