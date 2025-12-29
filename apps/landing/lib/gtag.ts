// Google Analytics 4 type declarations and helper

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

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

/**
 * Check if gtag is available and GA is configured
 */
export function isGtagAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function' && !!GA_MEASUREMENT_ID
}

/**
 * Send a pageview event to GA4
 */
export function pageview(url: string): void {
  if (!isGtagAvailable()) return

  window.gtag('config', GA_MEASUREMENT_ID!, {
    page_path: url,
  })
}

/**
 * Send a custom event to GA4
 */
export function event(
  action: string,
  params?: Record<string, unknown>
): void {
  if (!isGtagAvailable()) return

  window.gtag('event', action, params)
}

export {}
