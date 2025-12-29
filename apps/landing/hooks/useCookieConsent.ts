'use client'

import { useState, useEffect } from 'react'

const COOKIE_CONSENT_KEY = 'zavvy-cookie-consent'

export type ConsentStatus = 'accepted' | 'rejected' | null

/**
 * Hook for managing cookie consent state (LGPD compliance).
 *
 * Usage for conditional analytics loading:
 * ```tsx
 * const { consent } = useCookieConsent()
 *
 * useEffect(() => {
 *   if (consent === 'accepted') {
 *     // Load analytics scripts (e.g., Google Analytics)
 *     loadGoogleAnalytics()
 *   }
 * }, [consent])
 * ```
 *
 * When consent is 'rejected', only essential cookies should be used.
 * Analytics and tracking scripts should NOT be loaded.
 */

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
      // Validate stored value is a valid ConsentStatus
      const validConsent: ConsentStatus =
        stored === 'accepted' || stored === 'rejected' ? stored : null
      setConsent(validConsent)
      setIsLoaded(true)
    }
  }, [])

  const acceptCookies = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
      setConsent('accepted')
    }
  }

  const rejectCookies = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected')
      setConsent('rejected')
    }
  }

  return {
    consent,
    isLoaded,
    showBanner: isLoaded && consent === null,
    acceptCookies,
    rejectCookies,
  }
}
