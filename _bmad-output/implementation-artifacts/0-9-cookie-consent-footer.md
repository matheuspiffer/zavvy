# Story 0.9: Cookie Consent & Footer

Status: done

## Story

As a visitor,
I want to be informed about cookie usage and consent to it,
so that my privacy preferences are respected (LGPD compliance).

## Acceptance Criteria

1. **Cookie consent banner appears on first visit**
   - Given a first-time visitor accesses the site
   - When the page loads
   - Then a cookie consent banner appears at the bottom of the page
   - And the banner explains cookie usage briefly in pt-BR
   - And the banner has "Aceitar" and "Recusar" buttons

2. **Cookie preferences are stored**
   - Given a visitor interacts with the cookie banner
   - When they click "Aceitar" or "Recusar"
   - Then their preference is stored in localStorage
   - And the banner disappears
   - And the banner does not reappear on subsequent visits

3. **Cookie consent respects user choice**
   - Given a visitor has rejected cookies
   - When they navigate the site
   - Then only essential cookies are used
   - And no analytics/tracking cookies are set

4. **Footer has social media links**
   - Given a visitor views the footer
   - When they scroll to the bottom
   - Then they see social media links (Instagram, LinkedIn)
   - And links open in new tab with proper security attributes

5. **Footer has social proof placeholder**
   - Given a visitor views the footer
   - When they look at the footer section
   - Then they see a "Depoimentos em breve" placeholder section
   - Or subtle social proof messaging

6. **Cookie banner is accessible**
   - Given a visitor using screen reader or keyboard
   - When they interact with the cookie banner
   - Then the banner is focusable and navigable
   - And buttons have proper aria labels
   - And focus is managed appropriately

7. **Cookie banner is responsive**
   - Given a visitor views on any device
   - When they see the cookie banner
   - Then the layout adapts correctly for mobile, tablet, and desktop
   - And buttons are easily tappable on mobile

## Tasks / Subtasks

