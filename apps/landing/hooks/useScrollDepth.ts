'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useCookieConsent } from './useCookieConsent'
import { trackScrollDepth } from '@/lib/analytics'

const THRESHOLDS = [25, 50, 75, 100] as const

/**
 * Hook to track scroll depth milestones (25%, 50%, 75%, 100%)
 * Only tracks when cookie consent is accepted
 * Each threshold fires only once per page view
 */
export function useScrollDepth(): void {
  const { consent } = useCookieConsent()
  const pathname = usePathname()
  const trackedRef = useRef<Set<number>>(new Set())

  // Reset tracked thresholds on pathname change
  useEffect(() => {
    trackedRef.current = new Set()
  }, [pathname])

  useEffect(() => {
    // Only track if consent is accepted
    if (consent !== 'accepted') return

    const handleScroll = (): void => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight

      // Avoid division by zero for short pages
      if (scrollHeight <= 0) return

      const scrollTop = window.scrollY
      const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100)

      for (const threshold of THRESHOLDS) {
        if (scrollPercentage >= threshold && !trackedRef.current.has(threshold)) {
          trackedRef.current.add(threshold)
          trackScrollDepth(threshold)
        }
      }
    }

    // Check initial scroll position (in case page is loaded scrolled)
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [consent])
}
