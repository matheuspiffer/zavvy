# Story 0.10: SEO & Analytics

Status: review

## Story

As a Zavvy team member,
I want proper SEO and analytics setup,
so that we can track visitors and rank well in search engines.

## Acceptance Criteria

1. **Meta tags are present and properly configured**
   - Given the landing page is deployed
   - When search engines crawl the site
   - Then proper meta tags are present (title, description, keywords)
   - And descriptions include Portuguese accents (ç, ã, õ, é, ê)
   - And meta charset is UTF-8

2. **Open Graph tags are configured for social sharing**
   - Given a user shares the landing page on social media
   - When the preview is generated
   - Then Open Graph title, description, image, and URL are present
   - And Twitter Card meta tags are present
   - And og:locale is set to pt_BR

3. **Sitemap.xml is generated**
   - Given the site is deployed
   - When search engines request /sitemap.xml
   - Then a valid XML sitemap is returned
   - And all public pages are included (/, /termos-de-uso, /politica-de-privacidade)
   - And lastmod dates are accurate

4. **Robots.txt is properly configured**
   - Given a crawler requests /robots.txt
   - When the request is processed
   - Then a valid robots.txt is returned
   - And it references the sitemap location
   - And it allows indexing of public pages

5. **Page view events are tracked (with consent)**
   - Given a visitor has accepted cookies
   - When they view any page
   - Then a page_view event is sent to analytics
   - And the page path and title are included

6. **CTA click events are tracked**
   - Given a visitor has accepted cookies
   - When they click any CTA button (Hero, pricing, etc.)
   - Then a cta_click event is sent with button identifier
   - And conversion tracking is enabled

7. **Scroll depth is tracked**
   - Given a visitor has accepted cookies
   - When they scroll through the page
   - Then scroll depth events are sent at 25%, 50%, 75%, 100%
   - And each threshold fires only once per page view

8. **Analytics respects cookie consent**
   - Given a visitor has rejected cookies
   - When they navigate the site
   - Then NO analytics scripts are loaded
   - And NO tracking events are sent
   - And only essential cookies are used

9. **CTA behavior is configurable via environment variable**
   - Given FR127 needs to be activated post-launch
   - When NEXT_PUBLIC_CTA_MODE is set to 'signup'
   - Then CTAs redirect to signup instead of waitlist form
   - And the change requires no code deployment

## Tasks / Subtasks