- [x] Task 1: Create CookieConsent component (AC: #1, #2, #6, #7)
  - [x] Create `components/CookieConsent.tsx`
  - [x] Add banner with brief explanation text in pt-BR
  - [x] Add "Aceitar" button with primary styling
  - [x] Add "Recusar" button with secondary styling
  - [x] Add proper aria-labels for accessibility
  - [x] Make banner fixed at bottom of viewport
  - [x] Add responsive styling for mobile

- [x] Task 2: Implement localStorage persistence (AC: #2, #3)
  - [x] Create hook `hooks/useCookieConsent.ts` for consent state
  - [x] Check localStorage on mount for existing preference
  - [x] Store preference when user clicks accept/reject
  - [x] Export consent state for conditional analytics loading
  - [x] Handle SSR (check if window is defined)

- [x] Task 3: Integrate CookieConsent into layout (AC: #1, #2)
  - [x] Add CookieConsent component to `app/layout.tsx` or `app/page.tsx`
  - [x] Ensure banner only shows when no consent stored
  - [x] Test banner appears on first visit
  - [x] Test banner disappears after interaction

- [x] Task 4: Enhance Footer with social links (AC: #4, #5)
  - [x] Add Instagram link to Footer
  - [x] Add LinkedIn link to Footer
  - [x] Add target="_blank" and rel="noopener noreferrer" for security
  - [x] Add social icons (use lucide-react icons)
  - [x] Add "Depoimentos em breve" or social proof placeholder section
  - [x] Style links consistently with existing design

- [x] Task 5: Create unit tests (AC: #1, #2, #3, #4, #5, #6, #7)
  - [x] Create `components/CookieConsent.test.tsx`
  - [x] Test banner renders on first visit (no localStorage)
  - [x] Test banner does not render when consent exists
  - [x] Test clicking "Aceitar" stores consent and hides banner
  - [x] Test clicking "Recusar" stores rejection and hides banner
  - [x] Test aria-labels are present
  - [x] Test responsive classes
  - [x] Update `components/Footer.test.tsx` for social links
  - [x] Test social links have correct href and target attributes
  - [x] Test social proof placeholder is present

- [x] Task 6: Verify and polish (AC: #1, #6, #7)
  - [x] Test on mobile (375px), tablet (768px), desktop (1440px)
  - [x] Verify banner position is correct (fixed bottom)
  - [x] Verify localStorage persistence works
  - [x] Run build to verify no errors
  - [x] Run all tests to verify no regressions

## Dev Notes

### Architecture Compliance

**File Locations:**
- `components/CookieConsent.tsx` - Cookie consent banner (NEW)
- `components/CookieConsent.test.tsx` - Unit tests (NEW)
- `hooks/useCookieConsent.ts` - Consent state hook (NEW)
- `components/Footer.tsx` - Enhanced with social links (MODIFIED)
- `components/Footer.test.tsx` - Updated tests (MODIFIED)
- `app/layout.tsx` or `app/page.tsx` - Integration (MODIFIED)

### Technical Requirements

| Component | Technology | Notes |
|-----------|------------|-------|
| Framework | Next.js 15 (App Router) | Client component for localStorage |
| Styling | Tailwind CSS | Fixed positioning, responsive |
| Icons | lucide-react | Instagram, LinkedIn icons |
| Storage | localStorage | Cookie consent persistence |
| Testing | Vitest | Co-located tests |

### Design Specifications (from UX Design)

**Cookie Banner:**
- Position: Fixed at bottom of viewport
- Background: White with shadow
- Border: Light gray top border
- Padding: `py-4 px-4 md:px-6`
- Z-index: High (z-50) to overlay content

**Colors:**
- Background: White
- Text: `#1F2937` (text-text)
- Primary Button: `#10B981` (bg-primary)
- Secondary Button: Gray outline

**Typography:**
- Banner text: text-sm
- Button text: text-sm font-medium

### Content (pt-BR)

```
Banner Text:
"Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa Política de Privacidade."

Buttons:
- "Aceitar" (primary)
- "Recusar" (secondary/outline)
```

### localStorage Keys

```typescript
const COOKIE_CONSENT_KEY = 'zavvy-cookie-consent'

// Values:
// 'accepted' - User accepted cookies
// 'rejected' - User rejected cookies
// undefined/null - No preference set (show banner)
```

### Social Media Links

```
Instagram: https://instagram.com/zavvy.app
LinkedIn: https://linkedin.com/company/zavvy-app
```

(Use placeholder URLs until real accounts are created)

### Social Proof Placeholder

```tsx
<div className="text-center py-8 border-t border-border-light">
  <p className="text-text-muted text-sm">
    Depoimentos de clientes em breve ✨
  </p>
</div>
```

### useCookieConsent Hook Pattern

```typescript
'use client'

import { useState, useEffect } from 'react'

const COOKIE_CONSENT_KEY = 'zavvy-cookie-consent'

export type ConsentStatus = 'accepted' | 'rejected' | null

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus
    setConsent(stored)
    setIsLoaded(true)
  }, [])

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
    setConsent('accepted')
  }

  const rejectCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected')
    setConsent('rejected')
  }

  return {
    consent,
    isLoaded,
    showBanner: isLoaded && consent === null,
    acceptCookies,
    rejectCookies,
  }
}
```

### CookieConsent Component Structure

```tsx
'use client'

import { useCookieConsent } from '@/hooks/useCookieConsent'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CookieConsent() {
  const { showBanner, acceptCookies, rejectCookies } = useCookieConsent()

  if (!showBanner) return null

  return (
    <div
      role="dialog"
      aria-label="Consentimento de cookies"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border-light shadow-lg"
    >
      <div className="container py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text text-center md:text-left">
            Utilizamos cookies para melhorar sua experiência. Ao continuar navegando,
            você concorda com nossa{' '}
            <Link href="/politica-de-privacidade" className="text-primary hover:underline">
              Política de Privacidade
            </Link>.
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={rejectCookies}
              aria-label="Recusar cookies"
            >
              Recusar
            </Button>
            <Button
              size="sm"
              onClick={acceptCookies}
              aria-label="Aceitar cookies"
            >
              Aceitar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### Learned Patterns from Previous Stories (CRITICAL - MUST FOLLOW)

**From Stories 0.7 and 0.8:**
- Use `container` class for consistent max-width and padding
- Use `text-text` and `text-text-muted` for typography colors
- Add proper aria-labels for accessibility
- Add focus indicator styles to interactive elements
- Use theme tokens, not hardcoded colors
- All content in pt-BR with proper accents
- Test accessibility attributes in unit tests

**From Code Reviews:**
- Add focus styles to all interactive links/buttons
- Test aria-labels in unit tests
- Use getAllByRole/getAllByText for multiple matches

### Anti-Patterns to Avoid

- **DO NOT** use English - all content in pt-BR
- **DO NOT** hardcode colors - use Tailwind theme tokens
- **DO NOT** forget Portuguese accents (é, ã, ç, ê)
- **DO NOT** skip responsive classes
- **DO NOT** forget aria-labels on banner and buttons
- **DO NOT** block page interaction while banner is shown
- **DO NOT** forget target="_blank" and rel="noopener" on social links
- **DO NOT** access localStorage during SSR (causes hydration errors)

### Testing Checklist

- [ ] Cookie banner appears on first visit
- [ ] Cookie banner does not appear after accepting
- [ ] Cookie banner does not appear after rejecting
- [ ] "Aceitar" button stores 'accepted' in localStorage
- [ ] "Recusar" button stores 'rejected' in localStorage
- [ ] Banner has proper aria-label for dialog
- [ ] Buttons have aria-labels
- [ ] Banner is fixed at bottom of viewport
- [ ] Banner is responsive on mobile
- [ ] Social media links present in footer
- [ ] Social links have target="_blank"
- [ ] Social links have rel="noopener noreferrer"
- [ ] Social proof placeholder is visible
- [ ] All tests pass
- [ ] Build succeeds

### Testing localStorage in Vitest

```typescript
// Mock localStorage for tests
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })
```

### References

- [Source: _bmad-output/project-planning-artifacts/epics.md#Story 0.9]
- [Source: _bmad-output/project-context.md#LGPD Compliance Rules]
- [Source: _bmad-output/implementation-artifacts/0-8-privacy-policy-page.md#Learned Patterns]
- [Source: LGPD Cookie Requirements]

### FRs Covered

- **FR123:** Landing page displays LGPD-compliant cookie consent banner on first visit
- **FR129:** Landing page includes social proof section (placeholder for now)
- **FR130:** Landing page footer includes links to legal pages and social media

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- All tests pass: 191 tests passing
- Build successful: Next.js 15.5.9 production build completed

### Completion Notes List

- Created useCookieConsent hook with SSR-safe localStorage handling
- Created CookieConsent component with LGPD-compliant banner in pt-BR
- Integrated CookieConsent into app/layout.tsx
- Enhanced Footer with Instagram/LinkedIn social links with proper security attributes
- Added social proof placeholder section ("Depoimentos em breve")
- Added comprehensive unit tests for CookieConsent (18 tests) and Footer (16 tests)
- All acceptance criteria satisfied
- Focus styles added for accessibility (WCAG compliance)

### File List

**NEW:**
- apps/landing/hooks/useCookieConsent.ts
- apps/landing/components/CookieConsent.tsx
- apps/landing/components/CookieConsent.test.tsx

**MODIFIED:**
- apps/landing/app/layout.tsx (added CookieConsent import and component)
- apps/landing/components/Footer.tsx (added social links, social proof placeholder, focus styles)
- apps/landing/components/Footer.test.tsx (added tests for social links, social proof, accessibility)

## Senior Developer Review (AI)

**Reviewer:** Claude Opus 4.5 (code-review workflow)
**Date:** 2025-12-27
**Outcome:** Changes Requested → Fixed

### Issues Found & Fixed

| Severity | Issue | Fix Applied |
|----------|-------|-------------|
| CRITICAL | Header duplicated in legal pages (layout + page) | Removed Header/Footer imports from politica-de-privacidade and termos-de-uso pages; now rendered from layout.tsx only |
| CRITICAL | Footer inconsistent (rendered in individual pages, not layout) | Moved Footer to layout.tsx for consistency across all pages |
| HIGH | AC #3 not documented (consent not affecting analytics) | Added JSDoc documentation to useCookieConsent hook explaining how to conditionally load analytics |
| MEDIUM | Focus management missing on cookie banner (AC #6) | Added useRef + useEffect to move focus to banner when it appears; added tabIndex={-1} for focusability |
| LOW | Social URLs are placeholders | Added TODO comment in Footer.tsx to update when real accounts exist |

### Files Modified During Review

- `apps/landing/app/layout.tsx` - Added Footer import and component
- `apps/landing/app/page.tsx` - Removed Footer (now in layout)
- `apps/landing/app/politica-de-privacidade/page.tsx` - Removed Header/Footer, changed wrapper to section
- `apps/landing/app/termos-de-uso/page.tsx` - Removed Header/Footer, changed wrapper to section
- `apps/landing/app/politica-de-privacidade/page.test.tsx` - Updated tests for new structure
- `apps/landing/app/termos-de-uso/page.test.tsx` - Updated tests for new structure
- `apps/landing/hooks/useCookieConsent.ts` - Added JSDoc documentation for analytics usage
- `apps/landing/components/CookieConsent.tsx` - Added focus management with useRef/useEffect
- `apps/landing/components/Footer.tsx` - Added TODO comment for placeholder URLs

### Post-Review Verification

- ✅ 189 tests passing (4 removed due to architecture change)
- ✅ Build successful (Next.js 15.5.9)
- ✅ All critical issues resolved

## Change Log

- 2025-12-27: Story created with comprehensive developer context by create-story workflow.
- 2025-12-27: Implementation completed. All 6 tasks done. 191 tests passing. Build successful. Ready for code review.
- 2025-12-27: Code review completed. Fixed 2 CRITICAL, 1 HIGH, 1 MEDIUM issues. 189 tests passing. Ready for final approval.
