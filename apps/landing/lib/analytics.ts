import { event, pageview, isGtagAvailable, GA_MEASUREMENT_ID } from './gtag'

export { GA_MEASUREMENT_ID, isGtagAvailable }

/**
 * Track a page view event
 * @param url - The URL path to track
 */
export function trackPageView(url: string): void {
  pageview(url)
}

/**
 * Track a generic event
 * @param action - The event action name
 * @param params - Optional event parameters
 */
export function trackEvent(action: string, params?: Record<string, unknown>): void {
  event(action, params)
}

/**
 * Track a CTA button click
 * @param buttonId - Unique identifier for the button (e.g., 'hero_cta', 'pricing_starter')
 */
export function trackCTAClick(buttonId: string): void {
  if (typeof window === 'undefined') return

  trackEvent('cta_click', {
    button_id: buttonId,
    page_path: window.location.pathname,
  })
}

/**
 * Track scroll depth milestone
 * @param percentage - The scroll depth percentage (25, 50, 75, or 100)
 */
export function trackScrollDepth(percentage: number): void {
  if (typeof window === 'undefined') return

  trackEvent('scroll_depth', {
    depth_percentage: percentage,
    page_path: window.location.pathname,
  })
}

/**
 * Track form submission
 * @param formId - Unique identifier for the form
 * @param success - Whether the submission was successful
 */
export function trackFormSubmission(formId: string, success: boolean): void {
  if (typeof window === 'undefined') return

  trackEvent('form_submit', {
    form_id: formId,
    success,
    page_path: window.location.pathname,
  })
}