- [x] Task 1: Fix metadata with proper Portuguese accents (AC: #1, #2)
  - [x] Update layout.tsx metadata with accented characters (ç, ã, é)
  - [x] Add canonical URL meta tag
  - [x] Ensure og:url is configured correctly
  - [x] Add og:image placeholder (use /og-image.png)
  - [x] Verify twitter:image is present

- [x] Task 2: Create sitemap.xml (AC: #3)
  - [x] Create app/sitemap.ts using Next.js sitemap API
  - [x] Include all public routes (/, /termos-de-uso, /politica-de-privacidade)
  - [x] Set appropriate changeFrequency and priority values
  - [x] Add lastModified dates

- [x] Task 3: Create robots.txt (AC: #4)
  - [x] Create app/robots.ts using Next.js robots API
  - [x] Allow all crawlers for public pages
  - [x] Reference sitemap.xml location
  - [x] Disallow /api/* routes

- [x] Task 4: Create analytics provider with consent integration (AC: #5, #8)
  - [x] Create lib/analytics.ts with tracking functions
  - [x] Create components/AnalyticsProvider.tsx client component
  - [x] Integrate with useCookieConsent hook
  - [x] Only load GA4 script when consent === 'accepted'
  - [x] Add NEXT_PUBLIC_GA_MEASUREMENT_ID environment variable
  - [x] Create lib/gtag.ts helper for GA4 events

- [x] Task 5: Implement event tracking for CTAs (AC: #6)
  - [x] Create trackCTAClick(buttonId: string) function
  - [x] Update Hero.tsx to track CTA clicks
  - [x] Update Pricing.tsx to track plan CTA clicks
  - [x] Update Waitlist.tsx to track form submission
  - [x] Pass descriptive button identifiers (hero_cta, pricing_starter, etc.)

- [x] Task 6: Implement scroll depth tracking (AC: #7)
  - [x] Create hooks/useScrollDepth.ts hook
  - [x] Track thresholds at 25%, 50%, 75%, 100%
  - [x] Ensure each threshold fires only once per session
  - [x] Integrate with AnalyticsProvider

- [x] Task 7: Add environment variable for CTA mode (AC: #9)
  - [x] Add NEXT_PUBLIC_CTA_MODE to .env.example
  - [x] Create lib/config.ts to read CTA mode
  - [x] Update Hero.tsx to conditionally show waitlist or signup redirect
  - [x] Document the environment variable in README or comments

- [x] Task 8: Create unit tests (AC: #1-9)
  - [x] Create lib/analytics.test.ts
  - [x] Test analytics functions respect consent
  - [x] Test scroll depth thresholds logic
  - [x] Test CTA mode configuration
  - [x] Create hooks/useScrollDepth.test.ts

- [x] Task 9: Verify and polish (AC: #1-9)
  - [x] Verify sitemap.xml is accessible at /sitemap.xml
  - [x] Verify robots.txt is accessible at /robots.txt
  - [x] Test metadata with social media preview tools
  - [x] Verify analytics events fire correctly (via browser console)
  - [x] Run build to verify no errors
  - [x] Run all tests to verify no regressions

## Dev Notes

### Architecture Compliance

**File Locations:**
- `app/layout.tsx` - Enhanced metadata with accents (MODIFIED)
- `app/sitemap.ts` - Next.js sitemap generator (NEW)
- `app/robots.ts` - Next.js robots.txt generator (NEW)
- `lib/analytics.ts` - Analytics utility functions (NEW)
- `lib/gtag.ts` - Google Analytics 4 helper (NEW)
- `lib/config.ts` - Environment configuration (NEW)
- `components/AnalyticsProvider.tsx` - Client-side analytics loader (NEW)
- `hooks/useScrollDepth.ts` - Scroll depth tracking hook (NEW)
- `hooks/useScrollDepth.test.ts` - Unit tests (NEW)
- `components/Hero.tsx` - Add CTA tracking (MODIFIED)
- `components/Pricing.tsx` - Add CTA tracking (MODIFIED)
- `components/WaitlistForm.tsx` - Add form submission tracking (MODIFIED)
- `.env.example` - Add analytics env vars (NEW/MODIFIED)

### Technical Requirements

| Component | Technology | Notes |
|-----------|------------|-------|
| Framework | Next.js 15 (App Router) | Use built-in metadata API, sitemap, robots |
| Analytics | Google Analytics 4 | Load conditionally based on consent |
| Tracking | gtag.js | Native GA4 event tracking |
| Testing | Vitest | Co-located tests |
| Styling | Tailwind CSS | No changes expected |

### Design Specifications

**No visual changes required** - this story is focused on SEO metadata and analytics tracking which are invisible to users.

### Content (pt-BR) - Metadata with Accents

```typescript
// Correct accented metadata
export const metadata: Metadata = {
  title: 'Zavvy - Seu assistente de agendamentos no WhatsApp',
  description: 'Automatize confirmações, lembretes e reagendamentos. Seus clientes marcam pelo link, você gerencia pelo WhatsApp.',
  keywords: ['agendamento', 'whatsapp', 'agenda', 'confirmação', 'lembrete', 'profissional'],
  // ... rest of metadata
}
```

### Sitemap Pattern (Next.js 15)

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zavvy.app'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/termos-de-uso`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/politica-de-privacidade`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}
```

### Robots.txt Pattern (Next.js 15)

```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://zavvy.app/sitemap.xml',
  }
}
```

### Analytics Integration Pattern

```typescript
// lib/analytics.ts
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

export function trackEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params)
  }
}

export function trackCTAClick(buttonId: string) {
  trackEvent('cta_click', {
    button_id: buttonId,
    page_path: window.location.pathname,
  })
}

export function trackScrollDepth(percentage: number) {
  trackEvent('scroll_depth', {
    depth_percentage: percentage,
    page_path: window.location.pathname,
  })
}
```

### AnalyticsProvider Pattern

```typescript
// components/AnalyticsProvider.tsx
'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useCookieConsent } from '@/hooks/useCookieConsent'
import { GA_MEASUREMENT_ID, trackPageView } from '@/lib/analytics'

export function AnalyticsProvider() {
  const { consent } = useCookieConsent()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views on route change
  useEffect(() => {
    if (consent === 'accepted' && GA_MEASUREMENT_ID) {
      const url = pathname + (searchParams?.toString() || '')
      trackPageView(url)
    }
  }, [pathname, searchParams, consent])

  // Only load GA script if consent is accepted
  if (consent !== 'accepted' || !GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
```

### useScrollDepth Hook Pattern

```typescript
// hooks/useScrollDepth.ts
'use client'

import { useEffect, useRef } from 'react'
import { useCookieConsent } from './useCookieConsent'
import { trackScrollDepth } from '@/lib/analytics'

const THRESHOLDS = [25, 50, 75, 100]

export function useScrollDepth() {
  const { consent } = useCookieConsent()
  const trackedRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    if (consent !== 'accepted') return

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY
      const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100)

      for (const threshold of THRESHOLDS) {
        if (scrollPercentage >= threshold && !trackedRef.current.has(threshold)) {
          trackedRef.current.add(threshold)
          trackScrollDepth(threshold)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [consent])

  // Reset on page change
  useEffect(() => {
    trackedRef.current = new Set()
  }, [])
}
```

### CTA Mode Configuration Pattern

```typescript
// lib/config.ts
export type CTAMode = 'waitlist' | 'signup'

export function getCTAMode(): CTAMode {
  const mode = process.env.NEXT_PUBLIC_CTA_MODE
  if (mode === 'signup') return 'signup'
  return 'waitlist' // default
}

export function getCTAHref(): string {
  const mode = getCTAMode()
  if (mode === 'signup') {
    return process.env.NEXT_PUBLIC_SIGNUP_URL || '/signup'
  }
  return '#waitlist'
}
```

### Environment Variables

```bash
# .env.example
# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# CTA Mode: 'waitlist' (default) or 'signup'
NEXT_PUBLIC_CTA_MODE=waitlist

# Signup URL (used when CTA_MODE=signup)
NEXT_PUBLIC_SIGNUP_URL=https://app.zavvy.app/signup

# Site URL for sitemap/robots
NEXT_PUBLIC_SITE_URL=https://zavvy.app
```

### Global Type Declaration for gtag

```typescript
// types/gtag.d.ts or in lib/gtag.ts
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void
    dataLayer: unknown[]
  }
}

export {}
```

### Learned Patterns from Previous Stories (CRITICAL - MUST FOLLOW)

**From Story 0.9 (Cookie Consent):**
- useCookieConsent hook already exists and works correctly
- SSR-safe pattern: check `typeof window !== 'undefined'` before localStorage
- Consent values: 'accepted' | 'rejected' | null
- Integration ready: consent export can be used for conditional analytics

**From Code Reviews:**
- Add focus styles to all interactive elements
- Use theme tokens, not hardcoded colors
- All content in pt-BR with proper accents (ç, ã, é, ê, õ)
- Test aria-labels in unit tests
- Header/Footer are now in layout.tsx, not individual pages

**Architecture Notes:**
- Next.js 15 App Router - use built-in metadata, sitemap, robots APIs
- Client components need 'use client' directive
- Script component from next/script for external scripts

### Anti-Patterns to Avoid

- **DO NOT** load analytics before checking consent
- **DO NOT** hardcode GA measurement ID - use environment variable
- **DO NOT** forget Portuguese accents in metadata
- **DO NOT** fire scroll events multiple times for same threshold
- **DO NOT** block page rendering for analytics
- **DO NOT** use document.write or synchronous scripts
- **DO NOT** track events when consent is rejected or null

### Testing Checklist

- [ ] Metadata has proper Portuguese accents
- [ ] Open Graph tags are present and correct
- [ ] /sitemap.xml returns valid XML
- [ ] /robots.txt returns valid content
- [ ] Analytics scripts NOT loaded when consent is null
- [ ] Analytics scripts NOT loaded when consent is rejected
- [ ] Analytics scripts loaded when consent is accepted
- [ ] Page view events fire on navigation (with consent)
- [ ] CTA click events fire (with consent)
- [ ] Scroll depth events fire at 25/50/75/100% (with consent)
- [ ] Each scroll threshold fires only once
- [ ] NEXT_PUBLIC_CTA_MODE=signup changes CTA behavior
- [ ] All tests pass
- [ ] Build succeeds

### References

- [Source: _bmad-output/project-planning-artifacts/epics.md#Story 0.10]
- [Source: _bmad-output/project-context.md#Technology Stack]
- [Source: _bmad-output/architecture.md#Landing Page]
- [Source: _bmad-output/implementation-artifacts/0-9-cookie-consent-footer.md#Learned Patterns]
- [Source: Next.js Metadata API](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
- [Source: Next.js Sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Source: Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)

### FRs Covered

- **FR127:** Post-launch CTA behavior switch (waitlist → signup redirect)
- **FR131:** Landing page has proper SEO metadata for search engine ranking
- **FR132:** Landing page tracks visitor analytics for conversion optimization

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- All 215 tests pass
- Build successful: Next.js 15.5.9 production build completed
- Sitemap and robots.txt generated correctly

### Completion Notes List

- Fixed Portuguese accents in layout.tsx metadata (confirmações, você, confirmação)
- Fixed Portuguese accents in Hero.tsx (automático, confirmações, automáticos, ilustração)
- Added metadataBase, og:url, og:image, twitter:image to metadata
- Created app/sitemap.ts with all 3 public routes
- Created app/robots.ts with sitemap reference and /api/ disallow
- Created lib/gtag.ts with type declarations and GA4 helpers
- Created lib/analytics.ts with trackPageView, trackEvent, trackCTAClick, trackScrollDepth, trackFormSubmission
- Created lib/config.ts with getCTAMode, getCTAHref, isSignupMode
- Created components/AnalyticsProvider.tsx with consent-aware GA4 loading
- Created hooks/useScrollDepth.ts with 25/50/75/100% threshold tracking
- Updated Hero.tsx to use useScrollDepth, track CTA clicks, and support CTA mode
- Updated Pricing.tsx to track CTA clicks and support CTA mode
- Updated Waitlist.tsx to track form submissions
- Added AnalyticsProvider to layout.tsx
- Updated .env.example with GA_MEASUREMENT_ID, CTA_MODE, SIGNUP_URL, SITE_URL
- Created lib/analytics.test.ts (10 tests)
- Created lib/config.test.ts (9 tests)
- Created hooks/useScrollDepth.test.ts (7 tests)
- Updated Hero.test.tsx to use accented text patterns

### File List

**NEW:**
- apps/landing/app/sitemap.ts
- apps/landing/app/robots.ts
- apps/landing/lib/gtag.ts
- apps/landing/lib/analytics.ts
- apps/landing/lib/analytics.test.ts
- apps/landing/lib/config.ts
- apps/landing/lib/config.test.ts
- apps/landing/components/AnalyticsProvider.tsx
- apps/landing/hooks/useScrollDepth.ts
- apps/landing/hooks/useScrollDepth.test.ts

**MODIFIED:**
- apps/landing/app/layout.tsx (metadata with accents, metadataBase, og:image, AnalyticsProvider)
- apps/landing/components/Hero.tsx (client component, CTA tracking, scroll depth, CTA mode, accents)
- apps/landing/components/Hero.test.tsx (updated text patterns with accents)
- apps/landing/components/Pricing.tsx (client component, CTA tracking, CTA mode)
- apps/landing/components/Waitlist.tsx (form submission tracking)
- apps/landing/.env.example (added analytics and CTA env vars)

## Change Log

- 2025-12-27: Story created with comprehensive developer context by create-story workflow.
- 2025-12-27: Implementation completed. All 9 tasks done. 215 tests passing. Build successful. Ready for code review.
