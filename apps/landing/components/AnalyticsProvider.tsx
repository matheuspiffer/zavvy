'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { useCookieConsent } from '@/hooks/useCookieConsent'
import { GA_MEASUREMENT_ID, trackPageView } from '@/lib/analytics'

function AnalyticsTracker() {
  const { consent } = useCookieConsent()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views on route change
  useEffect(() => {
    if (consent === 'accepted' && GA_MEASUREMENT_ID) {
      const search = searchParams?.toString()
      const url = pathname + (search ? `?${search}` : '')
      trackPageView(url)
    }
  }, [pathname, searchParams, consent])

  return null
}

export function AnalyticsProvider() {
  const { consent } = useCookieConsent()

  // Don't load analytics if consent is not accepted or GA is not configured
  if (consent !== 'accepted' || !GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      {/* Google Analytics Script */}
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
      {/* Page view tracker wrapped in Suspense for useSearchParams */}
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
    </>
  )
}
